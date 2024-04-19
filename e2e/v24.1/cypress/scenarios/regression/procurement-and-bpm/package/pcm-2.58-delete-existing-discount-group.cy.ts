import { _common, _estimatePage, _projectPage,_validate, _mainView, _boqPage, _bidPage,_materialPage, _saleContractPage, _modalView, _salesPage,_wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface(); 
const DISCOUNT_CODE ="Discount" + Cypress._.random(0, 999);
const DISCOUNT_DESC ="DiscDesc" + Cypress._.random(0, 999);
const DISCOUNT_SUBCODE ="Disc_sub" + Cypress._.random(0, 999);
const DISCOUNT_SUBDESC ="Disc_SubDesc"+ Cypress._.random(0, 999);

let CONTAINER_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let CONTAINER_DISCOUNT_GROUP;
let CONTAINER_COLUMNS_DISCOUNT_GROUP;


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.58 | Delete existing Discount group")
describe('PCM- 2.58 | Delete existing Discount group', () => {
  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );
    cy.fixture("pcm/pcm-2.58-delete-existing-discount-group.json").then((data) => {
      this.data = data
      CONTAINER_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
      CONTAINER_DISCOUNT_GROUP = this.data.CONTAINERS.DISCOUNT_GROUP
      CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
      CONTAINER_COLUMNS_DISCOUNT_GROUP = this.data.CONTAINER_COLUMNS.DISCOUNT_GROUP

  });
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);
    cy.REFRESH_CONTAINER()
  });

  it('TC - Create New Discount Group',function(){
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_COLUMNS_MATERIAL_CATALOG)
    });        
    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.searchValue2)
      cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DISCOUNT_GROUPS,app.FooterTab.DISCOUNT_GROUP)
      _common.setup_gridLayout(cnt.uuid.DISCOUNT_GROUPS,CONTAINER_COLUMNS_DISCOUNT_GROUP)
    });
    _common.create_newRecord(cnt.uuid.DISCOUNT_GROUPS)            
    _materialPage.enterRecord_toCreateDiscountGroup(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_CODE,DISCOUNT_DESC,CONTAINER_DISCOUNT_GROUP.discountType,CONTAINER_DISCOUNT_GROUP.discount);
      cy.SAVE() 
    _common.getTextfromCell(cnt.uuid.DISCOUNT_GROUPS,app.GridCells.DESCRIPTION_INFO)     
    _common.create_newSubRecord(cnt.uuid.DISCOUNT_GROUPS)        
    _materialPage.enterRecord_toCreateDiscountGroup(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_SUBCODE,DISCOUNT_SUBDESC,CONTAINER_DISCOUNT_GROUP.discountType1,CONTAINER_DISCOUNT_GROUP.discount1);
      cy.SAVE()     
  }); 

  it('TC - Delete Discount group and verify if its deleted', function () {     
    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_MATERIAL_CATALOG.searchValue2)
     cy.REFRESH_CONTAINER();        
    _common.clear_subContainerFilter(cnt.uuid.DISCOUNT_GROUPS)
    _common.search_inSubContainer(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_SUBCODE)
      cy.REFRESH_CONTAINER()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DISCOUNT_GROUPS,app.GridCells.DESCRIPTION_INFO,DISCOUNT_SUBDESC)       
    _common.delete_recordFromContainer(cnt.uuid.DISCOUNT_GROUPS)
      cy.SAVE()
      cy.REFRESH_CONTAINER()
      cy.wait(1000)
    _validate.verify_isRecordDeleted(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_SUBDESC)    
      cy.SAVE() 
    _common.search_inSubContainer(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_CODE) 
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DISCOUNT_GROUPS,app.GridCells.DESCRIPTION_INFO,DISCOUNT_DESC)            
    _common.delete_recordFromContainer(cnt.uuid.DISCOUNT_GROUPS)
      cy.SAVE()
    _validate.verify_isRecordDeleted(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_DESC)     
}); 

  after(() => {
    cy.LOGOUT();
  });
}); 	