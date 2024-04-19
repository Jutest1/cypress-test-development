import { tile, sidebar, commonLocators, app, cnt } from "cypress/locators";
import { _common, _businessPartnerPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BP_NAME = '79_BP_' + Cypress._.random(0, 999);
const BP_NAME1 = 'Test_BP_' + Cypress._.random(0, 999);
const BP_CODE = 'BP-' + Cypress._.random(0, 999);
const BP_CODE2 = 'BP-' + Cypress._.random(0, 999);

let CONTAINERS_BUSINESSPARTNER;
let CONTAINER_COLUMNS_BUSINESSPARTNER;

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story("MD 36916 - Error in display (sorting by alphabet).");

describe("MD 36916 - Error in display (sorting by alphabet).", () => {

    before(function () {

        cy.fixture("customer-defects/md-36916-error-in-display-sorting-by-alphabet.json").then((data) => {
            this.data = data
            CONTAINERS_BUSINESSPARTNER = this.data.CONTAINERS.BUSINESSPARTNER;
            CONTAINER_COLUMNS_BUSINESSPARTNER = this.data.CONTAINER_COLUMNS.BUSINESSPARTNER
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BUSINESS_PARTNER)
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create a Business Partner record.", function () {
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESSPARTNER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS,)
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_NAME, CONTAINERS_BUSINESSPARTNER.STREET_NAME, CONTAINERS_BUSINESSPARTNER.ZIP_CODE, CONTAINERS_BUSINESSPARTNER.CITY_NAME, CONTAINERS_BUSINESSPARTNER.COUNTRY_NAME);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS,)
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE2, BP_NAME1, CONTAINERS_BUSINESSPARTNER.STREET_NAME, CONTAINERS_BUSINESSPARTNER.ZIP_CODE, CONTAINERS_BUSINESSPARTNER.CITY_NAME, CONTAINERS_BUSINESSPARTNER.COUNTRY_NAME);
        cy.SAVE()
    })

    it("TC - Verify created Business Partner record.", function () {
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESSPARTNER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, BP_NAME)
        _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, BP_NAME)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, '79')
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, BP_NAME1)
        _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, BP_NAME1)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, 'Test')
    })

});

