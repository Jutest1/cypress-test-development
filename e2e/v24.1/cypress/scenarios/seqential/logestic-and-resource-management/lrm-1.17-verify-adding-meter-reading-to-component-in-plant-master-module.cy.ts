import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _package } from "cypress/pages";


// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const LOCATION = "LOC_CODE-" + Cypress._.random(0, 999);
const LOCATION_DESC = "NASHIK-" + Cypress._.random(0, 999);
const CONTROLLING_UNIT_DESC = "ControllingUnit" + Cypress._.random(0, 999);

const PLANT_GROUP = "PG_CODE0" + Cypress._.random(0, 999);
const PG_DESC = "PG-" + Cypress._.random(0, 999);
const PLANT_GROUP_SUBRECORD1 = "SUB1-" + Cypress._.random(0, 999);
const PLANT_GROUP_SUBRECORD2 = "SUB2-" + Cypress._.random(0, 999);
const PLANT_CODE_WIZARD = "PW-" + Cypress._.random(0, 999);
const PLANT_CODE_MANUAL = "PM-" + Cypress._.random(0, 999);
const PLANTW_DESC = "PDESCW-" + Cypress._.random(0, 999);
const PLANTM_DESC = "PDESCM-" + Cypress._.random(0, 999);
const PLANT_COMP_DESC = "EX" + Cypress._.random(0, 999);
const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const MAINTAINACE_DESC = "MAINTAINACE_DESC" + Cypress._.random(0, 999);
const JOBTEMPLET_CODE = "CODE" + Cypress._.random(0, 999);
const JOBTEMPLET_DESC = "Desc" + Cypress._.random(0, 999);
const ACTIVITY1_CODE = "ACT-CODE1" + Cypress._.random(0, 999);
const ACTIVITY1_DESC = "ACT-Desc1" + Cypress._.random(0, 999);
const ACTIVITY2_CODE = "ACT-CODE2" + Cypress._.random(0, 999);
const ACTIVITY2_DESC = "ACT-Desc2" + Cypress._.random(0, 999);
const ACTIVITY3_CODE = "ACT-CODE3" + Cypress._.random(0, 999);
const ACTIVITY3_DESC = "ACT-Desc3" + Cypress._.random(0, 999);
const RECORD1_CODE = "RECORD1-CODE" + Cypress._.random(0, 999);
const RECORD1_DESC = "RECORD1-Desc" + Cypress._.random(0, 999);
const RECORD2_CODE = "RECORD2-CODE" + Cypress._.random(0, 999);
const RECORD2_DESC = "RECORD2-Desc" + Cypress._.random(0, 999);
const RECORD3_CODE = "RECORD3-CODE" + Cypress._.random(0, 999);
const RECORD3_DESC = "RECORD3-Desc" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS;
let MODAL_REQUISITION;
let MODAL_DISPATCH_NOTES;
let DISPATCH_NOTES_PARAMETERS;

let CONTAINERS_CONTROLLING_UNIT;
let CONTAINERS_PLANT_GROUP;
let CONTAINERS_PLANT;
let CONTAINERS_JOB_CARD;
let CONTAINER_SCHEME_RECORD;
let CONTAINER_SCHEME;
let CONTAINERS_PLANT_COMPONENT;
let CONTAINERS_PLANT_METER_READING;

let CONTAINER_COLUMNS_LOCATION;
let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_PLANT_GROUP;
let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTAINER_COLUMNS_CART_TEMPLATE;
let CONTAINER_COLUMNS_ACTIVITIES;
let CONTAINER_COLUMNS_RECORDS;
let CONTAINER_COLUMNS_SCHEME;
let CONTAINER_COLUMNS_SCHEME_RECORD;
let CONTAINER_COLUMNS_PLANT_COMPONENT;
let CONTAINER_COLUMNS_MAINTENANCE;
let CONTAINER_COLUMNS_JOB_CARDS

let PLANT_GROUP_PARAMETER;
let PLANT_GROUP_SUBRECORD_PARAMETER1;
let PLANT_GROUP_SUBRECORD_PARAMETER2;
let PLANT_WIZARD_PARAMETER;
let PLANT_MANUAL_PARAMETER;
let CONTROLLING_UNIT_PARAMETERS;
let JOB_TEMPLET_PARAMETER;
let JOB_ACTIVITIES_PARAMETER1;
let JOB_ACTIVITIES_PARAMETER2;
let JOB_ACTIVITIES_PARAMETER3;
let RECORDS_PARAMETER1;
let RECORDS_PARAMETER2;
let RECORDS_PARAMETER3;
let SCHEME_PARAMETER;
let SCHEME_RECORD_PARAMETER1;
let SCHEME_RECORD_PARAMETER2;
let SCHEME_RECORD_PARAMETER3;
let PLANT_COMPONENT_PARAMETER;
let REQUISITION_PARAMETERS;


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.17 | Verify adding meter reading to component in plant master module");

describe("LRM- 1.17 | Verify adding meter reading to component in plant master module", () => {

    
    before(function () {
        
        cy.fixture("LRM/lrm-1.17-verify-adding-meter-reading-to-component-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
			};
            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            PLANT_GROUP_PARAMETER = {
                [app.GridCells.CODE]: PLANT_GROUP,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY,
            };
            PLANT_GROUP_SUBRECORD_PARAMETER1 = {
                [app.GridCells.CODE]: PLANT_GROUP_SUBRECORD1,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY,
            };
            PLANT_GROUP_SUBRECORD_PARAMETER2 = {
                [app.GridCells.CODE]: PLANT_GROUP_SUBRECORD2,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY,
            };
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT
            PLANT_WIZARD_PARAMETER = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE_WIZARD,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANTW_DESC,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,    
            };
            PLANT_MANUAL_PARAMETER = {
                [app.GridCells.DESCRIPTION_INFO]: PLANTM_DESC,
                [app.GridCells.PLANT_GROUP_FK]: PLANT_GROUP_SUBRECORD2,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.PLANT_TYPE_FK]: CONTAINERS_PLANT.PLANT_TYPE,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK,    
            }
            CONTAINERS_JOB_CARD = this.data.CONTAINERS.JOB_CARD;
            JOB_TEMPLET_PARAMETER = {
                [app.GridCells.CODE]: JOBTEMPLET_CODE,
                [app.GridCells.DESCRIPTION_INFO]: JOBTEMPLET_DESC,
                [app.GridCells.WORK_OPERATION_TYPE_FK]:CONTAINERS_JOB_CARD.OPERATION_TYPE
            }
            JOB_ACTIVITIES_PARAMETER1 = {
                [app.GridCells.CODE]: ACTIVITY1_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ACTIVITY1_DESC
            }
            JOB_ACTIVITIES_PARAMETER2 = {
                [app.GridCells.CODE]: ACTIVITY2_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ACTIVITY2_DESC
            }
            JOB_ACTIVITIES_PARAMETER3 = {
                [app.GridCells.CODE]: ACTIVITY3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ACTIVITY3_DESC
            }
            RECORDS_PARAMETER1 = {
                [app.GridCells.CODE]: RECORD1_CODE,
                [app.GridCells.DESCRIPTION_INFO]: RECORD1_DESC,
                [app.GridCells.JOB_CARD_RECORD_TYPE_FK]: CONTAINERS_JOB_CARD.PLANT_RECORD_TYPE,
                [app.GridCells.CARD_RECORD_FK]: PLANT_CODE_MANUAL,
                [app.GridCells.WORK_OPERATION_TYPE_FK]: CONTAINERS_JOB_CARD.WORK_OPERATION_TYPE
            }
           
            RECORDS_PARAMETER2 = {
                [app.GridCells.CODE]: RECORD2_CODE,
                [app.GridCells.DESCRIPTION_INFO]: RECORD2_DESC,
                [app.GridCells.JOB_CARD_RECORD_TYPE_FK]:CONTAINERS_JOB_CARD.MATERIAL_RECORD_TYPE,
                [app.GridCells.CARD_RECORD_FK]: CONTAINERS_JOB_CARD.MATERIAL_NO 
            }
            RECORDS_PARAMETER3 = {
                [app.GridCells.CODE]: RECORD3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: RECORD3_DESC,
                [app.GridCells.JOB_CARD_RECORD_TYPE_FK]: CONTAINERS_JOB_CARD.SUNDRY_SERVICE_RECORD_TYPE,
                [app.GridCells.CARD_RECORD_FK]: CONTAINERS_JOB_CARD.SUNDRY_ARTICALE_No
            }
            CONTAINER_SCHEME = this.data.CONTAINERS.SCHEME;
            SCHEME_PARAMETER = {
                [app.GridCells.IS_LIVE]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.DESCRIPTION_INFO]: MAINTAINACE_DESC,
                [app.GridCells.SORTING]: CONTAINER_SCHEME.SORTING,
                [app.GridCells.LEAD_QUANTITY]: CONTAINER_SCHEME.LEAD_QUANTITY,
                [app.GridCells.LEAD_DAYS]: CONTAINER_SCHEME.LEAD_DAYS,
            }
            CONTAINER_SCHEME_RECORD = this.data.CONTAINERS.SCHEME_RECORD;
            SCHEME_RECORD_PARAMETER1 = {
                [app.GridCells.IS_RECALC_DATES]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_FIXED_DAYS]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.CODE]: RECORD1_CODE,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINER_SCHEME_RECORD.DESCRIPTION1,
                [app.GridCells.JOB_CARD_TEMPLATE_FK]: JOBTEMPLET_CODE,
                [app.GridCells.UOM_FK]: CONTAINER_SCHEME_RECORD.UOM,
                [app.GridCells.DAYS_AFTER]:CONTAINER_SCHEME_RECORD.DAYS_AFTER1,
                [app.GridCells.DURATION]: CONTAINER_SCHEME_RECORD.DURATION
            }
            SCHEME_RECORD_PARAMETER2 = {
                [app.GridCells.IS_RECALC_DATES]: commonLocators.CommonKeys.UNCHECK,
                [app.GridCells.IS_FIXED_DAYS]: commonLocators.CommonKeys.UNCHECK,
                [app.GridCells.IS_PERFORMANCE_BASED]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.CODE]: RECORD2_CODE,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINER_SCHEME_RECORD.DESCRIPTION2,
                [app.GridCells.JOB_CARD_TEMPLATE_FK]: JOBTEMPLET_CODE,
                [app.GridCells.UOM_FK]: CONTAINER_SCHEME_RECORD.UOM2,
                [app.GridCells.DURATION]: CONTAINER_SCHEME_RECORD.DURATION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINER_SCHEME_RECORD.QUANTITY,
            }
            SCHEME_RECORD_PARAMETER3 = {
                [app.GridCells.IS_RECALC_DATES]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_FIXED_DAYS]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.CODE]: RECORD3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINER_SCHEME_RECORD.DESCRIPTION3,
                [app.GridCells.JOB_CARD_TEMPLATE_FK]: JOBTEMPLET_CODE,
                [app.GridCells.UOM_FK]: CONTAINER_SCHEME_RECORD.UOM,
                [app.GridCells.DAYS_AFTER]:CONTAINER_SCHEME_RECORD.DAYS_AFTER2,
                [app.GridCells.DURATION]: CONTAINER_SCHEME_RECORD.DURATION,
                
            }
            CONTAINERS_PLANT_COMPONENT = this.data.CONTAINERS.PLANT_COMPONENT;
            PLANT_COMPONENT_PARAMETER = {
                [app.GridCells.MAINTENANCE_SCHEMA_FK]: MAINTAINACE_DESC,
                [app.GridCells.DESCRIPTION]: PLANT_COMP_DESC,
                [app.GridCells.METER_NO]: CONTAINERS_PLANT_COMPONENT.METER_NO,
                [app.GridCells.UOM_FK]: CONTAINERS_PLANT_COMPONENT.UOM_FK,
                [app.GridCells.HOME_PROJECT_FK]: PROJECT_NO,
                [app.GridCells.PROJECT_LOCATION_FK]: LOCATION_DESC,
                
            }
            CONTAINERS_PLANT_METER_READING = this.data.CONTAINERS.PLANT_METER_READING;
            MODAL_REQUISITION=this.data.MODAL.REQUISITION
            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.SELECTED_PLANTS_ONLY]: commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonKeys.SELECT_MAINTENANCE]: MODAL_REQUISITION,
                [commonLocators.CommonLabels.SELECT_A_JOB]: commonLocators.CommonLabels.CREATE_A_NEW_LOGISTIC_JOB,
                [commonLocators.CommonKeys.RADIO_INDEX]:CONTAINERS_PLANT_COMPONENT.RADIO_INDEX,
                [commonLocators.CommonLabels.PROJECT]: PROJECT_NO,
                [commonLocators.CommonLabels.JOB_CARD]: commonLocators.CommonKeys.CHECK    
            }
           
            CONTAINER_COLUMNS_LOCATION = this.data.CONTAINER_COLUMNS.LOCATION
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;
            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_CART_TEMPLATE = this.data.CONTAINER_COLUMNS.CART_TEMPLATE;
            CONTAINER_COLUMNS_ACTIVITIES = this.data.CONTAINER_COLUMNS.ACTIVITIES;
            CONTAINER_COLUMNS_RECORDS = this.data.CONTAINER_COLUMNS.RECORDS;
            CONTAINER_COLUMNS_SCHEME = this.data.CONTAINER_COLUMNS.SCHEME;
            CONTAINER_COLUMNS_SCHEME_RECORD = this.data.CONTAINER_COLUMNS.SCHEME_RECORD;
            CONTAINER_COLUMNS_PLANT_COMPONENT = this.data.CONTAINER_COLUMNS.PLANT_COMPONENT;
            CONTAINER_COLUMNS_MAINTENANCE = this.data.CONTAINER_COLUMNS.MAINTENANCE;
            CONTAINER_COLUMNS_JOB_CARDS = this.data.CONTAINER_COLUMNS.JOB_CARDS;
            
            
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_NAME,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            MODAL_DISPATCH_NOTES=this.data.MODAL.DISPATCH_NOTES
            DISPATCH_NOTES_PARAMETERS={
                [commonLocators.CommonLabels.RUBRIC_CATEGORY]:MODAL_DISPATCH_NOTES.RUBIC_CATEGORY
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

    it("TC - Create new location record", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 3);
          _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATION)
        });
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateLocation(LOCATION, LOCATION_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Add Controlling Unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTROLLING_UNITS)
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait to create new record
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_PLANTMANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //wait required to save contraolling unit parameters
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
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlantGroup(cnt.uuid.PLANT_GROUP,PLANT_GROUP_PARAMETER)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP,app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION,PG_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,PLANT_GROUP)
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        cy.wait(1000)
        _logesticPage.enterRecord_toCreatePlantGroup(cnt.uuid.PLANT_GROUP,PLANT_GROUP_SUBRECORD_PARAMETER1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,PLANT_GROUP)
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        cy.wait(1000)
        _logesticPage.enterRecord_toCreatePlantGroup(cnt.uuid.PLANT_GROUP,PLANT_GROUP_SUBRECORD_PARAMETER2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Create Plant From Plant Group", function () {
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,PLANT_GROUP_SUBRECORD1)
        cy.wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to enable cells
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_WIZARD_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PLANT)
        _common.create_newRecord(cnt.uuid.PLANT)
        cy.wait(1000)
        _logesticPage.enterRecord_toCreatePlant(cnt.uuid.PLANT,PLANT_MANUAL_PARAMETER)   
        _common.edit_containerCell(cnt.uuid.PLANT, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_CODE_MANUAL);
       
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PLANT)
    })

    it('TC - Change Plant Status', function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE_MANUAL)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        cy.wait(1000)//required wait to read data inside cells
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE_MANUAL)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PLANT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.AVAILABLE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it('TC - Verify Adding Job Card Templet', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.JOB_CARD_TEMPLATES)
        _common.openTab(app.TabBar.TEMPLATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CARD_TEMPLETS, app.FooterTab.CARD_TEMPLETS, 0)
            _common.setup_gridLayout(cnt.uuid.CARD_TEMPLETS, CONTAINER_COLUMNS_CART_TEMPLATE)
            _common.clear_subContainerFilter(cnt.uuid.CARD_TEMPLETS)
        });
        _common.create_newRecord(cnt.uuid.CARD_TEMPLETS)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.CARD_TEMPLETS,JOB_TEMPLET_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TEMPLATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.JOB_ACTIVITIES, app.FooterTab.ACTIVITIES, 1)
            _common.setup_gridLayout(cnt.uuid.JOB_ACTIVITIES, CONTAINER_COLUMNS_ACTIVITIES)
            _common.clear_subContainerFilter(cnt.uuid.JOB_ACTIVITIES)
        });
        _common.create_newRecord(cnt.uuid.JOB_ACTIVITIES)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.JOB_ACTIVITIES,JOB_ACTIVITIES_PARAMETER1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.JOB_ACTIVITIES)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.JOB_ACTIVITIES,JOB_ACTIVITIES_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.JOB_ACTIVITIES)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.JOB_ACTIVITIES,JOB_ACTIVITIES_PARAMETER3)
        cy.SAVE()
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TEMPLATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RECORDS, app.FooterTab.RECORDS, 2)
            _common.setup_gridLayout(cnt.uuid.RECORDS, CONTAINER_COLUMNS_RECORDS)
            _common.clear_subContainerFilter(cnt.uuid.RECORDS)
        });
        _common.create_newRecord(cnt.uuid.RECORDS)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.RECORDS,RECORDS_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RECORDS)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.RECORDS,RECORDS_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RECORDS)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.RECORDS,RECORDS_PARAMETER3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    }) 

    it('TC - Verify Creating Maintenance Schema In Plant Maintenance Schema Module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MAINTENANCE_SCHEMES)
        _common.openTab(app.TabBar.RESOURCE_MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEME, app.FooterTab.MAINTENANCE_SCHEMES, 0)
            _common.setup_gridLayout(cnt.uuid.SCHEME, CONTAINER_COLUMNS_SCHEME)
            _common.clear_subContainerFilter(cnt.uuid.SCHEME)
        });
        _common.create_newRecord(cnt.uuid.SCHEME)
        _logesticPage.enterRecord_toCreatePlantScheme(cnt.uuid.SCHEME,SCHEME_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RESOURCE_MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEME_RECORD, app.FooterTab.SCHEME_RECORDS, 1)
            _common.setup_gridLayout(cnt.uuid.SCHEME_RECORD, CONTAINER_COLUMNS_SCHEME_RECORD)
            _common.clear_subContainerFilter(cnt.uuid.SCHEME_RECORD)
        });
        _common.maximizeContainer(cnt.uuid.SCHEME_RECORD)
        _common.create_newRecord(cnt.uuid.SCHEME_RECORD)
        cy.wait(1000) //required wait to enable cells
        _logesticPage.enterRecord_toCreateScheme(cnt.uuid.SCHEME_RECORD,SCHEME_RECORD_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SCHEME_RECORD)
        cy.wait(1000)//required wait to enable cells
        _logesticPage.enterRecord_toCreateScheme(cnt.uuid.SCHEME_RECORD,SCHEME_RECORD_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SCHEME_RECORD)
        cy.wait(1000)//required wait to enable cells
        _logesticPage.enterRecord_toCreateScheme(cnt.uuid.SCHEME_RECORD,SCHEME_RECORD_PARAMETER3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.SCHEME_RECORD)
    })

    it('TC - Verify Add Component And Generate Maintenance Records', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
        });
        cy.wait(1000) //required wait to close traffic light button if present
        _logesticPage.click_On_CloseButton(cnt.uuid.PLANT) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE_WIZARD)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT,PLANT_CODE_WIZARD)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS)
            _common.setup_gridLayout(cnt.uuid.PLANT_COMPONENT, CONTAINER_COLUMNS_PLANT_COMPONENT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_COMPONENT)
            cy.REFRESH_CONTAINER()
        });
        _common.create_newRecord(cnt.uuid.PLANT_COMPONENT)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlantComponent(cnt.uuid.PLANT_COMPONENT,PLANT_COMPONENT_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PLANT_COMPONENT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_MAINTENANCE_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.START, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(CONTAINERS_PLANT_COMPONENT.VALID_TO)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000)//required wait to become button active
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE, 3)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
            _common.setup_gridLayout(cnt.uuid.MAINTENANCE, CONTAINER_COLUMNS_MAINTENANCE)
        });
        _common.search_inSubContainer(cnt.uuid.MAINTENANCE," ")
        cy.wait(1000) //required wait to read data from cells
        _common.getText_fromCell(cnt.uuid.MAINTENANCE, app.GridCells.CODE).then(($grandTotal) => {
            Cypress.env("MAINTENANCE_CODE", $grandTotal.text())
        })
    })
    it('TC - Verify Change Maintenance Record Status Is Due', function () {
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE, 3)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.search_inSubContainer(cnt.uuid.MAINTENANCE,Cypress.env("MAINTENANCE_CODE"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_MAINTENANCE_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IS_DUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_RESOURCE_REQUISITIONS_RESOURCE_RESERVATIONS_AND_JOB_CARDS)
        _logesticPage.generate_resourceRequisitionsResourceReservationsJobCards_formWizard(REQUISITION_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS)
        });
        _common.select_rowHasValue(cnt.uuid.PLANT_COMPONENT,MAINTAINACE_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE)
        });
        _common.select_rowHasValue(cnt.uuid.MAINTENANCE,CONTAINER_SCHEME_RECORD.DESCRIPTION1)
        _common.getText_fromCell(cnt.uuid.MAINTENANCE, app.GridCells.JOB_CARD_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("JOBCARD", $ele1.text())
        })
    })

    it('TC - Change job card status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.JOB_CARDS)
        _common.openTab(app.TabBar.ACTIVITIES_AND_RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CARD, app.FooterTab.CARDS)
            _common.setup_gridLayout(cnt.uuid.CARD,CONTAINER_COLUMNS_JOB_CARDS)
            _common.clear_subContainerFilter(cnt.uuid.CARD)
        });
        _common.maximizeContainer(cnt.uuid.CARD)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.CARD,PLANT_CODE_WIZARD)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CARD,PLANT_CODE_WIZARD)
        _common.edit_dropdownCellWithInput(cnt.uuid.CARD,app.GridCells.JOB_PERFORMING_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PROJECT_NO)
        _common.edit_dropdownCellWithInput(cnt.uuid.CARD,app.GridCells.BAS_CLERK_RESPONSIBLE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_JOB_CARD.CLERK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CARD)
        _common.openTab(app.TabBar.ACTIVITIES_AND_RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.JOB_CARDS_ACTIVITIES, app.FooterTab.ACTIVITIES)
            _common.clear_subContainerFilter(cnt.uuid.JOB_CARDS_ACTIVITIES)
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.JOB_CARDS_ACTIVITIES,ACTIVITY3_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.JOB_CARDS_ACTIVITIES,app.GridCells.IS_DONE,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ACTIVITIES_AND_RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.JOB_CARDS_RECORDS, app.FooterTab.RECORDS)
            _common.clear_subContainerFilter(cnt.uuid.JOB_CARDS_RECORDS)
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.JOB_CARDS_RECORDS,PLANT_CODE_MANUAL)
        _common.edit_containerCell(cnt.uuid.JOB_CARDS_RECORDS,app.GridCells.DELIVERED_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_SCHEME.SORTING)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.JOB_CARDS_RECORDS,CONTAINERS_JOB_CARD.MATERIAL)
        _common.edit_containerCell(cnt.uuid.JOB_CARDS_RECORDS,app.GridCells.DELIVERED_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_JOB_CARD.QUANTITY2)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.JOB_CARDS_RECORDS,CONTAINERS_JOB_CARD.SUNDRY_SERVICE)
        _common.edit_containerCell(cnt.uuid.JOB_CARDS_RECORDS,app.GridCells.DELIVERED_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_JOB_CARD.QUANTITY2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_JOB_CARD_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PLANNED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_JOB_CARD_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.STARTED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_JOB_CARD_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.FINISHED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_JOB_CARD_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create Dispact Notes', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_DISPACH_NOTES)
        _common.waitForLoaderToDisappear()
        _logesticPage.createDispatchNotes(DISPATCH_NOTES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify maintenance status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
        });
        cy.wait(1000) //required wait to close traffic light button if present
        _logesticPage.click_On_CloseButton(cnt.uuid.PLANT)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS)
        });
        _common.select_rowHasValue(cnt.uuid.PLANT_COMPONENT,MAINTAINACE_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.MAINTENANCE,CONTAINER_SCHEME_RECORD.DESCRIPTION1)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_METER_READING)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PLANT_METER_READING,app.GridCells.RECORDED,app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT,CONTAINERS_PLANT_METER_READING.RECORDED)
        _common.edit_containerCell(cnt.uuid.PLANT_METER_READING,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PLANT_METER_READING.QUANTITY1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.select_rowHasValue(cnt.uuid.MAINTENANCE,CONTAINER_SCHEME_RECORD.DESCRIPTION1)
        cy.wait(1000)// mandatory wait to reflect changed status from planned to due
        _common.assert_cellData(cnt.uuid.MAINTENANCE,app.GridCells.MAINTENANCE_STATUS_FK,commonLocators.CommonLabels.DONE)
        _common.waitForLoaderToDisappear()
       
    })
    
    it('TC - Add meter reading', function () {
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_COMPONENT)
        });
        cy.wait(1000) //required wait to close traffic light button if present
        _common.select_rowHasValue(cnt.uuid.PLANT_COMPONENT,MAINTAINACE_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.select_rowHasValue(cnt.uuid.MAINTENANCE,CONTAINER_SCHEME_RECORD.DESCRIPTION2)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_METER_READING, app.FooterTab.METER_READING)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_METER_READING)
        });
        cy.wait(1000) //required wait to close traffic light button if present
        _common.create_newRecord(cnt.uuid.PLANT_METER_READING)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PLANT_METER_READING,app.GridCells.RECORDED,app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT,CONTAINERS_PLANT_METER_READING.RECORDED)
        _common.edit_containerCell(cnt.uuid.PLANT_METER_READING,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PLANT_METER_READING.QUANTITY2)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.select_rowHasValue(cnt.uuid.MAINTENANCE,CONTAINER_SCHEME_RECORD.DESCRIPTION2)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.SET_MAINTENANCE_TO_DUE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000)//mandatory wait to enable modal OK button
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.SAVE() 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
       
    })

    it('TC - Verify maintenance record', function () {
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS)
        });
        cy.wait(1000) //required wait to close traffic light button if present
        _common.select_rowHasValue(cnt.uuid.PLANT_COMPONENT,MAINTAINACE_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_METER_READING, app.FooterTab.METER_READING)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_METER_READING)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_METER_READING,CONTAINERS_PLANT_METER_READING.QUANTITY2)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.select_rowHasValue(cnt.uuid.MAINTENANCE,CONTAINER_SCHEME_RECORD.DESCRIPTION2)
        cy.wait(1000)//mandatory wait to get status changed to due
        _common.assert_cellData_insideActiveRow(cnt.uuid.MAINTENANCE,app.GridCells.MAINTENANCE_STATUS_FK,commonLocators.CommonLabels.IS_DUE)
        _common.waitForLoaderToDisappear()
    })
});