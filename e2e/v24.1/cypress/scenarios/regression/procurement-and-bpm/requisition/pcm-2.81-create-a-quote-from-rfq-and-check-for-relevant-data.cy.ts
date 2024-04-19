import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface()
const DOC_DESC = "DOC-DESC-" + Cypress._.random(0, 999);
const CHARACTERISTICS_CODE = "205";

let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION_ITEM;
let CONTAINER_COLUMNS_REQUISITION_ITEM;
let CONTAINERS_MILESTONES;
let CONTAINER_COLUMNS_MILESTONES;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let MILESTONE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS
let CONTAINER_COLUMNS_REQUISITION_SUBCONTRACTOR;
let CONTAINER_COLUMNS_REQUISITION_CONTACT
let CONTAINER_COLUMNS_REQUISITION_GENERALS
let CONTAINER_COLUMNS_REQUISITION_CERTIFICATES
let CONTAINER_COLUMNS_REQUISITION_DOCUMENTS
let CONTAINER_COLUMNS_OVERVIEW
let CONTAINERS_REQUISITION_CERTIFICATES;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.81 | Create a quote from RFQ - and check for relevant data ")
describe("PCM- 2.81 | Create a quote from RFQ - and check for relevant data", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.81-create-a-quote-from-rfq-and-check-for-relevant-data.json").then((data) => {
            this.data = data
            CONTAINERS_MILESTONES = this.data.CONTAINERS.REQUISITION_MILESTONE;
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
            CONTAINER_COLUMNS_MILESTONES = this.data.CONTAINER_COLUMNS.REQUISITION_MILESTONE
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINERS_REQUISITION_ITEM = this.data.CONTAINERS.REQUISITION_ITEM;
            CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM

            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
            }
            MILESTONE_PARAMETERS = {
                [app.GridCells.PRC_MILESTONE_TYPE_FK]: CONTAINERS_MILESTONES.TYPE,
                [app.GridCells.AMOUNT_SMALL]: CONTAINERS_MILESTONES.AMOUNT,
                [app.GridCells.MDC_TAX_CODE_FK_SMALL]: CONTAINERS_MILESTONES.TAX_CODE,
                [app.GridCells.MILESTONE]: CONTAINERS_MILESTONES.DATE,
            };

            CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS = this.data.CONTAINER_COLUMNS.REQUISITION_CHARACTERISTICS
            CONTAINER_COLUMNS_REQUISITION_CERTIFICATES = this.data.CONTAINER_COLUMNS.REQUISITION_CERTIFICATE
            CONTAINER_COLUMNS_REQUISITION_SUBCONTRACTOR = this.data.CONTAINER_COLUMNS.REQUISITION_SUBCONTRACTOR
            CONTAINER_COLUMNS_REQUISITION_CONTACT = this.data.CONTAINER_COLUMNS.REQUISITION_CONTACT
            CONTAINER_COLUMNS_REQUISITION_GENERALS = this.data.CONTAINER_COLUMNS.REQUISITION_GENERALS
            CONTAINER_COLUMNS_REQUISITION_DOCUMENTS = this.data.CONTAINER_COLUMNS.REQUISITION_DOCUMENTS
            CONTAINER_COLUMNS_OVERVIEW = this.data.CONTAINER_COLUMNS.OVERVIEW
            CONTAINERS_REQUISITION_CERTIFICATES = this.data.CONTAINERS.REQUISITION_CERTIFICATE;
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,  Cypress.env('PROJECT_NUMBER')).pinnedItem();
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

    it('TC - Verify Creation Of Record in Milestones,Document,Characteristics', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_DOCUMENTS, app.FooterTab.DOCUMENT, 4);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_DOCUMENTS, CONTAINER_COLUMNS_REQUISITION_DOCUMENTS)
        });
        //create Document
        _common.create_newRecord(cnt.uuid.REQUISITION_DOCUMENTS)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, DOC_DESC)
        cy.SAVE().wait(2000).SAVE()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_MILESTONE, app.FooterTab.MILESTONES, 3);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_MILESTONE, CONTAINER_COLUMNS_MILESTONES);
        });
        //create Milestones

        _common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE);
        _common.select_rowInContainer(cnt.uuid.REQUISITION_MILESTONE)
        _procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.REQUISITION_MILESTONE, MILESTONE_PARAMETERS);
        cy.wait(500)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, "MILESTONETYPE")
        //create characteristics

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CHARACTERISTICS, CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CHARACTERISTICS_CODE)
        cy.SAVE()
    })

    it('TC - Verify Creation Of Record in Certificate,subcontractor,Contacts', function () {
        //create certificate
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 8);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CERTIFICATES, CONTAINER_COLUMNS_REQUISITION_CERTIFICATES)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CERTIFICATES)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.GUARANTEE_COST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_CERTIFICATES.GUARANTEE_COST)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.REQUISITION_CERTIFICATES)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, "CERTTYPE")
        //create subcontractor
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 9);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_SUBCONTRACTOR, CONTAINER_COLUMNS_REQUISITION_SUBCONTRACTOR)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BP)
        cy.SAVE()
        //create Contacts
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 7);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_CONTACT, CONTAINER_COLUMNS_REQUISITION_CONTACT)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_CONTACT)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_CONTACT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_REQUISITION.ROLE)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FIRST_NAME, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.FIRST_NAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        //create Generals
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 10);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_REQUISITION_GENERALS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        cy.wait(500)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.MDC_TAX_CODE_FK_SMALL, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.TAX_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_CERTIFICATES.GUARANTEE_COST)
        cy.SAVE().wait(2000).SAVE()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, "GENTYPE")
    })

    it('TC - Verify change status of requisition and Create RFQ,Quote', function () {
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env("REQCODE"))
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);

        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);

        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _rfqPage.createRequestForCode_fromWizard("Business Partner", CONTAINERS_REQUISITION.BP, "")
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([CONTAINERS_REQUISITION.BP], [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK])
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Created data in Quote', function () {

        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_MILESTONES, app.FooterTab.MILESTONES, 3);
            _common.setup_gridLayout(cnt.uuid.QUOTE_MILESTONES, CONTAINER_COLUMNS_MILESTONES)
        });
        cy.wait(3000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_MILESTONES, app.GridCells.PRC_MILESTONE_TYPE_FK, Cypress.env("MILESTONETYPE"))
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_CERTIFICATES, app.FooterTab.CERTIFICATES, 8);
            _common.setup_gridLayout(cnt.uuid.QUOTE_CERTIFICATES, CONTAINER_COLUMNS_REQUISITION_CERTIFICATES)
        });
        cy.wait(3000)
        _common.select_rowInContainer(cnt.uuid.QUOTE_CERTIFICATES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, Cypress.env("CERTTYPE"))
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_SUBCONTRACTORS, app.FooterTab.SUBCONTRACTOR, 9);
            _common.setup_gridLayout(cnt.uuid.QUOTE_SUBCONTRACTORS, CONTAINER_COLUMNS_REQUISITION_SUBCONTRACTOR)
        });
        cy.wait(3000)
        _common.select_rowInContainer(cnt.uuid.QUOTE_SUBCONTRACTORS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_SUBCONTRACTORS, app.GridCells.BPD_BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BP)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 5);
        });
        cy.wait(3000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTE_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CHARACTERISTICS_CODE)
        _common.select_activeRowInContainer(cnt.uuid.QUOTE_CHARACTERISTICS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CHARACTERISTICS_CODE)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_GENERALS, app.FooterTab.GENERALS, 10);
            _common.setup_gridLayout(cnt.uuid.QUOTE_GENERALS, CONTAINER_COLUMNS_REQUISITION_GENERALS)
        });
        cy.wait(3000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTE_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, Cypress.env("GENTYPE"))
        _common.select_rowInContainer(cnt.uuid.QUOTE_GENERALS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, Cypress.env("GENTYPE"))
    })

    it('TC - Verify Created data in Quote such as Contact,Document,Overview', function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_CONTACTS, app.FooterTab.CONTACTS, 7);
            _common.setup_gridLayout(cnt.uuid.QUOTE_CONTACTS, CONTAINER_COLUMNS_REQUISITION_CONTACT)
        });
        cy.wait(1000)
        _common.select_rowInContainer(cnt.uuid.QUOTE_CONTACTS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_CONTACTS, app.GridCells.BPD_CONTACT_FIRST_NAME, CONTAINERS_REQUISITION.FIRST_NAME)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTE_DOCUMENT, app.FooterTab.DOCUMENT, 4);
            _common.setup_gridLayout(cnt.uuid.QUOTE_DOCUMENT, CONTAINER_COLUMNS_REQUISITION_DOCUMENTS)
        });
        _common.select_rowInContainer(cnt.uuid.QUOTE_DOCUMENT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_DOCUMENT, app.GridCells.DESCRIPTION, DOC_DESC)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQ_DETAIL, app.FooterTab.OVERVIEW, 5);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQ_DETAIL, CONTAINER_COLUMNS_OVERVIEW)
        });
        cy.wait(1000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_BOQ_DETAIL, app.GridCells.DESCRIPTION, sidebar.SideBarOptions.QUOTES)
        _procurementPage.get_titlesOfRequisitionsOverviewCheckedStatus(cnt.uuid.PROCUREMENT_BOQ_DETAIL, "OVERVIEW")
    })

    it('TC - Verify Created data in Quote such as Contact,Document,Overview part 2', function () {
        _validate.verify_overviewCheckedStatusForContract(cnt.uuid.PROCUREMENT_BOQ_DETAIL, "OVERVIEW")
    })
})