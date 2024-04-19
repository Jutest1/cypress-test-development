import { app, cnt, btn, generic, tile } from "cypress/locators";
import { _bidPage, _boqPage, _businessPartnerPage, _common, _controllingUnit, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _procurementContractPage, _procurementPage, _projectPage, _saleContractPage, _salesPage, _validate } from "cypress/pages";

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
const CONTRACT_MAIN01 = 'MAIN_01_' + Cypress._.random(0, 999);
const PACKAGEDESCRIPTION01 = 'R_PACKAGE01_' + Cypress._.random(0, 999);
const PACKAGEBOQ_REFCD = 'R_CD_-' + Cypress._.random(0, 999);
const PACKAGEBOQ_REFDESC = 'R_PCKDESC_' + Cypress._.random(0, 999);
const BOQ_STRUCT_03 = 'BOQ_N_SUB03-' + Cypress._.random(0, 999);
const BOQ_STRUCT_04 = 'BOQ_N_SUB04-' + Cypress._.random(0, 999);
const INVOICE_CODE = 'INV-' + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("CONTROLLING");
allure.feature("General Contractor Controlling");
allure.story("GCC- 1.6 | Verify Sales & Procurement Cost data in General Contractor Controlling Module.");

describe("GCC- 1.6 | Verify Sales & Procurement Cost data in General Contractor Controlling Module.", () => {
    beforeEach(function () {
        cy.fixture("general-contractor-controlling/gcc-1.6-verify-sales-and-procurement-cost-data-in-general-contractor-controlling-module.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("general-contractor-controlling/gcc-1.6-verify-sales-and-procurement-cost-data-in-general-contractor-controlling-module.json").then((data) => {
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
            Cypress.env("Item1_Price", $ele1.text().replace(",", ""))
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
            Cypress.env("Item2_Price", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("Item2_Price"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTRACT_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        _common.select_rowInContainer(cnt.uuid.CONTACTS)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.CONTACTS, app.GridCells.AMOUNT_NET, ((parseFloat(Cypress.env("Item1_Price")) + parseFloat(Cypress.env("Item2_Price"))).toString()))
        })
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CONTACTS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("ContractSales_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("ContractSales_01"))
        })
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
        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
            _common.clear_subContainerFilter(cnt.uuid.Projects)
        })
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.generalContractorControlling)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
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

    it("TC - Create a Procurement package from General Conntractor Controlling.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const PACKAGE_INPUTS = this.data.Package.Package_Input
        const PACKAGE_GRID = this.data.Package.Column_Headers
        const TOTALS_INPUTS = this.data.Package.Totals_Input
        const TOTALS_GRID = this.data.Package.Totals_Column_Headers

        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createProcurementPackage)
        _common.waitForLoaderToDisappear()
        _common.findRadio_byLabel_InModal(PACKAGE_INPUTS.radioInput, commonLocators.CommonKeys.RADIO, 0, generic.locators.PLATFORM_ROW)
        _common.waitForLoaderToDisappear()
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.DESCRIPTION, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(PACKAGEDESCRIPTION01, { force: true })
        _common.editModalDropdown_WithInput(generic.locators.PROCUREMENT_STRUCTURE, PACKAGE_INPUTS.packageStructure, STANDARD_INPUTS.gridPopup)
        _common.editModalDropdown_WithInput(commonLocators.CommonLabels.CONFIGURATION, PACKAGE_INPUTS.packageConfiguration, STANDARD_INPUTS.gridPopup)
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, generic.locators.BUDGET, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(PACKAGE_INPUTS.packageBudget, { force: true })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalButtonByClass(btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, PACKAGE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowHasValue(cnt.uuid.PACKAGE, PACKAGEDESCRIPTION01)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1)
            _common.setup_gridLayout(cnt.uuid.TOTALS, TOTALS_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.TOTALS)
        _common.select_rowHasValue(cnt.uuid.TOTALS, TOTALS_INPUTS.budget)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, PACKAGE_INPUTS.packageBudget)
        })
        _common.getText_fromCell(cnt.uuid.TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageBudget_01", $ele1.text())
            cy.log(Cypress.env("PackageBudget_01"))
        })
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Package BoQ with items..", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const PACKAGE_INPUTS = this.data.Package.Package_Input
        const TOTALS_INPUTS = this.data.Package.Totals_Input
        const TOTALS_GRID = this.data.Package.Totals_Column_Headers
        const STATUS_INPUTS = this.data.Prerequisites.Status
        const PROCUREMENTBOQ_GRID = this.data.Package.ProcurementBoQ_Column_Headers
        const BOQSTRUCTURE_INPUTS = this.data.Package.BoQStructure_Input
        const BOQSTRUCTURE_GRID = this.data.Package.BoQStructure_Column_Headers
        const BOQSTRUCTURE1_DATA: DataCells = {
            [app.GridCells.BRIEF_INFO]: BOQ_STRUCT_03,
        }

        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.setDefaultView(app.TabBar.BOQBASED)
            _common.select_tabFromFooter(cnt.uuid.Procurement_BoQs, app.FooterTab.PROCUREMENT_BOQ, 0)
            _common.setup_gridLayout(cnt.uuid.Procurement_BoQs, PROCUREMENTBOQ_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.Procurement_BoQs)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.Procurement_BoQs)
        _common.waitForLoaderToDisappear()
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.REFERENCE_NO, 0, app.InputFields.DOMAIN_TYPE_CODE).clear({ force: true }).type(PACKAGEBOQ_REFCD, { force: true })
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.OUTLINE_SPECIFICATION, 0, app.InputFields.DOMAIN_TYPE_TRANSLATION).clear({ force: true }).type(PACKAGEBOQ_REFDESC, { force: true })
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.setDefaultView(app.TabBar.BOQBASED)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, BOQSTRUCTURE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
        _common.select_rowInContainer(cnt.uuid.BOQ_STRUCTURE)
        _boqPage.enterRecord_toCreateBoQStructure_V1(cnt.uuid.BOQ_STRUCTURE, BOQSTRUCTURE1_DATA)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_03)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, BOQSTRUCTURE_INPUTS.itemQuantity1)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_03)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, BOQSTRUCTURE_INPUTS.itemUnitRate1)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_03)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, STANDARD_INPUTS.gridPopup, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_01)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_03)
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_STRUCT_04)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_04)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, BOQSTRUCTURE_INPUTS.itemQuantity2)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_04)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTURE,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, BOQSTRUCTURE_INPUTS.itemUnitRate2)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_04)
        _common.edit_dropdownCellWithInput(cnt.uuid.BOQ_STRUCTURE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, STANDARD_INPUTS.gridPopup, app.InputFields.INPUT_GROUP_CONTENT, CU_SUB_02)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_03)
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item1_total", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("Item1_total"))
        })
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCT_04)
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Item2_total", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("Item2_total"))
        })
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changePackageStatus)
        _common.changeStatus_fromModal(STATUS_INPUTS.inProgress)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1)
            _common.setup_gridLayout(cnt.uuid.TOTALS, TOTALS_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.TOTALS)
        _common.select_rowHasValue(cnt.uuid.TOTALS, TOTALS_INPUTS.total)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, ((parseFloat(Cypress.env("Item1_total")) + parseFloat(Cypress.env("Item2_total"))).toString()))
        })
        _common.getText_fromCell(cnt.uuid.TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageTotals_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PackageTotals_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TOTALS, TOTALS_INPUTS.budget)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, PACKAGE_INPUTS.packageBudget)
        })
        _common.getText_fromCell(cnt.uuid.TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PackageBudget_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PackageBudget_01"))
        })
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create a Contract from Package.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const STATUS_INPUTS = this.data.Prerequisites.Status
        const CONTRACT_INPUTS = this.data.Contract.Contract_Input
        const CONTRACT_GRID = this.data.Contract.Column_Headers
        const PRCBOQSCONT_GRID = this.data.Contract.ProcurementBoQ_Column_Headers
        const PRCBOQSTRUCTURECONT_GRID = this.data.Contract.BoQStructure_Column_Headers

        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createContract)
        _package.create_ContractfromPackage(CONTRACT_INPUTS.businessPartner)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTRACT_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NAME).pinnedItem()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, STANDARD_INPUTS.gridPopup, app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.NET, Cypress.env("PackageTotals_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PrcContractTotal_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PrcContractTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.ProcurementContractBoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ProcurementContract_BoQs, app.FooterTab.PROCUREMENT_BOQ, 0)
            _common.setup_gridLayout(cnt.uuid.ProcurementContract_BoQs, PRCBOQSCONT_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.ProcurementContract_BoQs)
        _common.select_rowHasValue(cnt.uuid.ProcurementContract_BoQs, PACKAGEBOQ_REFDESC)
        _common.openTab(app.tabBar.ProcurementContractBoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ProcurementContract_BoQStructure, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.ProcurementContract_BoQStructure, PRCBOQSTRUCTURECONT_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.ProcurementContract_BoQStructure)
        _common.select_rowHasValue(cnt.uuid.ProcurementContract_BoQStructure, BOQ_STRUCT_03)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ProcurementContract_BoQStructure, app.gridCells.FINALPRICE, Cypress.env("Item1_total"))
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ProcurementContract_BoQStructure, BOQ_STRUCT_04)
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ProcurementContract_BoQStructure, app.gridCells.FINALPRICE, Cypress.env("Item2_total"))
        })
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changePrcContractStatus)
        _common.changeStatus_fromModal(STATUS_INPUTS.approved)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create PES from Procurement Contract.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const STATUS_INPUTS = this.data.Prerequisites.Status
        const PESHEAD_GRID = this.data.PES.Column_Headers
        const PESBOQ_GRID = this.data.PES.PESBoQ_Column_Headers
        const PESBOQSTRUCTURE_INPUT = this.data.PES.PESBoQStructure_Input
        const PESBOQSTRUCTURE_GRID = this.data.PES.PESBoQStructure_Column_Headers

        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createPES)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.PerformanceEntrySheet).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS, PESHEAD_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.openTab(app.tabBar.PESBoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Pes_items, app.FooterTab.BOQS, 0)
            _common.setup_gridLayout(cnt.uuid.Pes_items, PESBOQ_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.Pes_items)
        _common.select_rowInContainer(cnt.uuid.Pes_items)
        _common.openTab(app.tabBar.PESBoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BoQs_Structure, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.PES_BoQs_Structure, PESBOQSTRUCTURE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.PES_BoQs_Structure)
        _common.select_rowHasValue(cnt.uuid.PES_BoQs_Structure, BOQ_STRUCT_03)
        _common.waitForLoaderToDisappear()
        _common.editContainerCellwithDynamicInputField(cnt.uuid.PES_BoQs_Structure, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, PESBOQSTRUCTURE_INPUT.itemQuantity1)
        _common.select_rowHasValue(cnt.uuid.PES_BoQs_Structure, BOQ_STRUCT_03)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PES_BoQs_Structure, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESItem1", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PESItem1"))
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PES_BoQs_Structure, BOQ_STRUCT_04)
        _common.waitForLoaderToDisappear()
        _common.editContainerCellwithDynamicInputField(cnt.uuid.PES_BoQs_Structure, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, PESBOQSTRUCTURE_INPUT.itemQuantity2)
        _common.select_rowHasValue(cnt.uuid.PES_BoQs_Structure, BOQ_STRUCT_04)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PES_BoQs_Structure, app.gridCells.FINALPRICE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESItem2", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PESItem2"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.PerformanceEntrySheet).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.HEADERS, app.GridCells.PES_VALUE, ((parseFloat(Cypress.env("PESItem1")) + parseFloat(Cypress.env("PESItem2"))).toString()))
        })
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESTotal_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("PESTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changePESStatus)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(STATUS_INPUTS.acception)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Invoice with Net total from PES.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const STATUS_INPUTS = this.data.Prerequisites.Status
        const INVOICE_INPUTS = this.data.Invoice.Invoice_Input
        const INVOICE_GRID = this.data.Invoice.Invoice_Column_Headers

        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createInvoice)
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreate_Invoice_FromWizard("Create one invoice per PES", INVOICE_CODE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.invoices).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, INVOICE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _common.editContainerCellwithDynamicInputField(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, INVOICE_INPUTS.invoiceAmount)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changeInvoiceStatus)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(STATUS_INPUTS.posted)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.INVOICEHEADER, INVOICE_CODE)
        _common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("InvoiceTotal_01", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("InvoiceTotal_01"))
        })
    })

    it("TC - Verify Sales Contract, Package, Procurement Contract, PES and Invoice Totals in General Contractor Controlling Module.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const SALES_CONTRACT_GRID = this.data.GeneralContractorControlling.SalesContract_Column_Headers
        const PRC_PACKAGE_GRID = this.data.GeneralContractorControlling.PRCPackage_Column_Headers
        const PRC_CONTRACT_GRID = this.data.GeneralContractorControlling.PRCContract_Column_Headers
        const PRC_PES_GRID = this.data.GeneralContractorControlling.PRCPES_Column_Headers
        const PRC_INVOICE_GRID = this.data.GeneralContractorControlling.PRCInvoice_Column_Headers
        const COSTCONTROL_GRID = this.data.GeneralContractorControlling.CostControl_Column_Headers

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
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.set_Container_Layout_InEditView(generic.locators.GCC_LAYOUT_21)
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
        _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.GCC_PACKAGE_BUDGET, Cypress.env("PackageBudget_01"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.GCC_CONTRACT, Cypress.env("PrcContractTotal_01"))
            _common.assert_forNumericValues(cnt.uuid.Cost_Control, app.gridCells.GCC_INVOICE, Cypress.env("InvoiceTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GCC_CONTRACTSALES, app.FooterTab.CONTRACT_SALES, 1);
            _common.setup_gridLayout(cnt.uuid.GCC_CONTRACTSALES, SALES_CONTRACT_GRID)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GCC_CONTRACTSALES, app.FooterTab.CONTRACT_SALES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.GCC_CONTRACTSALES)
        _common.select_rowInContainer(cnt.uuid.GCC_CONTRACTSALES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.GCC_CONTRACTSALES, app.GridCells.TOTAL, Cypress.env("ContractSales_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Procurement_Packages, app.FooterTab.PRC_PACKAGE, 2);
            _common.setup_gridLayout(cnt.uuid.Procurement_Packages, PRC_PACKAGE_GRID)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Procurement_Packages, app.FooterTab.PRC_PACKAGE, 2);
        });
        _common.select_rowInContainer(cnt.uuid.Procurement_Packages)
        _common.clear_subContainerFilter(cnt.uuid.Procurement_Packages)
        _common.select_rowInContainer(cnt.uuid.Procurement_Packages)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.Procurement_Packages, app.GridCells.BUDGET, Cypress.env("PackageBudget_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_CONTRACT, app.FooterTab.PRC_CONTRACT, 3);
            _common.setup_gridLayout(cnt.uuid.GCC_PRC_CONTRACT, PRC_CONTRACT_GRID)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_CONTRACT, app.FooterTab.PRC_CONTRACT, 3);
        });
        _common.clear_subContainerFilter(cnt.uuid.GCC_PRC_CONTRACT)
        _common.select_rowInContainer(cnt.uuid.GCC_PRC_CONTRACT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.GCC_PRC_CONTRACT, app.GridCells.TOTAL, Cypress.env("PrcContractTotal_01"))
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Procurement_PES, app.FooterTab.PRC_PES, 4);
            _common.setup_gridLayout(cnt.uuid.Procurement_PES, PRC_PES_GRID)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Procurement_PES, app.FooterTab.PRC_PES, 4);
        });
        _common.clear_subContainerFilter(cnt.uuid.Procurement_PES)
        _common.select_rowInContainer(cnt.uuid.Procurement_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.Procurement_PES, app.GridCells.PES_VALUE, Cypress.env("PESTotal_01"))
        })
        _common.waitForLoaderToDisappear()

        _common.openTab(app.tabBar.GENERAL_CONTRACTOR_CONTROLLING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_INVOICE, app.FooterTab.PRC_INVOICE, 1);
            _common.setup_gridLayout(cnt.uuid.GCC_PRC_INVOICE, PRC_INVOICE_GRID)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Cost_Control, app.FooterTab.COST_CONTROL, 0);
            _common.select_rowHasValue(cnt.uuid.Cost_Control, Cypress.env("Item1_CU"))
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GCC_PRC_INVOICE, app.FooterTab.PRC_INVOICE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.GCC_PRC_INVOICE)
        _common.select_rowInContainer(cnt.uuid.GCC_PRC_INVOICE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.assert_forNumericValues(cnt.uuid.GCC_PRC_INVOICE, app.GridCells.AMOUNT_NET, Cypress.env("InvoiceTotal_01"))
        })
        _common.waitForLoaderToDisappear()
    })

});

after(() => {
    cy.LOGOUT();
});