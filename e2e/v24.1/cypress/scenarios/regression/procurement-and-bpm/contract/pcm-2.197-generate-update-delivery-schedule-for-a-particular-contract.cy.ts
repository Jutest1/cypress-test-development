import { _projectPage, _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const DELIVERY_DESC = "DELIVERY_DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_PACKAGE
let DELIVERY_SCHEDULE_PARAMETER_1: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_2: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_3: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_4: DataCells;
let CONTAINERS_DELIVERY_SCHEDULE;
let CONTAINER_COLUMNS_PROCUREMENTCONTRACT
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.138 | Generate a delivery schedule for requisition - from wizard");
describe("PCM- 2.138 | Generate a delivery schedule for requisition - from wizard", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-2.197-generate-update-delivery-schedule-for-a-particular-contract.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("pcm/pcm-2.197-generate-update-delivery-schedule-for-a-particular-contract.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
      CONTAINERS_DELIVERY_SCHEDULE = this.data.CONTAINERS.DELIVERY_SCHEDULE
      CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT;
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
      };
      MATERIAL_RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,

      }
      DELIVERY_SCHEDULE_PARAMETER_1 = {
        [commonLocators.CommonLabels.DESCRIPTION_PREFIX]: DELIVERY_DESC,
        [commonLocators.CommonLabels.START_DATE]: _common.getDate("current"),
        [commonLocators.CommonLabels.END_DATE]: _common.getDate("incremented", 1),
        [commonLocators.CommonLabels.REPEAT]: CONTAINERS_DELIVERY_SCHEDULE.WEEKLY
      }
      DELIVERY_SCHEDULE_PARAMETER_2 = {
        [commonLocators.CommonLabels.DESCRIPTION_PREFIX]: DELIVERY_DESC,
        [commonLocators.CommonLabels.START_DATE]: _common.getDate("current"),
        [commonLocators.CommonLabels.END_DATE]: _common.getDate("incremented", 1),
        [commonLocators.CommonLabels.REPEAT]: CONTAINERS_DELIVERY_SCHEDULE.MONTHLY,
      }
      DELIVERY_SCHEDULE_PARAMETER_3 = {
        [commonLocators.CommonLabels.DESCRIPTION_PREFIX]: DELIVERY_DESC,
        [commonLocators.CommonLabels.START_DATE]: _common.getDate("current"),
        [commonLocators.CommonLabels.END_DATE]: _common.getDate("incremented", 1),
        [commonLocators.CommonLabels.REPEAT]: CONTAINERS_DELIVERY_SCHEDULE.QUATERLY,
      }
      DELIVERY_SCHEDULE_PARAMETER_4 = {
        [commonLocators.CommonLabels.DESCRIPTION_PREFIX]: DELIVERY_DESC,
        [commonLocators.CommonLabels.START_DATE]: _common.getDate("current"),
        [commonLocators.CommonLabels.END_DATE]: _common.getDate("incremented", 1),
        [commonLocators.CommonLabels.REPEAT]: CONTAINERS_DELIVERY_SCHEDULE.USER_SPECIFIED,
      }
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });
  });
  after(() => {
    cy.LOGOUT();
  });
  it("TC - Create new estimate", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)

  });
  it("TC - Create new line item with quantity", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()


  });
  it("TC - Assign resource to the line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  });
  it("TC - Create material package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
    _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
    cy.SAVE();
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

    })
  });
  it("TC - Create requisition from material package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
     cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.SAVE()
  });
  it('TC - Create Contract from requisition wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
     cy.wait(1000)//required waits
    _common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    _package.create_ContractfromPackage(MODAL_PACKAGE.BP)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    });
     cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
  })
  it("TC -  Assertion 2-Generate delivery schedule for requisition from wizard for Weekly", function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACT)
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    })
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
    _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_1)
    _common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
     cy.wait(1000)//required waits
    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0)
      _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
      _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
      _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    })
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
      _common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ)
       cy.wait(1000)//required waits
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.FooterTab.DELIVERY_SCHEDULE)
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DATE_REQUIRED, _common.getDate("current"))
    const occurrenceCode = 1;
    const resultString = '';
    for (let i = 1; i <= occurrenceCode; i++) {
      const resultCode = `${DELIVERY_DESC}#${i}`;
      let resultString = '';
    }
    _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DESCRIPTION, resultString)
  });

  it("TC -  Assertion 3-Generate delivery schedule for requisition from wizard for Monthly", function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    })
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
    _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_2)
    _common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
     cy.wait(1000)//required waits
    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
      _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
      _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
      _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    })
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
       cy.wait(1000)//required waits
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.FooterTab.DELIVERY_SCHEDULE, 3)
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DATE_REQUIRED, _common.getDate("current"))
    const occurrenceCode = 1;
    const resultString = '';
    for (let i = 1; i <= occurrenceCode; i++) {
      const resultCode = `${DELIVERY_DESC}#${i}`;
      let resultString = '';
    }
    _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DESCRIPTION, resultString)
  });

  it("TC -  Assertion 4-Generate delivery schedule for requisition from wizard for Quarterly", function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    })
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
    _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_3)
    _common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
     cy.wait(1000)//required waits
    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
      _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
      _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
      _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    })
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
       cy.wait(1000)//required waits
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.FooterTab.DELIVERY_SCHEDULE, 3)
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DATE_REQUIRED, _common.getDate("current"))
    const occurrenceCode = 1;
    const resultString = '';
    for (let i = 1; i <= occurrenceCode; i++) {
      const resultCode = `${DELIVERY_DESC}#${i}`;
      let resultString = '';
    }
    _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DESCRIPTION, resultString)
  });

  it("TC -  Assertion 5-Generate delivery schedule for requisition from wizard for User Specified", function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    })
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
    _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_4)
    _common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
     cy.wait(1000)//required waits
    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
      _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
      _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
      _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    })
    _common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
       cy.wait(1000)//required waits
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.FooterTab.DELIVERY_SCHEDULE, 1)
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DATE_REQUIRED, _common.getDate("current"))
    const occurrenceCode = 1;
    const resultString = '';
    for (let i = 1; i <= occurrenceCode; i++) {
      const resultCode = `${DELIVERY_DESC}#${i}`;
      let resultString = '';
    }
    _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENT_CONT_DELIVERYSCHEDULE, app.GridCells.DESCRIPTION, resultString)
  });

  it("TC - Assertion 1-Generate delivery schedule for quantity 0", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    })
    _common.openTab(app.TabBar.CONTRACT).then(() => {
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
      _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
      _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
      _common.enterRecord_inNewRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "0.000")
       cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
    cy.get('button').contains(btn.ButtonText.OK).should('have.prop', 'disabled', true)
    _common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
     cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  });


});

