import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
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
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.3 | Verify Adding New Record of Work operation type in WOT module");

describe("LRM- 1.3 | Verify Adding New Record of Work operation type in WOT module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.3-verify-adding-new-record-of-work-operation-type-in-WOT-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.3-verify-adding-new-record-of-work-operation-type-in-WOT-module.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
            _common.search_fromSidebar(STANDARD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    })

    after(() => {
        cy.LOGOUT();
    });
    it("TC - Add Plant Type Data Record", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const DATATYPE_Column = this.data.DataTypes.Column_Headers;
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.searchTypeQuick, STANDARD_INPUTS.customizingModule)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.MasterData).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Data_Types, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.Data_Types, DATATYPE_Column)
        })
        _common.clear_subContainerFilter(cnt.uuid.Data_Types)
        _common.search_inSubContainer(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantType)
        _common.select_rowHasValue(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantType)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTER, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISBULK, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create Second Plant Type Data Record", function () {
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISBULK, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PERFORMANCE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISTIMEKEEPING, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, FIRMLYMOUNTED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTERED, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

    it("TC - Create Work Operation Types", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const OperationTypes_Column = this.data.OperationTypes.Column_Headers;
        const OperationTypes_INPUT = this.data.OperationTypes.OperationTypesInput;
        const PlantTypes_Column = this.data.PlantTypes.Column_Headers;
        const PARAMETER_WORK: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_1,
            [app.GridCells.DESCRIPTION_INFO]: WORK1,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.Day,
            [app.GridCells.IS_HIRE]: OperationTypes_INPUT.check,

        }
        const PARAMETER_IDLE: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_2,
            [app.GridCells.DESCRIPTION_INFO]: IDLE,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.Day,
            [app.GridCells.IS_HIRE]: OperationTypes_INPUT.check,
        }
        const PARAMETER_FREE: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_3,
            [app.GridCells.DESCRIPTION_INFO]: FREE,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.Day,
            [app.GridCells.IS_HIRE]: OperationTypes_INPUT.check,
        }
        const PARAMETER_PERFORMANCE: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_4,
            [app.GridCells.DESCRIPTION_INFO]: PERFORMANCE1,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.Hour,

        }
        const PARAMETER_SELL: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_5,
            [app.GridCells.DESCRIPTION_INFO]: SELL,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.ST,
            [app.GridCells.IS_MINOR_EQUIPMENT]: OperationTypes_INPUT.check

        }
        const PARAMETER_PAYBACK: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_6,
            [app.GridCells.DESCRIPTION_INFO]: PAYBACK,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.ST,
            [app.GridCells.IS_MINOR_EQUIPMENT]: OperationTypes_INPUT.check

        }
        const PARAMETER_REPAIR: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_7,
            [app.GridCells.DESCRIPTION_INFO]: REPAIR,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.Day,

        }
        const PARAMETER_TRANSPORT: DataCells = {
            [app.GridCells.IS_LIVE]: OperationTypes_INPUT.check,
            [app.GridCells.CODE]: CODE_8,
            [app.GridCells.DESCRIPTION_INFO]: TRANSPORT,
            [app.GridCells.UOM_FK]: OperationTypes_INPUT.Km,
            [app.GridCells.IS_DEFAULT]: OperationTypes_INPUT.check

        }
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.searchTypeQuick, STANDARD_INPUTS.WorkOperationTypes)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE, 0)
            _common.setup_gridLayout(cnt.uuid.OPERATION_TYPE, OperationTypes_Column)
            _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES, 2)
            _common.setup_gridLayout(cnt.uuid.Operation_2_Plant_Type, PlantTypes_Column)

        })
        _common.maximizeContainer(cnt.uuid.OPERATION_TYPE)
        cy.wait(500)//required wait
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_WORK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_IDLE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_FREE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_PERFORMANCE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_SELL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_PAYBACK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_REPAIR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OPERATION_TYPE)
        cy.wait(1000)//required wait
        _logesticPage.enterRecord_toCreateOprationType(PARAMETER_TRANSPORT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.OPERATION_TYPE)
    })
    it("TC - Verify Work Operation Types And Assign Plant Types to it", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const DATATYPE_Column = this.data.DataTypes.Column_Headers;
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;

        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, WORK1)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, WORK1)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, WORK1)
        _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, FIRMLYMOUNTED);
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, IDLE)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, IDLE)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, IDLE)
        _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, FIRMLYMOUNTED);
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, FREE)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, FREE)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, FREE)
        _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, RENTEL);
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, FIRMLYMOUNTED);
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, PERFORMANCE1)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, PERFORMANCE1)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, PERFORMANCE1)
        _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, PERFORMANCE);
        cy.SAVE()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.Operation_2_Plant_Type, app.gridCells.IS_TIMEKEEPING_DEFAULT, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, SELL)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, SELL)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, SELL)
        _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.TYPES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OPERATION_TYPE, app.FooterTab.OPERATION_TYPE)
        })
        _common.clear_subContainerFilter(cnt.uuid.OPERATION_TYPE)
        _common.search_inSubContainer(cnt.uuid.OPERATION_TYPE, REPAIR)
        cy.wait(1000) //required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.OPERATION_TYPE, app.GridCells.DESCRIPTION_INFO, REPAIR)
        _common.select_rowHasValue(cnt.uuid.OPERATION_TYPE, REPAIR)
        _common.select_tabFromFooter(cnt.uuid.Operation_2_Plant_Type, app.FooterTab.PLANT_TYPES)
        _common.create_newRecord(cnt.uuid.Operation_2_Plant_Type)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Operation_2_Plant_Type, app.gridCells.PLANT_TYPE, "grid", app.InputFields.INPUT_GROUP_CONTENT, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })


});
