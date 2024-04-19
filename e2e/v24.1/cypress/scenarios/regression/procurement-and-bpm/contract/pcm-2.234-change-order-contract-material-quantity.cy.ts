import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const CO_CONTRACT_DESC = "CO_CONTRACT_DESC-"+ Cypress._.random(0, 999);
const PROJECT_CHANGE_DESC = "PROJECT_CHANGE_DESC-"+ Cypress._.random(0, 999);


const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells, CONTROLLING_UNIT_PARAMETERS: DataCells



let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let MODAL_UPDATE_ITEM_PRICE

let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_RESOURCE, CONTAINERS_CONTROLLING_UNIT
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINERS_PES_ITEM
let CO_CONTRACT_ITEM_PARAMETER
let MODAL_CHANGE_ORDER_CONTRACT, CONTAINERS_CONTRACT, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM, CONTAINER_COLUMNS_PES_ITEMS
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
const CHNAGE_ORDER_DESC = "ORDERCHANGEDESC-" + Cypress._.random(0, 999);
const CHNAGE_DESC = "CHANGEDESC-" + Cypress._.random(0, 999);
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);



allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.234 | Change order contract material quantity");

describe("PCM- 2.234 | Change order contract material quantity", () => {

    beforeEach(function () {
        cy.fixture("pcm/pcm-2.234-change-order-contract-material-quantity.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {

        cy.fixture("pcm/pcm-2.234-change-order-contract-material-quantity.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS

            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
            MODAL_CHANGE_ORDER_CONTRACT = this.data.MODAL.CHANGE_ORDER_CONTRACT
            MODAL_UPDATE_ITEM_PRICE = this.data.MODAL.UPDATE_ITEM_PRICE
      
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            CONTAINER_COLUMNS_CONTRACT_ITEM = this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
            CONTAINER_COLUMNS_PES_ITEMS = this.data.CONTAINER_COLUMNS.PES_ITEMS
            CONTAINERS_PES_ITEM = this.data.CONTAINERS.PES_ITEM
            CONTROLLING_UNIT_PARAMETERS = {
              [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
              [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
            ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
      
            LINE_ITEM_PARAMETERS = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            },
      
      
              RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
              }
            CO_CONTRACT_ITEM_PARAMETER={
                [commonLocators.CommonLabels.PROJECT]:Cypress.env("PROJECT_NUMBER"),
                [commonLocators.CommonLabels.CHANGE_TYPE]:MODAL_CHANGE_ORDER_CONTRACT.changeType,
                [commonLocators.CommonLabels.CHANGE_REASON]:MODAL_CHANGE_ORDER_CONTRACT.changeReason,
                [commonLocators.CommonLabels.DESCRIPTION]:PROJECT_CHANGE_DESC,
                [commonLocators.CommonLabels.CONTRACT_STATUS]:sidebar.SideBarOptions.RECORDED,
                [commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC]:CO_CONTRACT_DESC
            }
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
      
        });   
    });

    after(() => {
        cy.LOGOUT();
    });
    it("TC - Verify Project contract type, Contract type in customizing module",function(){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);

        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, "Contract Type")
        cy.wait(2000)//required waits
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, "Procurement")
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
        _common.search_inSubContainer(cnt.uuid.INSTANCES,"Unit Rate Contract")
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, "Project Contract Type")
    
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
        _common.search_inSubContainer(cnt.uuid.INSTANCES,"Unit Rate Contract")
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_CONSOLIDATE_CHANGE,commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
        _common.search_inSubContainer(cnt.uuid.INSTANCES,"Lump Sum Contract")
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
})
    it("TC - Create controlling unit", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
      _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()       
    });
    it("TC - Create new Estimate having line item ", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
          });
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
          _common.waitForLoaderToDisappear()
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
          _common.create_newRecord(cnt.uuid.ESTIMATE);
          _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
          _common.waitForLoaderToDisappear()
          cy.SAVE()
          _common.waitForLoaderToDisappear()
      
          _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
          _common.waitForLoaderToDisappear()
      
          _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
          });
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      
          _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
          _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
          cy.SAVE();
          _common.waitForLoaderToDisappear()
      
      });
    
    it("TC - Add Resource for selected line item", function () {      
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
          });
          _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
          _common.create_newRecord(cnt.uuid.RESOURCES);
          _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
          cy.SAVE();
          _common.waitForLoaderToDisappear()
    });
    it("TC - Create Material Package from Estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
          _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        })
        _common.waitForLoaderToDisappear()
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard("Material", btn.ButtonText.YES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
    
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
          _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        })
        _common.select_dataFromSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        cy.SAVE();
    
    });
   
    it("TC - Verify Contract and Item ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
          cy.wait(1000)//required waits
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        cy.wait(1000)//required waits
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, COUNTUNIT)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.SAVE()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "HS")
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
          _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM);
        });
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
        _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY)
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    
    })
    it("TC- Create PES from contract",function(){
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
          })
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
          _common.waitForLoaderToDisappear()
          _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
          _common.waitForLoaderToDisappear()
      
          _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEMS)
          })
  
          _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.assert_forNumericValues(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_PES_ITEM.QUANTITY1)

    })
    it("TC- Add Quantity in PES item and verify remaining quantity",function(){

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS,app.FooterTab.ITEMS,2);            
        });
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _package.verify_remainingQtyFromPESItems(CONTAINERS_PES_ITEM.QUANTITY)
         
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
        cy.wait(1000)//required waits
        _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)    

    })
    it("TC - Verify Add new  PES item",function(){

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS,app.FooterTab.ITEMS,2);            
        });
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.create_newRecord(cnt.uuid.ITEMS)
        _procurementPage.enterRecord_toeditpesitem(CONTAINERS_PES_ITEM.STRUCTURE,CONTAINERS_PES_ITEM.MATERIAL_NO,CONTAINERS_PES_ITEM.QUANTITY2)
        cy.wait(2000)//required waits
        cy.SAVE()       
        _common.minimizeContainer(cnt.uuid.ITEMS)
        _common.openTab(app.TabBar.PES_ITEMS).then(() => { 
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM)
        _procurementPage.create_changeOrderContractForNewItem_fromWizard(CO_CONTRACT_ITEM_PARAMETER)
    })
    it("TC - Change contract status and verify contracted quantity in PES Item",function(){

        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        cy.wait(1000)//required waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
       _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS,app.FooterTab.HEADERS,0);
            //_common.setup_gridLayout(cnt.uuid.HEADERS,PES_COLUMN)            
        });
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PESCODE"))
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS,app.FooterTab.ITEMS,2);            
        });
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.ITEMS,CONTAINERS_PES_ITEM.MATERIAL_NO)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMS,app.GridCells.QUANTITY_CONTRACTED,CONTAINERS_PES_ITEM.QUANTITY2)
    })

})
