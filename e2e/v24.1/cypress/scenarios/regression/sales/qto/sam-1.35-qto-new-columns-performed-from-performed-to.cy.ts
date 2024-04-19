
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _modalView, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO_DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT_DESC" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const BILL_NO = ":BILL_NO-" + Cypress._.random(0, 999);
const BILL_DESC_1 = "BILL_DESC_1-" + Cypress._.random(0, 999);
const WIP_DESC_1 = "WIP_DESC_1" + Cypress._.random(0, 999);


let PROJECTS_PARAMETERS: DataCells;
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
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let MODAL_CREATE_BID
let CONTAINERS_BILL
let CONTAINER_COLUMNS_BILL
let CONTAINER_COLUMNS_WIP
let BILL_PARAMETER


allure.epic("SALES");
allure.feature("Sales-QTO");
allure.story("SAM- 1.35 | QTO New Columns Performed from, Performed to");
describe("SAM- 1.35 | QTO New Columns Performed from, Performed to ", () => {

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.35-qto-new-columns-performed-from-performed-to.json").then((data) => {
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
      CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
      CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
      MODAL_CREATE_BID = this.data.MODALS.CREATE_BID

      BILL_PARAMETER={
        [commonLocators.CommonLabels.BILL_TYPE]:commonLocators.CommonKeys.PROGRESS_INVOICE,
        [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC_1,
        [app.GridCells.DESCRIPTION_INFO]:[QTO_DESC],
        [commonLocators.CommonKeys.VALUE]:[commonLocators.CommonKeys.CHECK]
    }

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
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      };

      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
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
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
  });
  it('TC - Create new estimate record', function () {
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
  });
  it("TC- Generate Line item from BoQ", function () {
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
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)

  });
  it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
  });
  it("TC - Create BID from Wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _common.waitForLoaderToDisappear()
        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID,BID_DESC,  MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
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
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(sidebar.SideBarOptions.CONTRACTED);
        cy.SAVE()
  });
  it("TC - Create QTO and add New Columns Performed from, Performed to", function () {
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
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_HEADER,app.GridCells.PERFORMED_FROM,app.InputFields.INPUT_GROUP_CONTENT,_common.getDate("current"))
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_HEADER,app.GridCells.PERFORMED_TO,app.InputFields.INPUT_GROUP_CONTENT,_common.getDate("incremented", 3))
        cy.SAVE();
        _common.waitForLoaderToDisappear()
  });
  it("TC - Create quantity takeoff and create WIP", function () {
        _common.openTab(app.TabBar.DETAIL).then(() => {
        _common.setDefaultView(app.TabBar.DETAIL)
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
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_BILL_OF_QUANTITY_LOOKUP.VALUE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITYTAKEOFFHEADER)
            _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        })
  })
  it("TC - Verify Dates in Wip", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_WIP);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP)
        _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.WIP,app.GridCells.PERFORMED_FROM,_common.getDate("current"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.WIP,app.GridCells.PERFORMED_TO,_common.getDate("incremented", 3))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.SAVE()
  })
  it("TC-  Create bill from WIP", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _common.waitForLoaderToDisappear()
        _billPage.create_bill_fromWizard(BILL_PARAMETER)
         cy.wait(1000); //required Wait 
         _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)
        _common.openTab(app.TabBar.BILLS).then(() => {
        _common.setDefaultView(app.TabBar.BILLS)
        _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS);
        _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        _common.select_rowInContainer(cnt.uuid.BILLS)
  });
  it("TC - Verify Dates in BILL", function () {
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.setDefaultView(app.TabBar.BILLS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
            _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS,app.GridCells.PERFORMED_FROM,_common.getDate("current"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS,app.GridCells.PERFORMED_TO,_common.getDate("incremented", 3))
  })

  after(() => {
    cy.LOGOUT();
  });
});
