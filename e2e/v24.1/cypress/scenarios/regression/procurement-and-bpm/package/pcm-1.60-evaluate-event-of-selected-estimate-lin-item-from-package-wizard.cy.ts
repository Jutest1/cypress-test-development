
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _schedulePage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar} from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="33" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SADES-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);
let PLANNED_START
let PLANNED_FINISH
let ACTUAL_START
let ACTUAL_FINISH
let SCH_PARAMETERS:DataCells
let CONTAINER_COLUMNS_SCHEDULING
let CONTAINERS_SCHEDULING_ACTIVITY
let CONTAINER_COLUMNS_SCHEDULING_ACTIVITY

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999)
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINER_COLUMNS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells

let ESTIMATE_CONFIGURATION_PARAMETER:DataCells

let CONTAINER_COLUMNS_RESOURCE
let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS:DataCells

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE

let CONTAINER_COLUMNS_EVENT

let CONTAINER_COLUMNS_PROCUREMENT_EVENT

let CONTAINER_COLUMNS_DATA_TYPE

let CONTAINER_COLUMNS_DATA_RECORD
let CONTAINER_COLUMNS_PACKAGE_ITEMS

let EVENT_PARAMETER_1:DataCells
let EVENT_PARAMETER_2:DataCells
let EVENT_PARAMETER_3:DataCells
let EVENT_PARAMETER_4:DataCells
let EVENT_PARAMETER_5:DataCells


let EVENT_PARAMETER_EDIT_1
let EVENT_PARAMETER_EDIT_2
let EVENT_PARAMETER_EDIT_3
let EVENT_PARAMETER_EDIT_4
let EVENT_PARAMETER_EDIT_5
let EVENT_PARAMETER_EDIT_6
let EVENT_PARAMETER_EDIT_7
let EVENT_PARAMETER_EDIT_8
let EVENT_PARAMETER_EDIT_9
let EVENT_PARAMETER_EDIT_10
let EVENT_PARAMETER_EDIT_11
let EVENT_PARAMETER_EDIT_12
let EVENT_PARAMETER_EDIT_13
let EVENT_PARAMETER_EDIT_14
let EVENT_PARAMETER_EDIT_15
let EVENT_PARAMETER_EDIT_16
let EVENT_PARAMETER_EDIT_17
let EVENT_PARAMETER_EDIT_18
let EVENT_PARAMETER_EDIT_19
let EVENT_PARAMETER_EDIT_20
let EVENT_PARAMETER_EDIT_21

let CONTAINERS_EVENT

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");

ALLURE.story("PCM- 1.60 | Evaluate event of selected estimate line item from package wizard");

describe("PCM- 1.60 | Evaluate event of selected estimate line item from package wizard", () => {
        
    before(function () {
        cy.fixture("pcm/pcm-1.60-evaluate-event-of-selected-estimate-lin-item-from-package-wizard.json")
          .then((data) => {
            this.data = data;

            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
            }

            SCH_PARAMETERS={
                [app.GridCells.CODE]:SCH_CODE,
                [app.GridCells.DESCRIPTION_INFO]:SCH_DESC
            }
            CONTAINER_COLUMNS_SCHEDULING=this.data.CONTAINER_COLUMNS.SCHEDULING
            CONTAINERS_SCHEDULING_ACTIVITY=this.data.CONTAINERS.SCHEDULING_ACTIVITY
            CONTAINER_COLUMNS_SCHEDULING_ACTIVITY=this.data.CONTAINER_COLUMNS.SCHEDULING_ACTIVITY
            PLANNED_START=_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
            PLANNED_FINISH=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_SCHEDULING_ACTIVITY.NO_OF_DAYS[0])
            ACTUAL_START=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_SCHEDULING_ACTIVITY.NO_OF_DAYS[1])
            ACTUAL_FINISH=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_SCHEDULING_ACTIVITY.NO_OF_DAYS[2])

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
            }
            
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS={
                [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:SCH_DESC                
            }

            ESTIMATE_CONFIGURATION_PARAMETER = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.ESTIMATE_STRUCTURE],
                [commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS]:commonLocators.CommonKeys.EDIT,
                [app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.SCHEDULES,
                [app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.FROM_STRUCTURE
            }

            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };

            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE

            CONTAINER_COLUMNS_EVENT=this.data.CONTAINER_COLUMNS.EVENT

            CONTAINER_COLUMNS_PROCUREMENT_EVENT=this.data.CONTAINER_COLUMNS.PROCUREMENT_EVENT

            CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
            CONTAINER_COLUMNS_DATA_RECORD=this.data.CONTAINER_COLUMNS.DATA_RECORD
            CONTAINERS_EVENT=this.data.CONTAINERS.EVENT

            EVENT_PARAMETER_1={
                [app.GridCells.PRC_EVENT_TYPE_FK]:CONTAINERS_EVENT.TYPE[1],
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_SYSTEM_EVENT,
                [app.GridCells.PRC_SYSTEM_EVENT_TYPE_END_FK]:commonLocators.CommonKeys.PLANNED_START_PACKAGE
            }

            EVENT_PARAMETER_3={
                [app.GridCells.PRC_EVENT_TYPE_FK]:CONTAINERS_EVENT.TYPE[2],
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[2],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_CUSTOM_EVENT_START,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[2],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.BEFORE_CUSTOM_EVENT_END,
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[1],
                [app.GridCells.PRC_EVENT_TYPE_END_FK]:CONTAINERS_EVENT.TYPE[1]
            }

            EVENT_PARAMETER_2={
                [app.GridCells.PRC_EVENT_TYPE_FK]:CONTAINERS_EVENT.TYPE[0],
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[0],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_START,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[0],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_END,
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[2],
                [app.GridCells.PRC_EVENT_TYPE_END_FK]:CONTAINERS_EVENT.TYPE[2]
            }

            EVENT_PARAMETER_4={
                [app.GridCells.PRC_EVENT_TYPE_FK]:CONTAINERS_EVENT.TYPE[0],
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[0],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[0],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }

            EVENT_PARAMETER_5={
                [app.GridCells.PRC_EVENT_TYPE_FK]:CONTAINERS_EVENT.TYPE[1],
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.BEFORE_SYSTEM_EVENT,
                [app.GridCells.PRC_SYSTEM_EVENT_TYPE_END_FK]:commonLocators.CommonKeys.PLANNED_END_PACKAGE,
                [app.GridCells.ADD_LEAD_TIME_TO_START]:commonLocators.CommonKeys.SAFETY_LEAD_TIME,
                [app.GridCells.ADD_LEAD_TIME_TO_END]:commonLocators.CommonKeys.SAFETY_LEAD_TIME
            }

            EVENT_PARAMETER_EDIT_1={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END
            }
            EVENT_PARAMETER_EDIT_2={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_EVENT_START
            }
            EVENT_PARAMETER_EDIT_3={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_EVENT_START
            }
            EVENT_PARAMETER_EDIT_4={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_5={
                [app.GridCells.PRC_EVENT_TYPE_FK]:CONTAINERS_EVENT.TYPE[1],
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.BEFORE_CUSTOM_EVENT_START,
                [app.GridCells.PRC_EVENT_TYPE_END_FK]:CONTAINERS_EVENT.TYPE[0]
            }
            EVENT_PARAMETER_EDIT_6={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_7={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_SYSTEM_EVENT,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE,
                [app.GridCells.PRC_SYSTEM_EVENT_TYPE_START_FK]:commonLocators.CommonKeys.PLANNED_END_PACKAGE
            }
            EVENT_PARAMETER_EDIT_8={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_9={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.AFTER_SYSTEM_EVENT,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE,
                [app.GridCells.PRC_SYSTEM_EVENT_TYPE_START_FK]:commonLocators.CommonKeys.PLANNED_END_PACKAGE
            }
            EVENT_PARAMETER_EDIT_10={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_11={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_CUSTOM_EVENT_START,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE,
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[0]
            }
            EVENT_PARAMETER_EDIT_12={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_13={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_CUSTOM_EVENT_END,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_START,
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[0],
                [app.GridCells.PRC_EVENT_TYPE_END_FK]:CONTAINERS_EVENT.TYPE[0]
            }
            EVENT_PARAMETER_EDIT_14={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_15={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_START,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE,
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[0]
            }
            EVENT_PARAMETER_EDIT_16={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_17={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_END,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_START,
                [app.GridCells.PRC_EVENT_TYPE_END_FK]:CONTAINERS_EVENT.TYPE[0],
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[0]
            }
            EVENT_PARAMETER_EDIT_18={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE     
            }
            EVENT_PARAMETER_EDIT_19={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_START,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.AFTER_CUSTOM_EVENT_END,
                [app.GridCells.PRC_EVENT_TYPE_END_FK]:CONTAINERS_EVENT.TYPE[0],
                [app.GridCells.PRC_EVENT_TYPE_START_FK]:CONTAINERS_EVENT.TYPE[0]
            }
            EVENT_PARAMETER_EDIT_20={
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.NO_START_DATE,
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.NO_END_DATE
            }
            EVENT_PARAMETER_EDIT_21={
                [app.GridCells.START_NO_OF_DAYS]:CONTAINERS_EVENT.START_DAY[1],
                [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END,
                [app.GridCells.END_NO_OF_DAYS]:CONTAINERS_EVENT.END_DAY[1],
                [app.GridCells.END_BASIS]:commonLocators.CommonKeys.BEFORE_SYSTEM_EVENT
            }

            CONTAINER_COLUMNS_PACKAGE_ITEMS=this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS

          })
          .then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
          })
    });  

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new schedule header and activity structure', function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.setDefaultView(app.TabBar.SCHEDULING)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULING)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        });
        _common.select_rowHasValue(cnt.uuid.PROJECTS,PROJECT_NO)

        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
        _common.create_newRecord(cnt.uuid.SCHEDULES)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCH_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
  
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.waitForLoaderToDisappear()
            _common.setDefaultView(app.TabBar.PLANNING,commonLocators.CommonKeys.DEFAULT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_SCHEDULING_ACTIVITY)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACT_DESC, CONTAINERS_SCHEDULING_ACTIVITY.QUANTITY, CONTAINERS_SCHEDULING_ACTIVITY.UOM,PLANNED_START,PLANNED_FINISH)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.ACTUAL_START,app.InputFields.INPUT_GROUP_CONTENT,ACTUAL_START)
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.waitForLoaderToDisappear()

        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.ACTUAL_FINISHED,app.InputFields.INPUT_GROUP_CONTENT,ACTUAL_FINISH)
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    })
  
    it('TC - Create new estimate record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        });
        _common.select_rowHasValue(cnt.uuid.PROJECTS,PROJECT_NO)
      
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate scheduling line item and create resource", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS,btn.IconButtons.ICO_SETTING_DOC)
        _common.waitForLoaderToDisappear()
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIGURATION_PARAMETER)
        cy.wait(100).then(() => {
          _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
        })
  
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
  
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,SCH_ACT_DESC)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()     
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()     
    });

    it("TC - Create/Update material package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
          _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);     
    }) 

    it("TC - Select a package with structure is null, click wizard , it will only allow to evaluate package of current project, not for current select package", function () {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
        })
        _common.maximizeContainer(cnt.uuid.PACKAGE)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
        _common.waitForLoaderToDisappear()

        _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.PLANNED_END,"PLANNED_END_PCK")
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.PLANNED_START,"PLANNED_START_PCK")
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.ACTUAL_START,"ACTUAL_START_PCK")
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.ACTUAL_END,"ACTUAL_END_PCK")

        _common.clickOn_activeRowCell(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK)
        _common.clickOn_activeContainerButton(cnt.uuid.PACKAGE,btn.IconButtons.ICO_INPUT_DELETE)
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    
        _common.minimizeContainer(cnt.uuid.PACKAGE)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()

        _validate.verify_modalTextShouldNotExist(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE)
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.CANCEL)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Select a package with structure, but the event in structure is null, click wizard for current package, it will not create events", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)
        
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })
        _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.EVENT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))
        _common.waitForLoaderToDisappear()

        _common.clickOn_activeContainerButton(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.clickOn_activeContainerButton(cnt.uuid.PACKAGE,app.GridCells.CODE)
        _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()

        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        })    
        _common.waitForLoaderToDisappear()
        _validate.verify_recordShouldNotExistInSubcontainer(cnt.uuid.PROCUREMENT_EVENT)
        _common.waitForLoaderToDisappear()
    })

    /*----*/
    it("TC - Set data under customizing", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.PROCURMENT_EVENT_TYPES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.PROCURMENT_EVENT_TYPES)
      
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORD)
        })
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.DESIGN_READY)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.DESIGN_READY)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.SYSTEM_EVENT_TYPE_START_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.PLANNED_START_PACKAGE)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.SYSTEM_EVENT_TYPE_END_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.PLANNED_END_PACKAGE)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.SYSYTEM_OPTION)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.SYSYTEM_OPTION)
      
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.AUTO_UPDATE_CHAINED_EVENTS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.AUTO_UPDATE_CHAINED_EVENTS)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.PARAMETER_VALUE,app.InputFields.DOMAIN_TYPE_COMMENT,"1")
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Modify man. start or man. end , the reference event record will be recalculate too", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })
        _common.maximizeContainer(cnt.uuid.EVENT)
        _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.EVENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.EVENT)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))


        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS);
            _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.safetyleadtime,CONTAINER_COLUMNS_PACKAGE_ITEMS.prcpackagefk],cnt.uuid.PACKAGEITEMS)
        }) 

        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS,)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK,Cypress.env("PACKAGE_CODE_0"))
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS,app.GridCells.SAFETY_LEAD_TIME,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_EVENT.SAFETY_LEAD_TIME)
        _common.clickOn_activeRowCell(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK)
        _common.waitForLoaderToDisappear()

        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 
        _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.PROCUREMENT_EVENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[2])
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE,app.InputFields.INPUT_GROUP_CONTENT,_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,3))
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE,app.InputFields.INPUT_GROUP_CONTENT,_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,6))
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE).then(($manStart)=>{
            expect($manStart.text()).not.equals("")
        })
        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE).then(($manEnd)=>{
            expect($manEnd.text()).not.equals("")
        })

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        }) 
        _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.PROCUREMENT_EVENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    /*----*/

    it("TC - Select a package with structure, and the event in structure, click wizard for current package, it will generate events", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })
        _common.waitForLoaderToDisappear()

        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.EVENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    
        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
    })

    it("TC - After generate event, the calc.start will calculate according prc_structureevent.start basis and start no. of days", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.select_rowHasValue(cnt.uuid.EVENT,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE,app.InputFields.INPUT_GROUP_CONTENT,_common.getDate("current"))
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE,app.InputFields.INPUT_GROUP_CONTENT,_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5))
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE).then($manEnd=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,parseInt(CONTAINERS_EVENT.START_DAY[0]),$manEnd.text()))
        })
    })

    it("TC - After generate event, the calc.end will calculate according prc_structureevent.end basis and end no. of days", function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })
        
        _common.select_rowHasValue(cnt.uuid.EVENT,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE).then($manStart=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_INCREMENT,parseInt(CONTAINERS_EVENT.END_DAY[0]),$manStart.text()))
        })

    })

    it("TC - If prc_structureevent.start basis='No Start Date', the calc. start will be null", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.select_rowHasValue(cnt.uuid.EVENT,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,"")

    })

    it("TC - If prc_structureevent.start basis=Before Event End, the calc. start = calc. end -start no. of days", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })
        
        _common.select_rowHasValue(cnt.uuid.EVENT,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_5)

        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_CALCULATED).then($calEnd=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),$calEnd.text()))
        })
    })

    it("TC - If prc_structureevent.start basis='Before System Event', the calc. start= system event type- start.no of day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })
        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_6)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    
        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_7)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),Cypress.env("PLANNED_END_PCK")))
    })

    it("TC - If prc_structureevent.start basis='after System Event', the calc. start= system event type+start.no of day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_8)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_9)

        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_INCREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),Cypress.env("PLANNED_END_PCK")))
    })

    it("TC - If prc_structureevent.start basis='Before Custom Event Start', the calc. start= event type start -start.no of day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_10)

        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_11)

        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE).then($manStart=>{
            _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),$manStart.text()))
        })        
    })

    it("TC - If prc_structureevent.start basis='Before Custom Event End', the calc. start= event type end-start.no of day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_12)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_13)

        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE).then($manEnd=>{
            _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),$manEnd.text()))
        })  
    })

    it("TC - If prc_structureevent.start basis='after Custom Event Start', the calc. start= event type start +start.no of day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 

        cy.REFRESH_CONTAINER()
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_14)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_15)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE).then($manStart=>{
            _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_INCREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),$manStart.text()))
        }) 
    })

    it("TC - If prc_structureevent.start basis='after Custom Event End', the calc. start= event type end+start.no of day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 

        cy.REFRESH_CONTAINER()
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_16)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_17)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE).then($manEnd=>{
            _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_INCREMENT,parseInt(CONTAINERS_EVENT.START_DAY[1]),$manEnd.text()))
        }) 
    })

    it("TC - Same calculate logic for calc. end", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_18)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_19)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[0])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_OVERWRITE).then($manEnd=>{
            _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_INCREMENT,parseInt(CONTAINERS_EVENT.END_DAY[1]),$manEnd.text()))
        }) 
    })

    it("TC - Set data under customizing", function () {
        _common.toggleSidebar(commonLocators.CommonKeys.QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.PROCURMENT_EVENT_TYPES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.PROCURMENT_EVENT_TYPES)
      
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORD)
        })
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.DESIGN_READY)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.DESIGN_READY)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.SYSTEM_EVENT_TYPE_START_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.ACTUAL_START_PACKAGE)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.SYSTEM_EVENT_TYPE_END_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.ACTUAL_END_PACKAGE)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - If PRC_STRUCTUREEVENT.PRC_EVENTTYPE_FK.PRC_SYSTEMEVENTTYPE_START_FK specifies, then it will calculate actual start", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 

        cy.REFRESH_CONTAINER()
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[0])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_20)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.EVENT,app.GridCells.PRC_EVENT_TYPE_FK,CONTAINERS_EVENT.TYPE[1])
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_EDIT_21)
 
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_ACTUAL,Cypress.env("ACTUAL_START_PCK"))
        
    })

    it("TC - If PRC_STRUCTUREEVENT.PRC_EVENTTYPE_FK.PRC_SYSTEMEVENTTYPE_END_FK specifies, then it will calculate actual end", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    
        
        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_ACTUAL,Cypress.env("ACTUAL_END_PCK"))
    })

    it("TC - PRC_STRUCTUREEVENT.include lead time to end and PRC_STRUCTUREEVENT.inculde lead time to start has value, the start day should be start no.of day+ start lead time day. and the end day should be end no.of day+ end lead time day", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
        }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 1)
            _common.setup_gridLayout(cnt.uuid.EVENT, CONTAINER_COLUMNS_EVENT);
        })

        _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.EVENT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        
        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_5)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS);
            _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.safetyleadtime,CONTAINER_COLUMNS_PACKAGE_ITEMS.prcpackagefk],cnt.uuid.PACKAGEITEMS)
        }) 

        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS,)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK,Cypress.env("PACKAGE_CODE_0"))
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS,app.GridCells.SAFETY_LEAD_TIME,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_EVENT.SAFETY_LEAD_TIME)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK)

        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS,app.GridCells.SAFETY_LEAD_TIME,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_EVENT.SAFETY_LEAD_TIME)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK)

        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_EVENT, CONTAINER_COLUMNS_PROCUREMENT_EVENT);
        }) 
        _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.PROCUREMENT_EVENT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EVALUATE_EVENTS);
        _common.waitForLoaderToDisappear()
        _package.create_evaluateEvents_fromWizard(commonLocators.CommonLabels.EVALUATE_CURRENT_PACKAGE,0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2)
        })    

        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,(parseInt(CONTAINERS_EVENT.END_DAY[1])+parseInt(CONTAINERS_EVENT.SAFETY_LEAD_TIME)),Cypress.env("PLANNED_END_PCK")))
    
        _common.select_rowHasValue(cnt.uuid.PROCUREMENT_EVENT,CONTAINERS_EVENT.TYPE[1])
        _common.getText_fromCell(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.END_CALCULATED).then(($calEnd)=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_CALCULATED,_common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT,(parseInt(CONTAINERS_EVENT.START_DAY[1])+parseInt(CONTAINERS_EVENT.SAFETY_LEAD_TIME)),$calEnd.text()))
        })
    })

});