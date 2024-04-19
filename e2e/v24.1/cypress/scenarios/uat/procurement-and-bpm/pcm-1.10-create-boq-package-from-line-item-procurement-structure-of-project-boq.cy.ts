import cypress from "cypress";
import { tile, app, cnt } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar,_estimatePage,_boqPage,_mainView } from "cypress/pages";


const allure = Cypress.Allure.reporter.getInterface();
const LINEITEM_DESC="EST-DESC" + Cypress._.random(0, 999);
const BOQDESC="boqdes" + Cypress._.random(0, 999);
const BOQSTRUCT="boqStructuredes" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.10 | Create BOQ package from Line item procurement structure of Project BOQ");

describe("PCM- 1.10 | Create BOQ package from Line item procurement structure of Project BOQ", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-1.10-create-boq-package-from-line-item-procurement-structure-of-project-boq.json").then((data) => {
      this.data = data
    })
  })

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture("pcm/pcm-1.10-create-boq-package-from-line-item-procurement-structure-of-project-boq.json").then((data) => {
      this.data = data
    
      const sideBarAction = this.data.Prerequisite.SidebarInputs
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.tabBar.project).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
      });
      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
      cy.wait(500)
      _common.openSidebarOption(sideBarAction.search).delete_pinnedItem().search_fromSidebar(sideBarAction.searchType, PRJ_NO).pinnedItem();
      _common.openTab(app.tabBar.project)
   })
  })
  after(() => {
		cy.LOGOUT();
	});
  it('TC - Create new BoQ header and BoQ structure', function () {
   
    const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs
    const BoQStructurecolHeader= this.data.CreateNewBoQStructure.Column_header
   
    _common.openTab(app.tabBar.BoQs).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQS,"BoQs")  
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS)
    _boqPage.enterRecord_toCreateBoQ(BOQDESC);
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS)

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE)  
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,BoQStructurecolHeader)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES);
    _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT, BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
    cy.SAVE();
    _estimatePage.updateExisting_Record("selectDropdown",cnt.uuid.BOQ_STRUCTURES,BOQSTRUCT,app.GridCells.PRC_STRUCTURE_FK,BoQStructureInputs.procurementStructure)
    cy.SAVE()
    cy.wait(1000)
  });

  it('TC - Create new estimate', function () {
    const EstimateInputs = this.data.EstimatePageInputes.CreateEstimate

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar("quickstart", "Project");

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE,app.FooterTab.ESTIMATE)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, EstimateInputs.description, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
    _estimatePage.textOfEstimateCode();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Create new line item record", function () {
    const lineitemInputs = this.data.CreateNewLineItemRecord.CreateLineItem;
    const lineitemgrid = this.data.CreateNewLineItemRecord.Column_header;
    const BOQsgrid = this.data.BoQINLIColumn_header
   

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.lineItemBoQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.lineItemBoQ,BOQsgrid)
    })
    cy.wait(1000)
    _common.clear_subContainerFilter(cnt.uuid.lineItemBoQ)
    _common.search_inSubContainer(cnt.uuid.lineItemBoQ,BOQSTRUCT);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.lineItemBoQ,app.GridCells.BRIEF_INFO,BOQSTRUCT)

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS,app.FooterTab.LINE_ITEMS)
    _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,lineitemgrid)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(LINEITEM_DESC, lineitemInputs.quantity, lineitemInputs.uom);
    cy.SAVE();
   
    
  });

  it('TC - Assign resource to the line item', function () {
    const resourceinputs = this.data.ResourcePageInputs.createResource
    const resColumn = this.data.ResourcePageInputs.ResourceColumn_header

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resColumn);
    });
  
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(resourceinputs.shortKey2, resourceinputs.costcode1)
    _common.app.GridCells.BAS_UOM_FK(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO)
    cy.SAVE()

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS,app.FooterTab.LINE_ITEMS)
      })

    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("AQQUANTITY",$ele1.text())
      })

    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("COSTTOTAL",$ele1.text())
      })
});

  it("TC - Create boq package from wizards option", function () {
    const BoQStructurecolHeader= this.data.CreateNewBoQStructure.Column_header
    const Package = this.data.CreateBoQPackageInputs.CreateBoQPackage

   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar("wizard", "Create/Update BoQ Package");
   
   _package.enterRecord_toCreateBoQPackage_FromWizard(Package.grouping,Package.estimateScope, Package.groupingStructure,Package.procurementStructure,Package.selectionStructure,Package.create)
   _common.openTab(app.TabBar.BOQDETAILS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE,app.FooterTab.BOQ_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE,BoQStructurecolHeader)
    });

   
  })

  it("TC - Verify outline specification, quantity, final price of package BoQ is equal to details from line item", function () {
    cy.REFRESH_CONTAINER()
  
     _common.openTab(app.TabBar.BOQDETAILS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE,app.FooterTab.BOQ_STRUCTURE)
      });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM)

      _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BRIEF_INFO,LINEITEM_DESC)
      _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE,app.GridCells.QUANTITY_SMALL,Cypress.env("AQQUANTITY"))
      _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE,app.GridCells.FINAL_PRICE_SMALL,Cypress.env("COSTTOTAL"))
      
  })
})