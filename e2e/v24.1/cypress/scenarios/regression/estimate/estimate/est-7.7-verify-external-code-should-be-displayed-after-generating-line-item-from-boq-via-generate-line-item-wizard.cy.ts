import { _boqPage, _common, _estimatePage, _mainView, _modalView, _sidebar, _validate } from 'cypress/pages';

import { tile, app, cnt,commonLocators,sidebar, btn } from "cypress/locators";
import { EST_HEADER } from 'cypress/pages/variables';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQS_PARAMETERS:DataCells;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS:DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells;

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 7.7 | Verify external code should be displayed after generating line item from boq via generate line item wizard');

describe('EST- 7.7 | Verify external code should be displayed after generating line item from boq via generate line item wizard', () => {

	before(function () {
		cy.fixture('estimate/est-7.7-verify-external-code-should-be-displayed-after-generating-line-item-from-boq-via-generate-line-item-wizard.json')
		  .then((data) => {
			this.data = data;
            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            BOQS_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            };
            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            BOQS_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
              };
              CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
              CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
              ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
              };
              CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
              GENERATE_LINE_ITEMS_PARAMETERS={
                [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC                
            };

      }).then(()=>{

           cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

        })

      });
 

  it("TC - Create new BoQ header and Go To BoQ",function(){
     _common.openTab(app.TabBar.BOQ).then(() => {
     _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQS,1);
     _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ);
     })
     _common.clear_subContainerFilter(cnt.uuid.BOQS);
     _common.create_newRecord(cnt.uuid.BOQS);
     _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS)
     cy.SAVE();
     _common.waitForLoaderToDisappear()
     _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
     _common.waitForLoaderToDisappear()
     
  })

  it("TC - Create BoQ Structure", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
          _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
          _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.EXTERNAL_CODE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_BOQ_STRUCTURE.EXTERNAL_CODE)
        cy.SAVE()
       
  });   

  it("TC - Create Estimate Header and Go To Estimate", function(){
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
       _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
       _common.waitForLoaderToDisappear()
       _common.openTab(app.TabBar.ESTIMATE).then(() =>{
         _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE,0)
         _common.setDefaultView(app.TabBar.ESTIMATE)
         _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE)
         

        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
         _common.create_newRecord(cnt.uuid.ESTIMATE)
         _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS)
         _common.waitForLoaderToDisappear()
		     cy.SAVE()
         _common.waitForLoaderToDisappear()
         _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
         _common.waitForLoaderToDisappear()
  })  
     
  it("TC - Generate Line Item From BoQ", function(){
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.externalcode,CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget],cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
      })
    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
      _common.waitForLoaderToDisappear()
      _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
     // _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCT_DESC)
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCT_DESC)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EXTERNAL_CODE,CONTAINERS_BOQ_STRUCTURE.EXTERNAL_CODE)

  })
    after(() => {
        cy.LOGOUT();
    });

})

 
