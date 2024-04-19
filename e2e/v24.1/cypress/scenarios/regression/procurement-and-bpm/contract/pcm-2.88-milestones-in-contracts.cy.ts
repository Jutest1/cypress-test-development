import { tile, sidebar, commonLocators, app, cnt } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementContractPage, _procurementPage } from 'cypress/pages';
import _ from 'cypress/types/lodash';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
var milestone_type = 'milestone_type';
var amount = 'amount';
var tax_code = 'tax_code';
var date = 'date';

let REQUISITION_PARAMETERS:DataCells;
let MILESTONE1_PARAMETERS:DataCells;
let MILESTONE2_PARAMETERS:DataCells;
let MILESTONE3_PARAMETERS:DataCells;

let CONTAINERS_CONTRACT_BIDDER;
let CONTAINERS_MILESTONES;
let CONTAINERS_REQUISITION;

let CONTAINER_COLUMNS_CONTRACT_BIDDER;
let CONTAINER_COLUMNS_MILESTONES;
let CONTAINER_COLUMNS_REQUISITION;

allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.88 | Create milestones in contracts');

	describe('PCM- 2.88 | Create milestones in contracts', () => {

		before(function () {
			cy.fixture('pcm/pcm-2.88-milestones-in-contracts.json').then((data) => {
				this.data = data;
				CONTAINERS_CONTRACT_BIDDER = this.data.CONTAINERS.CONTRACT_BIDDER;
				CONTAINERS_MILESTONES = this.data.CONTAINERS.MILESTONES;
				CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
				
				CONTAINER_COLUMNS_CONTRACT_BIDDER=this.data.CONTAINER_COLUMNS.CONTRACT_BIDDER
				CONTAINER_COLUMNS_MILESTONES = this.data.CONTAINER_COLUMNS.MILESTONES
				CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
				
				REQUISITION_PARAMETERS = {
					[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
				}

				MILESTONE1_PARAMETERS = {
					[app.GridCells.PRC_MILESTONE_TYPE_FK]: CONTAINERS_MILESTONES.TYPE,
					[app.GridCells.AMOUNT_SMALL]: CONTAINERS_MILESTONES.AMOUNT,
					[app.GridCells.MDC_TAX_CODE_FK_SMALL]: CONTAINERS_MILESTONES.TAX_CODE,
					[app.GridCells.MILESTONE]: CONTAINERS_MILESTONES.DATE,
				};
				MILESTONE2_PARAMETERS = {
					[app.GridCells.PRC_MILESTONE_TYPE_FK]: CONTAINERS_MILESTONES.TYPE,
				};
				MILESTONE3_PARAMETERS = {
					[app.GridCells.PRC_MILESTONE_TYPE_FK]: CONTAINERS_MILESTONES.TYPE1,
					[app.GridCells.AMOUNT_SMALL]: CONTAINERS_MILESTONES.AMOUNT1,
					[app.GridCells.MDC_TAX_CODE_FK_SMALL]: CONTAINERS_MILESTONES.TAX_CODE1,
					[app.GridCells.MILESTONE]: CONTAINERS_MILESTONES.DATE1,
				};
			});
	
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	
		after(() => {
			cy.LOGOUT();
		});
	

	it('TC - Create Requisition and milestone record', function () {
				
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);

		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_MILESTONE, app.FooterTab.MILESTONES, 1);
			_common.waitForLoaderToDisappear()
			_common.setup_gridLayout(cnt.uuid.REQUISITION_MILESTONE, CONTAINER_COLUMNS_MILESTONES);
		});

		_common.create_newRecord(cnt.uuid.REQUISITION_MILESTONE);
		_procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.REQUISITION_MILESTONE, MILESTONE1_PARAMETERS);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, milestone_type);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.AMOUNT_SMALL, amount);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.MDC_TAX_CODE_FK_SMALL, tax_code);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_MILESTONE, app.GridCells.MILESTONE, date);

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
	});
	it('TC - Create Contract and assertion of milestone against requisition', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		
		_package.create_ContractfromPackage(CONTAINERS_CONTRACT_BIDDER.PARTNERNAME);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_MILESTONE, app.FooterTab.MILESTONES, 2);
			_common.setup_gridLayout(cnt.uuid.CONTRACT_MILESTONE, CONTAINER_COLUMNS_MILESTONES);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.CONTRACT_MILESTONE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.PRC_MILESTONE_TYPE_FK, Cypress.env(milestone_type));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.AMOUNT_SMALL, Cypress.env(amount));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.MDC_TAX_CODE_FK_SMALL, Cypress.env(tax_code));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.MILESTONE, Cypress.env(date));


		_common.create_newRecord(cnt.uuid.CONTRACT_MILESTONE);
		_procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.CONTRACT_MILESTONE, MILESTONE2_PARAMETERS);
		_validate.verifyMilestoneType_unique(commonLocators.CommonKeys.VALIDATION_WIZARD, CONTAINERS_MILESTONES.TYPE1);

		
		_procurementContractPage.enterRecord_toCreateMilestones(cnt.uuid.CONTRACT_MILESTONE, MILESTONE3_PARAMETERS);
		_common.delete_recordFromContainer(cnt.uuid.CONTRACT_MILESTONE);
		_validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_MILESTONE, CONTAINERS_MILESTONES.TYPE1);
	});
});
