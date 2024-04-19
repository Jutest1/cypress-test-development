import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, btn,commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import CommonLocators from 'cypress/locators/common-locators';
import Buttons from 'cypress/locators/buttons';

const SCH_CODE = "SCH-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = "SA-" + Cypress._.random(0, 999);
const LOCATION_CODE = "LOC-CODE-"+ Cypress._.random(0, 999);
const LOCATION_DESC = "LOC-DESC-"+ Cypress._.random(0, 999);
const SUB_LOCATION_CODE = "SLOC-CODE-"+ Cypress._.random(0, 999);
const SUB_LOCATION_DESC = "SLOC-DESC-"+ Cypress._.random(0, 999);
const LOCATION_CODE1 = "LOC-CODE-"+ Cypress._.random(0, 999);
const LOCATION_DESC1 = "LOC-DESC-"+ Cypress._.random(0, 999);
const SUB_LOCATION_CODE1 = "SLOC-CODE-"+ Cypress._.random(0, 999);
const SUB_LOCATION_DESC1 = "SLOC-DESC-"+ Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let SCHEDULE_PARAMETERS:DataCells;
let CONTAINERS_SCHEDULE;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_LOCATION;
let CONTAINERS_LOCATION;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Project");
ALLURE.story("SCH- 3.27 | Create Locations");

describe("SCH- 3.23 | Create Locations", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.27-create-locations.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_LOCATION = this.data.CONTAINER_COLUMNS.LOCATION;
            CONTAINERS_SCHEDULE = this.data.CONTAINERS.SCHEDULE
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            CONTAINERS_LOCATION= this.data.CONTAINERS.LOCATION
            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCH_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCH_DESC,
            };			
    
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
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
        _common.create_newSubRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(SUB_LOCATION_CODE,SUB_LOCATION_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATION.QTY_FACTOR[0])        
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_LOCATION,app.GridCells.CODE,LOCATION_CODE)
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE1,LOCATION_DESC1)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATION.QTY_FACTOR[1])        
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(SUB_LOCATION_CODE1,SUB_LOCATION_DESC1)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATION.QTY_FACTOR[1])        
        cy.SAVE()
   })
   it("TC - Verify loctions in location details container", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {        
            _common.select_tabFromFooter(cnt.uuid.LOCATION_DETAILS, app.FooterTab.LOCATIONS_DETAILS,3);            
        });        
        _validate.verify_isRecordInPresent_inContainersForm(cnt.uuid.LOCATION_DETAILS,commonLocators.CommonLabels.CODE,commonLocators.CommonElements.DOMAIN_TYPE_CODE,SUB_LOCATION_CODE1)    
        
   })
   it("TC - Verify Location is delete or not", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {        
            _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS,2);           
        });
        _common.search_inSubContainer(cnt.uuid.PROJECT_LOCATION,SUB_LOCATION_CODE1)      
        _common.delete_recordFromContainer(cnt.uuid.PROJECT_LOCATION)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.PROJECT_LOCATION,SUB_LOCATION_CODE1)
        _validate.verify_isRecordDeleted(cnt.uuid.PROJECT_LOCATION,SUB_LOCATION_CODE1)
   })
    it("TC - Create new schedule header and activity record.", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)    
   });
   it("TC - Create Activity structure and add Location to it", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)        
        _schedulePage.enterRecord_toCreateActivityStructure(SCH_ACTDESC,CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,CONTAINERS_ACTIVITY_STRUCTURE.UOM)        
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.LOCATION_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,LOCATION_CODE1)
        _common.waitForLoaderToDisappear()        
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.LOCATION_FK,LOCATION_CODE1)
        _common.openTab(app.TabBar.LOB).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE,0)
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.LOCATION_FK,LOCATION_CODE1)
   })

})