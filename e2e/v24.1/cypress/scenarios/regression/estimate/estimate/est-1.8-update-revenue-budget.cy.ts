import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const CREATE_CONTRACT_DESC = 'CON-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
const BID_DESCRIPTION = 'BID-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_LINE_ITEM
let DJC_BUDGET_PARAMETERS: DataCells
let MODAL_GENERATE_BUDGET;
let MODAL_CREATE_BID
let MODAL_GENERATE_UPDATE_BASE_COST
let GENERATE_UPDATE_BASE_COST_PARAMETERS: DataCells
let MODAL_UPDATE_REVENUE
let UPDATE_REVENUE_PARAMETERS: DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.8 | Update Revenue Budget");

describe("EST- 1.8 | Update Revenue Budget", () => {

    before(function () {
        cy.fixture("estimate/est-1.8-update-revenue-budget.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }

                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
                };
                RESOURCE_PARAMETERS_2 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
                };
                RESOURCE_PARAMETERS_3 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
                };

                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
                GENERATE_LINE_ITEMS_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
                }

                CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
                BOQ_PARAMETERS = {
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                }
                CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                BOQ_STRUCTURE_PARAMETERS = {
                    [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                    [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                    [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                }
                CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
                MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
                DJC_BUDGET_PARAMETERS = {
                    [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                    [commonLocators.CommonLabels.BUDGET_FROM]: MODAL_GENERATE_BUDGET.BUDGET_FROM,
                    [commonLocators.CommonLabels.X_FACTOR]: MODAL_GENERATE_BUDGET.X_FACTOR,
                    [commonLocators.CommonKeys.INDEX]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                    [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
                }

                MODAL_CREATE_BID = this.data.MODAL.CREATE_BID
                MODAL_GENERATE_UPDATE_BASE_COST = this.data.MODAL.GENERATE_UPDATE_BASE_COST
                GENERATE_UPDATE_BASE_COST_PARAMETERS = {
                    [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_GENERATE_UPDATE_BASE_COST.SELECT_ESTIMATE_SCOPE,
                    [commonLocators.CommonLabels.GENERATE_UPDATE_BASE_COST]: MODAL_GENERATE_UPDATE_BASE_COST.GENERATE_UPDATE_BASE_COST,
                    [commonLocators.CommonKeys.INDEX]: MODAL_GENERATE_UPDATE_BASE_COST.INDEX,
                    [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_GENERATE_UPDATE_BASE_COST.RADIO_INDEX
                }
                MODAL_UPDATE_REVENUE = this.data.MODAL.UPDATE_REVENUE
                UPDATE_REVENUE_PARAMETERS = {
                    [commonLocators.CommonLabels.UPDATE_REVENUE]: MODAL_UPDATE_REVENUE.UPDATE_REVENUE,
                    [commonLocators.CommonLabels.DISTRIBUTE_BY]: MODAL_UPDATE_REVENUE.DISTRIBUTE_BY,
                    [commonLocators.CommonKeys.INDEX]: MODAL_UPDATE_REVENUE.INDEX,
                    [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_UPDATE_REVENUE.RADIO_INDEX
                }

            }).then(() => {
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.setDefaultView(app.TabBar.PROJECT)
                    _common.waitForLoaderToDisappear()
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                });
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
                _common.waitForLoaderToDisappear()
            })
    })
    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new estimate record', function () {
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
    });

    it("TC - Generate boq line item", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.grandtotal, CONTAINER_COLUMNS_LINE_ITEM.budget, CONTAINER_COLUMNS_LINE_ITEM.revenue], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC)
    });

    it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newSubRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    });

    it("TC - Generate budget from DJC", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create bid and update bid status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _common.waitForLoaderToDisappear()
        _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESCRIPTION, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 2);
            _common.clear_subContainerFilter(cnt.uuid.BIDS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
        });
    });

    it("TC - Create contract and update contract status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _saleContractPage.create_contract_fromWizard(CREATE_CONTRACT_DESC);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 1);
            _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
        });
    });

    it("TC - Generate base cost", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.filterCurrentEstimate(cnt.uuid.ESTIMATE, commonLocators.CommonKeys.NO_FILTER)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_UPDATE_BASE_COST);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_updateBaseCost_fromWizard(GENERATE_UPDATE_BASE_COST_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_UPDATE_BASE_COST);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_updateBaseCost_fromWizard(GENERATE_UPDATE_BASE_COST_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
    });

    it("TC - Verify budget gets calculated based on grand total", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, " ")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.verify_BudgetForLineItem(cnt.uuid.ESTIMATE_LINEITEMS, MODAL_GENERATE_BUDGET.X_FACTOR)
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Verify Revenue gets updated based on the budget under the line items container", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, " ")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_REVENUE);
        _common.waitForLoaderToDisappear()
        _estimatePage.updateRevenue_fromWizard(UPDATE_REVENUE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_REVENUE);
        _common.waitForLoaderToDisappear()
        _estimatePage.updateRevenue_fromWizard(UPDATE_REVENUE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _validate.verify_updateRevenue(MODAL_UPDATE_REVENUE.DISTRIBUTE_BY, MODAL_GENERATE_BUDGET.X_FACTOR)
    });
});
