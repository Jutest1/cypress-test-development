import { app, sidebar, commonLocators, cnt } from "cypress/locators";
import { _common, _timekeepingPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const TK_GROUP_CODE = 'TKC-' + Cypress._.random(0, 999);
const TK_GROUP_DESC = 'TKD-' + Cypress._.random(0, 999);
const PAY_GROUP_CODE = 'PAYC-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC = 'PAYD-' + Cypress._.random(0, 999);
const SHIFT_MOD_DESC = 'SHIFT-DESC-' + Cypress._.random(0, 999);
const WTM_DESC = 'WTM-DESC-' + Cypress._.random(0, 999);
const EMPLOYEE_CODE = 'EMPC-' + Cypress._.random(0, 999);
const EMPLOYEE_DESC = 'EMPD-' + Cypress._.random(0, 999);
const TK_GROUP_CODE_1 = 'TKC-' + Cypress._.random(0, 999);
const TK_GROUP_DESC_1 = 'TKD-' + Cypress._.random(0, 999);
const EMPLOYEE_CODE_1 = 'EMPC-1-' + Cypress._.random(0, 999);

let CONTAINERS_COMPANY, CONTAINERS_DATA_TYPES, CONTAINERS_SHIFT_MODELS, CONTAINERS_WORKING_TIME_MODELS, CONTAINERS_EMPLOYEES, CONTAINERS_EMPLOYEES_1;
let TIMEKEEPING_GROUPS_PARAMETERS: DataCells, TIMEKEEPING_GROUPS_PARAMETERS_1: DataCells, PAYMENT_GROUP_PARAMETERS: DataCells, SHIFT_MODELS_PARAMETERS: DataCells, WORKING_TIME_MODELS_PARAMETERS: DataCells, EMPLOYEES_PARAMETERS: DataCells, EMPLOYEES_PARAMETERS_1: DataCells, CREW_ASSIGNMENTS_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_TIMEKEEPING_GROUPS, CONTAINER_COLUMNS_PAYMENT_GROUPS, CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_WORKING_TIME_MODELS, CONTAINER_COLUMNS_EMPLOYEES, CONTAINER_COLUMNS_CREW_ASSIGNMENTS;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.18 | Create crew leader and crew assignment");

describe("ETK- 1.18 | Create crew leader and crew assignment", () => {
    before(function () {
        cy.fixture("time-keeping/etk-1.18-create-crew-leader-and-crew-assignment.json").then((data) => {
            this.data = data;
            CONTAINERS_COMPANY = this.data.CONTAINERS.COMPANY
            CONTAINER_COLUMNS_TIMEKEEPING_GROUPS = this.data.CONTAINER_COLUMNS.TIMEKEEPING_GROUPS
            TIMEKEEPING_GROUPS_PARAMETERS = {
                [app.GridCells.CODE]: TK_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TK_GROUP_DESC
            }
            CONTAINER_COLUMNS_TIMEKEEPING_GROUPS = this.data.CONTAINER_COLUMNS.TIMEKEEPING_GROUPS
            TIMEKEEPING_GROUPS_PARAMETERS_1 = {
                [app.GridCells.CODE]: TK_GROUP_CODE_1,
                [app.GridCells.DESCRIPTION_INFO]: TK_GROUP_DESC_1
            }
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_PAYMENT_GROUPS = this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]: PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: PAY_GROUP_DESC
            }
            CONTAINER_COLUMNS_SHIFT_MODELS = this.data.CONTAINER_COLUMNS.SHIFT_MODELS
            CONTAINERS_SHIFT_MODELS = this.data.CONTAINERS.SHIFT_MODELS
            SHIFT_MODELS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: SHIFT_MOD_DESC,
                [app.GridCells.CALENDAR_FK]: CONTAINERS_SHIFT_MODELS.CALENDAR
            }
            CONTAINER_COLUMNS_WORKING_TIME_MODELS = this.data.CONTAINER_COLUMNS.WORKING_TIME_MODELS
            CONTAINERS_WORKING_TIME_MODELS = this.data.CONTAINERS.WORKING_TIME_MODELS
            WORKING_TIME_MODELS_PARAMETERS = {
                [app.GridCells.IS_DEFAULT]: CONTAINERS_WORKING_TIME_MODELS.CHECKBOX,
                [app.GridCells.DESCRIPTION_INFO]: WTM_DESC,
                [app.GridCells.WEEK_ENDS_ON]: CONTAINERS_WORKING_TIME_MODELS.WEEK_ENDS_ON,
            }
            CONTAINER_COLUMNS_EMPLOYEES = this.data.CONTAINER_COLUMNS.EMPLOYEES
            CONTAINERS_EMPLOYEES = this.data.CONTAINERS.EMPLOYEES
            EMPLOYEES_PARAMETERS = {
                [app.GridCells.CODE]: EMPLOYEE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EMPLOYEE_DESC,
                [app.GridCells.START_DATE]: _common.getDate(CONTAINERS_EMPLOYEES.START_DATE),
                [app.GridCells.SHIFT_FK]: SHIFT_MOD_DESC,
                [app.GridCells.TIME_KEEPING_GROUP_FK]: TK_GROUP_CODE,
                [app.GridCells.PAYMENT_GROUP_FK]: PAY_GROUP_DESC,
                [app.GridCells.IS_CREW_LEADER]: CONTAINERS_EMPLOYEES.CHECKBOX
            }
            CONTAINERS_EMPLOYEES_1 = this.data.CONTAINERS.EMPLOYEES_1
            EMPLOYEES_PARAMETERS_1 = {
                [app.GridCells.CODE]: EMPLOYEE_CODE_1,
                [app.GridCells.DESCRIPTION_INFO]: EMPLOYEE_DESC,
                [app.GridCells.START_DATE]: _common.getDate(CONTAINERS_EMPLOYEES_1.START_DATE),
                [app.GridCells.SHIFT_FK]: SHIFT_MOD_DESC,
                [app.GridCells.TIME_KEEPING_GROUP_FK]: TK_GROUP_CODE_1,
                [app.GridCells.PAYMENT_GROUP_FK]: PAY_GROUP_DESC,
                [app.GridCells.IS_CREW_LEADER]: CONTAINERS_EMPLOYEES_1.CHECKBOX
            }
            CONTAINER_COLUMNS_CREW_ASSIGNMENTS = this.data.CONTAINER_COLUMNS.CREW_ASSIGNMENTS
            CREW_ASSIGNMENTS_PARAMETERS = {
                [app.GridCells.EMPLOYEE_CREW_FK]: EMPLOYEE_CODE,
            }
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Search for company and create timekeeping groups", function () {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY)
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.COMPANIES)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANY.RIB)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COMPANIES, CONTAINERS_COMPANY.RIB)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TIMEKEEPING_GROUP, app.FooterTab.TIMEKEEPING_GROUPS, 1);
            _common.setup_gridLayout(cnt.uuid.TIMEKEEPING_GROUP, CONTAINER_COLUMNS_TIMEKEEPING_GROUPS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIMEKEEPING_GROUP)
        _timekeepingPage.enterRecord_toCreateTimekeepingGroups(cnt.uuid.TIMEKEEPING_GROUP, TIMEKEEPING_GROUPS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIMEKEEPING_GROUP)
        _timekeepingPage.enterRecord_toCreateTimekeepingGroups(cnt.uuid.TIMEKEEPING_GROUP, TIMEKEEPING_GROUPS_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create payment groups list", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PAYMENT_GROUPS)
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUPS_LIST, app.FooterTab.PAYMENT_GROUPS_LIST, 0);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUPS_LIST, CONTAINER_COLUMNS_PAYMENT_GROUPS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUPS_LIST)
        _timekeepingPage.enterRecord_toPaymentGroup(cnt.uuid.PAYMENT_GROUPS_LIST, PAYMENT_GROUP_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create shift model", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.SHIFT_MODEL)
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SHIFT_MODELS, app.FooterTab.SHIFT_MODELS, 0)
            _common.setup_gridLayout(cnt.uuid.SHIFT_MODELS, CONTAINER_COLUMNS_SHIFT_MODELS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SHIFT_MODELS)
        _timekeepingPage.enterRecord_toShiftModal(cnt.uuid.SHIFT_MODELS, SHIFT_MODELS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create working time model", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WORKING_TIME_MODEL)
        _common.openTab(app.TabBar.WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME_MODELS, app.FooterTab.WORKING_TIME_MODELS, 0);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME_MODELS, CONTAINER_COLUMNS_WORKING_TIME_MODELS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODELS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModels(WORKING_TIME_MODELS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create employees", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.EMPLOYEE)
        _common.openTab(app.TabBar.EMPLOYEE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EMPLOYEES, app.FooterTab.EMPLOYEES, 0);
            _common.setup_gridLayout(cnt.uuid.EMPLOYEES, CONTAINER_COLUMNS_EMPLOYEES)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.EMPLOYEES);
        _timekeepingPage.enterRecord_toCreateEmployees(cnt.uuid.EMPLOYEES, EMPLOYEES_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.EMPLOYEES);
        _timekeepingPage.enterRecord_toCreateEmployees(cnt.uuid.EMPLOYEES, EMPLOYEES_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create crew assignment", function () {
        _common.openTab(app.TabBar.EMPLOYEE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CREW_ASSIGNMENTS, app.FooterTab.CREW_ASSIGNMENTS, 2);
            _common.setup_gridLayout(cnt.uuid.CREW_ASSIGNMENTS, CONTAINER_COLUMNS_CREW_ASSIGNMENTS)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CREW_ASSIGNMENTS);
        _timekeepingPage.enterRecord_toCreateCrewAssignment(cnt.uuid.CREW_ASSIGNMENTS, CREW_ASSIGNMENTS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
})

