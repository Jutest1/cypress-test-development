import { tile, sidebar,commonLocators, app, cnt } from 'cypress/locators';
import { _common, _estimatePage, _sidebar,_projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage, _procurementPage } from 'cypress/pages';

import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
let REQUISITION_PARAMETERS: DataCells;
let REQUISITION_ITEM_PARAMETERS:DataCells;
let CONTAINERS_REQUISITION;
let CONTAINERS_REQUISITION_ITEM;
let CONTAINERS_PROCUREMENT_BOQ;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_ITEM;
let CONTAINER_COLUMNS_TOTALS;
let CONTAINER_COLUMNS_RFQ_BIDDER;

allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.71 |Create RFQ from requisition');

describe('PCM- 2.71 |Create RFQ from requisition', () => {

		before(function () {
		  cy.fixture('pcm/pcm-2.71-create-rfq-from-requisition.json').then((data) => {
			this.data = data;
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			CONTAINERS_REQUISITION_ITEM  =this.data.CONTAINERS.REQUISITION_ITEM;
			CONTAINERS_PROCUREMENT_BOQ  =this.data.CONTAINERS.PROCUREMENT_BOQ
				 
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM 
			CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
			CONTAINER_COLUMNS_RFQ_BIDDER= this.data.CONTAINER_COLUMNS.RFQ_BIDDER
	  
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
				[app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_REQUISITION.BP
			};  
			  
			REQUISITION_ITEM_PARAMETERS = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEM.MATERIAL_NO,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_REQUISITION_ITEM.QUANTITY,
			};  
		  });
	  
		  cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		  _common.openDesktopTile(tile.DesktopTiles.PROJECT);
		  _common.waitForLoaderToDisappear()
		  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	  
		  after(() => {
			  cy.LOGOUT();
		  });
	it('TC - Verify creation requisition record and assign business partner', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});

		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		 cy.SAVE();
		_common.waitForLoaderToDisappear()  
	});

	it('TC - Verify creation requisition items record and add material', function () {
		
		_common.waitForLoaderToDisappear()  
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEM);
		});
		
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETERS);
		
		cy.SAVE();
		_common.waitForLoaderToDisappear()  
		
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_TOTALS);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, commonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.waitForLoaderToDisappear()  
		_common.getTextfromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET);
	});

	it('TC - Change requisition status and create request for quote', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);

		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear() 

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);

		_common.waitForLoaderToDisappear()  
		_rfqPage.createRFQInRequisitionFromWizard(CONTAINERS_REQUISITION.BP);

		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.setDefaultView(app.TabBar.RFQ)
			_common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1);
			_common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_RFQ_BIDDER);
		});

		_common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BP);
		_common.waitForLoaderToDisappear()  
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.RFQ_TOTALS, CONTAINER_COLUMNS_TOTALS);
		});
		_common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env('Text'));
	});
});
