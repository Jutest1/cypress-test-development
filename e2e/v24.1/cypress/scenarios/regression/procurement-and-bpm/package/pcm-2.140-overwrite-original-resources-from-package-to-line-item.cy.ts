import { _common,  _sidebar,_controllingUnit, _rfqPage,_materialPage,_projectPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC2-" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-N1" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells,CONTROLLING_UNIT_PARAMETERS:DataCells
let RESOURCE_PARAMETERS: DataCells,REQUEST_FOR_QUOTE_PARAMETERS;
let LINE_ITEM_PARAMETERS: DataCells,LINE_ITEM_PARAMETERS1:DataCells,PROJECTS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS1:DataCells




let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;


let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM,CONTAINERS_RFQ
let CONTAINER_COLUMNS_RESOURCE,CONTAINER_COLUMNS_QUOTE
let CONTAINER_COLUMNS_TOTALS,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_ROLES,CONTAINERS_UPDATE_ITEM_PRICE
let CONTAINER_COLUMNS_PACKAGE,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINERS_CONTROLLING_UNIT,CONTAINER_COLUMNS_REQUISITION,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE

const ESTDECP = "ESTDECP-" + Cypress._.random(0, 999);
const ESTCODE = "ESTCODE-" + Cypress._.random(0, 999);


const UPDATED_ITEM_PRICE = Cypress._.random(0, 99)+".00";

const Quotationcode = "Quotationcode"

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.140 | Overwrite original resources from package to line item")

describe("PCM- 2.140 | Overwrite original resources from package to line item", () => {
            before(function () {
                cy.fixture('pcm/pcm-2.140-overwrite-original-resources-from-package-to-line-item.json').then((data) => {
                    this.data = data;
                    CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                    CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                   
                    CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
                    CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                    CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                    
                    CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                    CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                    CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
                    CONTAINERS_RFQ = this.data.CONTAINERS.RFQ
                    CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                    CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
                    CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
                    CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
                    CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                    CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
                    CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_ROLES=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE_ROLES
                    CONTAINERS_UPDATE_ITEM_PRICE = this.data.CONTAINERS.UPDATE_ITEM_PRICE
                    CONTAINER_COLUMNS_QUOTE=this.data.CONTAINER_COLUMNS.QUOTE

                    PROJECTS_PARAMETERS = {
                      [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                      [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                      [commonLocators.CommonLabels.CLERK]: CLERK
                  }
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
                  
                      LINE_ITEM_PARAMETERS1 = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
                      },
                     
                    RESOURCE_PARAMETERS = {
                        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                        [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE
                      }
                      
                      CONTROLLING_UNIT_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                        [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
                      }
                      REQUEST_FOR_QUOTE_PARAMETERS = {
                        [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINERS_RFQ.BP],
                      }
                     
                });
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
            
        
    });
   
    after(() => {
        cy.LOGOUT();
      });

    it("TC - Create new project adding controlling unit to project", function () { 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        
        _common.openTab(app.TabBar.PROJECT).then(() => {
           _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
        })
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
      
      
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
            _common.waitForLoaderToDisappear()
    });

    it("TC - Create new Estimate and line items ", function () {
       _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
  
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()

    });

    it("TC - Add Resource for selected line item", function () {
       _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES,3);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
      _common.create_newRecord(cnt.uuid.RESOURCES)
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()


    });

    it("TC - Create Material Package from Estimate", function () {

    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
     _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
     cy.SAVE();
     _common.waitForLoaderToDisappear()
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
     _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
     _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        });
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _package.edit_ProcurementStructureUnderPackage("Material")
       
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
    _package.changeStatus_ofPackage_inWizard()

    });

    it('TC - Create requisition from Package', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)

        _common.openTab(app.TabBar.MAIN).then(()=>{
          _common.setDefaultView(app.TabBar.MAIN)
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);

    });
    it('TC - Create Request For Quote from wizard and change status', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);

         _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            //_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, reqColumn)
        })
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()

    });
    it('TC - Create Quote by adding new record', function () {
       
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP], [commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.setDefaultView(app.TabBar.QUOTES)
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES)
        _common.saveCellDataToEnv(cnt.uuid.QUOTES,app.GridCells.CODE,Quotationcode)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0)
            
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, UPDATED_ITEM_PRICE)
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT,UPDATED_ITEM_PRICE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update Estimate", function () {
       
        let checkboxLabelName = new Map<string, string>();
        checkboxLabelName.set("Linked Material Item", "checked");
        checkboxLabelName.set("Create new Line Item for new Material Item", "unchecked");
        
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 1)
            _common.maximizeContainer(cnt.uuid.QUOTES)
            _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, "Package")
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.select_tabFromFooter(cnt.uuid.PACKAGEESTIMATELINEITEM, app.FooterTab.ESTIMATELINEITEM, 2)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ITEM_PRICE);
        _package.doUpdate_Item_price_wizardOption(CONTAINERS_UPDATE_ITEM_PRICE.LABEL1, CONTAINERS_UPDATE_ITEM_PRICE.PRICE_VERSION, CONTAINERS_UPDATE_ITEM_PRICE.CHECKBOX, Cypress.env("Quotationcode"))
        cy.SAVE()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2)
        })
        cy.wait(500).then(() => {
            _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
            _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL, UPDATED_ITEM_PRICE)

        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        
      
        _estimatePage.openModalContainerByDownArrow();
        _estimatePage.update_estimate_fromWizard(checkboxLabelName);
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _modalView.findModal().acceptButton(btn.ButtonText.OK);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEESTIMATELINEITEM, app.FooterTab.ESTIMATELINEITEM, 2)
        })
     _common.select_rowInContainer(cnt.uuid.PACKAGEESTIMATELINEITEM)
        cy.wait(500).then(() => {
            _common.maximizeContainer(cnt.uuid.PACKAGEESTIMATELINEITEM)
            _common.goToModule_inActiveRow(cnt.uuid.PACKAGEESTIMATELINEITEM,app.GridCells.CODE, btn.ButtonText.GO_TO_ESTIMATE_LINE_ITEM)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 4);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, UPDATED_ITEM_PRICE)

        })

    })
})