import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _validate, _rfqPage, _saleContractPage, _procurementPage, _salesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const FINAL_PRICE = 'FINAL_PRICE'

let BOQ_PARAMETERS: DataCells,
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
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_QUOTE,
    CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE,
    MODAL_UPDATE_BOQ_PACKAGE_1,
    MODAL_UPDATE_BOQ_PACKAGE_2,
    CONTAINER_COLUMNS_TOTALS,
    CONTAINER_TOTALS

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.26 | Update package (BoQ) quantities & price of existing item/s from quote ");

describe("PCM- 1.26 | Update package (BoQ) quantities & price of existing item/s from quote ", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.26-update-package-BoQ-quantities-and-price-of-existing-items-from-quote.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE
            CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
            MODAL_UPDATE_BOQ_PACKAGE_1 = this.data.MODAL.UPDATE_BOQ_PACKAGE_1
            MODAL_UPDATE_BOQ_PACKAGE_2 = this.data.MODAL.UPDATE_BOQ_PACKAGE_2
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
            CONTAINER_TOTALS = this.data.CONTAINERS.TOTALS
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
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINER_QUOTE.BUSINESS_PARTNER],
            }
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
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

    it('TC - Create new estimate header', function () {
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
    });

    it('TC - Genrate line item and assign resource to it', function () {
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

    it("TC - Create boq package from wizards option", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(2000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard("BoQ", CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.setDefaultView(app.TabBar.BOQBASED)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    })

    it('TC - Create requisistion by wizard', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.clickOn_modalFooterButton("Go To Requisition")
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
            _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        cy.wait(1000) //required wait to load page
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.wait(1000) //required wait to load page
    });

    it('TC - Verify create Requisition for Quote and Quote', function () {
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
        _rfqPage.create_quote_fromWizard([CONTAINER_QUOTE.BUSINESS_PARTNER], ['check']);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait to load page
    })

    it('TC - Verify Update existing BoQ Structure Item in Quote', function () {

        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUOTE_BOQ_QUANTITY)
        cy.SAVE()
        cy.wait(1000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PACKAGE_BOQ)
        _package.updatePackageBoQ_FromWizard(MODAL_UPDATE_BOQ_PACKAGE_1)
        cy.wait(2000) //required wait to load page
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUOTE_BOQ_UNIT_RATE)
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PACKAGE_BOQ)
        _package.updatePackageBoQ_FromWizard(MODAL_UPDATE_BOQ_PACKAGE_2)
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, CONTAINER_PACKAGE.GOTO)
        cy.wait(3000)  //required wait to load page
        _common.openTab(app.TabBar.BOQBASED).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 7);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
            cy.wait(2000)  //required wait to load page
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUOTE_BOQ_QUANTITY)
            cy.wait(1000)  //required wait to load page
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, CONTAINERS_BOQ_STRUCTURE.QUOTE_BOQ_UNIT_RATE)
            _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BOQ_STRUCTURE, CONTAINERS_BOQ_STRUCTURE.QUOTE_BOQ_QUANTITY, CONTAINERS_BOQ_STRUCTURE.QUOTE_BOQ_UNIT_RATE, app.GridCells.FINAL_PRICE_SMALL)
            _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE)
        });
    })

    it('TC - Verify updated BoQ Structure Item in Package', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 4);
            _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_TOTALS)
            cy.wait(1000) //required wait to load page
            _common.clickOn_cellHasUniqueValue(cnt.uuid.TOTALS, app.GridCells.TRANSLATED, CONTAINER_TOTALS.CELL_VALUE, PACKAGE_TOTAL_TRANSLATION)
            _common.assert_cellData_insideActiveRow(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env(FINAL_PRICE))
        });
    })
})