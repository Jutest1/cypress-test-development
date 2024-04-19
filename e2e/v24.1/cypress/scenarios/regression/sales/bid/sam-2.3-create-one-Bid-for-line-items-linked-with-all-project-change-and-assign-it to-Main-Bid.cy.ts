import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _mainView, _boqPage, _common, _estimatePage, _projectPage, _salesPage, _bidPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC="BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1="BOQ_STR1-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2="BOQ_STR2-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_3="BOQ_STR3-" + Cypress._.random(0, 999);

let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS_1:DataCells
let BOQ_STRUCTURE_PARAMETERS_2:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS_1:DataCells
let RESOURCE_PARAMETERS_2:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let LINE_ITEMS_PARAMETERS_1:DataCells
let LINE_ITEMS_PARAMETERS_2:DataCells
let LINE_ITEMS_PARAMETERS_3:DataCells

let CONTAINER_COLUMNS_BID
let MODAL_CREATE_BID

const BID_DESC="BD1_" + Cypress._.random(0, 999);
const BID_DESC_1="BD2_" + Cypress._.random(0, 999)

const CHANGES_DESC="CHS1-" + Cypress._.random(0, 999);
const CHANGES_DESC_1="CHS2-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CHANGES

const PROJECT_NO="34" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let PROJECT_CHANGES

ALLURE.epic("SALES");
ALLURE.feature("Sales-BID");
ALLURE.story("SAM- 2.3 | create one bid for line items linked with all project change and assign it to main bid");

describe("SAM- 2.3 | Create one bid for line items linked with all project change and assign it to main bid", () => {

  before(function () {
    cy.fixture("sam/sam-2.3-create-one-Bid-for-line-items-linked-with-all-project-change-and-assign-it to-Main-Bid.json")
      .then((data) => {
        this.data = data
        CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
        BOQ_PARAMETERS={
            [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
        }
        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        BOQ_STRUCTURE_PARAMETERS_1={
            [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
            [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_1,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
            [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
            [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
        }
        BOQ_STRUCTURE_PARAMETERS_2={
            [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
            [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_2,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
            [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
            [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
        }
        CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
            [app.GridCells.CODE]: ESTIMATE_CODE,
            [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }
        CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
        CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
        RESOURCE_PARAMETERS_1 = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY[0]
        };

        RESOURCE_PARAMETERS_2 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY[1]
      };

        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
       
        
        CONTAINER_COLUMNS_BID=this.data.CONTAINER_COLUMNS.BID
        MODAL_CREATE_BID=this.data.MODAL.CREATE_BID

        CONTAINER_COLUMNS_CHANGES=this.data.CONTAINER_COLUMNS.CHANGES

        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
          [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
          [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
          [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }

        PROJECT_CHANGES={
          [CHANGES_DESC]:commonLocators.CommonKeys.CHECK,
          [CHANGES_DESC_1]:commonLocators.CommonKeys.CHECK
        }
      })
      .then(()=>{
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
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
      })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Project change status accepted and Is Identified checkbox check', function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
      _common.waitForLoaderToDisappear()

      cy.REFRESH_CONTAINER();
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
      });
      _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
      _common.search_inSubContainer(cnt.uuid.DATA_TYPES, sidebar.SideBarOptions.PROJECT_CHANGE_STATUS);
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER();
      _common.waitForLoaderToDisappear()
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, sidebar.SideBarOptions.PROJECT_CHANGE_STATUS);

      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
      });
      _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
      _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
      _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, commonLocators.CommonKeys.APPROVED);
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.ICON, commonLocators.CommonKeys.HOOK);
      _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_ACCEPTED,commonLocators.CommonKeys.CHECK)
      _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_ALLOWED_QTO_FOR_PROC,commonLocators.CommonKeys.CHECK)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create changes and change status", function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHANGES);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CHANGES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
        _common.setup_gridLayout(cnt.uuid.CHANGES, CONTAINER_COLUMNS_CHANGES)
    });
    _common.clear_subContainerFilter(cnt.uuid.CHANGES)
    _common.create_newRecord(cnt.uuid.CHANGES)
    _common.enterRecord_inNewRow(cnt.uuid.CHANGES,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CHANGES_DESC)
    _common.select_activeRowInContainer(cnt.uuid.CHANGES)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.CHANGES)
    _common.create_newRecord(cnt.uuid.CHANGES)
    _common.enterRecord_inNewRow(cnt.uuid.CHANGES,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CHANGES_DESC_1)
    _common.select_activeRowInContainer(cnt.uuid.CHANGES)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    cy.reload()
    cy.wait(2000) // This is required as entire page is reloaded

    _common.openTab(app.TabBar.CHANGES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
    _common.waitForLoaderToDisappear()

    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.CHANGES)
    _common.search_inSubContainer(cnt.uuid.CHANGES,CHANGES_DESC)
    _common.select_rowHasValue(cnt.uuid.CHANGES,CHANGES_DESC)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.CHANGES)
    _common.search_inSubContainer(cnt.uuid.CHANGES,CHANGES_DESC_1)
    _common.select_rowHasValue(cnt.uuid.CHANGES,CHANGES_DESC_1)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()

  })

  it("TC - Create new BoQ and BoQ structure", function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.BOQS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();   

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
      _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.BOQS)
      _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
          _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
          _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk,CONTAINER_COLUMNS_BOQ_STRUCTURE.reference],cnt.uuid.BOQ_STRUCTURES)
      });
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_1);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC_1)
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES,app.GridCells.REFERENCE,"BOQ_REF_1")

      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_2);
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC_2)
      _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES,app.GridCells.REFERENCE,"BOQ_REF_2")

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
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
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create new line item with resource", function () {
      LINE_ITEMS_PARAMETERS_1={
        [app.GridCells.DESCRIPTION_INFO]:BOQ_STRUCTURE_DESC_1,
        [app.GridCells.BOQ_ITEM_FK]:Cypress.env("BOQ_REF_1")
      }
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
          _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo,CONTAINER_COLUMNS_LINE_ITEM.code,CONTAINER_COLUMNS_LINE_ITEM.costtotal,CONTAINER_COLUMNS_LINE_ITEM.estqtyrelboqfk,CONTAINER_COLUMNS_LINE_ITEM.prjchangefk,CONTAINER_COLUMNS_LINE_ITEM.boqitemfk],cnt.uuid.ESTIMATE_LINEITEMS)
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS_1)
      _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)// added this wait container takes time to load
      _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FROM_STRUCTURE)

      _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)// added this wait container takes time to load
      _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FROM_STRUCTURE)
  
      _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      })
      _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_1)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQ_STRUCTURE_DESC_1)

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_1);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create Bid and change Bid Status", function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

      _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.MAIN_BID,BID_DESC,MODAL_CREATE_BID.BUSINESS_PARTNER,MODAL_CREATE_BID.STRUCTURE_TYPE)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.BID).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
          _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
      })
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
      _common.waitForLoaderToDisappear()
  })

  it("TC - Go back to Estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new line item with resource", function () {
    LINE_ITEMS_PARAMETERS_2={
      [app.GridCells.DESCRIPTION_INFO]:BOQ_STRUCTURE_DESC_2,
      [app.GridCells.BOQ_ITEM_FK]:Cypress.env("BOQ_REF_1")
    }
    LINE_ITEMS_PARAMETERS_3={
      [app.GridCells.DESCRIPTION_INFO]:BOQ_STRUCTURE_DESC_3,
      [app.GridCells.BOQ_ITEM_FK]:Cypress.env("BOQ_REF_2")
    }
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo,CONTAINER_COLUMNS_LINE_ITEM.code,CONTAINER_COLUMNS_LINE_ITEM.costtotal,CONTAINER_COLUMNS_LINE_ITEM.estqtyrelboqfk,CONTAINER_COLUMNS_LINE_ITEM.prjchangefk,CONTAINER_COLUMNS_LINE_ITEM.boqitemfk,CONTAINER_COLUMNS_LINE_ITEM.estqtyrelactfk],cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,commonLocators.CommonKeys.TO_STRUCTURE)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS_2)
    _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// added this wait container takes time to load
    _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FROM_STRUCTURE)
    _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// added this wait container takes time to load
    _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FROM_STRUCTURE)
    _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PRJ_CHANGE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CHANGES_DESC)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_2)

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_2);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,commonLocators.CommonKeys.TO_STRUCTURE)
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS_3)
    _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// added this wait container takes time to load
    _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FROM_STRUCTURE)
    _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// added this wait container takes time to load
    _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FROM_STRUCTURE)
    _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PRJ_CHANGE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CHANGES_DESC_1)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_3)

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC_2)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL,"COST_TOTAL_1")
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, BOQ_STRUCTURE_DESC_3)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL,"COST_TOTAL_2")
  });

  it("TC - Create new sales bid for project change", function () {
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

    _bidPage.createBidRecord_byWizardOptions(MODAL_CREATE_BID.CHANGE_BID_WITH_MULTIPLE_PROJECT_CHANGE,BID_DESC_1,MODAL_CREATE_BID.BUSINESS_PARTNER,MODAL_CREATE_BID.STRUCTURE_TYPE,BID_DESC,"NA","NA",commonLocators.CommonKeys.ONE_BID_FOR_ALL_CHANGES,PROJECT_CHANGES)
    _common.waitForLoaderToDisappear()

    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BID).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
    })
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC_1)
  });

  it("TC - Verifying the cost price with final price  ", function () {
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.setDefaultView(app.TabBar.BIDBOQ)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs,0);
    });
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESC_1)
    _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC_1)

    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs,0);
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDBOQS)
    _common.select_rowHasValue(cnt.uuid.BIDBOQS,BOQ_DESC)

    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,1);
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREBID)
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID,BOQ_STRUCTURE_DESC_1)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("COST_TOTAL_1"))

    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREBID)
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID,BOQ_STRUCTURE_DESC_2)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("COST_TOTAL_2"))
  });

});