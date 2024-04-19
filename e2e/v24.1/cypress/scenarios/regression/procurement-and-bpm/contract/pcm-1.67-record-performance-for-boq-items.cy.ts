import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _procurementContractPage } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQ-STRUC-DESC-" + Cypress._.random(0, 999);
const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells;

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let MODALS_CREATE_BOQ_PACKAGE;
let CONTAINERS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT_BOQSTRUCTURE;
let CONTAINER_COLUMNS_PES_BOQSTRUCTURE;
let CONTAINERS_PES;
let CONTAINER_COLUMNS_REQUISITION;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 1.67 | Record performance for BoQ item");

describe("PCM- 1.67 | Record performance for BoQ item", () => {    
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"), 
            Cypress.env("adminPassword"),            
            Cypress.env("parentCompanyName"), 
            Cypress.env("childCompanyName"));
        cy.fixture("pcm/pcm-1.67-record-performance-for-boq-item.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
			CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CU_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
			}
            CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      		CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      		CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE      		
      		BOQS_PARAMETERS = {
        		[app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
			};
      		BOQS_STRUCTURE_PARAMETERS = {
        		[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        		[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        		[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        		[ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        		[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      		};
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                  [app.GridCells.CODE]: EST_CODE,
                  [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            GENERATE_LINE_ITEMS_PARAMETERS = {
                  [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
                  [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
            }
            CONTAINERS_CONTRACT= this.data.CONTAINERS.CONTRACT
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_COLUMNS_CONTRACT_BOQSTRUCTURE =this.data.CONTAINER_COLUMNS.CONTRACT_BOQSTRUCTURE
            MODALS_CREATE_BOQ_PACKAGE= this.data.MODALS.CREATE_BOQ_PACKAGE;
            CONTAINER_COLUMNS_PES_BOQSTRUCTURE = this.data.CONTAINER_COLUMNS.PES_BOQSTRUCTURE
            CONTAINERS_PES= this.data.CONTAINERS.PES
            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION
           
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create controlling unit", function () {        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
       
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.openTab(app.TabBar.BOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});

		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);

		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});

		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS );
		cy.SAVE();		
        _boqPage.get_BoQsFinalPrice()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        
    });

    it("TC - Create estimate header", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE);
		});

		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
    });

    it("TC - Generate BOQ line item", function () {
        cy.REFRESH_CONTAINER();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		cy.SAVE();
    });

    it("TC - Create BoQ Package from the Estimate and Change package status", function () {    
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODALS_CREATE_BOQ_PACKAGE.BASEDON, MODALS_CREATE_BOQ_PACKAGE.ESTIMATESCOPE, MODALS_CREATE_BOQ_PACKAGE.ESTIMATESCOPEINDEX, MODALS_CREATE_BOQ_PACKAGE.WICBOQ, MODALS_CREATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODALS_CREATE_BOQ_PACKAGE.QTYTYPE, MODALS_CREATE_BOQ_PACKAGE.CREATEPACKAGECHECKBOX)
    })
    it("TC - Verify Quantity in Package", function () {    
        _common.openTab(app.TabBar.PACKAGE).then(() => {  
            _common.setDefaultView(app.TabBar.PACKAGE)          
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)            
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))
        _common.openTab(app.TabBar.PACKAGE).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE,CONTAINER_COLUMNS_BOQ_STRUCTURE);
        })
        _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity],cnt.uuid.BOQ_STRUCTURE)
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_BOQ_STRUCTURE.BOQLINETYPE)
        _common.waitForLoaderToDisappear()
        _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURE,app.GridCells.QUANTITY_SMALL)
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
    })

    it("TC - Create requisition and Change requisition status", function () {     
           
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
          _common.setDefaultView(app.TabBar.MAIN)          
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"SmiJ")
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
        })
    })
    it("TC - Create contract", function () { 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _package.create_ContractfromPackage(CONTAINERS_CONTRACT.BUSINESS_PARTNER)       
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
          _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);      
          
        })                
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,CONTAINER_COLUMNS_CONTRACT_BOQSTRUCTURE)               
            _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT_BOQSTRUCTURE.quantity],cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE)
        })
        _common.clickOn_cellHasIcon(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,app.GridCells.QUANTITY_SMALL,Cypress.env("Text"))
                
    })
    it("TC - Create PES and verify quantity",function(){  
             
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.PERFORMANCE_ENTRY_SHEETS, 0)                 
            
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1)                
            
        })
        _common.select_rowInContainer(cnt.uuid.PES_ITEMS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2) 
            _common.setup_gridLayout(cnt.uuid.PES_BOQS_STRUCTURE,CONTAINER_COLUMNS_PES_BOQSTRUCTURE)                
            
        })
        _common.set_columnAtTop([CONTAINER_COLUMNS_PES_BOQSTRUCTURE.quantity,CONTAINER_COLUMNS_PES_BOQSTRUCTURE.remquantity,CONTAINER_COLUMNS_PES_BOQSTRUCTURE.ordquantity],cnt.uuid.PES_BOQS_STRUCTURE)
        _common.openTab(app.TabBar.PESBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQs, 1)                 
            _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
        })
        _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_BOQ_STRUCTURE.BOQLINETYPE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.QUANTITY_SMALL,CONTAINERS_PES.QUANTITY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.REM_QUANTITY,Cypress.env("Text"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.ORD_QUANTITY,Cypress.env("Text"))
        _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    })
   
})
