import { tile, app, cnt, generic, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { isNull } from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
let qtoquantity;
let qtounitrate;

allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 3.4 | Create progress invoice bill from qto ");

describe("SAM- 3.4 | Create progress invoice bill from qto", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-3.4-create-progress-invoice-bill-from-qto.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    )

    cy.fixture("sam/sam-3.3-create-progress-invoice-bill2-from-the-2nd-WIP-periods.json").then((data) => {
      this.data = data;
      const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.Projects)
      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem();
      _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
    });
    _common.select_rowInContainer(cnt.uuid.Projects)
  });
  it("TC - Create new BoQ header", function () {
    const BOQ_HEADER_GRID = this.data.BoQHeader.Column_Headers
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.project)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.BoQs).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_HEADER_GRID)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_HEADER_DESC)
    _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO, BOQ_HEADER_DESC, BOQ_ROOT_ITEM)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _boqPage.textOfBoQCode(app.GridCells.BRIEF_INFO);
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
  });
  it("TC - Create BoQ Structure", function () {

    const BOQSTRUCTUREGRID = this.data.BoqStructure.Column_Headers;
    const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
    const DATACELLS: DataCells = {
      [app.GridCells.BRIEF_INFO]: BOQSTRUCT_DESC,
      [app.GridCells.QUANTITY_SMALL]: BOQSTRUCTUREINPUTS.Quantity,
      [ app.GridCells.PRICE]: BOQSTRUCTUREINPUTS.UnitRate,
      [app.GridCells.BAS_UOM_FK]: BOQSTRUCTUREINPUTS.Uom
    };
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID)
    });
    _boqPage.enterRecord_toCreateBoQStructure_V1(cnt.uuid.BOQ_STRUCTURES, DATACELLS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });
  
  it("TC - Create new sales bid", function () {
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const BIDCREATION = this.data.BidCreation.bidInputs;
    const BID_PARAMETER: DataCells = {
      [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
      [app.InputFields.INPUT_GROUP_CONTENT]: BIDCREATION.businessPartner,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
    };
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.bid);
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS);
    _common.create_newRecord(cnt.uuid.BIDS);
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _bidPage.changeStatus_BidRecord()
  });

  it("TC - Create Contract by wizard and change status", function () {
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    _common.openSidebarOption(STANDARDINPUTS.wizard)
    _common.search_fromSidebar(STANDARDINPUTS.wizard1, STANDARDINPUTS.createContract);
    _common.waitForLoaderToDisappear()
    _saleContractPage.create_ContractFromWizardinBID(CONTRACT_DESC)
    _saleContractPage.changeStatus_ContractRecord()
    cy.SAVE()
  })
  it("TC - Create QTO by wizard and change status", function () {
      const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
      const QTOCREATION = this.data.QTOPage.qtoInputs;
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.qto)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.QtoHeader).then(()=>{
      _common.setDefaultView(app.tabBar.QtoHeader)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header,app.FooterTab.QUANTITYTAKEOFFHEADER)
    })
    _common.clear_subContainerFilter(cnt.uuid.Quantity_Takeoff_Header)
    _common.create_newRecord(cnt.uuid.Quantity_Takeoff_Header);
    _salesPage.enter_dataToCreate_QTOHeader(QTOCREATION.item, QTO_DESC, CONTRACT_DESC, BOQ_HEADER_DESC);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.SAVE();
  })
  it("TC- Create quantity takeoff and verify result", function () {
    const QUANTITYTAKEOFFDETAILS = this.data.quantityTakeoffPage.quantityTakeOffInputs;
    const QUANTITYTAKEOFFDETAILSHEADER = this.data.quantityTakeoffPage.Column_Headers;
    const billofQuantityHeader = this.data.quantityTakeoffPage.Column_Headers2;
    _common.openTab(app.tabBar.detail).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
      _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,billofQuantityHeader)
    })
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.detail).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 0);
      _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,QUANTITYTAKEOFFDETAILSHEADER)
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _salesPage.enter_recordToCreate_quantityTakeOffDetail(BOQ_HEADER_DESC, BOQSTRUCT_DESC, QUANTITYTAKEOFFDETAILS.value);
    cy.SAVE();
    _common.openTab(app.tabBar.detail).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
    })
    _common.getText_fromCell(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY).then(($QTO_QUANTITY) => {
      Cypress.env("QTO_QUANTITY", parseFloat($QTO_QUANTITY.text()))  
      qtoquantity=Cypress.env("QTO_QUANTITY")
    })
    _common.getText_fromCell(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,  app.GridCells.PRICE).then(($UNIT_RATE) => {
      Cypress.env("UNIT_RATE", ($UNIT_RATE.text()))
      qtounitrate=Cypress.env("UNIT_RATE")   
    })
  })
  it("TC - Create bill from QTO", function () {
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const BILLCREATION = this.data.billPage.billPageInputs;
    _common.openSidebarOption(STANDARDINPUTS.wizard)
    _common.search_fromSidebar(STANDARDINPUTS.wizard1, STANDARDINPUTS.createBillOption);
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _billPage.create_BillFromWizard_throughQTO(BILLCREATION.category, BILLCREATION.billDescription, BILLCREATION.contractType, BILLCREATION.performDate, BILLCREATION.performTo);
  })

  it("TC - Verify quantity in the Bill BoQ should be come from QTO", function () {
   _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
     _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
   })
   _common.select_rowHasValue(cnt.uuid.BILLBOQSTRUCTURE,BOQSTRUCT_DESC)
  _common.assert_forNumericValues(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, qtoquantity.toString())
  })

  it("TC - Verify net Amount of Bills", function () {
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const NETAMOUNTINPUTS = this.data.billPage.ColumnHeaders2
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.billing);
    _common.openTab(app.TabBar.BILLS).then(()=>{
      _common.setDefaultView(app.TabBar.BILLS)
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.BILLS,NETAMOUNTINPUTS)
      _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem();
      _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO)
    })
    let finalnetAmount =  qtoquantity* qtounitrate
    _common.assert_forNumericValues(cnt.uuid.BILLS, app.gridCells.AMOUNT_NET_OC, finalnetAmount.toString())
  })
})
after(() => {
  cy.LOGOUT();
});