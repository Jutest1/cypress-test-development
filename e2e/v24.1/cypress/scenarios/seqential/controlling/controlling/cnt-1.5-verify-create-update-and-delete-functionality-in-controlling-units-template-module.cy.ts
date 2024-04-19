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
const CU_MAIN_01 = "RNMAIN-CU-" + Cypress._.random(0, 999)
const CU_SUB_01 = 'SUB-CU1-' + Cypress._.random(0, 999);
const CU_SUB_02 = 'SUB-CU2-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS;
let CONTAINER_COLUMNS_CONTROLLING_UNIT_TEMPLATES
let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS;
let PROJECT_PARAMETERS: DataCells

allure.epic("CONTROLLING");
allure.feature("Controlling Unit");
allure.story("CNT- 1.5 | Verify create update and delete functionality in Controlling Unit template module");

describe("CNT- 1.5 |  Verify create update and delete functionality in Controlling Unit template module", () => {

    before(function () {

        cy.fixture("controlling/cnt-1.5-verify-create-update-and-delete-functionality-in-controlling-units-template-module.json").then((data) => {
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
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
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
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TEMPLET_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TEMPLET_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    
    it("TC - Verify Create Controlling Units ", function () {
        _common.openTab(app.TabBar.CONTROLLING_UNIT_TEMPLATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CU_MAIN_01);
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE,CU_MAIN_01);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, CU_MAIN_01)
        _common.create_newSubRecord(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CU_SUB_01);
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE,CU_SUB_01);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,app.GridCells.DESCRIPTION_INFO,CU_SUB_01)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, CU_MAIN_01)
        _common.create_newSubRecord(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CU_SUB_02);
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE,CU_SUB_02);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,app.GridCells.DESCRIPTION_INFO,CU_SUB_02)
    })
    it("TC - Verify Update and Delete Controlling Units", function () {
        _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_SUB_01)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CONTROLLING_CAT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_CONTROLLING_UNITS.UPDATE[0])
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CONTROLLING_CAT_FK,CONTAINERS_CONTROLLING_UNITS.UPDATE[0])
       _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_SUB_02)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CONTROLLING_CAT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_CONTROLLING_UNITS.UPDATE[0])
       cy.SAVE()
       _common.assert_cellData_insideActiveRow(cnt.uuid.TEMPLATE_CONTROLLING_UNITS, app.GridCells.CONTROLLING_CAT_FK,CONTAINERS_CONTROLLING_UNITS.UPDATE[0])
       
       _common.waitForLoaderToDisappear()
       _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_SUB_01)
       _common.waitForLoaderToDisappear()
       _common.delete_recordFromContainer(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
       cy.SAVE()
       _validate.verify_isRecordDeleted(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_SUB_01)

       _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_SUB_02)
       _common.waitForLoaderToDisappear()
       _common.delete_recordFromContainer(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
       cy.SAVE()
       _validate.verify_isRecordDeleted(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_SUB_02)
       _common.waitForLoaderToDisappear()

       _common.select_rowHasValue(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_MAIN_01)
       _common.waitForLoaderToDisappear()
       _common.delete_recordFromContainer(cnt.uuid.TEMPLATE_CONTROLLING_UNITS)
       cy.SAVE()
       _validate.verify_isRecordDeleted(cnt.uuid.TEMPLATE_CONTROLLING_UNITS,CU_MAIN_01)
       _common.waitForLoaderToDisappear()
    });
    it("TC - Verify Delete Controlling Units Template", function () {
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,TEMPLET_CODE)
        _common.waitForLoaderToDisappear()
        _common.delete_recordFromContainer(cnt.uuid.CONTROLLING_UNIT_TEMPLATES)
        cy.SAVE()
       _validate.verify_isRecordDeleted(cnt.uuid.CONTROLLING_UNIT_TEMPLATES,TEMPLET_CODE)
    })
})