import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _validate, _salesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { isNull } from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STRUCTURE-DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const BID_DESC = "BID_DESC-" + Cypress._.random(0, 999);
const UNIT_RATE = 'UNIT_RATE'
const WIP_FINAL_PRICE = "WIP_FINAL_PRICE";
const COST_TOTAL = 'COST_TOTAL'

let BOQ_PARAMETERS: DataCells,
  BOQ_STRUCTURE_PARAMETERS: DataCells,
  ESTIMATE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  GENERATE_LINE_ITEMS_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS,
  CONTAINERS_BOQ_STRUCTURE,
  CONTAINER_COLUMNS_BOQ_STRUCTURE,
  CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_BID,
  CONTAINERS_LINE_ITEM,
  CONTAINER_COLUMNS_BID,
  CONTAINER_WIP,
  CONTAINER_COLUMNS_BILL,
  CONTAINER_BILL,
  CONTAINER_RESOURCE,
  CONTAINER_COLUMNS_WIP_BOQSTRUCTURE
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.73 | Sales Process V3");

describe("SAM- 1.73 | Sales Process V3", () => {
  before(function () {
    cy.fixture("sam/sam-1.73-sales-process-V3.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_WIP = this.data.CONTAINERS.WIP
      CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
      CONTAINER_BILL = this.data.CONTAINERS.BILL
      CONTAINER_RESOURCE = this.data.CONTAINERS.RESOURCE,
      CONTAINER_BID = this.data.CONTAINERS.BID
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_COLUMNS_WIP_BOQSTRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQSTRUCTURE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINER_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINER_RESOURCE.CODE,
      }
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  });

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
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new Estimate header record and Assembly generate Line item and Resources ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
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
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify generate line item ", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    cy.wait(1000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()

  });

  it("TC - Assign resource to line item ", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.wait(1000) //required wait to load page
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, COST_TOTAL)
  })

  it("TC - Create new sales bid", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait to load page
    _salesPage.enterRecord_toCreate_BID_from_Estimate(BID_DESC, CONTAINER_BID.BUSINESS_PARTNER, CONTAINER_BID.SOURCE_LEAD)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BID)
    _common.waitForLoaderToDisappear()
    cy.wait(2000)
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
    });
    cy.REFRESH_CONTAINER()
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env(COST_TOTAL))
    _bidPage.changeStatus_BidRecord();
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create sales contract using wizard option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    cy.wait(2000) //required wait to load page
    _saleContractPage.createContractRecord_byWizardOption(BID_DESC)
    cy.wait(2000) //required wait to load page
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env(COST_TOTAL))
    _modalView.findInputFieldInsideModal

  });

  it("TC - Create wip record from wizard option", function () {
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _saleContractPage.changeStatus_ContractRecord();
      _saleContractPage.selectContract();
    })
    cy.REFRESH_CONTAINER();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    cy.wait(1000) //required wait to load page
    _wipPage.create_WIPfrom_Wizard(WIP_DESC)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Update BoQ quantity in wip module", function () {
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQSTRUCTURE)
    })
    _wipPage.updateQuantity_inWIPBoqStructure(CONTAINER_WIP.UPDATED_QUANTITY);
    cy.SAVE()
    _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PRICE_SMALL, UNIT_RATE)
    _wipPage.changeStatus_WipRecord();
  });

  it("TC - Verify wip quantity and net amount", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
      _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_BID)
    });
    _common.search_inSubContainer(cnt.uuid.WIP, WIP_DESC)
    _common.saveCellDataToEnv(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, WIP_FINAL_PRICE)
    _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.WIP, Cypress.env(UNIT_RATE), CONTAINER_WIP.UPDATED_QUANTITY, app.GridCells.AMOUNT_NET)
  })

  it("TC - Verify the wip net amount with bill net amount", function () {
    _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINER_BILL.TYPE, CONTAINER_BILL.MODULE, BILL_DESC)
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
      _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, Cypress.env(WIP_FINAL_PRICE))
    });
  });

  after(() => {
    cy.LOGOUT();
  });

});


