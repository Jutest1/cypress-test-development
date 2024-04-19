import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const MIN_QUANTITY = 'MIN_QUANTITY'

let ESTIMATE_PARAMETERS: DataCells,
  LINE_ITEM_PARAMETERS,
  RESOURCE_PARAMETERS_MATERIAL

let CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINER_LINE_ITEM,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_PACKAGE,
  CONTAINER_COLUMNS_PACKAGE,
  CONTAINER_COLUMNS_ITEM,
  CONTAINER_MATERIAL_RECORD,
  CONTAINER_COLUMNS_MATERIAL_RECORD

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.40 | Validate & update item quantity");

describe("PCM- 2.40 | Validate & update item quantity", () => {
  before(function () {
    cy.fixture("pcm/pcm-2.40-validate-and-update-item-quantity.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_ITEM = this.data.CONTAINER_COLUMNS.ITEM
      CONTAINER_MATERIAL_RECORD = this.data.CONTAINERS.MATERIAL_RECORD
      CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD

      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINER_LINE_ITEM.QUANTITY,
        [app.GridCells.BAS_UOM_FK]: CONTAINER_LINE_ITEM.UOM,
      };
      RESOURCE_PARAMETERS_MATERIAL = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
      };

      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new estimate header', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new line item with quantity", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
  });

  it("TC - Assign resource to the line item", function () {
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES);
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  });

  it("TC- Verify Create/update material Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    cy.wait(8000) //required wait to load page
    _common.waitForLoaderToDisappear();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    })
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
      _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    })
    cy.wait(2000) //required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
    _common.clear_searchInSidebar()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
    cy.wait(2000) //required wait to load page
    _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINER_PACKAGE.VALUE);
    _common.assert_cellData(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, CONTAINER_PACKAGE.QUANTITY)
    _common.goToModule_inActiveRow(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, btn.ButtonText.GO_TO_MATERIAL)
  });

  it("TC-update min quantity and sell unit in Matrial Records", function () {
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
    })
    cy.REFRESH_SELECTED_ENTITIES()
    cy.wait(3000) //required wait to load page
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MIN_QUANTITY, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL_RECORD.MIN_QUANTITY)
    cy.REFRESH_SELECTED_ENTITIES()
    cy.wait(3000) //required wait to load page
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.SELL_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL_RECORD.SELL_UNIT)
    cy.SAVE();
    _common.saveCellDataToEnv(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MIN_QUANTITY, MIN_QUANTITY)
  })

  it("TC- Verify validate & update item quantity wizard option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUANTITY, sidebar.SideBarOptions.PACKAGE);
    cy.wait(3000) //required wait to load page
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
    })
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
    })
    _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINER_PACKAGE.VALUE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.VALIDATE_AND_UPDATE_ITEM_QUANTITY);
    cy.wait(3000) //required wait to load page
    _package.validateAndUpdateItemQuantity_wizardOption(CONTAINER_PACKAGE.RADIO_INPUT, 0)
    cy.SAVE()
    cy.wait(1000).then(() => {
      _common.assert_cellData(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, Cypress.env(MIN_QUANTITY))
    })
  })

  after(() => {
    cy.LOGOUT();
  });
});


