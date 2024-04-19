
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let CONTAINERS_FORMULA;
let CONTAINER_COLUMNS_FORMULA;
let CONTAINERS_QUANTITY_TAKEOFF_RUBRIC;
let CONTAINER_COLUMNS_QUANTITY_TAKEOFF_RUBRIC;
ALLURE.epic("SALES");
ALLURE.feature("Sales-QTO");
ALLURE.story("SAM- 1.60 | Open module + check whether REB formulas available with expected definitions");

describe("SAM - 1.60 | Open module + check whether REB formulas available with expected definitions", () => {

    beforeEach(function () {
    cy.fixture("sam/sam-1.60-open-module-check-whether-reb-formulas-available-with-expected-definitions.json")
      .then((data) => {
        this.data = data;
       });        
    });  
        
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.60-open-module-check-whether-reb-formulas-available-with-expected-definitions.json")
          .then((data) => {
            this.data = data;
            CONTAINERS_FORMULA = this.data.CONTAINERS.FORMULA;
            CONTAINER_COLUMNS_FORMULA = this.data.CONTAINER_COLUMNS.FORMULA
            CONTAINERS_QUANTITY_TAKEOFF_RUBRIC = this.data.CONTAINERS.QUANTITY_TAKEOFF_RUBRIC;
            CONTAINER_COLUMNS_QUANTITY_TAKEOFF_RUBRIC = this.data.CONTAINER_COLUMNS.QUANTITY_TAKEOFF_RUBRIC
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
                [commonLocators.CommonLabels.NAME]:PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]:CLERK_NAME
              }
            const BASIC_INPUTS = this.data.basicInputs;
            /* Open desktop should be called in before block */
            _common.waitForLoaderToDisappear()
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

    after(() => {
    cy.LOGOUT();
    });

    it("TC - Each time all formulas and descriptions should be available in module without any change", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO_FORMULA);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTO_MAIN).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC, app.FooterTab.QUANTITY_TAKEOFF_RUBERIC, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC)
       _common.select_rowInSubContainer(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC)
        _common.openTab(app.TabBar.QTO_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.FORMULA, app.FooterTab.Formula, 0);
            _common.setup_gridLayout(cnt.uuid.FORMULA, CONTAINER_COLUMNS_FORMULA)
            _common.clear_subContainerFilter(cnt.uuid.FORMULA)
          });
        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA1)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA1)

        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.waitForLoaderToDisappear()

        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA2)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA2)

        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.waitForLoaderToDisappear()

        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA3)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA3)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA3)

        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.waitForLoaderToDisappear()

        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA4)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA4)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA4)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QTO_FORMULA);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QTO_MAIN).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC, app.FooterTab.QUANTITY_TAKEOFF_RUBERIC, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC)
        _common.select_rowInSubContainer(cnt.uuid.QUANTITY_TAKEOFF_RUBRIC)
        _common.openTab(app.TabBar.QTO_MAIN).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.FORMULA, app.FooterTab.FORMULA, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA1)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA1)

        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.waitForLoaderToDisappear()

        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA2)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA2)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA3)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA3)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA3)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.FORMULA)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA4)
        _common.select_rowHasValue(cnt.uuid.FORMULA,CONTAINERS_FORMULA.FORMULA4)
        _common.assert_cellData_insideActiveRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,CONTAINERS_FORMULA.FORMULA4)
    })
      
   
    
});