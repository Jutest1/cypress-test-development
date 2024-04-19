import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _projectPage, _rfqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "TEST-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

let PROJECTS_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    LINE_ITEM_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    REQUEST_FOR_QUOTE_PARAMETERS: DataCells


let CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINERS_LINE_ITEM,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINER_QUOTE,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINER_COLUMNS_SIMPLE_COMPARISON

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.120 | Compare versions and suppliers")
describe("PCM- 2.120 | Compare versions and suppliers", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.120-compare-versions-and-suppliers.json").then((data) => {
            this.data = data
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINER_COLUMNS_SIMPLE_COMPARISON = this.data.CONTAINER_COLUMNS.SIMPLE_COMPARISON
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }


            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            };
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            }
            REQUEST_FOR_QUOTE_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINER_QUOTE.BUSINESS_PARTNER_1],
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    });
    
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create estimate header", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.select_rowInContainer(cnt.uuid.PROJECTS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        cy.wait(2000) //Required wait to load page
    })

    it("TC - Create new line item record", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it('TC - Assign resource to the line item', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it('TC - Create material package,requisition,RFQ,Quote and change Status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        cy.wait(20000)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _package.changeStatus_ofPackage_inWizard()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _modalView.findModal().acceptButton(Buttons.ButtonText.GO_TO_REQUISITION)
        cy.wait(1000)
        _common.openTab(app.TabBar.MAIN).then(() => {
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        cy.wait(1000)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE)
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([CONTAINER_QUOTE.BUSINESS_PARTNER_1], ['check']);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.setDefaultView(app.TabBar.QUOTES)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2);
        });
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_QUOTE.ITEM_PRICE)
        cy.SAVE().wait(2000)
    });

    it("TC - Verify increase quote version-1", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
            cy.wait(1000)
            _common.set_columnAtTop([CONTAINER_COLUMNS_QUOTE.supplierfk], cnt.uuid.QUOTES)
        });
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, "VERSION")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.INCREASE_QUOTE_VERSION)
        cy.wait(3000)
    })

    it("TC - Verify increase quote version-2", function () {
        _validate.verify_isVersionIncreased(Cypress.env("VERSION"), cnt.uuid.QUOTES)
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, CONTAINER_QUOTE.ITEM_PRICE)
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, "VERSION2")
    })

    it("TC - Verify Supplier of two records-1", function () {
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, "CODE2")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, Cypress.env("VERSION"))
    })

    it("TC - Verify Supplier of two records-2", function () {
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.SUPPLIER_FK, "SUPPLIERNO")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env("CODE2"))
    })

    it("TC - Verify Supplier of two records-3", function () {
        _common.assert_cellData(cnt.uuid.QUOTES, app.GridCells.SUPPLIER_FK, Cypress.env("SUPPLIERNO"))
    })

    it("TC - Verify Quote code should not be equal", function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, Cypress.env("VERSION"))
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env("CODE2"))
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, "CODE1")
    })

    it("TC - Verify all data of quote in simple comparison container", function () {
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, commonLocators.CommonKeys.PRICE_COMPARISON_1)
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SIMPLE_COMPARISON, app.FooterTab.SIMPLE_COMPARISON, 1);
            _common.setup_gridLayout(cnt.uuid.SIMPLE_COMPARISON, CONTAINER_COLUMNS_SIMPLE_COMPARISON)
            cy.wait(2000)
            _common.search_inSubContainer(cnt.uuid.SIMPLE_COMPARISON, Cypress.env("CODE1"))
            cy.wait(1000)
            _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.QTN_VERSION, Cypress.env("VERSION"))
            _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.BP_NAME_1_SMALL, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
            _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.SUPPLIER_CODE, Cypress.env("SUPPLIERNO"))
            //verifying second record in simple comparison container
            _common.search_inSubContainer(cnt.uuid.SIMPLE_COMPARISON, Cypress.env("CODE2"))
            cy.wait(1000)
            _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.QTN_VERSION, Cypress.env("VERSION2"))
            _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.BP_NAME_1_SMALL, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
            _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.SUPPLIER_CODE, Cypress.env("SUPPLIERNO"))
        })
    });
})