import { version } from "chai";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const VERSION_2 = 'VERSION_2'
const VERSION = 'VERSION'
const SUPPLIER_NO = 'SUPPLIER_NO'
const CODE2 = 'CODE2'
const CODE1 = 'CODE1'

let PROJECTS_PARAMETERS: DataCells,
    BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    REQUEST_FOR_QUOTE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINER_QUOTE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINER_COLUMNS_SIMPLE_COMPARISON

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.40 | Price comparison BoQ-Create new Version");
describe("PCM- 1.40 | Price comparison BoQ-Create new Version", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-1.40-price-comparison-BoQ-create-new-version.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.fixture("pcm/pcm-1.40-price-comparison-BoQ-create-new-version.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_SIMPLE_COMPARISON = this.data.CONTAINER_COLUMNS.SIMPLE_COMPARISON
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
                [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            }
            REQUEST_FOR_QUOTE_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINER_QUOTE.BUSINESS_PARTNER_1, CONTAINER_QUOTE.BUSINESS_PARTNER_2],
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
        _common.waitForLoaderToDisappear()
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
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
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
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.openTab(app.TabBar.PACKAGE).then(function () {
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

    it("TC - Verify increase quote version-1", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
            cy.wait(1000)//required wait to load page
            _common.set_columnAtTop([CONTAINER_COLUMNS_QUOTE.supplierfk], cnt.uuid.QUOTES)
        });
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, VERSION)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.INCREASE_QUOTE_VERSION)
        cy.wait(3000)//required wait to load page
    })

    it("TC - Verify increase quote version-2", function () {
        cy.wait(1000).then(() => {//required wait to load page
            _validate.verify_isVersionIncreased(Cypress.env(VERSION), cnt.uuid.QUOTES)
            _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, VERSION_2)
        })
    })

    it("TC - Verify Supplier of two records-1", function () {
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, CODE2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, Cypress.env(VERSION))
    })

    it("TC - Verify Supplier of two records-2", function () {
        _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.SUPPLIER_FK, SUPPLIER_NO)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env(CODE2))
    })

    it("TC - Verify Supplier of two records-3", function () {
        cy.wait(1000).then(() => {//required wait to load page
            _common.assert_cellData(cnt.uuid.QUOTES, app.GridCells.SUPPLIER_FK, Cypress.env(SUPPLIER_NO))
        })
    })

    it("TC - Verify Quote code should not be equal", function () {
        cy.wait(1000).then(() => {//required wait to load page
            _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, Cypress.env(VERSION))
            _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env(CODE2))
            _common.saveCellDataToEnv(cnt.uuid.QUOTES, app.GridCells.CODE, CODE1)
        })
    })

    it("TC - Verify all data in quote in ", function () {
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, sidebar.SideBarOptions.PRICE_COMPARISON)
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SIMPLE_COMPARISON, app.FooterTab.SIMPLE_COMPARISON, 1);
            _common.setup_gridLayout(cnt.uuid.SIMPLE_COMPARISON, CONTAINER_COLUMNS_SIMPLE_COMPARISON)
        });
        cy.wait(2000)//required wait to load page
        _common.search_inSubContainer(cnt.uuid.SIMPLE_COMPARISON, Cypress.env(CODE1))
        cy.wait(1000)//required wait to load page
        _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.QTN_VERSION, Cypress.env(VERSION))
        _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.BP_NAME_1, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
        _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.SUPPLIER_CODE, Cypress.env(SUPPLIER_NO))
        //verifying second record in simple comparison container
        _common.clear_subContainerFilter(cnt.uuid.SIMPLE_COMPARISON)
        _common.search_inSubContainer(cnt.uuid.SIMPLE_COMPARISON, Cypress.env(CODE2))
        cy.wait(1000)//required wait to load page
        _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.QTN_VERSION, Cypress.env(VERSION_2))
        _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.BP_NAME_1, CONTAINER_QUOTE.BUSINESS_PARTNER_1)
        _common.assert_cellData(cnt.uuid.SIMPLE_COMPARISON, app.GridCells.SUPPLIER_CODE, Cypress.env(SUPPLIER_NO))
    })
})
