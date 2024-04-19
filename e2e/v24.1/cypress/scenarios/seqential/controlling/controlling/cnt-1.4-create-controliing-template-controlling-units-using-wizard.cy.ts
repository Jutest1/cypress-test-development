import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _controllingUnit, _boqPage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "R_PR-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-GCC-1.1-" + Cypress._.random(0, 999)
const CLERK_NAME="HS";
const CU_MAIN_01 = "RNMHEADER_CU-" + Cypress._.random(0, 999)
const TEMPLET_CODE = "TEMP-" + Cypress._.random(0, 999)
const TEMPLET_DES = "TEMPLET_DES-" + Cypress._.random(0, 999)


let CREATE_UNIT_TEMPLATE

let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS;

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells;

allure.epic("CONTROLLING");
allure.feature("Controlling Unit");
allure.story("CNT 1.4 | Create Controlling Units Template from Controlling Units module using wizard 'Create Controlling Unit Template");

describe("CNT 1.4 | Create Controlling Units Template from Controlling Units module using wizard 'Create Controlling Unit Template", () => {

    before(function () {

        cy.fixture("controlling/cnt-1.4-create-controliing-template-controlling-units-using-wizard.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };

            CREATE_UNIT_TEMPLATE = {
                [commonLocators.CommonLabels.CODE]:TEMPLET_CODE,
                [commonLocators.CommonLabels.DESCRIPTION]:TEMPLET_DES,

            }
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            CONTROLLING_UNIT_MAIN_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_MAIN_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Project & Pin it", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _common.waitForLoaderToDisappear()
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.pinnedItem()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME ).pinnedItem();
    })
    it("TC - Verify Create Controlling Units", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NAME)
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordPresent(cnt.uuid.CONTROLLING_UNIT,CU_MAIN_01)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTROLLING_UNITS.QUANTITY[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    });
    it("TC - Create controlling unit from wizard 'Create Controlling Unit Template ", function () {
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
        });
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
         _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTROLLING_UNIT_TEMPATE);
         _controllingUnit.generate_create_controllingUnitFromTemplate_fromWizard(CREATE_UNIT_TEMPLATE)
    });
    it("TC - Verify Create Controlling Unit Template description", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNIT_TEMPATE);
        _common.waitForLoaderToDisappear()
         _common.openTab(app.TabBar.CONTROLLING_UNIT_TEMPLATE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLING_UNIT_TEMPLATE)
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
        });
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,TEMPLET_DES)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,app.GridCells.DESCRIPTION_INFO,TEMPLET_DES)
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT_TEMPLATES) 
    });
    it("TC - Verify Create Controlling Unit description", function () {
        _common.openTab(app.TabBar.CONTROLLING_UNIT_TEMPLATE).then(() => {
       });
       _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,PRJ_NAME)
       _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,app.GridCells.DESCRIPTION_INFO,PRJ_NAME) 
    });


});