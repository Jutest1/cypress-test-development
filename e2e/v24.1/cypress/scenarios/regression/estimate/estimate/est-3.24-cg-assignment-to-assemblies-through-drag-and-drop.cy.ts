import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _schedulePage } from "cypress/pages";
import { cnt, tile, app, commonLocators,btn,sidebar } from "cypress/locators";

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_ASSEMBLIES;
let CONTAINER_COLUMNS_ASSEMBLIES_COST_GROUP;
let CONTAINERS_ASSEMBLIES_COST_GROUP;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.24 | CG Assignment to Assemblies through drag + drop");
describe("EST- 3.24 | CG Assignment to Assemblies through drag + drop", () => {
  before(function () {
    cy.fixture("estimate/est-3.24-cg-assignment-to-assemblies-through-drag-and-drop.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
      CONTAINER_COLUMNS_ASSEMBLIES_COST_GROUP = this.data.CONTAINER_COLUMNS.ASSEMBLIES_COST_GROUP
      CONTAINERS_ASSEMBLIES_COST_GROUP = this.data.CONTAINERS.ASSEMBLIES_COST_GROUP;
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
  it("TC - Select all assembly records and Assign Selected CG to Assembly records using Drag and Drop.", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.ASSEMBLIES); 
     _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES_COSTGROUP, app.FooterTab.COST_GROUP, 2);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLIES_COSTGROUP,CONTAINER_COLUMNS_ASSEMBLIES_COST_GROUP)
    });
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _estimatePage.selectdata_fromCostGroupContainer(cnt.uuid.ASSEMBLIES_COSTGROUP,CONTAINERS_ASSEMBLIES_COST_GROUP.CATALOG_NUMBER);
    _common.clickOn_toolbarButton(cnt.uuid.ASSEMBLIES_COSTGROUP,btn.ToolBar.ICO_TREE_EXPAND_ALL);
    _estimatePage.dragDrop_CGToAssemblies(CONTAINERS_ASSEMBLIES_COST_GROUP.CODE);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
  });
  it("TC -  Verify CG gets Assigned to the Assemblies in Assemblies container.", function () {
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
    _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,CONTAINER_COLUMNS_ASSEMBLIES)
    });
    _common.assert_cellData(cnt.uuid.ASSEMBLIES, app.GridCells.COST_GROUP_LIC_DIN276_2018_12,CONTAINERS_ASSEMBLIES_COST_GROUP.CODE);
  });
});
