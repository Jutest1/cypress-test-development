import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _procurementPage, _package, _validate, _mainView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const TEXT_ASSEMBLIES_CODE_01 = "T01-" + Cypress._.random(0, 999);
const TEXT_ASSEMBLIES_CODE_02 = "T02-" + Cypress._.random(0, 999);
const ITEM_TEXT_ARRAY = "ITEM_TEXT";
const LOOKUP_ITEM_ARRAY = "LOOKUP_ITEMS";

let CONTAINERS_ITEM_TEXTS, CONTAINERS_REQUISITION, CONTAINERS_ITEMS;

let CONTAINER_COLUMNS_CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIGURATIONS, CONTAINER_COLUMNS_ITEM_TEXTS, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_ITEMS;

let REQUISITION_PARAMETER: DataCells, REQUISITION_ITEM_PARAMETER: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.174 | Item Text")

describe("PCM- 2.174 | Item Text", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.174-item-text.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_CONFIGURATION_HEADER = this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADER;
            CONTAINER_COLUMNS_CONFIGURATIONS = this.data.CONTAINER_COLUMNS.CONFIGURATIONS;
            CONTAINER_COLUMNS_ITEM_TEXTS = this.data.CONTAINER_COLUMNS.ITEM_TEXTS;
            CONTAINERS_ITEM_TEXTS = this.data.CONTAINERS.ITEM_TEXTS
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION;
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION
            REQUISITION_PARAMETER = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION[0],
            };
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS
            REQUISITION_ITEM_PARAMETER = {
                [app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_ITEMS.MATERIAL[0],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEMS.QUANTITY[0]
            }
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
            _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create Item Text', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, CommonLocators.CommonLabels.PROCUREMENT_CONFIGURATION)
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.setDefaultView(app.TabBar.HEADER)
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.MATERIAL)
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CommonLocators.CommonLabels.REQUISITION)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.MATERIAL_REQ)
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.FooterTab.ITEM_TEXTS, 2);
        });
        _common.getText_storeIntoArray(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.GridCells.PRC_TEXT_TYPE_FK, ITEM_TEXT_ARRAY)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.GridCells.PRC_TEXT_TYPE_FK, CONTAINERS_ITEM_TEXTS.TEXT_TYPE[0])
        _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.GridCells.BAS_TEXT_MODULE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_ITEM_TEXTS.TEXT_MODULE_TYPE[0])
        cy.SAVE()
    })

    it('TC - Verify Creation Of Record in Requisition module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN);
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS);
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
        cy.SAVE();
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.clickOn_cellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.CODE)
        _common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("REQUISITION_CODE", $ele1.text())
            cy.log(Cypress.env("REQUISITION_CODE"))
        })
    })

    it('TC - Create requisition item record and add material', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS);
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
        _package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETER)
        cy.SAVE()
        _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
    })

    it('TC - Verify new button of item text is working', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_TEXTS, app.FooterTab.ITEM_TEXTS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEM_TEXTS)
        _common.create_newRecord(cnt.uuid.ITEM_TEXTS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_ITEM_TEXTS.TEXT_TYPE[0])
        cy.SAVE()
    })

    it('TC - Verify set value to text if text type exists in configuration module item text container then the text module type will get value from configuration', function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.ITEM_TEXTS, app.GridCells.TEXT_MODULE_TYPE_FK, CONTAINERS_ITEM_TEXTS.TEXT_MODULE_TYPE[0])
    })

    it('TC - Verify delete button of item text is working; ', function () {
        _common.delete_recordFromContainer(cnt.uuid.ITEM_TEXTS)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify the text type lookup will filter from configuration-item text; ', function () {
        _common.create_newRecord(cnt.uuid.ITEM_TEXTS)
        _common.getText_fromPopUpContent_fromCaret(cnt.uuid.ITEM_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK, LOOKUP_ITEM_ARRAY)
        cy.wait(500).then(() => {
            _validate.verify_isArrayEquals(Cypress.env(ITEM_TEXT_ARRAY), Cypress.env(LOOKUP_ITEM_ARRAY))
        })
    })

    it('TC - Verify if text miodule is not null in configuration then it will get content from text module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TEXT_MODULES)
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.setDefaultView(app.TabBar.TEXT_MODULES_MAIN, CommonLocators.CommonKeys.DEFAULT)
            _common.select_tabFromFooter(cnt.uuid.TEXT_ASSEMBLIES, app.FooterTab.TEXT_ASSEMBLIES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.TEXT_ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, TEXT_ASSEMBLIES_CODE_01)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, TEXT_ASSEMBLIES_CODE_01)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.TEXT_FORMAT_FK, CommonLocators.CommonKeys.LIST, "HTML File")
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.IS_LANGUAGE_DEPENDENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAIN_TEXT, app.FooterTab.PLAIN_TEXT, 1);
        });
        _common.edit_inTextAreaOfContainer(cnt.uuid.PLAIN_TEXT, CONTAINERS_ITEM_TEXTS.PLAIN_TEXT_INPUT[0])
        cy.SAVE()
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TEXT_ASSEMBLIES, app.FooterTab.TEXT_ASSEMBLIES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.TEXT_ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, TEXT_ASSEMBLIES_CODE_02)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, TEXT_ASSEMBLIES_CODE_02)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.TEXT_FORMAT_FK, CommonLocators.CommonKeys.LIST, "HTML File")
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES, app.GridCells.IS_LANGUAGE_DEPENDENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAIN_TEXT, app.FooterTab.PLAIN_TEXT, 1);
        });
        _common.edit_inTextAreaOfContainer(cnt.uuid.PLAIN_TEXT, CONTAINERS_ITEM_TEXTS.PLAIN_TEXT_INPUT[1])
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.REQUISITION)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
        _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS);
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS);
        _common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEM_PLAIN_TEXT, app.FooterTab.ITEM_PLAIN_TEXT, 2);
        });
        _common.maximizeContainer(cnt.uuid.ITEM_PLAIN_TEXT)
        _common.select_rowInContainer(cnt.uuid.ITEM_PLAIN_TEXT)
        _common.clickOn_toolbarButton(cnt.uuid.ITEM_PLAIN_TEXT, btn.ToolBar.ICO_VIEW_ODS)
        cy.wait(2000).then(() => {
            _common.select_ItemFromPopUpList(CommonLocators.CommonKeys.GRID_1, TEXT_ASSEMBLIES_CODE_01)
        })
        cy.wait(2000).then(() => {
            _validate.validate_Text_In_Container_Textarea(cnt.uuid.ITEM_PLAIN_TEXT, CONTAINERS_ITEM_TEXTS.PLAIN_TEXT_INPUT[0])
        })
        _common.clearOrType_inPlainTextArea_inContainer(cnt.uuid.ITEM_PLAIN_TEXT)
        _common.clickOn_toolbarButton(cnt.uuid.ITEM_PLAIN_TEXT, btn.ToolBar.ICO_VIEW_ODS)
        cy.wait(2000).then(() => {
            _common.select_ItemFromPopUpList(CommonLocators.CommonKeys.GRID_1, TEXT_ASSEMBLIES_CODE_02)
        })
        cy.wait(2000).then(() => {
            _validate.validate_Text_In_Container_Textarea(cnt.uuid.ITEM_PLAIN_TEXT, CONTAINERS_ITEM_TEXTS.PLAIN_TEXT_INPUT[1])
        })
        _common.minimizeContainer(cnt.uuid.ITEM_PLAIN_TEXT)
    })

})