import { tile, app, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _mainView, _modalView } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface()
const RFQ_DESC = "RFQ" + Cypress._.random(0, 999);
const DOC_DESC_1 = "RFQ" + Cypress._.random(0, 999);


let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_PROJECT_DOCUMENT;

let CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_PROJECT_DOCUMENT

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("RFQ");
ALLURE.story("PCM- 2.245 | Change Project document rubric category in RFQ module");
describe("PCM- 2.245 | Change Project document rubric category in RFQ module", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.245-change-project-document-category-in-RFQ-module.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES;
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS;
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_PROJECT_DOCUMENT = this.data.CONTAINER_COLUMNS.PROJECT_DOCUMENT
            CONTAINERS_PROJECT_DOCUMENT = this.data.CONTAINERS.PROJECT_DOCUMENT

        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
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
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.RUBRIC_CATEGORY_FK, CommonLocators.CommonKeys.LIST, CommonLocators.CommonKeys.GENERAL)
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

    it('TC - Create RFQ and add project document', function () {
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
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
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
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE();
    })

    it('TC -Verify the project document category and document type in RFQ is updated', function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS)
        _common.select_rowInContainer(cnt.uuid.PROJECT_DOCUMENTS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_CATAGORY_FK, CONTAINERS_DATA_RECORDS.DOCUMENT_CATEGORY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.RUBRIC_CATEGORY_FK, CONTAINERS_DATA_RECORDS.RUBRIC_CATEGORY)
    })

})