import { _common,  _mainView, _modalView, _sidebar,  _validate} from "cypress/pages";
import { app, tile, cnt, btn,sidebar,commonLocators } from "cypress/locators";
import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();
const RFQ_DESC = "RFQ-Desc-" + Cypress._.random(0, 999);

let CONTAINERS_RFQ;
let CONTAINER_COLUMNS_RFQ;

allure.epic("PROCUREMENT AND BPM");
allure.feature("RFQ");
allure.story("PCM- 2.79 | Change status of RfQ from Wizard");   
    
    describe('PCM- 2.79 | Change status of RfQ from Wizard', () => {
        before(function () {
            cy.fixture('pcm/pcm-2.79-change-status-of-rfq-from-wizard.json').then((data) => {
                this.data = data;
                CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
                
                CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ 
            });
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
        after(() => {
            cy.LOGOUT();
        });

    it('TC - Create RFQ ',function(){
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
        _common.waitForLoaderToDisappear()
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);

        _common.openTab(app.TabBar.RFQ).then(()=>{
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE,app.FooterTab.RFQ,2)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE,CONTAINER_COLUMNS_RFQ)            
        })        
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,RFQ_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
       
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)        
        _common.waitForLoaderToDisappear()

        cy.REFRESH_SELECTED_ENTITIES()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.RFQ_STATUS_FK,commonLocators.CommonKeys.PUBLISHED)
    })

    it('TC - Verify status for RfQ in Customizing module', function(){
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);

        _common.openTab(app.TabBar.MASTER_DATA).then(()=>{            
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES,app.FooterTab.DATA_TYPES,0)                     
        })        
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_RFQ.RFQ_STATUS)

        _common.openTab(app.TabBar.MASTER_DATA).then(()=>{            
            _common.select_tabFromFooter(cnt.uuid.INSTANCES,app.FooterTab.DATA_RECORDS,2)                    
        }) 
        _validate.verifyStatus_inCustomizing_withRFQ(cnt.uuid.INSTANCES,app.GridCells.IS_LIVE,commonLocators.CommonKeys.CHECK,[CONTAINERS_RFQ.ID1,CONTAINERS_RFQ.ID2,CONTAINERS_RFQ.ID3,CONTAINERS_RFQ.ID4,CONTAINERS_RFQ.ID5,CONTAINERS_RFQ.ID6,CONTAINERS_RFQ.ID7,CONTAINERS_RFQ.ID8],commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.RFQ,commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_RFQ_STATUS)
        _common.clickOn_modalFooterButton(btn.ButtonText.CLOSE)
    });
    
});