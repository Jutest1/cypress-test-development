import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage, _wipPage, _package, _billPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";
import cypress from "cypress";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BILL_DESC = 'BILL' + Cypress._.random(0, 999);
const BILL_NO_1 = 'INVOICE-1' + Cypress._.random(0, 999);
const BILL_NO_2 = "INVOICE-2" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const BILL_DESC_1 = "NEW_BILL_NO" + Cypress._.random(0, 999);


let CREATEPROJECT_PARAMETERS: DataCells;
let BILL_PARAMETER: DataCells;

let BILL_PARAMETER1: DataCells;
let CONTAINER_BILL
let CONTAINER_COLUMNS_BILLS
let CONTAINERS_COMPANIES




ALLURE.epic("SALES");
ALLURE.feature("Sales-BID");
ALLURE.story("SAM- 1.34 | Consecutive bill number in bill module");

describe("SAM- 1.34 | Consecutive bill number in bill module", () => {

    before(function () {
        cy.fixture("sam/sam-1.34-consecutive-bill-number-in-bill-module.json")
            .then((data) => {
                this.data = data;
                CREATEPROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                };
                CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILLS;

                CONTAINER_BILL = this.data.CONTAINERS.BILL
                BILL_PARAMETER = {
                    [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
                    [commonLocators.CommonKeys.BILL_NO]:BILL_NO_2,
                    [commonLocators.CommonLabels.BUSINESS_PARTNER]:"Adolf Koch",
                    [commonLocators.CommonKeys.CUSTOMER]:"Adolf Koch",
                    [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC_1,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                }
                BILL_PARAMETER1 = {
                    [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
                    [commonLocators.CommonKeys.BILL_NO]:BILL_NO_1,
                    [commonLocators.CommonLabels.BUSINESS_PARTNER]:"Adolf Koch",
                    [commonLocators.CommonKeys.CUSTOMER]:"Adolf Koch",
                    [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
                    [commonLocators.CommonLabels.CLERK]: CLERK_NAME
                }
                CONTAINERS_COMPANIES = this.data.CONTAINERS.COMPANIES

            }).then(() => {
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });

                _common.create_newRecord(cnt.uuid.PROJECTS);
                _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);
                cy.SAVE()
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
                _common.waitForLoaderToDisappear()
            })
    })

    after(() => {
        cy.LOGOUT();
    })

    it('TC - Set number range under customizing', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);

        _common.openTab(app.TabBar.NUMBER_SERIES).then(() => {
            _common.setDefaultView(app.TabBar.NUMBER_SERIES)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.NUMBER_RANGES, app.FooterTab.NUMBERRANGE, 1);
        });
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.NUMBER_SERIES).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.clear_subContainerFilter(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);
        _common.select_rowHasValue(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);
        _common.minimizeContainer(cnt.uuid.COMPANIES)

        _common.openTab(app.TabBar.NUMBER_SERIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.NUMBER_RANGES, app.FooterTab.NUMBERRANGE, 0);
        });
        _common.maximizeContainer(cnt.uuid.NUMBER_RANGES)
        _common.search_dataInNumberRangeContainer(cnt.uuid.NUMBER_RANGES, commonLocators.CommonKeys.CONSECUTIVE_BILL_NO);
        _common.select_dataFromSubContainer(cnt.uuid.NUMBER_RANGES, commonLocators.CommonKeys.CONSECUTIVE_BILL_NO);

        _common.waitForLoaderToDisappear()
        _common.select_numberRangeSetting();
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it('TC - Create new bill record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
            _common.clear_subContainerFilter(cnt.uuid.BILLS)
            _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)

        });
        _common.create_newRecord(cnt.uuid.BILLS);
        _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONSECUTIVE_BILL_NUMBER);
        _modalView.acceptButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BILLS, app.GridCells.CONSECUTIVE_BILL_NO, "CONSECUTIVE_BILL_NO_1")
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONSECUTIVE_BILL_NUMBER);
        _validate.validate_Text_message_In_PopUp("The selected bill has already a Consecutive Bill No!")
        _modalView.acceptButton(btn.ButtonText.OK)
    });

    it('TC - Create second bill record', function () {
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
        });
        _common.create_newRecord(cnt.uuid.BILLS);
        _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONSECUTIVE_BILL_NUMBER);
        _modalView.acceptButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BILLS, app.GridCells.CONSECUTIVE_BILL_NO, "CONSECUTIVE_BILL_NO_2")
        _common.waitForLoaderToDisappear()
       cy.SAVE()
       _common.assert_forNumericValues_notEqualCondition(cnt.uuid.BILLS, app.GridCells.CONSECUTIVE_BILL_NO,Cypress.env("CONSECUTIVE_BILL_NO_1"))
    });



})