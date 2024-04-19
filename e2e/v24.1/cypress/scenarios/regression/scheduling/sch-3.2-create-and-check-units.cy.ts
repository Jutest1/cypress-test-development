import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import Sidebar from 'cypress/locators/sidebar';

const ALLURE = Cypress.Allure.reporter.getInterface();

const UNIT_DESC = "UNIT-DESC-" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT = "M" + Cypress._.random(0, 99);


ALLURE.epic("SCHEDULING");
ALLURE.feature("Unit");
ALLURE.story("SCH- 3.2 | Create and check Units");
describe("SCH- 3.2 | Create and check Units", () => {

    before(function () {
        cy.fixture("scheduling/sch-3.2-create-and-check-units.json").then((data) => {
            this.data = data
    });
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
        
    it("TC - Create Unit", function () {
        const UNITCOLOUMN = this.data.CONTAINER_COLUMNS.UNIT
        const UNITPARAMETER = this.data.CONTAINERS.UNIT

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.UNIT);
        _common.openTab(app.TabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, UNITCOLOUMN)
        });
        _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UNIT_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_OF_MEASUREMENT)
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,UNIT_DESC)  
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UOM_TYPE_FK,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.LIST,UNITPARAMETER.TYPE)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify the created unit", function () { 
        _common.maximizeContainer(cnt.uuid.UNITSOFMEASUREMENT)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.UNITSOFMEASUREMENT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UNIT_INFO,UNIT_OF_MEASUREMENT)   
    });
    after(() => {
        cy.LOGOUT();
        })
});