import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage, _procurementPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';
const allure = Cypress.Allure.reporter.getInterface();
let PROJECTS_PARAMETERS:DataCells
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
let REQUISITION_PARAMETERS: DataCells;
let REQUISITION_ITEM_PARAMETER: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINERS_REQUISITION_ITEMS;
let CONTAINER_COLUMNS_REQUISITION_ITEMS;
let CONTAINER_COLUMNS_REQUISITION_TOTALS;
let CONTAINERS_PROCUREMENTCONTRACT;
let CONTAINER_COLUMNS_PROCUREMENTCONTRACT;

allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.75 | Create contract from requisition');

describe('PCM- 2.75 | Create contract from requisition', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.75-create-contract-from-requisition.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-2.75-create-contract-from-requisition.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
			CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS;
			CONTAINER_COLUMNS_REQUISITION_TOTALS = this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS;
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			}

			REQUISITION_ITEM_PARAMETER = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_REQUISITION_ITEMS.QUANTITY,
			};
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
			
			CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT
			CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT;
			
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
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
		});		
	});

	after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify creation requisition record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.maximizeContainer(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME)
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		cy.SAVE()
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, 'Service Material');
		cy.SAVE();
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)
	});

	it('TC - Verify creation requisition items record and add material', function () {
		cy.wait(1000)
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION_ITEMS.price,CONTAINER_COLUMNS_REQUISITION_ITEMS.basuomfk,CONTAINER_COLUMNS_REQUISITION_ITEMS.total],cnt.uuid.REQUISITIONITEMS)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		
		_common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS);
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_SMALL, "ItemPrice");
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.BAS_UOM_FK, "ItemUoM");
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.TOTAL, "ItemTotal");
		_common.minimizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.select_rowHasValue(cnt.uuid.REQUISITION_TOTALS, "Total");
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET, "NetValue");

	});

	it('TC - Verify Change requisition status', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		cy.SAVE();
		_common.select_rowInContainer(cnt.uuid.REQUISITIONS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK,commonLocators.CommonKeys.APPROVED);
	});

	it('TC - Create Contract from requisition wizard', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
			_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REQ_HEADER_FK, "requisitionID");
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DESCRIPTION, "requisitionName");
	});

	it('TC - verify create contract relate fields inherit from requisition', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT);
		});

		_common.waitForLoaderToDisappear()
		cy.SAVE();
		cy.wait(1000);//required Wait
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_REQUISITION_ITEMS);
		});
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		cy.wait(1000);//required Wait
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE);
		cy.wait(1000);//required Wait
		cy.REFRESH_SELECTED_ENTITIES();
		cy.wait(1000);//required Wait
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		cy.wait(1000);//required Wait

		_common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, CONTAINERS_REQUISITION_ITEMS.QUANTITY);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, Cypress.env("ItemUoM"));
		_common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.TOTAL, Cypress.env("ItemTotal"));
		_common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL, Cypress.env("ItemPrice"));
	});

	it('TC - verify calculations', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTRACT_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.select_rowHasValue(cnt.uuid.CONTRACT_TOTALS,  CONTAINERS_REQUISITION.TOTAL);
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env("NetValue"));
	});
	it('TC - verify Requisition Attributes', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
		});
		cy.REFRESH_SELECTED_ENTITIES();
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, 'Requisition(1)');
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, sidebar.SideBarOptions.ORDERED);
		cy.wait(1000);//required Wait
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env("requisitionID"));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, Cypress.env("requisitionName"));
	});
});
