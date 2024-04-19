import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE;

let PROJECTS_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS_COST_CODE: DataCells, RESOURCE_PARAMETERS_MATERIAL: DataCells, RESOURCE_PARAMETERS_ASSEMBLY: DataCells, REPLACE_RESOURCE_COST_CODE_PARAMETERS: DataCells, REPLACE_RESOURCE_MATERIAL_PARAMETERS: DataCells, REPLACE_RESOURCE_ASSEMBLY_PARAMETERS: DataCells;

let MODAL_PROJECTS, MODAL_REPLACE_RESOURCE;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_LINE_ITEM;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 7.21 | Verify Remove Resources from Replace resource wizard for cost code, material, Assembly")

describe("EST- 7.21 | Verify Remove Resources from Replace resource wizard for cost code, material, Assembly", () => {
    before(function () {
        cy.fixture("estimate/est-7.21-verify-remove-resources-from-replace-resource-wizard-for-cost-code-material-assembly.json"
        )
            .then((data) => {
                this.data = data;
                MODAL_PROJECTS = this.data.MODAL.PROJECTS
                PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
                }
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
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                };
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE;
                RESOURCE_PARAMETERS_COST_CODE = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[0],
                };
                RESOURCE_PARAMETERS_MATERIAL = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[1],
                };
                RESOURCE_PARAMETERS_ASSEMBLY = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[2],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[2],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[2],
                }
                MODAL_REPLACE_RESOURCE = this.data.MODAL.REPLACE_RESOURCE
                REPLACE_RESOURCE_COST_CODE_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING_CAPS],
                    [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_REPLACE_RESOURCE.SELECT_ESTIMATE_SCOPE,
                    [commonLocators.CommonLabels.FUNCTION_TYPE]: MODAL_REPLACE_RESOURCE.FUNCTION_TYPE,
                    [commonLocators.CommonLabels.RESOURCE_TYPE]: MODAL_REPLACE_RESOURCE.RESOURCE_TYPE_COST_CODE,
                    [commonLocators.CommonLabels.CURRENT_ELEMENT]: MODAL_REPLACE_RESOURCE.CURRENT_ELEMENT[0],
                    [commonLocators.CommonLabels.CURRENT_ELEMENT_JOB]: PROJECT_NO,
                }
                REPLACE_RESOURCE_MATERIAL_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING_CAPS],
                    [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_REPLACE_RESOURCE.SELECT_ESTIMATE_SCOPE,
                    [commonLocators.CommonLabels.FUNCTION_TYPE]: MODAL_REPLACE_RESOURCE.FUNCTION_TYPE,
                    [commonLocators.CommonLabels.RESOURCE_TYPE]: MODAL_REPLACE_RESOURCE.RESOURCE_TYPE_MATERIAL,
                    [commonLocators.CommonLabels.CURRENT_ELEMENT]: MODAL_REPLACE_RESOURCE.CURRENT_ELEMENT[1],
                    [commonLocators.CommonLabels.CURRENT_ELEMENT_JOB]: PROJECT_NO,
                }
                REPLACE_RESOURCE_ASSEMBLY_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING_CAPS],
                    [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_REPLACE_RESOURCE.SELECT_ESTIMATE_SCOPE,
                    [commonLocators.CommonLabels.FUNCTION_TYPE]: MODAL_REPLACE_RESOURCE.FUNCTION_TYPE,
                    [commonLocators.CommonLabels.RESOURCE_TYPE]: MODAL_REPLACE_RESOURCE.RESOURCE_TYPE_ASSEMBLY,
                    [commonLocators.CommonLabels.CURRENT_ELEMENT]: MODAL_REPLACE_RESOURCE.CURRENT_ELEMENT[2]
                }
            })
            .then(() => {
                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            });
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new project", function () {
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear();
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.PROJECT_NO, 'ProjectNo');
    });

    it("TC - Create new estimate record", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear();
    });

    it("TC - Create new line item with quantity", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
            _common.waitForLoaderToDisappear();
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    });

    it("TC - Assign resource to the line item", function () {
        _common.waitForLoaderToDisappear();
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES);
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST_CODE);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_ASSEMBLY);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.RESOURCES);
    });

    it("TC - Verify remove resource from replace resource wizard", function () {
        cy.wait(500).then(() => {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_RESOURCE);
            _estimatePage.replaceResource_fromWizard(REPLACE_RESOURCE_COST_CODE_PARAMETERS)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_RESOURCE);
            _estimatePage.replaceResource_fromWizard(REPLACE_RESOURCE_MATERIAL_PARAMETERS)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_RESOURCE);
            _estimatePage.replaceResource_fromWizard(REPLACE_RESOURCE_ASSEMBLY_PARAMETERS)
            _common.waitForLoaderToDisappear()
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
        })
    });
});
