import { _common, _estimatePage, _validate, _mainView, _boqPage, _package, _modalView, _projectPage } from 'cypress/pages';
import { app, tile, cnt, btn } from "cypress/locators";


// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESC = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = 'PRJ' + Cypress._.random(0, 999);
const PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 9999);
const CLERK_NAME = 'HS';
var costTotal:string[]=[]
var unitRate:string[]=[]

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.58 | Generate project BOQ from line item with grouping criteria Line items structure');

describe('EST- 1.58 | Generate project BOQ from line item with grouping criteria Line items structure', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.58-Generate-project-BOQ-from-line-item-with-grouping-criteria-Line-items-structure.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-1.58-Generate-project-BOQ-from-line-item-with-grouping-criteria-Line-items-structure.json').then((data) => {
			this.data = data;
			const standerdInputs = this.data.Prerequisites.SidebarInputs;
			cy.wait(2000);
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption(standerdInputs.QuickStart);
			_common.search_fromSidebar(standerdInputs.quickstart, standerdInputs.moduleNameCostGroups);
		});
	});
	
	it('TC - Create new cost group catalog and cost group', function () {
		const CostcodeInput = this.data.AssignResources.resourceInputs;
		const CostGroupInput = this.data.CostGroup.CostGroupInputs;
		const standerdInputs = this.data.Prerequisites.SidebarInputs;
		const costgroupgrid = this.data.CostGroup.column_costgroup;

		Cypress.env('CostGroupCode0', CostcodeInput.Code + Cypress._.random(0, 9999));
		Cypress.env('CostGroupCode1', CostcodeInput.Code + Cypress._.random(0, 9999));
		Cypress.env('CostGroupCode2', CostcodeInput.Code + Cypress._.random(0, 9999));
		cy.wait(10000);
		cy.REFRESH_CONTAINER();
		_common.openTab(app.tabBar.COST_GROUPS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.Cost_Group_catalog, app.FooterTab.COST_GROUP_CATALOG, 0);
			_common.select_tabFromFooter(cnt.uuid.COST_GROUPS, app.FooterTab.COSTGROUP, 1);
			_common.setup_gridLayout(cnt.uuid.COST_GROUPS, costgroupgrid);
		});
		_common.select_rowHasValue(cnt.uuid.Cost_Group_catalog, CostGroupInput.CostGroupcode);
		_common.create_newRecord(cnt.uuid.COST_GROUPS);
		_estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COST_GROUPS, Cypress.env('CostGroupCode0'), CostGroupInput.CostGroupdescription1, CostGroupInput.quantity1, CostGroupInput.uom);
		cy.wait(3000);
		cy.SAVE();
		cy.wait(2000);
		_common.create_newSubRecord(cnt.uuid.COST_GROUPS);
		_estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COST_GROUPS, Cypress.env('CostGroupCode1'), CostGroupInput.CostGroupdescription2, CostGroupInput.quantity2, CostGroupInput.uom);
		cy.SAVE();
		cy.wait(2000);
		_common.select_rowHasValue(cnt.uuid.COST_GROUPS, Cypress.env('CostGroupCode0'));
		_common.create_newSubRecord(cnt.uuid.COST_GROUPS);
		_estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COST_GROUPS, Cypress.env('CostGroupCode2'), CostGroupInput.CostGroupdescription3, CostGroupInput.quantity3, CostGroupInput.uom);
		cy.wait(3000);
		cy.SAVE();
		cy.wait(5000);
		_common.openSidebarOption(standerdInputs.QuickStart);
		_common.search_fromSidebar(standerdInputs.quickstart, standerdInputs.moduleNameProject);
		_common.openTab(app.tabBar.project).then(() => {
			_common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
		});
		_common.openSidebarOption(standerdInputs.Search).delete_pinnedItem();
		_common.create_newRecord(cnt.uuid.Projects);
		_projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
		cy.SAVE();
		_common.openSidebarOption(standerdInputs.Search).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, PRJ_NO).pinnedItem();
	});

	it('TC - Create new Estimate header', function () {
		const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
		const estheadergrid = this.data.EstimateHeader.column_estimateheaders;
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, estheadergrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubric, estimateInputs.estimateType);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
	});

	it('TC - Create New Record In Line Item and Resource For Cost Code', function () {
		const estligrid = this.data.CreateLineItem.column_lineitemheaders;
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;
		const CostcodeInput = this.data.AssignResources.resourceInputs;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estligrid);
			_validate.set_ColumnAtTop([estligrid.costunit,estligrid.costtotal,"DIN276"],cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CostGroupCode1'));
		cy.wait(1000);
		_mainView.select_popupItem('grid', Cypress.env('CostGroupCode1'));
		_common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.wait(1000);

		_estimatePage.enterRecord_toCreateLineItem(lineitemInputs.description1, lineitemInputs.quantity, lineitemInputs.uom);
		cy.SAVE();
		cy.wait(5000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		cy.wait(2000);
		_estimatePage.enterRecord_toCreateResource(CostcodeInput.ShortKey, CostcodeInput.Code);
		cy.wait(2000);
		cy.SAVE();
		cy.wait(5000);
		cy.REFRESH_CONTAINER();
		cy.wait(5000);
	});

	it('TC - Create Second Record In Line Item and Resource For Cost Code', function () {
		const estligrid = this.data.CreateLineItem.column_lineitemheaders;
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;
		const CostcodeInput = this.data.AssignResources.resourceInputs;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estligrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CostGroupCode2'));
		cy.wait(2000);
		_mainView.select_popupItem('grid', Cypress.env('CostGroupCode2'));
		_common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.wait(2000);

		_estimatePage.enterRecord_toCreateLineItem(lineitemInputs.description2, lineitemInputs.quantity, lineitemInputs.uom);
		cy.SAVE();
		cy.wait(5000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(CostcodeInput.ShortKey, CostcodeInput.Code);
		cy.wait(2000);
		cy.SAVE();
		cy.wait(5000);
		cy.REFRESH_CONTAINER();
		cy.wait(5000);
	});

	it('TC - Create Third Record In Line Item and Resource For Cost Code', function () {
		const estligrid = this.data.CreateLineItem.column_lineitemheaders;
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;
		const CostcodeInput = this.data.AssignResources.resourceInputs;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estligrid);
		});
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CostGroupCode2'));
		cy.wait(2000);
		_mainView.select_popupItem('grid', Cypress.env('CostGroupCode2'));
		_common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.wait(2000);
		_estimatePage.enterRecord_toCreateLineItem(lineitemInputs.description3, lineitemInputs.quantity, lineitemInputs.uom);
		cy.SAVE();
		cy.wait(5000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(CostcodeInput.ShortKey, CostcodeInput.Code);
		cy.wait(2000);
		cy.SAVE();
		cy.wait(5000);
		cy.REFRESH_CONTAINER();
		cy.wait(5000);
	});

	it('TC - Add Line Item Structure', function () {
		const CostGroupInput = this.data.CostGroup.CostGroupInputs;
		const LINE_ITEM_STRUCTURE_COLUMN= this.data.lineItemStructureColumn
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE,2);
			cy.wait(2000)
			_common.setup_gridLayout(cnt.uuid.LINEITEMSSTRUCTURE, LINE_ITEM_STRUCTURE_COLUMN);
		});
		_estimatePage.select_allRecordInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.LINEITEMSSTRUCTURE,CostGroupInput.CostGroupcode,"costgroup_lic_din276_2018-12")
		cy.SAVE();
	});

	it('TC - Generate Project BoQ  from line item from wizard', function () {
		const SidebarInputs = this.data.Prerequisites.SidebarInputs;
		const BoQInputs = this.data.BoQs.BoQInputs;
		cy.wait(5000);
		_common.openSidebarOption(SidebarInputs.wizard1);
		_common.search_fromSidebar(SidebarInputs.wizard2, SidebarInputs.GenerateProjectBoQFrom_LI);
		_estimatePage.Generate_project_BoQ_from_LI1(BoQInputs.structure);
		cy.SAVE();
		cy.wait(2000)
	});

	it('TC - Verify Project BoQ and BoQ structure record', function () {
		const CostGroupInput = this.data.CostGroup.CostGroupInputs;
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;
		const BoQgrid = this.data.BoQs.column_Boqsheaders;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BoQ_EstimateByBoQ, app.FooterTab.BOQs, 1);
			cy.wait(2000)
			_common.setup_gridLayout(cnt.uuid.BoQ_EstimateByBoQ, BoQgrid);
			_validate.set_ColumnAtTop([BoQgrid.Finalprice,BoQgrid.Price],cnt.uuid.BoQ_EstimateByBoQ)
		});
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, Cypress.env('CostGroupCode1'));
		_common.maximizeContainer(cnt.uuid.BoQ_EstimateByBoQ);
		cy.wait(2000);
		_common.select_rowHasValue(cnt.uuid.BoQ_EstimateByBoQ, lineitemInputs.description1);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BoQ_EstimateByBoQ, app.GridCells.QUANTITY_SMALL, CostGroupInput.quantity2);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BoQ_EstimateByBoQ, app.GridCells.BAS_UOM_FK, CostGroupInput.uom);
		cy.wait(5000);

		_common.select_rowHasValue(cnt.uuid.BoQ_EstimateByBoQ, lineitemInputs.description2);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BoQ_EstimateByBoQ, app.GridCells.QUANTITY_SMALL, CostGroupInput.quantity3);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BoQ_EstimateByBoQ, app.GridCells.BAS_UOM_FK, CostGroupInput.uom);
		_common.minimizeContainer(cnt.uuid.BoQ_EstimateByBoQ);
	});

	it('TC - Verify Unit rate of Project BoQs', function () {
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;
		const CostGroupInput = this.data.CostGroup.CostGroupInputs;
		cy.wait(5000);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('Item1_CostTotal', $ele1.text());
			cy.log(Cypress.env('Item1_CostTotal'));
			_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description1);
			_common.maximizeContainer(cnt.uuid.BoQ_EstimateByBoQ);
			_common.select_rowHasValue(cnt.uuid.BoQ_EstimateByBoQ, lineitemInputs.description1);
			_validate.verifyValuesOf_generatedProjectBoq_fromLineitems(cnt.uuid.BoQ_EstimateByBoQ, lineitemInputs.description1, CostGroupInput.uom, CostGroupInput.quantity2, [Cypress.env('Item1_CostTotal')]);
			_common.minimizeContainer(cnt.uuid.BoQ_EstimateByBoQ);
		});
	});

	it('TC - Verify Unit rate of Project BoQs for 2ed cost group', function () {
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;
		const CostGroupInput = this.data.CostGroup.CostGroupInputs;
		cy.wait(5000);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description2);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('Item1_CostTotal2', $ele1.text());
			cy.log(Cypress.env('Item1_CostTotal2'));
			_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description3);
			_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
				Cypress.env('Item1_CostTotal3', $ele1.text());
				cy.log(Cypress.env('Item1_CostTotal3'));
				_common.maximizeContainer(cnt.uuid.BoQ_EstimateByBoQ);
				_common.select_rowHasValue(cnt.uuid.BoQ_EstimateByBoQ, lineitemInputs.description2);
				_validate.verifyValuesOf_generatedProjectBoq_fromLineitems(cnt.uuid.BoQ_EstimateByBoQ, null, CostGroupInput.uom, CostGroupInput.quantity3, [Cypress.env('Item1_CostTotal3'), Cypress.env('Item1_CostTotal2')]);
				_common.minimizeContainer(cnt.uuid.BoQ_EstimateByBoQ);
			});
		});
	});

	it('TC - Cost should match with that in line item structure container', function () {
		const CostGroupInput = this.data.CostGroup.CostGroupInputs;
		const lineitemInputs = this.data.CreateLineItem.LineItemInput;

		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description1);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL)
			   .then(($el)=>{
					_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
					_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
						_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE,2);
					});
					_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
					_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE,Cypress.env('CostGroupCode1'));
					_common.assert_forNumericValues(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.COST_TOTAL,$el.text())
					_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
			   })


		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
				_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description1);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_UNIT)
				.then(($el)=>{
					_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
					_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
						_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE,2);
					});
					_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
					_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE,Cypress.env('CostGroupCode1'));
					_common.assert_forNumericValues(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.COST_UNIT,$el.text())
					_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
				})
		
		
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,Cypress.env('CostGroupCode2'))
		cy.wait(1000)
		  .then(()=>{
			_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description2);
			_common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
			costTotal=_common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL)
		  })
		
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE,2);
		});
		_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
		_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE,Cypress.env('CostGroupCode2'))
		_common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.COST_TOTAL)
			   .then(($el)=>{
				let costTotalVal:any=0
				for (var i in costTotal) {
					costTotalVal += (+parseFloat(costTotal[i]).toFixed(3));
				}
				expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(costTotalVal).toFixed(2))
				_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
			   })
	
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,Cypress.env('CostGroupCode2'))
		cy.wait(1000)
		  .then(()=>{
			_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description2);
			_common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
			costTotal=_common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_UNIT)
		  })
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE,2);
		});
		_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
		_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE,Cypress.env('CostGroupCode2'))
		_common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.COST_UNIT)
				.then(($el)=>{
					let costTotalVal:any=0
					for (var i in costTotal) {
						costTotalVal += (+parseFloat(costTotal[i]).toFixed(3));
					}
					expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(costTotalVal).toFixed(2))
					_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
				})

	});
});
