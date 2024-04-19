
import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _controllingUnit, _validate, _materialPage, _rfqPage } from "cypress/pages";
import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = "COUNTUNIT-" + Cypress._.random(0, 999);
const lineType = "10"
const ContractCode = "ContractCode"
const PES_Total = "PES_Total"
const TransactionAmount = "TransactionAmount"
const PRJ_NO = "PCM" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const PES_ENV = "PES_ENV"
const INVOICE_NO = "INVOICE_NO-" + Cypress._.random(0, 999);
const INVOICE_NO2 = "INVOICE_NO-" + Cypress._.random(0, 999);
const CO_CONTRACT_DESC = "CO_CONTRACT_DESC-" + Cypress._.random(0, 999);
const PROJECT_CHANGE_DESC = "PROJECT_CHANGE_DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells

const PROJECT_NO = "39" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells
let MODAL_PROJECTS

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINERS_BOQ_STRUCTURE

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM


let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS, CO_CONTRACT_ITEM_PARAMETER: DataCells

let MODAL_REQUEST_FOR_QUOTE

let CONTAINER_COLUMNS_RFQ

let CONTAINER_COLUMNS_QUOTE

let CONTAINERS_QUOTE_BOQ_STRUCTURE

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_HEADER

let CONTAINER_COLUMNS_INVOICE_HEADER

let CONTAINER_COLUMNS_CONTRACT_ITEM

let CONTAINERS_CONTRACT_ITEM

let CONTAINER_COLUMNS_RECONCILIATION

let CONTAINER_COLUMNS_BILLING_SCHEMA
let CONTAINER_COLUMNS_TRANSACTION, CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS
let CONTAINERS_PERFORMANCE_ENTRY_SHEETS;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");
allure.story("PCM- 1.71 | Procurement process from project to PES(BOQ) & CO contract to invoice transaction");
describe("PCM- 1.71 | Procurement process from project to PES(BOQ) & CO contract to invoice transaction", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-1.71-procurement-process-from-project-to-pes-co-contract-to-invoice-transaction.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("pcm/pcm-1.71-procurement-process-from-project-to-pes-co-contract-to-invoice-transaction.json").then((data) => {
      this.data = data;
      MODAL_PROJECTS = this.data.MODAL.PROJECTS
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
        [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK[0]
      }
      CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
      CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
      CONTROLLING_UNIT_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
        [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
      }
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
      };
      MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      MODAL_REQUEST_FOR_QUOTE = this.data.MODAL.REQUEST_FOR_QUOTE
      CREATE_RFQ_PARAMETERS = {
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER]
      }
      CO_CONTRACT_ITEM_PARAMETER = {
        [commonLocators.CommonLabels.PROJECT]: PROJECT_NO,
        // [commonLocators.CommonLabels.RUBRIC_CATEGORY]: createchange.rubicCategory,
        [commonLocators.CommonLabels.CHANGE_TYPE]: commonLocators.CommonKeys.DESIGN_CHANGE,
        [commonLocators.CommonLabels.CHANGE_REASON]: commonLocators.CommonKeys.CHANGE_REQUEST,
        [commonLocators.CommonLabels.DESCRIPTION]: PROJECT_CHANGE_DESC,
        [commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC]: CO_CONTRACT_DESC
      }
      CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
      CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
      CONTAINERS_QUOTE_BOQ_STRUCTURE = this.data.CONTAINERS.QUOTE_BOQ_STRUCTURE
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINER_COLUMNS_HEADER = this.data.CONTAINER_COLUMNS.HEADER
      CONTAINER_COLUMNS_INVOICE_HEADER = this.data.CONTAINER_COLUMNS.INVOICE_HEADER
      CONTAINER_COLUMNS_CONTRACT_ITEM = this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
      CONTAINERS_CONTRACT_ITEM = this.data.CONTAINERS.CONTRACT_ITEM
      CONTAINER_COLUMNS_RECONCILIATION = this.data.CONTAINER_COLUMNS.RECONCILIATION
      CONTAINER_COLUMNS_BILLING_SCHEMA = this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
      CONTAINER_COLUMNS_TRANSACTION = this.data.CONTAINER_COLUMNS.TRANSACTION
      CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS = this.data.CONTAINER_COLUMNS.PERFORMANCE_ENTRY_SHEETS
      CONTAINERS_PERFORMANCE_ENTRY_SHEETS = this.data.CONTAINERS.PERFORMANCE_ENTRY_SHEETS
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      cy.wait(2000)//required wait to load page
    });
  });

  it('TC - Verify Create new project', function () {
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.setDefaultView(app.TabBar.PROJECT)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
    cy.wait(2000)//required wait to load page
    cy.SAVE();
    cy.wait(2000)//required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
  })

  it("TC - Create BoQ header and BoQ structure for project ", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    cy.wait(2000)//required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.setDefaultView(app.TabBar.BOQS)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.maximizeContainer(cnt.uuid.BOQS)
    _common.create_newRecord(cnt.uuid.BOQS);
    cy.wait(2000)//required wait to load page
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    cy.wait(2000)//required wait to load page
    _common.minimizeContainer(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    cy.wait(2000)//required wait to load page
  });

  it("TC - Create new controlling unit", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
      _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    cy.wait(2000)//required wait to load page
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE()
    cy.wait(2000)//required wait to load page
    _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_DESC)
    _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CONTROLLING_UNIT_CODE")
    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
    cy.wait(2000)//required wait to load page
  });

  it("TC - Create new Estimate and line items ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    cy.wait(2000)//required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.wait(2000)//required wait to load page
    cy.SAVE()
    cy.wait(2000)//required wait to load page
  });

  it("TC - Generate boq line item ", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    cy.wait(2000)//required wait to load page
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.wait(2000)//required wait to load page
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)
  })

  it("TC - Add Resource for selected line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    cy.wait(2000)//required wait to load page
    cy.SAVE();
  });

  it("TC - Create BoQ package from the estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    cy.wait(1000) // This wait required as UI takes time to load
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
    cy.wait(3000) // This wait required as UI takes time to load
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    cy.wait(2000)//required wait to load page
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
    cy.wait(2000)//required wait to load page
  })

  it("TC - Create Requisition from Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    cy.wait(2000) // This wait required as UI takes time to load
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    cy.wait(4000) // This wait required as UI takes time to load
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  });

  it("TC - Create RfQ from Requisition", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    cy.wait(2000)//required wait to load page
    cy.wait(2000) //required wait
    _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
    cy.wait(2000)//required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
      _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    cy.wait(2000)//required wait to load page
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
    cy.wait(2000)//required wait to load page
  });

  it("TC - Create Quote for multiple suppliers from RfQ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    cy.wait(2000)//required wait to load page
    _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER], [commonLocators.CommonKeys.CHECK])
    cy.wait(2000)//required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    cy.wait(2000)//required wait to load page
  });

  it("TC - Quote the Prices for the supliers in Quote's boq structure Container", function () {
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
      _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
      _common.clear_subContainerFilter(cnt.uuid.QUOTES)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTEPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
      cy.wait(2000)//required wait to load page
      _common.select_allContainerData(cnt.uuid.QUOTEPROCUREMENTBOQS)
    })
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.QUOTEBOQSTRUCTURE)
    })
    _common.maximizeContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.select_allContainerData(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.clickOn_toolbarButton(cnt.uuid.QUOTEBOQSTRUCTURE, btn.ToolBar.ICO_TREE_EXPAND_ALL)
    cy.wait(2000)//required wait to load page
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
    _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY)
    _common.edit_dropdownCellWithInput(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UOM)
    _common.select_activeRowInContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UNIT_RATE)
    _common.select_activeRowInContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    cy.wait(2000)//required wait to load page
    cy.SAVE()
    cy.wait(2000)//required wait to load page
    _common.minimizeContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
    _common.clear_subContainerFilter(cnt.uuid.QUOTES)
  });

  it("TC - Create contract from quote", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
    cy.wait(2000)//required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    cy.wait(2000)//required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    cy.wait(2000)//required wait to load page
  });

  it('TC - Change Contract Status', function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    cy.wait(2000)//required wait to load page
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    cy.wait(2000)//required wait to load page
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_PROJECTS.CLERK[0])
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.wait(2000)//required wait to load page
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_REQ_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_PROJECTS.CLERK[1])
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.wait(2000)//required wait to load page
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE"))
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.wait(2000)//required wait to load page
    cy.SAVE()
    cy.wait(2000)//required wait to load page
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
      _common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ)
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
    })
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQS, BOQ_DESC)
    cy.wait(2000)//required wait to load page
    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.GridCells.FINAL_PRICE_SMALL, "CONTRACT_UNIT_RATE", BOQ_ROOT_ITEM)
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    cy.wait(2000)//required wait to load page
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    cy.wait(2000)//required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    cy.wait(2000)//required wait to load page
    cy.wait(1000) // This wait is required as loader takes time to load
  })

  it('TC - Change BoQ structure Quantity In PES', function () {
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
      _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_HEADER);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    })
    _common.clear_subContainerFilter(cnt.uuid.HEADERS)
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1)
      cy.wait(2000)//required wait to load page
      _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
    })
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk, CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice], cnt.uuid.PES_BOQS_STRUCTURE)
      cy.wait(2000)//required wait to load page
    })
    _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE, btn.ToolBar.ICO_TREE_EXPAND_ALL)
    cy.wait(2000)//required wait to load page
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
    _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY)
    _common.select_activeRowInContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    cy.wait(2000)//required wait to load page
    cy.SAVE()
    cy.wait(2000)//required wait to load page
    _common.saveCellDataToEnv(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, "PES_FINAL_PRICE1")
    cy.wait(1000) //required wait to load page
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.PES_BOQS_STRUCTURE, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    cy.wait(2000)//required wait to load page
    _common.saveCellDataToEnv(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, "PES_FINAL_PRICE2")
    _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
    cy.wait(2000)//required wait to load page
  })

  it('TC - Create Create CO contract from PES variance from PES', function () {
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
      _common.saveCellDataToEnv(cnt.uuid.HEADERS, app.GridCells.PES_VALUE, PES_Total)
      cy.wait(2000) //required wait to load page
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM)
      cy.wait(2000) //required wait to load page
      _procurementPage.create_changeOrderContractForNewItem_fromWizard(CO_CONTRACT_ITEM_PARAMETER)
    });
  })

  it('TC - Change Contract Status for change order contract', function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    });
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, ContractCode)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.wait(2000)//required wait to load page
    cy.SAVE();
  })

  it('TC - Change PES Status', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1)
      cy.wait(2000)//required wait to load page
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
    cy.wait(2000)//required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.DATE_RECEIVED);
    cy.SAVE();
  })

  it('TC - Create invoice from wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
    cy.wait(2000)//required wait to load page
    _package.enterRecord_toCreate_Invoice_FromWizard(commonLocators.CommonKeys.CREATE_ONE_INVOICE_PER_PES, INVOICE_NO)
    cy.wait(2000)//required wait to load page
  });

  it("TC - Verify Invoice header records", function () {
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE_HEADER);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    _common.search_inSubContainer(cnt.uuid.INVOICEHEADER, INVOICE_NO)
    _common.select_rowHasValue(cnt.uuid.INVOICEHEADER, INVOICE_NO)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_TRANSACTION_FOR_SELECTED);
    _materialPage.clickOn_modalButtons(commonLocators.CommonKeys.INFORMATION, btn.ButtonText.OK)
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.TRANSACTION, app.FooterTab.TRANSACTION, 2)
      _common.setup_gridLayout(cnt.uuid.TRANSACTION, CONTAINER_COLUMNS_TRANSACTION);
    })
    cy.wait(3000)//required wait to load page
    cy.REFRESH_SELECTED_ENTITIES()
    _common.select_rowInContainer(cnt.uuid.TRANSACTION)
    cy.wait(3000) //required wait to load page
  })

  it("TC - Verify Transaction Amount and Line Type for 1st Invoice record", function () {
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.TRANSACTION, app.FooterTab.TRANSACTION, 2)
    })
    _common.select_rowInContainer(cnt.uuid.TRANSACTION)
    _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTION, app.GridCells.LINE_TYPE, lineType)
    _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTION, app.GridCells.AMOUNT_SMALL, Cypress.env("PES_Total"))
  })

  it("TC - Verify create new PES record ", function () {
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
    })
    _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.INVOICEHEADER, sidebar.SideBarOptions.CONTRACT)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
    });
    cy.wait(2000)//required wait to load page
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, commonLocators.CommonKeys.APPROVED)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS, commonLocators.CommonKeys.CHANGE_ORDER)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
    cy.wait(2000)//required wait to load page
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
    })
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.ITEMS, 2);
      cy.wait(2000)//required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.ITEMS, 2);
      cy.wait(2000)//required wait to load page
      _common.clickOn_cellHasIconWithIndex(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM, 0)
      _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_ENTRY_SHEETS.Quantity3)
      _common.clickOn_cellHasIconWithIndex(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM, 1)
      _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_ENTRY_SHEETS.Quantity4)
      cy.wait(1000)//required wait test failing due to  wait for loader code
      cy.SAVE()
      cy.wait(2000)//required wait to load page
      cy.SAVE()
      cy.wait(2000)//required wait to load page
    })
  })

  it('TC - Change PES Status', function () {
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
    })
    _common.select_rowInContainer(cnt.uuid.HEADERS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
    cy.wait(1000)//required waits
    _common.changeStatus_fromModal(sidebar.SideBarOptions.DATA_RECEIVED)
    cy.SAVE();
  })

  it('TC - Create invoice from wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
    cy.wait(2000)//required wait to load page
    _package.enterRecord_toCreate_Invoice_FromWizard(commonLocators.CommonKeys.CREATE_ONE_INVOICE_PER_PES, INVOICE_NO2)
  });

  it("TC - Generate transaction and verify for selected item", function () {
    cy.wait(2000)//required wait to load page
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
      _common.select_tabFromFooter(cnt.uuid.TRANSACTION, app.FooterTab.TRANSACTION, 2)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    cy.wait(2000)//required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    cy.REFRESH_CONTAINER()
    cy.wait(2000)//required wait to load page
    _common.search_inSubContainer(cnt.uuid.INVOICEHEADER, INVOICE_NO2)
    _common.select_rowHasValue(cnt.uuid.INVOICEHEADER, INVOICE_NO2)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_TRANSACTION_FOR_SELECTED);
    _materialPage.clickOn_modalButtons(commonLocators.CommonKeys.INFORMATION, btn.ButtonText.OK)
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
    })
  })

  it("TC - Verify Transaction Amout and Line Type", function () {
    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.TRANSACTION, app.FooterTab.TRANSACTION, 2)
      _common.select_rowInContainer(cnt.uuid.TRANSACTION)
      cy.wait(1000)//required waits
      _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTION, app.GridCells.LINE_TYPE, lineType)
      _common.saveCellDataToEnv(cnt.uuid.TRANSACTION, app.GridCells.AMOUNT_SMALL, TransactionAmount)
    })
  })

  it("TC - Verify Performance Entry Sheets container record", function () {
    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PERFORMANCE_ENTRY_SHEETS, app.FooterTab.PERFORMANCE_ENTRY_SHEETS, 2)
      _common.setup_gridLayout(cnt.uuid.PERFORMANCE_ENTRY_SHEETS, CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS);
      _common.select_rowInContainer(cnt.uuid.PERFORMANCE_ENTRY_SHEETS)
      _common.assert_cellData_insideActiveRow(cnt.uuid.PERFORMANCE_ENTRY_SHEETS, app.GridCells.PES_VALUE, Cypress.env("TransactionAmount"))
      cy.wait(2000)//required waits
    })
  })

  it("TC - Verify Transaction Total in Reconciliation container", function () {
    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RECONCILIATION, app.FooterTab.RECONCILIATION, 3)
      _common.setup_gridLayout(cnt.uuid.RECONCILIATION, CONTAINER_COLUMNS_RECONCILIATION);
      _common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, "From PES")
      _common.assert_cellData_insideActiveRow(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET, Cypress.env(TransactionAmount))
    })
  })

  after(() => {
    cy.LOGOUT();
    });
})
