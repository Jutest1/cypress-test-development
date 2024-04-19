import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _validate } from "cypress/pages";
import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();
const CONTAINERS_DATA_RECORD_CODE="DC-" + Cypress._.random(0, 999);
const CONTAINERS_DATA_RECORD_DESC="DR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const COST_GROUP="CG-" + Cypress._.random(0, 999);
const COST_GROUP_DESC="CGD-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINERS_DATA_RECORD
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let CONTAINERS_COST_GROUP
let ESTIMATE_CONFIGURATION_PARAMETER:DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 2.15 | Generate line item from enterprise cost group independent of respective quantities");
describe("EST- 2.15 | Generate line item from enterprise cost group independent of respective quantities", () => {

	before(function () {
		cy.fixture("estimate/est-2.15-Generate-line-item-from-enterprise-cost-group-independent-of-respective-quantities.json")
		.then((data) => {
			this.data = data;
			CONTAINERS_DATA_TYPE=this.data.CONTAINERS.DATA_TYPE
			CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
			CONTAINERS_DATA_RECORD=this.data.CONTAINERS.DATA_RECORD
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
			}
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			GENERATE_LINE_ITEMS_PARAMETERS={
				[commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:CONTAINERS_DATA_RECORD_CODE                
			}
			MODAL_PROJECTS=this.data.MODAL.PROJECTS
			PROJECTS_PARAMETERS={
				[commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
				[commonLocators.CommonLabels.NAME]:PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
			}
			CONTAINERS_COST_GROUP=this.data.CONTAINERS.COST_GROUP
			ESTIMATE_CONFIGURATION_PARAMETER = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.ESTIMATE_STRUCTURE],
				[commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
				[commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
				[commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS]:commonLocators.CommonKeys.CREATE,
				[app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.ENTERPRISE_COST_GROUP,
				[app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.NO_RELATION,
				[app.GridCells.CODE]:CONTAINERS_DATA_RECORD_CODE
			}
		})
		.then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		})
	});

  	after(() => {
		cy.LOGOUT();
	});

	it('TC - Add Cost group catalog', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    	_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_GROUPS)
    	_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.COSTGROUPS).then(() => {
      	_common.setDefaultView(app.TabBar.COSTGROUPS)
      	_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.COST_GROUP_CATALOG_V1, app.FooterTab.COST_GROUP_CATALOG, 0);
			_common.waitForLoaderToDisappear()
		});
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.COSTGROUPS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COST_GROUP_CATALOG_V1, app.FooterTab.COST_GROUP_CATALOG, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.COST_GROUP_CATALOG_V1)
		_common.clear_subContainerFilter(cnt.uuid.COST_GROUP_CATALOG_V1)
		_common.create_newRecord(cnt.uuid.COST_GROUP_CATALOG_V1)
    	_common.enterRecord_inNewRow(cnt.uuid.COST_GROUP_CATALOG_V1, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CONTAINERS_DATA_RECORD_CODE);
		_common.select_activeRowInContainer(cnt.uuid.COST_GROUP_CATALOG_V1)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUP_CATALOG_V1, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_DATA_RECORD_DESC);
		_common.select_activeRowInContainer(cnt.uuid.COST_GROUP_CATALOG_V1)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.COST_GROUP_CATALOG_V1)

		_common.openTab(app.TabBar.COSTGROUPS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COSTGROUP, app.FooterTab.COST_GROUP, 0);
		});
		
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.COSTGROUP)
		_common.clear_subContainerFilter(cnt.uuid.COSTGROUP)
		_common.create_newRecord(cnt.uuid.COSTGROUP);
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.COSTGROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, COST_GROUP);
		_common.enterRecord_inNewRow(cnt.uuid.COSTGROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, COST_GROUP_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.COSTGROUP, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.QUANTITY);
		_common.edit_dropdownCellWithInput(cnt.uuid.COSTGROUP, app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.UOM);
		_common.select_activeRowInContainer(cnt.uuid.COSTGROUP)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

  	it('TC - Customizing setting', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MASTERDATA).then(() => {
		_common.setDefaultView(app.TabBar.MASTERDATA,commonLocators.CommonKeys.DEFAULT)
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
			_common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
		})
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
		_common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE)
		_common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE)

		_common.openTab(app.TabBar.MASTERDATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
		})
		_common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
		_common.maximizeContainer(cnt.uuid.DATA_RECORDS)
		_estimatePage.projectCatalogConfiguration(CONTAINERS_DATA_RECORD.DATA_RECORD_TYPE, CONTAINERS_DATA_RECORD.DATA_RECORD_SEARCH, CONTAINERS_DATA_RECORD_CODE,"","");
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.DATA_RECORDS)
	})

  	it('TC - Create new project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
		_common.waitForLoaderToDisappear()
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
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
	})

	it('TC - Create new estimate record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
		  _common.setDefaultView(app.TabBar.ESTIMATE)
		  _common.waitForLoaderToDisappear()
		  _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		  _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

  	it('TC - Verify Line items gets generated from Enterprise Cost group', function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.estqtytelaotfk],cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS,btn.IconButtons.ICO_SETTING_DOC)
		_common.waitForLoaderToDisappear()
		_estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIGURATION_PARAMETER)
		cy.wait(100).then(() => {
			_common.clickOn_modalFooterButton(btn.ButtonText.OK)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
	});

  	it("TC- Verify the quantity in the line item container", function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, COST_GROUP_DESC)
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_TELAOT_FK,commonLocators.CommonKeys.NO_RELATION)
		_common.assert_forNumericValues_notEqualCondition(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,CONTAINERS_COST_GROUP.QUANTITY);
  	});
  
})