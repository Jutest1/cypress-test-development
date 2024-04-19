import AppLayout from "cypress/locators/app-layout";
import { _bidPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _billPage } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import { tile, cnt, app, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import cypress from "cypress";

const allure = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BSD-" + Cypress._.random(0, 999);
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const PROJECT_NO = "34" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS: DataCells
let MODAL_PROJECTS

const BID_DESC = "BD1_" + Cypress._.random(0, 999);

const CONTRACT_DESC = "CD1-" + Cypress._.random(0, 999);

const WIP_DESC_1 = "WIPD1-" + Cypress._.random(0, 999);
const WIP_DESC_2 = "WIPD2-" + Cypress._.random(0, 999);
const WIP_DESC_3 = "WIPD3-" + Cypress._.random(0, 999);

const BILL_DESC_1 = "BILL1_DESC_" + Cypress._.random(0, 999);
const BILL_DESC_2 = "BILL2_DESC_" + Cypress._.random(0, 999);
const BILL_DESC_3 = "BILL3_DESC_" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS_1: DataCells
let GENERATE_LINE_ITEMS_PARAMETERS_2: DataCells

let CONTAINER_COLUMNS_BID
let MODAL_CREATE_BID

let CONTAINER_COLUMNS_CONTRACT

let WIP_PARAMETERS_1: DataCells
let WIP_PARAMETERS_2: DataCells
let CONTAINERS_WIP;
let CONTAINER_COLUMNS_WIP
let CONTAINER_COLUMNS_WIP_BOQ
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL

let BILL_PARAMETERS_1: DataCells
let BILL_PARAMETERS_2: DataCells

allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 2.9 | Progressive invoice bill creation in WIP module using wizard under tools");

describe("SAM- 2.9 | Progressive invoice bill creation in WIP module using wizard under tools", () => {

  before(function () {
    cy.fixture("sam/sam-2.9-progressive-invoice-bill-creating-in-WIP-module-using-wizard-under-tools.json").then((data) => {
      this.data = data;
      MODAL_PROJECTS = this.data.MODAL.PROJECTS
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
        [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
      }

      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
      };

      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      GENERATE_LINE_ITEMS_PARAMETERS_1 = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
      }

      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }

      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }

      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      MODAL_CREATE_BID = this.data.MODAL.CREATE_BID

      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT

      WIP_PARAMETERS_1 = {
        [commonLocators.CommonLabels.DESCRIPTION]: WIP_DESC_1,
        [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
      }
      WIP_PARAMETERS_2 = {
        [commonLocators.CommonLabels.DESCRIPTION]: WIP_DESC_2,
        [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
      }
      CONTAINER_COLUMNS_WIP = this.data.CONTAINER_COLUMNS.WIP
      CONTAINERS_WIP = this.data.CONTAINERS.WIP
      CONTAINER_COLUMNS_WIP_BOQ = this.data.CONTAINER_COLUMNS.WIP_BOQ
      CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
      CONTAINERS_BILL = this.data.CONTAINERS.BILL
      CONTAINER_COLUMNS_BILL = this.data.CONTAINER_COLUMNS.BILL
      BILL_PARAMETERS_2 = {
        [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC_2,
        [app.GridCells.DESCRIPTION_INFO]: [WIP_DESC_1, WIP_DESC_2],
        [commonLocators.CommonKeys.VALUE]: [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK]
      }

      BILL_PARAMETERS_1 = {
        [commonLocators.CommonLabels.BILL_TYPE]: commonLocators.CommonKeys.PROGRESS_INVOICE,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC_1,
        [app.GridCells.DESCRIPTION_INFO]: WIP_DESC_1,
        [commonLocators.CommonKeys.VALUE]: [commonLocators.CommonKeys.CHECK]
      }
    })
      .then(() => {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
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
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
      })
  });
  it("TC - Create BoQ header and BoQ structure", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.setDefaultView(app.TabBar.BOQS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
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
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

  });
  it("TC - Create estimate header", function () {
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

  it("TC - Generate boq line item and assign resource to it", function () {
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
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)


    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    })
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, "EST_COST_TOTAL")

  });

  it("TC - Create Bid ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

    _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID, BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS)
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC)
    _common.saveCellDataToEnv(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, "BID_NET_AMOUNT")

  })
  it("TC- Enter unit rate in BoQ structure", function () {
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
    })
    _common.clear_subContainerFilter(cnt.uuid.BIDS);
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, MODAL_CREATE_BID.UNIT_RATE)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC- Change BID status", function () {
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
    })
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create contract from bid ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _saleContractPage.create_contract_fromWizard(CONTRACT_DESC);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.search_inSubContainer(cnt.uuid.CONTRACTS, CONTRACT_DESC)
    _common.select_rowHasValue(cnt.uuid.CONTRACTS, CONTRACT_DESC)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACTS, app.GridCells.CUSTOMER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, 'Adolf Koch')
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it("TC- Change contract status", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  });

  it("TC- Create WIP", function () {
    cy.REFRESH_CONTAINER();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_DESC_1)

  });

  it("TC- Edit BoQ quantity", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.setDefaultView(app.TabBar.WIP)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
      _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()

    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIP.QUANTITY1)
    cy.SAVE();
  });

  it("TC- Change WIP status", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
      _common.setup_gridLayout(cnt.uuid.WIP, CONTAINER_COLUMNS_WIP)
    })
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.select_rowInContainer(cnt.uuid.WIP);
  });

  it("TC- Create bill from WIP", function () {
    _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINERS_BILL.TYPE, CONTAINERS_BILL.MODULE, BILL_DESC_1);
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS);
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILL)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.clear_subContainerFilter(cnt.uuid.BILLS)
    _common.select_rowInContainer(cnt.uuid.BILLS)
    _common.saveCellDataToEnv(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, "BILL1_AMOUNT")
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
  });

  it("TC- Change bill status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.BPA_BILLED);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
  });

  it("TC- verify gross amount of bill and WIP net amount", function () {
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 1);
    });
    _common.maximizeContainer(cnt.uuid.BILLS)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS, sidebar.SideBarOptions.WIP)
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIP)
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.assert_forNumericValues(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, Cypress.env("BILL1_AMOUNT"))
  });

  it("TC- Create second WIP", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.maximizeContainer(cnt.uuid.WIP)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.WIP, sidebar.SideBarOptions.CONTRACT_SALES)
    _common.waitForLoaderToDisappear()
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
    })
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS);
    _common.select_rowInContainer(cnt.uuid.CONTRACTS);
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_DESC_2)
  });

  it("TC- Edit BoQ quantity", function () {
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE);
    })
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIP.QUANTITY2)
    cy.SAVE();
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.waitForLoaderToDisappear()
  });

  it("TC- Change WIP status", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.select_rowInContainer(cnt.uuid.WIP);
    _wipPage.changeStatus_WipRecord();
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.select_rowInContainer(cnt.uuid.WIP);
  });

  it("TC- Create second bill from WIP", function () {
    _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINERS_BILL.TYPE, CONTAINERS_BILL.MODULE, BILL_DESC_2);
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS);
    })
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.BILLS)
    _common.saveCellDataToEnv(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, "BILL2_AMOUNT")
  });

  it("TC- Change bill status", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.BPA_BILLED);
    _common.waitForLoaderToDisappear()
  });

  it("TC- Verify gross amount of bill and WIP net amount", function () {
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 1);
    });
    _common.maximizeContainer(cnt.uuid.BILLS)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS, sidebar.SideBarOptions.WIP)
    _common.waitForLoaderToDisappear()
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIP)
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.assert_forNumericValues(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, Cypress.env("BILL2_AMOUNT"))
  });

  it("TC- Create third WIP", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.maximizeContainer(cnt.uuid.WIP)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.WIP, sidebar.SideBarOptions.CONTRACT_SALES)
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS);
    })
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS);
    _common.select_rowInContainer(cnt.uuid.CONTRACTS);
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_DESC_3)
  });

  it("TC- Edit BoQ quantity", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIPBOQ, app.FooterTab.BOQs);
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE);
    })
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIP.QUANTITY3)
    cy.SAVE()
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
  });

  it("TC- Change WIP status", function () {
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _wipPage.changeStatus_WipRecord();
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.select_rowInContainer(cnt.uuid.WIP);
  });

  it("TC- Create third bill from WIP", function () {
    _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINERS_BILL.TYPE_2, CONTAINERS_BILL.MODULE, BILL_DESC_3);
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS);
    })
    _common.clear_subContainerFilter(cnt.uuid.BILLS)
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.BILLS)
    _common.saveCellDataToEnv(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET, "BILL3_AMOUNT")
    _common.waitForLoaderToDisappear()
  });

  it("TC- Change bill status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.FI_BILLED);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
  });

  it("TC- verify gross amount of bill and WIP gross amount", function () {
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS, 1);
    });
    _common.maximizeContainer(cnt.uuid.BILLS)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS, sidebar.SideBarOptions.WIP)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    cy.wait(1000); //required Wait 
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.assert_forNumericValues(cnt.uuid.WIP, app.GridCells.AMOUNT_NET, Cypress.env("BILL3_AMOUNT"))
  });


  after(() => {
    cy.LOGOUT();
  });
});
