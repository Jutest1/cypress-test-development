
import { btn,tile, app, cnt,sidebar,commonLocators} from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import {_procurementPage,_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import Sidebar from 'cypress/locators/sidebar';
import CommonLocators from "cypress/locators/common-locators";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CHARGROUP_DESC = "CHARGROUP-" + Cypress._.random(0, 9999);
const CHAR_CODE = "CHAR-" + Cypress._.random(0, 9999);
const CHAR_DESC = "CHAR_DESC-" + Cypress._.random(0, 9999);
const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "SA-" + Cypress._.random(0, 999);
const AG_CODE = "AG_CODE-" + Cypress._.random(0, 999);
const AG_DESC = "AG_DESC-" + Cypress._.random(0, 999);
const AGA_CODE = "AGA_CODE-" + Cypress._.random(0, 999);
const AGA_DESC = "AGA_DESC-" + Cypress._.random(0, 999);



let CONTAINER_COLUMNS_CHARACTERISTICS;
let CONTAINERS_CHARACTERISTICS;
let CONTAINER_COLUMNS_CHARACTERISTICS_GROUP;
let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let SCHEDULE_ACTIVITY_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE
let CHARACTERISTICS_SEC;
let CONTAINER_COLUMNS_CHARACTERISTICS_SEC;
let CONTAINERS_DEFINE_CHARACTERISTICS;
let CONTAINERS_SCHEDULE;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Activity Template");
ALLURE.story("SCH- 3.10 | Add Characteristics");

describe("SCH- 3.10 | Add Characteristics", () => {
    before(function () { 
      cy.fixture("scheduling/sch-3.10-add-characteristics.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_CHARACTERISTICS_GROUP= this.data.CONTAINER_COLUMNS.CHARACTERISTICS_GROUP
      CONTAINERS_CHARACTERISTICS= this.data.CONTAINERS.CHARACTERISTICS
      CONTAINER_COLUMNS_CHARACTERISTICS= this.data.CONTAINER_COLUMNS.CHARACTERISTICS
      CHARACTERISTICS_SEC= this.data.CHARACTERISTICS_SEC
      CONTAINER_COLUMNS_CHARACTERISTICS_SEC=this.data.CONTAINER_COLUMNS.CHARACTERISTICS_SEC
      CONTAINERS_DEFINE_CHARACTERISTICS= this.data.CONTAINERS.DEFINE_CHARACTERISTICS
      CONTAINERS_SCHEDULE = this.data.CONTAINERS.SCHEDULE
      CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
      CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
      CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
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
      it("TC- Create Characteristic Group ,Characteristic and Characteristic Sections", function () {
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
          _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.CHARACTERISTICS);      
          _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_GROUPS, app.FooterTab.CHARACTERISTIC_GROUP, 0);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_GROUPS,CONTAINER_COLUMNS_CHARACTERISTICS_GROUP)
          });
          _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.create_newRecord(cnt.uuid.CHARACTERISTIC_GROUPS)
          _procurementPage.enterRecord_ToCreateCharacteristicGroups(CHARGROUP_DESC)
          cy.SAVE()
          _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.FooterTab.CHARATERISTICS, 1);
            _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,CONTAINER_COLUMNS_CHARACTERISTICS)
          });
          _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
          _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
          _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR_CODE,CHAR_DESC,CONTAINERS_CHARACTERISTICS.PERCENT)
          cy.SAVE()
          _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 2);
           _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_SECTIONS,CONTAINER_COLUMNS_CHARACTERISTICS_SEC)
          });
          _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
          _procurementPage.characteristicsSections(CHARACTERISTICS_SEC)
          cy.SAVE()
          _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
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
      it("TC- Define Characteristic", function () {
          _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.TEMPLATE_CHARACTERISTICS, app.FooterTab.CHARATERISTICS);
          });
          _common.create_newRecord(cnt.uuid.TEMPLATE_CHARACTERISTICS)
          _common.waitForLoaderToDisappear();
          _procurementPage.enterRecord_ToCreateCharacteristics(cnt.uuid.TEMPLATE_CHARACTERISTICS,CONTAINERS_DEFINE_CHARACTERISTICS.CHAR_CODE,CONTAINERS_DEFINE_CHARACTERISTICS.CHAR_VALUE,app.InputFields.INPUT_GROUP_CONTENT)
          cy.SAVE()
          cy.REFRESH_CONTAINER()
          _common.waitForLoaderToDisappear()
      });
      it("TC- Create new schedule header and activity record.", function () {          
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
      it("TC- Add activity structure ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_TEMPLATE,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,ACTIVITY_STRUCTURE_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      });
      it("TC- Verify the Created characteristics ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
         _common.clear_subContainerFilter(cnt.uuid.SCHEDULE_CHARACTERISTICS)
         _common.select_tabFromFooter(cnt.uuid.SCHEDULE_CHARACTERISTICS, app.FooterTab.CHARATERISTICS)
        });
        _common.search_inSubContainer(cnt.uuid.SCHEDULE_CHARACTERISTICS,CONTAINERS_DEFINE_CHARACTERISTICS.CHAR_CODE)
       _common.waitForLoaderToDisappear();
       _common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULE_CHARACTERISTICS,app.GridCells.DESCRIPTION,CONTAINERS_DEFINE_CHARACTERISTICS.CHAR_CODE)
      });  
      after(() => {
        cy.LOGOUT();
        })
});
