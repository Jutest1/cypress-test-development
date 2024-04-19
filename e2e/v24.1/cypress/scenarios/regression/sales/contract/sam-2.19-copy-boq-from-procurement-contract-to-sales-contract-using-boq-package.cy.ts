import { app, commonLocators, cnt, sidebar, btn, tile } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _boqPage, _estimatePage, _package, _bidPage, _saleContractPage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO_1 = "PRC1" + Cypress._.random(0, 999);
const PRJ_NAME_1 = "TEST-PRJ1-" + Cypress._.random(0, 9999);
const PRJ_NO_2 = "PRC2" + Cypress._.random(0, 999);
const PRJ_NAME_2 = "TEST-PRJ2-" + Cypress._.random(0, 9999);
const BOQ_DESC = "BOQ-1-" + Cypress._.random(0, 999);
const BOQ_DESC_2 = "BOQ-2-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-1-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2 = "BOQSTR-DESC-2-" + Cypress._.random(0, 999);
const BID_DESC_1 = "BID-1-" + Cypress._.random(0, 999);
const CONTRACT_DESC_1 = "CONT-1-" + Cypress._.random(0, 999);
const ESTIMATE_CODE_1 = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION_1 = 'EST-DESC1-' + Cypress._.random(0, 999);
const ESTIMATE_CODE_2 = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION_2 = 'EST-DESC2-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_RESOURCE, CONTAINERS_BIDS;

let CONTAINER_COLUMNS_BOQS, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_BIDS, CONTAINER_COLUMNS_SALES_CONTRACT, CONTAINER_COLUMNS_SALES_CONTRACT_BOQS, CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE, CONTAINER_COLUMNS_SALES_CONTRACT_SOURCE_BOQ;

let PROJECTS_PARAMETERS_1: DataCells, PROJECTS_PARAMETERS_2: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_PARAMETERS_2: DataCells, BOQ_STRUCTURE_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETERS_2: DataCells, ESTIMATE_PARAMETERS_1: DataCells, ESTIMATE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_1: DataCells, RESOURCE_PARAMETERS_2: DataCells;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_CREATE_CONTRACT;

let GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells, GENERATE_LINE_ITEMS_PARAMETERS_2: DataCells;

ALLURE.epic("SALES");
ALLURE.feature("Sales-Contract");
ALLURE.story("SAM- 2.19 | Copy BoQ from Procurement Contract to Sales Contract using BoQ Package.");

describe("SAM- 2.19 | Copy BoQ from Procurement Contract to Sales Contract using BoQ Package.", () => {

  before(function () {
    cy.fixture("sam/sam-2.19-copy-boq-from-procurement-contract-to-sales-contract-using-boq-package.json").then((data) => {
      this.data = data;
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
      PROJECTS_PARAMETERS_1 = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO_1,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME_1,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
      }
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      BOQ_PARAMETERS_1 = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      BOQ_STRUCTURE_PARAMETERS_1 = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS_1 = {
        [app.GridCells.CODE]: ESTIMATE_CODE_1,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION_1,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      GENERATE_LINE_ITEMS_PARAMETERS_1 = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
      };
      MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
      MODAL_CREATE_CONTRACT = this.data.MODAL.CREATE_CONTRACT
      PROJECTS_PARAMETERS_2 = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO_2,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME_2,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
      }
      BOQ_PARAMETERS_2 = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC_2
      }
      BOQ_STRUCTURE_PARAMETERS_2 = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC_2,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      }
      ESTIMATE_PARAMETERS_2 = {
        [app.GridCells.CODE]: ESTIMATE_CODE_2,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION_2,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      GENERATE_LINE_ITEMS_PARAMETERS_2 = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC_2
      }
      RESOURCE_PARAMETERS_2 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
      };
      CONTAINERS_BIDS = this.data.CONTAINERS.BIDS
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      CONTAINER_COLUMNS_SALES_CONTRACT = this.data.CONTAINER_COLUMNS.SALES_CONTRACT
      CONTAINER_COLUMNS_SALES_CONTRACT_BOQS = this.data.CONTAINER_COLUMNS.SALES_CONTRACT_BOQS
      CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.SALES_CONTRACT_BOQ_STRUCTURE
      CONTAINER_COLUMNS_SALES_CONTRACT_SOURCE_BOQ = this.data.CONTAINER_COLUMNS.SALES_CONTRACT_SOURCE_BOQ
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS)
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_1)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.PROJECTS)
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_2)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, "TEST-PRJ-7392").pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create BOQ header & BOQ Structure in first Project", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Estimate header and generate line items from BOQ and assign resource to it", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create/Update BoQ Package using wizard and change BoQ Status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.CASE[0], CommonLocators.CommonLabels.ENTIRE_ESTIMATE, CommonLocators.CommonKeys.PROJECT_BOQ, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE[0]);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Procurement Contract from Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _package.create_ContractfromPackage(MODAL_CREATE_CONTRACT.BUSINESS_PARTNER[0]);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Navigate to Second Project", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME_2).pinnedItem();
  });

  it("TC - Create BOQ header & BOQ Structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_2);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_2);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

  });

  it("TC - Create Estimate header and generate line items from BOQ and assign resource to it", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_2);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_2);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Bid", function () {
    _bidPage.createBidRecord_byWizardOption(BID_DESC_1, CONTAINERS_BIDS.BUSINESS_PARTNER, CommonLocators.CommonKeys.BOQ);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.SUBMITTED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Sales Contract", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC_1);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 1);
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_SALES_CONTRACT)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS,)
    _common.select_rowHasValue(cnt.uuid.CONTRACTS, CONTRACT_DESC_1)
    _saleContractPage.changeStatus_ContractRecord();
    _common.waitForLoaderToDisappear()
    _saleContractPage.selectContract();
  });

  it("TC - Copy Item from Source BoQ", function () {
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACTBOQ)
      _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_2)
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs, 0);
      _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS, CONTAINER_COLUMNS_SALES_CONTRACT_BOQS)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_BOQS)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_SOURCEBOQS, app.FooterTab.SOURCE_BOQ, 2);
      _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_SOURCEBOQS, CONTAINER_COLUMNS_SALES_CONTRACT_BOQ_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_SOURCEBOQS)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_BOQS)
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.CONTRACTSALES_BOQS)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_SOURCEBOQS, app.FooterTab.SOURCE_BOQ, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTSALES_SOURCEBOQS)
    _common.waitForLoaderToDisappear()
    _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.CONTRACTSALES_SOURCEBOQS, cnt.uuid.BOQ_STRUCTURE1, CommonLocators.CommonKeys.PROJECT_BOQ, '', PRJ_NAME_1, BOQ_DESC, BOQ_STRUCTURE_DESC, CommonLocators.CommonKeys.POSITION);
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCTURE_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
  });

});