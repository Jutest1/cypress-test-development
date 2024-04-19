import { _common, _controllingUnit, _package, _projectPage, _estimatePage, _sidebar, _mainView, _validate, _procurementPage } from "cypress/pages";
import { cnt, tile, app, btn, sidebar, commonLocators } from "cypress/locators";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CHARGROUP = "CHARGROUP_DESC-" + Cypress._.random(0, 999);
const CHAR = "CHAR-" + Cypress._.random(0, 9999);
const CHAR_DESC = "CHAR_DESC-" + Cypress._.random(0, 9999);
const CHAR_TWO = "CHAR-" + Cypress._.random(0, 9999);
const CHAR_DESC_TWO = "CHAR_DESC-" + Cypress._.random(0, 9999);

let CONTAINER_COLUMNS_CHARATERISTIC_GROUP
let CONTAINER_COLUMNS_CHARACTERISTIC
let CONTAINER_COLUMNS_CHARACTERISTIC_SECTIONS
let CONTAINERS_CHARACTERISTIC_SECTIONS
let CONTAINER_COLUMNS_REQUISITION_CHARACTERISTIC
let CONTAINERS_ITEMS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.176 | Create Characteristics");

describe("PCM- 2.176 | Create Characteristics", () => {

  before(() => {
    cy.fixture("pcm/pcm-2.176-create-characteristics.json")
      .then(function (data) {
        this.data = data;
        CONTAINER_COLUMNS_CHARATERISTIC_GROUP=this.data.CONTAINER_COLUMNS.CHARATERISTIC_GROUP

        CONTAINER_COLUMNS_CHARACTERISTIC=this.data.CONTAINER_COLUMNS.CHARACTERISTIC

        CONTAINER_COLUMNS_CHARACTERISTIC_SECTIONS=this.data.CONTAINER_COLUMNS.CHARACTERISTIC_SECTIONS

        CONTAINERS_CHARACTERISTIC_SECTIONS=this.data.CONTAINERS.CHARACTERISTIC_SECTIONS

        CONTAINER_COLUMNS_REQUISITION_CHARACTERISTIC=this.data.CONTAINER_COLUMNS.REQUISITION_CHARACTERISTIC

        CONTAINERS_ITEMS=this.data.CONTAINERS.ITEMS
      })
      .then(()=>{
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
      })
  });

  it("TC - Create characteristic group", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHARACTERISTICS)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_GROUPS, app.FooterTab.CHARACTERISTIC_GROUP, 0);
      _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_GROUPS, CONTAINER_COLUMNS_CHARATERISTIC_GROUP)
    });
    _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
    _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_GROUPS)
    _common.select_allContainerData(cnt.uuid.CHARACTERISTIC_GROUPS)
    _common.clickOn_toolbarButton(cnt.uuid.CHARACTERISTIC_GROUPS,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.CHARACTERISTIC_GROUPS)
    _common.waitForLoaderToDisappear()
    _procurementPage.enterRecord_ToCreateCharacteristicGroups(CHARGROUP)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)

  })

  it("TC - Create characteristic for characteristic group", function () {
    _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.FooterTab.CHARATERISTICS, 1);
      _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CONTAINER_COLUMNS_CHARACTERISTIC)
    });
    _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
    _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
    _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR, CHAR_DESC, commonLocators.CommonKeys.PERCENT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
    _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR_TWO, CHAR_DESC_TWO, commonLocators.CommonKeys.PERCENT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it("TC - characteristic section", function () {

    _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 2);
      _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_SECTIONS, CONTAINER_COLUMNS_CHARACTERISTIC_SECTIONS)
    });
    _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
    _procurementPage.characteristicsSections(CONTAINERS_CHARACTERISTIC_SECTIONS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
  })

  it("TC - Create requisition and Item record manually", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
    _common.create_newRecord(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// Added this wait as modal take time to load
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()

    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.MATERIAL_NO)
    _common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })

  it("TC - Verify the code lookup should only show records with section = requisition", function () {
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITION_CHARACTERISTICS, CONTAINER_COLUMNS_REQUISITION_CHARACTERISTIC)
    });
    _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _common.select_rowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _validate.verify_codeLookUp(cnt.uuid.REQUISITION_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CHARGROUP,[CHAR,CHAR_TWO],btn.ButtonText.CANCEL,commonLocators.CommonKeys.SHOULD_EXIST)
    _common.delete_recordFromContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify after save value to code and click save, the code should be read only;", function () {

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
    });
    _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CHAR)
    _common.select_activeRowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CHAR_TWO)
    _common.select_activeRowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
   _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CHAR)
    _validate.verify_isRecordNotEditable(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, 0)

    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CHAR_TWO)
    _validate.verify_isRecordNotEditable(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, 1)
  })

  it("TC - Verify if characteristic already exists in contianer, then it should not show in lookup any more", function () {
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CHAR_TWO)
    _validate.verify_codeLookUp(cnt.uuid.REQUISITION_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CHARGROUP,[CHAR,CHAR_TWO],btn.ButtonText.CANCEL,commonLocators.CommonKeys.SHOULD_NOT_EXIST)
  })
})