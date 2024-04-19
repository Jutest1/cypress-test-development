import { app, cnt, btn, tile, commonLocators, sidebar } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _modalView, _procurementPage, _procurementContractPage, _common, _estimatePage, _businessPartnerPage, _mainView, _validate, _materialPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const BP_CODE = 'BP-CODE-' + Cypress._.random(0, 999);
const BP_NAME = 'Business-name' + Cypress._.random(0, 999);
const BRANCH_NAME = 'BR-' + Cypress._.random(0, 999);
let PROCUREMENTSTRUCTURE_PARAMETERS: DataCells;
let PROCUREMENTSTRUCTURE_PARAMETERS_2: DataCells;
let PROCUREMENTSTRUCTURE_PARAMETERS_3: DataCells;
let BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER: DataCells;
let BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER_2: DataCells;
let BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER_3: DataCells;
let CONTAINERS_BUSINESSPARTNER;
let CONTAINER_COLUMNS_BUSINESSPARTNER;
let CONTAINERS_BRANCHES;
let CONTAINER_COLUMNS_BRANCHES;
let CONTAINERS_PROCUREMENTSTRUCTURE;
let CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE;
let CONTAINER_COLUMNS_CONTACTS;
let CONTAINERS_PROCUREMENTCONTRACT
let CONTAINER_COLUMNS_PROCUREMENTCONTRACT;

allure.epic('PROCUREMENT AND BPM');
allure.feature('Business Partner');
allure.story('PCM- 2.235 | Procurement Structure for a particular branch of a selected business partner ALM 111163');
describe('PCM- 2.235 | Procurement Structure for a particular branch of a selected business partner ALM 111163', () => {
    beforeEach(function () {
        cy.fixture('pcm/pcm-2.235-procurement-structure-for-a-particular-branch-of-a-selected-business-partner.json').then((data) => {
            this.data = data;
        });
    });
    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture('pcm/pcm-2.235-procurement-structure-for-a-particular-branch-of-a-selected-business-partner.json').then((data) => {
            this.data = data;
            CONTAINERS_BUSINESSPARTNER = this.data.CONTAINERS.BUSINESSPARTNER;
            CONTAINERS_BRANCHES = this.data.CONTAINERS.BRANCHES;
            CONTAINERS_PROCUREMENTSTRUCTURE = this.data.CONTAINERS.PROCUREMENTSTRUCTURE;
            CONTAINER_COLUMNS_BUSINESSPARTNER = this.data.CONTAINER_COLUMNS.BUSINESSPARTNER
            CONTAINER_COLUMNS_BRANCHES = this.data.CONTAINER_COLUMNS.BRANCHES
            CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENTSTRUCTURE
            CONTAINER_COLUMNS_CONTACTS = this.data.CONTAINER_COLUMNS.CONTACTS

            CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT;
            CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT

            PROCUREMENTSTRUCTURE_PARAMETERS = {
                [commonLocators.CommonKeys.SEARCH_RESULT]: CONTAINERS_PROCUREMENTSTRUCTURE.STRUCTURE_CODE_1,
                [app.GridCells.IS_SELECTED]: commonLocators.CommonKeys.CHECK,

            };
            PROCUREMENTSTRUCTURE_PARAMETERS_2 = {
                [commonLocators.CommonKeys.SEARCH_RESULT]: CONTAINERS_PROCUREMENTSTRUCTURE.STRUCTURE_CODE_2,
                [app.GridCells.IS_SELECTED]: commonLocators.CommonKeys.CHECK
            }
            PROCUREMENTSTRUCTURE_PARAMETERS_3 = {
                [commonLocators.CommonKeys.SEARCH_RESULT]: CONTAINERS_PROCUREMENTSTRUCTURE.STRUCTURE_CODE_3,
                [app.GridCells.IS_SELECTED]: commonLocators.CommonKeys.CHECK,

            };
            BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER = {
                [commonLocators.CommonLabels.TYPE]: CONTAINERS_PROCUREMENTSTRUCTURE.TYPE,
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BP_NAME,
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonKeys.CODE]: CONTAINERS_PROCUREMENTSTRUCTURE.STRUCTURE_CODE_1,
                [app.GridCells.BP_NAME_1]: BP_NAME,
                [commonLocators.CommonLabels.BRANCH_DESCRIPTION]: CONTAINERS_BUSINESSPARTNER.CITY_NAME,

            }
          
            BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER_3 = {
                [commonLocators.CommonLabels.TYPE]: CONTAINERS_PROCUREMENTSTRUCTURE.TYPE,
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BP_NAME,
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonKeys.CODE]: CONTAINERS_PROCUREMENTSTRUCTURE.STRUCTURE_CODE_3,

            }

        });
    });
      after(() => {
        cy.LOGOUT();
    });
    it('TC - Create new business partner and branch', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESSPARTNER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
        _common.clickOn_toolbarButton(cnt.uuid.BUSINESS_PARTNERS, btn.ToolBar.ICO_REC_NEW)
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_NAME, CONTAINERS_BUSINESSPARTNER.STREET_NAME, CONTAINERS_BUSINESSPARTNER.ZIP_CODE, CONTAINERS_BUSINESSPARTNER.CITY_NAME, CONTAINERS_BUSINESSPARTNER.COUNTRY_NAME);
        cy.SAVE()
        _common.waitForLoaderToDisappear()


    });

    it('TC - Create procurement structure to braches', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURE_BP, CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.waitForLoaderToDisappear()
        _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP, PROCUREMENTSTRUCTURE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.waitForLoaderToDisappear()
        _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP, PROCUREMENTSTRUCTURE_PARAMETERS_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.waitForLoaderToDisappear()
        _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP, PROCUREMENTSTRUCTURE_PARAMETERS_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()


    });
    it('TC - Create new branch and add procurement structure', function () {

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
        })
        _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
        _common.create_newRecord(cnt.uuid.SUBSIDIARIES)
        _businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(CONTAINERS_BRANCHES.STREET_NAME, CONTAINERS_BRANCHES.ZIP_CODE, CONTAINERS_BRANCHES.CITY_NAME, CONTAINERS_BRANCHES.COUNTRY_NAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 1);
        });

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
        _common.waitForLoaderToDisappear()
        _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP, PROCUREMENTSTRUCTURE_PARAMETERS_2)
        cy.SAVE()
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });

    it('TC - Create contract and assign buisness partner', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.CONTRACT)
        //Creating Procurement Structure
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)

        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(BP_NAME);
        _common.waitForLoaderToDisappear()
        cy.SAVE()

    });
    it('TC - Verify if check procurement structure, then set a structure which belong branch, then the business partner should filter out', function () {
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK)
        _materialPage.clickOn_cellButton(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        _validate.verify_assignbusinessPartnerFromStructure(BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER)
        _validate.validate_Text_In_Modal(app.GridCells.DESCRIPTION, CONTAINERS_BUSINESSPARTNER.CITY_NAME)
        _modalView.findModal().acceptButton(btn.ButtonText.OK)

    });


    it('TC - Verify if structure not belong any branch, then it will not search out business partner', function () {

        _materialPage.clickOn_cellButton(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
        cy.wait(1000)
        _validate.verify_assignbusinessPartnerFromStructure(BP_ADVANCE_SEARCH_PROCUREMENT_PARAMETER_3)
        cy.wait(1000)
        _validate.verify_modalTextShouldNotExistInModalCell(app.GridCells.BP_NAME_1, BP_CODE)
        _modalView.findModal().acceptButton(btn.ButtonText.CANCEL)
    });


});
