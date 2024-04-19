import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
const NEW_CONFIG_NAME = 'NC-' + Cypress._.random(0, 999);

const QUANTITY_FACTOR_DETAILS_1 = 'QUANTITY_FD1'
const QUANTITY_FACTOR_DETAILS_2 = 'QUANTITY_FD2'
const COST_FACTOR_DETAILS_1 = 'COST_FD1'
const COST_FACTOR_DETAILS_2 = 'COST_FD2'
const QUANTITY_DETAILS = 'QUANTITY_D'
const EFFICIENCY_FACTOR_DETAILS_1 = 'EFFI_FD1'

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_SELECT_ESTIMATE_SCOPE
let MODAL_MODIFY_DETAILS
let MODIFY_RESOURCE_PARAMETER: DataCells
let MODAL_MODAL_DETAILS_OPTION_DATA1

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 1.13 | Modify resource in estimate');

describe('EST- 1.13 | Modify resource in estimate', () => {
	before(function () {
		cy.fixture('estimate/est-1.13-modify-resource-in-an-estimate.json')
			.then((data) => {
				this.data = data;
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
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
					[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				};
				CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
				CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
				RESOURCE_PARAMETERS = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
				};
				RESOURCE_PARAMETERS_2 = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
				};
				RESOURCE_PARAMETERS_3 = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
				};
				MODAL_SELECT_ESTIMATE_SCOPE = this.data.MODAL.SELECT_ESTIMATE_SCOPE
				MODAL_MODIFY_DETAILS = this.data.MODAL.MODIFY_DETAILS
				MODAL_MODAL_DETAILS_OPTION_DATA1 = this.data.MODAL.MODIFY_DETAILS[0].OptionData

				MODIFY_RESOURCE_PARAMETER = {
					[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE, commonLocators.CommonLabels.MODIFY_DETAILS],
					[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_SELECT_ESTIMATE_SCOPE.SELECT_ESTIMATE_SCOPE,
					[commonLocators.CommonLabels.MODIFY_DETAILS]: MODAL_MODIFY_DETAILS,
					[commonLocators.CommonKeys.NEW_CONFIG_NAME]: NEW_CONFIG_NAME
				}
			}).then(() => {
				cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
				_common.openDesktopTile(tile.DesktopTiles.PROJECT);
				_common.waitForLoaderToDisappear()
				_common.openTab(app.TabBar.PROJECT).then(() => {
					_common.setDefaultView(app.TabBar.PROJECT)
					_common.waitForLoaderToDisappear()
					_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
				});
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
				_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
			})
	});
	after(() => {
		cy.LOGOUT();
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
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it("TC - Create new line item record", function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it("TC - Create new record in resource", function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.quantity, CONTAINER_COLUMNS_RESOURCE.estresourcetypeshortkey, CONTAINER_COLUMNS_RESOURCE.code, CONTAINER_COLUMNS_RESOURCE.descriptioninfo, CONTAINER_COLUMNS_RESOURCE.basuomfk, CONTAINER_COLUMNS_RESOURCE.quantityfactordetail1, CONTAINER_COLUMNS_RESOURCE.quantityfactordetail2, CONTAINER_COLUMNS_RESOURCE.costfactordetail1, CONTAINER_COLUMNS_RESOURCE.costfactordetail2, CONTAINER_COLUMNS_RESOURCE.efficiencyfactordetail1, CONTAINER_COLUMNS_RESOURCE.quantitydetail], cnt.uuid.RESOURCES)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.create_newSubRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
	});

	it('TC - Verify modify resource from wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.MODIFY_RESOURCE);
		_estimatePage.modifyResource_fromWizard(MODIFY_RESOURCE_PARAMETER);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.select_rowInContainer(cnt.uuid.RESOURCES)
		_common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, MODAL_MODAL_DETAILS_OPTION_DATA1);
	});

	it('TC - Assign Resource Cost Factor details 1,2 and quantity factor details 1,2, Quantity details, efficiency factor details', function () {
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_DETAIL_1, app.InputFields.DOMAIN_TYPE_COMMENT, QUANTITY_FACTOR_DETAILS_1)
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_DETAIL_2, app.InputFields.DOMAIN_TYPE_COMMENT, QUANTITY_FACTOR_DETAILS_2)
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_DETAIL_1, app.InputFields.DOMAIN_TYPE_COMMENT, COST_FACTOR_DETAILS_1)
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		cy.wait(2000)
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_DETAIL_2, app.InputFields.DOMAIN_TYPE_COMMENT, COST_FACTOR_DETAILS_2)
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_DETAIL, app.InputFields.DOMAIN_TYPE_COMMENT, QUANTITY_DETAILS)
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.EFFICIENCY_FACTOR_DETAIL_1, app.InputFields.DOMAIN_TYPE_COMMENT, EFFICIENCY_FACTOR_DETAILS_1)
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.RESOURCES)
	});

	it('TC - Verify Resource Cost Factor details 1,2 and quantity factor details 1,2, Quantity details, efficiency factor details', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.quantityfactordetail1, CONTAINER_COLUMNS_RESOURCE.quantityfactordetail2, CONTAINER_COLUMNS_RESOURCE.costfactordetail1, CONTAINER_COLUMNS_RESOURCE.costfactordetail2, CONTAINER_COLUMNS_RESOURCE.efficiencyfactordetail1, CONTAINER_COLUMNS_RESOURCE.quantitydetail], cnt.uuid.RESOURCES)
		});
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.select_allContainerData(cnt.uuid.RESOURCES);
		_common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowInContainer(cnt.uuid.RESOURCES)
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_DETAIL_1, QUANTITY_FACTOR_DETAILS_1)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_DETAIL_2, QUANTITY_FACTOR_DETAILS_2)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_DETAIL_1, COST_FACTOR_DETAILS_1)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_DETAIL_2, COST_FACTOR_DETAILS_2)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.EFFICIENCY_FACTOR_DETAIL_1, EFFICIENCY_FACTOR_DETAILS_1)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_DETAIL, QUANTITY_DETAILS)
	})

});
