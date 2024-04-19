import { _common, _estimatePage, _mainView, _modalView, _package, _rfqPage, _validate } from "cypress/pages";

import Buttons from "cypress/locators/buttons";
import { tile, app, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const RFQDesc = "RFQ_Desc" + Cypress._.random(0, 999);

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.80 | Create Quotes by using wizard from a RFQ")

describe('PCM- 2.80 | Create Quotes by using wizard from a RFQ', () => {

    beforeEach(function () {
        cy.fixture("pcm/pcm-2.80-create-quotes-by-using-wizard-from-a-RFQ.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));

        cy.fixture("pcm/pcm-2.80-create-quotes-by-using-wizard-from-a-RFQ.json")
          .then((data) => {
            this.data = data
            const standerdInputs = this.data.Prerequisites.SidebarInputs
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
          })
    });

    after(() => {
        cy.LOGOUT();
    });


    it('TC - Create RFQ', function () {
        const SidebarInputs = this.data.Prerequisites.SidebarInputs;
        const requireColumns = this.data.CreateRequestForQuote.RfqColoumn_Header;
        const CreateQuoteInputs = this.data.CreateRequestForQuote.CreateQuoteInputs;

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(SidebarInputs.quickStart1, SidebarInputs.ModuleNameRfQ);
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Request_for_Quote, app.FooterTab.RFQ, 1);
            _common.setup_gridLayout(cnt.uuid.Request_for_Quote, requireColumns)
        });
        cy.REFRESH_SELECTED_ENTITIES()
        _common.clear_subContainerFilter(cnt.uuid.Request_for_Quote)
        _common.create_newRecord(cnt.uuid.Request_for_Quote)
        _common.enterRecord_inNewRow(cnt.uuid.Request_for_Quote, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQDesc, null, null);
        _common.enterRecord_inNewRow(cnt.uuid.Request_for_Quote, app.gridCells.REQUISITION_OWNER, app.InputFields.INPUT_GROUP_CONTENT, CreateQuoteInputs.Requisition_Owner, null, null);
        _mainView.select_popupItem('grid', "HS");
        _common.enterRecord_inNewRow(cnt.uuid.Request_for_Quote, app.gridCells.REQUESTED, app.InputFields.INPUT_GROUP_CONTENT, CreateQuoteInputs.Requested, null, null);
        cy.SAVE()
    });

    it('TC - Verify Add Bidders ', function () {
        const SidebarInputs = this.data.Prerequisites.SidebarInputs;
        const Biddercoloumninput=this.data.BidderInput.Biddercoloumninput
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, Biddercoloumninput)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_containerCell(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, SidebarInputs.BP)
        cy.wait(2000)
        _mainView.select_popupItem("grid", SidebarInputs.BP)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, SidebarInputs.BP)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_containerCell(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, SidebarInputs.BP2)
        cy.wait(2000)
        _mainView.select_popupItem("grid", SidebarInputs.BP2)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, SidebarInputs.BP2)
    })

    it('TC - Change RFQ status', function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs
        const CreateQuoteInputs = this.data.CreateRequestForQuote.CreateQuoteInputs;
        _common.openSidebarOption(standardInputs.Wizard).search_fromSidebar(standardInputs.wizard, standardInputs.Change_RfQ_Status);
        _common.changeStatus_fromModal(CreateQuoteInputs.Status);
        cy.wait(3000);
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.Request_for_Quote, app.gridCells.RFQ_STATUS, CreateQuoteInputs.Status)
    });

    it("TC - Create Quote for one Bidder from RfQ", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs
        const coloumnRequisitionInputs=this.data.CreateRequisitionInputs.coloumnRequisitionInputs
        _common.openSidebarOption(standardInputs.Wizard).search_fromSidebar(standardInputs.wizard, standardInputs.Create_Quote);
        cy.wait(1000);
        _validate.validate_Text_In_Modal(app.GridCells.BP_NAME, standardInputs.BP)
        _validate.validate_Text_message_In_PopUp(standardInputs.BP2)
        _rfqPage.fromWizard_CreateQuote([standardInputs.BP], [standardInputs.check])
        _validate.validate_Text_message_In_PopUp("Create quote successfully!")
        _modalView.findModal().acceptButton(Buttons.buttonText.GoToQuote);
        cy.wait(3000);
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quotes, app.FooterTab.QUOTES, 1);
            _common.setup_gridLayout(cnt.uuid.Quotes, coloumnRequisitionInputs)
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.Quotes, app.GridCells.BUSINESS_PARTNER_FK, standardInputs.BP)
    });

    it('TC - Create Quote From Find Buisness partner', function () {
        const SidebarInputs = this.data.Prerequisites.SidebarInputs;
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(SidebarInputs.quickStart1, SidebarInputs.ModuleNameRfQ);
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Request_for_Quote, app.FooterTab.RFQ, 1);
        });
        _common.openSidebarOption(SidebarInputs.Wizard).search_fromSidebar(SidebarInputs.wizard, SidebarInputs.Create_Quote);
        cy.wait(3000);
        _rfqPage.assign_businessPartnerToQuote_fromWizard(SidebarInputs.BP2)
        _validate.validate_Text_message_In_PopUp("Create quote successfully!")
        _modalView.findModal().acceptButton(Buttons.buttonText.GoToQuote);
        cy.wait(3000);
        cy.SAVE();
        _common.openTab(app.tabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quotes, app.FooterTab.QUOTES, 1);
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.Quotes, app.GridCells.BUSINESS_PARTNER_FK, SidebarInputs.BP2)
    });
})