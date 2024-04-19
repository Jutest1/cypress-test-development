import { tile, sidebar, commonLocators, app, cnt, btn } from "cypress/locators";
import { _common, _rfqPage, _boqPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const RFQ_DESC = 'DESC' + Cypress._.random(0, 999);

let CONTAINERS_RFQ, CONTAINERS_BIDDER;

let CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_BIDDER;

let MODAL_CREATE_QUOTE;

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story("MD- 36925 | Verify requested date in the RFQ.");

describe("MD- 36925 | Verify requested date in the RFQ.", () => {

    before(function () {

        cy.fixture("customer-defects/md-36925-verify-requested-date-in-the-rfq.json").then((data) => {
            this.data = data
            CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER;
            CONTAINER_COLUMNS_BIDDER = this.data.CONTAINER_COLUMNS.BIDDER
            MODAL_CREATE_QUOTE = this.data.MODAL.CREATE_QUOTE

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ)
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create a RFQ record.", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE,)
        _common.edit_containerCell(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add Bidder to selected RFQ", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.RFQ, 1);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BIDDER.BUSINESS_PARTNER)
        _common.select_activeRowInContainer(cnt.uuid.BIDDERS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.BIDDERS, app.GridCells.DATE_REQUESTED, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT, 5, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BIDDER.BUSINESS_PARTNER1)
        _common.select_activeRowInContainer(cnt.uuid.BIDDERS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.BIDDERS, app.GridCells.DATE_REQUESTED, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT, 5, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)))
        cy.SAVE()
    })

    it("TC - Create Quote from RFQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_quote_fromWizard([MODAL_CREATE_QUOTE.BUSINESS_PARTNER[0], MODAL_CREATE_QUOTE.BUSINESS_PARTNER[1]], [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _boqPage.getCode_fromQuoteModal("QUOTE-CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Change Quote status", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.OFFER_ISSUED);
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, CONTAINERS_RFQ.RFQ1)
    })

    it("TC - Verify requested date in RFQ", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.select_rowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DATE_REQUESTED, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
    })

    it("TC - Create a RFQ record.", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE,)
        _common.edit_containerCell(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add Bidder to selected RFQ", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.RFQ, 1);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BIDDER.BUSINESS_PARTNER)
        _common.select_activeRowInContainer(cnt.uuid.BIDDERS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.BIDDERS, app.GridCells.DATE_REQUESTED, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate(commonLocators.CommonKeys.FETCHED_DATE_DECREMENT, 5, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Change RFQ status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
    })

    it("TC - Verify requested date in RFQ", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.select_rowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DATE_REQUESTED, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
    })

});

