
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";


// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_GROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANT_DESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
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

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_GROUP;
let CONTAINERS_JOB_CARD;
let CONTAINER_SCHEME_RECORD;
let CONTAINER_SCHEME;

let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_PLANT_GROUP;
let CONTAINER_COLUMNS_CART_TEMPLATE;
let CONTAINER_COLUMNS_ACTIVITIES;
let CONTAINER_COLUMNS_RECORDS;
let CONTAINER_COLUMNS_SCHEME_RECORD;
let CONTAINER_COLUMNS_SCHEME;

let PLANT_PARAMETER;
let JOB_TEMPLET_PARAMETER;
let JOB_ACTIVITIES_PARAMETER1;
let JOB_ACTIVITIES_PARAMETER2;
let JOB_ACTIVITIES_PARAMETER3;
let RECORDS_PARAMETER1;
let RECORDS_PARAMETER2;
let RECORDS_PARAMETER3;
let SCHEME_RECORD_PARAMETER1;
let SCHEME_RECORD_PARAMETER2;
let SCHEME_RECORD_PARAMETER3;


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.12 | Verify Creating Maintenance Schema Record In Plant Maintenance Schema Module");

describe("LRM- 1.12 | Verify Creating Maintenance Schema Record In Plant Maintenance Schema Module", () => {

    before(function () {
        
        cy.fixture("LRM/lrm-1.12-verify-creating-maintenance-schema-record-in-plant-maintenance-schema-module.json").then((data) => {
            this.data = data;

            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }

            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINERS_JOB_CARD = this.data.CONTAINERS.JOB_CARD;
            JOB_TEMPLET_PARAMETER = {
                [app.GridCells.CODE]: JOBTEMPLET_CODE,
                [app.GridCells.DESCRIPTION_INFO]: JOBTEMPLET_DESC,
                [app.GridCells.WORK_OPERATION_TYPE_FK]:CONTAINERS_JOB_CARD.OPERATION_TYPE,
            }
            JOB_ACTIVITIES_PARAMETER1 = {
                [app.GridCells.CODE]: ACTIVITY1_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ACTIVITY1_DESC,
            }
            JOB_ACTIVITIES_PARAMETER2 = {
                [app.GridCells.CODE]: ACTIVITY2_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ACTIVITY2_DESC,
            }
            JOB_ACTIVITIES_PARAMETER3 = {
                [app.GridCells.CODE]: ACTIVITY3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ACTIVITY3_DESC,
            }
            RECORDS_PARAMETER1 = {
                [app.GridCells.CODE]: RECORD1_CODE,
                [app.GridCells.DESCRIPTION_INFO]: RECORD1_DESC,
                [app.GridCells.JOB_CARD_RECORD_TYPE_FK]: CONTAINERS_JOB_CARD.PLANT_RECORD_TYPE,
                [app.GridCells.CARD_RECORD_FK]: PLANT_CODE,
                [app.GridCells.WORK_OPERATION_TYPE_FK]: CONTAINERS_JOB_CARD.WORK_OPERATION_TYPE,
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
            CONTAINER_SCHEME_RECORD = this.data.CONTAINERS.SCHEME_RECORD;
            SCHEME_RECORD_PARAMETER1 = {
                [app.GridCells.IS_RECALC_DATES]: commonLocators.CommonKeys.UNCHECK,
                [app.GridCells.IS_PERFORMANCE_BASED]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.CODE]: RECORD3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINER_SCHEME_RECORD.DESCRIPTION1,
                [app.GridCells.JOB_CARD_TEMPLATE_FK]: JOBTEMPLET_CODE,
                [app.GridCells.UOM_FK]: CONTAINER_SCHEME_RECORD.UOM2,
                [app.GridCells.QUANTITY]: CONTAINER_SCHEME_RECORD.QUANTITY,
                [app.GridCells.DURATION]: CONTAINER_SCHEME_RECORD.DURATION,
    
            }
            SCHEME_RECORD_PARAMETER2 = {
                [app.GridCells.IS_RECALC_DATES]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_FIXED_DAYS]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.CODE]: RECORD3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINER_SCHEME_RECORD.DESCRIPTION2,
                [app.GridCells.JOB_CARD_TEMPLATE_FK]: JOBTEMPLET_CODE,
                [app.GridCells.UOM_FK]: CONTAINER_SCHEME_RECORD.UOM,
                [app.GridCells.DURATION]: CONTAINER_SCHEME_RECORD.DURATION,
                [app.GridCells.DAYS_AFTER]:CONTAINER_SCHEME_RECORD.DAYS_AFTER1,
            }
            SCHEME_RECORD_PARAMETER3 = {
                [app.GridCells.IS_RECALC_DATES]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_FIXED_DAYS]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.CODE]: RECORD3_CODE,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINER_SCHEME_RECORD.DESCRIPTION3,
                [app.GridCells.JOB_CARD_TEMPLATE_FK]: JOBTEMPLET_CODE,
                [app.GridCells.UOM_FK]: CONTAINER_SCHEME_RECORD.UOM,
                [app.GridCells.DURATION]: CONTAINER_SCHEME_RECORD.DURATION,
                [app.GridCells.DAYS_AFTER]:CONTAINER_SCHEME_RECORD.DAYS_AFTER2,
            }

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;
            CONTAINER_COLUMNS_CART_TEMPLATE = this.data.CONTAINER_COLUMNS.CART_TEMPLATE;
            CONTAINER_COLUMNS_ACTIVITIES = this.data.CONTAINER_COLUMNS.ACTIVITIES;
            CONTAINER_COLUMNS_RECORDS = this.data.CONTAINER_COLUMNS.RECORDS;
            CONTAINER_COLUMNS_SCHEME_RECORD = this.data.CONTAINER_COLUMNS.SCHEME_RECORD;
            CONTAINER_COLUMNS_SCHEME = this.data.CONTAINER_COLUMNS.SCHEME;
        
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
            cy.SAVE();
        });
    })
    after(() => {
        cy.LOGOUT();
    });

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
        cy.wait(1000)
    })

    it("TC - Verify Create Plant From Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to enable cells
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_PARAMETER)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Change Plant Status', function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        cy.wait(1000)//required wait to read data inside cells
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE)
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
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TEMPLATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.JOB_ACTIVITIES, app.FooterTab.ACTIVITIES, 1)
            _common.setup_gridLayout(cnt.uuid.JOB_ACTIVITIES, CONTAINER_COLUMNS_ACTIVITIES)
            _common.clear_subContainerFilter(cnt.uuid.JOB_ACTIVITIES)
        });
        _common.create_newRecord(cnt.uuid.JOB_ACTIVITIES)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.JOB_ACTIVITIES,JOB_ACTIVITIES_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.JOB_ACTIVITIES)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.JOB_ACTIVITIES,JOB_ACTIVITIES_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.JOB_ACTIVITIES)
        _logesticPage.enterRecord_toCreateJobRecords(cnt.uuid.JOB_ACTIVITIES,JOB_ACTIVITIES_PARAMETER3)
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
        _common.assert_cellData_insideActiveRow(cnt.uuid.RECORDS, app.GridCells.CARD_RECORD_FK, PLANT_CODE)
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
        _common.set_cellCheckboxValue(cnt.uuid.SCHEME, app.GridCells.IS_LIVE,commonLocators.CommonKeys.CHECK )
        _common.enterRecord_inNewRow(cnt.uuid.SCHEME, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, MAINTAINACE_DESC);
        _common.enterRecord_inNewRow(cnt.uuid.SCHEME, app.GridCells.SORTING, app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_SCHEME.SORTING);
        _common.enterRecord_inNewRow(cnt.uuid.SCHEME, app.GridCells.LEAD_QUANTITY, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCHEME.LEAD_QUANTITY);
        _common.enterRecord_inNewRow(cnt.uuid.SCHEME, app.GridCells.LEAD_DAYS, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCHEME.LEAD_DAYS);
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
});
