import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _boqPage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "CNT-" + Cypress._.random(0, 999)
const PRJ_NAME = "CNT-1.3-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS";
const TEMPLET_CODE = "TEMP-" + Cypress._.random(0, 999)
const TEMPLET_DESC = "TEMPLET_DESC-" + Cypress._.random(0, 999)

const CONTROLLING_DESC = "MAIN_CU-" + Cypress._.random(0, 999)
const CONTROLLING_CODE = "MAIN_DESC-" + Cypress._.random(0, 999)

const SUB_CONTROLLING_CODE = "001-" + Cypress._.random(0, 999)
const SUB_CONTROLLING_DESC = "001CU-" + Cypress._.random(0, 999)



let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS;
let CONTAINER_COLUMNS_CONTROLLING_UNIT_TEMPLATES
let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS;

let PROJECT_PARAMETERS: DataCells, GENERATE_CONTROLLING_UNITS_PARAMETER: DataCells;

allure.epic("CONTROLLING");
allure.feature("Controlling Unit");
allure.story("CNT- 1.3 | Generate Controlling Units using wizard 'Generate Controlling Units from Template' and change the status of the Controlling Unit");

describe("CNT- 1.3 | Generate Controlling Units using wizard 'Generate Controlling Units from Template' and change the status of the Controlling Unit", () => {


    before(function () {

        cy.fixture("controlling/cnt-1.3-generate-controlling-units-using-wizard-generate-controlling-units-from-template.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            CONTAINER_COLUMNS_CONTROLLING_UNIT_TEMPLATES = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT_TEMPLATES;

            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            GENERATE_CONTROLLING_UNITS_PARAMETER = {
                [commonLocators.CommonLabels.CONTROL_TEMPLATE]:TEMPLET_CODE,
                [app.GridCells.CODE]:CONTROLLING_CODE,

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
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
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

    it("TC - Verify Create Controlling Units Templet", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNIT_TEMPLATES)
        _common.openTab(app.TabBar.CONTROLLING_UNIT_TEMPLATE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLING_UNIT_TEMPLATE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_TEMPLATES, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT_TEMPLATES, CONTAINER_COLUMNS_CONTROLLING_UNIT_TEMPLATES,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TEMPLET_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TEMPLET_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)

        _common.openTab(app.TabBar.CONTROLLING_UNIT_TEMPLATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, CONTAINER_COLUMNS_CONTROLLING_UNIT_TEMPLATES,)

        });

        _common.create_newRecord(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTROLLING_DESC);
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CONTROLLING_CODE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasIconWithIndex(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,app.GridCells.TREE,btn.IconButtons.CONTROL_ICONS,0)
        _common.create_newSubRecord(cnt.uuid.TEMPLATE_CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_CONTROLLING_DESC);
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_CONTROLLING_CODE);

        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });


    it("TC - Verify Genrate Controlling Units From Genrate Controlling Units From Templet Options", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME )
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.GENERATE_CONTROLLING_UNITS_FROM_TEMPLET)
        _controllingUnit.generate_controllingUnitFromTemplate_fromWizard(GENERATE_CONTROLLING_UNITS_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.clickOn_cellHasIconWithIndex(cnt.uuid.CONTROLLING_UNIT, app.GridCells.TREE, app.GridCellIcons.ICO_CONTROLLING_UNIT2,0)
        _common.getText_fromCell(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CONTROLLING_CODE", $ele1.text())
            cy.log(Cypress.env("CONTROLLING_CODE"))

        });
        _common.waitForLoaderToDisappear()

    });

    it("TC - Verify Change Status Of Controlling Units", function () {
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
        });
        _validate.verify_isRecordPresent(cnt.uuid.CONTROLLING_UNIT, Cypress.env("CONTROLLING_CODE"))
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, Cypress.env("CONTROLLING_CODE"))
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CHANGE_CONTROLLING_UNIT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CONTROLLING_UNIT_STATUS_FK, commonLocators.CommonKeys.CHECKED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()


    });
})