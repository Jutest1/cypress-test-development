import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _package } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC_PR1 = "EST-DESC-PR1" + Cypress._.random(0, 999);
const EST_DESC_PR2 = "EST-DESC-PR2" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM_DESC_" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.34 | Drag and drop Assemblies from Source Line item");

describe("EST- 1.34 | Drag and drop Assemblies from Source Line item", () => {
beforeEach(function () {
    cy.fixture("estimate/est-1.34-drag-and-drop-assemblies-from-source-line-item.json").then((data) => {
        this.data = data;
    });               
});
before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));  
    cy.fixture("estimate/est-1.34-drag-and-drop-assemblies-from-source-line-item.json").then((data) => {
        this.data = data;
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
        _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });         
})

after(() => {
    cy.LOGOUT();
})

it("TC - Create estimate header", function() {
    const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
    const estimateColumn=this.data.Headers.Column_Estimate

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE,estimateColumn)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC_PR1, estimateInputs.rubricCategory, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(2000)
});

it("TC - Create line item", function () {
    const estimateLineItemColumn=this.data.Headers.Column_EstimateLineItem
    const lineItem=this.data.LineItem
    const resoruceColumn=this.data.Headers.Column_Resource

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,estimateLineItemColumn)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem( LINE_ITEM_DESC, lineItem.quantity, lineItem.uom, null,lineItem.assemblyTemplate);
    cy.SAVE()
    cy.wait(2000)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES,2);
        _common.setup_gridLayout(cnt.uuid.RESOURCES,resoruceColumn)
    });
    _common.search_inSubContainer(cnt.uuid.RESOURCES," ")
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);

    _package.get_QuantityandCostTotal(cnt.uuid.ESTIMATE_LINEITEMS);
});

it("TC - Verify adding data in the source line items container", function () {
    const standardInputs = this.data.Prerequisites.SidebarInputs;
    const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
    const estimateColumn=this.data.Headers.Column_Estimate
    const sourceLineItem=this.data.SourceLineItem

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename); 
    _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
    _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER_1")).pinnedItem();

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE,estimateColumn)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC_PR2, estimateInputs.rubricCategory, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Source_LineItem, app.FooterTab.SOURCE_LINEITEM, 1);
    });
    _common.maximizeContainer(cnt.uuid.Source_LineItem)
    _estimatePage.add_sourceLineItem(cnt.uuid.Source_LineItem,sourceLineItem.EstimateFilterType,Cypress.env("PROJECT_NAME"),EST_DESC_PR1)
    _common.minimizeContainer(cnt.uuid.Source_LineItem)
    cy.SAVE();
    cy.wait(2000)
});

it("TC - Verify drag and drop line item with assembly in the line item container", function () {
    const standardInputs = this.data.Prerequisites.SidebarInputs;
    const estimateLineItemColumn=this.data.Headers.Column_EstimateLineItem
    const lineItem=this.data.LineItem

    _estimatePage.dragDrop_sourceLineItemToLineItem(cnt.uuid.Source_LineItem,cnt.uuid.ESTIMATE_LINEITEMS,EST_DESC_PR1)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename); 
    _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
    _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER_1")).pinnedItem();

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,EST_DESC_PR2)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(2000)  

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,estimateLineItemColumn)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.verify_DragandDropAssemblySourceLineItem(lineItem.assemblyTemplate,Cypress.env("CostTotal"))
});

});

