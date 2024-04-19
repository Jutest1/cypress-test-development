import { tile, app, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _package, _rfqPage, _validate, _mainView, _modalView } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface()
const RFQ_DESC = "RFQ" + Cypress._.random(0, 999);
const DOC_DESC_1 = "D-1-DESC" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_PROJECT_DOCUMENT, CONTAINERS_BIDDERS;

let CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_BIDDERS, CONTAINER_COLUMNS_PROJECT_DOCUMENT

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Quote");
ALLURE.story("PCM- 2.247 | Change Project document rubric category in quote module");

describe("PCM- 2.247 | Change Project document rubric category in quote module", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.247-change-project-document-category-in-quote-module.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES;
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS;
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_BIDDERS = this.data.CONTAINER_COLUMNS.BIDDERS
            CONTAINERS_BIDDERS = this.data.CONTAINERS.BIDDERS
            CONTAINER_COLUMNS_PROJECT_DOCUMENT = this.data.CONTAINER_COLUMNS.PROJECT_DOCUMENT
            CONTAINERS_PROJECT_DOCUMENT = this.data.CONTAINERS.PROJECT_DOCUMENT
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Prerequisistes - customizing project document status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, CommonLocators.CommonLabels.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PROJECT_DOCUMENT_STATUS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.PROJECT_DOCUMENT_STATUS)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CommonLocators.CommonKeys.APPROVED)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.RUBRIC_CATEGORY_FK, CONTAINERS_DATA_RECORDS.RUBRIC_CATEGORY)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        // _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.RUBRIC_CATEGORY_FK, CommonLocators.CommonKeys.LIST, CommonLocators.CommonKeys.GENERAL)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_DEFAULT, CommonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PROJECT_DOCUMENT_CATEGORY)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.PROJECT_DOCUMENT_CATEGORY)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_DATA_RECORDS.DOCUMENT_CATEGORY)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.RUBRIC_CATEGORY_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.RUBRIC_CATEGORY)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_DEFAULT, CommonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.PROJECT_DOCUMENT_CATEGORY_DOCUMENT_TYPE)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.DOCUMENT_CATEGORY_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.DOCUMENT_CATEGORY)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.DOCUMENT_TYPE_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.DOCUMENT_TYPE)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        cy.SAVE()
    });

    it('TC - Verify creation of RFQ record ,change its status and create quote', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC)
        _common.select_activeRowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1)
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDERS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _package.addBusinessPartnerToRequisition(cnt.uuid.BIDDERS, CommonLocators.CommonLabels.ASSIGN_BUSINESS_PARTNER, CONTAINERS_BIDDERS.BUSINESS_PARTNER)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([CONTAINERS_BIDDERS.BUSINESS_PARTNER], [CommonLocators.CommonKeys.CHECK])
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    });

    it('TC - Add project document in quote', function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.getText_fromCell(cnt.uuid.QUOTES, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("QUOTE_CODE", $ele1.text())
            cy.log(Cypress.env("QUOTE_CODE"))
        })
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
            _common.setup_gridLayout(cnt.uuid.PROJECT_DOCUMENTS, CONTAINER_COLUMNS_PROJECT_DOCUMENT)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT_DOCUMENT.prjdocumentstatusfk], cnt.uuid.PROJECT_DOCUMENTS)
        })
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        cy.then(() => {
            _common.search_inSubContainer(cnt.uuid.QUOTES, Cypress.env("QUOTE_CODE"))
            _common.select_rowHasValue(cnt.uuid.QUOTES, Cypress.env("QUOTE_CODE"))
        })
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS)
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, DOC_DESC_1);
        _common.select_activeRowInContainer(cnt.uuid.PROJECT_DOCUMENTS)
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENT_RUBRIC_CATEGORY);
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.RUBRIC_CATEGORY, CONTAINERS_DATA_RECORDS.RUBRIC_CATEGORY, CommonLocators.CommonKeys.LIST);
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.PROJECT_DOCUMENT_TYPE, CONTAINERS_DATA_RECORDS.DOCUMENT_TYPE, CommonLocators.CommonKeys.LIST);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE();
    })

    it('TC -Verify the project document category and document type in quote is updated', function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 0);
        });
        _common.select_rowInContainer(cnt.uuid.PROJECT_DOCUMENTS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_CATAGORY_FK, CONTAINERS_DATA_RECORDS.DOCUMENT_CATEGORY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.RUBRIC_CATEGORY_FK, CONTAINERS_DATA_RECORDS.RUBRIC_CATEGORY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, CommonLocators.CommonKeys.APPROVED)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_TYPE_FK, CONTAINERS_DATA_RECORDS.DOCUMENT_TYPE)
    })

})