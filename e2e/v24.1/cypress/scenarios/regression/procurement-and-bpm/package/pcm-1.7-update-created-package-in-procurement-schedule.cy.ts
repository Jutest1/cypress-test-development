import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _boqPage,_modalView, _procurementPage,_validate,_schedulePage,_estimatePage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SADES-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);

const PRJ_NO = 'PRJ' + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = 'PRO' + Cypress._.random(0, 999);
const BOQ_HEAD_01 = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_ITEM_01 = "BOQ-ITEM-" + Cypress._.random(0, 999);
const EST_CODE = 'E' + Cypress._.random(0, 999);
const EST_DESCRIPTION = 'EST-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = "BOQ-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2 = "LINE_DESC2-" + Cypress._.random(0, 999);
const CostTotal = "CostTotal";
let PLANNED_START
let PLANNED_FINISH

let CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE;

let PROJECT_PARAMETERS: DataCells,EVENT_PARAMETER_1:DataCells,EVENT_PARAMETER_2:DataCells,SCH_PARAMETERS:DataCells, BOQ_PARAMETERS: DataCells, BOQ_STRUCTURE_PARAMETER: DataCells, ESTIMATE_PARAMETERS: DataCells, GENERATE_LINE_ITEMS_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells, LINE_ITEM_PARAMETERS_2: DataCells;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_UPDATE_BOQ_PACKAGES,CONTAINER_COLUMNS_SCHEDULING,CONTAINERS_SCHEDULING_ACTIVITY,CONTAINER_COLUMNS_SCHEDULING_ACTIVITY

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 1.7 | Update created package in procurement schedule")

describe('PCM- 1.7 | Update created package in procurement schedule', () => {
      before(function () {

        cy.fixture("pcm/pcm-1.7-update-created-package-in-procurement-schedule.json").then((data) => {
          this.data = data
          CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
          PROJECT_PARAMETERS = {
            [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
            [commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
            [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
          };
          CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
          BOQ_PARAMETERS = {
            [app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_01,
          };
          CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
          CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
          BOQ_STRUCTURE_PARAMETER = {
            [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
            [app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_01,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
            [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
            [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0]
          };
          CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          ESTIMATE_PARAMETERS = {
            [app.GridCells.CODE]: EST_CODE,
            [app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          };
          CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
          CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
          GENERATE_LINE_ITEMS_PARAMETERS = {
            [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
            [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: SCH_DESC
          };
          CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCE;
          CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
          RESOURCE_PARAMETER = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
            [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0],
          };
          MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
          MODAL_UPDATE_BOQ_PACKAGES = this.data.MODAL.UPDATE_BOQ_PACKAGES
          SCH_PARAMETERS={
            [app.GridCells.CODE]:SCH_CODE,
            [app.GridCells.DESCRIPTION_INFO]:SCH_DESC
          }
          CONTAINER_COLUMNS_SCHEDULING=this.data.CONTAINER_COLUMNS.SCHEDULING
          CONTAINERS_SCHEDULING_ACTIVITY=this.data.CONTAINERS.SCHEDULING_ACTIVITY
          CONTAINER_COLUMNS_SCHEDULING_ACTIVITY=this.data.CONTAINER_COLUMNS.SCHEDULING_ACTIVITY
          CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
          PLANNED_START=_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
          PLANNED_FINISH=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5)

          LINE_ITEM_PARAMETERS_2 = {
            [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
            [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
          };
    
          EVENT_PARAMETER_1={
            [app.GridCells.PRC_EVENT_TYPE_FK]:commonLocators.CommonKeys.DESIGN_READY,
            [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END,
            [app.GridCells.END_BASIS]:commonLocators.CommonKeys.BEFORE_SYSTEM_EVENT
           
        }
        EVENT_PARAMETER_2={
          [app.GridCells.PRC_EVENT_TYPE_FK]:commonLocators.CommonKeys.TENDERING,
            [app.GridCells.START_BASIS]:commonLocators.CommonKeys.BEFORE_EVENT_END,
            [app.GridCells.END_BASIS]:commonLocators.CommonKeys.BEFORE_SYSTEM_EVENT
      }
        })
          cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  })
          after(() => {
            cy.LOGOUT();
        });
  it('TC - Precondition to create events in procurement structure',function(){

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);

    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
     
    });
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
    _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,commonLocators.CommonKeys.MATERIAL)
    cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL
    _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
    _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)

    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.EVENT, app.FooterTab.EVENT, 0);
    });
    _common.waitForLoaderToDisappear()
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.EVENT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        
        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.EVENT)
        _procurementPage.enterRecord_toCreateNewEvent(cnt.uuid.EVENT,EVENT_PARAMETER_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
           
  })

  it('TC - Create New Project and pinned it',function(){

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

    	_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
			cy.SAVE()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
      _common.waitForLoaderToDisappear()
  })

  it('TC - Create new schedule header and activity structure', function () {
    
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.setDefaultView(app.TabBar.SCHEDULING)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULING)
    });
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
    _common.create_newRecord(cnt.uuid.SCHEDULES)
    _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCH_PARAMETERS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.waitForLoaderToDisappear()
        _common.setDefaultView(app.TabBar.PLANNING,commonLocators.CommonKeys.DEFAULT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_SCHEDULING_ACTIVITY)
    });
    _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACT_DESC, CONTAINERS_SCHEDULING_ACTIVITY.QUANTITY, CONTAINERS_SCHEDULING_ACTIVITY.UOM,PLANNED_START,PLANNED_FINISH)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
})

  it('TC - Create new estimate', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
      _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
    _common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);

  });

  it('TC - Add line item ', function () {   
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
    
    _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PSD_ACTIVITY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,SCH_ACT_DESC)
    cy.SAVE();
		_common.waitForLoaderToDisappear()
  });

  it('TC - Assign resource to the line item', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES);
		});
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
    _package.get_qtyTotal_ofResources()
  });

  it('TC - Create material package', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_package.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION);
    _common.waitForLoaderToDisappear()
  
    _common.openTab(app.TabBar.PACKAGE).then(function(){
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
    });

    _common.clear_subContainerFilter(cnt.uuid.PACKAGE);
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.PACKAGE)
    _common.waitForLoaderToDisappear()
    _common.getTextfromCell(cnt.uuid.PACKAGE,app.GridCells.CODE)

    _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE,app.GridCells.STRUCTURE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"M")
    _common.waitForLoaderToDisappear()
    _common.clickOn_activeRowCell(cnt.uuid.PACKAGE,app.GridCells.DESCRIPTION)
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait
    _common.clickOn_modalFooterButton(btn.ButtonText.YES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Update procurement schedule', function () {
  
    _common.openTab(app.TabBar.PACKAGE).then(function(){
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
    });
    _common.maximizeContainer(cnt.uuid.PACKAGE);
    _common.enterRecord_inNewRow(cnt.uuid.PACKAGE,app.GridCells.PLANNED_START,app.InputFields.INPUT_GROUP_CONTENT,PLANNED_START)
    _common.enterRecord_inNewRow(cnt.uuid.PACKAGE,app.GridCells.PLANNED_END,app.InputFields.INPUT_GROUP_CONTENT,PLANNED_FINISH)
    cy.SAVE()    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_SCHEUDLING);

    _common.findRadio_byLabel_fromModal(CommonLocators.CommonLabels.UPDATE_PROCUREMENT_SCHEUDLE_FOR_CURRENT_PACKAGE,CommonLocators.CommonKeys.RADIO,0,CommonLocators.CommonElements.RADIO_SPACE_TO_UP)
    
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    cy.wait(2000) //This wait is require to load a message in modal
    _common.waitForLoaderToDisappear()
    _modalView.findModal().goToButton();
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PLANNING).then(function(){
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE,CONTAINER_COLUMNS_SCHEDULING_ACTIVITY)
    }); 
    cy.wait(1000)   
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE, Cypress.env("Text"))   
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_START,PLANNED_START)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_FINISH,PLANNED_FINISH)
    cy.SAVE()
  })
  it('TC- Verify schedule type in schedule',function(){
   
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
           
    });
    _common.search_inSubContainer(cnt.uuid.SCHEDULES,CommonLocators.CommonLabels.PROCUREMENT_SCHEDULE)
    _common.select_rowInSubContainer(cnt.uuid.SCHEDULES)
   
    _common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULES,app.GridCells.SCHEDULE_TYPE_FK,CommonLocators.CommonLabels.PROCUREMENT_SCHEDULE)
  })

  it('TC- Verify Events in Schedule',function(){
   
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    _common.openTab(app.TabBar.PACKAGE).then(function(){
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);      
    });
   

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.EVALUATE_EVENTS);
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    cy.wait(1000)//required wait
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);  
    cy.wait(1000)//required wait
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2);
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_EVENT)
    });
  
            
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_SCHEUDLING);
    _common.findRadio_byLabel_fromModal(CommonLocators.CommonLabels.UPDATE_PROCUREMENT_SCHEUDLE_FOR_CURRENT_PACKAGE,CommonLocators.CommonKeys.RADIO,0,CommonLocators.CommonElements.RADIO_SPACE_TO_UP)
    
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    cy.wait(2000)
    _common.waitForLoaderToDisappear()
    _modalView.findModal().goToButton();
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);           
    });
   _common.select_rowInContainer(cnt.uuid.SCHEDULES)
    _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 2);
            
    });
    _common.clickOn_cellHasValue(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION,SCH_ACT_DESC)
    
    

    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULING_EVENTS, app.FooterTab.EVENTS, 2);
            
    });
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULING_EVENTS)
    _common.search_inSubContainer(cnt.uuid.SCHEDULING_EVENTS,commonLocators.CommonKeys.DESIGN_READY)
    _common.select_rowInSubContainer(cnt.uuid.SCHEDULING_EVENTS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.DESIGN_READY)
    _common.getText_fromCell(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DATE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("DesignDate", $ele1.text())
    })
   
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULING_EVENTS)
    _common.search_inSubContainer(cnt.uuid.SCHEDULING_EVENTS,commonLocators.CommonKeys.TENDERING)
    _common.select_rowInSubContainer(cnt.uuid.SCHEDULING_EVENTS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DESCRIPTION,commonLocators.CommonKeys.TENDERING)
    _common.getText_fromCell(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DATE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("TenderingDate", $ele1.text())
    })
   

  })
  it('TC- Verify update event for current package from sheduling option',function(){
    
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
    _common.openTab(app.TabBar.PACKAGE).then(function(){
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_SCHEUDLING);
    _common.findRadio_byLabel_fromModal(CommonLocators.CommonLabels.UPDATE_EVENTS_FOR_CURRENT_PACKAGE_FROM_SCHEUDLE,CommonLocators.CommonKeys.RADIO,0,CommonLocators.CommonElements.RADIO_SPACE_TO_UP)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _common.openTab(app.TabBar.PACKAGE).then(function(){
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_EVENT, app.FooterTab.PROCUREMENT_EVENTS, 2);
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_EVENT)
    });
    cy.REFRESH_CONTAINER()
    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_EVENT,commonLocators.CommonKeys.DESIGN_READY)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE,Cypress.env("DesignDate"))
    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_EVENT,commonLocators.CommonKeys.TENDERING)
    cy.wait(500)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENT_EVENT,app.GridCells.START_OVERTWRITE,Cypress.env("TenderingDate"))
  })
 
});

