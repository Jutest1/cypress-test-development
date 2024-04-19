import { _common, _estimatePage, _validate, _mainView, _boqPage, _assembliesPage } from 'cypress/pages';
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';
import { BOQ_ROOT_ITEM } from 'cypress/pages/variables';


// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ASSEMBLY_DESC = 'Test' + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESC = 'ESTIMATE_DESC_' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const WIC_CATEGORY = 'WIC_CATEGORY'
const ASSEMBLY_CODE = 'ASSEMBLY_CODE'

let CONTAINER_ASSEMBLIES;
let CONTAINER_ASSEMBLY_RESOURCE
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORY
let CONTAINER_ASSEMBLY
let CONTAINER_COLUMNS_ASSEMBLIES
let ASSEMBLIES_RESOURCE_PARAMETERS: DataCells
let ASSEMBLIES_PARAMETERS: DataCells
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let CONTAINER_COLUMNS_ASSEMBLIES_WIC
let CONTAINER_ASSEMBLIES_WIC
let ESTIMATE_PARAMETERS: DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINER_COLUMNS_BOQ
let CONTAINERS_BOQ

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.62 | Create BoQ Items using Assemblies in Estimate');

describe('EST- 1.62 | Create BoQ Items using Assemblies in Estimate', () => {

	before(function () {
		cy.fixture('estimate/est-1.62-create-boq-items-using-assemblies-in-Estimate.json').then((data) => {
			this.data = data;
			CONTAINER_ASSEMBLIES = this.data.CONTAINERS.ASSEMBLIES
			CONTAINER_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
			CONTAINER_COLUMNS_ASSEMBLY_CATEGORY = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORY
			CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINER_ASSEMBLY = this.data.CONTAINERS.ASSEMBLY
			CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
			CONTAINER_COLUMNS_ASSEMBLIES_WIC = this.data.CONTAINER_COLUMNS.ASSEMBLIES_WIC
			CONTAINER_ASSEMBLIES_WIC = this.data.CONTAINERS.ASSEMBLIES_WIC
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
			CONTAINERS_BOQ = this.data.CONTAINERS.BOQ
			ASSEMBLIES_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: ASSEMBLY_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINER_ASSEMBLY_RESOURCE.QUANTITY,
			}
			ASSEMBLIES_RESOURCE_PARAMETERS = {
				[app.GridCells.CODE]: CONTAINER_ASSEMBLY_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINER_ASSEMBLY_RESOURCE.QUANTITY,
			}
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			}
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			})
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	it('TC - Create new Assemblies record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
		cy.wait(3000) //required wait to load page
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORY);
		});
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_ASSEMBLY.ASSEMBLY_CODE);
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
		_common.toggle_radioFiledInContainer("selectRadioButton",cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES);
		_common.create_newRecord(cnt.uuid.ASSEMBLIES);
		_assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES, ASSEMBLIES_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,ASSEMBLY_CODE)
		cy.wait(2000).then(()=>{
			_common.clickOn_cellHasValue(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,Cypress.env(ASSEMBLY_CODE))
		})
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE);
		});
		cy.wait(2000)
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
		_common.waitForLoaderToDisappear()
		_assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLIES_RESOURCE_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_WIC, app.FooterTab.WIC, 2);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_WIC, CONTAINER_COLUMNS_ASSEMBLIES_WIC);
		});
		cy.wait(2000).then(()=>{
			_common.clickOn_cellHasValue(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,Cypress.env(ASSEMBLY_CODE))
		})
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ASSEMBLY_WIC);
		cy.wait(2000)	
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		cy.wait(2000) //required wait to load modal
		_assembliesPage.enterRecord_toCreateWIC(CONTAINER_ASSEMBLIES_WIC.WIC_GROUP, CONTAINER_ASSEMBLIES_WIC.WIC_CATEGORY, CONTAINER_ASSEMBLIES_WIC.WIC_BOQ);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_WIC, app.GridCells.BOQ_WIC_CAT_BOQ_FK, WIC_CATEGORY)
	});

	it('TC - Create new Estimate header', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
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

	it('TC - Create new Line item and adding Assembly Template', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.IconButtons.ICO_SETTING_DOC)
		_assembliesPage.setup_EstimateConfigurationForAssembly(CONTAINERS_LINE_ITEM.EST_TYPE, CONTAINERS_LINE_ITEM.WIC_GROUP);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env(ASSEMBLY_CODE))
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE)
        _common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify BoQ in BoQs container', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
		_common.waitForLoaderToDisappear()
		cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		_common.waitForLoaderToDisappear()
		cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.BOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		cy.wait(1000).then(() => { //required wait to load page
			_common.search_inSubContainer(cnt.uuid.BOQS, Cypress.env(WIC_CATEGORY));
		})
		_common.goToButton_inActiveRow(cnt.uuid.BOQS, app.GridCells.REFERENCE, btn.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM)
		cy.wait(2000)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES);
		_common.search_inSubContainer(cnt.uuid.BOQ_STRUCTURES, CONTAINER_ASSEMBLIES_WIC.WIC_BOQ);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_BOQ.LINE_TYPE);
		_assembliesPage.validateBoQ_inBoQStructure();
	});

	after(() => {
		cy.LOGOUT();
	});
});
