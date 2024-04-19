import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import CommonLocators from "cypress/locators/common-locators";
import { _assembliesPage, _bidPage, _boqPage, _common, _estimatePage, _modalView, _projectPage, _salesPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import common from "mocha/lib/interfaces/common";


const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const EST_CODE_1 = "2" + Cypress._.random(0, 999);
const EST_DESC_1 = "EST-DESC1-" + Cypress._.random(0, 999);
const ASSEMBLY_DESC = 'Test' + Cypress._.random(0, 999);
const LINE_ITEM_DESC = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const LINE_ITEM_DESCRIPTION = "LINE_ITEM_DESC1-" + Cypress._.random(0, 999);
const ASSEMBLY_CATEGORY_DESC = "AC_DESC-" + Cypress._.random(0, 999);
const ASSEMBLIES_DESC = "AC_DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells
let ESTIMATE_PARAMETERS_1: DataCells
let CONTAINERS_ASSEMBLY_RESOURCE;
let CONTAINERS_ASSEMBLIES;
let ASSEMBLY_RESOURCE_MATERIAL_PARAMETER: DataCells;
let ASSEMBLY_RESOURCE_COST_CODE_PARAMETER: DataCells;
let ASSEMBLIES_PARAMETER: DataCells;
let CONTAINER_COLUMNS_ASSEMBLIES;
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE;
let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let PROJECTS_PARAMETERS
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_DATA_TYPE;
let CONTAINER_COLUMNS_DATA_TYPE;
let CONTAINER_COLUMNS_DATA_RECORD;
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS_1: DataCells
let CONTAINERS_PROJECT_COST_CODES;
let CONTAINER_COLUMNS_PROJECT_COST_CODES;
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.108 | Multi select assembly on estimate resource");

describe("EST- 1.108 | Multi select assembly on estimate resource", () => {
  beforeEach(function () {
    cy.fixture(
      "estimate/est-1.108-multi-select-assembly-on-estimate-resource.json"
    ).then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.fixture(
      "estimate/est-1.108-multi-select-assembly-on-estimate-resource.json"
    ).then((data) => {
      this.data = data;
     
      CONTAINERS_ASSEMBLIES = this.data.CONTAINERS.ASSEMBLIES
      CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES

      CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES

      CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
      CONTAINERS_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
      CONTAINER_COLUMNS_DATA_TYPE = this.data.CONTAINER_COLUMNS.DATA_TYPE
      CONTAINERS_DATA_TYPE=this.data.CONTAINERS.DATA_TYPE
			CONTAINER_COLUMNS_DATA_RECORD = this.data.CONTAINER_COLUMNS.DATA_RECORD
			CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
			CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
      ESTIMATE_PARAMETERS_1 = {
				[app.GridCells.CODE]: EST_CODE_1,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC_1,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
				[commonLocators.CommonLabels.NAME]: PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]: CLERK
			}
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      };
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
      };
    LINE_ITEM_PARAMETERS_1 = {
      [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESC,
      [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
      [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
  };
    CONTAINERS_PROJECT_COST_CODES = this.data.CONTAINERS.PROJECT_COST_CODES;
    CONTAINER_COLUMNS_PROJECT_COST_CODES = this.data.CONTAINER_COLUMNS.PROJECT_COST_CODES
    ASSEMBLY_RESOURCE_COST_CODE_PARAMETER = {
      [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY,
      [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE_C,
  }
  ASSEMBLY_RESOURCE_MATERIAL_PARAMETER = {
      [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCE.ASSEMBLY_TYPE,
      [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE_CA,

  }
  ASSEMBLIES_PARAMETER = {
      [app.GridCells.DESCRIPTION_INFO]: ASSEMBLY_DESC,
      [app.GridCells.RULE]: CONTAINERS_ASSEMBLIES.RULE,
      [app.GridCells.PARAM]: CONTAINERS_ASSEMBLIES.PARAMETER,
      [app.GridCells.COST_GROUP_LIC_DIN276_2018_12]: CONTAINERS_ASSEMBLIES.DIN276_2018_12
  }
  RESOURCE_PARAMETERS = {
    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_2,
    [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_2,
};
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
      /* Open desktop should be called in before block */
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
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
		
    });
  });
  it('TC - Prerequisistes - customizing UDP-1-5', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
  _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
      _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
    })
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_DATA_TYPE.USER)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPE.USER_DEFINED_COST_COLUMNS)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
      _common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_DATA_RECORD)
    })
    _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE, commonLocators.CommonKeys.UNCHECK)
    _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES, app.GridCells.IS_LIVE,  commonLocators.CommonKeys.CHECK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create new estimate header", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)

		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
  });

  it("TC - Create new line item record", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
  });
  _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
  _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
  _common.waitForLoaderToDisappear()
  cy.SAVE()
  _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  cy.SAVE()
});

it("TC - Verify resources get assigned to the line item while selecting multiple assemblies.", function () { 
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
  });
  _common.maximizeContainer(cnt.uuid.RESOURCES)
  _common.create_newRecord(cnt.uuid.RESOURCES)
  _common.edit_dropdownCellWithCaret(cnt.uuid.RESOURCES,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_RESOURCE.SHORT_KEY)
  _common.lookUpButtonInCell(cnt.uuid.RESOURCES, app.GridCells.CODE, app.InputFields.ICO_INPUT_LOOKUP, 0)
  _common.clickOn_cellHasValue_fromModal(app.GridCells.ASSEMBLYPOPUP_CODE,CONTAINERS_RESOURCE.CODE)
  _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonKeys.MODAL_FOOTER,commonLocators.CommonModalElements.MULTIPLE_SELECTIONS_0_ITEMS_SELECTED,0)
  _common.select_multipleRow_fromModal()
  _common.clickOn_checkboxByLabel_fromModal
  _common.clickOn_modalFooterButton(Buttons.ButtonText.OK)
  _common.minimizeContainer(cnt.uuid.RESOURCES)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
});



it('TC - Create new Assemblies record and assign resource', function () {
	_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)

    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
  });
  _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLIES.CODE);
  _common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER);
  _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
    _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
    _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLIES.code, CONTAINER_COLUMNS_ASSEMBLIES.descriptioninfo, CONTAINER_COLUMNS_ASSEMBLIES.quantity], cnt.uuid.ASSEMBLIES)
  });
  cy.wait(1000);//required wait
  _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES);
  _common.create_newRecord(cnt.uuid.ASSEMBLIES);
  _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETER);
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.select_activeRowInContainer(cnt.uuid.ASSEMBLIES)
  _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.CODE, "ASSEMBLY_CODE")
  cy.wait(1000)//required wait
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 3);
    _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE);
    _common.waitForLoaderToDisappear()
    _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey], cnt.uuid.ASSEMBLY_RESOURCE)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
  });
  cy.wait(1000)//required wait
  _common.clickOn_cellHasValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
  cy.wait(1000)//required wait
  _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
  _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
  _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER);
cy.SAVE()
_common.waitForLoaderToDisappear()
  _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE);
  _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETER);
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  cy.wait(1000)//required wait
  _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, "COST_UNIT")
  _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
});

it('TC - Create new Estimate header', function () {
	_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_1);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
});

it('TC - Create new Line item and adding Assembly Template', function () {

  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    _common.waitForLoaderToDisappear()
    _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.productivityfactor, CONTAINER_COLUMNS_LINE_ITEM.costfactor1, CONTAINER_COLUMNS_LINE_ITEM.costfactor2, CONTAINER_COLUMNS_LINE_ITEM.estassemblyfk, CONTAINER_COLUMNS_LINE_ITEM.costtotal, CONTAINER_COLUMNS_LINE_ITEM.quantitytotal], cnt.uuid.ESTIMATE_LINEITEMS)
  });
  _common.waitForLoaderToDisappear()
  _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
  _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1);
  _common.waitForLoaderToDisappear()
  cy.SAVE()
_common.waitForLoaderToDisappear()
_common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_ASSEMBLY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("ASSEMBLY_CODE"))
cy.SAVE();
  _common.waitForLoaderToDisappear()

});

  it('TC - Verify Cost group values, if line item exist costgroup. Costgroup value should be displayed. If line item do not exist costgroup, Costgroup should get from assembly to line item', function () {
    _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12, CONTAINERS_ASSEMBLIES.DIN276_2018_12)
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costunit], cnt.uuid.RESOURCES)
    });
  });

it('TC - Verify CA cost/unit value should get from master assembly', function () {

  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
  });
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
  _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.waitForLoaderToDisappear()
  });
  _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_ASSEMBLY_RESOURCE.CODE_CA)
  cy.wait(1000)//required wait
  _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, Cypress.env("COST_UNIT"))
});

it('TC - Verify Resource Qauntity Total = LI Quantity Total * resource quantiy factor1/2/3/4/CC* parant productivity Factor * res productivity Factor', function () {

  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.code, CONTAINER_COLUMNS_RESOURCE.descriptioninfo, CONTAINER_COLUMNS_RESOURCE.costtotal, CONTAINER_COLUMNS_RESOURCE.costfactor1, CONTAINER_COLUMNS_RESOURCE.costfactor2, CONTAINER_COLUMNS_RESOURCE.costfactorcc, CONTAINER_COLUMNS_RESOURCE.iscost, CONTAINER_COLUMNS_RESOURCE.productivityfactor, CONTAINER_COLUMNS_RESOURCE.quantityfactor1, CONTAINER_COLUMNS_RESOURCE.quantityfactor2, CONTAINER_COLUMNS_RESOURCE.quantityfactor3, CONTAINER_COLUMNS_RESOURCE.quantityfactor4, CONTAINER_COLUMNS_RESOURCE.quantityfactorcc, CONTAINER_COLUMNS_RESOURCE.quantity, CONTAINER_COLUMNS_RESOURCE.quantitytotal], cnt.uuid.RESOURCES)
  _common.waitForLoaderToDisappear()
  });
  _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL).then(($LI_QuantityTotal) => {
    var LI_QuantityTotal = parseFloat($LI_QuantityTotal.text())
    Cypress.env("LI_QuantityTotal", LI_QuantityTotal)
  })
  _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRODUCTIVITY_FACTOR).then(($PARENT_PRODUCTIVITY_FACTOR) => {
    var PARENT_PRODUCTIVITY_FACTOR = parseFloat($PARENT_PRODUCTIVITY_FACTOR.text())
    Cypress.env("PARENT_PRODUCTIVITY_FACTOR", PARENT_PRODUCTIVITY_FACTOR)
  })
  _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.waitForLoaderToDisappear()
  _common.maximizeContainer(cnt.uuid.RESOURCES)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY)
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_1).then(($QUANTITY_FACTOR_1) => {
    var QUANTITY_FACTOR_1 = parseFloat($QUANTITY_FACTOR_1.text())
    Cypress.env("QUANTITY_FACTOR_1", QUANTITY_FACTOR_1)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_2).then(($QUANTITY_FACTOR_2) => {
    var QUANTITY_FACTOR_2 = parseFloat($QUANTITY_FACTOR_2.text())
    Cypress.env("QUANTITY_FACTOR_2", QUANTITY_FACTOR_2)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_3).then(($QUANTITY_FACTOR_3) => {
    var QUANTITY_FACTOR_3 = parseFloat($QUANTITY_FACTOR_3.text())
    Cypress.env("QUANTITY_FACTOR_3", QUANTITY_FACTOR_3)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_4).then(($QUANTITY_FACTOR_4) => {
    var QUANTITY_FACTOR_4 = parseFloat($QUANTITY_FACTOR_4.text())
    Cypress.env("QUANTITY_FACTOR_4", QUANTITY_FACTOR_4)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_CC).then(($QUANTITY_FACTOR_CC) => {
    var QUANTITY_FACTOR_CC = parseFloat($QUANTITY_FACTOR_CC.text())
    Cypress.env("QUANTITY_FACTOR_CC", QUANTITY_FACTOR_CC)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.PRODUCTIVITY_FACTOR).then(($PRODUCTIVITY_FACTOR) => {
    var PRODUCTIVITY_FACTOR = parseFloat($PRODUCTIVITY_FACTOR.text())
    Cypress.env("PRODUCTIVITY_FACTOR", PRODUCTIVITY_FACTOR)
  })
  cy.wait(500).then(() => {
    var Quantity_Factors = Cypress.env("QUANTITY_FACTOR_1") * Cypress.env("QUANTITY_FACTOR_2") * Cypress.env("QUANTITY_FACTOR_3") * Cypress.env("QUANTITY_FACTOR_4") * Cypress.env("QUANTITY_FACTOR_CC")
    var Resource_Quantity_Total = Cypress.env("LI_QuantityTotal") * Quantity_Factors * Cypress.env("PRODUCTIVITY_FACTOR") * Cypress.env("PARENT_PRODUCTIVITY_FACTOR")
    _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_TOTAL, Resource_Quantity_Total.toString())
  })
  _common.minimizeContainer(cnt.uuid.RESOURCES)

});

it('TC - Verify Resource cost Total =Resource Qauntity Total* Rate(currency)* res cost factor1/2/CC * parent cost factor1/2 ', function () {
  _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY, CONTAINERS_ASSEMBLY_RESOURCE.SHORT_KEY)

  _common.maximizeContainer(cnt.uuid.RESOURCES)
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_TOTAL).then(($res_QuantityTotal) => {
    var res_QuantityTotal = parseFloat($res_QuantityTotal.text())
    Cypress.env("res_QuantityTotal", res_QuantityTotal)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_1).then(($COST_FACTOR_1) => {
    var COST_FACTOR_1 = parseFloat($COST_FACTOR_1.text())
    Cypress.env("COST_FACTOR_1", COST_FACTOR_1)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_2).then(($COST_FACTOR_2) => {
    var COST_FACTOR_2 = parseFloat($COST_FACTOR_2.text())
    Cypress.env("COST_FACTOR_2", COST_FACTOR_2)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_CC).then(($COST_FACTOR_CC) => {
    var COST_FACTOR_CC = parseFloat($COST_FACTOR_CC.text())
    Cypress.env("COST_FACTOR_CC", COST_FACTOR_CC)
  })
  _common.minimizeContainer(cnt.uuid.RESOURCES)
  _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_FACTOR_1).then(($PARENT_COST_FACTOR_1) => {
    var PARENT_COST_FACTOR_1 = parseFloat($PARENT_COST_FACTOR_1.text())
    Cypress.env("PARENT_COST_FACTOR_1", PARENT_COST_FACTOR_1)
  })
  _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT).then(($Rate_currency) => {
    var Rate_currency = parseFloat($Rate_currency.text())
    Cypress.env("Rate_currency", Rate_currency)
  })
  _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_FACTOR_2).then(($PARENT_COST_FACTOR_2) => {
    var PARENT_COST_FACTOR_2 = parseFloat($PARENT_COST_FACTOR_2.text())
    Cypress.env("PARENT_COST_FACTOR_2", PARENT_COST_FACTOR_2)
  })
  cy.wait(500).then(() => {
    var Cost_Factors = Cypress.env("COST_FACTOR_1") * Cypress.env("COST_FACTOR_2") * Cypress.env("COST_FACTOR_CC")
    var Parent_Cost_Factors = Cypress.env("PARENT_COST_FACTOR_1") * Cypress.env("PARENT_COST_FACTOR_2") * Cypress.env("COST_FACTOR_CC")
    var Resource_Cost_Total = Cypress.env("res_QuantityTotal") * Cypress.env("Rate_currency") * Cost_Factors * Parent_Cost_Factors
    _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL, Resource_Cost_Total.toString())
  })
});

it('TC - Verify Resource with IsCost=1, DW/T+M do sum to lineitem', function () {

  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.iscost, CONTAINER_COLUMNS_RESOURCE.dayworkrateunit, CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP1costunit, CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP2costunit, CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP3costunit, CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP4costunit, CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP5costunit], cnt.uuid.RESOURCES)
  });
  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
  });
  _common.maximizeContainer(cnt.uuid.RESOURCES)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C)
  _common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINER_COLUMNS_LINE_ITEM)
  _common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.perform_additionOfCellData(cnt.uuid.RESOURCES, app.GridCells.DAY_WORK_RATE_UNIT)
  _common.minimizeContainer(cnt.uuid.RESOURCES)
  cy.SAVE().then(() => {
   _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DAY_WORK_RATE_UNIT,Cypress.env("AdditionOfColumnValues").toString())
  })
});

it('TC - Verify Resource with IsCost=1,UDP1-5 do sum to lineitem', function () {
  _common.waitForLoaderToDisappear()
  cy.wait(1000).then(() => {
    _common.create_newRecord(cnt.uuid.RESOURCES)

    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP1_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.LEASING_COST_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP1_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.LEASING_COST_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP1_COST_UNIT, CONTAINERS_RESOURCE.LEASING_COST_UNIT)
  })
  cy.wait(1000).then(() => {
    _common.edit_containerCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP2_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.SERVICE_COST_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP2_COST_UNIT, CONTAINERS_RESOURCE.SERVICE_COST_UNIT)
  })
  cy.wait(1000).then(() => {
    _common.edit_containerCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP3_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.INSTALLATION_COST_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    cy.wait(1000)//required wait
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP3_COST_UNIT, CONTAINERS_RESOURCE.INSTALLATION_COST_UNIT)
  })
  cy.wait(1000).then(() => {
    _common.edit_containerCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP4_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.LIST_MINUS_COST_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP4_COST_UNIT, CONTAINERS_RESOURCE.LIST_MINUS_COST_UNIT)
  })
  cy.wait(1000).then(() => {
    _common.edit_containerCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP5_COST_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.LIST_MAXS_COST_UNIT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    cy.wait(1000)//required wait
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.ESTIMATE_LINE_ITEM_UDP5_COST_UNIT, CONTAINERS_RESOURCE.LIST_MAXS_COST_UNIT)
  })
});

it('TC - Verify cost/unit value of material and costcode should get from project costcode job rate/material if it is fixed', function () {
	_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
_common.waitForLoaderToDisappear()
  cy.REFRESH_CONTAINER()
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.setDefaultView(app.TabBar.PROJECT)
    _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
  });
  cy.wait(200).then(() => {
    _common.search_inSubContainer(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CODE"))
  })
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECT_COST_CODES, app.FooterTab.COSTCODES, 1);
    _common.setup_gridLayout(cnt.uuid.PROJECT_COST_CODES, CONTAINER_COLUMNS_PROJECT_COST_CODES);
  });
  _common.search_inSubContainer(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C);
  _common.set_cellCheckboxValue(cnt.uuid.PROJECT_COST_CODES, app.GridCells.IS_RATE, commonLocators.CommonKeys.CHECK)
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOB_RATES, 0);
  });
  _common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
  _common.waitForLoaderToDisappear()
  _common.edit_containerCell(cnt.uuid.COSTCODESJOBRATE, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROJECT_COST_CODES.RATE_PROJECT)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);
  _common.findRadio_byLabel_fromModal(CommonLocators.CommonLabels.HIGHLIGHTED_ASSEMBLY, CommonLocators.CommonKeys.RADIO, 0, CommonLocators.CommonElements.PLATFORM_FORM_ROW)
  _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  _common.waitForLoaderToDisappear()
  _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
  _common.select_rowHasValue(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CODE"))
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
  });
  _common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE);
  _common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C)
  _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
  _common.select_rowHasValue(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CODE"))
  _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
  _common.select_rowInContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
  cy.wait(1000).then(() => {
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_PROJECT_COST_CODES.RATE_PROJECT)
  })
});


it('TC - Verify cost/unit value of material and costcode should get from project assembly if it is unfixed', function () {

  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
  });
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECT_COST_CODES, app.FooterTab.COSTCODES, 1);
  });
  _common.search_inSubContainer(cnt.uuid.PROJECT_COST_CODES, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C);
  _common.set_cellCheckboxValue(cnt.uuid.PROJECT_COST_CODES, app.GridCells.IS_RATE, commonLocators.CommonKeys.UNCHECK)
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COSTCODES_JOB_RATES, 3);
  });
  _common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
  _common.waitForLoaderToDisappear()
  _common.edit_containerCell(cnt.uuid.COSTCODESJOBRATE, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROJECT_COST_CODES.RATE_PROJECT_UNFIXED)
  cy.SAVE()
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
  _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY);
  _common.findRadio_byLabel_fromModal(CommonLocators.CommonLabels.HIGHLIGHTED_ASSEMBLY, CommonLocators.CommonKeys.RADIO, 0,CommonLocators.CommonElements.PLATFORM_FORM_ROW)
  _common.clickOn_modalFooterButton(btn.ButtonText.OK)
  _common.waitForLoaderToDisappear()
  _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
  _common.select_rowHasValue(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CODE"))
  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
  });
  _common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE);
  _common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_C)
  _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
  _common.select_rowInContainer(cnt.uuid.ASSEMBLY)
  _common.select_rowHasValue(cnt.uuid.ASSEMBLY,Cypress.env("ASSEMBLY_CODE"))
  _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
  _common.select_rowInContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
  cy.wait(1000).then(() => {
    _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, CONTAINERS_PROJECT_COST_CODES.RATE_PROJECT_UNFIXED)
  })
});

after(() => {
  cy.LOGOUT();
});


})