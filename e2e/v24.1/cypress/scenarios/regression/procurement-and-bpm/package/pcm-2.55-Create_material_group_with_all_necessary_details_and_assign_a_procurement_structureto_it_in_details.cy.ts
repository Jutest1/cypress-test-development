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
let CONTAINERS_MATERIAL_GROUP,CONTAINERS_MATERIAL_RECORD


const MATERIALRECORD_CODE ="Material-" + Cypress._.random(0, 999);
const MATERIALRECORD_DESC ="AnsibleT"+ Cypress._.random(0, 999);




allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.55 | Create material group with all necessary (mandatory) details and assign a procurement structure to it in details")

describe('PCM- 2.55 | Create material group with all necessary (mandatory) details and assign a procurement structure to it in details', () => {
  before(function () {
      cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));

      cy.fixture("pcm/pcm-2.55-Create_material_group_with_all_necessary_details_and_assign_a_procurement_structureto_it_in_details.json").then((data) => {
        this.data = data
        CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
        CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
        CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
        CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;
        CONTAINERS_MATERIAL_RECORD= this.data.CONTAINERS.MATERIAL_RECORD
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
  it('TC - Create new material catalog', function () {
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
    _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_GROUP_PARAMETER_2);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  }); 

  it('TC - Create new record in material module', function () {
  
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);

      _common.openTab(app.TabBar.RECORDS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER,app.FooterTab.MATERIALFILTER)
      })
     _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
     _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER,MATERIALCatalog_CODE)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.CODE,MATERIALCatalog_CODE)
      _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.MATERIAL_CATALOG_FILTER).findActiveRow().getCell(app.GridCells.IS_CHECKED).clickIn()
      
      
      _common.openTab(app.TabBar.RECORDS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS,app.FooterTab.MATERIALFILTER)
      })
      _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
      _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
      _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.DETAILSMATERIAL).then(() => {
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER,app.FooterTab.MATERIALFILTER)
      })

      _common.openTab(app.TabBar.RECORDS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER,app.FooterTab.MATERIALGROUPFILTER)
      })

        
  }); 
})