import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _estimatePage,_wicpage,_boqPage, _mainView, _modalView, _schedulePage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const WIC_CODE = "WIC-CODE-" + Cypress._.random(0, 999);
const WIC_DESC = "WIC-DESC-" + Cypress._.random(0, 999);
const WIC_CATALOGUES_DESC = "WIC-CAT-DESC-" + Cypress._.random(0, 999);
const WIC_BOQ_STRU_DESC = "WIC-CAT-DESC-" + Cypress._.random(0, 999);
const WIC_BOQ_STRU_DESC1 = "WIC-CAT-DESC1-" + Cypress._.random(0, 999);

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC1 = "BOQSTR-DESC1-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const ESTIMATE_DESC = "EST-DESC-" + Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let WIC_BOQS_STRUCTURE_PARAMETERS1:DataCells;
let WIC_BOQS_STRUCTURE_PARAMETERS2:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_WIC;
let CONTAINER_COLUMNS_WIC_CATALOGUES;
let CONTAINER_COLUMNS_SOURCE_BOQ;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let BOQS_STRUCTURE_PARAMETERS1:DataCells;
let ESTIMATE_PARAMETERS:DataCells;
let CONTAINERS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS :DataCells;
let CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT;
let CONTAINERS_SYSTEM_OPTION;
let CONTAINERS_ASSEMBLY;
let CONTAINERS_SOURCE_BOQ;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 7.25 | System Option 10104 True filter related assemblies by using filter by BOQs assemblies structure and wic BOQs");

describe("EST- 7.25 | System Option 10104 True filter related assemblies by using filter by BOQs assemblies structure and wic BOQs", () => {

  before(function () {

    cy.fixture("estimate/est-7.25-system-option-10104-true-filter-related-assemblies-by-using-filter-by-boqs-assemblies-structure-and-wic-boqs.json")
      .then((data) => {
        this.data = data;
        CONTAINER_COLUMNS_WIC= this.data.CONTAINER_COLUMNS.WIC
        CONTAINER_COLUMNS_WIC_CATALOGUES= this.data.CONTAINER_COLUMNS.WIC_CATALOGUES
        CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT=this.data.CONTAINER_COLUMNS.ASSEMBLY_ASSIGNMENT
        CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
        CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_SOURCE_BOQ= this.data.CONTAINER_COLUMNS.SOURCE_BOQ
        CONTAINER_COLUMNS_ESTIMATE= this.data.CONTAINER_COLUMNS.ESTIMATE
        CONTAINER_COLUMNS_LINE_ITEM= this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINERS_ESTIMATE= this.data.CONTAINERS.ESTIMATE
        CONTAINERS_SYSTEM_OPTION= this.data.CONTAINERS.SYSTEM_OPTION
        CONTAINERS_ASSEMBLY= this.data.CONTAINERS.ASSEMBLY
        CONTAINERS_SOURCE_BOQ= this.data.CONTAINERS.SOURCE_BOQ

        BOQS_PARAMETERS = {
          [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
        };
        WIC_BOQS_STRUCTURE_PARAMETERS1 = {
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]: WIC_BOQ_STRU_DESC,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
          [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
        };
        WIC_BOQS_STRUCTURE_PARAMETERS2 = {
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]: WIC_BOQ_STRU_DESC1,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
          [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
        };
        BOQS_STRUCTURE_PARAMETERS1 = {
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC1,
        };
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESC,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
        },
        GENERATE_LINE_ITEMS_PARAMETERS={
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC               
        }
      }).then(()=>{
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
  it("TC - Verify system option 10104 is true", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_SYSTEM_OPTION.SYSTEM_OPTION)
    _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_SYSTEM_OPTION.SYSTEM_OPTION)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.DATA_RECORDS,CONTAINERS_SYSTEM_OPTION.DESCRIPTION)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//wait is needed to load validation value
    _common.assert_forNumericValues(cnt.uuid.DATA_RECORDS,app.GridCells.PARAMETER_VALUE,CONTAINERS_SYSTEM_OPTION.VALUE)
    });
   
  it("TC - Create WIC groups,WIC catalogues,WIC BOQs", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC);
    _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 1);
      _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.WIC_GROUPS);
    _wicpage.enterRecord_toCreateWICGroup(WIC_CODE,WIC_DESC)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WIC_CATALOGUES, 1);
      _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES,CONTAINER_COLUMNS_WIC_CATALOGUES)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.WIC_CATALOGUES);
    _wicpage.enterRecord_toCreateWICCatalogs(cnt.uuid.WIC_CATALOGUES,WIC_CATALOGUES_DESC)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.WIC_CATALOGUES,btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,WIC_BOQS_STRUCTURE_PARAMETERS1);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,WIC_BOQS_STRUCTURE_PARAMETERS2);
    cy.SAVE();
    _common.waitForLoaderToDisappear();  
  });
  it("TC - Create BoQs assembly assignments", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_ASSIGNMENT, app.FooterTab.ASSEMBLY_ASSIGNMENT, 1);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLY_ASSIGNMENT, CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT)
    });
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,WIC_BOQ_STRU_DESC)
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.ASSEMBLY_ASSIGNMENT)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_ASSIGNMENT,app.GridCells.EST_LINE_ITEM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY.ASSEMBLY_CODE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,WIC_BOQ_STRU_DESC1)
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.ASSEMBLY_ASSIGNMENT)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_ASSIGNMENT,app.GridCells.EST_LINE_ITEM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY.ASSEMBLY_CODE)
    cy.SAVE()
    _common.waitForLoaderToDisappear();
  })
  it("TC - Create BOQ header and BOQ structure record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS)
    _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC, BOQ_ROOT_ITEM)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS1);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  })
  it("TC - Assign source boq to boq structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2);
      _common.waitForLoaderToDisappear();
      _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCE_BOQ)
      _common.waitForLoaderToDisappear()
    });
    _common.waitForLoaderToDisappear()
    _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BOQSOURCE,cnt.uuid.BOQ_STRUCTURES,CONTAINERS_SOURCE_BOQ.COPY_FROM,WIC_CODE,Cypress.env('PROJECT_NUMBER'),CONTAINERS_SOURCE_BOQ.BOQ_SELECTION,WIC_BOQ_STRU_DESC,BOQ_STRUCT_DESC1)
    _common.waitForLoaderToDisappear();
    cy.SAVE()
    _common.waitForLoaderToDisappear();
    _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BOQSOURCE,cnt.uuid.BOQ_STRUCTURES,CONTAINERS_SOURCE_BOQ.COPY_FROM,WIC_CODE,Cypress.env('PROJECT_NUMBER'),CONTAINERS_SOURCE_BOQ.BOQ_SELECTION,WIC_BOQ_STRU_DESC1,BOQ_STRUCT_DESC1)
    _common.waitForLoaderToDisappear();
    cy.SAVE()
    _common.waitForLoaderToDisappear();
    })
    it("TC - Create Estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
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
    })
    it("TC - Genrate line item from wizard", function () {
       _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
    });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
      _common.waitForLoaderToDisappear()
      _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
    })
   it("TC - Verify Line Item WIC BoQs record in related Assemblies by 'filtering by Assembly Structure'", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_STRUCTURE, app.FooterTab.ASSEMBLY_STRUCTURE, 0);
    });
    _common.select_rowHasValue(cnt.uuid.ASSEMBLY_STRUCTURE,CONTAINERS_ASSEMBLY.ASSEMBLY_STRUCTURE);
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC, app.FooterTab.RELATED_ASSEMBLIES, 1);
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,btn.ToolBar.ICO_FILTER_ASSEMBLY);
    _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,app.GridCells.EST_ASSEMBLY_DESCRIPTION,CONTAINERS_ASSEMBLY.ASSEMBLY_DESCRIPTION); 
   })
   it("TC - Verify Line Item WIC BoQs record in related Assemblies by 'filtering by WIC BoQs'", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.WIC_BOQS, app.FooterTab.WIC_BOQS, 0);
    });
    _common.waitForLoaderToDisappear()
    _wicpage.selectdata_fromWICBOQs_container(cnt.uuid.WIC_BOQS,WIC_CODE)
    _common.waitForLoaderToDisappear();
    _common.select_rowHasValue(cnt.uuid.WIC_BOQS,CONTAINERS_SOURCE_BOQ.BOQ_TYPE)
    _common.clickOn_toolbarButton(cnt.uuid.WIC_BOQS,btn.ToolBar.ICO_TREE_EXPAND_ALL);
    _common.search_inSubContainer(cnt.uuid.WIC_BOQS,WIC_BOQ_STRU_DESC)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.WIC_BOQS)
    _common.select_rowHasValue(cnt.uuid.WIC_BOQS,WIC_BOQ_STRU_DESC)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC, app.FooterTab.RELATED_ASSEMBLIES, 1);
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,btn.ToolBar.ICO_FILTER_WIC_BOQ);
    _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,app.GridCells.EST_ASSEMBLY_DESCRIPTION,CONTAINERS_ASSEMBLY.ASSEMBLY_DESCRIPTION); 
   })
   it("TC - Verify Line Item BoQs record in related Assemblies by 'filtering by BoQs'", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.FooterTab.BOQs, 0);
        _common.waitForLoaderToDisappear()
    });
    _common.waitForLoaderToDisappear();
    _common.clear_subContainerFilter(cnt.uuid.BOQ_ESTIMATEBYBOQ)
    _common.search_inSubContainer(cnt.uuid.BOQ_ESTIMATEBYBOQ,WIC_BOQ_STRU_DESC)
    _common.waitForLoaderToDisappear();
    _common.select_rowHasValue(cnt.uuid.BOQ_ESTIMATEBYBOQ,WIC_BOQ_STRU_DESC)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC, app.FooterTab.RELATED_ASSEMBLIES, 1);
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,btn.ToolBar.ICO_FILTER_BOQ);
    _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,app.GridCells.EST_ASSEMBLY_DESCRIPTION,CONTAINERS_ASSEMBLY.ASSEMBLY_DESCRIPTION); 
   })
})
  after(() => {
    cy.LOGOUT();
  });
   
  



