import { tile, app, cnt, commonLocators, sidebar } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementContractPage, _procurementPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import _ from 'cypress/types/lodash';

const allure = Cypress.Allure.reporter.getInterface();
var milestone_type = 'milestone_type';
var amount = 'amount';
var tax_code = 'tax_code';
var date = 'date';
let REQUISITION_PARAMETERS: DataCells;
let REQUISITION_ITEM_PARAMETER: DataCells;
let MILESTONES_PARAMETER: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINERS_REQUISITION_ITEMS;
let CONTAINER_COLUMNS_REQUISITION_ITEMS;
let CONTAINERS_MILESTONES;
let CONTAINER_COLUMNS_MILESTONES;
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.167 | Milestones in requisition');
describe('PCM- 2.167 | Milestones in requisition', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.167-milestones-in-requisition.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.167-milestones-in-requisition.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
			CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS;
			CONTAINER_COLUMNS_MILESTONES = this.data.CONTAINER_COLUMNS.REQUISITION_MILESTONE
			CONTAINERS_MILESTONES = this.data.CONTAINERS.REQUISITION_MILESTONE;
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			}
			MILESTONES_PARAMETER = {
				[app.GridCells.PRC_MILESTONE_TYPE_FK]: CONTAINERS_MILESTONES.TYPE,
				[app.GridCells.AMOUNT_SMALL]: CONTAINERS_MILESTONES.AMOUNT,
				[app.GridCells.MDC_TAX_CODE_FK]: CONTAINERS_MILESTONES.TAX_CODE,
				[app.GridCells.MILESTONE]: CONTAINERS_MILESTONES.DATE,
			};
			REQUISITION_ITEM_PARAMETER = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE,
				[app.GridCells.QUANTITY]: CONTAINERS_REQUISITION_ITEMS.QUANTITY,
			};


			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create Requisition and milestone record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000)
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
		cy.wait(1000)
		cy.SAVE()
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)

		cy.wait(1000)
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);

		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000)
		_common.minimizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_MILESTONE, app.FooterTab.MILESTONES, 3);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_MILESTONE, CONTAINER_COLUMNS_MILESTONES);
		});
		_common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE);
		_common.select_rowInContainer(cnt.uuid.REQUISITION_MILESTONE)
		_procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.REQUISITION_MILESTONE, MILESTONES_PARAMETER);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, CONTAINERS_MILESTONES.TYPE);
		cy.wait(1000); //required waits
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, milestone_type);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.AMOUNT_SMALL, amount);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.MDC_TAX_CODE_FK_SMALL, tax_code);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.MILESTONE, date);
		_common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE);
		_procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.REQUISITION_MILESTONE, MILESTONES_PARAMETER);
		_validate.verifyMilestoneType_unique(CONTAINERS_MILESTONES.LABEL_NAME, CONTAINERS_MILESTONES.TYPE_2);
		_common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK);
		_validate.verify_dataUnderFilter(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, app.InputFields.INPUT_GROUP_CONTENT, commonLocators.CommonKeys.LIST, CONTAINERS_MILESTONES.TYPE1);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.MDC_TAX_CODE_FK_SMALL);

		cy.SAVE();
		cy.wait(1000); //required waits 

		_validate.verify_dataUnderFilter(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.MDC_TAX_CODE_FK_SMALL, app.InputFields.INPUT_GROUP_CONTENT, commonLocators.CommonKeys.GRID, CONTAINERS_MILESTONES.TAX_CODE1);
		_common.delete_recordFromContainer(cnt.uuid.REQUISITION_MILESTONE);

		_common.search_inSubContainer(cnt.uuid.REQUISITION_MILESTONE, CONTAINERS_MILESTONES.TYPE_2);
		_common.delete_recordFromContainer(cnt.uuid.REQUISITION_MILESTONE);
		_validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_MILESTONE, CONTAINERS_MILESTONES.TYPE_2);

	});
	it('TC - Create Contract and assertion of milestone against requisition', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_MILESTONE, app.FooterTab.MILESTONES, 2);
			_common.waitForLoaderToDisappear()
			_common.setup_gridLayout(cnt.uuid.CONTRACT_MILESTONE, CONTAINER_COLUMNS_MILESTONES);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.CONTRACT_MILESTONE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, Cypress.env(milestone_type));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.AMOUNT_SMALL, Cypress.env(amount));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.MDC_TAX_CODE_FK_SMALL, Cypress.env(tax_code));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.MILESTONE, Cypress.env(date));
	});
});
