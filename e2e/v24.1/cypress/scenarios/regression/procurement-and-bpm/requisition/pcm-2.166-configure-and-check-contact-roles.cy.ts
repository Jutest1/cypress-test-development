import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _validate, _businessPartnerPage } from "cypress/pages";

import cypress from "cypress";
import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const ContactName = "ContactName-" + Cypress._.random(0, 999);
const BP_CODE = "BP-CODE-" + Cypress._.random(0, 999);
const BP_name = "BP-contact-" + Cypress._.random(0, 999);
const CONTACT_DESC = "CONTACT_DESC-" + Cypress._.random(0, 999);
const FAMILY_NAME = "FAMILY_NAME-" + Cypress._.random(0, 999);
let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_CONTACT
let CONTAINERS_REQUISITION_CONTACT

let CONTAINERS_DATA_RECORDS;
let CONTAINER_COLUMNS_DATA_RECORDS;

let CONTAINERS_DATA_TYPES;
let CONTAINER_COLUMNS_DATA_TYPES;

let CONTAINERS_BUSINESS_PARTNERS;
let CONTAINER_COLUMNS_BUSINESS_PARTNERS;

let CONTAINERS_CONTACTS_BP;
let CONTAINER_COLUMNS_CONTACTS_BP;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.166 | Configure and check Contact Roles");

describe("PCM- 2.166 | Configure and check Contact Roles", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.166-configure-and-check-contact-roles.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.166-configure-and-check-contact-roles.json").then((data) => {
            this.data = data;
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION

            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
            }
            CONTAINER_COLUMNS_REQUISITION_CONTACT = this.data.CONTAINER_COLUMNS.REQUISITION_CONTACT
            CONTAINERS_REQUISITION_CONTACT = this.data.CONTAINERS.REQUISITION_CONTACT;


            CONTAINERS_CONTACTS_BP = this.data.CONTAINERS.CONTACTS_BP;
            CONTAINER_COLUMNS_CONTACTS_BP = this.data.CONTAINER_COLUMNS.CONTACTS_BP

            CONTAINERS_BUSINESS_PARTNERS = this.data.CONTAINERS.BUSINESS_PARTNERS;
            CONTAINER_COLUMNS_BUSINESS_PARTNERS = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNERS

            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS;
            CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS

            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES

            /* Open desktop should be called in before block */

        });
    });

    after(() => {
        cy.LOGOUT();
    });
    it('TC - Verify of Customizing module add contact record', function () {
      _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
            _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.Contact_Role);
        cy.REFRESH_CONTAINER();
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.Contact_Role);
        cy.wait(1000)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
            _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS)
            _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        });
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ContactName)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Verify add new business partner and add contact ", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER)

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNERS);
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS);
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_name, CONTAINERS_BUSINESS_PARTNERS.STREET, CONTAINERS_BUSINESS_PARTNERS.ZIP_CODE, CONTAINERS_BUSINESS_PARTNERS.CITY, CONTAINERS_BUSINESS_PARTNERS.COUNTRY)
        cy.SAVE()
        _common.openTab(app.TabBar.CONTACTS_BP).then(() => {
            _common.setDefaultView(app.TabBar.CONTACTS_BP)
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.BUSINESS_PARTNER, 0)
            _common.setup_gridLayout(cnt.uuid.CONTACTS_BP, CONTAINER_COLUMNS_CONTACTS_BP);
        });
        _common.create_newRecord(cnt.uuid.CONTACTS_BP)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTACT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FAMILY_NAME)
        cy.wait(1000)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST,ContactName);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK,ContactName)

        })
    });
    it('TC - Verify Creation Of Record in Requisition module and verify contact', function () {
    
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
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BP_name)
        cy.wait(1000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
        _common.minimizeContainer(cnt.uuid.REQUISITIONS)


        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 7);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CONTACT, CONTAINER_COLUMNS_REQUISITION_CONTACT)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CONTACT)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CONTACT)
        _procurementPage.enterRecord_toCreateRequisitionContact(cnt.uuid.REQUISITION_CONTACT,ContactName, FAMILY_NAME)
        cy.wait(1000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.wait(1000).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_ROLE_FK,ContactName)
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CONTACT,app.GridCells.BPD_CONTACT_FIRST_NAME,CONTACT_DESC)
   
        })

    })


})