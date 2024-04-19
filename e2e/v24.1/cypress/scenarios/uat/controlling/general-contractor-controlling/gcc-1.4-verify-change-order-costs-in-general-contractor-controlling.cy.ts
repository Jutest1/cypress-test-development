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
const CU_SUB_03 = 'SUB_CU_03-' + Cypress._.random(0, 999);
const BOQ_HEAD_01 = 'BOQ_MAIN01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_01 = 'BOQ_SUB01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_02 = 'BOQ_SUB02-' + Cypress._.random(0, 999);
const BOQ_STRUCT_CHNG01 = 'BOQ_SUB01-CHANGE-' + Cypress._.random(0, 999);
const BOQ_STRUCT_CHNG02 = 'BOQ_SUB02-CHANGE-' + Cypress._.random(0, 999);
const CONTRACT_MAIN01 = 'MAIN_01_-' + Cypress._.random(0, 999);
const CONTRACT_CHANGE01 = 'CHANGE_01_-' + Cypress._.random(0, 999);
const CO_CODE = 'CHN_01_-' + Cypress._.random(0, 999);
const CO_DESCRIPTION = 'CHANGE_OC01_-' + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("CONTROLLING");
allure.feature("General Contractor Controlling");
allure.story("GCC- 1.4 | Verify Change Order Costs in General Contractor Controlling.");

describe("GCC- 1.4 | Verify Change Order Costs in General Contractor Controlling.", () => {
    beforeEach(function () {
        cy.fixture("general-contractor-controlling/gcc-1.4-verify-change-order-costs-in-general-contractor-controlling.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("general-contractor-controlling/gcc-1.4-verify-change-order-costs-in-general-contractor-controlling.json").then((data) => {
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
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(CU_SUB_03)
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
        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
            _common.clear_subContainerFilter(cnt.uuid.Projects)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.generalContractorControlling)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(3000)
        _common.waitForLoaderToDisappear()
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

    it("TC - Create a Change Order Contract with change item in it.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const CONTRACT_GRID = this.data.ContractSales.Column_Headers
        const CHANGECONTRACT_INPUT = this.data.ContractSales.ChangeContract_Input
        const CONTRACT_BOQ_GRID = this.data.ContractSales.BoQ_Column_Headers
        const BOQSTRUCTURE_GRID = this.data.ContractSales.BoQStructure_Column_Headers
        const STATUS_INPUTS = this.data.Prerequisites.Status
        const CHANGECONTRACT_DATA: DataCells = {
            [commonLocators.CommonLabels.CONTRACT_TYPE]: CHANGECONTRACT_INPUT.contractTypeChange,
            [commonLocators.CommonLabels.DESCRIPTION]: CONTRACT_CHANGE01,
            [commonLocators.CommonLabels.BOQ_SOURCE]: CHANGECONTRACT_INPUT.boqSource,
            [commonLocators.CommonLabels.BOQS]: BOQ_HEAD_01,
            [commonLocators.CommonLabels.PROJECT_NAME]: PRJ_NAME,
            [commonLocators.CommonLabels.CHANGE_ORDER_CODE]: CO_CODE,
            [commonLocators.CommonLabels.CHANGE_ORDER_DESCRIPTION]: CO_DESCRIPTION,
            [commonLocators.CommonLabels.CHANGE_TYPE]: CHANGECONTRACT_INPUT.changeType,
            [commonLocators.CommonLabels.CHANGE_REASON]: CHANGECONTRACT_INPUT.changeReason,
            [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            [commonLocators.CommonLabels.CHANGE_ORDER]: CO_DESCRIPTION
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
        _saleContractPage.enterRecord_createNewContractRecord(CHANGECONTRACT_INPUT.businessPartner, CHANGECONTRACT_DATA)
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
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE1)
        _common.waitForLoaderToDisappear()
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.BRIEF_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_STRUCT_CHNG01)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CHANGECONTRACT_INPUT.changeQuantity)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, CHANGECONTRACT_INPUT.changeUnitRate)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, STANDARD_INPUTS.gridPopup, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_03)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_CHNG01)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item3_CU", $ele1.text())
            cy.log(Cypress.env("Item3_CU"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item3_ChPrice", $ele1.text())
            cy.log(Cypress.env("Item3_ChPrice"))
        })
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_01)
        _common.delete_recordFromContainer(cnt.uuid.BOQ_STRUCTURE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_02)
        _common.delete_recordFromContainer(cnt.uuid.BOQ_STRUCTURE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_CHNG01)
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE1)
        _common.waitForLoaderToDisappear()
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.BRIEF_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_STRUCT_CHNG02)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CHANGECONTRACT_INPUT.changeQuantity2)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE1,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, CHANGECONTRACT_INPUT.changeUnitRate2)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, STANDARD_INPUTS.gridPopup, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_02)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1, BOQ_STRUCT_CHNG01)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item4_CU", $ele1.text())
            cy.log(Cypress.env("Item4_CU"))
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item4_ChPrice", $ele1.text())
            cy.log(Cypress.env("Item4_ChPrice"))
        })
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTRACT_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.CONTACTS, CONTRACT_CHANGE01)
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changeContractStatus)
        _common.changeStatus_fromModal(STATUS_INPUTS.contracted)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify Change Order price in General Contractor Controlling.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const COSTCONTROL_GRID = this.data.GeneralContractorControlling.CostControl_Column_Headers
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.project)
        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
            _common.clear_subContainerFilter(cnt.uuid.Projects)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.generalContractorControlling)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(3000)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Control, COSTCONTROL_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.Cost_Control)
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createUpdateCostControlStructure)
        _common.waitForLoaderToDisappear()
        _common.selectMultipleRows_inModal()
        _common.selectRowHasValue_inModal(CONTRACT_CHANGE01)
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
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item3_CU"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.GridCells.REVENUE, Cypress.env("Item3_ChPrice"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.BASIC_COST_CO, Cypress.env("Item3_ChPrice"))
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item4_CU"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.GridCells.REVENUE, Cypress.env("Item4_ChPrice"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.BASIC_COST_CO, Cypress.env("Item4_ChPrice"))
        })
    })
})

after(() => {
    cy.LOGOUT();
});