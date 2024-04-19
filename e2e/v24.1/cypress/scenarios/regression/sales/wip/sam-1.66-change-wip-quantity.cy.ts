import cypress from "cypress";

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJNO-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJNAME-" + Cypress._.random(0, 999);

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_PROJECT;
let PROJECT_PARAMETER: DataCells;

let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells

let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;

let CONTAINER_COLUMNS_CONTRACT_SALES;

let CONTAINER_WIP;
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE;

let CONTAINER_QUANTITY_TAKEOFF;
let CONTAINER_COLUMNS_QUANTITY_TAKEOFF;
let CONTAINER_COLUMNS_BILL_OF_QUANTITY


allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 1.66 | Change WIP Quantity")

describe("SAM- 1.66 | Change WIP Quantity", () => {
    beforeEach(function () {
        cy.fixture("sam/sam-1.66-change-wip-quantity.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.66-change-wip-quantity.json").then((data) => {
            this.data = data;
            CONTAINER_PROJECT = this.data.CONTAINERS.PROJECT 
            PROJECT_PARAMETER = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
                [commonLocators.CommonLabels.NAME]:PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]:CONTAINER_PROJECT.CLERK_NAME
            }
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
            }
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
            CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID      
            CONTAINER_BID = this.data.CONTAINERS.BID
            BID_PARAMETER ={          
                [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]:BOQ_HEADER_DESC     
            } 
            CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES 
            CONTAINER_WIP= this.data.CONTAINERS.WIP
            CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE

            CONTAINER_QUANTITY_TAKEOFF= this.data.CONTAINERS.QUANTITY_TAKEOFF
            CONTAINER_COLUMNS_QUANTITY_TAKEOFF= this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF
            CONTAINER_COLUMNS_BILL_OF_QUANTITY = this.data.CONTAINER_COLUMNS.BILL_OF_QUANTITY
           
            
            /* Open desktop should be called in before block */

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
              });
              _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
              _common.create_newRecord(cnt.uuid.PROJECTS);
              _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
              cy.SAVE();
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
              _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem(); 
        });
    });

    it("TC - Create new BoQ header", function () {
        _common.openTab(app.TabBar.BOQ).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
            _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
        })           
          _common.clear_subContainerFilter(cnt.uuid.BOQS);
          _common.create_newRecord(cnt.uuid.BOQS);                  
          _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
          cy.SAVE();
          _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    });

    it("TC - Create BoQ Structure", function () {

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)                  
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE,0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE) 
        });
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES) 
        _common.waitForLoaderToDisappear()       
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
        cy.SAVE()          
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL).then(($FINALPRICE) => {
            Cypress.env("FINALPRICE", $FINALPRICE.text())
        })
    });

    it("TC - Create new Bid and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.BID)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
            _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
            _common.clear_subContainerFilter(cnt.uuid.BIDS)
        })
        _common.create_newRecord(cnt.uuid.BIDS); 
        _common.waitForLoaderToDisappear()
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)    
        cy.SAVE()   
        _common.waitForLoaderToDisappear() 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_BID_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED) 
    })

    it("TC - Verify Bid BoQ item should be populated form project boq item", function () {
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        
    })

    it("TC - Create Contract by wizard and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
            _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        })    
        cy.SAVE()    
        _saleContractPage.changeStatus_ContractRecord();
    })

    it("TC - Verify Contract Item should be populated from the Bid Boq item", function () {
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        
    })

    it("TC - Create quantity TakeOff Detail", function () {       
        

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTOHEADER).then(() => {
            _common.setDefaultView(app.TabBar.QTOHEADER)
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITY_TAKEOFF_HEADER, 0);
        });
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER)
        _salesPage.enter_dataToCreate_QTOHeader(CONTAINER_QUANTITY_TAKEOFF.QTO_PURPOSE, QTO_DESC, CONTRACT_DESC, BOQ_HEADER_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 0);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QUANTITY_TAKEOFF)
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,CONTAINER_COLUMNS_BILL_OF_QUANTITY)
        });
        _common.waitForLoaderToDisappear()
        _salesPage.enter_recordToCreate_quantityTakeOffDetail(BOQ_HEADER_DESC, BOQSTRUCT_DESC, CONTAINER_QUANTITY_TAKEOFF.VALUE1)
        cy.SAVE()       
        _common.waitForLoaderToDisappear()
        
    })

    it("TC - Verify IQ quantity in bill of quantity container should be reflected from quantity take off container", function () {
        
        _common.openTab(app.TabBar.DETAIL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 0)
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, CONTAINER_QUANTITY_TAKEOFF.VALUE1)
        
    })

    it("TC - Create WIP and Verify Wip Boq Quantity should come from QTO IQ Quantity & WIP BoQ Final Price= Quantity* Unit Rate", function () {        
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_WIP);
        cy.wait(1000) // Wait is required to load modal window
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.select_tabFromFooter(cnt.uuid.WIP_QUANTITY_TAKEOFF, app.FooterTab.QUANTITY_TAKEOFF, 1);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)   
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, CONTAINER_QUANTITY_TAKEOFF.VALUE1)

    })

    it("TC - Verify change wip quantity", function () {   
        
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP_QUANTITY_TAKEOFF, app.FooterTab.QUANTITY_TAKEOFF, 0);
            _common.setup_gridLayout(cnt.uuid.WIP_QUANTITY_TAKEOFF, CONTAINER_COLUMNS_QUANTITY_TAKEOFF)
        });
        _common.select_rowInContainer(cnt.uuid.WIP_QUANTITY_TAKEOFF)
        _common.set_cellCheckboxValue(cnt.uuid.WIP_QUANTITY_TAKEOFF, app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.enterRecord_inNewRow(cnt.uuid.WIP_QUANTITY_TAKEOFF, app.GridCells.VALUE_1_DETAIL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINER_QUANTITY_TAKEOFF.UPDATE_QTY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, CONTAINER_QUANTITY_TAKEOFF.UPDATE_QTY)

    })

    after(() => {
        cy.LOGOUT();
    });
})