import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQDESC_" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR_" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_SOURCE_BOQ

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'ESTDESC_' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 1.15 | Create BOQ package from WIC BOQ - for quantities select line item WQ");
describe("PCM- 1.15 | Create BOQ package from WIC BOQ - for quantities select line item WQ", () => {

  before(function () {
    cy.fixture("pcm/pcm-1.15-create-boq-package-from-wic-boq-for-quantities-select-line-item-wq.json")
      .then((data) => {
        this.data = data;
        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
        BOQ_PARAMETERS={
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
        }
        CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_SOURCE_BOQ=this.data.CONTAINER_COLUMNS.SOURCE_BOQ

        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }

        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        GENERATE_LINE_ITEMS_PARAMETERS={
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC                
        }

        CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
        CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
        };

        MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE

        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
      })
      .then(()=>{
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.setDefaultView(app.TabBar.PROJECT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
        _common.waitForLoaderToDisappear() 
      })
  });

  after(() => {
		cy.LOGOUT();
	});

  it("TC - Create BoQ header and add BoQ item in it using WIC BoQ", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
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
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
    });
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
      _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCE_BOQ)
    })
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
    });
    _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
    _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, btn.ToolBar.ICO_TREE_EXPAND_ALL)

    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.ROOT)
    _common.create_newRecord(cnt.uuid.BOQ_STRUCTURES);
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.POSITION)

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
    })
    _common.waitForLoaderToDisappear()
    _boqPage.search_recordingUnderSourceBoQ(cnt.uuid.BOQSOURCE, cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.WIC_BOQ, CONTAINERS_BOQ_STRUCTURE.WIC_GROUP,Cypress.env("projectName") , CONTAINERS_BOQ_STRUCTURE.BOQ_SELECTION, CONTAINERS_BOQ_STRUCTURE.OUTLINE_SPEC,commonLocators.CommonKeys.LEVEL_2);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
    });
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, CONTAINERS_BOQ_STRUCTURE.OUTLINE_SPEC)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, BOQ_STRUCTURE_DESC)
    _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
    _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create new estimate record', function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
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

  it("TC - Generate boq line item and verify wic boq gets assigned from look-up", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.costtotal,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wicboqitemfk,CONTAINER_COLUMNS_LINE_ITEM.wicboqitemfkbrief],cnt.uuid.ESTIMATE_LINEITEMS)
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
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
    _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WIC_BOQ_ITEM_FK)
    _common.select_dataFromLookups_fromModal(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WIC_BOQ_ITEM_FK,CONTAINERS_BOQ_STRUCTURE.OUTLINE_SPEC,app.InputFields.FORM_CONTROL)
    _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(1000) // Added this for container to save data
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WIC_BOQ_ITEM_FK_BRIEF,CONTAINERS_BOQ_STRUCTURE.OUTLINE_SPEC)
  });

  it("TC - Verify The outline specfication of the created BOQ is same as the desrciption of the line item", function () {
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO, BOQ_STRUCTURE_DESC)
  });

  it("TC - Assign resource to generated line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.SAVE();

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"COSTTOTAL")
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,"WQ_QUANTITY")
  });

  it("TC - Create BOQ Package by wizard", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
    _common.waitForLoaderToDisappear()
    cy.wait(2000) // This wait required as UI takes time to load
  });

  it('TC - Verify The BOQ quantity of created BOQ package is the line item WQ quantity', function () {
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'));  
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))

    _common.openTab(app.TabBar.BOQDETAILS).then(() => {
      _common.setDefaultView(app.TabBar.BOQDETAILS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_BOQS,app.GridCells.BRIEF_INFO_SMALL,BOQ_DESC)

    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQDETAILS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURE)
    });
    _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURE)
    _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE,CONTAINERS_BOQ_STRUCTURE.OUTLINE_SPEC)
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("WQ_QUANTITY"))
  })

  it('TC - Verify The BOQ final price of created BOQ package is the cost total of the line items', function () {
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("COSTTOTAL"))
  })
})