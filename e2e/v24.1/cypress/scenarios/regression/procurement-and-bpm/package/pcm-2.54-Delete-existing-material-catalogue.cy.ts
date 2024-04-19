import { _common, _estimatePage, _projectPage,_validate, _mainView, _boqPage, _bidPage,_materialPage, _saleContractPage, _modalView, _salesPage,_wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const MATERIALCatalog_CODE = "MATCATCODE-" + Cypress._.random(0, 999);
const MATCATDEC = "MATCATDEC-" + Cypress._.random(0, 999);
const MATERIALGROUP_CODE ="M-" + Cypress._.random(0, 999);
const MATERIALGROUP_DESC ="MG"+ Cypress._.random(0, 999);
const MATERIALGROUP_SUBCODE ="MS-" + Cypress._.random(0, 999);
const MATERIALGROUP_SUBDESC ="MGS"+ Cypress._.random(0, 999);

let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let MATERIAL_CATALOGS_PARAMETER:DataCells;
let MATERIAL_GROUP_PARAMETER_1: DataCells;
let MATERIAL_GROUP_PARAMETER_2: DataCells,MATERIAL_RECORD_PARAMETER:DataCells

let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP;
let CONTAINERS_MATERIAL_GROUP,CONTAINERS_MATERIAL_RECORD,CONTAINER_COLUMNS_CONTRACT


const MATERIALRECORD_CODE ="Material-" + Cypress._.random(0, 999);
const MATERIALRECORD_DESC ="AnsibleT"+ Cypress._.random(0, 999);



allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.54 | Delete existing material catalogue")

describe('PCM- 2.54 | Delete existing material catalogue', () => {

  before(function () {
      cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));

      cy.fixture("pcm/pcm-2.54-Delete-existing-material-catalogue.json").then((data) => {
        this.data = data
        CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
        CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
        CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
        CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;
        CONTAINERS_MATERIAL_RECORD= this.data.CONTAINERS.MATERIAL_RECORD
        CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
        
          MATERIAL_CATALOGS_PARAMETER ={
            [app.GridCells.CODE]:MATERIALCatalog_CODE,
            [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOG.BP_NAME,
            [app.GridCells.DESCRIPTION_INFO]:MATCATDEC  
        }
  
        MATERIAL_GROUP_PARAMETER_1 ={
          [app.GridCells.CODE]:MATERIALGROUP_CODE,
          [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_1,
          [app.GridCells.DESCRIPTION_INFO]:MATERIALGROUP_DESC  
      }
  
      MATERIAL_GROUP_PARAMETER_2 ={
        [app.GridCells.CODE]:MATERIALGROUP_SUBCODE,
        [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_2,
        [app.GridCells.DESCRIPTION_INFO]:MATERIALGROUP_SUBDESC  
    }

     MATERIAL_RECORD_PARAMETER={
      [app.GridCells.CODE]:MATERIALRECORD_CODE,
      [app.GridCells.DESCRIPTION_INFO_1]:MATERIALRECORD_DESC,
      [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM,
      [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE,
      [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE
  }
  });
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);
        cy.REFRESH_CONTAINER()
  });
  after(() => {
    cy.LOGOUT();
  });
  it('TC - Verify of Customizing module is supplier and is framework present', function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING);

    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.waitForLoaderToDisappear()
           
    })
    _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
    cy.REFRESH_CONTAINER();
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES,commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME,commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.NEUTRAL_MATERIAL);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create new material catalog', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);

    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
        _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_COLUMNS_MATERIAL_CATALOG)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
    _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
    _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
    cy.SAVE()   
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create new material group', function () {
   

    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS,app.FooterTab.MATERIALGROUP)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS,CONTAINER_COLUMNS_MATERIAL_GROUP)
    })  
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
    _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER_1);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newSubRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER_2);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Delete material group and verify if its deleted', function () {
    
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS,app.FooterTab.MATERIALGROUP)
      
    })  
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS, app.GridCells.CODE, MATERIALGROUP_SUBCODE)
    _common.delete_recordFromContainer(cnt.uuid.MATERIAL_GROUPS)
    cy.SAVE()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS, app.GridCells.CODE, MATERIALGROUP_CODE)
    _common.delete_recordFromContainer(cnt.uuid.MATERIAL_GROUPS)
    cy.SAVE()
    _validate.verify_isRecordDeleted(cnt.uuid.MATERIAL_GROUPS,CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_1)

  });
  it('TC - Delete material catalog and verify if its deleted', function () {

    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
        
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, MATERIALCatalog_CODE)
    _common.delete_recordFromContainer(cnt.uuid.MATERIAL_CATALOGS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecordDeleted(cnt.uuid.MATERIAL_CATALOGS, MATERIALCatalog_CODE)

  });
  it('TC - Create new material catalog and verify if its not deleted and get reference pop-up', function () {
  

    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
    _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
    _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
    cy.SAVE()   
    _common.waitForLoaderToDisappear()
    _common.getTextfromCell(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTRACT);

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    })
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
    cy.wait(500).then(() => {
      _estimatePage.enterRecord_toCreateNewContract(CONTAINERS_MATERIAL_CATALOG.BP_NAME, CONTAINERS_MATERIAL_CATALOG.CU, Cypress.env("Text"), cnt.uuid.PROCUREMENTCONTRACT)
    })
    cy.SAVE();

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);
    cy.wait(2000)//required wait
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS);
    cy.REFRESH_CONTAINER();
    cy.wait(500).then(() => {
      _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS, Cypress.env("Text"));
      _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, Cypress.env("Text"));
    })
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_CATALOGS,btn.IconButtons.ICO_REC_DELETE)
    _validate.verify_isRecord_DeletedfromMaterial(CONTAINERS_MATERIAL_CATALOG.MESSAGE)

  });
})