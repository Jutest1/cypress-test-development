import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const FINALPRICEBP1 = "FINALPRICEBP1"
const FINALPRICEBP2 = "FINALPRICEBP2"

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    RFQ_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINERS_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_RESOURCE,
    CONTAINERS_BIDDER,
    CONTAINER_COLUMNS_RFQ,
    CONTAINERS_QUOTE,
    CONTAINERS_PRICE_COMPARISON,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINER_COLUMNS_PRICE_COMPARISON,
    CONTAINER_COLUMNS_BIDDER,
    CONTAINER_COLUMNS_REQUISITION_BOQ_STRUCTURE,
    CONTAINERS_REQUISITION_BOQ_STRUCTURE


allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 1.70 | Price comparison BoQ-Check compare fields (Check vertical and horizontal compare)");
describe("PCM- 1.70 | Price comparison BoQ-Check compare fields (Check vertical and horizontal compare)", () => {

    before(function () {
        cy.fixture("pcm/pcm-1.70-price-comparison-boq-check compare fields-check-vertical-and-horizontal-compare.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER;
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINERS_QUOTE = this.data.CONTAINERS.QUOTE
            CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
            CONTAINER_COLUMNS_BIDDER = this.data.CONTAINER_COLUMNS.BIDDER
            CONTAINER_COLUMNS_REQUISITION_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.REQUISITION_BOQ_STRUCTURE
            CONTAINERS_REQUISITION_BOQ_STRUCTURE = this.data.CONTAINERS.REQUISITION_BOQ_STRUCTURE;
            CONTAINERS_PRICE_COMPARISON = this.data.CONTAINERS.PRICE_COMPARISON;
            CONTAINER_COLUMNS_PRICE_COMPARISON = this.data.CONTAINER_COLUMNS.PRICE_COMPARISON
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
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
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            }
            RFQ_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_QUOTE.BUSINESS_PARTNER_1,CONTAINERS_QUOTE.BUSINESS_PARTNER_2]
            };

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new BoQ record", function () {
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
        _boqPage.get_BoQsFinalPrice()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    });

    it("TC - Create new Estimate header record ", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        cy.wait(1000) //required wait to load page
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    })

    it("TC- Generate Line item from BoQ and add resource", function () {
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
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create BoQ package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(1000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINERS_PACKAGE.BOQ, CONTAINERS_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_PACKAGE.GROUPING_STRUCTURE, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        cy.wait(2000) //required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    })

    it("TC- Create Requisiton", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear();
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
        cy.wait(1000) //required wait to load page
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    })

    it("TC- Create rfq", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE)
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETERS);
        _common.waitForLoaderToDisappear();
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear();

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_quote_fromWizard([CONTAINERS_QUOTE.BUSINESS_PARTNER_1, CONTAINERS_QUOTE.BUSINESS_PARTNER_2], [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    })

    it("TC - Verify update the BoQ for each Quote", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES);
            _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        });
        _common.select_rowHasValue(cnt.uuid.QUOTES, CONTAINERS_QUOTE.BUSINESS_PARTNER_1)
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATED_UR_1)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINALPRICEBP1)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_QUOTE.BUSINESS_PARTNER_2)
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATED_UR_2)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINALPRICEBP2)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        });
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify the Price comparison for each Business Partner associated to Quote", function () {
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.QUOTES, commonLocators.CommonKeys.PRICE_COMPARISON_1)
        _common.openTab(app.TabBar.PRICE_COMPARISON_BOQ).then(() => {
            _common.setDefaultView(app.TabBar.PRICE_COMPARISON_BOQ)
            _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISONBOQ, app.FooterTab.PRICE_COMPARISONBOQ, 1);
        });
        _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISONBOQ, commonLocators.CommonElements.STYLE_RED, Cypress.env(FINALPRICEBP1))
        _validate.verify_isTotalsInPriceComparisonEqualToFinalPrice(cnt.uuid.PRICE_COMPARISONBOQ, commonLocators.CommonElements.STYLE_GREEN, Cypress.env(FINALPRICEBP2))
    })

    it("TC - Verify the Horizontal and Vertical Price comparison column", function () {
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, btn.IconButtons.ICO_SETTING_DOC)
        _validate.verify_compareConfigDialog_forHorizontalComparison([CONTAINERS_PRICE_COMPARISON.FIELDNAME_1, CONTAINERS_PRICE_COMPARISON.FIELDNAME_2])
        cy.REFRESH_CONTAINER()
        _validate.verify_cloumnHeaderInContainer(cnt.uuid.PRICE_COMPARISONBOQ, [CONTAINERS_PRICE_COMPARISON.FIELDNAME_1, CONTAINERS_PRICE_COMPARISON.FIELDNAME_2])

        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, btn.IconButtons.ICO_SETTING_DOC)
        _validate.verify_compareConfigDialog_forVerticalComparison([CONTAINERS_PRICE_COMPARISON.FIELDNAME_1, CONTAINERS_PRICE_COMPARISON.FIELDNAME_2])
        cy.REFRESH_CONTAINER()
        cy.wait(500) //required wait to load page
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        cy.wait(500) //required wait to load page
        _common.columnFilter_inSubContainer(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.COMPARE_DESCRIPTION, CONTAINERS_PRICE_COMPARISON.FIELDNAME_1)
        _common.clickOn_toolbarButton(cnt.uuid.PRICE_COMPARISONBOQ, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasIconWithIndex(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.TREE, app.GridCellIcons.ICO_COMPARE_FIELDS, 0)
        cy.wait(1000) //required wait to load page
        _common.clickOn_cellHasIconWithIndex(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.TREE, app.GridCellIcons.ICO_COMPARE_FIELDS, 0)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PRICE_COMPARISONBOQ, app.GridCells.COMPARE_DESCRIPTION, CONTAINERS_PRICE_COMPARISON.FIELDNAME_1)
    })
})



