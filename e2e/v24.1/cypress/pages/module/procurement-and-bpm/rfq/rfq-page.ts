/// <reference types="cypress" />
import { btn, app, cnt, commonLocators } from "cypress/locators";
import { _modalView, _mainView, _common } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { EST_HEADER, PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
export class
  RfqPage {
  changeContactDetailsInBidder() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BIDDERS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BUSINESS_PARTNER_FK)
             .findInputLookup(btn.IconButtons.ICO_INPUT_LOOKUP, 0)

  }

  assignContact(contactName: string) {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Assign Contact").within(() => {
      cy.get(`[class*='${app.InputFields.INPUT_GROUP_FORM_CONTROL}']`).as("searchInput");
      cy.get("@searchInput").find(commonLocators.CommonElements.INPUT_TEXT).clear().type(contactName);
      cy.get("@searchInput").find("button").click();
      _modalView.findCellhasValue(app.GridCells.BUSINESS_PARTNER_FK, contactName).click({ force: true });
      cy.contains("button", "OK").click();
    });
  }

  generateBidderEmailrequest(businessPartnerName: string) {
    _modalView.findModal().checkBox_hasLabel("Included").click();
    _modalView.findModal().findCellhasValue(app.GridCells.BUSINESS_PARTNER_FK, businessPartnerName).click({ force: true });
    _modalView.findModal().findActiveRow().checkbox_inCell(app.SubContainerLayout.IS_INCLUDED).check();
    cy.wait(1000);
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).contains("button", "Send").click();
  }

  validateEmailIsSent() {
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Rfq Bidder Wizard - 8 / 8 Transmission").within(() => {
      try {
        cy.get(commonLocators.CommonElements.CHECK_TICK, { timeout: 30000 }).should("be.visible");
        cy.contains("button", "Close").click();
      } catch (e) {
        cy.log("Email not sent.....");
        throw new Error("Email not sent.....");
      }
    });
  }

   /*
    This is used to create a request for quote from wizard
    Updated Date: 18/12/2024
    Updated content : Interface logic added and changed name as per naming conventions
    Author : Harshal Shinkar
    */
  create_requestForQuote_fromWizard(data:DataCells) {
    if(data[commonLocators.CommonLabels.BUSINESS_PARTNER]){
      for (var businessPartner of data[commonLocators.CommonLabels.BUSINESS_PARTNER]) {
        _modalView.findModal()
                  .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .first()
                  .type(businessPartner)
        _common.waitForLoaderToDisappear()
        _modalView.findModal()
                  .findButton(btn.IconButtons.ICO_SEARCH)
                  .clickIn()
        _common.waitForLoaderToDisappear()
        _modalView.findModal()
                  .findCellhasValue(app.GridCells.BP_NAME_1,businessPartner )
                  .click()
        _common.waitForLoaderToDisappear()          
        _modalView.findModal()
                  .findActiveRow()
                  .findCheckbox_inCell(app.GridCells.ID)
                  .click()
        _common.waitForLoaderToDisappear()
        this.setBusinessPartnerId(businessPartner)
      }
    }
    _modalView.acceptButton(btn.ButtonText.OK)
  }


   /*
    This is used to create a quote from wizard
    Updated Date: 18/12/2024
    Updated content : Name as per naming conventions
    Author : Harshal Shinkar
    */
  create_quote_fromWizard(businessPartnerName: string[], updateWithQuoteDataCheckbox?: string[]) {
    for (var i = 0; i < businessPartnerName.length; i++) {
      cy.wait(2000)
      _modalView.findModal().findCellhasValue(app.GridCells.BP_NAME, businessPartnerName[i]).click({force:true})
      cy.wait(2000)
      _modalView.findModal().findActiveRow().findCell(app.SubContainerLayout.SELECTED)
      if (updateWithQuoteDataCheckbox != null) {
        cy.get("input[id*='" + app.GridCells.COPIED_PRICE + "']").as("check").invoke('is', ':checked')
          .then((checked) => {
            if (checked) {
              cy.get("@check").uncheck();
            } else {
              cy.get("@check").check();
              cy.get("@check").uncheck();
            }
          });
        if (updateWithQuoteDataCheckbox[i] == "check") {
          _modalView.findModal().findActiveRow().findCell(app.GridCells.COPIED_PRICE)
        }
      }
    }
    _modalView.findModal().acceptButton("OK")
  }

  verify_TotalsForQuote(typeDescription: string, itemsContainerId: string, totalsContainerId: string) {
    switch (typeDescription) {
      case "Total":
        let total: any = 0
        _mainView.findModuleClientArea()
                 .findAndShowContainer(itemsContainerId)
                 .findGrid()
                 .getCell(app.GridCells.TOTAL).wrapElements().each(($el, index, $list) => {
                  let newStr = $el.text().replace(',', '')
                  total = total + parseFloat(newStr)
                 }).then(() => {
                        cy.log(total)
                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(totalsContainerId)
                                 .findGrid()
                                 .findCellhasValue(app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
                                 .click()
                        let netValue: any = 0
                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(totalsContainerId)
                                 .findGrid()
                                 .findActiveRow()
                                 .getCell(app.GridCells.VALUE_NET).wrapElements()
                                 .then(($val) => {
                                  let newString = $val.text()
                                  netValue = newString.replace(',', '')
                                  cy.log(newString)
                                  expect(total).to.equal(parseFloat(netValue))
                                 })
                        let vatValue: any = 0
                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(totalsContainerId)
                                 .findGrid()
                                 .findActiveRow()
                                 .getCell(app.GridCells.VALUE_TAX).wrapElements()
                                 .then(($val) => {
                                  let newString = $val.text()
                                  vatValue = newString.replace(',', '')
                                  cy.log(newString)
                                })
                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(totalsContainerId)
                                 .findGrid()
                                 .findActiveRow()
                                 .getCell(app.GridCells.GROSS).wrapElements()
                                 .then(($val) => {
                                   let newString = $val.text()
                                  let grossValue = newString.replace(',', '')
                                  cy.log(newString)
                                  let gross = parseFloat(netValue) + parseFloat(vatValue)
                                  expect(gross).to.equal(parseFloat(grossValue))
                                })
                })
        break;
    }
  }

  createContractForLineItemOnly(description: string, businessPartnerName: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PRICE_COMPARISON_V1)
             .findGrid()
             .findCellhasValue(app.GridCells.COMPARE_DESCRIPTION, description)
             .click()
    cy.get('.cid_' + cnt.uuid.PRICE_COMPARISON_V1 + ' [class*="active"] ' + '[class*="_' + Cypress.env(businessPartnerName + "_id") + '"]' + " ." + btn.IconButtons.ICO_APPEND)
      .click({ force: true })
    _modalView.findModal().acceptButton("OK")
  }

  setBusinessPartnerId(businessPartnerName: string) {
    cy.get('[class*="modal-dialog"] [class="modal-body"] #ui-layout-r .modal-wrapper [class*="item-id"]').eq(0).invoke('attr', 'class').then(($val) => {
      let str = $val;
      cy.log(str)
      let newarr = str.split(" ")
      for (let index = 0; index < newarr.length; index++) {
        let element = newarr[index];
        if (newarr[index].includes("item-id")) {
          cy.log(newarr[index])
          let newarray = newarr[index].split("_")
          cy.log(newarray[1])
          cy.wait(2000)
          let name = businessPartnerName + "_id"
          cy.log(name)
          cy.then(() => {
            Cypress.env(name, newarray[1])
          })
        }
      }
    })
  }


  createRequestForCode_fromWizard(module: string, businessPartnerName: string, Pstructure: string) {
    switch (module) {
      case "Business Partner":
        _modalView.findModal()
                  .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION).first()
                  .type(businessPartnerName)
        _modalView.findModal()
                  .findButton(btn.IconButtons.ICO_SEARCH)
                  .clickIn()
        _modalView.findModal()
                  .findCellhasValue(app.GridCells.BP_NAME_1, businessPartnerName)
                  .click()
        _modalView.findModal()
                  .findActiveRow()
                  .findCheckbox_inCell(app.GridCells.ID)
                  .click()
        _modalView.findModal().acceptButton("OK")
        break;

        case "Multiple Business Partner selection":
          for(var i=0;i<=businessPartnerName.length-1;i++)
          {
          _modalView.findModal()
                    .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION).first()
                    .type(businessPartnerName[i])
          _modalView.findModal()
                    .findButton(btn.IconButtons.ICO_SEARCH)
                    .clickIn()
          _modalView.findModal()
                    .findCellhasValue(app.GridCells.BP_NAME_1, businessPartnerName[i])
                    .click()
          _modalView.findModal()
                    .findActiveRow()
                    .findCheckbox_inCell(app.GridCells.ID)
                    .click()
          }
          _modalView.findModal().acceptButton("OK")
          break;

      case "Procument Structure":
        _modalView.findModal().checkBox_hasLabel("Procurement structure").click();
        _modalView.findModal()
                  .findTextInput(app.InputFields.INPUT_GROUP_CONTENT).eq(0)
                  .type(Pstructure)
        _modalView.findModal().select_popupItem("grid", Pstructure);
        _modalView.findModal()
                  .findButton(btn.IconButtons.ICO_SEARCH)
                  .clickIn()
        cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Create Request For Quote").within(() => {
          cy.contains("BETONSTEINWERKWILLECK").click();
          cy.get("[class*='active'] [class*='item-field_BpIsExisted'] [type*='checkbox']").click();
          cy.contains("BGHEDELSTAHLFREITALGMBH").click()
          cy.get("[class*='active'] [class*='item-field_BpIsExisted'] [type*='checkbox']").click();
          cy.get("[class*='modal-footer']").contains('OK').click();
        });
        break;
    }
  }

  verify_bidderInRFQ(bidder1: string, bidder2: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BIDDERS)
             .findGrid()
             .findCellhasValue(app.GridCells.SUPPLIER_DESCRIPTION, bidder1)
             .click()
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, bidder1)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BIDDERS)
             .findGrid()
             .findCellhasValue(app.GridCells.SUPPLIER_DESCRIPTION, bidder2)
             .click()
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, bidder2)

  }


  get_QuantityPriceTotalFromItemsQuote(businessPartnerName: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.QUOTES_ITEMS)
             .findGrid()
             .findCell(app.GridCells.TOTAL)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.QUOTES_ITEMS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements().then(($value) => {
              let ItemsQuantity = $value.text()
              Cypress.env("Items Quantity " + businessPartnerName, ItemsQuantity)
            })
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.QUOTES_ITEMS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.PRICE_SMALL)
             .wrapElements().then(($value) => {
              let ItemsPrice = $value.text()
              Cypress.env("Items Price " + businessPartnerName, ItemsPrice)
            })
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.QUOTES_ITEMS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.TOTAL)
             .wrapElements().then(($val) => {
               let ItemsTotal = $val.text()
              Cypress.env("Items Total " + businessPartnerName, ItemsTotal)
             })
  }

  verify_QuantityPriceTotalFromItemsContract(quantity: string, price: string, total: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ITEMSCONTRACT)
             .findGrid()
             .findCell(app.GridCells.TOTAL)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ITEMSCONTRACT)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($value) => {
              let ItemsQuantity = $value.text()
              expect(ItemsQuantity).equals(quantity)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ITEMSCONTRACT)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.PRICE_SMALL)
             .wrapElements()
             .then(($value) => {
              let ItemsPrice = $value.text()
               expect(ItemsPrice).equals(price)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.ITEMSCONTRACT)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.TOTAL)
             .wrapElements().then(($val) => {
              let ItemsTotal = $val.text()
              expect(ItemsTotal).equals(total)
             })
  }

  Replace_Material_Quotes(Scope_radioLable: string,Scope_radio_index: number,Replacefrom_radioLable: string,Replacefrom_index: number,ReplaceMaterial: any,SubstituteMaterial: any,Specificcatalog?: any,selectedcatalog?: any) {
    _modalView.findModal()
              .findRadio_byLabel(Scope_radioLable, "radio", Scope_radio_index)
    _modalView.findModal()
              .findRadio_byLabel(Replacefrom_radioLable, "radio", Replacefrom_index)
    if (Specificcatalog) {
      _modalView.findModal()
                .wrapElements()
                .find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT).type(selectedcatalog)
                .then(() => {
                  _modalView
                    .findModal()
                    .select_popupItem("grid", selectedcatalog)
                })
        }
    _modalView.findModal().acceptButton("Next")
    _modalView.findModal()
              .findModalBody()
    _modalView.findModal().findCellhasValue(app.GridCells.MATERIAL_CODE, ReplaceMaterial).click();
    _modalView.findModal()
              .findModalBody()
    _modalView.findModal().findCellhasValue(app.GridCells.MATERIAL_CODE, SubstituteMaterial).click();
    _modalView.findModal().findActiveRow().getCell(app.SubContainerLayout.SELECTED).wrapElements().eq(1)
              .find(commonLocators.CommonElements.CHECKBOX_INPUT).as("check").invoke('is', ':checked').then(checked => {
                if (!checked) {
                  cy.get('@check').check();
                }
              })
    _modalView.findModal().acceptButton("Replace")
    _modalView.findModal().acceptButton("OK")

  }

  assert_cellData_not_equal(container_UUID: any, cellClass: any, value: any) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(cellClass)
             .wrapElements().should("not.equal", value)

  }

  Update_item_price_quote(Scope_radioLable: string,Scope_radio_index: number,checkboxlabelname: Map<string, string>,priceversion: string,Updatematerial: any,Fromdate?: any,Todate?: any) {
    _modalView.findModal()
              .findRadio_byLabel(Scope_radioLable, "radio", Scope_radio_index)
    _modalView.findModal().acceptButton("Next")
    checkboxlabelname.forEach((labelName: string) => {
      if (checkboxlabelname.get(labelName) == "checked") {
        _modalView.findModalBody()
                  .findCheckBox_byLabel(labelName, 'checkbox')
                  .as("check")
                  .invoke('is', ':checked')
                  .then(checked => {
                    if (!checked) {
                      cy.get('@check').check();
                    }
                  })
      } if (checkboxlabelname.get(labelName) == "unchecked") {
        _modalView.findModalBody()
                  .findCheckBox_byLabel(labelName, 'checkbox')
                  .as("check")
                  .invoke('is', ':checked')
                  .then(checked => {
                    if (checked) {
                      cy.get('@check').uncheck();
                    }
                  })
        }

    })
    _modalView.findModal()
              .caret()
              .select_popupItem("grid", priceversion)
    if (Fromdate != null) {
      _modalView.findModal()
                .findTextInput(app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT).eq(0)
                .type(Fromdate)
    }
    if (Todate != null) {
      _modalView.findModal()
                .findTextInput(app.InputFields.INPUT_GROUP_CONTENT_DATE_PICKER_INPUT).eq(1)
                .type(Todate)
    }

    _modalView.findModal()
              .findModalBody()
              .findButton(btn.IconButtons.LG_9_TEXT_RIGHT).clickIn()
    _modalView.findModal()
    _modalView.findModal().findCellhasValue(app.GridCells.SOURCE_CODE_DESC, Updatematerial).click()
    _modalView.findModal().findActiveRow().getCell(app.GridCells.SELECTED).wrapElements().eq(0)
              .find(commonLocators.CommonElements.CHECKBOX_TYPE).as("check").invoke('is', ':checked').then(checked => {
                if (!checked) {
                  cy.get('@check').check();
                }
              })
    _modalView.findModal().acceptButton("Update")
    _modalView.findModal().acceptButton("OK")
  }

  /* Entering record to create boq structure in requisition */
  enterRecordToCreate_BoQStructureInRequisition(
    boqOutLineSpecification: string,
    quantity: string,
    unitRate: string,
    uom: string,
  ) {
    _common.select_rowInContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
    _common.create_newRecord(cnt.uuid.REQUISITIONBOQSTRUCTURE);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click();
    _common.getText_fromCell(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("ItemLevel", $ele1.text())
    })
    _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONBOQSTRUCTURE,app.GridCells.BRIEF_INFO_SMALL,app.InputFields.DOMAIN_TYPE_TRANSLATION,boqOutLineSpecification);
    //cy.REFRESH_SELECTED_ENTITIES();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, "Position")
    _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONBOQSTRUCTURE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,quantity);
    // cy.REFRESH_SELECTED_ENTITIES();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, "Position")
    _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.PRICE_SMALL,app.InputFields.INPUT_GROUP_CONTENT,unitRate);
    // cy.REFRESH_SELECTED_ENTITIES();
    _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, "Position")
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BAS_UOM_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(uom);

    _mainView.select_popupItem("grid", uom);
    cy.SAVE()
  }

  /* Requisition record creation by clicking on new record button */
  createRequisitionRecord(resource: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.STRUCTURE)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.TAX_CODE_FK)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.REQUISITIONS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.STRUCTURE)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .clear()
             .type(resource)
             .then(() => {
              cy.wait(3000)
              _mainView.select_popupItem("grid", resource)
              cy.wait(3000);
             });
    cy.SAVE();
  }

  createRFQInRequisitionFromWizard(bpName: string) {

    _modalView.searchInModal(app.InputFields.INPUT_GROUP_FORM_CONTROL, "Create Request For Quote", bpName)
    _modalView.findModalBody().findButtonWithTitle("search")
              .clickIn()
    _modalView.findCell(app.GridCells.ID)
              .findCheckbox_inCell(app.GridCells.ID).check()
    _modalView.acceptButton("OK")
    _modalView.findModal()
              .acceptButton(btn.ButtonText.GO_TO_RFQ)

  }

  assign_businessPartnerToQuote_fromWizard(BusinessPartnerName: string) {

    cy.get('[class*="modal-content"] [class*="panel-group"]')
      .eq(2)
      .within(() => {
        cy.wait(2000)
        cy.get(`[class*='ico-dialog']`).click()
      })

    _modalView.searchInModal(app.InputFields.INPUT_GROUP_FORM_CONTROL, "Assign Business Partner", BusinessPartnerName)
    _modalView.findModalBody()
              .findButtonWithTitle("search")
              .clickIn()
    _modalView.findModal()
              .findCellhasValue(app.GridCells.BP_NAME_1, BusinessPartnerName)
              .click()
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Assign Business Partner")
      .within(() => {
       cy.contains("button", "OK")
         .click();
    });
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Create Quote")
      .within(() => {
        cy.contains("button", "OK")
          .click();
    });

  }

  addItem_InPriceComparisonBoQ(data:DataCells) {
    if(data[app.GridCells.BOQ_LINE_TYPE]){
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_COMPARISONBOQ,app.GridCells.BOQ_LINE_TYPE,data[app.GridCells.BOQ_LINE_TYPE])
      cy.wait(500)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_COMPARISONBOQ,app.GridCells.BOQ_LINE_TYPE,data[app.GridCells.BOQ_LINE_TYPE])
    }
    if(data[commonLocators.CommonLabels.BUSINESS_PARTNER]){
      cy.get('.cid_'+cnt.uuid.PRICE_COMPARISONBOQ+ ' [class*="active"] '+' [class*="column-id_QuoteCol"]'+' [class*="ico-boq-item-new"]').eq(data[commonLocators.CommonLabels.BUSINESS_PARTNER]).click({ force: true })
    }  
    if(data[commonLocators.CommonLabels.OUTLINE_SPECIFICATION]){
      cy.wait(15000)
          _modalView.findModal()
          .findInputFieldInsideModal(commonLocators.CommonLabels.OUTLINE_SPECIFICATION,app.InputFields.DOMAIN_TYPE_TRANSLATION)
          .clear().type(data[commonLocators.CommonLabels.OUTLINE_SPECIFICATION])
        }
    if(data[commonLocators.CommonLabels.UOM]){
          _modalView.findModal()
                    .findInputFieldInsideModal(commonLocators.CommonLabels.UOM,app.InputFields.INPUT_GROUP_CONTENT)
                    .type(data[commonLocators.CommonLabels.UOM],{force:true})
           _mainView.select_popupItem("grid",data[commonLocators.CommonLabels.UOM])
        }
    if(data[commonLocators.CommonLabels.UNIT_RATE]){
          _modalView.findModal()
                    .findInputFieldInsideModal(commonLocators.CommonLabels.UNIT_RATE,app.InputFields.DOMAIN_TYPE_TRANSLATION)
                    .clear().type(data[commonLocators.CommonLabels.UNIT_RATE])
        }
    if(data[commonLocators.CommonKeys.BUTTON_HANDLE]){
          _modalView.findModal()
                    .acceptButton(data[commonLocators.CommonKeys.BUTTON_HANDLE])
                  cy.wait(5000) 
          }    
}

getCode_fromRequisitionModal(envName:string) {
  cy.wait(5000)
  cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message']").then(($value) => {
    var str = ($value.text()).replace(" ","")
    console.log(str)
    var splitted = str.split(":", 2);
    console.log(splitted[1])
    Cypress.env(envName, (splitted[1].replace(/'/g, "")).replace(/^\s+|\s+$/g, ""))
  })
} 

getCode_fromRFQModal(envName:string) {
  cy.wait(8000) // This wait is required as load take time to load
  cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message']").then(($value) => {
    var str = ($value.text()).replace(" ","")
    console.log(str)
    var splitted = str.split(":", 2);
    console.log(splitted[1])
    Cypress.env(envName, (splitted[1].replace(/'/g, "")).replace(/^\s+|\s+$/g, ""))
  })
} 

enterRecord_ToFillDataInItemText(Container_UUID:string,Data:string){

  _mainView.findModuleClientArea()
           .findAndShowContainer(Container_UUID)
           .wrapElements().then(()=>{
            cy.get(`div[class='ql-editor ql-blank'] p`).type(Data)
            cy.wait(1000)
           })        
}


fromWizard_CreateQuoteAndverifyBPSearch(businessPartnerName: string[], updateWithQuoteDataCheckbox?: string[]) {
  for (var i = 0; i < businessPartnerName.length; i++) {
    cy.wait(2000)
    _modalView.findModal().findCellhasValue(app.GridCells.BP_NAME, businessPartnerName[i]).click({force:true})
    cy.wait(2000)
    _modalView.findModal().findActiveRow().findCell(app.SubContainerLayout.SELECTED)
    if (updateWithQuoteDataCheckbox != null) {
      cy.get("input[id*='" + app.GridCells.COPIED_PRICE + "']").as("check").invoke('is', ':checked')
        .then((checked) => {
          if (checked) {
            cy.get("@check").uncheck();
          } else {
            cy.get("@check").check();
            cy.get("@check").uncheck();
          }
        });
      if (updateWithQuoteDataCheckbox[i] == "check") {
        _modalView.findModal().findActiveRow().findCell(app.GridCells.COPIED_PRICE)
      }
    }
  }
 
  cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, "Business Partner").within(() => {
      cy.get("[class*='btn btn-default input-sm']").eq(2).click({force :true});
    })
  _modalView.searchInModal(app.InputFields.INPUT_GROUP_FORM_CONTROL,"Assign Business Partner","AVAL Versicherung GmbH")
  _modalView.findModalBody()
            .findButtonWithTitle("search")
            .clickIn()
  _modalView.findModal()
            .findCellhasValue(app.GridCells.BP_NAME_1, "AVAL Versicherung GmbH")
            .click()
  cy.wait(500)
  _modalView.acceptButton("OK")
}
}

