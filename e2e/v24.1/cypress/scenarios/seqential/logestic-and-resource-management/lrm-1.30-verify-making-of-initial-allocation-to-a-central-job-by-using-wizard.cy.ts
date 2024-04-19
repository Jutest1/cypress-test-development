import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PROJ-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ_DESC-" + Cypress._.random(0, 999);
const CU_MAIN = "CU-" + Cypress._.random(0, 999)
const CU_SUB = 'CU_SUB-' + Cypress._.random(0, 999);
const PLANT_TYPE = "Plant_Type-" + Cypress._.random(0, 999);
const PLANT_LIST1 = "PL-" + Cypress._.random(0, 999);
const PLANT_LIST2 = "Price List 2-" + Cypress._.random(0, 999);
const RENTEL = "Rental" + Cypress._.random(0, 999);
const PERFORMANCE = "Performance" + Cypress._.random(0, 999);
const BULK = "Bulk" + Cypress._.random(0, 999);
const CODE_WORK = "Work" + Cypress._.random(0, 999);
const CODE_PERFORMANCE = "PERFORMANCE" + Cypress._.random(0, 999);
const DESC_WORK = "Work" + Cypress._.random(0, 999);
const DESC_PERFORMANCE = "PERFORMANCE" + Cypress._.random(0, 999);
const PLANT_GROUP = "PG" + Cypress._.random(0, 999);
const PLANT_CODE = "PC" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "PG_DESC" + Cypress._.random(0, 999);
const SUB_PLANT_GROUP = "SUB_PG" + Cypress._.random(0, 999);
const SUB_PLANT_GROUP_DESC = "SUB_PG_DESC" + Cypress._.random(0, 999);
const PLANT_DESCRIPTION = "Paylons" + Cypress._.random(0, 999);


let CONTAINER_PROJECT,
    PROJECT_PARAMETERS

let CONTAINER_COLUMNS_DATA_TYPES,
    CONTAINER_DATA_RECORD,
    DATA_RECORD_PARAMETER1,
    DATA_RECORD_PARAMETER2;

let CONTAINER_OPERATION_TYPES,
    CONTAINER_COLUMNS_PLANT_TYPES,
    CONTAINER_COLUMNS_OPERATION_TYPES;

let OPERATION_TYPE_PARAMETER_WORK,
    OPERATION_TYPE_PARAMETER_PERFORMANCE;

let CONTAINERS_CONTROLLING_UNITS,
    CONTAINER_COLUMNS_CONTROLLING_UNITS,
    CONTROLLING_UNIT_MAIN_PARAMETERS,
    CONTROLLING_UNIT_SUB_PARAMETERS

let CONTAINERS_PLANT_GROUP,
    CONTAINER_COLUMNS_PLANT_GROUP

let CONTAINERS_PLANT,
    CONTAINER_COLUMNS_PLANT,
    PLANT_PARAMETERS,
    CONTAINER_COLUMNS_PLANT_CONTROLLING;

let CONTAINERS_PLANT_PRICE_LISTS
let ALLOCATION_FOR_PLANTS_PARAMETER

let MODAL_PLANT_ALLOCATION
    
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.30 | Verify making of initial allocation to a central job by using wizard");

describe("LRM- 1.30 | Verify making of initial allocation to a central job by using wizard", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.30-verify-making-of-initial-allocation-to-a-central-job-by-using-wizard.json").then((data) => {
            this.data = data;
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;
            CONTAINER_OPERATION_TYPES = this.data.CONTAINERS.OPERATION_TYPES;
            CONTAINER_COLUMNS_PLANT_TYPES = this.data.CONTAINER_COLUMNS.PLANT_TYPES;
            CONTAINER_COLUMNS_OPERATION_TYPES = this.data.CONTAINER_COLUMNS.OPERATION_TYPES;

            CONTAINER_PROJECT = this.data.CONTAINERS.PROJECT 
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
                [commonLocators.CommonLabels.NAME]:PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]:CONTAINER_PROJECT.CLERK_NAME
            }

            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            CONTROLLING_UNIT_MAIN_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_MAIN,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM
            }
            CONTROLLING_UNIT_SUB_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM
            }

            DATA_RECORD_PARAMETER1 = {
                [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
                [app.GridCells.ETM_CONTEXT_FK]: CONTAINER_DATA_RECORD.RIB_EQUIPMENT_CONTEXT,
                [app.GridCells.CURRENCY_FK]: CONTAINER_DATA_RECORD.CURRENCY,
                [app.GridCells.PERCENT]: CONTAINER_DATA_RECORD.PERCENT,
                [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST1,
                [app.GridCells.UOM_FK]: CONTAINER_DATA_RECORD.UOM,
                [app.GridCells.CALCULATION_TYPE_FK]: CONTAINER_DATA_RECORD.AVERAGE_CATALOG_VALUE
            }
            DATA_RECORD_PARAMETER2 = {
                [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
                [app.GridCells.ETM_CONTEXT_FK]: CONTAINER_DATA_RECORD.RIB_EQUIPMENT_CONTEXT,
                [app.GridCells.CURRENCY_FK]: CONTAINER_DATA_RECORD.CURRENCY,
                [app.GridCells.PERCENT]: CONTAINER_DATA_RECORD.PERCENT,
                [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST2,
                [app.GridCells.UOM_FK]: CONTAINER_DATA_RECORD.UOM,
                [app.GridCells.CALCULATION_TYPE_FK]: CONTAINER_DATA_RECORD.AVERAGE_CATALOG_VALUE
            }

            OPERATION_TYPE_PARAMETER_WORK = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_WORK,
                [app.GridCells.DESCRIPTION_INFO]: DESC_WORK,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.DAY,
                [app.GridCells.IS_HIRE]: CONTAINER_OPERATION_TYPES.CHECK
            }
            OPERATION_TYPE_PARAMETER_PERFORMANCE = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_PERFORMANCE,
                [app.GridCells.DESCRIPTION_INFO]: DESC_PERFORMANCE,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.HOUR,
            }

            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: PLANT_DESCRIPTION,
                [app.GridCells.PLANT_GROUP_FK]: SUB_PLANT_GROUP,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.PLANT_TYPE_FK]: CONTAINERS_PLANT.PLANT_TYPE,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK_RESPONSIBLE
            }
            CONTAINER_COLUMNS_PLANT_CONTROLLING = this.data.CONTAINER_COLUMNS.PLANT_CONTROLLING;
            CONTAINERS_PLANT_PRICE_LISTS = this.data.CONTAINERS.PLANT_PRICE_LISTS;

            MODAL_PLANT_ALLOCATION = this.data.MODAL.PLANT_ALLOCATION;
            ALLOCATION_FOR_PLANTS_PARAMETER = {
                [commonLocators.CommonLabels.JOB]: PRJ_NO,
                [commonLocators.CommonLabels.ALLOCATED_FROM]: MODAL_PLANT_ALLOCATION.ALLOCATED_FROM,
                [app.GridCells.WORK_OPERATION_TYPE_FK]: MODAL_PLANT_ALLOCATION.WORK_OPERATION_TYPE
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();  
        });
      
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Plant Type Record", function () {
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_LIST_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_LIST_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_TYPE);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create New Data Record", function () {
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_PRICE_LIST)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_PRICE_LIST)

        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(DATA_RECORD_PARAMETER1)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_MANUAL_EDIT_PLANT_MASTER, CONTAINER_DATA_RECORD.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(DATA_RECORD_PARAMETER2)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_MANUAL_EDIT_PLANT_MASTER, CONTAINER_DATA_RECORD.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

    it("TC - Add Plant Type Data Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTER, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PERFORMANCE);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_TIMEKEEPING, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BULK);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create Work Operation Types", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WORK_OPERATION_TYPES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
            _common.setup_gridLayout(cnt.uuid.OPERATION_TYPE, CONTAINER_COLUMNS_OPERATION_TYPES)
            _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
            _common.setup_gridLayout(cnt.uuid.OPERATION_2_PLANT_TYPE, CONTAINER_COLUMNS_PLANT_TYPES)
        })
        _common.maximizeContainer(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_WORK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_PERFORMANCE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.OPERATION_TYPE)
    })

    it("TC - Assign Plant Types to Work Operation Types", function () {
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, DESC_WORK)
        cy.wait(1000) //required wait
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, DESC_WORK)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, DESC_PERFORMANCE)
        cy.wait(1000) //required wait
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, DESC_PERFORMANCE)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PERFORMANCE);
        _common.set_cellCheckboxValue(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.IS_TIMEKEEPING_DEFAULT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Controlling Units", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_CONTROLLING_UNITS.isplantmanagement],cnt.uuid.CONTROLLING_UNIT)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.IS_PLANTMANAGEMENT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_SUB_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.IS_PLANTMANAGEMENT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()   
    })

    it("TC - Create New Plant Group and sub record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PLANT_GROUP)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_GROUP, CONTAINER_COLUMNS_PLANT_GROUP)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PLANT_GROUP)
        _common.clickOn_toolbarButton(cnt.uuid.PLANT_GROUP, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP,PLANT_GROUP_DESC)
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create New Plant", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS)
            _common.setup_gridLayout(cnt.uuid.PLANT,CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PLANT)
        _common.create_newRecord(cnt.uuid.PLANT)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlant(cnt.uuid.PLANT,PLANT_PARAMETERS)
        _common.edit_containerCell(cnt.uuid.PLANT, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_CODE);
        cy.wait(1000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PLANT)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add Controlling Unit Record to Plant in Plant Master Module', function () {
        _common.openTab(app.TabBar.COMMERTIAL_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS,0)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_DESCRIPTION)
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        _common.openTab(app.TabBar.COMMERTIAL_DATA).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PLANT_CONTROLLING, app.FooterTab.CONTROLLING_UNIT)
            _common.setup_gridLayout(cnt.uuid.PLANT_CONTROLLING, CONTAINER_COLUMNS_PLANT_CONTROLLING)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_CONTROLLING)
        });
        _common.create_newRecord(cnt.uuid.PLANT_CONTROLLING)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to appear dropdown
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_CONTROLLING,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CU_SUB)
        cy.SAVE()
        _common.waitForLoaderToDisappear() 
    })

    it('TC - Assign Price List', function () {
        _common.openTab(app.TabBar.COMMERTIAL_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_PRICE_LISTS, app.FooterTab.PRICE_LISTS_SMALL, 1)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_PRICE_LISTS)
        });
        _common.create_newRecord(cnt.uuid.PLANT_PRICE_LISTS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.edit_dropdownCellWithCaret(cnt.uuid.PLANT_PRICE_LISTS,app.GridCells.PRICE_LIST_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PLANT.PRICE_LIST)
        _common.set_cellCheckboxValue(cnt.uuid.PLANT_PRICE_LISTS, app.GridCells.IS_MANUAL, commonLocators.CommonKeys.CHECK)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICE_LISTS, app.GridCells.PRICE_PORTION_1, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PLANT_PRICE_LISTS.PORTION_VALUE_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICE_LISTS, app.GridCells.PRICE_PORTION_2, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PLANT_PRICE_LISTS.PORTION_VALUE_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create plant location record from wizard', function () {
        _common.openTab(app.TabBar.LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS,0)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            _common.search_inSubContainer(cnt.uuid.PLANT,PLANT_DESCRIPTION)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT,PLANT_DESCRIPTION)
        _common.openTab(app.TabBar.LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_LOCATION, app.FooterTab.PLANT_LOCATION)
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INITIAL_ALLOCATION_FOR_PLANTS)
        _common.waitForLoaderToDisappear()
        _logesticPage.create_initialAllocationForPlants_fromWizard(ALLOCATION_FOR_PLANTS_PARAMETER,CONTAINERS_PLANT.PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT,PLANT_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PLANT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.AVAILABLE)
    })

    it('TC - Verify Project in Plant Allocation', function () {
        _common.openTab(app.TabBar.LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS,0)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            _common.search_inSubContainer(cnt.uuid.PLANT,PLANT_DESCRIPTION)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT,PLANT_DESCRIPTION)
        _common.openTab(app.TabBar.LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_ALLOCATIONS, app.FooterTab.PLANT_ALLOCATIONS)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_ALLOCATIONS,PRJ_NO)
        _validate.verify_isRecordPresent(cnt.uuid.PLANT_ALLOCATIONS,PRJ_NO)    
    })

});


