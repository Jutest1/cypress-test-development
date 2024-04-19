
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_GROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANT_DESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);
const CONTROLLING_UNIT_DESC = "ControllingUnit" + Cypress._.random(0, 999);

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_GROUP;
let CONTAINERS_CONTROLLING_UNIT

let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_PLANT_GROUP;
let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTAINER_COLUMNS_PLANT_CONTROLLING;

let PLANT_PARAMETER;
let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells
let CONTROLLING_UNIT_PARAMETERS:DataCells;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.9 | Verify Adding Controlling Unit Record To Plant In Plant Master Module");

describe("LRM- 1.9 | Verify Adding Controlling Unit Record To Plant In Plant Master Module", () => {

    before(function () {
        
        cy.fixture("LRM/lrm-1.9-verify-adding-controlling-unit-record-to-plant-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
            }
            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;

            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
			};
           
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            CONTAINER_COLUMNS_PLANT_CONTROLLING = this.data.CONTAINER_COLUMNS.PLANT_CONTROLLING;
            
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
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS,2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait to create new record
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to set checkbox value
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create New Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_GROUP)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_GROUP, CONTAINER_COLUMNS_PLANT_GROUP)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to select container data
        _common.select_allContainerData(cnt.uuid.PLANT_GROUP)
        _common.clickOn_toolbarButton(cnt.uuid.PLANT_GROUP,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Verify Create Plant From Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait 
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Adding Controlling Unit Record To Plant In Plant Master Module', function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS,0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        cy.wait(1000)//required wait to read cell data
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE)
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PLANT_CONTROLLING, app.FooterTab.CONTROLLING_UNIT)
            _common.setup_gridLayout(cnt.uuid.PLANT_CONTROLLING, CONTAINER_COLUMNS_PLANT_CONTROLLING)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_CONTROLLING)
        });
        _common.create_newRecord(cnt.uuid.PLANT_CONTROLLING)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to appear dropdown
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_CONTROLLING,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTROLLING_UNIT_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PLANT_CONTROLLING)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT_CONTROLLING, app.GridCells.CONTROLLING_UNIT_DESCRIPTION,CONTROLLING_UNIT_DESC)
    })

});
