import { tile, app, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _package, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "P-" + Cypress._.random(0, 999);
const PRJ_NAME = "P1.6-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "EST_CODE-" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST_DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = "LI_DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2 = "LI_DESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_BOQ_STRUCTURE;

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS_1: DataCells, LINE_ITEM_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS: DataCells;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_UPDATE_BOQ_PACKAGE;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 1.6 | Add remove a new boq line item to existing boq package of estimate from procurement package column in line item container");

describe("PCM- 1.6 | Add remove a new boq line item to existing boq package of estimate from procurement package column in line item container", () => {

  before(function () {

    cy.fixture("pcm/pcm-1.6-add-remove-a-new-boq-line-item-to-existing-boq-package-of-estimate-from-procurement-package-column-in-line-item-container.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
      PROJECT_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
      };
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      LINE_ITEM_PARAMETERS_1 = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
      };
      LINE_ITEM_PARAMETERS_2 = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_2,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[1],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[1]
      };
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCES
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0]
      };
      CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM_ASSIGNMENT
      MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
      MODAL_UPDATE_BOQ_PACKAGE = this.data.MODAL.UPDATE_BOQ_PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new estimate', function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create line item record", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING, CommonLocators.CommonLabels.ENTIRE_ESTIMATE, CommonLocators.CommonKeys.LINE_ITEMS, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PRC_STRUCTURE_CODE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.SELECTION_STRUCTURE, CommonLocators.CommonLabels.CREATE_NEW)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.select_rowInContainer(cnt.uuid.PACKAGE)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify package in line item", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.select_rowHasValue(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_1);
    _package.verify_Package_inLineItem();
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
  })

  it("TC - Create new line item record with assign package", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_2);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_2)
    _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEM, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
      _common.setup_gridLayout(cnt.uuid.PACKAGEITEM, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT)
    })
    _common.maximizeContainer(cnt.uuid.PACKAGEITEM)
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEM)
    _package.assin_ProcurementPackagetoLineItem();
    _common.minimizeContainer(cnt.uuid.PACKAGEITEM)
  });

  it("TC - Update BoQ package from wizard", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_BOQ_PACKAGES);
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    _package.update_BoQPackages(CommonLocators.CommonLabels.ENTIRE_ESTIMATE, 0, CommonLocators.CommonKeys.PROJECT_BOQ, MODAL_UPDATE_BOQ_PACKAGE.TRANSFER_FROM)
    cy.REFRESH_CONTAINER()
  });

  it("TC -Verify line item cost total with package final price", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.select_rowInContainer(cnt.uuid.PACKAGE)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(function () {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 1)
    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
    _common.select_rowInContainer(cnt.uuid.PROCUREMENT_BOQS)

    _common.openTab(app.TabBar.PACKAGE).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo], cnt.uuid.BOQ_STRUCTURE)
    })
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, LINE_ITEM_DESCRIPTION_2)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, LINE_ITEM_DESCRIPTION_2)
    _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURE)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_LINE_ITEM.QUANTITY[1])
    _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("Text"))
  });

})