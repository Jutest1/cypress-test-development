import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig } from "cypress/pages";
import { cnt, tile, app, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const INVOICECODE = "RNM_INV-" + Cypress._.random(0, 999)

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

const PROJECT_NO="39" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_CONTRACT

let CONTAINER_COLUMNS_PES
let CONTAINER_COLUMNS_PES_ITEM
let CONTAINERS_PES_ITEM

let CONTAINERS_INVOICE_HEADER
let CONTAINER_COLUMNS_PES_HEADER
let CONTAINER_COLUMNS_INVOICE_HEADER

let CONTAINER_COLUMNS_BILLING_SCHEMA
let CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS

let CONTAINER_COLUMNS_CONTRACT_ITEM

let CONTAINER_COLUMNS_OTHER_SERVICES

let CONTAINER_COLUMNS_REJECTIONS

let CONTAINERS_CONTRACT_ITEM

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Invoice");
ALLURE.story("PCM- 2.103 | Check Totals in Invoice");

describe("PCM- 2.103 | Check Totals in Invoice", () => {
  before(function () {
    cy.fixture("pcm/pcm-2.103-check-totals-in-invoice.json")
      .then((data) => {
        this.data = data
        MODAL_PROJECTS=this.data.MODAL.PROJECTS
        PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }

        CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
        CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
        CONTROLLING_UNIT_PARAMETERS={
            [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
            [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
        }

        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
            [app.GridCells.CODE]: ESTIMATE_CODE,
            [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
        }
            
        CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        LINE_ITEM_PARAMETERS = {
            [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
            [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
        };
            
        CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
        CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
        RESOURCE_PARAMETERS = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
        };

        CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

        CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT

        CONTAINER_COLUMNS_PES=this.data.CONTAINER_COLUMNS.PES
        CONTAINER_COLUMNS_PES_ITEM=this.data.CONTAINER_COLUMNS.PES_ITEM
        CONTAINERS_PES_ITEM=this.data.CONTAINERS.PES_ITEM

        CONTAINERS_INVOICE_HEADER=this.data.CONTAINERS.INVOICE_HEADER
        CONTAINER_COLUMNS_PES_HEADER=this.data.CONTAINER_COLUMNS.PES_HEADER
        CONTAINER_COLUMNS_INVOICE_HEADER=this.data.CONTAINER_COLUMNS.INVOICE_HEADER

        MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

        CONTAINER_COLUMNS_BILLING_SCHEMA=this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
        CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS=this.data.CONTAINER_COLUMNS.BILLING_SCHEMA_DETAILS

        CONTAINER_COLUMNS_CONTRACT_ITEM=this.data.CONTAINER_COLUMNS.CONTRACT_ITEM

        CONTAINER_COLUMNS_OTHER_SERVICES=this.data.CONTAINER_COLUMNS.OTHER_SERVICES

        CONTAINER_COLUMNS_REJECTIONS=this.data.CONTAINER_COLUMNS.REJECTIONS

        CONTAINERS_CONTRACT_ITEM=this.data.CONTAINERS.CONTRACT_ITEM
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
      })
  });

  after(() => {
    cy.LOGOUT();
  })  

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

  // it("TC - Set billing schema is turn over checkbox to check for invoice", function () {
  //   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  //   _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA)
  //   _common.waitForLoaderToDisappear()

  //   _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
  //     _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA)
  //     _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
  //   })
  //   cy.REFRESH_CONTAINER()
  //   _common.waitForLoaderToDisappear()
  //   _common.select_rowHasValue(cnt.uuid.BILLING_SCHEMA, commonLocators.CommonKeys.STANDARD_SINGEL)

  //   _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
  //     _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA_DETAILS, app.FooterTab.BILLINGSCHEMA)
  //     _common.setup_gridLayout(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINER_COLUMNS_BILLING_SCHEMA_DETAILS)
  //   })
  //   _common.waitForLoaderToDisappear()
  //   _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
  //   _common.clickOn_actionButton_toSelectAction(cnt.uuid.BILLING_SCHEMA_DETAILS,commonLocators.CommonKeys.COLLAPSE)
  //   _common.waitForLoaderToDisappear()

  //   _common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, commonLocators.CommonKeys.INVOICES)
  //   _common.clickOn_activeContainerButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.IconButtons.ICO_TREE_COLLAPSE)
  //   _common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, commonLocators.CommonKeys.RECHNUNGSKORREKTUR)
  //   _common.waitForLoaderToDisappear()
  //   _common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, commonLocators.CommonKeys.FINAL_INVOICE)
  //   _common.waitForLoaderToDisappear()

  //   _common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, commonLocators.CommonKeys.NETTO)
  //   _common.set_cellCheckboxValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.IS_TURNOVER, commonLocators.CommonKeys.CHECK)
  //   cy.SAVE()
  //   _common.waitForLoaderToDisappear()
  //   _common.waitForLoaderToDisappear()
  // });

  it('TC - Create new estimate record', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.waitForLoaderToDisappear()
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

  it("TC - Create new line item record", function () {
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
  });

  it("TC - Create new record in resource", function () {
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.maximizeContainer(cnt.uuid.RESOURCES)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
      _common.minimizeContainer(cnt.uuid.RESOURCES)
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create material package from wizard", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
      _common.waitForLoaderToDisappear()
      _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.setDefaultView(app.TabBar.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
        _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
  });

  it("TC - Change status of the package and procurement configuration", function () {
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
      })
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
      _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_0"))

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
      _procurementConfig.changeProcurementConfiguration_FromWizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION, btn.ButtonText.YES)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create new contract record", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
      _common.waitForLoaderToDisappear()

      _package.create_ContractfromPackage(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.BUSINESS_PARTNER);
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.CONTRACT).then(() => {
        _common.setDefaultView(app.TabBar.CONTRACT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
        _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT.clerkreqfk, CONTAINER_COLUMNS_CONTRACT.controllingunitfk, CONTAINER_COLUMNS_CONTRACT.code], cnt.uuid.PROCUREMENTCONTRACT)
      })
      _common.waitForLoaderToDisappear()
  });

  it("TC - Assign controlling unit to contract", function () {
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
      _common.search_fromSidebar(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
      _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
      _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CLERK_PRC_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MODAL_PROJECTS.CLERK)
      _common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CU_DESC)
      _common.select_activeRowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
  });

  it("TC - Change contract status", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
      _common.waitForLoaderToDisappear()
      _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
      _common.waitForLoaderToDisappear()
  });

  it("TC - Create PES", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _procurementPage.getCode_fromPESModal("PES_CODE")
      _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
  });

  it("TC - Update PES items quantity", function () {
      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
          _common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
          _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS)
          _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
          _common.set_columnAtTop([CONTAINER_COLUMNS_PES.pesvalue, CONTAINER_COLUMNS_PES.code], cnt.uuid.HEADERS)
      })
      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS)
          _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEM)
          _common.set_columnAtTop([CONTAINER_COLUMNS_PES_ITEM.quantity, CONTAINER_COLUMNS_PES_ITEM.mdcmaterialfk, CONTAINER_COLUMNS_PES_ITEM.total], cnt.uuid.ITEMS)
      })

      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS);
      })
      _common.clear_subContainerFilter(cnt.uuid.HEADERS)
      _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PES_CODE"))
      _common.select_rowHasValue(cnt.uuid.HEADERS,Cypress.env("PES_CODE"))

      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
      })
      _common.maximizeContainer(cnt.uuid.ITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ITEMS)
      _common.select_rowHasValue(cnt.uuid.ITEMS,Cypress.env("CONTRACT_CODE"))
      _common.enterRecord_inNewRow(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES_ITEM.QUANTITY)
      _common.select_activeRowInContainer(cnt.uuid.ITEMS)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ITEMS)

      _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS);
      })
      _common.clear_subContainerFilter(cnt.uuid.HEADERS)
      _common.search_inSubContainer(cnt.uuid.HEADERS,Cypress.env("PES_CODE"))
      _common.select_rowHasValue(cnt.uuid.HEADERS,Cypress.env("PES_CODE"))
      _common.saveCellDataToEnv(cnt.uuid.HEADERS, app.GridCells.PES_VALUE,"PES_ITEM_TOTAL")
  })

  it("TC - Change PES status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.ACCEPTION)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Add Contract Items, Rejection, Other Service, Invoice Amount, Set Billing Schema, etc", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE)
    _common.waitForLoaderToDisappear()

    _package.enterRecord_toCreate_Invoice_FromWizard(commonLocators.CommonKeys.CREATE_ONE_INVOICE_PER_PES, INVOICECODE)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.INVOICES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER)
      _common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICE_HEADER)
      _common.set_columnAtTop([CONTAINER_COLUMNS_INVOICE_HEADER.reference, CONTAINER_COLUMNS_INVOICE_HEADER.amountnet], cnt.uuid.INVOICEHEADER)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
    _common.select_rowHasValue(cnt.uuid.INVOICEHEADER,INVOICECODE)
    _common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INVOICE_HEADER.AMOUNT_NET)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET,"INVOICE_AMOUNT_NET")

    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_ITEMS, app.FooterTab.CONTRACT_ITEMS, 0)
      _common.setup_gridLayout(cnt.uuid.CONTRACT_ITEMS, CONTAINER_COLUMNS_CONTRACT_ITEM)
      _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT_ITEM.totalvalue, CONTAINER_COLUMNS_CONTRACT_ITEM.quantity, CONTAINER_COLUMNS_CONTRACT_ITEM.price, CONTAINER_COLUMNS_CONTRACT_ITEM.prcitemfk, CONTAINER_COLUMNS_CONTRACT_ITEM.conheaderfk], cnt.uuid.CONTRACT_ITEMS)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.CONTRACT_ITEMS)
    _common.create_newRecord(cnt.uuid.CONTRACT_ITEMS, 0)
    _common.edit_dropdownCellWithInput(cnt.uuid.CONTRACT_ITEMS, app.GridCells.PRC_ITEM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT_ITEM.ITEM_NUMBER)
    _common.select_activeRowInContainer(cnt.uuid.CONTRACT_ITEMS)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(cnt.uuid.CONTRACT_ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT_ITEM.CON_ITEM_QUANTITY)
    _common.select_activeRowInContainer(cnt.uuid.CONTRACT_ITEMS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.CONTRACT_ITEMS, Cypress.env("CONTRACT_CODE"))
    _common.saveCellDataToEnv(cnt.uuid.CONTRACT_ITEMS, app.GridCells.TOTAL_VALUE,"CONTRACT_ITEM_TOTAL")

    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
      _common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES)
      _common.set_columnAtTop([CONTAINER_COLUMNS_OTHER_SERVICES.controllingunitfk, CONTAINER_COLUMNS_OTHER_SERVICES.amounttotal, CONTAINER_COLUMNS_OTHER_SERVICES.prcstructurefk], cnt.uuid.OTHER_SERVICES)
    })
    _common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
    _common.create_newRecord(cnt.uuid.OTHER_SERVICES)
    _common.waitForLoaderToDisappear()
    _common.clickOn_activeRowCell(cnt.uuid.OTHER_SERVICES, app.GridCells.PRC_STRUCTURE_FK)
    _common.edit_dropdownCellWithInput(cnt.uuid.OTHER_SERVICES, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE)
    _common.select_activeRowInContainer(cnt.uuid.CONTRACT_ITEMS)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.OTHER_SERVICES, app.GridCells.AMOUNT_NET,"OTHER_SERVICES")
   
    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2)
      _common.setup_gridLayout(cnt.uuid.REJECTIONS, CONTAINER_COLUMNS_REJECTIONS)
      _common.set_columnAtTop([CONTAINER_COLUMNS_REJECTIONS.amounttotal, CONTAINER_COLUMNS_REJECTIONS.amountnet], cnt.uuid.REJECTIONS)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.REJECTIONS)
    _common.create_newRecord(cnt.uuid.REJECTIONS)
    _common.enterRecord_inNewRow(cnt.uuid.REJECTIONS, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INVOICE_HEADER.REJECTION_AMOUNT)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.REJECTIONS, app.GridCells.AMOUNT_NET,"REJECTIONS")

    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 2)
    })
    _common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA, commonLocators.CommonKeys.NETTO)
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT,"BILLING_SCHEMA")
  });

  it("TC - Verify Totals in Invoice", function () {

    _common.openTab(app.TabBar.APPLICATION).then(() => {
      _common.select_tabFromFooter(cnt.uuid.INVOICE_RECONCILLIATION, app.FooterTab.RECONCILIATION, 3)
    })
    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.AMOUNT)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("INVOICE_AMOUNT_NET").toString())
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.FROM_PESS)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("PES_ITEM_TOTAL").toString())
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.FROM_CONTRACT_ITEMS)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("CONTRACT_ITEM_TOTAL").toString())
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.FROM_OTHER)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("OTHER_SERVICES").toString())
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.REJECTIONS)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("REJECTIONS").toString())
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.FROM_BILLING_SCHEMA)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("BILLING_SCHEMA").toString())
    _common.waitForLoaderToDisappear()

    const totals = parseFloat(Cypress.env("BILLING_SCHEMA").toString().replace(',','')) + parseFloat(Cypress.env("REJECTIONS").toString().replace(',','')) + parseFloat(Cypress.env("OTHER_SERVICES").toString().replace(',','')) + parseFloat(Cypress.env("CONTRACT_ITEM_TOTAL").toString().replace(',','')) + parseFloat(Cypress.env("PES_ITEM_TOTAL").toString().replace(',',''))
    cy.log("Total is =>" + totals)
    const invTotal = parseFloat(Cypress.env("INVOICE_AMOUNT_NET").toString().replace(',',''))
    cy.log("Amount is =>" + invTotal)
    const Balance = invTotal - totals
    cy.log("Balance is =>" + Balance)
    _common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, commonLocators.CommonKeys.BALANCE)
    _common.assert_forNumericValues(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Balance.toFixed(2).toString())
  });
})