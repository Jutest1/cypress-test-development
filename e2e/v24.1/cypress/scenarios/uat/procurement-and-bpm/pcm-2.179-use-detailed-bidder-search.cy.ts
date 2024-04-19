import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig, _wicpage } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators } from "cypress/locators";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const RFQ_HEADER = "RFQ_HD_" + Cypress._.random(0, 999)

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("RFQ");
allure.story("PCM - 2.179 | Use detailed Bidder Search.");

describe("PCM - 2.179 | Use detailed Bidder Search.", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.179-use-detailed-bidder-search.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("pcm/pcm-2.179-use-detailed-bidder-search.json").then((data) => {
            this.data = data
            const standerdInputs = this.data.Prerequisites.SidebarInputs
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it("TC - Create a RfQ header and use detailed bidder search wizard to add bidders.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const BUSINESSPARTNER_INPUT = this.data.BusinessPartner.BusinessPartner_Inputs
        const RFQ_GRID = this.data.RfQ.Column_Headers
        const BP_ADVANCE_SEARCH_UNCHECKPRC: DataCells = {
            [generic.locators.TYPE]: BUSINESSPARTNER_INPUT.prcstructfilter,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BUSINESSPARTNER_INPUT.uncheck,
        }
        const BP_ADVANCE_SEARCH_UNCHECKLOC: DataCells = {
            [generic.locators.TYPE]: BUSINESSPARTNER_INPUT.locationfilter,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BUSINESSPARTNER_INPUT.uncheck,
        }
        const BP_ADVANCE_SEARCH_PROCUREMENT: DataCells = {
            [generic.locators.TYPE]: BUSINESSPARTNER_INPUT.prcstructfilter,
            [commonLocators.CommonKeys.CODE]: "M",
            [app.GridCells.BP_NAME_1]: BUSINESSPARTNER_INPUT.BusinessPartner_1,
            [generic.locators.BRANCH_DESCRIPTION]: BUSINESSPARTNER_INPUT.BP1_Branch,
            [app.gridCells.FIRST_NAME]: BUSINESSPARTNER_INPUT.BP1_Contact,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BUSINESSPARTNER_INPUT.check
        }
        const BP_ADVANCE_SEARCH_LOCATION: DataCells = {
            [generic.locators.TYPE]: BUSINESSPARTNER_INPUT.locationfilter,
            [app.GridCells.BP_NAME_1]: BUSINESSPARTNER_INPUT.BusinessPartner_2,
            [generic.locators.BRANCH_DESCRIPTION]: BUSINESSPARTNER_INPUT.BP2_Branch,
            [app.gridCells.FIRST_NAME]: BUSINESSPARTNER_INPUT.BP2_Contact,
            [generic.locators.CHECKBOX_LIST_GROUP_TYPE]: BUSINESSPARTNER_INPUT.check,
            [commonLocators.CommonKeys.RADIO]: BUSINESSPARTNER_INPUT.radioregional,
            [generic.locators.REGION]: BUSINESSPARTNER_INPUT.country
        }

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart);
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.RFQ);
        cy.SAVE()
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.setDefaultView(app.tabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.Request_for_Quote, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.Request_for_Quote, RFQ_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.Request_for_Quote)
        _common.create_newRecord(cnt.uuid.Request_for_Quote, 0)
        _common.enterRecord_inNewRow(cnt.uuid.Request_for_Quote, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_HEADER)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.Request_for_Quote, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("RfQ_Code", $ele1.text())
        })
        cy.SAVE()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard);
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.enhancedBidderSearch);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKPRC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKLOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_PROCUREMENT, btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory as OK button takes time to be visible */
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.openSidebarOption(STANDARD_INPUTS.inWizard);
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.enhancedBidderSearch);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKPRC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKLOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOCATION, btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory as OK button takes time to be visible */
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
    })

    it("TC - Verify the added bidders in Bidders container.", function () {
        const RFQ_GRID = this.data.RfQ.Column_Headers
        const BIDDERS_GRID = this.data.RfQ.Bidders_Column_Headers
        const BUSINESSPARTNER_INPUT = this.data.BusinessPartner.BusinessPartner_Inputs

        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.setDefaultView(app.tabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.Request_for_Quote, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.Request_for_Quote, RFQ_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.Request_for_Quote)
        _common.search_inSubContainer(cnt.uuid.Request_for_Quote, RFQ_HEADER)
        _common.select_rowHasValue(cnt.uuid.Request_for_Quote, RFQ_HEADER)
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, BIDDERS_GRID)
            _validate.set_ColumnAtTop([BIDDERS_GRID.subsidiaryfk, BIDDERS_GRID.ContactFirstName, BIDDERS_GRID.businesspartnerfk], cnt.uuid.BIDDERS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.select_rowHasValue(cnt.uuid.BIDDERS, BUSINESSPARTNER_INPUT.BusinessPartner_1)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, BUSINESSPARTNER_INPUT.BusinessPartner_1)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.CONTACT_FIRST_NAME, BUSINESSPARTNER_INPUT.BP1_Contact)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.SUBSIDIARY_FK, BUSINESSPARTNER_INPUT.BP1_Branch)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.select_rowHasValue(cnt.uuid.BIDDERS, BUSINESSPARTNER_INPUT.BusinessPartner_2)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, BUSINESSPARTNER_INPUT.BusinessPartner_2)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.CONTACT_FIRST_NAME, BUSINESSPARTNER_INPUT.BP2_Contact)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.SUBSIDIARY_FK, BUSINESSPARTNER_INPUT.BP2_Branch)
        })
    })

    after(() => {
        cy.LOGOUT();
    })

});