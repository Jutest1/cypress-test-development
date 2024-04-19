import { tile, app, cnt,btn,commonLocators,sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _schedulePage, _wipPage, _validate } from "cypress/pages";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const SCH_CODE ="SCH_CODE-" + Cypress._.random(0, 999);


const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);

let SCHEDULE_ACTIVITY_PARAMETERS: DataCells;
let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS:DataCells;
let RESOURCE_PARAMETER:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCES
let CONTAINERS_RESOURCES
let CONTAINER_COLUMNS_ACTIVITIES;
let GENERATE_LINE_ITEMS_PARAMETERS
let CONTAINER_COLUMNS_PROGRESS
let CONTAINERS_PROGRESS
let CONTAINERS_BID
let CONTAINER_COLUMNS_WIP_LINE_ITEM

allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 2.16 | Update wip quantity from schedule and estimate");

describe("SAM- 2.16 | Update wip quantity from schedule and estimate", () => {
        before(function () {
          cy.fixture("sam/sam-2.16-update-wip-quantity-from-schedule-and-estimate.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_ACTIVITIES=this.data.CONTAINER_COLUMNS.ACTIVITIES;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE;
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            CONTAINER_COLUMNS_RESOURCES=this.data.CONTAINER_COLUMNS.RESOURCES
            CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES
            CONTAINERS_BID= this.data.CONTAINERS.BID
            CONTAINER_COLUMNS_WIP_LINE_ITEM = this.data.CONTAINER_COLUMNS.WIP_LINE_ITEM

            CONTAINER_COLUMNS_PROGRESS=this.data.CONTAINER_COLUMNS.PROGRESS
            CONTAINERS_PROGRESS= this.data.CONTAINERS.PROGRESS

                  ESTIMATE_PARAMETERS = {
                              [app.GridCells.CODE]: ESTIMATE_CODE,
                              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                  }
                  SCHEDULE_PARAMETERS = {
                              [app.GridCells.CODE]: SCHEDULES_CODE,
                              [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
                  };
                   SCHEDULE_ACTIVITY_PARAMETERS = {
                              [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC,
                              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
                              [app.GridCells.PLANNED_START]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
                              [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,5),
                  };
                  CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
                  CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
                 

                  GENERATE_LINE_ITEMS_PARAMETERS={
                    [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                    [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:SCHEDULES_DESC             
                  }

                  RESOURCE_PARAMETER= {
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
                    [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
                  } 
            

        }).then(()=>{
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
          });
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();    
      })
      })
        after(() => {
          cy.LOGOUT();
        });

        
    it("TC - Create new schedule header and activity record.", function () {
     
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.SCHEDULING).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
         });
         _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);

        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
            })
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE)   
        
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROGRESS_REPORT_HISTORY, app.FooterTab.PROGRESS_REPORT)
        _common.setup_gridLayout(cnt.uuid.PROGRESS_REPORT_HISTORY,CONTAINER_COLUMNS_PROGRESS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROGRESS_REPORT_HISTORY);
        _common.create_newRecord(cnt.uuid.PROGRESS_REPORT_HISTORY)
        _common.enterRecord_inNewRow(cnt.uuid.PROGRESS_REPORT_HISTORY,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_PROGRESS.DESC)
        _common.enterRecord_inNewRow(cnt.uuid.PROGRESS_REPORT_HISTORY,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROGRESS.QUANTITY)
        cy.SAVE()
       _common.waitForLoaderToDisappear()
       

    });
    it("TC - Create new estimate header record", function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT); 
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
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

    });
    it("TC - Generate line item and assign activity to it", function () {
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.estqtyrelactfk], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,Sidebar.SideBarOptions.GENERATE_LINE_ITEMS)

        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS)
        cy.REFRESH_SELECTED_ENTITIES()

        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK,commonLocators.CommonKeys.SPAN,CONTAINERS_LINE_ITEM.ACT_RELATION)
        cy.SAVE()
       
    });
    it("TC - Assign resource to line item", function () {

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)   
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETER);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

    });
    it("TC - Create new sales bid", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
       
        _bidPage.createBidRecord_byWizardOptions("ByActivity", CONTAINERS_BID.DESC, CONTAINERS_BID.BP, CONTAINERS_BID.SOURCE_LEAD);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _salesPage.select_codeFieldofRow(cnt.uuid.BIDS)
        _bidPage.changeStatus_BidRecord();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create sales contract using wizard option", function () {
       

        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS,0);
            _common.waitForLoaderToDisappear()
          })
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
         
          _common.clickOn_modalFooterButton(btn.ButtonText.OK)
          _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT) 
          _common.waitForLoaderToDisappear()
        _saleContractPage.changeStatus_ContractRecord()
        _common.waitForLoaderToDisappear()
       
    });
    it("TC - Create new WIP", function () {
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
        
        _wipPage.create_WIPfrom_Wizard("Create WIP")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
        })
        _common.clear_subContainerFilter(cnt.uuid.BOQ_WIP)
        _common.select_dataFromSubContainer(cnt.uuid.BOQ_WIP,SCHEDULES_DESC )

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_WIP_QUANTITIES)
        
    });
    it("TC - Update and verify wip quantities", function () {
       
        _wipPage.update_wipQuantities_FromWizard()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE)
        })
        _common.select_dataFromSubContainer(cnt.uuid.BOQ_STRUCTUREWIP,ACTIVITY_STRUCTURE_DESC);
        _common.waitForLoaderToDisappear()
      
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,CONTAINERS_PROGRESS.QUANTITY)

    });
    it("TC - Verify IQ quantity in line item", function () {
    
        
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP_LINE_ITEMS, app.FooterTab.LINE_ITEMS)
            _common.setup_gridLayout(cnt.uuid.WIP_LINE_ITEMS,CONTAINER_COLUMNS_WIP_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_WIP_LINE_ITEM.liquantity],cnt.uuid.WIP_LINE_ITEMS)
        })
        _common.waitForLoaderToDisappear()
 

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
            })
           
            _common.select_dataFromSubContainer(cnt.uuid.BOQ_WIP,SCHEDULES_DESC )

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE)
        })
        _common.select_dataFromSubContainer(cnt.uuid.BOQ_STRUCTUREWIP,SCHEDULES_DESC);
        _common.waitForLoaderToDisappear()
 
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP_LINE_ITEMS, app.FooterTab.LINE_ITEMS)
        })
       _common.maximizeContainer(cnt.uuid.WIP_LINE_ITEMS)
        _common.select_rowInContainer(cnt.uuid.WIP_LINE_ITEMS)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordEntered(cnt.uuid.WIP_LINE_ITEMS,app.GridCells.LI_QUANTITY,CONTAINERS_PROGRESS.QUANTITY)
        
        _common.minimizeContainer(cnt.uuid.WIP_LINE_ITEMS)
        
    });
    
})
