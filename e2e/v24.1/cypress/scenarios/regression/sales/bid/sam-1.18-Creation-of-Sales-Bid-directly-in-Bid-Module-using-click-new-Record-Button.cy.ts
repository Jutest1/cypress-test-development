
import { tile, app, cnt, sidebar, commonLocators, btn} from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ_NO-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID_DESC-"+ Cypress._.random(0, 999);

let BID_PARAMETER: DataCells;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_BID;
let CONTAINER_COLUMNS_BID;
let CONTAINER_PROJECT;
let MODALS_COPY_BOQ
let PROJECT_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.18 | Creation of Sales Bid directly in Bid Module using click new Record Button")

describe("SAM- 1.18 | Creation of Sales Bid directly in Bid Module using click new Record Button", () => {    
    
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.18-creation-of-sales-bid-directly-in-bid-module-using-click-new-record-button.json").then((data) => {
          this.data = data; 
        CONTAINER_PROJECT = this.data.CONTAINERS.PROJECT 
        PROJECT_PARAMETER = {            
          [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
          [commonLocators.CommonLabels.NAME]:PRJ_NAME,
          [commonLocators.CommonLabels.CLERK]:CONTAINER_PROJECT.CLERK_NAME
        }
        CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
        CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
        BOQ_STRUCTURE_PARAMETER={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
          [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
          [ app.GridCells.PRICE]:CONTAINER_BOQ_STRUCTURE.UNITRATE
        } 
        CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID        
        CONTAINER_BID = this.data.CONTAINERS.BID        
        BID_PARAMETER ={          
          [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
          [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC      
        }
        MODALS_COPY_BOQ = this.data.MODALS.COPY_BOQ   
        BOQ_PARAMETERS={
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
      }    
          /* Open desktop should be called in before block */
        
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
          _common.create_newRecord(cnt.uuid.PROJECTS);
          _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
          cy.SAVE();
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();      
      });
    });

    it("TC - Create new BoQ record", function () {          

      _common.openTab(app.TabBar.BOQS).then(() => {
        _common.setDefaultView(app.TabBar.BOQS)            
        _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
        _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
      });        
      _common.clear_subContainerFilter(cnt.uuid.BOQS);
      _common.create_newRecord(cnt.uuid.BOQS);
      _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
      _common.saveCellDataToEnv(cnt.uuid.BOQS,app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC,BOQ_ROOT_ITEM)
      cy.SAVE();
      
      _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)        
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL,CONTAINER_BOQ_STRUCTURE.FINAL_PRICE)
    });

    it("TC - create bid copy boq ", function () {        
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.BID);
      _common.openTab(app.TabBar.BID).then(() => {
        _common.setDefaultView(app.TabBar.BID)
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
        _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
      });        
      _common.create_newRecord(cnt.uuid.BIDS);
      _common.waitForLoaderToDisappear()            
      _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
      cy.SAVE()        
      _common.openTab(app.TabBar.BIDBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0); 
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.COPY_BOQS);        
      _bidPage.enterRecord_toCopyProject(MODALS_COPY_BOQ.BOQ_SOURCE)
        
    });

    it("TC - Verify the boq final price with bid ", function () {         
      _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
        
      });
      _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env(CONTAINER_BOQ_STRUCTURE.FINAL_PRICE))
    });

    after(() => {
      cy.LOGOUT();
    });
  });



