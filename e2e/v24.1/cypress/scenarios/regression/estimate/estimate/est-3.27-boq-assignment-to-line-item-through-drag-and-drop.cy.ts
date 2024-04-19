import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _schedulePage, _boqPage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { cnt, tile, btn,app, commonLocators,sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION2 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION3 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS:DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS1:DataCells;
let LINE_ITEM_PARAMETERS2:DataCells;
let LINE_ITEM_PARAMETERS3:DataCells;
let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_LINE_ITEM_BOQ;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.27 | BoQ Assignment to line items through drag + drop");
describe("EST- 3.27 | BoQ Assignment to line items through drag + drop", () => {
  before(function () {
    cy.fixture("estimate/est-3.27-boq-assignment-to-line-item-through-drag-and-drop.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_LINE_ITEM_BOQ= this.data.CONTAINER_COLUMNS.LINE_ITEM_BOQ
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
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS1 = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
            LINE_ITEM_PARAMETERS2 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION2,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
             LINE_ITEM_PARAMETERS3 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION3,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
  }).then(()=>{
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.setDefaultView(app.TabBar.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();    
  })
})
  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create BOQ record and BOQ structure", function () {
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
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  })
  it("TC - Create new line items record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT); 
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
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS1);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS2);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS3);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
  });
  it("TC - Search and Select BOQ item from BoQs container and Assign it to Line Item through Drag and Drop.", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_BOQS,app.FooterTab.BOQs);
      _common.waitForLoaderToDisappear()
       _common.setup_gridLayout(cnt.uuid.ESTIMATE_BOQS,CONTAINER_COLUMNS_LINE_ITEM_BOQ)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_BOQS)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_BOQS,BOQ_STRUCT_DESC)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_BOQS,BOQ_STRUCT_DESC);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_BOQS, app.GridCells.BRIEF_INFO_SMALL ,BOQ_STRUCT_DESC)
    _estimatePage.dragDrop_BoQiteminLineitem(BOQ_STRUCT_DESC);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
  });

  it("TC - Verify BOQ item gets Assigned to the Line Item in Line Items container.", function () {
   _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ITEM_FK_BRIEF,BOQ_STRUCT_DESC);
  });
});
