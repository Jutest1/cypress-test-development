import { _common, _projectPage, _bidPage, _saleContractPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _validate } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_DATA_RECORDS
let CONTAINER_COLUMNS_DATA_TYPES

const BOQ1_QTY_ENV = "BOQ1_QTY_ENV-" + Cypress._.random(0, 999);
const BOQ1_UR_ENV = "BOQ1_UR_ENV-" + Cypress._.random(0, 999);
const BOQ1_FP_ENV = "BOQ1_FP_ENV-" + Cypress._.random(0, 999);
const BOQ1_UOM_ENV = "BOQ1_UOM_ENV-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1 = "BOQ1-STR-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2 = "BOQ2-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS_1:DataCells
let BOQ_STRUCTURE_PARAMETERS_2:DataCells
let CONTAINERS_BOQ_STRUCTURE

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM


let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let UPDATE_ESTIMATE_PARAMETER:DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD;

const PROJECT_NO="30" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 1.11 | Add new estimate line item respective to new item which are added to package AFTER generating BOQ package from estimate");
describe("PCM- 1.11 | Add new estimate line item respective to new item which are added to package AFTER generating BOQ package from estimate", () => {
   
  before(function () {
    cy.fixture("pcm/pcm-1.11-add-new-estimate-line-item-respective-to-new-item-which-are-added-to-package-after-generating-boq-package-from-estimate.json")
      .then((data) => {
        this.data = data;
        CONTAINER_COLUMNS_DATA_RECORDS=this.data.CONTAINER_COLUMNS.DATA_RECORDS
        CONTAINER_COLUMNS_DATA_TYPES=this.data.CONTAINER_COLUMNS.DATA_TYPES

        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
        BOQ_PARAMETERS={
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
        }

        CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        BOQ_STRUCTURE_PARAMETERS_1={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_1,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
          [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
        }
        BOQ_STRUCTURE_PARAMETERS_2={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_2,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
          [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
        }

        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
        }

        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
        GENERATE_LINE_ITEMS_PARAMETERS={
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC                
        }

        CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
        CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
        }

        MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE

        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

        MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD

        UPDATE_ESTIMATE_PARAMETER={
          [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ESTIMATE_WIZARD
        }

        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
        }
      })
      .then(()=>{
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
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
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
      })
    });

    after(() => {
      cy.LOGOUT();
    });     

    it("TC - Customizing setting", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPES)
      })
      _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.PACKAGE_STATUS)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.PROGRESS)
  
      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORDS)
      })
      _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.RECORDED)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.RECORDED)
      _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ESTIMATE,commonLocators.CommonKeys.CHECK)
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
      })
      _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.PROGRESS)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.PROGRESS)
      _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ESTIMATE,commonLocators.CommonKeys.CHECK)  
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    })
  
    it("TC - Create BOQ header and BOQ structure", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BOQS).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
      _common.waitForLoaderToDisappear()
  
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
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.BOQS)
      _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
      });
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_1);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
    });
  
    it('TC - Create new estimate record', function () {
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    });
  
    it("TC - Generate boq line item and add resource to it", function () {
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.costtotal],cnt.uuid.ESTIMATE_LINEITEMS)
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
      _common.waitForLoaderToDisappear()
      _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
  
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_1)
  
  
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      cy.SAVE();
    });

    it("TC - Create BoQ package from the estimate", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
      _common.waitForLoaderToDisappear()
      _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
      _common.waitForLoaderToDisappear()
        cy.wait(2000) // This wait required as UI takes time to load
    })

    it("TC - Update Estimate", function () {  
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.setDefaultView(app.TabBar.PACKAGE)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
        _common.waitForLoaderToDisappear()
      })
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BOQDETAILS).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BOQDETAILS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk,CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice],cnt.uuid.BOQ_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
        _common.waitForLoaderToDisappear()
      });

      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      })
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))

      _common.openTab(app.TabBar.BOQDETAILS).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_BOQS,app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC)

      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BOQDETAILS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      });
      _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURE,BOQ_STRUCTURE_PARAMETERS_2);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,BOQ_STRUCTURE_DESC_2)
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE,app.GridCells.QUANTITY_SMALL,BOQ1_QTY_ENV)
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL,BOQ1_UR_ENV)
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE,app.GridCells.FINAL_PRICE_SMALL,BOQ1_FP_ENV)
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BAS_UOM_FK,BOQ1_UOM_ENV)

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_ESTIMATE);
      _common.waitForLoaderToDisappear()
      _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER)
      _common.waitForLoaderToDisappear()
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      _common.waitForLoaderToDisappear()
    })

    it("TC - Verify New estimate line item generated in a selected estimate, having respective quantity and cost/unit", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
      _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE,2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_2)
        _common.waitForLoaderToDisappear()

        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TOTAL,Cypress.env(BOQ1_QTY_ENV))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_UNIT,Cypress.env(BOQ1_UR_ENV))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,Cypress.env(BOQ1_FP_ENV))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BAS_UOM_FK,Cypress.env(BOQ1_UOM_ENV))
    })
});
