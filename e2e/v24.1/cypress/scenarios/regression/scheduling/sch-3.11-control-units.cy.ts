import { _assembliesPage, _boqPage,_common,_schedulePage, _estimatePage, _mainView, _modalView, _sidebar, _validate } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CONTGROUP_CODE="CG_CODE_" + Cypress._.random(0, 999);
const CONTGROUP_DESC="CG_DESC_" + Cypress._.random(0, 999);
const CG_DETAILS_DESC="CG_DESC_" + Cypress._.random(0, 999);
const AG_CODE = "AG_CODE-" + Cypress._.random(0, 999);
const AG_DESC = "AG_DESC-" + Cypress._.random(0, 999);
const AGA_CODE = "AGA_CODE-" + Cypress._.random(0, 999);
const AGA_DESC = "AGA_DESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES;
let  CONTAINER_COLUMNS_CALENDAR;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Activity Template");

ALLURE.story("SCH- 3.11 | Control Units ");
describe("SCH- 3.11 | Control Units", () => {
  
    before(function () {
        cy.fixture("scheduling/sch-3.11-control-units.json").then((data) => {
            this.data = data;
            CONTAINERS_DATA_TYPES= this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR
        });
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    }); 

    it("TC - Set Controlling group under customizing module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_DATA_TYPES.CONTROLING_GROUP)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,CONTAINERS_DATA_TYPES.CONTROLING_GROUP)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);   
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CONTGROUP_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTGROUP_DESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()  
        _common.waitForLoaderToDisappear()          
    })
    it("TC - Set Controlling group deatil under customizing module", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_DATA_TYPES.CONTROLING_GROUP_DETAILS)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,CONTAINERS_DATA_TYPES.CONTROLING_GROUP_DETAILS)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);   
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.CONTROLLING_GROUP,commonLocators.CommonKeys.LIST,CONTGROUP_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CG_DETAILS_DESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()  
        _common.waitForLoaderToDisappear()          
    })
    it("TC- Create new Activity Group(s)", function () {        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.ACTIVITY_GROUPS_TEMPLATES);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITYGROUPSTEMPLATES)
        _common.create_newRecord(cnt.uuid.ACTIVITYGROUPSTEMPLATES)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITYGROUPSTEMPLATES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AG_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITYGROUPSTEMPLATES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AG_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    it("TC- Define 'Template Activity Properties'.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.ACTIVITY_TEMPLATES);
        cy.REFRESH_CONTAINER() 
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
           _common.select_tabFromFooter(cnt.uuid.ACTIVITY_GROUPS, app.FooterTab.ACTIVITY_GROUPS);
          _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_GROUPS)
          _common.maximizeContainer(cnt.uuid.ACTIVITY_GROUPS)
          _common.search_inSubContainer(cnt.uuid.ACTIVITY_GROUPS,AG_DESC)
          _common.minimizeContainer(cnt.uuid.ACTIVITY_GROUPS)
          });
          _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.TEMPLATE_ACTIVITY, app.FooterTab.ACTIVITIES);
          });
          _common.clear_subContainerFilter(cnt.uuid.TEMPLATE_ACTIVITY)
          _common.create_newRecord(cnt.uuid.TEMPLATE_ACTIVITY)
          _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AGA_CODE)
          _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AGA_DESC)
         cy.SAVE()
         _common.waitForLoaderToDisappear()
    });
    it("TC - Verify controlling Groups and Controlling Group Details defined in Customizing module", function () {
        _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT, app.FooterTab.CONTROLLING_UNIT_GROUPS_ASSIGNMENT);
         });
        _common.create_newRecord(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT,app.GridCells.CONTROLLING_GROUP,commonLocators.CommonKeys.GRID,CONTGROUP_CODE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT,app.GridCells.CONTROLLING_GROUP_DETAIL,commonLocators.CommonKeys.GRID,CG_DETAILS_DESC)
    });
    after(() => {
        cy.LOGOUT();
        })
});