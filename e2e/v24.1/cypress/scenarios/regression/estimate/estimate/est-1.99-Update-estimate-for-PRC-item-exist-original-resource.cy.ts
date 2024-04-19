import { _common, _estimatePage, _validate, _mainView, _modalView, _projectPage, _procurementConfig, _package } from "cypress/pages";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const allure = Cypress.Allure.reporter.getInterface()


const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const MATERIAL_PRICE_1 = 'MATERIAL_PRICE_1'
const MATERIAL_PRICE_2 = 'MATERIAL_PRICE_1'
const EST_DESCRIPTION = 'EST_DESCRIPTION'

let CONTAINER_COST_CODE
let CONTAINER_COLUMNS_COST_CODE
let CONTAINER_MATERIAL
let CONTAINER_COLUMNS_MATERIAL
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let COST_CODE_RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_PACKAGE
let CONTAINER_COLUMNS_ITEM_GRID
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.99 | Update estimate for PRC item original resource")
describe("EST- 1.99 | Update estimate for PRC item original resource", () => {

    before(function () {

        cy.fixture("estimate/est-1.99-Update-estimate-for-PRC-item-exist-original-resource.json").then((data) => {
            this.data = data
            CONTAINER_COST_CODE = this.data.CONTAINERS.COST_CODE
            CONTAINER_COLUMNS_COST_CODE = this.data.CONTAINER_COLUMNS.COST_CODE
            CONTAINER_MATERIAL = this.data.CONTAINERS.MATERIAL
            CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.PACKAGE
            CONTAINER_COLUMNS_ITEM_GRID = this.data.CONTAINER_COLUMNS.ITEM_GRID
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
            MATERIAL_RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            }
            COST_CODE_RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY_1,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.COST_CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            }
        })
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Prerequisistes - customizing package status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, "Package status")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, "Package status")
        cy.wait(1000)//required wait
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES, app.GridCells.IS_ESTIMATE, commonLocators.CommonKeys.CHECK)
    });

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODE)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINER_COST_CODE.COST_CODE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_COST_CODE.CO2_PROJECT_VALUE)
        _common.clickOn_activeRowCell(cnt.uuid.COST_CODES, app.GridCells.PRC_STRUCTURE_FK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINER_MATERIAL.MATERIAL_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CONTAINER_MATERIAL.CHECK_STATUS)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINER_MATERIAL.MATERIAL_RECORD_CODE)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new estimate record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        cy.wait(3000) //required wait to load page
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
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, EST_DESCRIPTION, EST_HEADER)
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

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project], cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, COST_CODE_RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create a Material Package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _package.create_materialPackage_Consolidatedchkbox(MODAL_PACKAGE.SCOPE, MODAL_PACKAGE.SCOPE_ID, MODAL_PACKAGE.CRITERIA_SELECTION, CONTAINERS_RESOURCE.MATERIAL)
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add item having CO2 attribute and Update Estimate using wizard ', function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'));
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(MODAL_PACKAGE.CONFIGURATION_INPUT, btn.ButtonText.YES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GRID)
        })
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.MATERIAL_1_CODE)
        _common.clickOn_cellInSubContainer(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.QUANTITY)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL, MATERIAL_PRICE_1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE)
        _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonElements.PLATFORM_COL, MODAL_PACKAGE.UPDATE_ESTIMATE_UNCHECK_OPTION, 0)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory here, as modal takes time to popup.*/
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify the CO2 project ,Cost/unit , genearated PRC, disabled PRC of added line item resource in Estimate..', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.ESTIMATE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()
        cy.wait(200).then(() => {  //required wait to load
            _common.search_inSubContainer(cnt.uuid.ESTIMATE, Cypress.env(EST_DESCRIPTION))
        })
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.isgeneratedprc, CONTAINER_COLUMNS_RESOURCE.isdisabledprc, CONTAINER_COLUMNS_RESOURCE.costunit], cnt.uuid.RESOURCES)
        });
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_GENERATED_PRC, commonLocators.CommonKeys.CHECKED)
        })
    })
    it('TC - Add another item having CO2 attribute and Update Estimate using wizard ', function () {
        let checkboxLabelName = new Map<string, string>();
        checkboxLabelName.set("Linked Material Item", "checked");
        checkboxLabelName.set("Overwrite original Resources", "checked");
        checkboxLabelName.set("Create new Line Item for new Material Item", "checked");

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'));
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        })
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.MATERIAL_2_CODE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellInSubContainer(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.QUANTITY)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellInSubContainer(cnt.uuid.PACKAGEITEMS, app.GridCells.CO2_PROJECT)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL, MATERIAL_PRICE_2)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE)

        _estimatePage.update_estimate_fromWizard(checkboxLabelName);
        cy.wait(3000)/*This wait is mandatory here, as modal takes time to popup.*/
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory here, as modal takes time to popup.*/
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(3000)/*This wait is mandatory here, as modal takes time to popup.*/
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify the CO2 project ,Cost/unit, genearated PRC, disabled PRC of 3rd line item resource in Estimate and original line item diabled PRC..', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.ESTIMATE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()
        cy.wait(200).then(() => { //required wait to load
            _common.search_inSubContainer(cnt.uuid.ESTIMATE, Cypress.env(EST_DESCRIPTION))
        })
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, CONTAINER_MATERIAL.CO2_PROJECT_VALUE)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_GENERATED_PRC, commonLocators.CommonKeys.CHECKED)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED_PRC, commonLocators.CommonKeys.UNCHECK)
        })
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.SAVE().then(() => {
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED_PRC, commonLocators.CommonKeys.UNCHECK)
        })
    })
})