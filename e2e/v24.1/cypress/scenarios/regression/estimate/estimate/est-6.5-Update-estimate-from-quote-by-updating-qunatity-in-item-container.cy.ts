import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _boqPage, _projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";



import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);

let CREATE_PROJECT_PARAMETERS: DataCells
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_REQUISITION
let REQUEST_FOR_QUOTE_PARAMETERS: DataCells;
let MODAL_QUOTE
let CONTAINER_COLUMNS_PACKAGE
let MODAL_UPDATE_ESTIMATE
let UPDATE_ESTIMATE_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 6.5 |  Update the estimate from the Quote module by updating qunatity in item container");

describe("EST- 6.5 | Update the estimate from the Quote module by updating qunatity in item container", () => {
    before(function () {
        cy.fixture("estimate/est-6.5-Update-estimate-from-quote-by-updating-quantity-in-item-container.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            MODAL_UPDATE_ESTIMATE = this.data.MODAL.UPDATE_ESTIMATE
            MODAL_QUOTE = this.data.MODAL.QUOTE
            MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD

            CREATE_PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
            REQUEST_FOR_QUOTE_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_QUOTE.BUSINESS_PARTNER[0], MODAL_QUOTE.BUSINESS_PARTNER[1]],
            }
            UPDATE_ESTIMATE_PARAMETER = {
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
            }
            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Project", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(CREATE_PROJECT_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
    });

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

    it("TC - Create line item and add resource", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create a Material Package', function () {
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.create_materialPackage_Consolidatedchkbox(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.SCOPE_ID, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE, CONTAINERS_RESOURCE.CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create requisition from Package', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    });

    it('TC - Create Request For Quote from wizard and change status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create Quote and update qunatity in item container', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([MODAL_QUOTE.BUSINESS_PARTNER[0], MODAL_QUOTE.BUSINESS_PARTNER[1]], ['check', 'check']);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, MODAL_UPDATE_ESTIMATE.UNIT_RATE_UPDATED)
        _common.set_cellCheckboxValue(cnt.uuid.QUOTES_ITEMS, app.GridCells.IS_FREE_QUANTITY, commonLocators.CommonKeys.CHECK)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, MODAL_UPDATE_ESTIMATE.UPDATED_QUANTITY[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.openModalContainerByDownArrow();
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // required wait to load page
        _modalView.findModal().acceptButton(btn.ButtonText.OK);
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // required wait to load page
    })

    it("TC - Verify resource generated prc is checked, cost total, comment ,quantity gets updated as per item in quote", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.wait(500).then(() => { //required wait to load page
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.RESOURCES, MODAL_UPDATE_ESTIMATE.UNIT_RATE_UPDATED, MODAL_UPDATE_ESTIMATE.UPDATED_QUANTITY[0], app.GridCells.COST_TOTAL)
            _common.assert_cellDataByContent_inContainer(cnt.uuid.RESOURCES, app.GridCells.COMMENT_TEXT, MODAL_UPDATE_ESTIMATE.COMMENT_TEXT)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_GENERATED_PRC, commonLocators.CommonKeys.CHECKED)
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, MODAL_UPDATE_ESTIMATE.UPDATED_QUANTITY[0])
        })
    })
})