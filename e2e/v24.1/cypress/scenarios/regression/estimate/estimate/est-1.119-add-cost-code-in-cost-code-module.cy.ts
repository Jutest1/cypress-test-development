import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _bidPage, _boqPage, _common, _estimatePage, _mainView, _modalView, _validate } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const COSTCODE_CODE = "1L-" + Cypress._.random(0, 9999);
const COSTCODE_DESC = "CC-LAB-" + Cypress._.random(0, 9999);
let CONTAINERS_COST_CODES,CONTAINER_COLUMNS_COST_CODES
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.119 | Add cost code in cost code module.");

describe("EST- 1.119 | Add cost code in cost code module.", () => {

    beforeEach(function () {
        cy.fixture(
            "estimate/est-1.119-add-cost-code-in-cost-code-module.json"
        ).then((data) => {
            this.data = data;
        });
    });

    before(function () {

        cy.fixture("estimate/est-1.119-add-cost-code-in-cost-code-module.json").then((data) => {
            this.data = data;
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            cy.preLoading(Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName"));
            /* Open desktop should be called in before block */
          
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
            _common.waitForLoaderToDisappear()
        });
    });

    it('TC - Create a Cost code in Cost Code Module', function () {
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.setDefaultView(app.TabBar.COST_CODES,commonLocators.CommonKeys.DEFAULT)
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.select_allContainerData(cnt.uuid.COST_CODES)
        _common.clickOn_toolbarButton(cnt.uuid.COST_CODES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        cy.wait(1000)
        _common.create_newRecord(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, COSTCODE_CODE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, COSTCODE_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.COST_CODES, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CURRENCY)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.MARKET_RATE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.DAYWORK_RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.DAY_RATE)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        _common.waitForLoaderToDisappear()

        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_BUDGET, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_RATE,commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_LABOUR_SMALL,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.wait(1000)/*The wait is mandatory here, as save takes time.*/
        _common.select_rowHasValue(cnt.uuid.COST_CODES, COSTCODE_DESC)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.RATE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CCMarketrate", $ele1.text().replace(",", ""))
        })
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.DAYWORK_RATE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CCDayrate", $ele1.text().replace(",", ""))
        })
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CCCO2value", $ele1.text().replace(",", ""))
        })
    })

    it('TC - Verify created Cost code in Cost Code Module', function () {
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, COSTCODE_DESC)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES, COSTCODE_DESC)
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.COST_CODES, app.GridCells.CODE, COSTCODE_CODE)
            _common.assert_cellData_insideActiveRow(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, COSTCODE_DESC)
            _common.assert_cellData_insideActiveRow(cnt.uuid.COST_CODES, app.GridCells.CURRENCY_FK, CONTAINERS_COST_CODES.CURRENCY)
            _common.assert_forNumericValues(cnt.uuid.COST_CODES, app.GridCells.RATE, Cypress.env("CCMarketrate"))
            _common.assert_forNumericValues(cnt.uuid.COST_CODES, app.GridCells.DAYWORK_RATE, Cypress.env("CCDayrate"))
            _common.assert_forNumericValues(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, Cypress.env("CCCO2value"))
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_BUDGET,commonLocators.CommonKeys.CHECK)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_RATE,commonLocators.CommonKeys.CHECK)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.IS_LABOUR_SMALL,commonLocators.CommonKeys.CHECK)
            _common.minimizeContainer(cnt.uuid.COST_CODES)
        })
    })

    after(() => {
        cy.LOGOUT();
    });

});