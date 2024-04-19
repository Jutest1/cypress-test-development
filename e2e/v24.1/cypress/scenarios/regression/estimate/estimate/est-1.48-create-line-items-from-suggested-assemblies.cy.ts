import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt, btn ,sidebar, commonLocators} from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let BOQ_PARAMETERS:DataCells;


let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM
 
let CONTAINERS_RESOURCE;
let CONTAINERS_SOURCE_BOQ;
let CONTAINERS_ASSEMBLY_ASSIGNMENT;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_SOURCE_BOQ
let CONTAINER_COLUMNS_BOQS;
let CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT
let CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.48 | Create Line Items from suggested Assemblies");


describe('EST- 1.48 | Create Line Items from suggested Assemblies', () => {
    before(function () {
        cy.fixture('estimate/est-1.48-create-line-items-from-suggested-assemblies.json')
          .then((data) => {
            this.data=data
            
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINERS_SOURCE_BOQ = this.data.CONTAINERS.SOURCE_BOQ;
            CONTAINERS_ASSEMBLY_ASSIGNMENT = this.data.CONTAINERS.ASSEMBLY_ASSIGNMENT;
        
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            CONTAINER_COLUMNS_SOURCE_BOQ=this.data.CONTAINER_COLUMNS.SOURCE_BOQ
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM=this.data.CONTAINER_COLUMNS.ESTIMATE_LINE_ITEM
            CONTAINER_COLUMNS_BOQS=this.data.CONTAINER_COLUMNS.BOQS
            CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT=this.data.CONTAINER_COLUMNS.ASSEMBLY_ASSIGNMENT
            

            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
            }
    
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            };
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            
          })
          .then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
  })
    });

after(() => {
        cy.LOGOUT();
    });

it("TC - Create estimate header", function() {
   
   
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
   
});

it("TC - Create BOQ header", function () {
   
    _common.openTab(app.TabBar.BOQS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
        _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
    });
    _common.search_inSubContainer(cnt.uuid.BOQS," ")
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
});

it("TC - Verify create line items from suggested assemblies", function () {
   
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES);
    _boqPage.click_OnDivision(cnt.uuid.BOQ_STRUCTURES,commonLocators.CommonKeys.ROOT)
    _boqPage.click_OnSubDivision(cnt.uuid.BOQ_STRUCTURES,"Level 1")
    _common.waitForLoaderToDisappear()

    
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
        _common.waitForLoaderToDisappear()
        _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCE_BOQ)
    })
    _common.waitForLoaderToDisappear()
    _boqPage.dragDrop_SourceBoQToBoQStructure(cnt.uuid.BOQSOURCE,cnt.uuid.BOQ_STRUCTURES,CONTAINERS_SOURCE_BOQ.CopyFrom,CONTAINERS_SOURCE_BOQ.WICGroup,CONTAINERS_SOURCE_BOQ.BoQSelection,CONTAINERS_SOURCE_BOQ.SourceOutlineSpec,CONTAINERS_SOURCE_BOQ.BoQStructureLineType)
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC);
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _boqPage.selectAssignedSourceUnderBoQStructureViaWIC(CONTAINERS_SOURCE_BOQ.WICGroup,CONTAINERS_SOURCE_BOQ.BoQSelection,CONTAINERS_SOURCE_BOQ.SourceOutlineSpec)
   
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_ASSIGNMENT, app.FooterTab.ASSEMBLY_ASSIGNMENT, 2)
        _common.setup_gridLayout(cnt.uuid.ASSEMBLY_ASSIGNMENT, CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT)
    })
    _boqPage.delete_AllAssemblyAssignments()
    _common.create_newRecord(cnt.uuid.ASSEMBLY_ASSIGNMENT)
    _boqPage.create_AssemblyAssignment(CONTAINERS_ASSEMBLY_ASSIGNMENT.QTY,CONTAINERS_ASSEMBLY_ASSIGNMENT.TakeOverMode,CONTAINERS_ASSEMBLY_ASSIGNMENT.AssemblyCode)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO);

    _common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_BOQS, app.FooterTab.BOQs,2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_BOQS,BOQ_DESC)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.ESTIMATE_BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_BOQS,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()

    _boqPage.select_BoQUnderEstimateByBoQ(BOQ_DESC)

    _common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC, app.FooterTab.RELATED_ASSEMBLIES,1);
        _common.setup_gridLayout(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC, CONTAINER_COLUMNS_ASSEMBLY_ASSIGNMENT)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_BOQS)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_BOQS,BOQ_DESC)
    _common.maximizeContainer(cnt.uuid.ESTIMATE_BOQS)
    _boqPage.select_BoQUnderEstimateByBoQ(BOQ_DESC)
    _boqPage.select_BoQUnderEstimateByBoQ(BOQ_DESC)
    _common.minimizeContainer(cnt.uuid.ESTIMATE_BOQS)

    _boqPage.dragDrop_RelatedAssemblyToLineItem(cnt.uuid.RELATED_ASSEMBLIES_OF_WIC,cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_ASSEMBLY_ASSIGNMENT.AssemblyCode)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
    });
    cy.REFRESH_CONTAINER();
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO);

    _common.waitForLoaderToDisappear()  

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.verify_LineItemsCreatedFromSuggestedAssemblies(CONTAINERS_ASSEMBLY_ASSIGNMENT.AssemblyCode)

});

});
