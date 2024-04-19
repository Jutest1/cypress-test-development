
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";


const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC="BOQ_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1="BSD-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2="BSD-1-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_3="BSD-2-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS_1:DataCells
let BOQ_STRUCTURE_PARAMETERS_2:DataCells
let BOQ_STRUCTURE_PARAMETERS_3:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const PROJECT_NO="34" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const BID_DESC="BD" + Cypress._.random(0, 999);
let BID_PARAMETER:DataCells
let CONTAINER_COLUMNS_BID;
let MODAL_BID

const CONTRACT_DESC="CD" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTRACT


const WIP_DESC_1="WIPD1-" + Cypress._.random(0, 999);
const WIP_DESC_2="WIPD2-" + Cypress._.random(0, 999);
const WIP_DESC_3="WIPD3-" + Cypress._.random(0, 999);
const WIP_DESC_4="WIPD4-" + Cypress._.random(0, 999);
const WIP_DESC_5="WIPD5-" + Cypress._.random(0, 999);
let WIP_PARAMETERS_1:DataCells
let WIP_PARAMETERS_2:DataCells
let WIP_PARAMETERS_3:DataCells
let WIP_PARAMETERS_4:DataCells
let WIP_PARAMETERS_5:DataCells
let CONTAINER_COLUMNS_WIP
let CONTAINER_COLUMNS_WIP_BOQ
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE

const BILL_DESC_1="BILL_D1-" + Cypress._.random(0, 999);
const BILL_DESC_2="BILL_D2-" + Cypress._.random(0, 999);
const BILL_DESC_3="BILL_D3-" + Cypress._.random(0, 999);
const BILL_DESC_4="BILL_D4-" + Cypress._.random(0, 999);
let BILL_PARAMETER_1:DataCells
let BILL_PARAMETER_2:DataCells
let BILL_PARAMETER_3:DataCells
let BILL_PARAMETER_4:DataCells
let CONTAINER_COLUMNS_BILL
let CONTAINER_COLUMNS_BILL_BILLING_SCHEMA
let CONTAINER_COLUMNS_BILL_BOQ

var wipNetAmt_1:string[]=[]
var wipNetAmt_2:string[]=[]
var wipNetAmt_3:string[]=[]
var wipNetAmt_4:string[]=[]
var wipNetAmt_5:string[]=[]

var bill_1_boq_finalPrice:string[]=[]
var bill_1_billingSchema_value:string[]=[]

var bill_2_boq_finalPrice:string[]=[]
var bill_2_billingSchema_value:string[]=[]

var bill_3_boq_finalPrice:string[]=[]
var bill_3_billingSchema_value:string[]=[]

var bill_4_boq_finalPrice:string[]=[]
var bill_4_billingSchema_value:string[]=[]

ALLURE.epic("SALES");
ALLURE.feature("Sales-BID");
ALLURE.story("SAM- 1.70 | Invoice chain and usage of a cumulative billing schema");

describe("SAM- 1.70 | Invoice chain and usage of a cumulative billing schema", () => {

    before(function () {
        cy.fixture("sam/sam-1.70-invoice-chain-and-usage-of-a-cumulative-billing-schema.json")
          .then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS_1={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_1,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM[0]
            }
            BOQ_STRUCTURE_PARAMETERS_2={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_2,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM[1]
            }
            BOQ_STRUCTURE_PARAMETERS_3={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_3,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[2],
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[2],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM[2]
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

            CONTAINER_COLUMNS_BID=this.data.CONTAINER_COLUMNS.BID
            MODAL_BID=this.data.MODAL.BID
            BID_PARAMETER={
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC,
                [app.InputFields.INPUT_GROUP_CONTENT]:MODAL_BID.BUSINESS_PARTNER,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]:BOQ_DESC
            }

            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT

            CONTAINER_COLUMNS_WIP=this.data.CONTAINER_COLUMNS.WIP
            CONTAINER_COLUMNS_WIP_BOQ=this.data.CONTAINER_COLUMNS.WIP_BOQ
            CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
            WIP_PARAMETERS_1={
                [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_1
            }
            WIP_PARAMETERS_2={
                [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_2
            }
            WIP_PARAMETERS_3={
                [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_3
            }
            WIP_PARAMETERS_4={
                [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_4
            }
            WIP_PARAMETERS_5={
                [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_5
            }

            BILL_PARAMETER_1={
                [commonLocators.CommonLabels.BILL_TYPE]:commonLocators.CommonKeys.PROGRESS_INVOICE,
                [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC_1,
                [app.GridCells.DESCRIPTION_INFO]:[WIP_DESC_1],
                [commonLocators.CommonKeys.VALUE]:[commonLocators.CommonKeys.CHECK]
            }

            BILL_PARAMETER_2={
                [commonLocators.CommonLabels.BILL_TYPE]:commonLocators.CommonKeys.PROGRESS_INVOICE,
                [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC_2,
                [app.GridCells.DESCRIPTION_INFO]:[WIP_DESC_2,WIP_DESC_3],
                [commonLocators.CommonKeys.VALUE]:[commonLocators.CommonKeys.CHECK,commonLocators.CommonKeys.CHECK]
            }
            BILL_PARAMETER_3={
                [commonLocators.CommonLabels.BILL_TYPE]:commonLocators.CommonKeys.PROGRESS_INVOICE,
                [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC_3,
                [app.GridCells.DESCRIPTION_INFO]:[WIP_DESC_4],
                [commonLocators.CommonKeys.VALUE]:[commonLocators.CommonKeys.CHECK]
            }
            BILL_PARAMETER_4={
                [commonLocators.CommonLabels.BILL_TYPE]:commonLocators.CommonKeys.FINAL_INVOICE,
                [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC_4,
                [app.GridCells.DESCRIPTION_INFO]:[WIP_DESC_5],
                [commonLocators.CommonKeys.VALUE]:[commonLocators.CommonKeys.CHECK]
            }
            CONTAINER_COLUMNS_BILL=this.data.CONTAINER_COLUMNS.BILL
            CONTAINER_COLUMNS_BILL_BOQ=this.data.CONTAINER_COLUMNS.BILL_BOQ
            CONTAINER_COLUMNS_BILL_BILLING_SCHEMA=this.data.CONTAINER_COLUMNS.BILL_BILLING_SCHEMA

          })
          .then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
          })
    });  

    after(() => {
    cy.LOGOUT();
    });

    it("TC - Create BoQ header and BoQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_1);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_3);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear() 
    });

    it("TC - Create Bid", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID); 
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)       
        _common.waitForLoaderToDisappear()

        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.BIDS); 
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)    
        cy.SAVE()    
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.BIDS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.BIDS,app.GridCells.BILLING_SCHEMA_FK,commonLocators.CommonKeys.LIST,MODAL_BID.STANDARD_CUMULATIVE)
        _common.select_activeRowInContainer(cnt.uuid.BIDS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()    
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BIDS)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create contract from bid", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS,CONTRACT_DESC)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create first WIP from contract with updated BoQ structure quantity and change WIP status", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        _common.waitForLoaderToDisappear()

        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_1)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)

        cy.wait(1000)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
            _common.setup_gridLayout(cnt.uuid.WIPBOQ, CONTAINER_COLUMNS_WIP_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
        _common.select_rowHasValue(cnt.uuid.WIPBOQ,BOQ_DESC)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUCTURE_DESC_1)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.PREV_QUANTITY[0])
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create second WIP from contract with updated BoQ structure quantity and change WIP status", function () {
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.WIP,commonLocators.CommonLabels.CONTRACT_SALES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTRACTS,CONTRACT_DESC)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        _common.waitForLoaderToDisappear()


        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_2)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_2)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_2)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
        _common.select_rowHasValue(cnt.uuid.WIPBOQ,BOQ_DESC)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUCTURE_DESC_2)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.PREV_QUANTITY[1])
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create third WIP from contract with updated BoQ structure quantity and change WIP status", function () {
       
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.WIP,commonLocators.CommonLabels.CONTRACT_SALES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS,CONTRACT_DESC)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        _common.waitForLoaderToDisappear()


        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_3)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_3)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_3)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
        _common.select_rowHasValue(cnt.uuid.WIPBOQ,BOQ_DESC)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUCTURE_DESC_2)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.PREV_QUANTITY[1])
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create fourth WIP from contract with updated BoQ structure quantity and change WIP status", function () {
  
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.WIP,commonLocators.CommonLabels.CONTRACT_SALES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS,CONTRACT_DESC)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        _common.waitForLoaderToDisappear()


        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_4)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_4)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_4)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
        _common.select_rowHasValue(cnt.uuid.WIPBOQ,BOQ_DESC)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUCTURE_DESC_2)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.PREV_QUANTITY[2])
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create fifth WIP from contract with updated BoQ structure quantity and change WIP status", function () {
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.WIP,commonLocators.CommonLabels.CONTRACT_SALES)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTRACTS,CONTRACT_DESC)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        _common.waitForLoaderToDisappear()

        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS_5)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_5)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_5)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIPBOQ)
        _common.select_rowHasValue(cnt.uuid.WIPBOQ,BOQ_DESC)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUCTURE_DESC_2)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.PREV_QUANTITY[3])
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUCTURE_DESC_3)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.PREV_QUANTITY[4])
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Bill-1 Net Amount = WIP1 Net Amount & Billing Schema Net total = Billing BoQ Final Price", function () {
   
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC_1)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)
        wipNetAmt_1=_common.returnArrayForMultipleCell(cnt.uuid.WIP,app.GridCells.AMOUNT_NET)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _billPage.create_bill_fromWizard(BILL_PARAMETER_1)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)

        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.setDefaultView(app.TabBar.BILLS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
            _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_1)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_1)
        cy.wait(10)
          .then(()=>{
            _common.assert_forNumericValues(cnt.uuid.BILLS,app.GridCells.AMOUNT_NET,wipNetAmt_1[0].replace(',',''))
          })

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.setDefaultView(app.TabBar.APPLICATIONS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_BOQ, CONTAINER_COLUMNS_BILL_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BOQ)
        _common.search_inSubContainer(cnt.uuid.BILL_BOQ,BOQ_DESC)
        bill_1_boq_finalPrice=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BOQ,app.GridCells.FINAL_PRICE_SMALL,BOQ_ROOT_ITEM)


        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 4);
            _common.setup_gridLayout(cnt.uuid.BILL_BILLING_SCHEMA, CONTAINER_COLUMNS_BILL_BILLING_SCHEMA)
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BILLING_SCHEMA)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.GENEHMIGTER_NETTOBETRAG)
        bill_1_billingSchema_value=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT)
        cy.wait(10)
          .then(()=>{
            _common.assert_forNumericValues(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT,bill_1_boq_finalPrice[0].replace(',',''))
          })

        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_1)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_1)


        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.BPA_BILLED)
        _common.waitForLoaderToDisappear()
      
    })

    it("TC - Bill-2 Net Amount = WIP2 + WIP3 Net Amount & Billing Schema Net Total for Bill-2 = Bill1 Billing Schema Net Total + Current billing BoQ Final Price", function () {
       
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS,commonLocators.CommonLabels.WIP)

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC_2)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_2)
        wipNetAmt_2=_common.returnArrayForMultipleCell(cnt.uuid.WIP,app.GridCells.AMOUNT_NET)

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC_3)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_3)
        wipNetAmt_3=_common.returnArrayForMultipleCell(cnt.uuid.WIP,app.GridCells.AMOUNT_NET)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _billPage.create_bill_fromWizard(BILL_PARAMETER_2)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)


        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_2)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_2)
        cy.wait(10)
          .then(()=>{
            let addTwoWipNetAmount:any=((+parseFloat(wipNetAmt_2[0].replace(',','')))+(+parseFloat(wipNetAmt_3[0].replace(',',''))))
            _common.assert_forNumericValues(cnt.uuid.BILLS,app.GridCells.AMOUNT_NET,addTwoWipNetAmount.toString())
          })

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.setDefaultView(app.TabBar.APPLICATIONS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BOQ)
        _common.search_inSubContainer(cnt.uuid.BILL_BOQ,BOQ_DESC)
        bill_2_boq_finalPrice=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BOQ,app.GridCells.FINAL_PRICE_SMALL,BOQ_ROOT_ITEM)

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 4);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BILLING_SCHEMA)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.GENEHMIGTER_NETTOBETRAG)
        bill_2_billingSchema_value=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT)
        cy.wait(10)
          .then(()=>{
            let add:any=((+parseFloat(bill_2_boq_finalPrice[0].replace(',','')))+(+parseFloat(bill_1_billingSchema_value[0].replace(',',''))))
            _common.assert_forNumericValues(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT,add.toString())
          })
        

        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_2)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_2)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.BPA_BILLED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Bill-3 Net Amount = WIP4 Net Amount & Billing Schema Net Total = Billing Schema Bill-2 Net Total + Current billing BoQ Final Price", function () {
        
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS,commonLocators.CommonLabels.WIP)

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
      
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC_4)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_4)
        wipNetAmt_4=_common.returnArrayForMultipleCell(cnt.uuid.WIP,app.GridCells.AMOUNT_NET)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _billPage.create_bill_fromWizard(BILL_PARAMETER_3)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)

        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
       
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_3)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_3)
        cy.wait(10)
          .then(()=>{
            _common.assert_forNumericValues(cnt.uuid.BILLS,app.GridCells.AMOUNT_NET,wipNetAmt_4[0].replace(',',''))
          })

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.setDefaultView(app.TabBar.APPLICATIONS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BOQ)
        _common.search_inSubContainer(cnt.uuid.BILL_BOQ,BOQ_DESC)
        bill_3_boq_finalPrice=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BOQ,app.GridCells.FINAL_PRICE_SMALL,BOQ_ROOT_ITEM)

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 4);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BILLING_SCHEMA)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.GENEHMIGTER_NETTOBETRAG)
        bill_3_billingSchema_value=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT)

        cy.wait(10)
          .then(()=>{
            let add:any=((+parseFloat(bill_3_boq_finalPrice[0].replace(',','')))+(+parseFloat(bill_2_billingSchema_value[0].replace(',',''))))
            _common.assert_forNumericValues(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT,add.toString())
          })
        
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_3)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_3)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.BPA_BILLED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Final Bill Net Amount = WIP1 Net Amount & Billing Schema Net Total= Billing Schema Bill-3 Net Total+Current billing BoQ Final Price", function () {
        
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS,commonLocators.CommonLabels.WIP)

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()      
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
            _common.waitForLoaderToDisappear()
        });
      
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC_5)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_5)
        wipNetAmt_5=_common.returnArrayForMultipleCell(cnt.uuid.WIP,app.GridCells.AMOUNT_NET)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BILL);
        _billPage.create_bill_fromWizard(BILL_PARAMETER_4)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)


        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC_4)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_4)
        cy.wait(10)
          .then(()=>{
            _common.assert_forNumericValues(cnt.uuid.BILLS,app.GridCells.AMOUNT_NET,wipNetAmt_5[0].replace(',',''))
          })

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.setDefaultView(app.TabBar.APPLICATIONS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BOQ)
        _common.search_inSubContainer(cnt.uuid.BILL_BOQ,BOQ_DESC)
        bill_4_boq_finalPrice=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BOQ,app.GridCells.FINAL_PRICE_SMALL,BOQ_ROOT_ITEM)

        _common.openTab(app.TabBar.APPLICATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 4);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILL_BILLING_SCHEMA)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.GENEHMIGTER_NETTOBETRAG)
        bill_4_billingSchema_value=_common.returnArrayForMultipleCell(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT)

        cy.wait(10)
          .then(()=>{
            let add:any=((+parseFloat(bill_4_boq_finalPrice[0].replace(',','')))+(+parseFloat(bill_3_billingSchema_value[0].replace(',',''))))
            _common.assert_forNumericValues(cnt.uuid.BILL_BILLING_SCHEMA,app.GridCells.RESULT,add.toString())
          })        

        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC_4)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.FI_BILLED)
        _common.waitForLoaderToDisappear()
    })
});