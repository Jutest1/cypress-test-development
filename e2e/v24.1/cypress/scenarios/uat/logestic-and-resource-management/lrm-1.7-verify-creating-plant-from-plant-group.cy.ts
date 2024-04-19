import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, generic, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const PLANTGROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANTGROUPDESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANTDESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.7 | Verify Creating Plant From Plant Group");

describe("LRM- 1.7 | Verify Creating Plant From Plant Group", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.7-verify-creating-plant-from-plant-group.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.7-verify-creating-plant-from-plant-group.json").then((data) => {
            this.data = data;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.Projects)
            });
        });
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
    it('TC - Verify Plant Record In Plant Master', function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const COLUMN_Plant = this.data.columns.Column_Plant;
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
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant, app.GridCells.DESCRIPTION_INFO, PLANTDESC)
    })

    after(() => {
        cy.LOGOUT();
    });

});
