import { tile, app, cnt,btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _package, _validate,_modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LI1-DESC-' + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS:DataCells
let LINE_ITEM_PARAMETERS_1:DataCells

let CONTAINERS_LINE_ITEM;

let CONTAINER_COLUMNS_LINE_ITEM;

let CONTAINER_COLUMNS_RESOURCE;

let CONTAINERS_RESOURCE
let RESOURCE_PARAMETERS:DataCells

let costTotal:string[]=[]
let resourceCostTotal:string[]=[]

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.16 | Assign nested assembly to line item");

describe("EST- 1.16 | Assign nested assembly to line item", () => {
  

    before(function () {

        cy.fixture("estimate/est-1.16-Assign-nested-Assembly-to-line-item.json")
          .then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                        [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[0]
            }; 
            
            LINE_ITEM_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[1]
            }

            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                  [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };

          }).then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 	
          })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new estimate record', function () {
    
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

    it("TC - Create new line item record", function () {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
            _common.waitForLoaderToDisappear()
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.estassemblyfk],cnt.uuid.ESTIMATE_LINEITEMS)
            _common.waitForLoaderToDisappear()
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Create new line item record", function () {
       
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_1);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Create resource", function () {
        
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
          _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costtotal],cnt.uuid.RESOURCES)
          _common.waitForLoaderToDisappear()
        });

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[1])

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify resource cost total and line item cost total", function () {

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[0])

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        resourceCostTotal=_common.returnArrayForMultipleCell(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL)
        _common.minimizeContainer(cnt.uuid.RESOURCES)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[0])
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL)
               .then(($lineItemCostTotal)=>{
                let costTotalVal:any=0
				for (var i in resourceCostTotal) {
					costTotalVal += (+parseFloat(resourceCostTotal[i].replace(',','')).toFixed(3));
				}
				expect(parseFloat($lineItemCostTotal.text().replace(',','')).toFixed(2)).equal(parseFloat(costTotalVal).toFixed(2))
				_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
               })
    });

    it("TC - Verify resource cost total and second line item cost total for nested assembly", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[1])

        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.select_allContainerData(cnt.uuid.RESOURCES)
        _common.clickOn_toolbarButton(cnt.uuid.RESOURCES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        resourceCostTotal=_common.returnArrayForMultipleCell(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL)
        _common.minimizeContainer(cnt.uuid.RESOURCES)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE[1])
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL)
               .then(($lineItemCostTotal)=>{
                    let costTotalVal:any=0
                    for (var i in resourceCostTotal) {
                        costTotalVal += (+parseFloat(resourceCostTotal[i].replace(',','')).toFixed(3));
                    }
                    expect(parseFloat($lineItemCostTotal.text().replace(',','')).toFixed(2)).equal(parseFloat(costTotalVal).toFixed(2))
                    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
               })
    });
})
