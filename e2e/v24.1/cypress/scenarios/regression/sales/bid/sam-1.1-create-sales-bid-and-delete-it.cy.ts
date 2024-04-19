import { _common, _estimatePage, _mainView, _modalView, _sidebar, _validate, _salesPage } from "cypress/pages";
import { tile, cnt, app, sidebar, commonLocators, btn } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
const allure = Cypress.Allure.reporter.getInterface();
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.1 | Create Sales Bid and delete it");

const BID_DESCRIPTION = "BID-DESC-"+ Cypress._.random(0, 999);

let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;


describe("SAM- 1.1 | Create Sales Bid and delete it", () => {
  before(function () {
    cy.fixture("sam/sam-1.1-create-sales-bid-and-delete-it.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESCRIPTION      
      }
    });
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    /* Open desktop should be called in before block */
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  });

  after(() => {
    cy.LOGOUT();
  });
  it("TC - Create new sales bid", function () { 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
    /* Creation of sales BID */
    _common.openTab(app.TabBar.BID).then(() => {
      _common.setDefaultView(app.TabBar.BID)
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID )
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.create_newRecord(cnt.uuid.BIDS);
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESCRIPTION)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS, app.GridCells.DESCRIPTION_INFO, BID_DESCRIPTION);
    
  });
  it("TC - Delete sales bid", function () {
    _common.delete_recordFromContainer(cnt.uuid.BIDS);
    _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESCRIPTION )
    _validate.verify_isRecordDeleted(cnt.uuid.BIDS,BID_DESCRIPTION)
  });
})
