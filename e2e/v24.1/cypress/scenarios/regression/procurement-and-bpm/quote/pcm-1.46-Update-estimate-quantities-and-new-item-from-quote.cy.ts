import { _common,  _sidebar,_projectPage,_boqPage,_package, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------


const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const RFQ_DESC = "RFQ_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-" + Cypress._.random(0, 999);
const BoQS_DESC2 = "LI2-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);



var reqCode: string;
var rfqCode: string;

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    ESTIMATE_PARAMETERS: DataCells,
    GENERATE_LINE_ITEMS_PARAMETERS: DataCells,
    RESOURCE_PARAMETERS: DataCells,
    RFQ_PARAMETERS:DataCells,
    PROJECTS_PARAMETERS:DataCells,
    UPDATE_ESTIMATE_PARAMETER:DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_ESTIMATE,
    CONTAINER_COLUMNS_ESTIMATE,
    CONTAINER_PACKAGE,
    CONTAINER_COLUMNS_PACKAGE,
    CONTAINER_COLUMNS_REQUISITION,
    MODAL_UPDATE_BOQ_PACKAGE,
    CONTAINERS_PACKAGE_BOQ,
    CONTAINER_COLUMNS_PACKAGE_BOQ,
    CONTAINER_COLUMNS_RESOURCE,
    CONTAINERS_RESOURCE,
    CONTAINERS_BIDDER,
    CONTAINER_COLUMNS_RFQ,
    CONTAINER_COLUMNS_QUOTE,
    CONTAINER_COLUMNS_BIDDER,MODAL_UPDATE_ESTIMATE,
    MODAL_UPDATE_ESTIMATE_WIZARD

allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM 1.46 | Update estimate quantities & new item from quote")

describe("PCM 1.46 | Update estimate quantities & new item from quote", () => {

            before(function () {
                cy.fixture('pcm/pcm-1.46-Update-estimate-quantities-and-new-item-from-quote.json').then((data) => {
                  this.data = data;
                  CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
                  CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
                  CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                  CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                  CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                  CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
                  CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
                  CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                  MODAL_UPDATE_BOQ_PACKAGE = this.data.MODAL.UPDATE_BOQ_PACKAGE
                  MODAL_UPDATE_ESTIMATE= this.data.MODAL.UPDATE_ESTIMATE
                  CONTAINERS_PACKAGE_BOQ = this.data.CONTAINERS.PACKAGE_BOQ
                  CONTAINER_COLUMNS_PACKAGE_BOQ = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ
                  CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                  CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                  CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER;
                  CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
                  CONTAINER_COLUMNS_QUOTE = this.data.CONTAINER_COLUMNS.QUOTE
                  CONTAINER_COLUMNS_BIDDER= this.data.CONTAINER_COLUMNS.BIDDER
                  MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD
                  PROJECTS_PARAMETERS={
                    [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]:CLERK_NAME
                }

                
                  ESTIMATE_PARAMETERS = {
                      [app.GridCells.CODE]: EST_CODE,
                      [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                      [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                      [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                  }
                  BOQ_PARAMETERS = {
                      [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
                  }
                  BOQ_STRUCTURE_PARAMETERS = {
                      [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                      [app.GridCells.BRIEF_INFO_SMALL]: BOQSTRUCT_DESC,
                      [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.BOQ_STR_QUANTITY,
                      [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                      [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
                  }
                  GENERATE_LINE_ITEMS_PARAMETERS = {
                      [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                      [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
                  }
                  RESOURCE_PARAMETERS = {
                      [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                      [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
                  }
                  RFQ_PARAMETERS = {
                    [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_BIDDER.BP]
                };

                UPDATE_ESTIMATE_PARAMETER={
                    [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ESTIMATE_WIZARD
                  }
                  });
              cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.waitForLoaderToDisappear()
    });
    after(() => {
		cy.LOGOUT();
	});
    it("TC - Create New Project", function () {
       
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

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _boqPage.get_BoQsFinalPrice()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    });

    it("TC - Create estimate header", function () {

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        cy.wait(1000) //required wait to load page
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });
    it("TC - Generate BOQ line item and create Resource", function () {
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create BoQ Package from the Estimate", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        cy.wait(1000) //required wait to load page
        _package.enterRecord_toCreateBoQPackage_FromWizard(CONTAINER_PACKAGE.BOQ, CONTAINER_PACKAGE.ESTIMATE_SCOPE, CONTAINER_PACKAGE.GROUPING_STRUCTURE, CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE)
        _common.openTab(app.TabBar.PACKAGE).then(function () {
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        cy.wait(1000) //required wait to load page

    })

    it('TC - Create requisition from Package', function () {
       
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear(); 
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        cy.wait(1000) //required wait to load page

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($value) => {
            reqCode = $value.text()
            cy.log(reqCode)
        })
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);

    });
    it('TC - Create Request For Quote from wizard and change status', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE)
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETERS); 
        _common.waitForLoaderToDisappear(); 
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        cy.SAVE();
        _common.waitForLoaderToDisappear(); 
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.edit_containerCell(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQ_DESC)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.CODE).then(($value) => {
            rfqCode = $value.text()
            cy.log(rfqCode)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
        cy.SAVE();
        _common.waitForLoaderToDisappear(); 
    });
    it('TC - Create Quote by adding new record', function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _rfqPage.create_quote_fromWizard([CONTAINERS_BIDDER.BP],[commonLocators.CommonKeys.CHECK]);
        _common.waitForLoaderToDisappear(); 
      
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE);
        cy.SAVE();
        _common.waitForLoaderToDisappear(); 
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.setDefaultView(app.TabBar.QUOTES)
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
        })
        _common.openTab(app.TabBar.QUOTEBOQS).then(() => {
            _common.setDefaultView(app.TabBar.QUOTEBOQS)
            _common.select_tabFromFooter(cnt.uuid.QUOTEBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.QUOTEBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        })
        _common.clickOn_cellHasIcon(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.create_newRecord(cnt.uuid.QUOTEBOQSTRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BoQS_DESC2);
        _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,MODAL_UPDATE_ESTIMATE.QUANTITY)
        _common.edit_containerCell(cnt.uuid.QUOTEBOQSTRUCTURE,  app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT, MODAL_UPDATE_ESTIMATE.UNITRATE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.QUOTEBOQSTRUCTURE, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID,MODAL_UPDATE_ESTIMATE.UOM)
        cy.SAVE()
        _common.waitForLoaderToDisappear(); 
        cy.wait(1000)//required wait
    })

    it("TC - Update Estimate", function () {
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);

        _estimatePage.openModalContainerByDownArrow();
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
        _common.waitForLoaderToDisappear(); 
        cy.wait(1000)//required wait
        _modalView.findModal().acceptButton(btn.ButtonText.OK);

        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 1)
            _common.maximizeContainer(cnt.uuid.QUOTES)
            _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, "Package")
        })
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.select_tabFromFooter(cnt.uuid.PACKAGEESTIMATELINEITEM, app.FooterTab.ESTIMATELINEITEM, 2)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEESTIMATELINEITEM, app.GridCells.DESCRIPTION_INFO, BOQSTRUCT_DESC)
        cy.wait(500).then(() => {
            _common.maximizeContainer(cnt.uuid.PACKAGEESTIMATELINEITEM)
            _common.goToModule_inActiveRow(cnt.uuid.PACKAGEESTIMATELINEITEM,app.GridCells.CODE, btn.ButtonText.GO_TO_ESTIMATE_LINE_ITEM)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQS_DESC2)
        cy.SAVE()
        _common.waitForLoaderToDisappear(); 
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_UNIT, MODAL_UPDATE_ESTIMATE.UNITRATE)
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, MODAL_UPDATE_ESTIMATE.QUANTITY)
        })
    })
})