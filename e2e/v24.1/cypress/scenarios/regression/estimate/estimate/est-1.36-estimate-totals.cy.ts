import { tile, app, cnt, sidebar, btn,commonLocators} from 'cypress/locators';
import { _common, _estimatePage, _mainView, _modalView, _package, _validate } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const EST_ALLOWANCE_CODE = 'CODE-' + Cypress._.random(0, 999);
const EST_ALLOWANCE_DESC = 'EST_ALLOWANCE_DESC-' + Cypress._.random(0, 999);
const EST_ALLOWANCE_ASSIGNMENT_DESC = 'ALLOWANCE_ASSIGNMENT_DESC-' + Cypress._.random(0, 999);

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;
let DJC_BUDGET_PARAMETERS:DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINERS_ESTIMATE_ALLOWANCE;
let CONTAINERS_ESTIMATE_ALLOWANCE_ASSIGNMENT
let CONTAINERS_GENERATE_BUDGET;
let CONTAINERS_STANDARD_ALLOWANCE
let CONTAINERS_ESTIMATE_CONFIGURATION;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_ESTIMATE_ALLOWANCE;
let CONTAINER_COLUMNS_ESTIMATE_ALLOWANCE_ASSIGNMENT ;
let CONTAINER_COLUMNS_STANDARD_ALLOWANCE
let CONTAINER_COLUMNS_TOTALS

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.36 | Estimate Totals');

describe('EST- 1.36 | Estimate Totals', () => {
	before(function () {
		cy.fixture('estimate/est-1.36-estimate-totals.json')
		  .then((data) => {
			this.data=data
			
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
			CONTAINERS_ESTIMATE_ALLOWANCE = this.data.CONTAINERS.ESTIMATE_ALLOWANCE;
			CONTAINERS_ESTIMATE_ALLOWANCE_ASSIGNMENT = this.data.CONTAINERS.ESTIMATE_ALLOWANCE_ASSIGNMENT;
			CONTAINERS_STANDARD_ALLOWANCE = this.data.CONTAINERS.STANDARD_ALLOWANCE;
			CONTAINERS_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
			CONTAINERS_ESTIMATE_CONFIGURATION = this.data.CONTAINERS.ESTIMATE_CONFIGURATION;
			

			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINER_COLUMNS_ESTIMATE_ALLOWANCE=this.data.CONTAINER_COLUMNS.ESTIMATE_ALLOWANCE
			CONTAINER_COLUMNS_ESTIMATE_ALLOWANCE_ASSIGNMENT=this.data.CONTAINER_COLUMNS.ESTIMATE_ALLOWANCE_ASSIGNMENT
			CONTAINER_COLUMNS_STANDARD_ALLOWANCE=this.data.CONTAINER_COLUMNS.STANDARD_ALLOWANCE
			CONTAINER_COLUMNS_TOTALS=this.data.CONTAINER_COLUMNS.TOTALS

			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
			}
		
			LINE_ITEMS_PARAMETERS={
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			}

			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
			};
			RESOURCE_PARAMETERS_2 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
			};
			RESOURCE_PARAMETERS_3 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
			};

			DJC_BUDGET_PARAMETERS = {
				[commonLocators.CommonLabels.BUDGET_FROM]: CONTAINERS_GENERATE_BUDGET.BUDGET_FROM,
				[commonLocators.CommonLabels.X_FACTOR]: CONTAINERS_GENERATE_BUDGET.X_FACTOR,
				[commonLocators.CommonKeys.INDEX]: CONTAINERS_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
				[commonLocators.CommonKeys.RADIO_INDEX]: CONTAINERS_GENERATE_BUDGET.BUDGET_FROM_INDEX,
			  };

		  })
		  .then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
  })
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Precondition-Create estimate allowance in customizing ', function () {	
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING)
		_common	.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
		});
		_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.ALLOWANCE);
		_common	.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.ESTIMATE_ALLOWANCE);
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORD, 1);
			_common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_ESTIMATE_ALLOWANCE);
		});
		_common.create_newRecord(cnt.uuid.INSTANCES);
		_estimatePage.enterRecord_toCreateDataRecords_ForEstimateAllowanceType(cnt.uuid.INSTANCES, EST_ALLOWANCE_CODE, EST_ALLOWANCE_DESC, CONTAINERS_ESTIMATE_ALLOWANCE.CONTEXT, CONTAINERS_ESTIMATE_ALLOWANCE.GA, CONTAINERS_ESTIMATE_ALLOWANCE.AM, CONTAINERS_ESTIMATE_ALLOWANCE.RP);
		cy.SAVE();
		_common	.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.ALLOWANCE);
		_common	.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.ESTIMATE_ALLOWANCE_TYPE);
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORD, 1);
			_common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_ESTIMATE_ALLOWANCE_ASSIGNMENT);
		});
		_common.create_newRecord(cnt.uuid.INSTANCES);
		_estimatePage.enterRecord_toCreateDataRecords_ForEstAllowanceAssignmentType(cnt.uuid.INSTANCES, CONTAINERS_ESTIMATE_ALLOWANCE_ASSIGNMENT.CONTEXT, EST_ALLOWANCE_ASSIGNMENT_DESC, EST_ALLOWANCE_CODE);

	});
	
	it('TC - Create new estimate header', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
		_common	.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_estimatePage.textOfEstimateCode();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
	});

	it('TC - Create new line item and Resource record', function () {		
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newSubRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
	});

	it('TC - Verify create standard allowance', function () {		
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 1);
			_common.setup_gridLayout(cnt.uuid.STANDARD_ALLOWANCES,CONTAINER_COLUMNS_STANDARD_ALLOWANCE );
		})
		_common.create_newRecord(cnt.uuid.STANDARD_ALLOWANCES);
		_estimatePage.enterRecord_toStanderdAllowance(EST_ALLOWANCE_CODE, CONTAINERS_STANDARD_ALLOWANCE.QUANTITY_TYPE)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2)
		});
		_estimatePage.estimate_totals(CONTAINERS_ESTIMATE_CONFIGURATION.DEFAULT_WIC)
	});

	it('TC - Generate budget from wizard and verify budget field of line item', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC)
		_common	.waitForLoaderToDisappear()
		_estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS);
	});

	it('TC - Verify line item Grand total to Grand Totals in Totals Container', function () {
	
		cy.REFRESH_CONTAINER();
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 1);
			_common.setup_gridLayout(cnt.uuid.ESTIMATETOTALS, CONTAINER_COLUMNS_TOTALS);
		});
		_validate.verify_TotalsAndGrandTotalOfLineItems(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.GRAND_TOTAL, CONTAINERS_ESTIMATE_CONFIGURATION.TOTAL_LABEL2, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL);
	});

	it('TC - Verify Budget Totals for AQ and WQ Budget', function () {		
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 1);
			_common.setup_gridLayout(cnt.uuid.ESTIMATETOTALS, CONTAINER_COLUMNS_TOTALS);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATETOTALS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATE_CONFIGURATION.BUDGET);
		_validate.verify_BudgetTotal(cnt.uuid.ESTIMATETOTALS, CONTAINERS_GENERATE_BUDGET.X_FACTOR, app.GridCells.TOTAL, app.GridCells.WQ_BUDGET);
		_validate.verify_BudgetTotal(cnt.uuid.ESTIMATETOTALS, CONTAINERS_GENERATE_BUDGET.X_FACTOR, app.GridCells.TOTAL, app.GridCells.AQ_BUDGET);
		_common.minimizeContainer(cnt.uuid.ESTIMATETOTALS);
	});

	it('TC - Verify %DJC and %TJC', function () {	
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 1);
			_common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTALS, 2);
		});
		_estimatePage.recalculate_standardAllowances(cnt.uuid.STANDARD_ALLOWANCES);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION);
		_common.maximizeContainer(cnt.uuid.ESTIMATETOTALS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATE_CONFIGURATION.GENERALS_ADMINISTARTION);
		_validate.verify_Percentage_DJC_and_TJC(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, cnt.uuid.STANDARD_ALLOWANCES, app.GridCells.MARKUP_GA, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATE_CONFIGURATION.RISK_AND_PROFIT);
		_validate.verify_Percentage_DJC_and_TJC(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, cnt.uuid.STANDARD_ALLOWANCES, app.GridCells.MARKUP_RP, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATE_CONFIGURATION.ADDITIONAL_MARKUP);
		_validate.verify_Percentage_DJC_and_TJC(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, cnt.uuid.STANDARD_ALLOWANCES, app.GridCells.MARKUP_AM, cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL);
		_common.minimizeContainer(cnt.uuid.ESTIMATETOTALS);
	});
});
