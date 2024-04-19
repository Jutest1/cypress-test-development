import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_DESCRIPTION = "Paylons" + Cypress._.random(0, 999);

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_COMPONENT;
let CONTAINERS_COMPONENT_WARRANTIES;

let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_PLANT_COMPONENT;

let PLANT_PARAMETERS;
let PLANT_COMPONENT_PARAMETERS;
let COMPONENT_WARRANTIES_PARAMETERS;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.22 | Verify Adding components warranties in plant master module");

describe("LRM- 1.22 | Verify Adding components warranties in plant master module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.22-verify-adding-components-warranties-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: PLANT_DESCRIPTION,
                [app.GridCells.PROCUREMENT_STRUCTURE_FK]: CONTAINERS_PLANT.STRUCTURE,
                [app.GridCells.CLERK_RESPONSIBLE_FK]: CONTAINERS_PLANT.CLERK_RESPONSIBLE,
                [app.GridCells.PLANT_KIND_FK]: CONTAINERS_PLANT.PLANT_KIND,
                [app.GridCells.PLANT_GROUP_FK]: CONTAINERS_PLANT.PLANT_GROUP
            }
            CONTAINERS_PLANT_COMPONENT = this.data.CONTAINERS.PLANT_COMPONENT;
            PLANT_COMPONENT_PARAMETERS = {
                [app.GridCells.MAINTENANCE_SCHEMA_FK]: CONTAINERS_PLANT_COMPONENT.MAINTENANCE_SCHEMA,
                [app.GridCells.PLANT_COMPONENT_TYPE_FK]: CONTAINERS_PLANT_COMPONENT.PLANT_COMPONENT_TYPE,
                [app.GridCells.VALID_FROM]: CONTAINERS_PLANT_COMPONENT.VALID_FROM,
                [app.GridCells.VALID_TO]: CONTAINERS_PLANT_COMPONENT.VALID_TO,
            }
            CONTAINERS_COMPONENT_WARRANTIES = this.data.CONTAINERS.COMPONENT_WARRANTIES;
            COMPONENT_WARRANTIES_PARAMETERS = {
                [app.GridCells.WARRANTY_END]: CONTAINERS_COMPONENT_WARRANTIES.WARRANTY_END,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_COMPONENT_WARRANTIES.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_COMPONENT_WARRANTIES.UOM,
                [app.GridCells.DESCRIPTION_INFO]: CONTAINERS_COMPONENT_WARRANTIES.DESCRIPTION,
                [app.GridCells.HOURS]: CONTAINERS_COMPONENT_WARRANTIES.HOURS
            }
            
            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_PLANT_COMPONENT = this.data.CONTAINER_COLUMNS.PLANT_COMPONENT;
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            cy.wait(1000)// required wait
        });
    })
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Plant", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS)
            _common.setup_gridLayout(cnt.uuid.PLANT,CONTAINER_COLUMNS_PLANT)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _logesticPage.click_On_CloseButton(cnt.uuid.PLANT)
        _common.create_newRecord(cnt.uuid.PLANT)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlant(cnt.uuid.PLANT,PLANT_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()   
    })

    it('TC - Verify Add Component', function () {
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to read data from cell
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_COMPONENT, CONTAINER_COLUMNS_PLANT_COMPONENT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_COMPONENT)
            cy.REFRESH_CONTAINER()
        });
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_COMPONENT)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreatePlantComponent(cnt.uuid.PLANT_COMPONENT,PLANT_COMPONENT_PARAMETERS)
        _common.waitForLoaderToDisappear() 
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add components warranties Record", function () {
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT_WARRANTY, app.FooterTab.COMPONENT_WARRANTIES,2)
        });
        _common.maximizeContainer(cnt.uuid.PLANT_COMPONENT_WARRANTY)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_COMPONENT_WARRANTY,2)
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_toCreateComponentWarranties(cnt.uuid.PLANT_COMPONENT_WARRANTY,COMPONENT_WARRANTIES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PLANT_COMPONENT_WARRANTY)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_COMPONENT_WARRANTY_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.VALID)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to read data from cell
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS, 0)
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_COMPONENT,CONTAINERS_PLANT_COMPONENT.MAINTENANCE_SCHEMA)
        _common.waitForLoaderToDisappear()
        
        
    })
});
