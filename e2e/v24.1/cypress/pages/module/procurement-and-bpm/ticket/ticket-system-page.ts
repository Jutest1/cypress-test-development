/// <reference types="cypress" />
import { app, btn, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _mainView, _modalView, _package, _salesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


export class TicketSystemPage {

  enterRecord_toAddMaterialInCart(container_UUID: string, material: string[], quantity: string[]) {
    if (material != null) {
      for (let i = 0; i < material.length && quantity.length; i++) {
        const Material = material[i]
        const Quantity = quantity[i]
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .findButton(btn.IconButtons.ICO_DISCARD)
                 .clickIn()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
                 .clear({ force: true })
                 .type(Material)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .findButton(btn.IconButtons.ICO_SEARCH)
                 .clickIn()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .within(() => {
                  cy.get('div.flex-box div.ms-commodity-row').contains("span.ms-commodity-row-item-title", Material)
                    .as('material')
                    .click({ force: true })
                  cy.wait(1000)
                 })
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .within(() => {
                  cy.get('div.flex-box div.ms-commodity-row')
                    .last()
                    .within(() => {
                    if (Quantity != null) {
                      cy.get(`div.ms-commodity-row-add-delete input.${app.InputFields.QUANTITY_INPUT}`)
                        .last()
                        .click({ force: true })
                        .clear()
                        .type(Quantity)
                      cy.get(`div.ms-commodity-row-cart-empty [class*='${btn.IconButtons.ICO_CART}']`)
                        .click({ force: true })
                    }
                    else {
                      cy.get(`div.ms-commodity-row-cart-empty [class*='${btn.IconButtons.ICO_CART}']`)
                        .click({ force: true })
                    }
                  })
                 })
        cy.get(`button.ms-sv-commodity-${btn.IconButtons.PREVIEW_BACK}`)
          .click({ force: true })
        cy.wait(2000)
      }
    }
  }

  deleteRecord_toClearItemsInCart(container_UUID: string, material?: string[]) {
    if (material != null) {
      for (let i = 0; i < material.length; i++) {
        const Material = material[i]

        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .within(() => {
                  cy.get('div.flex-box div.ms-commodity-row').contains("span.ms-commodity-row-item-title", Material)
                    .as('material')
                    .click({ force: true })
                  cy.wait(1000)
                 })
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .within(() => {
                  cy.get('div.flex-box div.ms-commodity-row')
                    .last()
                    .within(() => {
                    cy.get(`div.ms-commodity-row-cart-delete [class*='${btn.IconButtons.ICO_CART_ITEM_DELETE}']`)
                      .click({ force: true })
                    cy.wait(1000)
                  })
                 })
        cy.get(`button.ms-sv-commodity-${btn.IconButtons.PREVIEW_BACK}`)
          .click({ force: true })
        cy.wait(2000)
      }
    }
    else {
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
      cy.wait(2000)
      cy.get(`button.ts-commodity-car-bnt [class*=${btn.IconButtons.ICO_CART_ITEM_DELETE}`)
        .click({ force: true })
    }
  }

  enterRecord_toPlaceOrderForRequisitionFromCart(container_UUID:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .within(() => {
                cy.get(`button.${btn.IconButtons.BTN_SUCCESS}`)
                  .contains("Place Order")
                  .click({ force: true })
                cy.wait(2000)
             })    
  }
    
  click_oncartBusinessPartnerLookUp(container_UUID:string,CartElements:string,buttonClass:string,index){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .wrapElements()
             .within(($ele)=>{
               cy.wrap($ele)
                 .find("[data-ng-model='"+CartElements+"'] [class*='"+buttonClass+"']")
                 .eq(index)
                 .click()   
        })
  }

  click_onCartCheckbox(container_UUID: string, rowclass: string, index, checkBoxValue) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .wrapElements()
             .find("[class*='" + rowclass + "']").eq(index)
             .within(($ele) => {
                cy.wrap($ele)
                  .find(commonLocators.CommonElements.CHECKBOX_TYPE).as("check").invoke('is', ':checked')
                  .then(checked => {
                    if (checkBoxValue == "check") {
                      if (!checked) {
                        cy.get('@check').check();
                      }
                    } if (checkBoxValue == "uncheck") {
                      if (checked) {
                        cy.get('@check').uncheck();
                      }
                    }
                  })
             })
  }

  set_cartViewMaterialsHeader(data:DataCells){
    if(data[commonLocators.CommonLabels.PROCUREMENT_TYPE]){
          cy.get(commonLocators.CommonElements.CART_VIEW_MATERIALS_HEADER)
            .contains(commonLocators.CommonLabels.PROCUREMENT_TYPE)
            .closest(commonLocators.CommonElements.FLEX_BOX)
            .within(($ele)=>{
                cy.wrap($ele)
                  .find('.'+btn.GridButtons.CARET)
                  .click()
                cy.document()
                  .its('body')
                  .find(".popup-container")
                  .within(()=>{
                      cy.contains("button", data[commonLocators.CommonLabels.PROCUREMENT_TYPE])
                        .click({ force: true });
                  })
              })
    }    
    if(data[commonLocators.CommonLabels.VENDOR]){
            cy.get(commonLocators.CommonElements.CART_VIEW_MATERIALS_HEADER)
              .contains(commonLocators.CommonLabels.VENDOR)
              .closest(commonLocators.CommonElements.FLEX_BOX)
              .within(($ele)=>{
                    cy.wrap($ele)
                      .click()
                    _mainView.findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                              .type(data[commonLocators.CommonLabels.VENDOR]);
                    cy.document()
                      .its('body')
                      .find(".popup-container")
                      .within(()=>{
                            cy.contains("div", data[commonLocators.CommonLabels.VENDOR])
                              .click({ force: true });
                            cy.wait(5000)
                      })
              })
    }
    
  }

  deleteRecord_underOrderHistory(container_UUID: string, orderRequest: string, expectedMessage?: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .wrapElements()
             .within(() => {
              cy.get(commonLocators.CommonElements.TICKET_SYSTEM_ORDER_LIST)
                .contains(commonLocators.CommonElements.TICKET_SYSTEM_ORDER_LIST_HEADER, orderRequest)
                .as('material')
                .click({ force: true });
              cy.wait(1000);
              cy.get('@material').closest(commonLocators.CommonElements.TICKET_SYSTEM_ORDER_LIST)
                .within(() => {
                  cy.get(`${commonLocators.CommonElements.TICKET_SYSTEM_ORDER_LIST_BUTTON} [class*='${btn.IconButtons.ICO_CART_ITEM_DELETE}']`)
                    .click({ force: true });
                  cy.wait(1000);
                  cy.get(commonLocators.CommonElements.TICKET_SYSTEM_ORDER_ATTRIBUTE_STATUS)
                    .should('contain', expectedMessage);
              });
             });
  }

  verify_LeadTimeAndRequiredDate(leadTime:number) {
    cy.get(commonLocators.CommonElements.CART_VIEW_MATERIALS_HEADER)
      .contains(commonLocators.CommonLabels.REQUIRED_DATE)
      .closest(commonLocators.CommonElements.FLEX_BOX)
      .click()
      .invoke('text').then((text) => {
          const leadTimeDays = leadTime; // Adjust as needed
          const currentDate = new Date();
          const requiredDate = new Date(currentDate);
          requiredDate.setDate(currentDate.getDate() + leadTimeDays);
          if (!isNaN(leadTimeDays)) {
          const formattedRequiredDate = `${requiredDate.getFullYear()}-${(requiredDate.getMonth() + 1).toString().padStart(2, '0')}-${requiredDate.getDate().toString().padStart(2, '0')}`;
          cy.log(`Calculated Required Date: ${formattedRequiredDate}`);
          } else {
          cy.log('Captured text is not a valid lead time');
    } 
    })
  }
 
  verify_LeadTimeInRequisition(container_UUID:string,cellID:string,Leadtime:number) {
   _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(cellID)
            .wrapElements() 
             .invoke('text').then((text) => {
                 const leadTimeDays = Leadtime 
                 const currentDate = new Date();
                 const requiredDate = new Date(currentDate);
                 requiredDate.setDate(currentDate.getDate() + leadTimeDays);
                  if (!isNaN(leadTimeDays)) {
                     const formattedRequiredDate = `${requiredDate.getFullYear()}-${(requiredDate.getMonth() + 1).toString().padStart(2, '0')}-${requiredDate.getDate().toString().padStart(2, '0')}`;
                     cy.log(`Calculated Required Date: ${formattedRequiredDate}`);
                 } else {
                     cy.log('Captured text is not a valid lead time');
                 }
 
                 })
  }

  verify_GridCellHasNoTextandaddproject(project:string) {
          cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Create Requisition and/or Contract")
                _modalView.findInputFieldInsideModal("Project", app.InputFields.INPUT_GROUP_CONTENT)
                           .clear()
                           .should('not.contain', 'text')    
                 _modalView.findInputFieldInsideModal("Project", app.InputFields.INPUT_GROUP_CONTENT)
                           .clear()
                           .type(project)
                 _modalView.select_popupItem("grid", project)                         
  }

  enterRecord_toAddRemarkandplaceorderSuccessfully(remark:string, goToModule:string) {
                _modalView.findModal()
                          .findInputFieldInsideModal("Remark", app.InputFields.DOMAIN_TYPE_REMARK)
                          .clear()
                          .type(remark)
                _modalView.findModal().acceptButton(btn.ButtonText.OK);
                        cy.wait(3000)          
                        cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Place Order Successfully")
                          .within(() => {
                        cy.get(`button.${btn.IconButtons.ICO_GO_TO}`).contains(goToModule).click()
                        })
                       cy.wait(1000)          
   }

  verifyVendorin_ticketsystem(bpName:string) {
           cy.get(commonLocators.CommonElements.CART_VIEW_MATERIALS_HEADER)
              .contains(commonLocators.CommonLabels.VENDOR)
              .closest(commonLocators.CommonElements.FLEX_BOX)
              .within(($ele)=>{
               cy.wrap($ele)
                 .click()
              _mainView.findTextInput(app.InputFields.INPUT_GROUP_CONTENT).eq(0)
                       .invoke("val").then((actualText) => {
                          const expectedText = bpName; 
                          expect(actualText).to.equal(expectedText);
               })
              })
         }          

}
 
  
