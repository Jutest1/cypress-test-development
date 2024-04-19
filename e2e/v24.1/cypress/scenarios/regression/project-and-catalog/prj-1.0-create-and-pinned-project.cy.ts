import { _common, _projectPage } from "cypress/pages";
import { tile, cnt, sidebar, app, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
let PRJ_NO = "PRJ" + Cypress._.random(0, 999);
let PRJ_NAME = "TEST-" + PRJ_NO;
let CLERK_NAME = "HS";
let CREATEPROJECT_PARAMETERS:DataCells;

allure.epic("PROJECT AND CATALOG");
allure.feature("Project");
allure.story("PRJ- 1.0 | Create and search project record");

describe("PRJ- 1.0 | Create and search project record", () => {
  before(() => {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    /* Open desktop should be called in before block */
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    
     CREATEPROJECT_PARAMETERS= {
      [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
      [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
      [ commonLocators.CommonLabels.CLERK] :CLERK_NAME
      
      };
  });

  it("TC - Create new project record", () => {
    _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);

    const data = {
      PROJECT: {
        PRJ_NUMBER: `${PRJ_NO}`,
        PRJ_NAME: `${PRJ_NAME}`,
        CLERK_NAME: `${CLERK_NAME}`,
      },
    };
    cy.writeFile("cypress/test-data/daily-use-data/data.json", JSON.stringify(data)).then(() => {
      cy.log("Data inserted to JSON file successfully...!");
    });
  });

  it("TC - Search project and pinned it", () => {
    let Project_Num;
    cy.readFile("cypress/test-data/daily-use-data/data.json").then((jsonObj) => {
      Project_Num = JSON.stringify(jsonObj.PROJECT.PRJ_NUMBER).replace(/"/g,'')
      cy.log("reading data from JSON file==>", Project_Num);
    });

    cy.wait(50).then(() => {
      cy.log("reading data outside then==>", Project_Num);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Project_Num).pinnedItem();
    });
  });
  after(() => {
    cy.LOGOUT();
  });
});