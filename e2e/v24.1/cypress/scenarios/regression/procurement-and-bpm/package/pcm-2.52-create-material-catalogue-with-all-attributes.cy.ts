import { _common,  _sidebar,_projectPage,_package,_procurementPage,_controllingUnit, _materialPage,_procurementConfig,_rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
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

let MATERIAL_CATALOGS_PARAMETER:DataCells,MATERIAL_SEARCH_PARAMETERS:DataCells
let PROJECTS_PARAMETERS:DataCells,CONTROLLING_UNIT_PARAMETERS:DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_PACKAGE_ITEM;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEMS
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEMS,CONTAINERS_CONTRACT,CONTAINERS_MATERIAL_CATALOG_FRAMEWORK
let CONTAINER_COLUMNS_PACKAGE_ITEM,CONTAINER_COLUMNS_CONTRACT_ITEM,CONTAINER_COLUMNS_CONTRACT,CONTAINERS_PES_ITEM
let CONTAINER_COLUMNS_RESOURCE,CONTAINER_COLUMNS_MATERIAL_CATALOG,CONTAINERS_MATERIAL_CATALOG,CONTAINER_COLUMNS_PES_ITEM
let CONTAINERS_CONTROLLING_UNIT,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINER_COLUMNS_DATA_RECORDS

const MATERIALCatalog_CODE = "Material-" + Cypress._.random(0, 999);
const Code = "MATERIAL-" + Cypress._.random(0, 999);
const ContractNo = "ContractNo env"
const CHNAGE_DESC = "CHANGEDESC-" + Cypress._.random(0, 999);

const ORDERCHANGEDESC = "ORDERCHANGEDESC-" + Cypress._.random(0, 999);
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
const MATERIALCatalog_DESC = "Benstock" + Cypress._.random(0, 999);


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.52 | Create material catalogue with all attributes")
describe("PCM- 2.52 | Create material catalogue with all attributes", () => {
    before(function () {
         cy.fixture('pcm/pcm-2.52-create-material-catalogue-with-all-attributes.json').then((data) => {
                  this.data = data;

                  CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                  CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
                 CONTAINERS_PACKAGE_ITEM = this.data.CONTAINERS.PACKAGE_ITEM;
                 CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS
                  CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
                 
                  CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
                  CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
                  CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
                  CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
                  
                  CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
                  CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
                  CONTAINER_COLUMNS_DATA_RECORDS=this.data.CONTAINER_COLUMNS.DATA_RECORDS
                  CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
                   CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
                   CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
                   CONTAINER_COLUMNS_CONTRACT_ITEM=this.data.CONTAINER_COLUMNS.CONTRACT_ITEM
                   CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
                   
                    CONTAINERS_PES_ITEM=this.data.CONTAINERS.PES_ITEM
                   CONTAINERS_MATERIAL_CATALOG_FRAMEWORK=this.data.CONTAINERS.MATERIAL_CATALOG_FRAMEWORK
                  
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
                      [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEMS.QUANTITY
                    },
                    
                 
                  RESOURCE_PARAMETERS = {
                      [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                      [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                     
                    }
                  
                
                    CONTROLLING_UNIT_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                        [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
                    };

                     MATERIAL_CATALOGS_PARAMETER={
                        [app.GridCells.CODE]:MATERIALCatalog_CODE,
                        [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BP,
                        [app.GridCells.PAYMENT_TERM_FI_FK]:CONTAINERS_MATERIAL_CATALOG.PT_FI,
                        [app.GridCells.PAYMENT_TERM_AD_FK]:CONTAINERS_MATERIAL_CATALOG.PT_AD,
                        [app.GridCells.DESCRIPTION_INFO]:MATERIALCatalog_DESC,
                        [app.GridCells.VALID_FROM]: CONTAINERS_MATERIAL_CATALOG.FROM,
                        [app.GridCells.VALID_TO]: CONTAINERS_MATERIAL_CATALOG.TO,
                        [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:commonLocators.CommonKeys.NEUTRAL_MATERIAL,
                    } 

                   
                  });
              cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.waitForLoaderToDisappear()
    });
after(() => {
		cy.LOGOUT();
	});
    

    it('TC - Verify of Customizing module is supplier and is framework present', function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
       
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.setDefaultView(app.TabBar.MASTERDATA,commonLocators.CommonKeys.DEFAULT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES,0)
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
        cy.REFRESH_CONTAINER();
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
        cy.SAVE();
        cy.wait(2000)//required wait
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS)
        });
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.NEUTRAL_MATERIAL);
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK)
        cy.SAVE();

    })

    it("TC - Create material catalogue with all attributes", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
    })

    it('TC -Verify Create CO contract from PES variance is present in modules wizard option', function () {
        
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MODULES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
          _common.openTab(app.TabBar.WIZARD).then(() => {
            _common.setDefaultView(app.TabBar.WIZARD,commonLocators.CommonKeys.DEFAULT)
            _common.clear_subContainerFilter(cnt.uuid.MODULES);
            _common.clear_subContainerFilter(cnt.uuid.WIZARD_GROUP);
            _common.clear_subContainerFilter(cnt.uuid.WIZARD_TO_GROUP);
        });
         _common.clear_subContainerFilter(cnt.uuid.MODULES);
        _common.clickOn_containerFooterButton(cnt.uuid.MODULES, commonLocators.CommonKeys.STATUS_BAR, btn.IconButtons.ICO_NEXT)
        _common.search_inSubContainer(cnt.uuid.MODULES, sidebar.SideBarOptions.PERFORMANCE_ENTERY_SHEET)

        _common.clickOn_cellHasValue(cnt.uuid.MODULES, app.GridCells.DESCRIPTION_INFO,sidebar.SideBarOptions.PERFORMANCE_ENTERY_SHEET)
        _common.waitForLoaderToDisappear()
        cy.wait(3000)//required wait
        _common.search_inSubContainer(cnt.uuid.WIZARD_GROUP, sidebar.SideBarOptions.PES)
        _common.clickOn_cellHasValue(cnt.uuid.WIZARD_GROUP, app.GridCells.NAME, sidebar.SideBarOptions.PES)
        _common.waitForLoaderToDisappear()
        cy.wait(3000)//required wait
        _common.search_inSubContainer(cnt.uuid.WIZARD_TO_GROUP, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FROM_PES_VARIANCE);
        _common.waitForLoaderToDisappear()
        cy.wait(3000)//required wait
        _procurementConfig.clickcheckbox_formcell(cnt.uuid.WIZARD_TO_GROUP)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        cy.SAVE();
    })

    it('TC -Verify Create project', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

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

    })
    it('TC -Verify Add controlling unit', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE( )
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,COUNTUNIT)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE, "CNTSUBCODE")
         cy.log(Cypress.env("CNTSUBCODE"))
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
    })
    it('TC -Verify Add Estimate Line item and resource', function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()

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
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
  });
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);

  _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
  _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
  cy.SAVE();
  _common.waitForLoaderToDisappear()

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

    it('TC -Verify Create Material Package', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
            cy.SAVE();
        _common.waitForLoaderToDisappear()
       
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
          _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      })
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
        _package.edit_ProcurementStructureUnderPackage("Material")
       
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
    _package.changeStatus_ofPackage_inWizard()

    })

    it('TC -Verify Create Contract', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("ContractNum", $ele1.text())
            cy.log(Cypress.env("ContractNum."))
            _common.waitForLoaderToDisappear()
           _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,COUNTUNIT)
           _common.waitForLoaderToDisappear() 
           cy.wait(2000)//required wait
            _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.CLERK)
            _common.waitForLoaderToDisappear()
            cy.wait(1000)//required wait
           
            _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
            cy.SAVE()
            _common.waitForLoaderToDisappear()

            _common.openTab(app.TabBar.CONTRACT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
                _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM);
                _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
                _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
                _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY)
                _common.waitForLoaderToDisappear()
                cy.wait(2000)//required wait
                _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
                cy.SAVE();
                _common.waitForLoaderToDisappear()
                cy.wait(2000)//required wait
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
            _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
            _common.openTab(app.TabBar.CONTRACT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            })
            _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.CLERK)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
           

        })
    })

    it('TC -Verify Create PES', function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
           
        })
    })

    it('TC -Verify Add items', function () {
       
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
           _common.setup_gridLayout(cnt.uuid.ITEMS,CONTAINER_COLUMNS_PES_ITEM)
           _common.set_columnAtTop([CONTAINER_COLUMNS_PES_ITEM.mdcmaterialfk,CONTAINER_COLUMNS_PES_ITEM.quantity,CONTAINER_COLUMNS_PES_ITEM.prcstructurefk],cnt.uuid.ITEMS)
        })
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        _common.create_newRecord(cnt.uuid.ITEMS)
        _common.lookUpButtonInCell(cnt.uuid.ITEMS,app.GridCells.PRC_STRUCTURE_FK,btn.IconButtons.ICO_INPUT_DELETE,0)
        _common.waitForLoaderToDisappear()
        _common.lookUpButtonInCell(cnt.uuid.ITEMS,app.GridCells.PRC_STRUCTURE_FK,btn.IconButtons.ICO_INPUT_DELETE,0)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.ITEMS,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PES_ITEM.MATERIAL_NO)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL)
        _common.edit_containerCell(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PES_ITEM.QUANTITY)
       _common.waitForLoaderToDisappear()
       _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.MDC_MATERIAL_FK)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       
        cy.wait(1000)//required wait
        _common.search_inSubContainer(cnt.uuid.ITEMS, CONTAINERS_PES_ITEM.MATERIAL_NO)
        _common.minimizeContainer(cnt.uuid.ITEMS)

    })

    it('TC -Verify If select contract is change order, it should not allow to use wizard', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM)

        _procurementPage.Change_Order_Contract_New_Item(PROJECT_NO, "Standard",CHNAGE_DESC, commonLocators.CommonKeys.DESIGN_CHANGE,
        commonLocators.CommonKeys.CHANGE_REQUEST, ORDERCHANGEDESC)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS,  commonLocators.CommonKeys.CHANGE_ORDER)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
        _validate.verify_WizardMessage("It's ChangeOrder, please select other contract.")
    });

    it('TC - Verify contract had been reference by other contract, it should not allow to wizard', function () {
      
        cy.REFRESH_CONTAINER();
        _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS, commonLocators.CommonKeys.PURCHASE_ORDER)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
       
        _validate.verify_WizardMessage("It has been referenced by other contracts, please select other contract.")
    });

    it("TC - Create Contract manually in cotract module", function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINERS_CONTRACT.BP1)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Verify Create/update material catalogue package", function () {
    
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
          
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,CONTAINERS_CONTRACT.BP1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _validate.verify_WizardMessage("There is no material item existed, please check again!")
    })

    it("TC - Create items", function () {
       
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS)
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM)
       
        })

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,CONTAINERS_CONTRACT.BP1)
        _common.select_rowInSubContainer(cnt.uuid.PROCUREMENTCONTRACT)

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS)
     })
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
        _common.waitForLoaderToDisappear()
        _common.lookUpButtonInCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.PRC_STRUCTURE_FK,btn.IconButtons.ICO_INPUT_DELETE,0)
        _common.waitForLoaderToDisappear()
        _common.lookUpButtonInCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.PRC_STRUCTURE_FK,btn.IconButtons.ICO_INPUT_DELETE,0)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.CODE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.PRC_STRUCTURE_FK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    })

    it("TC - Verify select new catalog all columns in ui become editable;", function () {
        
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, ContractNo)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
       
        _common.waitForLoaderToDisappear()
       
        _materialPage.createUpdate_frameworkMaterialCatelog_fromWizard("New Catalog", Code, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.DESC, commonLocators.CommonKeys.NEUTRAL_MATERIAL, commonLocators.CommonKeys.NEUTRAL_MATERIAL, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.FROM, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.TO, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.PT_FI, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.PT_AD, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.PT_PA, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.INCOTERM, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.RESPONSIBLE)
    })

    it("TC - Verify fields will get value from dialog setting", function () {
        
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIAL_CATALOGS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, Code)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.BAS_RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.NEUTRAL_MATERIAL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_FI_FK, CONTAINERS_MATERIAL_CATALOG_FRAMEWORK.PT_FI)
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
    })

    it("TC - Verify contract will be set to selected contract id", function () {
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CON_HEADER_FK, Cypress.env(ContractNo))
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
    })

    it("TC - Verify auto create material group and material", function () {
       
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
        })

        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, Code, 1)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, Code)

    })

    it("TC - Verify material group and material is correct", function () {
      
       _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALGROUPFILTER)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,CONTAINERS_RESOURCE.CODE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE)
    })

})

