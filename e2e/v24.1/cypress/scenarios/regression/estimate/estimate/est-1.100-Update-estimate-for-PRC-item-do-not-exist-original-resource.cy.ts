import { _common, _estimatePage, _validate, _mainView, _modalView, _projectPage, _procurementConfig, _package } from "cypress/pages";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { EST_HEADER, BAS_MATERIAL } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import common from "mocha/lib/interfaces/common";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface()

const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC_" + Cypress._.random(0, 999);
const CLERK = "HS";
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let PROJECTS_PARAMETERS: DataCells
let MODAL_PROJECTS
let LINE_ITEM_PARAMETERS: DataCells

let CONTAINERS_LINE_ITEM;

let CONTAINER_COLUMNS_LINE_ITEM;
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINERS_COST_CODES;

let CONTAINER_COLUMNS_COST_CODES;

let CONTAINERS_MATERIAL_CATALOG_FILTER;

let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_PACKAGE_ITEM;
let UPDATE_ESTIMATE_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD;

let UPDATE_ESTIMATE_2_PARAMETER: DataCells
let MODAL_UPDATE_ESTIMATE_2_WIZARD;
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.100 | Update estimate for PRC item do not exist original resource")
describe("EST- 1.100 | Update estimate for PRC item do not exist original resource", () => {
    before(function () {
        cy.fixture("estimate/est-1.100-Update-estimate-for-PRC-item-do_not_exist-original-resource.json").then((data) => {
            this.data = data;
            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }


            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE
            };

            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
            RESOURCE_PARAMETERS_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
            };
            RESOURCE_PARAMETERS_3 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[2],
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
            };
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
            MODAL_UPDATE_ESTIMATE_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD

            MODAL_UPDATE_ESTIMATE_2_WIZARD = this.data.MODAL.UPDATE_ESTIMATE_WIZARD_2

            UPDATE_ESTIMATE_PARAMETER = {
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_WIZARD
            }
            UPDATE_ESTIMATE_2_PARAMETER = {
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_UPDATE_ESTIMATE_2_WIZARD
            }
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);

        });

    })
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
        _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, sidebar.SideBarOptions.PACKAGE_STATUS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, sidebar.SideBarOptions.PACKAGE_STATUS)
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ESTIMATE, commonLocators.CommonKeys.CHECK)
    });
    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERAL_RECORD_CODE)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC- Create Project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    })

    it("TC - Create estimate header", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new line item record", function () {
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
    });

    it("TC - Create resource", function () {
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
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.create_newSubRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
    });

    it('TC - Create a Material Package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _package.create_materialPackage_Consolidatedchkbox(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.SCOPE_ID, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE, CONTAINERS_RESOURCE.CODE[1])
        cy.SAVE()
    })

    it('TC - Add item having CO2 attribute and Update Estimate using wizard ', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
        _procurementConfig.changeProcurementConfiguration_FromWizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION, btn.ButtonText.YES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEM)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEM.mdcmaterialfk, CONTAINER_COLUMNS_PACKAGE_ITEM.price, CONTAINER_COLUMNS_PACKAGE_ITEM.isfreequantity, CONTAINER_COLUMNS_PACKAGE_ITEM.quantity, CONTAINER_COLUMNS_PACKAGE_ITEM.co2project], cnt.uuid.PACKAGEITEMS)
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        })
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL1_CODE)
        _common.select_activeRowInContainer(cnt.uuid.PACKAGEITEMS)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.CO2_PROJECT_VALUE2)
        _common.select_activeRowInContainer(cnt.uuid.PACKAGEITEMS)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.QUANTITY)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.PACKAGEITEMS, app.GridCells.IS_FREE_QUANTITY, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MATERIALPRICE1", $ele1.text())
            cy.log(Cypress.env("MATERIALPRICE1"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)/*This wait is mandatory here, as modal takes time to popup.*/
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
    })

    it('TC - Verify the CO2 project ,Cost/unit , genearated PRC, disabled PRC of added line item resource in Estimate..', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, " ")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION, EST_HEADER);
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
        _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CODE, CONTAINERS_LINE_ITEM.LINE_ITEM_CODE)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, CONTAINERS_MATERIAL_CATALOG_FILTER.CO2_PROJECT_VALUE2)
            _common.assert_forNumericValues(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, Cypress.env("MATERIALPRICE1"))
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_GENERATED_PRC, commonLocators.CommonKeys.CHECK)
            _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED_PRC, commonLocators.CommonKeys.UNCHECK)
        })
    })
    it('TC - Update CO2 attribute , price in item and Update Estimate using wizard ', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL1_CODE)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.CO2_PROJECT_VALUE3)
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG_FILTER.QUANTITY)
        _common.set_cellCheckboxValue(cnt.uuid.PACKAGEITEMS, app.GridCells.IS_FREE_QUANTITY, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MATERIALPRICE2", $ele1.text())
            cy.log(Cypress.env("MATERIALPRICE2"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_2_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)/*This wait is mandatory here, as modal takes time to popup.*/
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()

    })
    it('TC - Verify the CO2 project ,Cost/unit, genearated PRC, disabled PRC of 3rd line item resource in Estimate and original line item diabled PRC..', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, " ")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE, app.GridCells.DESCRIPTION_INFO, ESTIMATE_DESCRIPTION, EST_HEADER);
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clickOn_cellHasValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CODE, CONTAINERS_LINE_ITEM.LINE_ITEM_CODE)
        cy.wait(1000)//required wait
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        cy.SAVE().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, CONTAINERS_MATERIAL_CATALOG_FILTER.CO2_PROJECT_VALUE3)
            _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, parseFloat(Cypress.env("MATERIALPRICE2")).toFixed(2).toString())
        })
    })
})