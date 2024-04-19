import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _bidPage, _boqPage, _common, _controllingUnit, _estimatePage, _mainView, _modalView, _projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LI_DESC = "LI1-DESC-" + Cypress._.random(0, 999);
const VER_EST_JOB = "V_JOBC-" + Cypress._.random(0, 999);
const VER_DESC = "V1-DESC-" + Cypress._.random(0, 999);
const RES_VER_JOB = "RES_VER_JOB-" + Cypress._.random(0, 999);
const RES_VER_DESC = "RES_VER_DESC-" + Cypress._.random(0, 999);
const RES_VER_EST_JOB = "RES_JOB-DESC-" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";

let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_BIDS;
let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS: DataCells
let RESOURCE_2_PARAMETERS: DataCells
let RESOURCE_3_PARAMETERS: DataCells
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let PROJECTS_PARAMETERS
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.115 | Highlight a Estimate and click Create Version button, Check the PRJ Estimate container.");

describe("EST- 1.115 | Highlight a Estimate and click Create Version button, Check the PRJ Estimate container.", () => {

    before(function () {

        cy.fixture("estimate/est-1.115-highlight-a-estimate-and-click-version-button-check-the-prj-estimate-container.json").then((data) => {
            this.data = data;
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
            RESOURCE_3_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_A,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.ASSEMBLY_CODE,
            };
            RESOURCE_2_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_M,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE,
            };

            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LI_DESC,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
            cy.preLoading(Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName"));
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

        });
    });

    it('TC - Create an estimate header', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ESTIMATE, app.GridCells.CODE, EST_HEADER).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("EST1_CODE", $ele1.text())
        })
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

    });

    it('TC - Create Line Item and assign Resources to it.', function () {
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
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("DESC_CC_C", $ele1.text())
        })
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_2_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("DESC_CC_M", $ele1.text())
        })
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_3_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LI_DESC)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("LI_QTY", $ele1.text().replace(",", ""))
        })
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("LI_COST_TOTAL", $ele1.text().replace(",", ""))
        })
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

    });

    it('TC - Create an Estimate Version and verify the Estimate.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE, EST_DESC)
        _common.waitForLoaderToDisappear()
        _estimatePage.createEstimateVersion(cnt.uuid.ESTIMATE, VER_EST_JOB, VER_DESC)
        _common.maximizeContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_FILTER_CURRENT_VERSION)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE, VER_EST_JOB)
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE, app.GridCells.VERSION_NO, "1", EST_HEADER)
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE, app.GridCells.CODE, Cypress.env("EST1_CODE") + "_V1", EST_HEADER)
        })
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LI_DESC)
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, Cypress.env("LI_QTY"))
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, Cypress.env("LI_COST_TOTAL"))
        })
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 4);
        });
        _validate.verify_isRecordPresent(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.SHORT_KEY)
        _validate.verify_isRecordPresent(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.SHORT_KEY_M)
        _validate.verify_isRecordPresent(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.ASSEMBLY_CODE)
    })

    it('TC - Restore an Estimate Version and verify the Restored Estimate.', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, VER_EST_JOB)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE, VER_EST_JOB)
        _estimatePage.restoreEstimateVersion(cnt.uuid.ESTIMATE, RES_VER_JOB, RES_VER_DESC, RES_VER_EST_JOB)
        _common.maximizeContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_FILTER_CURRENT_VERSION)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE, RES_VER_JOB)
        cy.wait(500).then(() => {

            _common.assert_forNumericValues(cnt.uuid.ESTIMATE, app.GridCells.VERSION_NO, "3", EST_HEADER)
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE, app.GridCells.CODE, Cypress.env("EST1_CODE"), EST_HEADER)
        })
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LI_DESC)
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, Cypress.env("LI_QTY"))
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, Cypress.env("LI_COST_TOTAL"))
        })
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _validate.verify_isRecordPresent(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.SHORT_KEY)
        _validate.verify_isRecordPresent(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.SHORT_KEY_M)
        _validate.verify_isRecordPresent(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.ASSEMBLY_CODE)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LI_DESC)
        _validate.verify_isRecordNotEditable(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, 0)
        _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.SHORT_KEY)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, 1)
    })
    after(() => {
        cy.LOGOUT();
      });
})