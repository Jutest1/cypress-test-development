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
let CONTAINERS_MATERIAL_GROUP,CONTAINERS_MATERIAL_RECORD,
CONTAINERS_DISCOUNT_GROUP,CONTAINER_COLUMNS_DISCOUNT_GROUP,
CONTAINERS_TRANSLATION


const MATERIALRECORD_CODE ="Material-" + Cypress._.random(0, 999);
const MATERIALRECORD_DESC ="AnsibleT"+ Cypress._.random(0, 999);

const DISCOUNT_CODE ="Disc-" + Cypress._.random(0, 999);
const DISCOUNT_DESC ="Discount_desc"+ Cypress._.random(0, 999);
const DISCOUNT_SUBCODE ="SubDisc-" + Cypress._.random(0, 999);
const DISCOUNT_SUBDESC ="SubDiscount_desc"+ Cypress._.random(0, 999);



allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.57 | Create discount group with all necessary (mandatory) details for particular selected material catalogue")

describe('PCM- 2.57 | Create discount group with all necessary (mandatory) details for particular selected material catalogue', () => {
    before(function () {
                cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));
          
                cy.fixture("pcm/pcm-2.57-Create-discount-group-with-all-necessary-details-for-particular-selected-material-catalogue.json").then((data) => {
                  this.data = data
                  CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
                  CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
                  CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
                  CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;
                  CONTAINERS_MATERIAL_RECORD= this.data.CONTAINERS.MATERIAL_RECORD
                  CONTAINERS_DISCOUNT_GROUP= this.data.CONTAINERS.DISCOUNT_GROUP
                  CONTAINER_COLUMNS_DISCOUNT_GROUP = this.data.CONTAINER_COLUMNS.DISCOUNT_GROUP 
                  CONTAINERS_TRANSLATION= this.data.CONTAINERS.TRANSLATION
                  
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
    it('TC - Create new record and subrecord in Discount Group for material Catalog', function () {
      
      
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
              _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS,CONTAINER_COLUMNS_MATERIAL_CATALOG)
          })
          _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,CONTAINERS_MATERIAL_CATALOG.CATALOG)
        cy.REFRESH_CONTAINER()

         _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DISCOUNT_GROUPS,app.FooterTab.DISCOUNT_GROUP)
            _common.setup_gridLayout(cnt.uuid.DISCOUNT_GROUPS,CONTAINER_COLUMNS_DISCOUNT_GROUP)
        })
        _common.search_inSubContainer(cnt.uuid.DISCOUNT_GROUPS," ")
        _common.clear_subContainerFilter(cnt.uuid.DISCOUNT_GROUPS)
        _common.create_newRecord(cnt.uuid.DISCOUNT_GROUPS)            
        _materialPage.enterRecord_toCreateDiscountGroup(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_CODE,DISCOUNT_DESC,CONTAINERS_DISCOUNT_GROUP.DISCOUNT_TYPE,CONTAINERS_DISCOUNT_GROUP.DISCOUNT);
            cy.SAVE()        
        _common.assert_cellData_insideActiveRow(cnt.uuid.DISCOUNT_GROUPS,app.GridCells.DESCRIPTION_INFO,DISCOUNT_DESC);
        _common.getTextfromCell(cnt.uuid.DISCOUNT_GROUPS,app.GridCells.DESCRIPTION_INFO)     
        _common.create_newSubRecord(cnt.uuid.DISCOUNT_GROUPS)        
        _materialPage.enterRecord_toCreateDiscountGroup(cnt.uuid.DISCOUNT_GROUPS,DISCOUNT_SUBCODE,DISCOUNT_SUBDESC,CONTAINERS_DISCOUNT_GROUP.DISCOUNT_TYPE1,CONTAINERS_DISCOUNT_GROUP.DISCOUNT1);
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.DISCOUNT_GROUPS,app.GridCells.DESCRIPTION_INFO,DISCOUNT_SUBDESC);          
        
    }); 
    it("TC-Verify selected record description in translation container",function(){
        
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.FooterTab.TRASLATION)
            
        })
        _common.search_inSubContainer(cnt.uuid.DISCOUNT_GROUPS,Cypress.env("Text"))
        for(var i=0;i<=4;i++){
            _common.clickOn_cellHasUniqueValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.LANG_NAME,CONTAINERS_TRANSLATION.LANGUAGE[i])
            _common.enterRecord_inNewRow(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.COL_10,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_TRANSLATION.DESCRIPTION[i])
                 cy.SAVE()       
        }
        _common.clear_subContainerFilter(cnt.uuid.DISCOUNT_GROUPS)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.DISCOUNT_GROUPS,Cypress.env("Text"))
        for(var i=0;i<=4;i++){
            _common.clickOn_cellHasUniqueValue(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.LANG_NAME,CONTAINERS_TRANSLATION.LANGUAGE[i])
            _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSLATION_MATERIALCATALOG,app.GridCells.COL_10,CONTAINERS_TRANSLATION.DESCRIPTION[i])
        }
         
    }); 
})