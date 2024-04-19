import cypress from "cypress";
import { tile, app, cnt, commonLocators, btn ,sidebar} from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const BOQ_DESC="BOQ_DESC-"+ Cypress._.random(0, 999)
const BOQSTRUCT_DESC ="BOQSTRUCT_DESC-"+ Cypress._.random(0, 999)
const BOQSTRUCT_DESC1 ="BOQSTRUCT_DESC-"+ Cypress._.random(0, 999)


const allure = Cypress.Allure.reporter.getInterface();
let BOQ_PARAMETERS:DataCells;
let BOQ_STRUCTURE_PARAMETERS:DataCells;
let BOQ_STRUCTURE2_PARAMETERS:DataCells;
let RENUMBER_BOQ_PARAMETERS:DataCells;

let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.62 | Renumber Boq using Wizard");

  describe('PCM- 1.62 | Renumber Boq using Wizard', () => {

		before(function () {
			cy.fixture('pcm/pcm-1.62-renumber-boq-using-wizard.json').then((data) => {
				this.data = data;
				CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE;
			
				CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ;
				CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			
				BOQ_PARAMETERS = {

          [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
				};

        BOQ_STRUCTURE_PARAMETERS = {
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
					[app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY1,
          [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNITRATE,
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
				};
        BOQ_STRUCTURE2_PARAMETERS = {
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
					[app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC1,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY2,
          [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNITRATE,
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
				};

        	
        RENUMBER_BOQ_PARAMETERS ={
          [commonLocators.CommonLabels.SELECTION]:CONTAINERS_BOQ_STRUCTURE.SELECTION,
          [commonLocators.CommonElements.LINE_TYPE]:CONTAINERS_BOQ_STRUCTURE.LINETYPE,
          [commonLocators.CommonElements.START_VALUE]:CONTAINERS_BOQ_STRUCTURE.STARTVALUE,
          [commonLocators.CommonElements.STEP_INC]:CONTAINERS_BOQ_STRUCTURE.INCREMENT,
          [app.GridCells.BRIEF_INFO_SMALL]:[BOQSTRUCT_DESC,BOQSTRUCT_DESC1],
          
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

  it('TC - Create new BoQ header and BoQ structure', function () {        
   
    _common.openTab(app.TabBar.BOQS).then(() => {
          _common.setDefaultView(app.TabBar.BOQS)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
          _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
      });
      _common.clear_subContainerFilter(cnt.uuid.BOQS);
      _common.create_newRecord(cnt.uuid.BOQS);
      _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS)
       cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);

      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
          _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
          _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE2_PARAMETERS);
      cy.SAVE();      
      _common.waitForLoaderToDisappear()
    })

    it('TC - Create new BoQ header and BoQ structure', function () {
     
      _common.waitForLoaderToDisappear()
      _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.REFERENCE,CONTAINERS_BOQ_STRUCTURE.LEVEL2)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
			_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.RENUMBER_BOQ)

      _boqPage.renumberBoQ_fromWizard(cnt.uuid.BOQ_STRUCTURES,RENUMBER_BOQ_PARAMETERS)      
    })
});

