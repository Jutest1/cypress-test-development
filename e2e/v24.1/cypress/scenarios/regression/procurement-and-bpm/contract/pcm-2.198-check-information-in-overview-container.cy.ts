import { app, btn, cnt, sidebar, commonLocators,tile } from "cypress/locators";
import { _common,_estimatePage,_validate,_mainView,_procurementContractPage, _package, _modalView ,_sidebar} from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();

const ITEM_DESC = "ITEM-DESC-" + Cypress._.random(0, 999);

let CONTRACT_PARAMETER:DataCells;
let CONTAINERS_CONTRACT;
let CONTAINERS_ITEM;
let CONTAINERS_OVERVIEW;
let CONTAINER_COLUMNS_ITEM;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.198 | Check information in overview container");


describe('PCM-2.198 | Check information in overview container', () => {
    before(function () {
        cy.fixture('pcm/pcm-2.198-check-information-in-overview-container.json').then((data) => {
            this.data = data;
           
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINERS_ITEM = this.data.CONTAINERS.ITEM;
            CONTAINERS_OVERVIEW = this.data.CONTAINERS.OVERVIEW;

            CONTAINER_COLUMNS_ITEM = this.data.CONTAINER_COLUMNS.ITEM
           
            CONTRACT_PARAMETER = {
              [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_CONTRACT.CONFIGURATION,
              [commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_CONTRACT.BUSINESSPARTNER

          };
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
    });
  
    after(() => {
        cy.LOGOUT();
    });

  it("TC - Create new contract record", function () {
   
    _common.openTab(app.TabBar.CONTRACT).then(()=>{
      _common.setDefaultView(app.TabBar.CONTRACT)
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT,app.FooterTab.CONTRACTS,0)
    })
    _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT,0)
    _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(CONTRACT_PARAMETER)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    })

  it("TC - Create Items for Contract",function(){
    
    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
      _common.setDefaultView(app.TabBar.ORDER_ITEM)
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT,app.FooterTab.ITEMS,0)
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT,CONTAINER_COLUMNS_ITEM)
    })
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
    _procurementContractPage.enterRecord_toCreateItem(cnt.uuid.ITEMSCONTRACT,CONTAINERS_ITEM.MATERIAL_NO,ITEM_DESC,CONTAINERS_ITEM.ITEM_NO)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()

  })

  it("TC - Create Document and Verify the Overview",function(){

    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_DOCUMENT,app.FooterTab.DOCUMENT,1)
        _common.create_newRecord(cnt.uuid.CONTRACT_DOCUMENT)
      })
      cy.SAVE()
      _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_OVERVIEW,app.FooterTab.OVERVIEW,2)
      })
      _common.waitForLoaderToDisappear()
      _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_OVERVIEW,app.GridCells.DESCRIPTION,CONTAINERS_OVERVIEW.DOCUMENT)
      cy.log("Document is uploaded and Verified")

  })

  it("TC - Create Certificate and Verify the Overview",function(){

    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_CERTIFICATES,app.FooterTab.CERTIFICATES,1)
        _common.create_newRecord(cnt.uuid.CONTRACT_CERTIFICATES)
      })
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_OVERVIEW,app.FooterTab.OVERVIEW,2)
      })
      _common.clickOn_cellHasValue(cnt.uuid.CONTRACT_OVERVIEW,app.GridCells.DESCRIPTION,CONTAINERS_OVERVIEW.CERTIFICATES)
      
      cy.log("Cerificate Verified")

  })

  it("TC - Create Generals and Verify the Overview",function(){

    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT,app.FooterTab.GENERALS,1)
        _common.create_newRecord(cnt.uuid.GENERALS_CONTRACT)
      })
      _common.edit_dropdownCellWithInput(cnt.uuid.GENERALS_CONTRACT,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,"Nachlass %")
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_OVERVIEW,app.FooterTab.OVERVIEW,2)
      })
      _common.clickOn_cellHasValue(cnt.uuid.CONTRACT_OVERVIEW,app.GridCells.DESCRIPTION,CONTAINERS_OVERVIEW.GENERALS)
      cy.log("Generals Verified")
  })

  it("TC - Delete Generals and Verify the Overview",function(){

    _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.GENERALS_CONTRACT,app.FooterTab.GENERALS,1)
      })
      _common.delete_recordFromContainer(cnt.uuid.GENERALS_CONTRACT)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ORDER_ITEM).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_OVERVIEW,app.FooterTab.OVERVIEW,2)
      })
      _common.clickOn_cellHasValue(cnt.uuid.CONTRACT_OVERVIEW,app.GridCells.DESCRIPTION,CONTAINERS_OVERVIEW.GENERALS)
      cy.log("Delete Generals Verified")
  })
})