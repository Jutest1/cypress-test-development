import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _common, _projectPage, _rfqPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _procurementConfig, _procurementContractPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999)
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let CONTAINERS_MATERIAL_RECORDS,
	ESTIMATE_PARAMETERS: DataCells,
	CONTAINERS_ESTIMATE,
	CONTAINER_COLUMNS_ESTIMATE,
	LINE_ITEM_PARAMETERS: DataCells,
	CONTAINERS_LINE_ITEM,
	CONTAINER_COLUMNS_LINE_ITEM,
	CONTAINER_COLUMNS_CONTRACT,
	RESOURCE_PARAMETERS_4: DataCells,
	CONTAINER_COLUMNS_RESOURCE,
	MODAL_CREATE_UPDATE_MATERIAL_PACKAGE,
	CONTAINER_QUOTE,
	CREATE_RFQ_PARAMETERS: DataCells

allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.118 | Create contract from quote and check information inherited');
describe('PCM- 2.118 | Create contract from quote and check information inherited', () => {
	before(function () {
		cy.fixture('pcm/pcm-2.118-Create-contract-from-quote-check-information-inherited.json').then((data) => {
			this.data = data;
			/* Open desktop should be called in before block */
			CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			MODAL_CREATE_UPDATE_MATERIAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
			CONTAINER_QUOTE = this.data.CONTAINERS.QUOTE
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			RESOURCE_PARAMETERS_4 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_MATERIAL_RECORDS.SHORT_KEY[1],
				[app.GridCells.CODE]: CONTAINERS_MATERIAL_RECORDS.MATERIAL_RECORD_DESCRIPTION
			};
			CREATE_RFQ_PARAMETERS = {
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: [MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER]
			}
		})
			.then(() => {
				cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
				_common.openDesktopTile(tile.DesktopTiles.PROJECT);
				_common.waitForLoaderToDisappear()
				_common.openTab(app.TabBar.PROJECT).then(() => {
					_common.setDefaultView(app.TabBar.PROJECT)
					_common.waitForLoaderToDisappear()
					_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
				});
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
				_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
			})
	});

	  after(() => {
	    cy.LOGOUT();
	});

	it('TC - Create new estimate record and add line item', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.co2projecttotal], cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

	});

	it('TC - Assign resource to the line item', function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_4);
		_common.select_activeRowInContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.RESOURCES)
	});

	it('TC - Create material package and change package status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE, null, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
		})
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create requisition from material package and change requisition status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
		cy.wait(500); //required wait to load page
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
		cy.wait(1000)  //required wait to load page
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create RFQ from requisition and change rfq status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS);
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.setDefaultView(app.TabBar.RFQ)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 2)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
		cy.wait(1000)  //required wait to load page
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
		_rfqPage.create_quote_fromWizard([MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER], [commonLocators.CommonKeys.CHECK])
		_common.waitForLoaderToDisappear()
		cy.wait(2000)  //required wait to load page
		_boqPage.getCode_fromQuoteModal("QUOTE_CODE")
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
		_common.waitForLoaderToDisappear()
		cy.wait(3000)  //required wait to load page
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
	});

	it('TC - Create Quote from RfQ and update item price ', function () {
		cy.wait(3000)  //required wait to load page
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
			_common.clear_subContainerFilter(cnt.uuid.QUOTES)
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
			cy.wait(1000) //required wait to load page
			_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.OK)
			_common.waitForLoaderToDisappear()
			_common.search_inSubContainer(cnt.uuid.QUOTES, Cypress.env("QUOTE_CODE"))
			_common.openTab(app.TabBar.QUOTES).then(() => {
				_common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1);
			});
			_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
			_common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_QUOTE.ITEM_PRICE_1);
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.QUOTES).then(() => {
				_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
			});
			_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER_2);
			_common.openTab(app.TabBar.QUOTES).then(() => {
				_common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1);
			});
			_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
			_common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_QUOTE.ITEM_PRICE_2);
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			cy.SAVE();
			_common.waitForLoaderToDisappear()
		});
	})

	it('TC - Add milestone and document record in quote and change quote status', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTE_MILESTONES, app.FooterTab.MILESTONES, 2);
		});
		_common.create_newRecord(cnt.uuid.QUOTE_MILESTONES);
		_common.select_rowInContainer(cnt.uuid.QUOTE_MILESTONES);
		_common.edit_containerCell(cnt.uuid.QUOTE_MILESTONES, app.GridCells.AMOUNT_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_QUOTE.MILESTONE_TRANSACTION);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTE_DOCUMENT, app.FooterTab.DOCUMENT, 3);
		});
		_common.create_newRecord(cnt.uuid.QUOTE_DOCUMENT);
		_common.enterRecord_inNewRow(cnt.uuid.QUOTE_DOCUMENT, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_QUOTE.DOCUMENT_DESCRIPTION);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES_TOTALS, app.FooterTab.TOTALS, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES_TOTALS, app.GridCells.TRANSLATED, commonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
		cy.wait(500); //required wait to load page
		_common.getText_fromCell(cnt.uuid.QUOTES_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('NETVALUEQUOTE', $ele1.text());
			cy.log(Cypress.env('NETVALUEQUOTE'));
		});
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0);
		});
		_common.select_allContainerData(cnt.uuid.QUOTES);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
		cy.wait(2000) //required wait to load page
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create contract from quote', function () {
		cy.wait(20000)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		cy.wait(1000) //This wait is necessory to load create contract loader
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_CONTRACT)
		cy.wait(2000); //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.QUOTES, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
		cy.wait(2000); //required wait to load page
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('CONTRACTCODE', $ele1.text());
			cy.log(Cypress.env('CONTRACTCODE'));
		});
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, sidebar.SideBarOptions.REQUISITION);
		cy.wait(3000); //required wait to load page
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
		cy.wait(2000); //required wait to load page
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS,app.GridCells.CODE,"REQUISITION_CODE")
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		cy.wait(2000); //required wait to load page
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		cy.wait(1000) //This wait is necessory to load create contract loader
		_common.waitForLoaderToDisappear()
		_package.create_ContractfromPackage(CONTAINER_QUOTE.BUSINESS_PARTNER);
		cy.wait(2000); //required wait to load page
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
		cy.wait(2000); //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
		});
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('CONTRACTCODE1', $ele1.text());
			cy.log(Cypress.env('CONTRACTCODE1'));
		});
	});

	it('TC - Verify requisition assigned to contract', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
			_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env('CONTRACTCODE1'));
			cy.wait(2000);  //required wait to load page
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REQ_HEADER_FK,Cypress.env('REQUISITION_CODE') );
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env('CONTRACTCODE'));
			cy.wait(1000);  //required wait to load page
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, CONTAINER_QUOTE.BUSINESS_PARTNER);
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.SUBSIDIARY_FK, CONTAINER_QUOTE.BRANCH);
			_common.openTab(app.TabBar.CONTRACT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.CONTRACT_DOCUMENT, app.FooterTab.DOCUMENT, 3);
			});
			_common.select_rowInContainer(cnt.uuid.CONTRACT_DOCUMENT);
			_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_DOCUMENT, app.GridCells.DESCRIPTION, CONTAINER_QUOTE.DOCUMENT_DESCRIPTION);
			_common.openTab(app.TabBar.CONTRACT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.CONTRACT_MILESTONE, app.FooterTab.MILESTONES, 3);
			});
			_common.select_rowInContainer(cnt.uuid.CONTRACT_MILESTONE);
			_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_MILESTONE, app.GridCells.AMOUNT_SMALL, CONTAINER_QUOTE.MILESTONE_TRANSACTION);
			_common.openTab(app.TabBar.CONTRACT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 2);
			});
			_common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TRANSLATED, commonLocators.CommonKeys.TOTAL, PACKAGE_TOTAL_TRANSLATION);
			cy.wait(500);  //required wait to load page
			_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env('NETVALUEQUOTE'));
		});
	});
});
