
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage, _billPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const FORMULA_CODE = "" + Cypress._.random(0, 99);
const FORMULA_DESC = "FORMULA_DESC" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells;
let FORMULA_PARAMETERS: DataCells;
let CONTAINERS_FORMULA;
let CONTAINER_COLUMNS_FORMULA;

ALLURE.epic("SALES");
ALLURE.feature("Sales-Bill");
ALLURE.story("SAM- 1.61 | Create New Formula")

describe("SAM- 1.61 | Create New Formula", () => {

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.61-create-new-formula.json").then((data) => {
      this.data = data;
      CONTAINERS_FORMULA = this.data.CONTAINERS.FORMULA;
      CONTAINER_COLUMNS_FORMULA = this.data.CONTAINER_COLUMNS.FORMULA

       FORMULA_PARAMETERS = {
        [app.GridCells.CODE]: FORMULA_CODE,
        [app.GridCells.DESCRIPTION_INFO]: FORMULA_DESC,
        [app.GridCells.QTO_FORMULA_TYPE_FK]: CONTAINERS_FORMULA.Predefine,
        [app.GridCells.ICON]: CommonLocators.CommonElements.ICON,
        [app.GridCells.VALUE_1_IS_ACTIVE]: commonLocators.CommonKeys.CHECK,
        [app.GridCells.OPERATOR_1]: CONTAINERS_FORMULA.operator1,
        [app.GridCells.VALUE_2_IS_ACTIVE]:commonLocators.CommonKeys.CHECK,
        [app.GridCells.OPERATOR_2]: CONTAINERS_FORMULA.operator2,
  
      }
      PROJECTS_PARAMETERS={
        [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
        [commonLocators.CommonLabels.NAME]:PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]:CLERK_NAME
      }
     
    }).then(()=>{
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
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO).pinnedItem(); 
    })
  });

  it("TC - Create New Formula", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO_FORMULA);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.QTO_MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.FORMULA, app.FooterTab.Formula, 0);
      _common.setup_gridLayout(cnt.uuid.FORMULA, CONTAINER_COLUMNS_FORMULA)
    });
    _common.clear_subContainerFilter(cnt.uuid.FORMULA);
    _common.maximizeContainer(cnt.uuid.FORMULA)
    _common.create_newRecord(cnt.uuid.FORMULA);
    _salesPage.enterRecord_toCreateFormula(FORMULA_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  });

  it("TC - Verify Created Formula", function () {
    _common.openTab(app.TabBar.QTO_MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.FORMULA, app.FooterTab.Formula, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.FORMULA);
    _common.search_inSubContainer(cnt.uuid.FORMULA, FORMULA_CODE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA, app.GridCells.CODE, FORMULA_CODE)
    _common.minimizeContainer(cnt.uuid.FORMULA)
  });

  after(() => {
    cy.LOGOUT();
  });
});








