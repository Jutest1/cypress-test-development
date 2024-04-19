import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const OUTLINE1 = "OUTLINE-DESC-" + Cypress._.random(0, 999);
const OUTLINE2 = "OUTLINE-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const FINAL_PRICE_BP1 = 'FINAL_PRICE_BP1'
const FINAL_PRICE_BP2 = 'FINAL_PRICE_BP1'

let PROJECTS_PARAMETERS: DataCells,
    BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    REQUEST_FOR_QUOTE_PARAMETERS: DataCells,
    PRICE_COMPARISON_BOQ_PARAMETERS: DataCells,
    PRICE_COMPARISON_BOQ_PARAMETERS_1: DataCells

let CONTAINER_DATA_TYPE,
    CONTAINER_DATA_RECORDS,
    CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINER_QUOTE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINER_PRICE_COMPARISON

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.38 | Price comparison BoQ-Add item");

describe("PCM- 1.38 | Price comparison BoQ-Add item", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.38-price-comparison-BoQ-add-item.json").then((data) => {
            this.data = data
            CONTAINER_DATA_TYPE = this.data.CONTAINERS.DATA_TYPE
            CONTAINER_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINER_PRICE_COMPARISON = this.data.CONTAINERS.PRICE_COMPARISON
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            },
                REQUEST_FOR_QUOTE_PARAMETERS = {
                    [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINER_QUOTE.BUSINESS_PARTNER_1, CONTAINER_QUOTE.BUSINESS_PARTNER_2],
                }
            PRICE_COMPARISON_BOQ_PARAMETERS = {
                [app.GridCells.BOQ_LINE_TYPE]: CONTAINER_PRICE_COMPARISON.BOQ_LINE_TYPE,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINER_PRICE_COMPARISON.INDEX_0, //CONTAINER_PRICE_COMPARISON.BUSINESS_PARTNER_1,
                [commonLocators.CommonLabels.OUTLINE_SPECIFICATION]: OUTLINE1,
                [commonLocators.CommonLabels.UOM]: CONTAINER_PRICE_COMPARISON.UOM,
                [commonLocators.CommonKeys.BUTTON_HANDLE]: btn.ButtonText.ADD_TO_CURRENT_QUOTE
            }
            PRICE_COMPARISON_BOQ_PARAMETERS_1 = {
                [app.GridCells.BOQ_LINE_TYPE]: CONTAINER_PRICE_COMPARISON.BOQ_LINE_TYPE,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINER_PRICE_COMPARISON.INDEX_1,//CONTAINER_PRICE_COMPARISON.BUSINESS_PARTNER_2,
                [commonLocators.CommonLabels.OUTLINE_SPECIFICATION]: OUTLINE2,
                [commonLocators.CommonLabels.UOM]: CONTAINER_PRICE_COMPARISON.UOM,
                [commonLocators.CommonKeys.BUTTON_HANDLE]: btn.ButtonText.ADD_TO_CURRENT_QUOTE
            }
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
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
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    });
    
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Set Is For QUOTE satatus under customizing module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINER_DATA_TYPE.QUOTATION_STATUS)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINER_DATA_TYPE.QUOTATION_STATUS)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINER_DATA_RECORDS.CHECKED)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        cy.wait(2000)//required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
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
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new Estimate header record and Assembly generate Line item and Resources ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        cy.wait(1000) //required wait to load page
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
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
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BoQ package,requisition,RFQ,Quote and change Status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(2000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.BOQ, CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        cy.wait(2000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.clickOn_modalFooterButton("Go To Requisition")
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        cy.wait(1000) //required wait to load page
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.wait(1000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE)
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([CONTAINER_QUOTE.BUSINESS_PARTNER_1, CONTAINER_QUOTE.BUSINESS_PARTNER_2], ['check', 'check']);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify update the BoQ for each Quote", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
        });
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATED_UNIT_RATE_1)
        cy.SAVE().wait(1000) //required wait to load page
        _common.saveCellDataToEnv(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE_BP1)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_2)
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATED_UNIT_RATE_2)
        cy.SAVE().wait(1000) //required wait to load page
        _common.saveCellDataToEnv(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE_BP2)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS)
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED)
        cy.wait(1000) //required wait to load page
    })

    it("TC - Verify Add item in price comparison (BoQ)-1", function () {
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, sidebar.SideBarOptions.PRICE_COMPARISON)
        cy.wait(2000)//required wait to load page
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISONBOQ, app.FooterTab.PRICE_COMPARISONBOQ, 2);
        });
        cy.wait(2000)//required wait to load page
        _common.maximizeContainer(cnt.uuid.PRICE_COMPARISONBOQ)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _package.searchRecord_byColumnFilter(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.BOQ_LINE_TYPE, app.InputFields.DOMAIN_TYPE_TEXT, CONTAINER_PRICE_COMPARISON.BOQ_LINE_TYPE)
        cy.wait(2000)//required wait to load page
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _common.clickOn_cellHasValue(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.BOQ_LINE_TYPE, CONTAINER_PRICE_COMPARISON.BOQ_LINE_TYPE)
        _rfqPage.addItem_InPriceComparisonBoQ(PRICE_COMPARISON_BOQ_PARAMETERS)
        cy.wait(2000)//required wait to load page
        cy.REFRESH_CONTAINER()
    })

    it("TC - Verify Add item in price comparison (BoQ)-2", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE);
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        cy.wait(2000)//required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        cy.REFRESH_CONTAINER().wait(1000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.REFERENCE, CONTAINERS_BOQ_STRUCTURE.CELL_VALUE)
        //validating both assertions of to display all the info of item and by button add to current quote
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINE1)
    })

    it("TC - Verify Add item in price comparison (BoQ)-3", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, sidebar.SideBarOptions.PRICE_COMPARISON)
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISONBOQ, app.FooterTab.PRICE_COMPARISONBOQ, 3);
        });
        _common.maximizeContainer(cnt.uuid.PRICE_COMPARISONBOQ)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        cy.wait(2000) //required wait to load page
        _package.searchRecord_byColumnFilter(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.BOQ_LINE_TYPE, app.InputFields.DOMAIN_TYPE_TEXT, CONTAINER_PRICE_COMPARISON.BOQ_LINE_TYPE)
        cy.wait(1000)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, Buttons.ToolBar.ICO_TREE_EXPAND)
        _common.clickOn_cellHasValue(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.BOQ_LINE_TYPE, CONTAINER_PRICE_COMPARISON.BOQ_LINE_TYPE)
        _rfqPage.addItem_InPriceComparisonBoQ(PRICE_COMPARISON_BOQ_PARAMETERS_1)
        cy.wait(1000) //required wait to load page
    })

    it("TC - Verify Add item in price comparison (BoQ)-4", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE);
        //validation for 1st bidder
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        cy.wait(2000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        cy.REFRESH_CONTAINER().wait(2000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.REFERENCE, CONTAINERS_BOQ_STRUCTURE.CELL_VALUE_2)
        cy.wait(2000) //required wait to load page
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINE2)
        ///validation for 2nd bidder
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_2)
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        cy.REFRESH_CONTAINER()
        cy.wait(4000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.REFERENCE, CONTAINERS_BOQ_STRUCTURE.CELL_VALUE)
        cy.wait(2000) //required wait to load page
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINE2)
    })
})