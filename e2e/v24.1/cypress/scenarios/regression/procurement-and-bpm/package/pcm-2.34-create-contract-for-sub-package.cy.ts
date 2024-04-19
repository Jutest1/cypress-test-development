import { _common,  _sidebar,_projectPage,_boqPage,_package, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------


const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const RFQ_DESC = "RFQ_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC2 = "B2-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);



var reqCode: string;
var rfqCode: string;

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS1:DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    RFQ_PARAMETERS:DataCells,
    PROJECTS_PARAMETERS:DataCells
   

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINERS_PACKAGE_BOQ,
   
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_RESOURCE,
    CONTAINERS_BIDDER,
    CONTAINER_COLUMNS_RFQ,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINERS_BUSINESS_PARTNER,
    CONTAINERS_SUB_PACKAGE,CONTAINER_COLUMNS_SUB_PACKAGE,CONTAINER_COLUMNS_PROCUREMENT_BOQ

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.34 | Create contract for sub package");

describe("PCM- 2.34 | Create contract for sub package", () => {
      before(function () {
        cy.fixture('pcm/pcm-2.34-create-contract-for-sub-package.json').then((data) => {
          this.data = data;
          CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
          CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
          CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
          CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
          CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
          CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
          
          CONTAINERS_PACKAGE_BOQ = this.data.CONTAINERS.PACKAGE_BOQ
          CONTAINER_COLUMNS_PROCUREMENT_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMENT_BOQ
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
         
          CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
          CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
          CONTAINERS_BUSINESS_PARTNER= this.data.CONTAINERS.BUSINESS_PARTNER
          CONTAINERS_SUB_PACKAGE = this.data.CONTAINERS.SUB_PACKAGE;
          CONTAINER_COLUMNS_SUB_PACKAGE = this.data.CONTAINER_COLUMNS.SUB_PACKAGE

          
          PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:CLERK_NAME
        }

        
          ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: EST_CODE,
              [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          }
          BOQ_PARAMETERS = {
              [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
          }
          BOQ_STRUCTURE_PARAMETERS = {
              [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
              [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
              [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
          }
          BOQ_STRUCTURE_PARAMETERS1 = {
            [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
            [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC2,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY1,
            [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM1
        }
          GENERATE_LINE_ITEMS_PARAMETERS = {
              [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
              [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
          }
          RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
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
  it("TC - Create BOQ header & BOQ Structure in first Project", function () {

    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
  });
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.BOQS);
  _common.maximizeContainer(cnt.uuid.BOQS)
  _common.create_newRecord(cnt.uuid.BOQS);
  _common.waitForLoaderToDisappear()
  _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.minimizeContainer(cnt.uuid.BOQS)
  _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
  });
  _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
  cy.SAVE()
  cy.wait(2000) //required wait to load page
  _common.waitForLoaderToDisappear()
  _boqPage.get_BoQsFinalPrice()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);

  });

  it("TC - Create Estimate header and generate line items from BOQ and assign resource to it", function () {

    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    cy.wait(1000) //required wait to load page
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(1000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
  })

  it("TC - Create BOQ Package using wizard Create/Update BoQ Package and Verify items of package", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(1000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.BOQ, CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
          _common.setDefaultView(app.TabBar.PACKAGE)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })

    _common.openTab(app.TabBar.BOQBASED).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE,  app.GridCells.QUANTITY_ADJ, CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY)
  })
  it("TC - Creation of Sub Package for the selected package", function () {
   
    _common.openTab(app.TabBar.PACKAGE).then(function () {
      _common.select_tabFromFooter(cnt.uuid.SUB_PACKAGE, app.FooterTab.SUB_PACKAGE, 0)
      _common.setup_gridLayout(cnt.uuid.SUB_PACKAGE, CONTAINER_COLUMNS_SUB_PACKAGE)
    })
    _common.create_newRecord(cnt.uuid.SUB_PACKAGE);
    _package.create_SubPackage(CONTAINERS_SUB_PACKAGE.DESC);
    cy.SAVE();
  });
  it("TC - Creation of procurement BoQ for the selected package", function () {
    
    _common.openTab(app.TabBar.BOQBASED).then(function () {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_BOQ)
    })
    _common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS);
    _package.create_ProcuremenBoQs();
    cy.SAVE();
  });
  it("TC - Creation of BoQ for the selected package", function () {
    
    _common.openTab(app.TabBar.BOQBASED).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE);
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURE);
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURE, BOQ_STRUCTURE_PARAMETERS1);
    _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });
  it('TC - Change status of the package and Create new contract record', function () {
    
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    cy.wait(1000) //required wait to load page
    _common.waitForLoaderToDisappear()

   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
       
    _package.create_ContractfromPackage(CONTAINERS_BUSINESS_PARTNER.BP1);
  });
});
