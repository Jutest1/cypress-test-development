import { sidebar, commonLocators, app, cnt } from "cypress/locators";
import { _common, _businessPartnerPage, _procurementPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BP_NAME = 'BP_' + Cypress._.random(0, 999);
const BP_CODE = 'CODE' + Cypress._.random(0, 999);

let CONTAINERS_BUSINESS_PARTNER, CONTAINERS_BP_CHARACTERISTICS;

let CONTAINER_COLUMNS_BUSINESS_PARTNER, CONTAINER_COLUMNS_BP_CHARACTERISTICS;

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story("MD- 28472 | PRIO A Business Partner - Characteristics should be displayed automatically in the Business partner after clicking on new record");

describe("MD- 28472 | PRIO A Business Partner - Characteristics should be displayed automatically in the Business partner after clicking on new record", () => {

    before(function () {
        cy.fixture("customer-defects/md-28472-business-partner-characteristics-should-be-displayed-automatically-in-bp-after-new-record.json").then((data) => {
            this.data = data
            CONTAINERS_BUSINESS_PARTNER = this.data.CONTAINERS.BUSINESS_PARTNER;
            CONTAINER_COLUMNS_BUSINESS_PARTNER = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
            CONTAINERS_BP_CHARACTERISTICS = this.data.CONTAINERS.BP_CHARACTERISTICS;
            CONTAINER_COLUMNS_BP_CHARACTERISTICS = this.data.CONTAINER_COLUMNS.BP_CHARACTERISTICS
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create a business partner record.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BUSINESS_PARTNER)
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS)
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_NAME, CONTAINERS_BUSINESS_PARTNER.STREET_NAME, CONTAINERS_BUSINESS_PARTNER.ZIP_CODE, CONTAINERS_BUSINESS_PARTNER.CITY_NAME, CONTAINERS_BUSINESS_PARTNER.COUNTRY_NAME);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Assert characteristics for business partner created before save", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BP_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 1)
            _common.setup_gridLayout(cnt.uuid.BP_CHARACTERISTICS, CONTAINER_COLUMNS_BP_CHARACTERISTICS)
        })
        _common.search_inSubContainer(cnt.uuid.BP_CHARACTERISTICS, CONTAINERS_BP_CHARACTERISTICS.CODE)
        _common.select_rowHasValue(cnt.uuid.BP_CHARACTERISTICS, CONTAINERS_BP_CHARACTERISTICS.CODE)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.BP_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, "FREQUENZ")
    })

    it("TC - Assert characteristics for business partner created after save", function () {
        _common.select_activeRowInContainer(cnt.uuid.BUSINESS_PARTNERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _procurementPage.select_flexValue(cnt.uuid.BP_CHARACTERISTICS, CONTAINERS_BP_CHARACTERISTICS.CHARACTER_GROUP)
        _common.waitForLoaderToDisappear()
        _procurementPage.select_flexValue(cnt.uuid.BP_CHARACTERISTICS, CONTAINERS_BP_CHARACTERISTICS.CHARACTER_GROUP)
        _common.clear_subContainerFilter(cnt.uuid.BP_CHARACTERISTICS)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BP_CHARACTERISTICS, CONTAINERS_BP_CHARACTERISTICS.CODE)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.BP_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, "FREQUENZ")
    })

});