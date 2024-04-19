import { tile, app, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import { _common, _estimatePage,_sidebar, _mainView, _modalView, _package,_projectPage, _rfqPage, _validate } from "cypress/pages";


const allure = Cypress.Allure.reporter.getInterface();
const RFQ_DESC = "RFQ-DESC-" + Cypress._.random(0, 999);

var material_resource1 ="material_resource1";
var countryname = "countryname"

let CONTAINERS_BUSINESS_PARTNER;
let CONTAINERS_PROCUREMENT_STRUCTURE_BP
let CONTAINERS_BIDDER;
let CONTAINER_COLUMNS_BUSINESS_PARTNER;
let CONTAINER_COLUMNS_RFQ;
let CONTAINER_COLUMNS_BIDDER


allure.epic("PROCUREMENT AND BPM");
allure.feature("RFQ");
allure.story("PCM- 2.77 | Add new bidders");

describe('PCM- 2.77 | Add new bidders', () => {
    before(function () {
        cy.fixture('pcm/pcm-2.77-add-new-bidders.json').then((data) => {
            this.data = data;
            CONTAINERS_BUSINESS_PARTNER = this.data.CONTAINERS.BUSINESS_PARTNER;
            CONTAINERS_PROCUREMENT_STRUCTURE_BP = this.data.CONTAINERS.PROCUREMENT_STRUCTURE_BP;
            CONTAINERS_BIDDER = this.data.CONTAINERS.BIDDER
          
            CONTAINER_COLUMNS_BUSINESS_PARTNER = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            CONTAINER_COLUMNS_BIDDER = this.data.CONTAINER_COLUMNS.BIDDER
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

it("TC - Create BPM", function ()  {
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => { 
        _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
        _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS,app.FooterTab.BUSINESS_PARTNER,0)   
        _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER)
       });
       cy.REFRESH_CONTAINER()
       _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.BUSINESS_PARTNERS,app.GridCells.COUNTRY_DESC,countryname)

    _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_BP,app.FooterTab.PROCUREMENT_STRUCTURE,1)
    _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURE_BP)
   
     });

    _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURE_BP," ")
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURE_BP);
    _common.select_rowHasValue(cnt.uuid.PROCUREMENT_STRUCTURE_BP,CONTAINERS_PROCUREMENT_STRUCTURE_BP.RESOURCE)
    _common.saveCellDataToEnv(cnt.uuid.PROCUREMENT_STRUCTURE_BP,app.GridCells.CODE_CAPS,material_resource1)

})

it("TC - Create RfQ", function ()  {
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.RFQ).then(() => {     
        _common.setDefaultView(app.TabBar.RFQ)
        _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE,app.FooterTab.RFQ,0)
        _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
    });

    _common.maximizeContainer(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,RFQ_DESC)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.REQUEST_FOR_QUOTE)
    _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE,app.FooterTab.BIDDERS,2)
    _common.openTab(app.TabBar.RFQ).then(() => {     
        _common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDER)
    });
    _common.maximizeContainer(cnt.uuid.BIDDERS)
    _common.create_newRecord(cnt.uuid.BIDDERS)
    _package.verify_BidderRecord(cnt.uuid.BIDDERS,CONTAINERS_BIDDER.INPUT_TEXT,CONTAINERS_BUSINESS_PARTNER.PARTNERNAME,CONTAINERS_BIDDER.STRUCTURE,Cypress.env(material_resource1),Cypress.env(countryname),CONTAINERS_BIDDER.LASTNAME,CONTAINERS_BIDDER.LASTNAME1,CONTAINERS_BIDDER.FIRSTNAME,CONTAINERS_BIDDER.INPUT_TEXT2)
    _common.minimizeContainer(cnt.uuid.BIDDERS)
    _common.delete_recordFromContainer(cnt.uuid.BIDDERS)
    _validate.verify_isRecordDeleted(cnt.uuid.BIDDERS,CONTAINERS_BUSINESS_PARTNER.PARTNERNAME)
      cy.SAVE()   
      _common.waitForLoaderToDisappear()
    })

})