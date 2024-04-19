import { app, cnt, btn, commonLocators, tile, sidebar } from "cypress/locators";
import { _businessPartnerPage, _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _validate } from "cypress/pages";
import { DataCells } from 'cypress/pages/interfaces';


const allure = Cypress.Allure.reporter.getInterface();
const BP_NAME = 'RNM_BP_' + Cypress._.random(0, 999);
const FST_NAME = 'RNM_FST_' + Cypress._.random(0, 999);
const LST_NAME = 'RNM_LST_' + Cypress._.random(0, 999);
const BRANCH_NAME = 'RNM_BP_BRANCH' + Cypress._.random(0, 999);
const AREA_CODE = (Cypress._.random(0, 999)).toString();
const CON_TELEPHONE = (Cypress._.random(0, 999999999)).toString();
const BPEV_CODE = 'EVL_-' + Cypress._.random(0, 999);
const BPEV_NAME = 'EVL_DESC_-' + Cypress._.random(0, 999);
const BP_CODE = 'BP-' + Cypress._.random(0, 999);


let BUSINESSPARTNER_PARAMETERS: DataCells;
let BRANCHES_PARAMETERS: DataCells;
let PROCUREMENTSTRUCTURE_PARAMETERS: DataCells;
let CONTAINERS_BUSINESSPARTNER;
let CONTAINER_COLUMNS_BUSINESSPARTNER;
let CONTAINERS_BRANCHES;
let CONTAINER_COLUMNS_BRANCHES;
let CONTAINERS_PROCUREMENTSTRUCTURE;
let CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE;
let CONTAINERS_CONTACTS;
let CONTAINER_COLUMNS_CONTACTS;
let CONTAINERS_EVALUATION;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Business Partner");
allure.story("PCM- 3.1 | Creating Business partner in Business partner module.");

describe("PCM- 3.1 | Creating Business partner in Business partner module.", () => {
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
        Cypress.env("adminPassword"),
        Cypress.env("parentCompanyName"),
        Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-3.1-creating-business-partner-in-business-partner-module.json").then((data) => {
            this.data = data          
            CONTAINERS_BUSINESSPARTNER = this.data.CONTAINERS.BUSINESSPARTNER; 
            CONTAINERS_BRANCHES = this.data.CONTAINERS.BRANCHES; 
            CONTAINERS_PROCUREMENTSTRUCTURE = this.data.CONTAINERS.PROCUREMENTSTRUCTURE;
            CONTAINERS_CONTACTS = this.data.CONTAINERS.CONTACTS; 
            CONTAINERS_EVALUATION = this.data.CONTAINERS.EVALUATION;   
            CONTAINER_COLUMNS_BUSINESSPARTNER = this.data.CONTAINER_COLUMNS.BUSINESSPARTNER
            CONTAINER_COLUMNS_BRANCHES = this.data.CONTAINER_COLUMNS.BRANCHES
            CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENTSTRUCTURE
            CONTAINER_COLUMNS_CONTACTS = this.data.CONTAINER_COLUMNS.CONTACTS       
          
            PROCUREMENTSTRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.SERVICE]: CONTAINERS_PROCUREMENTSTRUCTURE.PROCUREMENT_STRUCTURE,
                [app.GridCells.IS_SELECTED]:commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonKeys.SEARCH_RESULT]:CONTAINERS_PROCUREMENTSTRUCTURE.SEARCH_RESULT
            };    

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);        
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BUSINESS_PARTNER)
        })
    });

    it("TC - Create a Business Partner record.", function () {
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESSPARTNER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.clickOn_toolbarButton(cnt.uuid.BUSINESS_PARTNERS,btn.ToolBar.ICO_REC_NEW)
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE,BP_NAME,CONTAINERS_BUSINESSPARTNER.STREET_NAME,CONTAINERS_BUSINESSPARTNER.ZIP_CODE,CONTAINERS_BUSINESSPARTNER.CITY_NAME, CONTAINERS_BUSINESSPARTNER.COUNTRY_NAME);
         cy.SAVE()
         _common.waitForLoaderToDisappear()         
         _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
             _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
             _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
         })
         _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
         _common.create_newRecord(cnt.uuid.SUBSIDIARIES)
         _common.edit_containerCell(cnt.uuid.SUBSIDIARIES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BRANCH_NAME)
         _businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(CONTAINERS_BRANCHES.STREET_NAME,CONTAINERS_BRANCHES.ZIP_CODE, CONTAINERS_BRANCHES.CITY_NAME,CONTAINERS_BRANCHES.COUNTRY_NAME)
         cy.SAVE()
         _common.waitForLoaderToDisappear()        
         _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
             _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 2);
             _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_BP, CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE )
         })
          _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
          _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
          _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP,PROCUREMENTSTRUCTURE_PARAMETERS)
          cy.SAVE()
          _common.waitForLoaderToDisappear()      
          _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTACTS_BP, CONTAINER_COLUMNS_CONTACTS)
        })
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.create_newRecord(cnt.uuid.CONTACTS_BP)
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTACTS_BP, app.GridCells.CONTACT_ROLE_FK, commonLocators.CommonKeys.LIST,CONTAINERS_CONTACTS.ROLE)        
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.edit_containerCell(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, FST_NAME)
        _common.select_activeRowInContainer(cnt.uuid.CONTACTS_BP)
        _common.edit_containerCell(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, app.InputFields.DOMAIN_TYPE_DESCRIPTION, LST_NAME)
        _common.lookUpButtonInCell(cnt.uuid.CONTACTS_BP, app.GridCells.TELEPHONE_NUMBER_DESCRIPTOR, btn.IconButtons.ICO_INPUT_LOOKUP, 0)
        _common.waitForLoaderToDisappear()
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.COUNTRY, 0, app.InputFields.INPUT_GROUP_CONTENT).clear({ force: true }).type(CONTAINERS_CONTACTS.COUNTRY_NAME, { force: true })
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.LIST, CONTAINERS_CONTACTS.COUNTRY_NAME)
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.AREA_CODE, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(AREA_CODE, { force: true })
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.PHONE_NUMBER, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CON_TELEPHONE, { force: true })
        _common.inputField_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.EXTENSION, 0, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type("1", { force: true })
        _common.waitForLoaderToDisappear()
        _common.getText_CellData_fromModal(commonLocators.CommonElements.ROW, commonLocators.CommonLabels.TELEPHONE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, "CO_TELEPHONE")
        cy.wait(1000).then(() => {
        cy.log("Telephone No :- " + Cypress.env("CO_TELEPHONE"))
        })
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
           _common.select_tabFromFooter(cnt.uuid.BP_EVALUATION, app.FooterTab.BP_EVALUATION, 2);
        })
         _common.clear_subContainerFilter(cnt.uuid.BP_EVALUATION)
         _common.create_newRecord(cnt.uuid.BP_EVALUATION)
         _businessPartnerPage.enterRecord_toCreateBusinessPartnerEvaluation(BPEV_CODE, BPEV_NAME, _common.getDate("current"), _common.getDate("incremented", 30), CONTAINERS_EVALUATION.CLERK_INPUT, CONTAINERS_EVALUATION.REMARK, Cypress.env("PROJECT_NUMBER"), null)
        cy.SAVE()
         _common.waitForLoaderToDisappear()
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BUSINESS_PARTNER_STATUS);
         _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
         cy.SAVE()
         _common.waitForLoaderToDisappear()
    })

    it("TC - Verify created Business Partner record.", function () {

         _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
             _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
             _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESSPARTNER)
         });
         _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
         _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, BP_NAME)
         _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)
         _common.assert_cellData_insideActiveRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, BP_NAME)
         _common.select_rowInContainer(cnt.uuid.BUSINESS_PARTNERS)
         _common.assert_cellData_insideActiveRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESSPARTNER_STATUS_FK, commonLocators.CommonKeys.APPROVED)
         _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
        })
        _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
        _common.search_inSubContainer(cnt.uuid.SUBSIDIARIES, BRANCH_NAME)
        _common.assert_cellData_insideActiveRow(cnt.uuid.SUBSIDIARIES, app.GridCells.CITY, CONTAINERS_BRANCHES.CITY_NAME)
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_BP, CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURE_BP,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.assert_cellData(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.GridCells.DESCRIPTION_CAPS, CONTAINERS_PROCUREMENTSTRUCTURE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTACTS_BP, CONTAINER_COLUMNS_CONTACTS)
        })
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS_BP)
        _common.search_inSubContainer(cnt.uuid.CONTACTS_BP, FST_NAME)
        _common.select_rowInContainer(cnt.uuid.CONTACTS_BP)
        cy.wait(1000).then(() => {
            _common.assert_cellDataByContent_inContainer(cnt.uuid.CONTACTS_BP, app.GridCells.TELEPHONE_NUMBER_DESCRIPTOR,Cypress.env("CO_TELEPHONE") )
        })
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BP_EVALUATION, app.FooterTab.BP_EVALUATION, 2);
        })
        _common.search_inSubContainer(cnt.uuid.BP_EVALUATION, BPEV_NAME)
        _common.select_rowInContainer(cnt.uuid.BP_EVALUATION)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BP_EVALUATION, app.GridCells.DESCRIPTION, BPEV_NAME)
    })
});

after(() => {
    cy.LOGOUT();
});