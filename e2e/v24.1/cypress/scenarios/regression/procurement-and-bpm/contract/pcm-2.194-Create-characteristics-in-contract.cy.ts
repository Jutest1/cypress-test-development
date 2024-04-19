import { _common,  _sidebar,_package, _validate, _procurementPage } from "cypress/pages";
import { cnt, tile, app, btn,sidebar,commonLocators } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
const allure = Cypress.Allure.reporter.getInterface();

const CHARGROUP = "CHARGROUP_DESC-" + Cypress._.random(0, 999);
const CHAR = "CHAR-" + Cypress._.random(0, 9999);
const CHAR_DESC = "CHAR_DESC-" + Cypress._.random(0, 9999);

let CONTAINERS_CONTRACT;
let CONTAINERS_CHARACTERISTICS;
let CONTAINERS_CHARACTERISTICS_SECTIONS;
let CONTAINERS_ITEMS;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_GENERALS_CONTRACT;
let CONTAINER_COLUMNS_CHARACTERISTICS_GROUP;
let CONTAINER_COLUMNS_CHARACTERISTICS;
let CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS;
let CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS


allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.194 | Create characteristics in contract");

  describe('PCM- 2.194 | Create characteristics in contract', () => {
    before(function () {
        cy.fixture('pcm/pcm-2.194-Create-characteristics-in-contract.json').then((data) => {
            this.data = data;
           
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINERS_CHARACTERISTICS = this.data.CONTAINERS.CHARACTERISTICS;
            CONTAINERS_CHARACTERISTICS_SECTIONS = this.data.CONTAINERS.CHARACTERISTICS_SECTIONS;
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
           

            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_COLUMNS_GENERALS_CONTRACT = this.data.CONTAINER_COLUMNS.GENERALS_CONTRACT
            CONTAINER_COLUMNS_CHARACTERISTICS_GROUP = this.data.CONTAINER_COLUMNS.CHARACTERISTICS_GROUP
            CONTAINER_COLUMNS_CHARACTERISTICS = this.data.CONTAINER_COLUMNS.CHARACTERISTICS
            CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS = this.data.CONTAINER_COLUMNS.CHARACTERISTICS_SECTIONS
            CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS = this.data.CONTAINER_COLUMNS.REQUISITION_CHARACTERISTICS           

        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  
    after(() => {
        cy.LOGOUT();
    });

  it("TC - Create characteristic group", function () {
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHARACTERISTICS);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_GROUPS, app.FooterTab.CHARACTERISTIC_GROUP, 0);
      _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_GROUPS, CONTAINER_COLUMNS_CHARACTERISTICS_GROUP)
    });
    _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
    _common.create_newRecord(cnt.uuid.CHARACTERISTIC_GROUPS)
    _procurementPage.enterRecord_ToCreateCharacteristicGroups(CHARGROUP)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
    _common.waitForLoaderToDisappear()
  })

  it("TC - Create characteristic for characteristic group", function () {

    _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.FooterTab.CHARATERISTICS, 1);
      _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, CONTAINER_COLUMNS_CHARACTERISTICS)
    });
    _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
    _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR, CHAR_DESC, CONTAINERS_CHARACTERISTICS.TYPE)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_storeIntoArray(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.GridCells.CODE, "Characteristic_CodesInGroup")

  })

  it("TC - Create record in characteristic section", function () {

    _common.openTab(app.TabBar.CHARACTERISTIC_GROUP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 2);
      _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_SECTIONS, CONTAINER_COLUMNS_CHARACTERISTICS_SECTIONS)
    });
    _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
    _procurementPage.characteristicsSections(CONTAINERS_CHARACTERISTICS_SECTIONS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
  })

  it("TC - Create requisition and Item record manually", function () {
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
    })
    
    _common.create_newRecord(cnt.uuid.REQUISITIONS)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait in order to click Ok button
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
    })
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ITEMS.MATERIALNO)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })

  it("TC - Verify after save value to code and click save, the code should be read only;", function () {

    _common.openTab(app.TabBar.MAIN).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITION_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
      _common.setup_gridLayout(cnt.uuid.REQUISITION_CHARACTERISTICS, CONTAINER_COLUMNS_REQUISITION_CHARACTERISTICS)
    });
    _common.create_newRecord(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _common.select_rowInContainer(cnt.uuid.REQUISITION_CHARACTERISTICS)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT.CHARACTERSTICS_CODE)
     cy.SAVE()
     _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CONTAINERS_CONTRACT.CHARACTERSTICS_CODE)
    _common.waitForLoaderToDisappear()
    _common.getText_storeIntoArray(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, "Characteristic_code")
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecordNotEditable(cnt.uuid.REQUISITION_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, 0)
  
  })

  it("TC - Verify change requisition status and create contract", function () {
  
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BP1)

  })


  it("TC - Verify characteristics in contract are same as in requisition and verify delete button in characteristics of contract", function () {
   
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
    });
    _common.waitForLoaderToDisappear()

    _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, CONTAINERS_CONTRACT.CHARACTERSTICS_CODE)
   _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CONTAINERS_CONTRACT.CHARACTERSTICS_CODE)

   _common.delete_recordFromContainer(cnt.uuid.CONTRACT_CHARACTERISTICS)
   cy.SAVE()
   _common.waitForLoaderToDisappear()
   _validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_CHARACTERISTICS,CONTAINERS_CONTRACT.CHARACTERSTICS_CODE)
  })

  it("TC - Verify the code lookup should only show records with section =contract", function () {
    
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
    });
    _common.waitForLoaderToDisappear()

    _common.create_newRecord(cnt.uuid.CONTRACT_CHARACTERISTICS)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_CHARACTERISTICS, app.GridCells.CHARACTERISTIC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,CHAR)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clickOn_cellHasValue(cnt.uuid.CONTRACT_CHARACTERISTICS,app.GridCells.DESCRIPTION,CHAR_DESC)
   _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CHAR)
  })


  it("TC - Verify if characteristic already exists in container, then it should not show in lookup any more", function () {

    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 2);
    });
    _common.create_newRecord(cnt.uuid.CONTRACT_CHARACTERISTICS)
    cy.get(`.cid_d2b5525ef2ee49e4b820de6004dfb8c4 [class*='column-id_characteristicfk'] [class='block-image']`).click()
    _common.selectValue_fromModal(CHARGROUP)
    cy.wait(500).then(() => {
      var Characteristic_CodesInGroup = Cypress.env("Characteristic_CodesInGroup").toString()
      cy.log(Characteristic_CodesInGroup)
      _validate.verify_recordNotPresentInmodal(Characteristic_CodesInGroup)
    })
    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
  })
})