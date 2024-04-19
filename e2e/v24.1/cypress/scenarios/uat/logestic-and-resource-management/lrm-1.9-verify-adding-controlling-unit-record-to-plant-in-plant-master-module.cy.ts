import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, generic, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const PLANTGROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANTGROUPDESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANTDESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const CONTROLLING_DESC = "ControllingUnit" + Cypress._.random(0, 999);
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.9 | Verify Adding Controlling Unit Record To Plant In Plant Master Module");

describe("LRM- 1.9 | Verify Adding Controlling Unit Record To Plant In Plant Master Module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.9-verify-adding-controlling-unit-record-to-plant-in-plant-master-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.9-verify-adding-controlling-unit-record-to-plant-in-plant-master-module.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.Projects)
            });
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
            cy.SAVE();
    
        });
    })
    it("TC - Add Controlling Unit", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const CU_COLUMN = this.data.Column_ControllingUnit

        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.ControllingUnits)
        cy.REFRESH_CONTAINER()
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
        _common.openTab(app.tabBar.controllingStructure).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CU_COLUMN)
            _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(CONTROLLING_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create New Plant Group", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTGROUP_INPUTS = this.data.Plants.PlantGroupInputs;
        const PLANTGROUP_Column = this.data.columns.Column_PlantGroup;
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.PlantGroup)
        _common.openTab(app.tabBar.PlantGroupandLocations).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Plant_Group, app.FooterTab.PLANT_GROUP, 0)
            _common.setup_gridLayout(cnt.uuid.Plant_Group, PLANTGROUP_Column)
            _common.clear_subContainerFilter(cnt.uuid.Plant_Group)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.select_allContainerData(cnt.uuid.Plant_Group)
        _common.clickToolbarButton(cnt.uuid.Plant_Group,btn.toolbar.collapseAll)
        _common.create_newRecord(cnt.uuid.Plant_Group)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANTGROUP)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANTGROUPDESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.Plant_Group, app.GridCells.RUBRIC_CATEGORY_FK, STANDARDINPUTS.list, app.InputFields.INPUT_GROUP_CONTENT, PLANTGROUP_INPUTS.rubaric_catagory)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Verify Create Plant From Plant Group", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTSINPUT = this.data.Plants.Plantsinputs;
        const PLANTS_PARAMETER: DataCells = {
            [commonLocators.CommonKeys.CODE]: PLANT_CODE,
            [commonLocators.CommonLabels.DESCRIPTION]: PLANTDESC,
            [commonLocators.CommonLabels.PLANT_TYPE]: PLANTSINPUT.plant_type,
            [commonLocators.CommonLabels.PLANT_KIND]: PLANTSINPUT.plantKind,
            [commonLocators.CommonLabels.STRUCTURE]: PLANTSINPUT.Structure,
        }
        _common.openSidebarOption(STANDARDINPUTS.Wizard)
        _common.search_fromSidebar(STANDARDINPUTS.wizard, STANDARDINPUTS.CreatePlant)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait 
        _logesticPage.enterRecord_CreatePlantFromPlantGroup( PLANTS_PARAMETER)
        _common.waitForLoaderToDisappear()

    })
    it('TC - Verify Adding Controlling Unit Record To Plant In Plant Master Module', function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const COLUMN_Plant = this.data.columns.Column_Plant;
        const COLUMN_Plant_Controlling = this.data.columns.COLUMN_Plant_Controlling;
        _common.openTab(app.tabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Plant, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.Plant, COLUMN_Plant)
            _common.clear_subContainerFilter(cnt.uuid.Plant)
            cy.REFRESH_CONTAINER()
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).search_fromSidebar(STANDARDINPUTS.searchType, PLANT_CODE);
        _common.waitForLoaderToDisappear()
        _common.selectActiveRow_inContainer(cnt.uuid.Plant)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant, app.GridCells.CODE, PLANT_CODE)
        _common.openTab(app.tabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Plant_Controlling, app.FooterTab.CONTROLLING_UNIT, 2)
            _common.setup_gridLayout(cnt.uuid.Plant_Controlling, COLUMN_Plant_Controlling)
            _common.clear_subContainerFilter(cnt.uuid.Plant_Controlling)
        });
        _common.create_newRecord(cnt.uuid.Plant_Controlling)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.edit_dropdownCellWithInput(cnt.uuid.Plant_Controlling,app.GridCells.CONTROLLING_UNIT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,CONTROLLING_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.Plant_Controlling)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant_Controlling, app.gridCells.ControllingUnitDescription, CONTROLLING_DESC)
    })


    after(() => {
        cy.LOGOUT();
    });

});
