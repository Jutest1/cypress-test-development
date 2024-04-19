import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _procurementConfig, _projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { TRANSLATED } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST1_HEADER = "1EST-" + Cypress._.random(0, 999)
const EST_CODE = "EST_-" + Cypress._.random(0, 999)
const LINEITEM_DESC = "1ESTLI-" + Cypress._.random(0, 999)
const LINEITEM2_DESC = "2ESTLI-" + Cypress._.random(0, 999)
const PRC_GENERAL_COMMENT = "CMT_GNRL-" + Cypress._.random(0, 999)
const PRC_CERTIFICATE_COMMENT = "CMT_CERT-" + Cypress._.random(0, 999)
const MATCAT_DESC = "MATCAT-" + Cypress._.random(0, 9999)
const MATCAT_CODE = "MCD-" + Cypress._.random(0, 9999)
const MATGRP_CODE = "MG-" + Cypress._.random(0, 9999)
const MATGRP_DESC = "MGDES-" + Cypress._.random(0, 9999)
const REC_CODE = "R-" + Cypress._.random(0, 9999)
const REC_DESC = "RECDES-" + Cypress._.random(0, 9999)

let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINER_COLUMNS_MATERIAL_GROUP
let CONTAINER_COLUMNS_MATERIAL_RECORD
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_GENERALS
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_CERTIFICATES
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES
let CONTAINERS_MATERIAL_RECORD

let MATERIAL_RECORD_PARAMETER:DataCells
let MATERIAL_GROUPS_PARAMETER:DataCells
let MATERIAL_CATALOGS_PARAMETER:DataCells

let MATERIAL5_PARAMETER:DataCells
let MATERIAL4_PARAMETER:DataCells
let MATERIAL3_PARAMETER:DataCells
let MATERIAL2_PARAMETER:DataCells
let MATERIAL1_PARAMETER:DataCells
let LINEITEM2_PARAMETER:DataCells
let LINEITEM_PARAMETER:DataCells
let ESTIMATE_PARAMETER:DataCells
let CONTAINERS_LINE_ITEM
let CONTAINERS_RESOURCE
let CONTAINERS_ESTIMATE
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_ESTIMATE
let DJC_BUDGET_PARAMETERS:DataCells
let MODAL_GENERATE_BUDGET
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_PACKAGE_TOTAL
let CONTAINER_COLUMNS_PACKAGE_ITEMS
let MATERIAL6_PARAMETER: DataCells

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.12 | Create a multiple material package of line item for selected line item.");

describe("PCM- 2.12 | Create a multiple material package of line item for selected line item.", () => {

    before(function () {

        cy.fixture("procurement-and-bpm/pcm-2.12-create-a-multiple-material-package-of-line-item-for-selected-line-item.json")
          .then((data) => {
            this.data = data
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURES
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_CERTIFICATES=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURES_CERTIFICATES
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_GENERALS = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURES_GENERALS
            CONTAINER_COLUMNS_MATERIAL_RECORD=this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINERS_MATERIAL_RECORD=this.data.CONTAINERS.MATERIAL_RECORD

            MATERIAL_CATALOGS_PARAMETER = {
                [app.GridCells.DESCRIPTION_INFO]: MATCAT_DESC,
                [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_RECORD.BUSINESS_PARTNER,
                [app.GridCells.CODE]: MATCAT_CODE,
            }
            MATERIAL_GROUPS_PARAMETER = {
                [app.GridCells.CODE]: MATGRP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: MATGRP_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: commonLocators.CommonKeys.MATERIAL
            }
            MATERIAL_RECORD_PARAMETER= {
                [app.GridCells.CODE]: REC_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]: REC_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORD.UOM,
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE,
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE
            }

            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM       
    
            ESTIMATE_PARAMETER= {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST1_HEADER,
                [app.GridCells.RUBRIC_CATEGORY_FK]:CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
            }
            LINEITEM_PARAMETER= {
                [app.GridCells.DESCRIPTION_INFO]: LINEITEM_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };
            LINEITEM2_PARAMETER= {
                [app.GridCells.DESCRIPTION_INFO]: LINEITEM2_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };
            MATERIAL1_PARAMETER= {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE[0],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
            MATERIAL2_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE[1],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
            MATERIAL3_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE[2],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
            MATERIAL4_PARAMETER= {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: REC_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
            MATERIAL5_PARAMETER= {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE[4],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
            MODAL_GENERATE_BUDGET=this.data.MODAL.GENERATE_BUDGET
            DJC_BUDGET_PARAMETERS={
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]:MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]:MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]:MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]:MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }
            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_TOTAL=this.data.CONTAINER_COLUMNS.PACKAGE_TOTAL
            CONTAINER_COLUMNS_PACKAGE_ITEMS=this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS

            MATERIAL6_PARAMETER = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE[0],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
            };
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
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
    });

    it("TC - Configuring Procurement Structure Configuration", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, commonLocators.CommonKeys.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.MATERIAL)
        
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.GENERALS, app.FooterTab.GENERALS);
            _common.setup_gridLayout(cnt.uuid.GENERALS,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_GENERALS )
        });
        
        _common.clear_subContainerFilter(cnt.uuid.GENERALS)
        _common.addRecord_inSubContainer_ifNotExist(cnt.uuid.GENERALS, 0)
        _common.waitForLoaderToDisappear()

        _common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS, app.GridCells.PRC_CONFIG_HEADER_FK, commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.MATERIAL)
        _common.enterRecord_inNewRow(cnt.uuid.GENERALS, app.GridCells.COMMENT_TEXT, app.InputFields.DOMAIN_TYPE_COMMENT, PRC_GENERAL_COMMENT)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK)
               .then(($ele1: JQuery<HTMLElement>) => {
                    Cypress.env("PRC_GENERAL", $ele1.text())
                    cy.log(Cypress.env("PRC_GENERAL"))
               })
        
        _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES);
            _common.setup_gridLayout(cnt.uuid.CERTIFICATES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_CERTIFICATES )
        });
        
        _common.clear_subContainerFilter(cnt.uuid.CERTIFICATES)
        _common.addRecord_inSubContainer_ifNotExist(cnt.uuid.CERTIFICATES, 0)
        _common.edit_dropdownCellWithCaret(cnt.uuid.CERTIFICATES, app.GridCells.PRC_CONFIG_HEADER_FK, commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.MATERIAL)
        _common.enterRecord_inNewRow(cnt.uuid.CERTIFICATES, app.GridCells.COMMENT_TEXT, app.InputFields.DOMAIN_TYPE_COMMENT, PRC_CERTIFICATE_COMMENT)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PRC_CERTIFICATE", $ele1.text())
            cy.log(Cypress.env("PRC_CERTIFICATE"))
        })


        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()

        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOGS, MATCAT_DESC)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS_PARAMETER);
        cy.SAVE()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_CODE)
        _common.set_cellCheckboxValue( cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
    })

    it("TC - Create an Estimate Header, Create a new Line items and Assign Material Resources to Line Item", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETER)
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()

            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.budget, CONTAINER_COLUMNS_LINE_ITEM.basuomfk, CONTAINER_COLUMNS_LINE_ITEM.quantity, CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS, 2)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINEITEM_PARAMETER)
        cy.SAVE()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.isdisabled, CONTAINER_COLUMNS_RESOURCE.isbudget, CONTAINER_COLUMNS_RESOURCE.iscost, CONTAINER_COLUMNS_RESOURCE.quantity, CONTAINER_COLUMNS_RESOURCE.descriptioninfo, CONTAINER_COLUMNS_RESOURCE.code], cnt.uuid.RESOURCES)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,MATERIAL1_PARAMETER)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M1_Description", $ele1.text())
            cy.log(Cypress.env("M1_Description"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M1_Quantity", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M1_Quantity"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M1_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M1_Cost"))
        })
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_BUDGET, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED, commonLocators.CommonKeys.UNCHECK)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,MATERIAL2_PARAMETER)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M2_Description", $ele1.text())
            cy.log(Cypress.env("M2_Description"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M2_Quantity", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M2_Quantity"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M2_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M2_Cost"))
        })
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_BUDGET, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED, commonLocators.CommonKeys.UNCHECK)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,MATERIAL3_PARAMETER)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)

        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M3_Description", $ele1.text())
            cy.log(Cypress.env("M3_Description"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M3_Quantity", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M3_Quantity"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M3_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M3_Cost"))
        })
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_BUDGET, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED, commonLocators.CommonKeys.UNCHECK)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS, 2)
        _common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINEITEM2_PARAMETER)
        cy.SAVE()
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,MATERIAL4_PARAMETER)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M4_Description", $ele1.text())
            cy.log(Cypress.env("M4_Description"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M4_Quantity", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M4_Quantity"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M4_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M4_Cost"))
        })
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_BUDGET, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED, commonLocators.CommonKeys.UNCHECK)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,MATERIAL5_PARAMETER)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M5_Description", $ele1.text())
            cy.log(Cypress.env("M5_Description"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M5_Quantity", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M5_Quantity"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M5_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M5_Cost"))
        })
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_COST, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_BUDGET, commonLocators.CommonKeys.CHECK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_DISABLED, commonLocators.CommonKeys.UNCHECK)
    });

    it("TC - Verify LI total, Budget, Verify Scope, Configurations, Create a consolidated Material Package", function () {
        const TotalAmountLI2 = (parseFloat(Cypress.env("M4_Cost")) + parseFloat(Cypress.env("M5_Cost"))).toFixed(2).toString()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)

        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM2_DESC)
        _common.waitForLoaderToDisappear()

        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET, TotalAmountLI2)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM_DESC)
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _common.waitForLoaderToDisappear()

        _common.findRadio_byLabel_fromModal(commonLocators.CommonKeys.SELECTED_LINE_ITEM,commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
        _common.editModalDropdown_WithCaret(commonLocators.CommonKeys.CRITERIA_SELECTION)
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID_1, commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.clickOn_modalFooterButton(btn.ButtonText.PREVIOUS)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M1_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M2_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M3_Description"))
        _validate.verify_modalTextShouldNotExistInModalCell(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M4_Description"))
        _validate.verify_modalTextShouldNotExistInModalCell(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M5_Description"))
        _common.clickOn_modalFooterButton(btn.ButtonText.PREVIOUS)
        _common.findRadio_byLabel_fromModal(commonLocators.CommonKeys.CURRENT_RESULT_SET,commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
        _common.editModalDropdown_WithCaret(commonLocators.CommonKeys.CRITERIA_SELECTION)
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID_1, commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.clickOn_modalFooterButton(btn.ButtonText.PREVIOUS)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M1_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M2_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M3_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M4_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M5_Description"))
        _common.clickOn_modalFooterButton(btn.ButtonText.PREVIOUS)

        _common.findRadio_byLabel_fromModal(commonLocators.CommonLabels.ENTIRE_ESTIMATE, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
        _common.editModalDropdown_WithCaret(commonLocators.CommonKeys.CRITERIA_SELECTION)
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID_1, commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.clickOn_modalFooterButton(btn.ButtonText.PREVIOUS)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M1_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M2_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M3_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M4_Description"))
        _common.verify_cellHasValue_fromModal(app.GridCells.DESCRIPTION_CAPS, Cypress.env("M5_Description"))
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM_DESC)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("L1_Quantity", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("L1_Quantity"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE, commonLocators.CommonKeys.MATERIAL)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'))
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
          .then(() => {
            _common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env("PACKAGE_CODE_" + "0"))
          })
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, TRANSLATED, commonLocators.CommonKeys.MATERIAL, app.GridCells.STRUCTURE_FK_DESCRIPTION_INFO)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CONFIGURATION_FK, commonLocators.CommonKeys.MATERIAL)
        _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 3);
        _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_PACKAGE_TOTAL)
        _common.select_rowHasValue(cnt.uuid.TOTALS, commonLocators.CommonKeys.TOTAL)
        cy.wait(500)
          .then(() => {
            cy.log("C1=>" + Cypress.env("M1_Cost") + "C2=>" + Cypress.env("M2_Cost") + "C3=>" + Cypress.env("M3_Cost"))
            const package1Total = (parseFloat(Cypress.env("M1_Cost")) + parseFloat(Cypress.env("M2_Cost")) + parseFloat(Cypress.env("M3_Cost"))).toFixed(2).toString()
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, package1Total)
          })

        _common.select_tabFromFooter(cnt.uuid.PACKAGE_GENERALS, app.FooterTab.GENERALS, 3);
        _common.setup_gridLayout(cnt.uuid.PACKAGE_GENERALS,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_GENERALS)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE_GENERALS)
        _validate.verify_isRecordPresent(cnt.uuid.PACKAGE_GENERALS, Cypress.env("PRC_GENERAL"))

        _common.select_tabFromFooter(cnt.uuid.PACKAGE_CERTIFICATES, app.FooterTab.CERTIFICATES, 3);
        _common.setup_gridLayout(cnt.uuid.PACKAGE_CERTIFICATES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURES_CERTIFICATES)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE_CERTIFICATES)
        _validate.verify_isRecordPresent(cnt.uuid.PACKAGE_CERTIFICATES, Cypress.env("PRC_CERTIFICATE"))

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 3);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PACKAGE_ITEMS.quantity, CONTAINER_COLUMNS_PACKAGE_ITEMS.mdcmaterialfk, CONTAINER_COLUMNS_PACKAGE_ITEMS.description1], cnt.uuid.PACKAGEITEMS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        cy.SAVE().then(() => {
            cy.log("LI_Qty=>" + Cypress.env("L1_Quantity") + "M1_Qty=>" + Cypress.env("M1_Quantity") + "M2_Qty=>" + Cypress.env("M2_Quantity") + "M3_Qty=>" + Cypress.env("M3_Quantity"))
            const M1Quantity = (parseFloat(Cypress.env("L1_Quantity")) * parseFloat(Cypress.env("M1_Quantity"))).toFixed(2).toString()
            const M2Quantity = (parseFloat(Cypress.env("L1_Quantity")) * parseFloat(Cypress.env("M2_Quantity"))).toFixed(2).toString()
            const M3Quantity = (parseFloat(Cypress.env("L1_Quantity")) * parseFloat(Cypress.env("M3_Quantity"))).toFixed(2).toString()
            cy.log("Q1=>" + M1Quantity + "Q2=>" + M2Quantity + "Q3=>" + M3Quantity)
            _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, Cypress.env("M1_Description"))
            _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, M1Quantity)
            _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, Cypress.env("M2_Description"))
            _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, M2Quantity)
            _common.select_rowHasValue(cnt.uuid.PACKAGEITEMS, Cypress.env("M3_Description"))
            _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, M3Quantity)
        })
    })

    it("TC - Verify Package item Assignment, Matchness, Seperate Material package.", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear() 

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
        _common.waitForLoaderToDisappear() 

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST1_HEADER)

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.select_rowHasValue(cnt.uuid.ESTIMATE, EST1_HEADER)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM_DESC)

        _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _validate.verify_isRecordPresent(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, Cypress.env("M1_Description"))
        _validate.verify_isRecordPresent(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, Cypress.env("M2_Description"))
        _validate.verify_isRecordPresent(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, Cypress.env("M3_Description"))
        cy.SAVE()
        _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEM2_DESC)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,MATERIAL6_PARAMETER)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M6_Description", $ele1.text())
            cy.log(Cypress.env("M6_Description"))
        })
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("M6_Cost", $ele1.text().replace(",", ""))
            cy.log(Cypress.env("M6_Cost"))
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _common.waitForLoaderToDisappear()

        _common.findRadio_byLabel_fromModal(commonLocators.CommonKeys.SELECTED_LINE_ITEM, commonLocators.CommonKeys.RADIO, 0, commonLocators.CommonElements.RADIO_SPACE_TO_UP)
        _common.editModalDropdown_WithCaret(commonLocators.CommonKeys.CRITERIA_SELECTION)
        _common.select_ItemFromPopUpList(commonLocators.CommonKeys.GRID_1, commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        _common.select_rowHasValue_fromModal(Cypress.env("M4_Description"))
        _common.set_checkboxValueForAllRowCell_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
        _common.select_rowHasValue_fromModal(Cypress.env("M5_Description"))
        _common.set_checkboxValueForAllRowCell_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
        _common.select_rowHasValue_fromModal(Cypress.env("M6_Description"))
        _common.set_checkboxValueForAllRowCell_fromModal(app.SubContainerLayout.SELECTED, commonLocators.CommonKeys.CHECK)
        _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
        cy.wait(500).then(() => {
            _common.clickOn_cellHasValueWithIndex_fromModal(app.GridCells.STRUCTURE_DESCRIPTION_CAPS, Cypress.env("M4_Description"), 0)
            _common.assert_cellDataByContent_fromModal(app.GridCells.MATCHNESS, commonLocators.CommonKeys.NEW)
            _common.clickOn_cellHasValueWithIndex_fromModal(app.GridCells.STRUCTURE_DESCRIPTION_CAPS, Cypress.env("M5_Description"), 0)
            _common.assert_cellDataByContent_fromModal(app.GridCells.MATCHNESS, commonLocators.CommonKeys.NEW)
            _common.clickOn_cellHasValueWithIndex_fromModal(app.GridCells.STRUCTURE_DESCRIPTION_CAPS, Cypress.env("M6_Description"), 0)
            _common.assert_cellDataByContent_fromModal(app.GridCells.MATCHNESS, commonLocators.CommonKeys.PERFECTLY_MATCHED)
        })
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _package.create_materialPackageForUsing_separatePkgCheckbox(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        cy.wait(500).then(() => {
            _validate.verify_isRecordPresent(cnt.uuid.PACKAGE, Cypress.env("M4_Description"))
            _validate.verify_isRecordPresent(cnt.uuid.PACKAGE, Cypress.env("M5_Description"))
            _validate.verify_isRecordPresent(cnt.uuid.PACKAGE, Cypress.env("M6_Description"))
        })
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("M4_Description"))

        _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 3);
        _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_PACKAGE_TOTAL)
        _common.select_rowHasValue(cnt.uuid.TOTALS, commonLocators.CommonKeys.TOTAL)
        cy.wait(500).then(() => {
            cy.log(Cypress.env("M4_Cost"))
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env("M4_Cost"))
        })
        _common.select_rowHasValue(cnt.uuid.PACKAGE, Cypress.env("M5_Description"))

        _common.select_tabFromFooter(cnt.uuid.TOTALS, app.FooterTab.TOTALS, 3);
        _common.setup_gridLayout(cnt.uuid.TOTALS, CONTAINER_COLUMNS_PACKAGE_TOTAL)
        _common.select_rowHasValue(cnt.uuid.TOTALS, commonLocators.CommonKeys.TOTAL)
        cy.wait(500).then(() => {
            cy.log(Cypress.env("M5_Cost"))
            _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET, Cypress.env("M5_Cost"))
        })
    });

});
