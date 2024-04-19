import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const PLANT_TYPE = "Plant_Type-" + Cypress._.random(0, 999);
const PLANT_LIST1 = "Price List 1-" + Cypress._.random(0, 999);
const PLANT_LIST2 = "Price List 2-" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.1 | Verify Adding New Pricelist In Customizing Module");

describe("LRM- 1.1 | Verify Adding New Pricelist In Customizing Module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.1-verify-adding-new-pricelist-in-customizing-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.1-verify-adding-new-pricelist-in-customizing-module.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
            _common.search_fromSidebar(STANDARD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    })

    it("TC - Add Plant Type Record", function () {
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
        _common.search_inSubContainer(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantListType)
        _common.select_rowHasValue(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantListType)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_TYPE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create New Data Record", function () {
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
        _common.openTab(app.tabBar.MasterData).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Data_Types, app.FooterTab.DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.Data_Types)
        _common.search_inSubContainer(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantPriceList)
        _common.select_rowHasValue(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantPriceList)

        const PARAMETER2: DataCells = {
            [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
            [app.GridCells.ETM_CONTEXT_FK]: DATA_RECORD_INPUTS.RIBEquipmentContext,
            [app.GridCells.CURRENCY_FK]: DATA_RECORD_INPUTS.Currency,
            [app.GridCells.PERCENT]: DATA_RECORD_INPUTS.Percent,
            [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST1,
            [app.GridCells.UOM_FK]: DATA_RECORD_INPUTS.UoM,
            [app.GridCells.CALCULATION_TYPE_FK]: DATA_RECORD_INPUTS.AverageCatalogValue

        }
        const PARAMETER3: DataCells = {
            [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
            [app.GridCells.ETM_CONTEXT_FK]: DATA_RECORD_INPUTS.RIBEquipmentContext,
            [app.GridCells.CURRENCY_FK]: DATA_RECORD_INPUTS.Currency,
            [app.GridCells.PERCENT]: DATA_RECORD_INPUTS.Percent,
            [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST2,
            [app.GridCells.UOM_FK]: DATA_RECORD_INPUTS.UoM,
            [app.GridCells.CALCULATION_TYPE_FK]: DATA_RECORD_INPUTS.AverageCatalogValue

        }
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(PARAMETER2)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.IS_MANUAL_EDIT_PLANT_MASTER, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(PARAMETER3)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.IS_MANUAL_EDIT_PLANT_MASTER, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

    it("TC - Verify Data Record", function () {
        _common.openTab(app.tabBar.MasterData).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, PLANT_LIST1)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, PLANT_LIST1)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, PLANT_LIST2)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, PLANT_LIST2)
    })


    after(() => {
        cy.LOGOUT();
    });
});
