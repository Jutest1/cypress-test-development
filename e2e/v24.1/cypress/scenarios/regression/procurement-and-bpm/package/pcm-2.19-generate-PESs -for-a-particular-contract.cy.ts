import { _common,  _sidebar,_projectPage,_salesPage,_package, _rfqPage,_mainView, _validate,_estimatePage, _modalView, _procurementPage } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC_" + Cypress._.random(0, 999);
const CLERK = "HS";


let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;

let PROJECTS_PARAMETERS:DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_PACKAGE_ITEM;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS,CONTAINERS_CONTRACT,CONTAINER_COLUMNS_CONTRACT,CONTAINERS_PES,CONTAINER_COLUMNS_PES,CONTAINER_COLUMNS_PES_ITEM


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.19 | Generate PES/s  for a particular contract")
describe("PCM- 2.19 | Generate PES/s  for a particular contract", () => {
        before(function () {
                cy.fixture('pcm/pcm-2.19-generate-PESs-for-a-particular-contract.json').then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_PACKAGE_ITEM = this.data.CONTAINERS.PACKAGE_ITEM;
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
             CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
           
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINERS_PES = this.data.CONTAINERS.PES;
            CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES
            CONTAINER_COLUMNS_PES_ITEM=this.data.CONTAINER_COLUMNS.PES_ITEM
            
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
              
           
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
               
              }
            });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.waitForLoaderToDisappear()
        
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Prerequisites - Add record in Billing Schema module', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);

        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonLabels.STANDARD_CUMULATIVE);
        _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS);
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BILLING_SCHEMA_DETAILS).findCell_ByIcon(app.GridCellIcons.ICO_RUBRIC_PES, 0);
        _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.ToolBar.ICO_TREE_EXPAND);
       _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS,app.GridCells.DESCRIPTION_INFO,"Construction")
        _common.create_newRecordInSubContainer_ifNoRecordExists(cnt.SubcontainerId.BILLING_SCHEMA_DETAILS, 1);
        cy.SAVE();
    })

    it('TC - Create new estimate and line item', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

        
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        
          _common.openTab(app.TabBar.ESTIMATE).then(() => {
              _common.setDefaultView(app.TabBar.ESTIMATE)
              _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
              _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
            });
            
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

    it('TC - Assign resource to the line item', function () {

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
         cy.SAVE();
        _common.waitForLoaderToDisappear()

    })

    it('TC - Create material package and change status of package', function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.SAVE();
    _common.waitForLoaderToDisappear()
   

    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
  })
  _common.waitForLoaderToDisappear()
  _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.CODE,"PackageCode")

  _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
    _common.waitForLoaderToDisappear()

    });


    it('TC - Create Contract from package and change contract status', function () {
       
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.RESPONSIBLE)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify it should check contract status is approve =true, then allow to create pes;', function () {
        
        cy.then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, commonLocators.CommonKeys.APPROVED)
        })
    })

    it('TC - Verify it should check con_header.mdc_controlingunit_fk is not null to create pes;', function () {

        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, null)
    })

    it('TC - Create PES and verify after wizard to create pes with quantity is 0', function () {     

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
        })
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEM)
        })
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.assert_forNumericValues(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, CONTAINERS_PES.qty)
        _package.verify_remainingQtyFromPESItems(CONTAINERS_PES.qty1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
    });

    it('TC - Verify after wizard to create pes, it should check relations of pes header contianer', function () {
       
        cy.then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS, app.GridCells.CLERK_PRC_FK, CONTAINERS_CONTRACT.RESPONSIBLE)
            _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_CONTRACT.BP)
        })
    })

    it('TC - Verify after wizard to create pes, the contact status should change to con_status.ispartnerdielivery=true;', function () {
       
        cy.then(() => {
            _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.HEADERS, "Contract")
            cy.wait(4000) //required wait
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, commonLocators.CommonKeys.PART_DELIVERED)
        })
    })

    it('TC - Create PES again and Verify remaining quantity from second PES item', function () {
       
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _modalView.findModal().findCheckBox_byLabel("Include non contracted item in previous PES", "checkbox")
            .click()
            _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEM)
        })
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _package.verify_remainingQtyFromPESItems(CONTAINERS_PES.qty2)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
        cy.REFRESH_CONTAINER()
        cy.wait(2000) //required wait
    });

    it('TC - Verify after wizard to create pes, the billing schema container should auto generate records', function () {

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 1);
        })
        _common.select_rowHasValue(cnt.uuid.PES_BILLING_SCHEMA, "Net Total")

    });
})