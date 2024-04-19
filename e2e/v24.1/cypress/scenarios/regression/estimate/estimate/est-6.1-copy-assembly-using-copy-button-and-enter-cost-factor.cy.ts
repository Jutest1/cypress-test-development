import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _validate } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_ASSEMBLY_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES;
let CONTAINERS_ASSEMBLIES;
let CONTAINER_COLUMNS_ASSEMBLIES;
let CONTAINERS_ASSEMBLY_RESOURCES;
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCES;

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 6.1 | Copy assembly using Copy button and enter Cost factor');

describe('EST- 6.1 | Copy assembly using Copy button and enter Cost factor', () => {

	before(function () {
		cy.fixture('estimate/est-6.1-copy-assembly-using-copy-button-and-enter-cost-factor.json').then((data) => {
			this.data = data;
			CONTAINERS_ASSEMBLY_CATEGORIES = this.data.CONTAINERS.ASSEMBLY_CATEGORIES;
			CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES
			CONTAINERS_ASSEMBLIES = this.data.CONTAINERS.ASSEMBLIES;
			CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
			CONTAINERS_ASSEMBLY_RESOURCES = this.data.CONTAINERS.ASSEMBLY_RESOURCES;
			CONTAINER_COLUMNS_ASSEMBLY_RESOURCES = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCES
		}).then(() => {
			cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it("TC - Select assembly category", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
		});
		_common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
			_common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLIES.code, CONTAINER_COLUMNS_ASSEMBLIES.descriptioninfo, CONTAINER_COLUMNS_ASSEMBLIES.costtotal, CONTAINER_COLUMNS_ASSEMBLIES.costfactor1], cnt.uuid.ASSEMBLIES)
		});
		_common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
		_common.search_inSubContainer(cnt.uuid.ASSEMBLIES, CONTAINERS_ASSEMBLIES.ASSEMBLIES_DESCRIPTION)
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES, app.GridCells.CODE, CONTAINERS_ASSEMBLIES.ASSEMBLIES_DESCRIPTION)
		_common.edit_containerCell(cnt.uuid.ASSEMBLIES, app.GridCells.COST_FACTOR_1, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ASSEMBLIES.COST_FACTOR_VALUE)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.ASSEMBLIES, app.GridCells.COST_TOTAL).then(($costTotal) => {
			Cypress.env("COST_TOTAL", $costTotal.text())
		})
		_common.clickOn_toolbarButton(cnt.uuid.ASSEMBLIES, btn.ToolBar.ICO_COPY_LINE_ITEM)
		_common.waitForLoaderToDisappear()
	})

	it('TC - Verify Line item and resources total, description should be the same as per the original line item', function () {
		cy.wait(1000).then(() => { // This Wait is mandatory for creating a then block to assertvalues using env variables
			_common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLIES.ASSEMBLIES_DESCRIPTION)
			_common.assert_forNumericValues(cnt.uuid.ASSEMBLIES, app.GridCells.COST_TOTAL, Cypress.env("COST_TOTAL"))
		})
	})

	it('TC - Verify after changing quantity, the total should be changed.', function () {
		_common.openTab(app.TabBar.ASSEMBLIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
			_common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES)
			_common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.quantity, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.costtotal], cnt.uuid.ASSEMBLY_RESOURCE)
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
		_common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ASSEMBLY_RESOURCES.QUANTITY)
		cy.SAVE()
		_common.perform_additionOfCellData(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_TOTAL)
		_common.waitForLoaderToDisappear()
		cy.wait(1000).then(() => { // This Wait is mandatory for creating a then block to assertvalues using env variables
			_common.assert_forNumericValues(cnt.uuid.ASSEMBLIES, app.GridCells.COST_TOTAL, Cypress.env("AdditionOfColumnValues").toString())
		})
		_common.delete_recordFromContainer(cnt.uuid.ASSEMBLIES)
		_common.clickOn_modalFooterButton(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
	})

})