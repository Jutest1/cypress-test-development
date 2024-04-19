import { tile, app, cnt, commonLocators, btn, sidebar } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _saleContractPage, _procurementConfig, _validate, _procurementPage, _projectPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import _ from 'cypress/types/lodash';

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const PROJECT_NO = "39" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS"
let ESTIMATE_PARAMETERS: DataCells,
	PROJECTS_PARAMETERS,
	LINE_ITEM_PARAMETERS,
	RESOURCE_PARAMETERS_MATERIAL,
	DELIVERY_SHEDULE_PARAMETER_1,
	DELIVERY_SHEDULE_PARAMETER_2

let CONTAINERS_ESTIMATE,
	CONTAINER_COLUMNS_ESTIMATE,
	CONTAINER_LINE_ITEM,
	CONTAINER_COLUMNS_LINE_ITEM,
	CONTAINERS_RESOURCE,
	CONTAINER_COLUMNS_RESOURCE,
	CONTAINER_COLUMNS_PACKAGE_ITEMS,
	CONTAINERS_DELIVERY_SHEDULE,
	CONTAINER_COLUMNS_DELIVERY_SHEDULE


const DELI_DESC = 'DELIVERY_DESC-' + Cypress._.random(0, 999);
const DELI_DESC1 = 'DELIVERY_DESC-' + Cypress._.random(0, 999);
var packageCode: string;
var reqCode: string;
var openQuantity: any;
var quantity: string;

allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.110 | Generate delivery schedule for requisition manually');

describe('PCM- 2.110 | Generate delivery schedule for requisition manually', () => {

	before(function () {
		cy.fixture('pcm/pcm-2.110-generate-delivery-schedule-for-requisition-manually.json').then((data) => {
			this.data = data;

			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
				[commonLocators.CommonLabels.NAME]: PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]: CLERK
			}

			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINER_COLUMNS_PACKAGE_ITEMS = this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS
			CONTAINERS_DELIVERY_SHEDULE = this.data.CONTAINERS.DELIVERY_SHEDULE
			CONTAINER_COLUMNS_DELIVERY_SHEDULE = this.data.CONTAINER_COLUMNS.DELIVERY_SHEDULE

			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINER_LINE_ITEM.QUANTITY,
				[app.GridCells.BAS_UOM_FK]: CONTAINER_LINE_ITEM.UOM,
			};
			RESOURCE_PARAMETERS_MATERIAL = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
			};
			DELIVERY_SHEDULE_PARAMETER_1 = {
				[app.GridCells.DATE_REQUIRED]: CONTAINERS_DELIVERY_SHEDULE.DATE[0],
				[app.GridCells.DESCRIPTION]: DELI_DESC,
				[app.GridCells.TIME_REQUIRED]: CONTAINERS_DELIVERY_SHEDULE.TIME[0],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_DELIVERY_SHEDULE.QUANTITY[0],
			};
			DELIVERY_SHEDULE_PARAMETER_2 = {
				[app.GridCells.DATE_REQUIRED]: CONTAINERS_DELIVERY_SHEDULE.DATE[1],
				[app.GridCells.DESCRIPTION]: DELI_DESC1,
				[app.GridCells.TIME_REQUIRED]: CONTAINERS_DELIVERY_SHEDULE.TIME[1],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_DELIVERY_SHEDULE.QUANTITY[1],
			};
			cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
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
		});
	});
	  after(() => {
			cy.LOGOUT();
		});
	it('TC - Create New Estimate Record', function () {
		_common.waitForLoaderToDisappear()
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
	});

	it('TC- Create new Line item record', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);

	});

	it('TC- Assign material resource to line item', function () {
		_common.waitForLoaderToDisappear();
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES);
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.select_rowInContainer(cnt.uuid.RESOURCES);
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($value) => {
			quantity = $value.text();
			cy.log(quantity);
		});
	});

	it('TC- Verify Create/update material Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE);
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		_common.select_rowInContainer(cnt.uuid.PACKAGE)
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.CODE).then(($value) => {
			packageCode = $value.text();
			cy.log(packageCode);
		});
		_common.waitForLoaderToDisappear()
	});

	it('TC-Create requisition from Package', function () {
		_package.changeStatus_ofPackage_inWizard();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
	_common.waitForLoaderToDisappear()
	_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		_common.waitForLoaderToDisappear()
	
		_common.select_dataFromSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE);
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($value) => {
			reqCode = $value.text();
			cy.log(reqCode);
		});
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS);
		});
		cy.wait(1000);
		_common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS);
		_common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS, app.GridCells.QUANTITY_SMALL, quantity);
	});

	it('TC- Create delivery schedule for requisition', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE, app.FooterTab.DELIVERY_SCHEDULE, 1);
		});
		_common.maximizeContainer(cnt.uuid.DELIVERY_SCHEDULE);
		_common.create_newRecord(cnt.uuid.DELIVERY_SCHEDULE);
		cy.REFRESH_SELECTED_ENTITIES();
		_procurementPage.enterRecord_toCreateDeliverySchedule(cnt.uuid.DELIVERY_SCHEDULE, DELIVERY_SHEDULE_PARAMETER_1);
		cy.wait(2000);
		_common.waitForLoaderToDisappear()
		_common.assert_getText_fromContainerForm(cnt.uuid.DELIVERY_SCHEDULE, CONTAINERS_DELIVERY_SHEDULE.LABEL[1], CONTAINERS_DELIVERY_SHEDULE.QUANTITY[0]);
		_common.assert_getText_fromContainerForm(cnt.uuid.DELIVERY_SCHEDULE, CONTAINERS_DELIVERY_SHEDULE.LABEL[2], CONTAINERS_DELIVERY_SHEDULE.QUANTITY[1]);
		_common.create_newRecord(cnt.uuid.DELIVERY_SCHEDULE);
		_procurementPage.enterRecord_toCreateDeliverySchedule(cnt.uuid.DELIVERY_SCHEDULE, DELIVERY_SHEDULE_PARAMETER_2);
		cy.wait(2000);
		cy.SAVE();
		_common.assert_cellData(cnt.uuid.DELIVERY_SCHEDULE, app.GridCells.DESCRIPTION, DELI_DESC);
		_common.perform_additionOfCellData(cnt.uuid.DELIVERY_SCHEDULE, app.GridCells.QUANTITY_SMALL);
	});

	it('TC-Verify sum of quantities in delivery schedule with total quantity and verify record is deleted or not', function () {
		_common.assert_getText_fromContainerForm(cnt.uuid.DELIVERY_SCHEDULE, CONTAINERS_DELIVERY_SHEDULE.LABEL[0], CONTAINERS_RESOURCE.QUANTITY);
		_common.select_allContainerData(cnt.uuid.DELIVERY_SCHEDULE);
		_common.delete_recordFromContainer(cnt.uuid.DELIVERY_SCHEDULE);
		_validate.verify_isRecordDeleted(cnt.uuid.DELIVERY_SCHEDULE, DELI_DESC);
	});
});
