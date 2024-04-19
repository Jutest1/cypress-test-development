import { tile, app, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import { _common, _estimatePage, _package, _validate, _boqPage, _mainView } from 'cypress/pages';
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_STRUCT_DESC = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);
const ESTIMATE_CODE = "EST_CODE-"+ Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST_DESC-"+ Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let MODALS_CREATE_BOQ_PACKAGE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_RESOURCE;
let UPDATE_BOQ_PACKAGE;


ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Contract');
ALLURE.story('PCM- 1.37 | Update BoQ package quantities and price of existing item/s from contract');

describe('PCM- 1.37 | Update BoQ package quantities and price of existing item/s from contract', () => {	
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-1.37-Update-BoQpackage-quantities-and-price-of-existing-items-from-contract.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      		CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      		CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE      		
      		BOQS_PARAMETERS = {
        		[app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
			};
      		BOQS_STRUCTURE_PARAMETERS = {
        		[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        		[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        		[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        		[ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        		[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      		};

			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
			GENERATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
			}
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINER_RESOURCE = this.data.CONTAINERS.RESOURCE;
			MODALS_CREATE_BOQ_PACKAGE= this.data.MODALS.CREATE_BOQ_PACKAGE;
			UPDATE_BOQ_PACKAGE = this.data.UPDATE_BOQ_PACKAGE

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create BOQ header & BOQ Structure in first Project', function () {
		_common.openTab(app.TabBar.BOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});

		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);

		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});

		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS );
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
	});

	it('TC - Create Estimate header and generate line items from BOQ and assign resource to it', function () {		
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE);
		});

		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
		cy.REFRESH_CONTAINER();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		cy.SAVE();
		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(CONTAINER_RESOURCE.SHORT_KEY, CONTAINER_RESOURCE.CODE);
		cy.SAVE();
	});

	it('TC -Create BOQ Package using wizard Create/Update BoQ Package', function () {		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_package.enterRecord_toCreateBoQPackage_FromWizard(MODALS_CREATE_BOQ_PACKAGE.BOQ, MODALS_CREATE_BOQ_PACKAGE.SCOPE, MODALS_CREATE_BOQ_PACKAGE.GROUPING_STRUCTURE, MODALS_CREATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE);
	});

	it('TC -Change package status ,create contract and edit quantity and unit rate', function () {	

		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2);
		});

		_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
		_common.select_rowInContainer(cnt.uuid.PACKAGE);
		_package.changeStatus_ofPackage_inWizard();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(MODALS_CREATE_BOQ_PACKAGE.BUSINESS_PARTNER);

		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINERS_BOQ_STRUCTURE.BOQLINETYPE)
		_common.edit_containerCell(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BOQ_STRUCTURE.QUANTITY[1]);
		_common.edit_containerCell(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1]);
		cy.SAVE();
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('FINALPRICECONTRACT', $ele1.text());
		});
	});

	it('TC - Update package(BoQ) from wizard', function () {		

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_PACKAGE_BOQ );
		_package.updatePackageBoQ_FromWizard(UPDATE_BOQ_PACKAGE);
		cy.wait(1000); // Wait is required 
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
		});
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, MODALS_CREATE_BOQ_PACKAGE.MODULE);		

		_common.openTab(app.TabBar.BOQBASED).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});

		_common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE,  app.GridCells.PRICE_SMALL, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env('FINALPRICECONTRACT'));
	});
});
