import { tile, app, cnt, sidebar, commonLocators, btn} from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_GROUP_1 = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "MAIN_PLANT-" + Cypress._.random(0, 999);
const SUB_A_PLANT_GROUP_1 = "SUB A" + Cypress._.random(0, 999);
const SUB_A_PLANT_GROUP_DESC = "SUB-JCB1-" + Cypress._.random(0, 999);
const SUB_B_PLANT_GROUP_1 = "SUB B" + Cypress._.random(0, 999);
const SUB_B_PLANT_GROUP_DESC = "SUB-JCB2-" + Cypress._.random(0, 999);

const SPEC_VALUE_DESC = "SPEC_VALUE_DESC" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE-" + Cypress._.random(0, 999);
const PLANT_DESC = "PLANT_CODE-" + Cypress._.random(0, 999);
const PLANT_CODE1 = "PLANT_CODE-" + Cypress._.random(0, 999);
const PLANT_DESC1 = "PLANT_CODE-" + Cypress._.random(0, 999);

let CONTAINERS_PLANT_GROUP;
let CONTAINERS_SPECIFIC_VALUE;
let CONTAINERS_PLANT;
 
let CONTAINER_COLUMNS_PLANT_GROUP;
let CONTAINER_COLUMNS_SPECIFIC_VALUE;
let PLANT_PARAMETER: DataCells
let PLANT_PARAMETER1: DataCells
let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_ASSIGNMENTS



ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.28 | Verify Equipment Assignment to plant in plant pricing module");

describe("LRM- 1.28 | Verify Equipment Assignment to plant in plant pricing module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.28-verify-equipment-assignment-to-plant-in-plant-pricing-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINERS_SPECIFIC_VALUE=this.data.CONTAINERS.SPECIFIC_VALUE
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;
            CONTAINER_COLUMNS_SPECIFIC_VALUE = this.data.CONTAINER_COLUMNS.SPECIFIC_VALUE; 

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_ASSIGNMENTS = this.data.CONTAINER_COLUMNS.ASSIGNMENTS;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }
            PLANT_PARAMETER1 = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE1,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC1,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }
                   
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
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
       
        _common.select_allContainerData(cnt.uuid.PLANT_GROUP)
        _common.clickOn_toolbarButton(cnt.uuid.PLANT_GROUP,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create Sub Plant Group Record", function () {
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.setDefaultView(app.TabBar.PLANT_GROUP_AND_LOCATIONS)
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)            
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_A_PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_A_PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
     
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_B_PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_B_PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()        
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP,PLANT_GROUP_1)     
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,PLANT_GROUP_1)
     
    })
     
    it("TC - Create New Specific Value Records ", function () {
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SPECIFIC_VALUES, app.FooterTab.SPECIFIC_VALUES, 1)
            _common.setup_gridLayout(cnt.uuid.SPECIFIC_VALUES, CONTAINER_COLUMNS_SPECIFIC_VALUE)
            _common.clear_subContainerFilter(cnt.uuid.SPECIFIC_VALUES)
        })     
        _common.create_newRecord(cnt.uuid.SPECIFIC_VALUES)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SPEC_VALUE_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SPECIFIC_VALUES, app.GridCells.SPECIFIC_VALUE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_SPECIFIC_VALUE.SPECIFIC_VALUE_TYPE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SPECIFIC_VALUES,app.GridCells.UOM_FK,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_SPECIFIC_VALUE.UOM)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.VALUE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_SPECIFIC_VALUE.VALUE)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.FACTOR,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.FACTOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.SPECIFIC_VALUES, app.GridCells.COST_CODE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.COST_CODE)
        cy.SAVE()
        _common.set_cellCheckboxValue(cnt.uuid.SPECIFIC_VALUES,app.GridCells.ISINHERITED,commonLocators.CommonKeys.CHECK)       
        cy.SAVE()
        _common.waitForLoaderToDisappear()     
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)            
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP,SUB_A_PLANT_GROUP_1)
        _common.clickOn_cellHasValue(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, SUB_A_PLANT_GROUP_1)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SPECIFIC_VALUES, app.FooterTab.SPECIFIC_VALUES, 1)            
            _common.clear_subContainerFilter(cnt.uuid.SPECIFIC_VALUES)
        }) 
        _common.select_allContainerData(cnt.uuid.SPECIFIC_VALUES)
        _common.assert_cellData(cnt.uuid.SPECIFIC_VALUES, app.GridCells.DESCRIPTION_INFO, SPEC_VALUE_DESC)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)            
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP,SUB_B_PLANT_GROUP_1)
        _common.select_allContainerData(cnt.uuid.SPECIFIC_VALUES)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SPECIFIC_VALUES, app.FooterTab.SPECIFIC_VALUES, 1)            
            _common.clear_subContainerFilter(cnt.uuid.SPECIFIC_VALUES)
        }) 
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.SPECIFIC_VALUES, app.GridCells.DESCRIPTION_INFO, SPEC_VALUE_DESC)
     
    })
    it("TC - Verify Create Plant From Plant Group", function () {
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)            
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP,SUB_A_PLANT_GROUP_1)
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,SUB_A_PLANT_GROUP_1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait 
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_PARAMETER)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)        
            _common.setup_gridLayout(cnt.uuid.PLANT,CONTAINER_COLUMNS_PLANT)
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT,app.GridCells.CODE,PLANT_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PLANT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.AVAILABLE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PLANT_GROUP)        
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)            
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP,SUB_B_PLANT_GROUP_1)
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,SUB_B_PLANT_GROUP_1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait 
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_PARAMETER1)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)             
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT,app.GridCells.CODE,PLANT_CODE1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PLANT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.AVAILABLE)
    })
    it("TC - Assignment one plant to another Plant", function() {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)            
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
        })
        _common.search_inSubContainer(cnt.uuid.PLANT,PLANT_CODE1)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_ASSIGNMENT, app.FooterTab.ASSIGNMENTS, 1)  
            _common.setup_gridLayout(cnt.uuid.PLANT_ASSIGNMENT,CONTAINER_COLUMNS_ASSIGNMENTS)          
            _common.clear_subContainerFilter(cnt.uuid.PLANT_ASSIGNMENT)
        })
        _common.create_newRecord(cnt.uuid.PLANT_ASSIGNMENT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_ASSIGNMENT,app.GridCells.PLANT_2_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PLANT_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.PLANT_ASSIGNMENT,app.GridCells.PLANT_2_FK_DESCRIPTION)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT_ASSIGNMENT,app.GridCells.PLANT_2_FK,PLANT_CODE)
    })
    after(() => {
        cy.LOGOUT();
    });
})