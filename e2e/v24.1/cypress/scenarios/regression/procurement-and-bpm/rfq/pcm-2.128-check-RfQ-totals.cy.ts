import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _estimatePage, _procurementConfig, _procurementPage, _package, _rfqPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'P-' + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = 'PRJ-1-' + Cypress._.random(0, 999);
const EST_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const EST_CODE = '1' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE_01-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES, CONTAINERS_REQUISITION, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_ITEMS;

let PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells, RFQ_PARAMETER: DataCells, REQUISITION_PARAMETER: DataCells, REQUISTION_ITEM_PARAMETER: DataCells;

let MODAL_CREATE_RFQ;

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('RFQ');
ALLURE.story('PCM 2.128 | Check RFQ Totals');

describe('PCM 2.128 | Check RFQ Totals', () => {

	before(function () {
		cy.fixture('pcm/pcm-2.128-check-RfQ-totals.json').then((data) => {
			this.data = data;
			CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
			PROJECT_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
				[commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
			};
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCE;
			CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
			RESOURCE_PARAMETER = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCES.QUANTITY[0],
			};
			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			MODAL_CREATE_RFQ = this.data.MODAL.CREATE_RFQ
			RFQ_PARAMETER = {
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_RFQ.BUSINESS_PARTNER[0]]
			}
			CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
			REQUISITION_PARAMETER = {
				[commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.MATERIAL_REQ,
			};
			CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
			CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
			REQUISTION_ITEM_PARAMETER = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_ITEMS.MATERIAL[0],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEMS.QUANTITY[0],
			};
		}).then(() => {
			cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
			cy.SAVE()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new estimate', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
	});

	it('TC - Create new line item with quantity', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
		cy.SAVE()
	});

	it('TC - Assign resource to the line item', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER)
		cy.SAVE()
		_common.minimizeContainer(cnt.uuid.RESOURCES)
	});

	it('TC - Create material package from wizards option', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_estimatePage.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION);
		_common.select_rowInSubContainer(cnt.uuid.PACKAGE)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
		_common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
	});

	it('TC - Create requisistion by wizard', function () {
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
		_common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('REQ_CODE_01', $ele1.text());
			cy.log(Cypress.env('REQ_CODE_01'));
		});
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('REQ_NETVALUE_01', $ele1.text());
			cy.log(Cypress.env('REQ_NETVALUE_01'));
		});
	});

	it('TC - Change procurement configuration by wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
		_procurementConfig.changeProcurementConfiguration_FromWizard(CommonLocators.CommonKeys.MATERIAL_REQ, btn.ButtonText.YES)
	});

	it('TC - Create requisition record manually and add Item', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
		cy.SAVE();
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER);
		cy.SAVE();
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('REQ_NETVALUE_02', $ele1.text());
			cy.log(Cypress.env('REQ_NETVALUE_02'));
		});
		_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 0);
		_common.select_allContainerData(cnt.uuid.REQUISITIONS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_ofMultipleRecord_fromModal(CommonLocators.CommonKeys.APPROVED);
		cy.wait(1000)
		cy.SAVE()
	});

	it('TC - Create request for quote by wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETER);
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
	});

	it('TC - Verify the totals type will show according to the rfq configuration', function () {
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
			_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.select_rowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTAL, 1);
		});
		_common.select_rowInContainer(cnt.uuid.RFQ_TOTALS)
		_common.select_rowHasValue(cnt.uuid.RFQ_TOTALS, commonLocators.CommonKeys.TOTAL)
		cy.wait(500).then(() => {
			_common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env('REQ_NETVALUE_02'));
		});
	});

	it('TC - Create RFQ requisition record manually', function () {
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_REQUISISTION, app.FooterTab.REQUISITIONS, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.RFQ_REQUISISTION)
		_common.create_newRecord(cnt.uuid.RFQ_REQUISISTION);
		_common.edit_dropdownCellWithInput(cnt.uuid.RFQ_REQUISISTION, app.GridCells.REQ_HEADER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('REQ_CODE_01'));
		cy.SAVE();
	});

	it('TC - Verify the totals will sum all the requisitions assigned to the same rfq', function () {
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTAL, 1);
		});
		_common.select_rowInContainer(cnt.uuid.RFQ_TOTALS)
		cy.wait(500).then(() => {
			_validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.RFQ_TOTALS, Cypress.env('REQ_NETVALUE_01'), Cypress.env('REQ_NETVALUE_02'), app.GridCells.VALUE_NET);
		});
	});

	it('TC - Verify the totals will reculated when delete one req in the req container', function () {
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_REQUISISTION, app.FooterTab.REQUISITIONS, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.RFQ_REQUISISTION)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RFQ_REQUISISTION, app.GridCells.REQ_HEADER_FK, Cypress.env('REQ_CODE_01'));
		_common.delete_recordFromContainer(cnt.uuid.RFQ_REQUISISTION);
		cy.SAVE();
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTAL, 1);
		});
		_common.select_rowInContainer(cnt.uuid.RFQ_TOTALS)
		cy.wait(500).then(() => {
			_common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env('REQ_NETVALUE_02'));
		});
	});

});
