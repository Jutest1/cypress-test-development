import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _businessPartnerPage, _projectPage, _package, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'P2.230' + Cypress._.random(0, 999);
const PRJ_NAME = 'PCM-2.230' + Cypress._.random(0, 999);
const BP_CODE = 'BP-CODE-' + Cypress._.random(0, 999);
const BP_NAME = 'BP-' + Cypress._.random(0, 999);
const PKG_DESC = "PKG_DESC-" + Cypress._.random(0, 999);
const FAMILY_NAME = "A-" + Cypress._.random(0, 999);
const FIRST_NAME = "B-" + Cypress._.random(0, 999);
const BRANCH_DESC = "BRANCH_DESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_BUSINESS_PARTNER, CONTAINERS_PROJECT;

let CONTAINER_COLUMNS_BUSINESS_PARTNER, CONTAINER_COLUMNS_BRANCHES, CONTAINER_COLUMNS_PROJECT;

let MODAL_ENHANCED_BIDDER_SEARCH;

let PROJECT_PARAMETERS: DataCells, ADDRESS_PARAMETER: DataCells, BUSINESS_PARTNER_ADVANCE_SEARCH_PARAMETER: DataCells;

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('RFQ');
ALLURE.story('PCM- 2.230 | Standardization of Business Partner in Procurement RfQ');

describe('PCM- 2.230 | Standardization of Business Partner in Procurement RfQ', () => {

    before(function () {

        cy.fixture('pcm/pcm-2.230-standardization-of-business-partner-in-procurement-rfq.json').then((data) => {
            this.data = data;
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES;
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS;
            CONTAINERS_BUSINESS_PARTNER = this.data.CONTAINERS.BUSINESS_PARTNER;
            CONTAINER_COLUMNS_BUSINESS_PARTNER = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
            CONTAINER_COLUMNS_BRANCHES = this.data.CONTAINER_COLUMNS.BRANCHES
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            };
            ADDRESS_PARAMETER = {
                [commonLocators.CommonLabels.CITY]: CONTAINERS_BUSINESS_PARTNER.CITY[1],
                [commonLocators.CommonLabels.STREET]: CONTAINERS_BUSINESS_PARTNER.STREET[1],
                [commonLocators.CommonLabels.ZIP_CODE]: CONTAINERS_BUSINESS_PARTNER.ZIP_CODE[1],
                [commonLocators.CommonLabels.COUNTRY]: CONTAINERS_BUSINESS_PARTNER.COUNTRY[0]
            };
            MODAL_ENHANCED_BIDDER_SEARCH = this.data.MODAL.ENHANCED_BIDDER_SEARCH;
            BUSINESS_PARTNER_ADVANCE_SEARCH_PARAMETER = {
                [commonLocators.CommonLabels.TYPE]: CommonLocators.CommonKeys.LOCATION,
                [commonLocators.CommonKeys.RADIO]: CommonLocators.CommonLabels.DISTANCE,
                [commonLocators.CommonLabels.DISTANCE]: MODAL_ENHANCED_BIDDER_SEARCH.DISTANCE_IN_KM,
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: CommonLocators.CommonKeys.CHECK,
                [app.GridCells.BP_NAME_1]: BP_NAME,
                [commonLocators.CommonLabels.BRANCH_DESCRIPTION]: BRANCH_DESC,
                [app.GridCells.FIRST_NAME]: FIRST_NAME
            }
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Add radius in customizing module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        cy.REFRESH_CONTAINER();
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.RADIUS);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.RADIUS);
        cy.SAVE();
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, CONTAINERS_DATA_RECORDS.DISTANCE_IN_KM[0])
        _common.select_rowInContainer(cnt.uuid.DATA_RECORDS)
        _common.delete_recordFromContainer(cnt.uuid.DATA_RECORDS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_DATA_RECORDS.DISTANCE_IN_KM[0])
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.RADIUS_IN_METER, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_DATA_RECORDS.DISTANCE_IN_M[0])
        cy.SAVE()
    })

    it('TC - Create new business partner and add branches ', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
        });
        _common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS);
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_NAME, CONTAINERS_BUSINESS_PARTNER.STREET[0], CONTAINERS_BUSINESS_PARTNER.ZIP_CODE[0], CONTAINERS_BUSINESS_PARTNER.CITY[0], CONTAINERS_BUSINESS_PARTNER.COUNTRY[0]);
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
        _common.create_newRecord(cnt.uuid.SUBSIDIARIES);
        _businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(CONTAINERS_BUSINESS_PARTNER.STREET[1], CONTAINERS_BUSINESS_PARTNER.ZIP_CODE[1], CONTAINERS_BUSINESS_PARTNER.CITY[1], CONTAINERS_BUSINESS_PARTNER.COUNTRY[0]);
        cy.SAVE();
        _common.edit_dropdownCellWithInput(cnt.uuid.SUBSIDIARIES, app.GridCells.ADDRESS_TYPE_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CommonLocators.CommonLabels.BRANCH)
        _common.enterRecord_inNewRow(cnt.uuid.SUBSIDIARIES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BRANCH_DESC)
        cy.SAVE();
        _common.search_inSubContainer(cnt.uuid.SUBSIDIARIES, BRANCH_DESC)
        _common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.SUBSIDIARIES, app.GridCells.IS_MAIN_ADDRESS)
        cy.SAVE()
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 1);
        });
        _common.maximizeContainer(cnt.uuid.CONTACTS_BP)
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.create_newRecord(cnt.uuid.CONTACTS_BP)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FIRST_NAME)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FAMILY_NAME)
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.CONTACTS_BP)
    });

    it('TC- Add address to Project', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS)
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT.addressfk], cnt.uuid.PROJECTS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.select_rowInContainer(cnt.uuid.PROJECTS)
        _common.lookUpButtonInCell(cnt.uuid.PROJECTS, app.GridCells.ADDRESS_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _projectPage.enterRecord_toAddressInsideModal(ADDRESS_PARAMETER)
        cy.SAVE()
        _common.pinnedItem()
    })

    it('TC- Create Package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(CommonLocators.CommonKeys.MATERIAL, PKG_DESC)
        cy.SAVE()
        _package.changeStatus_ofPackage_inWizard()
    })

    it('TC- Verify branch in business partner lookup', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_RFQ);
        _validate.verify_businessPartnerAdvanceSearch(BUSINESS_PARTNER_ADVANCE_SEARCH_PARAMETER)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    })
})
