import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PRC_CODE ="PRC_CODE-" + Cypress._.random(0, 999);
const PRC_STRUCTURE_DESC ="PRC_STRUCTURE_DESC-" + Cypress._.random(0, 999);
const PRC_SUB_DESC ="PRC_STR_DESC-" + Cypress._.random(0, 999);
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_PROCUREMENT_CONFIG_HEADER;
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE;
let CONTAINER_COLUMNS_PACKAGE;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Procurement");
ALLURE.story("PCM- 3.7 | Creation of new record and also change the existing record in the Procurement structure");

describe("PCM- 3.7 | Creation of new record and also change the existing record in the Procurement structure", () => {
       
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), 
        Cypress.env("adminPassword"), 
        Cypress.env("parentCompanyName"), 
        Cypress.env("childCompanyName"));

        cy.fixture("pcm/pcm-3.7-creation-of-new-record-and-change-existing-record-in-procurement-structure.json")
          .then((data) => {
            this.data = data;
            CONTAINERS_PROCUREMENT_CONFIG_HEADER = this.data.CONTAINERS.PROCUREMENT_CONFIG_HEADER
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENTSTRUCTURE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE

            PROCUREMENT_STRUCTURE_PARAMETERS = {
                [app.GridCells.CODE]:PRC_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PRC_STRUCTURE_DESC,
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.PRCTYPE_MATERIAL
            }
            /* Open desktop should be called in before block */            
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);           
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });  

    it("TC - Create Procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);  
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.waitForLoaderToDisappear() 
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear() 
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,Buttons.IconButtons.ICO_TREE_COLLAPSE)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)       
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PRC_SUB_DESC)
        cy.SAVE()   

    })

    it("TC - Update Existing Procurement structure",function(){
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()        
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,Buttons.IconButtons.ICO_TREE_COLLAPSE)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,PRC_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,PRC_CODE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.PRC_STRUCTURE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PROCUREMENT_CONFIG_HEADER.PRCTYPE_SERVICE)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.PRC_STRUCTURE_TYPE_FK,CONTAINERS_PROCUREMENT_CONFIG_HEADER.PRCTYPE_SERVICE)
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
    })
    
    it("TC - Create Package and Verify Procurement structure",function(){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PACKAGE); 
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
        });
        _common.maximizeContainer(cnt.uuid.PACKAGE)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.PROCUREMENT_STRUCTURE_SMALL,PRC_CODE,commonLocators.CommonKeys.GRID) 
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)      
        cy.SAVE()        
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK,PRC_CODE)
    })
})

after(() => {
    cy.LOGOUT();
    });