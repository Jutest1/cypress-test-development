import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import CommonLocators from "cypress/locators/common-locators";
import Buttons from "cypress/locators/buttons";
const allure = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="34" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const REQ_DESC="REQ_DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells,
    LINE_ITEM_PARAMETERS,
    RESOURCE_PARAMETERS_MATERIAL,
    PROJECTS_PARAMETERS;

let CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_LINE_ITEM,
    CONTAINER_COLUMNS_LINE_ITEM,
    CONTAINERS_RESOURCE,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE_ITEMS,
    MODAL_PROJECTS,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_REQUISITION_ITEMS,
    CONTAINER_COLUMNS_DATA_TYPE,
    CONTAINER_COLUMNS_DATA_RECORD


allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.10 | Create new or update requisition of updated quantities");
describe("PCM- 2.10 | Create new or update requisition of updated quantities", () => {
  before(function () {
    cy.fixture("pcm/pcm-2.10-create-new-update-requisition-of-updated-quantities.json").then((data) => {
      this.data = data;
      MODAL_PROJECTS=this.data.MODAL.PROJECTS
      CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
      CONTAINER_COLUMNS_DATA_RECORD=this.data.CONTAINER_COLUMNS.DATA_RECORD
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_PACKAGE=this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE_ITEMS = this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS
      CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
      CONTAINER_COLUMNS_REQUISITION_ITEMS=this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS      

      PROJECTS_PARAMETERS={
        [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
        [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
      };
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.QUANTITY_SMALL]: CONTAINER_LINE_ITEM.QUANTITY,
        [app.GridCells.BAS_UOM_FK]: CONTAINER_LINE_ITEM.UOM,
      };
      RESOURCE_PARAMETERS_MATERIAL = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
      };
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.setDefaultView(app.TabBar.PROJECT)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).clear_searchInSidebar()
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE();          
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
      _common.waitForLoaderToDisappear()
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Uncheckbox of Requisition of published and Order under customizing", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
      _common.setup_gridLayout(cnt.uuid.DATA_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
      })
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES,commonLocators.CommonKeys.REQUISITION_STATUS)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.REQUISITION_STATUS)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 2);
      _common.setup_gridLayout(cnt.uuid.DATA_RECORDS,CONTAINER_COLUMNS_DATA_RECORD)
      })
    _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.APPROVED)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.APPROVED);
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PUBLISHED, commonLocators.CommonKeys.UNCHECK)
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ORDERED, commonLocators.CommonKeys.UNCHECK)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    })

  it('TC - Create new estimate header', function () {
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
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new line item with quantity", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
  });

  it("TC - Assign resource to the line item", function () {
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES);
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();

  });

  it("TC - Create material package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(()=>{
        _common.setDefaultView(app.TabBar.PACKAGE)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
        _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
      });
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($pkg_code: JQuery<HTMLElement>)=>{
        Cypress.env("PACKAGE_CODE", $pkg_code.text())
      })

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS,2)
      _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.quantity,CONTAINER_COLUMNS_PACKAGE_ITEMS.prcpackagefk],cnt.uuid.PACKAGEITEMS)
    })
    _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE);
    _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE)
    _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_RESOURCE.QUANTITY)
    _package.changeStatus_ofPackage_inWizard()
  });

  it("TC - Create requisition from material package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
	  _common.waitForLoaderToDisappear()
	  _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
        _common.setDefaultView(app.TabBar.MAIN)
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION)
        _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        _common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.packagefk,CONTAINER_COLUMNS_REQUISITION.description],cnt.uuid.REQUISITIONS)
      })
  _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
  _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,REQ_DESC)
  cy.SAVE()  
  _common.waitForLoaderToDisappear() 
  _common.assert_cellData(cnt.uuid.REQUISITIONS,app.GridCells.PACKAGE_FK,Cypress.env("PACKAGE_CODE"))
  });

  it("TC - REQ Item", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.prcpackagefk],cnt.uuid.REQUISITIONITEMS)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,Cypress.env("PACKAGE_CODE"))
    _common.select_rowHasValue(cnt.uuid.REQUISITIONITEMS,Cypress.env("PACKAGE_CODE"))
    _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_RESOURCE.QUANTITY)
  });

   it("TC - Change Quantity in PackageItem and assert the quantity in Requsition item", function () {
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUISITIONS,commonLocators.CommonKeys.PACKAGE)
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS,2)
      })
      _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE);
      _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE)
      _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PACKAGE.QUANTITY[0])
      cy.SAVE()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
      _common.select_multipleRow_fromModal()
      _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
      _common.waitForLoaderToDisappear()
      _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,Cypress.env("PACKAGE_CODE"))
      _common.select_rowHasValue(cnt.uuid.REQUISITIONITEMS,Cypress.env("PACKAGE_CODE"))  
      _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_PACKAGE.QUANTITY[0])      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
      _common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
      _common.waitForLoaderToDisappear()      
      _common.clickOn_goToButton_toSelectModule(cnt.uuid.REQUISITIONS,commonLocators.CommonKeys.PACKAGE)
      _common.waitForLoaderToDisappear()

   })

   it("TC - Set checkbox of Requisition of published and Order under customizing", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        _common.setup_gridLayout(cnt.uuid.DATA_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
    })
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES,commonLocators.CommonKeys.REQUISITION_STATUS)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.REQUISITION_STATUS)  
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 2);
        _common.setup_gridLayout(cnt.uuid.DATA_RECORDS,CONTAINER_COLUMNS_DATA_RECORD)
    })
    _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.APPROVED)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.APPROVED);
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PUBLISHED, commonLocators.CommonKeys.CHECK)
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ORDERED, commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
})

  it("TC - Change Quantity in Package item and assert Quantity in Requisition item", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS,2)
      })
    _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE);
    _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE)
    _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PACKAGE.QUANTITY[1])
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _common.select_multipleRow_fromModal()
    _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,Cypress.env("PACKAGE_CODE"))
    _common.select_rowHasValue(cnt.uuid.REQUISITIONITEMS,Cypress.env("PACKAGE_CODE"))
    let addition = (+CONTAINERS_PACKAGE.QUANTITY[1])-(+CONTAINERS_PACKAGE.QUANTITY[0])  
    _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,addition.toString())
  })

});
