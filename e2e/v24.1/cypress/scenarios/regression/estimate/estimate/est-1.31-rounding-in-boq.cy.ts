import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ROUNDING_DESC = "ROUND-DESC-" + Cypress._.random(0, 999)
const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE
let CONTAINERS_DATA_TYPE
let CONTAINER_COLUMNS_DATA_TYPE
let CONTAINERS_DATA_RECORD
let MODAL_ROUNDING_CONFIGURATION_WITH_ROUNDING
let MODAL_ROUNDING_CONFIGURATION_WITHOUT_ROUNDING
let MODAL_ROUNDING_CONFIGURATION_ROUNDING

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.31 | Rounding in BOQ");

describe("EST- 1.31 | Rounding in BOQ ", () => {

    before(function () {
        cy.fixture("estimate/est-1.31-rounding-in-boq.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
            BOQ_PARAMETERS={
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
            }
            CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
            BOQ_STRUCTURE_PARAMETERS={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
                [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
            }
            CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINERS_DATA_TYPE=this.data.CONTAINERS.DATA_TYPE
            CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE
            CONTAINERS_DATA_RECORD=this.data.CONTAINERS.DATA_RECORD

            MODAL_ROUNDING_CONFIGURATION_WITH_ROUNDING=this.data.MODAL.ROUNDING_CONFIGURATION.WITH_ROUNDING
            MODAL_ROUNDING_CONFIGURATION_WITHOUT_ROUNDING=this.data.MODAL.ROUNDING_CONFIGURATION.WITHOUT_ROUNDING
            MODAL_ROUNDING_CONFIGURATION_ROUNDING=this.data.MODAL.ROUNDING_CONFIGURATION.ROUNDING

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
            _common.waitForLoaderToDisappear()   
       })
    })

    after(() => {
        cy.LOGOUT();
    })


    it("TC - Create rounding configuration data record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.setDefaultView(app.TabBar.MASTERDATA,commonLocators.CommonKeys.DEFAULT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPE.TYPE)

        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _estimatePage.enterRecord_toCreateRoundingDataRecord(cnt.uuid.DATA_RECORDS, ROUNDING_DESC, CONTAINERS_DATA_RECORD.LINE_ITEM_CONTEXT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create BOQ header and BOQ structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
        _common.waitForLoaderToDisappear()   

        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.maximizeContainer(cnt.uuid.BOQS)
        _common.create_newRecord(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
    });

    it("TC - Verify Rounding in BoQ", function () {
        _estimatePage.boq_RoundingConfiguration(ROUNDING_DESC, MODAL_ROUNDING_CONFIGURATION_ROUNDING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });        
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY[1]);
		_common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[1]);
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_roundingUnderBoQStructure(commonLocators.CommonKeys.QUANTITY, commonLocators.CommonKeys.ROUNDING, 5, 3, 102.66667, 0, 0)
       _validate.verify_roundingUnderBoQStructure(commonLocators.CommonKeys.UNIT_RATE, commonLocators.CommonKeys.ROUNDING, 4, 2, 0, 27.6666, 0)
       _validate.verify_roundingUnderBoQStructure(commonLocators.CommonKeys.FINAL_PRICE_IN, commonLocators.CommonKeys.ROUNDING, 6, 3, 0, 0, 1)
        
        
        _estimatePage.boq_RoundingConfiguration(ROUNDING_DESC, MODAL_ROUNDING_CONFIGURATION_WITHOUT_ROUNDING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });        
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY[2]);
		_common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[2]);
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       _validate.verify_roundingUnderBoQStructure(commonLocators.CommonKeys.FINAL_PRICE, commonLocators.CommonKeys.ROUNDING, 4, 2, 101.6666, 26.6666, 0)
        
        
        _estimatePage.boq_RoundingConfiguration(ROUNDING_DESC, MODAL_ROUNDING_CONFIGURATION_WITH_ROUNDING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });        
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.BOQ_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.QUANTITY[3]);
		_common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[3]);
        _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       _validate.verify_roundingUnderBoQStructure(commonLocators.CommonKeys.FINAL_PRICE, commonLocators.CommonKeys.WITHOUT_ROUNDING, 4, 2, 100.6666, 25.6666, 0)
    });
});
