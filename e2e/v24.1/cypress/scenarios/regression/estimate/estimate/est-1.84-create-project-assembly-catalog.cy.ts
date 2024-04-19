import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _mainView, _modalView, _sidebar, _validate } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();
const SHORT_KEY = generateRandomAlphabet(2)
const ASSEMBLY_DESC = "DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES

function generateRandomAlphabet(length) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    result += alphabet[randomIndex];
  }
  return result;
}

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.84 | Create Project Assembly Catalog");

describe("EST- 1.84 | Create Project Assembly Catalog", () => {

  before(function () {
    cy.fixture("estimate/est-1.84-create-project-assembly-catalog.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES

      cy.preLoading(
        Cypress.env("adminUserName1"),
        Cypress.env("adminPassword2"),
        Cypress.env("parentCompanyName"),
        Cypress.env("childCompanyName")
      );
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);

      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
      _common.waitForLoaderToDisappear()
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create configuration for Estimate Assembly Type ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
    cy.wait(2000)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
      _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
      _common.search_inSubContainer(cnt.uuid.DATA_TYPES, commonLocators.CommonKeys.EST_ASSEMBLY_TYPE)
      _common.create_newRecord(cnt.uuid.DATA_RECORDS)
      _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.ASSEMBLY_TYPE_LOGIC_FK, commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.CREW_ASSEMBLY)
      _common.edit_containerCell(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLY_DESC)
      _common.edit_containerCell(cnt.uuid.DATA_RECORDS, app.GridCells.SHORT_KEY_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SHORT_KEY)
      cy.SAVE()
    });
  });

  it("TC - Create and Validate Project assembly catalog ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    cy.wait(2000)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    cy.wait(1000)
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
      _common.setup_gridLayout(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)

      _common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES)
      cy.REFRESH_SELECTED_ENTITIES()
      _common.create_newRecord(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES)
      _common.edit_dropdownCellWithInput(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES, app.GridCells.EST_ASSEMBLY_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, SHORT_KEY)
      _common.enterRecord_inNewRow(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ASSEMBLY_DESC)
      cy.SAVE()
      cy.REFRESH_CONTAINER()
      _common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES, SHORT_KEY)
      cy.wait(1000)
      _common.assert_cellData(cnt.uuid.PROJECT_ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, ASSEMBLY_DESC)
    });
  });
});
