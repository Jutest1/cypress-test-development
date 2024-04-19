import { app, cnt, commonLocators, sidebar } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ROLE_NAME = "Admin-" + Cypress._.random(0, 99);
const ROLE_DESCRIPTION = "Admin_DESC" + Cypress._.random(0, 99);

let CONTAINER_COLUMNS_ROLES, CONTAINER_COLOUMN_ROLE_TO_ROLE;

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story("MD- 34181 | Role: Automatic entry when creating a new role");

describe("MD- 34181 | Role: Automatic entry when creating a new role", () => {

    before(function () {
        cy.fixture("customer-defects/md-34181-role-automatic-entry-when-creating-a-new-role.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_ROLES = this.data.CONTAINER_COLUMNS.ROLES
            CONTAINER_COLOUMN_ROLE_TO_ROLE = this.data.CONTAINER_COLUMNS.ROLE_TO_ROLE

        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Navigate to roles module and create a record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.ROLES)
        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.setDefaultView(app.TabBar.ROLES)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ROLE, app.FooterTab.ROLES, 0)
            _common.setup_gridLayout(cnt.uuid.ROLE, CONTAINER_COLUMNS_ROLES)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.clear_subContainerFilter(cnt.uuid.ROLE)
        _common.create_newRecord(cnt.uuid.ROLE)
        _common.enterRecord_inNewRow(cnt.uuid.ROLE, app.GridCells.NAME, app.InputFields.DOMAIN_TYPE_COMMENT, ROLE_NAME)
        _common.enterRecord_inNewRow(cnt.uuid.ROLE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_COMMENT, ROLE_DESCRIPTION)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create record in role-to-role container", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ROLES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLE_TO_ROLE, app.FooterTab.ROLES,1)
            _common.setup_gridLayout(cnt.uuid.ROLE_TO_ROLE, CONTAINER_COLOUMN_ROLE_TO_ROLE)
        })
        _common.clear_subContainerFilter(cnt.uuid.ROLE_TO_ROLE)
       _common.create_newRecord(cnt.uuid.ROLE_TO_ROLE)
       _common.edit_dropdownCellWithInput(cnt.uuid.ROLE_TO_ROLE, app.GridCells.ACCESS_ROLE_FK_2, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,ROLE_NAME)
       cy.SAVE()
    })

});

