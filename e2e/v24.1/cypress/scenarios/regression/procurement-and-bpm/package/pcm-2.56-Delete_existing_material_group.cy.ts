import { _common, _estimatePage, _projectPage,_validate, _mainView, _boqPage, _bidPage,_materialPage, _saleContractPage, _modalView, _salesPage,_wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const MATCATCODE = "MATCATCODE-" + Cypress._.random(0, 999);
const MATCATDEC = "MATCATDEC-" + Cypress._.random(0, 999);
const MATERIALGROUP_CODE ="M-" + Cypress._.random(0, 999);
const MATERIALGROUP_DESC ="MG"+ Cypress._.random(0, 999);
const MATERIALGROUP_SUBCODE ="MS-" + Cypress._.random(0, 999);
const MATERIALGROUP_SUBDESC ="MGS"+ Cypress._.random(0, 999);

let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let MATERIAL_CATALOGS_PARAMETER:DataCells;
let MATERIAL_GROUP_PARAMETER_1: DataCells;
let MATERIAL_GROUP_PARAMETER_2: DataCells;

let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP;
let CONTAINERS_MATERIAL_GROUP;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.56 | Delete existing material group")

describe('PCM- 2.56 | Delete existing material group', () => {
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));

    cy.fixture("pcm/pcm-2.56-Delete_existing_material_group.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
      CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
      CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
      CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;

        MATERIAL_CATALOGS_PARAMETER ={
          [app.GridCells.CODE]:MATCATCODE,
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
});
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);
      cy.REFRESH_CONTAINER()
  
  });

  it('TC - Create new material catalog', function () {    
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
        _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_COLUMNS_MATERIAL_CATALOG)
    })
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_CATALOGS,btn.ToolBar.ICO_REC_NEW)
    _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
    cy.SAVE()   
  }); 

  it('TC - Create new material group', function () {
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS,app.FooterTab.MATERIALGROUP)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS,CONTAINER_COLUMNS_MATERIAL_GROUP)
    })  
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_GROUPS,btn.ToolBar.ICO_REC_NEW)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER_1);
    cy.SAVE()
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_GROUPS,btn.ToolBar.ICO_REC_NEW)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_GROUP_PARAMETER_2);
    cy.SAVE()
  }); 

  it('TC - Delete material group and verify if its deleted', function () {  
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,MATERIALGROUP_SUBCODE)
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_GROUPS,btn.IconButtons.ICO_REC_DELETE)
    cy.SAVE()  
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_GROUPS,app.GridCells.CODE,MATERIALGROUP_CODE)
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_GROUPS,btn.IconButtons.ICO_REC_DELETE)
    cy.SAVE()  
    _validate.verify_isRecordDeleted(cnt.uuid.MATERIAL_GROUPS,CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_1)
  }); 
})

after(() => {
  cy.LOGOUT();
});