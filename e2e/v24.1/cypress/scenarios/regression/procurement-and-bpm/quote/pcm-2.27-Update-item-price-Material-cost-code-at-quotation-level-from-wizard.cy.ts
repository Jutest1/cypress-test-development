import { _common,  _sidebar, _rfqPage,_mainView, _validate,_estimatePage, _modalView ,_procurementConfig, _package} from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells,
REQUEST_FOR_QUOTE_PARAMETERS,
UPDATE_ITEM_PRICE_QUOTE_PARAMETERS
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;

let DJC_BUDGET_PARAMETERS:DataCells

let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let MODAL_UPDATE_ITEM_PRICE
let CONTAINERS_RFQ;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINERS_QUOTE_ITEM
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTE_ITEMS
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 2.27 | Update item price (Material / cost code) at quotation level from wizard");

describe("PCM- 2.27 | Update item price (Material / cost code) at quotation level from wizard", () => {
  before(function () {
      cy.fixture('procurement-and-bpm/pcm-2.27-Update-item-price-Material-cost-code-at-quotation-level-from-wizard.json').then((data) => {
        this.data = data;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
        CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
        CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
        CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
        CONTAINERS_QUOTE_ITEM = this.data.CONTAINERS.QUOTE_ITEM
        CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
        CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
        CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
        CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
        CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
        CONTAINER_COLUMNS_QUOTE_ITEMS=this.data.CONTAINER_COLUMNS.QUOTE_ITEMS
        MODAL_UPDATE_ITEM_PRICE=this.data.MODAL.UPDATE_ITEM_PRICE
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
          
        DJC_BUDGET_PARAMETERS={
            [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:commonLocators.CommonLabels.RADIO_HIGHLETED_LINE_ITEM,
            [commonLocators.CommonLabels.BUDGET_FROM]:CONTAINERS_PACKAGE.COST_TOTAL,
            [commonLocators.CommonLabels.X_FACTOR]:CONTAINERS_PACKAGE.XFACTOR,
            [commonLocators.CommonKeys.INDEX]:CONTAINERS_PACKAGE.ESTIMATE_SCOPE_INDEX,
            [commonLocators.CommonKeys.RADIO_INDEX]:CONTAINERS_PACKAGE.BUDGET_FROM_INDEX
        }
        RESOURCE_PARAMETERS = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
          }
          REQUEST_FOR_QUOTE_PARAMETERS = {
            [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_RFQ.BP],
          }

          UPDATE_ITEM_PRICE_QUOTE_PARAMETERS = {
            [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ITEM_PRICE
          }
    });

    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
  });
  after(() => {
		cy.LOGOUT();
	});
  // ** Precondition adding updateprice items to wizard**//
  it("TC - Precondition for adding 'updateprice items' to wizard", function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MODULES);
    
    _common.openTab(app.TabBar.WIZARD).then(() => {
     
      _common.select_tabFromFooter(cnt.uuid.MODULES, app.FooterTab.MODULES, 0);
    })
    _common.clear_subContainerFilter(cnt.uuid.MODULES);
    _common.clickOn_containerFooterButton(cnt.uuid.MODULES, commonLocators.CommonKeys.STATUS_BAR, btn.IconButtons.ICO_NEXT)
    _common.search_inSubContainer(cnt.uuid.MODULES, "QUOTE")
    
    
    _common.select_rowInContainer(cnt.uuid.MODULES)

    _common.openTab(app.TabBar.WIZARD).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIZARD_GROUP, app.FooterTab.WIZARD_GROUP, 1);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIZARD_GROUP);
    _common.search_inSubContainer(cnt.uuid.WIZARD_GROUP, "QUOTE")
    _common.select_rowInContainer(cnt.uuid.WIZARD_GROUP)
    _common.openTab(app.TabBar.WIZARD).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIZARD_TO_GROUP, app.FooterTab.WIZARD_TO_GROUP, 1);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIZARD_TO_GROUP);
    _common.search_inSubContainer(cnt.uuid.WIZARD_TO_GROUP, "Update Item Price");
    _common.select_rowInContainer(cnt.uuid.WIZARD_TO_GROUP)
    _procurementConfig.clickcheckbox_formcell(cnt.uuid.WIZARD_TO_GROUP)
    cy.SAVE();
    cy.REFRESH_CONTAINER();
    cy.wait(1000)//required wait
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
  });

  it("TC - Create new Estimate having line item and material resource to it", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
   
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
     
     _common.openTab(app.TabBar.PACKAGE).then(()=>{
         _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
         _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
     })
     _common.waitForLoaderToDisappear()
    
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
     _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
    _procurementConfig.changeProcurementConfiguration_FromWizard("Material",btn.ButtonText.YES);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,1)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
   })
   _common.select_dataFromSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE)
   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
   _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
  _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
  cy.SAVE();
  });

  it("TC - Create Requisition from Package", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create RfQ from Requisition", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Quote for suppliers from RfQ", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP],[commonLocators.CommonKeys.CHECK]);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

  
  });

  it("TC - Replace the material from Quote for the supliers in Quote's items Container", function () {
   

    let checkboxLabelName = new Map<string, string>();
    checkboxLabelName.set("Material Catalog Price Version", "checked");
    checkboxLabelName.set("Include Neutral Material", "checked");
    checkboxLabelName.set("Quotation", "checked");
    checkboxLabelName.set("Contract", "checked");
    
   
    _common.openTab(app.TabBar.QUOTES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES)
    _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES)
    })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES,CONTAINERS_RFQ.BP);
    _common.openTab(app.TabBar.QUOTES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
    _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEMS)
    })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.CODE);
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_ITEM.PRICE1);
   _common.clickOn_activeRowCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_MATERIAL_FK)
   cy.SAVE()
   _common.waitForLoaderToDisappear()

   _common.openTab(app.TabBar.QUOTES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
    })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.CODE);

   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE);
    _common.waitForLoaderToDisappear()
   
    _rfqPage.Update_item_price_quote(commonLocators.CommonKeys.SELECTED_ITEMS, 1, checkboxLabelName, commonLocators.CommonKeys.BASE_PRICE, CONTAINERS_RESOURCE.MATERIAL_DESC)

  });

  it("TC - Verify the replace material with existing  ", function () {

    _common.openTab(app.TabBar.QUOTES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS)
    });
    _common.select_allContainerData(cnt.uuid.QUOTES_ITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _validate.assert_cellData_not_equal(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, CONTAINERS_QUOTE_ITEM.PRICE1)
  });
});