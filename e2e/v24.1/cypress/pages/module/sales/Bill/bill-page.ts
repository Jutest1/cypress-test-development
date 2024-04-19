/// <reference types="cypress" />
import { _mainView, _modalView, _common } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar } from "../../../../locators";
import { DataCells } from "cypress/pages/interfaces";

export class BillPage {
  enterRecord_toCreateBillRecord(data: DataCells) {
    switch (data[commonLocators.CommonLabels.BILL_TYPE]) {
            case "Progress Invoice":
                    if (data[commonLocators.CommonLabels.CONTRACT]) {

                                    _modalView.findModal()
                                              .findInputFieldInsideModal(commonLocators.CommonLabels.CONTRACT, app.InputFields.INPUT_GROUP_CONTENT)
                                              .clear({ force: true })
                                              .type(data[commonLocators.CommonLabels.CONTRACT], { force: true });
                                    _modalView.findModal()
                                              .select_popupItem("grid", data[commonLocators.CommonLabels.CONTRACT]);

                    }       
                                    _modalView.findModal()
                                              .findInputFieldInsideModal(commonLocators.CommonLabels.PREVIOUS_BILL, app.InputFields.INPUT_GROUP_CONTENT)
                                              .first()
                                              .invoke('text')
                                              .then((sourceText) => {
                                            cy.wrap(sourceText.trim()).as('capturedText');
                                    });  
        
                                    _modalView.findModal()
                                              .findCaretInsideModal(commonLocators.CommonLabels.BILL_TYPE);
                                    _modalView.select_popupItem("list", data[commonLocators.CommonLabels.BILL_TYPE])

                    
                    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
                                    _modalView.findModal()
                                              .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                                              .clear({ force: true })
                                              .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true });
                     }
                     if (data[commonLocators.CommonKeys.BILL_NO]) {
                      _modalView.findModal()
                                .findInputFieldInsideModal(commonLocators.CommonKeys.BILL_NO, app.InputFields.DOMAIN_TYPE_CODE)
                                .clear({ force: true })
                                .type(data[commonLocators.CommonKeys.BILL_NO], { force: true });
                      }    
                    
                    if (data[commonLocators.CommonLabels.CLERK]) {
                                    _modalView.findModal()
                                              .findInputFieldInsideModal(commonLocators.CommonLabels.CLERK, app.InputFields.INPUT_GROUP_CONTENT)
                                              .clear({ force: true })
                                              .type(data[commonLocators.CommonLabels.CLERK]);
                                    _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.CLERK])
                                    cy.wait(1000)
                    }
                    if(data[commonLocators.CommonKeys.CUSTOMER]){
                      _modalView.findModal()
                                .findInputFieldInsideModal(commonLocators.CommonKeys.CUSTOMER, app.InputFields.INPUT_GROUP_CONTENT)
                                .clear({ force: true })
                                .type(data[commonLocators.CommonKeys.CUSTOMER]);
                      _modalView.select_popupItem("grid", data[commonLocators.CommonKeys.CUSTOMER]);            
                    }   
                    if(data[commonLocators.CommonLabels.BUSINESS_PARTNER]){
                      _modalView.findModal()
                                .findInputFieldInsideModal(commonLocators.CommonLabels.BUSINESS_PARTNER, app.InputFields.INPUT_GROUP_CONTENT)
                                .clear({ force: true })
                                .type(data[commonLocators.CommonLabels.BUSINESS_PARTNER]);
                      _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.BUSINESS_PARTNER]);            
                    } 
                    if(data[commonLocators.CommonLabels.BOQ_SOURCE]) {
                                    cy.get(commonLocators.CommonElements.BID_BOQ_TAB).click()
                                    cy.get(commonLocators.CommonElements.CARET_MODAL).click()
                                    _mainView.select_popupItem("grid1", data[commonLocators.CommonLabels.BOQ_SOURCE])
                    } 
                    if(data[app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]) {
                                    cy.get('[class*="subview-container"] [class*="column-id_boqrootitem.briefinfo"]').contains('[class*="column-id_boqrootitem.briefinfo"]',data[app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]).click({force:true})
                                    cy.wait(1000) // required wait
                                    cy.get("div.active  div.column-id_marker.selected input").check()
                    } 


                                    _modalView.findModal()
                                              .acceptButton("OK");
                                            cy.SAVE();
                                     _mainView
                                              .findModuleClientArea()
                                              .findAndShowContainer(cnt.uuid.BILLS)
                                              .findGrid()
                                              .findActiveRow()
                                              .getCell(app.GridCells.BILL_NO)
                                              .wrapElements().then(($ele) => {
                                                    Cypress.env("actBillCode", $ele.text());
                                            })
    
                  break;
                                            
            case "Final Invoice":
                    if (data[commonLocators.CommonLabels.CONTRACT]) {  
                                    _modalView.findModal()
                                              .findInputFieldInsideModal(commonLocators.CommonLabels.CONTRACT, app.InputFields.INPUT_GROUP_CONTENT)
                                              .clear({ force: true })
                                              .type(data[commonLocators.CommonLabels.CONTRACT], { force: true });
                                    _modalView.findModal()
                                              .select_popupItem("grid", data[commonLocators.CommonLabels.CONTRACT]);
                    }
                                    _modalView.findModal()
                                              .findCaretInsideModal(commonLocators.CommonLabels.BILL_TYPE);
                                    _modalView.select_popupItem("list", commonLocators.CommonLabels.BILL_TYPE)

                    if (data[commonLocators.CommonLabels.DESCRIPTION]) {  
                                    _modalView.findModal()
                                              .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                                              .clear({ force: true })
                                              .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true });
                    }
                                    _modalView.findModal()
                                              .acceptButton("OK");
                                            cy.SAVE();
                    break;
            case "Single Invoice":
                    if (data[commonLocators.CommonLabels.CONTRACT]) {
                                     _modalView.findModal()
                                               .findInputFieldInsideModal(commonLocators.CommonLabels.CONTRACT, app.InputFields.INPUT_GROUP_CONTENT)
                                               .clear({ force: true })
                                               .type(data[commonLocators.CommonLabels.CONTRACT], { force: true });
                                     _modalView.findModal()
                                               .select_popupItem("grid", data[commonLocators.CommonLabels.CONTRACT]);
                    }
                                       _modalView.findModal()
                                                 .findCaretInsideModal(commonLocators.CommonLabels.BILL_TYPE);
                                    _modalView.select_popupItem("list", data[commonLocators.CommonLabels.BILL_TYPE])


                    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
                                     _modalView.findModal()
                                               .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                                               .clear({ force: true })
                                               .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true });
                    }
                    if (data[commonLocators.CommonLabels.CONTRACT_TYPE]) {
                                      _modalView.findModal()
                                                .findInputFieldInsideModal(commonLocators.CommonLabels.CONTRACT_TYPE, app.InputFields.INPUT_GROUP_CONTENT)
                                                .clear({ force: true })
                                                .type(data[commonLocators.CommonLabels.CONTRACT_TYPE], { force: true });
                                      _modalView.findModal()
                                                .select_popupItem("grid", data[commonLocators.CommonLabels.CONTRACT_TYPE]);
                     }
                     if (data[commonLocators.CommonLabels.CLERK]) {
                      _modalView.findModal()
                                .findInputFieldInsideModal(commonLocators.CommonLabels.CLERK, app.InputFields.INPUT_GROUP_CONTENT)
                                .clear({ force: true })
                                .type(data[commonLocators.CommonLabels.CLERK]);
                      _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.CLERK])
                      cy.wait(1000)
      }
                    if(data[commonLocators.CommonLabels.BUSINESS_PARTNER]){
                      _modalView.findModal()
                                .findInputFieldInsideModal(commonLocators.CommonLabels.BUSINESS_PARTNER, app.InputFields.INPUT_GROUP_CONTENT)
                                .clear({ force: true })
                                .type(data[commonLocators.CommonLabels.BUSINESS_PARTNER]);
                      _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.BUSINESS_PARTNER]);            
                    }   
                    if(data[commonLocators.CommonLabels.BOQ_SOURCE]) {
                                    cy.get(commonLocators.CommonElements.BID_BOQ_TAB).click()
                                    cy.get(commonLocators.CommonElements.CARET_MODAL).click()
                                    _mainView.select_popupItem("grid1", data[commonLocators.CommonLabels.BOQ_SOURCE])
                    } 
                    if(data[app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]) {
                                    cy.get('[class*="subview-container"] [class*="column-id_boqrootitem.briefinfo"]')
                                      .contains('[class*="column-id_boqrootitem.briefinfo"]',data[app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO])
                                      .click({force:true})
                                    cy.wait(1000) // required wait
                                    cy.get("div.active  div.column-id_marker.selected input").check()
                    } 
                                      _modalView.findModal()
                                                .acceptButton("OK");
                                              cy.SAVE();
                    break;
    }

}

  create_BillFromWizard(RecordOption: string,type: string,Module: string,descInfo: string){
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, RecordOption);
    _modalView.findModal()
              .findCaretInsideModal("Type");
    _modalView.select_popupItem("list", type);

    switch (Module) {
      case "WIP":
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear()
                  .type(descInfo);
        _modalView.findModal()
                  .findInputFieldInsideModal("Bill No", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear()
                  .type(descInfo);

        _modalView.findModal()
                  .acceptButton("OK");
        _modalView.findModal()
                  .acceptButton("Go to Bill");
        break;
      case "Contract":
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_TRANSLATION)
                  .clear()
                  .type(descInfo);
        _modalView.findModal()
                  .acceptButton("OK");
        _modalView.findModal()
                  .acceptButton("Go to Bill");
        break;
      case "WIP1":
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear()
                  .type(descInfo);
        _modalView.findCheckbox_inCell("item-field_IsMarked")
                  .eq(0)
                  .check({ force: true });
        cy.wait(4000);
        _modalView.findModal()
                  .acceptButton("OK");
        _modalView.findModal()
                  .acceptButton("Go to Bill");
        break;
    }
  }

  verifyValue_inQuantityBill(BoQSource: string) {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.COPY_BOQS);
    _modalView.findModal().caret();
    _modalView.select_popupItem("grid1", BoQSource);
    _modalView.findCheckbox_inCell("item-field_IsMarked")
              .check({ force: true });
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .acceptButton("OK");
  }

  editQuantity_inBill(quantity: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(quantity);
    cy.SAVE();
  }

  create_BillFromWizard_throughQTO(category: string,description: string,contractType: string,performFromDate: any,performToDate: any) {
    _modalView.findModal()
              .findCaretInsideModal("Category")
              .then(()=>{
                cy.get(`${commonLocators.CommonElements.POPUP_FOOTER} .${btn.ToolBar.ICO_REFRESH}`)
                  .click()
                  .then(()=>{
                    _common.waitForLoaderToDisappear()
                    _modalView.select_popupItem("list", category);
                  })
              })
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_TRANSLATION)
              .clear({ force: true })
              .type(description, { force: true });
    _modalView.findModal()
              .findCaretInsideModal("Contract Type");
    _modalView.select_popupItem("list", contractType);
    _modalView.findModal()
              .findInputFieldInsideModal("Performed From", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(performFromDate, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal("Performed To", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(performToDate, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal("Clerk", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type("SmiJ", { force: true });
    _modalView.select_popupItem("grid", "SmiJ");
    cy.wait(1000)                   
    _modalView.findModal()
              .acceptButton("OK");
    cy.wait(1000)          
    // cy.SAVE();
    // _mainView.findModuleClientArea()
    //          .findAndShowContainer(cnt.uuid.BILLS)
    //          .findGrid()
    //          .findActiveRow()
    //          .getCell(app.GridCells.BILL_NO)
    //          .wrapElements()
    //          .then(($ele) => {
    //             Cypress.env("actBillCode", $ele.text());
    //           });
   }

  /* Updating Bill from QTO-->Handling all required modal fields */
  update_BillFrom_QTO(billNo: string) {
    _modalView.findModal()
              .wrapElements()
              .within(() => {
                        cy.get("label")
                          .contains("Update")
                          .invoke("attr", "for")
                          .then((radio1) => {
                            cy.get(`#${radio1}`).check();
                           });
                        cy.get("label")
                          .contains("Update lines with Bill number + all new lines")
                          .invoke("attr", "for")
                          .then((radio2) => {
                            cy.get(`#${radio2}`).check();
                           });
                });
    _modalView.findModal()
              .findInputFieldInsideModal("Bill No", app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(billNo);
    _modalView.select_popupItem("grid", billNo);
    _modalView.findModal()
              .acceptButton("OK");
  }

  createTransactionRecord_ForSelected_byWizardOption() {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar("wizard", "Generate Transaction For Selected");
    cy.REFRESH_CONTAINER();
  }

  VerifyTransactionRecord() {
    _common.openTab(app.TabBar.APPLICATIONS);
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_TRANSACTION);
    _common.select_allContainerData(cnt.uuid.BILL_TRANSACTION);

    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_BOQ);
    _common.select_allContainerData(cnt.uuid.BILL_BOQ);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_TRANSACTION)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_SMALL)
             .wrapElements()
             .then(($ele) => {
                        var TransactionAmount = $ele.text();
                        var tA = TransactionAmount.split(".");
                        tA = tA[0];
                        cy.log(tA);

                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(cnt.uuid.BILL_BOQ)
                                 .findGrid()
                                 .findActiveRow()
                                 .getCell(app.GridCells.FINAL_PRICE_SMALL)
                                 .wrapElements()
                                 .then(($ele) => {
                                        var billNetAmount = $ele.text();
                                        var bA = billNetAmount.split(".");
                                        bA = bA[0];
                                        cy.log(bA);
                                        expect(bA).to.equals(tA);
                                 });
                });
  }

  createBillingSchemaDetailsRecord(cnt_uuid: string,type: string,billschemaDesc: string,netTotal: string,generalType: string,taxcode: string,credFactor: string){
    _common.clickOn_cellHasUniqueValue(cnt_uuid, app.GridCells.DESCRIPTION_INFO, type);
    _common.create_newRecord(cnt_uuid);
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
            .findAndShowContainer(cnt_uuid)
            .wrapElements()
            .get(`[id="ui-layout-west"] [class*="grid-container"] .active div.${app.SubContainerLayout.COLUMN_ID}_${app.GridCells.DESCRIPTION_INFO}`)
            .click()
            .find(`input[class^='${app.InputFields.DOMAIN_TYPE_TRANSLATION}'] `)
            .clear()
            .type(billschemaDesc,{force:true,parseSpecialCharSequences:false});
    _common.enterRecord_inNewRow(cnt_uuid,app.GridCells.BILLING_LINE_TYPE_FK,app.InputFields.INPUT_GROUP_CONTENT,netTotal);
    _modalView.findPopup()
              .select_popupItem("list", netTotal);
    _common.enterRecord_inNewRow(cnt_uuid,app.GridCells.GENERALS_TYPE_FK,app.InputFields.INPUT_GROUP_CONTENT,generalType);
    _modalView.findPopup()
              .select_popupItem("list", generalType);
    _common.enterRecord_inNewRow(cnt_uuid,app.GridCells.TAX_CODE_FK,app.InputFields.INPUT_GROUP_CONTENT,taxcode);
    _modalView.findPopup()
              .select_popupItem("grid", taxcode);
    _common.enterRecord_inNewRow(cnt_uuid,app.GridCells.CRED_FACTOR,app.InputFields.INPUT_GROUP_CONTENT,credFactor);
    cy.SAVE();
  }

  change_Procurement_Configuration(configuration: string,BillingSchema: string) {
    _modalView.findModal()
              .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(configuration, { force: true });
    _modalView.findModal()
              .select_popupItem("grid", configuration);
    _modalView.findModal()
              .findInputFieldInsideModal("Billing Schema", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(BillingSchema, { force: true });
    _modalView.findModal()
              .select_popupItem("list", BillingSchema);
    _modalView.findModal()
              .acceptButton("OK");
  }

  assertBillingSchemaDetailsContainerRecord(container_UUID: string,gridCellClass: string,actualValue: string) {
    var textValue;
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .wrapElements()
             .within(() => {
                cy.get(`.active div.column-id_${gridCellClass}`)
                  .eq(1)
                  .then(($val) => {
                        const ActVal = $val.text();
                        expect(ActVal).to.equals(actualValue);
                   });
             });
  }

  verifyInvoiceType(invoiceType: string) {
    if (invoiceType == "Progress Invoice") {
      Cypress.env("INVOICE_TYPE1", "Invoice Progress Application");
    }
  }

  create_bill_fromWizard(data: DataCells) {
    switch (data[commonLocators.CommonLabels.BILL_TYPE]) {
      case "Progress Invoice":    
        _common.waitForLoaderToDisappear()    

        if (data[commonLocators.CommonLabels.BILL_TYPE]) {
          _modalView.findModal()
                    .findCaretInsideModal(commonLocators.CommonLabels.BILL_TYPE)
                    .then(()=>{
                      _modalView.select_popupItem("list", data[commonLocators.CommonLabels.BILL_TYPE])
                    })
        }
        
        if (data[commonLocators.CommonLabels.DESCRIPTION]) {
          _modalView.findModal()
                    .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                    .clear({ force: true })
                    .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true });
        }
    
      
        if (data[app.GridCells.DESCRIPTION_INFO]) {

          for (let index = 0; index < data[app.GridCells.DESCRIPTION_INFO].length; index++) {

            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
              .find(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.DESCRIPTION_INFO}']`)
              .contains(data[app.GridCells.DESCRIPTION_INFO][index])
              .click()

            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
              .find(`.active [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MARKER}']`)
              .within(()=>{
                cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                  .as("checkbox")
                  .invoke("is", ":checked")
                  .then((checked) => {
                  if(data[commonLocators.CommonKeys.VALUE][index]==="check"){
                    if (!checked) {
                      cy.get("@checkbox").check();
                    }
                  }if (data[commonLocators.CommonKeys.VALUE][index]==="uncheck") {
                    if (checked) {
                      cy.get("@checkbox").uncheck();
                    }
                  }
                  
                  });
              })
            
          }
        }

        _modalView.findModal()
                  .acceptButton("OK");   
        _common.waitForLoaderToDisappear()    
      break;
                                
      case "Final Invoice":
       _common.waitForLoaderToDisappear()    

       if (data[commonLocators.CommonLabels.BILL_TYPE]) {
          _modalView.findModal()
                    .findCaretInsideModal(commonLocators.CommonLabels.BILL_TYPE)
                    .then(()=>{
                      _modalView.select_popupItem("list", data[commonLocators.CommonLabels.BILL_TYPE])
                    })
        }

        if (data[commonLocators.CommonLabels.DESCRIPTION]) {  
          _modalView.findModal()
                    .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                    .clear({ force: true })
                    .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true });
        }

        if (data[app.GridCells.DESCRIPTION_INFO]) {

          for (let index = 0; index < data[app.GridCells.DESCRIPTION_INFO].length; index++) {

            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
              .find(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.DESCRIPTION_INFO}']`)
              .contains(data[app.GridCells.DESCRIPTION_INFO][index])
              .click()

            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
              .find(`.active [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MARKER}']`)
              .within(()=>{
                cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                  .as("checkbox")
                  .invoke("is", ":checked")
                  .then((checked) => {
                  if(data[commonLocators.CommonKeys.VALUE][index]==="check"){
                    if (!checked) {
                      cy.get("@checkbox").check();
                    }
                  }if (data[commonLocators.CommonKeys.VALUE][index]==="uncheck") {
                    if (checked) {
                      cy.get("@checkbox").uncheck();
                    }
                  }
                  
                  });
              })
            
          }
        }
        _modalView.findModal()
                  .acceptButton("OK");
        _common.waitForLoaderToDisappear()    
        break;
    }
  }
   
   
}
