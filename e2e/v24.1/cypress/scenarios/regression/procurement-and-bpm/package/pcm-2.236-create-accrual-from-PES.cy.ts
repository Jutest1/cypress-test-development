import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators"
import { _boqPage, _common, _controllingUnit, _estimatePage, _mainView, _modalView, _package, _procurementPage, _projectPage, _saleContractPage, _validate } from "cypress/pages"
import { DataCells } from "cypress/pages/interfaces";
import { functions } from "cypress/types/lodash";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);

const PROJECT_NO="33" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQ-STR-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_PARAMETERS:DataCells
let BOQ_STRUCTURE_PARAMETERS:DataCells
let CONTAINERS_BOQ_STRUCTURE

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM


let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_CONTRACT

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.236 | Create accrual from PES");

describe("PCM- 2.236 | Create accrual from PES", () => {

  before(function () {
    cy.fixture("pcm/pcm-2.236-create-accrual-from-PES.json")
      .then((data) => {
        this.data = data
        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
        }

        CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
        CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
        CONTROLLING_UNIT_PARAMETERS={
            [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
            [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
        }

        CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
        CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ
			  BOQ_PARAMETERS={
				  [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
			  }

        CONTAINER_COLUMNS_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			  CONTAINERS_BOQ_STRUCTURE=this.data.CONTAINERS.BOQ_STRUCTURE
			  BOQ_STRUCTURE_PARAMETERS={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRUCTURE_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINERS_BOQ_STRUCTURE.QUANTITY,
          [ app.GridCells.PRICE_SMALL]:CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
          [app.GridCells.BAS_UOM_FK]:CONTAINERS_BOQ_STRUCTURE.UOM
			  }

        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }
        CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT
        MODAL_CREATE_UPDATE_BOQ_PACKAGE=this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
      })
      .then(()=>{
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.setDefaultView(app.TabBar.PROJECT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
      })
  });


  it('TC - Verify when find pes ,it should check pes status which ISDELIVERED = TRUE and ISINVOCIED = FALSE and ISCANCELED = FALSE and ISVIRTUAL = FALSE', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()

    _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.PES_STATUS)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, commonLocators.CommonKeys.PES_STATUS)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, sidebar.SideBarOptions.DELIVERED)
    _common.waitForLoaderToDisappear()
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_DELIVERED, commonLocators.CommonKeys.CHECK)
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_VIRTUAL, commonLocators.CommonKeys.UNCHECK)
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_INVOICED, commonLocators.CommonKeys.UNCHECK)
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_CANCELED, commonLocators.CommonKeys.UNCHECK)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create controlling unit", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
      _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
    _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create BOQ header and BOQ structure", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
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
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
  });

  it('TC - Create new estimate record', function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it('TC - Generate line item and assign resource to it', function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
  
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCTURE_DESC)


    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.SAVE();
  });

  it("TC - Create BoQ package from the estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
    _common.waitForLoaderToDisappear()
    _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.ESTIMATE_SCOPE_INDEX, MODAL_CREATE_UPDATE_BOQ_PACKAGE.BASED_ON, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.QTY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear() // This wait required as UI takes time to load
  })

  it("TC - Change package status", function () {
      _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
          _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
      })
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PK-Code"))

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
      _common.waitForLoaderToDisappear()
  })

  it('TC - Create contract by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _package.create_ContractfromPackage(MODAL_CREATE_UPDATE_BOQ_PACKAGE.BUSINESS_PARTNER)
    _common.waitForLoaderToDisappear()  
  });

  it("TC - Update contract", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
        _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT.bascurrencyfk,CONTAINER_COLUMNS_CONTRACT.businesspartnerfk,CONTAINER_COLUMNS_CONTRACT.bpdvatgroupfk,CONTAINER_COLUMNS_CONTRACT.packagefk,CONTAINER_COLUMNS_CONTRACT.clerkreqfk,CONTAINER_COLUMNS_CONTRACT.projectfk,CONTAINER_COLUMNS_CONTRACT.controllingunitfk,CONTAINER_COLUMNS_CONTRACT.clerkprcfk,CONTAINER_COLUMNS_CONTRACT.code],cnt.uuid.PROCUREMENTCONTRACT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
    _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[0])
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()

    _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_REQ_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK[1])
    _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.waitForLoaderToDisappear()

    _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK)
    _common.clickOn_activeContainerButton(cnt.uuid.PROCUREMENTCONTRACT,btn.IconButtons.ICO_INPUT_DELETE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
  })

  it("TC - Change package status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    _common.waitForLoaderToDisappear()
  })

  it('TC - Create PES by wizard', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// Added this wait as script was getting failed
    _procurementPage.getCode_fromPESModal("PES_Code")
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
    _common.waitForLoaderToDisappear()
  })

  it("Change PES status and update boq quantity",function(){

    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0)
      _common.waitForLoaderToDisappear()
      cy.reload()
      cy.wait(2000)// This wait is required
      _common.waitForLoaderToDisappear()
    })
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.HEADERS)

    _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PES_Code"))


    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 1)
    })
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.clickOn_toolbarButton(cnt.uuid.PES_BOQS_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BOQS_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRUCTURE_DESC)

    _common.enterRecord_inNewRow(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.PES_QUANTITY[0])
    _common.select_activeRowInContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.minimizeContainer(cnt.uuid.PES_BOQS_STRUCTURE)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_PES_STATUS);
    _common.waitForLoaderToDisappear()
    _common.changeStatus_fromModal(commonLocators.CommonKeys.DELIVERED)
    _common.waitForLoaderToDisappear()
  });

  it('TC - Verify Create transaction and wizard dialog each field is correctly ', function () {

    Cypress.env("Voucher_No", "VoucherNo-" + Cypress._.random(0, 999))

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_TRANSACTION)
    _common.waitForLoaderToDisappear()
    _common.findCaret_withDynamicInputClass_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, commonLocators.CommonKeys.TRANSCATION_MODE)
    _common.select_ItemFromPopUpList(commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.ONE_TRANSACTION_PER_PES_ITEM)
    _common.findCaret_withDynamicInputClass_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, commonLocators.CommonKeys.COMPANY_YEAR)
    _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID,_common.getDate(commonLocators.CommonKeys.YEAR))
    _common.findCaret_withDynamicInputClass_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, commonLocators.CommonKeys.REPORTING_PERIOD)
    _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID, "10")
    _common.inputField_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, "Voucher No", 0, app.InputFields.DOMAIN_TYPE_CODE).clear().type(Cypress.env("Voucher_No"));
    _common.getText_CellData_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, "Effective Date", app.InputFields.INPUT_GROUP_CONTENT, "effectiveDate")
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.ACCOUNTING_JOURNALS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  });

  it('TC - Verify after wizard , it should also generate cancelation transactions too', function () {
    _common.openTab(app.TabBar.TRANSACTION_HEADER).then(() => {
    _common.select_tabFromFooter(cnt.uuid.TRANSACTION_HEADERS, app.FooterTab.BOQs, 2);
    });
    _common.assert_cellDataByContent_inContainer(cnt.uuid.TRANSACTION_HEADERS, app.GridCells.DESCRIPTION, "Cancelation DISTINCTION")
  });

  it('TC - Verify after generate transactions ,check transaction header and transactions', function () {
    _common.openTab(app.TabBar.TRANSACTION_HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.TRANSACTION_HEADERS, app.FooterTab.Transaction_Headers, 0);
      _validate.verify_isRecordEntered(cnt.uuid.TRANSACTION_HEADERS, app.GridCells.DESCRIPTION, "Cancelation DISTINCTION")
    });
    _common.select_rowInContainer(cnt.uuid.TRANSACTION_HEADERS)
    _common.getText_fromCell(cnt.uuid.TRANSACTION_HEADERS, app.GridCells.DESCRIPTION).then(($ele) => {
      Cypress.env("transaction_Description", $ele.text())
    })
    _common.openTab(app.TabBar.TRANSACTION_HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACCOUNTING_JOURNALS_TRANSACTION, app.FooterTab.TRANSACTION, 1);
      _validate.verify_isRecordEntered(cnt.uuid.ACCOUNTING_JOURNALS_TRANSACTION,app.GridCells.PES_HEADER_FK, Cypress.env("PES_Code"))
    });
  });

  it('TC - Verify If a record for this BAS_COMPANY_FK, BAS_COMPANY_PERIOD_FK, BAS_TRANSACTION_TYPE_FK, POSTING_DATE exists where ISSUCCESS = 0 then delete the old record , and generate new records', function () {
    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.TRANSACTION_HEADERS, app.GridCells.IS_SUCCESS, commonLocators.CommonKeys.UNCHECK)
  });

  it('TC - Verify when find pes, User did not opt to exclude PES from Accrual (PES_HEADER.ISNOTACCRUAL = FALSE);', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PES);
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACCRUALS, app.FooterTab.ACCRUALS, 1);
    });
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.HEADERS, app.GridCells.IS_NOT_ACCRUAL, commonLocators.CommonKeys.UNCHECK)
    _common.select_rowInContainer(cnt.uuid.ACCRUALS)
  });

  it('TC - Verify after wizard, it will generate accruals for pes module accrual container)', function () {
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.ACCRUALS, app.GridCells.TRANS_HEADER, Cypress.env("transaction_Description"))
    })
  });

  it('TC - Verify when find pes, it should check which have not been accrued already for the given effective date(max(PES_ACCRUAL.DATE_EFFEKTIVE) < DATE EFFECTIVE from dialog', function () {
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACCRUALS, app.GridCells.DATE_EFFECTIVE, Cypress.env("effectiveDate"))
  });

  it('TC - Verify when find pes, it should check which have not been accrued already for the given effective date(max(PES_ACCRUAL.DATE_EFFEKTIVE) < DATE EFFECTIVE from dialog', function () {

    _common.assert_cellData_insideActiveRow(cnt.uuid.ACCRUALS, app.GridCells.DATE_EFFECTIVE, Cypress.env("effectiveDate"))

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, commonLocators.CommonKeys.CREATE_TRANSACTION)
    _common.waitForLoaderToDisappear()

    _common.findCaret_withDynamicInputClass_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, commonLocators.CommonKeys.TRANSCATION_MODE)
    _common.select_ItemFromPopUpList(commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.ONE_TRANSACTION_PER_PES_ITEM)
    _common.findCaret_withDynamicInputClass_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, "Company Year")
    _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID, _common.getDate(commonLocators.CommonKeys.YEAR))
    _common.findCaret_withDynamicInputClass_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, "Reporting Period")
    _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID, "10")
    _common.inputField_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, "Voucher No", 0, app.InputFields.DOMAIN_TYPE_CODE).clear().type(Cypress.env("Voucher_No"));
    _common.getText_CellData_fromModal(commonLocators.CommonElements.TRANSACTION_INPUT_ROW, "Effective Date", app.InputFields.INPUT_GROUP_CONTENT, "effectiveDate")
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.ACCOUNTING_JOURNALS)
  });
})