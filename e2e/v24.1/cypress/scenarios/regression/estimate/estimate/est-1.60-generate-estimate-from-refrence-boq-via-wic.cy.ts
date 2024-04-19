import { _boqPage, _common, _estimatePage, _validate, _wicpage, } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();

const WIC_GROUP_CODE = "R_" + Cypress._.random(0, 999)
const WIC_GROUP_DESC = "RWIC-" + Cypress._.random(0, 999)
const WIC_CATALOG_SPEC = "RBoQ-" + Cypress._.random(0, 999)
const WIC_BOQ_SPEC = "RLine-" + Cypress._.random(0, 999)

const BOQ_HEAD_PR1 = "1BOQ-" + Cypress._.random(0, 999)
const EST_HEAD_PR1 = "1EST-" + Cypress._.random(0, 999)

const BOQ_HEAD_PR2 = "2BOQ-" + Cypress._.random(0, 999)
const EST_HEAD_PR2 = "2EST-" + Cypress._.random(0, 999)

const BOQ_CODE_PR1 = 'BOQ_CODE_PR1'
const BOQ_CODE_PR2 = 'BOQ_CODE_PR2'

const COST_TOTAL_EST_1 = 'COST_TOTAL_EST_1'
const AQ_QUANTITY_1 = 'AQ_QUANTITY_1'
const DESC_EST_1 = 'DESC_EST_1'
const HEADER_LEVEL = 'HEADER_LEVEL'
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);


let CONTAINER_WIC_GROUP;
let CONTAINER_WIC_CATALOG;
let CONTAINER_COLUMNS_WIC_GROUP
let CONTAINER_COLUMNS_WIC_CATALOG
let CONTAINER_WIC_BOQ
let CONTAINER_COLUMNS_BOQ
let CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE
let BOQS_STRUCTURE_PARAMETERS: DataCells
let WIC_CATALOG_PARAMETER: DataCells
let BOQS_PARAMETER_PR1: DataCells
let BOQS_PARAMETER_PR2: DataCells
let CONTAINER_WIC_BOQ_GENERATION
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let ESTIMATE_PARAMETERS_PR1: DataCells;
let ESTIMATE_PARAMETERS_PR2: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE
let CONTAINER_COLUMNS_RESOURCE

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.60 | Generate Estimate from refrence BoQ via - WIC");

describe("EST- 1.60 | Generate Estimate from refrence BoQ via - WIC", () => {
    before(function () {
        cy.fixture("estimate/est-1.60-generate-estimate-from-refrence-boq-via-wic.json").then((data) => {
            this.data = data;
            CONTAINER_WIC_GROUP = this.data.CONTAINERS.WIC_GROUP
            CONTAINER_WIC_CATALOG = this.data.CONTAINERS.WIC_CATALOG
            CONTAINER_COLUMNS_WIC_GROUP = this.data.CONTAINER_COLUMNS.WIC_GROUP
            CONTAINER_COLUMNS_WIC_CATALOG = this.data.CONTAINER_COLUMNS.WIC_CATALOG
            CONTAINER_WIC_BOQ = this.data.CONTAINERS.WIC_BOQ
            CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIC_BOQ
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
            CONTAINER_WIC_BOQ_GENERATION = this.data.CONTAINERS.WIC_BOQ_GENERATION
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            BOQS_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: WIC_BOQ_SPEC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINER_WIC_BOQ.WIC_BOQ_QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINER_WIC_BOQ.WIC_BOQ_UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINER_WIC_BOQ.WIC_BOQ_UOM
            };
            WIC_CATALOG_PARAMETER = {
                [app.GridCells.BRIEF_INFO_SMALL]: WIC_CATALOG_SPEC
            },
                BOQS_PARAMETER_PR1 = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_PR1
                };
            BOQS_PARAMETER_PR2 = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_PR2
            };
            ESTIMATE_PARAMETERS_PR1 = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_HEAD_PR1,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            ESTIMATE_PARAMETERS_PR2 = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_HEAD_PR2,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEAD_PR1
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create a new WIC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC)
        _common.openTab(app.TabBar.WIC).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0);
            _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUP)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS)
        _common.create_newRecord(cnt.uuid.WIC_GROUPS, 0)
        _wicpage.enterRecord_toCreateWICGroup(WIC_GROUP_CODE, WIC_GROUP_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WIC_CATALOGS, 1)
        _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOG)
        _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES)

        _common.create_newRecord(cnt.uuid.WIC_CATALOGUES, 1)
        _wicpage.enterRecord_toCreateWICCatalogs(cnt.uuid.WIC_CATALOGUES, WIC_CATALOG_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.goToButton_inActiveRow(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE, btn.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, HEADER_LEVEL)
    })

    it("TC - Create a BoQ from created WIC BoQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.BOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS, 1)
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQS_PARAMETER_PR1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_CODE_PR1, BOQ_ROOT_ITEM)
        _common.goToButton_inActiveRow(cnt.uuid.BOQS, app.GridCells.REFERENCE, btn.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM)
        _common.waitForLoaderToDisappear()
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_dataFromSubContainer(cnt.uuid.BOQ_STRUCTURES, BOQ_HEAD_PR1, 0)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 1)
            _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
        cy.wait(2000).then(() => {
            _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BOQSOURCE, cnt.uuid.BOQ_STRUCTURES, CONTAINER_WIC_BOQ_GENERATION.COPY_FROM_BOQ_TYPE, WIC_GROUP_CODE, " ", "1", WIC_BOQ_SPEC, BOQ_HEAD_PR1, "Level 1")
        })
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create an estimate by generating line item from BoQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_PR1);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3)
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, COST_TOTAL_EST_1)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, DESC_EST_1)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, AQ_QUANTITY_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Navigate to another Project and create BoQ using created WIC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, "Verwaltung").pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS, 1)
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQS_PARAMETER_PR2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_CODE_PR2, BOQ_ROOT_ITEM)
        _common.goToButton_inActiveRow(cnt.uuid.BOQS, app.GridCells.REFERENCE, btn.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_dataFromSubContainer(cnt.uuid.BOQ_STRUCTURES, BOQ_HEAD_PR2)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 1)
            _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
        _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BOQSOURCE, cnt.uuid.BOQ_STRUCTURES, CONTAINER_WIC_BOQ_GENERATION.COPY_FROM_BOQ_TYPE, WIC_GROUP_CODE, " ", "1", WIC_BOQ_SPEC, BOQ_HEAD_PR2, "Level 1")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create an estimate header and generate estimate from WIC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_PR2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.goToButton_inActiveRow(cnt.uuid.ESTIMATE, app.GridCells.CODE, btn.IconButtons.ICO_GO_TO, EST_HEADER)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEM_FROM_WIC)
        _estimatePage.GenerateEstimateFromReferenceBoQ_usingWizard(CONTAINER_WIC_BOQ_GENERATION.CASE_TYPE, Cypress.env('PROJECT_NUMBER'), BOQ_HEAD_PR1, EST_HEAD_PR1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Generated Estimate", function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, Cypress.env(DESC_EST_1))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, Cypress.env(COST_TOTAL_EST_1))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, Cypress.env(AQ_QUANTITY_1))
    })
})