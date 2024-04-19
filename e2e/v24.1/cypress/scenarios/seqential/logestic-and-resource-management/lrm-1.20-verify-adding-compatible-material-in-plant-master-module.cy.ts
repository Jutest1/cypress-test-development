import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_DESCRIPTION = "Paylons" + Cypress._.random(0, 999);

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_COMPATIBLE_MATERIALS;

let CONTAINER_COLUMNS_PLANT;

let PLANT_PARAMETERS;
let PLANT_COMPATIBLE_MATERIALS_PARAMETERS;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.20 | Verify adding compatible material in plant master module");

describe("LRM- 1.20 | Verify adding compatible material in plant master module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.20-verify-adding-compatible-material-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: PLANT_DESCRIPTION,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK_RESPONSIBLE,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.PLANT_GROUP_FK]: CONTAINERS_PLANT.PLANT_GROUP,
                [app.GridCells.UOM_FK]: CONTAINERS_PLANT.UOM,
                [app.GridCells.CLERK_OWNER_FK]: CONTAINERS_PLANT.CLERK_OWNER,
                [app.GridCells.MATCH_CODE]: CONTAINERS_PLANT.MATCH_CODE,
                [app.GridCells.SERIAL_NUMBER]: CONTAINERS_PLANT.SERIAL_NUMBER,
            }
            CONTAINERS_PLANT_COMPATIBLE_MATERIALS = this.data.CONTAINERS.PLANT_COMPATIBLE_MATERIALS;
            PLANT_COMPATIBLE_MATERIALS_PARAMETERS = {
                [app.GridCells.MATERIAL_FK]: CONTAINERS_PLANT_COMPATIBLE_MATERIALS.MATERIAL,
                [app.GridCells.COMMENT_TEXT]: CONTAINERS_PLANT_COMPATIBLE_MATERIALS.COMMENTS,
            } 
            
            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            cy.wait(1000)// required wait to open plant master module
        });
    })
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Plant Group", function () {
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
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add compatible materials Record", function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPATIBLE_MATERIALS, app.FooterTab.COMPATIBLE_MATERIALS)
        });
        _common.maximizeContainer(cnt.uuid.PLANT_COMPATIBLE_MATERIALS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_COMPATIBLE_MATERIALS)
        _logesticPage.enterRecord_toCreateCompatibleMaterials(cnt.uuid.PLANT_COMPATIBLE_MATERIALS,PLANT_COMPATIBLE_MATERIALS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PLANT_COMPATIBLE_MATERIALS)
    })
});
