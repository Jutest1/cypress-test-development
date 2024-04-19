import { _common,  _sidebar, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = "LINE_ITEM-DESC_1-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS_1: DataCells
let RFQ_PARAMETERS:DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_RFQ;


let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;

let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.35 | Create RFQ directly from Package module");

describe("PCM- 2.35 | Create RFQ directly from Package module", () => {
    before(function () {
                cy.fixture('pcm/pcm-2.35.create-RFQ-directly-from-ackage-module.json').then((data) => {
                    this.data = data;
                    CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                    CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                    CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
                    CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
                    CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                    CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                    
                    CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                    CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE

                    ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                      }
                    
                    LINE_ITEM_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
                      },
                      
                    LINE_ITEM_PARAMETERS_1 = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
                      };
                      
                    RESOURCE_PARAMETERS = {
                        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
                      }
                    RFQ_PARAMETERS = {
                        [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_RFQ.BP]
                    };
        
                });
        
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
        
    after(() => {
                cy.LOGOUT();
    });
   
    it('TC - Create new estimate record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATE)
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC -  Create New Line Item Record", function () {
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
     
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
                _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION_1)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.perform_additionOfCellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL)
    });


    it("TC - Create material package and verify netvalue with line item cost total", function () {
       
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
       _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1);
            _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_TOTALS)
            cy.wait(2000).then(() => {
                _common.select_rowHasValue(cnt.uuid.TOTALS, "Total")
                _common.waitForLoaderToDisappear()
                _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env("AdditionOfColumnValues").toString())
            })
        })
    });
    it("TC - Create RFQ and verify netvalue with line item cost total", function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_RFQ);
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETERS);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 1);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.RFQ_TOTALS, CONTAINER_COLUMNS_TOTALS)
            _common.waitForLoaderToDisappear()
            _common.select_rowHasValue(cnt.uuid.RFQ_TOTALS, "Total")
            _common.waitForLoaderToDisappear()
            _common.assert_forNumericValues(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env("AdditionOfColumnValues").toString())
        })
    });
});