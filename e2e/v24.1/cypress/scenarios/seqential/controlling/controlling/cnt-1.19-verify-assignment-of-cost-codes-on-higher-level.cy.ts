import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _estimatePage, _saleContractPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";


const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "CNT-" + Cypress._.random(0, 999)
const PRJ_NAME = "CNT-1.3-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS";
const CU_MAIN_01 = "RNMAIN-CU-" + Cypress._.random(0, 999)
const CU_SUB_01 = 'SUB-CU1-' + Cypress._.random(0, 999);
const CU_SUB_02 = 'SUB-CU2-' + Cypress._.random(0, 999);
const COST_CODE_HIGH = 'CC_CODE1-' + Cypress._.random(0, 999);
const COST_CODED1= 'CC_DESC1-' + Cypress._.random(0, 999);
const COST_CODE_MIDDLE = 'CC_CODE2-' + Cypress._.random(0, 999);
const COST_CODED2 = 'CC_DESC2-' + Cypress._.random(0, 999);
const COST_CODE_LOW = 'CC_CODE3-' + Cypress._.random(0, 999);
const COST_CODED3 = 'CC_DESC3-' + Cypress._.random(0, 999);
const ESTIMATE_CODE = 'EST_CODE-' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST_DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI_DESC-' + Cypress._.random(0, 999);

let CONTAINERS_CONTROLLING_UNITS,CONTAINERS_COST_CODES,CONTAINERS_ESTIMATE,CONTAINERS_LINE_ITEM_QUANTITY,CONTAINERS_RESOURCE,CONTAINERS_LINE_ITEM
let CONTAINER_COLUMNS_PROJECT,CONTAINER_COLUMNS_CONTROLLING_UNITS,CONTAINER_COLUMNS_COST_CODES,CONTAINER_COLUMNS_ESTIMATE,CONTAINER_COLUMNS_LINE_ITEM;
let PROJECT_PARAMETERS: DataCells,CONTROLLING_UNIT_MAIN_PARAMETERS_1:DataCells,CONTROLLING_UNIT_SUB_PARAMETERS_1:DataCells,CONTROLLING_UNIT_SUB_PARAMETERS_2:DataCells
let ESTIMATE_PARAMETERS:DataCells,LINE_ITEM_PARAMETERS:DataCells,RESOURCE_PARAMETERS:DataCells
let CONTAINER_COLUMNS_RESOURCE,CONTAINER_COLUMNS_LINE_ITEM_QUANTITY,CONTAINER_COLUMNS_PROJECT_CONTROLS_DASHBOARD

allure.epic("CONTROLLING");
allure.feature("Controlling Unit");
allure.story("CNT- 1.19 | Verify assignment of Cost codes on higher level");

describe("CNT- 1.19 |  Verify assignment of Cost codes on higher level", () => {

    before(function () {
        cy.fixture("controlling/cnt-1.19-verify-assignment-of-cost-codes-on-higher-level.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            CONTROLLING_UNIT_MAIN_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_MAIN_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            },
            CONTROLLING_UNIT_SUB_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            },
            CONTROLLING_UNIT_SUB_PARAMETERS_2 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB_02,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            };
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: COST_CODE_LOW
            };
            CONTAINER_COLUMNS_LINE_ITEM_QUANTITY=this.data.CONTAINER_COLUMNS.LINE_ITEM_QUANTITY
            CONTAINERS_LINE_ITEM_QUANTITY=this.data.CONTAINERS.LINE_ITEM_QUANTITY
            CONTAINER_COLUMNS_PROJECT_CONTROLS_DASHBOARD=this.data.CONTAINER_COLUMNS.PROJECT_CONTROLS_DASHBOARD

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create New Project & Pin it", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        });
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _common.waitForLoaderToDisappear()
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.pinnedItem()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME ).pinnedItem();
    })
    it("TC - Create Controlling Units structure level", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_SUB_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_SUB_01)
        _common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION,CU_SUB_02);
        _common.clickOn_activeRowCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.QUANTITY_SMALL)         
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTROLLING_UNITS.QUANTITY[0]);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create Cost codes structure level", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
          _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
          _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.COST_CODES);
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,COST_CODE_HIGH)
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,COST_CODED1)       
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.RATE[0])   
        _common.edit_dropdownCellWithInput(cnt.uuid.COST_CODES,app.GridCells.CONTRO_COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CONTROLLING_COST_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,COST_CODE_HIGH)
        _common.select_rowHasValue(cnt.uuid.COST_CODES,COST_CODE_HIGH)
        _common.create_newSubRecord(cnt.uuid.COST_CODES);
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,COST_CODE_MIDDLE)
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,COST_CODED2)       
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.RATE[1])   
        _common.edit_dropdownCellWithInput(cnt.uuid.COST_CODES,app.GridCells.CONTRO_COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CONTROLLING_COST_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,COST_CODE_MIDDLE)
        _common.select_rowHasValue(cnt.uuid.COST_CODES,COST_CODE_MIDDLE)
        _common.create_newSubRecord(cnt.uuid.COST_CODES);
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,COST_CODE_LOW)
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,COST_CODED3)   
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.RATE[2])   
        _common.edit_dropdownCellWithInput(cnt.uuid.COST_CODES,app.GridCells.CONTRO_COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CONTROLLING_COST_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create Estimate and Line item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO)
        _common.waitForLoaderToDisappear() 
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
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE,app.GridCells.IS_CONTROLLING,commonLocators.CommonKeys.CHECK,1,EST_HEADER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,CU_SUB_02)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Create resource and Line item quantity", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.LINE_ITEM_QUANTITIES, app.FooterTab.LINE_ITEM_QUANTITY,2);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.LINE_ITEM_QUANTITIES, CONTAINER_COLUMNS_LINE_ITEM_QUANTITY)
          });
          _common.create_newRecord(cnt.uuid.LINE_ITEM_QUANTITIES)
          _common.edit_containerCell(cnt.uuid.LINE_ITEM_QUANTITIES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LINE_ITEM_QUANTITY.QUANTITY)
          _common.edit_dropdownCellWithCaret(cnt.uuid.LINE_ITEM_QUANTITIES,app.GridCells.QUANTITY_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_LINE_ITEM_QUANTITY.QUANTITY_TYPE)
          cy.SAVE()
          _common.waitForLoaderToDisappear()
        })
        it("TC - Export to enterprise in controlling unit", function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
            _common.waitForLoaderToDisappear()
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.EXPORT_TO_ENTERPRISE_CONTROLLING_BIS)
            _common.waitForLoaderToDisappear()
            _common.clickOn_modalFooterButton(btn.ButtonText.OK)
            _common.waitForLoaderToDisappear()
            _common.clickOn_modalFooterButton(btn.ButtonText.OK)
            _common.waitForLoaderToDisappear()
        })
        it("TC - Verify cost codes on Estimate cost in Report period", function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT_CONTROLS)
            _common.waitForLoaderToDisappear()
            cy.REFRESH_CONTAINER()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.CONTROLLING_PROJECT_CONTROLS).then(() => {
                _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_2)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECT_CONTROLS_DASHBOARD, app.FooterTab.PROJECT_CONTROLS_DASHBOARD,1);
                _common.setup_gridLayout(cnt.uuid.PROJECT_CONTROLS_DASHBOARD, CONTAINER_COLUMNS_PROJECT_CONTROLS_DASHBOARD)
            });
        _common.waitForLoaderToDisappear()
        _estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.PROJECT_CONTROLS_DASHBOARD,"Cost Code","CostCode")
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PROJECT_CONTROLS_DASHBOARD,COST_CODE_LOW)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.PROJECT_CONTROLS_DASHBOARD,CONTAINERS_COST_CODES.RATE[2],CONTAINERS_LINE_ITEM_QUANTITY.QUANTITY,app.GridCells.EC_IN_RP)
        _estimatePage.select_LineItemsStructureAttributeAndRefresh(cnt.uuid.PROJECT_CONTROLS_DASHBOARD,"Controlling Unit","ControllingUnit")
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PROJECT_CONTROLS_DASHBOARD,CU_SUB_02)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.PROJECT_CONTROLS_DASHBOARD,CONTAINERS_COST_CODES.RATE[2],CONTAINERS_LINE_ITEM_QUANTITY.QUANTITY,app.GridCells.EC_IN_RP)
    })
})