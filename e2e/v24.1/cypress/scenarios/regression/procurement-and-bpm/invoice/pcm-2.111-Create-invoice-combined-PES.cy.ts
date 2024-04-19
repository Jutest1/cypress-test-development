import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _procurementConfig, _validate, _procurementPage, _projectPage, _controllingUnit, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const CLERKNAME = "HS";
const allure = Cypress.Allure.reporter.getInterface();
const INVOICENO1 = "INVOICENO-" + Cypress._.random(0, 999)
const INVOICENO2 = "INVOICENO-" + Cypress._.random(0, 999)
const INVOICENO3 = "INVOICENO-" + Cypress._.random(0, 999)
const CU_DESC = "CU-DESC" + Cypress._.random(0, 999)
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const PES_CODE = 'PES_CODE'

let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_PACKAGE
let CONTAINER_COLUMNS_ITEMS
let CONTAINER_COLUMNS_PROCUREMENTCONTRACT
let CONTAINERS_PROCUREMENTCONTRACT
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells
let CONTAINER_COLUMNS_INVOICEHEADER
let CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS
let QUOTE;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");
allure.story("PCM- 2.111 | Create invoice-combined PES")
describe("PCM- 2.111 | Create invoice-combined PES", () => {
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.111-Create-invoice-combined-PES.json").then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            QUOTE = this.data.CONTAINERS.QUOTE
            CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS = this.data.CONTAINER_COLUMNS.PERFORMANCE_ENTRY_SHEETS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
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
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
            }
            CONTAINER_COLUMNS_INVOICEHEADER = this.data.CONTAINER_COLUMNS.INVOICEHEADER
            CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT
            CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CU_CODE")
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _estimatePage.replaceResource_fromWizard
    });

    it("TC - Create new Estimate having line item ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    });

    it('TC - Create new line item with quantity and assign material resource', function () {
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
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create material package and change package status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard("Material", btn.ButtonText.YES)
        cy.wait(1000)//required Waits
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
        cy.SAVE();
    });

    it('TC - Create Contract from package assign controlling unit and change contract status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        cy.wait(1000) //required Waits
        _package.create_ContractfromPackage(CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER);
        cy.wait(3000) //required Waits
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT);
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT,)
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CU_CODE"))
        cy.SAVE()
        cy.wait(1000) //required Waits
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CLERKNAME)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    });

    it('TC - Create two PES for single contract and update PES item quantity', function () {
        cy.wait(2000) //required Waits
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        cy.wait(2000) //required Waits
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _procurementPage.getCode_fromPESModal("PES_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required Waits
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        cy.wait(2000)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
            _common.waitForLoaderToDisappear()
            cy.wait(1000) //required Waits
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        })
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "150.00")
        cy.SAVE()
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        cy.wait(500)
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PES1_TOTAL", $ele1.text())
        })
        cy.log(Cypress.env("PES1_TOTAL"))
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS)
        })
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _validate.verify_CreatePESforExistingPESandGoToPES()
        cy.wait(1000)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.clear_subContainerFilter(cnt.uuid.HEADERS,)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS)
        })
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "150.00")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(500)
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PES2_TOTAL", $ele1.text())
        })
        cy.log(Cypress.env("PES2_TOTAL"))
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()
        cy.wait(3000) //required Waits
    });

    it('TC - Create another contract, PES and update quantity of PES items', function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        cy.wait(2000) //required Wait
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.PROCUREMENTCONTRACT, btn.ToolBar.ICO_COPY_PASTE_DEEP)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.wait(500)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
            _common.waitForLoaderToDisappear()
            cy.wait(1000)//required Waits
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "150.00")
        cy.wait(500)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.clear_subContainerFilter(cnt.uuid.HEADERS)
            _common.setup_gridLayout(cnt.uuid.HEADERS,CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS)
        })
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PES3_TOTAL", $ele1.text())
        })
        cy.log(Cypress.env("PES3_TOTAL"))
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.select_allContainerData(cnt.uuid.HEADERS)
        _estimatePage.replaceResource_fromWizard
    });

    it('TC - Change PES status and create invoice from wizard', function () {
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.select_allContainerData(cnt.uuid.HEADERS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits
        _common.changeStatus_ofMultipleRecord_fromModal(sidebar.SideBarOptions.ACCEPTION)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.select_allContainerData(cnt.uuid.HEADERS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
        _package.enterRecord_toCreate_InvoiceForMultiplePES_FromWizard("Create one invoice for PES having same contract", INVOICENO1, INVOICENO2)
    });

    it('TC - Verify multiple invoice created based on contract', function () {
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.setDefaultView(app.TabBar.INVOICES)
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 2)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICEHEADER);
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER,)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER, INVOICENO1)
        _common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, INVOICENO1)
        var FirstInvoice = (parseFloat(Cypress.env("PES1_TOTAL")) + parseFloat(Cypress.env("PES2_TOTAL"))).toFixed(2)
        cy.log(FirstInvoice)
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICERECONSILIATION, app.FooterTab.RECONSILIATION, 0)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICERECONSILIATION, app.GridCells.RECON_NAME, "From PES")
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICERECONSILIATION, app.GridCells.RECON_NET, FirstInvoice)
    });

    it('TC - Verify create new contract and PES', function () {
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER)
        })
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.INVOICEHEADER, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.PROCUREMENTCONTRACT, btn.ToolBar.ICO_COPY_PASTE_DEEP)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
            _common.waitForLoaderToDisappear()
            cy.wait(1000)//required Waits
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "150.00")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMS)
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PES4_TOTAL", $ele1.text())
        })
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS)
        })
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS, sidebar.SideBarOptions.CONTRACT)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify create another contract and PES and change status of new created PES', function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.PROCUREMENTCONTRACT, btn.ToolBar.ICO_COPY_PASTE_DEEP)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.saveCellDataToEnv(cnt.uuid.HEADERS,app.GridCells.CODE,PES_CODE)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
            _common.waitForLoaderToDisappear()
            cy.wait(1000)//required Waits
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
        })
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, "150.00")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMS)
        cy.wait(500)
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PES5_TOTAL", $ele1.text())
        })
        cy.log(Cypress.env("PES5_TOTAL"))
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS)
        })
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.search_inSubContainer(cnt.uuid.HEADERS,PES_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required Waits
        _common.changeStatus_ofMultipleRecord_fromModal(sidebar.SideBarOptions.ACCEPTION)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.search_inSubContainer(cnt.uuid.HEADERS, sidebar.SideBarOptions.ACCEPTION)
        _common.select_allContainerData(cnt.uuid.HEADERS)
    });

    it('TC - Create invoice from wizard and verify single invoice gets created', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
        _package.enterRecord_toCreate_Invoice_FromWizard("Create one invoice for all PES independently of the contract", INVOICENO3)
        cy.wait(1000)
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        var NewInvoice = (parseFloat(Cypress.env("PES4_TOTAL")) + parseFloat(Cypress.env("PES5_TOTAL"))).toFixed(2)
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICERECONSILIATION, app.FooterTab.RECONSILIATION, 0)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICERECONSILIATION, app.GridCells.RECON_NAME, "From PES")
        _common.assert_cellData_insideActiveRow(cnt.uuid.INVOICERECONSILIATION, app.GridCells.RECON_NET, NewInvoice)
    });
})