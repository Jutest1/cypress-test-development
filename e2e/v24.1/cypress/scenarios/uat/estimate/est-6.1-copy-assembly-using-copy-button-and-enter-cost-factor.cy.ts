import { _common, _estimatePage, _validate, _mainView, _boqPage, _assembliesPage, _projectPage } from 'cypress/pages';
import { app, tile, cnt, generic, btn } from "cypress/locators";


// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 6.1 | Copy assembly using Copy button and enter Cost factor');

describe('EST- 6.1 | Copy assembly using Copy button and enter Cost factor', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-6.1-copy-assembly-using-copy-button-and-enter-cost-factor.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {cy.preLoading(
        Cypress.env("adminUserName"),
        Cypress.env("adminPassword"),
        Cypress.env('parentCompanyName'),
        Cypress.env('childCompanyName'));
		cy.fixture('estimate/est-6.1-copy-assembly-using-copy-button-and-enter-cost-factor.json').then((data) => {			
			this.data = data;			
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);			
			cy.wait(5000)
		});
	});
	 it("TC - Select assembly category", function () {

		const standardInputs = this.data.Prerequisites.SidebarInputs;
        const ASSEMBLY_CATEGORY=this.data.AssemblyRecord.assemblyCategoryInputs
		const ASSEMBLIES_INPUT = this.data.AssemblyRecord.assembliesInputs;
		const ASSEMBLY_CATEGORY_COLUMN=this.data.AssemblyRecord.AssemblyCatogory_header
		const ASSEMBLIES_COLUMN=this.data.AssemblyRecord.AssembliesColumn
		
     
        _common.openSidebarOption(standardInputs.quickstart);
        _common.search_fromSidebar(standardInputs.quickstart1, standardInputs.searchValue);
		_common.waitForLoaderToDisappear()

        _common.openTab(app.tabBar.Assemblies).then(() => {
			 _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, ASSEMBLY_CATEGORY_COLUMN)
        });
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY.assemblyCategoryDescription)
		_common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
		_common.waitForLoaderToDisappear()

	
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, ASSEMBLIES_COLUMN)
            _validate.set_ColumnAtTop([ASSEMBLIES_COLUMN.code,ASSEMBLIES_COLUMN.descriptioninfo,ASSEMBLIES_COLUMN.costtotal,ASSEMBLIES_COLUMN.costfactor1],cnt.uuid.ASSEMBLIES)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
		_common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_INPUT.assembliesDescription)
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,ASSEMBLIES_INPUT.assembliesDescription)
		_common.editContainerCellwithDynamicInputField(cnt.uuid.ASSEMBLIES,app.gridCells.COSTFACTOR1,app.InputFields.INPUT_GROUP_CONTENT,"2")
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.ASSEMBLIES,app.GridCells.COST_TOTAL).then(($costTotal)=>{
			Cypress.env("COST_TOTAL",$costTotal.text())
		})
		_common.clickOn_deepCopyButton(cnt.uuid.ASSEMBLIES,btn.buttonText.COPY)
		_common.waitForLoaderToDisappear()
	})

	it('TC- Verify Line item and resources total, description should be the same as per the original line item',function(){
		const ASSEMBLIES_INPUT = this.data.AssemblyRecord.assembliesInputs;

		cy.wait(1000).then(()=>{
			_common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_INPUT.assembliesDescription)
			_common.assert_forNumericValues(cnt.uuid.ASSEMBLIES,app.GridCells.COST_TOTAL,Cypress.env("COST_TOTAL"))
		})
	})

	it('TC- Verify after changing quantity, the total should be changed.',function(){
		const ASSEMBLIESRESOURCE_COLUMN=this.data.AssemblyRecord.AssemblyResource_header

		_common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, ASSEMBLIESRESOURCE_COLUMN)
            _validate.set_ColumnAtTop([ASSEMBLIESRESOURCE_COLUMN.quantity,ASSEMBLIESRESOURCE_COLUMN.costtotal],cnt.uuid.ASSEMBLY_RESOURCE)
        });
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
		_common.editContainerCellwithDynamicInputField(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,"10")
		cy.SAVE()
		_common.perform_AdditionOfColumnValues(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_TOTAL)
		_common.waitForLoaderToDisappear()
		cy.wait(1000).then(()=>{
			_common.assert_forNumericValues(cnt.uuid.ASSEMBLIES,app.GridCells.COST_TOTAL,Cypress.env("AdditionOfColumnValues").toString())
		})
		_common.delete_recordFromContainer(cnt.uuid.ASSEMBLIES)
		_common.clickOn_modalFooterButton(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
	})
})