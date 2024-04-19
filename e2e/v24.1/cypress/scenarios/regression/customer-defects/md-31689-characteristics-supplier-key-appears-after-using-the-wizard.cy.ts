import { tile, app, cnt,sidebar,commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package, _businessPartnerPage, _procurementPage } from "cypress/pages";

const BUSINESS_PARTNER_CODE = "BP-CODE-" + Cypress._.random(0, 999);
const BUSINESS_PARTNER_DESC = "BP-DESC-" + Cypress._.random(0, 999);
const CHAR_VALUE = "CHAR-VALUE-" + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_BUSINESS_PARTNERS;
let PROCUREMENT_STRUCTURE_PARAMETERS;
let CONTAINERS_PROCUREMENT_STRUCTURE
let CONTAINER_COLUMNS_CHARATERISTICS
let CONTAINERS_CHARATERISTICS
let CONTAINERS_BUSINESS_PARTNERS;

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story("MD- 31689 | Characteristics supplier key appears after using the wizard");

describe("MD- 31689 | Characteristics supplier key appears after using the wizard", () => {
  before(function () {
    cy.fixture('customer-defects/md-31689-characteristics-supplier-key-appears-after-using-the-wizard.json').then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BUSINESS_PARTNERS= this.data.CONTAINER_COLUMNS.BUSINESS_PARTNERS
      CONTAINER_COLUMNS_CHARATERISTICS= this.data.CONTAINER_COLUMNS.CHARATERISTICS
      CONTAINERS_CHARATERISTICS= this.data.CONTAINERS.CHARATERISTICS
      CONTAINERS_PROCUREMENT_STRUCTURE= this.data.CONTAINERS.PROCUREMENT_STRUCTURE
      CONTAINERS_BUSINESS_PARTNERS=this.data.CONTAINERS.BUSINESS_PARTNERS

      PROCUREMENT_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.SERVICE]: CONTAINERS_PROCUREMENT_STRUCTURE.PROCUREMENT_STRUCTURE,
        [app.GridCells.IS_SELECTED]:commonLocators.CommonKeys.CHECK,
        [commonLocators.CommonKeys.SEARCH_RESULT]:CONTAINERS_PROCUREMENT_STRUCTURE.SEARCH_RESULT,
      };  
    })
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create Business partner record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
	  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
     _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNERS)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS)
    _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
    _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS)
    _businessPartnerPage.enterRecord_toCreateBusinessPartner(BUSINESS_PARTNER_CODE,BUSINESS_PARTNER_DESC,CONTAINERS_BUSINESS_PARTNERS.STREET,CONTAINERS_BUSINESS_PARTNERS.ZIPCODE,CONTAINERS_BUSINESS_PARTNERS.CITY,CONTAINERS_BUSINESS_PARTNERS.COUNTRY)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS)
    _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS,BUSINESS_PARTNER_DESC)
  _common.select_rowHasValue(cnt.uuid.BUSINESS_PARTNERS,BUSINESS_PARTNER_DESC)
  })
  it("TC - Create Characteristic and assign Procurement structure", function () {
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BP_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 1);
    });
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BP_CHARACTERISTICS)
    _common.waitForLoaderToDisappear()
    _procurementPage.enterRecord_ToCreateCharacteristics(cnt.uuid.BP_CHARACTERISTICS,CONTAINERS_CHARATERISTICS.CODE,CHAR_VALUE,app.InputFields.DOMAIN_TYPE_DESCRIPTION)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP, app.FooterTab.PROCUREMENT_STRUCTURE, 1);
    });
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
    _businessPartnerPage.selectProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURE_BP,PROCUREMENT_STRUCTURE_PARAMETERS)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })
  it("TC - Verify characteristic after changing from wizard", function () {
    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BP_CHARACTERISTICS, app.FooterTab.CHARATERISTICS, 1);
    });
    _common.waitForLoaderToDisappear()
    _procurementPage.select_flexValue(cnt.uuid.BP_CHARACTERISTICS,CONTAINERS_CHARATERISTICS.ROOT)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BP_CHARACTERISTICS,CHAR_VALUE)
    _common.edit_dropdownCellWithInput(cnt.uuid.BP_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CHARATERISTICS.CODE2)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BUSINESS_PARTNER_STATUS);
    _common.changeStatus_fromModal(sidebar.SideBarOptions.CRITICAL)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _procurementPage.select_flexValue(cnt.uuid.BP_CHARACTERISTICS,CONTAINERS_CHARATERISTICS.ROOT)
    _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.BP_CHARACTERISTICS,app.GridCells.CHARACTERISTIC_FK,CONTAINERS_CHARATERISTICS.CODE2)
  })
})

after(() => {
    cy.LOGOUT();
});