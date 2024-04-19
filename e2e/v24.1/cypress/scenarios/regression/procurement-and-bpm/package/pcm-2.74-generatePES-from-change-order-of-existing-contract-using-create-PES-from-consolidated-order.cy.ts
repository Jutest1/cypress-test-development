import { _common,  _sidebar,_projectPage,_boqPage,_package,_procurementPage,_saleContractPage,_procurementContractPage,_controllingUnit, _materialPage,_procurementConfig,_rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC1= "BOQSTR-DESC-2" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells,GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let BOQ_PARAMETERS:DataCells,BOQ_STRUCTURE_PARAMETERS:DataCells

let RESOURCE_PARAMETERS1:DataCells
let PROJECTS_PARAMETERS:DataCells,CONTROLLING_UNIT_PARAMETERS:DataCells,BOQ_STRUCTURE_PARAMETERS1:DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_PACKAGE_ITEM;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEMS
let CONTAINERS_RESOURCE,CONTAINER_COLUMNS_BOQS,CONTAINER_COLUMNS_BOQ_STRUCTURE,CONTAINER_COLUMNS_QUOTE
let CONTAINERS_LINE_ITEMS,CONTAINER_COLUMNS_PES,CONTAINERS_MATERIAL_CATALOG_FRAMEWORK,CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_PACKAGE_ITEM,CONTAINER_COLUMNS_CONTRACT_ITEM,CONTAINER_COLUMNS_CONTRACT,CONTAINERS_PES_ITEM
let CONTAINER_COLUMNS_RESOURCE,CONTAINER_COLUMNS_REQUISITION,CONTAINER_COLUMNS_PES_BOQ,CONTAINER_COLUMNS_PES_ITEM
let CONTAINERS_CONTROLLING_UNIT,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINER_COLUMNS_PACKAGE,CONTAINERS_CONTRACT

const CHNAGE_DESC = "CHANGEDESC-" + Cypress._.random(0, 999);

const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.74 | Generate a PES from a change order of an existing approved contract, using selection 'Create new PES from consolidated order'");

describe("PCM- 2.74 | Generate a PES from a change order of an existing approved contract, using selection 'Create new PES from consolidated order'", () => {
      before(function () {
        cy.fixture('pcm/pcm-2.74-generate-a-PES-from-a-change-order-of-an-existing-approved-contract-using-selection-create-new-PES-from-consolidated-order.json').then((data) => {
                 this.data = data;

                 CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                 CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                  CONTAINERS_PACKAGE_ITEM = this.data.CONTAINERS.PACKAGE_ITEM;
                  CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS
                 CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                
                 CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                 CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                 CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
                 CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
                 CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                 
                 CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
                 CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
                 CONTAINER_COLUMNS_PES_BOQ=this.data.CONTAINER_COLUMNS.PES_BOQ
                 
                 CONTAINER_COLUMNS_PES=this.data.CONTAINER_COLUMNS.PES
                  CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
                  CONTAINER_COLUMNS_CONTRACT_ITEM=this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
                  CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
                  CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
                  CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                  CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                  CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                  CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
                  CONTAINERS_MATERIAL_CATALOG_FRAMEWORK=this.data.CONTAINERS.MATERIAL_CATALOG_FRAMEWORK
                 
        
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
                 
                 RESOURCE_PARAMETERS = {
                     [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                     [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE1,
                    
                   }
                   RESOURCE_PARAMETERS1 = {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE2,
                   
                  }
               
                   CONTROLLING_UNIT_PARAMETERS = {
                       [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                       [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                       [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
                   };


                   GENERATE_LINE_ITEMS_PARAMETERS = {
                    [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
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
                  [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC1,
                  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
                  [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                  [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
              }
                });
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
  });
  after(() => {
		cy.LOGOUT();
	});
  it("TC - Create new controlling unit", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

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


    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
      
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE( )
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,COUNTUNIT)
        _common.waitForLoaderToDisappear()
  });

  it('TC - Create new BoQ header and BoQ structure', function () {


    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()

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
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL)

  });


  it('TC - Create new estimate header', function () {
   cy.GO_TO_HOME_PAGE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    cy.wait(3000) //required wait to load page
    
  });


  it('TC - Generate line item and assign resource to it', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
  });
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
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
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
  _common.create_newRecord(cnt.uuid.RESOURCES);
  _common.waitForLoaderToDisappear()
  _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
  _common.waitForLoaderToDisappear()
  cy.SAVE();
 _common.waitForLoaderToDisappear()

  });


  it("TC - Create boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard("LineItemWithResource",  commonLocators.CommonLabels.ENTIRE_ESTIMATE,commonLocators.CommonKeys.PROJECT_BOQ, "D","","","BoQ Quantity",PROJECT_NO)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()
  _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PACKAGE).then(function () {
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.select_rowInContainer(cnt.uuid.PACKAGE)
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.CODE,"Package_Code")
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.waitForLoaderToDisappear()


    _common.openTab(app.TabBar.BOQBASED).then(function () {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
     
    })
    _common.waitForLoaderToDisappear()
    
    _common.openTab(app.TabBar.BOQBASED).then(function () {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _package.getVerify_BoQDetails_With_BoQStructure(cnt.uuid.BOQ_STRUCTURE)
  
    
  })

  it('TC - Create requisistion by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create request for quote by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait
    _rfqPage.createRequestForCode_fromWizard(commonLocators.CommonLabels.BUSINESS_PARTNER,CONTAINERS_CONTRACT.BP1, "")
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
  });

  it('TC - Create Quote by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _rfqPage.create_quote_fromWizard([CONTAINERS_CONTRACT.BP1], [commonLocators.CommonKeys.CHECK])
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    cy.wait(3000)
   
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()

    
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
    })
      cy.wait(2000)
      cy.REFRESH_CONTAINER()
      _package.getVerify_BoQDetails_With_BoQStructure(cnt.uuid.QUOTEBOQSTRUCTURE)
      _common.clickOn_cellHasIcon(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
      _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE,  app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT.PRICE1)
      cy.SAVE()
      cy.wait(2000)
      _common.openTab(app.TabBar.QUOTES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
        _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
      _common.getTextfromCell(cnt.uuid.QUOTES, app.GridCells.VALUE_NET)
  });

  it('TC - Create contract by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
   
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    cy.wait(3000)//required wait
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
     
     })
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.getTextfromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE)
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, COUNTUNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "HS")
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()

    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "HS")
    cy.SAVE()
  });



  it('TC - Create PES by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    _common.waitForLoaderToDisappear()
    cy.wait(3000)//required wait

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1);
      
    })
    _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
    _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PESBOQ).then(() => {
     
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ)
    })
    _common.clickOn_cellHasIcon(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT.PES_QUANTITY)
    cy.SAVE()
  });

  it('TC - Go to estimate and create new line Item and assign BoQ Reference,project change and assigned resource to line item', function () {
    cy.GO_TO_HOME_PAGE()
    cy.wait(2000)
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
  });
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.BOQS);
  _common.maximizeContainer(cnt.uuid.BOQS)
  _common.search_inSubContainer(cnt.uuid.BOQS,BOQ_DESC);
 
  _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
    _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
    _common.waitForLoaderToDisappear()
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
});
_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS1);
cy.SAVE()
cy.wait(2000) //required wait to load page

_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
_common.waitForLoaderToDisappear()

_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
_common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    cy.wait(3000).then(() => {
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
    })
   
  _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEMS)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
     cy.wait(1000) //required wait to load page
     _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
     _common.waitForLoaderToDisappear()
     
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQSTRUCT_DESC1)
      _common.waitForLoaderToDisappear()
      cy.wait(2000)//required wait
      _common.waitForLoaderToDisappear()
      cy.wait(2000) //required wait to load page
      _common.lookUpButtonInCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_CHANGE_FK, btn.IconButtons.ICO_INPUT_ADD, 0)
      cy.wait(1000) //required wait to load page
      _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.CHANGE_TYPE,commonLocators.CommonKeys.DESIGN_CHANGE, commonLocators.CommonKeys.LIST)
      _modalView.findModal().findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear().type(CHNAGE_DESC);
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.wait(2000) //required wait to load page
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
     _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQSTRUCT_DESC1)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS1);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
   _common.waitForLoaderToDisappear()
  });

  it("TC - Update boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _package.enterRecord_toCreateBoQPackage_FromWizard("Update Package with only grouping structure", commonLocators.CommonLabels.RADIO_HIGHLETED_LINE_ITEM, commonLocators.CommonKeys.PROJECT_BOQ, "", "", "Update to Existed Package","")
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait

   
  })

  it('TC - Create contract change order', function () {
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        
        _saleContractPage.create_ContractChangeOrder_fromWizard(CHNAGE_DESC, commonLocators.CommonKeys.DESIGN_CHANGE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
       
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PURCHASE_ORDERS,"Change Order")
        _common.waitForLoaderToDisappear()
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.getTextfromCell(cnt.uuid.PROCUREMENTCONTRACT, null, app.GridCells.PACKAGE_FK)
      
        cy.REFRESH_SELECTED_ENTITIES()
  })

  it('TC - Verify check con_header.prc_confiruation_fk.prc_configheader-fk.isconsolidatechange, if false create pes directly', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
        _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.SERVICE)
    _common.set_cellCheckboxValue( cnt.uuid.CONFIGURATION_HEADER, app.GridCells.IS_CONSOLIDATE_CHANGE,commonLocators.CommonKeys.UNCHECK)
    cy.SAVE()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()

    _common.waitForLoaderToDisappear()

   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);

    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PURCHASE_ORDERS,commonLocators.CommonKeys.CHANGE_ORDER)
    _common.waitForLoaderToDisappear()
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _validate.validate_Text_message_In_PopUp("Create PES(s) successfully!")
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.CLOSE)
   
  });

  it('TC - Verify isconsolidatechange, if true, then popup dailog to select and check contract items found, and consolidated contract QTY,', function () {
    cy.REFRESH_SELECTED_ENTITIES()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
    _common.waitForLoaderToDisappear()

    _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.SERVICE)
    _common.set_cellCheckboxValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.IS_CONSOLIDATE_CHANGE,commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    cy.wait(2000)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    cy.wait(5000)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.CONTRACT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);

  })
  _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
  _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PURCHASE_ORDERS,commonLocators.CommonKeys.PURCHASE_ORDER)
  _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    _common.waitForLoaderToDisappear()
    _procurementContractPage.enterRecord_toCreatePESAlreadyExisted(commonLocators.CommonKeys.INCLUDE_NON_CONTRACTED_ITEM_IN_PREVIOUS_PES,commonLocators.CommonKeys.CHECK,btn.ButtonText.YES)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
  
    _common.waitForLoaderToDisappear()
  })


  it('TC - Verify select create new pes+ from variance,It will create a new pes and only quantity had change item will be created to pes;', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 2);
     
    })
    _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
    _common.select_rowInSubContainer(cnt.uuid.PES_ITEMS)

    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC1)
    _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL)
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC1)
  
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT.PES_UPDATED_QUANITY)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC1)
    _common.waitForLoaderToDisappear()
    _common.getTextfromCell(cnt.uuid.PES_BOQS_STRUCTURE, null, null, app.GridCells.REM_QUANTITY)
  })


  it('TC - Verify after create pes, the pes_item. delivered quantity and delivered total and remain quantity should be calculated', function () {
    _common.openTab(app.TabBar.PESBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE, CONTAINER_COLUMNS_PES_BOQ)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQSTRUCT_DESC1)
    _common.waitForLoaderToDisappear()
      _validate.verify_SubtractionOfTwoFieldsWith_ThirdFieldInActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,  app.GridCells.ORD_QUANTITY_SMALL, app.GridCells.QUANTITY_SMALL,Cypress.env("gridcell_3_Text"))
   
  })


  it('TC - Verify PES other relate fileds should get value from selected contract;', function () {
    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADERS,app.FooterTab.HEADERS,0)
       _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
      })
      _common.maximizeContainer(cnt.uuid.HEADERS)
      _common.assert_cellDataByContent_inContainer(cnt.uuid.HEADERS, app.GridCells.PACKAGE_FK, Cypress.env("gridcell_2_Text"))
  });


  it('TC - Verify after create pes, the pes_header_fk should use con_header.con_header_fk, name is use basic contract,', function () {
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS, app.GridCells.CON_HEADER_FK, Cypress.env("Text"))
    })
  })
})
  

