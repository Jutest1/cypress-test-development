import { _common, _validate, _estimatePage,   _mainView,_qtoPage,_boqPage,_sidebar,_projectPage,_controllingUnit,_package} from 'cypress/pages';
import { app, cnt,tile, btn, sidebar,commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from 'cypress/pages/variables';

const ALLURE = Cypress.Allure.reporter.getInterface();
let ROUNDING_DESC = "ROUND-DESC-" + Cypress._.random(0, 999)
ALLURE.epic("QTO");
ALLURE.feature("QTO");
ALLURE.story('QTO- 1.5 | Create qto header with procurement boq');

let PRJ_NO = "QTO-PRJ-" + Cypress._.random(0, 999);
let PRJ_NAME = "TEST-" + PRJ_NO;
let CLERK_NAME = "HS";
let CREATEPROJECT_PARAMETERS:DataCells;


let CONTAINERS_QTO_HAEDER;

let CONTAINER_COLUMNS_QTO_HEADER;
let CREATEQTOHEADER_PARAMETERS:DataCells;
let CREATEQTOHEADER_PARAMETERS2:DataCells;

let CONTAINER_COLUMNS_PROCUREMENT_BOQ;
let CONTAINER_COLUMNS_BOQ;
let CONTAINERS_BOQ;
let BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);


let QTO_HEADER_DESC = 'QTO_HEADER_DESC-' + Cypress._.random(0, 999);
let QTO_HEADER_DESC2 = 'QTO_HEADER_DESC-PES-' + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTAINERS_CONTROLLING_UNIT;
let CONTROLLING_UNIT_PARAMETERS:DataCells;
const CU_DESCRIPTION = 'CU-DESC-' + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_PACKAGE;
let CONTAINERS_PACKAGE;


describe("QTO- 1.5 | Create qto header with procurement boq", () => {

	before(function () {
		cy.fixture('qto/qto-1.5-create-qto-header-with-procurement-boq.json')
		  .then((data) => {
			this.data = data;

      //Project parameters  
      CREATEPROJECT_PARAMETERS= {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
        [ commonLocators.CommonLabels.CLERK] :CLERK_NAME
        };

      //Controlling unit
      CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
      CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
      CONTROLLING_UNIT_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: CU_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
        [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
      };

      //package 
      CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE;
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE;
      //package boq
      CONTAINER_COLUMNS_PROCUREMENT_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMENT_BOQ;
				CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.PROCUREMENT_BOQ_STRCTURE;
      CONTAINERS_BOQ = this.data.CONTAINERS.PACKAGE_BOQ_STRUCTURE;


     //QTO header
      CONTAINER_COLUMNS_QTO_HEADER=this.data.CONTAINER_COLUMNS.QTO_HEADER;
      CONTAINERS_QTO_HAEDER =this.data.CONTAINERS.QTO_HEADER;
      CREATEQTOHEADER_PARAMETERS={
        [app.GridCells.QTO_HEADER_PURPOSE]:CONTAINERS_QTO_HAEDER.QTO_PURPOSE_PROCUREMENT_WQ_AQ,
        [app.GridCells.QTO_HEADER_QTO_TYPE]:CONTAINERS_QTO_HAEDER.QTO_HEADER_QTO_TYPE,
        [app.GridCells.QTO_HEADER_DESCRIPTION]:QTO_HEADER_DESC,
        [app.GridCells.QTO_HEADER_BOQ_REF_NO]:BOQ_DESC
      }
      CREATEQTOHEADER_PARAMETERS2={
        [app.GridCells.QTO_HEADER_PURPOSE]:CONTAINERS_QTO_HAEDER.QTO_PURPOSE_PROCUREMENT_PES,
        [app.GridCells.QTO_HEADER_QTO_TYPE]:CONTAINERS_QTO_HAEDER.QTO_HEADER_QTO_TYPE,
        [app.GridCells.QTO_HEADER_DESCRIPTION]:QTO_HEADER_DESC2,
        [app.GridCells.QTO_HEADER_BOQ_REF_NO]:BOQ_DESC
      }

			
		}).then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    
		})
	});




  after(() => {
	cy.LOGOUT();
	});

  
  it('TC-Create new project no',function(){
    /* Open desktop should be called in before block */
 _common.waitForLoaderToDisappear();
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

  
	it('TC - Create new controlling unit', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
     _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH);
     _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, " ");


        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE( )
        _common.waitForLoaderToDisappear()

        _qtoPage.textOfEnvCode(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE, "CNTSUBCODE");
       cy.wait(2000);
       cy.log('-------CNTSUBCODE--------'+Cypress.env("CNTSUBCODE"))
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
       
	});


  it('TC-Create new package no',function(){
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);

/* Creation of Package */

_common.openTab(app.TabBar.PACKAGE).then(() => {
  _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
  _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
});
_common.create_newRecord(cnt.uuid.PACKAGE);
_package.enterRecord_toCreatePackage(CONTAINERS_PACKAGE.CONFIGURATION,CONTAINERS_PACKAGE.DESCRIPTION);
cy.SAVE();
cy.wait(2000);
 _qtoPage.textOfEnvCode(cnt.uuid.PACKAGE,  app.GridCells.CODE,'PackageCode');
   
  });


  it("TC - Create package BOQ header ", function () {
    _common.openTab(app.TabBar.BOQBASED).then(function () {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_BOQ);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS);
		_package.create_ProcuremenBoQs();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
    _qtoPage.textOfEnvCode(cnt.uuid.PROCUREMENT_BOQS,  app.GridCells.REFERENCE,'BoQcode');

});




it("TC - Create package  BOQ structure", function () {
  _common.openTab(app.TabBar.BOQBASED).then(function () {
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ);
  });
  _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE);
  _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE);
  _common.clickOn_activeRowCell(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL)
  _package.enterRecord_toCreateBoQStructure(CONTAINERS_BOQ.DESCRIPTION, CONTAINERS_BOQ.UOM, CONTAINERS_BOQ.QUANTITY);
  cy.SAVE();
  _common.waitForLoaderToDisappear()


});



it('Create QTO header with Procurement WQ/AQ Purpose', function(){
  //Open quickly input and search QTO  module
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
	_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO);
	_common.waitForLoaderToDisappear();
   //select qto tab,open QTO d/etial container and seelct columns in grid
  _common.openTab(app.TabBar.QTOHEADER).then(()=>{
  _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.FooterTab.QUANTITY_TAKEOFF_HEADER, 2);
  _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CONTAINER_COLUMNS_QTO_HEADER);
   });
  //click create qto wizard
  _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
  //Input value in Create QTO header Wizard
  _qtoPage.createQTOHeader(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CREATEQTOHEADER_PARAMETERS);

  _common.waitForLoaderToDisappear();
  cy.wait(1000);
  cy.SAVE();
  _common.waitForLoaderToDisappear();
  cy.wait(1000);

   //  set boq values and set boq header no as envirement value
   _qtoPage.textOfEnvCode(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.GridCells.CODE,'QTOHeaderCode');
 

});


it('Verify QTO header  with Procurement WQ/AQ Purpose',function(){
  //Search qto record by code/description 
  cy.log('QTOHeaderCode:'+Cypress.env('QTOHeaderCode'));
  _common.waitForLoaderToDisappear();
  _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
 // _common.search_inSubContainer(cnt.uuid.QUANTITY_TAKEOFF_HEADER, Cypress.env('QTOHeaderCode'));
  _common.search_inSubContainer(cnt.uuid.QUANTITY_TAKEOFF_HEADER, QTO_HEADER_DESC);
  _validate.verify_isRecordEntered(cnt.uuid.QUANTITY_TAKEOFF_HEADER,app.GridCells.DESCRIPTION_INFO, QTO_HEADER_DESC);
  _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
  
  
  });


  it('Create QTO header with Procurement PES Purpose', function(){

    //click create qto wizard
    _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
    //Input value in Create QTO header Wizard
    _qtoPage.createQTOHeader(cnt.uuid.QUANTITY_TAKEOFF_HEADER, CREATEQTOHEADER_PARAMETERS2);
  
    _common.waitForLoaderToDisappear();
    cy.wait(1000);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    cy.wait(1000);
  
     //  set boq values and set boq header no as envirement value
     _qtoPage.textOfEnvCode(cnt.uuid.QUANTITY_TAKEOFF_HEADER, app.GridCells.CODE,'QTOHeaderCode2');
   
  
  });
  
  
  it('Verify QTO header  with Procurement PES Purpose',function(){
    //Search qto record by code/description 
    cy.log('QTOHeaderCode:'+Cypress.env('QTOHeaderCode2'));
    _common.waitForLoaderToDisappear();
    _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
   // _common.search_inSubContainer(cnt.uuid.QUANTITY_TAKEOFF_HEADER, Cypress.env('QTOHeaderCode'));
    _common.search_inSubContainer(cnt.uuid.QUANTITY_TAKEOFF_HEADER, QTO_HEADER_DESC2);
    _validate.verify_isRecordEntered(cnt.uuid.QUANTITY_TAKEOFF_HEADER,app.GridCells.DESCRIPTION_INFO, QTO_HEADER_DESC2);
    _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_HEADER);
    
    
    });
  


  

});
