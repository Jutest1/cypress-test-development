import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface()
const ASSEMBLIES_DESC = "ASSEMBLIES_DESC-" + Cypress._.random(0, 999);
const ASSEMBLIES_DESC1 = "ASSEMBLIES_DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LINE-ITEM-DESC_1-' + Cypress._.random(0, 999);
const ASSEMBLY_CODE = 'ASSEMBLY_CODE'
const ASSEMBLY_CODE_1 = 'ASSEMBLY_CODE_1'
const ASSEMBLY_CODE_2 = 'ASSEMBLY_CODE_2'
let ASSEMBLY_CODE_1_;
let ASSEMBLY_CODE_2_;


let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS_1: DataCells;
let RESOURCE_PARAMETERS_2: DataCells
let RESOURCE_PARAMETERS_1: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORY
let CONTAINERS_ASSEMBLY_CATEGORY
let CONTAINER_COLUMNS_ASSEMBLIES
let CONTAINERS_ASSEMBLY_RESOURCE
let ASSEMBLIES_PARAMETER_1: DataCells
let ASSEMBLIES_PARAMETER_2: DataCells
let ASSEMBLY_RESOURCE_COST_CODE_PARAMETER_1: DataCells
let ASSEMBLY_RESOURCE_COST_CODE_PARAMETER_2: DataCells
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE


allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.72 | Dissolve assembly from the line item")
describe("EST- 1.72 | Dissolve assembly from the line item", () => {

    before(function () {

        cy.fixture("estimate/est-1.72-dissolve-assembly-from-the-line-item.json").then((data) => {
            this.data = data
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_COLUMNS_ASSEMBLY_CATEGORY = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORY
            CONTAINERS_ASSEMBLY_CATEGORY = this.data.CONTAINERS.ASSEMBLY_CATEGORY
            CONTAINERS_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE
            CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCE = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
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
            LINE_ITEM_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            };
            ASSEMBLIES_PARAMETER_1 = {
                [app.GridCells.DESCRIPTION_INFO]: ASSEMBLIES_DESC,
            }
            ASSEMBLIES_PARAMETER_2 = {
                [app.GridCells.DESCRIPTION_INFO]: ASSEMBLIES_DESC1,
            }
            ASSEMBLY_RESOURCE_COST_CODE_PARAMETER_1 = {
                [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE_1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY
            }
            ASSEMBLY_RESOURCE_COST_CODE_PARAMETER_2 = {
                [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCE.CODE_2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_1
            }
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
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
            _common.waitForLoaderToDisappear()
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Verify Assign Protected assembly and create assembly record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORY)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORY.DESCRIPTION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_ASSEMBLY_CATEGORY.DESCRIPTION)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.EST_ASSEMBLY_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ASSEMBLY_CATEGORY.ASSEMBLY_TYPE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.CODE, ASSEMBLY_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
            _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        });
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES, ASSEMBLIES_PARAMETER_1)
        _common.waitForLoaderToDisappear()// This wait is required , if not added script fails
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.CODE, ASSEMBLY_CODE_1)
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES,app.GridCells.CODE).then(($value)=>{
            ASSEMBLY_CODE_1_ = $value.text()
        })
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES, ASSEMBLIES_PARAMETER_2)
        _common.waitForLoaderToDisappear() // This wait is required , if not added script fails
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES, app.GridCells.CODE, ASSEMBLY_CODE_2)
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES,app.GridCells.CODE).then(($value)=>{
            ASSEMBLY_CODE_2_ = $value.text()
        })
    })

    it("TC - Create Assembly resources", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, Cypress.env(ASSEMBLY_CODE_1))
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER_1)
        cy.wait(2000)  // This wait is required , if not added script fails
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, Cypress.env(ASSEMBLY_CODE_2))
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER_2)
        cy.wait(1000)  // This wait is required , if not added script fails
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        cy.REFRESH_CONTAINER()
    })

    it('TC - Verify Create Estimate and Line Item,Resources', function () {
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
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        cy.wait(2000) //required wait to load page
        RESOURCE_PARAMETERS_1 = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.ASSEMBLY_TYPE,
            [app.GridCells.CODE]:ASSEMBLY_CODE_1_ ,
        },
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_1)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, 0)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, 0)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_1)
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        });
        RESOURCE_PARAMETERS_2 = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.ASSEMBLY_TYPE,
            [app.GridCells.CODE]:ASSEMBLY_CODE_2_ ,
        },
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2)
        cy.SAVE()
        cy.wait(2000) //required wait to load Page
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_2)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, 0)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, 0)
    })

    it('TC - Verify Dissolve assembly wizard option', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.DISSOLVE_ASSEMBLY)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait to load modal
        _common.findRadio_byLabel_fromModal(CONTAINERS_ASSEMBLY_RESOURCE.ESTIMATE_SCOPE,commonLocators.CommonKeys.RADIO,0,CommonLocators.CommonElements.PLATFORM_COL)
        _common.waitForLoaderToDisappear()
        _common.selectValue_fromModal(Cypress.env(ASSEMBLY_CODE_1))
        _common.set_cellCheckboxValue_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        });
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_1)
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, CONTAINERS_ASSEMBLY_RESOURCE.VISIBLE, app.InputFields.INPUT_GROUP_CONTENT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION_1)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_ASSEMBLY_RESOURCE.CODE_2)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, 0)
    })
})
