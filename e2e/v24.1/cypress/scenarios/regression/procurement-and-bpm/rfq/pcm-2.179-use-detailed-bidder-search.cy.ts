import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig, _wicpage } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators, sidebar } from "cypress/locators";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const RFQ_HEADER = "RFQ_HD_" + Cypress._.random(0, 999)

let BP_ADVANCE_SEARCH_LOCATION:DataCells
let BP_ADVANCE_SEARCH_PROCUREMENT:DataCells
let BP_ADVANCE_SEARCH_UNCHECKLOC:DataCells
let BP_ADVANCE_SEARCH_UNCHECKPRC:DataCells
let CONTAINERS_BUSINESS_PARTNER
let CONTAINER_COLUMNS_HEADERS
let CONTAINER_COLUMNS_BIDDER_HEADER

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("RFQ");
ALLURE.story("PCM - 2.179 | Use detailed Bidder Search.");

describe("PCM - 2.179 | Use detailed Bidder Search.", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.179-use-detailed-bidder-search.json")
          .then((data) => {
            this.data = data;
            CONTAINERS_BUSINESS_PARTNER=this.data.CONTAINERS.BUSINESS_PARTNER
            BP_ADVANCE_SEARCH_UNCHECKPRC = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.PROCUREMENT_STRUCTURE_SMALL,
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: commonLocators.CommonKeys.UNCHECK
            }
            BP_ADVANCE_SEARCH_UNCHECKLOC = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonKeys.LOCATION,
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: commonLocators.CommonKeys.UNCHECK,
            }
            BP_ADVANCE_SEARCH_PROCUREMENT = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.PROCUREMENT_STRUCTURE_SMALL,
                [commonLocators.CommonKeys.CODE]: "M",
                [app.GridCells.BP_NAME_1]: CONTAINERS_BUSINESS_PARTNER.BUSINESS_PARTNER[0],
                [commonLocators.CommonLabels.BRANCH_DESCRIPTION]: CONTAINERS_BUSINESS_PARTNER.BRANCH[0],
                [app.GridCells.FIRST_NAME]: CONTAINERS_BUSINESS_PARTNER.CONTACT[0],
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: commonLocators.CommonKeys.CHECK
            }
            BP_ADVANCE_SEARCH_LOCATION = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonKeys.LOCATION,
                [app.GridCells.BP_NAME_1]: CONTAINERS_BUSINESS_PARTNER.BUSINESS_PARTNER[1],
                [commonLocators.CommonLabels.BRANCH_DESCRIPTION]: CONTAINERS_BUSINESS_PARTNER.BRANCH[1],
                [app.GridCells.FIRST_NAME]: CONTAINERS_BUSINESS_PARTNER.CONTACT[1],
                [commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]: commonLocators.CommonKeys.CHECK,
                [commonLocators.CommonKeys.RADIO]: commonLocators.CommonLabels.REGIONAL,
                [commonLocators.CommonLabels.REGION]: CONTAINERS_BUSINESS_PARTNER.COUNTRY
            }

            CONTAINER_COLUMNS_HEADERS=this.data.CONTAINER_COLUMNS.HEADERS
            CONTAINER_COLUMNS_BIDDER_HEADER=this.data.CONTAINER_COLUMNS.BIDDER_HEADER
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
            _common.waitForLoaderToDisappear() 
          })
    });

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create a RfQ header and use detailed bidder search wizard to add bidders.", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
        _common.waitForLoaderToDisappear() 

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_HEADERS)
        })
        _common.waitForLoaderToDisappear() 

        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.waitForLoaderToDisappear() 

        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE, 0)
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_HEADER)
        _common.waitForLoaderToDisappear() 
        cy.SAVE()
        _common.waitForLoaderToDisappear() 
        cy.wait(1000)
        _common.saveCellDataToEnv(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.CODE,"RfQ_Code")
        _common.waitForLoaderToDisappear() 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.ENHANCED_BIDDER_SEARCH);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKPRC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKLOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_PROCUREMENT, btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory as OK button takes time to be visible */
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()


    })

    it("TC - Verify location", function () {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE, RFQ_HEADER)
        _common.select_rowHasValue(cnt.uuid.REQUEST_FOR_QUOTE, RFQ_HEADER)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.ENHANCED_BIDDER_SEARCH);
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKPRC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_UNCHECKLOC)
        _validate.verify_businessPartnerAdvanceSearch(BP_ADVANCE_SEARCH_LOCATION, btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory as OK button takes time to be visible */
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify the added bidders in Bidders container.", function () {

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_HEADERS)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE, RFQ_HEADER)
        _common.select_rowHasValue(cnt.uuid.REQUEST_FOR_QUOTE, RFQ_HEADER)
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER_HEADER)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BIDDER_HEADER.subsidiaryfk, CONTAINER_COLUMNS_BIDDER_HEADER.ContactFirstName, CONTAINER_COLUMNS_BIDDER_HEADER.businesspartnerfk], cnt.uuid.BIDDERS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.select_rowHasValue(cnt.uuid.BIDDERS, CONTAINERS_BUSINESS_PARTNER.BUSINESS_PARTNER[0])
        cy.SAVE()
          .then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_BUSINESS_PARTNER.BUSINESS_PARTNER[0])
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.CONTACT_FIRST_NAME, CONTAINERS_BUSINESS_PARTNER.CONTACT[0])
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.SUBSIDIARY_FK, CONTAINERS_BUSINESS_PARTNER.BRANCH[0])
          })
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.select_rowHasValue(cnt.uuid.BIDDERS, CONTAINERS_BUSINESS_PARTNER.BUSINESS_PARTNER[1])
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_BUSINESS_PARTNER.BUSINESS_PARTNER[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.CONTACT_FIRST_NAME, CONTAINERS_BUSINESS_PARTNER.CONTACT[1])
            _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.SUBSIDIARY_FK, CONTAINERS_BUSINESS_PARTNER.BRANCH[1])
        })
    })

    

});