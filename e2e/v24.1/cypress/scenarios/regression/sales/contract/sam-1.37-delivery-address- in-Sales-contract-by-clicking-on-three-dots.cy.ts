


import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _modalView, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT_DESC" + Cypress._.random(0, 999);
const PRJ_NO_1 = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);




let PROJECTS_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_CONTRACTS;
let CONTAINER_COLUMNS_CONTRACTS;
let CONTAINER_COLUMNS_BIDS;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let MODAL_CREATE_BID
let ADDRESS_PARAMETER
let MODAL_PROJECTS



allure.epic("SALES");
allure.feature("contract sales");
allure.story("SAM- 1.37 | Delivery address in Sales contract by clicking on three dots");
describe("SAM- 1.37 | Delivery address in Sales contract by clicking on three dots", () => {

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.37-delivery-address- in-Sales-contract-by-clicking-on-three-dots.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE

      CONTAINERS_CONTRACTS = this.data.CONTAINERS.CONTRACTS;
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      CONTAINER_COLUMNS_CONTRACTS = this.data.CONTAINER_COLUMNS.CONTRACTS
      MODAL_CREATE_BID = this.data.MODALS.CREATE_BID
      MODAL_PROJECTS=this.data.MODALS.PROJECTS

      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO_1,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      ADDRESS_PARAMETER = {
        [commonLocators.CommonLabels.CITY]: MODAL_PROJECTS.CITY,
        [commonLocators.CommonLabels.STREET]: MODAL_PROJECTS.STREET,
        [commonLocators.CommonLabels.ZIP_CODE]: MODAL_PROJECTS.ZIP_CODE,
        [commonLocators.CommonLabels.COUNTRY]: MODAL_PROJECTS.COUNTRY
    }

      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      };

      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }
    
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).clear_searchInSidebar()
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO_1).pinnedItem();
    });
  });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
        _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
      });
          _common.waitForLoaderToDisappear()
          _common.clear_subContainerFilter(cnt.uuid.BOQS);
          _common.maximizeContainer(cnt.uuid.BOQS)
          _common.create_newRecord(cnt.uuid.BOQS);
          _common.waitForLoaderToDisappear()
          _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
          cy.SAVE();
          _common.waitForLoaderToDisappear()
          _common.minimizeContainer(cnt.uuid.BOQS)
          _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
          _common.waitForLoaderToDisappear()
  
          _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
          });
          _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
          cy.SAVE()
          _common.waitForLoaderToDisappear()
    });
    it('TC - Create new estimate record', function () {
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
          _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
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
    it("TC- Generate Line item from BoQ", function () {
          _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
          });
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
          _common.waitForLoaderToDisappear()
          _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          });
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
          _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });
    it("TC - Create new record in resource", function () {
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
          });
          _common.maximizeContainer(cnt.uuid.RESOURCES)
          _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
          _common.create_newRecord(cnt.uuid.RESOURCES);
          _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
          _common.minimizeContainer(cnt.uuid.RESOURCES)
          _common.waitForLoaderToDisappear()
          cy.SAVE();
          _common.waitForLoaderToDisappear()
    });
    it("TC - Create BID from Wizard", function () {
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
          _common.waitForLoaderToDisappear()
          _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID,BID_DESC,  MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
    });
    it("TC - Change bid status", function () {
          _common.openTab(app.TabBar.BID).then(() => {
          _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
          _common.clear_subContainerFilter(cnt.uuid.BIDS)
          })
          _common.select_rowInContainer(cnt.uuid.BIDS)
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
          _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
    });
    it("TC - Create contract from wizard ", function () {
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
          _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
          _common.waitForLoaderToDisappear()
    });
    it("TC - Add Delivery address to contract ", function () {
         _common.openTab(app.TabBar.CONTRACTS).then(() => {
         _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
         _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACTS)
         _common.waitForLoaderToDisappear()
         _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
         })
        _common.lookUpButtonInCell(cnt.uuid.CONTRACTS, app.GridCells.ADDRESS_ENTITY, app.InputFields.ICO_INPUT_LOOKUP, 0)
        _common.waitForLoaderToDisappear()
        _projectPage.enterRecord_toAddressInsideModal(ADDRESS_PARAMETER)
        _common.select_activeRowInContainer(cnt.uuid.CONTRACTS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTRACTS, app.GridCells.ADDRESS_ENTITY, "CONTRACT_ADDRESS")
    
    });
    it("TC - Add Delivery address to contract ", function () {
      _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
      })
     _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS,app.GridCells.ADDRESS_ENTITY,Cypress.env("CONTRACT_ADDRESS"))
 
 });
  

  after(() => {
    cy.LOGOUT();
  });
});