import { app, commonLocators, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _materialPage, _validate, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "TEST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_CODE = "CAT-CD-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE = "GRP_CD-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC = "GRP-DESC-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE = "MAT-CD-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC = "MAT-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_MATERIAL_CATALOGS, CONTAINERS_MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_CONTRACT, CONTAINERS_COMPANY, CONTAINERS_ESTIMATE, CONTAINERS_PROJECT, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_GROUPS, CONTAINER_COLUMNS_CATLOG_TO_COMPANIES, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_ITEMS, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES;

let MATERIAL_CATALOGS_PARAMETERS: DataCells, MATERIAL_GROUPS_PARAMETERS: DataCells, MATERIAL_RECORDS_PARAMETERS: DataCells, CONTRACT_PARAMETER: DataCells, PROJECTS_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.146 | Add Charges & discount for material")
describe("PCM- 2.146 | Add Charges & discount for material", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.146-add-charges-and-discount-for-material.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
            CONTAINERS_MATERIAL_CATALOGS = this.data.CONTAINERS.MATERIAL_CATALOGS
            MATERIAL_CATALOGS_PARAMETERS = {
                [app.GridCells.CODE]: MATERIAL_CATALOG_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
            }
            CONTAINER_COLUMNS_MATERIAL_GROUPS = this.data.CONTAINER_COLUMNS.MATERIAL_GROUPS
            MATERIAL_GROUPS_PARAMETERS = {
                [app.GridCells.CODE]: MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]: MATERIAL_GROUPS_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CommonLocators.CommonKeys.MATERIAL
            }
            CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
            MATERIAL_RECORDS_PARAMETERS = {
                [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_RECORD_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0]
            }
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
            };
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
            };
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.wait(500)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    })

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Verify create material catalog and Material groups', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.MATERIAL_CATALOG_TYPE)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.MATERIAL_CATALOG_TYPE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORDS.NEUTRAL_MATERIAL)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_FRAMEWORK, CommonLocators.CommonKeys.CHECK)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORDS.FRAMEWORK_AGREEMENTS)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_FRAMEWORK, CommonLocators.CommonKeys.CHECK)
        cy.SAVE().wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);

        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETERS)
        cy.SAVE().wait(1000)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 3);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUPS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS_PARAMETERS)
        cy.SAVE().wait(1000)
        cy.REFRESH_CONTAINER()
    })

    it('TC - Verify create material records-1', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
    })

    it('TC - Verify create material records-2', function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.CODE, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORDS_PARAMETERS)
        cy.SAVE().wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CHARGES, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CHARGES[0])
        cy.SAVE().wait(1000)
        _validate.verify_materialRecordCalculation(CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0], CONTAINERS_MATERIAL_RECORDS.DISCOUNT[0], CONTAINERS_MATERIAL_RECORDS.CHARGES[0], CONTAINERS_MATERIAL_RECORDS.PRICE_EXTRA[0], cnt.uuid.MATERIAL_RECORDS, app.GridCells.ESTIMATE_PRICE, "ACTUALRESULT1")
    })

    it('TC - Verify estimate price,cost gross price,cost price by setting value in charges', function () {
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.COST_PRICE_GROSS, Cypress.env("ACTUALRESULT1"))
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.COST, Cypress.env("ACTUALRESULT1"))
    })

    it('TC - Verify estimate price,cost gross price,cost price by setting value in discount-1', function () {
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.DISCOUNT[1])
        cy.SAVE().wait(1000)
        _validate.verify_materialRecordCalculation(CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0], CONTAINERS_MATERIAL_RECORDS.DISCOUNT[1], CONTAINERS_MATERIAL_RECORDS.CHARGES[0], CONTAINERS_MATERIAL_RECORDS.PRICE_EXTRA[0], cnt.uuid.MATERIAL_RECORDS, app.GridCells.ESTIMATE_PRICE, "ACTUALRESULT2")
    })

    it('TC - Verify estimate price,cost gross price,cost price by setting value in discount-2', function () {
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.COST_PRICE_GROSS, Cypress.env("ACTUALRESULT2"))
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.COST, Cypress.env("ACTUALRESULT2"))
    })

    it('TC - Create new estimate and line Item', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
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
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESC)
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS)
        cy.SAVE().wait(2000)
    });

    it('TC - Verify cost/unit for the line item and the assigned resources', function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, Cypress.env("ACTUALRESULT2"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_UNIT, Cypress.env("ACTUALRESULT2"))
    })
})