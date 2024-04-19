import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _boqPage, _estimatePage, _rfqPage, _procurementPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'PRJ' + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = 'PRO' + Cypress._.random(0, 999);
const EST_CODE = 'E' + Cypress._.random(0, 999);
const EST_DESCRIPTION = 'EST-' + Cypress._.random(0, 999);
const BOQ_DESCRIPTION = 'BOQ_' + Cypress._.random(0, 999);
const BOQ_ITEM_DESCRIPTION = 'BOQ_ITEM1-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES, CONTAINERS_REQUISITION, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_ITEMS;

let PROJECT_PARAMETERS: DataCells, BOQ_PARAMETERS: DataCells, BOQ_STRUCTURE_PARAMETER: DataCells, ESTIMATE_PARAMETERS: DataCells, GENERATE_LINE_ITEMS_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells, RFQ_PARAMETER: DataCells, REQUISITION_PARAMETER_2: DataCells, REQUISITION_PARAMETER_3:DataCells, REQUISTION_ITEM_PARAMETER_2: DataCells, REQUISTION_ITEM_PARAMETER_3: DataCells;

let MODAL_CREATE_RFQ;

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('RFQ');
ALLURE.story('PCM- 2.112 | Creation of one RFQ from multiple requisition using wizard');

describe('PCM- 2.112 | Creation of one RFQ from multiple requisition using wizard', () => {

	before(function () {
		cy.fixture('pcm/pcm-2.112-Creation-of-one-RFQ-from-multiple-requisition-using-wizard.json').then((data) => {
			this.data = data;
			CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
			PROJECT_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
				[commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
			};
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
			BOQ_PARAMETERS = {
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESCRIPTION,
			}
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
			CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
			BOQ_STRUCTURE_PARAMETER = {
				[commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
				[app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0]
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
			GENERATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESCRIPTION
			}
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
			REQUISITION_PARAMETER_2 = {
				[commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.MATERIAL_REQ,
			};
			REQUISITION_PARAMETER_3 = {
				[commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.MATERIAL_REQ,
			};
			CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
			CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
			REQUISTION_ITEM_PARAMETER_2 = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_ITEMS.MATERIAL[0],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEMS.QUANTITY[0],
			};
			REQUISTION_ITEM_PARAMETER_3 = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_ITEMS.MATERIAL[0],
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEMS.QUANTITY[1],
			};

		}).then(() => {
			cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.waitForLoaderToDisappear()
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
			cy.SAVE()
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new BoQ record', function () {
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create new estimate record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify generate line item wizards option', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		cy.REFRESH_CONTAINER()
	});

	it('TC - Assign resource to the line item', function () {
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_DESCRIPTION)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCES.quantity, CONTAINER_COLUMNS_RESOURCES.code, CONTAINER_COLUMNS_RESOURCES.estresourcetypeshortkey], cnt.uuid.RESOURCES)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it('TC - Create material package and change package status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreatePackage_wizard(CommonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.waitForLoaderToDisappear()
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

	it('TC - Create requisition from material package and change requisition status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
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
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.PACKAGE_FK).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('PACKAGENO', $ele1.text());
			cy.log(Cypress.env('PACKAGENO'));
		});
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('NETVALEREQ1', $ele1.text());
			cy.log(Cypress.env('NETVALEREQ1'));
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
	});

	it('TC - Create RFQ from single requisition', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETER);
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
			_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
		_common.select_rowInSubContainer(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 1);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RFQ_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.getText_fromCell(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('NETVALERFQ1', $ele1.text());
			cy.log(Cypress.env('NETVALERFQ1'));
		});
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
		})
		_common.select_rowInSubContainer(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINERS_REQUISITION.NAVIGATE_REQUISITION)
	});

	it('TC - Create multiple requisition', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER_2);
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRJ_DESCRIPTION);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('PACKAGENO'));
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('REQ2', $ele1.text());
			cy.log(Cypress.env('REQ2'));
		});
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS)
			_common.set_columnAtTop([CONTAINER_COLUMNS_ITEMS.quantity, CONTAINER_COLUMNS_ITEMS.mdcmaterialfk, CONTAINER_COLUMNS_ITEMS.itemno], cnt.uuid.REQUISITIONITEMS)
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_common.waitForLoaderToDisappear()
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER_2);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 2);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('NETVALEREQ2', $ele1.text());
			cy.log(Cypress.env('NETVALEREQ2'));
		});

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER_3);
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRJ_DESCRIPTION);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('PACKAGENO'));
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('REQ3', $ele1.text());
			cy.log(Cypress.env('REQ3'));
		});
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER_3);
		cy.SAVE();
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 2);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('NETVALEREQ3', $ele1.text());
			cy.log(Cypress.env('NETVALEREQ3'));
		});

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, CommonLocators.CommonKeys.DATE_RECEIVED);
		_common.select_allContainerData(cnt.uuid.REQUISITIONS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
		_common.changeStatus_ofMultipleRecord_fromModal(CommonLocators.CommonKeys.APPROVED);
	});

	it('TC - Add multiple requisition in RFQ and verify in totals container', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, CommonLocators.CommonKeys.RFQ_CREATED);
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUISITIONS, CONTAINERS_REQUISITION.NAVIGATE_RFQ)

		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
			_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.select_rowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)

		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITIONS, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITION_IN_RFQ)
		_common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ);
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_IN_RFQ, app.GridCells.REQ_HEADER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('REQ2'))
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ);
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_IN_RFQ, app.GridCells.REQ_HEADER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('REQ3'))
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		var NetValue = (parseFloat(Cypress.env('NETVALEREQ2')) + parseFloat(Cypress.env('NETVALEREQ3')) + parseFloat(Cypress.env('NETVALERFQ1'))).toFixed(2);
		console.log(NetValue);
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 2);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RFQ_TOTALS, app.GridCells.TRANSLATED, CommonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		_common.assert_forNumericValues(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, NetValue);
	});

});