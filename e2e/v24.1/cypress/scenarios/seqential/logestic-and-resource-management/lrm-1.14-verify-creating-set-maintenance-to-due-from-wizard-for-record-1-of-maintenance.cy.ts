
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_GROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "PLANTGROUPDESC" + Cypress._.random(0, 999);
const PLANT_DESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);

let CONTAINERS_PLANT;
let CONTAINERS_PLANT_GROUP;
let CONTAINERS_PLANT_COMPONENT;

let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_PLANT_GROUP;
let CONTAINER_COLUMNS_PLANT_COMPONENT;
let CONTAINER_COLUMNS_MAINTENANCE;

let PLANT_PARAMETER;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.14 | Verify Creating Set Maintenance To Due From Wizard For Record 1 Of Maintenance");

describe("LRM- 1.14 | Verify Creating Set Maintenance To Due From Wizard For Record 1 Of Maintenance", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.14-verify-creating-set-maintenance-to-due-from-wizard-for-record-1-of-maintenance.json").then((data) => {
            this.data = data;
            
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonKeys.CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonLabels.STRUCTURE]: CONTAINERS_PLANT.STRUCTURE,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }
            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINERS_PLANT_COMPONENT = this.data.CONTAINERS.PLANT_COMPONENT;

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;
            CONTAINER_COLUMNS_PLANT_COMPONENT = this.data.CONTAINER_COLUMNS.PLANT_COMPONENT;
            CONTAINER_COLUMNS_MAINTENANCE = this.data.CONTAINER_COLUMNS.MAINTENANCE;

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
            cy.SAVE();
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
        cy.wait(1000) //required wait to select container data
        _common.select_allContainerData(cnt.uuid.PLANT_GROUP)
        _common.clickOn_toolbarButton(cnt.uuid.PLANT_GROUP,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to open wizard
    })

    it("TC - Verify Create Plant From Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to enable cells
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANT_PARAMETER)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Add Component And Generate Maintenance Records', function () {
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT, CONTAINER_COLUMNS_PLANT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to read data from cells
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE)
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_COMPONENT, app.FooterTab.COMPONENTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_COMPONENT, CONTAINER_COLUMNS_PLANT_COMPONENT)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_COMPONENT)
            cy.REFRESH_CONTAINER()
        });
        _common.create_newRecord(cnt.uuid.PLANT_COMPONENT)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to read data from cells
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_COMPONENT,app.GridCells.MAINTENANCE_SCHEMA_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PLANT_COMPONENT.MAINTENANCE_SCHEMA)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PLANT_COMPONENT,app.GridCells.PLANT_COMPONENT_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PLANT_COMPONENT.PLANT_COMPONENT_TYPE)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_COMPONENT, app.GridCells.VALID_FROM, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_COMPONENT.VALID_FROM)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_COMPONENT, app.GridCells.VALID_TO, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_COMPONENT.VALID_TO)   
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PLANT_COMPONENT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_MAINTENANCE_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.START, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(CONTAINERS_PLANT_COMPONENT.VALID_TO)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000)//required wait to become button active
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE, 3)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
            _common.setup_gridLayout(cnt.uuid.MAINTENANCE, CONTAINER_COLUMNS_MAINTENANCE)
        });
        _common.search_inSubContainer(cnt.uuid.MAINTENANCE," ")
        cy.wait(1000) //required wait to raed data from cells
        _common.getText_fromCell(cnt.uuid.MAINTENANCE, app.GridCells.CODE).then(($grandTotal) => {
            Cypress.env("MAINTENANCE_CODE", $grandTotal.text())
        })
    })
       
    it('TC - Verify Change Maintenance Record Status Is Due', function () {
        _common.openTab(app.TabBar.MAINTENANCE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MAINTENANCE, app.FooterTab.MAINTENANCE, 3)
            _common.clear_subContainerFilter(cnt.uuid.MAINTENANCE)
        });
        _common.search_inSubContainer(cnt.uuid.MAINTENANCE,Cypress.env("MAINTENANCE_CODE"))
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_MAINTENANCE_STATUS)
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IS_DUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       _common.assert_cellData_insideActiveRow(cnt.uuid.MAINTENANCE, app.GridCells.MAINTENANCE_STATUS_FK,commonLocators.CommonKeys.IS_DUE)
    })

});
