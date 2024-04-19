import { _common,  _sidebar,  _mainView, _modalView, _validate} from "cypress/pages";
import { cnt, tile, app, sidebar, btn,commonLocators} from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.78 | Add contacts to a bidder");

const RFQDESC = "RFQDESC-1" + Cypress._.random(0, 999);

let CONTAINERS_CONTRACT;
let CONTAINERS_BIDDER;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_RFQ;
let CONTAINER_COLUMNS_BIDDER

describe('PCM- 2.78 | Add contacts to a bidder', () => {
    before(function () {
        cy.fixture('pcm/pcm-2.78-add-contacts-to-a-bidder.json').then((data) => {
            this.data = data;
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER;
          
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_BIDDER = this.data.CONTAINER_COLUMNS.BIDDER
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new RFQ and Bidder', function () {
       
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
       
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQDESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE, RFQDESC)
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 2);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER);
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BIDDER.PARTNERNAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new contacts', function () {

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTACTS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTAINER_COLUMNS_CONTRACT);
        });
        _common.create_newRecord(cnt.uuid.CONTACTS)
        _common.select_rowInContainer(cnt.uuid.CONTACTS)
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTACTS, app.GridCells.CONTACT_FIRST_NAME, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.FIRSTNAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTACTS, app.GridCells.CONTACT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.LASTNAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTACTS, app.GridCells.CONTACT_FIRST_NAME, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.FIRSTNAME1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTACTS, app.GridCells.CONTACT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.LASTNAME1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify contacts can filter in lookUp', function () {
       
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTACTS, 1);
        });
        _common.lookUpButtonInCell(cnt.uuid.CONTACTS, app.GridCells.CONTACT_FIRST_NAME, btn.IconButtons.ICO_INPUT_LOOKUP, 0)
        _validate.verify_isRecordPresentInAssignedContactsInLookup(CONTAINERS_CONTRACT.FIRSTNAME)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordPresentInAssignedContactsInLookup(CONTAINERS_CONTRACT.FIRSTNAME1)
        _common.selectValue_fromModal(CONTAINERS_CONTRACT.FIRSTNAME1)
        _modalView.findModal().acceptButton("OK")

    })

    it('TC - Verify contacts can be deleted', function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTACTS, 1);
        });
         _common.delete_recordFromContainer(cnt.uuid.CONTACTS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.CONTACTS, CONTAINERS_CONTRACT.FIRSTNAME1)
    })
})
