

import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQDESC-SAM" + Cypress._.random(0, 9999);
const BOQSTRUCT_DESC = "BOQSTRDESC-SAM" + Cypress._.random(0, 9999);
const BID_DESC = "BIDDESC-SAM" + Cypress._.random(0, 9999);
const CONTRACT_DESC = "CONTDESC-SAM" + Cypress._.random(0, 9999);
const PRJ_NO = "PRJNOSAM" + Cypress._.random(0, 9999);
const PRJ_NAME = "PRJNAMESAM" + Cypress._.random(0, 9999);



allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 3.1 | WIP creation in WIP module by clicking on new button for 1st period")

describe("SAM- 3.1 | WIP creation in WIP module by clicking on new button for 1st period", () => {
    beforeEach(function () {
        cy.fixture("sam/sam-3.1-wip-creation-in-wip-module-by-clicking-on-new-record-button-for-1st-period.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-3.1-wip-creation-in-wip-module-by-clicking-on-new-record-button-for-1st-period.json").then((data) => {
            this.data = data;
            const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(()=>{
                _common.select_tabFromFooter(cnt.uuid.Projects,app.FooterTab.PROJECTS)
            })
            _common.create_newRecord(cnt.uuid.Projects)
            _projectPage.enterRecord_toCreateProject(PRJ_NO,PRJ_NAME,STANDARDINPUTS.clerk)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem();
            _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
        })
    })

    it("TC - Create new BOQ and go to BOQ", function () {
        const BOQ_HEADER_GRID = this.data.BoQHeader.Column_Headers
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.setDefaultView(app.tabBar.BoQs)
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs,1);
            _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_HEADER_GRID)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.project).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.Projects,app.FooterTab.PROJECTS)
        })
        
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem();
        _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs,1);
           
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(BOQ_HEADER_DESC)
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    });

    it("TC - Create BoQ Structure", function () {

        const BOQSTRUCTUREGRID = this.data.BoqStructure.Column_Headers;
        const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
       
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID)
        });
        _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC,BOQSTRUCTUREINPUTS.Quantity,BOQSTRUCTUREINPUTS.UnitRate,BOQSTRUCTUREINPUTS.Uom);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.gridCells.FINALPRICE).then(($FINALPRICE) => {
        Cypress.env("FINALPRICE", $FINALPRICE.text())
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new Bid and change status", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const BIDCREATION = this.data.BidCreation.bidInputs;
        const BIDCREATIONGRID = this.data.BidCreation.Column_Headers;

        const BID_PARAMETER: DataCells = {
            [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
            [app.InputFields.INPUT_GROUP_CONTENT]: BIDCREATION.businessPartner,
            [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
        };
        _common.openSidebarOption(STANDARDINPUTS.QuickStart)
        _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.bid);
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDS, BIDCREATIONGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.create_newRecord(cnt.uuid.BIDS)
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
		_common.waitForLoaderToDisappear()
        _bidPage.changeStatus_BidRecord()
    })

    it("TC - Verify Bid BoQ item should be populated form project boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
        cy.wait(1000)
    })

    it("TC - Create Contract by wizard and change status", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const CONTRACT_COLUMN = this.data.ContractCreation.ColumnHeaders
        _common.openSidebarOption(STANDARDINPUTS.wizard).search_fromSidebar(STANDARDINPUTS.wizard1, STANDARDINPUTS.createContract);
        cy.wait(1000)
        /* this wait is mandatory else script fails */
        _common.waitForLoaderToDisappear()
        _saleContractPage.create_ContractFromWizardinBID(CONTRACT_DESC)
        _common.openTab(app.TabBar.CONTRACTS).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CONTACTS,app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.CONTACTS,CONTRACT_COLUMN)
            _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        })
        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs, app.FooterTab.BOQs);
        });
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE()
    })

    it("TC - Verify Contract Item should be populated from the Bid Boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.CONTACTS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
        cy.wait(1000)
    });

    it("TC - Create WIP", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const BOQSTRUCTURE_COLUMN = this.data.WipBOQ_Structure.ColumnHeaders
        const BOQ_COLUMN = this.data.CreateNewBoq.ColumnHeaders
        const WIPINPUTS = this.data.WIPINPUTS
        const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
        
        const DataCells: DataCells={
            [commonLocators.CommonLabels.CONTRACT] : CONTRACT_DESC,
            [commonLocators.CommonLabels.BOQ_SOURCE]: STANDARDINPUTS.contractBoq,
            [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC,
            
        }
        _common.openSidebarOption(STANDARDINPUTS.QuickStart)
        _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.wip);
        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.clear_subContainerFilter(cnt.uuid.WIP) 
        });
        _common.create_newRecord(cnt.uuid.WIP)
        _wipPage.enterRecord_toCreateNewWIP(DataCells)
        cy.SAVE()
        _common.openTab(app.TabBar.WIPBOQ).then(()=>{
            _common.setDefaultView(app.TabBar.WIPBOQ)
            _common.select_tabFromFooter(cnt.uuid.BOQ_WIP,app.FooterTab.BOQs)
            _common.setup_gridLayout(cnt.uuid.BOQ_WIP,BOQ_COLUMN)
        })
        _common.select_rowInContainer(cnt.uuid.BOQ_WIP)
        _common.openTab(app.TabBar.WIPBOQ).then(()=>{        
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP,app.FooterTab.BOQ_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP,BOQSTRUCTURE_COLUMN)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BRIEF_INFO,BOQSTRUCT_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.BOQ_STRUCTUREWIP,app.gridCells.PECENTAGE_QUANTITY)
        _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.gridCells.PECENTAGE_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,WIPINPUTS.percentageQty)
        cy.SAVE()
        _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTUREWIP,BOQSTRUCTUREINPUTS.Quantity,WIPINPUTS.percentageQty,app.GridCells.QUANTITY_SMALL)
        
    })
})