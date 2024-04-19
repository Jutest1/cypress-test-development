import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _package, _rfqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const CONTROLLING_UNIT_DESC = "CU" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);


let MODAL_PROJECTS
let PROJECTS_PARAMETERS;
let MODAL_MATERIAL_PACKAGE;

let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTAINERS_CONTROLLING_UNIT;
let CONTROLLING_UNIT_PARAMETERS;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let ESTIMATE_PARAMETER;

let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_RESOURCE;
let RESOURCE_PARAMETERS:DataCells;

let CONTAINERS_QUOTE;
let REQUEST_FOR_QUOTE_PARAMETERS:DataCells;

let CONTAINER_COLUMNS_QUOTES_ITEMS;
let CONTAINERS_QUOTES_ITEMS;

let CONTAINER_COLUMNS_CONTRACT
let CONTRACT_PARAMETERS : DataCells;

let CONTAINER_COLUMNS_INVOICE;
let CONTAINERS_INVOICE;

let CONTAINER_COLUMNS_CONTRACT_ITEMS;
let CONTAINERS_CONTRACT_ITEMS;

let CONTAINER_COLUMNS_GENERALS;
let CONTAINERS_GENERALS;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Invoice");
ALLURE.story("PCM- 3.12 | Creation of invoice manually from the invoice module by using invoice audit wizard for transaction creation");

describe("PCM- 3.12 | Creation of invoice manually from the invoice module by using invoice audit wizard for transaction creation", () => {

    
    before(function () {
        
        cy.fixture("pcm/pcm-3.12-creation-of-invoice-manually-from-the-invoice-module-by-using-invoice-audit-wizard-for-transaction-creation.json").then((data) => {
            this.data = data;

            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
			};

            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            ESTIMATE_PARAMETER = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,   
            }

            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
            };

            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
           
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_NAME,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            MODAL_MATERIAL_PACKAGE=this.data.MODAL.MATERIAL_PACKAGE

            CONTAINERS_QUOTE= this.data.CONTAINERS.QUOTE
            REQUEST_FOR_QUOTE_PARAMETERS = {
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_QUOTE.BUSINESS_PARTNER_1,CONTAINERS_QUOTE.BUSINESS_PARTNER_2],
			}

            CONTAINER_COLUMNS_QUOTES_ITEMS = this.data.CONTAINER_COLUMNS.QUOTES_ITEMS;
            CONTAINERS_QUOTES_ITEMS = this.data.CONTAINERS.QUOTES_ITEMS;

            CONTRACT_PARAMETERS = {
				[app.GridCells.BUSINESS_PARTNER_FK_SMALL]: CONTAINERS_QUOTE.BUSINESS_PARTNER_1,
				[app.GridCells.PROJECT_FK]: PROJECT_NO,
			}

            CONTAINER_COLUMNS_INVOICE = this.data.CONTAINER_COLUMNS.INVOICE;
            CONTAINERS_INVOICE = this.data.CONTAINERS.INVOICE;

            CONTAINER_COLUMNS_CONTRACT_ITEMS = this.data.CONTAINER_COLUMNS.CONTRACT_ITEMS;
            CONTAINERS_CONTRACT_ITEMS = this.data.CONTAINERS.CONTRACT_ITEMS;

            CONTAINER_COLUMNS_GENERALS = this.data.CONTAINER_COLUMNS.GENERALS;
            CONTAINERS_GENERALS = this.data.CONTAINERS.GENERALS;

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        });    
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Controlling Unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTROLLING_UNITS)
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CONTROLLING_UNIT_DESC)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CU_CODE", $ele1.text())
        })
    })

    it("TC - Create Estimate Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 0)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        })
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETER);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new line item record ", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Create new record in resource for Material resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create material package and change package status', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_MATERIAL_PACKAGE.MATERIAL_COSTCODE,MODAL_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE,MODAL_MATERIAL_PACKAGE.CONFIGURATION)
        cy.wait(1000)////required wait to enter data
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)// required wait to change status
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Change Requisition status', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        });
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()  
    });

    it('TC - Create RFQ from requisition', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_common.waitForLoaderToDisappear()
		_rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
		_common.waitForLoaderToDisappear()
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
	});

    it("TC - Create Quote from RfQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
		_common.waitForLoaderToDisappear()
        _rfqPage.create_quote_fromWizard([CONTAINERS_QUOTE.BUSINESS_PARTNER_1,CONTAINERS_QUOTE.BUSINESS_PARTNER_2],[commonLocators.CommonKeys.CHECK,commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _boqPage.getCode_fromQuoteModal("QUOTE_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Add Items to Quote", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES);
            _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        });
		_common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.QUOTES,CONTAINERS_QUOTE.BUSINESS_PARTNER_1)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS);
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,CONTAINER_COLUMNS_QUOTES_ITEMS)
            _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
        });
		_common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.QUOTES_ITEMS)
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTES_ITEMS.PRICE1);
        cy.wait(1000)//required wait to enter data
        _common.minimizeContainer(cnt.uuid.QUOTES_ITEMS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES);
        });
		_common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.QUOTES,CONTAINERS_QUOTE.BUSINESS_PARTNER_2)
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS);
        });
		_common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.QUOTES_ITEMS)
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
        _common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_QUOTES_ITEMS.PRICE2);
        cy.wait(1000)//required wait to enter data
        _common.minimizeContainer(cnt.uuid.QUOTES_ITEMS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES,0);
        });
		_common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.QUOTES)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, CONTAINERS_QUOTES_ITEMS.PRICE_COMPARISON)
        _common.waitForLoaderToDisappear()
    });

    it('TC - verify price comparision and goto contract', function () {
		_common.openTab(app.TabBar.PRICE_COMPARISON_ITEMS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1, app.FooterTab.PRICE_COMPARISON_ITEM);
            _common.clear_subContainerFilter(cnt.uuid.PRICE_COMPARISON_V1)
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_saleContractPage.create_contractInPriceComparison_fromWizard(CONTRACT_PARAMETERS);
		_common.waitForLoaderToDisappear()
	});

    it('TC - Change contract status', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
		});
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CONTRACT_CODE", $ele1.text())
        })
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		_common.waitForLoaderToDisappear()
	});

    it('TC - Create Invoice', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.INVOICE)
        _common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER);
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER,CONTAINER_COLUMNS_INVOICE)
            _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
		});
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
        _common.create_newRecord(cnt.uuid.INVOICEHEADER)
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateInvoiceHeader({ container_UUID: cnt.uuid.INVOICEHEADER, invoiceNo: CONTAINERS_INVOICE.INVOICE_NO,contract:Cypress.env("CONTRACT_CODE"),businessPartner: CONTAINERS_INVOICE.BUSINESS_PARTNER_1,controllingUnit:CONTROLLING_UNIT_DESC,configuration:CONTAINERS_INVOICE.CONFIGURATION})
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordPresent(cnt.uuid.INVOICEHEADER,PROJECT_NO)
        _common.minimizeContainer(cnt.uuid.INVOICEHEADER)
	});

    it('TC - Create Contract Items', function () {
        _common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEMS, app.FooterTab.CONTRACT_ITEMS);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_ITEMS,CONTAINER_COLUMNS_CONTRACT_ITEMS)
            _common.clear_subContainerFilter(cnt.uuid.CONTRACT_ITEMS)
		});
        _common.maximizeContainer(cnt.uuid.CONTRACT_ITEMS)
        _common.create_newRecord(cnt.uuid.CONTRACT_ITEMS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_ITEMS,app.GridCells.PRC_ITEM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT_ITEMS.CONTRACT_ITEM)
        _common.edit_containerCell(cnt.uuid.CONTRACT_ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CONTRACT_ITEMS.QUANTITY)
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTRACT_ITEMS)
        _common.waitForLoaderToDisappear()
	});

    it('TC - Create Transaction', function () {
        _common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA);
            _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
		});
        _common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA,CONTAINERS_GENERALS.RECORD1)
        _common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS);
            _common.setup_gridLayout(cnt.uuid.GENERALS_INVOICE,CONTAINER_COLUMNS_GENERALS)
            _common.clear_subContainerFilter(cnt.uuid.GENERALS_INVOICE)
		});
        _common.create_newRecord(cnt.uuid.GENERALS_INVOICE)
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_INVOICE,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("CU_CODE"))
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS_INVOICE,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS.VALUE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_INVOICE,app.GridCells.TAX_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_GENERALS.TAX_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA);
            _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
		});
        _common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA,CONTAINERS_GENERALS.RECORD2)
        _common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.TRANSACTION, app.FooterTab.TRANSACTION);
            _common.clear_subContainerFilter(cnt.uuid.TRANSACTION)
		});
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.INVOICE_AUDIT);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordPresent(cnt.uuid.TRANSACTION,CONTAINERS_INVOICE.INVOICE_NO)

	});
    
});