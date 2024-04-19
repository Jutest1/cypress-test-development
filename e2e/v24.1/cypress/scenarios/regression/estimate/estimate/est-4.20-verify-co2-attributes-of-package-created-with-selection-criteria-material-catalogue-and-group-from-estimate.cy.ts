import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import { _common, _projectPage, _estimatePage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "EST-DESC-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LI-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_COST_CODES, CONTAINERS_MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_COST_CODES, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE_RESOURCE

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETER_1: DataCells, RESOURCE_PARAMETER_2: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.20 | Verify CO2 attributes of package (created with selection criteria-material catalogue & group) from estimate");

describe("EST- 4.20 | Verify CO2 attributes of package (created with selection criteria-material catalogue & group) from estimate", () => {

    before(function () {

        cy.fixture("estimate/est-4.20-verify-co2-attributes-of-package-created-with-selection-criteria-material-catalogue-and-group-from-estimate.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK,
            };
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINEITEM_DESC,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
            };
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE_PARAMETER_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.COST_CODE[0]
            };
            RESOURCE_PARAMETER_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[1],
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0]
            };
            CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM = this.data.CONTAINER_COLUMNS.ESTIMATE_LINE_ITEM;
            CONTAINER_COLUMNS_ESTIMATE_RESOURCE = this.data.CONTAINER_COLUMNS.ESTIMATE_RESOURCE;
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo, CONTAINER_COLUMNS_COST_CODES.code], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("COST_CODE_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("COST_CODE_1_CO2_VALUE"))
        })
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION[0])
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL_RECORDS.co2project, CONTAINER_COLUMNS_MATERIAL_RECORDS.descriptioninfo1], cnt.uuid.MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION[0])
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MATERIAL_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("MATERIAL_1_CO2_VALUE"))
        })
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new estimate header record and generate line item, resource", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS);
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_TOTAL_VARIANCE, "VARIANCE")
    });

    it("TC - Create material package and change Package Status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify CO2 attributes in the package estimate line item", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINE_ITEM, app.FooterTab.ESTIMATELINEITEM, 1)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_RESOURCE.co2totalvariance, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.descriptioninfo], cnt.uuid.ESTIMATE_RESOURCE)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINE_ITEM, app.GridCells.DESCRIPTION_INFO, LINEITEM_DESC)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINE_ITEM)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ESTIMATE_LINE_ITEM, Cypress.env("COST_CODE_1_CO2_VALUE"), Cypress.env("MATERIAL_1_CO2_VALUE"), app.GridCells.CO2_PROJECT_TOTAL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINE_ITEM, app.GridCells.CO2_TOTAL_VARIANCE, Cypress.env("VARIANCE"))
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_RESOURCE, app.FooterTab.ESTIMATERESOURCE, 2)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_RESOURCE, CONTAINER_COLUMNS_ESTIMATE_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_RESOURCE.co2project, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.code, CONTAINER_COLUMNS_ESTIMATE_RESOURCE.descriptioninfo], cnt.uuid.ESTIMATE_RESOURCE)
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINE_ITEM, app.FooterTab.ESTIMATELINEITEM, 1)
        })
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINE_ITEM)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_RESOURCE, app.FooterTab.ESTIMATERESOURCE, 2)
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("COST_CODE_1_CO2_VALUE"));
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CODE, CONTAINERS_COST_CODES.MATERIAL_1)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("MATERIAL_1_CO2_VALUE"));
    })

})
