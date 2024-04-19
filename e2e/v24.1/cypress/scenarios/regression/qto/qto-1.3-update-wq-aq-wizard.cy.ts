import { _common, _estimatePage, _validate, _mainView,_qtoPage,_sidebar,_projectPage,  _boqPage } from "cypress/pages";
import { app, tile, cnt,sidebar,commonLocators, btn} from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import cypress from "cypress";
import { BOQ_ROOT_ITEM } from 'cypress/pages/variables';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("QTO");
allure.feature("QTO");
allure.story("QTO-1.3 | Run update AQ/WQ wizard");
// QTO-1.2 | Create QTO detail line

let PRJ_NO = "QTO-PRJ-" + Cypress._.random(0, 999);
let PRJ_NAME = "TEST-" + PRJ_NO;
let CLERK_NAME = "HS";
let CREATEPROJECT_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINERS_QTO_HAEDER;

let CONTAINER_COLUMNS_QTO_HEADER;
let CREATEQTOHEADER_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_QTO_DETAILLINE;
let CONTAINERS_QTO_DETAILLINE;
let QTODETAILLINE_PARAMETERS:DataCells;

let BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);
let BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
let QTO_HEADER_DESC = 'QTO_HEADER_DESC-' + Cypress._.random(0, 999);




describe ('QTO-1.3 | Run update AQ/WQ wizard',()=>{
      before(function () {
        cy.fixture('qto/qto-1.2-qto-detail-line.json')
          .then((data) => {
          this.data = data;
          
      /*Project parameters  */
      CREATEPROJECT_PARAMETERS= {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
        [ commonLocators.CommonLabels.CLERK] :CLERK_NAME
        };

      /*Boq header parameters*/
      CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ

      BOQ_PARAMETERS={
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
      }
     /*Boq struture parameters*/
      CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
      BOQ_STRUCTURE_PARAMETERS={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
          [app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
     /*QTO header*/
      CONTAINER_COLUMNS_QTO_HEADER=this.data.CONTAINER_COLUMNS.QTO_HEADER;
      CONTAINERS_QTO_HAEDER =this.data.CONTAINERS.QTO_HEADER;
      CREATEQTOHEADER_PARAMETERS={
        [app.GridCells.QTO_HEADER_PURPOSE]:CONTAINERS_QTO_HAEDER.QTO_PURPOSE_SALE_WQ_AQ,
        [app.GridCells.QTO_HEADER_QTO_TYPE]:CONTAINERS_QTO_HAEDER.QTO_HEADER_QTO_TYPE,
        [app.GridCells.QTO_HEADER_DESCRIPTION]:QTO_HEADER_DESC,
        [app.GridCells.QTO_HEADER_BOQ_REF_NO]:BOQ_DESC
      }
    /*QTO detail line*/
    CONTAINER_COLUMNS_QTO_DETAILLINE =this.data.CONTAINER_COLUMNS.QTO_DETAIL_LINE;
    CONTAINERS_QTO_DETAILLINE =this.data.CONTAINERS.QTO_DETAIL_LINE;
    QTODETAILLINE_PARAMETERS={
      [app.GridCells.BOQ_ITEM_CODE]:CONTAINERS_QTO_DETAILLINE.QTO_DETAIL_LINE_BOQ,
      [app.GridCells.QTO_lINE_TYPE_CODE]:CONTAINERS_QTO_DETAILLINE.QTO_DETAIL_LINE_TYPE_CODE,
      [app.GridCells.FACTOR]:CONTAINERS_QTO_DETAILLINE.QTO_DETAIL_LINE_FACTOR,
      [app.GridCells.QTO_FORMULA_FK]:CONTAINERS_QTO_DETAILLINE.QTO_DETAIL_LINE_FORMULA,
      [app.GridCells.VALUE_1_DETAIL]:CONTAINERS_QTO_DETAILLINE.QTO_DETAIL_LINE_VALUE
     
    }
    
        
          
        }).then(()=>{
    
        //Check login
     cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      
    });
  });


     
  it('TC-Create new project no',function(){
     _common.openDesktopTile(tile.DesktopTiles.PROJECT);
     _common.openTab(app.TabBar.PROJECT).then(() => {
     _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
  });
     _common.create_newRecord(cnt.uuid.PROJECTS);
     _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);
     _common.waitForLoaderToDisappear();
    cy.wait(1000);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.pinnedItem();
 
});


it("TC - Create BOQ header and BOQ structure", function () {
     _common.openTab(app.TabBar.BOQS).then(() => {
     _common.setDefaultView(app.TabBar.BOQS)
     _common.waitForLoaderToDisappear()
     _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
     _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
 });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.maximizeContainer(cnt.uuid.BOQS)
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    /*  set boq values and set boq header no as envirement value:boqrootitem.reference*/
    _qtoPage.textOfEnvCode(cnt.uuid.BOQS,  app.GridCells.REFERENCE,'BoQcode',BOQ_ROOT_ITEM);
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
    _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.finalgross,CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
 });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear();

});



it('Create QTO header with Sale WQ/AQ Purpose', function(){
_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
_common.waitForLoaderToDisappear();
_common.openTab(app.TabBar.QTOHEADER).then(()=>{
_common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITY_TAKEOFF_HEADER, 2);
_common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QTO_HEADER);
});
_common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
_qtoPage.createQTOHeader(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CREATEQTOHEADER_PARAMETERS);
_common.waitForLoaderToDisappear();
cy.wait(1000);
cy.SAVE();
_common.waitForLoaderToDisappear();
cy.wait(1000);

_qtoPage.textOfEnvCode(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.GridCells.CODE,'QTOHeaderCode');
_qtoPage.textOfEnvCode(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.GridCells.QTO_TARGET_TYPE,'QTOPURPOSR');

});

    
it('create qto detail line', function(){
      _common.openTab(app.TabBar.DETAIL).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 0);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, CONTAINER_COLUMNS_QTO_DETAILLINE);
        });
        _common.maximizeContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL);
        _common.waitForLoaderToDisappear();
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL);
        cy.log("CreateQTODetailLine---->"+QTODETAILLINE_PARAMETERS);
        _qtoPage.createQTODetailLine(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, QTODETAILLINE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear();
});



      


it('Run update AQ/WQ wizard', function (){

        cy.wait(1000);
        /*click wizard and open wizard*/
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        /* find Update WQ and AQ quantities to BoQ wizard*/
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_WQ_AND_AQ_QUANTITIES_TO_BOQ);
        cy.log('-------QTOPURPOSR-------:'+Cypress.env('QTOPURPOSR'));
        if(Cypress.env('QTOPURPOSR')!=='Sales WQ/AQ'){
          _common.waitForLoaderToDisappear();
          cy.wait(1000);
          _common.clickOn_modalFooterButton(btn.ButtonText.OK);
        }
        
        
      });

  it('Verify quantity in project boq',function(){
    cy.wait(1000);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.setDefaultView(app.TabBar.BOQS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
  });
  cy.log('--------BoQcode----------'+Cypress.env('BoQcode'));
  /*Selected boq header code row*/
  _qtoPage.selectCellInContainer(cnt.uuid.BOQS, app.GridCells.REFERENCE,Cypress.env('BoQcode'),app.GridCells.BOQ_ROOT_ITEM);
  /*Enter boq struture module*/
  _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
  _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
  });

  cy.REFRESH_CONTAINER();
  /*selelect boq structutre row:BOQ_STRUCTURE_DESC*/
  _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC);
  /*Get quantity from boq item*/
  _qtoPage.GetAndchangeValueToFloat(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL,'BoqQuantity','',3)
 /*Open qto container in boq struture moduel*/
 _common.openTab(app.TabBar.BOQSTRUCTURE).then(()=>{
  _common.waitForLoaderToDisappear()
  _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF, app.FooterTab.QUANTITY_TAKEOFF, 2);
});

cy.wait(1000);
  /*Get all result from QTO cointainer*/
_qtoPage.GetAllValueFromCell(cnt.uuid.QUANTITY_TAKEOFF, app.GridCells.RESULT,3);
_qtoPage.verify_BoqQuantity_and_result();

})




  after(() => {
    cy.LOGOUT();
  });



})


