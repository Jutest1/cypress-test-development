import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { isNull } from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO_DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL_DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT_DESC" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let BID_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_CONTRACTS;
let CONTAINER_COLUMNS_CONTRACTS;
let CONTAINER_COLUMNS_BIDS;
let CONTAINERS_QUANTITY_TAKEOFF_HEADER;
let CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER;
let CONTAINERS_BILL_OF_QUANTITY_LOOKUP;
let CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP;

let CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL;
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL_BOQS;
let CONTAINER_COLUMNS_BILLS;


allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 3.4 | Create progress invoice bill from qto ");

describe("SAM- 3.4 | Create progress invoice bill from qto", () =>{

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture("sam/sam-3.4-create-progress-invoice-bill-from-qto.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS;
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      CONTAINERS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINERS.QUANTITY_TAKEOFF_HEADER
      CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_HEADER
      CONTAINERS_BILL_OF_QUANTITY_LOOKUP = this.data.CONTAINERS.BILL_OF_QUANTITY_LOOKUP
      CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY_LOOKUP
      CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_DETAIL
      CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
      CONTAINERS_BILL = this.data.CONTAINERS.BILL
      CONTAINER_COLUMNS_BILL_BOQS = this.data.CONTAINER_COLUMNS.BILL_BOQS
      CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILLS
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      BID_PARAMETERS = {
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_CONTRACTS.BUSINESS_PARTNER,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC,
      }
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
    });
  });
  it("TC - Create new Project and Pinned it", function () {
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
  })

it("TC - Create BOQ header and BOQ structure", function () {
  _common.openTab(app.TabBar.BOQS).then(() => {
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
    _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
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
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
  });
  _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
  cy.SAVE()
  _common.waitForLoaderToDisappear()
});
it("TC - Create bid", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BID);
  _common.openTab(app.TabBar.BID).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
  });
  _common.create_newRecord(cnt.uuid.BIDS);
  cy.wait(1000)
  _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETERS)
  cy.SAVE()
  _common.waitForLoaderToDisappear()

});
it("TC - Change bid status", function () {
  _common.openTab(app.TabBar.BID).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
  })
  _common.select_rowInContainer(cnt.uuid.BIDS)
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
  _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
});
it("TC - Create contract from wizard", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
  _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
  _common.waitForLoaderToDisappear()
});

it("TC - Change contract status", function () {
  _common.openTab(app.TabBar.CONTRACTS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
    _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
  })
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
  _common.changeStatus_fromModal(sidebar.SideBarOptions.CONTRACTED);
  cy.SAVE()
});
it("TC - Create QTO", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.QTOHEADER).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER)
    _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_HEADER)
    _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
  })
  _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
  cy.wait(1000)
  _salesPage.enter_dataToCreate_QTOHeader(CONTAINERS_QUANTITY_TAKEOFF_HEADER.ITEM, QTO_DESC, CONTRACT_DESC, BOQ_DESC);
  _common.waitForLoaderToDisappear()
  cy.SAVE();
});

it("TC - Create quantity takeoff and verify result", function () {
  _common.openTab(app.TabBar.DETAIL).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
    _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, CONTAINER_COLUMNS_BILL_OF_QUANTITY_LOOKUP)
  })
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.DETAIL).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 1);
    _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL)
  })
  _common.waitForLoaderToDisappear()
  _common.select_rowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
  _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, btn.ToolBar.ICO_TREE_EXPAND_ALL);
  _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)

  _common.openTab(app.TabBar.DETAIL).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 1);
    _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_DETAIL)
  })
  _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
  _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_BILL_OF_QUANTITY_LOOKUP.QUANTITY)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.DETAIL).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
  })

})
it("TC - Create bill from QTO", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BILL);
  _billPage.create_BillFromWizard_throughQTO(CONTAINERS_BILL.CATEGORY, BILL_DESC, CONTAINERS_BILL.CONTRACT_TYPE, CONTAINERS_BILL.PERFORM_DATE_FROM, CONTAINERS_BILL.PERFORM_DATE_TO);
  _common.waitForLoaderToDisappear()
});

it("TC - Verify quantity in the Bill BoQ should be come from QTO", function () {
  _common.openTab(app.TabBar.APPLICATIONS).then(() => {
    _common.setDefaultView(app.TabBar.APPLICATIONS)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQS, 0);
    _common.setup_gridLayout(cnt.uuid.BILL_BOQ, CONTAINER_COLUMNS_BILL_BOQS)
  })
  _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
  _common.openTab(app.TabBar.APPLICATIONS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
    _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
  })
  _common.select_rowHasValue(cnt.uuid.BILLBOQSTRUCTURE, BOQ_STRUCTURE_DESC)
  _common.assert_cellData_insideActiveRow(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL,CONTAINERS_BILL_OF_QUANTITY_LOOKUP.QUANTITY)
})

it("TC - Verify net Amount of Bills", function () {
  _common.openTab(app.TabBar.BILLS).then(() => {
    _common.setDefaultView(app.TabBar.BILLS)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
    _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)
  })
  _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BILLS,CONTAINERS_BILL_OF_QUANTITY_LOOKUP.QUANTITY,CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,app.GridCells.AMOUNT_NET_OC)

})

after(() => {
  cy.LOGOUT();
});
});
