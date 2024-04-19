import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const MATCATCODE = "MATCATCODE-" + Cypress._.random(0, 999);
const MATCATDEC = "MATCATDEC-" + Cypress._.random(0, 999);
const MATERIALGROUP_CODE = "M-" + Cypress._.random(0, 999);
const MATERIALGROUP_DESC = "MG" + Cypress._.random(0, 999);
const MATERIALGROUP_SUBCODE = "MS-" + Cypress._.random(0, 999);
const MATERIALGROUP_SUBDESC = "MGS" + Cypress._.random(0, 999);
const MAT_DESC = "MAT-DES" + Cypress._.random(0, 999);
const MATCODE = "MATCODE-" + Cypress._.random(0, 999);
const FILTERNAME = "FILTERNAME-" + Cypress._.random(0, 999);
const SEARCHFORM = "SEARCHFORM-" + Cypress._.random(0, 999);
const SEARCHDESC = "SEARCHDESC-" + Cypress._.random(0, 999);

let MATERIAL_CATALOGS_PARAMETER: DataCells;
let MATERIAL_GROUP_PARAMETER_1: DataCells;
let MATERIAL_GROUP_PARAMETER_2: DataCells;
let MATERIAL_RECORD_PARAMETER: DataCells;
let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP;
let CONTAINERS_MATERIAL_GROUP;
let CONTAINERS_MATERIAL;
let CONTAINER_COLUMNS_MATERIAL;
let CONTAINERS_MATERIAL1;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Procurement");
allure.story("PCM- 2.142 | Search for materials");

describe("PCM- 2.142 | Search for materials", () => {
  before(function () {
    cy.fixture("pcm/pcm-2.142-search-for-material.json").then((data) => {
      this.data = data
      CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
      CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
      CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
      CONTAINERS_MATERIAL_GROUP = this.data.CONTAINERS.MATERIAL_GROUP;
      CONTAINERS_MATERIAL = this.data.CONTAINERS.MATERIAL;
      CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL;
      CONTAINERS_MATERIAL1 = this.data.CONTAINERS.Material_Input;
      MATERIAL_CATALOGS_PARAMETER = {
        [app.GridCells.CODE]: MATCATCODE,
        [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BP_NAME,
        [app.GridCells.DESCRIPTION_INFO]: MATCATDEC
      }
      MATERIAL_GROUP_PARAMETER_1 = {
        [app.GridCells.CODE]: MATERIALGROUP_CODE,
        [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_1,
        [app.GridCells.DESCRIPTION_INFO]: MATERIALGROUP_DESC
      }
      MATERIAL_GROUP_PARAMETER_2 = {
        [app.GridCells.CODE]: MATERIALGROUP_SUBCODE,
        [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE_2,
        [app.GridCells.DESCRIPTION_INFO]: MATERIALGROUP_SUBDESC
      }
      MATERIAL_RECORD_PARAMETER = {
        [app.GridCells.DESCRIPTION_INFO_1]: MAT_DESC,
        [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL.uom,
        [app.GridCells.CODE]: MATCODE,
        [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL.price,
        [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL.price1
      }
    })
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
    cy.REFRESH_CONTAINER()
  });

  it('TC - Create new material catalog', function () {
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
    })
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_CATALOGS, btn.ToolBar.ICO_REC_NEW)
    _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
    cy.SAVE()
  });

  it('TC - Create new material group', function () {
    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
      _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
    })
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_GROUPS, btn.ToolBar.ICO_REC_NEW)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUP_PARAMETER_1);
    cy.SAVE()
    _common.clickOn_toolbarButton(cnt.uuid.MATERIAL_GROUPS, btn.ToolBar.ICO_REC_NEW)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_GROUP_PARAMETER_2);
    cy.SAVE()
  });

  it('TC- Create new material record', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
    cy.wait(3000) //required wait to load page
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER);
    _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCATCODE);
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    cy.wait(2000) //required wait to load page
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1);
      _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL);
      _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    });
    _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS);
    cy.REFRESH_CONTAINER();
    _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS);
    _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
    cy.SAVE();
    _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS);
  });

  it('TC- Verify standard search from sidebar - Material Record', function () {
    cy.REFRESH_CONTAINER();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, MATCODE);
    cy.REFRESH_CONTAINER();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, MATCODE);
  })

  it('TC- Verify search in SubContainer - Material Record', function () {
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER);
    _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
    cy.wait(3000); //required wait to load page
    cy.REFRESH_CONTAINER();
    cy.wait(1000); //required wait to load page
    cy.REFRESH_CONTAINER();
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS);
    _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, MATCODE);
    _validate.verify_isRecordPresent(cnt.uuid.MATERIAL_RECORDS, MATCODE);
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS);
  })

  it("TC - Verify Enahance Search  ", function () {
    _validate.verify_enhancedSearch(CONTAINERS_MATERIAL1.parentElement, CONTAINERS_MATERIAL1.item, MATCODE, FILTERNAME)
    cy.wait(2000) //required wait to load page
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CODE, MATCODE)
  });

  it("TC- Verify Edit search form and search by date", function () {
    _validate.verify_createSearchForm(SEARCHDESC, SEARCHFORM, MATCODE)
    cy.wait(2000) //required wait to load page
    _validate.verify_editTheCurrentSearchForm(SEARCHFORM, MATCODE)
    cy.SAVE()
    cy.wait(2000) //required wait to load page
    _validate.verify_searchByDate("Inserted At", "Today")
  })

  after(() => {
    cy.LOGOUT();
  });
  
});


