import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_DESCRIPTION = "Paylons" + Cypress._.random(0, 999);

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_CHARACTERISTICS;

let CONTAINER_COLUMNS_PLANT;

let PLANT_PARAMETERS;
let PLANT_CHARACTERISTICS_PARAMETERS;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.19 | Verify Adding characteristic in plant master module");

describe("LRM- 1.19 | Verify Adding characteristic in plant master module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.19-verify-adding-characteristic-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: PLANT_DESCRIPTION,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK_RESPONSIBLE,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.PLANT_GROUP_FK]: CONTAINERS_PLANT.PLANT_GROUP
            }
            CONTAINERS_PLANT_CHARACTERISTICS = this.data.CONTAINERS.PLANT_CHARACTERISTICS;
            PLANT_CHARACTERISTICS_PARAMETERS = {
                [app.GridCells.CHARACTERISTIC_FK]: CONTAINERS_PLANT_CHARACTERISTICS.CODE,
                [app.GridCells.VALUE_TEXT]: CONTAINERS_PLANT_CHARACTERISTICS.VALUE,
            }
            
            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            cy.wait(1000)// required wait
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
        _logesticPage.enterRecord_toCreatePlant(cnt.uuid.PLANT,PLANT_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add characteristics Record", function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_CHARACTERISTICS, app.FooterTab.CHARATERISTICS,2)
        });
        _common.maximizeContainer(cnt.uuid.PLANT_CHARACTERISTICS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_CHARACTERISTICS,2)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlantCharateristics(cnt.uuid.PLANT_CHARACTERISTICS,PLANT_CHARACTERISTICS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PLANT_CHARACTERISTICS)
    })
});
