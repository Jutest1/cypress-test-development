import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const RENTEL = "Rental" + Cypress._.random(0, 999);
const ControllingUnit = "ControllingUnit" + Cypress._.random(0, 999);
const PLANTGROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANTGROUPDESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANTDESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const CODE_3 = "001" + Cypress._.random(0, 999);
const CODE_4 = "001" + Cypress._.random(0, 999);
const CODE_5 = "001" + Cypress._.random(0, 999);
const ITEM1_DESC = "Escavator" + Cypress._.random(0, 999);
const ITEM2_DESC = "Paylode" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.4 | Verify Creation of Plant from contract Module using Wizard ");

describe("LRM- 1.4 | Verify Creation of Plant from contract Module using Wizard ", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.4-verify-creation-of-plant-from-contract-module-using-wizard.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.4-verify-creation-of-plant-from-contract-module-using-wizard.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
            cy.SAVE();
        });
    })


    it("TC - Add Plant Type Data Record", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const DATATYPE_Column = this.data.DataTypes.Column_Headers;
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.searchTypeQuick, STANDARD_INPUTS.customizingModule)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.MasterData).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Data_Types, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.Data_Types, DATATYPE_Column)
        })
        _common.clear_subContainerFilter(cnt.uuid.Data_Types)
        _common.search_inSubContainer(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantType)
        _common.select_rowHasValue(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantType)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTER, STANDARD_INPUTS.check)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

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
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(ControllingUnit)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it('TC - Add New Contract And Items', function () {
        const CONTRACT_GRID = this.data.columns.contract_ColumnHeaders;
        const ITEM_GRID = this.data.columns.Items_ColumnHeaders;
        const ITEM_INPUT = this.data.items.iteminputs;
        const CONTRACT_INPUT = this.data.contract.contractInputs;
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const ITEM1_Parameter1: DataCells = {
            [app.GridCells.DESCRIPTION_1]: ITEM1_DESC,
            [app.GridCells.PRC_STRUCTURE_FK]: ITEM_INPUT.procurmentstructure,
            [app.GridCells.QUANTITY_SMALL]: ITEM_INPUT.quantity1,
            [app.GridCells.PRICE_SMALL]: ITEM_INPUT.price1,
            [app.GridCells.BAS_UOM_FK]: ITEM_INPUT.uom1,
        };
        const ITEM2_Parameter2: DataCells = {
            [app.GridCells.DESCRIPTION_1]: ITEM2_DESC,
            [app.GridCells.PRC_STRUCTURE_FK]: ITEM_INPUT.procurmentstructure,
            [app.GridCells.QUANTITY_SMALL]: ITEM_INPUT.quantity2,
            [app.GridCells.BAS_UOM_FK]: ITEM_INPUT.uom2,
            [app.GridCells.PRICE_SMALL]: ITEM_INPUT.price2,
        };
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.Contract)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTRACT_GRID)
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _procurementContractPage.enterRecord_ToCreateProcurementContract(CONTRACT_INPUT.configuration, CONTRACT_INPUT.businessPartner);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, ITEM_GRID)
        })
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM1_Parameter1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM2_Parameter2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)

    });

    it("TC - Create New Plant Group", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTGROUP_INPUTS = this.data.Plants.PlantGroupInputs;
        const PLANTGROUP_Column = this.data.columns.Column_PlantGroup;
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.PlantGroup)
        _common.openTab(app.tabBar.PlantGroupandLocations).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Plant_Group, app.FooterTab.PLANT_GROUP, 0)
            _common.setup_gridLayout(cnt.uuid.Plant_Group, PLANTGROUP_Column)
        })
        _common.create_newRecord(cnt.uuid.Plant_Group)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANTGROUP)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANTGROUPDESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.Plant_Group, app.GridCells.RUBRIC_CATEGORY_FK, STANDARDINPUTS.list, app.InputFields.INPUT_GROUP_CONTENT, PLANTGROUP_INPUTS.rubaric_catagory)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.Plant_Group)
        _common.search_inSubContainer(cnt.uuid.Plant_Group, PLANTGROUP)
        cy.wait(1000) //required wait
        _common.create_newSubRecord(cnt.uuid.Plant_Group)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CODE_3)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANTGROUP_INPUTS.description1)
        _common.edit_dropdownCellWithInput(cnt.uuid.Plant_Group, app.GridCells.RUBRIC_CATEGORY_FK, STANDARDINPUTS.list, app.InputFields.INPUT_GROUP_CONTENT, PLANTGROUP_INPUTS.rubaric_catagory)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.Plant_Group)
        _common.search_inSubContainer(cnt.uuid.Plant_Group, PLANTGROUP)
        cy.wait(1000) //required wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Plant_Group, app.GridCells.CODE, PLANTGROUP)
        _common.create_newSubRecord(cnt.uuid.Plant_Group)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CODE_4)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANTGROUP_INPUTS.description2)
        _common.edit_dropdownCellWithInput(cnt.uuid.Plant_Group, app.GridCells.RUBRIC_CATEGORY_FK, STANDARDINPUTS.list, app.InputFields.INPUT_GROUP_CONTENT, PLANTGROUP_INPUTS.rubaric_catagory)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.Plant_Group, PLANTGROUP)
        cy.wait(1000) //required wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Plant_Group, app.GridCells.CODE, PLANTGROUP)
        _common.create_newSubRecord(cnt.uuid.Plant_Group)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CODE_5)
        _common.enterRecord_inNewRow(cnt.uuid.Plant_Group, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANTGROUP_INPUTS.description3)
        _common.edit_dropdownCellWithInput(cnt.uuid.Plant_Group, app.GridCells.RUBRIC_CATEGORY_FK, STANDARDINPUTS.list, app.InputFields.INPUT_GROUP_CONTENT, PLANTGROUP_INPUTS.rubaric_catagory)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Verify Create Plant From Item", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTSINPUT = this.data.Plants.Plantsinputs;
        const PLANTS_PARAMETER: DataCells = {
            [commonLocators.CommonLabels.PLANT_CODE]: PLANT_CODE,
            [commonLocators.CommonLabels.PLANT_DESCRIPTION]: PLANTDESC,
            [commonLocators.CommonLabels.PLANT_GROUP]: PLANTGROUP,
            [commonLocators.CommonLabels.PLANT_TYPE]: RENTEL,
            [commonLocators.CommonLabels.PLANT_KIND]: PLANTSINPUT.plantKind,
        


        }
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.Contract)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
        });
        cy.wait(1000) //required wait
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.openSidebarOption(STANDARDINPUTS.Wizard)
        _common.search_fromSidebar(STANDARDINPUTS.wizard, STANDARDINPUTS.CreatePlantfromItem)
        cy.wait(1000) //required wait //required wait
        _procurementContractPage.enterRecord_CreatePlantFromContractitem(PLANTSINPUT.updateplant, PLANTSINPUT.indexplant, PLANTS_PARAMETER)
        cy.SAVE()

    })
    it('TC - Verify Plant Record In Plant Master', function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const PLANTSINPUT = this.data.Plants.Plantsinputs;
        const COLUMN_Plant = this.data.columns.Column_Plant;
        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.PlantMaster);
        _common.openTab(app.tabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Plant, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.Plant, COLUMN_Plant)
            cy.REFRESH_CONTAINER()
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).search_fromSidebar(STANDARDINPUTS.searchType, PLANT_CODE);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.selectActiveRow_inContainer(cnt.uuid.Plant)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant, app.GridCells.CODE, PLANT_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant, app.gridCells.PLANT_TYPE, RENTEL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.Plant, app.gridCells.PLANT_KIND, PLANTSINPUT.plantKind)
    })

    after(() => {
        cy.LOGOUT();
    });

});
