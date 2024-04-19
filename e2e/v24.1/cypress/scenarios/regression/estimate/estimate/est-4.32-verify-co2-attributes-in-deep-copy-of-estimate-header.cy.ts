import { app, commonLocators, tile, sidebar, cnt, btn } from "cypress/locators";
import { _common, _assembliesPage, _projectPage, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const ASSEMBLIES_DESCRIPTION = "ASSEMBLY-1-" + Cypress._.random(0, 999)
const EST_CODE = "EST-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC" + Cypress._.random(0, 999);
const LINEITEM_DESC = "EST-DESC" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);

let CONTAINERS_COST_CODES, CONTAINERS_MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_RECORDS, CONTAINERS_ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_RESOURCES, CONTAINERS_PROJECT, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_COST_CODES, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE;

let ASSEMBLIES_PARAMETERS: DataCells, ASSEMBLY_RESOURCE_COST_CODE_PARAMETER: DataCells, PROJECT_PARAMETERS: DataCells, ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS_1: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells, ESTIMATE_DEEP_COPY_PARAMETER: DataCells;

let MODAL_ESTIMATE_DEEPCOPY, MODAL_BUDGET_ESTIMATE_DEEPCOPY

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.32 | Verify co2 attributes in deep copy of estimate header")
describe("EST- 4.32 | Verify co2 attributes in deep copy of estimate header", () => {

  before(function () {

    cy.fixture("estimate/est-4.32-verify-co2-attributes-in-deep-copy-of-estimate-header.json").then((data) => {
      this.data = data
      CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
      CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
      CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER
      CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
      CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
      CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
      CONTAINERS_ASSEMBLY_CATEGORIES = this.data.CONTAINERS.ASSEMBLY_CATEGORIES
      CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES
      CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
      ASSEMBLIES_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: ASSEMBLIES_DESCRIPTION
      };;
      CONTAINERS_ASSEMBLY_RESOURCES = this.data.CONTAINERS.ASSEMBLY_RESOURCES
      CONTAINER_COLUMNS_ASSEMBLY_RESOURCES = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCES
      ASSEMBLY_RESOURCE_COST_CODE_PARAMETER = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCES.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCES.COST_CODE[0]
      }
      CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
      PROJECT_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
      };
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: EST_CODE,
        [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      };
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINEITEM_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0],
      };
      CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
      RESOURCE_PARAMETERS_1 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
        [app.GridCells.CODE]: CONTAINERS_RESOURCES.COST_CODE[0],
      };
      RESOURCE_PARAMETERS_2 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[1],
        [app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0],
      };
      RESOURCE_PARAMETERS_3 = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[2],
        [app.GridCells.CODE]: ASSEMBLIES_DESCRIPTION,
      };
      MODAL_ESTIMATE_DEEPCOPY = this.data.MODAL.ESTIMATE
      MODAL_BUDGET_ESTIMATE_DEEPCOPY = this.data.MODAL.BUDGET
      ESTIMATE_DEEP_COPY_PARAMETER = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_TYPE_CONFIGURATION, commonLocators.CommonLabels.BUDGET],
        [commonLocators.CommonLabels.NEW_ESTIMATE_TYPE]: MODAL_ESTIMATE_DEEPCOPY.NEW_ESTIMATE_TYPE,
        [commonLocators.CommonLabels.BUDGET]: MODAL_BUDGET_ESTIMATE_DEEPCOPY
      };
    })
      .then(() => {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Add CO2 project value to record in cost code', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
    _common.openTab(app.TabBar.COST_CODES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
      _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
      _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo], cnt.uuid.COST_CODES)
    })
    _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
    _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
    _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[0])
    _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
    _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.COST_CODE_CO2_VALUE[0])
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
    _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("COST_CODE_1_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("COST_CODE_1_CO2_VALUE"))
    })
    _common.waitForLoaderToDisappear()
  })

  it('TC - Add CO2 project value to record in material module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
    });
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION)
    _common.waitForLoaderToDisappear()
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL_RECORDS.co2project, CONTAINER_COLUMNS_MATERIAL_RECORDS.descriptioninfo1], cnt.uuid.MATERIAL_RECORDS)
    });
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_DESCRIPTION[0])
    _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
    _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("MATERIAL_1_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("MATERIAL_1_CO2_VALUE"))
    })
    _common.waitForLoaderToDisappear()
  })

  it('TC - Add assembly resource in assemblies module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.setDefaultView(app.TabBar.ASSEMBLIES, commonLocators.CommonKeys.DEFAULT)
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
    });
    _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
    _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
    _common.select_rowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
    _common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
    });
    _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
    _common.create_newRecord(cnt.uuid.ASSEMBLIES)
    _common.waitForLoaderToDisappear()
    _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES, ASSEMBLIES_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
    _common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
      _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES)
      _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.co2source, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.co2sourcetotal, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.co2projecttotal, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.quantity, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.descriptioninfo, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.code, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.estresourcetypeshortkey], cnt.uuid.ASSEMBLY_RESOURCE)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
    });
    _common.select_rowHasValue(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
    });
    _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
    _common.waitForLoaderToDisappear()
    _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION", $ele1.text())
      cy.log(Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION"))
    })
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("ASSEMBLY_1_CO2_VALUE", $ele1.text())
      cy.log(Cypress.env("ASSEMBLY_1_CO2_VALUE"))
    })
  })

  it("TC - Create estimate header", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.setDefaultView(app.TabBar.PROJECT)
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create new line item record", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal, CONTAINER_COLUMNS_LINE_ITEM.co2totalvariance, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.basuomfk], cnt.uuid.ESTIMATE_LINEITEMS,)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    cy.SAVE()
  });

  it('TC - Assign resource to the line item', function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.code], cnt.uuid.RESOURCES,)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("COST_CODE_1_CO2_VALUE"))
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("MATERIAL_1_CO2_VALUE"))
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("ASSEMBLY_1_CO2_VALUE"))
  });

  it("TC - Verify CO2 attributes in deep copy of estimate header", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_COPY_PASTE_DEEP)
    _estimatePage.copyRecord_includingDependencies_fromModal(ESTIMATE_DEEP_COPY_PARAMETER)
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.code], cnt.uuid.RESOURCES,)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_COST_CODES.COST_CODE[0])
    _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("COST_CODE_1_CO2_VALUE"))
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.RESOURCES, CONTAINERS_RESOURCES.MATERIAL[0])
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("MATERIAL_1_CO2_VALUE"))
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.RESOURCES, ASSEMBLIES_DESCRIPTION)
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, Cypress.env("ASSEMBLY_1_CO2_VALUE"))
  });

})