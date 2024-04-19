import { _common,  _sidebar,_projectPage,_package,_procurementPage, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

import CommonLocators from 'cypress/locators/common-locators';

const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------

const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);

const CLERK = "HS";



let PROJECTS_PARAMETERS:DataCells,REQUEST_FOR_QUOTE_PARAMETERS
,RESQUISITION_PARAMETERS


let CONTAINERS_PROCUREMENT_CONFIGURATION;

let CONTAINER_COLUMNS_TOTALS,CONTAINERS_RFQ,CONTAINER_COLUMNS_REQUISITION,CONTAINER_COLUMNS_CUSTOMIZING


allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 1.45 | Header text in quote")
describe("PCM- 1.45 | Header text in quote", () => {
    before(function () {
                cy.fixture('pcm/pcm-1.45-Header-text-in-quote.json').then((data) => {
                  this.data = data;
                  
                  CONTAINERS_PROCUREMENT_CONFIGURATION = this.data.CONTAINERS.PROCUREMENT_CONFIGURATION;
                  CONTAINERS_RFQ = this.data.CONTAINERS.RFQ
                  CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
                  CONTAINER_COLUMNS_CUSTOMIZING = this.data.CONTAINER_COLUMNS.CUSTOMIZING
                  
                  PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]: CLERK
                }
                  

                    RESQUISITION_PARAMETERS={
                        [commonLocators.CommonLabels.CONFIGURATION]:commonLocators.CommonKeys.MATERIAL_REQ
                      }
                      REQUEST_FOR_QUOTE_PARAMETERS = {
                        [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINERS_RFQ.BP1, CONTAINERS_RFQ.BP2],
                      }
                  });
              cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.waitForLoaderToDisappear()
    });
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Precondition-Requsition status settings', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES,CONTAINER_COLUMNS_CUSTOMIZING)
        })
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,"Requisition Status")
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.DB_TABLE_NAME,"REQ_STATUS")
       
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.APPROVED)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PUBLISHED, commonLocators.CommonKeys.UNCHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_QUOTED, commonLocators.CommonKeys.UNCHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_ORDERED, commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,"RfQ Created")
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PUBLISHED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify creation of record in requisition module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);    

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
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
          _common.waitForLoaderToDisappear()

          
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);       
        
        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.setDefaultView(app.TabBar.HEADER)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
       
        _common.maximizeContainer(cnt.uuid.CONFIGURATIONS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,commonLocators.CommonLabels.QUOTATION)
        _common.waitForLoaderToDisappear()
       
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,CONTAINERS_PROCUREMENT_CONFIGURATION.CONFIG_DETAILS)
        _common.minimizeContainer(cnt.uuid.CONFIGURATIONS)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.HEADER).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTS,app.FooterTab.HEADER_TEXTS,4)
        });
        _common.maximizeContainer(cnt.uuid.HEADER_TEXTS)
        _common.select_allContainerData(cnt.uuid.HEADER_TEXTS)
       _common.waitForLoaderToDisappear()
        _common.getText_storeIntoArray(cnt.uuid.HEADER_TEXTS, app.GridCells.PRC_TEXT_TYPE_FK,"Column_Data1")
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.HEADER_TEXTS)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
       
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,RESQUISITION_PARAMETERS)

        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "D")
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify change status of requisition and create rfq,quote', function () {
       
        cy.REFRESH_CONTAINER().wait(1000)
       
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        });
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.wait(500)//required wait      
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
        _common.waitForLoaderToDisappear()
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
        _common.waitForLoaderToDisappear()
        _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP1, CONTAINERS_RFQ.BP2], [commonLocators.CommonKeys.CHECK, commonLocators.CommonKeys.CHECK])
        _common.waitForLoaderToDisappear()
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify add, edit and delete header text', function () {
      
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTINQUOTE, app.FooterTab.HEADER_TEXT, 0);
        });
        _common.create_newRecord(cnt.uuid.HEADER_TEXTINQUOTE) 
        _common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTINQUOTE,app.GridCells.PRC_TEXT_TYPE_FK,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE2)
        cy.SAVE() 
        _common.waitForLoaderToDisappear()
         cy.wait(2000)//required wait        
       _common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTINQUOTE,app.GridCells.PRC_TEXT_TYPE_FK,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE1)
       cy.SAVE() 
       _common.waitForLoaderToDisappear()
       cy.wait(2000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.HEADER_TEXTINQUOTE, app.GridCells.PRC_TEXT_TYPE_FK, CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE1)   
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.HEADER_TEXTINQUOTE)  
        _common.delete_recordFromContainer(cnt.uuid.HEADER_TEXTINQUOTE)
        cy.SAVE() 
       _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        _validate.verify_isRecordDeleted(cnt.uuid.HEADER_TEXTINQUOTE,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE1)
    })

    it('TC - Verify selected text shown correctly', function () {
        
        _common.openTab(app.TabBar.QUOTES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADER_TEXTINQUOTE, app.FooterTab.HEADER_TEXT, 0);
            _common.waitForLoaderToDisappear()
        })
        _common.create_newRecord(cnt.uuid.HEADER_TEXTINQUOTE) 
        _common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTINQUOTE,app.GridCells.PRC_TEXT_TYPE_FK,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE0)
        cy.SAVE() 
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.HEADER_TEXTINQUOTE) 
        _common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTINQUOTE,app.GridCells.PRC_TEXT_TYPE_FK,CommonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE2)
        _common.waitForLoaderToDisappear()
        cy.SAVE() 
        _common.waitForLoaderToDisappear()
         cy.wait(2000)//required wait        
        _common.select_rowHasValue(cnt.uuid.HEADER_TEXTINQUOTE,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE2)
        _common.waitForLoaderToDisappear()
       _validate.verify_dataUnderHeaderTextDescription(cnt.uuid.HEADER_TEXTINQUOTE,"Test data for header")
        
        
    })
})
