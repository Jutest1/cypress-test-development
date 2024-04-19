
import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _procurementContractPage } from "cypress/pages";
import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="33" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BoQS_DESC2 = "LI2-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM


let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION

let CREATE_RFQ_PARAMETERS:DataCells

let MODAL_REQUEST_FOR_QUOTE

let CONTAINER_COLUMNS_RFQ

let CONTAINER_COLUMNS_QUOTE

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_PES_BOQ_STRUCTURE

let CONTAINER_COLUMNS_HEADERS


const CONTRACT_CODE = "CONTRACT_CODE",CONTRACT_CNT="CONTRACT_CNT",CONTRACT_RESP="CONTRACT_RESP",CONTRACT_REQ="CONTRACT_REQ",CONTRACT_PFK="CONTRACT_PFK",
CONTRACT_VATGROUP="CONTRACT_VATGROUP",CONTRACT_BP="CONTRACT_BP",CONTRACT_CUR="CONTRACT_CUR",CONTRACT_PCKG="CONTRACT_PCKG",PES_CODE="PES_CODE"

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 2.96 | Create a PES from contract using wizard");

describe("PCM- 2.96 | Create a PES from contract using wizard", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.96-create-a-pes-from-contract-using-wizard.json")
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

            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
			BOQ_PARAMETERS={
				[app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
			}

            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
			BOQ_STRUCTURE_PARAMETERS={
				[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
				[ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
				[app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
			}

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
			GENERATE_LINE_ITEMS_PARAMETERS={
				[commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC                
			}

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
			};

            MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

            MODAL_REQUEST_FOR_QUOTE=this.data.MODAL.REQUEST_FOR_QUOTE

            CREATE_RFQ_PARAMETERS={
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:[MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER]
            }

            CONTAINER_COLUMNS_RFQ=this.data.CONTAINER_COLUMNS.RFQ

            CONTAINER_COLUMNS_QUOTE=this.data.CONTAINER_COLUMNS.QUOTE

            CONTAINER_COLUMNS_PES_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.PES_BOQ_STRUCTURE

            CONTAINER_COLUMNS_HEADERS=this.data.CONTAINER_COLUMNS.HEADERS

            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
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

	it("TC - Create BOQ header and BOQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.setDefaultView(app.TabBar.BOQS)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.maximizeContainer(cnt.uuid.BOQS)
		_common.create_newRecord(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.BOQS)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
			_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
		});
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
	});

    it('TC - Create new estimate record', function () {
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

    it("TC - Generate BOQ line item and create Resource", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)


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

    it("TC - Create BoQ package from the estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear() // This wait required as UI takes time to load
    })

    it("TC - Change package status", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))

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

        _rfqPage.create_quote_fromWizard([MODAL_REQUEST_FOR_QUOTE.BUSINESS_PARTNER],[commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _boqPage.getCode_fromQuoteModal("QUOTE-CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Change quote status", function () {
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
            _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTE);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.QUOTES)
        _common.search_inSubContainer(cnt.uuid.QUOTES,Cypress.env("QUOTE-CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // This wait required as UI takes time to load
        _package.getCode_fromContractModal("CONTRACT_CODE")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update contract", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
            _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT.bascurrencyfk,CONTAINER_COLUMNS_CONTRACT.businesspartnerfk,CONTAINER_COLUMNS_CONTRACT.bpdvatgroupfk,CONTAINER_COLUMNS_CONTRACT.packagefk,CONTAINER_COLUMNS_CONTRACT.clerkreqfk,CONTAINER_COLUMNS_CONTRACT.projectfk,CONTAINER_COLUMNS_CONTRACT.controllingunitfk,CONTAINER_COLUMNS_CONTRACT.clerkprcfk,CONTAINER_COLUMNS_CONTRACT.code],cnt.uuid.PROCUREMENTCONTRACT)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[0])
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()

        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_REQ_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[1])
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()

        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK)
        _common.clickOn_activeContainerButton(cnt.uuid.PROCUREMENTCONTRACT,btn.IconButtons.ICO_INPUT_DELETE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CODE,CONTRACT_CODE)
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    })
    
    it("TC - When the contract status is approval, then can use Create PES wizard and Before wizard, the controlling unit should not be null in contract header.If null, will display pop up message,Also verify create pes successfully", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()

        _validate.validate_Text_message_In_PopUp("Wizard cannot proceed due to selected record's status (not ordered)!")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()

        _validate.validate_Text_message_In_PopUp("A Performance Entry Sheet cannot be generated from ["+Cypress.env(CONTRACT_CODE)+"] because no controlling unit has been assigned.")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_CODE))
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE")) 
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,CONTRACT_CNT)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,CONTRACT_RESP)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_REQ_FK,CONTRACT_REQ)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PROJECT_FK,CONTRACT_PFK)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BPD_VAT_GROUP_FK,CONTRACT_VATGROUP)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BUSINESS_PARTNER_FK,CONTRACT_BP)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.BAS_CURRENCY_FK,CONTRACT_CUR)
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PACKAGE_FK,CONTRACT_PCKG)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)// Added this wait as script was getting failed
        _validate.validate_Text_message_In_PopUp("Create PES(s) successfully!")
        _procurementPage.getCode_fromPESModal(PES_CODE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()


        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        //_common.saveCellDataToEnv(cnt.uuid.HEADERS,app.GridCells.CODE,PES_CODE)
    })

    it("TC - After create pes, related columns will get value from contract(project, package, controlling unit and business partner ,vat group,responsible.requisiton owner ,currency)", function () {

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
            _common.setup_gridLayout(cnt.uuid.HEADERS,CONTAINER_COLUMNS_HEADERS)
            _common.waitForLoaderToDisappear()
            cy.reload()
            cy.wait(2000)// This wait is required
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_HEADERS.projectfk,CONTAINER_COLUMNS_HEADERS.clerkreqfk,CONTAINER_COLUMNS_HEADERS.businesspartnerfk,CONTAINER_COLUMNS_HEADERS.currencyfk,CONTAINER_COLUMNS_HEADERS.packagefk,CONTAINER_COLUMNS_HEADERS.clerkprcfk,CONTAINER_COLUMNS_HEADERS.bpdvatgroupfk,CONTAINER_COLUMNS_HEADERS.controllingunitfk],cnt.uuid.HEADERS)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.HEADERS)
    
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env(PES_CODE))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.PROJECT_FK,Cypress.env(CONTRACT_PFK))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.CLERK_REQ_FK,Cypress.env(CONTRACT_REQ))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.BUSINESS_PARTNER_FK,Cypress.env(CONTRACT_BP))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.CURRENCY_FK,Cypress.env(CONTRACT_CUR))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.PACKAGE_FK,Cypress.env(CONTRACT_PCKG))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.CLERK_PRC_FK,Cypress.env(CONTRACT_RESP))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.BPD_VAT_GROUP_FK,Cypress.env(CONTRACT_VATGROUP))
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS,app.GridCells.CONTROLLING_UNIT_FK,Cypress.env(CONTRACT_CNT))
        _common.minimizeContainer(cnt.uuid.HEADERS)
    })
     
    it("TC - After create pes, it will auto create boqs which copy from contract, but set the quantity to be 0", function () {

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env(PES_CODE))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HEADERS,app.GridCells.CODE,Cypress.env(PES_CODE))

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE,CONTAINER_COLUMNS_PES_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PES_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_PES_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_PES_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_PES_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_PES_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.PES_BOQS_STRUCTURE)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.PRICE_SMALL)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BAS_UOM_FK,CONTAINERS_BOQ_STRUCTURE.UOM)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,"0")
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    })

    it("TC - If add a new item in pes module which is not exist in contract, then in contract module click wizard again , it will show an option Include non contracted item in previous PES", function () {
        _validate.verify_isContainerMinimized(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env(PES_CODE))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HEADERS,app.GridCells.CODE,Cypress.env(PES_CODE))

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
        })
        _common.waitForLoaderToDisappear()
       
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BoQS_DESC2);
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.PES_QUANTITY[1]);
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.PES_UNIT_RATE);
        _common.edit_dropdownCellWithInput(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UOM)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS,commonLocators.CommonKeys.CONTRACT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_CODE))
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_message_In_PopUp("Include non contracted item in previous PES")
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.NO)
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_CODE))
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()

        _procurementContractPage.enterRecord_toCreatePESAlreadyExisted(commonLocators.CommonKeys.INCLUDE_NON_CONTRACTED_ITEM_IN_PREVIOUS_PES,commonLocators.CommonKeys.UNCHECK,btn.ButtonText.YES)
        cy.wait(1000).then(()=>{
            _procurementPage.getCode_fromPESModal("PESCODE1") 
        })
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    })

    it("TC - If option=false, then it will only copy from contract", function () {
        _validate.verify_isContainerMinimized(cnt.uuid.PES_BOQS_STRUCTURE)

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PESCODE1"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HEADERS,app.GridCells.CODE,Cypress.env("PESCODE1"))

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
        })
        _common.waitForLoaderToDisappear()
     
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.PRICE_SMALL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BAS_UOM_FK,CONTAINERS_BOQ_STRUCTURE.UOM)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,"0")
        _validate.verify_recordNotPresentInContainer(cnt.uuid.PES_BOQS_STRUCTURE,BoQS_DESC2)
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)


        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.HEADERS,commonLocators.CommonKeys.CONTRACT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env(CONTRACT_CODE))
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()

        _procurementContractPage.enterRecord_toCreatePESAlreadyExisted(commonLocators.CommonKeys.INCLUDE_NON_CONTRACTED_ITEM_IN_PREVIOUS_PES,commonLocators.CommonKeys.CHECK,btn.ButtonText.YES)
        cy.wait(1000).then(()=>{
            _procurementPage.getCode_fromPESModal("PESCODE2") 
        })

        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    })

    it("TC - If option=true, then after create new pes, the items will be copied from contract +previous pes", function () {  
       
        _validate.verify_isContainerMinimized(cnt.uuid.PES_BOQS_STRUCTURE)

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PESCODE2"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HEADERS,app.GridCells.CODE,Cypress.env("PESCODE2"))

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
        })
        _common.waitForLoaderToDisappear()
       
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.PRICE_SMALL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BAS_UOM_FK,CONTAINERS_BOQ_STRUCTURE.UOM)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,"0")
        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BoQS_DESC2)
        _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.PRICE_SMALL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BoQS_DESC2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BAS_UOM_FK, CONTAINERS_BOQ_STRUCTURE.UOM)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,"0")
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    })
});
