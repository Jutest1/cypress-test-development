import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage,_procurementPage,_estimatePage, _validate, _controllingUnit, _materialPage, _assembliesPage, _boqPage, _mainView, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let CONTAINERS_DATA_RECORDS

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
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

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let GENERATE_LINE_ITEMS_PARAMETERS_1:DataCells

var aqQuantityArray:string[]=[]
var wqQuantityArray:string[]=[]

ALLURE.epic("ESTIMATE");
ALLURE.feature("Line Item");

ALLURE.story("EST- 1.116 | Generated  Duplicate line item: Consider Boq item and Boq split item");

describe("EST- 1.116 | Generated  Duplicate line item: Consider Boq item and Boq split item", () => {
    before(function () {
        cy.fixture("estimate/est-1.116-generated-duplicate-line-item-consider-boq-item-and-boq-split-item.json")
          .then((data) => {
            this.data=data

            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINERS_DATA_RECORDS=this.data.CONTAINERS.DATA_RECORDS

            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS={
              [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS={
              [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
              [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
              [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
              [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM,
              [ app.GridCells.QUANTITY_ADJ]:CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
            }
    
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            GENERATE_LINE_ITEMS_PARAMETERS={
              [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
              [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC             
            }
            GENERATE_LINE_ITEMS_PARAMETERS_1={
                [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC,   
                [commonLocators.CommonLabels.CREATE_NEW]:this.data.MODAL.CREATE_NEW
            }

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
    
    it("TC - Set est line item status under customizing", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_DATA_RECORDS.EST_LINE_ITEM_STATUS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,CONTAINERS_DATA_RECORDS.EST_LINE_ITEM_STATUS)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.search_inSubContainer(cnt.uuid.INSTANCES,CONTAINERS_DATA_RECORDS.GESCHLOSSEN)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,CONTAINERS_DATA_RECORDS.GESCHLOSSEN)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_READONLY,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
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
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantityadj],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        
    });

    it('TC - Create new estimate record', function () {
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
    
    it("TC - Generate line item", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget,CONTAINER_COLUMNS_LINE_ITEM.hint,CONTAINER_COLUMNS_LINE_ITEM.estlineitemstatusfk],cnt.uuid.ESTIMATE_LINEITEMS)
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
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Line Item AQ, WQ Quantity should be reflected from Project BoQ WQ, AQ Quantity", function () {
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY)
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_LINE_ITEM_STATUS_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_RECORDS.GESCHLOSSEN)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE,"LINE_ITEM_CODE_1")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Update AQ-Quantity and Quantity under BoQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 	
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
	
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		_common.select_rowHasValue(cnt.uuid.BOQS, BOQ_DESC)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantityadj,CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });

		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
		_common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY_UPDATE_1);
		_common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY_UPDATE_1);
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Duplicate line Item should be generated with 'Copy Source' field as 'Duplicate from 000010 at update' & Duplicate Line Item AQ=90 & WQ=180 should be populated", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.waitForLoaderToDisappear()

        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget,CONTAINER_COLUMNS_LINE_ITEM.hint,CONTAINER_COLUMNS_LINE_ITEM.estlineitemstatusfk],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
        

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,commonLocators.CommonKeys.IN_ARBEIT)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()

        let aqQuantity=parseInt(CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY_UPDATE_1)-parseInt(CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY)
        let wqQuantity=parseInt(CONTAINERS_BOQ_STRUCTURE.QUANTITY_UPDATE_1)-parseInt(CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,aqQuantity.toString())
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,wqQuantity.toString())
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.HINT,'Duplicate from "'+Cypress.env("LINE_ITEM_CODE_1")+'" at update')
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_LINE_ITEM_STATUS_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_RECORDS.GESCHLOSSEN)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.SAVE()   
        _common.waitForLoaderToDisappear()
        aqQuantityArray=_common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET)
        wqQuantityArray=_common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET)
    })

    it("TC - AQ quantity in Boq = AQ quantity in LI with read-only status + AQ quantity in LI without read-only status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 	
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
	
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		_common.select_rowHasValue(cnt.uuid.BOQS, BOQ_DESC)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantityadj,CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });

		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
		_common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ).then($el=>{
            let aqQuantityTotal:any=0
            for (var i in aqQuantityArray) {
                aqQuantityTotal += (+parseFloat(aqQuantityArray[i]).toFixed(2));
            }
            expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(aqQuantityTotal).toFixed(2))
        })
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
    })

    it("TC - WQ quantity in Boq = WQ quantity in LI with read-only status + WQ quantity in LI without read-only status", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
        });
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
		_common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        
        
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL).then($el=>{
            let wqQuantityTotal:any=0
            for (var i in wqQuantityArray) {
                wqQuantityTotal += (+parseFloat(wqQuantityArray[i]).toFixed(2));
            }
            expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(wqQuantityTotal).toFixed(2))
        })
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
    })

    it("TC - Update AQ-Quantity and Quantity under BoQ structure", function () {
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY_UPDATE_2);
		_common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY_UPDATE_2);
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
    })

    it("TC - Another Duplicate line Item should be generated with 'Copy Source' field as 'Duplicate from 000010 at update' & Another Duplicate Line Item AQ=100 & WQ=100 should be populated", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget,CONTAINER_COLUMNS_LINE_ITEM.hint,CONTAINER_COLUMNS_LINE_ITEM.estlineitemstatusfk],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS_1);
        

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,commonLocators.CommonKeys.IN_ARBEIT)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()

        let aqQuantity=parseInt(CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY_UPDATE_2)-(parseInt(CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY_UPDATE_1)-parseInt(CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY))-parseInt(CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY)
        let wqQuantity=parseInt(CONTAINERS_BOQ_STRUCTURE.QUANTITY_UPDATE_2)-((parseInt(CONTAINERS_BOQ_STRUCTURE.QUANTITY_UPDATE_1)-parseInt(CONTAINERS_BOQ_STRUCTURE.QUANTITY)))-parseInt(CONTAINERS_BOQ_STRUCTURE.QUANTITY)
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,aqQuantity.toString())
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,wqQuantity.toString())
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.HINT,'Duplicate from "'+Cypress.env("LINE_ITEM_CODE_1")+'" at update')
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_LINE_ITEM_STATUS_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_RECORDS.GESCHLOSSEN)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()   
        _common.waitForLoaderToDisappear()
        aqQuantityArray=_common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET)
        wqQuantityArray=_common.returnArrayForMultipleCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET)
    })

    it("TC - AQ quantity in Boq = AQ quantity in LI with read-only status + AQ quantity in LI without read-only status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 	
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
	
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		_common.select_rowHasValue(cnt.uuid.BOQS, BOQ_DESC)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.quantityadj,CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });

		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
		_common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)

        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ).then($el=>{
            let aqQuantityTotal:any=0
            for (var i in aqQuantityArray) {
                aqQuantityTotal += (+parseFloat(aqQuantityArray[i]).toFixed(2));
            }
            expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(aqQuantityTotal).toFixed(2))
        })
      
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
    })

    it("TC - WQ quantity in Boq = WQ quantity in LI with read-only status + WQ quantity in LI without read-only status", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
        });
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
		_common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL).then($el=>{
            let wqQuantityTotal:any=0
            for (var i in wqQuantityArray) {
                wqQuantityTotal += (+parseFloat(wqQuantityArray[i]).toFixed(2));
            }
            expect(parseFloat($el.text()).toFixed(2)).equal(parseFloat(wqQuantityTotal).toFixed(2))
        })
        _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
    })
})