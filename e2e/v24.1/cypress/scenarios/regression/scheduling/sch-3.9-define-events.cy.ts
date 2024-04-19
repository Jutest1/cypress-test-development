import { btn,tile, app, cnt,sidebar,commonLocators } from "cypress/locators";
import {_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
import Sidebar from 'cypress/locators/sidebar';
import CommonLocators from "cypress/locators/common-locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC= "SCH-DESC-" + Cypress._.random(0, 999);
const AG_CODE = "AG_CODE-" + Cypress._.random(0, 999);
const AG_DESC = "AG_DESC-" + Cypress._.random(0, 999);
const AGA_CODE = "AGA_CODE-" + Cypress._.random(0, 999);
const AGA_DESC = "AGA_DESC-" + Cypress._.random(0, 999);
const EVENT_DESC = "EVENT_DESC-" + Cypress._.random(0, 999);

let CONTAINERS_EVENT;
let SCHEDULE_PARAMETERS:DataCells;
let SCHEDULE_ACTIVITY_PARAMETERS:DataCells
let ACTIVITY_STRUCTURE_DESC;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Activity Template");
ALLURE.story("SCH- 3.9 | Define Events");

describe("SCH- 3.9 | Define Events", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.9-define-events.json").then((data) => {
            this.data = data
         CONTAINERS_EVENT= this.data.CONTAINERS.EVENT
         CONTAINERS_ACTIVITY_STRUCTURE= this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES

        SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
        SCHEDULE_ACTIVITY_PARAMETERS = {
            [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
            [app.GridCells.PLANNED_START]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
            [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,5),
            [app.GridCells.PLANNED_DURATION]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_DURATION,5),
        };
       })
     cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
     _common.openDesktopTile(tile.DesktopTiles.PROJECT);
     _common.waitForLoaderToDisappear()
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
     _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    }) 
      it("TC - Create new Activity Group(s)", function () {
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

      it("TC -  Define 'Template Activity Properties'.", function () {
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
        _common.waitForLoaderToDisappear()
       _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AGA_DESC)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
      });
      it("TC -  Define Event in Activity Template", function () {
        _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.TEMPLATE_EVENT, app.FooterTab.EVENTS);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TEMPLATE_EVENT)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_EVENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,EVENT_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.TEMPLATE_EVENT,app.GridCells.IS_DISPLAYED,CONTAINERS_EVENT.CHECKBOX,)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
      });

    it("TC - Create new schedule header and activity record.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
          _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.PROJECT);
          _common.openTab(app.TabBar.SCHEDULING).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);
          _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
          });
          _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
          _common.create_newRecord(cnt.uuid.SCHEDULES);
          _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
          _common.waitForLoaderToDisappear()
          cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        });
    it("TC - Add activity structure ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_TEMPLATE,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    it("TC - Verify the Created Event ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.SCHEDULING_EVENTS,app.FooterTab.EVENTS)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DESCRIPTION,EVENT_DESC)
    })
    after(() => {
      cy.LOGOUT();
      })
});