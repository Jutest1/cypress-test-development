import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _estimatePage, _package, _materialPage, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ1-2.248" + Cypress._.random(0, 999);
const PRJ_NAME = "PR_PCM-2.248-" + Cypress._.random(0, 9999);
const EST_CODE_1 = "1" + Cypress._.random(0, 999);
const EST_DESC_1 = "EST-DESC1-" + Cypress._.random(0, 999);
const EST_CODE_2 = "2" + Cypress._.random(0, 999);
const EST_DESC_2 = "EST-DESC2-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_1 = "LINE_01-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_2 = "LINE_02-" + Cypress._.random(0, 999);
const PRJ_NO_2 = "PRJ2-2.248" + Cypress._.random(0, 999);
const PRJ_NAME_2 = "PR_PCM-2.248-" + Cypress._.random(0, 9999);
const CONTRACT_CODE = "CONT_01"

let CONTAINERS_ESTIMATE, CONTAINERS_PROJECT, CONTAINERS_RESOURCES, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_ITEMS, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_QUOTES, CONTAINER_COLUMNS_MATERIAL_RECORDS;

let PROJECTS_PARAMETERS_1: DataCells, ESTIMATE_PARAMETERS_1: DataCells, LINE_ITEM_PARAMETERS_1: DataCells, RESOURCE_PARAMETER_1: DataCells, RFQ_PARAMETER: DataCells, PROJECTS_PARAMETERS_2: DataCells, ESTIMATE_PARAMETERS_2: DataCells, LINE_ITEM_PARAMETERS_2: DataCells, RESOURCE_PARAMETER_2: DataCells;

let MODAL_CREATE_RFQ, MODAL_UPDATE_ITEM_PRICE;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.248 | Update item price at quotation level from wizard");

describe("PCM- 2.248 | Update item price  at quotation level from wizard", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.248-update-material-at-quotation-level-from-wizard.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            PROJECTS_PARAMETERS_1 = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS_1 = {
                [app.GridCells.CODE]: EST_CODE_1,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC_1,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_1,
            };
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
            CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES;
            RESOURCE_PARAMETER_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[0]
            };
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            MODAL_CREATE_RFQ = this.data.MODAL.CREATE_RFQ;
            RFQ_PARAMETER = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_RFQ.BUSINESS_PARTNER]
            }
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            PROJECTS_PARAMETERS_2 = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO_2,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME_2,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            ESTIMATE_PARAMETERS_2 = {
                [app.GridCells.CODE]: EST_CODE_2,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC_2,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            LINE_ITEM_PARAMETERS_2 = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC_2,
            };
            RESOURCE_PARAMETER_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCES.CODE[0]
            };
            MODAL_UPDATE_ITEM_PRICE = this.data.MODAL.UPDATE_ITEM_PRICE
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Project", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_1);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    });

    it("TC - Create New Estimate Record", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_1);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    });

    it("TC- Create new Line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1)
        cy.SAVE();
    });

    it("TC- Assign material resource to line item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_1)
        cy.SAVE();
    });

    it("TC- Verify Create/update material Package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInSubContainer(cnt.uuid.PACKAGE)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.STRUCTURE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CommonLocators.CommonKeys.MATERIAL)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _materialPage.clickOn_modalButtons(commonLocators.CommonKeys.CHANGE_STRUCTURE, btn.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEMS)
        })
        _package.changeStatus_ofPackage_inWizard()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create requisition from material package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    });

    it('TC - Create Request For Quote from wizard and change status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETER);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.select_rowInSubContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
    });

    it("TC - Create Quote from RfQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([MODAL_CREATE_RFQ.BUSINESS_PARTNER]);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE);
        cy.SAVE();
    });

    it("TC - Quote the Prices for the suplier in Quote's items Container", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.setDefaultView(app.TabBar.QUOTES)
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES)
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, "QUOTE_001")
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_ITEMS)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_MATERIAL_PRICE[0])
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_MATERIAL_QUANTITY[0])
        cy.SAVE().wait(3000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.CHECKED);
        cy.SAVE();
    });

    it("TC - Verify Create Contract from Quote and change contract status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        cy.wait(3000)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, CONTRACT_CODE)
        cy.wait(2000)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
        cy.SAVE();
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ITEMS.quantity, CONTAINER_COLUMNS_ITEMS.price], cnt.uuid.ITEMSCONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.select_rowInSubContainer(cnt.uuid.ITEMSCONTRACT)
        _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_MATERIAL_QUANTITY[1])
        _common.select_rowInSubContainer(cnt.uuid.ITEMSCONTRACT)
        _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_MATERIAL_PRICE[1])
        cy.SAVE();
    });

    it("TC - Create Project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_2);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME_2).pinnedItem();
    });

    it("TC - Create New Estimate Record", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NAME_2)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_2);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    });

    it("TC- Create new Line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_2)
        cy.SAVE();
    });

    it("TC- Assign material resource to line item", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_2)
        cy.SAVE();
    });

    it("TC- Verify Create/update material Package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CommonLocators.CommonKeys.MATERIAL)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _materialPage.clickOn_modalButtons(CommonLocators.CommonKeys.CHANGE_STRUCTURE, btn.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEMS)
        })
        _package.changeStatus_ofPackage_inWizard()
    });

    it('TC - Create requisition from material package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    });

    it('TC - Create Request For Quote from wizard and change status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETER);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.select_rowInSubContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
    });

    it("TC - Create Quote from RfQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([MODAL_CREATE_RFQ.BUSINESS_PARTNER]);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE);
        cy.SAVE();
    });

    it("TC - Quote the Prices for the suplier in Quote's items Container", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.setDefaultView(app.TabBar.QUOTES)
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.select_rowInContainer(cnt.uuid.QUOTES)
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, "QUOTE_002")
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_ITEMS)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UPDATED_MATERIAL_PRICE[1])
        cy.SAVE();
    })

    it("TC- Verify update material wizard option", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_MATERIAL);
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.goToModule_inActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.ITEM_NO, btn.ButtonText.GO_TO_MATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.LIST_PRICE, CONTAINERS_ITEMS.UPDATED_MATERIAL_PRICE[1])
    })

    it("TC- Verify Item has no material will pop correct hint", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.select_rowInContainer(cnt.uuid.QUOTES)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
        _common.create_newRecord(cnt.uuid.QUOTES_ITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.QUOTES_ITEMS, app.GridCells.BAS_UOM_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.UOM[0])
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE);
        _validate.verify_radioButtonText_inModal()
        _common.findRadio_byLabel_fromModal(CommonLocators.CommonKeys.SELECTED_ITEMS, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonKeys.RADIO)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _validate.verify_WizardMessage("Item(s) have no material!")
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_ITEMS, app.GridCells.BAS_UOM_FK, CONTAINERS_ITEMS.UOM[0])
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.delete_recordFromContainer(cnt.uuid.QUOTES_ITEMS)
        cy.SAVE()
    })

    it('TC- Verify update item price wizard option,', function () {
        _common.select_rowInSubContainer(cnt.uuid.QUOTES_ITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE);
        _package.doUpdate_Item_price_wizardOption(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], MODAL_UPDATE_ITEM_PRICE.UPDATE_FROM, MODAL_UPDATE_ITEM_PRICE.CHECK_BOXES_TO_CHECK, Cypress.env(CONTRACT_CODE))
        cy.SAVE()
    })

    it("TC- Verify prices in requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO_2)
        _common.select_rowInSubContainer(cnt.uuid.REQUISITIONITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE);
        _package.doUpdate_Item_price_wizardOption(MODAL_UPDATE_ITEM_PRICE.SCOPE[0], MODAL_UPDATE_ITEM_PRICE.UPDATE_FROM, MODAL_UPDATE_ITEM_PRICE.CHECK_BOXES_TO_CHECK, Cypress.env(CONTRACT_CODE))
        _common.select_rowInSubContainer(cnt.uuid.REQUISITIONITEMS)
        _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_SMALL, CONTAINERS_ITEMS.UPDATED_MATERIAL_PRICE[1])
    })

})