import { tile, sidebar, app, cnt, btn, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _controllingUnit, _estimatePage, _mainView, _modalView, _procurementContractPage, _procurementPage, _projectPage, _rfqPage, _saleContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "pcm-" + Cypress._.random(0, 999);
const PRJ_NAME = "PCM-2.29-PRJ" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM_DESC_" + Cypress._.random(0, 999);
const PESITEM_QTY_ENV = "PESITEM_QTY_ENV" + Cypress._.random(0, 999);
const PESITEM_PRICE_ENV = "PESITEM_PRICE_ENV" + Cypress._.random(0, 999);
const PESITEM_QTYR_ENV = "PESITEM_QTYR_ENV" + Cypress._.random(0, 999);
const CHANGE_PROJECT_DESC = "CHANGE_PRJ_DESC_" + Cypress._.random(0, 999);
const CU_MAIN_01 = "CU-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_CONTROLLING_UNITS, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES, CONTAINERS_CONTRACT, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_QUOTE, CONTAINER_COLUMNS_ITEMS, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_PES, CONTAINER_COLUMNS_PES_ITEMS;

let CONTROLLING_UNIT_MAIN_PARAMETERS: DataCells, PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells, RFQ_PARAMETER: DataCells;

let MODAL_CREATE_RFQ, MODAL_CREATE_CONTRACT;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.29 | Contract termination for remaining quantities in contract & create a new requisition for same");

describe("PCM- 2.29 | Contract termination for remaining quantities in contract & create a new requisition for same", () => {

  before(function () {

    cy.fixture("pcm/pcm-2.29-contract-termination-for-remaining-quantities-in-contract-and-create-new-requisition-for-same.json").then((data) => {
      this.data = data;
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
      CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
      PROJECT_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
      };
      CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
      CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
      CONTROLLING_UNIT_MAIN_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: CU_MAIN_01,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
        [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
      }
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: EST_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS;
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
      }
      CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
      CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
      RESOURCE_PARAMETER = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0]
      };
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      MODAL_CREATE_RFQ = this.data.MODAL.CREATE_RFQ
      RFQ_PARAMETER = {
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_RFQ.BUSINESS_PARTNER[0]]
      }
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
      CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
      CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
      CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
      MODAL_CREATE_CONTRACT = this.data.MODAL.CREATE_CONTRACT
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES
      CONTAINER_COLUMNS_PES_ITEMS = this.data.CONTAINER_COLUMNS.PES_ITEMS
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
      cy.SAVE()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    });
  })

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create controlling unit", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
      _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
  });

  it("TC - Create estimate header and Create Line Item with Resource", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    cy.SAVE();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES)
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
    })
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
    cy.SAVE();
  });

  it("TC - Create/Update Material Package and Create Requisition", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
    _estimatePage.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInSubContainer(cnt.uuid.PACKAGE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  });

  it("TC - Create Request For Quote and Create Quote", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETER);
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
    cy.SAVE();
    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
      _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInSubContainer(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED);
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _rfqPage.create_quote_fromWizard([MODAL_CREATE_RFQ.BUSINESS_PARTNER[0]]);
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE);
    cy.SAVE();
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.setDefaultView(app.TabBar.QUOTES)
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
      _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInContainer(cnt.uuid.QUOTES)
    _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, "QUOTE_002")
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_ITEMS)
    })
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_MATERIAL_PRICE[0])
    cy.SAVE();
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.CHECKED);
    cy.SAVE();
  });

  it("TC - Create Contract and Create PES", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.RESPONSIBLE[0])
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CU_MAIN_01)
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
    })
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
      _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
    })
    _common.clear_subContainerFilter(cnt.uuid.HEADERS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.select_rowInSubContainer(cnt.uuid.HEADERS)
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 1)
      _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEMS);
    })
    _common.clear_subContainerFilter(cnt.uuid.ITEMS)
    _common.select_rowInContainer(cnt.uuid.ITEMS)
    _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.PES_ITEM_QUANTITY[0])
    cy.SAVE()
    _common.saveCellDataToEnv(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, PESITEM_QTY_ENV)
    _common.saveCellDataToEnv(cnt.uuid.ITEMS, app.GridCells.PRICE_SMALL, PESITEM_PRICE_ENV)
    _common.saveCellDataToEnv(cnt.uuid.ITEMS, app.GridCells.QUANTITY_REMAINING, PESITEM_QTYR_ENV)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS, commonLocators.CommonKeys.CONTRACT)
  })

  it("TC - Contract termination from wizard", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.select_rowInSubContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CONTRACT_TERMINATION);
    _saleContractPage.contractTermination_FromWizard(CommonLocators.CommonKeys.NEW_REQUISITION, 0, PRJ_NAME, CHANGE_PROJECT_DESC, CommonLocators.CommonKeys.DESIGN_CHANGE, CommonLocators.CommonKeys.CHANGE_REQUEST)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
  })

  it("TC - Verify Quantity and Material under Requisition", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2)
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_RESOURCES.MATERIAL[0])
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.QUANTITY_SMALL, Cypress.env(PESITEM_QTYR_ENV))
  })

});