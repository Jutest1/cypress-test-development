
import { tile, app, cnt, btn, commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const BOQ_DESC_1="BOQ1_DESC-" + Cypress._.random(0, 999);
const BOQ_DESC_2="BOQ2_DESC-" + Cypress._.random(0, 999);

const BOQ_STRUCTURE_DESC_1="BSD-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC_2="BSD-1-" + Cypress._.random(0, 999);

const EST_CODE="1" + Cypress._.random(0, 999);
const EST_DESC="EST1_DESC_" + Cypress._.random(0, 999);

const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

const BID_DESC="BD1_" + Cypress._.random(0, 999);
const BID_DESC_1="BD2_" + Cypress._.random(0, 999);

const CONTRACT_DESC="CD1-" + Cypress._.random(0, 999);
const CONTRACT_DESC_1="CD2-" + Cypress._.random(0, 999);

const QTO_DESC_1="QTOD1_" + Cypress._.random(0, 999);
const QTO_DESC_2="QTOD2_" + Cypress._.random(0, 999);

const CHANGES_DESC="CHS1-" + Cypress._.random(0, 999);
const CHANGES_DESC2="CHS2-" + Cypress._.random(0, 999);

const WIP_DESC_1="WIPD1-" + Cypress._.random(0, 999);
const WIP_DESC_2="WIPD2-" + Cypress._.random(0, 999);

const BILL_DESC="BILL_DESC_" + Cypress._.random(0, 999);
const BILL_DESC2="BILL_DESC2_" + Cypress._.random(0, 999);

ALLURE.epic("SALES");
ALLURE.feature("Sales-Bill");
ALLURE.story("SAM- 1.41 | Create change order for sales contract for new boq and associate it with main boq");

describe("SAM- 1.41 | Create change order for sales contract for new boq and associate it with main boq", () => {

    beforeEach(function () {
    cy.fixture("sam/sam-1.41-Create-change-order-for-sales-contract-for-a-new-boq-and-associate-it-with-main-boq.json")
      .then((data) => {
        this.data = data;
       });        
    });  
        
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("sam/sam-1.41-Create-change-order-for-sales-contract-for-a-new-boq-and-associate-it-with-main-boq.json")
          .then((data) => {
            this.data = data;
            const BASIC_INPUTS = this.data.basicInputs;

            /* Open desktop should be called in before block */
            _common.waitForLoaderToDisappear()
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.Projects)
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PROJECT_NO, PROJECT_DESC,BASIC_INPUTS.clerk);
            cy.SAVE();          
            _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
            _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();
          });
    });  

    after(() => {
    cy.LOGOUT();
    });

    it('TC - Project change status accepted and Is Identified checkbox check', function () {
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.customizing);
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear()

        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Data_Types, app.FooterTab.DATA_TYPES, 1);
          _common.clear_subContainerFilter(cnt.uuid.Data_Types);
        });
        _common.search_inSubContainer(cnt.uuid.Data_Types, BASIC_INPUTS.projectChangeStatus);
        cy.REFRESH_CONTAINER();
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Data_Types, app.GridCells.NAME, BASIC_INPUTS.projectChangeStatus);

        _common.openTab(app.tabBar.MASTER_DATA).then(() => {
          _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
          _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
        });
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, BASIC_INPUTS.approved);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.ICON, BASIC_INPUTS.hook);
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.gridCells.ISACCEPTED,BASIC_INPUTS.check)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.gridCells.ISALLOWEDQTOFORSALES,BASIC_INPUTS.check)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)

        _common.waitForLoaderToDisappear()
    });

   

    it("TC - Create BoQ header and BoQ structure", function () {
        const BOQ_STRUCTURE_INPUT = this.data.boqStructureInputs
        const BOQ_COLUMN = this.data.columns.boqColumn
        const BOQ_STRUCTURE_COLUMN = this.data.columns.boqStructureColumn
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
            _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(BOQ_DESC_1);
        cy.SAVE();
        _boqPage.textOfBoQCode();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(BOQ_STRUCTURE_DESC_1, BOQ_STRUCTURE_INPUT.quantity, BOQ_STRUCTURE_INPUT.unitRate, BOQ_STRUCTURE_INPUT.uom);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        
    });

    it("TC - Create estimate header", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const ESTIMATE_INPUT = this.data.estimateInputs;
        const ESTIMATE_COLUMN = this.data.columns.estimateColumn

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATE_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, ESTIMATE_INPUT.rubricCategory, ESTIMATE_INPUT.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(BASIC_INPUTS.search)
         _common.clear_searchInSidebar()
    });

    it("TC - Generate boq line item and assign resource to it", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const ESTIMATE_LINE_ITEM_COLUMN = this.data.columns.estimateLineItemColumn
        const RESOURCE_COLUMN = this.data.columns.resourceColumn
        const RESOURCE_INPUT = this.data.resourceInputs;
        
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, ESTIMATE_LINE_ITEM_COLUMN)
            _validate.set_ColumnAtTop([ESTIMATE_LINE_ITEM_COLUMN.descriptioninfo,ESTIMATE_LINE_ITEM_COLUMN.code,ESTIMATE_LINE_ITEM_COLUMN.costtotal,ESTIMATE_LINE_ITEM_COLUMN.estqtyrelboqfk,ESTIMATE_LINE_ITEM_COLUMN.prjchangefk],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
       
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.generateLineItems);
        _boqPage.generate_LineItemBycode(BOQ_DESC_1)
        
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQ_STRUCTURE_DESC_1)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCE_COLUMN)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(RESOURCE_INPUT.shortKey, RESOURCE_INPUT.code);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
       
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"EST_COST_TOTAL")
    });

    it("TC - Create Bid ", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const BID_INPUTS = this.data.bidInput  
        const BIDS_COLUMN=this.data.columns.bidsColumn  

        _common.waitForLoaderToDisappear()
       
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createBid);

        _bidPage.createBidRecord_byWizardOptions(BASIC_INPUTS.mainBid,BID_DESC,BID_INPUTS.businessPartner,BASIC_INPUTS.boq)    
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
            _common.setup_gridLayout(cnt.uuid.BIDS, BIDS_COLUMN)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC)
        _common.assert_forNumericValues(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("EST_COST_TOTAL").toString())
        _common.saveCellDataToEnv(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,"BID_NET_AMOUNT")

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeBidStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.submitted)
        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
    
    })

    it("TC - Create contract from bid ", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const CONTRACT_COLUMN=this.data.columns.contractColumn  

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createContract);
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
        _saleContractPage.create_ContractFromWizardinBID(CONTRACT_DESC)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTACTS, CONTRACT_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        _common.search_inSubContainer(cnt.uuid.CONTACTS,CONTRACT_DESC)
        _common.select_rowHasValue(cnt.uuid.CONTACTS,CONTRACT_DESC)
        _common.assert_forNumericValues(cnt.uuid.CONTACTS,app.GridCells.AMOUNT_NET,Cypress.env("BID_NET_AMOUNT"))
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 0);
        });
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeContractStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.contracted)

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 0);
        });
    })

    it("TC - Create QTO ", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const QTO_HEADER_COLUMN=this.data.columns.qtoHeaderColumn  
        const BILL_OF_QUANTITY_COLUMN=this.data.columns.billOfQuantityColumn
        const QUANTITY_TAKE_OFF_COLUMN=this.data.columns.quantityTakeoffColumn

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.qto);
        _common.waitForLoaderToDisappear()
        cy.wait(4000)
        //cy.reload()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.QtoHeader).then(() => {
            _common.setDefaultView(app.tabBar.QtoHeader)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
            _common.setup_gridLayout(cnt.uuid.Quantity_Takeoff_Header, QTO_HEADER_COLUMN)
        });

        // _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        // _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO)
        _common.openTab(app.tabBar.QtoHeader).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.Quantity_Takeoff_Header)
        _common.create_newRecord(cnt.uuid.Quantity_Takeoff_Header)
        _salesPage.enter_dataToCreate_QTOHeader(BASIC_INPUTS.salesWIPBill,QTO_DESC_1,CONTRACT_DESC,BOQ_DESC_1)
        cy.wait(2000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
        
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.Quantity_Takeoff_Header,QTO_DESC_1)

        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
            _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, BILL_OF_QUANTITY_COLUMN)
            _validate.set_ColumnAtTop([BILL_OF_QUANTITY_COLUMN.briefinfo,BILL_OF_QUANTITY_COLUMN.installedquantity],cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
            _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, QUANTITY_TAKE_OFF_COLUMN)
            _validate.set_ColumnAtTop([QUANTITY_TAKE_OFF_COLUMN.boqitemcode,QUANTITY_TAKE_OFF_COLUMN.value1detail,QUANTITY_TAKE_OFF_COLUMN.result],cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        })
        _common.waitForLoaderToDisappear()

        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,app.GridCells.BRIEF_INFO,BOQ_DESC_1)
        _common.expandAll(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,app.GridCells.BRIEF_INFO,BOQ_STRUCTURE_DESC_1)


        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
        })
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.edit_dropdownCellWithInput(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,app.gridCells.QTO_BOQ_ITEM,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,BOQ_STRUCTURE_DESC_1)
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,app.GridCells.VALUE_1_DETAIL,app.InputFields.DOMAIN_TYPE_REMARK,BASIC_INPUTS.value1)
        _common.selectActiveRow_inContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
        _common.openTab(app.tabBar.QtoHeader).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
        });
    })
      
    it("TC - Create WIP1 from QTO ", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const WIP_COLUMN=this.data.columns.wipColumn  
       
        const WIP_PARAMETER:DataCells={
            [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_1,
            [commonLocators.CommonLabels.CLERK]:BASIC_INPUTS.clerk
        }
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createWIP);
        _common.waitForLoaderToDisappear()

        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER)
        cy.wait(2000)
    
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.setDefaultView(app.TabBar.WIP)
        });
        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, WIP_COLUMN)
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
            _common.setup_gridLayout(cnt.uuid.WIP, WIP_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_1)
        _common.saveCellDataToEnv(cnt.uuid.WIP,app.GridCells.AMOUNT_NET,"WIP1_NET_AMOUNT")
        

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeWIPStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.approved)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
    })

    it("TC - Create Bill1 ", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const WIP_PARAMETER:DataCells={
            [commonLocators.CommonLabels.BILL_TYPE]:BASIC_INPUTS.progressInvoice,
            [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC,
            [app.GridCells.DESCRIPTION_INFO]:WIP_DESC_1,
            [commonLocators.CommonKeys.VALUE]:[BASIC_INPUTS.check]
        }
   

    _common.openTab(app.TabBar.WIP).then(() => {
        _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
    });

    _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
    _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createBill);
    _billPage.create_bill_fromWizard(WIP_PARAMETER)
    cy.wait(2000)
    _common.clickOn_modalFooterButton(btn.buttonText.Go_to_Bill)
    
    _common.openTab(app.TabBar.BILLS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILL, 0);
       
    });
    })

    it("TC - Create changes and change status", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const CHANGES_COLUMN=this.data.columns.changesColumn  

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.changes);
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.tabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Changes, app.FooterTab.CHANGES, 0);
            _common.setup_gridLayout(cnt.uuid.Changes, CHANGES_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.Changes)
        _common.create_newRecord(cnt.uuid.Changes)
        _common.enterRecord_inNewRow(cnt.uuid.Changes,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CHANGES_DESC)
        _common.selectActiveRow_inContainer(cnt.uuid.Changes)
        cy.SAVE()
        _common.waitForLoaderToDisappear()


        _common.openTab(app.tabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Changes, app.FooterTab.CHANGES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.Changes)
        _common.create_newRecord(cnt.uuid.Changes)
        _common.enterRecord_inNewRow(cnt.uuid.Changes,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CHANGES_DESC2)
        _common.selectActiveRow_inContainer(cnt.uuid.Changes)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.reload()
        cy.wait(2000)

        _common.openTab(app.tabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Changes, app.FooterTab.CHANGES, 0);
        });
        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.Changes)
        _common.search_inSubContainer(cnt.uuid.Changes,CHANGES_DESC)
        _common.select_rowHasValue(cnt.uuid.Changes,CHANGES_DESC)
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.approved)
        _common.waitForLoaderToDisappear()

        
        _common.clear_subContainerFilter(cnt.uuid.Changes)
        _common.search_inSubContainer(cnt.uuid.Changes,CHANGES_DESC2)
        _common.select_rowHasValue(cnt.uuid.Changes,CHANGES_DESC2)
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.approved)
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.tabBar.CHANGES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Changes, app.FooterTab.CHANGES, 0);
        });
    })
    //! /* SECOND PART */

    it("TC - Create BoQ header and BoQ structure", function () {
        const BOQ_STRUCTURE_INPUT = this.data.boqStructureInputs
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openTab(app.tabBar.BoQs).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(BOQ_DESC_2);
        cy.SAVE();
        _boqPage.textOfBoQCode();
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _boqPage.enterRecord_toCreateBoQStructure(BOQ_STRUCTURE_DESC_2, BOQ_STRUCTURE_INPUT.quantity1, BOQ_STRUCTURE_INPUT.unitRate1, BOQ_STRUCTURE_INPUT.uom1);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        
    });

    it("TC - Go to estimate", function () {
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE,EST_DESC);
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
    });

    it("TC - Generate boq line item add project change and assign resource to it", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const RESOURCE_INPUT = this.data.resourceInputs;

       
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.generateLineItems);
        _boqPage.generate_LineItemBycode(BOQ_DESC_2)
        
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC_2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQ_STRUCTURE_DESC_2)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_BOQ_FK,BASIC_INPUTS.list,BASIC_INPUTS.toStructure)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PRJ_CHANGE_FK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,CHANGES_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(RESOURCE_INPUT.shortKey, RESOURCE_INPUT.code);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 0);
        });
        _common.saveCellDataToEnv(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,"RES_COST_UNIT")

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"EST_COST_TOTAL_1")
    });

    it("TC - Create Bid and verify change Bid Net Amount == Cost Total of newly generated line item from change Boq", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const BID_INPUTS = this.data.bidInput  

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createBid);
        _common.waitForLoaderToDisappear()

        _bidPage.createBidRecord_byWizardOptions(BASIC_INPUTS.changeBid,BID_DESC_1,BID_INPUTS.businessPartner,BASIC_INPUTS.boq,BID_DESC,"NA",CHANGES_DESC)    
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.BIDS)
        _common.select_rowHasValue(cnt.uuid.BIDS,BID_DESC_1)
        _common.assert_forNumericValues(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("EST_COST_TOTAL_1").toString())
        _common.saveCellDataToEnv(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,"BID_NET_AMOUNT_1")

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeBidStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.submitted)
        _common.openTab(app.TabBar.BID).then(()=>{
            _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
        })
    
    })

    it("TC - Create change order contract from bid and verify change order gets created with new BoQ and selected project change", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const BOQ_STRUCTURE_INPUT = this.data.boqStructureInputs

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createContract);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _saleContractPage.createContractRecord_byWizardOptions(BASIC_INPUTS.changeOrder,CONTRACT_DESC_1,"NA",CONTRACT_DESC,CHANGES_DESC)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        _common.search_inSubContainer(cnt.uuid.CONTACTS,CONTRACT_DESC_1)
        _common.select_rowHasValue(cnt.uuid.CONTACTS,CONTRACT_DESC_1)
       // _common.assert_forNumericValues(cnt.uuid.CONTACTS,app.GridCells.AMOUNT_NET,Cypress.env("BID_NET_AMOUNT_1"))

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeContractStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.contracted)

        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs, app.FooterTab.BOQs, 0);
        });
        _common.select_rowInContainer(cnt.uuid.contractSales_BoQs)

        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 0);
        });
        _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURE1).findButton(btn.ToolBar.ICO_TREE_EXPAND_ALL).clickIn();
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURE1).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, 'Position').click();
	
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.QUANTITY_SMALL,BOQ_STRUCTURE_INPUT.quantity1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.PRICE,Cypress.env("RES_COST_UNIT"))
        
    })

    it("TC - Create QTO2 and verify new BoQ added to it", function () {
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();
        
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.qto);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.tabBar.QtoHeader).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.Quantity_Takeoff_Header)
        _common.create_newRecord(cnt.uuid.Quantity_Takeoff_Header)
        _salesPage.enter_dataToCreate_QTOHeader(BASIC_INPUTS.salesWIPBill,QTO_DESC_2,CONTRACT_DESC,BOQ_DESC_2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.Quantity_Takeoff_Header,QTO_DESC_2)

        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP, app.FooterTab.BILL_OF_QUANTITY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,app.GridCells.BRIEF_INFO,BOQ_DESC_2)
        _common.expandAll(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,app.GridCells.BRIEF_INFO,BOQ_STRUCTURE_DESC_2)


        _common.openTab(app.tabBar.detail).then(() => {
            _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL, app.FooterTab.QUANTITYTAKEOFFHEADER, 1);
        })
        _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        _common.edit_dropdownCellWithInput(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,app.gridCells.QTO_BOQ_ITEM,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,BOQ_STRUCTURE_DESC_2)
        _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,app.GridCells.VALUE_1_DETAIL,app.InputFields.DOMAIN_TYPE_REMARK,BASIC_INPUTS.value2)
        _common.selectActiveRow_inContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
        _common.openTab(app.tabBar.QtoHeader).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header, app.FooterTab.QUANTITYTAKEOFFHEADER, 0);
        });
    })
      
    it("TC - Create WIP2 from QTO ", function () {
        const BASIC_INPUTS = this.data.basicInputs;

        const WIP_PARAMETER:DataCells={
            [commonLocators.CommonLabels.DESCRIPTION]:WIP_DESC_2,
            [commonLocators.CommonLabels.CLERK]:BASIC_INPUTS.clerk
        }
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createWIP);
        _common.waitForLoaderToDisappear()

        _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_2)

        _common.openTab(app.TabBar.WIPBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.WIP)
        _common.select_rowHasValue(cnt.uuid.WIP,WIP_DESC_2)
        _common.saveCellDataToEnv(cnt.uuid.WIP,app.GridCells.AMOUNT_NET,"WIP2_NET_AMOUNT")
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });

        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.changeWIPStatus);
        _common.changeStatus_fromModal(BASIC_INPUTS.approved)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.WIP).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
        });
    })

    it("TC - Create Bill2 from WIP and verify Bill2 Net Amount == New WIP Net Amount", function () {
        const BASIC_INPUTS = this.data.basicInputs;

        const WIP_PARAMETER:DataCells={
            [commonLocators.CommonLabels.BILL_TYPE]:BASIC_INPUTS.progressInvoice,
            [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC2,
            [app.GridCells.DESCRIPTION_INFO]:[WIP_DESC_1,WIP_DESC_2],
            [commonLocators.CommonKeys.VALUE]:[BASIC_INPUTS.check,BASIC_INPUTS.check]
        }
        const BILL_COLUMN=this.data.columns.billColumn
    
    
        _common.openSidebarOption(BASIC_INPUTS.wizardIcon);
        _common.search_fromSidebar(BASIC_INPUTS.wizardSideBar, BASIC_INPUTS.createBill);
        _billPage.create_bill_fromWizard(WIP_PARAMETER)
        _common.clickOn_modalFooterButton(btn.buttonText.Go_to_Bill)
  
        _common.openTab(app.TabBar.BILLS).then(() => {
            _common.setDefaultView(app.TabBar.BILLS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILL, 0);
            _common.setup_gridLayout(cnt.uuid.BILLS, BILL_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.BILLS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.BILLS,BILL_DESC2)
        _common.select_rowHasValue(cnt.uuid.BILLS,BILL_DESC2)
       
        _common.assert_forNumericValues(cnt.uuid.BILLS,app.GridCells.AMOUNT_NET,Cypress.env('WIP2_NET_AMOUNT'))
    })
    
});