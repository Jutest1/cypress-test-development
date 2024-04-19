import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage, _package, _assembliesPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const PRICE_CONDITION_CODE_1 = "PCC-" + Cypress._.random(0, 999);
const PRICE_CONDITION_CODE_2 = "PCC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESCRIPTION_1 = "A-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESCRIPTION_2 = "B-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESCRIPTION_3 = "C-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ-" + Cypress._.random(0, 999)
const CLERK_NAME = "HS"
const BOQ_DESCRIPTION = "BOQ-DESC-" + Cypress._.random(0, 999);
const DATA_RECORD_DESC_1 = "PC-DESC-1-" + Cypress._.random(0, 999);
const DATA_RECORD_DESC_2 = "PC-DESC-2-" + Cypress._.random(0, 999);
const PRICE_CONDITION_DESC = "PRICE_CONDITION_DESC-" + Cypress._.random(0, 999);
const BOQ_PC_TYPE = 'BOQ_PC_TYPE'

let CONTAINERS_DATA_RECORDS,
    CONTAINERS_DATA_TYPES,
    CONTAINER_COLUMNS_DATA_RECORDS,
    BOQ_PARAMETERS: DataCells,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_BOQ_STRUCTURE,
    BOQ_STRUCTURE_PARAMETERS_1: DataCells,
    BOQ_STRUCTURE_PARAMETERS_2: DataCells,
    BOQ_STRUCTURE_PARAMETERS_3: DataCells,
    PROJECT_PARAMETERS: DataCells,
    RULES

ALLURE.epic("BOQ");
ALLURE.feature("BoQ");
ALLURE.story("BOQ- 2.3 | Verify Assigining BoQ Price Condition Type to multiple BoQ Item using Bulk Editor and checking Result in the 'BoQ Price Condition' container in BoQ Module");

describe("BOQ- 2.3 | Verify Assigining BoQ Price Condition Type to multiple BoQ Item using Bulk Editor and checking Result in the 'BoQ Price Condition' container in BoQ Module", () => {
    before(function () {
        cy.fixture("boq/boq-2.3-verify-assigning-BoQ-price-condition-type-to-multiple-BoQ-item-using-bulk-editor.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            RULES = this.data.CONTAINERS.CREATE_NEW_RULE
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            };
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESCRIPTION
            }
            BOQ_STRUCTURE_PARAMETERS_1 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESCRIPTION_1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
            }
            BOQ_STRUCTURE_PARAMETERS_2 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESCRIPTION_2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[1],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1],
            }
            BOQ_STRUCTURE_PARAMETERS_3 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESCRIPTION_3,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[2],
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[2],
            }
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            cy.wait(2000)//required wait to load page
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            cy.wait(2000)//required wait to load page
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            cy.SAVE()
            cy.wait(2000)//required wait to load page
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME).pinnedItem();
        });
    })

    it("TC - Precondition : system option in customizing  Automatically push the budget = 0", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_CONDITION_TYPE)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CONTAINERS_DATA_TYPES.PRICE_CONDITION_TYPE)
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
            _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PRICE_CONDITION_CODE_1);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATA_RECORD_DESC_1);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_DATA_RECORDS.VALUE[0]);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.FORMULA_SMALL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_DATA_RECORDS.FORMULA[0]);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.HAS_TOTAL, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PRINTED, commonLocators.CommonKeys.CHECK)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PRICE_CONDITION_CODE_2);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATA_RECORD_DESC_2);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_DATA_RECORDS.VALUE[1]);
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.FORMULA_SMALL, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINERS_DATA_RECORDS.FORMULA[1]);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.HAS_TOTAL, commonLocators.CommonKeys.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_PRINTED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        cy.wait(2000)//required wait to load page
    });

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create price condition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PRICE_CONDITION);
        cy.wait(4000)//required wait to load page
        _common.create_newRecord(cnt.uuid.PRICE_CONDITION)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_CONDITION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_CONDITION_DESC);
        _common.create_newRecord(cnt.uuid.PRICE_CONDITION_DETAILS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_CONDITION_DETAILS, app.GridCells.PRICE_CONDITION_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICE_CONDITION_CODE_1)
        _common.create_newRecord(cnt.uuid.PRICE_CONDITION_DETAILS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_CONDITION_DETAILS, app.GridCells.PRICE_CONDITION_TYPE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICE_CONDITION_CODE_2)
        cy.SAVE()
        cy.wait(2000)//required wait to load page
    });

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        cy.wait(2000)//required wait to load page
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NAME)
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        cy.wait(2000)//required wait to load page
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_1);
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_2);
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS_3);
        cy.SAVE()
        cy.wait(2000)//required wait to load page
    });

    it("TC - Duplicate Records should not be present in the 'BoQ Price Condition' container for individual selected BoQ Item Record", function () {
        const RULES = [
            {
                "FieldName": "Price Condition",
                "Option": "Set Value to",
                "OptionData": PRICE_CONDITION_DESC
            }
        ]
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_multipleCellHasICON(cnt.uuid.BOQ_STRUCTURES, app.GridCells.TREE, btn.IconButtons.ICO_BOQ_ITEM)
        _common.clickOn_cellHasIcon
        _estimatePage.bulkEditor_createNewRule(cnt.uuid.BOQ_STRUCTURES, "Price Condition", RULES)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_PRICE_CONDITION, app.FooterTab.BOQ_PRICE_CONDITION, 2);
        });
        _common.clickOn_cellHasValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESCRIPTION_1)
        _common.getText_fromCell_storeInArray(cnt.uuid.BOQ_PRICE_CONDITION, app.GridCells.PRC_PRICE_CONDITION_TYPE_FK, BOQ_PC_TYPE)
        cy.wait(1000).then(() => { //required wait to load page
            const uniqueValues = Array.from(new Set(Cypress.env("BOQ_PC_TYPE")));
            const hasDuplicates = Cypress.env("BOQ_PC_TYPE").length !== uniqueValues.length;
            expect(hasDuplicates).to.be.true;
        })
        _common.clickOn_cellHasValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESCRIPTION_2)
        _common.getText_fromCell_storeInArray(cnt.uuid.BOQ_PRICE_CONDITION, app.GridCells.PRC_PRICE_CONDITION_TYPE_FK, BOQ_PC_TYPE)
        cy.wait(1000).then(() => { //required wait to load page
            const uniqueValues = Array.from(new Set(Cypress.env("BOQ_PC_TYPE")));
            const hasDuplicates = Cypress.env("BOQ_PC_TYPE").length !== uniqueValues.length;
            expect(hasDuplicates).to.be.true;
        })
        _common.clickOn_cellHasValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCTURE_DESCRIPTION_3)
        _common.getText_fromCell_storeInArray(cnt.uuid.BOQ_PRICE_CONDITION, app.GridCells.PRC_PRICE_CONDITION_TYPE_FK, BOQ_PC_TYPE)
        cy.wait(1000).then(() => { //required wait to load page
            const uniqueValues = Array.from(new Set(Cypress.env("BOQ_PC_TYPE")));
            const hasDuplicates = Cypress.env("BOQ_PC_TYPE").length !== uniqueValues.length;
            expect(hasDuplicates).to.be.true;
        })
    });
});