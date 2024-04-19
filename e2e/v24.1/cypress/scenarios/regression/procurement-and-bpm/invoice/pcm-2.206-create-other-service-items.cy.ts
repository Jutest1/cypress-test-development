
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _businessPartnerPage, _procurementContractPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { kebabCase } from "cypress/types/lodash";


const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="33" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS


const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_RECORD

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells

let CONTAINER_COLUMNS_TAX_CODE

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const LINE_ITEM_DESCRIPTION='LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS:DataCells

let MODAL_REQUEST_FOR_QUOTE

let CONTAINER_COLUMNS_RFQ

let CONTAINER_COLUMNS_QUOTE

let CONTAINERS_ITEM_PRICE

let CONTAINER_COLUMNS_QUOTE_ITEMS

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_HEADER

let CONTAINER_COLUMNS_PES_ITEMS

let CONTAINER_COLUMNS_INVOICE

let CONTAINER_COLUMNS_OTHER_SERVICES
let CONTAINERS_OTHER_SERVICES
let OTHER_SERVICES_PARAMETER_1:DataCells
let OTHER_SERVICES_PARAMETER_2:DataCells

let CONTROLLING_PARAMETER_1:DataCells

let CONTAINER_COLUMNS_RECONCILIATION

let CONTAINER_COLUMNS_BILLING_SCHEMA

const INVOICE_NO="INV-" + Cypress._.random(0, 999);
const MATERIAL_STRUCTURE="MS-" + Cypress._.random(0, 999);

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Invoice");
ALLURE.story("PCM- 2.206 | Create other Service Items");

describe("PCM- 2.206 | Create other Service Items", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.206-create-other-service-items.json")
          .then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
            }

            CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }

            CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
            CONTAINER_COLUMNS_DATA_RECORD=this.data.CONTAINER_COLUMNS.DATA_RECORD

            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            PROCUREMENT_STRUCTURE_PARAMETERS={
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.MATERIAL,
                [app.GridCells.CODE]:MATERIAL_STRUCTURE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_STRUCTURE
            }

            CONTAINER_COLUMNS_TAX_CODE=this.data.CONTAINER_COLUMNS.TAX_CODE

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
			};

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            LINE_ITEMS_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            }

            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

            MODAL_REQUEST_FOR_QUOTE=this.data.MODAL.REQUEST_FOR_QUOTE

            CREATE_RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0],MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[1]]
            }

            CONTAINER_COLUMNS_RFQ=this.data.CONTAINER_COLUMNS.RFQ

            CONTAINER_COLUMNS_QUOTE=this.data.CONTAINER_COLUMNS.QUOTE

            CONTAINERS_ITEM_PRICE=this.data.CONTAINERS.ITEM_PRICE

            CONTAINER_COLUMNS_QUOTE_ITEMS=this.data.CONTAINER_COLUMNS.QUOTE_ITEMS

            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT

            CONTAINER_COLUMNS_HEADER=this.data.CONTAINER_COLUMNS.HEADER

            CONTAINER_COLUMNS_PES_ITEMS=this.data.CONTAINER_COLUMNS.PES_ITEMS

            CONTAINER_COLUMNS_INVOICE=this.data.CONTAINER_COLUMNS.INVOICE

            CONTAINER_COLUMNS_OTHER_SERVICES=this.data.CONTAINER_COLUMNS.OTHER_SERVICES
            CONTAINERS_OTHER_SERVICES=this.data.CONTAINERS.OTHER_SERVICES

            OTHER_SERVICES_PARAMETER_1={
                [app.GridCells.PRC_STRUCTURE_FK]:MATERIAL_STRUCTURE,
                [app.GridCells.CONTROLLING_UNIT_FK]: Cypress.env("CONTROLLING_UNIT_CODE")
            }

            OTHER_SERVICES_PARAMETER_2={
                [app.GridCells.PRC_STRUCTURE_FK]:MATERIAL_STRUCTURE,
                [app.GridCells.CONTROLLING_UNIT_FK]: Cypress.env("CONTROLLING_UNIT_CODE"),
                [app.GridCells.AMOUNT_NET]:CONTAINERS_OTHER_SERVICES.AMOUNT_UNIT,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_OTHER_SERVICES.QUANTITY
            }

            CONTROLLING_PARAMETER_1={
                [commonLocators.CommonLabels.PROJECT]:PROJECT_NO,
                [commonLocators.CommonKeys.VALUE]:CU_DESC,
            }

            CONTAINER_COLUMNS_RECONCILIATION=this.data.CONTAINER_COLUMNS.RECONCILIATION

            CONTAINER_COLUMNS_BILLING_SCHEMA=this.data.CONTAINER_COLUMNS.BILLING_SCHEMA

          })
          .then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
          })
    });  

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Set requisition status under customizing", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            //_common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.REQUISITION_STATUS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.REQUISITION_STATUS)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            //_common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORD)
        })
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.APPROVED)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.APPROVED)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_PUBLISHED,commonLocators.CommonKeys.UNCHECK)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_ORDERED,commonLocators.CommonKeys.UNCHECK)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_QUOTED,commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create material procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE); 
 
        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });

        _common.openTab(app.TabBar.GENERALS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TAX_CODES, app.FooterTab.TAX_CODE, 1);
            _common.setup_gridLayout(cnt.uuid.TAX_CODES,CONTAINER_COLUMNS_TAX_CODE)
        });

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Assign tax codes to material procurement structure", function () {
        _common.openTab(app.TabBar.GENERALS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TAX_CODES, app.FooterTab.TAX_CODE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.TAX_CODES)
        _common.create_newRecord(cnt.uuid.TAX_CODES)
        _common.edit_dropdownCellWithInput(cnt.uuid.TAX_CODES,app.GridCells.MDC_TAX_CODE_FK_SMALL,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.NSTB)
        _common.select_activeRowInContainer(cnt.uuid.TAX_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()   
        _common.waitForLoaderToDisappear()     
    })

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
          _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
    });

    it("TC - Create line item", function() {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
    })   

    it("TC - Add resource to line item.", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    });
    
    it("TC - Create material package from wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
          _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
    });

    it("TC - Change package status", function () {

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create requisition from package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        cy.wait(4000) // This wait required as UI takes time to load
        _rfqPage.getCode_fromRequisitionModal("REQUISITION_CODE")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
    })

    it("TC - Change requisition status", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("REQUISITION_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create RFQ from requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_requestForQuote_fromWizard(CREATE_RFQ_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _rfqPage.getCode_fromRFQModal("RFQ_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Change RFQ status", function () {
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE,Cypress.env("RFQ_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
    })
   
    it("TC - Create quote", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()

        _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[0],MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER[1]],[commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _boqPage.getCode_fromMultipleQuoteModal("QUOTE-CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update price and change quote status", function () {
   
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE)
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.search_inSubContainer(cnt.uuid.QUOTES,Cypress.env("RFQ_CODE"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.CODE,Cypress.env("QUOTE_CODE0"))

        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
            _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEMS)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ITEM_PRICE.PRICE[0])
        _common.clickOn_activeRowCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.ITEM_NO)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES,app.GridCells.CODE,Cypress.env("QUOTE_CODE1"))

        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
        })
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ITEM_PRICE.PRICE[1])
        _common.clickOn_activeRowCell(cnt.uuid.QUOTES_ITEMS,app.GridCells.ITEM_NO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.search_inSubContainer(cnt.uuid.QUOTES,Cypress.env("RFQ_CODE"))
        _common.select_allContainerData(cnt.uuid.QUOTES)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.CHECKED)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        cy.wait(3000) // This wait required as UI takes time to load
        _package.getCode_fromContractModal("CONTRACT_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update contract status and Create PES", function () {

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
       
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[0])
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_REQ_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[1])
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE")) 
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)// Added this wait script was getting failed
        _procurementPage.getCode_fromPESModal("PES_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        
    })

    it("TC - Update PES status and PES items quantity", function () {

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_HEADER);
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PES_CODE"))

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 1)
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEMS);
        })
        _common.maximizeContainer(cnt.uuid.ITEMS)
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ITEM_PRICE.QUANTITY)
        _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.ITEM_NO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMS)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
    })

    it("TC - Create Invoice from PES", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreate_Invoice_FromWizard(commonLocators.CommonKeys.CREATE_ONE_INVOICE_PER_PES, INVOICE_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER)
        _common.saveCellDataToEnv(cnt.uuid.INVOICEHEADER,app.GridCells.BILLING_SCHEMA_FK,"BILLING_SCHEMA")
        _common.minimizeContainer(cnt.uuid.INVOICEHEADER)

    })

    it("TC - Verify new button is working", function () {

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })
        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.create_newRecord(cnt.uuid.OTHER_SERVICES)
        _procurementPage.enterRecord_toCreateOtherServices(cnt.uuid.OTHER_SERVICES,OTHER_SERVICES_PARAMETER_1)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })

        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.OTHER_SERVICES,app.GridCells.CONTROLLING_UNIT_FK,Cypress.env("CONTROLLING_UNIT_CODE"))
    })

    it("TC - Verify delete button is working", function () {
    
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })

        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

         _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.delete_recordFromContainer(cnt.uuid.OTHER_SERVICES)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _validate.verify_isRecordDeleted(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
    })

    it("TC - Set value to structure, the tax code should get value according structure.tax first", function () {
        
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })
        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.create_newRecord(cnt.uuid.OTHER_SERVICES)
        _procurementPage.enterRecord_toCreateOtherServices(cnt.uuid.OTHER_SERVICES,OTHER_SERVICES_PARAMETER_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()

        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.OTHER_SERVICES,app.GridCells.TAX_CODE_FK,commonLocators.CommonKeys.NSTB)
    })

    it("TC - Set value to quantity and amount (unit), check the calculation for amount total and gross", function () {
        _common.assert_forNumericValues(cnt.uuid.OTHER_SERVICES,app.GridCells.AMOUNT_GROSS,CONTAINERS_OTHER_SERVICES.AMOUNT_UNIT)
        let amountTotal=parseFloat(CONTAINERS_OTHER_SERVICES.AMOUNT_UNIT)*parseFloat(CONTAINERS_OTHER_SERVICES.QUANTITY)
        _common.assert_forNumericValues(cnt.uuid.OTHER_SERVICES,app.GridCells.AMOUNT_TOTAL,amountTotal.toString())
    })

    it("TC - If controlling unit.isassetmanagement=true, then the asset management will be editable, but default to false", function () {

        _validate.verify_checkBoxDisabled_forActiveCell(cnt.uuid.OTHER_SERVICES,app.GridCells.IS_ASSET_MANAGEMENT)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
          _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.select_allContainerData(cnt.uuid.CONTROLLING_UNIT)
        _common.clickOn_toolbarButton(cnt.uuid.CONTROLLING_UNIT,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,CU_DESC)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.IS_ASSET_MANAGEMENT,commonLocators.CommonKeys.CHECK)
        _common.select_activeRowInContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
        _common.waitForLoaderToDisappear()

         _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })
        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.waitForLoaderToDisappear()
        _validate.verify_checkBoxEnabled_forActiveCell(cnt.uuid.OTHER_SERVICES,app.GridCells.IS_ASSET_MANAGEMENT)
    })

    it("TC - If isassetmangement-true, then the fixed asset can be editable, else it will be read only", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
          _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.select_allContainerData(cnt.uuid.CONTROLLING_UNIT)
        _common.clickOn_toolbarButton(cnt.uuid.CONTROLLING_UNIT,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,CU_DESC)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.IS_ASSET_MANAGEMENT,commonLocators.CommonKeys.CHECK)
        _common.select_activeRowInContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
            _common.waitForLoaderToDisappear()
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)
        _common.waitForLoaderToDisappear()

         _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.waitForLoaderToDisappear()

        _validate.verify_checkBoxEnabled_forActiveCell(cnt.uuid.OTHER_SERVICES,app.GridCells.IS_ASSET_MANAGEMENT)
        _common.set_cellCheckboxValue(cnt.uuid.OTHER_SERVICES,app.GridCells.IS_ASSET_MANAGEMENT,commonLocators.CommonKeys.CHECK)
        _validate.verify_inputFieldVisibility(cnt.uuid.OTHER_SERVICES,app.GridCells.FIXED_ASSET_FK,commonLocators.CommonKeys.VISIBLE,app.InputFields.INPUT_GROUP_CONTENT)
        _common.set_cellCheckboxValue(cnt.uuid.OTHER_SERVICES,app.GridCells.IS_ASSET_MANAGEMENT,commonLocators.CommonKeys.UNCHECK)
        _validate.verify_inputFieldVisibility(cnt.uuid.OTHER_SERVICES,app.GridCells.FIXED_ASSET_FK,commonLocators.CommonKeys.NOT_VISIBLE)
    })
    
    it("TC - Each fields is working and lookup filter is working", function () {

        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))

        _validate.verify_dataUnderStructurelookups(cnt.uuid.OTHER_SERVICES,app.GridCells.PRC_STRUCTURE_FK,app.GridCells.CODE_CAPS,MATERIAL_STRUCTURE)
        _validate.verify_dataUnderControllingUnitCodeLookups(cnt.uuid.OTHER_SERVICES,app.GridCells.CONTROLLING_UNIT_FK,CONTROLLING_PARAMETER_1)
        cy.SAVE()

        _common.select_rowInContainer(cnt.uuid.OTHER_SERVICES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.OTHER_SERVICES,app.GridCells.CONTROLLING_UNIT_FK,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.select_rowInContainer(cnt.uuid.OTHER_SERVICES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.OTHER_SERVICES,app.GridCells.PRC_STRUCTURE_FK,MATERIAL_STRUCTURE)
    })  

    it("TC - If invoice.billingschema.ischained=false,then company deferral type and date referral start can be editable, else they will be null and read only", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0)
            _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA);
        })
        _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA)
        _common.clear_subContainerFilter(cnt.uuid.BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.BILLING_SCHEMA,Cypress.env("BILLING_SCHEMA"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA,app.GridCells.DESCRIPTION_INFO,Cypress.env("BILLING_SCHEMA"))
        _common.set_cellCheckboxValue(cnt.uuid.BILLING_SCHEMA,app.GridCells.IS_CHAINED,commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

         _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.waitForLoaderToDisappear()

        _validate.verify_inputFieldVisibility(cnt.uuid.OTHER_SERVICES,app.GridCells.BAS_COMPANY_DEFERRAL_TYPE_FK,commonLocators.CommonKeys.VISIBLE,app.InputFields.INPUT_GROUP_CONTENT)
        _validate.verify_inputFieldVisibility(cnt.uuid.OTHER_SERVICES,app.GridCells.DATE_DEFERRAL_START,commonLocators.CommonKeys.VISIBLE,app.InputFields.INPUT_GROUP_CONTENT)

        // ! Set IS_CHAINED value to check under billing schema

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0)
            _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA);
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.BILLING_SCHEMA)
        
        _common.clear_subContainerFilter(cnt.uuid.BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.BILLING_SCHEMA,Cypress.env("BILLING_SCHEMA"))
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA,app.GridCells.DESCRIPTION_INFO,Cypress.env("BILLING_SCHEMA"))
        _common.set_cellCheckboxValue(cnt.uuid.BILLING_SCHEMA,app.GridCells.IS_CHAINED,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA,app.GridCells.DESCRIPTION_INFO,Cypress.env("BILLING_SCHEMA"))
        _common.set_cellCheckboxValue(cnt.uuid.BILLING_SCHEMA,app.GridCells.IS_CHAINED,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

         _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })

        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))
        _common.waitForLoaderToDisappear()

        _common.assert_cellData_insideActiveRow(cnt.uuid.OTHER_SERVICES,app.GridCells.BAS_COMPANY_DEFERRAL_TYPE_FK,"")
        _common.assert_cellData_insideActiveRow(cnt.uuid.OTHER_SERVICES,app.GridCells.DATE_DEFERRAL_START,"")
        _validate.verify_inputFieldVisibility(cnt.uuid.OTHER_SERVICES,app.GridCells.BAS_COMPANY_DEFERRAL_TYPE_FK,commonLocators.CommonKeys.NOT_VISIBLE)
        _validate.verify_inputFieldVisibility(cnt.uuid.OTHER_SERVICES,app.GridCells.DATE_DEFERRAL_START,commonLocators.CommonKeys.NOT_VISIBLE)
    })

    it("TC - Create new other service, the quantity will default to 1, and amount(unit) default to reconciliation.balance", function () {

        const OTHER_SERVICES_PARAMETER:DataCells={
            [app.GridCells.PRC_STRUCTURE_FK]:MATERIAL_STRUCTURE,
            [app.GridCells.CONTROLLING_UNIT_FK]: Cypress.env("CONTROLLING_UNIT_CODE")
        }
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.INVOICE); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 0)
            _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE);
        })
        _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
        _common.search_inSubContainer(cnt.uuid.INVOICEHEADER,INVOICE_NO)

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
            _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
        })
        _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
        _common.search_inSubContainer(cnt.uuid.OTHER_SERVICES,Cypress.env("CONTROLLING_UNIT_CODE"))

        _common.openTab(app.TabBar.APPLICATION).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RECONCILIATION, app.FooterTab.RECONCILLIATION, 2)
            _common.setup_gridLayout(cnt.uuid.RECONCILIATION, CONTAINER_COLUMNS_RECONCILIATION);
        })

        _common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION,app.GridCells.RECON_NAME,commonLocators.CommonKeys.BALANCE)
        _common.getText_fromCell(cnt.uuid.RECONCILIATION,app.GridCells.RECON_NET)
               .then(($val)=>{
                    _common.openTab(app.TabBar.APPLICATION).then(() => {
                        _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
                        _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES);
                    })
                    _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)   
                    _common.create_newRecord(cnt.uuid.OTHER_SERVICES)
                    _procurementPage.enterRecord_toCreateOtherServices(cnt.uuid.OTHER_SERVICES,OTHER_SERVICES_PARAMETER)
                    cy.SAVE()
                    _common.assert_forNumericValues(cnt.uuid.OTHER_SERVICES,app.GridCells.QUANTITY_SMALL,"1")
                    _common.assert_forNumericValues(cnt.uuid.OTHER_SERVICES,app.GridCells.AMOUNT_NET,$val.text())
                })
    })
});