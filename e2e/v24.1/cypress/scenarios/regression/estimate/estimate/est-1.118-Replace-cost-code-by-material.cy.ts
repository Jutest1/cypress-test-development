import { _common, _estimatePage, _validate, _mainView, _modalView, _projectPage, _package } from "cypress/pages";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";
const allure = Cypress.Allure.reporter.getInterface()
const PROJECT_NO = "EST-1.11-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

const CLERK = "HS";
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;
let MODAL_REPLACE_DETAILS

let REPLACE_DETAILS_PARAMETERS,REPLACE_DETAILS_PARAMETERS_COST_CODE: DataCells
let MODAL_IGNORE_CURRENT_ELEMENT_JOB
let MODAL_REPLACE_RESOURCE
let CONTAINER_COLUMNS_COST_CODES
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.118 | Replace cost code by material")
describe("EST- 1.118 | Replace cost code by material", () => {
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-1.118-Replace-cost-code-by-material.json").then((data) => {
            this.data = data
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }


            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE
            };

            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
            MODAL_IGNORE_CURRENT_ELEMENT_JOB = this.data.MODAL.IGNORE_CURRENT_ELEMENT_JOB
            MODAL_REPLACE_RESOURCE = this.data.MODAL.REPLACE_RESOURCE
            MODAL_REPLACE_DETAILS = this.data.MODAL.REPLACE_DETAILS
            REPLACE_DETAILS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING_CAPS, commonLocators.CommonLabels.REPLACE_DETAILS],
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_REPLACE_RESOURCE.SELECT_ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.FUNCTION_TYPE]: MODAL_REPLACE_RESOURCE.FUNCTION_TYPE,
                [commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB]: MODAL_IGNORE_CURRENT_ELEMENT_JOB,
                [commonLocators.CommonLabels.REPLACE_WITH_ELEMENT]: MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT,
                [commonLocators.CommonLabels.REPLACE_DETAILS]: MODAL_REPLACE_DETAILS,

            }
            REPLACE_DETAILS_PARAMETERS_COST_CODE = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING_CAPS, commonLocators.CommonLabels.REPLACE_DETAILS],
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_REPLACE_RESOURCE.SELECT_ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.FUNCTION_TYPE]: MODAL_REPLACE_RESOURCE.FUNCTION_TYPE_COST_CODE,
                [commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB]: MODAL_IGNORE_CURRENT_ELEMENT_JOB,
                [commonLocators.CommonLabels.REPLACE_WITH_ELEMENT]: MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT_COST_CODE,

            }
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        })
    });

   /*  after(() => {
        cy.LOGOUT();
    }); */

    it("TC - Create estimate header", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create line item with assembly", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });
    it("TC - Create resources for line item", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

    it("TC - Verify replace resource from wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_RESOURCE);
        _estimatePage.replaceResource_fromWizard(REPLACE_DETAILS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT);
    });


    it('TC - Verify material is visible in resource container', function () {
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        });
        cy.wait(1000)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_RESOURCE.MATERIAL)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("COSTUNIT", $ele1.text())
        })
        cy.REFRESH_CONTAINER()
    })

    it('TC - Verify cost/unit of resource', function () {

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        });
        cy.wait(1000)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.goToModule_inActiveRow(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, btn.ButtonText.GO_TO_MATERIAL)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS);
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, CONTAINERS_RESOURCE.MATERIAL);
        _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.ESTIMATE_PRICE, Cypress.env("COSTUNIT"))
    })
    it('TC - Verify create subitem resource and replace resource from wizard', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.edit_dropdownCellWithCaret(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, commonLocators.CommonKeys.GRID, CONTAINERS_RESOURCE.SHORT_KEY_S)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_RESOURCE);
        _estimatePage.replaceResource_fromWizard(REPLACE_DETAILS_PARAMETERS_COST_CODE);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.SHORT_KEY);
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT_COST_CODE);
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("COSTUNIT_COST_UNIT", $ele1.text())
        })

    });
    it('TC - Verify cost/unit of resource', function () {
        _common.goToModule_inActiveRow(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, btn.ButtonText.GO_TO_COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT_COST_CODE)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES, MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT_COST_CODE)

        _common.assert_cellData_insideActiveRow(cnt.uuid.COST_CODES, app.GridCells.RATE, Cypress.env("COSTUNIT_COST_UNIT"))
    })

    


})