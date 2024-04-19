import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _ticketSystemPage } from "cypress/pages";
import { app, tile, cnt, generic, btn } from "cypress/locators";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CONTGROUP_CODE="CG_CODE_" + Cypress._.random(0, 999);
const CONTGROUP_DESC="CG_DESC_" + Cypress._.random(0, 999);
const CG_DETAILS_DESC="CG_DESC_" + Cypress._.random(0, 999);
const AG_CODE = "AG_CODE-" + Cypress._.random(0, 999);
const AG_DESC = "AG_DESC-" + Cypress._.random(0, 999);
const AGA_CODE = "AGA_CODE-" + Cypress._.random(0, 999);
const AGA_DESC = "AGA_DESC-" + Cypress._.random(0, 999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Activity Template");

ALLURE.story("SCH- 3.11 | Control Units ");
describe("SCH- 3.11 | Control Units", () => {

    beforeEach(function () {
    cy.fixture("scheduling/sch-3.11-control-units.json")
      .then((data) => {
        this.data = data;
       });        
    });       
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("scheduling/sch-3.11-control-units.json")
          .then((data) => {
            this.data = data;
            /* Open desktop should be called in before block */
            cy.wait(1000)
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            cy.wait(1000)
          });
    });  
    after(() => {
    cy.LOGOUT();
    });
    it("TC - Set Controlling group under customizing module", function () {
        const CUSTOMIZING_INPUT = this.data.customizingInput;
        const BASIC_INPUTS = this.data.basicInputs;
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.customizing); 
        cy.wait(1000).REFRESH_CONTAINER().wait(1000).REFRESH_CONTAINER().wait(1000)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Entity_Types, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.Entity_Types,CUSTOMIZING_INPUT.ControllingGroup)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Entity_Types,app.GridCells.NAME,CUSTOMIZING_INPUT.ControllingGroup)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);   
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CONTGROUP_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTGROUP_DESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()  
        _common.waitForLoaderToDisappear()          
    })
    it("TC - Set Controlling group deatil under customizing module", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const CUSTOMIZING_INPUT = this.data.customizingInput;
        cy.wait(1000).REFRESH_CONTAINER().wait(1000).REFRESH_CONTAINER().wait(1000)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Entity_Types, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.Entity_Types,CUSTOMIZING_INPUT.ControllingGroupDetail)
        cy.REFRESH_CONTAINER()
        cy.wait(1000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Entity_Types,app.GridCells.NAME,CUSTOMIZING_INPUT.ControllingGroupDetail)
        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);   
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.gridCells.CONTROLLING_GROUP,STANDARDINPUTS.list,CONTGROUP_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CG_DETAILS_DESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()  
        _common.waitForLoaderToDisappear()          
    })
    it("TC- Create new Activity Group(s)", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.ActivityGroupsTemplates);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ActivityGroupsTemplates)
        _common.create_newRecord(cnt.uuid.ActivityGroupsTemplates)
        _common.enterRecord_inNewRow(cnt.uuid.ActivityGroupsTemplates,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AG_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.ActivityGroupsTemplates,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AG_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
    it("TC- Define 'Template Activity Properties'.", function () {
          const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
          _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.ActivityTemplates);
          cy.REFRESH_CONTAINER()
          _common.waitForLoaderToDisappear()
          _common.openTab(app.tabBar.ActivityTemplates).then(() => {
           _common.select_tabFromFooter(cnt.uuid.Activity_Groups, app.FooterTab.ACTIVITY_GROUP);
          _common.clear_subContainerFilter(cnt.uuid.Activity_Groups)
          _common.maximizeContainer(cnt.uuid.Activity_Groups)
          _common.search_inSubContainer(cnt.uuid.Activity_Groups,AG_DESC)
          _common.minimizeContainer(cnt.uuid.Activity_Groups)
          });
          _common.openTab(app.tabBar.ActivityTemplates).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Template_Activity, app.FooterTab.TEMPLATE_ACTIVITY);
          });
          _common.clear_subContainerFilter(cnt.uuid.Template_Activity)
          _common.create_newRecord(cnt.uuid.Template_Activity)
          _common.enterRecord_inNewRow(cnt.uuid.Template_Activity,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AGA_CODE)
          _common.enterRecord_inNewRow(cnt.uuid.Template_Activity,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AGA_DESC)
         cy.SAVE()
         _common.waitForLoaderToDisappear()
    });
    it("TC - Verify controlling Groups and Controlling Group Details defined in Customizing module", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openTab(app.tabBar.ActivityTemplates).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT, app.FooterTab.CONT_UNIT_GROUP_ASSIGNMENT);
         });
        _common.create_newRecord(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT,app.gridCells.CONTROLLING_GROUP,STANDARDINPUTS.grid,CONTGROUP_CODE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CONT_UNIT_GROUP_ASSIGNMENT,app.gridCells.CONTROLLING_GROUP_DETAIL,STANDARDINPUTS.grid,CG_DETAILS_DESC)
    });
});