import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_CHANGE_DESC="PCD-" + Cypress._.random(0, 999);
const CO_CONTRACT_DESC="CCD-" + Cypress._.random(0, 999);
const PES_BOQ_STRUCTURE="PBS-" + Cypress._.random(0, 999);

const QUANTITY_ENV="QUANTITY"

const PROJECT_NO="39" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const ESTIMATE_CODE_S = '2' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION_S = 'EST-DESC-S-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS_MATERIAL: DataCells;
let ESTIMATE_PARAMETERS_SERVICES: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM

let RESOURCE_PARAMETERS_MATERIAL:DataCells
let RESOURCE_PARAMETERS_COST_CODE:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let MODAL_BUSINESS_PARTNER

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_HEADER

let CONTAINER_COLUMNS_PES_ITEMS

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let MODAL_VALIDATION

let CHANGES_FOUND_VERIFY_1_PARAMETERS:DataCells
let CHANGES_FOUND_VERIFY_2_PARAMETERS:DataCells

let CO_CONTRACT_ITEM_PARAMETER:DataCells

let MODAL_CO_CONTRACT_ITEM

let CONTAINER_COLUMNS_CONTRACT_ITEMS

let CONTAINER_COLUMNS_PES_BOQ

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 2.123 | Status for change order contracts from PES");

describe("PCM- 2.123 | Status for change order contracts from PES", () => {
        
    before(function () {
        cy.fixture("pcm/pcm-2.123-status-for-change-order-contracts-from-pes.json")
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
			ESTIMATE_PARAMETERS_MATERIAL = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
			}
            ESTIMATE_PARAMETERS_SERVICES = {
				[app.GridCells.CODE]: ESTIMATE_CODE_S,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION_S,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
			}

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
			GENERATE_LINE_ITEMS_PARAMETERS={
				[commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC                
			}
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            }

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS_COST_CODE = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0]
			};
            RESOURCE_PARAMETERS_MATERIAL = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1]
			};

            MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            MODAL_BUSINESS_PARTNER=this.data.MODAL.BUSINESS_PARTNER

            CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT

            CONTAINER_COLUMNS_HEADER=this.data.CONTAINER_COLUMNS.HEADER

            CONTAINER_COLUMNS_PES_ITEMS=this.data.CONTAINER_COLUMNS.PES_ITEMS

            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

            MODAL_VALIDATION=this.data.MODAL.VALIDATION

            CHANGES_FOUND_VERIFY_2_PARAMETERS={
                [app.GridCells.MATERIAL_CODE_SMALL]:CONTAINERS_RESOURCE.CODE[2],
                [app.GridCells.QUANTITY_DELIVERED]:CONTAINERS_RESOURCE.QUANTITY
            }

            CHANGES_FOUND_VERIFY_1_PARAMETERS={
                [app.GridCells.MATERIAL_CODE_SMALL]:CONTAINERS_RESOURCE.CODE[2],
                [app.GridCells.QUANTITY_DELIVERED]:Cypress.env(QUANTITY_ENV)
            }

            MODAL_CO_CONTRACT_ITEM=this.data.MODAL.CO_CONTRACT_ITEM
            CO_CONTRACT_ITEM_PARAMETER={
                [commonLocators.CommonLabels.PROJECT]:PROJECT_NO,
                //[commonLocators.CommonLabels.RUBRIC_CATEGORY]:MODAL_CO_CONTRACT_ITEM.RUBRIC_CATEGORY,
                [commonLocators.CommonLabels.CHANGE_TYPE]:MODAL_CO_CONTRACT_ITEM.CHANGE_TYPE,
                //[commonLocators.CommonLabels.CHANGE_REASON]:MODAL_CO_CONTRACT_ITEM.CHANGE_REASON,
                [commonLocators.CommonLabels.DESCRIPTION]:PROJECT_CHANGE_DESC,
                [commonLocators.CommonLabels.CONTRACT_STATUS]:commonLocators.CommonKeys.CHECKED,
                [commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC]:CO_CONTRACT_DESC
            }
            CONTAINER_COLUMNS_CONTRACT_ITEMS=this.data.CONTAINER_COLUMNS.CONTRACT_ITEMS

            CONTAINER_COLUMNS_PES_BOQ=this.data.CONTAINER_COLUMNS.PES_BOQ

            
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
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS_MATERIAL);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

    it("TC - Generate boq line item and assign resource to it", function () {
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
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_COST_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
	});

    it("TC - Create BoQ package from the estimate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_common.waitForLoaderToDisappear()
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK,MODAL_CREATE_UPDATE_BOQ_PACKAGE.CONFIGURATION)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // This wait required as UI takes time to load
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

    it("TC - Create contract from package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(MODAL_BUSINESS_PARTNER.BUSINESS_PARTNER)
        cy.wait(2000) // This wait required as UI takes time to load
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update contract status and Create PES", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
          _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO) 
          _common.waitForLoaderToDisappear()
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
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE")) 
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _procurementPage.getCode_fromPESModal("PES_CODE_1")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as loader takes time to load
    })

    it('TC - Create new estimate record', function () {
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
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS_SERVICES);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()

	});

    it("TC - Create new line item record", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
		_common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

	it("TC - Create new record in resource", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_MATERIAL);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
    });

    it("TC - Create material package from wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
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

    it("TC - Create contract from package", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(MODAL_BUSINESS_PARTNER.BUSINESS_PARTNER)
        cy.wait(1000) // This wait required as UI takes time to load
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update contract status and Create PES", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
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
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT_CODE")) 
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.waitForLoaderToDisappear()
        _procurementPage.getCode_fromPESModal("PES_CODE_2")
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // This wait is required as loader takes time to load
    })

    it("TC - Navigate to PES (Material)", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
            _common.setup_gridLayout(cnt.uuid.HEADERS,CONTAINER_COLUMNS_HEADER)
        });
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PES_CODE_2"))
        _common.waitForLoaderToDisappear()
    });

    it("TC - In items container, the quantity exceed contract quantity, then allow to use wizard", function () {
        _common.openTab(app.TabBar.PES_ITEMS).then(() => {
            _common.setDefaultView(app.TabBar.PES_ITEMS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ITEMS,CONTAINER_COLUMNS_PES_ITEMS)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_PES_ITEMS.prcstructurefk],cnt.uuid.ITEMS)
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        _common.search_inSubContainer(cnt.uuid.ITEMS,CONTAINERS_RESOURCE.CODE[1])
        _common.getText_fromCell(cnt.uuid.ITEMS,app.GridCells.QUANTITY_CONTRACTED)
               .then(($value)=>{
                    let quantity:any=((+parseFloat(($value.text()).replace(',','')).toFixed(3))-(+parseFloat(CONTAINERS_RESOURCE.DEC).toFixed(3)))
                    _common.enterRecord_inNewRow(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,quantity)
                    _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.ITEM_NO)
                    cy.SAVE()
                    _common.waitForLoaderToDisappear()
                    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
                    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
                    _common.waitForLoaderToDisappear()
                    _validate.validate_Text_message_In_PopUp(MODAL_VALIDATION.NO_NEW_ITEM_FOUND_IN_PES)
                    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
               }) 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        _common.search_inSubContainer(cnt.uuid.ITEMS,CONTAINERS_RESOURCE.CODE[1])
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.ITEMS,app.GridCells.QUANTITY_CONTRACTED)
               .then(($value)=>{
                    let quantity:any=((+parseFloat(($value.text()).replace(',','')).toFixed(3))+(+parseFloat(CONTAINERS_RESOURCE.INC).toFixed(3)))
                    Cypress.env(QUANTITY_ENV,quantity)
                    _common.enterRecord_inNewRow(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,quantity)
                    _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.ITEM_NO)
                    cy.SAVE()
                    _common.waitForLoaderToDisappear()
                    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
                    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
                    _common.waitForLoaderToDisappear()
                    _validate.validate_Text_message_In_PopUp(MODAL_VALIDATION.CREATE_CHANGE_ORDER_CONTRACT_FOR_NEW_ITEMS)
                    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
               })              
    })

    it("TC - In items container, the record which is not exist in contract , then allow to use wizard", function () {
        _common.openTab(app.TabBar.PES_ITEMS).then(() => { 
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        _common.create_newRecord(cnt.uuid.ITEMS)
        cy.wait(1000)
        _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.PRC_STRUCTURE_FK)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.clickOn_activeContainerButton(cnt.uuid.ITEMS,btn.IconButtons.ICO_INPUT_DELETE)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.ITEMS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.ITEMS,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.CODE[2])
        _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.ITEM_NO)
        _common.enterRecord_inNewRow(cnt.uuid.ITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY)
        _common.clickOn_activeRowCell(cnt.uuid.ITEMS,app.GridCells.ITEM_NO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        _common.search_inSubContainer(cnt.uuid.ITEMS,CONTAINERS_RESOURCE.CODE[2])
        _common.assert_forNumericValues(cnt.uuid.ITEMS,app.GridCells.QUANTITY_CONTRACTED,"0")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
        _validate.validate_Text_message_In_PopUp(MODAL_VALIDATION.CREATE_CHANGE_ORDER_CONTRACT_FOR_NEW_ITEMS)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    })

    it("TC - In wizard dialog, verify the changes found record", function () {

        _common.openTab(app.TabBar.PES_ITEMS).then(() => { 
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
        cy.wait(1000)// Added this wait as script was getting failed
        _validate.verify_changesFound(CHANGES_FOUND_VERIFY_1_PARAMETERS)
        _validate.verify_changesFound(CHANGES_FOUND_VERIFY_2_PARAMETERS)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    }) 

    it("TC - In wizard dialog, verify project change to create new change ,project change lookup,contract description, contract status lookup and change order contract successfully ", function () {

        _common.openTab(app.TabBar.PES_ITEMS).then(() => { 
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
        cy.wait(1000)
        _procurementPage.create_changeOrderContractForNewItem_fromWizard(CO_CONTRACT_ITEM_PARAMETER)
    })
    
    it("TC - After create contract, for change order contrat, the quantity will be exceed quantity and calculated", function () {
  
        _common.openTab(app.TabBar.CONTRACT).then(() => { 
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,CO_CONTRACT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.DESCRIPTION,CO_CONTRACT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONSTATUS_FK,commonLocators.CommonKeys.CHECKED)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PURCHASE_ORDERS,MODAL_CO_CONTRACT_ITEM.PURCHASE_ORDER)

        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.setDefaultView(app.TabBar.ORDER_ITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT,CONTAINER_COLUMNS_CONTRACT_ITEMS)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        console.log(Cypress.env(CONTAINERS_RESOURCE.CODE[2]+"-VAT"))
        console.log(Cypress.env(CONTAINERS_RESOURCE.CODE[2]+"-VAT"))

        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT,CONTAINERS_RESOURCE.CODE[2])
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT,CONTAINERS_RESOURCE.CODE[2])
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,Cypress.env(CONTAINERS_RESOURCE.CODE[2]+"-VAT"))      
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT,CONTAINERS_RESOURCE.CODE[2])
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT,CONTAINERS_RESOURCE.CODE[2])
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,Cypress.env(CONTAINERS_RESOURCE.CODE[2]+"-VAT"))
    })

    it("TC - Navigate to PES (Service)", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE,CONTAINER_COLUMNS_PES_BOQ)
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_PES_BOQ.ordquantity,CONTAINER_COLUMNS_PES_BOQ.quantity,CONTAINER_COLUMNS_PES_BOQ.briefinfo],cnt.uuid.PES_BOQS_STRUCTURE)
            _common.waitForLoaderToDisappear()
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1);
        });
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
        
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PES_CODE_1"))
        _common.select_rowHasValue(cnt.uuid.HEADERS,Cypress.env("PES_CODE_1"))
    });

    it("TC - In boq item container, the quantity exceed contract quantity, then allow to use wizard", function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
        _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // Added this was script is getting failed
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
        });
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.getText_fromCell(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.ORD_QUANTITY_SMALL)
               .then(($value)=>{
                    let quantity:any=((+parseFloat(($value.text()).replace(',','')).toFixed(3))-(+parseFloat(CONTAINERS_RESOURCE.DEC).toFixed(3)))
                    _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,quantity)
                    _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL)
                    cy.SAVE()
                    _common.waitForLoaderToDisappear()
                    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
                    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
                    _validate.validate_Text_message_In_PopUp(MODAL_VALIDATION.NO_NEW_ITEM_FOUND_IN_PES)
                    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
               }) 
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.ORD_QUANTITY_SMALL)
               .then(($value)=>{
                    let quantity:any=((+parseFloat(($value.text()).replace(',','')).toFixed(3))+(+parseFloat(CONTAINERS_RESOURCE.INC).toFixed(3)))
                    Cypress.env(QUANTITY_ENV,quantity)
                    _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,quantity)
                    _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL)
                    cy.SAVE()
                    _common.waitForLoaderToDisappear()
                    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
                    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
                    _common.waitForLoaderToDisappear()
                    _validate.validate_Text_message_In_PopUp(MODAL_VALIDATION.CREATE_CHANGE_ORDER_CONTRACT_FOR_NEW_ITEMS)
                    _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
               })              
    })

    it("TC - In boq item container,the record which is not exist in contract , then allow to use wizard", function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
        _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // Added this was script is getting failed

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC)
        _common.create_newRecord(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,app.InputFields.DOMAIN_TYPE_TRANSLATION,PES_BOQ_STRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY)
        _common.clickOn_activeRowCell(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,PES_BOQ_STRUCTURE)
        _common.assert_forNumericValues(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.ORD_QUANTITY_SMALL,"0")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
        _validate.validate_Text_message_In_PopUp(MODAL_VALIDATION.CREATE_CHANGE_ORDER_CONTRACT_FOR_NEW_ITEMS)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    })

    it("TC - In wizard dialog, verify the changes found record", function () {
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PES_ITEMS)
        _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // Added this was script is getting failed

        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM);
        const CHANGES_FOUND_VERIFY_1_PARAMETERS:DataCells={
            [app.GridCells.BOQ_BRIEF]:BOQ_STRUCTURE_DESC,
            [app.GridCells.QUANTITY_DELIVERED]:Cypress.env(QUANTITY_ENV)
        }
        cy.wait(2000)// Added this wait as script was getting failed
        _validate.verify_changesFound(CHANGES_FOUND_VERIFY_1_PARAMETERS)

        const CHANGES_FOUND_VERIFY_2_PARAMETERS:DataCells={
            [app.GridCells.BOQ_BRIEF]:PES_BOQ_STRUCTURE,
            [app.GridCells.QUANTITY_DELIVERED]:CONTAINERS_RESOURCE.QUANTITY
        }
        _validate.verify_changesFound(CHANGES_FOUND_VERIFY_2_PARAMETERS)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
    }) 
});