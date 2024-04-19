import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage,_package, _mainView, _modalView, _sidebar, _rfqPage, _saleContractPage} from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import _ from "cypress/types/lodash";


const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LI_DESC = "LI_DESC-" + Cypress._.random(0, 999);

var packageCode:string;
var reqCode:string;
var RfqCode:string;
var quantity:string;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let REQUEST_FOR_QUOTE_PARAMETERS: DataCells;
let MODAL_QUOTE;
let CONTRACT_PARAMETERS : DataCells;
let CONTAINER_COLUMNS_QUOTES_ITEMS;
let CONTAINERS_PRICE_COMPARISON;
let CONTAINERS_QUOTE;
let CONTAINERS_PACKAGE
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE_ITEM;
let CONTAINER_COLUMNS_REQUISITION;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.83 | Create contract from scratch");
describe('PCM- 2.83 | Create contract from scratch', () => {

    before(function () {
        cy.fixture("pcm/pcm-2.83-create-contract-from-scratch.json").then((data) => {
          this.data = data;
          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			    CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			    ESTIMATE_PARAMETERS = {
				    [app.GridCells.CODE]: EST_CODE,
				    [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			    };
          CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
          CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
          LINE_ITEM_PARAMETERS = {
              [app.GridCells.DESCRIPTION_INFO]: LI_DESC,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY             
          };
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL,
              
          };
          MODAL_QUOTE = this.data.MODALS.QUOTE;
          REQUEST_FOR_QUOTE_PARAMETERS = {
            [commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_QUOTE.BUSINESS_PARTNER[0], MODAL_QUOTE.BUSINESS_PARTNER[1]],
          }
          CONTAINERS_PACKAGE= this.data.CONTAINERS.PACKAGE
          CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
          CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
          CONTAINER_COLUMNS_PACKAGE_ITEM=this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
          CONTRACT_PARAMETERS = {
            [app.GridCells.BUSINESS_PARTNER_FK_SMALL]: "Adolf Koch",
            [app.GridCells.PROJECT_FK]: Cypress.env('PROJECT_NUMBER'),
          }
          CONTAINERS_QUOTE= this.data.CONTAINERS.QUOTE
          CONTAINER_COLUMNS_QUOTES_ITEMS= this.data.CONTAINER_COLUMNS.QUOTES_ITEMS
          CONTAINERS_PRICE_COMPARISON= this.data.CONTAINERS.PRICE_COMPARISON
        });
        cy.preLoading(
          Cypress.env("adminUserName"), 
          Cypress.env("adminPassword"),               
          Cypress.env("parentCompanyName"), 
          Cypress.env("childCompanyName"));
       /* Open desktop should be called in before block */
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    }); 
    after(() => {
      cy.LOGOUT();
    });

    it("TC - Create New Estimate Record", function () {
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    });
    it("TC- Create new Line item record", function(){
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      
    });
    it("TC- Assign material resource to line item",function(){
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.maximizeContainer(cnt.uuid.RESOURCES)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL).then(($value)=>{
           Cypress.env("quantity",$value.text())
           cy.log(quantity)
        })
    
    });
    it("TC- Verify Create/update material Package", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
      _package.enterRecord_toCreatePackage_wizard(CONTAINERS_PACKAGE.STRUCTURE)
      _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);          
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
          packageCode = $value.text()
          cy.log(packageCode)
        })
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,2)
          _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,CONTAINER_COLUMNS_PACKAGE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.MATERIAL);
        _common.assert_cellData(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL, CONTAINERS_LINE_ITEM.QUANTITY)
        _package.changeStatus_ofPackage_inWizard()

    });
    it('TC-Create requisition from Package',function(){        
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(()=>{
          _common.setDefaultView(app.TabBar.MAIN)
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.getText_fromCell(cnt.uuid.REQUISITIONS,app.GridCells.CODE).then(($value)=>{
           reqCode = $value.text()
            cy.log(reqCode)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        
    });
    it('TC - Create Request For Quote from wizard and change status', function() {        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear()      
        _common.getText_fromCell(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.CODE).then(($value)=>{
            RfqCode = $value.text()
             cy.log(RfqCode)
        })       
        
    });
    it("TC - Create Quote for multiple suppliers from RfQ", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
      _rfqPage.create_quote_fromWizard([MODAL_QUOTE.BUSINESS_PARTNER[0], MODAL_QUOTE.BUSINESS_PARTNER[1]], [MODAL_QUOTE.CHECK, MODAL_QUOTE.CHECK]);
      _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
      cy.SAVE();
    });
    it("TC - Quote the Prices for the supliers in Quote's items Container", function () {     
        
        _common.openTab(app.TabBar.QUOTES).then(() =>{
          _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.PACKAGEITEMS,2);
          _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,CONTAINER_COLUMNS_QUOTES_ITEMS)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_SELECTED_ENTITIES();
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.QUOTES,RfqCode)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.BUSINESS_PARTNER_FK,MODAL_QUOTE.BUSINESS_PARTNER[0])
        _common.search_inSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.MATERIAL,2)
  
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE.PRICE[0]);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.TOTAL).then(($value)=>{
          Cypress.env("Total",$value.text())
        })        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.BUSINESS_PARTNER_FK,MODAL_QUOTE.BUSINESS_PARTNER[1])
        _common.search_inSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.MATERIAL,2)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE.PRICE[1]);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS)
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED);
    });  
    it("TC - Navigate to Price Comparision & create the contract to BP", function () {     
        
        
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES,CONTAINERS_PRICE_COMPARISON.MODULE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() =>{
          _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1,app.FooterTab.PRICE_COMPARISON_ITEM,2);
        
        });
        _common.maximizeContainer(cnt.uuid.PRICE_COMPARISON_V1)      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _saleContractPage.create_contractInPriceComparison_fromWizard(CONTRACT_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() =>{
          _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT,app.FooterTab.ITEMS,2);
                
        });
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,CONTAINERS_LINE_ITEM.QUANTITY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL,CONTAINERS_QUOTE.PRICE[0])
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.TOTAL,Cypress.env("Total"))
      
      
    });
})

