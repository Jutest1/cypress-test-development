import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _materialPage, _controllingUnit, _procurementPage } from "cypress/pages";

import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
const allure = Cypress.Allure.reporter.getInterface();

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
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


let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS: DataCells

let MODAL_REQUEST_FOR_QUOTE

let CONTAINER_COLUMNS_RFQ

let CONTAINER_COLUMNS_QUOTE

let CONTAINERS_QUOTE_BOQ_STRUCTURE

let CONTAINER_COLUMNS_CONTRACT


let UPDATE_BOQ_VERSION_PARAMETER: DataCells


allure.epic("PROCUREMENT AND BPM");
allure.feature("Material");
allure.story("PCM- 1.44 | Update BoQ Version");
describe("PCM- 1.44 |  Update BoQ Version", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-1.44-update-boq-version.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("pcm/pcm-1.44-update-boq-version.json").then((data) => {
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
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER_2]
      }

      CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ

      CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE

      CONTAINERS_QUOTE_BOQ_STRUCTURE = this.data.CONTAINERS.QUOTE_BOQ_STRUCTURE

      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

      UPDATE_BOQ_VERSION_PARAMETER = {
        [commonLocators.CommonLabels.REQUISITION]: commonLocators.CommonLabels.REQUISITION,
        [commonLocators.CommonLabels.QUOTATION]: commonLocators.CommonLabels.QUOTATION,
        [commonLocators.CommonLabels.PES]: commonLocators.CommonLabels.PES,
        [commonLocators.CommonLabels.CONTRACT]: commonLocators.CommonLabels.CONTRACT
      };

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.setDefaultView(app.TabBar.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

    });
  });
  after(() => {
    cy.LOGOUT();
});
  it("TC - Create controlling unit", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
      _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_DESC)
    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CONTROLLING_UNIT_CODE")

  });
  it("TC - Create BOQ header and BOQ structure", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.setDefaultView(app.TabBar.BOQS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.maximizeContainer(cnt.uuid.BOQS)
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
  });
  it('TC - Create new estimate record', function () {

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
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
  });

  it("TC - Generate boq line item", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)


    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.SAVE();
  });

  it("TC - Create BoQ package from the estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
    _common.waitForLoaderToDisappear()
    cy.wait(1000) // This wait required as UI takes time to load
  })

  it("TC - Change package status", function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PK-Code"))

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create requisition from package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    cy.wait(2000) // This wait required as UI takes time to load
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.waitForLoaderToDisappear()
  })
  it("TC - Change requisition status", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.select_rowInContainer(cnt.uuid.REQUISITIONS)

    _common.openTab(app.TabBar.REQUISITIONBOQS).then(function () {
      _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

    })
    _common.clickOn_cellHasIcon(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.edit_containerCell(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY_2)
    _common.edit_containerCell(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY_2)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()
  })
  it("TC - Create RFQ from requisition", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _common.waitForLoaderToDisappear()
    _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Change RFQ status", function () {
    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
      _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create quote", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _common.waitForLoaderToDisappear()

    _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER_2], [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK])
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Updated BoQ Structure under quote", function () {
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
      _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.QUOTES)
    _common.select_rowHasValue(cnt.uuid.QUOTES, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER)
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.QUOTEBOQSTRUCTURE)
    })
    _common.maximizeContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.select_allContainerData(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.clickOn_toolbarButton(cnt.uuid.QUOTEBOQSTRUCTURE, btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasIcon(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)

    _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UNIT_RATE)
    _common.select_activeRowInContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.QUOTEBOQSTRUCTURE)

    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
    })
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.QUOTES)
    _common.select_rowHasValue(cnt.uuid.QUOTES, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER_2)
    _common.clickOn_cellHasIcon(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.UNIT_RATE)
    _common.select_activeRowInContainer(cnt.uuid.QUOTEBOQSTRUCTURE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  })

  it("TC - Change quote status", function () {
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES)
    _common.select_rowHasValue(cnt.uuid.QUOTES, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create contract", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    cy.wait(1000) // This wait required as UI takes time to load
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Update contract status and Create PES", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_PROJECTS.CLERK[0])
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_REQ_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_PROJECTS.CLERK[1])
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE"))
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
      _common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
    })
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQS, BOQ_DESC)
    _common.waitForLoaderToDisappear()

    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.GridCells.FINAL_PRICE_SMALL, "CONTRACT_UNIT_RATE", BOQ_ROOT_ITEM)
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(function () {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

    })
    _common.clickOn_cellHasIcon(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.edit_containerCell(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY_2)
    _common.edit_containerCell(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY_2)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    _common.waitForLoaderToDisappear()
    cy.wait(1000) // This wait is required as loader takes time to load
  })

  it("TC - Update PES status and PES BoQ quantity", function () {
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1)
      _common.waitForLoaderToDisappear()
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.waitForLoaderToDisappear()
        _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
        _common.waitForLoaderToDisappear()

      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.PES_BOQS_STRUCTURE)
    })
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    })
    _common.clear_subContainerFilter(cnt.uuid.HEADERS)

    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1)
      _common.waitForLoaderToDisappear()
    })
    _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
    _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
    })
    _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE, btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()

    _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
    _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_BOQ_STRUCTURE.QUANTITY)
    _common.select_activeRowInContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, "PES_FINAL_PRICE")
    _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify Status Option In all Modules", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
    })
    _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, "REQUSITION_STATUS")

    _common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUISITIONS, sidebar.SideBarOptions.CONTRACT)

    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    })
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, "CONTRACT_STATUS")
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, sidebar.SideBarOptions.QUOTE)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
    })
    _common.select_rowHasValue(cnt.uuid.QUOTES, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER)
    _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.STATUS_FK, "QUOTES_STATUS")
  })
  it("TC - Verify Status Option In customizing", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES);
    cy.REFRESH_CONTAINER();
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonLabels.QUOTATION_STATUS);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, commonLocators.CommonLabels.QUOTATION_STATUS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
    });
    cy.wait(1000);
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, Cypress.env("QUOTES_STATUS"));
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ORDERED, commonLocators.CommonKeys.UNCHECK);
    cy.SAVE();

    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonLabels.REQUISITION_STATUS);
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, commonLocators.CommonLabels.REQUISITION_STATUS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
    });
    cy.wait(1000);
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, Cypress.env("REQUSITION_STATUS"));
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ORDERED, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_CANCELED, commonLocators.CommonKeys.UNCHECK);

    cy.SAVE();

    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonLabels.CONTRACT_STATUS);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME,commonLocators.CommonLabels.CONTRACT_STATUS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
    });
    cy.wait(1000);
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, Cypress.env("CONTRACT_STATUS"));
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ORDERED, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_CANCELED, commonLocators.CommonKeys.UNCHECK);

    cy.SAVE();

    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.PES_STATUS);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, commonLocators.CommonKeys.PES_STATUS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
    });
    cy.wait(1000);
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, sidebar.SideBarOptions.ACCEPTION);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_CANCELED, commonLocators.CommonKeys.UNCHECK);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_PROTECTED, commonLocators.CommonKeys.UNCHECK);
    cy.SAVE();
_common.waitForLoaderToDisappear()
  })
  it("TC - Update BOQ structure", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.select_allContainerData(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURES, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "2")
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
    })
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_VERSION_BOQ);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toUpdateVersionBoQ(UPDATE_BOQ_VERSION_PARAMETER)


  });

  it("TC - Verify Package Boq Structure Quantity", function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
    })
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

    })
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, "PKG_QUANTITY")
    _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, "PKG_UNIT_RATE")

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
    })
    _common.maximizeContainer(cnt.uuid.PACKAGE)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.PACKAGE, commonLocators.CommonLabels.REQUISITION)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify requisition Quantity", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
    })
    _common.select_rowInContainer(cnt.uuid.REQUISITIONS)

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

    })
    _common.clickOn_cellHasIcon(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.assert_forNumericValues(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("PKG_QUANTITY"))
    _common.assert_forNumericValues(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRICE_SMALL, Cypress.env("PKG_UNIT_RATE"))
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
    })

    _common.maximizeContainer(cnt.uuid.REQUISITIONS)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUISITIONS, sidebar.SideBarOptions.QUOTE)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
    })
    _common.select_rowHasValue(cnt.uuid.QUOTES, sidebar.SideBarOptions.RECORDED)
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

    })

    _common.clickOn_cellHasIcon(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.assert_forNumericValues(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("PKG_QUANTITY"))
    _common.assert_forNumericValues(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, Cypress.env("PKG_UNIT_RATE"))
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
    })
    _common.maximizeContainer(cnt.uuid.QUOTES)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, commonLocators.CommonLabels.PES)

    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)

    })
    _common.select_rowInContainer(cnt.uuid.HEADERS)

    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
      _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

    })
    _common.clickOn_cellHasIcon(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("PKG_QUANTITY"))
    _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.PRICE_SMALL, Cypress.env("PKG_UNIT_RATE"))
  })


})
