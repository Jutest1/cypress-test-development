
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _businessPartnerPage } from "cypress/pages";
// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_DESCRIPTION = "Paylons" + Cypress._.random(0, 999);
let CONTAINERS_PLANT;
let CONTAINERS_PLANT_BUSINESS_PARTNERS;
let CONTAINER_COLUMNS_PLANT;
let PLANT_PARAMETERS;
let PLANT_BUSINESS_PARTNERS_PARAMETERS;
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.21 | Verify creating new record of business partner in plant master module");
describe("LRM- 1.21 | Verify creating new record of business partner in plant master module", () => {
    before(function () {
        cy.fixture("LRM/lrm-1.21-verify-creating-new-record-of-business-partner-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: PLANT_DESCRIPTION,
                [app.GridCells.PLANT_GROUP_FK]: CONTAINERS_PLANT.PLANT_GROUP,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK_RESPONSIBLE,
            }
            CONTAINERS_PLANT_BUSINESS_PARTNERS = this.data.CONTAINERS.PLANT_BUSINESS_PARTNERS;
            PLANT_BUSINESS_PARTNERS_PARAMETERS = {
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_PLANT_BUSINESS_PARTNERS.BUSINESS_PARTNER, 
            }
            
            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            cy.wait(1000)// required wait to open plant master
        });
    })
    after(() => {
        cy.LOGOUT();
    });
    it("TC - Create New Plant", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS)
            _common.setup_gridLayout(cnt.uuid.PLANT,CONTAINER_COLUMNS_PLANT)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlant(cnt.uuid.PLANT,PLANT_PARAMETERS)
        cy.wait(1000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Add Business Partners", function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT,PLANT_DESCRIPTION)
        _common.maximizeContainer(cnt.uuid.PLANT_BUSINESS_PARTNERS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_BUSINESS_PARTNERS)
        _common.select_activeRowInContainer(cnt.uuid.PLANT_BUSINESS_PARTNERS)
        _logesticPage.enterRecord_toCreateBusinessPartner(cnt.uuid.PLANT_BUSINESS_PARTNERS,PLANT_BUSINESS_PARTNERS_PARAMETERS)
        cy.wait(1000)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.PLANT_BUSINESS_PARTNERS)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait to save data
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PLANT_BUSINESS_PARTNERS)
        cy.wait(1000)
        
    })
});
