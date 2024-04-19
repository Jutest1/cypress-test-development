import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const CONTRACT_CODE01 = "CONT_CODE-01"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
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
let CONTAINER_COLUMNS_ITEM_GRID
let CONTAINERS_CONTRACT
let DJC_BUDGET_PARAMETERS: DataCells
let MODAL_GENERATE_BUDGET;

let CONTAINER_COLUMNS_ESTIMATETOTALS
let CONTAINERS_ESTIMATETOTALS
let CONTAINERS_ITEMS

let CONTAINER_COLUMNS_CURRENCY_CONVERSION
let CONTAINERS_CURRENCY_CONVERSION

let CONTAINER_COLUMNS_PROCUREMENTCONTRACT
let CONTAINERS_PROCUREMENTCONTRACT
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.93 | Check total values in contract module");

describe("PCM- 2.93 | Check total values in contract module", () => {


    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")

        );

        cy.fixture("pcm/pcm-2.93-check-total-value-in-contract.json").then((data) => {
            this.data = data
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_ITEMS = this.data.CONTAINERS.ITEMS;
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
            CONTAINER_COLUMNS_ITEM_GRID = this.data.CONTAINER_COLUMNS.ITEM_GRID
            CONTAINERS_CONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT
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
            }
            MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;
            DJC_BUDGET_PARAMETERS = {
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]: MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]: MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }
            CONTAINERS_ESTIMATETOTALS = this.data.CONTAINERS.ESTIMATETOTALS
            CONTAINER_COLUMNS_ESTIMATETOTALS = this.data.CONTAINER_COLUMNS.ESTIMATETOTALS


            CONTAINERS_CURRENCY_CONVERSION = this.data.CONTAINERS.CURRENCY_CONVERSION
            CONTAINER_COLUMNS_CURRENCY_CONVERSION = this.data.CONTAINER_COLUMNS.CURRENCY_CONVERSION

            CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT
            CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });



    it("TC - Create an Estimate Header, Create a new Line item and Assign Material Resources to Line Item", function () {
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
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
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

    });

    it("TC - Generation of budget for line item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET, "LINE_ITEM_BUDGET")

    });

    it("TC - Verify budget value of line item in totals container", function () {
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATETOTALS, app.FooterTab.TOTAL, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATETOTALS, CONTAINER_COLUMNS_ESTIMATETOTALS)
        });
        cy.wait(1000)
        _common.maximizeContainer(cnt.uuid.ESTIMATETOTALS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATETOTALS.DESCRIPTION_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL, Cypress.env("LINE_ITEM_BUDGET"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATETOTALS.DESCRIPTION_2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL, Cypress.env("LINE_ITEM_BUDGET"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATETOTALS, app.GridCells.DESCRIPTION, CONTAINERS_ESTIMATETOTALS.DESCRIPTION_3)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATETOTALS, app.GridCells.TOTAL, Cypress.env("LINE_ITEM_BUDGET"))
        _common.minimizeContainer(cnt.uuid.ESTIMATETOTALS)

    })

    it("TC - Verify creation of a material package", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _package.create_materialPackage_Consolidatedchkbox(MODAL_PACKAGE.SCOPE, MODAL_PACKAGE.SCOPE_ID, MODAL_PACKAGE.CRITERIA_SELECTION, CONTAINERS_RESOURCE.CODE)
        cy.wait(2000) //required wait to load page

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        })
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GRID)
        })
        _common.select_allContainerData(cnt.uuid.PACKAGEITEMS)
        cy.wait(1000)//required Waits
            _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
        _procurementConfig.changeProcurementConfiguration_FromWizard(MODAL_PACKAGE.CONFIGURATION, btn.ButtonText.YES)
        cy.SAVE()
        cy.wait(1000)//required Waits
            _common.waitForLoaderToDisappear()
    });

    it("TC - Verify creation of contract from material package", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BUISNESS_PARTNER)

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)

            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        cy.wait(1000)//required Waits
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(CONTRACT_CODE01, $ele1.text())
            cy.log(Cypress.env(CONTRACT_CODE01))
        })
        cy.wait(2000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        })
        cy.wait(1000)//required Waits
            _common.waitForLoaderToDisappear()
        cy.SAVE()
    });

    it("TC - Verify add new record ,delete record and net value in totals container", function () {

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTAL, 0);
        })
        _common.create_newRecord(cnt.uuid.CONTRACT_TOTALS)
        cy.wait(1000)//required Waits
            _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("TOTALS_TYPE", $ele1.text())
            cy.SAVE()
            cy.wait(1000)//required Waits
            _common.waitForLoaderToDisappear()
            _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, Cypress.env("TOTALS_TYPE"))
            _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, Cypress.env("TOTALS_TYPE"));
            _common.delete_recordFromContainer(cnt.uuid.CONTRACT_TOTALS)
            cy.SAVE()
            cy.wait(1000)//required Waits
            _common.waitForLoaderToDisappear()
            _validate.assert_cellData_not_equal(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, Cypress.env("TOTALS_TYPE"))
        })
        _common.select_allContainerData(cnt.uuid.CONTRACT_TOTALS);
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_TOTALS, 0).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_ON_OFF_ZERO).clickIn();
        cy.wait(2000)

        _common.getText_storeIntoArray(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, "NET_VALUES")
        cy.wait(2000).then(() => {
            expect(Cypress.env("NET_VALUES")).to.not.equal("0.00");
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, CONTAINERS_ESTIMATETOTALS.TOTAL_TYPE)
        _common.getText_fromCell(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("TOTAL_NET_VALUE", $ele1.text())

        })
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0)
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEM_GRID)
            _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
            _common.assert_cellDataByContent_inContainer(cnt.uuid.ITEMSCONTRACT, app.GridCells.TOTAL, Cypress.env("TOTAL_NET_VALUE"))
        })
    })

    it("TC - Update the quantity , price and verify the totals in items container", function () {

        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.enterRecord_inNewRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.QUANTITY)
        _common.enterRecord_inNewRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS.PRICE)
        cy.SAVE()
        cy.wait(2000)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("ITEMS_TOTAL", $ele1.text())
        })
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTAL, 0);
            _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, CONTAINERS_ESTIMATETOTALS.TOTAL_TYPE)
            _common.waitForLoaderToDisappear()
            cy.REFRESH_SELECTED_ENTITIES()
            cy.wait(1000)
            _common.select_activeRowInContainer(cnt.uuid.CONTRACT_TOTALS)
            _common.assert_forNumericValues(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env("ITEMS_TOTAL"))
        })
    })

    it("TC - Add currency conversion and exchange rates to home currency", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CURRENCY);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CURRENCY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HOME_CURRENCY, app.FooterTab.HOME_CURRENCY, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.HOME_CURRENCY)

        _common.search_inSubContainer(cnt.uuid.HOME_CURRENCY, CONTAINERS_CURRENCY_CONVERSION.HOME_CURRENCY)
        _common.openTab(app.TabBar.CURRENCY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CURRENCY_CONVERSION, app.FooterTab.CURRENCY_CONVERSION, 0);
            _common.setup_gridLayout(cnt.uuid.CURRENCY_CONVERSION, CONTAINER_COLUMNS_CURRENCY_CONVERSION)
        })
        cy.wait(5000).then(() => {
            _common.create_newRecordInCurrencyConversion_ifRecordNotExists(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.CURRENCY_FOREIGN_FK, CONTAINERS_CURRENCY_CONVERSION.CURRENCY, CONTAINERS_CURRENCY_CONVERSION.RATE, 0)
        })
    })

    it("TC - Update the rate in contract and verify the net value in totals container", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        })
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.EXCHANGE_RATE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("RATE", $ele1.text())
        })
        cy.REFRESH_SELECTED_ENTITIES()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BAS_CURRENCY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CURRENCY_CONVERSION.CURRENCY)
        cy.SAVE()
        cy.wait(1000)
        _common.clickOn_modalFooterButton("Yes")
        cy.wait(3000)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        cy.wait(2000).then(() => {
            _validate.assert_cellData_not_equal(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.EXCHANGE_RATE, Cypress.env("RATE"))
        })
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTAL, 0);
            _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, CONTAINERS_ESTIMATETOTALS.TOTAL_TYPE)
            cy.wait(1000)
            _validate.assert_cellData_not_equal(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env("ITEMS_TOTAL"))
        })

    })

    it("TC - Update the vat group in contract and verify the gross value in totals container", function () {

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BPD_VAT_GROUP_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROCUREMENTCONTRACT.VAT_GROUP)

        cy.SAVE()
        cy.wait(1000)//required wait
        _common.clickOn_modalFooterButton("Yes")
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        cy.SAVE()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTAL, 0);
            _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TOTAL_TYPE_FK, CONTAINERS_ESTIMATETOTALS.TOTAL_TYPE)
            cy.wait(1000)
            _validate.assert_cellData_not_equal(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env("ITEMS_TOTAL"))
        })
        _common.getTextfromCell(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, app.GridCells.VALUE_TAX)
        cy.wait(1000).then(() => {
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.CONTRACT_TOTALS, Cypress.env("Text"), Cypress.env("gridcell_2_Text"), app.GridCells.GROSS)

        })
    })
    
  after(() => {
    cy.LOGOUT();
  });
})
