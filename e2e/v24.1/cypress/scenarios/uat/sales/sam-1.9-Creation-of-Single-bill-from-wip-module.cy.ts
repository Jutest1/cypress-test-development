import { tile, app, cnt, commonLocators } from "cypress/locators";
import { _common, _boqPage, _estimatePage, _bidPage, _saleContractPage, _wipPage, _billPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER = "BOQ_CODE-" + Cypress._.random(0, 999);
const BOQ_ITEM = "BOQ_CODE-" + Cypress._.random(0, 999);
const BID_DESC = "BID_DESC-" + Cypress._.random(0, 999);
const CONT_DESC = "CONT_DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP_DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL_DESC-" + Cypress._.random(0, 999);


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.9 | Creation of Single bill from wip module");

describe("SAM- 1.9 | Creation of Single bill from wip module", () => {

  beforeEach(function () {
    cy.fixture("sam/sam-1.9-Creation-of-Single-bill-from-wip-module.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture("sam/Sam-1.9-Creation-of-Single-bill-from-wip-module.json").then((data) => {
      this.data = data;
      const standerdInputs = this.data.Prerequisites.SidebarInputes;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
      });
      _common.openSidebarOption(standerdInputs.Search).delete_pinnedItem();
      _common.search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create new BoQ record", function () {
    const boqPageInputs = this.data.BoQCreation.BoQPageInputs;
    const BoQColumnHeader = this.data.BoQCreation.ColumnHeaders
    const BoQStructureColumnHeader = this.data.BoQCreation.ColumnHeaders2

    _common.openTab(app.tabBar.BoQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS, BoQColumnHeader)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_HEADER);
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BoQStructureColumnHeader)
    })
    _boqPage.enterRecord_toCreateBoQStructure(BOQ_ITEM, boqPageInputs.quantity, boqPageInputs.unitRate, boqPageInputs.uom);
    cy.SAVE();
  });

  it("TC - Create new estimate record", function () {
    const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
    const EstimateColumnHeader = this.data.EstimateHeader.ColumnHeaders

    _common.openSidebarOption(estimateInputs.quickStart);
    _common.search_fromSidebar(estimateInputs.quickStart1, estimateInputs.searchValue);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, EstimateColumnHeader)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description, estimateInputs.rubric, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Verify generate line item wizards option", function () {
    const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS)
    })
    _common.openSidebarOption(sidebarInputes.wizard1);
    _common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.GenerateLineItem);
    _boqPage.generate_LineItemBycode(BOQ_HEADER)
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  });

  it("TC - Verify assign resource to line item", function () {
    const resourceInputs = this.data.AssignResources.resourceInputs;
    const RsourceLineItemColumnHeader = this.data.AssignResources.ColumnHeaders

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES)
      _common.setup_gridLayout(cnt.uuid.RESOURCES, RsourceLineItemColumnHeader)
    })
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
  });

  it("TC - Create new sales bid", function () {
    const bidInputs = this.data.BidCreation.bidInputs;
    const BidColumnHeader = this.data.BidCreation.ColumnHeaders

    _common.openSidebarOption(bidInputs.wizard1)
    _common.search_fromSidebar(bidInputs.wizard2, bidInputs.createBid);
    _bidPage.createBidRecord_byWizardOptions("Main Bid", BID_DESC, bidInputs.businessPartner, bidInputs.sourceLead);
    cy.wait(2000)
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    cy.REFRESH_CONTAINER()
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.openTab(app.tabBar.bidBoQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, BidColumnHeader)
    })
    _bidPage.verifyBidQuantity_inBoQStructure(bidInputs.quantity);
    _bidPage.changeStatus_BidRecord();
    cy.SAVE()
  });

  it("TC - Create Sales Contract using Wizard option", function () {
    const contractInputs = this.data.ContractCreation.contractInput;
    const standerdInputs = this.data.Prerequisites.SidebarInputes;
    const ContractColumnHeader = this.data.ContractCreation.ColumnHeaders

    _common.waitForLoaderToDisappear()
    _common.openSidebarOption(standerdInputs.Wizard);
    _common.search_fromSidebar(standerdInputs.wizard, standerdInputs.createContract);
    _saleContractPage.createContractRecord_byWizardOptions(contractInputs.contractType, CONT_DESC, contractInputs.customer);
    cy.wait(3000)
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 0);
    });
    cy.REFRESH_CONTAINER()
    _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
    _common.getText_fromCell(cnt.uuid.CONTACTS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("CONT1_CODE", $ele1.text())
      cy.log(Cypress.env("CONT1_CODE"))
    })
    _common.openTab(app.tabBar.contractBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, ContractColumnHeader)
    })
    _saleContractPage.verifyContractQuantity_inBoQStructure(contractInputs.quantity, contractInputs.finalPrice);
    _saleContractPage.changeStatus_ContractRecord();
    _saleContractPage.selectContract();
  });

  it("TC - Create WIP record and update BoQ quantity in WIP module ", function () {
    const wipInputs = this.data.WipCreation.SidebarInputes;
    const wipInputs1 = this.data.WipCreation.updateQuantity;
    const WIPColumnHeader = this.data.WipCreation.ColumnHeaders

    cy.REFRESH_CONTAINER();
    _common.openSidebarOption(wipInputs.wizard1);
    _common.search_fromSidebar(wipInputs.wizard2, wipInputs.createWip);
    _wipPage.create_WIPfrom_Wizard(WIP_DESC)
    cy.wait(3000)
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIP)
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, WIPColumnHeader)
    })
    _wipPage.updateQuantity_inWIPBoqStructure(wipInputs1.quantity);
    _wipPage.changeStatus_WipRecord();
    cy.SAVE()
    cy.wait(2000)
  });

  it("TC - Create Bill from wizard", function () {
    const billInputs = this.data.BillCreation.SidebarInputs
    const BillColumnHeader = this.data.BillCreation.ColumnHeaders

    _billPage.create_BillFromWizard(billInputs.createBill, billInputs.type, billInputs.module, BILL_DESC)
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, BillColumnHeader)
    })
    _common.clear_subContainerFilter(cnt.uuid.BILLBOQSTRUCTURE)
    _common.select_rowHasValue(cnt.uuid.BILLBOQSTRUCTURE, BOQ_ITEM)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("actWIPFinalPrice"))
  });

  after(() => {
    cy.LOGOUT();
  });
});
