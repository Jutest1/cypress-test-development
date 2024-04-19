
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import Sidebar from "cypress/locators/sidebar";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage, _billPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "WIP-Conversion-Test-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT_DESC" + Cypress._.random(0, 999);
const WIP_DESC = "WIP_DESC" + Cypress._.random(0, 999);
const Bill_DESC = "Bill_DESC" + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS: DataCells;
let BID_PARAMETERS: DataCells;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells

let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_WIP;
let CONTAINER_COLUMNS_WIP;
let CONTAINER_COLUMNS_CURRENCY_CONVERSION;
let CONTAINERS_CONTRACTS;
let CONTAINER_COLUMNS_CONTRACTS;
let CONTAINER_COLUMNS_BIDS;
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL;

allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.55 | Currency Conversion Change Currency On Bill Header And Check Net And Gross Amounts")

describe("SAM- 1.55 | Currency Conversion Change Currency On Bill Header And Check Net And Gross Amounts", () => {


  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.55-currency-conversion-change-currency-on-bill-header-and-check-net-and-gross-amounts.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINERS_WIP = this.data.CONTAINERS.WIP;
      CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
      CONTAINER_COLUMNS_CURRENCY_CONVERSION = this.data.CONTAINER_COLUMNS.CURRENCY_CONVERSION
      CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS;
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
      CONTAINERS_BILL = this.data.CONTAINERS.BILL;
      CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
    }
    BOQ_STRUCTURE_PARAMETERS={
      [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
      [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
      [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
      [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
      [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
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
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });
  });

  it("TC - Create BOQ header and BOQ structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
        _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        //_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
});

it("TC - Create Bid And Assign BoQ", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.BID);

  _common.openTab(app.TabBar.BID).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
  });
  _common.create_newRecord(cnt.uuid.BIDS);
  _common.waitForLoaderToDisappear()
  cy.wait(1000)
  _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETERS)
  _common.waitForLoaderToDisappear()
  _common.getText_fromCell(cnt.uuid.BIDS, app.GridCells.CURRENCY_FK).then(($ele1: JQuery<HTMLElement>) => {
    Cypress.env("CURRENCY", $ele1.text())
  })
});

it("TC- Change Bid Status", function () {
  _common.openTab(app.TabBar.BID).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
  })
  _common.select_rowInContainer(cnt.uuid.BIDS)
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
   _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
  _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
});

it("TC- Create Contract From Wizard", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
  _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
  _common.waitForLoaderToDisappear()
});

it("TC- Change Contract Status", function () {
  _common.openTab(app.TabBar.CONTRACTS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
    _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
  })
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
  _common.changeStatus_fromModal(sidebar.SideBarOptions.CONTRACTED);
  cy.SAVE()
  _common.clear_subContainerFilter(cnt.uuid.CONTRACTS);
  _common.select_rowInContainer(cnt.uuid.CONTRACTS)
});

it("TC- Create WIP", function () {
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
  _wipPage.create_WIPfrom_Wizard(WIP_DESC);
  _common.openTab(app.TabBar.WIP).then(() => {
    _common.setDefaultView(app.TabBar.WIP)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
  })
  _common.openTab(app.TabBar.WIPBOQ).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
  })
  _wipPage.updateQuantity_inWIPBoqStructure(CONTAINERS_WIP.QUANTITY);
  cy.SAVE()
  _common.waitForLoaderToDisappear()

});

  it("TC - create bill from wizard", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    cy.SAVE()
    _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL,CONTAINERS_BILL.TYPE,Sidebar.SideBarOptions.WIP, Bill_DESC );
  });


  it("TC - Change Bill Status", function () {   
     _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.CHANGE_BILL_STATUS);
    _common.changeStatus_fromModal(sidebar.SideBarOptions.BPA_Billed);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("NetAmount", $ele1.text())
    })
  })
  it("TC- Copy Bill", function () {

    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
    })
    _common.clickOn_toolbarButton(cnt.uuid.BILLS, btn.ToolBar.ICO_COPY_PASTE_DEEP)
    cy.wait(1000)
    _modalView.acceptButton(btn.ButtonText.NEXT);
    cy.wait(1000)
    _modalView.acceptButton(btn.ButtonText.FINISH);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, Bill_DESC + " - Copy")
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, Bill_DESC + " - Copy")
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, Cypress.env("NetAmount"))
  })
  it("TC - Verify Currency Conversion In Billing ", function () {
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, Bill_DESC + " - Copy")
    _common.edit_dropdownCellWithInput(cnt.uuid.BILLS, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIP.USD)
    cy.SAVE()
    _validate.validate_Text_message_In_PopUp(CONTAINERS_BILL.VALIDATION_MSG)

    _modalView.findModal().acceptButton(btn.ButtonText.CANCEL);
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, Bill_DESC + " - Copy")
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.CURRENCY_FK, CONTAINERS_WIP.EUR)
  });

  after(() => {
    cy.LOGOUT();
  });
});








