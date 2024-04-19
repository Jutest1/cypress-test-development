import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _controllingUnit,_validate, _procurementContractPage } from "cypress/pages";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const CU_DESC = 'CU-DESC-' + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells
let CONTRACT_PARAMETER:DataCells
let PROJECTS_PARAMETERS
let MODAL_PROJECTS
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINERS_BUSINESS_PARTNER;
let CONTAINER_COLUMNS_ORDER_ITEM;
let CONTAINERS_ORDER_ITEM; 
let CONTAINERS_CONTRACT_DATA;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.38 | Create contract directly from contract module");
describe("PCM- 2.38 | Create contract directly from contract module", () => {

    before(function () {        
        cy.fixture("pcm/pcm-2.38-create-contract-directly-from-contract-module.json").then((data) => {
            this.data = data;
          CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
          CONTAINERS_BUSINESS_PARTNER = this.data.CONTAINERS.BUSINESS_PARTNER;
          CONTAINER_COLUMNS_ORDER_ITEM = this.data.CONTAINER_COLUMNS.ORDER_ITEM
          CONTAINERS_ORDER_ITEM = this.data.CONTAINERS.ORDER_ITEM
          CONTAINERS_CONTRACT_DATA = this.data.CONTAINERS.CONTRACT_DATA
          CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
          CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
          MODAL_PROJECTS=this.data.MODAL.PROJECTS
            CONTROLLING_UNIT_PARAMETERS={
              [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
              [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            },
            CONTRACT_PARAMETER = {
            [commonLocators.CommonLabels.BUSINESS_PARTNER]:CONTAINERS_BUSINESS_PARTNER.PARTNERNAME

            }
          }).then(()=>{
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
        _common.waitForLoaderToDisappear()
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
		_common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		
	});
    
	it('TC - Create new contract', function () {	
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.waitForLoaderToDisappear()
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _common.waitForLoaderToDisappear()
        _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETER)
        _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CU_DESC)
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            cy.wait(1000) //wait needed to store value of Contract code
            _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CODE).then(($value)=>{
                Cypress.env("CONTRACT_CODE",$value.text())
            })
	});

    it("TC - Create new Order Item", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ORDER_ITEM)
            cy.REFRESH_SELECTED_ENTITIES()
        });
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
        _common.waitForLoaderToDisappear()
        _saleContractPage.enterRecord_toCreateNewOrderItem(CONTAINERS_ORDER_ITEM.MATERIAL_NO, CONTAINERS_ORDER_ITEM.QUANTITY)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });

    it("TC - Create contract ,set value to configuration and bp, click save , it should check whether had auto generate code", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
        _common.openTab(app.TabBar.CONTRACT).then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CODE,Cypress.env("CONTRACT_CODE"))
        })       
    });

    it("TC - It should check different field is working ,inculde lookup and cell input and lookup filter", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
        _validate.verify_EditedContract_with_lookups(CONTAINERS_CONTRACT_DATA.PROCUREMENT_STRUCTURE_CODE,cnt.uuid.PROCUREMENTCONTRACT)
    });
 })
    after(() => {
		cy.LOGOUT();
	});