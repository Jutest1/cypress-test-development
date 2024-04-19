import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package } from "cypress/pages";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const LOCATION_CODE="LC" + Cypress._.random(0, 999);
const LOCATION_DESC="LD" + Cypress._.random(0, 999);
const LOCATION_CODE_1="LC-" + Cypress._.random(0, 999);
const LOCATION_DESC_1="LD-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let CONTAINER_COLUMNS_LOCATION
let CONTAINERS_LOCATION
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let ESTIMATE_CONFIGURATION_PARAMETER:DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 2.13 | Generate a line item having a quantity analogous to location quantity");
describe("EST- 2.13 | Generate a line item having a quantity analogous to location quantity", () => {
  before(function () {
    cy.fixture("estimate/est-2.13-Generate-line-item-having-quantity-analogous-to-location-quantities.json")
      .then((data) => {
        this.data = data;
			  MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
          [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
          [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
          [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }
        CONTAINER_COLUMNS_LOCATION=this.data.CONTAINER_COLUMNS.LOCATION
        CONTAINERS_LOCATION=this.data.CONTAINERS.LOCATION
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }
        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        GENERATE_LINE_ITEMS_PARAMETERS={
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:commonLocators.CommonKeys.LOCATION                
        }
        ESTIMATE_CONFIGURATION_PARAMETER = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.ESTIMATE_STRUCTURE],
          [commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
          [commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
          [commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS]:commonLocators.CommonKeys.EDIT,
          [app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.LOCATION,
          [app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.FROM_STRUCTURE,
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
  });

  it("TC - Create new location record", function () {
    _common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
			_common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATION);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
		});
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
		_common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
		_estimatePage.enterRecord_toCreateLocation(LOCATION_CODE, LOCATION_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATION.QUANTITY_FACTOR);
		_common.select_activeRowInContainer(cnt.uuid.PROJECT_LOCATION)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
		_estimatePage.enterRecord_toCreateLocation(LOCATION_CODE_1, LOCATION_DESC_1);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATION.QUANTITY_FACTOR_1);
		_common.select_activeRowInContainer(cnt.uuid.PROJECT_LOCATION)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

  });

  it("TC - Create new estimate record", function () {
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

  it("TC - Verify generate line items from location", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget],cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS,btn.IconButtons.ICO_SETTING_DOC)
		_common.waitForLoaderToDisappear()
		_estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIGURATION_PARAMETER)
		cy.wait(100).then(() => {
			_common.clickOn_modalFooterButton(btn.ButtonText.OK)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()

  });

  it("TC - Verify the quantity in the line item container", function () {

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LOCATION_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LOCATION_DESC)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_LOCATION.QUANTITY_FACTOR);
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_LOCATION.QUANTITY_FACTOR);

		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LOCATION_DESC_1);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LOCATION_DESC_1)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_LOCATION.QUANTITY_FACTOR_1);
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_LOCATION.QUANTITY_FACTOR_1);
  });
});