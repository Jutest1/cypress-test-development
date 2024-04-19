import { tile, app, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const EXTERNAL_CODE = 'EXT-' + Cypress._.random(0, 999);

const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let MODAL_PROJECTS
let PROJECTS_PARAMETERS;

let CONTAINER_COLUMNS_BOQ;
let BOQS_PARAMETERS:DataCells;

let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQS_STRUCTURE_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let ESTIMATE_PARAMETER;

let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_ESTIMATE_BOQ;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 7.28 | Verify selecting a filter from BOQ external code should inherit with this");

describe("EST- 7.28 | Verify selecting a filter from BOQ external code should inherit with this", () => {
  before(function () {
    cy.fixture("estimate/est-7.28-verify-selecting-a-filter-from-BOQ-external-code-should-inherit-with-this.json").then((data) => {
      this.data = data;
        CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
        CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
        CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
        BOQS_PARAMETERS = {
            [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
        };
        BOQS_STRUCTURE_PARAMETERS = {
            [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
            [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
            [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
            [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM,
            [app.GridCells.EXTERNAL_CODE]: EXTERNAL_CODE
        };
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        ESTIMATE_PARAMETER = {
            [app.GridCells.CODE]: ESTIMATE_CODE,
			[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
			[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBIC_CATEGORY,
			[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,   
        }

        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        LINE_ITEM_PARAMETERS = {
            [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
            [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC   
        };
        CONTAINER_COLUMNS_ESTIMATE_BOQ = this.data.CONTAINER_COLUMNS.ESTIMATE_BOQ
        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_NAME,
            [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        });    
    })
    after(() => {
		cy.LOGOUT();
	});

    it("TC - Create new BoQ header", function () {
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
   });

    it("TC - Create BOQ structure", function () {
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _common.waitForLoaderToDisappear()
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
    });

    it("TC - Create Estimate Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 0)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        })
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new line item record and verify External Code inherited from BOQ", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo, CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.externalcode], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(LINE_ITEM_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_BOQS, app.FooterTab.BOQs);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_BOQS,CONTAINER_COLUMNS_ESTIMATE_BOQ)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_ESTIMATE_BOQ.ExternalCode], cnt.uuid.ESTIMATE_BOQS)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_BOQS)
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_BOQS,EXTERNAL_CODE)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_BOQS,EXTERNAL_CODE)
        _common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ESTIMATE_BOQS, app.GridCells.MARKER)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EXTERNAL_CODE,EXTERNAL_CODE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

})