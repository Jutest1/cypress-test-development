import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import CommonLocators from "cypress/locators/common-locators";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CONTRACTSALES_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJNO-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJNAME-" + Cypress._.random(0, 999);

let CONTAINER_PROJECT;
let PROJECT_PARAMETER: DataCells;
let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;
let CONTAINERS_CONTRACT_SALES;
let CONTRACT_SALES_PARAMETER:DataCells;
let CONTAINER_COLUMNS_CONTRACT_SALES;
let WIP_PARAMETER:DataCells;
let CONTAINER_WIP;
let CONTAINER_COLUMNS_WIP;


allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 1.50 | Copy wip")

describe("SAM- 1.50 | Copy wip", () => {
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.50-copy-wip.json").then((data) => {
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
                [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
            } 
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
            }
            CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES
            CONTAINERS_CONTRACT_SALES= this.data.CONTAINERS.CONTRACT_SALES
            CONTRACT_SALES_PARAMETER = {
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: CONTRACTSALES_DESC,
                [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_CONTRACT_SALES.BUSINESS_PARTNER,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
            };
            CONTAINER_COLUMNS_WIP= this.data.CONTAINER_COLUMNS.WIP
            CONTAINER_WIP= this.data.CONTAINERS.WIP
            WIP_PARAMETER ={
                [commonLocators.CommonLabels.CONTRACT] : CONTRACTSALES_DESC,
                [commonLocators.CommonLabels.BOQ_SOURCE]:CONTAINER_WIP.Contract_BoQ,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
            }
            /* Open desktop should be called in before block */

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        });
    });

    it("TC - Create new BoQ header", function () {  
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS,  CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS)       
        cy.SAVE();        
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    });

    it("TC - Create BoQ Structure", function () {       
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);
        cy.SAVE();
       
    });

    it("TC - Create new contract sales", function () {   
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT_SALES);
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.create_newRecord(cnt.uuid.CONTRACTS)
        _salesPage.enterRecord_toCreateSalesBID(CONTRACT_SALES_PARAMETER);
		_common.waitForLoaderToDisappear()
        _saleContractPage.changeStatus_ContractRecord()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify WIP Record should be copied with existing description-Copy in the description field and copied WIP Net Amount should be same as existing WIP Net Amount", function () { 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
       _common.waitForLoaderToDisappear()
        _common.setDefaultView(app.TabBar.WIP)
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.create_newRecord(cnt.uuid.WIP)
        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP )
        });
        _common.select_rowInContainer(cnt.uuid.WIP)
        _common.getText_fromCell(cnt.uuid.WIP, app.GridCells.AMOUNT_NET).then(($NETAMOUNT) => {
            Cypress.env("NETAMOUNT", $NETAMOUNT.text())
        })
        _common.enterRecord_inNewRow(cnt.uuid.WIP,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,WIP_DESC)        
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.WIP,btn.ToolBar.ICO_COPY_PASTE_DEEP)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Verify Net Amount in Copy WIP", function () {
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.WIP,app.GridCells.DESCRIPTION_INFO,WIP_DESC+" - Copy")        
        _common.assert_cellData_insideActiveRow(cnt.uuid.WIP,app.GridCells.AMOUNT_NET,Cypress.env("NETAMOUNT"))
        
    })

    after(() => {
        cy.LOGOUT();
    });
})
