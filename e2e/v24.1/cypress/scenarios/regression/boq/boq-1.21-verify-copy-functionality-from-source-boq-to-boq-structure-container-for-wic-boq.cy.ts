import { tile, app, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wicpage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_HEADER, BOQ_ROOT_ITEM } from "cypress/pages/variables";

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC2 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC3 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const WIC_BOQ_STRUCT_DESC = "WIC_BOQSTR-DESC-" + Cypress._.random(0, 999);
const WIC_BOQ_STRUCT_DESC2 = "WIC_BOQSTR-DESC-" + Cypress._.random(0, 999);
const WIC_BOQ_STRUCT_DESC3 = "WIC_BOQSTR-DESC-" + Cypress._.random(0, 999);


const WIC_GROUP_CODE = "WIC-" + Cypress._.random(0, 999)
const WIC_GROUP_DESC = "WIC-DESC" + Cypress._.random(0, 999)
const WIC_CATALOG_SPEC = "WIC_CATA-" + Cypress._.random(0, 999)


const ALLURE = Cypress.Allure.reporter.getInterface();


let CONTAINER_COLUMNS_WIC_GROUP
let CONTAINER_COLUMNS_WIC_CATALOG
let CONTAINER_WIC_BOQ
let CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE
let WIC_CATALOG_PARAMETER: DataCells
let WIC_BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_WIC_BOQ_STRUCTURE;

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let SOURCE_BOQ_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SOURCE_BOQ;
let CONTAINERS_SOURCE_BOQ;



ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 1.21 | Verify Copy functionality from 'Source BoQ' to 'BoQ Structure' container for WIC BoQ");

describe("BOQ- 1.21 | Verify Copy functionality from 'Source BoQ' to 'BoQ Structure' container for WIC BoQ", () => {
  before(function () {
    cy.fixture("boq/boq-1.21-verify-copy-functionality-from-source-boq-to-boq-structure-container-for-wic-boq.json").then((data) => {
      this.data = data;
     
      CONTAINER_COLUMNS_WIC_GROUP = this.data.CONTAINER_COLUMNS.WIC_GROUP
      CONTAINER_COLUMNS_WIC_CATALOG = this.data.CONTAINER_COLUMNS.WIC_CATALOG
      CONTAINER_WIC_BOQ = this.data.CONTAINERS.WIC_BOQ_STRUCTURE
      CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIC_BOQ_STRUCTURE
      WIC_CATALOG_PARAMETER = {
        [app.GridCells.BRIEF_INFO_SMALL]: WIC_CATALOG_SPEC
      },
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
     
      BOQS_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      };
      BOQS_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      };
      CONTAINERS_WIC_BOQ_STRUCTURE = this.data.CONTAINERS.WIC_BOQ_STRUCTURE
      WIC_BOQS_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: WIC_BOQ_STRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_WIC_BOQ_STRUCTURE.QUANTITY[0],
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_WIC_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_WIC_BOQ_STRUCTURE.UOM
      };
      CONTAINER_COLUMNS_SOURCE_BOQ= this.data.CONTAINER_COLUMNS.SOURCE_BOQ
      CONTAINERS_SOURCE_BOQ = this.data.CONTAINERS.SOURCE_BOQ
      SOURCE_BOQ_PARAMETERS = {
        [commonLocators.CommonLabels.COPY_FROM]: CONTAINERS_SOURCE_BOQ.WIC_BOQ,
        [commonLocators.CommonLabels.WIC_GROUP]:WIC_GROUP_CODE,
        [commonLocators.CommonLabels.BOQ_SELECTION]: CONTAINERS_SOURCE_BOQ.BOQ_SELECTION
      }
    })
     cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
     _common.openDesktopTile(tile.DesktopTiles.PROJECT);
     _common.waitForLoaderToDisappear()
     _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
     });
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
     _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });    
    it("TC - Create new BoQ header", function () {        
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS)
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC, BOQ_ROOT_ITEM)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
   });
    it("TC - Create BoQ Structure", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
        cy.SAVE();        
        _boqPage.click_OnSubDivision(cnt.uuid.BOQ_STRUCTURES,CONTAINERS_BOQ_STRUCTURE.LEVEL1)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION,BOQ_STRUCT_DESC2);
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES);        
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION,BOQ_STRUCT_DESC3);
        cy.SAVE()        
    })
    it("TC - Create WIC Group and Catalogue", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC)
        _common.openTab(app.TabBar.WIC).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0);
            _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUP)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS)
        _common.create_newRecord(cnt.uuid.WIC_GROUPS, 0)
        _wicpage.enterRecord_toCreateWICGroup(WIC_GROUP_CODE, WIC_GROUP_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WIC_CATALOGS, 1)
        _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOG)
        _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES)

        _common.create_newRecord(cnt.uuid.WIC_CATALOGUES, 1)
        _wicpage.enterRecord_toCreateWICCatalogs(cnt.uuid.WIC_CATALOGUES, WIC_CATALOG_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.goToButton_inActiveRow(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE, btn.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_WIC_BOQ_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, WIC_BOQS_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _boqPage.click_OnSubDivision(cnt.uuid.BOQ_STRUCTURES,CONTAINERS_BOQ_STRUCTURE.LEVEL1)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION,WIC_BOQ_STRUCT_DESC2);
        _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES);
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION,WIC_BOQ_STRUCT_DESC3);
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WIC_BOQ_STRUCTURE.QUANTITY[1]);
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIC_BOQ_STRUCTURE.UNIT_RATE[1]);
        cy.SAVE()  
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL,CONTAINERS_WIC_BOQ_STRUCTURE.ENV_FINAL)
    })
    it("TC - Copy from Source BoQ to BoQ structure", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.search_inSubContainer(cnt.uuid.BOQS,BOQ_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2); 
            _common.setup_gridLayout(cnt.uuid.BOQSOURCE,CONTAINER_COLUMNS_SOURCE_BOQ)           
        });
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // Wait is required to load data into container.
        _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
        _boqPage.selectRecord_forSourceBoQ(cnt.uuid.BOQSOURCE,SOURCE_BOQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQSOURCE,WIC_BOQ_STRUCT_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.BOQSOURCE,btn.ToolBar.ICO_COPY)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);            
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_PASTE)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,WIC_BOQ_STRUCT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,WIC_BOQ_STRUCT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL,CONTAINERS_WIC_BOQ_STRUCTURE.QUANTITY[0])
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2); 
        })
        _common.select_rowHasValue(cnt.uuid.BOQSOURCE,WIC_BOQ_STRUCT_DESC2)
        _common.clickOn_toolbarButton(cnt.uuid.BOQSOURCE,btn.ToolBar.ICO_COPY)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);            
        });
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCT_DESC2)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_PASTE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,WIC_BOQ_STRUCT_DESC2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,WIC_BOQ_STRUCT_DESC2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL,Cypress.env(CONTAINERS_WIC_BOQ_STRUCTURE.ENV_FINAL))
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,WIC_BOQ_STRUCT_DESC3)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,WIC_BOQ_STRUCT_DESC3)
    })
    after(() => {
      cy.LOGOUT();
    });
})
    