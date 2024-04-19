import { app, commonLocators, tile, sidebar, cnt } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _assembliesPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const ASSEMBLIES_DESCRIPTION = "A-DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_COST_CODES;
let CONTAINERS_COST_CODES;
let CONTAINERS_MATERIAL_CATALOG_FILTER;
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER;
let CONTAINERS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES;
let CONTAINERS_ASSEMBLY_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLIES;
let ASSEMBLIES_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCES;
let CONTAINERS_ASSEMBLY_RESOURCES;
let ASSEMBLY_RESOURCE_COST_CODE_PARAMETER: DataCells;
let ASSEMBLY_RESOURCE_MATERIAL_PARAMETER: DataCells;
let MODAL_RECALCULATE_ASSEMBLIES_WIZARD;
let RECALCULATE_ASSEMBLIES_WIZARD_PARAMETERS: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.5 | Update CO2/kg attribute only in assemblies materials")

describe("EST- 4.5 | Update CO2/kg attribute only in assemblies materials", () => {

    before(function () {

        cy.fixture("estimate/est-4.5-Update-co2-attribute-only-in-assemblies-materials.json").then((data) => {
            this.data = data
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            CONTAINERS_MATERIAL_CATALOG_FILTER = this.data.CONTAINERS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINERS_ASSEMBLY_CATEGORIES = this.data.CONTAINERS.ASSEMBLY_CATEGORIES
            CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES = this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES
            CONTAINER_COLUMNS_ASSEMBLIES = this.data.CONTAINER_COLUMNS.ASSEMBLIES
            ASSEMBLIES_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: ASSEMBLIES_DESCRIPTION
            };
            CONTAINERS_ASSEMBLY_RESOURCES = this.data.CONTAINERS.ASSEMBLY_RESOURCES
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCES = this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCES
            ASSEMBLY_RESOURCE_COST_CODE_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCES.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCES.COST_CODE[0]
            }
            ASSEMBLY_RESOURCE_MATERIAL_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_ASSEMBLY_RESOURCES.SHORT_KEY[1],
                [app.GridCells.CODE]: CONTAINERS_ASSEMBLY_RESOURCES.MATERIAL[0]
            }
            MODAL_RECALCULATE_ASSEMBLIES_WIZARD = this.data.MODAL.RECALCULATE_ASSEMBLIES_UPDATE_SETTING
            RECALCULATE_ASSEMBLIES_WIZARD_PARAMETERS = {
                [commonLocators.CommonKeys.RADIO]: CommonLocators.CommonLabels.HIGHLIGHTED_ASSEMBLY,
                [commonLocators.CommonKeys.RADIO_INDEX]: 0,
                [commonLocators.CommonKeys.CHECKBOX]: MODAL_RECALCULATE_ASSEMBLIES_WIZARD
            }
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo, CONTAINER_COLUMNS_COST_CODES.code], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("COST_CODE_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("COST_CODE_1_CO2_VALUE"))
        })
    })

    it('TC - Add CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL_RECORDS.co2project, CONTAINER_COLUMNS_MATERIAL_RECORDS.descriptioninfo1], cnt.uuid.MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MATERIAL_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("MATERIAL_1_CO2_VALUE"))
        })
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add assembly resource in assemblies module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.setDefaultView(app.TabBar.ASSEMBLIES, commonLocators.CommonKeys.DEFAULT)
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
        _common.toggle_radioFiledInContainer(CommonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES, ASSEMBLIES_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
        _common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.co2source, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.co2sourcetotal, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.co2projecttotal, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.quantity, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.descriptioninfo, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.code, CONTAINER_COLUMNS_ASSEMBLY_RESOURCES.estresourcetypeshortkey], cnt.uuid.ASSEMBLY_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.select_rowHasValue(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION", $ele1.text())
            cy.log(Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION"))
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("ASSEMBLY_MATERIAL_DESCRIPTION", $ele1.text())
            cy.log(Cypress.env("ASSEMBLY_MATERIAL_DESCRIPTION"))
        })
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify CO2/kg(source) is not editable in assembly resource', function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION"))
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_TOTAL1", $ele1.text())
        })
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_SOURCE_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_SOURCE_TOTAL1", $ele1.text())
        })
        _validate.verify_isRecordNotEditable(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_SOURCE, 0)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, Cypress.env("ASSEMBLY_MATERIAL_DESCRIPTION"))
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_TOTAL2", $ele1.text())
        })
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_SOURCE_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_SOURCE_TOTAL2", $ele1.text())
        })
        _validate.verify_isRecordNotEditable(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_SOURCE, 0)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it('TC - Update CO2/kg(Project) for cost code record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo, CONTAINER_COLUMNS_COST_CODES.code], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.UPDATED_CO2_PROJECT_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE[0])
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("UPDATED_COST_CODE_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("UPDATED_COST_CODE_1_CO2_VALUE"))
        })
    })

    it('TC - Update CO2 project value to record in material module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL_CATALOG_FILTER.MATERIAL_CATALOG_DESCRIPTION)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL_RECORDS.co2project, CONTAINER_COLUMNS_MATERIAL_RECORDS.descriptioninfo1], cnt.uuid.MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.UPDATED_CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("UPDATED_MATERIAL_1_CO2_VALUE", $ele1.text())
            cy.log(Cypress.env("UPDATED_MATERIAL_1_CO2_VALUE"))
        })
        _common.waitForLoaderToDisappear()
    })

    it('TC - Recalculate assembly', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
        _common.toggle_radioFiledInContainer(CommonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION"))
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RECALCULATE_ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_WIZARD_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify co2 attribute for material resource is updated after recalculate assembly and for cost code resource it remains unchanged', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_CATEGORY_DESCRIPTION)
        _common.toggle_radioFiledInContainer(CommonLocators.CommonKeys.SELECT_RADIO_BUTTON, cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.MARKER)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLIES, ASSEMBLIES_DESCRIPTION)
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, Cypress.env("ASSEMBLY_COST_CODE_DESCRIPTION"))
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("UPDATED_COST_CODE_1_CO2_VALUE"))

        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.DESCRIPTION_INFO, Cypress.env("ASSEMBLY_MATERIAL_DESCRIPTION"))
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT, Cypress.env("UPDATED_MATERIAL_1_CO2_VALUE"))
    })

})