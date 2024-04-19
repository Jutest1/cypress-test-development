import { _common, _estimatePage, _mainView, _modalView, _package, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";
import { tile, app, cnt, sidebar, commonLocators, btn } from 'cypress/locators';

const ALLURE = Cypress.Allure.reporter.getInterface();
const RFQ_DESC = "RFQ_Desc" + Cypress._.random(0, 999);

let CONTAINERS_RFQ;
let CONTAINER_COLUMNS_BIDDER;
let CONTAINER_COLUMNS_RFQ;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.80 | Create Quotes by using wizard from a RFQ")

describe('PCM- 2.80 | Create Quotes by using wizard from a RFQ', () => {
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));

        cy.fixture("pcm/pcm-2.80-create-quotes-by-using-wizard-from-a-RFQ.json")
          .then((data) => {
            this.data = data
            CONTAINERS_RFQ=  this.data.CONTAINERS.RFQ
            CONTAINER_COLUMNS_BIDDER= this.data.CONTAINER_COLUMNS.BIDDERS
            CONTAINER_COLUMNS_RFQ= this.data.CONTAINER_COLUMNS.RFQ
            
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
          })
    });

    after(() => {
        cy.LOGOUT();
    });


    it('TC - Create RFQ', function () {  

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 1);
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE,  CONTAINER_COLUMNS_RFQ)
        });        
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC);
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.CLERK_REQ_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RFQ.REQUISITION_OWNER);       
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DATE_REQUESTED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RFQ.REQUESTED);
        cy.SAVE()
    });

    it('TC - Verify Add Bidders ', function () {  
       
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDDERS)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RFQ.BP)
        cy.wait(1000)//Required Wait        
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_RFQ.BP)
        _common.create_newRecord(cnt.uuid.BIDDERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RFQ.BP2)       
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_RFQ.BP2)
    })

    it('TC - Change RFQ status', function () {         
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000)//wait is required
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.RFQ_STATUS_FK, commonLocators.CommonKeys.PUBLISHED)
    });

    it("TC - Create Quote for one Bidder from RfQ", function () {         
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_In_Modal(app.GridCells.BP_NAME, CONTAINERS_RFQ.BP)
        _validate.validate_Text_message_In_PopUp(CONTAINERS_RFQ.BP2)
        _rfqPage.fromWizard_CreateQuoteAndverifyBPSearch([CONTAINERS_RFQ.BP], [CONTAINERS_RFQ.check])
        _validate.validate_Text_message_In_PopUp(CONTAINERS_RFQ.MESSAGE)
        _modalView.findModal().acceptButton(Buttons.ButtonText.GO_TO_QUOTE);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 1);
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_BIDDER)
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_RFQ.BP)
    });

    it('TC - Create Quote From Find Buisness partner', function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 1);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//Required Wait
        _rfqPage.assign_businessPartnerToQuote_fromWizard(CONTAINERS_RFQ.BP2)
        _validate.validate_Text_message_In_PopUp(CONTAINERS_RFQ.MESSAGE)
        _modalView.findModal().acceptButton(Buttons.ButtonText.GO_TO_QUOTE);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 1);
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_RFQ.BP2)
    });
})