import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const EST_CODE = "EST-" + Cypress._.random(0, 999);
const LINEITEM_DESC = "EST-LI-" + Cypress._.random(0, 999);
const ASSEMBLY_CODE = "ASSEMBLIES_CODE"
const ASSEMBLY_RESOURCE_CODE = "ASSEMBLIES_RESOURCE_CODE"
const ASSEMBLY_UOM = "ASSEMBLIES_UOM"
const ASSEMBLY_QUANTITY = "ASSEMBLIES_QUANTITY"
const ASSEMBLY_DESCRIPTION = "ASSEMBLY_DESCRIPTION"

let CONTAINERS_PROJECT;
let PROJECT_PARAMETERS: DataCells;
let CONTAINERS_DATA_RECORDS;
let CONTAINERS_ASSEMBLY_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES;
let CONTAINERS_ASSEMBLIES;
let CONTAINER_COLUMNS_ASSEMBLIES;
let CONTAINERS_ASSEMBLY_RESOURCES;
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCES;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE: DataCells;
let ESTIMATE_PARAMETERS;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINERS_RESOURCES;
let CONTAINER_COLUMNS_RESOURCES;
let RESOURCE_PARAMETER: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 5.3 | System Option 752  = 2");
describe("EST- 5.3 | System Option 752  = 2", () => {

    before(function () {
        cy.fixture("estimate/est-5.3-system-option-752=2.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK,
            };
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINERS_ASSEMBLY_CATEGORIES = this.data.CONTAINERS.ASSEMBLY_CATEGORIES;
            CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES
            CONTAINERS_ASSEMBLIES = this.data.CONTAINERS.ASSEMBLIES;
            CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
            CONTAINERS_ASSEMBLY_RESOURCES = this.data.CONTAINERS.ASSEMBLY_RESOURCES;
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCES = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCES
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
                [app.GridCells.DESCRIPTION_INFO]: LINEITEM_DESC
            };
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE_1,
            };

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Precondition : system option in customizing  overwrite when change assembly template = 2", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.SYSTEM_OPTION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CommonLocators.CommonLabels.SYSTEM_OPTION)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.OVERWRITE_WHEN_CHANGE_ASSEMBLY_TEMPLATE)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.OVERWRITE_WHEN_CHANGE_ASSEMBLY_TEMPLATE)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.PARAMETER_VALUE, app.InputFields.DOMAIN_TYPE_COMMENT, CONTAINERS_DATA_RECORDS.PARAMETER_VALUE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Precondition : Verify assembly resource in assemblies module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.toggle_radioFiledInContainer(CommonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, CONTAINERS_ASSEMBLIES.ASSEMBLIES_DESCRIPTION)
        _common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.CODE, ASSEMBLY_CODE)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_DESCRIPTION)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.BAS_UOM_FK, ASSEMBLY_UOM)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.QUANTITY_SMALL, ASSEMBLY_QUANTITY)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINERS_ASSEMBLY_RESOURCES.ASSEMBLY_RESOURCE_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINERS_ASSEMBLY_RESOURCES.ASSEMBLY_RESOURCE_DESCRIPTION)
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CODE, ASSEMBLY_RESOURCE_CODE)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create a project and pin it", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS);
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
    })

    it("TC - Create estimate header", function () {
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
    })

    it("TC - Create new line item record", function () {
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
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign assembly templet to line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_ASSEMBLY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(ASSEMBLY_CODE))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify new resources get populated In resource container", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.select_rowHasValue(cnt.uuid.RESOURCES, Cypress.env(ASSEMBLY_RESOURCE_CODE))
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, Cypress.env(ASSEMBLY_RESOURCE_CODE))
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

    it("TC - Verify line item description not get append and UoM, quantity gets inherit from assigned assembly", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, Cypress.env(ASSEMBLY_QUANTITY))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINEITEM_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BAS_UOM_FK, Cypress.env(ASSEMBLY_UOM))
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    })

})
