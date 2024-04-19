import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQDESC-SAM" + Cypress._.random(0, 9999);
const BOQ_STRUCTURE_DESC = "BOQSTRDESC-SAM" + Cypress._.random(0, 9999);
const BID_DESC = "BIDDESC-SAM" + Cypress._.random(0, 9999);
const CONTRACT_DESC = "CONTDESC-SAM" + Cypress._.random(0, 9999);
const PROJECT_NO = "PRJNOSAM" + Cypress._.random(0, 9999);
const PROJECT_DESC = "PRJNAMESAM" + Cypress._.random(0, 9999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS: DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINERS_BID;
let CONTAINERS_WIP;
let CONTAINERS_CONTRACT;

let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_BOQ: DataCells;
let CONTAINER_COLUMNS_BOQ_STRUCTURES: DataCells;
let CONTAINER_COLUMNS_BID: DataCells;
let CONTAINER_COLUMNS_WIP: DataCells;

let BID_PARAMETER;
let BOQ_PARAMETERS;
let BOQ_STRUCTURE_PARAMETERS;
let WIP_PARAMETERS;
let CONTRACT_PARAMETER;

ALLURE.epic("SALES");
ALLURE.feature("Sales-WIP");
ALLURE.story("SAM- 3.1 | WIP creation in WIP module by clicking on new button for 1st period")
describe("SAM- 3.1 | WIP creation in WIP module by clicking on new button for 1st period", () => {
    before(function () {
        cy.fixture("sam/sam-3.1-wip-creation-in-wip-module-by-clicking-on-new-record-button-for-1st-period.json").then((data) => {
            this.data = data;
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
            }
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE;
            BOQ_STRUCTURE_PARAMETERS={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINERS_BID = this.data.CONTAINERS.BID;
            BID_PARAMETER = {
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
                [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_BID.BUSINESS_PARTNER,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
            };

            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTRACT_PARAMETER = {
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: CONTRACT_DESC,
            };

            CONTAINERS_WIP = this.data.CONTAINERS.WIP;
            WIP_PARAMETERS={
                [commonLocators.CommonLabels.CONTRACT] : CONTRACT_DESC,
                [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_CONTRACT.CONTRACT_BOQ,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC,
                
            }
         
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            CONTAINER_COLUMNS_BOQ_STRUCTURES = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURES;
            CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID;
            CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        })
    })
    it("TC - Create new BOQ and go to BOQ", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs,1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs,1);   
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    });
    it("TC - Create BoQ Structure", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL).then(($FINALPRICE) => {
        Cypress.env("FINALPRICE", $FINALPRICE.text())
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create new Bid and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        cy.wait(1000) // required wait to get the data
        _common.create_newRecord(cnt.uuid.BIDS)
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
        _common.waitForLoaderToDisappear()
        _bidPage.changeStatus_BidRecord()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Verify Bid BoQ item should be populated form project boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
        cy.wait(1000) //required wait to create contract
    })
    it("TC - Create Contract by wizard and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        cy.wait(1000) /* this wait is mandatory else script fails */
        _common.waitForLoaderToDisappear()
        _saleContractPage.create_contract_fromWizard(CONTRACT_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT)
            _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        })
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs);
        });
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE()
    })
    it("TC - Verify Contract Item should be populated from the Bid Boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
        cy.wait(1000)//required wait to assert and open wip
    });
    it("TC - Create WIP", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.clear_subContainerFilter(cnt.uuid.WIP) 
        });
        _common.create_newRecord(cnt.uuid.WIP)
        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETERS)
        cy.SAVE()
        _common.openTab(app.TabBar.WIPBOQ).then(()=>{
            _common.setDefaultView(app.TabBar.WIPBOQ)
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP,app.FooterTab.BOQs)
            _common.setup_gridLayout(cnt.uuid.BOQ_WIP,CONTAINER_COLUMNS_BOQ)
        })
        _common.select_rowInContainer(cnt.uuid.BOQ_WIP)
        _common.openTab(app.TabBar.WIPBOQ).then(()=>{        
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP,app.FooterTab.BOQ_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINER_COLUMNS_WIP)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.PECENTAGE_QUANTITY)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.PECENTAGE_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WIP.PERCENTAGE_QTY)
        cy.SAVE()
        _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINERS_BOQ_STRUCTURE.QUANTITY,CONTAINERS_WIP.PERCENTAGE_QTY,app.GridCells.QUANTITY_SMALL)    
    })
})
