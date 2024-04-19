import { tile, app, cnt, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const FIRMLYMOUNTED = "Firmly Mounted" + Cypress._.random(0, 999);
const PERFORMANCE = "Performance" + Cypress._.random(0, 999);
const BULK = "Bulk" + Cypress._.random(0, 999);
const BAL = "BAL" + Cypress._.random(0, 999);
const RENTEL = "Rental" + Cypress._.random(0, 999);
const CODE_1 = "Work" + Cypress._.random(0, 999);
const CODE_2 = "IDLE" + Cypress._.random(0, 999);
const CODE_3 = "Free" + Cypress._.random(0, 999);
const CODE_4 = "PERFORMANCE1" + Cypress._.random(0, 999);
const CODE_5 = "SELL" + Cypress._.random(0, 999);
const CODE_6 = "PAYBACK" + Cypress._.random(0, 999);
const CODE_7 = "REPAIR" + Cypress._.random(0, 999);
const CODE_8 = "TRANSPORT" + Cypress._.random(0, 999);
const WORK1 = "Work" + Cypress._.random(0, 999);
const IDLE = "IDLE" + Cypress._.random(0, 999);
const FREE = "Free" + Cypress._.random(0, 999);
const PERFORMANCE1 = "PERFORMANCE1" + Cypress._.random(0, 999);
const SELL = "SELL1" + Cypress._.random(0, 999);
const PAYBACK = "PAYBACK 1-" + Cypress._.random(0, 999);
const REPAIR = "REPAIR" + Cypress._.random(0, 999);
const TRANSPORT = "TRANSPORT" + Cypress._.random(0, 999);

let CONTAINER_DATA_RECORD;
let CONTAINER_OPERATION_TYPES;
let CONTAINER_COLUMNS_DATA_TYPES;
let CONTAINER_COLUMNS_PLANT_TYPES;
let CONTAINER_COLUMNS_OPERATION_TYPES;
let OPERATION_TYPE_PARAMETER_WORK;
let OPERATION_TYPE_PARAMETER_IDLE;
let OPERATION_TYPE_PARAMETER_FREE;
let OPERATION_TYPE_PARAMETER_PERFORMANCE;
let OPERATION_TYPE_PARAMETER_SELL;
let OPERATION_TYPE_PARAMETER_PAYBACK;
let OPERATION_TYPE_PARAMETER_REPAIR;
let OPERATION_TYPE_PARAMETER_TRANSPORT;

ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.3 | Verify Adding New Record of Work operation type in WOT module");

describe("LRM- 1.3 | Verify Adding New Record of Work operation type in WOT module", () => {

    before(function () {
       
        cy.fixture("LRM/lrm-1.3-verify-adding-new-record-of-work-operation-type-in-WOT-module.json").then((data) => {
            this.data = data;
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINER_OPERATION_TYPES = this.data.CONTAINERS.OPERATION_TYPES;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;
            CONTAINER_COLUMNS_PLANT_TYPES = this.data.CONTAINER_COLUMNS.PLANT_TYPES;
            CONTAINER_COLUMNS_OPERATION_TYPES = this.data.CONTAINER_COLUMNS.OPERATION_TYPES;

            OPERATION_TYPE_PARAMETER_WORK = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_1,
                [app.GridCells.DESCRIPTION_INFO]: WORK1,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.DAY,
                [app.GridCells.IS_HIRE]: CONTAINER_OPERATION_TYPES.CHECK,
    
            }
            OPERATION_TYPE_PARAMETER_IDLE = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_2,
                [app.GridCells.DESCRIPTION_INFO]: IDLE,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.DAY,
                [app.GridCells.IS_HIRE]: CONTAINER_OPERATION_TYPES.CHECK,
            }
            OPERATION_TYPE_PARAMETER_FREE = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_3,
                [app.GridCells.DESCRIPTION_INFO]: FREE,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.DAY,
                [app.GridCells.IS_HIRE]: CONTAINER_OPERATION_TYPES.CHECK,
            }
            OPERATION_TYPE_PARAMETER_PERFORMANCE = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_4,
                [app.GridCells.DESCRIPTION_INFO]: PERFORMANCE1,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.HOUR,
    
            }
            OPERATION_TYPE_PARAMETER_SELL = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_5,
                [app.GridCells.DESCRIPTION_INFO]: SELL,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.ST,
                [app.GridCells.IS_MINOR_EQUIPMENT]: CONTAINER_OPERATION_TYPES.CHECK
    
            }
            OPERATION_TYPE_PARAMETER_PAYBACK = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_6,
                [app.GridCells.DESCRIPTION_INFO]: PAYBACK,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.ST,
                [app.GridCells.IS_MINOR_EQUIPMENT]: CONTAINER_OPERATION_TYPES.CHECK
    
            }
            OPERATION_TYPE_PARAMETER_REPAIR = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_7,
                [app.GridCells.DESCRIPTION_INFO]: REPAIR,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.DAY,
    
            }
            OPERATION_TYPE_PARAMETER_TRANSPORT = {
                [app.GridCells.IS_LIVE]: CONTAINER_OPERATION_TYPES.CHECK,
                [app.GridCells.CODE]: CODE_8,
                [app.GridCells.DESCRIPTION_INFO]: TRANSPORT,
                [app.GridCells.UOM_FK]: CONTAINER_OPERATION_TYPES.KM,
                [app.GridCells.IS_DEFAULT]: CONTAINER_OPERATION_TYPES.CHECK
    
            }
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Plant Type Data Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING)
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
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTER, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create Second Plant Type Data Record", function () {
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PERFORMANCE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_TIMEKEEPING, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, FIRMLYMOUNTED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTERED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
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
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_IDLE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_FREE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_PERFORMANCE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_SELL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_PAYBACK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_REPAIR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(OPERATION_TYPE_PARAMETER_TRANSPORT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.OPERATION_TYPE)
    })
    it("TC - Verify Work Operation Types And Assign Plant Types to it", function () {
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, WORK1)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, WORK1)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, WORK1)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, FIRMLYMOUNTED);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, IDLE)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, IDLE)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, IDLE)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, FIRMLYMOUNTED);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, FREE)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, FREE)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, FREE)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, FIRMLYMOUNTED);
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, PERFORMANCE1)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, PERFORMANCE1)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, PERFORMANCE1)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PERFORMANCE);
        cy.SAVE()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.IS_TIMEKEEPING_DEFAULT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, SELL)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, SELL)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, SELL)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, REPAIR)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, REPAIR)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, REPAIR)
        _common.select_tabFromFooter(cnt.uuid.OPERATION_2_PLANT_TYPE, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.OPERATION_2_PLANT_TYPE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.OPERATION_2_PLANT_TYPE, app.GridCells.PLANT_TYPE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
});
