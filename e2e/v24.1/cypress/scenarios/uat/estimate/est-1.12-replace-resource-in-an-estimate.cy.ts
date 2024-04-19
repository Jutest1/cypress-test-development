import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.12 | Replace Resource In An Estimate");

describe("EST- 1.12 | Replace Resource In An Estimate", () => {

	beforeEach(function () {
		cy.fixture("estimate/est-1.12-replace-resource-in-an-estimate.json").then(
			(data) => {
				this.data = data;
			}
		);
	});

	before(function () {
		cy.preLoading(
			Cypress.env("adminUserName"),
			Cypress.env("adminPassword"),
			Cypress.env("parentCompanyName"),
			Cypress.env("childCompanyName")
		);

		cy.fixture("estimate/est-1.12-replace-resource-in-an-estimate.json").then(
			(data) => {
				this.data = data;
				const standerdInputs = this.data.Prerequisites.SidebarInputs;

				_common.openDesktopTile(tile.DesktopTiles.PROJECT);
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER"))
					.pinnedItem();

				//Create new Estimate header
				const estimateInputs = this.data.Prerequisites.CreateEstimate;
				const estimateGrid = this.data.columns.column_headers;
				const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers;

				_common.openTab(app.TabBar.ESTIMATE).then(() => {
					_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
					_common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
				});
				_common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
				_common.create_newRecord(cnt.uuid.ESTIMATE);
				_estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubicCategory, estimateInputs.estimateType);
				cy.SAVE();
				_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);

				//Create New Line Item Record
				const lineItemInput = this.data.Prerequisites.CreateNewLineItem;

				_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
					_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
					_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
				});
				_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
				_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
				_estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, lineItemInput.quantity, lineItemInput.uom);
				cy.SAVE()
				_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);

				//Create New Record In Resource For Cost Code
				const CostcodeInput = this.data.Prerequisites.CreateNewResource;
				const resourcesGrid = this.data.resources_ColumnHeaders.column_headers;

				_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
					_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
					_common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
				});
				_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
				_common.create_newRecord(cnt.uuid.RESOURCES);
				_estimatePage.enterRecord_toCreateResource(CostcodeInput.ShortKey, CostcodeInput.Code);
				cy.SAVE();
			}
		);
	});

	it("TC - Replace resource from wizard and verify", function () {
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const replaceElements = this.data.ReplaceResourcefromWizard;

		_common.openSidebarOption(standardInputs.searchType1);
		_common.search_fromSidebar(standardInputs.Wizard, standardInputs.searchOption);
		_estimatePage.replaceResourceFromWizard_AndVerify(replaceElements.basedOn,replaceElements.estimateScope, replaceElements.newElement, replaceElements.rowInputClass, replaceElements.replaceFields);
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		cy.wait(2000)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, replaceElements.newElement);
	});

	after(() => {
		cy.LOGOUT();
	});

});
