import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';

const PRJ_NO = "PR-TK-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-TK-" + Cypress._.random(0, 999)

const SURCHANGE_RATE='SR-' + Cypress._.random(0, 999);
const BASE_RATE='BA-' + Cypress._.random(0, 999);
const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-' + Cypress._.random(0, 999);
const COMMENT_TEXT='TEXT-' + Cypress._.random(0, 9999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_PROJECT;
let CONTAINERS_PROJECT,
    CONTAINERS_PAYMENT_GROUP_RATES,
    CONTAINERS_PAYMENT_GROUP_SURCHARGE
let PAYMENT_GROUP_PARAMETERS:DataCells,
    PAYMENT_GROUP_RATE_PARAMETERS:DataCells,
    PAYMENT_GROUP_SURCHARGE_PARAMETERS:DataCells
let CONTAINER_COLUMNS_PAYMENT_GROUPS,
    CONTAINER_COLUMNS_PAYMENT_GROUP_RATES,
    CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.3 | Delete payment group");

describe("ETK- 1.3 | Delete payment group", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.3-delete-payment-group.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            },

            CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_SURCHARGE
            CONTAINERS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINERS.PAYMENT_GROUP_SURCHARGE
            PAYMENT_GROUP_SURCHARGE_PARAMETERS={
                [app.GridCells.SURCHARGE_TYPE_FK]: CONTAINERS_PAYMENT_GROUP_SURCHARGE.SURCHARGE_TYPE,
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
                [app.GridCells.RATE]:CONTAINERS_PAYMENT_GROUP_SURCHARGE.RATE
            },

            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            },
         
            CONTAINER_COLUMNS_PAYMENT_GROUP_RATES=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_RATES
            CONTAINERS_PAYMENT_GROUP_RATES=this.data.CONTAINERS.PAYMENT_GROUP_RATES
            PAYMENT_GROUP_RATE_PARAMETERS={
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
                [app.GridCells.RATE]:CONTAINERS_PAYMENT_GROUP_RATES.RATE
            }  
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    }) 

    after(() => {
        cy.LOGOUT();
    });
      
    it("TC - Create New Project & Pin it", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    })

    it("TC - Create Payment Groups List and Payment Group Rate ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PAYMENT_GROUPS)
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_2)
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUPS_LIST, app.FooterTab.PAYMENT_GROUPS_LIST, 0);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUPS_LIST, CONTAINER_COLUMNS_PAYMENT_GROUPS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUPS_LIST)
        _timekeepingPage.enterRecord_toPaymentGroup(cnt.uuid.PAYMENT_GROUPS_LIST,PAYMENT_GROUP_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_RATES, app.FooterTab.PAYMENT_GROUP_RATES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_RATES, CONTAINER_COLUMNS_PAYMENT_GROUP_RATES)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUP_RATES)
        _timekeepingPage.enterRecord_toPaymentGroupRate(cnt.uuid.PAYMENT_GROUP_RATES,PAYMENT_GROUP_RATE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_SURCHARGES, app.FooterTab.PAYMENT_GROUPS_SURCHARGES, 2);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_SURCHARGES, CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUP_SURCHARGES)
        _timekeepingPage.enterRecord_toPaymentGroupSurcharge(cnt.uuid.PAYMENT_GROUP_SURCHARGES,PAYMENT_GROUP_SURCHARGE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.PAYMENT_GROUPS_LIST,app.GridCells.DESCRIPTION_INFO,PAY_GROUP_DESC)
    })

    it("TC - Delete Payment group", function () {
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUPS_LIST, app.FooterTab.PAYMENT_GROUPS_LIST, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PAYMENT_GROUPS_LIST,PAY_GROUP_DESC)
        _common.delete_recordFromContainer(cnt.uuid.PAYMENT_GROUPS_LIST)
        _validate.verify_isRecordDeleted(cnt.uuid.PAYMENT_GROUPS_LIST,PAY_GROUP_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_RATES, app.FooterTab.PAYMENT_GROUPS_LIST, 1);
        })
        _validate.verify_isRecordDeleted(cnt.uuid.PAYMENT_GROUP_RATES,COMMENT_TEXT)
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_SURCHARGES, app.FooterTab.PAYMENT_GROUPS_LIST, 2);
        })
        _validate.verify_isRecordDeleted(cnt.uuid.PAYMENT_GROUP_SURCHARGES,COMMENT_TEXT)

    })
})
