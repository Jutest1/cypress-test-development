import { tile, app, cnt, btn, sidebar, commonLocators } from 'cypress/locators';
import CommonLocators from 'cypress/locators/common-locators';
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _procurementConfig, _validate, _controllingUnit } from 'cypress/pages';
import { CommonPage } from 'cypress/pages/common/common-page';
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const CONTROLLING_UNIT_DESCRIPTION = 'CU-DESC-' + Cypress._.random(0, 999);
const BID_DESCRIPTION = 'BID-DESC-' + Cypress._.random(0, 999);
const CREATE_CONTRACT_DESC = 'CON-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINERS_CONTRACTS;
let CONTAINER_COLUMNS_CONTRACTS;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let ESTIMATE_CONFIGURATION_PARAMETER:DataCells
let MODAL_CREATE_BID
let DJC_BUDGET_PARAMETERS:DataCells
let MODAL_GENERATE_BUDGET;
let PROJECTS_PARAMETERS
let MODAL_PROJECTS

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 3.6 | Update controlling budget');
describe('EST- 3.6 | Update controlling budget', () => {

	before(function () {
		cy.fixture('estimate/est-3.6-update-controlling-budget.json')
		  .then((data) => {
			this.data=data
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
			  [app.GridCells.CODE]: ESTIMATE_CODE,
			  [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
			  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
			  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
			  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
			  [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
			};
			CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
			CONTROLLING_UNIT_PARAMETERS={
			[app.GridCells.DESCRIPTION_INFO]:CONTROLLING_UNIT_DESCRIPTION,
			[app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
			[app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
			}
			GENERATE_LINE_ITEMS_PARAMETERS={
				[commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:commonLocators.CommonKeys.CONTROLLING_UNIT                
			}
			ESTIMATE_CONFIGURATION_PARAMETER = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.ESTIMATE_STRUCTURE],
				[commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
				[commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
				[commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS]:commonLocators.CommonKeys.EDIT,
				[app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.CONTROLLING_UNITS,
				[app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.FROM_STRUCTURE
			}
			MODAL_CREATE_BID=this.data.MODAL.CREATE_BID
			MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
            DJC_BUDGET_PARAMETERS={
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]:MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]:MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]:MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }
			CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS;
			CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS;

			MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
		  }).then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
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
	});

	after(() => {
		cy.LOGOUT();
	});

	it("TC - Create controlling unit", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CONTROLLING_UNIT_DESCRIPTION)
		_common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
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

	it("TC - Generate controlling unit line item", function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.budget],cnt.uuid.ESTIMATE_LINEITEMS)
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

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
	});

	it("TC - Create new record in resource", function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
		_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it("TC - Create bid and update bid status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
        _common.waitForLoaderToDisappear()
		_bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID,BID_DESCRIPTION,  MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 2);
            _common.clear_subContainerFilter(cnt.uuid.BIDS)
			_common.select_rowHasValue(cnt.uuid.BIDS,BID_DESCRIPTION)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
        });
    });

	it("TC - Create contract and update contract status", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_common.waitForLoaderToDisappear()
		_saleContractPage.create_contract_fromWizard(CREATE_CONTRACT_DESC);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACTS).then(() => {
		  _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 1);
		  _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACTS)
		  _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
		  _common.select_rowHasValue(cnt.uuid.CONTRACTS,CREATE_CONTRACT_DESC)
		});
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.CONTRACTS,app.GridCells.CUSTOMER_FK,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACTS.CUSTOMER)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACTS).then(() => {
		  _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
		});
	});

	it('TC - Navigate back to estimate and generate Budget with update controlling budget', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
		_common.waitForLoaderToDisappear()
        _common.filterCurrentEstimate(cnt.uuid.ESTIMATE,commonLocators.CommonKeys.NO_FILTER)
		_common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.budget,CONTAINER_COLUMNS_LINE_ITEM.costtotal],cnt.uuid.ESTIMATE_LINEITEMS)
        });
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,CONTROLLING_UNIT_DESCRIPTION)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTROLLING_UNIT_DESCRIPTION)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()

        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_CONTROLLING_BUDGET);
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_CONTROLLING_BUDGET);
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,CONTROLLING_UNIT_DESCRIPTION)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTROLLING_UNIT_DESCRIPTION)
		_common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BUDGET,"BUDGET")
	});

	it('TC - Verify estimate cost total with Controlling Budget', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
			_common.set_columnAtTop([CONTAINER_COLUMNS_CONTROLLING_UNIT.budget],cnt.uuid.CONTROLLING_UNIT)
		});
		_common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
		_common.select_allContainerData(cnt.uuid.CONTROLLING_UNIT)
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_common.clickOn_toolbarButton(cnt.uuid.CONTROLLING_UNIT,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, CONTROLLING_UNIT_DESCRIPTION);
		_common.assert_forNumericValues(cnt.uuid.CONTROLLING_UNIT, app.GridCells.BUDGET, Cypress.env("BUDGET").toString());
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
	});
});
