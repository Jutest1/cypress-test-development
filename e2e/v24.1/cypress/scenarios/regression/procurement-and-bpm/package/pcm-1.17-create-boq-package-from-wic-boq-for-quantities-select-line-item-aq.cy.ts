import { _common, _projectPage, _bidPage, _saleContractPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _validate } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="08" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const WIC_GROUP_CODE = "R_" + Cypress._.random(0, 999)
const WIC_GROUP_DESC = "RWIC-" + Cypress._.random(0, 999)
let CONTAINER_COLUMNS_WIC_GROUPS

const WIC_CATALOG_SPEC = "RBoQ-" + Cypress._.random(0, 999)
let CONTAINER_COLUMNS_WIC_CATALOGUES
let WIC_CATALOGUES_PARAMETERS:DataCells

const BOQ_DESC = "BOQDESC_" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let BOQ_PARAMETERS:DataCells
let CONTAINER_COLUMNS_SOURCE_BOQ

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'ESTDESC_' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 1.17 | Create BOQ package from WIC BOQ - for quantities select Line item AQ");
describe("PCM- 1.17 | Create BOQ package from WIC BOQ - for quantities select Line item AQ", () => {
    
    before(function () {
        cy.fixture("pcm/pcm-1.17-create-boq-package-from-wic-boq-for-quantities-select-line-item-aq.json")
          .then((data) => {
            this.data=data
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINER_COLUMNS_WIC_GROUPS=this.data.CONTAINER_COLUMNS.WIC_GROUPS

            CONTAINER_COLUMNS_WIC_CATALOGUES=this.data.CONTAINER_COLUMNS.WIC_CATALOGUES
            WIC_CATALOGUES_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:WIC_CATALOG_SPEC
            }

            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS={
              [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
              [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
              [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
              [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE  
            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS={
              [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            CONTAINER_COLUMNS_SOURCE_BOQ=this.data.CONTAINER_COLUMNS.SOURCE_BOQ
    
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
    
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS={
              [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
              [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC                
            }
    
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            };

            MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
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

    it("TC - Create a WIC BoQ with BoQ items", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.WIC).then(() => {
          _common.setDefaultView(app.TabBar.WIC,commonLocators.CommonKeys.DEFAULT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0);
          _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUPS)
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS)
      _common.create_newRecord(cnt.uuid.WIC_GROUPS)
      _common.waitForLoaderToDisappear()
      _wicpage.enterRecord_toCreateWICGroup(WIC_GROUP_CODE, WIC_GROUP_DESC)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.WIC).then(() => {
          _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WIC_CATALOGS, 1)
          _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOGUES)
      });
     
      _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES)
      _common.create_newRecord(cnt.uuid.WIC_CATALOGUES)
      _wicpage.enterRecord_toCreateWICCatalogs(cnt.uuid.WIC_CATALOGUES,WIC_CATALOGUES_PARAMETERS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.goToButton_inActiveRow(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE,btn.ToolBar.ICO_GO_TO, BOQ_ROOT_ITEM)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
          _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
          _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk,CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice],cnt.uuid.BOQ_STRUCTURES)
      });
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
    });

    it("TC - Create BOQ header and WIC BOQ structure ", function () {
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
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
        _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCE_BOQ)
      })
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      });
      _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
      _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.ROOT)
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE);
      _common.waitForLoaderToDisappear()
      _boqPage.dragDrop_SourceBoQToBoQStructure(cnt.uuid.BOQSOURCE,cnt.uuid.BOQ_STRUCTURES,commonLocators.CommonKeys.WIC_BOQ,WIC_GROUP_CODE,WIC_CATALOG_SPEC,commonLocators.CommonKeys.LEVEL_1,commonLocators.CommonKeys.ROOT,CONTAINER_COLUMNS_SOURCE_BOQ)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.waitForLoaderToDisappear()
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
      _common.waitForLoaderToDisappear()

      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    });   

    it("TC - Generate boq line item and verify wic boq gets assigned from look-up", function () {
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.costtotal,CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wicboqitemfk,CONTAINER_COLUMNS_LINE_ITEM.wicboqitemfkbrief,CONTAINER_COLUMNS_LINE_ITEM.grandtotal],cnt.uuid.ESTIMATE_LINEITEMS)
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
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
      _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WIC_BOQ_ITEM_FK)
      _common.select_dataFromLookups_fromModal(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WIC_BOQ_ITEM_FK,BOQ_STRUCTURE_DESC,app.InputFields.FORM_CONTROL)
      _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      cy.wait(1000) // Added this for container to save data
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
  
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WIC_BOQ_ITEM_FK_BRIEF,BOQ_STRUCTURE_DESC)
      _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET,  CONTAINERS_BOQ_STRUCTURE.QUANTITY);
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_STRUCTURE_DESC);
    });

    it("TC - Assign resource to generated line item", function () {
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
    
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
      _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"COSTTOTAL")
      _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.GRAND_TOTAL,"GRAND_TOTAL")
      _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,"AQ_QUANTITY")
    });

    it("TC - Create BOQ Package by wizard", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
      _common.waitForLoaderToDisappear()
      _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
      _common.waitForLoaderToDisappear()
      cy.wait(2000) // This wait required as UI takes time to load
    });

    it('TC - Verify The BOQ quantity of created BOQ package is the line item WQ quantity', function () {
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.setDefaultView(app.TabBar.PACKAGE)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
      })
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))
  
      _common.openTab(app.TabBar.BOQDETAILS).then(() => {
        _common.setDefaultView(app.TabBar.BOQDETAILS)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_BOQS,app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC)
  
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BOQDETAILS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURE)
      });
      _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURE)
      _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,BOQ_STRUCTURE_DESC)
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("AQ_QUANTITY"))
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("COSTTOTAL"));

      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 2)
      })
      _common.search_inSubContainer(cnt.uuid.TOTALS,commonLocators.CommonKeys.TOTAL)
      _common.select_rowHasValue(cnt.uuid.TOTALS,commonLocators.CommonKeys.TOTAL)
      _common.assert_cellData_insideActiveRow(cnt.uuid.TOTALS,app.GridCells.VALUE_NET,Cypress.env("GRAND_TOTAL"))
    });
});
