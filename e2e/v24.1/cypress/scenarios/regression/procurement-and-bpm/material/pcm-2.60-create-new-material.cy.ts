import { app, commonLocators, tile, sidebar, cnt, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _materialPage, _validate, _procurementContractPage, _modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const MATCAT_CODE = "CATALOG-" + Cypress._.random(0, 999);
const MATCAT_DESC = "CATALOG_DESC-" + Cypress._.random(0, 999);
const MATGRP_CODE = "GROUP" + Cypress._.random(0, 999);
const MATGRP_DESC = "GROUP-DESC-" + Cypress._.random(0, 999);
const SUBGRP_CODE = "SUBGROUP" + Cypress._.random(0, 999);
const SUBGRP_DESC = "SUBGROUP-DESC-" + Cypress._.random(0, 999);
const MATERIALRECCODE = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIALRECDESC = "MAT-RECDESC-" + Cypress._.random(0, 999);
const MATERIALRECCODE1 = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIALRECDESC1 = "MAT-RECDESC-" + Cypress._.random(0, 999);

var ContractCode: string

let CONTAINERS_TAX_CODES, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_MATERIAL_CATALOG, CONTAINERS_MATERIAL_GROUPS, CONTAINERS_MATERIALS_TRANSLATION, CONTAINERS_CONTRACT;

let CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_MATERIAL_CATALOG, CONTAINER_COLUMNS_ITEMS_CONTRACT, CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER, CONTAINER_COLUMNS_MATERIAL_RECORD, CONTAINER_COLUMNS_MATERIAL_GROUP;

let MATERIAL_CATALOGS_PARAMETER: DataCells, MATERIAL_GROUP_PARAMETER: DataCells, MATERIAL_SUBGROUPS: DataCells, MATERIAL_RECORDS_PARAMETERS: DataCells, MATERIAL_RECORD_PARAMETER2: DataCells, PROCUREMENT_CONTRACT_PARAMETER: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Material");
ALLURE.story("PCM- 2.60 | Create New Material");

describe("PCM- 2.60 | Create New Material", () => {

  before(function () {

    cy.fixture("pcm/pcm-2.60-create-new-material.json").then((data) => {
      this.data = data;
      CONTAINERS_TAX_CODES = this.data.CONTAINERS.TAX_CODES
      CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
      MATERIAL_CATALOGS_PARAMETER = {
        [app.GridCells.CODE]: MATCAT_CODE,
        [app.GridCells.DESCRIPTION_INFO]: MATCAT_DESC,
        [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER
      }
      CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
      CONTAINERS_MATERIALS_TRANSLATION = this.data.CONTAINERS.MATERIALS_TRANSLATION
      MATERIAL_GROUP_PARAMETER = {
        [app.GridCells.CODE]: MATGRP_CODE,
        [app.GridCells.DESCRIPTION_INFO]: MATGRP_DESC
      }
      CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
      CONTAINERS_MATERIAL_GROUPS = this.data.CONTAINERS.MATERIAL_GROUPS
      CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
      MATERIAL_SUBGROUPS = {
        [app.GridCells.CODE]: SUBGRP_CODE,
        [app.GridCells.DESCRIPTION_INFO]: SUBGRP_DESC,
        [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUPS.PROCUREMENT_STRUCTURE
      }
      CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
      MATERIAL_RECORDS_PARAMETERS = {
        [app.GridCells.CODE]: MATERIALRECCODE,
        [app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECDESC,
        [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
        [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
        [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0]
      }
      MATERIAL_RECORD_PARAMETER2 = {
        [app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECDESC1,
        [app.GridCells.CODE]: MATERIALRECCODE1,
        [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
      }
      CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
      CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
      CONTAINER_COLUMNS_ITEMS_CONTRACT = this.data.CONTAINER_COLUMNS.ITEMS_CONTRACT
      CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS_FILTER
      PROCUREMENT_CONTRACT_PARAMETER = {
        [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_CONTRACT.CONFIGURATION,
        [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BUSINESS_PARTNER
      }
    });
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC- Add tax code in procurement structure', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
    })
    cy.REFRESH_CONTAINER()
    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_TAX_CODES.PROCUREMENT_STRUCTURE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_TAX_CODES.PROCUREMENT_STRUCTURE)
    _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.TAX_CODES, app.FooterTab.TAX_CODE, 0);
    })
    _common.clear_subContainerFilter(cnt.uuid.TAX_CODES);
    _estimatePage.enterRecord_toCreate_TaxCodes(CONTAINERS_TAX_CODES.TAX_CODE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create material catalogue", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
    _common.openTab(app.TabBar.CATALOGS).then(() => {
      _common.setDefaultView(app.TabBar.CATALOGS)
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG);
    })
    _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
    _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
    _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
  });

  it('TC- Create material group', function () {
    _common.openTab(app.TabBar.CATALOGS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP);
    })
    _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
    _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newSubRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_SUBGROUPS);
    cy.SAVE()
  });

  it('TC- Create new Material', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.setDefaultView(app.TabBar.RECORDS)
      _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_6)
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
    });
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_CODE)
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
    });
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
    _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORDS_PARAMETERS)
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
    _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER2)
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.delete_recordFromContainer(cnt.uuid.MATERIAL_RECORDS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DESCRIPTION_INFO_1, MATERIALRECDESC)
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.DISCOUNT[0])
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CHARGES, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CHARGES[0])
    cy.SAVE()
    _validate.verify_estimatePriceUnderMaterialRecord(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0], CONTAINERS_MATERIAL_RECORDS.DISCOUNT[0], CONTAINERS_MATERIAL_RECORDS.CHARGES[0])
  });

  it('TC- verify change in Uom with Price Unit Uom', function () {
    _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.UOM_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.UOM[1])
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC- verify material description is allowed to translate', function () {
    _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIALS_TRANSLATION, app.FooterTab.TRASLATION, 3)
    })
    _common.waitForLoaderToDisappear()
    for (let i = 0; i <= 4; i++) {
      _common.select_rowHasValue(cnt.uuid.MATERIALS_TRANSLATION, CONTAINERS_MATERIALS_TRANSLATION.LANGUAGE[i])
      _common.enterRecord_inNewRow(cnt.uuid.MATERIALS_TRANSLATION, app.GridCells.COL_10, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_MATERIALS_TRANSLATION.DESCRIPTION[i])
      _common.enterRecord_inNewRow(cnt.uuid.MATERIALS_TRANSLATION, app.GridCells.COL_1, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_MATERIALS_TRANSLATION.DESCRIPTION1[i])
      _common.select_activeRowInContainer(cnt.uuid.MATERIALS_TRANSLATION)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    }
    for (var i = 0; i <= 4; i++) {
      _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIALS_TRANSLATION, app.GridCells.LANG_NAME, CONTAINERS_MATERIALS_TRANSLATION.LANGUAGE[i])
      _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIALS_TRANSLATION, app.GridCells.COL_10, CONTAINERS_MATERIALS_TRANSLATION.DESCRIPTION[i])
      _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIALS_TRANSLATION, app.GridCells.COL_1, CONTAINERS_MATERIALS_TRANSLATION.DESCRIPTION1[i])
    }
  });

  it('TC-Verify framework agreements in customizing module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES);
    cy.REFRESH_CONTAINER();
    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CommonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CommonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MASTER_DATA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2)
    });
    _common.clear_subContainerFilter(cnt.uuid.INSTANCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.FRAMEWORK_AGREEMENTS);
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK)
    _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK)
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG);
    })
    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS, MATCAT_CODE)
    _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.MATERIAL_CATALOG_TYPE_FK, commonLocators.CommonKeys.LIST, CommonLocators.CommonKeys.FRAMEWORK_AGREEMENTS)
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_CATALOGS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC- Create New Contract and add item to it', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACT).then(function () {
      _common.setDefaultView(app.TabBar.CONTRACT)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
    })
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT)
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.MATERIAL_CATALOG_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MATCAT_CODE)
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($value) => {
      ContractCode = $value.text()
      cy.log(ContractCode)
    })
    _common.openTab(app.TabBar.CONTRACT).then(function () {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS_CONTRACT)
    })
    _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
    _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC-Verify create/update Framework catalog wizard option', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_FREAMWORK_MATERIAL_CATALOG);
    _common.waitForLoaderToDisappear()
    _materialPage.createUpdate_frameworkExistedCatalogMaterialCatelog_fromWizard(CommonLocators.CommonLabels.EXISTED_CATALOG, MATCAT_CODE)
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(function () {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIAL_CATALOGS, 0)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
    })
    cy.REFRESH_CONTAINER()
    _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, MATCAT_CODE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CON_HEADER_FK, ContractCode)
  });

  it('TC-Verify Material is read only', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER)
    });
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_DESC)
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    _common.assert_cellData(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CON_HEADER_FK, ContractCode)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
    })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, MATERIALRECCODE)
    _validate.verify_ToolbarButtonsDisabledEnabled(cnt.uuid.MATERIAL_RECORDS, btn.ToolBar.ICO_REC_NEW, commonLocators.CommonKeys.DISABLED)
    _validate.verify_ToolbarButtonsDisabledEnabled(cnt.uuid.MATERIAL_RECORDS, Buttons.IconButtons.ICO_REC_DELETE, commonLocators.CommonKeys.DISABLED)
  });

});