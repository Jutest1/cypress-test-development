import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_GROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANT_DESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_GROUP;

let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_PLANT_GROUP;

let PLANT_PARAMETER;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.7 | Verify Creating Plant From Plant Group");

describe("LRM- 1.7 | Verify Creating Plant From Plant Group", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.7-verify-creating-plant-from-plant-group.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
            }
            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            });
            cy.wait(1000)// required wait
        });
    })
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_GROUP)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_GROUP, CONTAINER_COLUMNS_PLANT_GROUP)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.select_allContainerData(cnt.uuid.PLANT_GROUP)
        _common.clickOn_toolbarButton(cnt.uuid.PLANT_GROUP,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Create Plant From Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait 
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Plant Record In Plant Master', function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.DESCRIPTION_INFO, PLANT_DESC)
    })
});
