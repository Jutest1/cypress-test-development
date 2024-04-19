import { _common, _estimatePage, _rfqPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
import Buttons from "cypress/locators/buttons";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();

allure.epic("PROCUREMENT AND BPM");
allure.feature("Procurement");
allure.story("PCM- 2.5 | Create a request for quotation RFQ and add bidder")

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_QUOTE;
let CONTAINER_PACKAGE;
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTES_ITEM
let CONTAINER_COLUMNS_CONTRACT

describe('PCM- 2.5 | Create a request for quotation RFQ and add bidder', () => {
  before(function () {
    cy.fixture("procurement-and-bpm/pcm-2.5-create-a-request-for-quotation-RFQ-and-add-bidder.json").then((data) => {
      this.data = data
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
      CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
      CONTAINER_COLUMNS_QUOTES_ITEM = this.data.CONTAINER_COLUMNS.QUOTES_ITEM
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
      };
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
      }
    })
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();

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
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create material package include cost code checkbox using wizard', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreatePackage_wizard(CONTAINER_PACKAGE.MATERIAL_AND_COSTCODE)
    _common.waitForLoaderToDisappear()
    cy.wait(3000)  //required wait else test will fail
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create requisition from wizard and change status', function () {
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION);
    cy.wait(2000)//required wait else test will fail
    _common.waitForLoaderToDisappear()
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.wait(2000)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
    _common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.GROSS).then(($RFQ_GrossTotal) => {
      Cypress.env("RFQ_GrossTotal", $RFQ_GrossTotal.text())
    })
  });

  it('TC - Verify requisition status, only requisition status is approved, it can create a rfq', function () {
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, commonLocators.CommonKeys.APPROVED)
  });

  it('TC - Verify the bp which is choose in the bp search dialog is shown in bidder container of rfq', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _common.waitForLoaderToDisappear()
    _rfqPage.createRequestForCode_fromWizard(CONTAINER_QUOTE.CASE, CONTAINER_QUOTE.BUSINESS_PARTNER, CONTAINER_QUOTE.PROCUREMENT_STRUCTURE)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
    _common.waitForLoaderToDisappear()
  });

  it('TC - Verify check the bp which is choose in the bp search dialog is shown in bidder container of rfq', function () {

    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1);
    })
    _common.select_rowInContainer(cnt.uuid.BIDDERS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER)
  });

  it('TC - Verify the totals in rfq is same as in requisition', function () {
    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 1);
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RFQ_TOTALS, app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.GROSS, Cypress.env("RFQ_GrossTotal"))
    })
  });

})