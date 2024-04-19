import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, btn,commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'


const PRJ_NO = "PRJ-NO-"+ Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-NAME-"+ Cypress._.random(0, 999);
const LOCATION_CODE = "LOC-CODE-"+ Cypress._.random(0, 999);
const LOCATION_DESC = "LOC-DESC-"+ Cypress._.random(0, 999);
const SUB_LOCATION_CODE = "LOC-CODE-"+ Cypress._.random(0, 999);
const SUB_LOCATION_DESC = "LOC-DESC-"+ Cypress._.random(0, 999);


const ALLURE = Cypress.Allure.reporter.getInterface();
let CONTAINER_PROJECT;
let PROJECT_PARAMETER:DataCells;
let CONTAINER_COLUMNS_LOCATION;
let CONTAINERS_LOCATION;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Project Locations");
ALLURE.story("SCH- 3.29 | Outdent Locations");

describe("SCH- 3.29 | Outdent Locations", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.29-outdent-locations.json").then((data) => {
            this.data = data
            
            CONTAINER_COLUMNS_LOCATION = this.data.CONTAINER_COLUMNS.LOCATION;            
            CONTAINERS_LOCATION= this.data.CONTAINERS.LOCATION;

            CONTAINER_PROJECT = this.data.CONTAINERS.PROJECT 
            PROJECT_PARAMETER = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
                [commonLocators.CommonLabels.NAME]:PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]:CONTAINER_PROJECT.CLERK_NAME
            }       	
    
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()                  
    })  
    it("TC - Create Project", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    }) 
    it("TC - Create Locations", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {    
            _common.setDefaultView(app.TabBar.PROJECT)    
            _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS,2);
            _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATION)
            _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
        });        
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE,LOCATION_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATION.QTY_FACTOR[0])        
        cy.SAVE()
        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_LOCATION,app.GridCells.CODE,LOCATION_CODE)
        _common.create_newSubRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(SUB_LOCATION_CODE,SUB_LOCATION_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATION.QTY_FACTOR[1])        
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        
   })
   it("TC - Outdent Locations", function () {
    _common.select_rowHasValue(cnt.uuid.PROJECT_LOCATION, SUB_LOCATION_CODE)
    _common.clickOn_toolbarButton(cnt.uuid.PROJECT_LOCATION, btn.ToolBar.ICO_PROMOTE)
    cy.SAVE()
    _common.select_rowHasValue(cnt.uuid.PROJECT_LOCATION,LOCATION_CODE)
    _common.waitForLoaderToDisappear()    
    _validate.verify_isIconPresent(cnt.uuid.PROJECT_LOCATION, app.GridCells.TREE, app.GridCellIcons.ICO_LOCATION2)         
    cy.wait(1000) //Wait is required to load data. 
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.DESCRIPTION_INFO,LOCATION_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,CONTAINERS_LOCATION.QTY_FACTOR[0])
    _common.search_inSubContainer(cnt.uuid.PROJECT_LOCATION, SUB_LOCATION_CODE)
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.PROJECT_LOCATION,SUB_LOCATION_CODE)
    _validate.verify_isIconPresent(cnt.uuid.PROJECT_LOCATION, app.GridCells.TREE, app.GridCellIcons.ICO_LOCATION2)
    cy.wait(1000) //Wait is required to load data.
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.DESCRIPTION_INFO,SUB_LOCATION_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,CONTAINERS_LOCATION.QTY_FACTOR[1])

   })
   after(() => {
    cy.LOGOUT();
   })
})