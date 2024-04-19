import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _boqPage, _estimatePage, _bidPage, _saleContractPage, _salesPage, _billPage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

  const allure = Cypress.Allure.reporter.getInterface();
  const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BILL_PARAMETERS: DataCells
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILLS;
let MODAL_CREATE_BID
let CONTAINER_COLUMNS_BIDS


  allure.epic("SALES");
  allure.feature("Sales-Bill");
  allure.story("SAM- 2.10 | Transaction creation for selected items in bill module using wizard under billing module");
  describe("SAM- 2.10 | Transaction creation for selected items in bill module using wizard under billing module", () => {
    beforeEach(function () {
      cy.fixture("sam/sam-2.10-scenario-transaction-creation-for-selected-items-in-Bill-Module-using-wizard-under-Billing-module.json").then((data) => {
        this.data = data;
      });
    });
  
    before(function () {
      cy.preLoading(
        Cypress.env("adminUserName"),
        Cypress.env("adminPassword"),
        Cypress.env("parentCompanyName"),
        Cypress.env("childCompanyName")
      );
      cy.fixture("sam/sam-2.10-scenario-transaction-creation-for-selected-items-in-Bill-Module-using-wizard-under-Billing-module.json").then((data) => {
        this.data = data;
        MODAL_CREATE_BID = this.data.MODALS.CREATE_BID
        CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
        CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
        CONTAINERS_BILL = this.data.CONTAINERS.BILL
        CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILL
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
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }
        PROJECTS_PARAMETERS = {
          [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
          [commonLocators.CommonLabels.NAME]: PRJ_NAME,
          [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
        }
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
  
         BILL_PARAMETERS = {
          [commonLocators.CommonLabels.BILL_TYPE]: CONTAINERS_BILL.BILL_TYPE,
          [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
          [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
          [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_BILL.BOQ_SOURCE,
          [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
  
        }
        /* Open desktop should be called in before block */
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
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
})

  
    it("TC - Create new BoQ record", function () {
      _common.waitForLoaderToDisappear()
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
      //  _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
      });
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
  
    });
  
    it("TC - Create new estimate record", function () {
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
    it("TC - Verify generate line item wizards option", function () {
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
    it("TC - Verify assign resource to line item", function () {
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.maximizeContainer(cnt.uuid.RESOURCES)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      
    });
  
    it("TC - Create new sales bid", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
      _common.waitForLoaderToDisappear()
      _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
  
      _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
        _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
      })
  _common.saveCellDataToEnv(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,"FINAL_PRICE")
      _common.openTab(app.TabBar.BIDBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
        _common.select_rowInSubContainer(cnt.uuid.BIDBOQS)
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
      _bidPage.verifyBidQuantity_inBoQStructure(CONTAINERS_BOQ_STRUCTURE.QUANTITY);
      cy.SAVE()
      _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
      })
      _common.select_rowInContainer(cnt.uuid.BIDS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    });
  
    it("TC - Create Sales Contract using Wizard option", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
      _common.waitForLoaderToDisappear()
      _saleContractPage.create_contract_fromWizard(CONTRACT_DESC)
      _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.setDefaultView(app.TabBar.CONTRACTS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    });
      cy.SAVE()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
      _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED)
      cy.SAVE()
    });
    it("TC - create bill from wizard", function () {
      _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL,CONTAINERS_BILL.TYPE,sidebar.SideBarOptions.CONTRACT ,BILL_DESC);
      _common.waitForLoaderToDisappear()
    });
    it("TC - Verify quantity in BoQ structure", function () { 
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE,CONTAINER_COLUMNS_BOQ_STRUCTURE)
      })
      _salesPage.assign_And_veify_Quantity_BoQStructure_inBills(CONTAINERS_BILL.QUANTITY);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_BILL_STATUS);
      _common.changeStatus_fromModal( Sidebar.SideBarOptions.BPA_Billed);
    });
    it("TC - Generate transaction and verify for selected item", function () {
       _billPage.createTransactionRecord_ForSelected_byWizardOption()
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_TRANSACTION_FOR_SELECTED);
       _common.waitForLoaderToDisappear()
       cy.REFRESH_CONTAINER();
       _common.waitForLoaderToDisappear()
       _common.openTab(app.TabBar.APPLICATIONS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BILL_TRANSACTION, app.FooterTab.TRANSACTION);

    });
       _billPage.VerifyTransactionRecord() 
      });
      after(() => {
        cy.LOGOUT();
      }); 
});
