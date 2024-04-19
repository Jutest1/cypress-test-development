import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

const OUTLINE_SPECIFICATION = 'OUTLINE_SPECIFICATION',
    FINAL_PRICE = 'FINAL_PRICE',
    OUTLINE_SPECIFICATION_2 = 'OUTLINE_SPECIFICATION_2',
    FINAL_PRICE_2 = 'FINAL_PRICE_2',
    BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999),
    BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);

let BOQ_PARAMETERS: DataCells,
    BOQ_STRUCTURE_PARAMETERS: DataCells,
    SOURCE_WIC_BOQ_PARAMETERS: DataCells,
    SOURCE_WIC_BOQ_PARAMETER_1: DataCells

let CONTAINER_COLUMNS_BOQS,
    CONTAINERS_BOQ_STRUCTURE,
    CONTAINER_COLUMNS_BOQ_STRUCTURE,
    CONTAINERS_SOURCE_WIC_BOQ,
    CONTAINER_COLUMNS_SOURCE_BOQ

allure.epic("PROCUREMENT AND BPM");
allure.feature("Material");
allure.story("PCM- 1.24 | Copy from other BoQ");
describe("PCM- 1.24 | Copy from other BoQ", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.24-copy-from-other-boq.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQ
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE;
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_SOURCE_WIC_BOQ = this.data.CONTAINERS.SOURCE_WIC_BOQ;
            CONTAINER_COLUMNS_SOURCE_BOQ = this.data.CONTAINER_COLUMNS.SOURCE_BOQ
            BOQ_PARAMETERS = {
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
            }
            BOQ_STRUCTURE_PARAMETERS = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            }
            SOURCE_WIC_BOQ_PARAMETERS = {
                [commonLocators.CommonLabels.COPY_FROM]: CONTAINERS_SOURCE_WIC_BOQ.WIC_BOQ,
                [commonLocators.CommonLabels.WIC_GROUP]: CONTAINERS_SOURCE_WIC_BOQ.WIC_GROUP,
                [commonLocators.CommonLabels.BOQ_SELECTION]: CONTAINERS_SOURCE_WIC_BOQ.BOQ_SELECTION
            }
            SOURCE_WIC_BOQ_PARAMETER_1 = {
                [commonLocators.CommonLabels.COPY_FROM]: commonLocators.CommonKeys.PROJECT_BOQ,
                [commonLocators.CommonLabels.PROJECT]: CONTAINERS_SOURCE_WIC_BOQ.PROJECT,
                [commonLocators.CommonLabels.WIC_GROUP]: CONTAINERS_SOURCE_WIC_BOQ.WIC_GROUP,
                [commonLocators.CommonLabels.BOQ_SELECTION]: CONTAINERS_SOURCE_WIC_BOQ.BOQ_SELECTION
            }

            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Verify Boq Structure Record", function () {
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        cy.wait(2000) //required wait to load page
    })

    it("TC - Verify in source boq contianer, check copy from WIC boq", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
            _validate.verify_sourceBoQ_label(cnt.uuid.BOQSOURCE, commonLocators.CommonLabels.COPY_FROM, commonLocators.CommonKeys.WIC_BOQ)
        })
    })

    it("TC - Verify wic group and boq selection filter correct", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
            _common.maximizeContainer(cnt.uuid.BOQSOURCE)
            _boqPage.selectRecord_forSourceBoQ(cnt.uuid.BOQSOURCE, SOURCE_WIC_BOQ_PARAMETERS)
            cy.SAVE()
            _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
            cy.SAVE()
            cy.wait(2000) //required wait to load page
            _common.clickOn_cellHasIconWithIndex(cnt.uuid.BOQSOURCE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM, 2)
            cy.wait(1000) //required wait to load page
            _common.saveCellDataToEnv(cnt.uuid.BOQSOURCE, app.GridCells.BRIEF_INFO_SMALL, OUTLINE_SPECIFICATION)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQSOURCE, btn.ButtonText.COPY)
            _common.minimizeContainer(cnt.uuid.BOQSOURCE)
        })
    })

    it("TC - Verify drag a boq item to boq structure container to create boq item", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
            _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
            cy.wait(2000) //required wait to load page
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.POSITION)
            cy.wait(2000)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQ_STRUCTURES, btn.ButtonText.PASTE)
            _common.waitForLoaderToDisappear()
            cy.wait(2000)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            cy.wait(2000)
            _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, Cypress.env(OUTLINE_SPECIFICATION))
            _common.delete_recordFromContainer(cnt.uuid.BOQ_STRUCTURES)
            cy.SAVE()
            _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_SOURCE_BOQ.finalprice, CONTAINER_COLUMNS_SOURCE_BOQ.boqlinetypefk,], cnt.uuid.BOQSOURCE)
        })
    });

    it("TC - Verify copy WIC group BoQ selection 'Division' and paste selected BoQ in 'BoQ structure'", function () {
        cy.wait(2000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQSOURCE, app.GridCells.BOQ_LINE_TYPE_FK, "Gewerk")
        cy.wait(2000) //required wait to load page
        _common.saveCellDataToEnv(cnt.uuid.BOQSOURCE, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE)
        cy.wait(1000)
        _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQSOURCE, btn.ButtonText.COPY)
        cy.wait(1000)
    })

    it("TC - Verify wic boq and check calculation'", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.LEVEL_1)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQ_STRUCTURES, btn.ButtonText.PASTE)
            cy.wait(15000)  // this wait is required to reflect copied values after paste
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            cy.wait(1000)
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(FINAL_PRICE))
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.delete_recordFromContainer(cnt.uuid.BOQ_STRUCTURES)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
        })
    });

    it("TC - Verify Project wic group and boq selection filter correct", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 2)
            _common.maximizeContainer(cnt.uuid.BOQSOURCE)
            _boqPage.selectRecord_forSourceBoQ(cnt.uuid.BOQSOURCE, SOURCE_WIC_BOQ_PARAMETER_1)
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.BOQSOURCE)
            _common.clickOn_cellHasIconWithIndex(cnt.uuid.BOQSOURCE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM, 1)
            _common.saveCellDataToEnv(cnt.uuid.BOQSOURCE, app.GridCells.BRIEF_INFO_SMALL, OUTLINE_SPECIFICATION_2)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQSOURCE, btn.ButtonText.COPY)
            _common.minimizeContainer(cnt.uuid.BOQSOURCE)
        })
    })

    it("TC - Verify Copy Project WIC", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
            cy.wait(2000) //required wait to load page
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.POSITION)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQ_STRUCTURES, btn.ButtonText.PASTE)
            cy.wait(10000) // this wait is required to reflect copied values after paste
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, Cypress.env(OUTLINE_SPECIFICATION_2))
            _common.delete_recordFromContainer(cnt.uuid.BOQ_STRUCTURES)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQSOURCE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_SOURCE_WIC_BOQ.BOQ_STRUCTURE_FOLDER)
            _common.saveCellDataToEnv(cnt.uuid.BOQSOURCE, app.GridCells.FINAL_PRICE_SMALL, FINAL_PRICE_2)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQSOURCE, btn.ButtonText.COPY)
        })
    });

    it("TC - Verify Project Boq and check calculation'", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES, Buttons.ToolBar.ICO_TREE_EXPAND_ALL)
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.LEVEL_2)
            _common.clickOn_toolBarButtonWithTitle(cnt.uuid.BOQ_STRUCTURES, btn.ButtonText.PASTE)
            cy.wait(10000) // this wait is required to reflect copied values after paste
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(FINAL_PRICE_2))
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.delete_recordFromContainer(cnt.uuid.BOQ_STRUCTURES)
            cy.SAVE()
        })
    });
});