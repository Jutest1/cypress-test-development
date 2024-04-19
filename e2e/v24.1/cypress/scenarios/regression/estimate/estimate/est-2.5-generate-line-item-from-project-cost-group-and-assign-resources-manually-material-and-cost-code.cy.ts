import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import _ from 'cypress/types/lodash';
import { DataCells } from 'cypress/pages/interfaces';
const ALLURE = Cypress.Allure.reporter.getInterface();
const CONTAINERS_DATA_RECORD_CODE="DC-" + Cypress._.random(0, 999);
const CONTAINERS_DATA_RECORD_DESC="DR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const COST_GROUP="CG-" + Cypress._.random(0, 999);
const COST_GROUP_DESC="CGD-" + Cypress._.random(0, 999);
const SUB_COST_GROUP="SCG-" + Cypress._.random(0, 999);
const SUB_COST_GROUP_DESC="SCGD-" + Cypress._.random(0, 999);
const SUB1_COST_GROUP="S1CG-" + Cypress._.random(0, 999);
const SUB1_COST_GROUP_DESC="S1CGD-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINERS_DATA_RECORD
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS:DataCells
let RESOURCE_PARAMETERS_MATERIAL:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let CONTAINERS_COST_GROUP
let ESTIMATE_CONFIGURATION_PARAMETER:DataCells

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 2.5 | Generate Line item from Project Cost group and assign resources manually (material and cost code)');
describe('EST- 2.5 | Generate Line item from Project Cost group and assign resources manually (material and cost code)', () => {
	before(function () {
		cy.fixture('estimate/est-2.5-generate-line-item-from-project-cost-group-and-assign-resources-manually-material-and-cost-code.json')
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
			  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
			  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
			  [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
			  [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
			};
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			GENERATE_LINE_ITEMS_PARAMETERS={
			  [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
			  [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:CONTAINERS_DATA_RECORD_CODE                
			}
			RESOURCE_PARAMETERS_MATERIAL={
			  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_1,
			  [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
			  [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY_1
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
				[app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.PROJECT_COST_GROUP,
				[app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.FROM_STRUCTURE,
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
		_estimatePage.projectCatalogConfiguration(CONTAINERS_DATA_RECORD.DATA_RECORD_TYPE, CONTAINERS_DATA_RECORD.DATA_RECORD_SEARCH, '', CONTAINERS_DATA_RECORD_CODE, CONTAINERS_DATA_RECORD_DESC);
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

	it('TC - Verify Cost group gets added in the project module', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COST_GROUP_CATALOG, app.FooterTab.COSTGROUPCATALOG, 1);
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.COST_GROUP_CATALOG)
		_common.clear_subContainerFilter(cnt.uuid.COST_GROUP_CATALOG)
		_common.search_inSubContainer(cnt.uuid.COST_GROUP_CATALOG,CONTAINERS_DATA_RECORD_CODE)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.COST_GROUP_CATALOG, app.GridCells.CODE, CONTAINERS_DATA_RECORD_CODE);
		_common.minimizeContainer(cnt.uuid.COST_GROUP_CATALOG)

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COST_GROUPS, app.FooterTab.COSTGROUPS, 1);
		});
		
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.COST_GROUPS)
		_common.clear_subContainerFilter(cnt.uuid.COST_GROUPS)
		_common.create_newRecord(cnt.uuid.COST_GROUPS);
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, COST_GROUP);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, COST_GROUP_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.QUANTITY);
		_common.edit_dropdownCellWithInput(cnt.uuid.COST_GROUPS, app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.UOM);
		_common.select_activeRowInContainer(cnt.uuid.COST_GROUPS)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.create_newSubRecord(cnt.uuid.COST_GROUPS);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_COST_GROUP);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_COST_GROUP_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.QUANTITY_1);
		_common.edit_dropdownCellWithInput(cnt.uuid.COST_GROUPS, app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.UOM);
		_common.select_activeRowInContainer(cnt.uuid.COST_GROUPS)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.clickOn_cellHasUniqueValue(cnt.uuid.COST_GROUPS, app.GridCells.CODE, COST_GROUP);
		_common.create_newSubRecord(cnt.uuid.COST_GROUPS);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB1_COST_GROUP);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION,SUB1_COST_GROUP_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.COST_GROUPS, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_GROUP.QUANTITY_2);
		_common.select_activeRowInContainer(cnt.uuid.COST_GROUPS)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.minimizeContainer(cnt.uuid.COST_GROUPS)

	});

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

	it('TC - Verify Line items gets generated from Project Cost group', function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.costtotal],cnt.uuid.ESTIMATE_LINEITEMS)
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

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SUB_COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SUB_COST_GROUP_DESC)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_COST_GROUP.QUANTITY_1);

		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SUB1_COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SUB1_COST_GROUP_DESC)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_COST_GROUP.QUANTITY_2);
	});

	it("TC - Create new record in material and cost code resource", function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costtotal],cnt.uuid.RESOURCES)
		});
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SUB_COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SUB_COST_GROUP_DESC)

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SUB1_COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SUB1_COST_GROUP_DESC)

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_MATERIAL);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify cost total of each line item resources', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SUB_COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SUB_COST_GROUP_DESC)
		_validate.verify_costTotalOfResources_WithLineItemCostTotal();
		
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SUB1_COST_GROUP_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SUB1_COST_GROUP_DESC)
		_validate.verify_costTotalOfResources_WithLineItemCostTotal();
	});
});
