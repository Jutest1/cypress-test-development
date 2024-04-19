import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _validate } from "cypress/pages";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const LOCATION1 = "LOC-01-" + Cypress._.random(0, 999);
const LOCATION2 = "LOC-02-" + Cypress._.random(0, 999);
const LOCATION1_DESC = "NASHIK-" + Cypress._.random(0, 999);
const LOCATION2_DESC = "PUNE-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_2_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_3_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
let CONTAINERS_ESTIMATE,
  CONTAINERS_LOCATION,
  CONTAINER_COLUMNS_LOCATION,
  CONTAINERS_LINE_ITEM,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_COLUMNS_LINE_ITEM;
let ESTIMATE_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, LINE_ITEM_3_PARAMETERS: DataCells, LINE_ITEM_2_PARAMETERS: DataCells;
let MODAL_CREATE_BID
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BIDS;
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.14 | Creation of sales bid in estimate module using wizard 'Create bid' & structure type : location");
describe("SAM- 1.14 | Creation of sales bid in estimate module using wizard 'Create bid' & structure type : location", () => {

  beforeEach(function () {
    cy.fixture("sam/sam-1.14-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-Location.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.14-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-Location.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE;
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      MODAL_CREATE_BID = this.data.MODALS.CREATE_BID
      CONTAINERS_LOCATION = this.data.CONTAINERS.LOCATION
      CONTAINER_COLUMNS_LOCATION = this.data.CONTAINER_COLUMNS.LOCATION
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
      };
      LINE_ITEM_2_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_2_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY2,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
      };
      LINE_ITEM_3_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_3_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY3,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
      };
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
      };

      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create new location record", function () {
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 3);
      _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATION)
    });
    _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
    _estimatePage.enterRecord_toCreateLocation(LOCATION1, LOCATION1_DESC)
    cy.SAVE()
    _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATION.QUANTITY_FACTOR1)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("LOC01_Quantity", $ele1.text())
      cy.log(Cypress.env("LOC01_Quantity"))
    })
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
    _estimatePage.enterRecord_toCreateLocation(LOCATION2, LOCATION2_DESC)
    cy.SAVE()
    _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATION.QUANTITY_FACTOR2)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("LOC02_Quantity", $ele1.text())
      cy.log(Cypress.env("LOC02_Quantity"))
    })
  });

  it('TC - Create new estimate record', function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify create line items", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.basuomfk, CONTAINER_COLUMNS_LINE_ITEM.prjlocationfk], cnt.uuid.ESTIMATE_LINEITEMS)

    });
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION1)
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_2_PARAMETERS);
    _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION1)
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_3_PARAMETERS);
    _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION2)
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);

  });

  it("TC - Verify assign resource to line item", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_2_DESCRIPTION)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_3_DESCRIPTION)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new sales bid", function () {
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
    _common.waitForLoaderToDisappear()
    _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 2);
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    });
  });

  it("TC - Verify net amount and BoQ structure ", function () {
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
    _bidPage.verifying_Bid_Net_Amount();
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
      _common.select_rowInSubContainer(cnt.uuid.BIDBOQS)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE, LOCATION1_DESC)
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("LOC01_Quantity"))
    })
    _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE, LOCATION2_DESC)
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("LOC02_Quantity"))

    })
  });


  after(() => {
    cy.LOGOUT();
  });

});