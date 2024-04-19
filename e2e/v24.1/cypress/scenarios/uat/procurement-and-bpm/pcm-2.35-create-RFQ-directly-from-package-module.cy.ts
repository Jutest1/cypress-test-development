import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _rfqPage } from "cypress/pages";


// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.35 | Create RFQ directly from Package module");

describe("PCM- 2.35 | Create RFQ directly from Package module", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.35.create-RFQ-directly-from-ackage-module.json").then(
            (data) => {
                this.data = data;
            }
        );
    });

    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("pcm/pcm-2.35.create-RFQ-directly-from-ackage-module.json").then(
            (data) => {
                this.data = data;
                const standerdInputs = this.data.Prerequisites.SidebarInputs;
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER"))
                    .pinnedItem();
                const estimateInputs = this.data.CreateEstimate.EstimateInput;
                const estimateGrid = this.data.CreateEstimate.column_headers;
                _common.openTab(app.TabBar.ESTIMATE).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
                    _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
                });
                _common.create_newRecord(cnt.uuid.ESTIMATE);
                _estimatePage.enterRecord_toCreateEstimateHeader(
                    EST_CODE,
                    EST_DESC,
                    estimateInputs.rubicCategory,
                    estimateInputs.estimateType
                );
                cy.SAVE();
                _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
            }
        );
    });
    after(() => {
		cy.LOGOUT();
	});
    it("TC -  Create New Line Item Record", function () {
        const lineItemInput = this.data.CreateNewLineItem.lineItemInputs;
        const lineItemGrid = this.data.CreateNewLineItem.column_headers;
        const resourceInput = this.data.CreateNewResource.ResourceInputs;
        const resourcesGrid = this.data.CreateNewResource.column_headers;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
        });
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        for (var i = 0; i <= lineItemInput.quantity.length - 1; i++) {
            _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
            _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, lineItemInput.quantity[i], lineItemInput.uom[i]);
            cy.SAVE()
            cy.wait(2000)
            _common.create_newRecord(cnt.uuid.RESOURCES);
            _estimatePage.enterRecord_toCreateMaterialResource(resourceInput.ShortKey[i], resourceInput.Code[i]);
            cy.SAVE();
            cy.wait(2000)
        }
        _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.addition_Of_LineItemFields(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL)
    });


    it("TC - Create material package and verify netvalue with line item cost total", function () {
        const standerdInputs = this.data.Prerequisites.SidebarInputs;
        const wizard = this.data.CreateMaterialPackage.wizardOptions;
        const packageInputs = this.data.CreateMaterialPackage.PackageInputs;
        const Totalsgrid = this.data.CreateMaterialPackage.column_headers;
        _common.openSidebarOption(standerdInputs.searchType1);
        _common.search_fromSidebar(standerdInputs.Wizard, wizard.CreateMaterialPackage);
        _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialandCostCode);
        cy.SAVE();
        _common.openSidebarOption(standerdInputs.searchType1);
        _common.search_fromSidebar(standerdInputs.Wizard, wizard.ChangePackageStatus);
        _common.changeStatus_fromModal(packageInputs.packageStatus);
        cy.SAVE()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 1);
            _common.setup_gridLayout(cnt.uuid.TOTALS, Totalsgrid)
            cy.wait(2000).then(() => {
                _common.select_rowHasValue(cnt.uuid.TOTALS, "Total")
                _common.assert_cellData_insideActiveRow(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env("costTotalSum"))
            })
        })
    });
    it("TC - Create RFQ and verify netvalue with line item cost total", function () {
        const standerdInputs = this.data.Prerequisites.SidebarInputs;
        const wizard = this.data.CreateMaterialPackage.wizardOptions;
        const rfqInputs = this.data.CreateRFQ.CreateRFQInputs
        const Totalsgrid = this.data.CreateMaterialPackage.column_headers;
        _common.openSidebarOption(standerdInputs.searchType1);
        _common.search_fromSidebar(standerdInputs.Wizard, wizard.CreateRFQ);
        _rfqPage.fromWizard_CreateRequestForCode([rfqInputs.BusinessPartner]);
        _common.clickOn_modalFooterButton(rfqInputs.gotorfq)
        cy.SAVE();
        _common.openTab(app.tabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 1);
            cy.wait(1000)
            _common.setup_gridLayout(cnt.uuid.RFQ_TOTALS, Totalsgrid)
            cy.wait(1000)
            _common.select_rowHasValue(cnt.uuid.RFQ_TOTALS, "Total")
            cy.wait(1000)
            _common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env("costTotalSum"))
        })
    });
});