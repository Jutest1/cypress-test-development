import { tile, app, cnt,sidebar,commonLocators } from "cypress/locators";
import { _common,_sidebar,_validate, _mainView,_modalView, _materialPage } from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();

const MATERIALCODE = "MATERIALCODE-" + Cypress._.random(0, 999);
const MATERIALDEC = "MATERIALDEC-" + Cypress._.random(0, 999);
const MATCATCODE = "MATCATCODE-" + Cypress._.random(0, 999);
const MATCATDEC = "VPTEST-" + Cypress._.random(0, 999);
const MATGROUPCODE = "MATGROUPCODE-" + Cypress._.random(0, 999);
const MATGROUPDEC = "MATGROUPDEC-" + Cypress._.random(0, 999);


let MATERIAL_CATALOGS_PARAMETER:DataCells;
let MATERIAL_RECORD_PARAMETER:DataCells;
let MATERIAL_GROUP_PARAMETER: DataCells;

let CONTAINERS_MATERIAL;
let CONTAINERS_MATERIAL_GROUP;
let CONTAINER_COLUMNS_MATERIAL_FILTER;
let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.61 | Delete Materials")

describe('PCM- 2.61 | Delete Materials', () => {
    before(function () {
        cy.fixture('procurement-and-bpm/pcm-2.61-Delete-materials.json').then((data) => {
            this.data = data;
           
            CONTAINERS_MATERIAL = this.data.CONTAINERS.MATERIAL;
            CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;   
            CONTAINER_COLUMNS_MATERIAL_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_FILTER
            CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
           
           MATERIAL_CATALOGS_PARAMETER ={
            [app.GridCells.CODE]:MATCATCODE,
            [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL.BP,
            [app.GridCells.DESCRIPTION_INFO]:MATCATDEC
            };

           MATERIAL_RECORD_PARAMETER ={
            [app.GridCells.CODE]:MATERIALCODE,
            [app.GridCells.DESCRIPTION_INFO_1]:MATERIALDEC,
            [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL.UOM,
            [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL.RETAILPRICE,
            [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL.LISTPRICE
            };

            MATERIAL_GROUP_PARAMETER ={
                [app.GridCells.CODE]:MATGROUPCODE,
                [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_1,
                [app.GridCells.DESCRIPTION_INFO]:MATGROUPDEC  
            }

        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    });
  
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create Material catalog and assign structure", function () {
       
        
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
          _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
  
        
         _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
         _common.setDefaultView(app.TabBar.MATERIAL_CATALOG)
         _common.waitForLoaderToDisappear()
         _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIAL_CATALOGS,0);
         _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
         });
         _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
         _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);

         cy.SAVE()
         _common.waitForLoaderToDisappear()
         _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
         _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS,app.FooterTab.MATERIALGROUP,1);
         _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
         });
         _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
         _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
         cy.SAVE()
         _common.waitForLoaderToDisappear()
         cy.REFRESH_CONTAINER()
         _common.waitForLoaderToDisappear()
    }); 

    it("TC - Search Material and check it", function () { 

         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
         _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        
         _common.openTab(app.TabBar.RECORDS).then(() => {
         _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER,app.FooterTab.MATERIALFILTER,0);
         _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_FILTER)
         });
         _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
         _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER,MATCATDEC)
         _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
         _common.waitForLoaderToDisappear()
     });

     it("TC - Create material record and verify the entererecord ", function () {
        
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS,app.FooterTab.MATERIAL_RECORDS,0);    
        });
         _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
         _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
         _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER)
          cy.SAVE()
          _common.waitForLoaderToDisappear()
         _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,MATERIALDEC)
         _common.waitForLoaderToDisappear()
     });

     it("TC - Delete material record and verify the deletedrecord ", function () {

         _common.openTab(app.TabBar.RECORDS).then(() => {
         _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS,app.FooterTab.MATERIAL_RECORDS,2);
         });
         _common.delete_recordFromContainer(cnt.uuid.MATERIAL_RECORDS)
         _validate.verify_isRecordDeleted(cnt.uuid.MATERIAL_RECORDS,MATERIALDEC)
     });
});



