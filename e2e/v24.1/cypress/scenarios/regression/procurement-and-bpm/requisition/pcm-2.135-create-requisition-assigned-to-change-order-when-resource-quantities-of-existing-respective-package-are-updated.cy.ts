import cypress from "cypress";
import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _controllingUnit,_procurementConfig, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";


const allure = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM_DESC1-" + Cypress._.random(0, 999);

const PACKAGE_CODE_1 = "PACKAGE_CODE_1";

const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const CHNAGE_DESC = "CHANGEDESC-" + Cypress._.random(0, 999);
const CHNAGE_DESC2 = "CHANGEDESC-" + Cypress._.random(0, 999);

let 
  ESTIMATE_PARAMETERS: DataCells,
  RESOURCE_PARAMETERS: DataCells,
  LINE_ITEM_PARAMETERS: DataCells
  let PROJECTS_PARAMETERS:DataCells,
  REQUISITION_PARAMETERS1,REQUISITION_PARAMETERS2:DataCells
let  CONTAINERS_ESTIMATE,
  CONTAINER_COLUMNS_ESTIMATE,
  CONTAINERS_RESOURCE,
  CONTAINER_COLUMNS_RESOURCE,
  CONTAINER_PACKAGE,
  CONTAINER_COLUMNS_PACKAGE,
  CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE,
  CONTAINERS_LINE_ITEM,
  CONTAINER_COLUMNS_LINE_ITEM,
  CONTAINERS_CONTRACT,
  CONTAINERS_REQUISITION

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.135 | Create requisition assigned to change order when resource quantities of existing respective package are updated");

describe("PCM- 2.135 | Create requisition assigned to change order when resource quantities of existing respective package are updated", () => {
  before(function () {
    cy.fixture("pcm/pcm-2.135-create-requisition-assigned-to-change-order-when-resource-quantities-of-existing-respective-package-are-updated.json").then((data) => {
      this.data = data
     
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
      CONTAINER_COLUMNS_PACKAGE_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ_STRUCTURE
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
      CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION
      
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
        [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]: CLERK
    }
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
      };

      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
      }

      REQUISITION_PARAMETERS1 = {
        [commonLocators.CommonLabels.CREATE_CHANGE_ORDER_REQUISITION_BASED_ON_BELOW_SELECTED_BASE_REQUISITION]:commonLocators.CommonLabels.CREATE_CHANGE_ORDER_REQUISITION_BASED_ON_BELOW_SELECTED_BASE_REQUISITION,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: CHNAGE_DESC,
        [commonLocators.CommonLabels.CHANGE_TYPE]:commonLocators.CommonKeys.DESIGN_CHANGE,
        [app.InputFields.INPUT_GROUP_CONTENT]:PROJECT_NO
        
      }

      REQUISITION_PARAMETERS2 = {
        [commonLocators.CommonLabels.CREATE_CHANGE_ORDER_REQUISITION_BASED_ON_BELOW_SELECTED_BASE_REQUISITION]:commonLocators.CommonLabels.CREATE_CHANGE_ORDER_REQUISITION_BASED_ON_BELOW_SELECTED_BASE_REQUISITION,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: CHNAGE_DESC2,
        [commonLocators.CommonLabels.CHANGE_TYPE]:commonLocators.CommonKeys.DESIGN_CHANGE,
        [app.InputFields.INPUT_GROUP_CONTENT]:PROJECT_NO,
        [commonLocators.CommonLabels.COPY_HEADER_TEXT_FROM_PACKAGE]: commonLocators.CommonKeys.CHECK
      }
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
     
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new project', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
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
  });

  it('TC - Create new estimate header', function () {
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

  it('TC - Create new line item ', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
      cy.SAVE()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });
  });

  it('TC - Assign resource to the line item', function () {
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
    cy.wait(1000) //required wait to load page
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create material package', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonElements.ESTIMATE_SELECT_CRITERIA_PLATFORM_FORM_ROW, commonLocators.CommonLabels.MULTI_PACKAGE_ASSIGNMENT_MODEL, 0)
    _package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
  });

  it('TC - Change status of the material package', function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()

    _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, PACKAGE_CODE_1)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
    _procurementConfig.changeProcurementConfiguration_FromWizard(commonLocators.CommonKeys.MATERIAL, btn.ButtonText.YES)
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SUB_PACKAGE_HEADER, app.FooterTab.HEADER_TEXT, 1)
      
    });
    _common.maximizeContainer(cnt.uuid.SUB_PACKAGE_HEADER)
    _common.create_newRecord(cnt.uuid.SUB_PACKAGE_HEADER)
    _common.edit_dropdownCellWithInput(cnt.uuid.SUB_PACKAGE_HEADER,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.ORDER_TEXT)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.SUB_PACKAGE_HEADER)
    
  });

  it('TC - Create requisition by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    cy.wait(2000) //required wait to load page
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
    
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		});
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 1)
      
    });
    _common.maximizeContainer(cnt.uuid.HEADER_TEXT)
    _common.create_newRecord(cnt.uuid.HEADER_TEXT)
    _common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.SUPPLIER_TEXT)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.HEADER_TEXT)
   
  });

  it('TC - Customizing requistion status', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
        _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, "Requisition Status")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, "Requisition Status")
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clickOn_cellHasValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO,"Approved")
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PUBLISHED, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ORDERED, commonLocators.CommonKeys.CHECK)
        cy.wait(1000)//required wait
        cy.SAVE()
  });

  it('TC - Update quantity in package item and verify header text reflected from package', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
     
    });
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    });
    _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
    _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY1)
    cy.wait(1000) //required wait to load page
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()
    _procurementPage.create_changeRequestRequisition_fromWizard(REQUISITION_PARAMETERS1)
  
    _validate.validate_Text_message_In_PopUp(CONTAINERS_REQUISITION.VALIDATION_MESSAGE)
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
    cy.wait(2000) //required wait to load page
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
    cy.wait(2000) //required wait to load page
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 1)
      
    });
    _common.maximizeContainer(cnt.uuid.HEADER_TEXT)
    _validate.verify_isRecordPresent(cnt.uuid.HEADER_TEXT,commonLocators.CommonKeys.ORDER_TEXT)
    _validate.verify_isRecordPresent(cnt.uuid.HEADER_TEXT,commonLocators.CommonKeys.SUPPLIER_TEXT)
    _common.minimizeContainer(cnt.uuid.HEADER_TEXT)


  

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1)
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)  
    });
    _common.select_rowInSubContainer(cnt.uuid.REQUISITIONITEMS)
    _common.assert_forNumericValues_mathsAbs(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_RESOURCE.QUANTITY1)

  });

  it('TC - Update quantity in package item and verify header text not reflected from package', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
       _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE)
       cy.wait(2000) //required wait to load page
       _common.waitForLoaderToDisappear()
  
   
       _common.openTab(app.TabBar.PACKAGE).then(() => {
         _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        
       });
       _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
   
       _common.openTab(app.TabBar.PACKAGE).then(() => {
         _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1)
         _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
       });
       _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
       _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY2)
       cy.wait(1000) //required wait to load page
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
   
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
       cy.wait(2000) //required wait to load page
       _common.waitForLoaderToDisappear()
       _procurementPage.create_changeRequestRequisition_fromWizard(REQUISITION_PARAMETERS2)
     
       _validate.validate_Text_message_In_PopUp(CONTAINERS_REQUISITION.VALIDATION_MESSAGE)
       _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
       _common.waitForLoaderToDisappear()

       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
       _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
       cy.wait(2000) //required wait to load page
       _common.waitForLoaderToDisappear()
       _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.HEADER_TEXT, app.FooterTab.HEADER_TEXT, 1)
        
      });
      _common.maximizeContainer(cnt.uuid.HEADER_TEXT)
      _validate.verify_recordNotPresentInContainer(cnt.uuid.HEADER_TEXT,commonLocators.CommonKeys.SUPPLIER_TEXT)
      _common.minimizeContainer(cnt.uuid.HEADER_TEXT)

     

      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1)
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)  
      });
      _common.select_rowInSubContainer(cnt.uuid.REQUISITIONITEMS)
      _common.assert_forNumericValues_mathsAbs(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_RESOURCE.QUANTITY2)

     });
})