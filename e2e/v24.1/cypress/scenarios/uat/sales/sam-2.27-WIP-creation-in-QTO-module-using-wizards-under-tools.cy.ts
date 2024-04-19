import cypress from "cypress";

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const QTO_DESC = "QTO-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJNO-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJNAME-" + Cypress._.random(0, 999);


allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 2.27 | WIP creation in QTO module using wizards under tools")

describe("SAM- 2.27 | WIP creation in QTO module using wizards under tools", () => {
    beforeEach(function () {
        cy.fixture("sam/sam-2.27-WIP-creation-in-QTO-module-using-wizards-under-tools.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-2.27-WIP-creation-in-QTO-module-using-wizards-under-tools.json").then((data) => {
            this.data = data;
            const standardInputs = this.data.Prerequisites.SidebarInputs;
            /* Open desktop should be called in before block */

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, "HS");
            _common.waitForLoaderToDisappear()
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.openSidebarOption(standardInputs.Search).delete_pinnedItem();
            _common.search_fromSidebar(standardInputs.searchType, PRJ_NO).pinnedItem();
        });
    });

    it("TC - Create new BoQ header", function () {
        const BOQ_HEADER_GRID = this.data.BoQHeader.Column_Headers

        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.setDefaultView(app.tabBar.BoQs)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_HEADER_GRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(BOQ_HEADER_DESC)
        _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO, BOQ_HEADER_DESC, BOQ_ROOT_ITEM)
        cy.SAVE();
        _boqPage.textOfBoQCode();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    });

    it("TC - Create BoQ Structure", function () {

        const BOQSTRUCTUREGRID = this.data.BoqStructure.Column_Headers;
        const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
        const DataCells: DataCells = {
            [app.GridCells.BRIEF_INFO]: BOQSTRUCT_DESC,
            [app.GridCells.QUANTITY_SMALL]: BOQSTRUCTUREINPUTS.Quantity,
            [ app.GridCells.PRICE]: BOQSTRUCTUREINPUTS.UnitRate,
            [app.GridCells.BAS_UOM_FK]: BOQSTRUCTUREINPUTS.Uom
        };
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID)
        });
        _boqPage.enterRecord_toCreateBoQStructure_V1(cnt.uuid.BOQ_STRUCTURES, DataCells);
        cy.SAVE();
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.gridCells.FINALPRICE).then(($FINALPRICE) => {
            Cypress.env("FINALPRICE", $FINALPRICE.text())
        })
    });

    it("TC - Create new Bid and change status", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        const BIDCREATION = this.data.BidCreation.bidInputs;
        const BIDCREATIONGRID = this.data.BidCreation.Column_Headers;

        const BID_PARAMETER: DataCells = {
            [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
            [app.InputFields.INPUT_GROUP_CONTENT]: BIDCREATION.businessPartner,
            [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
        };
        _common.openSidebarOption(standardInputs.QuickStart)
        _common.search_fromSidebar(standardInputs.quickstart, standardInputs.bid);
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDS, BIDCREATIONGRID)
        });
        _common.create_newRecord(cnt.uuid.BIDS)
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
		_common.waitForLoaderToDisappear()
        _bidPage.changeStatus_BidRecord()
    })

    it("TC - Verify Bid BoQ item should be populated form project boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
    })

    it("TC - Create Contract by wizard and change status", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs;

        _common.openSidebarOption(standardInputs.wizard)
        _common.search_fromSidebar(standardInputs.wizard1, standardInputs.createContract);
		_common.waitForLoaderToDisappear()
        _saleContractPage.create_ContractFromWizardinBID(CONTRACT_DESC)
        _saleContractPage.changeStatus_ContractRecord()
        cy.SAVE()
    })

    it("TC - Verify Contract Item should be populated from the Bid Boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.CONTACTS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
    })

    it("TC - Create quantity TakeOff Detail", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        const BILLOFQTYGRID = this.data.billOfQuantity.Column_Headers;
        const QTYTAKEOFFSGRID = this.data.qtyTakeOffs.Column_Headers;
        const QTYTAKEOFFSINPUT = this.data.qtyTakeOffs;

        _common.openSidebarOption(standardInputs.QuickStart)
        _common.search_fromSidebar(standardInputs.quickstart, standardInputs.qto);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.QtoHeader).then(() => {
            _common.setDefaultView(app.tabBar.QtoHeader)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.Quantity_Takeoff_Header)
        _common.create_newRecord(cnt.uuid.Quantity_Takeoff_Header)
        _salesPage.enter_dataToCreate_QTOHeader("Sales / WIP&Bill", QTO_DESC, CONTRACT_DESC, BOQ_HEADER_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITY_TAKEOFF, 0);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, QTYTAKEOFFSGRID)
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BILLOFQTYGRID)
        });
        _salesPage.enter_recordToCreate_quantityTakeOffDetail(BOQ_HEADER_DESC, BOQSTRUCT_DESC, QTYTAKEOFFSINPUT.value1)
        _common.selectActiveRow_inContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify IQ quantity in bill of quantity container should be reflected from quantity take off container", function () {
        const QTYTAKEOFFSINPUT = this.data.qtyTakeOffs;

        _common.waitForLoaderToDisappear()
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.GridCells.INSTALLED_QUANTITY, QTYTAKEOFFSINPUT.value1)
        })
    })

    it("TC - Create WIP and Verify Wip Boq Quantity should come from QTO IQ Quantity & WIP BoQ Final Price= Quantity* Unit Rate", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        const QTYTAKEOFFSINPUT = this.data.qtyTakeOffs;

        _common.openSidebarOption(standardInputs.wizard)
        _common.search_fromSidebar(standardInputs.wizard1, standardInputs.createWIP);
        _common.waitForLoaderToDisappear()
        _common.editModalDropdown_WithInput('Clerk','SmiJ',"grid")
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs, 0);
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, QTYTAKEOFFSINPUT.value1)
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL).then(($QUANTITY) => {
            Cypress.env("QUANTITY", $QUANTITY.text())
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP,  app.GridCells.PRICE).then(($UNIT_RATE) => {
            Cypress.env("UNIT_RATE", $UNIT_RATE.text())
        })
        cy.wait(500).then(() => {
            let finalPrice = parseFloat(Cypress.env("QUANTITY")) * parseFloat(Cypress.env("UNIT_RATE"))
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.FINAL_PRICE_SMALL, finalPrice.toString())
        })
    })

    after(() => {
        cy.LOGOUT();
    });
})