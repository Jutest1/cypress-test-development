import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _boqPage, _estimatePage, _bidPage, _saleContractPage, _wipPage, _billPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO_1 = "P-2.18-" + Cypress._.random(0, 999)
const PRJ_NAME_1 = "PRJ_SAM-2.18-" + Cypress._.random(0, 999)
const BOQ_HEADER_01 = "BOQ-HEAD1-" + Cypress._.random(0, 999)
const BOQ_ITEM_01 = "BOQ-item1-" + Cypress._.random(0, 999)
const ESTIMATE_CODE_1 = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION_1 = 'EST-DESC1-' + Cypress._.random(0, 999);
const BID_01 = "BID-01-" + Cypress._.random(0, 999)
const CONTRACT_DESC_1 = "CONTRACT-01-" + Cypress._.random(0, 999)
const WIP_01 = "WIP-01-" + Cypress._.random(0, 999)
const WIP_02 = "WIP-02-" + Cypress._.random(0, 999)
const BILL_01 = "BILL-01-" + Cypress._.random(0, 999)
const BILL_02 = "BILL-02-" + Cypress._.random(0, 999)

let CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_RESOURCE, CONTAINERS_BIDS, CONTAINERS_WIP_BOQ_STRUCTURE;

let CONTAINER_COLUMNS_BOQS, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_BIDS, CONTAINER_COLUMNS_SALES_CONTRACT, CONTAINER_COLUMNS_PAYMENT_SCHEDULE, CONTAINER_COLUMNS_WIP, CONTAINER_COLUMNS_WIP_BOQS, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE, CONTAINER_COLUMNS_BILLS;

let PROJECTS_PARAMETERS: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_STRUCTURE_PARAMETERS_1: DataCells, ESTIMATE_PARAMETERS_1: DataCells, RESOURCE_PARAMETERS_1: DataCells;

let MODAL_GENERATE_BUDGET;

let GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells, DJC_BUDGET_PARAMETERS: DataCells;

ALLURE.epic("SALES");
ALLURE.feature("Sales-BID");
ALLURE.story("SAM- 2.18 | Final line in payment schedule");

describe("SAM- 2.18 | Final line in payment schedule", () => {

  before(function () {
    cy.fixture("sam/sam-2.18-final-line-in-payment-schedule.json").then((data) => {
      this.data = data;
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO_1,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME_1,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
      }
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      BOQ_PARAMETERS_1 = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEADER_01
      }
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      BOQ_STRUCTURE_PARAMETERS_1 = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_01,
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
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEADER_01
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
      };
      MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET
      DJC_BUDGET_PARAMETERS = {
        [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: CommonLocators.CommonLabels.RADIO_HIGHLETED_LINE_ITEM,
        [commonLocators.CommonLabels.BUDGET_FROM]: CommonLocators.CommonLabels.GRAND_TOTAL,
        [commonLocators.CommonLabels.X_FACTOR]: MODAL_GENERATE_BUDGET.X_FACTOR[0],
        [commonLocators.CommonKeys.INDEX]: 0,
        [commonLocators.CommonKeys.RADIO_INDEX]: 0
      }
      CONTAINERS_BIDS = this.data.CONTAINERS.BIDS
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      CONTAINER_COLUMNS_SALES_CONTRACT = this.data.CONTAINER_COLUMNS.SALES_CONTRACT
      CONTAINER_COLUMNS_PAYMENT_SCHEDULE = this.data.CONTAINER_COLUMNS.PAYMENT_SCHEDULE
      CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
      CONTAINER_COLUMNS_WIP_BOQS = this.data.CONTAINER_COLUMNS.WIP_BOQS
      CONTAINERS_WIP_BOQ_STRUCTURE = this.data.CONTAINERS.WIP_BOQ_STRUCTURE
      CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
      CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILLS
    }).then(() => {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS)
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS)
      cy.SAVE()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME_1).pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create new BoQ header and BoQ structure", function () {
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
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new estimate", function () {
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
  });

  it("TC - Genrate line item and assign resource to it", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
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

  it("TC - Create new sales bid from wizard and change status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_budgetFromDJC_fromWizard(MODAL_GENERATE_BUDGET)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _bidPage.createBidRecord_byWizardOption(BID_01, CONTAINERS_BIDS.BUSINESS_PARTNER, CommonLocators.CommonKeys.BOQ);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME_1)
    _common.select_rowInContainer(cnt.uuid.BIDS)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.SUBMITTED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create contract sales from wizard & change status with Generate payment schedule in contract", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC_1);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_SALES_CONTRACT)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME_1)
    _common.select_rowInContainer(cnt.uuid.CONTRACTS)
    _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CONTRACT_CODE", $ele1.text())
    })
    _common.select_rowHasValue(cnt.uuid.CONTRACTS, CONTRACT_DESC_1)
    _saleContractPage.changeStatus_ContractRecord();
    _common.waitForLoaderToDisappear()
    _saleContractPage.selectContract();
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PAYMENT_SCHEDULE_V1, app.FooterTab.PAYMENTSCHEDULE, 1);
      _common.setup_gridLayout(cnt.uuid.PAYMENT_SCHEDULE_V1, CONTAINER_COLUMNS_PAYMENT_SCHEDULE)
    });
    _common.clear_subContainerFilter(cnt.uuid.PAYMENT_SCHEDULE_V1)
    _common.maximizeContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
    _saleContractPage.generate_Payment_Schedule_In_Contract(sidebar.SideBarOptions.GENERATE_PAYMENT_SCHEDULE, _common.getDate(CommonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(CommonLocators.CommonKeys.INCREMENTED_SMALL, 5), CommonLocators.CommonKeys.USER_FREQUENCE, sidebar.SideBarOptions.UPDATE_PAYMENT_SCHEDULE_TARGET);
    _common.minimizeContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create WIP-1 from wizard and change status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_01);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
      _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
      _common.setup_gridLayout(cnt.uuid.WIPBOQ, CONTAINER_COLUMNS_WIP_BOQS)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
    _common.select_rowInContainer(cnt.uuid.WIPBOQ)
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
    _wipPage.updateQuantity_inWIPBoqStructure(CONTAINERS_WIP_BOQ_STRUCTURE.QUANTITY[0]);
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create bill-1 from wizard, change status and assign bill to payment schedule", function () {
    _billPage.create_BillFromWizard(Sidebar.SideBarOptions.CREATE_BILL, CommonLocators.CommonKeys.PROGRESS_INVOICE, CommonLocators.CommonKeys.WIP1, BILL_01);
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BILLS)
    _common.search_inSubContainer(cnt.uuid.BILLS, BILL_01)
    _common.select_rowInContainer(cnt.uuid.BILLS)
    _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.BILL_NO).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("BILL1_CODE", $ele1.text())
      cy.log(Cypress.env("BILL1_CODE"))
    })
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.BPA_BILLED);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS, CommonLocators.CommonLabels.CONTRACT_SALES);
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_SALES_CONTRACT)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.select_rowHasValue(cnt.uuid.CONTRACTS, Cypress.env("CONTRACT_CODE"))
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PAYMENT_SCHEDULE_V1, app.FooterTab.PAYMENTSCHEDULE, 1);
      _common.setup_gridLayout(cnt.uuid.PAYMENT_SCHEDULE_V1, CONTAINER_COLUMNS_PAYMENT_SCHEDULE)
    });
    _common.clear_subContainerFilter(cnt.uuid.PAYMENT_SCHEDULE_V1)
    _common.select_rowHasValue(cnt.uuid.PAYMENT_SCHEDULE_V1, _common.getDate(CommonLocators.CommonKeys.CURRENT_SMALL))
    cy.wait(1000).then(() => {
      _common.edit_dropdownCellWithInput(cnt.uuid.PAYMENT_SCHEDULE_V1, app.GridCells.BIL_HEADER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("BILL1_CODE"))
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.PAYMENT_SCHEDULE_V1, Cypress.env("BILL1_CODE"))
    })
    _common.getText_fromCell(cnt.uuid.PAYMENT_SCHEDULE_V1, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("Net_Amount_1", $ele1.text().replace(",", ""))
      cy.log(Cypress.env("Net_Amount_1"))
    })
    _common.getText_fromCell(cnt.uuid.PAYMENT_SCHEDULE_V1, app.GridCells.BIL_AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("Bill_Amount_Net_1", $ele1.text().replace(",", ""))
      cy.log(Cypress.env("Bill_Amount_Net_1"))
    })
    _common.select_rowHasValue(cnt.uuid.PAYMENT_SCHEDULE_V1, BILL_01)
    _common.assert_forNumericValues(cnt.uuid.PAYMENT_SCHEDULE_V1, app.GridCells.PAYMENT_BALANCE_NET, ((parseFloat(Cypress.env("Net_Amount_1"))) - (parseFloat(Cypress.env("Bill_Amount_Net_1")))).toFixed(2).toString())
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create WIP-2 from wizard and change status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_02);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
      _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.select_rowHasValue(cnt.uuid.WIP, WIP_02)
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
      _common.setup_gridLayout(cnt.uuid.WIPBOQ, CONTAINER_COLUMNS_WIP_BOQS)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
    _common.select_rowInContainer(cnt.uuid.WIPBOQ)
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
    _wipPage.updateQuantity_inWIPBoqStructure(CONTAINERS_WIP_BOQ_STRUCTURE.QUANTITY[1]);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create bill-2 from wizard, change status and assign bill to payment schedule", function () {
    _billPage.create_BillFromWizard(Sidebar.SideBarOptions.CREATE_BILL, CommonLocators.CommonKeys.PROGRESS_INVOICE, CommonLocators.CommonKeys.WIP1, BILL_02);
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BILLS)
    _common.search_inSubContainer(cnt.uuid.BILLS, BILL_02)
    _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.BILL_NO).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("BILL2_CODE", $ele1.text())
    })
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
    _common.changeStatus_fromModal(CommonLocators.CommonKeys.BPA_BILLED);
    cy.SAVE()
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS, CommonLocators.CommonLabels.CONTRACT_SALES);
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
    _common.select_rowHasValue(cnt.uuid.CONTACTS, Cypress.env("CONTRACT_CODE"))
    _common.select_tabFromFooter(cnt.uuid.PAYMENT_SCHEDULE_V1, app.FooterTab.PAYMENTSCHEDULE, 1);
    _common.setup_gridLayout(cnt.uuid.PAYMENT_SCHEDULE_V1, CONTAINER_COLUMNS_PAYMENT_SCHEDULE)
    _common.maximizeContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
    _common.select_rowHasValue(cnt.uuid.PAYMENT_SCHEDULE_V1, _common.getDate(CommonLocators.CommonKeys.CURRENT_SMALL, 5))
    cy.wait(1000).then(() => {
      _common.edit_dropdownCellWithInput(cnt.uuid.PAYMENT_SCHEDULE_V1, app.GridCells.BIL_HEADER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("BILL2_CODE"))
    })
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
  });

  it("TC - Create final bill from wizard and verify payment schedule bill amount and bill details net amount", function () {
    _wipPage.selectIsFinalAndVerifyBalanceBillAmountWithNetAmount();
  });

});