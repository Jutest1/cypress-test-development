import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";
import CommonLocators from "cypress/locators/common-locators";
const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = "COUNTUNIT-" + Cypress._.random(0, 999);
const INVOICE_NO = "INVOICE_NO-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_PACKAGE
let CONTAINER_COLUMNS_ITEMS
let CONTAINERS_PES

let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells
let CONTAINER_COLUMNS_PESITEM

let QUOTE;
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTES_ITEM
let CONTAINER_COLUMNS_CONTRACT
let CONTRACT_PARAMETERS: DataCells;
let REQUEST_FOR_QUOTE_PARAMETERS: DataCells;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.202 | Record performance for Items (Materials)");

describe("PCM- 2.202 | Record performance for Items (Materials)", () => {

    beforeEach(function () {
        cy.fixture("pcm/pcm-2.202-record-performance-for-items-material.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName"));
        cy.fixture("pcm/pcm-2.202-record-performance-for-items-material.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            QUOTE = this.data.CONTAINERS.QUOTE
            CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
            CONTAINER_COLUMNS_QUOTES_ITEM = this.data.CONTAINER_COLUMNS.QUOTES_ITEM
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            };
            MATERIAL_RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,

            }
            CONTRACT_PARAMETERS = {
                [app.GridCells.BUSINESS_PARTNER_FK_SMALL]: QUOTE.BUSINESS_PARTNER_2,
                [app.GridCells.PROJECT_FK]: PRJ_NO,
            }
            REQUEST_FOR_QUOTE_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [QUOTE.BUSINESS_PARTNER_1, QUOTE.BUSINESS_PARTNER_2],
            }
            CONTAINERS_PES = this.data.CONTAINERS.PES
            CONTAINER_COLUMNS_PESITEM = this.data.CONTAINER_COLUMNS.PESITEM

            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
               _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CU_CODE")
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

    });
    it("TC - Create new Estimate having line item ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

    });

    it("TC - Add Resource for selected line item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required waits
    });
    it("TC - Create Material Package from Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

        })
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        cy.SAVE();

        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.STRUCTURE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, "M")
        cy.SAVE();
        cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear();
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required waits
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
        cy.SAVE();
    });
    it("TC - Create Requisition from Package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        cy.wait(1000)//required waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required waits
    });
    it("TC - Create RfQ from Requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create Quote for multiple suppliers from RfQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([QUOTE.BUSINESS_PARTNER_1, QUOTE.BUSINESS_PARTNER_2], ['check', 'check']);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Quote the Prices for the supliers in Quote's items Container", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES);
        });
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_2);
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.PACKAGEITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTES_ITEM);
        });
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, QUOTE.PRICE_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_1);
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, QUOTE.PRICE_2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Change Status Of Quote", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
        });
        _common.select_allContainerData(cnt.uuid.QUOTES);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_2);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_1);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
    });

    it("TC - verify price comparision and goto contract", function () {
        _common.maximizeContainer(cnt.uuid.QUOTES);
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, 'Price Comparison(1)');
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1, app.FooterTab.PRICE_COMPARISON_ITEM, 2);
        });
        _common.maximizeContainer(cnt.uuid.PRICE_COMPARISON_V1);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _saleContractPage.create_contractInPriceComparison_fromWizard(CONTRACT_PARAMETERS);
        _common.waitForLoaderToDisappear()
    });
    it("TC - Verify Contract and Item ", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT);
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CU_CODE"))
        cy.SAVE()
        cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);

        });
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.getTextfromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.GridCells.QUANTITY_REMAINING)
        cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED)
    })
    it("TC- Create PES from contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _procurementPage.getCode_fromPESModal("PES_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PESITEM)
            _common.waitForLoaderToDisappear()
            cy.wait(1000)//required waits
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
        })
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.assert_forNumericValues(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, CONTAINERS_PES.QUANTITY_1)
        _common.assert_forNumericValues(cnt.uuid.ITEMS, app.GridCells.QUANTITY_CONTRACTED, Cypress.env("Text"))
        _common.assert_forNumericValues(cnt.uuid.ITEMS, app.GridCells.QUANTITY_REMAINING, Cypress.env("gridcell_2_Text"))

    })
    it("TC- Add Quantity in PES item and verify remaining quantity", function () {
        _common.minimizeContainer(cnt.uuid.ITEMS)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
        });
        _package.verify_remainingQtyFromPESItems(CONTAINERS_PES.QUANTITY)

    })

})
