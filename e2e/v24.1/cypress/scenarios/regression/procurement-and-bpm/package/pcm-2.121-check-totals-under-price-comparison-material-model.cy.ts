import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells,
  LINE_ITEM_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  CREATE_RFQ_PARAMETERS:DataCells


let CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINER_COLUMNS_LINE_ITEMS,
  CONTAINERS_LINE_ITEM,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_QUOTE,
  CONTAINER_COLUMNS_QUOTE,
  CONTAINER_COLUMNS_QUOTE_ITEM,
  CONTAINER_COLUMNS_PRICE_COMPARISON

allure.epic("PROCUREMENT AND BPM")
allure.feature("Package")
allure.story("PCM- 2.121 | Check totals under price comparison (Material) model")

describe("PCM- 2.121 | Check totals under price comparison (Material) model", () => {
  before(function () {
    cy.fixture("pcm/pcm-2.121-check-totals-under-price-comparison-material-model.json").then((data) => {
      this.data = data
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
      CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
      CONTAINER_COLUMNS_QUOTE_ITEM = this.data.CONTAINER_COLUMNS.QUOTE_ITEM
      CONTAINER_COLUMNS_PRICE_COMPARISON = this.data.CONTAINER_COLUMNS.PRICE_COMPARISON
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
        [app.GridCells.BAS_UOM_FK]:CONTAINERS_LINE_ITEM.UOM
      };
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      }
      CREATE_RFQ_PARAMETERS={
        [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINER_QUOTE.BUSINESS_PARTNER_1]
    }

      cy.preLoading(
        Cypress.env("adminUserName"),
        Cypress.env("adminPassword"),
        Cypress.env("parentCompanyName"),
        Cypress.env("childCompanyName")
    );
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.waitForLoaderToDisappear()
    })
  });
  
  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new estimate record', function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC- Create new Line item record", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new record in resource", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.wait(1000)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    _common.waitForLoaderToDisappear()
    cy.wait(3000)  //required wait else test will fail
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create requisistion by wizard', function () {
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION);
    cy.wait(2000)//required wait else test will fail
    _common.waitForLoaderToDisappear()
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.wait(2000)
  });

  it('TC - Create request for quote by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _common.waitForLoaderToDisappear()
    _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create Quote by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _rfqPage.create_quote_fromWizard([CONTAINER_QUOTE.BUSINESS_PARTNER_1], ['check']);
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
      _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.PACKAGEITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEM)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
    cy.wait(1000)
    _common.maximizeContainer(cnt.uuid.QUOTES_ITEMS)
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_QUOTE.PRICE_1)
    cy.SAVE()
    cy.wait(5000)
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    cy.wait(1000)
    _common.getText_fromCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.TOTAL_NO_DISCOUNT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("TotalNodiscountofBP1", $ele1.text())
    })
    _common.minimizeContainer(cnt.uuid.QUOTES_ITEMS)
    cy.wait(1000)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_2)
    cy.wait(1000)
    _common.maximizeContainer(cnt.uuid.QUOTES_ITEMS)
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    cy.wait(1000)
    _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_QUOTE.PRICE_2)
    cy.SAVE()
    cy.wait(5000)
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.getText_fromCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.TOTAL_NO_DISCOUNT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("TotalNodiscountofBP2", $ele1.text())
    })
    _common.minimizeContainer(cnt.uuid.QUOTES_ITEMS)
    cy.wait(1000)
  })

  it('TC - Verify check totals of all the material items in the BP column show same as in quote', function () {
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, commonLocators.CommonKeys.PRICE_COMPARISON_1)
    _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1, app.FooterTab.PRICE_COMPARISON_ITEM, 2);
      _common.setup_gridLayout(cnt.uuid.PRICE_COMPARISON_V1, CONTAINER_COLUMNS_PRICE_COMPARISON)
    })
    _common.maximizeContainer(cnt.uuid.PRICE_COMPARISON_V1)
    _common.clickOn_cellHasIcon(cnt.uuid.PRICE_COMPARISON_V1, app.GridCells.TREE, app.GridCellIcons.ICO_FO_REQUISITION_TOTAL)
    cy.wait(500).then(() => {
      _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISON_V1, commonLocators.CommonElements.STYLE_GREEN, Cypress.env("TotalNodiscountofBP1"))
    })

  })
})