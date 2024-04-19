import { app, btn, cnt, sidebar,commonLocators, tile } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import Sidebar from "cypress/locators/sidebar";
import { _common,_validate,_mainView,_procurementContractPage, _sidebar} from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();

const ITEM_DESC = "ITEM-DESC-" + Cypress._.random(0, 999);
const TextAssembliesCode=  "TT-" + Cypress._.random(0, 999);
const TextAssembliesCode1=  "TT-" + Cypress._.random(0, 999);

let CONTRACT_PARAMETER:DataCells;
let CONTAINERS_CONTRACT;
let CONTAINERS_ITEM;
let CONTAINERS_ITEM_TEXT;
let CONTAINER_COLUMNS_ITEM;
let CONTAINER_COLUMNS_ITEM_TEXT

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.195 | Item Text in contract");

describe('PCM- 2.195 | Item Text in contract', () => {
    before(function () {
        cy.fixture('pcm/pcm-2.195-Item-text-in-contract.json').then((data) => {
            this.data = data;
           
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            CONTAINERS_ITEM = this.data.CONTAINERS.ITEM;
            CONTAINERS_ITEM_TEXT = this.data.CONTAINERS.ITEM_TEXT;        

            CONTAINER_COLUMNS_ITEM = this.data.CONTAINER_COLUMNS.ITEM
            CONTAINER_COLUMNS_ITEM_TEXT = this.data.CONTAINER_COLUMNS.ITEM_TEXT
           
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
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT,app.FooterTab.ITEMS,0)
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT,CONTAINER_COLUMNS_ITEM)
    })
    _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
    _procurementContractPage.enterRecord_toCreateItem(cnt.uuid.ITEMSCONTRACT,CONTAINERS_ITEM.MATERIAL_NO,ITEM_DESC,CONTAINERS_ITEM.ITEM_NO)
    _common.waitForLoaderToDisappear()
  })

   it('TC - Verify new button of item text is working', function () {
       
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEM_TEXTS, app.FooterTab.ITEM_TEXTS, 2);
        });
        _common.maximizeContainer(cnt.uuid.CONTRACT_ITEM_TEXTS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CONTRACT_ITEM_TEXTS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_ITEM_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ITEM_TEXT.TEXT_TYPE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACT_ITEM_TEXTS,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_ITEM_TEXT.TEXT_MODULE_TYPE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTRACT_ITEM_TEXTS)
        _common.waitForLoaderToDisappear()

       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
       _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
       
       _common.waitForLoaderToDisappear()
       _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
       _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,sidebar.SideBarOptions.CONTRACT)
       _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,CONTAINERS_CONTRACT.CONFIGURATION)
      
       _common.openTab(app.TabBar.HEADER).then(() => {
           _common.select_tabFromFooter(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.FooterTab.ITEM_TEXTS);
       });
       _common.getText_storeIntoArray(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION,app.GridCells.PRC_TEXT_TYPE_FK,"TextType")
       _common.clickOn_cellHasUniqueValue(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION,app.GridCells.BAS_TEXT_MODULE_TYPE_FK,CONTAINERS_ITEM_TEXT.TEXT_MODULE_TYPE)
       cy.SAVE()
        _common.waitForLoaderToDisappear()
    })     


    it('TC - Verify set value to text if text type exists in configuration module item text container then the text module type will get value from configuration', function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

      _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEM_TEXTS, app.FooterTab.ITEM_TEXTS, 2);
      });
      _common.maximizeContainer(cnt.uuid.CONTRACT_ITEM_TEXTS)
      _common.waitForLoaderToDisappear()
      _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_ITEM_TEXTS,app.GridCells.TEXT_MODULE_TYPE_FK,CONTAINERS_ITEM_TEXT.TEXT_MODULE_TYPE)
        _common.minimizeContainer(cnt.uuid.CONTRACT_ITEM_TEXTS)
      })    

    it('TC - Verify delete button of item text is working; ', function () {
        _common.delete_recordFromContainer(cnt.uuid.CONTRACT_ITEM_TEXTS)
        _validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_ITEM_TEXTS,CONTAINERS_ITEM_TEXT.TEXT_MODULE_TYPE)
       
    })    

    it('TC - Verify the text type lookup will filter from configuration-item text ', function () {

      _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEM_TEXTS, app.FooterTab.ITEM_TEXTS, 2);
      });
        _common.create_newRecord(cnt.uuid.CONTRACT_ITEM_TEXTS)
        _common.getText_fromPopUpContent_fromCaret(cnt.uuid.CONTRACT_ITEM_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,"LookUpItems")
        cy.wait(500).then(()=>{
         _validate.verify_isArrayEquals(Cypress.env("TextType"),Cypress.env("LookUpItems"))
        })
    })      

    it('TC - Verify if text module is not null in configuration then it will get content from text module', function () {
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TEXT_MODULES);
        
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TEXT_ASSEMBLIES, app.FooterTab.TEXT_ASSEMBLIES, 0);
        });
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TextAssembliesCode)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TextAssembliesCode)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_FORMAT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_ITEM_TEXT.TEXT_FORMAT)
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.IS_LANGUAGE_DEPENDENT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLAIN_TEXT, app.FooterTab.PLAIN_TEXT, 1);
        });
        _common.edit_inTextAreaOfContainer(cnt.uuid.PLAIN_TEXT,CONTAINERS_ITEM_TEXT.PLAIN_TEXT1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
          _common.select_tabFromFooter(cnt.uuid.TEXT_ASSEMBLIES, app.FooterTab.TEXT_ASSEMBLIES, 0);
      });
        _common.create_newRecord(cnt.uuid.TEXT_ASSEMBLIES)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,TextAssembliesCode1)
        _common.edit_containerCell(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TextAssembliesCode1)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.TEXT_FORMAT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_ITEM_TEXT.TEXT_FORMAT)
        _common.set_cellCheckboxValue(cnt.uuid.TEXT_ASSEMBLIES,app.GridCells.IS_LANGUAGE_DEPENDENT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.TEXT_MODULES_MAIN).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PLAIN_TEXT, app.FooterTab.PLAIN_TEXT, 1);
        });
        _common.edit_inTextAreaOfContainer(cnt.uuid.PLAIN_TEXT,CONTAINERS_ITEM_TEXT.PLAIN_TEXT2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

         _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEM_PLAIN_TEXT, app.FooterTab.ITEM_PLAIN_TEXT, 2);
        });
        _common.clickOn_toolbarButton(cnt.uuid.CONTRACT_ITEM_PLAIN_TEXT,Buttons.IconButtons.ICO_VIEW_ODS)
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID_1,TextAssembliesCode)
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_In_Container_Textarea(cnt.uuid.CONTRACT_ITEM_PLAIN_TEXT,CONTAINERS_ITEM_TEXT.PLAIN_TEXT1)
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_ITEM_PLAIN_TEXT).wrapElements().find(commonLocators.CommonElements.PLS_IN_TEXT_AREA).clear()
        _common.clickOn_toolbarButton(cnt.uuid.CONTRACT_ITEM_PLAIN_TEXT,Buttons.IconButtons.ICO_VIEW_ODS)
        _mainView.select_popupItem(commonLocators.CommonKeys.GRID_1,TextAssembliesCode1)
        _common.waitForLoaderToDisappear()
        _validate.validate_Text_In_Container_Textarea(cnt.uuid.CONTRACT_ITEM_PLAIN_TEXT,CONTAINERS_ITEM_TEXT.PLAIN_TEXT2)
    })    
  
})
