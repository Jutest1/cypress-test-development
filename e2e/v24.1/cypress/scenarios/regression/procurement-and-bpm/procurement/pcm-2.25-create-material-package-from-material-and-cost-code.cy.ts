import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _estimatePage, _package,_projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let RESOURCE_PARAMETERS_MATERIAL:DataCells
let RESOURCE_PARAMETERS_COST_CODE:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINER_COLUMNS_PACKAGE
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_PACKAGE_ITEMS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Procurement");
ALLURE.story("PCM- 2.25 | Create a material package from Material and cost code for selected line item");

describe("PCM- 2.25 | Create a material package from Material and cost code for selected line item", () => {


  before(function () {
    cy.fixture("pcm/pcm-2.25-Create-material-package-from-material-costcode.json")
      .then((data) => {
        this.data = data;
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
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        };
        CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
        CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
        RESOURCE_PARAMETERS_COST_CODE = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
        };
        RESOURCE_PARAMETERS_MATERIAL = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
        };
      
        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
    
        CONTAINER_COLUMNS_PACKAGE_ITEMS=this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS
      })
      .then(()=>{
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.setDefaultView(app.TabBar.PROJECT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
      })
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create Estimate Header", function () {
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
  })

  it("TC - Create new line item record for created estimate", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  });

  it("TC - Create new record in resource for cost code and material", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_MATERIAL);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"COST_TOTAL");  
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_COST_CODE);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
    });
    _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE[0])
    _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT,"COST_UNIT_CC")
    _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE[1])
    _common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT,"COST_UNIT_M")
  })

  it("TC - Create package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'));  
  })

  it("TC - Validate the package", function () {
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.ITEMS, 2);
    });
    _common.clickOn_cellHasValue(cnt.uuid.TOTALS,app.GridCells.TRANSLATED,commonLocators.CommonKeys.TOTAL,PACKAGE_TOTAL_TRANSLATION)
    _common.assert_cellData(cnt.uuid.TOTALS,app.GridCells.VALUE_NET,Cypress.env("COST_TOTAL"))
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
        _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.itemno,CONTAINER_COLUMNS_PACKAGE_ITEMS.mdcmaterialfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.quantity,CONTAINER_COLUMNS_PACKAGE_ITEMS.basuomfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.price,CONTAINER_COLUMNS_PACKAGE_ITEMS.total,CONTAINER_COLUMNS_PACKAGE_ITEMS.prcitemstatusfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.isdisabled], cnt.uuid.PACKAGEITEMS)
    });
    _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE[0])
    _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS,app.GridCells.PRICE_SMALL,Cypress.env("COST_UNIT_CC").toString())
    _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE[1])
    _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS,app.GridCells.PRICE_SMALL,Cypress.env("COST_UNIT_M").toString())
    _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
  })

});
