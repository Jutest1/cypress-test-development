import { _boqPage, _common, _estimatePage, _validate, _wicpage, _projectPage} from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="08" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const WIC_GROUP_CODE = "R_" + Cypress._.random(0, 999)
const WIC_GROUP_DESC = "RWIC-" + Cypress._.random(0, 999)
let CONTAINER_COLUMNS_WIC_GROUPS

const WIC_CATALOG_SPEC = "RBoQ-" + Cypress._.random(0, 999)
let CONTAINER_COLUMNS_WIC_CATALOGUES
let WIC_CATALOGUES_PARAMETERS:DataCells

const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_1 = "BOQ1-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS_1:DataCells
let CONTAINERS_BOQ_STRUCTURE


const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

const LINE_ITEM_DESC="LIESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_1="LI1ESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_2="LI1ESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let LINE_ITEM_PARAMETERS:DataCells
let LINE_ITEM_PARAMETERS_1:DataCells
let LINE_ITEM_PARAMETERS_2:DataCells


let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.33 | Generate Project BoQ from Line item with grouping criteria WIC Item Ref. No.");

describe("EST- 3.33 | Generate Project BoQ from Line item with grouping criteria WIC Item Ref. No.", () => {

    before(function () {
        cy.fixture("estimate/est-3.33-generate-project-boq-from-line-item-with-grouping-criteria-wic-item-ref-no.json")
          .then((data) => {
            this.data=data
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINER_COLUMNS_WIC_GROUPS=this.data.CONTAINER_COLUMNS.WIC_GROUPS

            CONTAINER_COLUMNS_WIC_CATALOGUES=this.data.CONTAINER_COLUMNS.WIC_CATALOGUES
            WIC_CATALOGUES_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:WIC_CATALOG_SPEC
            }

            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
			BOQ_STRUCTURE_PARAMETERS={
				[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
				[ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
				[app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM[0]
			}
            BOQ_STRUCTURE_PARAMETERS_1={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC_1,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM[1]
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            LINE_ITEM_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:LINE_ITEM_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_LINE_ITEM.QUANTITY[0],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_LINE_ITEM.UOM[0],
                [app.GridCells.WIC_BOQ_ITEM_FK]:BOQ_STRUCTURE_DESC
            }
            LINE_ITEM_PARAMETERS_1={
                [app.GridCells.DESCRIPTION_INFO]:LINE_ITEM_DESC_1,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_LINE_ITEM.QUANTITY[1],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_LINE_ITEM.UOM[1],
                [app.GridCells.WIC_BOQ_ITEM_FK]:BOQ_STRUCTURE_DESC_1
            }
            LINE_ITEM_PARAMETERS_2={
                [app.GridCells.DESCRIPTION_INFO]:LINE_ITEM_DESC_2,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_LINE_ITEM.QUANTITY[2],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_LINE_ITEM.UOM[2],
                [app.GridCells.WIC_BOQ_ITEM_FK]:BOQ_STRUCTURE_DESC_1
            }

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
            };

            CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE_VIA_BOQ
          })
          .then(()=>{
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

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create a WIC BoQ with multiple BoQ items", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIC).then(() => {
            _common.setDefaultView(app.TabBar.WIC,commonLocators.CommonKeys.DEFAULT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0);
            _common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUPS)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.WIC_GROUPS)
        _common.create_newRecord(cnt.uuid.WIC_GROUPS)
        _common.waitForLoaderToDisappear()
        _wicpage.enterRecord_toCreateWICGroup(WIC_GROUP_CODE, WIC_GROUP_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIC).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WIC_CATALOGS, 1)
            _common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOGUES)
        });
       
        _common.clear_subContainerFilter(cnt.uuid.WIC_CATALOGUES)
        _common.create_newRecord(cnt.uuid.WIC_CATALOGUES)
        _wicpage.enterRecord_toCreateWICCatalogs(cnt.uuid.WIC_CATALOGUES,WIC_CATALOGUES_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.goToButton_inActiveRow(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE,btn.ToolBar.ICO_GO_TO, BOQ_ROOT_ITEM)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk,CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS_1);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create new estimate record', function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
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

    it("TC - Create a new Line item and Assign Resources to Line Items", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.wicboqitemfk,CONTAINER_COLUMNS_LINE_ITEM.costtotal],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESC)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL,"COST_TOTAL_1")


      
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESC_1)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL,"COST_TOTAL_2")

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESC_2)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL,"COST_TOTAL_3")

        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_PROJECT_BOQ_FROM_LI);
        _estimatePage.generate_projectBoqFromLineItems_fromWizard(commonLocators.CommonKeys.WIC_ITEM_REF_NO)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

    })

    it("TC - Verify Generated BoQ Items in BoQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
        _common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.search_inSubContainer(cnt.uuid.BOQS, WIC_CATALOG_SPEC);
		_common.select_rowHasValue(cnt.uuid.BOQS, WIC_CATALOG_SPEC)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);

		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ.price,CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ.boqlinetypefk,CONTAINER_COLUMNS_BOQ_STRUCTURE_VIA_BOQ.finalprice],cnt.uuid.BOQ_STRUCTURES)
        });

		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
		_common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_UOM_FK,CONTAINERS_BOQ_STRUCTURE.UOM[0])
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL,CONTAINERS_BOQ_STRUCTURE.QUANTITY[0])
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
               .then(($finalPrice)=>{
                    expect(parseFloat(Cypress.env("COST_TOTAL_1").toString().replace(',','')).toFixed(0)).contains(parseFloat($finalPrice.text().replace(',','')).toFixed(0))
               })
		_common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_DESC_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BAS_UOM_FK,CONTAINERS_BOQ_STRUCTURE.UOM[1])
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES,app.GridCells.QUANTITY_SMALL,CONTAINERS_BOQ_STRUCTURE.QUANTITY[1])
        let costTotal2:any=parseFloat(Cypress.env("COST_TOTAL_2").toString().replace(',','')).toFixed(0)
        let costTotal3:any=parseFloat(Cypress.env("COST_TOTAL_3").toString().replace(',','')).toFixed(0)
        let finalPrice:any=(+costTotal2)+(+costTotal3)
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
               .then(($finalPrices)=>{
                    expect(parseFloat(finalPrice.toString()).toFixed(0)).contains(parseFloat($finalPrices.text().replace(',','')).toFixed(0))
               })
    })

})
