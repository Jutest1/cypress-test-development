import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import cypress from "cypress";
import { tile, app, cnt, btn, commonLocators } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);


allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 2.31 | Update UR from estimate")

describe("SAM- 2.31 | Update UR from estimate", () => {
    beforeEach(function () {
        cy.fixture("sam/sam-2.31-update-UR-from-estimate.json").then((data) => {
          this.data = data;
        });
    });
    
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-2.31-update-UR-from-estimate.json").then((data) => {
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
        const BOQPAGEINPUTS = this.data.BoqStructure.BoQPageInputs
        const BOQGRID = this.data.boq_ColumnHeaders.column_Headers
        const BOQSTRUCTUREGRID = this.data.boqStructure_ColumnHeaders.column_Headers;
         _common.openTab(app.tabBar.BoQs).then(() => {
         _common.setDefaultView(app.tabBar.BoQs)
          cy.wait(2000)
         _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
         _common.setup_gridLayout(cnt.uuid.BOQS, BOQGRID )
         });
         _common.clear_subContainerFilter(cnt.uuid.BOQS);
         _common.create_newRecord(cnt.uuid.BOQS);
         _boqPage.enterRecord_toCreateBoQ(BOQ_DESC)
         _common.saveCellDataToEnv(cnt.uuid.BOQS,app.GridCells.BRIEF_INFO,BOQ_DESC,BOQ_ROOT_ITEM)
         cy.SAVE();
         _boqPage.textOfBoQCode();
         _common.clickOn_toolbarButton(cnt.uuid.BOQS);
         _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
         _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
         _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID )
         });
         _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC, BOQPAGEINPUTS.Quantity, BOQPAGEINPUTS.UnitRate, BOQPAGEINPUTS.Uom);
         cy.SAVE();
    });
      
    it("TC - Create new Estimate header record and Assembly generate Line item and Resources ", function () {
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        const SIDEBARACTION  = this.data.sidebarInputs.sidebar
        const ESTIMATEINPUTS  = this.data.EstimateHeader.EstimateHeaderInputs;
        const ESTIMATEGRID  = this.data.estimate_ColumnHeaders.column_headers
        const LINEITEMGRID  = this.data.lineItem_ColumnHeaders.column_headers
        const RESOURCEINPUTS = this.data.AssignResource.resourceInputs
        const RESOURCEGRID = this.data.resources_ColumnHeaders.column_headers;
        _common.openSidebarOption(SIDEBARACTION .quickStart)
        _common.search_fromSidebar(SIDEBARACTION .quickStart1, SIDEBARACTION .project);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATEGRID )
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(ESTIMATEINPUTS.newCode, EST_DESC, ESTIMATEINPUTS.rubricCategory, ESTIMATEINPUTS.estimateType);
         cy.SAVE();
        _estimatePage.textOfEstimateCode();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        cy.wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMGRID )
         });
         _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openSidebarOption(SIDEBARACTION.wizard)
        _common.search_fromSidebar(SIDEBARACTION.wizard1, SIDEBARACTION.GenerateLineItem);
        _boqPage.generate_LineItemBycode(BOQ_DESC)
        cy.wait(1000)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        cy.wait(2000)
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCEGRID)
        });
        cy.wait(500)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(RESOURCEINPUTS.shortKey1, RESOURCEINPUTS.code1);
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,checkBidcopy.costtotal)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
    });

    it("TC - Create new sales bid", function () {
        const BIDINPUTS = this.data.BidCreation.bidInputs;
        _common.openSidebarOption(BIDINPUTS.wizard1);
        _common.search_fromSidebar(BIDINPUTS.wizard2, BIDINPUTS.createBid);
        cy.wait(3000)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        cy.SAVE()
        _common.openSidebarOption(BIDINPUTS.wizard1);
        _common.search_fromSidebar(BIDINPUTS.wizard2, BIDINPUTS.createBid);
        cy.wait(3000)
        _salesPage.enterRecord_toCreate_BID_from_Estimate(BID_DESC,BIDINPUTS.businessPartner,BIDINPUTS.sourceLead)
        _common.clickOn_modalFooterButton(btn.buttonText.GoTOBid)
        cy.wait(3000)
        cy.REFRESH_CONTAINER()
        cy.wait(3000)
        _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS,0);
         });
        _bidPage.changeStatus_BidRecord();
        cy.SAVE()
        cy.wait(2000)
    });
  
    it("TC - Navigating back to Estimate and updating AQ quantity", function () {
        const SIDEBARACTION  = this.data.sidebarInputs.sidebar
        _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS,0);
        });
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.estimate);
        cy.wait(5000)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        cy.wait(2000)
    });

    it("TC - updating AQ quantity", function () { 
      const DataCells: DataCells={
      [commonLocators.CommonLabels.STRUCTURE_TYPE]:"BoQ" ,     
      }
        const BIDINPUTS = this.data.BidCreation.bidInputs;
        const LINEITEMGRID  = this.data.lineItem_ColumnHeaders.column_headers
        const SIDEBARACTION  = this.data.sidebarInputs.sidebar
        const CHECKINPUTS  = this.data.createInputsnames.Input_names
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMGRID )
        });
        _estimatePage.edit_GenratedLineItem(CHECKINPUTS.ToStructure,CHECKINPUTS.QuantityInput,CHECKINPUTS.AQquantity)
        cy.SAVE()
        cy.wait(5000)
        _common.openSidebarOption(BIDINPUTS.wizard1);
        _common.search_fromSidebar(BIDINPUTS.wizard2, SIDEBARACTION.UpdateEstimate);
        _estimatePage.updateEstimateFromProjectmodified(CHECKINPUTS.UpdatetoBoQ)
        cy.wait(5000)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        cy.wait(5000)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQSTRUCT_DESC)
        cy.wait(1000)
    });  

    it("TC - updating AQ quantity and create updatd bid  ", function () { 
        const checkBidcopy = this.data.checkcopyDependencies.checkCopy
        const ESTBOQGRID  = this.data.columns_ESTBOQstructure.column_ESTBoqstructure
        const CHECKINPUTS  = this.data.createInputsnames.Input_names
         _common.openTab(app.TabBar.ESTIMATEByBOQ).then(() => {
         _common.setDefaultView(app.TabBar.ESTIMATEByBOQ)
         cy.wait(2000)
         _common.select_tabFromFooter(cnt.uuid.BoQ_EstimateByBoQ, app.FooterTab.BOQs,3);
         _common.maximizeContainer(cnt.uuid.BoQ_EstimateByBoQ)
         _common.setup_gridLayout(cnt.uuid.BoQ_EstimateByBoQ, ESTBOQGRID)
         });
         _common.clear_subContainerFilter(cnt.uuid.BoQ_EstimateByBoQ)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BoQ_EstimateByBoQ,app.GridCells.BAS_UOM_FK,checkBidcopy.Uom)
        _common.saveCellDataToEnv(cnt.uuid.BoQ_EstimateByBoQ,app.gridCells.BOQ_EST_PRICE,CHECKINPUTS.UNIT_PRICE)
    });

    it("TC - updating AQ quantity and create updatd bid --Assertion 1 ", function () {
        const DataCells: DataCells={
        [commonLocators.CommonLabels.STRUCTURE_TYPE]:this.data.BidCreation.bidInputs.sourceLead,     
        }
        const BIDINPUTS = this.data.BidCreation.bidInputs;
        const CHECKINPUTS  = this.data.createInputsnames.Input_names
        _common.assert_cellData_insideActiveRow(cnt.uuid.BoQ_EstimateByBoQ,app.gridCells.BOQ_EST_PRICE,Cypress.env(CHECKINPUTS.UNIT_PRICE))
        cy.SAVE()
        cy.wait(2000)
        _common.saveCellDataToEnv(cnt.uuid.BoQ_EstimateByBoQ,app.gridCells.BOQ_EST_PRICE,CHECKINPUTS.UNIT_PRICE)
        _common.minimizeContainer(cnt.uuid.BoQ_EstimateByBoQ)
        _common.openSidebarOption(BIDINPUTS.wizard1);
        _common.search_fromSidebar(BIDINPUTS.wizard2, BIDINPUTS.createBid);
        _salesPage.enterRecord_toUpdate_BID_from_Estimate(DataCells)
        _common.clickOn_modalFooterButton(btn.buttonText.GoTOBid)
        cy.wait(5000)
    });   

    it("TC - Verify updated AQ quantity with create bid AQ quantity--Assertion 2", function () {
        const CHECKINPUTS  = this.data.createInputsnames.Input_names
        _common.openTab(app.tabBar.bidBoQ).then(() => {
        _common.setDefaultView(app.tabBar.bidBoQ)
         cy.wait(2000)
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,1); 
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BRIEF_INFO,BOQSTRUCT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.PRICE_SMALL,Cypress.env(CHECKINPUTS.UNIT_PRICE))
    });

    after(() => {
    cy.LOGOUT();
    });

});


