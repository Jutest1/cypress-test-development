import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _package } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ControllingUnit = "ControllingUnit" + Cypress._.random(0, 999);
const PLANTDESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const ITEM1_DESC = "Escavator" + Cypress._.random(0, 999);
const ITEM2_DESC = "Paylode" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.5 | Verify Creating New PES Record From Contract And Quantity Transfer In Plant Master Module");

describe("LRM- 1.5 | Verify Creating New PES Record From Contract And Quantity Transfer In Plant Master Module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.5-verify-creating-new-PES-record-from-contract-and-quantity-transfer-in-plant-master-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.5-verify-creating-new-PES-record-from-contract-and-quantity-transfer-in-plant-master-module.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.Projects)
            });
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
            cy.SAVE();
        });
    })
    it("TC - Add Controlling Unit", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const CU_COLUMN = this.data.Column_ControllingUnit

        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.ControllingUnits)
        cy.REFRESH_CONTAINER()
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
        _common.openTab(app.tabBar.controllingStructure).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CU_COLUMN)
            _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(ControllingUnit)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it('TC - Add New Contract And Items', function () {
        const CONTRACT_GRID = this.data.columns.contract_ColumnHeaders;
        const ITEM_GRID = this.data.columns.Items_ColumnHeaders;
        const ITEM_INPUT = this.data.items.iteminputs;
        const CONTRACT_INPUT = this.data.contract.contractInputs;
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const ITEM1_Parameter1: DataCells = {
            [app.GridCells.DESCRIPTION_1]: ITEM1_DESC,
            [app.GridCells.PRC_STRUCTURE_FK]: ITEM_INPUT.procurmentstructure,
            [app.GridCells.QUANTITY_SMALL]: ITEM_INPUT.quantity1,
            [app.GridCells.PRICE_SMALL]: ITEM_INPUT.price1,
            [app.GridCells.BAS_UOM_FK]: ITEM_INPUT.uom1,
        };
        const ITEM2_Parameter2: DataCells = {
            [app.GridCells.DESCRIPTION_1]: ITEM2_DESC,
            [app.GridCells.PRC_STRUCTURE_FK]: ITEM_INPUT.procurmentstructure,
            [app.GridCells.QUANTITY_SMALL]: ITEM_INPUT.quantity2,
            [app.GridCells.BAS_UOM_FK]: ITEM_INPUT.uom2,
            [app.GridCells.PRICE_SMALL]: ITEM_INPUT.price2,
        };
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.Contract)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTRACT_GRID)
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _procurementContractPage.enterRecord_ToCreateProcurementContract(CONTRACT_INPUT.configuration, CONTRACT_INPUT.businessPartner);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, ITEM_GRID)
            _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        })
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM1_Parameter1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM2_Parameter2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.openSidebarOption(STANDARDINPUTS.Wizard)
        _common.search_fromSidebar(STANDARDINPUTS.wizard, STANDARDINPUTS.ChangeCONTRACTStatus)
        _common.changeStatus_fromModal(STANDARDINPUTS.Approved)

    });

    it("TC - Verify Create Plant From Item", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTSINPUT = this.data.Plants.Plantsinputs;
        const PLANTS_PARAMETER: DataCells = {
            [commonLocators.CommonLabels.PLANT_CODE]: PLANT_CODE,
            [commonLocators.CommonLabels.PLANT_DESCRIPTION]: PLANTDESC,
            [commonLocators.CommonLabels.PLANT_GROUP]: PLANTSINPUT.plantgroup,
            [commonLocators.CommonLabels.PLANT_TYPE]: PLANTSINPUT.plant_type,
            [commonLocators.CommonLabels.PLANT_KIND]: PLANTSINPUT.plantKind,

        }
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
            _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        });
        cy.wait(1000) //required wait
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.openSidebarOption(STANDARDINPUTS.Wizard)
        _common.search_fromSidebar(STANDARDINPUTS.wizard, STANDARDINPUTS.CreatePlantfromItem)
        cy.wait(1000) //required wait
        _procurementContractPage.enterRecord_CreatePlantFromContractitem(PLANTSINPUT.updateplant, PLANTSINPUT.indexplant, PLANTS_PARAMETER)
        cy.SAVE()

    })
    it("TC- Create PES from contract", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTSINPUT = this.data.Plants.Plantsinputs;
        const PES_COLUMN = this.data.Column_PES;
        const PESITEM_COLUMN = this.data.Column_PESITEM;
        const PESITEM2_Parameter: DataCells = {
            [app.GridCells.QUANTITY_SMALL]: PLANTSINPUT.PESitem,

        };
        _common.openSidebarOption(STANDARDINPUTS.Wizard)
        _common.search_fromSidebar(STANDARDINPUTS.wizard, STANDARDINPUTS.createPES)

        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.clickOn_modalFooterButton(Buttons.buttonText.GoToPES)
        cy.wait(1000)
        _common.openTab(app.tabBar.PerformanceEntrySheet).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
            _common.setup_gridLayout(cnt.uuid.HEADERS, PES_COLUMN)
            _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        });
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESCODE", $ele1.text())
        })

        _common.openTab(app.tabBar.PerformanceEntrySheet).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMS, PESITEM_COLUMN)
            _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        });
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMS, PESITEM2_Parameter);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARDINPUTS.Wizard)
        _common.search_fromSidebar(STANDARDINPUTS.wizard, STANDARDINPUTS.changePESStatus)
        _common.changeStatus_fromModal(STANDARDINPUTS.Delivered)

    })
    it("TC- Verify Plant Tranfer in Plant Master Module", function () {
        const PLANTSINPUT = this.data.Plants.Plantsinputs;
        const PLANTTRANSFER_Parameter: DataCells = {
            [commonLocators.CommonLabels.JOB]: PRJ_NO,
            [commonLocators.CommonLabels.WorkOperationType]: PLANTSINPUT.WorkOprationType

        };
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _logesticPage.enterRecord_toTransferOfPlantManagement(PLANTTRANSFER_Parameter)
        cy.SAVE()

    })

    it('TC - Verify Plant Record In Plant Master', function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const COLUMN_Plant = this.data.columns.Column_Plant;
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.PlantMaster);
        _common.openTab(app.tabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Plant, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.Plant, COLUMN_Plant)
            _common.clear_subContainerFilter(cnt.uuid.Plant)
            cy.REFRESH_CONTAINER()
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).search_fromSidebar(STANDARDINPUTS.searchType, PLANT_CODE);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.selectActiveRow_inContainer(cnt.uuid.Plant)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant, app.GridCells.CODE, PLANT_CODE)
    })

        after(() => {
            cy.LOGOUT();
        });

});
