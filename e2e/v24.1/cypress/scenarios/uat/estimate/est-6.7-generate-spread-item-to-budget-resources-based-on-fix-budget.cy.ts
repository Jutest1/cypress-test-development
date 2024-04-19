import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999); 
const LI_DESC = 'LI_DESC-' + Cypress._.random(0, 999); 

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 6.7 | Generate spread item to budget resource based on fix budget")

describe("EST- 6.7 | Generate spread item to budget resource based on fix budget", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-6.7-generate-spread-item-to-budget-resources-based-on-fix-budget.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),          
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-6.7-generate-spread-item-to-budget-resources-based-on-fix-budget.json").then((data) => {
            this.data = data
            const STD_INPUTS = this.data.Prerequisites.SidebarInputs
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(STD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it('TC - Create new estimate', function () {
        const EST_INPUTS = this.data.EstimatePageInputs.CreateEstimate
        const EST_COLUMN = this.data.estimate_ColumnHeaders.column_headers        
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, EST_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC , EST_INPUTS.rubicCategory, EST_INPUTS.estimateType);
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        
    });
    it('TC - Create new line item with quantity', function () {
        const LI_INPUTS = this.data.LineItemInputs.LineItem
        const LI_COLUMN = this.data.lineItem_ColumnHeaders.column_headers;       
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LI_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)        
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(LI_DESC, LI_INPUTS.quantity, LI_INPUTS.uom)
        cy.SAVE() 
        _common.waitForLoaderToDisappear()
    });
    it('TC - Assign resource to the line item', function () {       
        const RESOURCE_INPUTS = this.data.ResourcePageInputs.createResource
        const RESOURCE_COLUMN = this.data.resources_ColumnHeaders.column_headers;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(RESOURCE_INPUTS.shortKey1, RESOURCE_INPUTS.costCode1, RESOURCE_INPUTS.quantity1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()       
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateMaterialResource(RESOURCE_INPUTS.shortKey2, RESOURCE_INPUTS.costCode2)
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, RESOURCE_INPUTS.quantity2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()        
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });
    it('TC - Verify spread budget in resources', function () {
        const LI_INPUTS = this.data.LineItemInputs.LineItem
        const LI_COLUMN = this.data.lineItem_ColumnHeaders.column_headers;
        const RESOURCE_COLUMN = this.data.resources_ColumnHeaders.column_headers;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LI_COLUMN)
        });
        _validate.set_ColumnAtTop([LI_COLUMN.budgetunit,LI_COLUMN.isfixedbudgetunit,LI_COLUMN.budget,LI_COLUMN.isfixedbudget],cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.set_cellCheckboxValue(LI_INPUTS.checkboxvalue,cnt.uuid.ESTIMATE_LINEITEMS,app.gridCells.FIXED_BUDGET)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BUDGET)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BUDGET,app.InputFields.INPUT_GROUP_CONTENT,LI_INPUTS.budget)
        cy.SAVE()
        _common.set_cellCheckboxValue(LI_INPUTS.checkboxvalue,cnt.uuid.ESTIMATE_LINEITEMS,app.gridCells.FIXED_BUDGET_UNIT)
        cy.SAVE()
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS,app.gridCells.FIXED_BUDGET,LI_INPUTS.uncheck)        
        _common.set_cellCheckboxValue(LI_INPUTS.checkboxvalue,cnt.uuid.ESTIMATE_LINEITEMS,app.gridCells.FIXED_BUDGET)
        cy.SAVE()
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS,app.gridCells.FIXED_BUDGET_UNIT,LI_INPUTS.uncheck)
        _common.openSidebarOption(LI_INPUTS.wizard)
        _common.search_fromSidebar(LI_INPUTS.wizard1,LI_INPUTS.wizardOption)
        _common.findRadio_byLabel_InModal(LI_INPUTS.estimateScope,LI_INPUTS.radio,0,generic.locators.RADIO1)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN)            
        });        
        _validate.set_ColumnAtTop([RESOURCE_COLUMN.budgetunit,RESOURCE_COLUMN.isfixedbudgetunit,RESOURCE_COLUMN.budget,RESOURCE_COLUMN.isfixedbudget],cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.perform_AdditionOfColumnValues(cnt.uuid.RESOURCES,app.GridCells.BUDGET)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });
    it('TC- Verify Budget of resources in Line item ',function () {
        const RESOURCE_INPUTS = this.data.ResourcePageInputs.createResource
        const LI_COLUMN = this.data.lineItem_ColumnHeaders.column_headers;
        const RESOURCE_COLUMN = this.data.resources_ColumnHeaders.column_headers;
        const LI_BUDGET = Cypress.env("AdditionOfColumnValues").toFixed(2)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LI_COLUMN)
        }); 
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BUDGET,LI_BUDGET)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCE_INPUTS.costCode1)
        _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.BUDGET).then(($value)=>{
            Cypress.env("BudgetRes1",$value.text())
        })        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCE_INPUTS.costCode2)
        _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.BUDGET_UNIT).then(($value)=>{
            Cypress.env("BudgetUnit",$value.text())
        })
        
    })
    it('TC- Verify Budget and budget/unit with Fix budget and fix budget/unit checkbox',function () {
        const RESOURCE_INPUTS = this.data.ResourcePageInputs.createResource
        const RESOURCE_COLUMN = this.data.resources_ColumnHeaders.column_headers;
        const LI_INPUTS = this.data.LineItemInputs.LineItem
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCE_INPUTS.costCode1)
        _common.set_cellCheckboxValue(LI_INPUTS.checkboxvalue,cnt.uuid.RESOURCES,app.gridCells.FIXED_BUDGET)
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,RESOURCE_INPUTS.quantity3)
        cy.SAVE()        
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(cnt.uuid.RESOURCES,Cypress.env("BudgetRes1"),RESOURCE_INPUTS.quantity3,app.GridCells.BUDGET_UNIT)        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCE_INPUTS.costCode2)
        _common.set_cellCheckboxValue(LI_INPUTS.checkboxvalue,cnt.uuid.RESOURCES,app.gridCells.FIXED_BUDGET_UNIT)
        cy.SAVE()
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,RESOURCE_INPUTS.quantity4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()  
        _validate.verify_FractionalProductofTwo_AndCompareWithThirdValue(cnt.uuid.RESOURCES,Cypress.env("BudgetUnit"),RESOURCE_INPUTS.quantity4,app.GridCells.BUDGET)     
    })
    after(() => {
		cy.LOGOUT();
	});
})