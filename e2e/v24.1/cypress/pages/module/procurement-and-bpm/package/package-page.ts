/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _salesPage, _validate } from "cypress/pages";
import { app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";
var resoqtyTotal: any, costUnit1: any, costUnit2: any, remainingQty: any, contractNetValue: any;


export class Package {
  /* Entering record to create package header */
  enterRecord_toCreatePackage(procurementStru: string, descInfo: string) {
    _mainView.findModuleClientArea();
    _modalView.findModal()
              .findInputFieldInsideModal("Procurement structure", app.InputFields.INPUT_GROUP_CONTENT)
              .type(procurementStru)
              .then(() => {
                cy.wait(1000)
                _modalView.select_popupItem("grid", procurementStru);
              })
    _modalView.findModal()
      .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
      .clear({ force: true })
      .type(procurementStru)
      .then(() => {
        cy.wait(1000)
        _modalView.select_popupItem("grid", procurementStru);
      })
    _modalView.findModal()
      .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
      .clear()
      .type(descInfo);
    _modalView.findModal().acceptButton("OK");
  }

  /* Entering record to create package header using Wizard*/
  enterRecord_toCreatePackage_wizard(criteriaSelection: string) {
    cy.contains(
      ".modal-content",
      "Create / Update Material Package Assignment"
    ).within(() => {
      cy.contains("div", "Selected Line Item")
        .find("#estimateResultSet_3")
        .click();
    });
    _modalView.findModal().caret();
    _mainView.select_popupItem("grid1", criteriaSelection);

    /* Assignment of Resource does not load due to "Data loading issue", we need to traverse back ("Previous button") and forth ("Next Button") */
    _modalView.findModal()
              .acceptButton("Next");
    _modalView.findModal()
              .acceptButton("Previous");
    _modalView.findModal()
              .acceptButton("Next");
    cy.wait(3000)
    _modalView.findModal()
              .findCheckbox_byLabelnModal(commonLocators.CommonElements.SELECT_CHECKBOX,"Select",0)
    _modalView.findModal()
              .acceptButton("Next");
    cy.get(".modal-content .grid-container div.column-id_Selected")
      .as('checkbox')
      .invoke('is', ':checked')
      .then(($cell) => {
        if ($cell) {
          cy.log("already checked")
        }
        else {
          cy.get("@checkbox").click({ multiple: true });
        }
      })
    cy.contains(
      ".modal-content",
      "Create / Update Material Package Assignment"
    ).within(() => {
      cy.contains("div", "Include Cost Code").find("input").click();
      cy.contains("div", "Set Free Quantity").find("input").click();
      cy.contains("li", "Consolidate to one package for all selected criteria")
        .find("input")
        .click({ force: true });
    });
    _modalView.findModal().acceptButton("OK");
    cy.wait(2000);
    _modalView.findModal().acceptButton("Go to package");
  }
  enterRecord_toCreateBoQPackage_FromWizard(Grouping: string, estimateScope: string, groupingStructure: string, procurementStructure?: string, selectionStructure?: string, createUpdate?: string, transferFrom?: string,projectNo?:string) {
    switch (Grouping) {
      case "BoQ":
        _modalView.findModal()
                  .findRadio_byLabel(estimateScope, "radio", 2)
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure);
        cy.wait(1000)
        _modalView.findModal().acceptButton("Next");
        cy.wait(1000)
        _modalView.findModal().acceptButton("Back");
        cy.wait(1000)
        _modalView.findModal().acceptButton("Next");
        cy.wait(2000)
        // _modalView.findModal().findCell_ByIcon(app.GridCells.ICO_BOQ_ITEM,0)
        // _modalView.findModal()
        //           .findActiveRow()
        //           .checkbox_inCell(app.SubContainerLayout.SELECTED)
        //           .click();
        // _modalView.findModal().findCell_ByIcon(app.GridCells.ICO_BOQ_ITEM,0)  
        _modalView.findModal().checkBox_hasLabel("Select")
                  .click({ force: true })
        cy.wait(1000)       
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Structure",app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(procurementStructure);
        cy.wait(3000);
        cy.contains(".popup-container [class*='column-id_Code']",procurementStructure).click();
        cy.wait(2000);
        _modalView.findModal().acceptButton("Finish");
        cy.wait(3000);
        _modalView.findModal()
                  .goToButton()
        cy.wait(5000);
        cy.SAVE()
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        if (projectNo!=null) {
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, projectNo)
          _common.waitForLoaderToDisappear()
        }
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        cy.wait(1000)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.PACKAGE)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.CODE)
                 .wrapElements().then(($ele) => {
                   Cypress.env("Package_Code", $ele.text());
                 })
        break;

      case "LineItems":
        _modalView.findModal().findRadio_byLabel(estimateScope, "radio", 0);
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure);
        cy.wait(1000)
        _modalView.findModal()
                  .findCaretInsideModal("Choose Selection Structure to create Package");
        cy.wait(1000)
        _modalView.select_popupItem("grid1", selectionStructure);
        cy.wait(2000);
        _modalView.findModal().acceptButton("Next");
        cy.wait(2000);
        _modalView.findModal().acceptButton("Back");
        cy.wait(1000)
        _modalView.findModal().acceptButton("Next");
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _modalView.findModal()
                  .checkbox_inCell(app.GridCells.TEXT_CENTER)
                  .click();
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal()
                  .findRadio_byLabel(createUpdate, "radio", 0)
                  .then(() => {
                    if (createUpdate == "Create New") {
                      _modalView.findModal()
                                .findInputFieldInsideModal("Procurement Structure",app.InputFields.INPUT_GROUP_CONTENT)
                                .clear({ force: true })
                                .type(procurementStructure);
                      cy.wait(3000);
                      cy.contains(".popup-container [class*='column-id_Code']",procurementStructure).click();
                      cy.wait(2000);
                      _modalView.findModal().acceptButton("Finish");
                      cy.wait(3000);
                    } else {
                      _modalView.findModal()
                                .findRadio_byLabel(createUpdate, "radio", 0)
                      _modalView.findModal()
                                .findInputFieldInsideModal("Procurement Package",app.InputFields.INPUT_GROUP_CONTENT)
                                .clear({ force: true })
                                .type(Cypress.env("Package_Code"));
                      cy.wait(3000);
                      cy.contains(".popup-container [class*='column-id_code']",Cypress.env("Package_Code")).click();
                      cy.wait(2000);
                      _modalView.findModal().acceptButton("Finish");
                      cy.wait(3000);
                    }
                  });
        _modalView.findModal().goToButton();
        cy.wait(5000);
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.PACKAGE)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.CODE)
                 .wrapElements()
                 .then(($ele) => {
                  Cypress.env("Package_Code", $ele.text());
                 });
        break;

      case "Update Package":
        _modalView.findModal().findRadio_byLabel(estimateScope, "radio", 0);
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure);
        cy.wait(1000);
        _modalView.findModal()
                  .findCaretInsideModal("Choose Selection Structure to create Package");
        cy.wait(1000);
        _modalView.select_popupItem("grid1", selectionStructure);
        cy.wait(2000);
        _modalView.findModal().acceptButton("Next");
        cy.wait(1000);
        _modalView.findModal().acceptButton("Back");
        cy.wait(1000)
        _modalView.findModal().acceptButton("Next");
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _modalView.findModal()
                  .checkbox_inCell(app.GridCells.TEXT_CENTER)
                  .click();
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal().findRadio_byLabel(createUpdate,"radio", 0);
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Package",app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(Cypress.env("Package_Code"));
        cy.wait(2000);
        cy.contains(".popup-container [class*='column-id_code']",Cypress.env("Package_Code")).click();
        cy.wait(2000);
        _modalView.findModal().acceptButton("Finish");
        cy.wait(3000);
        _modalView.findModal().goToButton();
        break;

        case "Update Package with only grouping structure":
        _modalView.findModal().findRadio_byLabel(estimateScope, "radio", 0);
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure);
        cy.wait(2000);
        _modalView.findModal().acceptButton("Next");
        cy.wait(3000);
        _modalView.findModal()
                  .checkbox_inCell(app.GridCells.TEXT_CENTER)
                  .click();
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal().findRadio_byLabel(createUpdate, "radio", 0);
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Package",app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(Cypress.env("Package_Code"));
        cy.wait(3000);
        cy.contains(".popup-container [class*='column-id_code']",Cypress.env("Package_Code")).click();
        cy.wait(2000);
        _modalView.findModal().acceptButton("Finish");
        cy.wait(3000);
        _modalView.findModal().goToButton();
        break;

        case "Update Package with only grouping structure":
        _modalView.findModal().findRadio_byLabel(estimateScope, "radio", 0);
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure);
        cy.wait(2000);
        _modalView.findModal().acceptButton("Next");
        cy.wait(3000);
        _modalView.findModal()
                  .checkbox_inCell(app.GridCells.TEXT_CENTER)
                  .click();
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal().findRadio_byLabel(createUpdate, "radio", 0);
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Package",app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(Cypress.env("Package_Code"));
        cy.wait(3000);
        cy.contains(".popup-container [class*='column-id_code']",Cypress.env("Package_Code")).click();
        cy.wait(2000);
        _modalView.findModal().acceptButton("Finish");
        cy.wait(3000);
        _modalView.findModal().goToButton();
        break;

      case "LineItemWithResource":
        _modalView.findModal().findRadio_byLabel(estimateScope, "radio", 2);
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure);
        _modalView.findModal().acceptButton("Next");
        cy.wait(1000)
        _modalView.findModal().checkBox_hasLabel("Select").click({ force: true })
        cy.wait(1000)
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Structure",app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(procurementStructure);
        cy.wait(3000);
        cy.contains(".popup-container [class*='column-id_Code']",procurementStructure).click();
        cy.wait(2000);
        _modalView.findModal().findCaretInsideModal("Quantity Transfer From");
        cy.wait(1000)
        _mainView.select_popupItem("list",transferFrom);
        _modalView.findModal()
                  .findCheckBox_byLabel("Resource Selection via Cost Code", "checkbox")
                  .then((ele) => {
                    if (ele.find("[class*='not-empty']").length > 0) {
                      cy.log("checked is already checked");
                    } else {
                      _modalView.findModal()
                                .findCheckBox_byLabel("Create Package for Line item with no resource","checkbox" )
                                .click();
                    }
                  });
        cy.wait(3000);
        _modalView.findModal().acceptButton("Finish");
        cy.wait(5000);
        _modalView.findModal().goToButton();
        cy.wait(5000)
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        if (projectNo!==null) {
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, projectNo)
          _common.waitForLoaderToDisappear()
        }
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.PACKAGE)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.CODE)
                 .wrapElements()
                 .then(($ele) => {
                  Cypress.env("Package_Code", $ele.text());
                 });
        break;
    }
  }
  enterRecord_toCreateBoQPackage_FromWizard_Duplicate(boqPackage: string, estimateScope: string, estimateScopeIndex: number, groupingStructure: string, procurementStructure: string, qtyTransferValue: string, createPackageCheckbox?: string,configuration?:string) {
    switch (boqPackage) {
      case 'Project BoQ':
        _modalView.findModal()
                  .findRadio_byLabel(estimateScope, "radio", estimateScopeIndex)
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure)
        _modalView.findModal().acceptButton("Next");
        cy.wait(1000)
        _modalView.findModal().checkBox_hasLabel("Select")
                  .check({ force: true })
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Structure", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(procurementStructure)
        cy.wait(500);
        cy.contains(".popup-container [class*='column-id_Code']", procurementStructure).click()
        cy.wait(500);
        if (configuration) {
          _modalView.findModal()
                  .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(configuration)
          cy.wait(500);
          cy.contains(".popup-container [class*='column-id_']", configuration).click()
          cy.wait(500);
        }
        
        _modalView.findModal()
                  .findInputFieldInsideModal("Quantity Transfer From", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true }).type(qtyTransferValue)
        cy.wait(500)
        _modalView.findModal().select_popupItem("list", qtyTransferValue)
        cy.wait(500)
        if (createPackageCheckbox != null) {
          _modalView.findModal().findCheckBox_byLabel("Create Package for Line item with no resource", "checkbox")
                                .as("check").invoke('is', ':checked')
                                .then(checked => {
                                  if (createPackageCheckbox == "check") {
                                    if (!checked) {
                                      cy.get('@check').check();
                                    }
                                  } if (createPackageCheckbox == "uncheck") {
                                    if (checked) {
                                      cy.get('@check').uncheck();
                                    }
                                  }
                                  })
        }
        _modalView.findModal().acceptButton("Finish")
        cy.wait(3000);
        this.storePackageCode()
        cy.wait(500);
        _modalView.findModal().goToButton()
        break;
      case 'WIC BoQ':
        _modalView.findModal()
                  .findRadio_byLabel(estimateScope, "radio", estimateScopeIndex)
        _modalView.findModal()
                  .findCaretInsideModal("Select Grouping Structure to create Package");
        _modalView.select_popupItem("grid1", groupingStructure)
        _modalView.findModal().acceptButton("Next");
        cy.wait(4000)
        _modalView.findModal().checkBox_hasLabel("Select")
                  .click({ force: true })
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal()
                  .findInputFieldInsideModal("Procurement Structure", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(procurementStructure)
        cy.wait(500);
        cy.contains(".popup-container [class*='column-id_Code']", procurementStructure).click()
        cy.wait(500)
        _modalView.findModal()
                  .findInputFieldInsideModal("Quantity Transfer From", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true }).type(qtyTransferValue)
        cy.wait(500)
        _modalView.findModal().select_popupItem("list", qtyTransferValue)
      
        _modalView.findModal()
                  .acceptButton("Finish")
        cy.wait(3000);
        this.storePackageCode()
        cy.wait(500);
        _modalView.findModal()
                  .goToButton()
        break;
      default:
        cy.log("Boq Package not present")
    }
  }

  changeStatus_ofPackage_inWizard() {
    _common.openTab("tab_1312");
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
           .search_fromSidebar("wizard", "Change Package Status");
    _modalView.findModal().containsValue("In-Progress").click({ force: true });
    _modalView.findModal().acceptButton("OK");
    cy.wait(5000);
  }

  /* Assign controlling unit to created package */
  assignControllingUnit_toPackage(controllingUnit: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(controllingUnit);
    cy.wait(2000);
    _mainView.select_popupItem("grid", controllingUnit);
  }

  // /* Assign controlling unit to created package in Contract module */
  // assignControllingUnit_toContract(controllingUnit: string) {
  //   _modalView.findModal().acceptButton("Go To Contract");
  //   _mainView
  //     .findModuleClientArea()
  //     .findAndShowContainer(cnt.uuid.CONTACTS)
  //     .findGrid()
  //     .findActiveRow()
  //     .findCell(app.gridCells.contractControllingUnit)
  //     .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
  //     .type(controllingUnit);
  //   _mainView.select_popupItem("grid", controllingUnit);
  // }

  assingItems_toPackage(Itemdescription1: string, Quantity: string, structure: string, UoM: string, MaterialNumber: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.DESCRIPTION_1)
             .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
             .type(Itemdescription1);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_STRUCTURE_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(structure);
    _mainView.select_popupItem("grid", structure);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BAS_UOM_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(UoM);
    _mainView.select_popupItem("grid", UoM);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.MDC_MATERIAL_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(MaterialNumber);
    _mainView.select_popupItem("grid", MaterialNumber);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(Quantity);
    cy.wait(2000);
  }
  /* Creating record in procurement BoQs */
  create_ProcuremenBoQs() {
    _modalView.findModal().acceptButton("OK");
  }

  deleteRecord_materialPackage() {
    _common.delete_recordFromContainer(cnt.uuid.ITEMS);
    cy.wait(3000);
    _common.delete_recordFromContainer(cnt.uuid.PACKAGE);
    cy.wait(3000);
    _modalView.findModal().acceptButton("Yes");
  }

  /* entering record to create BoQ structure */
  enterRecord_toCreateBoQStructure(briefInfo: any, Uom: string, Qty: any) {
    _mainView.findModuleClientArea()
            .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
            .findGrid()
            .findCell(app.GridCells.BRIEF_INFO_SMALL)
            .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
            .type(briefInfo);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findCell(app.GridCells.BAS_UOM_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(Uom);
    _mainView.select_popupItem("grid", Uom);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(Qty);
  }

  /* Deleting package */
  delete_Package() {
    _common.delete_recordFromContainer(cnt.uuid.PACKAGE);
    _modalView.findModal().acceptButton("Yes"); 
  }

  create_ContractfromPackage(BusinessPartner: string) {
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner",app.InputFields.INPUT_GROUP_CONTENT)
              .wait(1000)
              .clear({force:true})
              .wait(1000)
              .type(BusinessPartner, { force: true });
    _common.waitForLoaderToDisappear()
    _modalView.select_popupItem("grid", BusinessPartner);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton("Next");
    _common.waitForLoaderToDisappear()
    _validate.validate_Text_message_In_PopUp("Create contract(s) successfully!")
    this.getCode_fromContractModal("CONTRACT_CODE")
    _modalView.findModal().acceptButton("Go To Contract");
  }

  /* Getting text of quantity total from resources */
  get_qtyTotal_ofResources() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.RESOURCES)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_TOTAL)
             .wrapElements()
             .invoke("text")
             .then((text) => {
              resoqtyTotal = text;
              console.log(resoqtyTotal);
              });
  }

  verify_Totals_from_package_to_Estimate_Totals(uuid: string, gridCells, ModuleName: string, uuid2: string, gridCells2, Record: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(uuid)
             .findGrid()
             .findActiveRow()
             .getCell(gridCells)
             .wrapElements()
             .then(($ele) => {
                Cypress.env("Text1", $ele.text());
                cy.log("Package Totals Net Value is: " + Cypress.env("Text1"));
              });
    cy.wait(2000)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, ModuleName);
    _common.waitForLoaderToDisappear()
    cy.wait(2000) //required wait
    _common.select_allContainerData(uuid2)
    cy.wait(1000)
    _common.search_inSubContainer(uuid2,Record)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(uuid2,app.GridCells.DESCRIPTION_INFO,Record)
    _mainView.findModuleClientArea()
             .findAndShowContainer(uuid2)
             .findGrid()
             .findActiveRow()
             .getCell(gridCells2)
             .wrapElements()
             .then(($ele) => {
              Cypress.env("Text2", $ele.text());
              cy.log("Estimate Totals Grand Total is: " + Cypress.env("Text2"));
              cy.log("Package Totals Net Value is: " + Cypress.env("Text1"));
              expect(Cypress.env("Text2")).to.equals(Cypress.env("Text1"));
            });
  }

  /* Getting and verifying quantity total of resources with Items quantity */
  get_andVerify_qtyTotalWith_PackageItemQty() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .invoke("text")
             .then((itemsQty) => {
              console.log(itemsQty);
              expect(resoqtyTotal).to.eq(itemsQty);
             });
  }
  /* Getting and verifying the total of resources with requisition Items quantity */
  get_andVerify_qtyTotalWith_requisitionItemQty() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
             .findGrid()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .invoke("text")
             .then((requisitionQty) => {
              console.log(requisitionQty);
              expect(resoqtyTotal).to.eq(requisitionQty);
             });
  }
  get_verify_NetValue_inPackage(actualMaterial: string, resourceCode: string) {
    cy.wait(3000);
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.TOTALS)
      .findGrid().findActiveRow()
      .getCell(app.GridCells.VALUE_NET)
      .wrapElements()
      .then(($value) => {
        const PackageTotal1 = parseFloat(
          $value.text()
        )
        expect(PackageTotal1).to.not.equals('0.00');
        console.log("PackageTotal===>", PackageTotal1)
        Cypress.env("Total1", PackageTotal1);
      });
  }

  get_verify_NetValue_inPackage_with_LineItem_CostTotal() {
    cy.wait(3000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.TOTALS)
             .findGrid().findActiveRow()
             .getCell(app.GridCells.VALUE_NET)
             .wrapElements()
             .then(($value) => {
              const PackageTotal = parseFloat(
                $value.text()
              )

    var FinalTotal = parseFloat(Cypress.env("Total1")) + PackageTotal;
    var FinalTotal1 = FinalTotal.toFixed(2)
   cy.log(FinalTotal1)
   expect(FinalTotal1).to.equals(Cypress.env("Text"))
      });
  }

  get_Verify_CostTotal_And_TotalNet() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.TOTALS)
             .findGrid()
             .findCellhasValue(app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
             .click();
    _common.assert_cellData_insideActiveRow(cnt.uuid.TOTALS,app.GridCells.VALUE_NET,Cypress.env("Text"));
  }

  /* Verifying each package from package module */
  verify_SeparatePackageof_materialsTotalswithResources(catalogue1: any,catalogue2: any) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .getCell(app.GridCells.DESCRIPTION)
             .containsValue(catalogue1)
             .click({ force: true });
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .getCell(app.GridCells.PRC_PACKAGE_FK_DESCRIPTION)
             .wrapElements()
             .should("have.text", catalogue1)
             .then(() => {
              cy.log(
                "First package-->Material is successfully assigned to the package");
             });
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.TOTALS)
             .findGrid()
             .getCell(app.GridCells.VALUE_NET)
             .wrapElements()
             .eq(1)
             .should("have.text", costUnit1);
    //second package validation
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .getCell(app.GridCells.DESCRIPTION)
             .containsValue(catalogue2)
             .click({ force: true });
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .getCell(app.GridCells.PRC_PACKAGE_FK_DESCRIPTION)
             .wrapElements()
             .should("have.text", catalogue2)
             .then(() => {
              cy.log(
                "Second package-->Material is successfully assigned to the package"
              );
             });
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.TOTALS)
             .findGrid()
             .getCell(app.GridCells.VALUE_NET)
             .wrapElements()
             .eq(1)
             .should("have.text", costUnit2);
  }
  /* Getting cost per unit values from two resources  */
  get_valueOfcostPerUnitOfTwoResources() {
    _mainView.findModuleClientArea()
            .findAndShowContainer(cnt.uuid.RESOURCES)
            .findGrid()
            .getCell(app.GridCells.COST_UNIT)
            .wrapElements()
            .each(($el, index, $list) => {
              const costperUnit = $el.text();
              const values = costperUnit.split(" ");
              const res = values[0];
              if (index === 0) {
                costUnit1 = res;
              } else if (index === 1) {
                costUnit2 = res;
              }
            }).then(() => {
                console.log(`Cost per unit of cell 1: ${costUnit1}`);
                console.log(`Cost per unit of cell 2: ${costUnit2}`);
              });
  }

  /* Entering record to create package header using Wizard*/
  create_materialPackageForUsing_separatePkgCheckbox(criteriaSelection: string) {
    cy.contains(".modal-content","Create / Update Material Package Assignment").within(() => {
      cy.contains("div", "Selected Line Item")
        .find("#estimateResultSet_3")
        .click();
    });
    _modalView.findModal().caret();
    _mainView.select_popupItem("grid1", criteriaSelection);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    cy.wait(2000);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().checkBox_hasLabel("Select").click();
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
              .wrapElements()
              .find("[class*='text-center']")
              .filter(":nth-child(1), :nth-child(3)")
              .click({ multiple: true });
    cy.contains("li", "Separate package for each material catalog")
      .find("input")
      .click({ force: true });
    cy.wait(2000);
    _modalView.findModal().acceptButton("OK");
    cy.wait(10000);
    _modalView.findModal()
    .wrapElements()
    .find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.CODE_CAPS)
    .each(($el,index,$list)=>{
      Cypress.env("PACKAGE_CD_"+index,$el.text())
    })
    _modalView.findModal().acceptButton("Go to package");
  }

  getVerify_EstimateLineItem_With_BoQStructure(LineItemdes: string,Expected_Result:string) {
    _common.openTab(app.TabBar.BOQBASED).then(()=>{
    _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
      _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
              .findGrid()
              .findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, LineItemdes)
              .click();
      cy.REFRESH_CONTAINER()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,"Position")
    cy.SAVE()
    cy.wait(500).then(()=>{
      _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE,app.GridCells.FINAL_PRICE_SMALL,Expected_Result);
    })       
    _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURE)
    })
    
  }

  verify_PackageTotal_with_CostTotal() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.TOTALS)
             .findGrid()
             .findCellhasValue(app.GridCells.TRANSLATED, "Total",app.GridCells.TOTAL_TYPE_FK_DESCRIPTION_INFO)
             .click()
             .then(() => {
              _common.assert_cellData_insideActiveRow(
                cnt.uuid.TOTALS,
                app.GridCells.VALUE_TAX,
                Cypress.env("costTotalSum")
              );
            });
  }

  update_Procurement_Schedule(plannedEnd: string, plannedStart: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PLANNED_END)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(plannedEnd);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PLANNED_START)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(plannedStart);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar("wizard", "Update Scheduling");
    _modalView.findModal()
    .findRadio_byLabel_InModal("Update procurement schedule for current package","radio", 0,"radio spaceToUp");
    _modalView.findModal().acceptButton("OK");
    cy.wait(2000);
    _modalView.findModal().goToButton();
    cy.wait(3000);
  }

  /* Recplace material from wizard through Requisition */
  replaceMaterial_from_Wizard(costCode: any, replacementMaterialCode: any) {
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
              .wrapElements()
              .within(() => {
                cy.contains("div", costCode).click({ force: true });
                cy.wait(1000);
              });
    cy.contains("div", replacementMaterialCode)
      .parent("div")
      .find('[type="checkbox"]')
      .click({ force: true });
    _modalView.findModal().acceptButton("Replace");
    _modalView.findModal().acceptButton("OK");
  }

  /* Verify that material number of requisition items should not be same as resource material */
  verify_requsitionItemNumberWithResourceMaterial(costCode: any) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
             .findGrid()
             .getCell(app.GridCells.MDC_MATERIAL_FK)
             .wrapElements()
             .invoke("text")
             .then((text) => {
              const reqItemMaterialNo = text;
              console.log(reqItemMaterialNo);
              expect(costCode).to.not.equal(reqItemMaterialNo);
            });
  }

  verify_TotalUnderTotalsContainer(totalsContainerId: string,typeDescription: string,total: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.TOTALS)
             .findGrid()
             .findCellhasValue(app.GridCells.TRANSLATED, typeDescription, PACKAGE_TOTAL_TRANSLATION)
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(totalsContainerId)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.VALUE_NET)
             .wrapElements()
             .then(($val) => {
              let newString = $val.text();
              cy.log(newString);
              expect(newString).to.equal(total);
            });
  }

  enterRecordTo_Update_Item_price_wizard(scope:string,priceversion: string,price:number) {
    cy.contains(".modal-content", "Update Item Price - 1 / 2").within(() => {
      cy.contains("div", scope)
        .find("input[value='1']")
        .click();
    });
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
              .wrapElements()
              .find("[class*='modal-content'] [class*='checkbox']")
              .then((checkbox) => {
                if (checkbox.find("[checked='checked']").length > 0) {
                  cy.contains(".modal-content", "Update Item Price - 2 / 2").within(
                    () => {
                      cy.contains("div", "Material Catalog Price Version")
                        .find("input")
                        .click();
                      cy.contains("div", "Quotation").find("input").click();
                      cy.contains("div", "Contract")
                        .find("input")
                        .click({ force: true });
                      cy.contains("div", "Include Neutral Material")
                        .find("input")
                        .click();
              
                    }
                  );
        } else {
          cy.contains(".modal-content", "Update Item Price - 2 / 2").within(
            () => {
              cy.contains("div", "Contract").find("input").check();
            }
          );
        }
      });
    _modalView.findModal()
              .wrapElements()
              .then(()=> {
                    cy.get("[class*='platform-form-row'] [class*='input-group-btn']").eq(1).click()
                })
    _modalView.select_popupItem("grid", priceversion);
    _modalView.findModal()
    .wrapElements()
    .then(()=> {
          cy.get("[class*='platform-form-row'] [data-ng-click='search()']").click()
      })
      cy.wait(500)
    _modalView.findModal().findModalBody().findCellhasValue(app.GridCells.UNIT_RATE,price).click()
    _modalView.findModal()
              .findModalBody()
              .findActiveRow()
              .wrapElements()
              .find("[class*='text-center']")
              .click({ force: true });
    cy.wait(1000);
    _modalView.findModal().acceptButton("Update");
    cy.wait(1000);
    _modalView.findModal().acceptButton("OK");
    cy.wait(1000);
  }

  getVerify_BoQDetails_With_BoQStructure(uuid) {
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(uuid)
             .findAndShowContainer(uuid)
             .findGrid()
             .findCell_ByIcon(app.GridCellIcons.ICO_BOQ_ITEM,0)
             .wrapElements()
             .click();
    _common.assert_cellData_insideActiveRow(uuid,app.GridCells.QUANTITY_SMALL,Cypress.env("Text"));
  }

  verify_Package_inLineItem() {
    cy.then(()=>{
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PACKAGE_ASSIGNMENTS,Cypress.env("Package_Code"));
    })
  }

  assin_ProcurementPackagetoLineItem() {
    _common.create_newRecord(cnt.uuid.PACKAGEITEM);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEM)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_PACKAGE_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(Cypress.env("Package_Code"));
    _mainView.select_popupItem("grid", Cypress.env("Package_Code"));
    cy.SAVE();
  }

  getVerify_LineItemQuantity_With_BoQStructureOfPackage(description: string,quantity: string) {
    _common.openTab(app.TabBar.BOQDETAILS);
    cy.wait(2000);
    cy.REFRESH_CONTAINER();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, description)
             .click()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($ele) => {
              const expectedQuantity = $ele.text().split(".")[0];
              expect(expectedQuantity).to.equal(quantity);
             });
  }

  update_BoQPackages(estimateScope: string,estimateScopeIndex:number,createBoQ: string,transferFrom: string) {
    _modalView.findModal().findRadio_byLabel(estimateScope, "radio",estimateScopeIndex);
    _modalView.findModal().acceptButton("Next");
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton(" Previous");
    _common.waitForLoaderToDisappear()
    cy.wait(500)
    _modalView.findModal().acceptButton("Next");
    _common.waitForLoaderToDisappear()
    _modalView.findModal().findCaretInsideModal("Select Criteria to Create BoQ");
    _modalView.select_popupItem("list", createBoQ);
    _modalView.findModal().findCaretInsideModal("Quantity Transfer From");
    _modalView.select_popupItem("list", transferFrom)
    _modalView.findModal().acceptButton("Update")
    _modalView.findModal().acceptButton("OK")
  }


  selectDataFromSubContainer2(container_UUID: string, data: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findCellhasValue(app.GridCells.REFERENCE, data, "")
             .scrollIntoView()
             .click({ force: true });
  }
  assert_cellData_insideActiveRow(container_UUID: string, gridCellClass: string, actualValue: string) {
    var textValue;
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .wrapElements().first().within(() => {
              cy.get(`[class*='active'] [class*='column-id_${gridCellClass}']`).each(($el, index, $list) => {
                const ActVal = $el.text()
                cy.log(ActVal)
                expect(ActVal).to.equals(actualValue)
              })
             })
  }

  generate_BudgetForLineItem(XFactor: string) {
    _modalView.findModal().findRadio_byLabel("Entire Estimate", "radio", 0)
    _modalView.findModal().findRadio_byLabel("Grand Total", "radio", 0)
    _modalView.findModal().findInputFieldInsideModal("x Factor", app.InputFields.INPUT_GROUP_CONTENT)
      .clear().type(XFactor);
    _modalView.findModal().acceptButton("OK");
    cy.get("[class='message ng-binding']").then(function (element) {
      const actualtext = element.text(); expect(actualtext.includes("Done Successfully")).to.be.true;
    });
    cy.contains("button", "OK").click();
  }

  get_PackageCode(containerId: string, projectName: string) {
    cy.get(".cid_" + containerId + " .column-id_" + app.GridCells.PROJECT_FK_PROJECT_NAME)
      .as("data")
      .each(($el, index, $list) => {
        cy.get("@data").eq(index).click();
        cy.get(".cid_" + containerId + ' [class*="active"] .column-id_' + app.GridCells.PROJECT_FK_PROJECT_NAME)
          .then(($val) => {
            let projectNamePackage = $val.text();
            if (projectNamePackage == projectName) {
              cy.get(".cid_" + containerId + ' [class*="active"] .column-id_' + app.GridCells.CODE).then(($value) => {
                let packageCode = $value.text();
                cy.log(packageCode);
                Cypress.env("PackageCode" + index, packageCode);
              });
            }
          });
      });
  }


  fromWizard_updateMaterialPackage(estimateScope: string, estimateScopeIndex: number) {
    _modalView.findModal()
              .findRadio_byLabel_Col(estimateScope, "radio", estimateScopeIndex);
    _modalView.findModal().acceptButton("Next");
    cy.wait(5000);
    _modalView.findModal().acceptButton("OK");
  }

  verify_QuantityandTotalFromItems(containerId: string, quantity: string, total: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerId)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($value) => {
              let ItemsQuantity = $value.text();
              expect(ItemsQuantity).equals(quantity);
             });
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerId)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.TOTAL)
             .wrapElements()
             .then(($val) => {
              let ItemsTotal = $val.text();
              expect(ItemsTotal).equals(total);
             });
  }

  /* Entering record to create package header for 2 packages with consolidated checkbox*/
  create_materialPackageforTwoPackageswith_Consolidatedchkbox1(criteriaSelection: string) {
    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.contains("div", "Selected Line Item").find("#estimateResultSet_3").click()
    })

    _modalView.findModal().caret(); _mainView.select_popupItem("grid1", criteriaSelection);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous")
    cy.wait(2000)
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().checkBox_hasLabel("Select").click();
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().containsValue("A0").click();

    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.get("div.active  div.item-field_Selected input").check()
    })
    _modalView.findModal().containsValue("MG2FM").click();

    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.get("div.active  div.item-field_Selected input").check()
      cy.get("[class*=' slick-header-column indicator']").click()
    })

    cy.contains("li", "Consolidate to one package for all selected criteria")
      .find("input").click({ force: true })
    _modalView.findModal().acceptButton("OK");
    cy.wait(10000);
    _modalView.findModal()
      .acceptButton("Go to package");
  }

  create_materialPackage_Consolidatedchkbox(scope: string, scopeID: string, criteriaSelection: string, resourcecode: string) {
    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.contains("div", scope).find("#" + scopeID).click()
    })
    _modalView.findModal().caret(); _mainView.select_popupItem("grid1", criteriaSelection);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous")
    cy.wait(2000)
    _modalView.findModal().acceptButton("Next");
    cy.wait(2000)
    _modalView.findModal().checkBox_hasLabel("Select").click();
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().containsValue(resourcecode).click();
    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.wait(1000)
      cy.get("div.active  div.item-field_Selected input").check({force:true})
    })
    cy.contains("li", "Consolidate to one package for all selected criteria")
      .find("input").check({ force: true })
    _modalView.findModal().acceptButton("OK");
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .acceptButton("Go to package");
    _common.waitForLoaderToDisappear()
  }

  enter_recordUpdate_Material_package(radiobutton: string, radiobuttonID: string, pkgOption: string, pkgOptionValue: string) {
    cy.contains(".modal-content", "Update Material Package(s)").within(() => {
      cy.contains("div", radiobutton).find("#" + radiobuttonID).check()
      cy.wait(2000)
    })
    _modalView.findModal().acceptButton(btn.ButtonText.NEXT);
    _common.waitForLoaderToDisappear()
    cy.wait(3000)
    _modalView.findModal().checkBox_hasLabel(commonLocators.CommonLabels.SELECT).check({force:true})
    cy.wait(1000)   
    cy.contains("div", pkgOption).find("input[value='" + pkgOptionValue + "']").check({force:true})
    _modalView.findModal().findModalBody()
              .acceptButton("OK")
    _common.waitForLoaderToDisappear()
    _validate.verify_WizardMessage("Package(s) are updated successfully!")
    
  }


  verify_QuantityAndcostTotalUnderResourceContainer(ContainerId: string, costtotal: string, Quantity: string) {
    _mainView.findModuleClientArea()
            .findAndShowContainer(ContainerId)
            .findGrid()
            .getCell(app.GridCells.TREE)
            .wrapElements().eq(0)
            .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(ContainerId)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($value) => {
              let ItemsQuantity = $value.text();
              expect(ItemsQuantity).equals(Quantity);
             });
    _mainView.findModuleClientArea()
             .findAndShowContainer(ContainerId)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.COST_TOTAL)
             .wrapElements()
             .then(($value) => {
              let CostTotal = $value.text();
              expect(CostTotal).equals(costtotal);
            });
  }

  get_ItemsItemNumber(containerId: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(containerId)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.ITEM_NO)
             .wrapElements()
             .then(($value) => {
              let ItemNumber = $value.text();
              Cypress.env("ItemNumber", ItemNumber);
            });
  }

  get_netValueOf_ContractDetail() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.CONTRACTDETAIL)
             .wrapElements()
             .contains("label", "Net")
             .next()
             .find("input")
             .invoke("val") 
             .then((net) => {
              contractNetValue = net;
              console.log(contractNetValue);
            });
  }

  verify_remainingQtyFromPESItems(qty: any) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ITEMS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_REMAINING)
             .wrapElements()
             .eq(0)
             .invoke("text")
             .then((initialRemainingQtyText) => {
              const remainingQty = parseFloat(
                initialRemainingQtyText.replace(",", "")
              );
    console.log(remainingQty);
    const newRemainingQty = remainingQty - qty;
    const expRemainingQty = newRemainingQty.toLocaleString(undefined, {minimumFractionDigits: 3,maximumFractionDigits: 3}).replace('-','');
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(`${qty}{enter}`)
    cy.wait(3000)
    cy.SAVE();
    cy.wait(5000)
   _mainView.findModuleClientArea()
            .findAndShowContainer(cnt.uuid.ITEMS)
            .findGrid()
            .findActiveRow()
            .getCell(app.GridCells.QUANTITY_REMAINING)
            .wrapElements()
            .eq(0)
            .invoke("text")
            .then((updatedRemainingQtyText) => {
              const updatedRemainingQty = updatedRemainingQtyText.replace('-','');
              console.log(updatedRemainingQty);
              expect(parseFloat(updatedRemainingQty)).to.equal(parseFloat(expRemainingQty.replace('-','')));
            });
      });
  }

  enterRecord_toCreate_Invoice_FromWizard(radioLabel: string, invoicenumber: any) {
    _modalView.findModal()
              .wrapElements()
              .within(() => {
                cy.contains(radioLabel).find("[type='radio']").click();
              });
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
              .findInputFieldInsideModal("Invoice No.", app.InputFields.DOMAIN_TYPE_CODE)
              .type(invoicenumber);
    _modalView.findModal().acceptButton("OK");
    _modalView.findModal().acceptButton("Go To Invoice");
  }

  Verify_invoiceContractTotal() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.INVOICEHEADER)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.CONTRACT_TOTAL)
             .wrapElements()
             .invoke("text")
             .then((text) => {
              const contracttotalInvoice = text;
              expect(contractNetValue).to.equal(contracttotalInvoice);
             });
  }

  /* Verifying total of two PES "Total" cell value and validating
  with contract "Net" cell value */
  verifyTotalsofTwo_Pes_withContractNet() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.HEADERS)
             .findGrid().getCell(app.GridCells.PES_VALUE)
             .wrapElements()
             .eq(0)
             .invoke('text')
             .then((total1) => {
              const pesTotal1 = parseFloat(total1.replace(/[^0-9.-]+/g, ""));
              console.log("++++", pesTotal1);
              _mainView.findModuleClientArea()
                       .findAndShowContainer(cnt.uuid.HEADERS)
                       .findGrid().getCell(app.GridCells.PES_VALUE)
                       .wrapElements()
                       .eq(1)
                       .invoke('text')
                       .then((total2) => {
                        const pesTotal2 = parseFloat(total2.replace(/[^0-9.-]+/g, ""));
                        console.log("++++", pesTotal2);
                        const totalSum = pesTotal1 + pesTotal2;
                        cy.wrap(totalSum.toLocaleString('en-US', { minimumFractionDigits: 2 }))
                          .as('totalSum').then(() => {
                            Cypress.env('totalSum', totalSum.toLocaleString('en-US', { minimumFractionDigits: 2 }));
                            console.log('Total Sum:', Cypress.env('totalSum'));
                            cy.wait(1000)
                            _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.HEADERS, "Contract")
                            cy.wait(6000)
                            _mainView.findModuleClientArea()
                                     .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
                                     .findGrid().getCell(app.GridCells.NET)
                                     .wrapElements().eq(0).invoke('text').then((contractNetTotal) => {
                                      expect(Cypress.env('totalSum')).to.eq(contractNetTotal);
                                      });
                           });
                        });
               });
  }

  assignRequisitionCode(RequisitionCode: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITION_IN_RFQ)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.REQ_HEADER_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(RequisitionCode);
    _modalView.findPopup().findButtonWithTitle("Refresh").clickIn()
    cy.wait(5000)
    _mainView.select_popupItem("grid", RequisitionCode);
  }


  /* Verify items scope replacement */
  itemScopeReplacementfromWizard() {
    _modalView.findModal()
              .wrapElements().then(() => {
        cy.wait(2000)
        _modalView.findModal()
                  .findCheckbox_inCell(app.GridCells.IS_CHECKED)
                  .check({ force: true })
        _modalView.findModal().acceptButton("OK")
      })
  }
  edit_ProcurementStructureUnderPackage(value: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.PACKAGE).findGrid().findActiveRow().findCell(app.GridCells.STRUCTURE_FK).findTextInput(app.InputFields.INPUT_GROUP_CONTENT).wait(500).clear().type(value);
    cy.wait(2000)
    _mainView.select_popupItem("grid", value)
    cy.wait(2000)
    cy.SAVE()
    cy.wait(2000)
    _modalView.findModal().acceptButton(btn.ButtonText.YES)
  }

  /* create requisition*/
  enterData_ToCreateRequisition(configuration: string) {
    _modalView.findModal()
              .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
              .clear().type(configuration)
    _modalView.findModal().select_popupItem("grid", configuration)
    _modalView.findModal().acceptButton("OK")
  }

  /* entering data to create requisition items in requisition */
  enterDataToCreate_requisitionItem(materialNo: any, qty: any, price?: any, isFreeQuantity?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.MDC_MATERIAL_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(materialNo)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
             .select_popupItem("grid", materialNo)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
             .keyAction("{enter}")
    cy.SAVE()
    cy.wait(2000)
    cy.REFRESH_SELECTED_ENTITIES()
      .then(() => {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, materialNo)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.QUANTITY_SMALL)
                 .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                 .type(qty)
       })
    cy.SAVE()
    cy.wait(2000)
    cy.REFRESH_SELECTED_ENTITIES()
    cy.wait(1000)
    cy.REFRESH_SELECTED_ENTITIES()
    if (price != null) {
      _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, materialNo)
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
               .findGrid()
               .findActiveRow()
               .findCell( app.GridCells.PRICE)
               .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
               .type(price)
    }
    cy.wait(1000)
    if (isFreeQuantity != null) {
      cy.REFRESH_SELECTED_ENTITIES()
        .then(() => {
          _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, materialNo)
          _mainView.findModuleClientArea()
                   .findAndShowContainer(cnt.uuid.REQUISITIONITEMS)
                   .findGrid()
                   .findActiveRow()
                   .getCell(app.GridCells.IS_FREE_QUANTITY)
                   .wrapElements()
                   .find(commonLocators.CommonElements.CHECKBOX_TYPE)
                   .as("check")
                   .invoke('is', ':checked')
                   .then(checked => {
                    if (isFreeQuantity == "check") {
                      if (!checked) {
                        cy.get('@check').check();
                      }
                    } if (isFreeQuantity == "uncheck") {
                      if (checked) {
                        cy.get('@check').uncheck();
                      }
                    }
                  })
        })
    }
    cy.SAVE()
  }

  /* Create requisition from wizard with modal actions */

  createRequisition_FromWizard(radioBtnLabel: string, index: number,projectChange?:string) {
    _modalView.findModal()
              .findRadio_byLabel_InModal(radioBtnLabel, "radio", index,"radio spaceToUp")
    if(projectChange)
    {
      _modalView.findInputFieldInsideModal("Change Request",app.InputFields.INPUT_GROUP_CONTENT).clear().type(projectChange)
      _mainView.select_popupItem("grid",projectChange)
    }
    _modalView.findModal()
              .acceptButton("OK")
  }

  sumofNetValPackage(container_UUID: string, gridCell1: string, value: string) {

    var NET_Total: any
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(gridCell1)
             .wrapElements().then(($value) => {
              let Net_Value1 = $value.text().replace(",", "")
              _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION, value);
              _mainView.findModuleClientArea()
                       .findAndShowContainer(container_UUID)
                       .findGrid()
                       .findActiveRow()
                       .getCell(gridCell1)
                       .wrapElements().then(($value) => {
                        let Net_Value2 = $value.text().replace(",", "")
                        NET_Total = (parseFloat(Net_Value1) + parseFloat(Net_Value2)).toFixed(2)
             
                        expect(NET_Total).equals(parseFloat(Cypress.env("Text").replace(',','')).toFixed(2))

                });
            })
  }

  create_SubPackage(description: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.SUB_PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.DESCRIPTION)
             .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
             .type(description);
  }

  storePackageCode() {
    cy.wait(5000)
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.MODAL_FLEX_ELEMENT).then(($value) => {
      var str = $value.text()
      var splitted = str.split(" ", 3);
      console.log(splitted[1])
      Cypress.env("PK-Code", splitted[1])
    })
  }

  changeProcurementStructure_InPackage(procurementStructure: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.STRUCTURE_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(`{selectAll}{backspace}${procurementStructure}`);
    cy.wait(2000);
    _mainView.select_popupItem("grid", procurementStructure);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.CODE)
    cy.wait(2000);
    _modalView.findModal().acceptButton("Yes");
  }

  assert_BusinessPartner_ByGetText_of_Branch_supplier_VATGroup(businessPartner: string, supplier: string, vatGroup: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BUSINESS_PARTNER_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(`{selectAll}{backspace}${businessPartner}`);
    cy.wait(2000);
    _mainView.select_popupItem("grid", businessPartner);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.CODE)
    cy.wait(2000);
    _modalView.findModal().acceptButton("Yes");
    cy.wait(2000);
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.SUPPLIER_FK, supplier)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.BPD_VAT_GROUP_FK, vatGroup)
  }

  enterRecord_toPackage(MaterialNumber: string, Itemdescription1: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.MDC_MATERIAL_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(MaterialNumber);
    cy.wait(2000);
    _mainView.select_popupItem("grid", MaterialNumber);
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.DESCRIPTION_1)
             .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
             .type(Itemdescription1);
    cy.wait(2000);
  }

  deleteRecord_PackageItems() {
    _common.delete_recordFromContainer(cnt.uuid.PACKAGEITEMS);
    cy.wait(3000);
    _common.delete_recordFromContainer(cnt.uuid.PACKAGE);
    cy.wait(3000);
  }

  validateAndUpdateItemQuantity_wizardOption(labelName: string, index: any) {
    _modalView.findModal()
              .findRadio_byLabel_InModal(labelName, "radio", index,"radio spaceToUp");
    _modalView.findModal()
              .acceptButton("OK");
    cy.wait(2000);
    _modalView.findModal()
              .acceptButton("OK");

  }
  /* update package(BoQ) from wizard
**Aditya
Pass the attribute "Name" value of the checkbox to the json in array with check or uncheck
e.g--> [{"name": "UpdateExistItem",
        "nameCheckboxVal": "check"}]*/
  updatePackageBoQ_FromWizard(checkBoxName: any) {
    for (var index in checkBoxName) {
      if (checkBoxName[index].nameCheckboxVal == "check") {
        cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " input[name='" + checkBoxName[index].name + "']")
          .as('chkbox1').invoke('is', ':checked')
          .then((isChecked) => {
            if (!isChecked) {
              cy.get('@chkbox1').check();
            }
          });
      }
      if (checkBoxName[index].nameCheckboxVal == "uncheck") {
        cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " input[name='" + checkBoxName[index].name + "']")
          .as('chkbox1').invoke('is', ':checked')
          .then((isChecked) => {
            if (isChecked) {
              cy.get('@chkbox1').uncheck();
            }
          });
      }
    }
    _modalView.findModal()
      .acceptButton("OK")
  }
  
  
enterRecord_toCreateInvoiceHeader(parameter:{container_UUID: string, invoiceNo: string, pes?: string, contract?: string,businessPartner?:string,procurementStructure?:string,taxCode?:string,controllingUnit?:string,responsible?:string,billingSchema?:string,type?:string,configuration?:string}) {
  _common.enterRecord_inNewRow(parameter.container_UUID, app.GridCells.REFERENCE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, parameter.invoiceNo)
  if (parameter.contract) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(parameter.container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PROJECT_FK)
    _common.edit_dropdownCellWithInput(parameter.container_UUID, app.GridCells.CON_HEADER_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, parameter.contract)
    _mainView.findModuleClientArea()
             .findAndShowContainer(parameter.container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PROJECT_FK)
             .wrapElements()
             .wait(3000)
             .then(() => {
                cy.get("body")
                  .then(($body) => {
                    if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
                      _modalView.findModal().acceptButton(btn.ButtonText.OK)
                    }
                  })
            })
  }
  cy.wait(2000)
  if (parameter.pes) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(parameter.container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PROJECT_FK)
    _common.edit_dropdownCellWithInput(parameter.container_UUID, app.GridCells.PES_HEADER_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, parameter.pes)
    _mainView.findModuleClientArea()
             .findAndShowContainer(parameter.container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PROJECT_FK)
             .wrapElements()
             .wait(2000)
             .then(() => {
                _common.waitForLoaderToDisappear()
                cy.get("body")
                  .then(($body) => {
                    if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
                      _modalView.findModal().acceptButton(btn.ButtonText.OK)
                    }
                  })
            })
  }
  if(parameter.businessPartner){
    _common.clickOn_activeRowCell(parameter.container_UUID,app.GridCells.PRC_STRUCTURE_FK)
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,parameter.businessPartner)
  }
  if(parameter.procurementStructure){
    _common.clickOn_activeRowCell(parameter.container_UUID,app.GridCells.PRC_STRUCTURE_FK)
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,parameter.procurementStructure)
  }
  if(parameter.controllingUnit){
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.CONTROLLING_UNIT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,parameter.controllingUnit)
  }
  if(parameter.taxCode){
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.TAX_CODE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,parameter.taxCode)
  }
  if(parameter.responsible){
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.CLERK_PRC_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,parameter.responsible)
  }
  if(parameter.configuration){
    _common.clickOn_activeRowCell(parameter.container_UUID,app.GridCells.PRC_STRUCTURE_FK)
    cy.wait(2000)
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.PRC_CONFIGURATION_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,parameter.configuration)
  }
  if(parameter.billingSchema){
    _common.clickOn_activeRowCell(parameter.container_UUID,app.GridCells.PRC_STRUCTURE_FK)
    cy.wait(2000)
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.BILLING_SCHEMA_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,parameter.billingSchema)
  }
  if(parameter.type){
    _common.edit_dropdownCellWithInput(parameter.container_UUID,app.GridCells.INV_TYPE_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,parameter.type)
  }
  
}


  enterRecord_toCreateBoQPackage_FromWizard_ForExistingPackage(Grouping: string, estimateScope: string, groupingStructure: string, procurementStructure?: string, selectionStructure?: string, createUpdate?: string, transferFrom?: string) {

    _modalView.findModal()
              .findRadio_byLabel(estimateScope, "radio", 2)
    _modalView.findModal()
              .findCaretInsideModal("Select Grouping Structure to create Package");
    _modalView.select_popupItem("grid1", groupingStructure);
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().findCell_ByIcon(app.GridCells.ICO_BOQ_ITEM,0)
    _modalView.findModal()
              .findActiveRow()
              .checkbox_inCell(app.SubContainerLayout.SELECTED)
              .click();
    _modalView.findModal().acceptButton("Next");
    _modalView.findRadio_byLabel("Update to Existed Package", "radio", 0)
    _modalView.findModal()
              .findInputFieldInsideModal("Procurement Package", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(Cypress.env("Package_Code"));
    _modalView.select_popupItem("grid", Cypress.env("Package_Code"))
    cy.wait(3000);
    _modalView.findModal().acceptButton("Finish");
    cy.wait(3000);
    _modalView.findModal()
              .goToButton()
    cy.wait(5000);

  }
  enterRecord_toCreateQuote(rfq:string,bpName:string){
    _modalView.findModal()
              .findInputFieldInsideModal("RfQ Header",app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(rfq,{force:true})
              .then(()=>{
                _modalView.select_popupItem("grid",rfq)
              })
      cy.wait(2000)
    _modalView.findModal()
              .findCellhasValue(app.GridCells.BP_NAME,bpName)
              .click()
    _modalView.findModal().wrapElements().get(`[class*='${app.SubContainerLayout.SELECTED}'] `).then((ele) => {
                cy.wait(2000);
                cy.wrap(ele).find('[type="checkbox"]').check({force:true});
              });
    _modalView.findModal().wrapElements().get(`[class*='${app.GridCells.COPIED_PRICE}'] `).then((ele) => {
                cy.wait(2000);
                cy.wrap(ele).find('[type="checkbox"]').check({force:true});
    })
    _modalView.findModal().acceptButton("OK")
    
  }
  
 enterRecord_toCreatePaymentTerm(container_UUID:string,code:string,codeFinance:string,descriptionInfo:string,netDays:string,discountDays:string,discountPercent:string,dayOfMonth:string,calculationTyeFk:string){
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,code)
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE_FINANCE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,codeFinance)
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,descriptionInfo)
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.NET_DAYS,app.InputFields.INPUT_GROUP_CONTENT,netDays)
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.DISCOUNT_DAYS,app.InputFields.INPUT_GROUP_CONTENT,discountDays)
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.DISCOUNT_PERCENT,app.InputFields.INPUT_GROUP_CONTENT,discountPercent)
  _common.enterRecord_inNewRow(container_UUID,app.GridCells.DAY_OF_MONTH,app.InputFields.INPUT_GROUP_CONTENT,dayOfMonth)
  _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.CALCULATION_TYPE_FK,"list",calculationTyeFk)
  }

  addBusinessPartnerToRequisition(container_UUID:string,modalLabel:string,bpName:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BUSINESS_PARTNER_FK)
             .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
    
    cy.wait(2000)
    _modalView.searchInModal(app.InputFields.INPUT_GROUP_FORM_CONTROL,modalLabel,bpName)
    _modalView.findModalBody()
              .findButtonWithTitle("search").clickIn()
    _modalView.findModal()
              .findCellhasValue(app.GridCells.BP_NAME_1, bpName)
              .click()
    _modalView.acceptButton("OK")
  }
  
  verify_BidderRecord(container_UUID:string,modalLabel:string,bpName:string,procurementStructure?:string,resourceType?:string,country?:string,lastname?:string,lastname1?:string,firstname?:string,modalLabel2?:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BUSINESS_PARTNER_FK)
             .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)    
    cy.wait(2000)
    _modalView.findModalBody()
              .searchInModal(app.InputFields.DOMAIN_TYPE_DESCRIPTION,modalLabel,bpName)
    _modalView.findModalBody()
              .findButtonWithTitle("search")
              .clickIn()
    _modalView.findModal()
              .findCellhasValue(app.GridCells.BP_NAME_1, bpName)
              .click()
    _modalView.findModal()
              .findActiveRow()
              .getCell(app.GridCells.BP_NAME_1)
              .wrapElements().then(($value) => {
                let expectvalue = $value.text();
                    expect(bpName).equals(expectvalue);
              })
    if (procurementStructure!=null) {
    _modalView.findModal()
              .findCheckbox_byLabelnModal("spaceToUp",procurementStructure,0)
              .as("checkbox")
              .invoke("is", ":checked").then((checked) => {
                  if (!checked) {
                      cy.get("@checkbox").check();
                      } else{
                        cy.log("Already Checked")
                      }
                  })              
    _modalView.findModal()
              .wrapElements().then(() => {
                  cy.get(`[data-ng-model="${app.DataNGLocator.PRC_STRUCTURE_SELECTED_ITEM_FK}"]`).find(commonLocators.CommonElements.INPUT_TEXT).clear().type(resourceType)
               })
    cy.wait(2000) //This wait is necessary
    _modalView.findModal()
              .select_popupItem("grid", resourceType);
    _modalView.findModalBody()
              .findButtonWithTitle("search").clickIn()
        }
    _modalView.findModal()
              .findCheckbox_byLabelnModal("spaceToUp","Location",0)
              .as("checkbox")
              .invoke("is", ":checked").then((checked) => {
                           if (!checked) {
                                cy.get("@checkbox").check();
                              } else{
                                cy.log("Already Checked")
                              }
                            })
    _modalView.findModal()
              .findRadio_byLabel_InModal("Regional","radio",0,"radio spaceToUp")
              .click()
    _modalView.findModal()
              .wrapElements().then(() => {
                  cy.get(`[data-ng-model="${app.DataNGLocator.LOCATION_REGIONAL_SELECTED_ITEM_FK}"]`)
                    .find(commonLocators.CommonElements.INPUT_TEXT)
                    .clear().type(country)
                        })
                  cy.wait(2000) //This wait is necessary
    _modalView.findModal()
              .select_popupItem("list", country);
    _modalView.findModalBody()
              .findButtonWithTitle("search").clickIn()
    _modalView.findModal()
              .findCellhasValue(app.GridCells.BP_NAME_1, bpName)
              .click()
                          
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" ."+commonLocators.CommonElements.BRANCH_CONTAINER+" ."+app.ContainerElements.SUBVIEW_HEADER).contains(bpName)
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" ."+commonLocators.CommonElements.CONTACT_CONTAINER+" ."+app.ContainerElements.SUBVIEW_HEADER).contains(bpName)
    _modalView.findModal()
              .acceptButton("OK")
              cy.wait(2000) //This wait is necessary
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FIRST_NAME,firstname)
    _common.clickOn_cellInSubContainer(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FK)
    _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(app.GridCells.CONTACT_FK)
            .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)    
          cy.wait(2000)
    _modalView.findModal()
              .searchInModal_byDataNG_Selector(modalLabel2,lastname1)
    _modalView.findModalBody()
              .findButtonWithTitle("search")
              .clickIn()
    _modalView.findModal().findCellhasValue(app.GridCells.FAMILY_NAME_CAPS,lastname1).click()
    _modalView.findModal()
              .acceptButton("OK")
            cy.SAVE()
    _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.BIDDERS,app.GridCells.CONTACT_FK,lastname)
    }

    /* searching record by column filter*/
  searchRecord_byColumnFilter(container_UUID: string,columncellClass:string,textInputClass:string,searchValue: string)
  {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ICO_SEARCH_COLUMN)
             .assertClass("active")
             .then((searchField) => {
              if(searchField)
              {
                cy.get("body").then(($body) => {
                  if ($body.find(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`).length > 0) {
                    cy.wait(500)
                    cy.get(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`)
                      .click();
                  }
                });
                console.log("----> column filter is present and direct searching <----");
                _mainView.findModuleClientArea()
                         .findAndShowContainer(container_UUID)
                         .findGrid()
                         .wrapElements().then(()=>{
                          cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                            .click({force:true}).click()
                          cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                            .find(`input[class^='${textInputClass}']`)
                            .clear({force:true})
                            .type(`${searchValue}{enter}`)
                         })
              }
              else {
                console.log("----> Clicking on column filter icon and searching <----");
               _mainView.findModuleClientArea()
                        .findAndShowContainer(container_UUID)
                        .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                        .findButton(btn.ToolBar.ICO_SEARCH_COLUMN)
                        .clickIn()
                      cy.get("body").then(($body) => {
               if ($body.find(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`).length > 0) {
                      cy.wait(500)
                      cy.get(`.cid_${container_UUID} [class*='${btn.IconButtons.ICO_INPUT_DELETE}']`)
                        .click();
                  }
              });
                      cy.wait(500)
               _mainView.findModuleClientArea()
                        .findAndShowContainer(container_UUID)
                        .findGrid()
                        .wrapElements()
                        .then(()=>{
                      cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                        .click({force:true}).click()
                      cy.get(`.cid_${container_UUID} div.${app.SubContainerLayout.ITEM_FIELD}${columncellClass}`)
                        .find(`input[class^='${textInputClass}']`)
                        .type(`${searchValue}{enter}`)
              })
          }
      })
  }
    
  enterRecord_toCreatePES(uuid:string,desc:string,bpName:string,responsible:string,contract?:string,controllingUnit?:string,pkg?:string,procurementStru?:string){
    _common.enterRecord_inNewRow(uuid,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,desc)
    if(procurementStru != null){
      cy.REFRESH_SELECTED_ENTITIES()
      _common.edit_dropdownCellWithInput(uuid,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,procurementStru)
    } 
    if(contract != null){
      cy.REFRESH_SELECTED_ENTITIES()
      _common.edit_dropdownCellWithInput(uuid,app.GridCells.CON_HEADER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,contract)
    }             
    if(controllingUnit != null){
      cy.REFRESH_SELECTED_ENTITIES()
      _common.edit_dropdownCellWithInput(uuid,app.GridCells.CONTROLLING_UNIT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,controllingUnit)
      
    }    
    if(pkg != null){
      cy.REFRESH_SELECTED_ENTITIES()
      _common.edit_dropdownCellWithInput(uuid,app.GridCells.PACKAGE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,pkg)
    }    
    _common.edit_dropdownCellWithInput(uuid,app.GridCells.BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,bpName)
    cy.REFRESH_SELECTED_ENTITIES()
    _common.edit_dropdownCellWithInput(uuid,app.GridCells.CLERK_PRC_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,responsible)
    cy.wait(1000)
  }

  clickOn_SubLevel(){
    _mainView.findActiveRow()
             .findButton(btn.IconButtons.ICO_TREE_COLLAPSE)
             .clickIn()
  }

  clickOn_actionsCollapse(container_UUID:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
             .findButton(btn.ToolBar.ACTIONS)
             .clickIn()
    _mainView.findButton(btn.ToolBar.ICO_TREE_LEVEL_COLLAPSE)
             .clickIn() 
  }

  getCode_fromContractModal(envName:string) {
    cy.wait(5000)
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message']").then(($value) => {
      var str = ($value.text()).replace(" ","")
      console.log(str)
      var splitted = str.split(":", 2);
      console.log(splitted[1])
      Cypress.env(envName, (splitted[1].replace(/'/g, "")).replace(/^\s+|\s+$/g, ""))
    })
  }
  
  enterRecord_toCreateNewRequisitionItem(container_UUID:string,data:DataCells) {
    let inputValue
    const ITEM_NO="1" + Cypress._.random(100, 999);
    cy.wait(2000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.ITEM_NO)
             .findTextInput(app.InputFields.DOMAIN_TYPE_DIRECTIVE)
             .invoke("val")
             .then((value)=> {
              if (value == "") {
                 inputValue=ITEM_NO
                cy.wrap(ITEM_NO).as('REQUISITION_ITEM_NO')
                _common.enterRecord_inNewRow(container_UUID, app.GridCells.ITEM_NO, app.InputFields.DOMAIN_TYPE_DIRECTIVE,inputValue);
              }else{
                inputValue=value.toString()
                cy.wrap(inputValue).as('REQUISITION_ITEM_NO')
              }
             });
    
    if(data[app.GridCells.MDC_MATERIAL_FK]){
      _common.select_rowInContainer(container_UUID)
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_MATERIAL_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.MDC_MATERIAL_FK])
      _common.clickOn_activeRowCell(container_UUID,app.GridCells.ITEM_NO)
      cy.SAVE()
      cy.wait(2000)
    }
    if(data[app.GridCells.QUANTITY_SMALL]){
      cy.REFRESH_SELECTED_ENTITIES()
        .then(() => {
          cy.get('@REQUISITION_ITEM_NO').then((inputValue) => {
            cy.log("FETCHED-ITEMNO="+inputValue.toString())
            _common.clickOn_cellHasUniqueValue(container_UUID, app.GridCells.ITEM_NO,inputValue.toString())
          })
          _common.select_rowInContainer(container_UUID)
          _common.enterRecord_inNewRow(container_UUID,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL])
        })
      cy.SAVE()
      cy.wait(2000)
    }
    if(data[ app.GridCells.PRICE_SMALL]){
      cy.REFRESH_SELECTED_ENTITIES()
      cy.wait(2000)
      cy.get('@REQUISITION_ITEM_NO').then((inputValue) => {
        _common.clickOn_cellHasUniqueValue(container_UUID, app.GridCells.ITEM_NO,inputValue.toString())
      })
      _common.select_rowInContainer(container_UUID)
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRICE_SMALL])
      cy.SAVE()
      cy.wait(2000)
    }
    if(data[app.GridCells.IS_FREE_QUANTITY]){
      cy.wait(1000)
      cy.REFRESH_SELECTED_ENTITIES()
        .then(() => {
          cy.get('@REQUISITION_ITEM_NO').then((inputValue) => {
            _common.clickOn_cellHasUniqueValue(container_UUID, app.GridCells.ITEM_NO,inputValue.toString())
          })  
          cy.REFRESH_SELECTED_ENTITIES()
          cy.REFRESH_SELECTED_ENTITIES()    
          _common.select_rowInContainer(container_UUID)
          _common.set_cellCheckboxValue(container_UUID,app.GridCells.IS_FREE_QUANTITY,data[app.GridCells.IS_FREE_QUANTITY])   
        })         
      cy.SAVE()
      cy.wait(2000)
    }  
    if(data[app.GridCells.AGN]){
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.AGN,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.AGN])
    }
    if (data[app.GridCells.BAS_UOM_FK]) {
      cy.REFRESH_SELECTED_ENTITIES()
        .then(() => {
          cy.get('@REQUISITION_ITEM_NO').then((inputValue) => {
            _common.clickOn_cellHasUniqueValue(container_UUID, app.GridCells.ITEM_NO,inputValue.toString())
          })
          _common.select_rowInContainer(container_UUID)
          _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BAS_UOM_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BAS_UOM_FK])
        })
      cy.SAVE()
      cy.wait(2000)
    }
  }

   create_changeOrderContractForNewItem_fromWizard(data:DataCells){
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.MATERIAL_CODE_SMALL)
              .each(($el,index)=>{
                cy.wrap($el).click()
                _modalView.findModal()
                          .findModalBody()
                          .wrapElements()
                          .find(".active"+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.VARIANCE)
                          .then(($val)=>{
                            Cypress.env($el.text()+"-VAT",$val.text())
                          })
              })
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT_CHANGE)
              .closest(commonLocators.CommonElements.ROW)
              .within((ele) => {
                cy.wrap(ele).find(`[class*='${btn.IconButtons.ICO_INPUT_ADD}']`)
                  .click()
              })
    cy.wait(2000)
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .last()
              .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT)
              .closest(commonLocators.CommonElements.ROW)
              .within((ele) => {
                      cy.wrap(ele)
                        .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                        .eq(0)
                        .wait(1000)
                        .clear()
                        .type(data[commonLocators.CommonLabels.PROJECT])           
              }).then(()=>{
                cy.wait(2000)
                _modalView.select_popupItem("grid",data[commonLocators.CommonLabels.PROJECT])
              })
    if (data[commonLocators.CommonLabels.RUBRIC_CATEGORY]) {
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .last()
              .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.RUBRIC_CATEGORY)
              .closest(commonLocators.CommonElements.ROW)
              .within((ele) => {
                  cy.wrap(ele)
                    .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                    .wait(1000)
                    .clear()
                    .type(data[commonLocators.CommonLabels.RUBRIC_CATEGORY])  
              }).then(()=>{
                cy.wait(2000)
                _modalView.select_popupItem("grid",data[commonLocators.CommonLabels.RUBRIC_CATEGORY])
              })
            }
    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .last()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.DESCRIPTION)
                .closest(commonLocators.CommonElements.ROW)
                .within((ele) => {
                    cy.wrap(ele).find("[class*='"+app.InputFields.DOMAIN_TYPE_DESCRIPTION+"']")
                      .wait(1000)
                      .clear()
                      .type(data[commonLocators.CommonLabels.DESCRIPTION])           
                })
    }

    _modalView.findModal()
              .findCaretInsideModal(commonLocators.CommonLabels.CHANGE_TYPE)
              .then(()=>{
                _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CHANGE_TYPE])
              })
    cy.wait(2000) // required wait load dropdown option after selction of change type
    _modalView.findModal()
              .findCaretInsideModal(commonLocators.CommonLabels.CHANGE_REASON)
              .then(()=>{
                cy.wait(2000)
                _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CHANGE_REASON])
              })
    
    cy.wait(2000)
      .then(()=>{
        cy.get("[class*='modal-footer']")
          .last()
          .contains(btn.ButtonText.OK)
          .click();
      })
    
    cy.wait(4000)
    /* if (data[commonLocators.CommonLabels.DESCRIPTION]) {
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT_CHANGE)
                .closest(commonLocators.CommonElements.ROW)
                .within((ele) => {
                  cy.wrap(ele).find(`[class*='${btn.IconButtons.ICO_INPUT_LOOKUP}']`)
                    .click()
                })
                cy.wait(2000)
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .last()
                .find(`[class*='${btn.IconButtons.ICO_SEARCH}']`)
                .closest(`[class*='${app.InputFields.FORM_CONTROL}']`)
                .within((ele) => {
                  cy.wrap(ele)
                    .find(commonLocators.CommonElements.INPUT_TEXT)
                    .wait(1000)
                    .clear({force:true})
                    .type(data[commonLocators.CommonLabels.DESCRIPTION])
                }).then(()=>{
                    _modalView.findModal()
                              .findModalBody()
                              .wrapElements()
                              .last()
                              .find(`[class*='${btn.IconButtons.ICO_SEARCH}']`)
                              .click()
                    _modalView.findModal()
                              .findModalBody()
                              .wrapElements()
                              .last()
                              .find("."+commonLocators.CommonElements.COLUMN_ID + commonLocators.CommonLabels.DESCRIPTION)
                              .contains(data[commonLocators.CommonLabels.DESCRIPTION])
                              .as("description")
                              .should("be.visible")
                              .then(()=>{
                                cy.get('@description')
                                  .click()
                              })              
                }).then(()=>{
                  cy.get("[class*='modal-footer']")
                    .last()
                    .contains(btn.ButtonText.OK)
                    .click();
                })
    }*/
    
    if(data[commonLocators.CommonLabels.CONTRACT_STATUS]){
      _modalView.findModal()
                .findCaretInsideModal(commonLocators.CommonLabels.CONTRACT_STATUS)
                .then(()=>{
                  cy.wait(2000)
                  _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CONTRACT_STATUS])
                })
    }
    
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .last()
              .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC)
              .closest(commonLocators.CommonElements.ROW)
              .within((ele) => {
                  cy.wrap(ele).find("[class*='"+app.InputFields.FORM_CONTROL+"']")
                    .wait(1000)
                    .clear()
                    .type(data[commonLocators.CommonLabels.CHANGE_ORDER_CONTRACT_DESC])           
              })
    
    cy.wait(5000)
  _modalView.findModal()
            .acceptButton(btn.ButtonText.OK);
            cy.wait(2000)
  _validate.validate_Text_message_In_PopUp("Create Change Order Contracts Successfully!")
  _modalView.findModal()
            .acceptButton(btn.ButtonText.GO_TO_CONTRACT)
  cy.wait(2000)
    .then(()=>{
      cy.get("body").then(($body) => {
        if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
          _modalView.findModal()
                    .acceptButton(btn.ButtonText.OK);
        }
      });
  })       
    
  }


  removePackage_wizardOptionInEstimate(data:DataCells){    
    if(data[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]){
      _modalView.findModal()
                .findRadio_byLabel(commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE, "radio",0)
    }
    Object.keys(data[commonLocators.CommonLabels.SELECT_PACKAGES]).forEach(function (key) {
      
      cy.get(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT)   
        .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT,commonLocators.CommonLabels.SELECT_PACKAGES)
        .closest(commonLocators.CommonElements.PANEL_GROUP)
        .within(($val)=>{
          cy.wrap($val)
            .find("."+commonLocators.CommonElements.COLUMN_ID + app.GridCells.CODE)
            .contains(key)
            .click()
            .wait(3000)
          cy.log(data[commonLocators.CommonLabels.SELECT_PACKAGES][key])
          cy.wrap($val)
            .find(commonLocators.CommonElements.ACTIVE + " ."+commonLocators.CommonElements.COLUMN_ID + app.GridCells.IS_CHECKED_SMALL +" "+ commonLocators.CommonElements.CHECKBOX_INPUT)
            .as("checkbox")
            .invoke("is", ":checked")
            .then((checked) => {
              if (data[commonLocators.CommonLabels.SELECT_PACKAGES][key] == "check") {
                if (!checked) {
                  cy.get("@checkbox").check();
                }
              } else if (data[commonLocators.CommonLabels.SELECT_PACKAGES][key]== "uncheck") {
                if (checked) {
                  cy.get("@checkbox").uncheck();
                }
              }
          })
      })
      cy.wait(3000)
    });

    if(data[commonLocators.CommonLabels.SELECT_RESOURCES]){
      Object.keys(data[commonLocators.CommonLabels.SELECT_RESOURCES]).forEach(function (key) {
        cy.get(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT)   
          .contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT,commonLocators.CommonLabels.SELECT_RESOURCES)
          .closest(commonLocators.CommonElements.PANEL_GROUP)
          .within(($val)=>{
            cy.wrap($val)
              .find("."+commonLocators.CommonElements.COLUMN_ID + app.GridCells.CODE)
              .contains(key)
              .click()
              .wait(3000)
            cy.wrap($val)
              .find(commonLocators.CommonElements.ACTIVE + " ."+commonLocators.CommonElements.COLUMN_ID + app.GridCells.IS_CHECKED_SMALL +" "+ commonLocators.CommonElements.CHECKBOX_INPUT)
              .as("checkbox")
              .invoke("is", ":checked")
              .then((checked) => {
                if (data[commonLocators.CommonLabels.SELECT_RESOURCES][key] == "check") {
                  if (!checked) {
                    cy.get("@checkbox").check();
                  }
                } else if (data[commonLocators.CommonLabels.SELECT_RESOURCES][key] == "uncheck") {
                  if (checked) {
                    cy.get("@checkbox").uncheck();
                  }
                }
            })
        })
        cy.wait(3000)
      });
    }  
  }

  enterRecord_toCreate_InvoiceForMultiplePES_FromWizard(radioLabel: string, invoicenumber1: any,invoicenumber2: any) {
    _modalView.findModal()
              .wrapElements()
              .within(() => {
                cy.contains(radioLabel).find("[type='radio']").click();
              });
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
              .findInputFieldInsideModal("Invoice No.", app.InputFields.DOMAIN_TYPE_CODE)
              .type(invoicenumber1);
              cy.wait(2000)
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal()
              .findInputFieldInsideModal("Invoice No.", app.InputFields.DOMAIN_TYPE_CODE)
              .type(invoicenumber2);
              cy.wait(2000)
    _modalView.findModal().acceptButton("OK");
    _modalView.findModal().acceptButton("Go To Invoice");
  }

  enterRecord_toCreateGeneralsTypeDataRecord(container_UUID: string, data: DataCells) {
    cy.wait(2000)
    _common.create_newRecord(container_UUID);
    cy.wait(2000)
    if (data[app.GridCells.LEDGER_CONTEXT_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.LEDGER_CONTEXT_FK, "list", data[app.GridCells.LEDGER_CONTEXT_FK])
      cy.wait(2000)
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO])
      cy.wait(2000)
    }
    if (data[app.GridCells.IS_PERCENT]) {
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_PERCENT,data[app.GridCells.IS_PERCENT])
      cy.wait(2000)
    }
    if (data[app.GridCells.IS_PROCUREMENT]) {
      cy.wait(1000)
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_PROCUREMENT,data[app.GridCells.IS_PROCUREMENT])
      cy.wait(2000)
    }
    if (data[app.GridCells.IS_COST]) {
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_COST,data[app.GridCells.IS_COST])
    }
    if (data[app.GridCells.IS_SALES]) {
      _common.set_cellCheckboxValue(container_UUID, app.GridCells.IS_SALES,data[app.GridCells.IS_SALES])
    }
    cy.wait(2000)
    cy.SAVE()
    cy.wait(3000)
  }

  create_materialPackagefromWizard(criteriaSelection: string) {
    cy.contains(".modal-content", "Create / Update Material Package Assignment").within(() => {
      cy.contains("div", "Selected Line Item").find("#estimateResultSet_3").click()
    })
    _modalView.findModal().findCaretByLabel("Criteria Selection")
    _mainView.select_popupItem("grid1", criteriaSelection)
    _modalView.findModal().acceptButton("Next")
    _modalView.findModal().acceptButton("Previous")
    _modalView.findModal().acceptButton("Next")
    cy.wait(2000)
    _modalView.findModal().checkBox_hasLabel("Select").click()
    _modalView.findModal().acceptButton("Next");
    cy.wait(2000)
    cy.get(".modal-content .grid-container div.column-id_Selected")
    .as('checkbox')
    .invoke('is', ':checked')
    .then(($cell) => {
      if ($cell) {
        cy.log("already checked")
      }
      else {
        cy.get("@checkbox").click({ multiple: true });
      }
    })
    cy.wait(1000)
    _modalView.findModal().acceptButton("OK");
    cy.wait(2000)
    _modalView.findModal()
              .acceptButton("Go to package")
              cy.wait(10000);
  }

  createNewRecordINCurrencyConversion_IfnotExist(uuid,gridCells,Value,Rate,index){
    const DAYS = require('dayjs')
    let date=parseInt(DAYS().format('DD'))
    let month=DAYS().format('MM')
    let year=DAYS().format('YYYY')
    let currentDate=date+"/"+month+"/"+year;
    let status:any
    _mainView.findModuleClientArea()
             .findAndShowContainer(uuid)
             .findGrid()
             .wrapElements()
             .find("[class*='grid-canvas grid-canvas-top grid-canvas-right']").eq(index)
             .then(($ele) => {
                if ($ele.find("[class*='ui-widget-content']").length > 0) {
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(uuid)
                           .findGrid()
                           .getCell(app.SubContainerLayout.INDICATOR)
                           .wrapElements()
                           .each(($ele)=> {
                              cy.wrap($ele).click()
                              _mainView.findAndShowContainer(uuid)
                                       .findGrid()
                                       .getCell(gridCells)
                                       .wrapElements()
                                       .each(($ele)=> {
                                          var GetTextValue = $ele.text()
                                          cy.log(GetTextValue)
                                          if(GetTextValue.match(Value)){
                                            console.log("Already Present")
                                            status="true"
                                            _mainView.findModuleClientArea()
                                                     .findAndShowContainer(cnt.uuid.EXCHANGE_RATES)
                                                     .findGrid()
                                                     .getCell(app.GridCells.RATE_DATE)
                                                     .wrapElements()
                                                     .each(($el, index, $list)=>{
                                                      if($list.length==0){
                                                        _common.create_newRecord(cnt.uuid.EXCHANGE_RATES)
                                                        _common.edit_containerCell(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,Rate)
                                                        cy.SAVE()
                                                        cy.wait(2000)
                                                        _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                                                      }
                                                      if(($el.text()).match(currentDate)){
                                                        cy.wrap($el).click()
                                                        cy.wait(2000)
                                                        _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                                                      }
                                                    })
                                                    return false
                                          }
                                          else{
                                            status="false"
                                          }
                                        })
                           })
                }
                else{
                    _common.create_newRecord(uuid)
                    _common.edit_dropdownCellWithInput(uuid,gridCells,"grid",app.InputFields.INPUT_GROUP_CONTENT,Value)
                    _common.create_newRecord(cnt.uuid.EXCHANGE_RATES)
                    _common.edit_containerCell(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,Rate)
                    cy.SAVE()
                    cy.wait(2000)
                    _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                }
  
                if(status=="false"){
                  _common.create_newRecord(uuid)
                  _common.edit_dropdownCellWithInput(uuid,gridCells,"grid",app.InputFields.INPUT_GROUP_CONTENT,Value)
                  _common.create_newRecord(cnt.uuid.EXCHANGE_RATES)
                  _common.edit_containerCell(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,Rate)
                  cy.SAVE()
                  cy.wait(2000)
                  _common.saveCellDataToEnv(cnt.uuid.EXCHANGE_RATES,app.GridCells.RATE,"EXCHANGE-RATE")
                }
              })
  }

  doUpdate_Item_price_wizardOption(label,priceVersion:string,checkBox:string,ItemCode: string) {
    
    _modalView.findModal().findRadio_byLabel_InModal(label,"radio", 0, "radio")
    _modalView.findModal().acceptButton("Next");
    cy.wait(2000) //required wait to load page
    _common.findCaret_withDynamicInputClass_fromModal(".input-sm","From")
    //_modalView.findModal().findCaretByClass("input",0)
    _mainView.select_popupItem("grid",priceVersion)
    _modalView.findModal().findButtonIndex("btn btn-default ng-binding",0).clickIn();

    for(var i = 0;i<=checkBox.length-1;i++) 
    {
      _modalView.findModal()
      .wrapElements()
      .find("[class*='modal-content'] [class*='checkbox']")
      .then((checkbox) => {
        if (checkbox.find("[class*='ng-not-empty']").length > 0) {
          cy.log("Checkbox already checked")
        } 
        else {
          _modalView.findCheckbox_byLabelnModal("spaceToUp",checkBox[i],0)
        }
      });
    }
      cy.wait(1000)
      _common.clickOn_cellHasValue_fromModal(app.GridCells.SOURCE_CODE_DESC,ItemCode)
      _common.assert_cellDataByContent_fromModal(app.GridCells.SOURCE_CODE_DESC,ItemCode)
      cy.wait(1000)
      _common.getText_fromCell_fromModal(app.GridCells.UNIT_RATE).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("Unit_Rate", $ele1.text())
      })
      _modalView.findModal().findActiveRow().checkbox_inCell(app.SubContainerLayout.SELECTED).click()
    _modalView.findModal().acceptButton("Update");
    _modalView.findModal().acceptButton("OK");
    cy.wait(5000);
  }

  select_priceVersion_fromCaret(priceVersion:string) {
    _modalView.findModal().findCaretByClass("input",0)
    _mainView.select_popupItem("grid",priceVersion)
    _modalView.findModal().findButtonIndex("btn btn-default ng-binding",0).clickIn()
}

updatePricewithDiscountPercentage(discountPercentage,FactorInput){
  cy.wait(2000)
  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE).then(($ele) => {
    var Price = parseFloat($ele.text())
    Cypress.env("PRICE_CONVERTED_RATE", Price)
    cy.log(Cypress.env("PRICE_CONVERTED_RATE"))
  })
  _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT,discountPercentage)
  _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.InputFields.INPUT_GROUP_CONTENT, app.GridCells.FACTOR_PRICE_UNIT, FactorInput)
  cy.SAVE()
  cy.wait(2000)

  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_UNIT).then(($ele) => {
    var PRICE_UNIT = parseInt($ele.text())
    Cypress.env("PRICE_UNIT_CONVERTED_RATE", PRICE_UNIT)

  })
  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.FACTOR_PRICE_UNIT).then(($ele) => {
    var FACTOR = parseInt($ele.text())
    Cypress.env("FACTOR_CONVERTED_RATE", FACTOR)
  })
  cy.wait(500).then(() => {
    var divisionOfPriceUnitAndFactor = Cypress.env("PRICE_UNIT_CONVERTED_RATE") / Cypress.env("FACTOR_CONVERTED_RATE")
    cy.log("divisionOfPriceUnitAndFactor " + divisionOfPriceUnitAndFactor)
    var expResultwithDiscoutPercentage = (100 - discountPercentage)
    cy.log("expResultwithDiscoutPercentage " + expResultwithDiscoutPercentage)
    var divisionOfPriceUnitandFactor = divisionOfPriceUnitAndFactor / expResultwithDiscoutPercentage
    cy.log("divisionOfPriceUnitandFactor " + divisionOfPriceUnitandFactor)
    var expectedCalculation = divisionOfPriceUnitandFactor * 100
    cy.log("expectedCalculation " + expectedCalculation)
    cy.wait(100).then(() => {
      var ConvertedPriceWithDiscountedPercentage = Cypress.env("PRICE_CONVERTED_RATE") * expectedCalculation
      cy.log("ConvertedPriceWithDiscountedPercentage" + ConvertedPriceWithDiscountedPercentage)
      var ConvertedPriceWithDiscounted = ConvertedPriceWithDiscountedPercentage.toFixed(2)
      Cypress.env("FinalConvertedPrice",ConvertedPriceWithDiscounted.toString())
    })

})
}

 /* Clicking on plus button from the toolbar of container as per the size of the array */
 clickPlusIcon_asPerArrayLength(arrayName:string[],container_UUID:string)
 {
     const Clicks = arrayName.length;
     for(let i = 0; i <Clicks ; i++)
     {
       cy.wait(800)
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findButton(btn.ToolBar.ICO_REC_NEW)
              .clickIn()
     }
 }

 assingItems_ByMaterialNumber( Quantity:string,MaterialNumber: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
           .findGrid()
           .findActiveRow()
           .findCell(app.GridCells.QUANTITY_SMALL)
           .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
           .type(Quantity);
  _common.waitForLoaderToDisappear()  
  _common.select_activeRowInContainer(cnt.uuid.PACKAGEITEMS)
  _common.waitForLoaderToDisappear()  
  _common.clickOn_activeRowCell(cnt.uuid.PACKAGEITEMS,app.GridCells.MDC_MATERIAL_FK)
  _common.waitForLoaderToDisappear()  
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.PACKAGEITEMS)
           .findGrid()
           .findActiveRow()
           .findCell(app.GridCells.MDC_MATERIAL_FK)
           .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
           .type(MaterialNumber)
           .then(()=>{
            _mainView.select_popupItem("grid", MaterialNumber);
           })
}

create_ProcuremenBoQswithNewReocrd(projectName:string,procurementStructure:string) {
  _modalView.findModal().findInputFieldInsideModal("Project Name",app.InputFields.INPUT_GROUP_CONTENT).clear().type(projectName).click()
  _mainView.select_popupItem("grid",projectName)
  _modalView.findModal().findInputFieldInsideModal("Procurement structure",app.InputFields.INPUT_GROUP_CONTENT).clear().type(procurementStructure).click()
  _mainView.select_popupItem("grid",procurementStructure)
  cy.wait(1000)
  _modalView.findModal().acceptButton("OK");
  _modalView.findModal().findCaretInsideModal("Sub Package")
  _mainView.select_popupItem("list","Service")
  _modalView.findModal().acceptButton("OK");
}

create_evaluateEvents_fromWizard(labelName:string,index:number){
  _modalView.findModal()
            .findRadio_byLabel_InModal(labelName,"radio",index,"radio")
  _modalView.acceptButton(btn.ButtonText.OK)
  cy.wait(2000)
  _modalView.acceptButton(btn.ButtonText.OK)
  cy.wait(2000)
} 

select_itemScopeReplacementfromWizard( bodyIndex?: number) {
  _modalView.findModal()
            .findActiveRow()
            .wrapElements().then(() => {
  _modalView.findModal()
          cy.get(`[class*='${app.GridCells.SELECTION}'] `).then((ele) => {
              cy.wrap(ele).find(commonLocators.CommonElements.CHECKBOX_TYPE).eq(bodyIndex)
                .check({ force: true })
            });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  _modalView.findModal().acceptButton(btn.ButtonText.UPDATE)
  _modalView.findModal().acceptButton(btn.ButtonText.OK)
    })
}

verify_Neutral_Material_In_Modal_Are_Reflected_From_MDC_MATERIAL(scope:string,checkboxLable:string,materialDesc:string,) {
  cy.contains(".modal-content", "Update Item Price - 1 / 2").within(() => {
    cy.contains("div", scope)
      .find("input[value='1']")
      .click();
  });
  _modalView.findModal().acceptButton("Next");
  _modalView.findModal().acceptButton("Previous");
  _modalView.findModal().acceptButton("Next");
  _modalView.findModal()
            .wrapElements()
            .find("[class*='modal-content'] [class*='checkbox']")
            .then(($ele) => {
              if ($ele.find("[checked='checked']").length > 0) {
                cy.log("checkbox is already selected");
                _common.verify_cellHasValue_fromModal(app.GridCells.ITEM_CODE_DESC,materialDesc)
              }else {
                cy.contains("div", checkboxLable)
                        .find("input")
                        .click();
                _common.verify_cellHasValue_fromModal(app.GridCells.ITEM_CODE_DESC,materialDesc)
              }
          });
}

verify_Material_In_Modal_Are_Reflected_From_CON_MDC_MATERIAL(scope:string,materialDesc:string,inputNum:number) {
  cy.contains(".modal-content", "Update Item Price - 1 / 2").within(() => {
    cy.contains("div", scope)
      .find("input[value='" + inputNum + "']")
      .click();
  });
  _modalView.findModal().acceptButton("Next");
  _modalView.findModal().acceptButton("Previous");
  _modalView.findModal().acceptButton("Next");
  _modalView.findModal()
              .wrapElements()
              .find("[class*='modal-content'] [class*='checkbox']")
              .then((checkbox) => {
                if (checkbox.find("[checked='checked']").length > 0) {
                  cy.contains(".modal-content", "Update Item Price - 2 / 2").within(
                    () => {
                      cy.contains("div", "Material Catalog Price Version")
                        .find("input")
                        .click();
                      cy.contains("div", "Contract")
                        .find("input")
                        .click({ force: true });
                    });
              }else {
                cy.contains(".modal-content", "Update Item Price - 2 / 2").within(() => {
                    cy.contains("div", "Contract").find("input").check();
                  });
                _common.verify_cellHasValue_fromModal(app.GridCells.ITEM_CODE_DESC,materialDesc)
              }
            });
}
    
verify_Unit_Rate(value1:string,value2:string,value3:string,value4:string,value5:string,prjName:string,) {

            const Result = (parseFloat(value1.replace(",","")) + parseFloat(value2.replace(",","")))*parseFloat(value3.replace(",",""))
            var factor=parseFloat(value4.replace(",",""))
            const Result2 = ((100 - parseFloat(value5.replace(",","")))*parseFloat(factor.toFixed(2)))/100
            const FinalResult=Result/Result2
          
            cy.contains(".modal-content", "Update Item Price - 1 / 2").within(() => {
              cy.contains("div", "All item under current selected lead record")
                .find("input[value='1']")
                .click();
            });
            _modalView.findModal().acceptButton("Next")
            _modalView.findModal().acceptButton("Previous");
  _modalView.findModal().acceptButton("Next");

  _modalView.findModal().findModalBody().findCellhasValue(app.GridCells.PROJECT_ID,prjName).click()
   
  _modalView.findModal()
            .findModalBody()
            .findActiveRow()
            .findCell(app.GridCells.UNIT_RATE)
            .wrapElements()
            .then((element1) => {
              //var ele2 = parseFloat(element1.text())
            const actResult = parseFloat(element1.text()).toFixed(2);
            expect(actResult).to.equal(FinalResult.toFixed(2));
          })
}

verify_Variance(value1:string,prjName2:string) {
  _modalView.findModal().findModalBody().findCellhasValue(app.GridCells.PROJECT_ID,prjName2).click()
  _modalView.findModal()
            .findModalBody()
            .findActiveRow()
            .findCell(app.GridCells.UNIT_RATE)
            .wrapElements()
            .then((element1) => {
            const Result1 = parseFloat(element1.text()).toFixed(2);
            const ActResult=(parseFloat(value1.replace(",",""))-parseFloat(Result1))      
  _modalView.findModal()
            .findModalBody()
            .findActiveRow()
            .findCell(app.GridCells.VARIANCE)
            .wrapElements()
            .then((element) => {
              const variance =  Math.abs(parseFloat(element.text())).toFixed(2);
              expect(ActResult.toFixed(2)).to.equal(variance); 
          })
        })
  }

verify_ConvertedUnitRate(factor:string,contract:string) {
    cy.contains(".modal-content", "Update Item Price - 1 / 2").within(() => {
      cy.contains("div", "All item under current selected lead record")
        .find("input[value='1']")
        .click();
    });
    _modalView.findModal().acceptButton("Next");
    _modalView.findModal().acceptButton("Previous");
    _modalView.findModal().acceptButton("Next");

    _modalView.findModal().findModalBody().findCellhasValue(app.GridCells.SOURCE_CODE_DESC,contract).click()
    _modalView.findModal()
              .findModalBody()
              .findActiveRow()
              .findCell(app.GridCells.UNIT_RATE)
              .wrapElements()
              .then((element1) => {
                const Result1 = ((parseFloat(element1.text()).toFixed(2)));
                const ActResult=(parseFloat(factor.replace(",",""))*parseFloat(Result1))       
      _modalView.findModal()
                .findModalBody()
                .findActiveRow()
                .findCell(app.GridCells.CONVERTED_UNIT_RATE)
                .wrapElements()
                .then((element) => {
                  const ConvertedUnitRate =  Math.abs(parseFloat(element.text())).toFixed(2);
                  expect(ConvertedUnitRate).to.equal(ActResult.toFixed(2)); 
              })
            })
}

verify_StartDateFilter(scope:string,startDate:string) {
              
        cy.contains(".modal-content", "Update Item Price - 1 / 2").within(() => {
          cy.contains("div", scope)
            .find("input[value='1']")
            .click();
        });
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal().acceptButton("Previous");
        _modalView.findModal().acceptButton("Next");
        _modalView.findModal()
                  .wrapElements()
                  .find("[class*='modal-content'] [class*='checkbox']")
                  .then((checkbox) => {
                    if (checkbox.find("[checked='checked']").length > 0) {
                      cy.contains(".modal-content", "Update Item Price - 2 / 2").within(
                        () => {
                          cy.contains("div", "Material Catalog Price Version")
                          .find("input")
                          .click();
                        cy.contains("div", "Quotation").find("input").click();
                        cy.contains("div", "Contract")
                          .find("input")
                          .click({ force: true });
                        cy.contains("div", "Include Neutral Material")
                          .find("input")
                          .click();
                      });
          } else {
            cy.contains(".modal-content", "Update Item Price - 2 / 2").within(
              () => {
                cy.contains("div", "Contract").find("input").check();
              });
          }
        });
        _modalView.findModal()
                .wrapElements()
                .then(()=> {
                      cy.get("[class*='platform-form-row'] [class*='input-group-content']").eq(2).type(startDate)
                  })
      _modalView.findModal()
                .wrapElements()
                .then(()=> {
                      cy.get("[class*='platform-form-row'] [data-ng-click='search()']").click()
                  })
}

enterRecord_toCreateUnitOfMeasurementDetails(data:DataCells){

  if (data[commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT]==='Conversion') {
    cy.contains(commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT,data[commonLocators.CommonElements.PLATFORM_FORM_GROUP_HEADER_TEXT])
      .closest(`${commonLocators.CommonElements.PANEL_GROUP}`)
      .within(()=>{
        
        if (data[commonLocators.CommonLabels.LENGTH_DIMENSION]) {
          cy.contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.LENGTH_DIMENSION)
            .closest(`${commonLocators.CommonElements.ROW}`)
            .within(()=>{
              cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                .clear()
                .type(data[commonLocators.CommonLabels.LENGTH_DIMENSION])
            })
        }

        if (data[commonLocators.CommonLabels.FACTOR]) {
          cy.contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.FACTOR)
            .closest(`${commonLocators.CommonElements.ROW}`)
            .within(()=>{
              cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                .find(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
                .clear()
                .type(data[commonLocators.CommonLabels.FACTOR])
            })
        }

        if (data[commonLocators.CommonLabels.IS_BASE]) {
          cy.contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.IS_BASE)
            .closest(`${commonLocators.CommonElements.ROW}`)
            .within(()=>{
              cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
                .find(`${commonLocators.CommonElements.CHECKBOX_INPUT}`)
                .as("check")
                .invoke('is', ':checked')
                .then(checked => {
                  if (data[commonLocators.CommonLabels.IS_BASE] == "check") {
                    if (!checked) {
                      cy.get('@check')
                        .check();
                    }
                  } if (data[commonLocators.CommonLabels.IS_BASE] == "uncheck") {
                    if (checked) {
                      cy.get('@check')
                        .uncheck();
                    }
                  }
                })
          })
        }
      })
  }
}
            
}
