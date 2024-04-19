import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate, _procurementConfig, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="33" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const MATERIAL_CATALOG_CODE="MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC="MC_DESC_" + Cypress._.random(0, 999);
let MATERIAL_CATALOGS_PARAMETERS:DataCells
let CONTAINERS_MATERIAL_CATALOGS
let CONTAINER_COLUMNS_MATERIAL_CATALOGS

const MATERIAL_GROUPS_CODE="MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC="MG_DESC_" + Cypress._.random(0, 999);
let MATERIAL_GROUP_PARAMETERS:DataCells
let CONTAINER_COLUMNS_MATERIAL_GROUP

const MATERIAL_RECORD_CODE="MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC="MR_DESC_" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE_1="MC" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC_1="MC_DESC_" + Cypress._.random(0, 999);
let MATERIAL_RECORD_PARAMETERS_1:DataCells
let MATERIAL_RECORD_PARAMETERS_2:DataCells
let CONTAINER_COLUMNS_MATERIAL_RECORD
let CONTAINERS_MATERIAL_RECORD

let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER
let CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER

let UNIT_OF_MEASUREMENT_1:DataCells
let UNIT_OF_MEASUREMENT_2:DataCells
let CONTAINER_COLUMNS_UNIT_OF_MEASUREMENT

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

let CONTAINER_COLUMNS_PACKAGE
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS:DataCells
let MODAL_REQUEST_FOR_QUOTE
let CONTAINER_COLUMNS_RFQ

let CONTAINER_COLUMNS_QUOTE
let CONTAINER_COLUMNS_QUOTE_ITEMS
let CONTAINERS_QUOTE_ITEMS

let REPLACE_MATERIAL:DataCells
let REPLACE_MATERIAL_2:DataCells
let REPLACE_MATERIAL_3:DataCells
let REPLACE_MATERIAL_4:DataCells

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Quote");
ALLURE.story("PCM- 2.26 | Replace material at quotation level from WIZARD");
describe("PCM- 2.26 | Replace material at quotation level from WIZARD", () => {

  before(function () {
    cy.fixture("procurement-and-bpm/pcm-2.26-replace-material-at-quotation-level-from-WIZARD.json")
      .then((data) => {
        this.data = data;
        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }

        CONTAINERS_MATERIAL_CATALOGS=this.data.CONTAINERS.MATERIAL_CATALOGS
        CONTAINER_COLUMNS_MATERIAL_CATALOGS=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
        MATERIAL_CATALOGS_PARAMETERS={
          [app.GridCells.CODE]:MATERIAL_CATALOG_CODE,
          [app.GridCells.DESCRIPTION_INFO]:MATERIAL_CATALOG_DESC,
          [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
          [app.GridCells.VALID_FROM]:_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL),
          [app.GridCells.VALID_TO]:_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5),
          [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:commonLocators.CommonKeys.NEUTRAL_MATERIAL
        } 

        CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
        MATERIAL_GROUP_PARAMETERS={
            [app.GridCells.CODE]:MATERIAL_GROUPS_CODE,
            [app.GridCells.DESCRIPTION_INFO]:MATERIAL_GROUPS_DESC,
            [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_CATALOGS.STRUCTURE_CODE
        }

        CONTAINER_COLUMNS_MATERIAL_RECORD=this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
        CONTAINERS_MATERIAL_RECORD=this.data.CONTAINERS.MATERIAL_RECORD
        MATERIAL_RECORD_PARAMETERS_1={
          [app.GridCells.CODE]:MATERIAL_RECORD_CODE,
          [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC,
          [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
          [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[0],
          [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0]
        }

        MATERIAL_RECORD_PARAMETERS_2={
          [app.GridCells.CODE]:MATERIAL_RECORD_CODE_1,
          [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC_1,
          [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[1],
          [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[1],
          [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[1]
        }

        CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER
        CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS_FILTER

        CONTAINER_COLUMNS_UNIT_OF_MEASUREMENT=this.data.CONTAINER_COLUMNS.UNIT_OF_MEASUREMENT
        UNIT_OF_MEASUREMENT_1={
          [commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT]:commonLocators.CommonKeys.CONVERSION,
          [commonLocators.CommonLabels.FACTOR]:CONTAINERS_MATERIAL_RECORD.KILOGRAM_FACTOR,
          [commonLocators.CommonLabels.IS_BASE]:commonLocators.CommonKeys.UNCHECK,
          [commonLocators.CommonLabels.LENGTH_DIMENSION]:CONTAINERS_MATERIAL_RECORD.LENGTH_DIMENSION
        }
        UNIT_OF_MEASUREMENT_2={
          [commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT]:commonLocators.CommonKeys.CONVERSION,
          [commonLocators.CommonLabels.FACTOR]:CONTAINERS_MATERIAL_RECORD.GRAM_FACTOR,
          [commonLocators.CommonLabels.IS_BASE]:commonLocators.CommonKeys.CHECK,
          [commonLocators.CommonLabels.LENGTH_DIMENSION]:CONTAINERS_MATERIAL_RECORD.LENGTH_DIMENSION
        }

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
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
        };

        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

        CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

        MODAL_REQUEST_FOR_QUOTE=this.data.MODAL.REQUEST_FOR_QUOTE
        CREATE_RFQ_PARAMETERS={
          [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0]]
        }
        CONTAINER_COLUMNS_RFQ=this.data.CONTAINER_COLUMNS.RFQ

        CONTAINER_COLUMNS_QUOTE=this.data.CONTAINER_COLUMNS.QUOTE
        CONTAINER_COLUMNS_QUOTE_ITEMS=this.data.CONTAINER_COLUMNS.QUOTE_ITEMS
        CONTAINERS_QUOTE_ITEMS=this.data.CONTAINERS.QUOTE_ITEMS

        REPLACE_MATERIAL={
          [commonLocators.CommonLabels.SCOPE]:commonLocators.CommonKeys.ALL_QUOTE_FROM_CURRENT_PROJECT,
          [commonLocators.CommonLabels.REPLACE_FROM]:commonLocators.CommonKeys.SPECIFIC_CATALOG,
          [commonLocators.CommonLabels.MATERIAL_SEARCH]:MATERIAL_CATALOG_CODE,
          [commonLocators.CommonKeys.BUTTON_HANDLE]:btn.ButtonText.CANCEL
        }
        REPLACE_MATERIAL_2={
          [commonLocators.CommonLabels.SCOPE]:commonLocators.CommonKeys.ALL_QUOTE_FROM_CURRENT_PROJECT,
          [commonLocators.CommonLabels.REPLACE_FROM]:commonLocators.CommonKeys.SPECIFIC_CATALOG,
          [commonLocators.CommonLabels.MATERIAL_SEARCH]:MATERIAL_CATALOG_CODE,
          [commonLocators.CommonKeys.BUTTON_HANDLE]:btn.ButtonText.CANCEL
        }
        REPLACE_MATERIAL_3={
          [commonLocators.CommonLabels.SCOPE]:commonLocators.CommonKeys.ALL_QUOTE_FROM_CURRENT_PROJECT,
          [commonLocators.CommonLabels.REPLACE_FROM]:commonLocators.CommonKeys.SPECIFIC_CATALOG,
          [commonLocators.CommonLabels.MATERIAL_SEARCH]:MATERIAL_CATALOG_CODE,
          [commonLocators.CommonKeys.BUTTON_HANDLE]:btn.ButtonText.CANCEL,
          [commonLocators.CommonLabels.FACTOR]:CONTAINERS_MATERIAL_RECORD.KILOGRAM_FACTOR
        }
        REPLACE_MATERIAL_4={
          [commonLocators.CommonLabels.SCOPE]:commonLocators.CommonKeys.ALL_QUOTE_FROM_CURRENT_PROJECT,
          [commonLocators.CommonLabels.REPLACE_FROM]:commonLocators.CommonKeys.SPECIFIC_CATALOG,
          [commonLocators.CommonLabels.MATERIAL_SEARCH]:MATERIAL_CATALOG_CODE,
          [commonLocators.CommonKeys.BUTTON_HANDLE]:btn.ButtonText.REPLACE,
        }
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
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
      })
  })

  after(() => {
		cy.LOGOUT();
	});

  it("TC - Create material catalog and material group", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CATALOGS).then(() => {
        _common.setDefaultView(app.TabBar.CATALOGS)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
        _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
    })
    _common.waitForLoaderToDisappear()

    _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
    _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
    _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear() 
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear() 
    _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)

    _common.openTab(app.TabBar.CATALOGS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
        _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP);
    })
    _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
    _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear() 
    cy.SAVE()
    _common.waitForLoaderToDisappear()
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
          _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER)
      })
      _common.waitForLoaderToDisappear() 
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
      _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
      _common.minimizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)

      _common.openTab(app.TabBar.RECORDS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
          _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
      })
      _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
      _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
      _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
      _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETERS_1)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear() 
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()

      _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
      _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
      _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETERS_2)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
  }) 

  it("TC - Set unit of measurement", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.UNIT); 
    _common.waitForLoaderToDisappear() 

    _common.openTab(app.TabBar.UNIT).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT,app.FooterTab.UNITOFMEASUREMENT)
      _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT,CONTAINER_COLUMNS_UNIT_OF_MEASUREMENT)
    })
    _common.clear_subContainerFilter(cnt.uuid.UNITSOFMEASUREMENT)
    _common.search_inSubContainer(cnt.uuid.UNITSOFMEASUREMENT,commonLocators.CommonKeys.KILOGRAM)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.KILOGRAM)

    _common.openTab(app.TabBar.UNIT).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENTDETAILS,app.FooterTab.UNITOFMEASUREMENTDETAILS)
    })
    _common.maximizeContainer(cnt.uuid.UNITSOFMEASUREMENTDETAILS)
    _package.enterRecord_toCreateUnitOfMeasurementDetails(UNIT_OF_MEASUREMENT_1)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.UNITSOFMEASUREMENTDETAILS)

    _common.openTab(app.TabBar.UNIT).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT,app.FooterTab.UNITOFMEASUREMENT)
    })

    _common.clear_subContainerFilter(cnt.uuid.UNITSOFMEASUREMENT)
    _common.search_inSubContainer(cnt.uuid.UNITSOFMEASUREMENT,commonLocators.CommonKeys.GRAM)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.GRAM)

    _common.openTab(app.TabBar.UNIT).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENTDETAILS,app.FooterTab.UNITOFMEASUREMENTDETAILS)
    })
    _common.maximizeContainer(cnt.uuid.UNITSOFMEASUREMENTDETAILS)
    _package.enterRecord_toCreateUnitOfMeasurementDetails(UNIT_OF_MEASUREMENT_2)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.UNITSOFMEASUREMENTDETAILS)
  })

  it("TC - Create new Estimate having line item and material resource to it", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
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
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Material Package from Estimate", function () {
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
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  

  })

  it("TC - Change Procurement Configuration to material and change package status", function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
    _common.waitForLoaderToDisappear()

    _procurementConfig.changeProcurementConfiguration_FromWizard(commonLocators.CommonKeys.MATERIAL,btn.ButtonText.YES);
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.waitForLoaderToDisappear()

    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS);
    _common.waitForLoaderToDisappear()

  });

  it("TC - Create Requisition from Package", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    cy.wait(4000) // This wait required as UI takes time to load
    _rfqPage.getCode_fromRequisitionModal("REQUISITION_CODE")
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
  });

  it("TC - Change requisition status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
      _common.waitForLoaderToDisappear()
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))

    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create RFQ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _common.waitForLoaderToDisappear()
    _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
    _common.waitForLoaderToDisappear()
    _rfqPage.getCode_fromRFQModal("RFQ_CODE")
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Change RFQ status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
    _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.RFQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
        _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        _common.waitForLoaderToDisappear()
      })
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
      _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE,Cypress.env("RFQ_CODE"))

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
      _common.waitForLoaderToDisappear()
  })

  it("TC - Create Quote from RfQ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _common.waitForLoaderToDisappear()

    _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0]],[commonLocators.CommonKeys.CHECK])
    _common.waitForLoaderToDisappear()
    _boqPage.getCode_fromQuoteModal("QUOTE-CODE")
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
    _common.waitForLoaderToDisappear()
    cy.wait(2000) // Added this wait as script was getting failed
  });

  it("TC - Check scope select option 'All item current selected lead record', it will take all items of selected header", function () {

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
      _common.setup_gridLayout(cnt.uuid.QUOTES,CONTAINER_COLUMNS_QUOTE)
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES)
    _common.create_newRecord(cnt.uuid.QUOTES)
    _package.enterRecord_toCreateQuote(Cypress.env('RFQ_CODE'),MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.saveCellDataToEnv(cnt.uuid.QUOTES,app.GridCells.CODE,"QUOTE_CODE_1")

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2)
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,CONTAINER_COLUMNS_QUOTE_ITEMS)
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
    _common.create_newRecord(cnt.uuid.QUOTES_ITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MATERIAL_RECORD_CODE_1)
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTE_ITEMS.QUANTITY[0])
    _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
    cy.SAVE()

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.RFQ_HEADER_FK,Cypress.env('RFQ_CODE'))

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2)
    })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.CODE);
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_ITEMS.PRICE[0]);
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTE_ITEMS.QUANTITY[1])
    _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
    _common.waitForLoaderToDisappear()

    _validate.validate_replaceMaterial(REPLACE_MATERIAL,{materialCode_1:CONTAINERS_RESOURCE.CODE,materialCode_2:MATERIAL_RECORD_CODE_1})
    _common.waitForLoaderToDisappear()

  })

  it("TC - Check replace from: if mark specific catalog, then the material only from select material catalog", function () { 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
    _common.waitForLoaderToDisappear()
    _validate.validate_replaceMaterial(REPLACE_MATERIAL_2,{materialCode_2:MATERIAL_RECORD_CODE_1,materialCode_3:MATERIAL_RECORD_CODE})
  })

  it("TC - Converted Unit Rate:  only applicable to children level, if BAS_UOM_PRICE_UNIT_FK are same between root & children, it will equal to unit rate; else need to convert unit rate based on root UoM", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
    _common.waitForLoaderToDisappear()
    _validate.validate_replaceMaterial(REPLACE_MATERIAL_3,{materialCode_2:MATERIAL_RECORD_CODE_1,materialCode_3:MATERIAL_RECORD_CODE})
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    })
  })

  it("TC - Click replace button: it will update item with select material, and calculation of items container and total container is correct", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
    _common.waitForLoaderToDisappear()
    _validate.validate_replaceMaterial(REPLACE_MATERIAL_4,{materialCode_2:MATERIAL_RECORD_CODE_1,materialCode_3:MATERIAL_RECORD_CODE})
    _common.waitForLoaderToDisappear()

    cy.SAVE()
    _common.waitForLoaderToDisappear()

    cy.reload()
    cy.wait(2000)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.CODE,Cypress.env("QUOTE_CODE_1"))

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2)
    })
   
    _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
    cy.wait(1000)
      .then(()=>{
        var quoteItemQuantity:string[]=[]
        var quoteItemPrice:string[]=[]
        var quoteItemTotal:string[]=[]
        quoteItemQuantity=_common.returnArrayForMultipleCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.QUANTITY_SMALL)
        quoteItemPrice=_common.returnArrayForMultipleCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.PRICE_SMALL)
        quoteItemTotal=_common.returnArrayForMultipleCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.TOTAL)
       
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK, CONTAINERS_RESOURCE.CODE)
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.getText_fromCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.TOTAL)
              .then(($itemsTotal)=>{
                  let totalPrice:any=parseFloat($itemsTotal.text().replace(',','')).toFixed(2)
                  let quoteItemQuantity_Material1:any=parseFloat(quoteItemQuantity[0].replace(',','')).toFixed(2)
                  let quoteItemPrice_Material1:any=parseFloat(quoteItemPrice[0].replace(',','')).toFixed(2)
                  let calculatedTotal:any=quoteItemQuantity_Material1*quoteItemPrice_Material1
                  expect(parseFloat(calculatedTotal).toFixed(2)).equals(totalPrice)
              })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK, MATERIAL_RECORD_CODE)
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.getText_fromCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.TOTAL)
                    .then(($itemsTotal)=>{
                        let totalPrice:any=parseFloat($itemsTotal.text().replace(',','')).toFixed(2)
                        let quoteItemQuantity_Material1:any=parseFloat(quoteItemQuantity[1].replace(',','')).toFixed(2)
                        let quoteItemPrice_Material1:any=parseFloat(quoteItemPrice[1].replace(',','')).toFixed(2)
                        let calculatedTotal:any=quoteItemQuantity_Material1*quoteItemPrice_Material1
                        expect(parseFloat(calculatedTotal).toFixed(2)).equals(totalPrice)
                    })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK, MATERIAL_RECORD_CODE)
        _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK,MATERIAL_RECORD_CODE)

        _common.openTab(app.TabBar.QUOTES).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.QUOTES_TOTALS,app.FooterTab.TOTALS,2)
          _common.clickOn_toolbarButton(cnt.uuid.QUOTES_TOTALS,btn.ToolBar.ICO_RECALCULATE)
          _common.waitForLoaderToDisappear()
          let quoteItemTotal_Material1:any=parseFloat(quoteItemTotal[0].replace(',','')).toFixed(2)
          let quoteItemTotal_Material2:any=parseFloat(quoteItemTotal[1].replace(',','')).toFixed(2)
          let total:any=(+quoteItemTotal_Material1)+(+quoteItemTotal_Material2)
          _common.clear_subContainerFilter(cnt.uuid.QUOTES_TOTALS)
          _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_TOTALS,app.GridCells.TRANSLATED,commonLocators.CommonKeys.TOTAL,PACKAGE_TOTAL_TRANSLATION)
          _common.select_activeRowInContainer(cnt.uuid.QUOTES_TOTALS)
          _common.assert_forNumericValues(cnt.uuid.QUOTES_TOTALS,app.GridCells.VALUE_NET,(parseFloat(total).toFixed()).toString())
        })
      })
  })

  it("TC - After replace, description / price condition / price, should be updated with new material", function () {

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.RFQ_HEADER_FK,Cypress.env("QUOTE_CODE_1"))

    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2)
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK, MATERIAL_RECORD_CODE)
    _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS,app.GridCells.MDC_MATERIAL_FK,MATERIAL_RECORD_CODE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS,app.GridCells.DESCRIPTION_1,MATERIAL_RECORD_DESC)
    _common.assert_forNumericValues(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0])
  })

  it("TC - Replace the material from Quote for the suppliers in Quote's items Container", function () {
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES, MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0]);
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2)
    })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.CODE);
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_ITEMS.PRICE[0]);
    _common.select_activeRowInContainer(cnt.uuid.QUOTES_ITEMS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
    _common.waitForLoaderToDisappear()
    _rfqPage.Replace_Material_Quotes("Current Quote",1,"All catalogs",0,"MG3FM","MG3DM")
    _common.waitForLoaderToDisappear()

  });

  it("TC - Verify the replace material with existing", function () {
    _common.openTab(app.TabBar.QUOTES).then(()=>{
     _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS)
    });
    _common.select_allContainerData(cnt.uuid.QUOTES_ITEMS)
   _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
   _rfqPage.assert_cellData_not_equal(cnt.uuid.QUOTES_ITEMS ,app.GridCells.PRICE_SMALL,CONTAINERS_QUOTE_ITEMS.QUANTITY[0])
  });
});
