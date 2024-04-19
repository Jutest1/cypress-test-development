import { tile, app, cnt, sidebar, btn, commonLocators,} from "cypress/locators";
import { _common, _estimatePage, _package, _validate, _boqPage,_mainView, _projectPage, _modalView } from "cypress/pages";
import { data } from "cypress/types/jquery";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECTNO= "TESTPROJECT-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PROJECT_DESC"+  Cypress._.random(0, 999);
const BOQ_DESC1 = "BOQ-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "EST_CODE-"+ Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST_DESC-"+ Cypress._.random(0, 999);

let CONTAINERS_PROJECT;
let PROJECTS_PARAMETERS:DataCells
let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let MODALS_CREATE_BOQ_PACKAGE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_RESOURCE;
let CONTAINERS_PROCUREMENT_BOQ;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 1.80 | Renumber BOQ in Contract Module");

describe("PCM- 1.80 | Renumber BOQ in Contract Module", () => {
  before(function () {
    cy.preLoading(
        Cypress.env("adminUserName"), 
        Cypress.env("adminPassword"),         
        Cypress.env("parentCompanyName"), 
        Cypress.env("childCompanyName")
    );

    cy.fixture("pcm/pcm-1.80-renumber-boq-in-contract.json").then((data) => {
      this.data = data;
      CONTAINERS_PROJECT= this.data.CONTAINERS.PROJECT
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECTNO,
        [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
      }
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      		CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      		CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE      		
      		BOQS_PARAMETERS = {
        		[app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
			};
      		BOQS_STRUCTURE_PARAMETERS = {
        		[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        		[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        		[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        		[ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        		[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      		};

          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
          ESTIMATE_PARAMETERS = {
            [app.GridCells.CODE]: ESTIMATE_CODE,
            [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          };
          GENERATE_LINE_ITEMS_PARAMETERS = {
            [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
            [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
          }
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          CONTAINER_RESOURCE = this.data.CONTAINERS.RESOURCE;
          MODALS_CREATE_BOQ_PACKAGE= this.data.MODALS.CREATE_BOQ_PACKAGE;
          CONTAINERS_PROCUREMENT_BOQ= this.data.CONTAINERS.PROCUREMENT_BOQ
     
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);   
        
    })
  })
  it("TC - Create new Project and Pinned it",function(){
    _common.waitForLoaderToDisappear()
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
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECTNO).pinnedItem();
  })
  it("TC - Create BOQ header & BOQ Structure", function () {
  
    _common.openTab(app.TabBar.BOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});

		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);

		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS );
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

  });

  it("TC - Create Estimate header and generate line items from BOQ and assign resource to it", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE);
		});

		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
		cy.REFRESH_CONTAINER();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		cy.SAVE();
		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(CONTAINER_RESOURCE.SHORT_KEY, CONTAINER_RESOURCE.CODE);
		cy.SAVE();
  })

  it("TC - Create BOQ Package using wizard Create/Update BoQ Package", function () {     
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODALS_CREATE_BOQ_PACKAGE.BASEDON, MODALS_CREATE_BOQ_PACKAGE.ESTIMATESCOPE, MODALS_CREATE_BOQ_PACKAGE.ESTIMATESCOPEINDEX, MODALS_CREATE_BOQ_PACKAGE.WICBOQ, MODALS_CREATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODALS_CREATE_BOQ_PACKAGE.QTYTYPE, MODALS_CREATE_BOQ_PACKAGE.CREATEPACKAGECHECKBOX)
   
  });

  it("TC - Change package status ,create contract", function () {   
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2);
		});

		_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
		_common.select_rowInContainer(cnt.uuid.PACKAGE);
		_package.changeStatus_ofPackage_inWizard();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(MODALS_CREATE_BOQ_PACKAGE.BUSINESS_PARTNER);
  
      
  })
  it("TC - Create Procurement Boqs record and add BoQ structure to it",function(){  
    
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {        
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);        
    }); 
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQS)
    _boqPage.enterRecord_ToCreate_procurementBoQs(CONTAINERS_PROCUREMENT_BOQ.SERVICE,BOQ_DESC1,CONTAINERS_PROCUREMENT_BOQ.CREATENEWBOQ)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_PROCUREMENT_BOQ.LEVEL)
    
    _common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.REFERENCE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_PROCUREMENT_BOQ.REFERENCE)
    cy.SAVE()
   
  })
  it("TC - Verify Renumber BoQ wizard option in contract",function(){      
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_PROCUREMENT_BOQ.ROOT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.RENUMBER_BOQ)
    _common.waitForLoaderToDisappear()
    _modalView.findModal().findCaretInsideModal(commonLocators.CommonLabels.SELECTION)
    _modalView.select_popupItem(CONTAINERS_PROCUREMENT_BOQ.GRID,CONTAINERS_PROCUREMENT_BOQ.SELECTION)    
    _common.clickOn_modalFooterButton(btn.ButtonText.RENUMBER)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()    
    _common.clickOn_cellHasIcon(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM)
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.REFERENCE,CONTAINERS_PROCUREMENT_BOQ.REFERENCE1)
  })
  after(() => {
		cy.LOGOUT();
	});
})