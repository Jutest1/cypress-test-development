import { _common,  _sidebar,_projectPage,_package,_procurementPage,_procurementContractPage,_controllingUnit, _materialPage,_procurementConfig,_rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
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
let PLANNED_START
let PLANNED_FINISH

const MATERIALCatalog_CODE = "Material-" + Cypress._.random(0, 999);
const Code = "MATERIAL-" + Cypress._.random(0, 999);
const ContractNo = "ContractNo env"
const CHNAGE_DESC = "CHANGEDESC-" + Cypress._.random(0, 999);

const ORDERCHANGEDESC = "ORDERCHANGEDESC-" + Cypress._.random(0, 999);
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
const MATERIALCatalog_DESC = "Benstock" + Cypress._.random(0, 999);


const CODE = "1" + Cypress._.random(0, 999);
const DESCRIPTION = "Desc1" + Cypress._.random(0, 999);


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.53 | Update existing material catalogue when attributed details are added changed")
describe("PCM- 2.53 | Update existing material catalogue when attributed details are added changed", () => {
            before(function () {
                cy.fixture('pcm/pcm-2.53-update-existing-material-catalogue-when-attributed-details-are-added-changed.json').then((data) => {
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

                          PLANNED_START=_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
                          PLANNED_FINISH=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5)
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
                               [app.GridCells.VALID_FROM]: PLANNED_START,
                               [app.GridCells.VALID_TO]: PLANNED_FINISH,
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

    it("TC - Update existing material catalogue when attributed details are added/changed", function () {
       
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        cy.REFRESH_CONTAINER();
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, "001");
     
        _common.edit_containerCell(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT, PLANNED_START)
        _common.edit_containerCell(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.VALID_TO,app.InputFields.INPUT_GROUP_CONTENT, PLANNED_FINISH)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG.BP)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_FI_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG.PT_FI)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_AD_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG.PT_AD)
        _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.MATERIAL_CATALOG_TYPE_FK, commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.NEUTRAL_MATERIAL)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
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

    it('TC -Verify no any record in items container, it should not allow to use wizard', function () {
        
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER();

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
        _materialPage.enterRecord_toCreateContract(CONTAINERS_CONTRACT.BP2)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CODE,"ContractNo.")
      
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
        _validate.verify_WizardMessage("There is no material item existed, please check again!")
    });

    it('TC - Verify After wizard,the contract will be set to selected contract id', function () {
    
       
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
     
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
     
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,CONTAINERS_CONTRACT.BP2)
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

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)

        _materialPage.createUpdate_frameworkMaterialCatelog_fromWizard("New Catalog", CODE, DESCRIPTION,commonLocators.CommonKeys.NEUTRAL_MATERIAL, commonLocators.CommonKeys.NEUTRAL_MATERIAL)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 2)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CON_HEADER_FK, Cypress.env("ContractNo."));//ITEMS_CONTRACTS
            _common.getText_fromCell(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("MaterialCatalogDesc", $ele1.text())
            })
        })
    });

    it('TC - Verify Update wizard, it will create a new material and update exist material and catalog;', function () {
       
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
     _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 2)

        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, Cypress.env("MaterialCatalogDesc"))//Cypress.env("MaterialCatalogDesc")
        cy.wait(2000);
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        cy.wait(2000)
        _common.openTab(app.TabBar.DETAILSMATERIAL) //this step add for workaround 
        _common.openTab(app.TabBar.RECORDS)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
            _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,  CONTAINERS_RESOURCE.CODE)
            _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CODE,  CONTAINERS_RESOURCE.CODE);
        })
    });

    it('TC - Verify select existed catalog, code is mandatory and a lookup ', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _estimatePage.enterRecord_toCreateNewContract(CONTAINERS_CONTRACT.BP1, COUNTUNIT, null, cnt.uuid.PROCUREMENTCONTRACT)
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.MATERIAL_CATALOG_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT.BP2)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
        });
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
        _estimatePage.enterRecord_toCreateNewOrderItem( CONTAINERS_RESOURCE.CODE, CONTAINERS_RESOURCE.quantity, cnt.uuid.ITEMSCONTRACT)
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
        _materialPage.createUpdate_frameworkExistedCatalogMaterialCatelog_fromWizard("Existed Catalog",CONTAINERS_CONTRACT.BP2)
        _common.waitForLoaderToDisappear()

    });

    it('TC -Verify PES variance wizard option set from modules', function () {

        cy.GO_TO_HOME_PAGE();
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MODULES);
        _common.waitForLoaderToDisappear()
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

    it('TC -Verify If select contract is change order, it should not allow to use wizard', function () {

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
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,CONTAINERS_CONTRACT.BP)
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("ContractNum", $ele1.text())
        cy.log(Cypress.env("ContractNum."))
        _common.waitForLoaderToDisappear()
       _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,COUNTUNIT)
       _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, "HS")
        _common.waitForLoaderToDisappear()
       
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

           _common.openTab(app.TabBar.CONTRACT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
                _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACT_ITEM);
                _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
                _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, CONTAINERS_RESOURCE.CODE)
                _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY)
                cy.wait(2000)
                _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
                cy.SAVE();
                cy.wait(2000)
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
            _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)

            _common.openTab(app.TabBar.CONTRACT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            })
            _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, "HS")
            cy.SAVE()
            _common.waitForLoaderToDisappear()


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
            cy.wait(1000)
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2);
           
        })
          
        cy.wait(2000)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            cy.wait(1000)
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
       
       _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.MDC_MATERIAL_FK)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       
        cy.wait(1000)//required wait
        _common.search_inSubContainer(cnt.uuid.ITEMS, CONTAINERS_PES_ITEM.MATERIAL_NO)
        _common.minimizeContainer(cnt.uuid.ITEMS)
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
        _common.waitForLoaderToDisappear()
        _validate.verify_WizardMessage("It's ChangeOrder, please select other contract.")
        _common.waitForLoaderToDisappear()
        });
    });
    it('TC - Verify contract had been reference by other contract, it should not allow to wizard', function () {

        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.clickOn_cellHasValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS, commonLocators.CommonKeys.PURCHASE_ORDER)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
        _common.waitForLoaderToDisappear()
        _validate.verify_WizardMessage("It has been referenced by other contracts, please select other contract.")
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify If select contract is call off order, it should not allow to use wizard', function () {
      
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _estimatePage.enterRecord_toCreateNewContract(CONTAINERS_CONTRACT.BP1, COUNTUNIT, null, cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTRACT_HEADER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("ContractNum"))
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG)
        _common.waitForLoaderToDisappear()
        _validate.verify_WizardMessage("It's CallOff, please select other contract.")
        _common.waitForLoaderToDisappear()
    });
});









