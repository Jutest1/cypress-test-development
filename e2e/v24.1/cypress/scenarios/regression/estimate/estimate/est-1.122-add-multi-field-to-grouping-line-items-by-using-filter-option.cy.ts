import { tile, app, cnt, commonLocators, sidebar, btn } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _controllingUnit, _projectPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
const allure = Cypress.Allure.reporter.getInterface();
const CONTROLLING_UNIT_DESC = "CU_DESC" + Cypress._.random(0, 999);
const LOCATION1 = "LOC-01-" + Cypress._.random(0, 999);
const LOCATION1_DESC = "NASHIK-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = "LI-1_DESC" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells
let PROJECTS_PARAMETERS: DataCells;
let CONTAINERS_LOCATION,
	CONTAINER_COLUMNS_LOCATION;
let CONTAINERS_LINE_ITEMS_STRUCTURE,
	CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let RESOURCE_PARAMETERS_1: DataCells
let LINE_ITEM_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS_1: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.122 | Add multi fields to grouping line items by using Filter option.');
describe('EST- 1.122 | Add multi fields to grouping line items by using Filter option.', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.122-add-multi-field-to-grouping-line-items-by-using-filter-option.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(
			Cypress.env('adminUserName'),
			Cypress.env('adminPassword'),
			Cypress.env('parentCompanyName'),
			Cypress.env('childCompanyName')
		);
		cy.fixture('estimate/est-1.122-add-multi-field-to-grouping-line-items-by-using-filter-option.json').then((data) => {
			this.data = data;
			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_NAME,
				[commonLocators.CommonLabels.CLERK]: CLERK_NAME,
			}
			CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
			CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
			}
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}


			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
			};
			LINE_ITEM_PARAMETERS_1 = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
			};

			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
			};
			RESOURCE_PARAMETERS_1 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
			};

			CONTAINERS_LINE_ITEMS_STRUCTURE = this.data.CONTAINERS.LINE_ITEMS_STRUCTURE;
			CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE = this.data.CONTAINER_COLUMNS.LINE_ITEMS_STRUCTURE;
			CONTAINERS_LOCATION = this.data.CONTAINERS.LOCATION
			CONTAINER_COLUMNS_LOCATION = this.data.CONTAINER_COLUMNS.LOCATION

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC- Add Location to project', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 3);
			_common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATION)
		});
		_common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
		_estimatePage.enterRecord_toCreateLocation(LOCATION1, LOCATION1_DESC)
		cy.SAVE()
	})
	it("TC - Create controlling unit", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
	});

	it("TC - Create estimate header", function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
	});
	it('TC - Create first line item with quantity and Controlling unit ', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
			_common.waitForLoaderToDisappear()
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.basuomfk, CONTAINER_COLUMNS_LINE_ITEM.quantitytarget, CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget, CONTAINER_COLUMNS_LINE_ITEM.mdccontrollingunitfk, CONTAINER_COLUMNS_LINE_ITEM.prjlocationfk, CONTAINER_COLUMNS_LINE_ITEM.mdccontrollingunitfkdescription], cnt.uuid.ESTIMATE_LINEITEMS)
			_common.waitForLoaderToDisappear()
			_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTROLLING_UNIT_DESC)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET)
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.AQ_QUANTITY)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET)
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.WQ_QUANTITY)
		cy.SAVE()
		cy.wait(1000)//The wait is mandatory here
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.MDC_CONTROLLING_UNIT_FK_DESCRIPTION, CONTROLLING_UNIT_DESC)
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)


	});
	it('TC - Assign resource to first line item', function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.RESOURCES)

		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);


	});
	it('TC - Create second line item with quantity and Location', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
			_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, LOCATION1)
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET)
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.AQ_QUANTITY_1)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET)
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.WQ_QUANTITY_1)
		cy.SAVE()
		cy.wait(1000)//The wait is mandatory here
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION1)
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

	});
	it('TC - Assign resource to the line item', function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.RESOURCES)


	});
	it('TC- Add Multi field grouping Line item filter option with Controlling unit', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE, 0)
			_common.setup_gridLayout(cnt.uuid.LINEITEMSSTRUCTURE, CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE)
			_common.waitForLoaderToDisappear()
		})
		_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE);
		cy.wait(1000)//The wait is mandatory here
		_estimatePage.add_LineItemsStructure(CONTAINERS_LINE_ITEM.CU);
		_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, CONTROLLING_UNIT_DESC)
		_common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.MARKER)
		cy.wait(1000)//The wait is mandatory here
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.QUANTITY_TARGET, CONTAINERS_LINE_ITEM.AQ_QUANTITY)
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_LINE_ITEM.WQ_QUANTITY)

		_common.clickOn_cellHasIcon(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_FOLDER_OVERLEY_1)
		_common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.MARKER)
		cy.wait(1000)//The wait is mandatory here
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.QUANTITY_TARGET, CONTAINERS_LINE_ITEM.AQ_QUANTITY_1)
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_LINE_ITEM.WQ_QUANTITY_1)
		_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE);

	})
	it('TC- Add Multi field grouping Line item filter option with Location', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
			_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)

		});
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_1)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE);
		});
		_common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE);
		cy.wait(1000)//The wait is mandatory here
		_estimatePage.add_LineItemsStructure(CONTAINERS_LINE_ITEM.Location);
		_common.select_rowHasValue(cnt.uuid.LINEITEMSSTRUCTURE, (LOCATION1 + " " + LOCATION1_DESC))
		_common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.MARKER)
		cy.wait(1000)//The wait is mandatory here
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.QUANTITY_TARGET, CONTAINERS_LINE_ITEM.AQ_QUANTITY_1)
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_LINE_ITEM.WQ_QUANTITY_1)

		_common.clickOn_cellHasIcon(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_FOLDER_OVERLEY_1)
		cy.wait(1000)//The wait is mandatory here
		_common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.MARKER)
		cy.wait(1000)//The wait is mandatory here
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.QUANTITY_TARGET, CONTAINERS_LINE_ITEM.AQ_QUANTITY_1)
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_LINE_ITEM.WQ_QUANTITY_1)
		_common.minimizeContainer(cnt.uuid.LINEITEMSSTRUCTURE);

	})
})