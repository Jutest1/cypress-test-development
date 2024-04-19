import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _salesPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const FRM_CODE = "FC-" + Cypress._.random(0, 9999)
const FRM_DESC = "Formula-Des-" + Cypress._.random(0, 9999)

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("SALES");
allure.feature("Sales-QTO");
allure.story("SAM- 1.62 | Assign User Form and save.");
const FORMULA_CODE = "" + Cypress._.random(0, 99);
const FORMULA_DESC = "FORMULA_DESC" + Cypress._.random(0, 999);
let FORMULA_PARAMETERS: DataCells;
let CONTAINERS_FORMULA;
let CONTAINER_COLUMNS_FORMULA;
let CONTAINERS_QUANTITY_TAKEOFF_RUBRIC;
let CONTAINER_COLUMNS_QUANTITY_TAKEOFF_RUBRIC;
describe("SAM- 1.62 | Assign User Form and save.", () => {
    beforeEach(function () {
        cy.fixture("sam/sam-1.62-assign-user-form-and-save.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading("admin8", "Winjit123", Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.62-assign-user-form-and-save.json").then((data) => {
            this.data = data;
          CONTAINERS_FORMULA = this.data.CONTAINERS.FORMULA;
          CONTAINER_COLUMNS_FORMULA = this.data.CONTAINER_COLUMNS.FORMULA
          CONTAINERS_QUANTITY_TAKEOFF_RUBRIC = this.data.CONTAINERS.QUANTITY_TAKEOFF_RUBRIC;
          CONTAINER_COLUMNS_QUANTITY_TAKEOFF_RUBRIC = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_RUBRIC
           FORMULA_PARAMETERS = {
            [app.GridCells.CODE]: FORMULA_CODE,
            [app.GridCells.DESCRIPTION_INFO]: FORMULA_DESC,
            [app.GridCells.QTO_FORMULA_TYPE_FK]: CONTAINERS_FORMULA.Predefine,
            [app.GridCells.ICON]: CommonLocators.CommonElements.ICON,
            [app.GridCells.VALUE_1_IS_ACTIVE]: commonLocators.CommonKeys.CHECK,
            [app.GridCells.OPERATOR_1]: CONTAINERS_FORMULA.operator1,
            [app.GridCells.VALUE_2_IS_ACTIVE]:commonLocators.CommonKeys.CHECK,
            [app.GridCells.OPERATOR_2]: CONTAINERS_FORMULA.operator2,
            [app.GridCells.BAS_FORM_FK]:CONTAINERS_QUANTITY_TAKEOFF_RUBRIC.REB_STANDARD_FORMULA
      
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
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem(); 
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
        _common.minimizeContainer(cnt.uuid.FORMULA)
      });

    it("TC - Verify Form is assigned to the created Record", function () {
        _common.openTab(app.TabBar.QTO_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC, app.FooterTab.QUANTITY_TAKEOFF_RUBERIC, 0);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC, CONTAINER_COLUMNS_QUANTITY_TAKEOFF_RUBRIC)
            _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC)
        });
        _common.openTab(app.TabBar.QTO_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.FORMULA, app.FooterTab.FORMULA, 1);
            _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        });
        _common.search_inSubContainer(cnt.uuid.FORMULA, FORMULA_DESC)
        _common.select_rowHasValue(cnt.uuid.FORMULA, FORMULA_DESC)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.FORMULA, app.GridCells.BAS_FORM_FK, CONTAINERS_QUANTITY_TAKEOFF_RUBRIC.REB_STANDARD_FORMULA)
    })

    after(() => {
        cy.LOGOUT();
    });

});