import { tile, app, cnt } from "cypress/locators";
import {_common,_estimatePage,_validate,_mainView,_boqPage,_rfqPage,_package,} from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM 2.36 - Create contract directly from package module");

describe("PCM 2.36 - Create contract directly from package module", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.36.create-contract-directly-from-package-module.json").then(
            (data) => {this.data = data;}
        );
    });

    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );

        cy.fixture("pcm/pcm-2.36.create-contract-directly-from-package-module.json").then(
            (data) => {
                this.data = data;
                const standerdInputs = this.data.Prerequisites.SidebarInputs;
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
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
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, lineItemInput.quantity, lineItemInput.uom);
        cy.SAVE()
        cy.wait(2000)
    });


    it('TC - Assign resource to the line item', function () {
        const resourceInput = this.data.CreateNewResource.ResourceInputs;
        const resourcesGrid = this.data.CreateNewResource.column_headers;

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        cy.wait(2000)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateMaterialResource(resourceInput.ShortKey, resourceInput.Code);
        cy.SAVE();
        cy.wait(2000)
    })

    it("TC - Create material package and change package status", function () {
        const standerdInputs = this.data.Prerequisites.SidebarInputs;
        const wizard = this.data.CreateMaterialPackage.wizardOptions;
        const packageInputs = this.data.CreateMaterialPackage.PackageInputs;
        
        _common.openSidebarOption(standerdInputs.searchType1);
        _common.search_fromSidebar(standerdInputs.Wizard, wizard.CreateMaterialPackage);
        _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialandCostCode);
        cy.SAVE();
        _common.openSidebarOption(standerdInputs.searchType1);
        _common.search_fromSidebar(standerdInputs.Wizard, wizard.ChangePackageStatus);
        _common.changeStatus_fromModal(packageInputs.packageStatus);
        cy.SAVE()
    });


    it("TC - Create Contract directly from Package module", function () {
        const standerdInputs = this.data.Prerequisites.SidebarInputs
        const createContractInputs = this.data.CreateMaterialPackage.createContract

        _common.openSidebarOption(standerdInputs.searchType1)
        _common.search_fromSidebar(standerdInputs.Wizard, createContractInputs.CreateContract)
        _package.create_ContractfromPackage(createContractInputs.BusinessPartnerName)
    });
});