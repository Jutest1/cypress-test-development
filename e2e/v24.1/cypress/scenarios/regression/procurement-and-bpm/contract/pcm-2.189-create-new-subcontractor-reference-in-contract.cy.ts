import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _validate, _salesPage, _rfqPage, _procurementPage, _businessPartnerPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const REQUISITION_CODE = 'REQUISITION_CODE'
const BPD_CONTACT = 'BPD_CONTACT'
const BPD_SUBSIDIARY = 'BPD_SUBSIDIARY'
const BPD_SUPPLIER = 'BPD_SUPPLIER'

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let CREATE_BUSINESSPARTNER1_PARAMETERS : DataCells;
let CREATE_BUSINESSPARTNER2_PARAMETERS : DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_REQUISITION_SUBCONTRACTOR
let CONTAINER_COLUMNS_REQUISITION
let CONTAINERS_CONTRACT
let CONTAINER_COLUMNS_CONTRACT
let CONTAINER_COLUMNS_SUBCONTRACTOR

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.189 | Create new subcontractor reference in a contract");

describe("PCM- 2.189 | Create new subcontractor reference in a contract", () => {

  before(function () {
    cy.fixture("pcm/pcm-2.189-create-new-subcontractor-reference-in-contract.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_REQUISITION_SUBCONTRACTOR = this.data.CONTAINERS.REQUISITION_SUBCONTRACTOR
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINER_COLUMNS_SUBCONTRACTOR = this.data.CONTAINER_COLUMNS.SUBCONTRACTOR
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
      };
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
      };
      CREATE_BUSINESSPARTNER1_PARAMETERS={
        [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINER_REQUISITION_SUBCONTRACTOR.BUSINESS_PARTNER],
      };
      CREATE_BUSINESSPARTNER2_PARAMETERS={
        [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINERS_CONTRACT.BUSINESS_PARTNER_1],
      };
    });
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName"));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
  });

  it('TC - Create new estimate record', function () {
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
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC- Create new Line item record", function () {

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
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

  it("TC- Verify Create/update material Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _package.enterRecord_toCreatePackage_wizard(CONTAINERS_PACKAGE.CRITERIA)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.waitForLoaderToDisappear()
    _package.changeStatus_ofPackage_inWizard()
  });

  it('TC - Create requisition from material package', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    })
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, REQUISITION_CODE)
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
    });
    _common.maximizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    _common.create_newRecord(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    _common.clickOn_activeRowCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION_SUBCONTRACTOR.STRUCTURE)
    _common.clickOn_activeRowCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
    _common.lookUpButtonInCell(cnt.uuid.REQUISITION_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
    _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(CREATE_BUSINESSPARTNER1_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.REQUISITION_SUBCONTRACTOR)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
  });

  it("TC- Create contract from Requisition and verify subcontractor", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACT)
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    });
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REQ_HEADER_FK, Cypress.env(REQUISITION_CODE))
    })
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
      _common.setup_gridLayout(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINER_COLUMNS_SUBCONTRACTOR)
    });
    _common.select_rowInContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, CONTAINER_REQUISITION_SUBCONTRACTOR.STRUCTURE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, CONTAINER_REQUISITION_SUBCONTRACTOR.BUSINESS_PARTNER)
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_CONTACT_FK, CONTAINER_REQUISITION_SUBCONTRACTOR.CONTACT)
    })
  })

  it("TC- Create Subcontractor record", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 2);
      _common.setup_gridLayout(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINER_COLUMNS_SUBCONTRACTOR)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    _common.create_newRecord(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    _common.clickOn_activeRowCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION_SUBCONTRACTOR.STRUCTURE)
    _common.clickOn_activeRowCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
    _common.lookUpButtonInCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
    _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(CREATE_BUSINESSPARTNER2_PARAMETERS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
    _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
    _common.delete_recordFromContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_recordNotPresentInContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    _common.create_newRecord(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    _validate.verify_dataUnderFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, app.InputFields.INPUT_GROUP_CONTENT, "grid", CONTAINER_REQUISITION_SUBCONTRACTOR.STRUCTURE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    _common.clickOn_activeRowCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK)
    _common.lookUpButtonInCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, app.InputFields.ICO_INPUT_LOOKUP, 0)
    _businessPartnerPage.enterRecord_toAddBusinessPartnerUsingLookUp(CREATE_BUSINESSPARTNER2_PARAMETERS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
    _common.saveCellDataToEnv(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_CONTACT_FK, BPD_CONTACT)
    _common.saveCellDataToEnv(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_SUPPLIER_FK, BPD_SUPPLIER)
  })

  it("TC- Verify Data in Business Partner module", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BUSINESS_PARTNER)
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
      _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
    });
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    cy.wait(2000)// required wait
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 0);
    });
    _common.search_inSubContainer(cnt.uuid.SUPPLIERS, Cypress.env(BPD_SUPPLIER))
    cy.wait(500).then(() => {
      _common.assert_cellDataByContent_inContainer(cnt.uuid.SUPPLIERS, app.GridCells.CODE, Cypress.env(BPD_SUPPLIER))
    })
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.CONTACTS, 3);
    });
    _common.search_inSubContainer(cnt.uuid.CONTACTS_BP, Cypress.env("Text"))
    _common.waitForLoaderToDisappear()
    cy.wait(500).then(() => {
      _common.assert_cellDataByContent_inContainer(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, Cypress.env(BPD_CONTACT))
    })
  })
});