import { tile, app, cnt,sidebar,commonLocators,btn } from 'cypress/locators';
import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage } from 'cypress/pages';

const allure = Cypress.Allure.reporter.getInterface();
const RFQ_DESC = 'RFQ-DESC-' + Cypress._.random(0, 999);
var rfq_code = 'rfq_code';

let CONTAINER_COLUMNS_QUOTE;
let CONTAINERS_BIDDER
let CONTAINER_COLUMNS_BIDDER
let CONTAINER_COLUMNS_RFQ
allure.epic('PROCUREMENT AND BPM');
allure.feature('Quote');
allure.story('PCM- 2.82 | Change status for quote');

describe("PCM- 2.82 | Change status for quote", () => {
		before(function () {
		  cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
	  
		  cy.fixture("pcm/pcm-2.82-change-status-for-quote.json").then((data) => {
			this.data = data
		   
            CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER
          
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_BIDDER = this.data.CONTAINER_COLUMNS.BIDDER
			CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
			
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(()=>{
			  _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS,0)
			})
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
		  })
	  
		});
  after(() => {
		cy.LOGOUT();
	});
	it('TC - Create RfQ', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.RFQ);
   
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.setDefaultView(app.TabBar.RFQ);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
			_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ);
		});
		_common.maximizeContainer(cnt.uuid.REQUEST_FOR_QUOTE);
		_common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE);
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC);
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.saveCellDataToEnv(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.CODE, rfq_code);
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.REQUEST_FOR_QUOTE);
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.BIDDERS, 3);
		_common.openTab(app.TabBar.RFQ).then(() => {
			
			_common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER);
			_common.waitForLoaderToDisappear()
		});
		_common.maximizeContainer(cnt.uuid.BIDDERS);
		_common.create_newRecord(cnt.uuid.BIDDERS);
		_package.addBusinessPartnerToRequisition(cnt.uuid.BIDDERS, CONTAINERS_BIDDER.TITLE, CONTAINERS_BIDDER.BP1);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.BIDDERS);
		_package.addBusinessPartnerToRequisition(cnt.uuid.BIDDERS, CONTAINERS_BIDDER.TITLE, CONTAINERS_BIDDER.BP2);
		_common.create_newRecord(cnt.uuid.BIDDERS);
		_package.addBusinessPartnerToRequisition(cnt.uuid.BIDDERS, CONTAINERS_BIDDER.TITLE, CONTAINERS_BIDDER.BP3);
		_common.create_newRecord(cnt.uuid.BIDDERS);
		_package.addBusinessPartnerToRequisition(cnt.uuid.BIDDERS, CONTAINERS_BIDDER.TITLE, CONTAINERS_BIDDER.BP4);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Quote,Verify creation quote record and change quote status', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.QUOTE);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
			_common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
		});
		_common.create_newRecord(cnt.uuid.QUOTES);
		_common.waitForLoaderToDisappear()
		_package.enterRecord_toCreateQuote(Cypress.env(rfq_code), CONTAINERS_BIDDER.BP1);
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.QUOTES, CONTAINERS_BIDDER.BP1);
		_common.waitForLoaderToDisappear()
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);

		_modalView.findModal().findModalBody().findTextAreaInModal(app.InputFields.DOMAIN_TYPE_REMARK).type(CONTAINERS_BIDDER.REMARK)
	
		_common.changeStatus_fromModal(commonLocators.CommonKeys.OFFER_ISSUED);

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
		_common.clickOn_modalFooterButton(btn.ButtonText.HISTORY);
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasValue_fromModal(app.GridCells.REMARK,CONTAINERS_BIDDER.REMARK);
		_validate.validate_Text_In_Modal(app.GridCells.REMARK, CONTAINERS_BIDDER.REMARK);
		_common.clickOn_modalFooterButton(btn.ButtonText.CLOSE);

		_common.clear_subContainerFilter(cnt.uuid.QUOTES);
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.QUOTES, CONTAINERS_BIDDER.BP2);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
		_common.waitForLoaderToDisappear()
		cy.wait(2000)//required wait	
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.STATUS_FK,commonLocators.CommonKeys.CHECKED);
	});

	it('TC - Verify creation multiple quote record and change status of multiple quote', function () {
		
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
			_common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
		});
		_common.search_inSubContainer(cnt.uuid.QUOTES, commonLocators.CommonKeys.RECORDED);
		_common.select_allContainerData(cnt.uuid.QUOTES);

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);

		_common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED);
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.QUOTES);
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.STATUS_FK, commonLocators.CommonKeys.CHECKED);
	});
});
