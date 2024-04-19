
import { _common, _projectPage, _sidebar,_bidPage, _saleContractPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _validate, _rfqPage, _controllingUnit } from "cypress/pages";
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
let RESOURCE_PARAMETERS: DataCells,REQUEST_FOR_QUOTE_PARAMETERS:DataCells
let LINE_ITEM_PARAMETERS: DataCells,PROJECTS_PARAMETERS:DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS,CONTAINER_COLUMNS_BUSINESS_PARTNER,CONTAINERS_RFQ,CONTAINERS_QUOTE,CONTAINER_COLUMNS_QUOTE_ITEM,CONTAINERS_CONTRACT_TERMINATION
let CONTAINER_COLUMNS_PACKAGE,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINERS_INVOICE,CONTAINER_COLUMNS_INVOICE,CONTAINER_COLUMNS_GENERALS,
CONTAINERS_CONTROLLING_UNIT,CONTAINER_COLUMNS_CONTRACT,CONTAINER_COLUMNS_PES_ITEM,CONTAINERS_BUSINESS_PARTNER,CONTAINERS_GENERAL,CONTAINER_COLUMNS_CONTRACT_ITEM

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------

const PESITEM_QTY_ENV = "PESITEM_QTY_ENV" + Cypress._.random(0, 999);
const PESITEM_PRICE_ENV = "PESITEM_PRICE_ENV" + Cypress._.random(0, 999);
const PESITEM_QTYR_ENV = "PESITEM_QTYR_ENV" + Cypress._.random(0, 999);

const CHANGE_PROJECT_DESC = "CHANGE_PRJ_DESC_" + Cypress._.random(0, 999);

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.30 | Create contract termination for remaining quantities in contract & create new contract.");
describe("PCM- 2.30 | Create contract termination for remaining quantities in contract & create new contract.", () => {
          before(function () {
            cy.fixture('pcm/pcm-2.30-create-contract-termination-for-remaining-quantities-in-contract-and-create-new-contract.json').then((data) => {
                this.data = data;
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
               
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
                CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                
                CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
                CONTAINERS_RFQ = this.data.CONTAINERS.RFQ
                CONTAINERS_QUOTE = this.data.CONTAINERS.QUOTE
                CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
                CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
                CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
                CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
                CONTAINER_COLUMNS_QUOTE_ITEM=this.data.CONTAINER_COLUMNS.QUOTE_ITEM

                CONTAINERS_BUSINESS_PARTNER=this.data.CONTAINERS.BUSINESS_PARTNER
                CONTAINER_COLUMNS_BUSINESS_PARTNER=this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
                CONTAINER_COLUMNS_PES_ITEM=this.data.CONTAINER_COLUMNS.PES_ITEM
                CONTAINERS_INVOICE= this.data.CONTAINERS.INVOICE
                CONTAINER_COLUMNS_INVOICE=this.data.CONTAINER_COLUMNS.INVOICE
                CONTAINERS_GENERAL= this.data.CONTAINERS.GENERAL
                CONTAINER_COLUMNS_GENERALS=this.data.CONTAINER_COLUMNS.GENERALS
                CONTAINERS_CONTRACT_TERMINATION= this.data.CONTAINERS.CONTRACT_TERMINATION
               
                CONTAINER_COLUMNS_CONTRACT_ITEM=this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
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
              
                 
                RESOURCE_PARAMETERS = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                    [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
                  }
                  
                  CONTROLLING_UNIT_PARAMETERS = {
                    [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                    [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
                  }

                  REQUEST_FOR_QUOTE_PARAMETERS = {
                    [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_RFQ.BP],
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
        cy.REFRESH_CONTAINER()
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

    it("TC - Create/Update Material Package and Create Requisition", function () {

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

        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        }) 

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
      _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _common.openTab(app.TabBar.MAIN).then(() => {
          _common.setDefaultView(app.TabBar.MAIN)
          cy.wait(2000)
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2)
        })
        _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2)
        })
    });
  
    it("TC - Create Request For Quote and Create Quote", function () {
      
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
      _common.waitForLoaderToDisappear()
      cy.wait(2000)//required wait
      

        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
      _common.waitForLoaderToDisappear()
      cy.wait(2000)//required wait

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITION, 2)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem()
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
      _common.waitForLoaderToDisappear()
      cy.wait(2000)//required wait

        _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP])
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        

     
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.openTab(app.TabBar.QUOTES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 2)
          _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEM);
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTE.Price)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.PRICE_UNIT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTE.PriceUnit)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
        _common.openTab(app.TabBar.QUOTES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
    });

    it("TC - Create Contract and Create PES", function () {
     
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
      _common.waitForLoaderToDisappear()
     
      _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_CONTRACT)
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
    _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
      })
      _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"SmiJ")
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,COUNTUNIT)      
      cy.SAVE()
      _common.waitForLoaderToDisappear()
     
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      })

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
      _common.waitForLoaderToDisappear()
      cy.wait(2000)//required wait
      _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_PES)
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
    _common.waitForLoaderToDisappear()

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
      _common.edit_containerCell(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LINE_ITEM.QUANTITY1)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
     
      _common.saveCellDataToEnv(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,PESITEM_QTY_ENV)
      _common.saveCellDataToEnv(cnt.uuid.ITEMS,app.GridCells.PRICE_SMALL,PESITEM_PRICE_ENV)
      _common.saveCellDataToEnv(cnt.uuid.ITEMS,app.GridCells.QUANTITY_REMAINING,PESITEM_QTYR_ENV)
      _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS,sidebar.SideBarOptions.CONTRACT)
    })

    it("TC - Contract termination from wizard", function () {
     
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CONTRACT_TERMINATION);
      _common.waitForLoaderToDisappear()
      _saleContractPage.contractTermination_FromWizard(CONTAINERS_CONTRACT_TERMINATION.Transfer,0,PROJECT_NO,CHANGE_PROJECT_DESC,
        CONTAINERS_CONTRACT_TERMINATION.ChangeType,CONTAINERS_CONTRACT_TERMINATION.ChangeReason,CONTAINERS_CONTRACT_TERMINATION.BusinessPartner)
        _common.waitForLoaderToDisappear()
      _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_CONTRACT)
    })

    it("TC - Verify Quantity and Material under Contract", function () {
     
      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)

      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT , app.FooterTab.ITEMS, 2)
        _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM);
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PURCHASE_ORDERS,commonLocators.CommonKeys.CHANGE_ORDER)
      _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.MDC_MATERIAL_FK,CONTAINERS_RESOURCE.CODE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,"-"+Cypress.env(PESITEM_QTYR_ENV))

      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PURCHASE_ORDERS,commonLocators.CommonKeys.PURCHASE_ORDER)
      _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.MDC_MATERIAL_FK,CONTAINERS_RESOURCE.CODE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,Cypress.env(PESITEM_QTYR_ENV))
    })
});
