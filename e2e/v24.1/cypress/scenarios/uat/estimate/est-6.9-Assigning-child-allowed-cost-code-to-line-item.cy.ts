import AppLayout from "cypress/locators/app-layout";
import { _modalView, _rfqPage,  _common, _estimatePage, _projectPage, _validate,  _procurementPage,_procurementContractPage, _mainView } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import { tile, cnt, app, btn, commonLocators } from "cypress/locators";
import cypress from "cypress";
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999); 
const LI_DESC = 'LI_DESC-' + Cypress._.random(0, 999); 
const NEW_CODE = 'A0-' + Cypress._.random(0, 999);
const NEW_CODE2 = '2109-' + Cypress._.random(0, 99);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 6.9 | Assigning child allowed cost codes to line item")
describe("EST- 6.9 | Assigning child allowed cost codes to line item", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-6.9-Assigning-child-allowed-cost-codes-to-line-item.json").then((data) => {
            this.data = data;
        });
    });
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-6.9-Assigning-child-allowed-cost-codes-to-line-item.json").then((data) => {
            this.data = data;
            const SIDEBARINPUT = this.data.Prerequisites.SidebarInputs;
            
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.openSidebarOption(SIDEBARINPUT.Search).delete_pinnedItem();
            _common.search_fromSidebar(SIDEBARINPUT.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });

    
	after(() => {
		cy.LOGOUT();
	});
    
    it("TC - Precondition: Check the checkbox of child allowed for parent cost code in cost codes module", function () {
        const SIDEBARINPUT = this.data.Prerequisites.SidebarInputs;
        const MODULES = this.data.Prerequisites.Modules;
        const COSTCODEGRID = this.data.costCode_CoulmnHeaders.column_header
        const COSTCODEINPUT=this.data.costCodeInput.costcodeInput
      
        _common.openSidebarOption(SIDEBARINPUT.quickStart);
        _common.search_fromSidebar(SIDEBARINPUT.quickStart1, MODULES.costCode);
        _common.openTab(app.tabBar.Cost_Codes).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Codes, app.FooterTab.COSTCODES, 0);
           _common.setup_gridLayout(cnt.uuid.Cost_Codes,COSTCODEGRID)
        });
        _validate.set_ColumnAtTop([COSTCODEGRID.isprojectchildallowed,COSTCODEGRID.uomfk],cnt.uuid.Cost_Codes)
        _common.maximizeContainer(cnt.uuid.Cost_Codes)
        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.search_inSubContainer(cnt.uuid.Cost_Codes,COSTCODEINPUT.code1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,COSTCODEINPUT.code1)
        _common.set_cellCheckboxValue(cnt.uuid.Cost_Codes,app.gridCells.COSTCODECHILDALLOWED,COSTCODEINPUT.checkboxstatus)
        _common.getText_fromCell(cnt.uuid.Cost_Codes,app.GridCells.UOM_FK).then(($value)=>{
            Cypress.env("COSTCODEUOM", $value.text())
        })   
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.search_inSubContainer(cnt.uuid.Cost_Codes,COSTCODEINPUT.code2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,COSTCODEINPUT.code2)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.UOM_FK)
        _mainView.findButton(btn.IconButtons.ICO_INPUT_DELETE).clickIn()
        _common.set_cellCheckboxValue(cnt.uuid.Cost_Codes,app.gridCells.COSTCODECHILDALLOWED,COSTCODEINPUT.checkboxstatus)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,COSTCODEINPUT.code2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.Cost_Codes)
    });

    it('TC - Create new estimate', function () {
        const SIDEBARINPUT = this.data.Prerequisites.SidebarInputs;
        const MODULES = this.data.Prerequisites.Modules;
        const EST_INPUTS = this.data.EstimatePageInputs.CreateEstimate
        const EST_COLUMN = this.data.estimate_ColumnHeaders.column_headers  
        
        _common.openSidebarOption(SIDEBARINPUT.quickStart);
        _common.search_fromSidebar(SIDEBARINPUT.quickStart1, MODULES.project);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
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
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LI_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)        
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(LI_DESC, LI_INPUTS.quantity, LI_INPUTS.uom)
        cy.SAVE() 
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign resource to the line item', function () {       
       
        const RESOURCE_COLUMN = this.data.resources_ColumnHeaders.column_headers;
        const COSTCODEINPUT=this.data.costCodeInput.costcodeInput
        
        const RESOURCEPARAMETER1: DataCells={
            [commonLocators.CommonLabels.COSTCODES]:COSTCODEINPUT.code1,
            [commonLocators.CommonKeys.CODE]:NEW_CODE
        }
        const RESOURCEPARAMETER2: DataCells={
            [commonLocators.CommonLabels.COSTCODES]:COSTCODEINPUT.code2,
            [commonLocators.CommonLabels.UOM]:COSTCODEINPUT.uom,
            [commonLocators.CommonKeys.CODE]:NEW_CODE2
            }

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.RESOURCES,app.GridCells.CODE)
        _mainView.findInputLookup(btn.IconButtons.ICO_INPUT_LOOKUP,0)
        
        _estimatePage.enterRecord_toCreateCostCodeChildRecord(RESOURCEPARAMETER1)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _common.clickOn_modalFooterButton(btn.ButtonText.REFRESH)
        _modalView.findModal().searchInModal_byDataNG_Selector(COSTCODEINPUT.label,NEW_CODE)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE_CAPS,NEW_CODE)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)

        cy.SAVE()
        _common.waitForLoaderToDisappear()      


        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.RESOURCES,app.GridCells.CODE)
        _mainView.findInputLookup(btn.IconButtons.ICO_INPUT_LOOKUP,0)
        _estimatePage.enterRecord_toCreateCostCodeChildRecord(RESOURCEPARAMETER2)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _common.clickOn_modalFooterButton(btn.ButtonText.REFRESH)
        _modalView.findModal().searchInModal_byDataNG_Selector(COSTCODEINPUT.label,NEW_CODE2)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE_CAPS,NEW_CODE2)
        _modalView.findModal().acceptButton(btn.ButtonText.OK)

        cy.SAVE()
        _common.waitForLoaderToDisappear()   
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it('TC - Verify new cost codes created and Uom added for sencond one', function () {       
        const COSTCODEINPUT=this.data.costCodeInput.costcodeInput
       
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
           
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.search_inSubContainer(cnt.uuid.RESOURCES,NEW_CODE)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.CODE,NEW_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.BAS_UOM_FK,Cypress.env("COSTCODEUOM"))
       

        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.search_inSubContainer(cnt.uuid.RESOURCES,NEW_CODE2)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.BAS_UOM_FK,COSTCODEINPUT.uom)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        
    });

   
});
