import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const allure = Cypress.Allure.reporter.getInterface();

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.59 | Create a change order for an existing approved contract BoQ package");

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1 = "BOQSTR-DESC_1-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);
const PROJECT_CHANGE = "PROJECT_CHANGE_DESC-" + Cypress._.random(0, 999)

let BOQ_PARAMETERS: DataCells,
  BOQ_STRUCTURE_PARAMETERS: DataCells,
  BOQ_STRUCTURE_PARAMETERS_1: DataCells,
  ESTIMATE_PARAMETERS: DataCells,
  LINE_ITEM_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS_1: DataCells


let CONTAINER_COLUMNS_BOQS,
  CONTAINERS_BOQ_STRUCTURE,
  CONTAINER_COLUMNS_BOQ_STRUCTURE,
  CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINERS_LINE_ITEM,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_COLUMNS_BOQ_STRUCTURE_PACKAGE,
  CONTAINER_PACKAGE,
  CONTAINERS_CONTRACT,
  CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE,
  CONTAINERS_REQUISITION


describe("PCM- 1.59 | Create a change order for an existing approved contract BoQ package", () => {
  before(function () {
    cy.fixture("pcm/pcm-1.59-create-a-change-order-for-an-existing-approved-contract-BoQ-package.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE;
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE;
      CONTAINER_COLUMNS_BOQ_STRUCTURE_PACKAGE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE_PACKAGE;
      CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE;
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
      CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE
      CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION

      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0]
      }
      BOQ_STRUCTURE_PARAMETERS_1 = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC_1,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[1]
      }
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
      }
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
      };
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
      };
      RESOURCE_PARAMETERS_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
      };
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new BoQ header and BoQ structure', function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.maximizeContainer(cnt.uuid.BOQS)
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    cy.wait(2000) //required wait to load page
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
    cy.SAVE()
    cy.wait(2000) //required wait to load page
  })

  it('TC - Create new estimate record', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    cy.wait(2000) //required wait to load page
  });

  it('TC - Create new line item with quantity', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ITEM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BOQ_STRUCTURE_DESC)
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  });

  it('TC - Assign resource to the line item', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES);
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  });

  it("TC - Create boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    cy.wait(2000) //required wait to load page
    _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.LINE_ITEM_WITH_RESOURCE, CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE, "", "", CONTAINER_PACKAGE.TRANSFER_FROM)
    _common.openTab(app.TabBar.PACKAGE).then(function () {
      cy.wait(2000) //required wait to load page
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    })
  })

  it('TC - Create requisistion by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
      cy.wait(1000) //required wait to load page
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    });
  });

  it('TC - Create contract by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    cy.wait(2000) //required wait to load page
    _saleContractPage.enterRecord_createNewContract_fromRequisition(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    cy.wait(2000) //required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create second line item by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.clickOn_toolBarButtonWithTitle(cnt.uuid.ESTIMATE, Buttons.ButtonText.FILTER_CURRENT_ESTIMATE)
      cy.wait(1000) //required wait to load page
      _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
      _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION, EST_HEADER)
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
      cy.wait(2000) //required wait to load page
    });
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
      _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ITEM_FK)
      _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ROOT_REF)
      _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ITEM_FK)
      _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ITEM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BOQ_STRUCTURE_DESC_1)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      cy.wait(2000) //required wait to load page
      _common.lookUpButtonInCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_CHANGE_FK, btn.IconButtons.ICO_INPUT_ADD, 0)
      cy.wait(1000) //required wait to load page
      _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.CHANGE_TYPE, "Design Change", commonLocators.CommonKeys.LIST)
      _modalView.findModal().findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear().type(PROJECT_CHANGE);
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.wait(2000) //required wait to load page
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });
  })

  it('TC - Assign resource to the line item', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    cy.SAVE();
    cy.wait(1000) //required wait to load page
    cy.REFRESH_CONTAINER()
    cy.wait(1000) //required wait to load page
  });

  it("TC - Update boq package from wizards option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    cy.wait(2000) //required wait to load page
    _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.UPDATED_PACKAGE_WITH_ONLY_GROUPING, CONTAINER_PACKAGE.UPDATED_ESTIMATE_SCOPE, CONTAINER_PACKAGE.UPDATED_GROUPING_STRUCTURE, "", "", CONTAINER_PACKAGE.UPDATED_TO_EXISTED_PACKAGE, "")
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.BOQDETAILS).then(function () {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE.finalprice,CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURE)
      cy.wait(2000) //required wait to load page
      _common.clickOn_cellHasValue(cnt.uuid.BOQ_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_1)
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1])
    })
  })

  it('TC - Create requisistion by wizard', function () {
    cy.wait(500).then(() => {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
      cy.wait(2000) //required wait to load page
      _package.createRequisition_FromWizard(CONTAINERS_REQUISITION.CREATE_CHANGE_ORDER_REQUISITION, 0, PROJECT_CHANGE)
      _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
      cy.wait(2000) //required wait to load page
      _common.openTab(app.TabBar.MAIN).then(function () {
        _common.openTab(app.TabBar.REQUISITIONBOQS)
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONBOQSTRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE)
        cy.REFRESH_SELECTED_ENTITIES()
        _common.maximizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_1)
      })
      _common.assert_forNumericValues(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1])
      _common.minimizeContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
      _common.openTab(app.TabBar.MAIN)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
      cy.wait(1000) //required wait to load page
    })
  });

  it('TC - Create change order contract by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
    cy.wait(2000) //required wait to load page
    _saleContractPage.enterRecord_createNewContract_fromRequisition(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(function () {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESC_1)
      _common.assert_forNumericValues(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1])
    })
  });
});