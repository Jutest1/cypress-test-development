import { _common, _projectPage, _sidebar,_bidPage, _saleContractPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _validate, _rfqPage, _controllingUnit, _procurementPage } from "cypress/pages";
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER,BOQ_ROOT_ITEM,PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

const PROJECT_NO = "PR-N1" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells
let RESOURCE_PARAMETERS: DataCells,GENERATE_LINE_ITEMS_PARAMETERS:DataCells,RESOURCE_PARAMETERS1:DataCells
let PROJECTS_PARAMETERS:DataCells,BOQ_PARAMETERS:DataCells,BOQ_STRUCTURE_PARAMETERS:DataCells,BOQ_STRUCTURE_PARAMETERS2:DataCells


let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_PACKAGE


let CONTAINERS_RESOURCE;


let CONTAINER_COLUMNS_RESOURCE,CONTAINER_COLUMNS_REQUISITION,CONTAINER_COLUMNS_REQUISITION_TOTALS
let CONTAINER_COLUMNS_TOTALS,CONTAINER_COLUMNS_BOQS
let CONTAINER_COLUMNS_PACKAGE,CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT,
CONTAINERS_CONTROLLING_UNIT,CONTAINERS_BOQ_STRUCTURE,CONTAINER_PACKAGE,CONTAINER_COLUMNS_BOQ_STRUCTURE

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC2 = "BOQSTR-DESC-" + Cypress._.random(0, 999);

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.33 | Creation of one RFQ from multiple requisition by manually adding requisition add new record in RFQ module");

describe("PCM- 2.33 | Creation of one RFQ from multiple requisition by manually adding requisition add new record in RFQ module", () => {
      before(function () {
        cy.fixture('pcm/pcm-2.33-Creation-of-one-RFQ-from-multiple-requisition-by-manually-adding-requisition-add-new-record-in-RFQ-module.json').then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
           
            
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
            
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
          
           
           
            CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM_ASSIGNMENT
           
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
           
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_REQUISITION_TOTALS=this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION

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
            BOQ_STRUCTURE_PARAMETERS2 = {
              [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
              [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC2,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
              [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
          }
             
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE
              }

              RESOURCE_PARAMETERS1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE1
              }
              
             

              GENERATE_LINE_ITEMS_PARAMETERS = {
                [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
             
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
  })
  after(() => {
		cy.LOGOUT();
	});
  
  it("TC - Set requisition status under customizing", function () {
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



   

   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);

    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
       
    })
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,"Requisition Status")
    cy.REFRESH_CONTAINER()
    cy.wait(2000)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,"Requisition Status")
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
      
    })
    _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.APPROVED)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.APPROVED)
    _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_PUBLISHED,commonLocators.CommonKeys.UNCHECK)
    _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_ORDERED,commonLocators.CommonKeys.UNCHECK)
    _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_QUOTED,commonLocators.CommonKeys.UNCHECK)
    cy.SAVE()
  });

  it("TC - Create BOQ header & BOQ Structure in first Project", function () {
      

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);

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
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        cy.wait(3000) //required wait to load page
        cy.SAVE()

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(2000)// REQUIRED WAIT TO PASS THE TEST
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        cy.wait(1000) //required wait to load page
  })

  it("TC - Create BOQ Package using wizard Create/Update BoQ Package and change package status", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait to load page

    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(commonLocators.CommonKeys.PROJECT_BOQ, CONTAINERS_PACKAGE.ESTIMATE_SCOPE, 0,commonLocators.CommonKeys.PROJECT_BOQ, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE,"BoQ Quantity (WQ/AQ)")
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait to load page
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(function () {
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE,0)
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("PACKAGE_CODE", $ele1.text())
    }) 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    cy.wait(2000) //required wait to load page
  });

  it("TC - Create requisition and change requisition status", function () {
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
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


    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);

    _common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("Requisition_1", $ele1.text())
    }) 
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTAL, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS,CONTAINER_COLUMNS_REQUISITION_TOTALS )
    });
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.REQUISITION_TOTALS).findGrid().findCellhasValue(app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION).click()
    _common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("Requisition_1NeTvalue", $ele1.text())
    })
      
      
  });


  it("TC - Create new BOQ structure and generate new line for same estimate", function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    _common.waitForLoaderToDisappear()
   
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.search_inSubContainer(cnt.uuid.BOQS,BOQ_DESC)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQS,app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC,BOQ_ROOT_ITEM)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });


    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS2);
    cy.SAVE();
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });

     
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION,EST_HEADER)
      cy.SAVE();
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
      cy.REFRESH_CONTAINER()
      _common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
       
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
      cy.wait(1000) //required wait to load page
      _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
      cy.SAVE();
      cy.wait(2000)
      cy.REFRESH_CONTAINER()

});

  it("TC - Add resource code, updated existing BoQ package and create new requisition", function () {
   

    _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(2000)// REQUIRED WAIT TO PASS THE TEST
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQSTRUCT_DESC2)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS1);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        cy.wait(1000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    })
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,"M0")

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
      _common.setup_gridLayout(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT)
    });
    _common.maximizeContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
    _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT);
    _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.PRC_PACKAGE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("PACKAGE_CODE"))
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.UPDATE_BOQ_PACKAGES)
    cy.wait(1000) //required wait to load page
    
    _package.update_BoQPackages(commonLocators.CommonLabels.ENTIRE_ESTIMATE,2,commonLocators.CommonKeys.PROJECT_BOQ,"Quantity Total (Estimate Line Item)")

    cy.wait(2000)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
      
    });
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    cy.wait(5000)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.waitForLoaderToDisappear()
    
     _modalView.findModal().findRadio_byLabel_InModal("Create new requisition","radio",0,"radio spaceToUp").click()
     _common.waitForLoaderToDisappear()
     _common.clickOn_modalFooterButton(btn.ButtonText.OK)
     _common.waitForLoaderToDisappear()
     _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
      cy.wait(1000) //required wait to load page

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONS,"Date Received")
      _common.waitForLoaderToDisappear()
      _common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("Requisition_2", $ele1.text())
    }) 

      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTAL, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS)
      });
      _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.REQUISITION_TOTALS).findGrid().findCellhasValue(app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION).click()
      _common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("Requisition_2NeTvalue", $ele1.text())
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
    cy.wait(1000) //required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTAL, 2);
       
      });

  });

  it("TC - Create RFQ , add requisition and change RFQ status", function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2);
    
    });
    _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITION, 2);
    
    });
  
    _common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_IN_RFQ,app.GridCells.REQ_HEADER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("Requisition_1"))
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_IN_RFQ,app.GridCells.REQ_HEADER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("Requisition_2"))
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS)
    cy.wait(1000) //required wait to load page
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
    _common.openTab(app.TabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTAL, 2);
    
    });
    _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.RFQ_TOTALS,Cypress.env("Requisition_1NeTvalue"),Cypress.env("Requisition_2NeTvalue"),app.GridCells.VALUE_NET)
   

  });
});