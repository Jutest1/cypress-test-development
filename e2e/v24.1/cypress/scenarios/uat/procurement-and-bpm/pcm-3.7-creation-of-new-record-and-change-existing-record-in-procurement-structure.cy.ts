import { tile, app, cnt, btn, commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";


const ALLURE = Cypress.Allure.reporter.getInterface();

const PRC_CODE ="PRC_CODE-" + Cypress._.random(0, 999);
const PRC_STRUCTURE_DESC ="PRC_STRUCTURE_DESC-" + Cypress._.random(0, 999);
const PRC_SUB_DESC ="PRC_STR_DESC-" + Cypress._.random(0, 999);


ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Procurement");
ALLURE.story("PCM- 3.7 | Creation of new record and also change the existing record in the Procurement structure");

describe("PCM- 3.7 | Creation of new record and also change the existing record in the Procurement structure", () => {

    beforeEach(function () {
    cy.fixture("pcm/pcm-3.7-creation-of-new-record-and-change-existing-record-in-procurement-structure.json")
      .then((data) => {
        this.data = data;
       });        
    });  
        
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("pcm/pcm-3.7-creation-of-new-record-and-change-existing-record-in-procurement-structure.json")
          .then((data) => {
            this.data = data;
            const BASIC_INPUTS = this.data.basicInputs;
            /* Open desktop should be called in before block */            
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);           
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
            _common.search_fromSidebar(BASIC_INPUTS.searchType,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });  
    after(() => {
    cy.LOGOUT();
    });
    it("TC- Create Procurement structure", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const PROCUREMENT_STRUCTURE_COLUMN=this.data.ProcurementStructure.procurementStructureColumn
        const PRC_INPUTS = this.data.ProcurementStructure.Inputs  
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.procurementStructure);  
        _common.openTab(app.tabBar.ProcurementStructure).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_COLUMN)
        });
        _common.waitForLoaderToDisappear() 
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear() 
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.collapseAll(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _procurementPage.enterRecord_ToCreateProcurementStructure(PRC_CODE,PRC_INPUTS.prcType1,PRC_STRUCTURE_DESC)       
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PRC_SUB_DESC)
        cy.SAVE()   

    })
    it("TC- Update Existing Procurement structure",function(){
        const BASIC_INPUTS = this.data.basicInputs;
        const PROCUREMENT_STRUCTURE_COLUMN=this.data.ProcurementStructure.procurementStructureColumn;
        const PRC_INPUTS = this.data.ProcurementStructure.Inputs;
        _common.openTab(app.tabBar.ProcurementStructure).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_COLUMN)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()        
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.collapseAll(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,PRC_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,PRC_CODE)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.PRC_STRUCTURE_TYPE_FK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.PRC_STRUCTURE_TYPE_FK,BASIC_INPUTS.list,PRC_INPUTS.prcType)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.PRC_STRUCTURE_TYPE_FK,PRC_INPUTS.prcType)
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
    })
    it("TC- Create Package and Verify Procurement structure",function(){
        const BASIC_INPUTS = this.data.basicInputs;
        const PRC_INPUTS = this.data.ProcurementStructure.Inputs;
        const PACKAGE_COLUMN = this.data.PKGColumn_Header;
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.package); 
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE,PACKAGE_COLUMN)
        });
        _common.maximizeContainer(cnt.uuid.PACKAGE)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.editModalDropdown_WithInput(PRC_INPUTS.label,PRC_CODE,BASIC_INPUTS.grid)  
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)      
        cy.SAVE()        
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK,PRC_CODE)
    })
})