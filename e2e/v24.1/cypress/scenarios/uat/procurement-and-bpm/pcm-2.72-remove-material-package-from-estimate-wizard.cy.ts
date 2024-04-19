import { tile, generic, app, cnt, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _modalView, _package, _procurementConfig, _projectPage } from "cypress/pages";

import _ from "cypress/types/lodash";


const allure = Cypress.Allure.reporter.getInterface()
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.72 | Remove material package from estimate wizard")
describe("PCM- 2.72 | Remove material package from estimate wizard", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.72-remove-material-package-from-estimate-wizard.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
           Cypress.env("adminUserName"), 
            Cypress.env("adminPassword"),            
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName"));
        cy.fixture("pcm/pcm-2.72-remove-material-package-from-estimate-wizard.json").then((data) => {
            this.data = data           
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);            
        })
    }); 
    after(() => {
        cy.LOGOUT();
    });
   
    it("TC- Remove package from estimate Wizard",function(){
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const ESTIMATE_GRID = this.data.Estimate.EstimateHeader_Column
        const LINEITEM_COLOUMN = this.data.Estimate.LineItem_Column
        const RESOURCE_COLUMN = this.data.Estimate.Resource_Column
        const LINEITEM_INPUTS = this.data.Estimate.LineItemInputs
        const DataCells: DataCells={
            [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: LINEITEM_INPUTS.estimateScope,
            [commonLocators.CommonLabels.SELECT_PACKAGES]: this.data.removePackage
        }
        cy.wait(2000)
        _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARD_INPUTS.searchType,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATE_GRID);
          });
        _common.FilterCurrentEstimatesButton_inToolbar(cnt.uuid.ESTIMATE)   
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,LINEITEM_INPUTS.estimate)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE)
         cy.wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM_COLOUMN);
          });
        cy.wait(1000)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINEITEM_INPUTS.LineItemDesc)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)
        _common.openSidebarOption(STANDARD_INPUTS.wizard1)
        _common.search_fromSidebar(STANDARD_INPUTS.wizard2, LINEITEM_INPUTS.removePackage)
        _package.removePackage_wizardOptionInEstimate(DataCells)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINEITEM_INPUTS.LineItemDesc)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN);
        });
        cy.wait(1000)
        _common.search_inSubContainer(cnt.uuid.RESOURCES,LINEITEM_INPUTS.resource)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.RESOURCES,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)

        
    })
    it("TC- Delete record in package item assignment container in estimate module to remove package ",function(){
        const LINEITEM_INPUTS = this.data.Estimate.LineItemInputs
        const COLUMN_HEADER= this.data.PackageItemAssignment_ColumnHeader
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Package_Item_Assignment, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
            _common.setup_gridLayout(cnt.uuid.Package_Item_Assignment,COLUMN_HEADER);
            _common.clear_subContainerFilter(cnt.uuid.Package_Item_Assignment)
        });
        cy.wait(1000)        
        _common.create_newRecord(cnt.uuid.Package_Item_Assignment)
        _common.edit_dropdownCellWithInput(cnt.uuid.Package_Item_Assignment,app.GridCells.PRC_PACKAGE_FK,LINEITEM_INPUTS.popupType,app.InputFields.INPUT_GROUP_CONTENT,LINEITEM_INPUTS.packageNo)
        _common.edit_dropdownCellWithInput(cnt.uuid.Package_Item_Assignment,app.gridCells.PACKAGE_ITEM_ASSIGNMENT_RESOURCE,LINEITEM_INPUTS.popupType,app.InputFields.INPUT_GROUP_CONTENT,LINEITEM_INPUTS.resource)
        cy.SAVE()
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINEITEM_INPUTS.LineItemDesc)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)
        cy.wait(1000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Package_Item_Assignment, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
        })
        _common.search_inSubContainer(cnt.uuid.Package_Item_Assignment,LINEITEM_INPUTS.packageNo)
        _common.delete_recordFromContainer(cnt.uuid.Package_Item_Assignment)
        cy.SAVE()
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => { 
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        })
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo) 
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {         
             _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        })
        cy.wait(1000)
        _common.search_inSubContainer(cnt.uuid.RESOURCES,LINEITEM_INPUTS.resource)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.RESOURCES,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)
    });
    it("TC- delete record in item assignment container in package module to remove package",function(){
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs
        const LINEITEM_INPUTS = this.data.Estimate.LineItemInputs
        const COLUMN_HEADER= this.data.ItemAssignment_Column
        const PACKAGE_COLOUMNHEADER = this.data.Package_ColumnHeader
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Package_Item_Assignment, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);           
            _common.clear_subContainerFilter(cnt.uuid.Package_Item_Assignment)
        });
          cy.wait(1000)
        
        _common.create_newRecord(cnt.uuid.Package_Item_Assignment)
        _common.edit_dropdownCellWithInput(cnt.uuid.Package_Item_Assignment,app.GridCells.PRC_PACKAGE_FK,LINEITEM_INPUTS.popupType,app.InputFields.INPUT_GROUP_CONTENT,LINEITEM_INPUTS.packageNo)
        _common.edit_dropdownCellWithInput(cnt.uuid.Package_Item_Assignment,app.gridCells.PACKAGE_ITEM_ASSIGNMENT_RESOURCE,LINEITEM_INPUTS.popupType,app.InputFields.INPUT_GROUP_CONTENT,LINEITEM_INPUTS.resource)
        cy.SAVE()
        cy.wait(1000)
        _common.openSidebarOption(STANDARD_INPUTS.quickStart1)
          _common.search_fromSidebar(STANDARD_INPUTS.searchTypeQuick, STANDARD_INPUTS.Package)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, PACKAGE_COLOUMNHEADER);            
        });
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.PACKAGE,LINEITEM_INPUTS.packageNo)
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.Item_Assignment, app.FooterTab.ITEM_ASSIGNMENT, 3);
            _common.setup_gridLayout(cnt.uuid.Item_Assignment, COLUMN_HEADER);            
        });
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.Item_Assignment,LINEITEM_INPUTS.resource)
        _common.select_rowInContainer(cnt.uuid.Item_Assignment)
        _common.delete_recordFromContainer(cnt.uuid.Item_Assignment)
        cy.SAVE()
        cy.wait(1000)
        cy.REFRESH_CONTAINER()
        _common.openSidebarOption(STANDARD_INPUTS.quickStart1)
        _common.search_fromSidebar(STANDARD_INPUTS.searchTypeQuick, STANDARD_INPUTS.estimate)
        cy.wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);            
        });
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINEITEM_INPUTS.LineItemDesc)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            
        });
        cy.wait(1000)
        _common.search_inSubContainer(cnt.uuid.RESOURCES,LINEITEM_INPUTS.resource)
        _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.RESOURCES,app.GridCells.PACKAGE_ASSIGNMENTS,LINEITEM_INPUTS.packageNo)


    });

});
