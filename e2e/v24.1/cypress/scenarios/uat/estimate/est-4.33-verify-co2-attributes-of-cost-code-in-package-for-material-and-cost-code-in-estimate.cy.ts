import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _materialPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "EST" + Cypress._.random(0, 999)
const EST_DESC = "EST_DESC_" + Cypress._.random(0, 999)
const LINE_DESC = "ITEM-1-" + Cypress._.random(0, 999)

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.33 | Verify CO2 attributes of cost codes in package (created with selection criteria  - material & cost code) from estimate")

describe("EST- 4.33 | Verify CO2 attributes of cost codes in package (created with selection criteria  - material & cost code) from estimate", () => {

    beforeEach(function () {
        cy.fixture("estimate/est-4.33-verify-co2-attributes-of-cost-code-in-package-for-material-and-cost-code-in-estimate.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-4.33-verify-co2-attributes-of-cost-code-in-package-for-material-and-cost-code-in-estimate.json").then((data) => {
            this.data = data
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(STANDARD_INPUTS.search).delete_pinnedItem()
            _common.search_fromSidebar(STANDARD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it('TC - Pre-Conditions : Add CO2 project value to records and Cost Code Module', function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const COSTCODE_INPUTS = this.data.CostCode.CostCodeInput
        const COSTCODE_GRID = this.data.CostCode.Column_Headers

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.CostCode)
        _common.openTab(app.tabBar.Cost_Codes).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Codes, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Codes, COSTCODE_GRID)
            _validate.set_ColumnAtTop([COSTCODE_GRID.co2project, COSTCODE_GRID.descriptioninfo], cnt.uuid.Cost_Codes)
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.select_rowHasValue(cnt.uuid.Cost_Codes, COSTCODE_INPUTS.costCode)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Cost_Codes, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, COSTCODE_INPUTS.co2projectvalue)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes, app.GridCells.PRC_STRUCTURE_FK)
        cy.SAVE()
        cy.wait(3000)/* This save is mandatory here else value is not reflected in package. */
        _common.search_inSubContainer(cnt.uuid.Cost_Codes, COSTCODE_INPUTS.costCode2)
        cy.wait(2000)/* This save is mandatory here else value is not reflected in package. */
        _common.select_rowHasValue(cnt.uuid.Cost_Codes, COSTCODE_INPUTS.costCode2)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Cost_Codes, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, COSTCODE_INPUTS.co2projectvalue2)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes, app.GridCells.PRC_STRUCTURE_FK)
        cy.wait(2000)/* This save is mandatory here else value is not reflected in package. */
        cy.SAVE()
        cy.wait(3000)/* This save is mandatory here else value is not reflected in package. */
    })

    it('TC - Create new estimate header.', function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const MODULE_INPUTS = this.data.Prerequisites.Modules
        const ESTIMATE_INPUTS = this.data.Estimate.Estimateinput
        const ESTIMATE_GRID = this.data.Estimate.Column_Headers
        const DataCells: DataCells = {
            [app.GridCells.CODE]: EST_CODE,
            [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
            [app.GridCells.RUBRIC_CATEGORY_FK]: ESTIMATE_INPUTS.rubricCategory,
            [app.GridCells.EST_TYPE_FK]: ESTIMATE_INPUTS.estimateType
        }

        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.quickstart, MODULE_INPUTS.Project)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATE_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimateHeader_V1(DataCells)
        cy.SAVE()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });

    it('TC - Create new line item and assign resource to it.', function () {
        const LINEITEM_INPUTS = this.data.Estimate_LineItems.Lineiteminput
        const LINEITEMS_GRID = this.data.Estimate_LineItems.Column_Headers;
        const RESOURCE_INPUTS = this.data.Resources.ResourceInputs
        const RESOURCES_GRID = this.data.Resources.Column_Headers;
        const LINE_ITEM_TEST_DATA: DataCells = {
            [app.GridCells.DESCRIPTION_INFO]: LINE_DESC,
            [app.GridCells.QUANTITY_SMALL]: LINEITEM_INPUTS.quantity
        };
        const RESOURCE1_TEST_DATA: DataCells = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: RESOURCE_INPUTS.shortKey,
            [app.GridCells.CODE]: RESOURCE_INPUTS.costCode,
        };
        const RESOURCE2_TEST_DATA: DataCells = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: RESOURCE_INPUTS.shortKey,
            [app.GridCells.CODE]: RESOURCE_INPUTS.costCode2,
        };

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMS_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem_v1(LINE_ITEM_TEST_DATA)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCES_GRID)
            _validate.set_ColumnAtTop([RESOURCES_GRID.co2project], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource_v1(RESOURCE1_TEST_DATA)
        cy.SAVE()
        cy.wait(3000)/* This save is mandatory here else value is not reflected in package. */
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2Item1", $ele1.text())
            cy.log(Cypress.env("CO2Item1"))
        })
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource_v1(RESOURCE2_TEST_DATA)
        cy.SAVE()
        cy.wait(3000)/* This save is mandatory here else value is not reflected in package. */
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2Item2", $ele1.text())
            cy.log(Cypress.env("CO2Item2"))
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.wait(2000)/* This save is mandatory here else value is not reflected in package. */
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.gridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2TotalLineItem", $ele1.text())
            cy.log(Cypress.env("CO2TotalLineItem"))
        })
    });

    it('TC - Create a Material Package with Material and Cost Code selection criteria.', function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const WIZARD_INPUTS = this.data.Prerequisites.Wizards
        const PACKAGE_INPUT = this.data.Package.PackageInputs
        const PACKAGE_GRID = this.data.Package.Column_Headers;

        _common.openSidebarOption(STANDARD_INPUTS.inWizard)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard, WIZARD_INPUTS.createUpdateMaterialPackage)
        _estimatePage.enterRecord_toCreatePackage_wizard(PACKAGE_INPUT.criteriaSelection)
        cy.SAVE()
        cy.wait(2000)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, PACKAGE_GRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    })

    it('TC - Verify the CO2 attributes of added Cost Codes in Estimate Line item and Estimate Resources container in Package Module.', function () {
        const ESTLINEITEMS_GRID = this.data.PackageEstimate.ESTLineItems_Column_Headers;
        const ESTLINEITEMSRESOURCE_GRID = this.data.PackageEstimate.ESTLResource_Column_Headers;
        const COSTCODE_INPUTS = this.data.CostCode.CostCodeInput

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.packageEstimatelineitem, app.FooterTab.ESTIMATELINEITEM, 2);
            _common.setup_gridLayout(cnt.uuid.packageEstimatelineitem, ESTLINEITEMS_GRID)
            _common.select_tabFromFooter(cnt.uuid.Estimate_Resource, app.FooterTab.ESTIMATERESOURCE, 3);
            _common.setup_gridLayout(cnt.uuid.Estimate_Resource, ESTLINEITEMSRESOURCE_GRID)
        })
        _common.select_tabFromFooter(cnt.uuid.packageEstimatelineitem, app.FooterTab.ESTIMATELINEITEM, 2);
        _common.select_rowInContainer(cnt.uuid.packageEstimatelineitem)
        _common.select_tabFromFooter(cnt.uuid.Estimate_Resource, app.FooterTab.ESTIMATERESOURCE, 3);
        _common.clear_subContainerFilter(cnt.uuid.Estimate_Resource)
        _common.select_rowHasValue(cnt.uuid.Estimate_Resource, COSTCODE_INPUTS.costCode)
        cy.SAVE().then(() => {
            _common.assert_forNumericValues(cnt.uuid.Estimate_Resource, app.GridCells.CO2_PROJECT, Cypress.env("CO2Item1"))
        })
        cy.wait(2000)
        _common.select_rowHasValue(cnt.uuid.Estimate_Resource, COSTCODE_INPUTS.costCode2)
        cy.SAVE().then(() => {
            _common.assert_forNumericValues(cnt.uuid.Estimate_Resource, app.GridCells.CO2_PROJECT, Cypress.env("CO2Item2"))
        })
        _common.select_tabFromFooter(cnt.uuid.packageEstimatelineitem, app.FooterTab.ESTIMATELINEITEM);
        _common.maximizeContainer(cnt.uuid.packageEstimatelineitem)
        _common.clear_subContainerFilter(cnt.uuid.packageEstimatelineitem)
        cy.SAVE().then(() => {
            _common.select_rowInContainer(cnt.uuid.packageEstimatelineitem)
            _common.assert_forNumericValues(cnt.uuid.packageEstimatelineitem, app.gridCells.CO2_PROJECT_TOTAL, Cypress.env("CO2TotalLineItem"))
        })
    })
})