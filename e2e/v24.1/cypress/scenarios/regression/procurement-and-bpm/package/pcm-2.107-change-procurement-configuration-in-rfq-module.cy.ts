import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _saleContractPage, _procurementConfig, _validate } from 'cypress/pages';
import { DataCells } from "cypress/pages/interfaces";
import _ from 'cypress/types/lodash';

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LI_DESC = 'LI_DESC-' + Cypress._.random(0, 999);

var packageCode: string;
var reqCode: string;
var RfqCode: string;
var quantity: string;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let REQUEST_FOR_QUOTE_PARAMETERS: DataCells;
let MODAL_QUOTE;
let CONTAINERS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE_ITEM;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINERS_RFQ
let CONTAINER_COLUMNS_CONFIGURATION
let CONTAINER_COLUMNS_CONFIGURATION_HEADER;
let CONTAINER_COLUMNS_HEADER_TEXTS

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Package');
ALLURE.story('PCM- 2.107 | Change Procurement Configuration in RfQ module');

describe('PCM- 2.107 | Change Procurement Configuration in RfQ module', () => {	
	before(function () {
		cy.fixture('pcm/pcm-2.107-change-procurement-configuration-in-rfq-module.json').then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
	  		CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
	  		CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
	  		LINE_ITEM_PARAMETERS = {
		  		[app.GridCells.DESCRIPTION_INFO]: LI_DESC,
		  		[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
		  		[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY             
	  		};
	  		CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
	  		CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
	  		RESOURCE_PARAMETERS = {
		  		[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
		  		[app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL,		  
	  		};
	  		MODAL_QUOTE = this.data.MODALS.QUOTE;
	  		REQUEST_FOR_QUOTE_PARAMETERS = {
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_QUOTE.BUSINESS_PARTNER[0], MODAL_QUOTE.BUSINESS_PARTNER[1]],
	  		}
			CONTAINERS_PACKAGE= this.data.CONTAINERS.PACKAGE			
			CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINER_COLUMNS_PACKAGE_ITEM=this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
			CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
			CONTAINER_COLUMNS_CONFIGURATION=this.data.CONTAINER_COLUMNS.CONFIGURATION;
			CONTAINER_COLUMNS_CONFIGURATION_HEADER = this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADER;
			CONTAINER_COLUMNS_HEADER_TEXTS= this.data.CONTAINER_COLUMNS.HEADER_TEXTS
		});
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		/* Open desktop should be called in before block */
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
	});

	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create New Estimate Record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		  });
		  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		  _common.create_newRecord(cnt.uuid.ESTIMATE);
		  _common.waitForLoaderToDisappear()
		  _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		  _common.waitForLoaderToDisappear()
		  cy.SAVE()
		  _common.waitForLoaderToDisappear()
		  _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
	});
	it('TC- Create new Line item record', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
			_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});
	it('TC- Assign material resource to line item', function () {
		_common.waitForLoaderToDisappear()
      	_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      	});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
			cy.REFRESH_CONTAINER()
			_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL).then(($value)=>{
			Cypress.env("quantity",$value.text())
			cy.log(quantity)
		})
	});
	it('TC- Verify Create/update material Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_package.enterRecord_toCreatePackage_wizard(CONTAINERS_PACKAGE.STRUCTURE)
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);          
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE)
		  _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
			packageCode = $value.text()
			cy.log(packageCode)
		})
		_common.openTab(app.TabBar.PACKAGE).then(()=>{
			_common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,2)
			_common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,CONTAINER_COLUMNS_PACKAGE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
		_common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.MATERIAL);
		_common.assert_cellData(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL, CONTAINERS_LINE_ITEM.QUANTITY)
		_package.changeStatus_ofPackage_inWizard()
	});
	it('TC-Create requisition from Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(()=>{
          _common.setDefaultView(app.TabBar.MAIN)
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.getText_fromCell(cnt.uuid.REQUISITIONS,app.GridCells.CODE).then(($value)=>{
           reqCode = $value.text()
            cy.log(reqCode)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
	});
	it('TC - Create Request For Quote from wizard and change status', function () {
	    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()      
        _common.getText_fromCell(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.CODE).then(($value)=>{
            RfqCode = $value.text()
             cy.log(RfqCode)
        })       
	});
	it('TC - Create header texts', function () {
			
		
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
			_common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIGURATION_HEADER);
		});
		_common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RFQ.MATERIAL);
		cy.wait(500);//required wait
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 0);
			_common.setup_gridLayout(cnt.uuid.CONFIGURATIONS, CONTAINER_COLUMNS_CONFIGURATION);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION,CONTAINERS_RFQ.RECORD_TYPE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_RFQ.CONFIGURATION);
		cy.wait(500);//required wait
		_common.select_allContainerData(cnt.uuid.HEADER_TEXTS);
		_common.delete_recordFromContainer(cnt.uuid.HEADER_TEXTS);
		_common.create_newRecord(cnt.uuid.HEADER_TEXTS);
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RFQ.HEADER_TEXT);
		cy.SAVE().wait(1000);//required wait
	});
	it('TC- Verify Change Procurement Configuration wizard option', function () {		
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
		});
		cy.REFRESH_CONTAINER();
		_common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE, RfqCode);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
		_procurementConfig.changeProcurementConfiguration_FromWizard(CONTAINERS_RFQ.CONFIGURATION, btn.ButtonText.YES);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.PRC_CONFIGURATION_FK, CONTAINERS_RFQ.CONFIGURATION);
		cy.SAVE();
	});
	it('TC - Verify header text should popped up in the header text container in RFQ module', function () {
		
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQHEADERTEXT, app.FooterTab.HEADER_TEXT, 5);
			_common.setup_gridLayout(cnt.uuid.RFQHEADERTEXT, CONTAINER_COLUMNS_HEADER_TEXTS);
		});
		_common.create_newRecord(cnt.uuid.RFQHEADERTEXT);
		cy.SAVE().wait(1000);//required wait
		_common.assert_cellData_insideActiveRow(cnt.uuid.RFQHEADERTEXT, app.GridCells.PRC_TEXT_TYPE_FK, CONTAINERS_RFQ.HEADER_TEXT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
		_procurementConfig.changeProcurementConfiguration_FromWizard(CONTAINERS_RFQ.CONFIGURATION1, btn.ButtonText.NO);
		cy.wait(1000);//required wait
		_common.assert_cellData_insideActiveRow(cnt.uuid.RFQHEADERTEXT, app.GridCells.PRC_TEXT_TYPE_FK, CONTAINERS_RFQ.HEADER_TEXT);
		cy.SAVE();
	});
	it('TC- Verify configurations in change Procurement Configuration Popup', function () {		
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		cy.wait(1000);//required wait
		_validate.verifyProcurementConfig_inChangeProcurementConfigPopup(CONTAINERS_RFQ.CONFIG_HEADER, CONTAINERS_RFQ.RECORD_TYPE, sidebar.SideBarOptions.RFQ, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
		_common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
	});
});
