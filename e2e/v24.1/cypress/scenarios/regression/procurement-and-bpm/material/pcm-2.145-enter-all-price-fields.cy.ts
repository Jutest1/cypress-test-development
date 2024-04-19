import { app, btn, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const MATERIAL_CATALOG_CODE="MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC="MATERIAL_CATALOG_DESC-" + Cypress._.random(0, 999);
let MATERIAL_CATALOGS_PARAMETER:DataCells
let CONTAINERS_MATERIAL_CATALOGS
let CONTAINER_COLUMNS_MATERIAL_CATALOGS

const MATERIAL_GROUPS_CODE="MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC="MATERIAL_GROUPS_DESC-" + Cypress._.random(0, 999);
let MATERIAL_GROUP_PARAMETER:DataCells
let CONTAINER_COLUMNS_MATERIAL_GROUP

const MATERIAL_RECORD_CODE_1="MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC_1="MATERIAL_RECORD_DESC-" + Cypress._.random(0, 999);
let MATERIAL_RECORD_PARAMETER1:DataCells
let CONTAINER_COLUMNS_MATERIAL_RECORD
let CONTAINERS_MATERIAL_RECORD

const MATERIAL_RECORD_CODE_2="MR1-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC_2="MATERIAL_RECORD1_DESC" + Cypress._.random(0, 999);
let MATERIAL_RECORD_PARAMETER2:DataCells

let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER

let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS1:DataCells
let RESOURCE_PARAMETERS2:DataCells

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Material");

ALLURE.story("PCM- 2.145 | Enter all price fields");
describe("PCM- 2.145 | Enter all price fields", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.145-enter-all-price-fields.json")
          .then((data) => {
            this.data = data;
            CONTAINERS_MATERIAL_CATALOGS=this.data.CONTAINERS.MATERIAL_CATALOGS
            CONTAINER_COLUMNS_MATERIAL_CATALOGS=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
            MATERIAL_CATALOGS_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_CATALOG_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_CATALOG_DESC,
                [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
                [app.GridCells.VALID_FROM]:_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL),
                [app.GridCells.VALID_TO]:_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5),
                [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:CONTAINERS_MATERIAL_CATALOGS.NEUTRAL_MATERIAL
            } 

            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            MATERIAL_GROUP_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_GROUPS_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_CATALOGS.STRUCTURE_CODE
            }

            CONTAINERS_MATERIAL_RECORD=this.data.CONTAINERS.MATERIAL_RECORD
            MATERIAL_RECORD_PARAMETER1={
                [app.GridCells.CODE]:MATERIAL_RECORD_CODE_1,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC_1,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM,
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0],
                [app.GridCells.ESTIMATE_PRICE]:CONTAINERS_MATERIAL_RECORD.ESTIMATE_PRICE
            }
            MATERIAL_RECORD_PARAMETER2={
                [app.GridCells.CODE]:MATERIAL_RECORD_CODE_2,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC_2,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM,
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[1],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[1],
            }
            CONTAINER_COLUMNS_MATERIAL_RECORD=this.data.CONTAINER_COLUMNS.MATERIAL_RECORD

            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER

            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            }; 
            
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS1 = {
                  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                  [app.GridCells.CODE]: MATERIAL_RECORD_CODE_1,
            };

            RESOURCE_PARAMETERS2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: MATERIAL_RECORD_CODE_2,
          };
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
            _common.waitForLoaderToDisappear()   
        })
    })

    after(() => {
        cy.LOGOUT();
    });
    
    it("TC - Create material catalog and material group", function () {      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.setDefaultView(app.TabBar.CATALOGS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it("TC - Create material record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.setDefaultView(app.TabBar.RECORDS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    })   

    it('TC - Create new estimate record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new line item record", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.waitForLoaderToDisappear()
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Verify when estimate price and list price both are given to a material, it is taken in estimate - it take presidence over list price", function() {

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
          _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costunit],cnt.uuid.RESOURCES)
          _common.waitForLoaderToDisappear()
        });

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
       
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });

        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.search_inSubContainer(cnt.uuid.RESOURCES,MATERIAL_RECORD_CODE_1)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,CONTAINERS_MATERIAL_RECORD.ESTIMATE_PRICE)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

    it("TC - Verify if only list price is given to a material, it is taken in estimate as an estimate price of a particular resource", function() {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
       
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });

        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS2);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.search_inSubContainer(cnt.uuid.RESOURCES,MATERIAL_RECORD_CODE_2)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,CONTAINERS_MATERIAL_RECORD.LIST_PRICE[1])
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

});
