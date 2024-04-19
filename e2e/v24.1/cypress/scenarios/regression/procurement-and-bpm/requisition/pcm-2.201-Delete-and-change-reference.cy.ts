import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _estimatePage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const EST_CODE = "C1-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LINEITEM_DESC-" + Cypress._.random(0, 999);
const SUBCONTRACTOR_DESC = "SUBCONTRACTOR_DESC_DESC-" + Cypress._.random(0, 999);

let CONTAINERS_ESTIMATE, CONTAINERS_PROJECT, CONTAINERS_RESOURCES, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_ITEMS, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_QUOTES, CONTAINER_COLUMNS_SUBCONTRACTORS;

let PROJECTS_PARAMETERS_1: DataCells, ESTIMATE_PARAMETERS_1: DataCells, LINE_ITEM_PARAMETERS_1: DataCells, RESOURCE_PARAMETER_1: DataCells, RFQ_PARAMETER: DataCells;

let MODAL_CREATE_RFQ;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.201 | Delete and change reference");

describe("PCM- 2.201 | Delete and change reference", () => {

  before(function () {
    cy.fixture("pcm/pcm-2.201-Delete-and-change-reference.json").then((data) => {
      this.data = data;
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
      PROJECTS_PARAMETERS_1 = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS_1 = {
        [app.GridCells.CODE]: EST_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      LINE_ITEM_PARAMETERS_1 = {
        [app.GridCells.DESCRIPTION_INFO]: LINEITEM_DESC,
      };
      CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
      CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
      RESOURCE_PARAMETER_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[0]
      };
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
      CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      MODAL_CREATE_RFQ = this.data.MODAL.CREATE_RFQ;
      RFQ_PARAMETER = {
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_RFQ.BUSINESS_PARTNER]
      }
      CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
      CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
      CONTAINER_COLUMNS_SUBCONTRACTORS = this.data.CONTAINER_COLUMNS.SUBCONTRACTORS
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_1);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create new estimate", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_1);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
  });

  it("TC - Create new line item with quantity", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1)
    cy.SAVE();
  });

  it("TC - Assign resource to the line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_1)
    cy.SAVE();
  });

  it("TC - Create material package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _package.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.select_rowInSubContainer(cnt.uuid.PACKAGE)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
      _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEMS)
    })
    _common.select_dataFromSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCES.CODE[0]);
  });

  it("TC - Create requisition from material package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
  });
  it("TC -Add subcontractor  and delete and verify the contract have been deleted ", function () {
    _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
      _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 1)
      _common.setup_gridLayout(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINER_COLUMNS_SUBCONTRACTORS)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, SUBCONTRACTOR_DESC)
    cy.SAVE()
    cy.wait(2000)
    _common.clear_subContainerFilter(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    _common.search_inSubContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR, SUBCONTRACTOR_DESC)
    _common.delete_recordFromContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    _validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_SUBCONTRACTOR, SUBCONTRACTOR_DESC)
  });
});
