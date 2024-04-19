import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _package, _rfqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let ESTIMATE_PARAMETER;

let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_RESOURCE;
let RESOURCE_PARAMETERS:DataCells;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("ESTIMATE");
ALLURE.feature("Resources");
ALLURE.story("EST- 7.29 | Verify adding short key as R in the resources and applying multiplication of two resource using square bracket");

describe("EST- 7.29 | Verify adding short key as R in the resources and applying multiplication of two resource using square bracket", () => {
 
    before(function () {
        cy.fixture("estimate/est-7.29-verify-adding-short-key-as-R-in-the-resources-and-applying-multiplication-of-two-resource-using-square-bracket.json").then((data) => {
            this.data = data;

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
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
            };

            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.QUANTITY_DETAIL]: CONTAINERS_RESOURCE.QUANTITY_DETAILS,
            };
           
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_NAME,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
         });    
    })
    after(() => {
        cy.LOGOUT();
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

    it("TC - Create new line item record ", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Verify creating resource as a computational line (R) by using multiplication", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
            _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL)
        cy.wait(1000)//required wait to update cell data
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE,CONTAINERS_RESOURCE.HOURS)
        _common.enterRecord_inActiveRow_fromModal(app.GridCells.PARAMETER_VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.WEEKS_PARAMETER)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue_fromModal(CONTAINERS_RESOURCE.WEEKS)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE,CONTAINERS_RESOURCE.WEEKS)
        _common.enterRecord_inActiveRow_fromModal(app.GridCells.PARAMETER_VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.HOURS_PARAMETER)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue_fromModal(app.GridCells.CODE,CONTAINERS_RESOURCE.WEEKS)
        _common.select_rowHasValue_fromModal(CONTAINERS_RESOURCE.WEEKS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
        });
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.SHORT_KEY)
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL)
        _common.assert_cellData(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,CONTAINERS_RESOURCE.QUANTITY)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });
    
});