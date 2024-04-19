import { _common,  _sidebar,_controllingUnit,_saleContractPage,_projectPage,_package, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER,WIC_CATALOGUES_HEADER } from 'cypress/pages/variables';
import { BusinessPartnerPage } from 'cypress/pages/module/procurement-and-bpm/business_partner/business-partner-page';

const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------


const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);

const CLERK = "HS";
const CU_DESCRIPTION = 'CU-DESC-' + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS:DataCells, CONTROLLING_UNIT_PARAMETERS:DataCells



let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_PROCUREMENT_CONFIGURATION
let CONTAINERS_MATERIAL_CATALOG,CONTAINER_COLUMNS_MATERIAL_CATALOG,CONTAINERS_CLERK,CONTAINERS_PROCUREMENT_CONFIGURATION
let CONTAINERS_TAX_CODE,CONTAINERS_PROCUREMENT_STRUCTURE,CONTAINERS_BP_SUPPLIER,CONTAINERS_WIC_CATALOG
let CONTAINER_COLUMNS_PACKAGE_ITEM,CONTAINERS_ORDER_ITEM,CONTAINER_COLUMNS_ORDER_ITEM,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let CONTAINERS_CONTROLLING_UNIT,CONTAINERS_CONTRACT,CONTAINER_COLUMNS_CONTRACT_TOTALS,CONTAINER_COLUMNS_BOQ_STRUCTURE
let CONTAINER_COLUMNS_TOTALS,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINER_COLUMNS_CONTRACT,CONTAINERS_WIC_BOQ_STRUCTURE

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.43 | Create New Contract");
describe("PCM- 2.43 | Create New Contract", () => {
    before(function () {
        cy.fixture('pcm/pcm-2.43-contract-newly-created.json').then((data) => {
                  this.data = data;
                 
                  CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
                  CONTAINER_COLUMNS_PROCUREMENT_CONFIGURATION = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONFIGURATION
                  CONTAINERS_PROCUREMENT_CONFIGURATION = this.data.CONTAINERS.PROCUREMENT_CONFIGURATION
                  CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
                  CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
                 
                  CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
                  CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
                  CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
                  CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
                  CONTAINER_COLUMNS_CONTRACT=this.data.CONTAINER_COLUMNS.CONTRACT

                  CONTAINERS_ORDER_ITEM = this.data.CONTAINERS.ORDER_ITEM
                  CONTAINER_COLUMNS_ORDER_ITEM=this.data.CONTAINER_COLUMNS.ORDER_ITEM
                  CONTAINER_COLUMNS_CONTRACT_TOTALS=this.data.CONTAINER_COLUMNS.CONTRACT_TOTALS
                  CONTAINERS_TAX_CODE=this.data.CONTAINERS.TAX_CODE
                  CONTAINERS_PROCUREMENT_STRUCTURE = this.data.CONTAINERS.PROCUREMENT_STRUCTURE
                  CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
                  CONTAINERS_BP_SUPPLIER=this.data.CONTAINERS.BP_SUPPLIER
                  CONTAINERS_WIC_CATALOG=this.data.CONTAINERS.WIC_CATALOG
                  CONTAINERS_WIC_BOQ_STRUCTURE=this.data.CONTAINERS.WIC_BOQ_STRUCTURE
                  CONTAINERS_MATERIAL_CATALOG=this.data.CONTAINERS.MATERIAL_CATALOG
                  CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
                CONTAINERS_CLERK=this.data.CONTAINERS.CLERK
                  PROJECTS_PARAMETERS = {
                    [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                    [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                    [commonLocators.CommonLabels.CLERK]: CLERK
                }
                  
                    
            
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CU_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
            };
                  });
              cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.waitForLoaderToDisappear()
            
       
    });
    after(() => {
		cy.LOGOUT();
	});


    it("TC - Precondition in customizing and create new project", function () {

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
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

    
          
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);

        
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.setDefaultView(app.TabBar.MASTERDATA,commonLocators.CommonKeys.DEFAULT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES,0)
        })
        _common.waitForLoaderToDisappear()
          _common.search_inSubContainer(cnt.uuid.DATA_TYPES, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE)
          _common.waitForLoaderToDisappear()
          cy.REFRESH_CONTAINER()
          _common.search_inSubContainer(cnt.uuid.DATA_TYPES, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE)
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS)
        })
          _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.NEUTRAL_MATERIAL)
          _common.waitForLoaderToDisappear()
          _common.set_cellCheckboxValue( cnt.uuid.INSTANCES, app.GridCells.IS_FRAMEWORK,commonLocators.CommonKeys.CHECK)
          _common.waitForLoaderToDisappear()
          cy.SAVE()
          _common.waitForLoaderToDisappear()
    })

    it("TC - Create new controlling unit", function () {
        
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
    _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
    cy.SAVE( )
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,CU_DESCRIPTION)
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE, "CNTSUBCODE")
     cy.log(Cypress.env("CNTSUBCODE"))
    _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)

    });

    it("TC - Create new contract", function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
        
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
    _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
            cy.REFRESH_SELECTED_ENTITIES()
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _saleContractPage.enterRecord_createNewContract(CONTAINERS_CONTRACT.BP,CU_DESCRIPTION)

    });
    it("TC - Create new Order Item", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
       
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ORDER_ITEM)
            cy.REFRESH_SELECTED_ENTITIES()
        });
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
       
        _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ORDER_ITEM.MaterialNo)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ORDER_ITEM.Quantity)
       _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    });

    it("TC - Verify VAT as per Tax code, Gross value should be addition of net value and VAT, VAT calculation", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
      

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        });
        cy.wait(500).then(()=>{
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("ContractCode"))
        })
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 0);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_TOTALS, CONTAINER_COLUMNS_CONTRACT_TOTALS)
        });
        cy.SAVE().then(() => {
            _common.waitForLoaderToDisappear()
            _saleContractPage.verify_VAT_when_change_in_Taxcode(CONTAINERS_CONTRACT.taxcode)
           
        })
    });
  
    it ("TC - Verify the supplier should filter with branch", function () {
   
        
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
           
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.waitForLoaderToDisappear()
        cy.wait(2000).then(() => {
            _saleContractPage.change_Businesspartner_and_verify_supplier_with_branchname(CONTAINERS_CONTRACT.BP2, cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.SUPPLIER_FK, app.GridCells.SUBSIDIARY_FK, app.GridCells.BPD_VAT_GROUP_FK)
            _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
            _common.saveCellDataToEnv( cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PAYMENT_TERM_FI_FK,"PAYMENT_TERM_FI")
            _common.saveCellDataToEnv( cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.PAYMENT_TERM_FI_FK,"PAYMENT_TERM_PA")
            _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify set value to business partner, the branch and supplier should auto get value from bp", function () {
       
        _common.goToButton_inActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK,btn.IconButtons.ICO_BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()

       _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
			_common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
            _common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
		});
        cy.wait(500).then(() => {
            _common.assert_cellData(cnt.uuid.SUBSIDIARIES, app.GridCells.DESCRIPTION, Cypress.env("Business_Partner_Branch"))
        })
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS,1);
            _common.clear_subContainerFilter(cnt.uuid.SUPPLIERS)
		});
        cy.wait(500).then(() => {
           
            _common.assert_cellData(cnt.uuid.SUPPLIERS, app.GridCells.CODE, Cypress.env("Business_Partner_SupplierNo"))
            _common.assert_cellData(cnt.uuid.SUPPLIERS, app.GridCells.VAT_GROUP_FK, Cypress.env("VAT_Group"))
        })
    });

    it("TC - Verify the vat group should get value from bp", function () {
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
          });
        cy.wait(1000).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS);
            _common.assert_cellData(cnt.uuid.SUPPLIERS, app.GridCells.VAT_GROUP_FK, Cypress.env("VAT_Group"))
        })
    });

    it("TC - Verify set value to bp and supplier, the payment term(FI) and payment Term(PA)set value from busines partner", function () {
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
          });
        cy.wait(1000).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS);
            _common.assert_cellData(cnt.uuid.SUPPLIERS, app.GridCells.PAYMENT_TERM_FI_FK, Cypress.env("PAYMENT_TERM_FI"))
            _common.assert_cellData(cnt.uuid.SUPPLIERS, app.GridCells.PAYMENT_TERM_PA_FK, Cypress.env("PAYMENT_TERM_PA"))
        })
    });

    it("TC - Verify set value to business partner, the bank should get default value from bpset value to business partner, the bank should get default value from bp", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
          });
        cy.wait(1000).then(() => {
            _common.assert_cellDataByContent_inContainer(cnt.uuid.SUPPLIERS, app.GridCells.BANK_FK, Cypress.env("BUSINESS_PARTNER_BANK"))
        })
    })

    it("TC - set value to supplier, then vat group should be regenerated, after the vat group had be changed, it should recalculate items container/boq container and total container for gross columns", function () {
       
       
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TAX_CODE);
        _common.waitForLoaderToDisappear()
        cy.wait(4000)//required wait
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(2000)//required wait
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.TAX_CODE,app.GridCells.ID_SMALL,CONTAINERS_TAX_CODE.taxCodeID)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.TAX_CODE_MATRIXS,app.GridCells.BPD_VAT_GROUP_FK,CONTAINERS_TAX_CODE.VATGroup)
        _common.edit_containerCell(cnt.uuid.TAX_CODE_MATRIXS,app.GridCells.VAT_PERCENT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_TAX_CODE.VATPercent)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _saleContractPage.verify_VATByChangingVATgroup(CONTAINERS_TAX_CODE.code,CONTAINERS_TAX_CODE.VATGroup,CONTAINERS_TAX_CODE.VATPercent_INT)
    })
 
    it("TC - Verify responsible role and requisition owner role in procurement structure with same clerk role in the contract", function () {

       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
            cy.REFRESH_SELECTED_ENTITIES()
        });
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.code)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_PROCUREMENT_STRUCTURE.code)
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.FooterTab.ROLES);
            _saleContractPage.enterRecord_toCreateNewRole_Ifnotexist(CONTAINERS_PROCUREMENT_STRUCTURE.clerk)
        })
        _saleContractPage.select_role_of_ProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.Role)
        _saleContractPage.selectClerkRoleInRole(CONTAINERS_PROCUREMENT_STRUCTURE.Role)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);

        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.STRUCTURE_CODE, commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROCUREMENT_STRUCTURE.code)
        _common.clickOn_cellInSubContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      
        cy.wait(2000).then(() => {
            _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK,Cypress.env("Clerk"))
            
            _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_REQ_FK, Cypress.env("Clerk"))
        })
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    })

    it("TC - Verify the branch drop down should filter with bp and supplier", function () {
       
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS);
        });
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, CONTAINERS_BP_SUPPLIER.BusinesspartnerName)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BUSINESS_PARTNERS,app.GridCells.BUSINESS_PARTNER_NAME_1,CONTAINERS_BP_SUPPLIER.BusinesspartnerName)
        _common.waitForLoaderToDisappear()

        _saleContractPage.enterRecord_toCreateSupplierIfnotExist(CONTAINERS_BP_SUPPLIER.BranchDescription)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()

       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACTDETAIL, app.FooterTab.CONTRACTDETAILS);
        });
        _saleContractPage.verify_supplierNumberInContractDetails_by_changeingBPBranch(CONTAINERS_BP_SUPPLIER.BranchDescription)
        cy.wait(500).then(() => {
            _common.assert_getText_fromContainerForm(cnt.uuid.CONTRACTDETAIL, CONTAINERS_BP_SUPPLIER.LabelName, Cypress.env("Text"))
        })
    })

    it("TC - Verify get value from WIC group", function () {
        cy.clearCookies()
        cy.clearLocalStorage()
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC);
        cy.wait(5000)
        _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WIC_GROUPS, 0);
        });
        _common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WICCATALOGUES, 1);
            //_common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, WIC_Catalogues_grid.Column_Headers)
            cy.REFRESH_CONTAINER()
            _common.clickOn_cellHasUniqueValue(cnt.uuid.WIC_GROUPS, app.GridCells.CODE, CONTAINERS_WIC_CATALOG.WICGroupCode)
            cy.wait(2000)
            _saleContractPage.enterRecord_toCreateWIC_Catalogue_Ifnotexist(CONTAINERS_WIC_CATALOG.editContainerValues, CONTAINERS_WIC_CATALOG.tobeChangeValues, BOQ_STRCU_DESC2,
                CONTAINERS_WIC_BOQ_STRUCTURE.quantity,
                CONTAINERS_WIC_BOQ_STRUCTURE.unitRate,
                CONTAINERS_WIC_BOQ_STRUCTURE.uom,
                CONTAINER_COLUMNS_BOQ_STRUCTURE
            )
        });
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        cy.wait(5000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.REFRESH_CONTAINER()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BOQ_WIC_CAT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIC_CATALOG.WICGroupCode)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        cy.wait(500).then(() => {
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BOQ_WIC_CAT_BOQ_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WIC_CATALOG.WICBoQCode)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        for (var i = 0; i <= CONTAINERS_WIC_CATALOG.editContainerValuesInContract.length - 1; i++) {
            _common.assert_cellData(cnt.uuid.PROCUREMENTCONTRACT, CONTAINERS_WIC_CATALOG.editContainerValuesInContract[i], CONTAINERS_WIC_CATALOG.tobeChangeValues[i])
        }
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    })
})

    it("TC - Verify set value to framework material catalog and framwork wic boq, the purchase orders will change to Framework Contract Call Off", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
        })
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(500).then(() => {
            _common.assert_cellDataByContent_inContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS, "Framework Contract Call Off")
        })
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    })

    it("TC - Verify the framework material catalog should filter with mdc_material_catalog", function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        cy.wait(5000)
        cy.wait(5000)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINERS_MATERIAL_CATALOG.searchDatatypes1)
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.MATERIAL_CATALOG_TYPE_FK, CONTAINERS_MATERIAL_CATALOG.searchDatatypes1)
        _common.getTextfromCell(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        cy.wait(5000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        cy.wait(1000).then(() => {
            _saleContractPage.verify_RecordIsExistInPopUp_afterclickOnLookUp(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.MATERIAL_CATALOG_FK, app.GridCells.CODE, Cypress.env("Text"))
        })
    })


    it("TC - Verify Create new button and select a configuration, payment term and award method should get default value from prc_configuration", function () {
       
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
        cy.wait(5000)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_PROCUREMENT_CONFIGURATION.ConfigurationHeaderDescription)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CONTAINERS_PROCUREMENT_CONFIGURATION.ConfigurationDescription)
        //_common.clickOn_toolbarButton(cnt.uuid.CONFIGURATIONS,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CONTAINERS_PROCUREMENT_CONFIGURATION.ConfigurationDescription1)
        cy.wait(500)
        cy.get("#mainContent [class*='cid_ecf49aee59834853b0f78ee871676e38 '] #ecf49aee59834853b0f78ee871676e38 div.column-id_indicator").eq(0).click()
        cy.wait(500)
        _common.select_rowInContainer
        _common.edit_containerCell(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_AWARD_METHOD_FK,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROCUREMENT_CONFIGURATION.AwardMethod)
        cy.wait(1000)
        _mainView.select_popupItem('list', CONTAINERS_PROCUREMENT_CONFIGURATION.AwardMethod)
        cy.SAVE()
        cy.wait(5000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        cy.wait(5000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        cy.wait(2000).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENT_CONFIGURATION)
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.AWARD_METHOD_FK, CONTAINERS_PROCUREMENT_CONFIGURATION.AwardMethod)
        })
    })


    it("TC - Verify should get value from framework material catalog", function () {
      
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        cy.wait(5000)
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIAL_CATALOGS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        });
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        cy.REFRESH_SELECTED_ENTITIES()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, CONTAINERS_MATERIAL_CATALOG.FMC_CODE)
        for (var i = 0; i <= CONTAINERS_MATERIAL_CATALOG.editContainerValues.length - 1; i++) {
            _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, CONTAINERS_MATERIAL_CATALOG.editContainerValues[i],commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG.tobeChangeValues[i])
            cy.SAVE()
            cy.wait(1000)
        }
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        cy.wait(5000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,CONTAINER_COLUMNS_CONTRACT)
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.MATERIAL_CATALOG_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOG.FMC_CODE)
          
       
        cy.wait(1000)
        cy.SAVE()
        cy.wait(1000)
        _modalView.findModal().acceptButton("Yes");
        cy.wait(5000)
        for (var i = 0; i <= CONTAINERS_MATERIAL_CATALOG.editContainerValuesInContract.length - 1; i++) {
            _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, CONTAINERS_MATERIAL_CATALOG.editContainerValuesInContract[i], CONTAINERS_MATERIAL_CATALOG.tobeChangeValues[i])
        }
        cy.wait(1000)
        _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    })


    it("TC - select a contract with structure, set value to project, contract responsible and requisition owner should get value from project CLERK", function () {
       
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CLERK_RIGHTS, app.FooterTab.CLERK_RIGHT);
        });
        _common.create_newRecord(cnt.uuid.CLERK_RIGHTS)
        _common.edit_dropdownCellWithInput(cnt.uuid.CLERK_RIGHTS, app.GridCells.CLERK_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CLERK.ClerkName)
      
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
        cy.wait(5000)
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
            cy.REFRESH_SELECTED_ENTITIES()
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_CLERK.ProcurementCode)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_CLERK.ProcurementCode)
        _saleContractPage.select_role_of_ProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.Role)
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK, app.FooterTab.CLERK, 1);
        })
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.STRUCTURE_CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CLERK.ProcurementCode)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONSTATUS_FK,"Recorded")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.STRUCTURE_CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CLERK.ProcurementCode)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONSTATUS_FK,"Recorded")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      
        cy.wait(5000).then(() => {
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, CONTAINERS_CLERK.ClerkName)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_REQ_FK, CONTAINERS_CLERK.ClerkName)
    })
    })
});

