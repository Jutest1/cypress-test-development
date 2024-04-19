import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _validate } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST1_HEADER = "1EST-" + Cypress._.random(0, 999)
const EST_CODE = "EST_-" + Cypress._.random(0, 999)
const LINEITEM_DESC = "1ESTLI-" + Cypress._.random(0, 999)

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST-1.41 | Standard Allowance Calculation Using Estimate-by-Markup Allowance Type.");

describe("EST-1.41 | Standard Allowance Calculation Using Estimate-by-Markup Allowance Type.", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-1.41-standard-allowance-calculation-using-estimate-by-markup-allowance-type.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("estimate/est-1.41-standard-allowance-calculation-using-estimate-by-markup-allowance-type.json").then((data) => {
            this.data = data
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
            _common.search_fromSidebar(STANDARD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it("TC - Create an Estimate Header, Create a new Line items and Assign Material Resources to Line Item", function () {
        const ESTIMATE_GRID = this.data.Estimate.Column_Headers
        const LINEITEMS_GRID = this.data.Estimate_LineItems.Column_Headers
        const LINEITEMS_INPUT = this.data.Estimate_LineItems.Lineiteminput
        const RESOURCE_GRID = this.data.Resources.Column_Headers
        const RESOURCE_INPUTS = this.data.Resources.ResourceInputs
        const ESTIMATE_DATA: DataCells = {
            [app.GridCells.CODE]: EST_CODE,
            [app.GridCells.DESCRIPTION_INFO]: EST1_HEADER,
            [app.GridCells.RUBRIC_CATEGORY_FK]: this.data.Estimate.Estimateinput.rubricCategory,
            [app.GridCells.EST_TYPE_FK]: this.data.Estimate.Estimateinput.estimateType
        }
        const LINEITEM_DATA: DataCells = {
            [app.GridCells.DESCRIPTION_INFO]: LINEITEM_DESC,
            [app.GridCells.QUANTITY_SMALL]: LINEITEMS_INPUT.quantity
        };
        const COSTCODE1: DataCells = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: RESOURCE_INPUTS.shorttKey,
            [app.GridCells.CODE]: RESOURCE_INPUTS.code,
            [app.GridCells.QUANTITY_SMALL]: RESOURCE_INPUTS.quantity
        };

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATE_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimateHeader_V1(ESTIMATE_DATA)
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELineItem)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMS_GRID)
            _validate.set_ColumnAtTop([LINEITEMS_GRID.am, LINEITEMS_GRID.rp, LINEITEMS_GRID.am, LINEITEMS_GRID.basuomfk, LINEITEMS_GRID.quantity, LINEITEMS_GRID.descriptioninfo, LINEITEMS_GRID.code], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS, 2)
        _common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem_v1(LINEITEM_DATA)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource_v1(COSTCODE1)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("C1_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("C1_Cost"))
        })
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM_DESC)
    });

    it("TC - Add Standard Allowance and Recalculate it.", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const STANDARDALLOWANCE_INPUTS = this.data.StandardAllowance.StandardAllowance_Inputs
        const STANDARDALLOWANCE_GRID = this.data.StandardAllowance.StandardAllowance_Column_Headers

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 0);
            _common.setup_gridLayout(cnt.uuid.STANDARD_ALLOWANCES, STANDARDALLOWANCE_GRID);
        });
        _common.maximizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.create_newRecord(cnt.uuid.STANDARD_ALLOWANCES);
        _estimatePage.enterRecord_toStanderdAllowance(STANDARDALLOWANCE_INPUTS.saCode, STANDARDALLOWANCE_INPUTS.saQtyType);
        _common.selectActiveRow_inContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.STANDARD_ALLOWANCES, app.gridCells.Allowance_Type, STANDARD_INPUTS.gridList, STANDARDALLOWANCE_INPUTS.saType)
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
    });

    it('TC - Create & Verify Allowance Markup records in Estimate.', function () {
        const ALLOWANCEMARKUP_GRID = this.data.StandardAllowance.AllowanceMarkup_Column_Headers;
        const MARKUP_INPUTS = this.data.StandardAllowance.AllowanceMarkupInputs;
        const MARKUPINPUT_1: DataCells = {
            [app.GridCells.MDC_COST_CODE_DESCRIPTION]: MARKUP_INPUTS.Lohn,
            [app.GridCells.GA_PERC]: MARKUP_INPUTS.ga2,
            [app.GridCells.RP_PERC]: MARKUP_INPUTS.rp2,
            [app.GridCells.AM_PERC]: MARKUP_INPUTS.am2
        }

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ALLOWANCEMARKUP, app.FooterTab.ALLOWANCE_MARKUP, 2);
            _common.setup_gridLayout(cnt.uuid.ALLOWANCEMARKUP, ALLOWANCEMARKUP_GRID);
        });
        _common.clickToolbarButton(cnt.uuid.ALLOWANCEMARKUP, btn.toolbar.UpdateMajorCostCode)
        _common.maximizeContainer(cnt.uuid.ALLOWANCEMARKUP)
        _estimatePage.enterRecord_toCreateAllowanceMarkup(MARKUPINPUT_1);
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.GA_PERC).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("GA_Percent", $ele1.text())
            cy.log(Cypress.env("GA_Percent"))
        })
        _common.getText_fromCell(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.RP_PERC).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("RP_Percent", $ele1.text())
            cy.log(Cypress.env("RP_Percent"))
        })
        _common.getText_fromCell(cnt.uuid.ALLOWANCEMARKUP, app.GridCells.AM_PERC).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("AM_Percent", $ele1.text())
            cy.log(Cypress.env("AM_Percent"))
        })
        _common.minimizeContainer(cnt.uuid.ALLOWANCEMARKUP)
        cy.REFRESH_CONTAINER()
    });

    it('TC - Create & Verify Allowance Markup records in Estimate.', function () {
        const GAVALUE = ((parseFloat(Cypress.env("GA_Percent"))) * ((parseFloat(Cypress.env("C1_Cost")) / 100))).toFixed(2).toString()
        const RPVALUE = ((parseFloat(Cypress.env("RP_Percent"))) * ((parseFloat(Cypress.env("C1_Cost")) / 100))).toFixed(2).toString()
        const AMVALUE = ((parseFloat(Cypress.env("AM_Percent"))) * ((parseFloat(Cypress.env("C1_Cost")) / 100))).toFixed(2).toString()

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.STANDARD_ALLOWANCES, app.FooterTab.STANDARS_ALLOWANCES, 0);
        });
        _common.maximizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.clickOn_recalculateButton(cnt.uuid.STANDARD_ALLOWANCES)
        _common.minimizeContainer(cnt.uuid.STANDARD_ALLOWANCES)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM_DESC)
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.gridCells.GA, GAVALUE)
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.gridCells.RP, RPVALUE)
            _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.gridCells.AM, AMVALUE)
        })
    })

});

after(() => {
    cy.LOGOUT();
})