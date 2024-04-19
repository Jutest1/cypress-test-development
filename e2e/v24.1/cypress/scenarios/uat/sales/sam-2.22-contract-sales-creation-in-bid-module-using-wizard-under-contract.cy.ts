
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import cypress from "cypress";
import { tile, app, cnt, btn } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "COPY-DESC-" + Cypress._.random(0, 999);


allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 2.22 | Contract-sales creation in Bid Module using Wizard under Contract")

describe("SAM- 2.22 | Contract-sales creation in Bid Module using Wizard under Contract", () => {
    beforeEach(function () {
        cy.fixture("sam/sam-2.22-contract-sales-creation-in-bid-module-using-wizard-under-contract.json").then((data) => {
          this.data = data;
        });
    });
    
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-2.22-contract-sales-creation-in-bid-module-using-wizard-under-contract.json").then((data) => {
          this.data = data;
          const standardInputs = this.data.Prerequisites.SidebarInputs;
          /* Open desktop should be called in before block */
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.openTab(app.tabBar.project).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
          });
          _common.create_newRecord(cnt.uuid.Projects);
          _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
          cy.SAVE();
          _common.openSidebarOption(standardInputs.Search).delete_pinnedItem();
          _common.search_fromSidebar(standardInputs.searchType, PRJ_NO).pinnedItem();      
      });
    });

    it("TC - Create new BoQ record", function () {
        const boqPageInputs = this.data.BoqStructure.BoQPageInputs
        const boqGrid = this.data.boq_ColumnHeaders.column_Headers
        const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
        const standardInputs = this.data.Prerequisites.SidebarInputs;

         _common.openTab(app.tabBar.BoQs).then(() => {
         _common.setDefaultView(app.tabBar.BoQs)
          cy.wait(2000)
         _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
         _common.setup_gridLayout(cnt.uuid.BOQS, boqGrid)
         });

         _common.openTab(app.tabBar.project).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
          });
          _common.openSidebarOption(standardInputs.Search).delete_pinnedItem();
          _common.search_fromSidebar(standardInputs.searchType, PRJ_NO).pinnedItem(); 

          _common.openTab(app.tabBar.BoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
          });
         _common.clear_subContainerFilter(cnt.uuid.BOQS);
         _common.create_newRecord(cnt.uuid.BOQS);
         _boqPage.enterRecord_toCreateBoQ(BOQ_DESC)
         _common.saveCellDataToEnv(cnt.uuid.BOQS,app.GridCells.BRIEF_INFO,BOQ_DESC,BOQ_ROOT_ITEM)
         cy.SAVE();
         _boqPage.textOfBoQCode();
         _common.clickOn_toolbarButton(cnt.uuid.BOQS);
         _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
         _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
         _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureGrid)
         });
         _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC, boqPageInputs.Quantity, boqPageInputs.UnitRate, boqPageInputs.Uom);
         cy.SAVE();
    });
      

    it("TC - Create new Estimate header record and Assembly generate Line item and Resources ", function () {
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        const sideBarAction = this.data.sidebarInputs.sidebar
        const EstimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
        const estimateGrid = this.data.estimate_ColumnHeaders.column_headers
        const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers
        const resourceInputs = this.data.AssignResource.resourceInputs
        const resourcesGrid = this.data.resources_ColumnHeaders.column_headers;
        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.project);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, EST_DESC, EstimateInputs.rubricCategory, EstimateInputs.estimateType);
         cy.SAVE();
        _estimatePage.textOfEstimateCode();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        cy.wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
         });
        _common.openSidebarOption(sideBarAction.wizard)
        _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.GenerateLineItem);
        _boqPage.generate_LineItemBycode(BOQ_DESC)
        cy.wait(1000)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        cy.wait(2000)
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
        });
        cy.wait(500)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey1, resourceInputs.code1);
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,checkBidcopy.costtotal)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
    });

    it("TC - Create new sales bid", function () {
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        const bidInputs = this.data.BidCreation.bidInputs;
        _common.openSidebarOption(bidInputs.wizard1);
        _common.search_fromSidebar(bidInputs.wizard2, bidInputs.createBid);
        _salesPage.enterRecord_toCreate_BID_from_Estimate(BID_DESC,bidInputs.businessPartner,bidInputs.sourceLead)
        _common.clickOn_modalFooterButton(btn.buttonText.GoTOBid)
        cy.wait(3000)
        _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS,0);
       });
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,checkBidcopy.Verifycosttotal)
        _bidPage.changeStatus_BidRecord();
        _common.openTab(app.tabBar.bidBoQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,1); 
          });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BAS_UOM_FK,checkBidcopy.Uom)
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.QUANTITY_SMALL,checkBidcopy.BIDSTRUCTUREQUANTITY)
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.PRICE,checkBidcopy.BIDSTRUCTUREUNITRATE)
    });
  
    it("TC - Create Sales Contract using Wizard option", function () {
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        const contractInputs = this.data.ContractCreation.contractInput;
        const bidInputs = this.data.BidCreation.bidInputs;
        cy.wait(3000);
        _common.openSidebarOption(bidInputs.wizard1);
        _common.search_fromSidebar(bidInputs.wizard2, checkBidcopy.CreateContract);
        _saleContractPage.create_ContractFromWizardinBID(contractInputs.description);
        cy.wait(1000)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
        cy.wait(3000)
        _saleContractPage.changeStatus_ContractRecord();
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS,0); 
        });
        _common.search_inSubContainer(cnt.uuid.CONTACTS,contractInputs.description)
        _common.openTab(app.tabBar.contractBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE,1); 
        });
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1,BOQSTRUCT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.QUANTITY_SMALL,checkBidcopy.VerifyBidQuantity)
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.PRICE,checkBidcopy.VerifyBidUNITRATE)
      });
       
    it("TC - Assertion for capturing contract net amount ", function () {
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        const contractInputs = this.data.ContractCreation.contractInput;
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS,0); 
         });
         _common.search_inSubContainer(cnt.uuid.CONTACTS,contractInputs.description)
         _common.saveCellDataToEnv(cnt.uuid.CONTACTS,app.GridCells.AMOUNT_NET,checkBidcopy.contractnetamount)
         _common.saveCellDataToEnv(cnt.uuid.CONTACTS,app.GridCells.BUSINESS_PARTNER_FK,checkBidcopy.contractBP)
    });

    it("TC - Verify the Net amount and BP", function () {
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.CONTACTS,"Bid(1)")
        cy.wait(2000)
        _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS,0);
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,checkBidcopy.Verifycosttotal)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.BUSINESS_PARTNER_FK,checkBidcopy.VerifycontractBP)
    });

    after(() => {
      cy.LOGOUT();
    });

});


