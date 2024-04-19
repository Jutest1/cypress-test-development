import { _common, _estimatePage, _mainView, _modalView, _sidebar, _validate } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import { EST_HEADER } from 'cypress/pages/variables';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 1.1 | Create new estimate record');

describe('EST- 1.1 | Create new Estimate record', () => {

	before(function () {
		cy.fixture('estimate/est-1.1-create-new-estimate-record.json')
		  .then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
		}).then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

		})
	});
	
	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new estimate record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
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

	it('TC - Validate created estimate record', () => {
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION);
		_validate.verify_isRecordEntered(cnt.uuid.ESTIMATE,app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION,EST_HEADER);
	});

	it('TC - Delete estimate record', () => {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.delete_recordFromContainer(cnt.uuid.ESTIMATE);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
	});

	it('TC - Validate delete estimate record', () => {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION);
		_validate.verify_isRecordDeleted(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION);
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
	});
});
