import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface()
let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_CONTACT
let CONTAINERS_REQUISITION_CONTACT
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.165 | Contacts and contact role")
describe("PCM- 2.165 | Contacts and contact role", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.165-Contacts-and-contact-roles.json").then((data) => {
            this.data = data
        })
    })
    before(function () {

        cy.fixture("pcm/pcm-2.165-Contacts-and-contact-roles.json").then((data) => {
            this.data = data
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION

            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
            }
            CONTAINER_COLUMNS_REQUISITION_CONTACT = this.data.CONTAINER_COLUMNS.REQUISITION_CONTACT
            CONTAINERS_REQUISITION_CONTACT = this.data.CONTAINERS.REQUISITION_CONTACT;

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        })
    });
    after(() => {
        cy.LOGOUT();
    });
    it('TC - Verify Creation Of Record in Requisition module', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        });
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS);
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BP)
        cy.wait(1000)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
        _common.minimizeContainer(cnt.uuid.REQUISITIONS)

    })


    it('TC - Verify creation of contact record in requisition', function () {
        cy.wait(1000)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 7);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CONTACT, CONTAINER_COLUMNS_REQUISITION_CONTACT)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CONTACT)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CONTACT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_REQUISITION_CONTACT.ROLE)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FIRST_NAME, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_CONTACT.FIRST_NAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CONTRACTROLE", $ele1.text())
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FK, CONTAINERS_REQUISITION_CONTACT.FIRST_NAME)
    })

    it('TC - Verify deletion of contact record in requisition', function () {
        cy.wait(1000)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 7);
        });
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_CONTACT)
        _validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_CONTACT, CONTAINERS_REQUISITION_CONTACT.FIRST_NAME)
    })

    it('TC - Verify contact gets filter based on requisition header(business partner)', function () {
        cy.wait(1000)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        });
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
        _mainView.findAndShowContainer(cnt.uuid.REQUISITIONS).findCell(app.GridCells.BUSINESS_PARTNER_FK).findButton(btn.IconButtons.ICO_INPUT_DELETE).clickIn()
        cy.SAVE()

        cy.wait(1000)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 2);
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CONTACT)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CONTACT)
        _validate.verify_contactsFilterInRequisition(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FK, CONTAINERS_REQUISITION_CONTACT.ASSIGN_CONTACT, CONTAINERS_REQUISITION_CONTACT.FIRST_NAME)
        _validate.verify_recordNotPresentInmodal(CONTAINERS_REQUISITION_CONTACT.FIRST_NAME)
        _modalView.acceptButton(btn.ButtonText.CANCEL)
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
    })

    it('TC - Verify role gets assigned based on contact', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER)

        cy.wait(2000)

        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        _common.openTab(app.TabBar.CONTACTS_BP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, CONTAINERS_REQUISITION_CONTACT.BP)
        _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)

        cy.wait(1000)
        _common.openTab(app.TabBar.CONTACTS_BP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, CONTAINERS_REQUISITION_CONTACT.FIRST_NAME)
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, Cypress.env("CONTRACTROLE"))
    })

})