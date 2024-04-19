import { _common,  _sidebar,_controllingUnit, _rfqPage,_materialPage,_projectPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC2-" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-N1" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells,CONTROLLING_UNIT_PARAMETERS:DataCells
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells,LINE_ITEM_PARAMETERS1:DataCells,PROJECTS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS1:DataCells




let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;


let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS,CONTAINER_COLUMNS_BUSINESS_PARTNER
let CONTAINER_COLUMNS_PACKAGE,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINERS_INVOICE,CONTAINER_COLUMNS_INVOICE,CONTAINER_COLUMNS_GENERALS,
CONTAINERS_CONTROLLING_UNIT,CONTAINER_COLUMNS_CONTRACT,CONTAINER_COLUMNS_PES_ITEM,CONTAINERS_BUSINESS_PARTNER,CONTAINERS_GENERAL

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------



const INVOICE_CODE= "1"+Cypress._.random(0, 999);
const INVOICE_CODE_1= "1"+Cypress._.random(0, 999);

const INVOICE_CODE_2= "1"+Cypress._.random(0, 999);
const BUSINESSPARTNER_DESC = "BUSINESSPARTNER_DESC" + Cypress._.random(0, 999);
var procurement_contract;
var contract_code="contract_code";
var procurement_contract1;
var contract_code1="contract_code1";
var pes_code="pes_code";
var pes_code1

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.50 | Generals in invoice");
describe("PCM- 2.50 | Generals in invoice", () => {
            before(function () {
              cy.fixture('pcm/pcm-2.50-generals-in-invoice.json').then((data) => {
                  this.data = data;
                  CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                  CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                 
                  CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
                  CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                  CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                  
                  CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                  CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                  CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
               
                  CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                  CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
                  CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
                  CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
                  CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

                  CONTAINERS_BUSINESS_PARTNER=this.data.CONTAINERS.BUSINESS_PARTNER
                  CONTAINER_COLUMNS_BUSINESS_PARTNER=this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
                  CONTAINER_COLUMNS_PES_ITEM=this.data.CONTAINER_COLUMNS.PES_ITEM
                  CONTAINERS_INVOICE= this.data.CONTAINERS.INVOICE
                  CONTAINER_COLUMNS_INVOICE=this.data.CONTAINER_COLUMNS.INVOICE
                  CONTAINERS_GENERAL= this.data.CONTAINERS.GENERAL
                  CONTAINER_COLUMNS_GENERALS=this.data.CONTAINER_COLUMNS.GENERALS
                  PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]: CLERK
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
                
                    LINE_ITEM_PARAMETERS1 = {
                      [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
                      [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
                    },
                   
                  RESOURCE_PARAMETERS = {
                      [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                      [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE
                    }
                    
                    CONTROLLING_UNIT_PARAMETERS = {
                      [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                      [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                      [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
                    }
                   
              });
              cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.waitForLoaderToDisappear()
    });
    after(() => {
      cy.LOGOUT();
    });   
      it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        
        _common.openTab(app.TabBar.PROJECT).then(() => {
           _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
        })
          _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.setDefaultView(app.TabBar.PROJECT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
             });
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
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
    it("TC - Create estimate header and Create Line Item with Resource", function() {

      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);
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
    
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES,3);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
      _common.create_newRecord(cnt.uuid.RESOURCES)
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
      cy.SAVE();
    
    });  

    it("TC - Create/Update Material Package", function () {
       

        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
         _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
         cy.SAVE();
         _common.waitForLoaderToDisappear()

         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

         _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.setDefaultView(app.TabBar.PACKAGE)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        }) 
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()

        _package.changeStatus_ofPackage_inWizard()

    
    });
    it("TC - Create Contract and Create PES", function () {
     
      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
      _common.waitForLoaderToDisappear()
      _package.create_ContractfromPackage(CONTAINERS_BUSINESS_PARTNER.BP)
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

      _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_BUSINESS_PARTNER)
      });
      _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT.clerkprcfk,CONTAINER_COLUMNS_CONTRACT.controllingunitfk],cnt.uuid.PROCUREMENTCONTRACT)
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
      _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
      
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,COUNTUNIT)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"HS")
      _common.waitForLoaderToDisappear()
     _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
     cy.SAVE()
     _common.waitForLoaderToDisappear()

     _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
          Cypress.env(contract_code, $ele1.text())
          procurement_contract = Cypress.env(contract_code)
          cy.log(procurement_contract)    
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)

      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"HS")
      _common.waitForLoaderToDisappear()
     cy.SAVE()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
      _common.waitForLoaderToDisappear()
      cy.wait(3000)//required wait 
      _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_PES)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

      _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
          Cypress.env(pes_code, $ele1.text())
          pes_code1 = Cypress.env(pes_code)
          cy.log(pes_code1)    
      })
      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
      })
      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEM);
      })
      _common.waitForLoaderToDisappear()
      _common.select_rowInContainer(cnt.uuid.ITEMS)
      _common.edit_containerCell(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LINE_ITEM.PES_QUANTITY)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })

    it("TC - Create Invoice", function () {
     
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

      _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
        })

      _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE.pesheaderfk,CONTAINER_COLUMNS_INVOICE.prcconfigurationfk,CONTAINER_COLUMNS_INVOICE.conheaderfk,CONTAINER_COLUMNS_INVOICE.clerkprcfk,CONTAINER_COLUMNS_INVOICE.businesspartnerfk],cnt.uuid.INVOICEHEADER)
      _common.search_inSubContainer(cnt.uuid.INVOICEHEADER," ")
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER);
      _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
      _common.create_newRecord(cnt.uuid.INVOICEHEADER);
      _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_CODE,pes:pes_code1,contract:procurement_contract})  
      cy.SAVE();
      _common.waitForLoaderToDisappear()  

})
  
    it("TC - Create Customising and assertion for Amount and Percent ", function () {
     
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
    });
      _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_GENERAL.EntityType)   
      _common.clear_subContainerFilter(cnt.uuid.INSTANCES);     
      _common.create_newRecord(cnt.uuid.INSTANCES);  
      _common.waitForLoaderToDisappear()   
      _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.LEDGER_CONTEXT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERAL.Name)
      _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTAINERS_GENERAL.Description)
      _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_PERCENT,commonLocators.CommonKeys.CHECK)
      _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_PROCUREMENT,commonLocators.CommonKeys.CHECK)
      _common.waitForLoaderToDisappear()

      _common.create_newRecord(cnt.uuid.INSTANCES);     
      _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.LEDGER_CONTEXT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERAL.Name)
      _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTAINERS_GENERAL.Description1)
      _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)
      _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_PROCUREMENT,commonLocators.CommonKeys.CHECK)
      cy.SAVE()
    _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
 _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

      _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS, 0)
      _common.setup_gridLayout(cnt.uuid.GENERALS_INVOICE, CONTAINER_COLUMNS_GENERALS);
      })
      _common.clear_subContainerFilter(cnt.uuid.GENERALS_INVOICE)
      _common.create_newRecord(cnt.uuid.GENERALS_INVOICE);
      _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_INVOICE,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERAL.Description)
      _common.enterRecord_inNewRow(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERAL.GeneralValue)
      _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_INVOICE,CONTAINERS_GENERAL.GeneralValueType,CONTAINERS_GENERAL.GeneralPercent)          
      
      _common.clear_subContainerFilter(cnt.uuid.GENERALS_INVOICE)
      _common.create_newRecord(cnt.uuid.GENERALS_INVOICE);
      _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_INVOICE,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERAL.Description1)
      _common.enterRecord_inNewRow(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERAL.GeneralValue1)
      _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_INVOICE,CONTAINERS_GENERAL.GeneralValueType,CONTAINERS_GENERAL.GeneralAmount)  
      cy.SAVE()
      _common.waitForLoaderToDisappear()

    })

    it("TC - Verify Business Partner Assertion", function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);   
     _common.waitForLoaderToDisappear()


      _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
        _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
      _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
      });
      _common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
      _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
      _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS)
      _common.enterRecord_inNewRow(cnt.uuid.BUSINESS_PARTNERS,app.GridCells.BUSINESS_PARTNER_NAME_1,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BUSINESSPARTNER_DESC)
      _common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.GENERALS_BUSINESSPARTNER, app.FooterTab.GENERALS, 1);
      });
      _common.clear_subContainerFilter(cnt.uuid.GENERALS_BUSINESSPARTNER)
      _common.create_newRecord(cnt.uuid.GENERALS_BUSINESSPARTNER)
      _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_BUSINESSPARTNER,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERAL.GeneralType)
      _common.enterRecord_inNewRow(cnt.uuid.GENERALS_BUSINESSPARTNER,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERAL.GeneralValue)
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_BUSINESSPARTNER,CONTAINERS_GENERAL.GeneralValueType,CONTAINERS_GENERAL.GeneralPercent) 
      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
      _common.waitForLoaderToDisappear()
 _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

      _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
      })
      _common.maximizeContainer(cnt.uuid.INVOICEHEADER) 
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
      _common.create_newRecord(cnt.uuid.INVOICEHEADER);
      _common.edit_dropdownCellWithCaret(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_CONFIGURATION_FK,commonLocators.CommonKeys.GRID,CONTAINERS_INVOICE.CONFIGURATION)

      _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,app.InputFields.INPUT_GROUP_CONTENT,BUSINESSPARTNER_DESC)
      _common.waitForLoaderToDisappear()
      _mainView.select_popupItem(commonLocators.CommonKeys.GRID,BUSINESSPARTNER_DESC)
      _common.waitForLoaderToDisappear()
      _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,BUSINESSPARTNER_DESC)
      _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_CODE_1})
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER);
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.APPLICATION).then(() => {       
         _common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS, 0)
         }) 
         _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_INVOICE,CONTAINERS_GENERAL.Value,CONTAINERS_GENERAL.GeneralValue)
   
      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_BUSINESS_PARTNER)
      });
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
      _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
      _modalView.findModal().findInputFieldInsideModal(sidebar.SideBarOptions.BUSINESS_PARTNER, app.InputFields.INPUT_GROUP_CONTENT).clear().type(CONTAINERS_BUSINESS_PARTNER.BP);
      _common.waitForLoaderToDisappear()
      _modalView.select_popupItem(commonLocators.CommonKeys.GRID,CONTAINERS_BUSINESS_PARTNER.BP);
      _common.waitForLoaderToDisappear()
      _common.clickOn_modalFooterButton(btn.ButtonText.OK);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PROJECT_NO)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      
      _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
          Cypress.env(contract_code1, $ele1.text())
          procurement_contract1 = Cypress.env(contract_code1)
          cy.log(procurement_contract1)    
        })
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  })

    it("TC - Verify General Contract Assetion", function () {
      
     
      _common.openTab(app.TabBar.GENERAL_CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT, app.FooterTab.GENERALS,1)
        });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.GENERALS_CONTRACT)
      _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
      _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_CONTRACT,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_GENERAL.GeneralType)
      _common.enterRecord_inNewRow(cnt.uuid.GENERALS_CONTRACT,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERAL.GeneralValue)
      
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_CONTRACT,CONTAINERS_GENERAL.Value,CONTAINERS_GENERAL.GeneralValue) 
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);

      _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_BUSINESS_PARTNER)
      });
      _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT.clerkprcfk,CONTAINER_COLUMNS_CONTRACT.controllingunitfk],cnt.uuid.INVOICEHEADER)
      _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
      _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
      _common.create_newRecord(cnt.uuid.INVOICEHEADER);
      _common.edit_dropdownCellWithCaret(cnt.uuid.INVOICEHEADER,app.GridCells.PRC_CONFIGURATION_FK,commonLocators.CommonKeys.GRID,CONTAINERS_INVOICE.CONFIGURATION)
      _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER,app.GridCells.BUSINESS_PARTNER_FK,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BUSINESS_PARTNER.BP)
      _common.waitForLoaderToDisappear()
      _mainView.select_popupItem(commonLocators.CommonKeys.GRID,CONTAINERS_BUSINESS_PARTNER.BP)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,COUNTUNIT)
      _common.waitForLoaderToDisappear()
      _package.enterRecord_toCreateInvoiceHeader({container_UUID:cnt.uuid.INVOICEHEADER,invoiceNo:INVOICE_CODE_2,contract:procurement_contract1})
     
      cy.SAVE()  
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.INVOICEHEADER)  
      _common.openTab(app.TabBar.APPLICATION).then(() => {   
            _common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS, 0)
        })
        _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_INVOICE,CONTAINERS_GENERAL.Value,CONTAINERS_GENERAL.GeneralValue)
  })
  

});

