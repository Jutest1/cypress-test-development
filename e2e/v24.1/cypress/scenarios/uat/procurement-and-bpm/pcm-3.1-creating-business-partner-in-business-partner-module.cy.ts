import { app, cnt, btn, commonLocators } from "cypress/locators";
import { _businessPartnerPage, _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _validate } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const BP_CODE = 'BP-CD-' + Cypress._.random(0, 999);
const BP_NAME = 'RNM_BP_' + Cypress._.random(0, 999);
const BRANCH_NAME = 'RNM_BP_BRANCH' + Cypress._.random(0, 999);
const BP_PINCODE = (Cypress._.random(0, 999999)).toString();
const CON_TELEPHONE = (Cypress._.random(0, 999999999)).toString();
const BPEV_CODE = 'EVL_-' + Cypress._.random(0, 999);
const BPEV_NAME = 'EVL_DESC_-' + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Business Partner");
allure.story("PCM- 3.1 | Creating Business partner in Business partner module.");

describe("PCM- 3.1 | Creating Business partner in Business partner module.", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-3.1-creating-business-partner-in-business-partner-module.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("pcm/pcm-3.1-creating-business-partner-in-business-partner-module.json").then((data) => {
            this.data = data
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
            const MODULE_INPUT = this.data.Prerequisites.Modules

            _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
            _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUT.businessPartner)
        })
    });

    it("TC - Create a Business Partner record.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const WIZARD_INPUTS = this.data.Prerequisites.Wizard
        const BP_INPUT = this.data.BusinessPartner.BusinessPartner_Input
        const BP_GRID = this.data.BusinessPartner.BusinessPartner_Column_Headers
        const BRANCH_INPUT = this.data.BusinessPartner.Branches_Inputs
        const BRANCH_GRID = this.data.BusinessPartner.Branches_Column_Headers
        const PRCSTRUCTURE_INPUT = this.data.BusinessPartner.ProcurementStructure_Inputs
        const PRCSTRUCTURE_GRID = this.data.BusinessPartner.ProcurementStructure_Column_Headers
        const CONTACT_INPUT = this.data.BusinessPartner.Contacts_Input
        const CONTACT_GRID = this.data.BusinessPartner.Contacts_Column_Headers
        const EVALUATION_INPUT = this.data.BusinessPartner.Evaluation_Input
        const EVALUATIONPRECENT_INPUT = this.data.BusinessPartner.EvaluationPercentage
        const PRCSTRUCTUREINPUT: DataCells = {
            [commonLocators.CommonKeys.SEARCH_RESULT]: PRCSTRUCTURE_INPUT.procurementStructure,
            [app.GridCells.IS_SELECTED]: STANDARD_INPUTS.check
        }
        const EVALUATION: DataCells = {
            [app.InputFields.INPUT_GROUP_CONTENT]: EVALUATION_INPUT.evaluationSchema,
            [app.GridCells.GROUP_DESCRIPTION]: EVALUATIONPRECENT_INPUT
        }

        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.tabBar.BUSINESS_PARTNERS)
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, BP_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS)
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_NAME, BP_INPUT.streetName, BP_PINCODE, BP_INPUT.cityName, BP_INPUT.countryName)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, BRANCH_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
        _common.create_newRecord(cnt.uuid.SUBSIDIARIES)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.SUBSIDIARIES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BRANCH_NAME)
        _businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(BRANCH_INPUT.streetName, BP_PINCODE, BRANCH_INPUT.cityName, BRANCH_INPUT.countryName)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_BP, PRCSTRUCTURE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _businessPartnerPage.selectProcurementStructure(PRCSTRUCTUREINPUT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Contacts_BP, app.FooterTab.CONTACTS, 2);
            _common.setup_gridLayout(cnt.uuid.Contacts_BP, CONTACT_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.Contacts_BP)
        _common.create_newRecord(cnt.uuid.Contacts_BP)
        _common.selectActiveRow_inContainer(cnt.uuid.Contacts_BP)
        _common.edit_dropdownCellWithCaret(cnt.uuid.Contacts_BP, app.gridCells.CONTACT_ROLE_BP, STANDARD_INPUTS.gridList, CONTACT_INPUT.role)
        _common.selectActiveRow_inContainer(cnt.uuid.Contacts_BP)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Contacts_BP, app.gridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTACT_INPUT.firstName)
        _common.selectActiveRow_inContainer(cnt.uuid.Contacts_BP)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Contacts_BP, app.gridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTACT_INPUT.lastName)
        _common.lookUpButtonInCell(cnt.uuid.Contacts_BP, app.gridCells.TELEPHONE, btn.IconButtons.ICO_INPUT_LOOKUP, 0)
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, CONTACT_INPUT.gridCountry, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(CONTACT_INPUT.countryName, { force: true })
        _common.selectValue_fromModalPopup(STANDARD_INPUTS.gridList, CONTACT_INPUT.countryName)
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, CONTACT_INPUT.gridPhNo, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CON_TELEPHONE, { force: true })
        _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW, CONTACT_INPUT.gridExt, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true })
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.gettext_InputRowValue_InModal(commonLocators.CommonElements.ROW, CONTACT_INPUT.gridTelephone, app.InputFields.DOMAIN_TYPE_DESCRIPTION, "CO_TELEPHONE")
            cy.log("Telephone No :- " + Cypress.env("CO_TELEPHONE"))
        })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BP_Evaluation, app.FooterTab.BP_EVALUATION, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.BP_Evaluation)
        _common.create_newRecord(cnt.uuid.BP_Evaluation)
        _businessPartnerPage.enterRecord_toCreateBusinessPartnerEvaluation(BPEV_CODE, BPEV_NAME, _validate.getDate("current"), _validate.getDate("incremented", 30), EVALUATION_INPUT.clerkInput, EVALUATION_INPUT.remark, Cypress.env("PROJECT_NUMBER"), null, EVALUATION)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.changeBusinessPartnerStatus);
        _common.changeStatus_fromModal(WIZARD_INPUTS.statusApproved)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify created Business Partner record.", function () {
        const BP_GRID = this.data.BusinessPartner.BusinessPartner_Column_Headers
        const WIZARD_INPUTS = this.data.Prerequisites.Wizard
        const BRANCH_INPUT = this.data.BusinessPartner.Branches_Inputs
        const BRANCH_GRID = this.data.BusinessPartner.Branches_Column_Headers
        const PRCSTRUCTURE_INPUT = this.data.BusinessPartner.ProcurementStructure_Inputs
        const PRCSTRUCTURE_GRID = this.data.BusinessPartner.ProcurementStructure_Column_Headers
        const CONTACT_INPUT = this.data.BusinessPartner.Contacts_Input
        const CONTACT_GRID = this.data.BusinessPartner.Contacts_Column_Headers

        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, BP_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, BP_NAME)
        _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, BP_NAME)
        _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BUSINESS_PARTNERS, app.gridCells.BUSINESSPARTNER_STATUS, WIZARD_INPUTS.statusApproved)
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, BRANCH_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
        _common.search_inSubContainer(cnt.uuid.SUBSIDIARIES, BRANCH_NAME)
        _common.assert_cellData_insideActiveRow(cnt.uuid.SUBSIDIARIES, app.gridCells.CITY, BRANCH_INPUT.cityName)
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_BP, PRCSTRUCTURE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.collapseAll(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.assert_cellData(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.GridCells.DESCRIPTION_CAPS, PRCSTRUCTURE_INPUT.procurementStructure)
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Contacts_BP, app.FooterTab.CONTACTS, 2);
            _common.setup_gridLayout(cnt.uuid.Contacts_BP, CONTACT_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.Contacts_BP)
        _common.search_inSubContainer(cnt.uuid.Contacts_BP, CONTACT_INPUT.firstName)
        _common.select_rowInContainer(cnt.uuid.Contacts_BP)
        cy.wait(1000).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.Contacts_BP, app.gridCells.TELEPHONE, Cypress.env("CO_TELEPHONE"))
        })
        _common.openTab(app.tabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BP_Evaluation, app.FooterTab.BP_EVALUATION, 2);
        })
        _common.search_inSubContainer(cnt.uuid.BP_Evaluation, BPEV_NAME)
        _common.select_rowInContainer(cnt.uuid.BP_Evaluation)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BP_Evaluation, app.GridCells.DESCRIPTION, BPEV_NAME)
    })
});

after(() => {
    cy.LOGOUT();
});