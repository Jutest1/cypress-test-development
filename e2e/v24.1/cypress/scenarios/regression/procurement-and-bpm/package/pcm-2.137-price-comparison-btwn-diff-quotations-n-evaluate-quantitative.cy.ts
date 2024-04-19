import { commonLocators, tile, app, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _estimatePage, _package, _rfqPage, _salesPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "E-" + Cypress._.random(0, 999);
const EST_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = "TEST-PRJ-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEMS, CONTAINERS_RESOURCES, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEMS, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_QUOTE, CONTAINER_COLUMNS_ITEMS;

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells;

let MODAL_CREATE_RFQ, MODAL_CREATE_RFQ_PARAMETERS: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.137 | Create price comparison between different quotations and evaluate quantitative analysis of business partner in business evaluation chart");

describe("PCM- 2.137 | Create price comparison between different quotations and evaluate quantitative analysis of business partner in business evaluation chart", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.137-create-price-comparison-between-different-quotations-and-evaluate-quantitative-analysis-of-business-partner-in-business-evaluation-chart.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
            };
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS;
            CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS;
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEMS.UOM[0],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEMS.QUANTITY[0]
            };
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[0],
            };
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION,
                MODAL_CREATE_RFQ = this.data.MODAL.CREATE_RFQ
            MODAL_CREATE_RFQ_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_RFQ.BUSINESS_PARTNER[0], MODAL_CREATE_RFQ.BUSINESS_PARTNER[1]]
            }
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new Estimate header record and generate Line item and Resources", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.RESOURCES, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
    });

    it("TC - Create material package,requisition,RFQ,Quote and change Status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _package.changeStatus_ofPackage_inWizard()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE)
        _rfqPage.create_requestForQuote_fromWizard(MODAL_CREATE_RFQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS)
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE)
        _rfqPage.create_quote_fromWizard([MODAL_CREATE_RFQ.BUSINESS_PARTNER[0], MODAL_CREATE_RFQ.BUSINESS_PARTNER[1]], [CommonLocators.CommonKeys.CHECK, CommonLocators.CommonKeys.CHECK])
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    })

    it("TC - Assign price to items in Quotes and changes status of quotes", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_ITEMS)
            _common.set_columnAtTop( [CONTAINER_COLUMNS_ITEMS.total, CONTAINER_COLUMNS_ITEMS.price], cnt.uuid.QUOTES_ITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, MODAL_CREATE_RFQ.BUSINESS_PARTNER[0])
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_PRICE[0])
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.saveCellDataToEnv(cnt.uuid.QUOTES_ITEMS, app.GridCells.TOTAL, "BP1TOTAL")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, MODAL_CREATE_RFQ.BUSINESS_PARTNER[1])
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_PRICE[1])
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.saveCellDataToEnv(cnt.uuid.QUOTES_ITEMS, app.GridCells.TOTAL, "BP2TOTAL")
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS)
        _common.changeStatus_ofMultipleRecord_fromModal(CommonLocators.CommonKeys.CHECKED)
    })

    it("TC - Navigate to price comparison and create contract,change status", function () {
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, sidebar.SideBarOptions.PRICE_COMPARISON)
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1, app.FooterTab.PRICE_COMPARISONBOQ, 1);
        });
        _common.maximizeContainer(cnt.uuid.PRICE_COMPARISON_V1)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISON_V1, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_COMPARISON_V1, app.GridCells.COMPARE_DESCRIPTION, CommonLocators.CommonLabels.GRAND_TOTAL)
        _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISON_V1, CommonLocators.CommonElements.STYLE_RED, (parseFloat(Cypress.env("BP2TOTAL")).toFixed(2)).toString())
        _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISON_V1, CommonLocators.CommonElements.STYLE_GREEN,(parseFloat(Cypress.env("BP1TOTAL")).toFixed(2)).toString())
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_COMPARISON_V1, app.GridCells.COMPARE_DESCRIPTION, CommonLocators.CommonKeys.PRICE)
        _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISON_V1, CommonLocators.CommonElements.STYLE_RED, CONTAINERS_ITEMS.UPDATED_PRICE[1])
        _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISON_V1, CommonLocators.CommonElements.STYLE_GREEN, CONTAINERS_ITEMS.UPDATED_PRICE[0])
    })
    
})
