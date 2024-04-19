import { _common, _controllingUnit, _package, _sidebar, _mainView, _validate, _modalView, _projectPage, _estimatePage, _boqPage } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells;
let CONTAINERS_BUSINESS_PARTNERS
let CONTAINER_COLUMNS_BUSINESS_PARTNERS
let CONTAINER_COLUMNS_CUSTOMER;
let CUSTOMER_NO;
let CONTAINER_COLUMNS_PROJECTS


ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story('MD- 30326 |  Verify Business partner customer no in the project module after adding Business partner to it');

describe('MD- 30326 | Verify Business partner customer no in the project module after adding Business partner to it', () => {

	before(function () {
		cy.fixture('customer-defects/md-30326-verify-business-partner-customer-no-in-the-project-module-after-adding-business-partner-to-it.json').then((data) => {
			this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            CONTAINERS_BUSINESS_PARTNERS= this.data.CONTAINERS.BUSINESS_PARTNERS
            CONTAINER_COLUMNS_BUSINESS_PARTNERS = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNERS
            CONTAINER_COLUMNS_CUSTOMER=this.data.CONTAINER_COLUMNS.CUSTOMER
            CONTAINER_COLUMNS_PROJECTS=this.data.CONTAINER_COLUMNS.PROJECTS

            PROJECTS_PARAMETERS={
                    [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });

    it("TC - Check custmer no of Business partner", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);		
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNERS)
          });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER) 
        _common.select_rowHasValue(cnt.uuid.BUSINESS_PARTNERS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CUSTOMER, app.FooterTab.CUSTOMER, 0);
        _common.setup_gridLayout(cnt.uuid.CUSTOMER, CONTAINER_COLUMNS_CUSTOMER)
        _common.select_rowHasValue(cnt.uuid.CUSTOMER,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CUSTOMER, app.GridCells.CODE).then(($CUSTMER_ID) => {
            Cypress.env("CUSTMER_ID",($CUSTMER_ID.text()))  
            CUSTOMER_NO=Cypress.env("CUSTMER_ID")
        })
    })
    it("TC - Create new Project record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);		
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.setDefaultView(app.TabBar.PROJECT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROJECTS,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PROJECTS,CONTAINERS_BUSINESS_PARTNERS.BUSINESS_PARTNER)
    })
    it("TC - Verify Business partner custmer no in Project", function () {         
       _common.waitForLoaderToDisappear()
       _common.maximizeContainer(cnt.uuid.PROJECTS);
       _common.assert_cellData(cnt.uuid.PROJECTS,app.GridCells.CUSTOMER_FK,CUSTOMER_NO)
    })
})
after(() => {
    cy.LOGOUT();
});