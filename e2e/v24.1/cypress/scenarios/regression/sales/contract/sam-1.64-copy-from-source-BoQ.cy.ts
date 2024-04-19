import {_salesPage,_common, _estimatePage, _validate, _mainView, _boqPage, _package, _bidPage, _saleContractPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const BID_DESC = "BID_DESC-" + Cypress._.random(0, 999);
const BOQ_HEADER_DESC = "BOQ_HEADER_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC= "BOQSTRUCT_DESC-" + Cypress._.random(0, 999);

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;

let CONTAINER_COLUMNS_SOURCE_BOQ;
let CONTAINER_SOURCE_BOQ;

allure.epic("SALES");
allure.feature("Sales-Contract");
allure.story("SAM- 1.64 | Copy BoQ from Procurement Contract to Sales Contract using BoQ Package.");

describe("SAM- 1.64 | Copy BoQ from Procurement Contract to Sales Contract using BoQ Package.", () => {
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.64-copy-from-source-BoQ.json").then((data) => {
      this.data = data;
      CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
      BOQ_STRUCTURE_PARAMETER={
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
        [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
      } 
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
      }
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC      
      }   
      CONTAINER_COLUMNS_SOURCE_BOQ=this.data.CONTAINER_COLUMNS.SOURCE_BOQ;
      CONTAINER_SOURCE_BOQ= this.data.CONTAINERS.SOURCE_BOQ; 
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });
  it("TC - Create BOQ header & BOQ Structure in Project", function () {     

      _common.openTab(app.TabBar.BOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
      });
      _common.clear_subContainerFilter(cnt.uuid.BOQS);
      _common.create_newRecord(cnt.uuid.BOQS);
      _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
      cy.SAVE();
      _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
     });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
    _common.waitForLoaderToDisappear()
  });
  it("TC - Create Bid and bid boq", function () {       
      _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      });
      _common.create_newRecord(cnt.uuid.BIDS)
      _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)
      cy.SAVE();
      _common.openTab(app.TabBar.BIDBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs,0);
      });
      _common.create_newRecord(cnt.uuid.BIDBOQS)
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.OTHERS).then(() => {
        _common.setDefaultView(app.TabBar.OTHERS)      
        _common.select_tabFromFooter(cnt.uuid.BIDSOURCEBOQ, app.FooterTab.SOURCE_BOQ,0);
      });
      _common.openTab(app.TabBar.BIDBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs,0);
      });
      _common.select_allContainerData(cnt.uuid.BIDBOQS)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BIDBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQs);
      });
      _common.select_allContainerData(cnt.uuid.BOQ_STRUCTUREBID)
  }); 

    it("TC - Copy Item from Source BoQ", function () {     
      
      _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID,CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINER_SOURCE_BOQ.ROOT)
      _common.create_newRecord(cnt.uuid.BOQ_STRUCTUREBID)
      _common.waitForLoaderToDisappear()
      _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINER_SOURCE_BOQ.POSITION)
      cy.SAVE()

      _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDSOURCEBOQ, app.FooterTab.SOURCE_BOQ,0);
      _common.setup_gridLayout(cnt.uuid.BIDSOURCEBOQ,CONTAINER_COLUMNS_SOURCE_BOQ)
      });
     _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BIDSOURCEBOQ, cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_SOURCE_BOQ.PROJECT_BOQ, " ",Cypress.env("PROJECT_NUMBER"),BOQ_HEADER_DESC, BOQSTRUCT_DESC,CONTAINER_SOURCE_BOQ.POSITION);
     _common.waitForLoaderToDisappear()
  });
  it("TC - Verify the copy record in boq structure", function () {
      _common.openTab(app.TabBar.OTHERS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,2);
      _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BRIEF_INFO_SMALL,BOQ_HEADER_DESC)
  });
  });
  it("TC - Verify the quantity in boq structure", function () {    
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
     _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.QUANTITY_SMALL,CONTAINER_BOQ_STRUCTURE.QUANTITY)
 });
  });

  after(() => {
    cy.LOGOUT();
  });

});
