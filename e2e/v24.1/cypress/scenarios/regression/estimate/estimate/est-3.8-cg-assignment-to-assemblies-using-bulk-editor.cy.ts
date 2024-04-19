import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _validate } from "cypress/pages";
import { cnt, tile, app, commonLocators, sidebar } from "cypress/locators";

const ALLURE = Cypress.Allure.reporter.getInterface();
const CONG_DESC = "CONG-DESC-"+ Cypress._.random(0, 999);

let CONTAINERS_ASSEMBLIES_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLIES_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLIES;
let RULES;


ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.8 | CG assignment to assemblies using bulk editor");
describe("EST- 3.8 | CG assignment to assemblies using bulk editor", () => {
  before(function () {
    cy.fixture("estimate/est-3.8-cg-assignment-to-assemblies-using-bulk-editor.json")
      .then((data) => {
        this.data=data
        CONTAINER_COLUMNS_ASSEMBLIES_CATEGORIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES_CATEGORIES
        CONTAINERS_ASSEMBLIES_CATEGORIES=this.data.CONTAINERS.ASSEMBLIES_CATEGORIES
        CONTAINER_COLUMNS_ASSEMBLIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES
        RULES= this.data.CREATE_NEW_RULE
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
      })
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Select all record and use bulk editor in assemblies container", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.setDefaultView(app.TabBar.ASSEMBLIES,commonLocators.CommonKeys.DEFAULT)
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINER_COLUMNS_ASSEMBLIES_CATEGORIES)
    });
    _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
    _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
    _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINERS_ASSEMBLIES_CATEGORIES.CODE)
    _common.select_rowHasValue(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINERS_ASSEMBLIES_CATEGORIES.CODE)
    _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
    _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
  
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,CONTAINER_COLUMNS_ASSEMBLIES)
    });
    _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
    _common.select_allContainerData(cnt.uuid.ASSEMBLIES);
    _estimatePage.bulkEditor_createNewRule(cnt.uuid.ASSEMBLIES,CONG_DESC,RULES);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()

  });

  it("TC - Verify bulk editor records.", function () {
    _common.select_allContainerData(cnt.uuid.ASSEMBLIES);
    _validate.verify_bulkEditRecords(cnt.uuid.ASSEMBLIES, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, CONTAINERS_ASSEMBLIES_CATEGORIES.COST_GROUP);
  });
});
