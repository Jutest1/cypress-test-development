import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage } from "cypress/pages";

import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface()
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const DATARECORD = "PA-" + Cypress._.random(0, 999);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DATARECORDSHORTKEY = alphabet.charAt(Cypress._.random(0, 25)) + alphabet.charAt(Cypress._.random(0, 25));
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LI-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.71 | Assign Protected assembly to the line item")
describe("EST- 1.71 | Assign Protected assembly to the line item", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-1.71-assign-protected-assembly-to-the-line-item.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.clearAllLocalStorage()
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-1.71-assign-protected-assembly-to-the-line-item.json").then((data) => {
            this.data = data
            const sideBarAction = this.data.sidebarInputs.sidebar
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
            cy.wait(500).SAVE()
            _common.openSidebarOption(sideBarAction.search).delete_pinnedItem().search_fromSidebar(sideBarAction.Standard, PRJ_NO).pinnedItem();
        })
    });
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Verify Create data record and assign to assemby', function () {
        const COSTGROUPINPUT = this.data.CreateCostGroup.CostGroupInputs
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        const DATARECORDINPUTS = this.data.dataRecordPage.dataRecordInputs
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.customizing)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Entity_Types, app.FooterTab.DATA_TYPES, 0);
        });
        _common.search_inSubContainer(cnt.uuid.Entity_Types, COSTGROUPINPUT.searchEntity)
        cy.wait(2000)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);

            _common.create_newRecord(cnt.uuid.INSTANCES)
        });

        
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.gridCells.ESTASSEMBLYTYPE, SIDEBARACTION.popupType, DATARECORDINPUTS.estAssemblyType)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATARECORD)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.gridCells.SHORTKEYINFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATARECORDSHORTKEY)
        cy.SAVE().wait(1000)
    })


    it('TC - Verify Create data record and assign to assemby', function () {
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        const ASSEMBLYCATEGRID = this.data.assemblyCategories_ColumnHeaders.ColumnHeaders
        const ASSEMBLYCATEINPUTS = this.data.assemblyCategoryPage.assemblyCategoryInputs
        const ASSEMBLRESOURCEINPUTS = this.data.assemblyResourcePage.assembyResourceInputs
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.assemblies)
        cy.wait(2000)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLYCATEGRID)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATEINPUTS.description)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.gridCells.ESTASSEMBLYTYPEFK,SIDEBARACTION.popupType1,app.InputFields.INPUT_GROUP_CONTENT,DATARECORDSHORTKEY)
        cy.SAVE().wait(1000)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.CODE,"ASSEMCATCODE")
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATEINPUTS.assemblyDesc)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,ASSEMBLRESOURCEINPUTS.code1)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,"ASSEMBLYRESCOURCECODE1")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,ASSEMBLRESOURCEINPUTS.code2)
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,"ASSEMBLYRESCOURCECODE2")
    })

    it('TC - Verify Create Estimate and Line Item,Resources', function () {
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        const ESTIMATEINPUTS = this.data.EstimateHeader.EstimateHeaderInputs;
        const ESTIMATEGRID = this.data.estimate_ColumnHeaders.column_headers
        const LINEITEMGRID = this.data.lineItem_ColumnHeaders.column_headers
        const LINEITEMINPUTS = this.data.lineItemPage.lineItemInputs
        const RESOURCEINPUTS = this.data.AssignResource.resourceInputs
        const RESOURCEGRID = this.data.resources_ColumnHeaders.column_headers;
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.project)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATEGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(ESTIMATEINPUTS.newCode, EST_DESC, ESTIMATEINPUTS.rubricCategory, ESTIMATEINPUTS.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        cy.wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMGRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(LINEITEM_DESC,LINEITEMINPUTS.quantity,LINEITEMINPUTS.uom)
        cy.SAVE().wait(2000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCEGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(DATARECORDSHORTKEY, RESOURCEINPUTS.code);
        cy.SAVE().wait(3000)
    })

    it('TC - Verify Assemblies should be added to the resource', function () {
        const ASSEMBLRESOURCEINPUTS = this.data.assemblyResourcePage.assembyResourceInputs
        _common.expandAll(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,ASSEMBLRESOURCEINPUTS.code1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,Cypress.env("ASSEMBLYRESCOURCECODE1"))
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,"notVisibleRow")
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,"notVisibleRow")
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,ASSEMBLRESOURCEINPUTS.code2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,Cypress.env("ASSEMBLYRESCOURCECODE2"))
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,"notVisibleRow")
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,"notVisibleRow")
    })
})