import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _estimatePage, _package, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "P-EST-4.21-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-EST-4.21-" + Cypress._.random(0, 999);
const LI_DESC = "LI-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINERS_COST_CODES;
let CONTAINERS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE1_PARAMETERS: DataCells;
let RESOURCE2_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM;
let CONTAINER_COLUMNS_ESTIMATE_RESOURCE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.19 | Verify CO2 attributes of package (created with selection criteria-Procurement structure) from estimate");

describe("EST- 4.19 | Verify CO2 attributes of package (created with selection criteria-Procurement structure) from estimate", () => {

    before(function () {

        cy.fixture("estimate/est-4.19-verify-co2-attributes-of-package-created-with-selection-criteria-procurement-structure-from-estimate.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            };
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE1_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_C,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
            };
            RESOURCE2_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_M,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_2,
            };
            CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM = this.data.CONTAINER_COLUMNS.ESTIMATE_LINE_ITEM;
            CONTAINER_COLUMNS_ESTIMATE_RESOURCE = this.data.CONTAINER_COLUMNS.ESTIMATE_RESOURCES;

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_RECORDS.MATERIAL_CODE)
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DESCRIPTION_INFO_1, CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION)
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("Material_CO2_Value", $ele1.text())
            cy.log(Cypress.env("Material_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new project & estimate header record and generate line item, resource", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(Sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, LI_DESC)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE1_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE2_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_TOTAL_VARIANCE, "VARIANCE")
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create material package and change Package Status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.enterRecord_toCreatePackage_wizard("Procurement structure")
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    })

    it("TC - Verify CO2 attributes in the package", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINE_ITEM, app.FooterTab.ESTIMATELINEITEM, 1);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM.co2totalvariance, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINE_ITEM)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINE_ITEM)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ESTIMATE_LINE_ITEM, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE, CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE, app.GridCells.CO2_PROJECT_TOTAL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINE_ITEM, app.GridCells.CO2_TOTAL_VARIANCE, Cypress.env("VARIANCE"))
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_RESOURCE, app.FooterTab.ESTIMATE_RESOURCE, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_RESOURCE, CONTAINER_COLUMNS_ESTIMATE_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_RESOURCE.co2project, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.co2source, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.estresourcetypefkextend], cnt.uuid.ESTIMATE_RESOURCE)
        });
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINE_ITEM, app.FooterTab.ESTIMATELINEITEM, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINE_ITEM)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINE_ITEM, LI_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_RESOURCE, app.FooterTab.ESTIMATELINEITEM, 1);
        });
        cy.wait(1000).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_FK_EXTEND, CONTAINERS_RESOURCE.SHORT_KEY_C)
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("CostCode_CO2_Value"))
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.EST_RESOURCE_TYPE_FK_EXTEND, CONTAINERS_RESOURCE.SHORT_KEY_M)
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("Material_CO2_Value"))
        })
    })

})