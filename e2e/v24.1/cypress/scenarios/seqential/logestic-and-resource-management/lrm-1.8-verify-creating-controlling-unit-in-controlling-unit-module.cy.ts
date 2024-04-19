import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const CONTROLLING_UNIT1 = "ControllingUnit" + Cypress._.random(0, 999);
const CONTROLLING_UNIT2 = "ControllingUnit" + Cypress._.random(0, 999);
const CONTROLLING_UNIT3 = "ControllingUnit" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells

let CONTAINERS_CONTROLLING_UNIT

let CONTAINER_COLUMNS_CONTROLLING_UNIT;

let CONTROLLING_UNIT_PARAMETERS1:DataCells;
let CONTROLLING_UNIT_PARAMETERS2:DataCells;
let CONTROLLING_UNIT_PARAMETERS3:DataCells;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.8 | Verify Creating Controlling Unit In Controlling Unit Module");

describe("LRM- 1.8 | Verify Creating Controlling Unit In Controlling Unit Module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.8-verify-creating-controlling-unit-in-controlling-unit-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        
        cy.fixture("LRM/lrm-1.4-verify-creation-of-plant-from-contract-module-using-wizard.json").then((data) => {
            this.data = data;

            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS1 = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
			};
            CONTROLLING_UNIT_PARAMETERS2 = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
			};
            CONTROLLING_UNIT_PARAMETERS3 = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT3,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
			};
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            
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
        });    
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Controlling Unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTROLLING_UNITS)
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
            _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait to create new record
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to set checkbox value
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ASSET_MANAGEMENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS1)
        cy.SAVE()
        _common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, PROJECT_DESC)
        cy.wait(1000)
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, PROJECT_DESC)
        cy.wait(1000) //required wait to create new sub record
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        cy.wait(1000) //required wait to open tabbar
    })

    it("TC - Verify Added Controlling Unit", function () {
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
            cy.wait(1000) //required wait to select cell
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, CONTROLLING_UNIT1)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, CONTROLLING_UNIT1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO,CONTROLLING_UNIT2)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, CONTROLLING_UNIT2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, CONTROLLING_UNIT3)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, CONTROLLING_UNIT3)
    })
});