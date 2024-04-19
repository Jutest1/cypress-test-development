import cypress from "cypress";

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CONTRACTSALES_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
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

allure.epic("SALES");
allure.feature("Sales-Contract");
allure.story("SAM- 1.49 | Delete contract")

describe("SAM- 1.49 | Delete contract", () => {
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.49-delete-contract.json").then((data) => {
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
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS)
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_HEADER_DESC, BOQ_ROOT_ITEM)
        cy.SAVE();        
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    });

    it("TC - Create BoQ Structure", function () {
       
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL).then(($FINALPRICE) => {
            Cypress.env("FINALPRICE", $FINALPRICE.text())
        })
    });

    it("TC - Create new contract sales", function () {    
 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT_SALES);
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.create_newRecord(cnt.uuid.CONTRACTS)
        _salesPage.enterRecord_toCreateSalesBID(CONTRACT_SALES_PARAMETER);
        cy.SAVE()
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify delete functionality of copied contract record", function () {
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.CONTRACTS)
        _common.waitForLoaderToDisappear()

        _common.clickOn_toolbarButton(cnt.uuid.CONTRACTS,btn.ToolBar.ICO_COPY_PASTE_DEEP)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACTS,app.GridCells.DESCRIPTION_INFO,CONTRACTSALES_DESC+ CONTAINERS_CONTRACT_SALES.COPY)
		_common.delete_recordFromContainer(cnt.uuid.CONTRACTS);
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.CONTRACTS, CONTRACTSALES_DESC+CONTAINERS_CONTRACT_SALES.COPY);
        
    
    })

    after(() => {
        cy.LOGOUT();
    });
})