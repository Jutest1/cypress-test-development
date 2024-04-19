import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _boqPage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "R_PR-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-GCC-1.1-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS";


let  CONTAINERS_CONTROLLING_UNITS;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS;

let PROJECT_PARAMETERS: DataCells, GENERATE_CONTROLLING_UNITS_PARAMETER: DataCells;

allure.epic("CONTROLLING");
allure.feature("Controlling Unit");
allure.story("CNT- 1.2 | Generate Controlling Units using wizard 'Generate Controlling Units' and change the status of the Controlling Unit using wizard 'Change Controlling Unit Status'");

describe("CNT- 1.2 | Generate Controlling Units using wizard 'Generate Controlling Units' and change the status of the Controlling Unit using wizard 'Change Controlling Unit Status'", () => {


    before(function () {

        cy.fixture("controlling/cnt-1.2-generate-controlling-units-using-wizard.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            GENERATE_CONTROLLING_UNITS_PARAMETER = {
                [commonLocators.CommonLabels.TEMPLATE]: "RIB Kostenträger (KTR)",

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


    it("TC - Verify Genrate Controlling Units using wizard option", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME  )
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.GENERATE_CONTROLLING_UNITS)
        _controllingUnit.generate_controllingUnit_fromWizard(GENERATE_CONTROLLING_UNITS_PARAMETER)
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