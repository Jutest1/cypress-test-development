import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";
import _ from "cypress/types/lodash";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQDESC-SAM" + Cypress._.random(0, 9999);
const BOQ_STRUCT_DESC = "BOQSTRDESC-SAM" + Cypress._.random(0, 9999);
const BID_DESC = "MAINBIDDESC-SAM" + Cypress._.random(0, 9999);
const CONTRACT_DESC = "CONTDESC-SAM" + Cypress._.random(0, 9999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CHANGES_DESC_PROJ="CHNGSAM-" + Cypress._.random(0, 999);
const CHANGES_DESC_CHNG="CHNGSAM-" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells

let CONTAINER_CUSTOMIZING;
let CONTAINER_BOQ;
let CONTAINER_BOQ_STRUCTURES;
let CONTAINER_BID;
let CONTAINER_CONTRACT_SALES;
let CONTAINER_CHANGE_BID;
let CONTAINER_CHANGE_CONTRACT;
let CONTAINER_CHANGES;

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURES;
let CONTAINER_COLUMNS_BID;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT_SALES;
let CONTAINER_COLUMNS_CHANGES;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;

let BOQ_PARAMETERS:DataCells;
let BOQ_STRUCTURE_PARAMETERS: DataCells;
let BID_PARAMETERS:DataCells;
let BOQ_PARAMETER:DataCells;
let CONTRACT_SALES_PARAMETERS:DataCells;

ALLURE.epic("SALES");
ALLURE.feature("Sales-Contract");
ALLURE.story("SAM- 3.5 | Creation of change order contract from change bid")

describe("SAM- 3.5 | Creation of change order contract from change bid", () => {

    before(function () {
        
        cy.fixture("sam/sam-3.5-creation-of-change-order-contract-from-change-bid.json").then((data) => {
            this.data = data;

            CONTAINER_CUSTOMIZING  = this.data.CONTAINERS.CUSTOMIZING
            CONTAINER_BOQ  = this.data.CONTAINERS.BOQ
            BOQ_PARAMETERS= {
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
            }
            BOQ_PARAMETER= {
                [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINER_BOQ.PROJECT_BOQ,
                [commonLocators.CommonLabels.BOQS]: BOQ_HEADER_DESC,
            }
            CONTAINER_BOQ_STRUCTURES  = this.data.CONTAINERS.BOQ_STRUCTURES
            BOQ_STRUCTURE_PARAMETERS={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCT_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURES.QUANTITY,
                [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURES.UOM,
                [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURES.UNIT_RATE
              } 
            CONTAINER_BID  = this.data.CONTAINERS.BID
            BID_PARAMETERS = {
                [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
                [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
                [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
            };
            CONTAINER_CONTRACT_SALES  = this.data.CONTAINERS.CONTRACT_SALES
            CONTAINER_CHANGE_BID  = this.data.CONTAINERS.CHANGE_BID
            CONTAINER_CHANGE_CONTRACT  = this.data.CONTAINERS.CHANGE_CONTRACT
            CONTAINER_CHANGES  = this.data.CONTAINERS.CHANGES

            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
            CONTAINER_COLUMNS_BOQ_STRUCTURES = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURES;
            CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            CONTAINER_COLUMNS_CONTRACT_SALES = this.data.CONTAINER_COLUMNS.CONTRACT_SALES;
            CONTAINER_COLUMNS_CHANGES = this.data.CONTAINER_COLUMNS.CHANGES;
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
           
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        })
    })

    after(() => {
        cy.LOGOUT();
      });

      it("TC - Set Project change status under customizing module", function () {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, CONTAINER_CUSTOMIZING.DATA_TYPE)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, CONTAINER_CUSTOMIZING.DATA_TYPE)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES, CONTAINER_CUSTOMIZING.DATA_RECORDS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, CONTAINER_CUSTOMIZING.DATA_RECORDS)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_ACCEPTED, commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_IDENTIFIED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new BOQ and go to BOQ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.setDefaultView(app.TabBar.BOQS)
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs,1);
            _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs,1);   
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    });

    it("TC - Create BoQ Structure", function () {
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURES)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL).then(($FINALPRICE) => {
        Cypress.env("FINALPRICE", $FINALPRICE.text())
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($QUANTITY) => {
            Cypress.env("QUANTITY", $QUANTITY.text())
        })
        _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES,  app.GridCells.PRICE_SMALL).then(($UNIT_RATE) => {
            Cypress.env("UNIT_RATE", $UNIT_RATE.text())
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create new Bid and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.create_newRecord(cnt.uuid.BIDS)
        cy.wait(1000)//required wait to create record
        _common.waitForLoaderToDisappear()
        _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BIDS,BID_DESC)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BIDS, app.GridCells.CODE).then(($BIDCODE) => {
            Cypress.env("BIDCODE", $BIDCODE.text())
        })
		_common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _bidPage.changeStatus_BidRecord()
    })

    it("TC - Create Contract by wizard and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        cy.wait(1000) //required wait to create record
        _common.waitForLoaderToDisappear()
        _saleContractPage.create_contract_fromWizard(CONTRACT_DESC)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CONTRACTS, app.GridCells.CODE).then(($CONTRACT_CODE) => {
            Cypress.env("CONTRACT_CODE", $CONTRACT_CODE.text())
        })
        _common.openTab(app.TabBar.CONTRACTS).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
            _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT)
            _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        })
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs);
        });
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Contract Item should be populated from the Bid Boq item", function () {
        cy.wait(500).then(() => {
            _common.assert_forNumericValues(cnt.uuid.CONTRACTS, app.GridCells.AMOUNT_NET, Cypress.env("FINALPRICE"))
        })
        cy.wait(1000) //required wait to assert values
    });

    it("TC - Create changes", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CHANGES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
            _common.setup_gridLayout(cnt.uuid.CHANGES, CONTAINER_COLUMNS_CHANGES)
        });
        _common.clear_subContainerFilter(cnt.uuid.CHANGES)
        _common.create_newRecord(cnt.uuid.CHANGES)
        _common.enterRecord_inNewRow(cnt.uuid.CHANGES,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CHANGES_DESC_PROJ)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CHANGES)
        _common.enterRecord_inNewRow(cnt.uuid.CHANGES,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CHANGES_DESC_CHNG)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHANGES, app.FooterTab.CHANGES, 0);
        });
        _common.select_rowHasValue(cnt.uuid.CHANGES,CHANGES_DESC_PROJ)
        _common.getText_fromCell(cnt.uuid.CHANGES, app.GridCells.DESCRIPTION).then(($PRJ_CHANGED_CODE) => {
            Cypress.env("PRJ_CHANGED_CODE", $PRJ_CHANGED_CODE.text())
        })
        _common.select_rowHasValue(cnt.uuid.CHANGES,CHANGES_DESC_PROJ)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.wait(1000)//required wait to set status change
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CHANGES,CHANGES_DESC_CHNG)
        _common.getText_fromCell(cnt.uuid.CHANGES, app.GridCells.CODE).then(($CHANGE_ORDER_CODE) => {
            Cypress.env("CHANGE_ORDER_CODE", $CHANGE_ORDER_CODE.text())
        })
        _common.select_rowHasValue(cnt.uuid.CHANGES,CHANGES_DESC_CHNG)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.wait(1000) //required wait to set status change
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Change bid", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 1);
            _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BID)
        });
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.create_newRecord(cnt.uuid.BIDS)
        cy.wait(1000).then(()=>{
        _bidPage.createBidRecord_byWizardOptions(CONTAINER_CHANGE_BID.CHANGE_BID,CONTAINER_CHANGE_BID.DESCRIPTION,null,null,Cypress.env("BIDCODE"),null,CHANGES_DESC_PROJ)
        _common.waitForLoaderToDisappear()
        })  
    })
        
    it("TC - Copy BoQ", function () {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.TAKEOVER_BOQS);
        _common.waitForLoaderToDisappear()
        _bidPage.enterRecord_toCopyBoq(BOQ_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BIDBOQ).then(() => {
            _common.clear_subContainerFilter(cnt.uuid.BIDBOQSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE);
            _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURES)
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE,CONTAINER_BOQ_STRUCTURES.BOQ_LINE_TYPE)
        _common.edit_containerCell(cnt.uuid.BIDBOQSTRUCTURE,app.GridCells.BRIEF_INFO_SMALL,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTAINER_BOQ_STRUCTURES.OUTLINE_SPECIFICATION)
        cy.wait(1000)//required wait to read call data
        _common.getText_fromCell(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL).then(($BRIEFINFO) => {
            Cypress.env("BRIEFINFO", $BRIEFINFO.text())
        })
        _common.create_newRecord(cnt.uuid.BIDBOQSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTAINER_BOQ_STRUCTURES.OUTLINE_SPECIFICATION1)
        _common.edit_containerCell(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_BOQ_STRUCTURES.QUANTITY1)
        _common.edit_containerCell(cnt.uuid.BIDBOQSTRUCTURE,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_BOQ_STRUCTURES.UNIT_RATE1)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($FINALPRICE) => {
            Cypress.env("FINALPRICE1", $FINALPRICE.text())
            })
            _common.getText_fromCell(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL).then(($QUANTITY) => {
                Cypress.env("QUANTITY1", $QUANTITY.text())
            })
            _common.getText_fromCell(cnt.uuid.BIDBOQSTRUCTURE,  app.GridCells.PRICE_SMALL).then(($UNIT_RATE) => {
                Cypress.env("UNIT_RATE1", $UNIT_RATE.text())
            })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    
    it("TC - Change Contract by wizard and change status", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
        _saleContractPage.createContractRecord_byWizardOptions(CONTAINER_CHANGE_CONTRACT.CHANGE_ORDER,CONTAINER_CHANGE_CONTRACT.DESCRIPTION,null,Cypress.env("CONTRACT_CODE"),Cypress.env("CHANGE_ORDER_CODE"))
        })
        _common.openTab(app.TabBar.CONTRACTS).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS,0)
            _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT)
            _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
        })
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs);
            _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS,CONTAINER_COLUMNS_CONTRACT_SALES)
        });
        _common.select_activeRowInContainer(cnt.uuid.CONTRACTSALES_BOQS)
        _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQs);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_BOQ_STRUCTURES.OUTLINE_SPECIFICATION)
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BRIEF_INFO_SMALL,CONTAINER_BOQ_STRUCTURES.OUTLINE_SPECIFICATION)
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("FINALPRICE"))
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, Cypress.env("QUANTITY"))
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE1,  app.GridCells.PRICE_SMALL, Cypress.env("UNIT_RATE"))
        })
        cy.wait(1000) //required wait to read cell data
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_BOQ_STRUCTURES.OUTLINE_SPECIFICATION1)
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BRIEF_INFO_SMALL,CONTAINER_BOQ_STRUCTURES.OUTLINE_SPECIFICATION1)
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("FINALPRICE1"))
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL, Cypress.env("QUANTITY1"))
            _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE1,  app.GridCells.PRICE_SMALL, Cypress.env("UNIT_RATE1"))
        })
        _saleContractPage.changeStatus_ContractRecord();
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
})