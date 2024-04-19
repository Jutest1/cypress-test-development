import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _modalView, _package, _validate } from "cypress/pages";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM_DESC_" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_2 = "LINE_ITEM_DESC_2" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells, LINE_ITEMS_PARAMETERS: DataCells, RESOURCE_PARAMETERS_COST1: DataCells, RESOURCE_PARAMETERS_MATERIAL1: DataCells, RESOURCE_PARAMETERS_COST2: DataCells, RESOURCE_PARAMETERS_MATERIAL2: DataCells, RESOURCE_PARAMETERS_SUBITEM2: DataCells, RESOURCE_PARAMETERS_SUB1: DataCells, RESOURCE_PARAMETERS_SUB2: DataCells, RESOURCE_PARAMETERS_SUBITEM1: DataCells, LINE_ITEMS_PARAMETERS1: DataCells, ESTIMATE_CONFIGURATION_PARAMETER: DataCells, DJC_BUDGET_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCE, CONTAINERS_ESTIMATE_CONFIGURATION, CONTAINERS_GENERATE_BUDGET;
let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.49 | Verifying Totals In Estimation");

describe('EST- 1.49 | Verifying Totals In Estimation', () => {
    before(function () {
        cy.fixture('estimate/est-1.49-Varifying-totals-in-estimation.json')
            .then((data) => {
                this.data = data
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: EST_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
                }
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
                LINE_ITEMS_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                }
                LINE_ITEMS_PARAMETERS1 = {
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_2,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                }
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE;
                RESOURCE_PARAMETERS_COST1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
                }
                RESOURCE_PARAMETERS_MATERIAL1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
                }
                RESOURCE_PARAMETERS_COST2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[3],
                }
                RESOURCE_PARAMETERS_MATERIAL2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[4],
                }
                RESOURCE_PARAMETERS_SUBITEM1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[2],
                }
                RESOURCE_PARAMETERS_SUB1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[2],
                };
                RESOURCE_PARAMETERS_SUBITEM2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[2],
                }
                RESOURCE_PARAMETERS_SUB2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY[1],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[5],
                }
                CONTAINERS_ESTIMATE_CONFIGURATION = this.data.MODAL.ESTIMATE_CONFIGURATION;
                ESTIMATE_CONFIGURATION_PARAMETER = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS],
                    [commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
                    [commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
                    [commonLocators.CommonLabels.TOTAL_CONFIGURE_DETAILS]: commonLocators.CommonKeys.EDIT,
                    [app.GridCells.EST_STRUCTURE]: commonLocators.CommonKeys.BOQS,
                    [app.GridCells.QUANTITY_REL]: commonLocators.CommonKeys.NO_RELATION,
                }
                CONTAINERS_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
                DJC_BUDGET_PARAMETERS = {
                    [commonLocators.CommonLabels.BUDGET_FROM]: CONTAINERS_GENERATE_BUDGET.BUDGET_FROM,
                    [commonLocators.CommonLabels.X_FACTOR]: CONTAINERS_GENERATE_BUDGET.X_FACTOR,
                    [commonLocators.CommonKeys.INDEX]: CONTAINERS_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                    [commonLocators.CommonKeys.RADIO_INDEX]: CONTAINERS_GENERATE_BUDGET.BUDGET_FROM_INDEX,
                };
            }).then(() => {
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'))
                _common.openDesktopTile(tile.DesktopTiles.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem()
            })
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new estimate record", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    })

    it("TC - Create new line item and Resource record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEMS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9)
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        })
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_SUBITEM1);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newSubRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_SUB1);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
    });

    it("TC - Verify Estimation Configuration Total ", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTAL, 1)
        });
        _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESC)
        _estimatePage.estimate_configuration_for_totals(CONTAINERS_ESTIMATE_CONFIGURATION.DEFAULTWIC, CONTAINERS_ESTIMATE_CONFIGURATION.TOTAL_LABLE1, CONTAINERS_ESTIMATE_CONFIGURATION.COST_CODE1, CONTAINERS_ESTIMATE_CONFIGURATION.TOTAL_LABLE2, CONTAINERS_ESTIMATE_CONFIGURATION.COST_CODE2)
    })

    it("TC - Verify Totals in Totals Container", function () {
        _estimatePage.verify_Totals_to_grand_total(CONTAINERS_ESTIMATE_CONFIGURATION.TOTAL_LABLE2, LINE_ITEM_DESC)
    })

    it("TC - Create Second new line item and resource record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 9)
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEMS_PARAMETERS1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST2)
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL2)
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_SUBITEM2);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newSubRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_SUB2);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
    });

    it("TC - Generate budget from wizard and verify budget field of line item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC)
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
    })

    it("TC - Verify all line item Grand total to Grand Totals in Totals Container", function () {
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _validate.verify_TotalsAndGrandTotalOfLineItems(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_TOTAL, CONTAINERS_ESTIMATE_CONFIGURATION.TOTAL_LABLE2, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL)
    })
});

