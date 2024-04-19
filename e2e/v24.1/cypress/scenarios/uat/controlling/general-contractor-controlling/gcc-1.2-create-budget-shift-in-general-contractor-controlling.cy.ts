import { app, cnt, btn, generic, tile } from "cypress/locators";
import { _bidPage, _boqPage, _businessPartnerPage, _common, _controllingUnit, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _saleContractPage, _salesPage, _validate } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "R_PR-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR_DESC-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS"
const CU_MAIN_01 = "RNMHEADER_CU-" + Cypress._.random(0, 999)
const CU_SUB_01 = 'SUB_CU_01-' + Cypress._.random(0, 999);
const CU_SUB_02 = 'SUB_CU_02-' + Cypress._.random(0, 999);
const BOQ_HEAD_01 = 'BOQ_MAIN01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_01 = 'BOQ_SUB01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_02 = 'BOQ_SUB02-' + Cypress._.random(0, 999);
const CONTRACT_MAIN01 = 'MAIN_01_-' + Cypress._.random(0, 999);
const BUDGETSHIFT01 = 'BS_01_-' + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("CONTROLLING");
allure.feature("General Contractor Controlling");
allure.story("GCC- 1.2 | Create Budget Shift in General Contractor Controlling.");

describe("GCC- 1.2 | Create Budget Shift in General Contractor Controlling.", () => {
    beforeEach(function () {
        cy.fixture("general-contractor-controlling/gcc-1.2-create-budget-shift-in-general-contractor-controlling.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("general-contractor-controlling/gcc-1.2-create-budget-shift-in-general-contractor-controlling.json").then((data) => {
            this.data = data
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    it("TC - Create New Project & Pin it", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
            _common.clear_subContainerFilter(cnt.uuid.Projects)
        })
        _common.clear_subContainerFilter(cnt.uuid.Projects)
        _common.create_newRecord(cnt.uuid.Projects);
        _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem();
    })

    it("TC - Create Controlling Units", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const CONTROLLINGUNITS_GRID = this.data.ControllingUnit.Column_Headers
        const CONTROLLINGUNITS_INPUT = this.data.ControllingUnit.ControllingUnitInput

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.controllingUnit)
        _common.openTab(app.tabBar.controllingStructure).then(() => {
            _common.setDefaultView(app.tabBar.controllingStructure)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTROLLINGUNITS_GRID,)
        });
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        cy.REFRESH_CONTAINER()
        _controllingUnit.create_ControllingUnit(CU_MAIN_01, CONTROLLINGUNITS_INPUT.quantity, CONTROLLINGUNITS_INPUT.uom)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(CU_SUB_01)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(CU_SUB_02)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create a BoQ header and BoQ item records.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const BOQ_GRID = this.data.BoQ.Column_Headers;
        const BOQSTRUCTURE_INPUT = this.data.BoQStructure.BoQStructure_Inputs;
        const BOQSTRUCTURE_GRID = this.data.BoQStructure.Column_Headers;
        const BOQSTRUCTURE1_DATA: DataCells = {
            [app.GridCells.BRIEF_INFO]: BOQ_STRUCT_01,
            [app.GridCells.QUANTITY_SMALL]: BOQSTRUCTURE_INPUT.quantity1,
            [ app.GridCells.PRICE]: BOQSTRUCTURE_INPUT.unitRate1,
            [app.GridCells.BAS_UOM_FK]: BOQSTRUCTURE_INPUT.uom,
            [app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]: CU_SUB_01,
        }

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.project)
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        _common.openTab(app.tabBar.BoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS)
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(BOQ_HEAD_01)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTURE_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure_V1(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTURE1_DATA)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateSecondBoQStructure(BOQ_STRUCT_02, BOQSTRUCTURE_INPUT.quantity2, BOQSTRUCTURE_INPUT.unitRate2, BOQSTRUCTURE_INPUT.uom)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURES, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, STANDARD_INPUTS.gridPopup, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_02)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Sales Contract using Source BoQ.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const STATUS_INPUTS = this.data.Prerequisites.Status
        const CONTRACT_GRID = this.data.ContractSales.Column_Headers
        const CONTRACT_INPUT = this.data.ContractSales.ContractSales_Input
        const CONTRACT_BOQ_GRID = this.data.ContractSales.BoQ_Column_Headers
        const BOQSTRUCTURE_GRID = this.data.ContractSales.BoQStructure_Column_Headers
        const MAINCONTRACT_DATA: DataCells = {
            [commonLocators.CommonLabels.DESCRIPTION]: CONTRACT_MAIN01,
            [commonLocators.CommonLabels.BOQ_SOURCE]: CONTRACT_INPUT.boqSource,
            [commonLocators.CommonLabels.BOQS]: BOQ_HEAD_01,
            [commonLocators.CommonLabels.PROJECT_NAME]: PRJ_NAME
        }

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.contractSales)
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACTS)
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTRACT_GRID)
        });
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        _common.create_newRecord(cnt.uuid.CONTACTS)
        _common.waitForLoaderToDisappear()
        _saleContractPage.enterRecord_createNewContractRecord(CONTRACT_INPUT.businessPartner, MAINCONTRACT_DATA)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs, app.FooterTab.BOQs, 0);
            _common.setup_gridLayout(cnt.uuid.contractSales_BoQs, CONTRACT_BOQ_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.contractSales_BoQs)
        _common.select_rowHasValue(cnt.uuid.contractSales_BoQs, BOQ_HEAD_01)
        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, BOQSTRUCTURE_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_01)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "20")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_CU", $ele1.text())
            cy.log(Cypress.env("Item1_CU"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Price", $ele1.text())
            cy.log(Cypress.env("Item1_Price"))
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE1)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_02)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "20")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_CU", $ele1.text())
            cy.log(Cypress.env("Item2_CU"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_Price", $ele1.text())
            cy.log(Cypress.env("Item2_Price"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTRACT_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changeContractStatus)
        _common.changeStatus_fromModal(STATUS_INPUTS.contracted)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Cost Control Structure in General Contractor Controlling module.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const COSTCONTROL_GRID = this.data.GeneralContractorControlling.CostControl_Column_Headers
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.project)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.generalContractorControlling)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Control, COSTCONTROL_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.Cost_Control)
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createUpdateCostControlStructure)
        _common.selectMultipleRows_inModal()
        _common.selectRowHasValue_inModal(CONTRACT_MAIN01)
        _common.setCell_checkboxValue_Inmodal(app.GridCells.MARKER, STANDARD_INPUTS.check)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.SAVE().then(() => {
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.GridCells.REVENUE, Cypress.env("Item1_Price"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.BASIC_COST, Cypress.env("Item1_Price"))
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item2_CU"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.GridCells.REVENUE, Cypress.env("Item2_Price"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.BASIC_COST, Cypress.env("Item2_Price"))
        })
        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
        _common.getText_fromCell(cnt.uuid.Cost_Control, app.GridCells.BUDGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_Budget", $ele1.text())
            cy.log(Cypress.env("Item1_Budget"))
        })
        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item2_CU"))
        _common.getText_fromCell(cnt.uuid.Cost_Control, app.GridCells.BUDGET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_Budget", $ele1.text())
            cy.log(Cypress.env("Item2_Budget"))
        })
    })

    it("TC - Create a Budget shift and Verify it.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const COSTCONTROL_GRID = this.data.GeneralContractorControlling.CostControl_Column_Headers
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const BUDGETSHIFT_INPUTS = this.data.GeneralContractorControlling.BudgetShift_Input
        const BUDGETSHIFT_GRID = this.data.GeneralContractorControlling.BudgetShift_Column_Headers

        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createBudgetShift)
        _common.waitForLoaderToDisappear()
        _common.selectCell_hasValueInModal(app.gridCells.CONTROLLINGUNITDESCRIPTION_BUDGET_SHIFT, CU_SUB_01, 0)
        _common.waitForLoaderToDisappear()
        _common.enterRecordInActiveRow_inModal(app.gridCells.DESCRIPTION_COL, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BUDGETSHIFT01)
        _common.enterRecordInActiveRow_inModal(app.gridCells.SHIFT_BUDGET, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BUDGETSHIFT_INPUTS.shiftAmount)
        _common.selectCell_hasValueInModal(app.gridCells.CONTROLLINGUNITDESCRIPTION_BUDGET_SHIFT, CU_SUB_01, 0)
        _common.waitForLoaderToDisappear()
        _common.selectCell_hasValueInModal(app.gridCells.SOURCE_OR_TARGET, BUDGETSHIFT_INPUTS.target, 0)
        _common.waitForLoaderToDisappear()
        _common.enterRecordInActiveRow_inModal(app.gridCells.CONTROLLINGUNIT_BUDGET_SHIFT, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_02)
        _common.waitForLoaderToDisappear()
        cy.wait(2000).then(() => {
            _common.selectValue_fromModalPopup(STANDARD_INPUTS.gridPopup, CU_SUB_02)
        })
        _common.selectCell_hasValueInModal(app.gridCells.SOURCE_OR_TARGET, BUDGETSHIFT_INPUTS.target, 0)
        _common.getText_fromCell_fromModal(app.gridCells.SHIFT_BUDGET).then(($budget) => {
            Cypress.env("Target_Budget", $budget.text())
            cy.log("Shifted Budget =>  " + Cypress.env("Target_Budget"))
        })
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Control, COSTCONTROL_GRID)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item2_CU"))
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.GridCells.BUDGET, ((parseFloat(Cypress.env("Item2_Budget")) + parseFloat(Cypress.env("Target_Budget"))).toString()))
        })
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Budget_Shift, app.FooterTab.BUDGET_SHIFT, 0);
            _common.setup_gridLayout(cnt.uuid.Budget_Shift, BUDGETSHIFT_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.Budget_Shift)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Control, COSTCONTROL_GRID)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item2_CU"))
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Budget_Shift, app.FooterTab.BUDGET_SHIFT, 0);
            _common.setup_gridLayout(cnt.uuid.Budget_Shift, BUDGETSHIFT_GRID)
        });
        _common.select_rowHasValue(cnt.uuid.Budget_Shift, BUDGETSHIFT01)
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.Budget_Shift, app.GridCells.VALUE, (parseFloat(Cypress.env("Target_Budget"))).toString())
        })
    })

});

after(() => {
    cy.LOGOUT();
});