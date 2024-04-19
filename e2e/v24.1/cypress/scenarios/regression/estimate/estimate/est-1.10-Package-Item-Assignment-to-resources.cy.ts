import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _estimatePage, _mainView, _modalView, _package, _projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const PACKAGE_CODE = 'PACKAGE_CODE'
const PACKAGE_TOTAL = 'PACKAGE_TOTAL'
const COST_TOTAL = 'COST_TOTAL'

let ESTIMATE_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_1: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells
let CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE, CONTAINERS_RESOURCE, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_TOTAL, CONTAINER_PACKAGE_ITEM_ASSIGNMENT, MODAL_UPDATE_MATERIAL_PACKAGE, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT
ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.10 |  Package Item Assignment to resources");

describe("EST- 1.10 |  Package Item Assignment to resources", () => {
  before(function () {
    cy.fixture("estimate/est-1.10-Package-Item-Assignment-to-resources.json")
      .then((data) => {
        this.data = data;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
        CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
        CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
        CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE;
        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE;
        MODAL_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.UPDATE_MATERIAL_PACKAGE;
        CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE;
        CONTAINER_COLUMNS_TOTAL = this.data.CONTAINER_COLUMNS.TOTAL;
        CONTAINER_PACKAGE_ITEM_ASSIGNMENT = this.data.CONTAINERS.PACKAGE_ITEM_ASSIGNMENT;
        CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM_ASSIGNMENT;
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        };
        LINE_ITEM_PARAMETERS = {
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        };
        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
        };
        RESOURCE_PARAMETERS_1 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
        };
        RESOURCE_PARAMETERS_2 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
        };
        RESOURCE_PARAMETERS_3 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[2],
        };
      })
      .then(() => {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.waitForLoaderToDisappear();
      });
  });

  it("TC - Create new estimate having line item", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear();
  });

  it("TC - Create new line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  });

  it("TC - Creating material resource in resource Container", function () {
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  });

  it("TC - Creating sub item resource in resource Container", function () {
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
    });
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.create_newSubRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
  });

  it("TC -Create/update material package from wizards for Selected line items", function () {
    cy.wait(2000) // required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear();
    _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE, null, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
    });
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"));
    _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, PACKAGE_CODE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.waitForLoaderToDisappear();
  });

  it("TC - Verify Cost of the package with estimate cost total", function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.waitForLoaderToDisappear();
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"));
      _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 2);
      _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_TOTAL);
    });
    _common.waitForLoaderToDisappear();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.TOTALS, app.GridCells.TRANSLATED, commonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
    _common.saveCellDataToEnv(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, PACKAGE_TOTAL)
    cy.log(PACKAGE_TOTAL)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    cy.wait(1000).then(() => {
      _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
    })
    _common.waitForLoaderToDisappear();
    cy.wait(2000) // required wait to load page
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear();
    cy.wait(2000) // required wait to load page
    cy.wait(1000).then(() => {
      _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
    })
    cy.wait(500).then(() => { // required wait to load page
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, Cypress.env(PACKAGE_TOTAL))
    })
  });

  it("TC - Creating second Material resource in resource Container", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
    });
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, COST_TOTAL)
    cy.log("Cost==>" + Cypress.env(COST_TOTAL))
  });

  it("TC - Package item assignment and update material package", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
      _common.setup_gridLayout(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT)
    });
    _common.waitForLoaderToDisappear();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_RESOURCE.CODE[1])
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT);
    cy.wait(500).then(() => {
      _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(PACKAGE_CODE))
    })
    cy.SAVE();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
    })
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
    })
    _common.select_rowInContainer(cnt.uuid.RESOURCES)
    cy.wait(2000) //required wait to load modal
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_MATERIAL_PACKAGE);
    cy.wait(2000) //required wait to load modal
    _package.enter_recordUpdate_Material_package(
      commonLocators.CommonKeys.SELECTED_LINE_ITEM,
      MODAL_UPDATE_MATERIAL_PACKAGE.SELECTED_CHECKBOX_ID,
      MODAL_UPDATE_MATERIAL_PACKAGE.SELECT_PKG_OPTION1,
      MODAL_UPDATE_MATERIAL_PACKAGE.SELECT_PKG_VALUE1
    );
    cy.SAVE();


  });

  it("TC - Verify updated package total with estimate", function () {
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, COST_TOTAL)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
    })
    _common.clickOn_cellHasValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE[1])
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 3);
    })
    _common.select_rowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
    _common.goToButton_inActiveRow(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, btn.IconButtons.ICO_PACKAGE)
    cy.wait(2000) // required wait to load page
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.waitForLoaderToDisappear();
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 2);
    });
    _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env(PACKAGE_CODE))
    _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env(PACKAGE_CODE))
    cy.wait(500).then(() => { // required wait to load page
      _common.assert_cellData_insideActiveRow(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env(COST_TOTAL))

    });
  });

  after(() => {
    cy.LOGOUT();
  });

});
