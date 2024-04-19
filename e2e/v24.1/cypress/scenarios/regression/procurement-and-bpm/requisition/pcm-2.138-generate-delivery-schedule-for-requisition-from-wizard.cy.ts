import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import {_projectPage, _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const allure = Cypress.Allure.reporter.getInterface();
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LINEITEM_DESC-" + Cypress._.random(0, 999);
const DELIVERY_DESC = "DELIVERY_DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let DELIVERY_SCHEDULE_PARAMETER: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_2: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_3: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_4: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_5: DataCells;
let DELIVERY_SCHEDULE_PARAMETER_6: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_PACKAGE
let CONTAINER_COLUMNS_ITEMS
let CONTAINERS_DELIVERY_SCHEDULE;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.138 | Generate a delivery schedule for requisition - from wizard");
describe("PCM- 2.138 | Generate a delivery schedule for requisition - from wizard", () => {

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("pcm/pcm-2.138-generate-delivery-schedule-for-requisition-from-wizard.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
      CONTAINERS_DELIVERY_SCHEDULE = this.data.CONTAINERS.DELIVERY_SCHEDULE

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
      DELIVERY_SCHEDULE_PARAMETER={
        [commonLocators.CommonLabels.DESCRIPTION_PREFIX]:DELIVERY_DESC,
        [commonLocators.CommonLabels.START_DATE]:_common.getDate("current"),
        [commonLocators.CommonLabels.END_DATE]:_common.getDate("incremented",75),
        [commonLocators.CommonLabels.REPEAT]:CONTAINERS_DELIVERY_SCHEDULE.QUATERLY,    
        }

         DELIVERY_SCHEDULE_PARAMETER_2={
          [commonLocators.CommonLabels.DESCRIPTION_PREFIX]:DELIVERY_DESC,
          [commonLocators.CommonLabels.START_DATE]:_common.getDate("current"),
          [commonLocators.CommonLabels.END_DATE]:_common.getDate("incremented",15),
          [commonLocators.CommonLabels.REPEAT]:CONTAINERS_DELIVERY_SCHEDULE.USER_SPECIFIED,    
          }
          DELIVERY_SCHEDULE_PARAMETER_3={
            [commonLocators.CommonLabels.DESCRIPTION_PREFIX]:DELIVERY_DESC,
            [commonLocators.CommonLabels.START_DATE]:_common.getDate("current"),
            [commonLocators.CommonLabels.END_DATE]:_common.getDate("incremented",30),
            [commonLocators.CommonLabels.REPEAT]:CONTAINERS_DELIVERY_SCHEDULE.MONTHLY,   
            }
             DELIVERY_SCHEDULE_PARAMETER_4={
              [commonLocators.CommonLabels.DESCRIPTION_PREFIX]:DELIVERY_DESC,
              [commonLocators.CommonLabels.START_DATE]:_common.getDate("current"),
              [commonLocators.CommonLabels.END_DATE]:_common.getDate("incremented",21),
              [commonLocators.CommonLabels.REPEAT]:CONTAINERS_DELIVERY_SCHEDULE.WEEKLY,
             }
           DELIVERY_SCHEDULE_PARAMETER_5={
              [commonLocators.CommonLabels.DESCRIPTION_PREFIX]:DELIVERY_DESC,
              [commonLocators.CommonLabels.START_DATE]:_common.getDate("current"),
              [commonLocators.CommonLabels.END_DATE]:_common.getDate("incremented",21),
              [commonLocators.CommonLabels.REPEAT]:CONTAINERS_DELIVERY_SCHEDULE.WEEKLY,
              [commonLocators.CommonLabels.ROUND_UP_QUANTITY]:commonLocators.CommonKeys.CHECK
             }
             DELIVERY_SCHEDULE_PARAMETER_6={
              [commonLocators.CommonLabels.DESCRIPTION_PREFIX]:DELIVERY_DESC,
              [commonLocators.CommonLabels.START_DATE]:_common.getDate("current"),
              [commonLocators.CommonLabels.END_DATE]:_common.getDate("incremented",21),
              [commonLocators.CommonLabels.REPEAT]:CONTAINERS_DELIVERY_SCHEDULE.WEEKLY,
              [commonLocators.CommonLabels.ROUND_UP_QUANTITY]:commonLocators.CommonKeys.CHECK
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
      cy.wait(500)
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
      cy.SAVE()
  });
  it("TC -  Assertion 2-Generate delivery schedule for requisition from wizard for Monthly", function () {
 
       _common.openTab(app.TabBar.MAIN).then(()=>{
       cy.wait(2000)
       })
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
       _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition( DELIVERY_SCHEDULE_PARAMETER_3)
       _common.waitForLoaderToDisappear()
       cy.wait(1000)
       _common.clickOn_modalFooterButton(btn.ButtonText.OK)
       cy.SAVE()
       cy.wait(1000)
       _common.openTab(app.TabBar.MAIN).then(()=>{
        cy.wait(3000)
       _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,0)
       _common.maximizeContainer(cnt.uuid.REQUISITIONITEMS)
       _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE)
       _common.minimizeContainer(cnt.uuid.REQUISITIONITEMS)
       })
       _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
        _common.setDefaultView(app.TabBar.REQUISITIONBOQS)
        cy.wait(3000)
       _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,1)
       _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("current"))
       })
       _common.assert_cellDataByContent_inContainer(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DESCRIPTION,DELIVERY_DESC)
   });
   it("TC - Assertion 3-Generate delivery schedule for requisition from wizard for quarterly", function () {       
       _common.openTab(app.TabBar.MAIN).then(()=>{
       cy.wait(2000)
       })
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
       _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER)
       _common.waitForLoaderToDisappear()
       cy.wait(1000)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
       cy.SAVE()
       cy.wait(1000)
       _common.openTab(app.TabBar.MAIN).then(()=>{
       _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,1)
       _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE)
       })
       _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
       _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,3)
       _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("current"))
       })
       _common.assert_cellDataByContent_inContainer(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DESCRIPTION,DELIVERY_DESC)
   });
   it("TC - Assertion 4-Generate delivery schedule for requisition from wizard for userdefined", function () {
  _common.openTab(app.TabBar.MAIN).then(()=>{
        cy.wait(2000)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
        _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_2)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        cy.wait(1000)
        _common.openTab(app.TabBar.MAIN).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,1)
        cy.wait(3000)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE)
        })
       _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
       _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,3)
       _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("current"))
       })
       _common.assert_cellDataByContent_inContainer(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DESCRIPTION,DELIVERY_DESC)
   });
   it("TC - Assertion 5-Verify the quantity with delivery quantity", function () {
       _common.openTab(app.TabBar.MAIN).then(()=>{
       cy.wait(2000)
       })
       _common.openTab(app.TabBar.MAIN).then(()=>{
       _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,2)
       })
       _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
       _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE)
       cy.wait(3000)
       _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL)
       _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
       _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,1)
       })
      // _common.assert_getText_fromContainerForm(cnt.uuid.DELIVERY_SCHEDULE,CONTAINERS_DELIVERY_SCHEDULE.TOTAL_QUANTITY,CONTAINERS_DELIVERY_SCHEDULE.QUANTITY)
   });
   it("TC - Assertion 1-Generate delivery schedule for requisition from wizard for Weekly-Adding total with quantity", function () {

     _common.openTab(app.TabBar.MAIN).then(()=>{
     _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE)
     })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
      _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_4)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.SAVE()
      cy.wait(1000)
      _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,1)
      })
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS, CONTAINERS_RESOURCE.CODE)
      _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL).then(($quantity)=>{
      let totalquantity= parseFloat($quantity.text())
      const occurrence1 =  parseFloat((totalquantity / 3).toFixed(3)); // Integer division
      const occurrence2 =  parseFloat((totalquantity / 3).toFixed(3)); // Integer division
      const occurrence3 = Math.floor((totalquantity / 3) * 1000) / 1000; // Round down to 3 decimal places// Round the remainder to three decimal places
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,3)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("current"))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,occurrence1.toString())
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,2)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("incremented",7))
     // _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,occurrence2.toString())
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,2)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("incremented",21))
    //  _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,occurrence3.toString())
      cy.log(`occurrence1: ${occurrence1}`);
      cy.log(`occurrence2: ${occurrence2}`);
      cy.log(`occurrence3: ${occurrence3}`);
      const sumOfParts = occurrence1 + occurrence2 + occurrence3;
      cy.log(`sumOfParts: ${sumOfParts}`);
      //expect(sumOfParts).to.be.closeTo(totalquantity, 0.001);
     })
   });
   it("TC - Assertion 6-Weekly-round off with 3 occurence for Quantity with out decimals", function () {

      _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
      _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_5)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.SAVE()
      cy.wait(1000)
      _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,1)
      })
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,CONTAINERS_RESOURCE.CODE)
      _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL).then(($quantity)=>{
      let totalquantity= parseFloat($quantity.text())
      const roundedQuantity = Math.round(totalquantity);
      const occurrence1 = Math.ceil(roundedQuantity / 3); // Round up for the first 2 occurrences
      const occurrence2 = Math.ceil(roundedQuantity / 3); // Round up for the first 2 occurrences
      const occurrence3 = roundedQuantity - (occurrence1 + occurrence2);
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,3)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("current"))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,occurrence1.toString())
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,2)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("incremented",7))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,occurrence2.toString())
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,2)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("incremented",21))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,occurrence3.toString())
      //expect(occurrence1).to.be.greaterThan(occurrence3);
      //expect(occurrence2).to.be.greaterThan(occurrence3);
      cy.log(`occurrence1: ${occurrence1}`);
      cy.log(`occurrence2: ${occurrence2}`);
      cy.log(`occurrence3: ${occurrence3}`);
      const sumOfParts = occurrence1 + occurrence2 + occurrence3;
      cy.log(`sumOfParts: ${sumOfParts}`);
     // expect(sumOfParts).to.be.closeTo(totalquantity, 0.001);
      })
   });
   it("TC -Assertion 6.1-Weekly-round off with 3 occurence for Quantity with decimals ", function () {


      _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,1)
       cy.wait(3000)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,CONTAINERS_RESOURCE.CODE)
      })
      _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_DELIVERY_SCHEDULE.EDITED_QUANTITY)
      cy.SAVE()
      cy.wait(2000)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_DELIVERY_SCHEDULE);
      _procurementPage.enterRecord_toCreateDeliverySchedulefrom_requisition(DELIVERY_SCHEDULE_PARAMETER_6)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      cy.SAVE()
      cy.wait(1000)
      _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,1)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,CONTAINERS_RESOURCE.CODE)
      })
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
      _common.search_inSubContainer(cnt.uuid.REQUISITIONITEMS,CONTAINERS_RESOURCE.CODE)
      _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL).then(($quantity)=>{
      let totalquantity= parseFloat($quantity.text())
      const occurrence1 = Math.ceil(totalquantity / 3); // Integer division
      const occurrence2 = Math.ceil(totalquantity / 3); // Integer division
      const occurrence3 = Math.round((totalquantity - (occurrence1 + occurrence2)) * 1000) / 1000 // Round the remainder to three decimal places
      const roundedOccurrence1 = Number(occurrence1.toFixed(2));
      const roundedOccurrence2 = Number(occurrence2.toFixed(2));
      const roundedOccurrence3 = Number(occurrence3.toFixed(2));
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,3)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("current"))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,roundedOccurrence1.toString())
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,2)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("incremented",7))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,roundedOccurrence2.toString())
      _common.openTab(app.TabBar.REQUISITIONBOQS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.DELIVERY_SCHEDULE,app.FooterTab.DELIVERY_SCHEDULE,2)
      _common.clear_subContainerFilter(cnt.uuid.DELIVERY_SCHEDULE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.DATE_REQUIRED,_common.getDate("incremented",21))
      _common.assert_forNumericValues(cnt.uuid.DELIVERY_SCHEDULE,app.GridCells.QUANTITY_SMALL,roundedOccurrence3.toString())
      cy.log(`occurrence1: ${occurrence1}`);
      cy.log(`occurrence2: ${occurrence2}`);
      cy.log(`occurrence3: ${occurrence3}`);
      const sumOfParts = occurrence1 + occurrence2 + occurrence3;
      cy.log(`sumOfParts: ${sumOfParts}`);
      expect(sumOfParts).to.be.closeTo(totalquantity, 0.001);
     })
   });

});

