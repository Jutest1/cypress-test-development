import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const allure = Cypress.Allure.reporter.getInterface();

const LINE_ITEM_COST = 'LINE_ITEM_COST'
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PACKAGE_CODE = 'PACKAGE_CODE'

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_TOTALS
let CONTAINER_COLUMNS_REQUISITION

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.42 | Change Procurement configuration in requisition module");

describe("PCM- 2.42 | Change Procurement configuration in requisition module", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.42-change-procurement-configuration-in-requisition-module.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION 
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            };
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            }
        });
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new estimate record', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC- Create new Line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Assing resource to line item", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait to load page
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, LINE_ITEM_COST)
        cy.wait(200).then(()=>{
        })
    })

    it("TC - Create/Update material package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(CONTAINER_PACKAGE.MATERIAL_AND_COSTCODE, CONTAINER_PACKAGE.MATERIAL)
        cy.wait(5000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        })
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.CODE,PACKAGE_CODE)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        cy.wait(200).then(()=>{
            _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env(PACKAGE_CODE))
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        _common.waitForLoaderToDisappear()
    });
   
    it("TC - Create requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
          _common.setDefaultView(app.TabBar.MAIN)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        })
        _common.select_rowInContainer(cnt.uuid.REQUISITIONS)
    })

    it("TC - Verify change procurement configuration in requisition module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
        _procurementConfig.changeProcurementConfiguration_FromWizard(CONTAINER_PACKAGE.SERVICE,btn.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.CONFIGURATION_SMALL,CONTAINER_PACKAGE.SERVICE)
    })
   
    it("TC - Verify totals net value in requisition module", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_TOTALS);
        }) 
        _common.search_inSubContainer(cnt.uuid.REQUISITION_TOTALS,CONTAINER_PACKAGE.TOTAL)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_TOTALS,app.GridCells.VALUE_NET,Cypress.env(LINE_ITEM_COST))
    })
});
