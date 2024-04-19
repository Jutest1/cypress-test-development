import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import AppLayout from "cypress/locators/app-layout";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _mainView, _modalView, _package, _projectPage, _validate } from "cypress/pages";
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI-DESC" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS:DataCells
let RESOURCE_PARAMETERS2:DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let DJC_BUDGET_PARAMETERS:DataCells
let MODAL_GENERATE_BUDGET;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.15 | Create a material package from Material and cost code together");
describe("PCM- 2.15 | Create a material package from Material and cost code together", () => {    
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("procurement-and-bpm/pcm-2.15-create-a-material-package-from-Material-and-cost-code-together.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_1,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
            };
            RESOURCE_PARAMETERS2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE
            };
            MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
            DJC_BUDGET_PARAMETERS={
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]:MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]:MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]:MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }            
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });
    after(() => {
		cy.LOGOUT();
	});
    it("TC - Create new Estimate having line item and material resource to it", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
          });          
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
          _common.create_newRecord(cnt.uuid.ESTIMATE);
          _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
          _common.waitForLoaderToDisappear()
          cy.SAVE()
          _common.waitForLoaderToDisappear()
          _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
       
          _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
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
          _common.waitForLoaderToDisappear()
    });

    it("TC - Creating  Material resource in resource Container", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    });

    it("TC - Verify creating  cost code resource in resource Container for same line item", function () {
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS2);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });
    it("TC -Generate budget from wizard and verify budget field of line item", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC)
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS);
    })
    it("TC - Verify Create/update material package from wizards for Selected line items", function () {       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            .search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _package.enterRecord_toCreatePackage_wizard(MODAL_GENERATE_BUDGET.MATERIAL_AND_COST_CODE)
        cy.SAVE()
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS);
        })
    });
    it("TC - Verify Cost of the package should be equal or not to resources for selected line items", function () {
        cy.wait(1000); //required wait  
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS);
        })      
        _common.select_dataFromSubContainer(cnt.uuid.TOTALS, "Total")
        _package.verify_Totals_from_package_to_Estimate_Totals(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, sidebar.SideBarOptions.ESTIMATE, cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, LINE_ITEM_DESCRIPTION)
    });
});
