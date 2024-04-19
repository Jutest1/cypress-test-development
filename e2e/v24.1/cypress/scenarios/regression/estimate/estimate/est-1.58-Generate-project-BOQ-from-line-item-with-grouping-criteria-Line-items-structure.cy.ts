import { _common, _estimatePage, _validate, _mainView, _boqPage, _package, _modalView, _projectPage } from 'cypress/pages';
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';


// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESC = 'ESTIMATE_DESC_' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LI-DESC-1' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2 = 'LI-DESC-2' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_3 = 'LI-DESC-3' + Cypress._.random(0, 999);

const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK_NAME = 'HS';

var costTotal: string[] = []
var unitRate: string[] = []

let PROJECTS_PARAMETERS: DataCells
let ESTIMATE_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS_1: DataCells
let LINE_ITEM_PARAMETERS_2: DataCells
let LINE_ITEM_PARAMETERS_3: DataCells
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_ESTIMATE
let CONTAINER_COLUMNS_ESTIMATE
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_COST_GROUP
let CONTAINER_COLUMNS_COST_GROUP
let CONTAINER_COLUMNS_LINE_ITEM_STRUCTURE
let CONTAINERS_BOQ
let CONTAINER_COLUMNS_BOQ

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.58 | Generate project BOQ from line item with grouping criteria Line items structure');

describe('EST- 1.58 | Generate project BOQ from line item with grouping criteria Line items structure', () => {
	before(function () {
		cy.fixture('estimate/est-1.58-Generate-project-BOQ-from-line-item-with-grouping-criteria-Line-items-structure.json').then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINERS_COST_GROUP = this.data.CONTAINERS.COST_GROUP
			CONTAINER_COLUMNS_COST_GROUP = this.data.CONTAINER_COLUMNS.COST_GROUP
			CONTAINER_COLUMNS_LINE_ITEM_STRUCTURE = this.data.CONTAINER_COLUMNS.LINE_ITEM_STRUCTURE
			CONTAINERS_BOQ = this.data.CONTAINERS.BOQ
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
				[commonLocators.CommonLabels.NAME]: PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]: CLERK_NAME
			}
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			LINE_ITEM_PARAMETERS_1 = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			LINE_ITEM_PARAMETERS_2 = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_2,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			LINE_ITEM_PARAMETERS_3 = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_3,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
			};
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
			_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_GROUPS)
			cy.wait(4000); // required wait to load page
		});
	});

	it('TC - Create new cost group catalog and cost group', function () {
		Cypress.env('CostGroupCode0', CONTAINERS_RESOURCE.CODE + Cypress._.random(0, 9999));
		Cypress.env('CostGroupCode1', CONTAINERS_RESOURCE.CODE + Cypress._.random(0, 9999));
		Cypress.env('CostGroupCode2', CONTAINERS_RESOURCE.CODE + Cypress._.random(0, 9999));
		cy.REFRESH_CONTAINER();
		cy.wait(2000); // required wait to load page
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.COST_GROUPS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTGROUP, app.FooterTab.COSTGROUP, 1);
			_common.setup_gridLayout(cnt.uuid.COSTGROUP, CONTAINER_COLUMNS_COST_GROUP);
			_common.select_tabFromFooter(cnt.uuid.COSTGROUPCATALOG, app.FooterTab.COST_GROUP_CATALOG, 0);
		});
		_common.select_rowHasValue(cnt.uuid.COSTGROUPCATALOG, CONTAINERS_COST_GROUP.COST_GROUP_CODE);
		_common.create_newRecord(cnt.uuid.COSTGROUP);
		_estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COSTGROUP, Cypress.env('CostGroupCode0'), CONTAINERS_COST_GROUP.COST_GROUP_DESC[0], CONTAINERS_COST_GROUP.QUANTITY[0], CONTAINERS_COST_GROUP.UOM);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.create_newSubRecord(cnt.uuid.COSTGROUP);
		_estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COSTGROUP, Cypress.env('CostGroupCode1'), CONTAINERS_COST_GROUP.COST_GROUP_DESC[1], CONTAINERS_COST_GROUP.QUANTITY[1], CONTAINERS_COST_GROUP.UOM);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.COSTGROUP, Cypress.env('CostGroupCode0'));
		_common.create_newSubRecord(cnt.uuid.COSTGROUP);
		_estimatePage.enterrecordto_CreateCostGroup(cnt.uuid.COSTGROUP, Cypress.env('CostGroupCode2'), CONTAINERS_COST_GROUP.COST_GROUP_DESC[2], CONTAINERS_COST_GROUP.QUANTITY[2], CONTAINERS_COST_GROUP.UOM);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.setDefaultView(app.TabBar.PROJECT)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
		_common.create_newRecord(cnt.uuid.PROJECTS);
		_projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create new Estimate header', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		cy.wait(2000) //required wait to load page
	});

	it('TC - Create New Record In Line Item and Resource For Cost Code', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.costunit, CONTAINER_COLUMNS_LINE_ITEM.costtotal, "DIN276"], cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CostGroupCode1'));
		cy.wait(1000);// required wait to load page
		_mainView.select_popupItem('grid', Cypress.env('CostGroupCode1'));
		_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3)
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		})
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Second Record In Line Item and Resource For Cost Code', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CostGroupCode2'));
		_mainView.select_popupItem('grid', Cypress.env('CostGroupCode2'));
		_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.wait(2000); // required wait to load page
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_2);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Third Record In Line Item and Resource For Cost Code', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CostGroupCode2'));
		cy.wait(2000); // required wait to load page
		_mainView.select_popupItem('grid', Cypress.env('CostGroupCode2'));
		_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_3);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Add Line Item Structure', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.LINEITEMSSTRUCTURE, CONTAINER_COLUMNS_LINE_ITEM_STRUCTURE);
		});
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.LINEITEMSSTRUCTURE, CONTAINERS_COST_GROUP.COST_GROUP_CODE, "costgroup_lic_din276_2018-12")
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Generate Project BoQ  from line item from wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_PROJECT_BOQ_FROM_LI);
		_common.waitForLoaderToDisappear()
		cy.wait(2000) // required wait to load page
		_estimatePage.Generate_project_BoQ_from_LI1(CONTAINERS_BOQ.STRUCTURE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify Project BoQ and BoQ structure record', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.FooterTab.BOQs, 1);
			_common.waitForLoaderToDisappear()
			_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ.Finalprice, CONTAINER_COLUMNS_BOQ.Price, CONTAINER_COLUMNS_BOQ.basuomfk, CONTAINER_COLUMNS_BOQ.briefinfo, CONTAINER_COLUMNS_BOQ.reference, CONTAINER_COLUMNS_BOQ.quantity], cnt.uuid.BOQ_ESTIMATEBYBOQ)
		});
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, Cypress.env('CostGroupCode1'));
		_common.maximizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ);
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.BOQ_ESTIMATEBYBOQ, LINE_ITEM_DESCRIPTION_1);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.QUANTITY_SMALL, CONTAINERS_COST_GROUP.QUANTITY[1]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.BAS_UOM_FK, CONTAINERS_COST_GROUP.UOM);
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.BOQ_ESTIMATEBYBOQ, LINE_ITEM_DESCRIPTION_2);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.QUANTITY_SMALL, CONTAINERS_COST_GROUP.QUANTITY[2]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.GridCells.BAS_UOM_FK, CONTAINERS_COST_GROUP.UOM);
		_common.minimizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ);
	});

	it('TC - Verify Unit rate of Project BoQs', function () {
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('Item1_CostTotal', parseFloat($ele1.text().replace(",", "")).toFixed(2))
			cy.log(Cypress.env('Item1_CostTotal'));
			_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_1);
			_common.maximizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ);
			_common.select_rowHasValue(cnt.uuid.BOQ_ESTIMATEBYBOQ, LINE_ITEM_DESCRIPTION_1);
			_validate.verifyValuesOf_generatedProjectBoq_fromLineitems(cnt.uuid.BOQ_ESTIMATEBYBOQ, LINE_ITEM_DESCRIPTION_1, CONTAINERS_COST_GROUP.UOM, CONTAINERS_COST_GROUP.QUANTITY[1], [Cypress.env('Item1_CostTotal')]);
			_common.minimizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ);
		});
	});

	it('TC - Verify Unit rate of Project BoQs for 2ed cost group', function () {
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_2);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('Item1_CostTotal2', parseFloat($ele1.text().replace(",", "")).toFixed(2))
			cy.log(Cypress.env('Item1_CostTotal2'));
			_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_3);
			_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
				Cypress.env('Item1_CostTotal3', parseFloat($ele1.text().replace(",", "")).toFixed(2))
				cy.log(Cypress.env('Item1_CostTotal3'));
				_common.maximizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ);
				_common.select_rowHasValue(cnt.uuid.BOQ_ESTIMATEBYBOQ, LINE_ITEM_DESCRIPTION_2);
				_validate.verifyValuesOf_generatedProjectBoq_fromLineitems(cnt.uuid.BOQ_ESTIMATEBYBOQ, null, CONTAINERS_COST_GROUP.UOM, CONTAINERS_COST_GROUP.QUANTITY[2], [Cypress.env('Item1_CostTotal3'), Cypress.env('Item1_CostTotal2')]);
				_common.minimizeContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ);
			});
		});
	});

	it('TC - Cost should match with that in line item structure container', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_1);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL)
			.then(($el) => {
				_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
				_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
					_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 2);
				});
				_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
				_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, Cypress.env('CostGroupCode1'));
				_common.assert_forNumericValues(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.COST_TOTAL, $el.text())
				_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
			})
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_1);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_UNIT)
			.then(($el) => {
				_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
				_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
					_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 2);
				});
				_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
				_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, Cypress.env('CostGroupCode1'));
				_common.assert_forNumericValues(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.COST_UNIT, $el.text())
				_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
			})
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, Cypress.env('CostGroupCode2'))
		cy.wait(1000) // required wait to load page
			.then(() => {
				_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_2);
				_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
				costTotal = _common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL)
			})
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 2);
		});
		_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
		_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, Cypress.env('CostGroupCode2'))
		_common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.COST_TOTAL)
			.then(($el) => {
				let costTotalVal: any = 0
				for (var i in costTotal) {
					costTotalVal += (+parseFloat(costTotal[i]).toFixed(3));
				}
				expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(costTotalVal).toFixed(2))
				_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
			})
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, Cypress.env('CostGroupCode2'))
		cy.wait(1000) // required wait to load page
			.then(() => {
				_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_2);
				_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
				costTotal = _common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_UNIT)
			})
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 2);
		});
		_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
		_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, Cypress.env('CostGroupCode2'))
		_common.getText_fromCell(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.COST_UNIT)
			.then(($el) => {
				let costTotalVal: any = 0
				for (var i in costTotal) {
					costTotalVal += (+parseFloat(costTotal[i]).toFixed(3));
				}
				expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(costTotalVal).toFixed(2))
				_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE)
			})
	});

	after(() => {
		cy.LOGOUT();
	})
});
