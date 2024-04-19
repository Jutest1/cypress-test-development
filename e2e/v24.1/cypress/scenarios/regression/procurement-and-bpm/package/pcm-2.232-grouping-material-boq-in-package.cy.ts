import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _validate, _estimatePage, _materialPage } from "cypress/pages";
import { cnt, tile, app, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

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
let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_PACKAGE_ITEMS
let CONTAINERS_PACKAGE_ITEMS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.232 | Grouping material boq in package");

describe("PCM- 2.232 | Grouping material boq in package", () => {

  before(() => {

    cy.fixture("pcm/pcm-2.232-grouping-material-boq-in-package.json")
      .then(function (data) {
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
        RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        };
      
        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

        CONTAINER_COLUMNS_PACKAGE_ITEMS=this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS

        CONTAINERS_PACKAGE_ITEMS=this.data.CONTAINERS.PACKAGE_ITEMS
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

  after(()=>{
    cy.LOGOUT();
  })

  it("TC - Create new Estimate", function () {
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

  it("TC - Create new line item", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
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

  it("TC - Add Resource for selected line item", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL,"COST_TOTAL")
  });

  it("TC - Create Material Package", function () {
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

  });

  it("TC - Verify set AGN should be larger than 100 and first setting record with 100", function () {
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
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.agn,CONTAINER_COLUMNS_PACKAGE_ITEMS.aan,CONTAINER_COLUMNS_PACKAGE_ITEMS.basitemtype2fk,CONTAINER_COLUMNS_PACKAGE_ITEMS.total,CONTAINER_COLUMNS_PACKAGE_ITEMS.mdcmaterialfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.quantity,CONTAINER_COLUMNS_PACKAGE_ITEMS.itemno,CONTAINER_COLUMNS_PACKAGE_ITEMS.basuomfk,CONTAINER_COLUMNS_PACKAGE_ITEMS.price], cnt.uuid.PACKAGEITEMS)
    });
    _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    _common.waitForLoaderToDisappear()

    for (let index = 0; index < CONTAINERS_PACKAGE_ITEMS.AAN.length; index++) {
      _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
      _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_ITEMS.MATERIAL_NO)
      _common.select_activeRowInContainer(cnt.uuid.PACKAGEITEMS)
      _common.waitForLoaderToDisappear()
      _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_ITEMS.MATERIAL_NO)
      _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.AAN, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_ITEMS.AAN[index])
      _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS, app.GridCells.AGN, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PACKAGE_ITEMS.AGN)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _validate.verify_ItemTypeItemType2ANNandAGN(cnt.uuid.PACKAGEITEMS, index)
    }
    _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify modified record with item type2=alternative awarded,reocrds which item2=base become base postponed", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.SET_BASE_ALTERNATIVE_ITEM_GROUP);
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.set_checkboxValueForAllRowCell_fromModal(app.SubContainerLayout.SELECTED,commonLocators.CommonKeys.UNCHECK)
    _common.selectValue_fromModal(commonLocators.CommonKeys.ALTERNATIVE_CAPS)
    _common.set_cellCheckboxValue_fromModal(app.SubContainerLayout.SELECTED,commonLocators.CommonKeys.CHECK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS, app.GridCells.AAN, "0")
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGEITEMS, app.GridCells.BAS_ITEM_TYPE_2_FK, commonLocators.CommonKeys.BASE_POSTPONED)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS, app.GridCells.AAN, "1")
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGEITEMS, app.GridCells.BAS_ITEM_TYPE_2_FK, commonLocators.CommonKeys.ALTERNATIVE_AWARDED)
  });

  it("TC - Verify modified record with item type2=alternative awarded,reocrds which item2=base become base postponed", function () {

    _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS, app.GridCells.BAS_ITEM_TYPE_2_FK,commonLocators.CommonKeys.ALTERNATIVE_CAPS)
    cy.SAVE()
    _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS, app.GridCells.TOTAL, "0.00")
  });

});
