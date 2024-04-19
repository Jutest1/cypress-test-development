import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _estimatePage, _validate, _saleContractPage, _boqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "P-" + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = "PRJ-" + PRJ_NO + "_" + Cypress._.random(0, 999);
const EST_ALLOWANCE_CODE = "EST_ALL-" + Cypress._.random(0, 999);
const EST_ALLOWANCE_DESCRIPTION = "EST_ALLOWANCE-" + Cypress._.random(0, 999);
const EST_ALLOWANCE_ASSIGNMENT_DESCRIPTION = "EST_ALL-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_01 = "LINE-01-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_RECORDS, CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEMS, CONTAINERS_RESOURCES, CONTAINERS_STANDARD_ALLOWANCE, CONTAINERS_ALLOWANCE_MARKUP, CONTAINERS_TOTALS;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEMS, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_STANDARD_ALLOWANCE, CONTAINER_COLUMNS_ALLOWANCE_MARKUP, CONTAINER_COLUMNS_TOTALS;

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETER_1: DataCells, RESOURCE_PARAMETER_1: DataCells, RESOURCE_PARAMETER_2: DataCells, ALLOWANCE_MARKUP_PARAMETERS1: DataCells, ALLOWANCE_MARKUP_PARAMETERS2: DataCells, ESTIMATE_CONFIG_PARAMETER1, ESTIMATE_CONFIG_PARAMETER2: DataCells, ESTIMATE_CONFIG_PARAMETER3: DataCells, ESTIMATE_CONFIG_PARAMETER4: DataCells, ESTIMATE_CONFIG_PARAMETER5: DataCells, ESTIMATE_CONFIG_PARAMETER6: DataCells, ESTIMATE_CONFIG_PARAMETER7: DataCells;

let ESTIMATE_CONFIG_DIALOG_MODAL;
let CONTAINERS_TOTAL

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.54 | Standard Allowance");

describe("EST- 1.54 | Standard Allowance", () => {

    before(function () {

        cy.fixture("estimate/est-1.54-standard-allowance.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
                CONTAINERS_TOTAL = this.data.CONTAINER_COLUMNS.TOTAL_GRID;
                CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
                PROJECT_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                    [commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
                    [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
                };
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: EST_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                };
                CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS;
                LINE_ITEM_PARAMETER_1 = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_01,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEMS.UOM[0],
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEMS.QUANTITY[0]
                };
                CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCE;
                CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
                RESOURCE_PARAMETER_1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.COST_CODE[0]
                };
                RESOURCE_PARAMETER_2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCES.COST_CODE[1]
                };
                CONTAINER_COLUMNS_STANDARD_ALLOWANCE = this.data.CONTAINER_COLUMNS.STANDARD_ALLOWANCE;
                CONTAINERS_STANDARD_ALLOWANCE = this.data.CONTAINERS.STANDARD_ALLOWANCE;
                CONTAINER_COLUMNS_ALLOWANCE_MARKUP = this.data.CONTAINER_COLUMNS.ALLOWANCE_MARKUP
                CONTAINERS_ALLOWANCE_MARKUP = this.data.CONTAINERS.ALLOWANCE_MARKUP;
                ALLOWANCE_MARKUP_PARAMETERS1 = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.COST_CODE[0],
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA[0],
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP[0],
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM[0]
                   
                }
                ALLOWANCE_MARKUP_PARAMETERS2 = {
                    [app.GridCells.MDC_COST_CODE_DESCRIPTION]: CONTAINERS_ALLOWANCE_MARKUP.COST_CODE[1],
                    [app.GridCells.GA_PERC]: CONTAINERS_ALLOWANCE_MARKUP.GA[0],
                    [app.GridCells.RP_PERC]: CONTAINERS_ALLOWANCE_MARKUP.RP[0],
                    [app.GridCells.AM_PERC]: CONTAINERS_ALLOWANCE_MARKUP.AM[0]

                }
                ESTIMATE_CONFIG_DIALOG_MODAL = this.data.MODAL.ESTIMATE_CONFIG_DIALOG_PARAMETER
                ESTIMATE_CONFIG_PARAMETER1 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[0], ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[0],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[0],
                }
                ESTIMATE_CONFIG_PARAMETER2 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[1],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[1],
                }
                ESTIMATE_CONFIG_PARAMETER3 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[2],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[2],
                }
                ESTIMATE_CONFIG_PARAMETER4 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[3],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[3],
                }
                ESTIMATE_CONFIG_PARAMETER5 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[4],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[4],
                }
                ESTIMATE_CONFIG_PARAMETER6 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[5],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[5],
                }
                ESTIMATE_CONFIG_PARAMETER7 = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [ESTIMATE_CONFIG_DIALOG_MODAL.CONFIGURATION[1]],
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.CREATE,
                    [app.GridCells.LINETYPE]: ESTIMATE_CONFIG_DIALOG_MODAL.LINE_TYPE[6],
                    [app.GridCells.DESCRIPTION]: ESTIMATE_CONFIG_DIALOG_MODAL.DESCRIPTION[6],
                }
                CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                CONTAINERS_TOTALS = this.data.CONTAINERS.TOTALS;
            }).then(() => {
                cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            });
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create Allowance and assignment in customizing.', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0)
        })
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonKeys.ALLOWANCE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CommonLocators.CommonKeys.ESTIMATE_ALLOWANCE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateDataRecords_ForEstimateAllowanceType(cnt.uuid.DATA_RECORDS, EST_ALLOWANCE_CODE, EST_ALLOWANCE_DESCRIPTION, CONTAINERS_DATA_RECORDS.RIB_DEMO_DATA_CONTEXT, CONTAINERS_DATA_RECORDS.GA[0], CONTAINERS_DATA_RECORDS.AM[0], CONTAINERS_DATA_RECORDS.RP[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, EST_ALLOWANCE_DESCRIPTION)
        _common.select_activeRowInContainer(cnt.uuid.DATA_RECORDS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0)
        })
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CommonLocators.CommonKeys.ESTIMATE_ALLOWANCE_TYPE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateDataRecords_ForEstAllowanceAssignmentType(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.RIB_DEMO_DATA_CONTEXT, EST_ALLOWANCE_ASSIGNMENT_DESCRIPTION, EST_ALLOWANCE_CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it('TC - Create Project and an estimate header', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });
    it('TC - Create Line Item, and assign Resources to it.', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETER_1)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it('TC - Verify create standard allowance', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 2);
            _common.setup_gridLayout(cnt.uuid.STANDARD_ALLOWANCES, CONTAINER_COLUMNS_STANDARD_ALLOWANCE);
        });
        _common.create_newRecord(cnt.uuid.STANDARD_ALLOWANCES);
        _estimatePage.enterRecord_toStanderdAllowance(EST_ALLOWANCE_CODE, CONTAINERS_STANDARD_ALLOWANCE.QUANTITY_TYPE);
        _common.select_activeRowInContainer(cnt.uuid.STANDARD_ALLOWANCES)
        cy.SAVE();
        _common.assert_cellData_insideActiveRow(cnt.uuid.STANDARD_ALLOWANCES,app.GridCells.MARKUP_GA,"8.00")
        _common.assert_cellData_insideActiveRow(cnt.uuid.STANDARD_ALLOWANCES,app.GridCells.MARKUP_RP,"3.00")
        _common.assert_cellData_insideActiveRow(cnt.uuid.STANDARD_ALLOWANCES,app.GridCells.MARKUP_AM,"2.00")
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.STANDARD_ALLOWANCES, btn.ToolBar.ICO_RECALCULATE)
        _common.waitForLoaderToDisappear()

    });
    it('TC - Add Estimate Configuration', function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.IconButtons.ICO_SETTING_DOC)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER1)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER2)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER3)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER4)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER5)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER6)
        _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIG_PARAMETER7)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });
    it('TC - Verify Totals in Totals container For GA Percentage ', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 3);
        _common.setup_gridLayout(cnt.uuid.ESTIMATETOTALS, CONTAINER_COLUMNS_TOTALS);
        });
                _common.clear_subContainerFilter(cnt.uuid.ESTIMATETOTALS)
                _common.clickOn_toolbarButton(cnt.uuid.ESTIMATETOTALS, btn.ToolBar.ICO_RECALCULATE)
                _common.waitForLoaderToDisappear()
                _common.waitForLoaderToDisappear()
                _common.clickOn_toolbarButton(cnt.uuid.ESTIMATETOTALS, btn.ToolBar.ICO_TOTAL_GRAND)
                _common.waitForLoaderToDisappear()
                _common.maximizeContainer(cnt.uuid.ESTIMATETOTALS)
                cy.wait(1000).then(() => {
                    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATETOTALS, btn.ToolBar.ICO_TOTAL_GRAND)
                    _common.waitForLoaderToDisappear()
                    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATETOTALS, btn.ToolBar.ICO_TOTAL_GRAND)
                    _common.waitForLoaderToDisappear()
                    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION,commonLocators.CommonKeys.GA)
                    _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
                    _common.calculatePercentage_inContainer(cnt.uuid.ESTIMATETOTALS,"34.18","8.00",app.GridCells.TOTAL)
                    cy.REFRESH_CONTAINER()
                    _common.waitForLoaderToDisappear()
                    cy.REFRESH_CONTAINER()
                    _common.waitForLoaderToDisappear()
                  _common.minimizeContainer(cnt.uuid.ESTIMATETOTALS)
                });
    });
    it('TC - Verify Totals in Totals container For RA Percentage ', function () {
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 3);
            });
            _common.maximizeContainer(cnt.uuid.ESTIMATETOTALS)
            cy.wait(1000).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, commonLocators.CommonKeys.RP)
            cy.wait(1000)
            _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
            _common.calculatePercentage_inContainer(cnt.uuid.ESTIMATETOTALS,"3","34.18",app.GridCells.TOTAL)
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
    });
    });
    it('TC - Verify Totals in Totals container For AW Percentage ', function () {
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 3);
            });
            _common.maximizeContainer(cnt.uuid.ESTIMATETOTALS)
            cy.wait(1000).then(() => {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION,commonLocators.CommonKeys.AM)
            cy.wait(1000)
            _common.select_activeRowInContainer(cnt.uuid.ESTIMATETOTALS)
            _common.calculatePercentage_inContainer(cnt.uuid.ESTIMATETOTALS,"2.00","34.18",app.GridCells.TOTAL)
        
            _common.minimizeContainer(cnt.uuid.ESTIMATETOTALS)
            });
    });

    });