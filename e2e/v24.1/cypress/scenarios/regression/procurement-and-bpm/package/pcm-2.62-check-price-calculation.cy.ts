import { _common,  _sidebar,_projectPage,_materialPage,_boqPage,_controllingUnit,_procurementPage,_salesPage,_package,_saleContractPage, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import _ from "cypress/types/lodash";
import Buttons from "cypress/locators/buttons";
import cypress from "cypress";

const MATERIALCatalog_CODE = "MG1-" + Cypress._.random(0, 999);
const Code = "MAT1-" + Cypress._.random(0, 999);
const Code2 = "MAT2-" + Cypress._.random(0, 999);
const Code3 = "MAT3-" + Cypress._.random(0, 999);
const ESTPrice = "ESTPrice";

const MATERIALRECORD_DESC2 = "MR2_DESC" + Cypress._.random(0, 999);
const MATERIALRECORD_DESC3 = "MR3_DESC" + Cypress._.random(0, 999);
const MATGROUPCODE = "MATGROUPCODE-" + Cypress._.random(0, 999);
const MATGROUPDEC = "MATGROUPDEC-" + Cypress._.random(0, 999);
const MATERIALCatalog_DESC1 = "Benstock1" + Cypress._.random(0, 999);
const MATERIALRECORD_DESC ="AnsibleT"+ Cypress._.random(0, 999);

let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let MATERIAL_CATALOGS_PARAMETER:DataCells;
let MATERIAL_GROUP_PARAMETER_1: DataCells;
let MATERIAL_RECORD_PARAMETER:DataCells,
MATERIAL_RECORD_PARAMETER_3:DataCells,MATERIAL_RECORD_PARAMETER_2:DataCells

let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP,CONTAINER_COLUMNS_MATERIAL
let CONTAINERS_MATERIAL_GROUP,CONTAINERS_MATERIAL_RECORD


const allure = Cypress.Allure.reporter.getInterface()
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.62 | Check Price Calculation")

describe("PCM- 2.62 | Check Price Calculation", () => {
            before(function () {
                cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));
          
                cy.fixture("pcm/pcm-2.62-check-price-calculation.json").then((data) => {
                  this.data = data
                  CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
                  CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
                  CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
                  CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;
                  CONTAINERS_MATERIAL_RECORD= this.data.CONTAINERS.MATERIAL_RECORD
                  CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL
                 
                  
                    MATERIAL_CATALOGS_PARAMETER ={
                        [app.GridCells.CODE]:MATERIALCatalog_CODE,
                        [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOG.BP,
                        [app.GridCells.DESCRIPTION_INFO]:MATERIALCatalog_DESC1,
                        [app.GridCells.VALID_FROM]:CONTAINERS_MATERIAL_CATALOG.FROM,
                        [app.GridCells.VALID_TO]: CONTAINERS_MATERIAL_CATALOG.TO,
                        [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:commonLocators.CommonKeys.NEUTRAL_MATERIAL,
                        [app.GridCells.PAYMENT_TERM_FI_FK]:CONTAINERS_MATERIAL_CATALOG.PAYMENT_TERM_FI,
                        [app.GridCells.PAYMENT_TERM_AD_FK]: CONTAINERS_MATERIAL_CATALOG.PAYMENT_TERM_AD
                  }
            
                  MATERIAL_GROUP_PARAMETER_1 ={
                    [app.GridCells.CODE]:MATGROUPCODE,
                    [app.GridCells.DESCRIPTION_INFO]:MATGROUPDEC,
                    [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_CATALOG.CODE 
                }
            
                MATERIAL_RECORD_PARAMETER_2 ={
                    [app.GridCells.CODE]:Code2,
                    [app.GridCells.DESCRIPTION_INFO_1]:MATERIALRECORD_DESC2,
                    [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM,
                    [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE,
                    [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE
              }
          
               MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:Code,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIALRECORD_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM,
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE,
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE
            }

            MATERIAL_RECORD_PARAMETER_3={
                [app.GridCells.CODE]:Code3,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIALRECORD_DESC3,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM,
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE,
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE
            }
            });
                  _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);
                  cy.REFRESH_CONTAINER()
    });
     after(() => {
         cy.LOGOUT();
     });

    it("TC - Create material catalogue with all attributes and Material Group", function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
        });
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify create material Record", function () {
                
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.openTab(app.TabBar.DETAILSMATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCatalog_CODE, 1);
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, "check");
        _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL.listprice, CONTAINER_COLUMNS_MATERIAL.cost, CONTAINER_COLUMNS_MATERIAL.charges, CONTAINER_COLUMNS_MATERIAL.code, CONTAINER_COLUMNS_MATERIAL.retailprice, CONTAINER_COLUMNS_MATERIAL.estimateprice], cnt.uuid.MATERIAL_RECORDS);
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       

    })

    it("TC - modify estimate price, the list price and cost price will not changed", function () {
       
       
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
       
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.ESTIMATE_PRICE, app.InputFields.INPUT_GROUP_CONTENT, "10.00")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.LIST_PRICE, CONTAINERS_MATERIAL_RECORD.LIST_PRICE)
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.COST_PRICE_GROSS, CONTAINERS_MATERIAL_RECORD.LIST_PRICE)
    })

    it("TC - modify charge and discounts, list price will not change, but cost price will be recalculated", function () {
        
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER_2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
       _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.DISCOUNT1)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CHARGES, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.CHARGE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.LIST_PRICE, CONTAINERS_MATERIAL_RECORD.LIST_PRICE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.MATERIAL_RECORDS, app.GridCells.RETAIL_PRICE, CONTAINERS_MATERIAL_RECORD.LIST_PRICE)
    })
    it("TC - Update discount and charges ", function () {
        
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER_3)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.DISCOUNT1)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CHARGES, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.CHARGE1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.DISCOUNT2)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CHARGES, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.CHARGE2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.MATERIAL_RECORDS, app.GridCells.ESTIMATE_PRICE, ESTPrice)
        _common.assert_forNumericValues(cnt.uuid.MATERIAL_RECORDS, app.GridCells.LIST_PRICE, CONTAINERS_MATERIAL_RECORD.LIST_PRICE)
    })
    it("TC - verify estimate price and cost price", function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.COST, Cypress.env("ESTPrice"))
    })
})