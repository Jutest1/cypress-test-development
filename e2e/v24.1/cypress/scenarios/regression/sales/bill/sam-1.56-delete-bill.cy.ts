import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const allure = Cypress.Allure.reporter.getInterface();
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL;
let CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE;
let CONTAINERS_BILL_BOQ_STRUCTURE;

let BILL_PARAMETERS: DataCells;
let BOQ_STRUCTURE_PARAMETERS: DataCells
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.56 | Delete Bill");

describe("SAM- 1.56 | Delete Bill", () => {


  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.56-delete-bill.json").then((data) => {
      this.data = data;
      CONTAINERS_BILL_BOQ_STRUCTURE = this.data.CONTAINERS.BILL_BOQSTRUCTURE
      CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BILL_BOQSTRUCTURE
      CONTAINERS_BILL = this.data.CONTAINERS.BILL;
      CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE.UOM
      }
      BILL_PARAMETERS = {
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINERS_BILL.TYPE,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC
      }
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });
  it("TC - Create bill in billing module", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
    })
    _common.create_newRecord(cnt.uuid.BILLS)
    _common.waitForLoaderToDisappear()
    _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETERS)
    cy.SAVE()
  })
  it("TC - Crate BoQ and BoQ Structure for bill", function () {
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.setDefaultView(app.TabBar.APPLICATIONS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQS, 0);
      _common.clear_subContainerFilter(cnt.uuid.BILL_BOQ,)

    })
    _common.create_newRecord(cnt.uuid.BILL_BOQ)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE)
    })
    _common.select_rowInContainer(cnt.uuid.BILLBOQSTRUCTURE)
    _common.create_newRecord(cnt.uuid.BILLBOQSTRUCTURE)
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BILLBOQSTRUCTURE, BOQ_STRUCTURE_PARAMETERS);
     cy.SAVE()
  })
  it("TC - Create copy of bill", function () {
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0)
    })
    _common.search_inSubContainer(cnt.uuid.BILLS, BILL_DESC)
    _common.clickOn_toolbarButton(cnt.uuid.BILLS, btn.ToolBar.ICO_COPY_PASTE_DEEP)
    cy.wait(1000)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    cy.wait(1000)
    _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })
  it("TC - Delete bill", function () {
    _common.clear_subContainerFilter(cnt.uuid.BILLS)
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.BILLS, BILL_DESC+" - Copy")
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.DESCRIPTION_INFO, BILL_DESC+" - Copy")
    _common.delete_recordFromContainer(cnt.uuid.BILLS)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _validate.verify_isRecordDeleted(cnt.uuid.BILLS, BILL_DESC)
  })

  after(() => {
    cy.LOGOUT();
  });
})               