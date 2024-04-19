/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _rfqPage, _salesPage } from "cypress/pages";
import { app, cnt, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

export class BusinessPartnerPage {
    enterRecord_toCreateBusinessPartner(code: string, bpName: string, street?: string,ZipCode?: string,city?: string,Country?: string) {
                      
      
              
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BUSINESS_PARTNERS)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.BUSINESS_PARTNER_NAME_1)
                 .clickIn()
                cy.wait(1000) //required Wait
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BUSINESS_PARTNERS)
                 .findGrid()
                 .findActiveRow()
                 .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                 .type(bpName)

        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BUSINESS_PARTNERS)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.CODE)
                 .wrapElements()
                 .invoke("text")
                 .then(function (codeVal: string) {
                  if (codeVal != "Is generated") {
                    _common.enterRecord_inNewRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, code);
                  }
                 })

        _modalView.findModuleClientArea()
                .findAndShowContainer(cnt.uuid.BUSINESS_PARTNERS)
                .findGrid()
                .findActiveRow()
                .findCell(app.GridCells.ADDRESS)
                .findButton(btn.IconButtons.ICO_INPUT_LOOKUP)
                .clickIn();

        _modalView.findModalBody()
                .findTextAreaInModal(app.InputFields.DOMAIN_TYPE_COMMENT)
                .eq(0)
                .clear()
                .type(street)

        _modalView.findModalBody()
                .findInputFieldInsideModal("Zip Code",app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear()
                .type(ZipCode)

        _modalView.findModalBody()
                .findInputFieldInsideModal("City",app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear()
                .type(city)

        _modalView.findModalBody()
                .findInputFieldInsideModal("Country",app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(Country)

        _modalView.select_popupItem("list",Country)
        _modalView.acceptButton("OK")

    }

    enterRecord_toCreateBusinessPartnerBranch( street: string,ZipCode: string,city: string,Country: string) {
        _mainView.findModuleClientArea()
                .findAndShowContainer(cnt.uuid.SUBSIDIARIES)
                .findGrid()
                .findActiveRow()
                .findCell(app.GridCells.ADDRESSD_TO)
                .findButton(btn.IconButtons.ICO_INPUT_LOOKUP)
                .clickIn();

        _modalView.findModalBody()
                .findTextAreaInModal(app.InputFields.DOMAIN_TYPE_COMMENT)
                .eq(0)
                .clear()
                .type(street)

        _modalView.findModalBody()
                .findInputFieldInsideModal("Zip Code",app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear()
                .type(ZipCode)

        _modalView.findModalBody()
                .findInputFieldInsideModal("City",app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear()
                .type(city)

        _modalView.findModalBody()
                .findInputFieldInsideModal("Country",app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(Country)

        _modalView.select_popupItem("list",Country)
        _modalView.acceptButton("OK")
    }

    enterRecord_toCreateBusinessPartnerEvaluation(code: string, description: string, fromDate: string, toDate: string, procurmentClerk: string, remark: string, projName: string, evaluationDocument?: string, evaluation?: DataCells) {
       if (evaluation != null) {
         _modalView.findModal()
                   .findInputFieldInsideModal("Evaluation Schema", app.InputFields.INPUT_GROUP_CONTENT)
                   .clear({ force: true })
                   .type(evaluation[app.InputFields.INPUT_GROUP_CONTENT], { force: true })
         _modalView.select_popupItem("list", evaluation[app.InputFields.INPUT_GROUP_CONTENT])
         cy.wait(5000)
       }
         _modalView.findCaretInsideModal("Evaluation Motive")
         _modalView.select_popupItem("list", "Project")
         cy.wait(500)
         _modalView.findModalBody()
                   .findInputFieldInsideModal("Code", app.InputFields.DOMAIN_TYPE_CODE)
                   .type(code)
         _modalView.findModalBody()
                   .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                   .type(description)
         _modalView.findModalBody()
                   .findInputFieldInsideModal("Valid From", app.InputFields.INPUT_GROUP_CONTENT)
                   .type(fromDate)
         _modalView.findModalBody()
                   .findInputFieldInsideModal("Valid To", app.InputFields.INPUT_GROUP_CONTENT)
                   .type(toDate)
         _modalView.findModalBody()
                   .findInputFieldInsideModal("Procurement Clerk", app.InputFields.INPUT_GROUP_CONTENT)
                   .type(procurmentClerk)
         _modalView.select_popupItem("grid", procurmentClerk)
         _modalView.findModalBody()
                   .findInputFieldInsideModal("Requisition Owner", app.InputFields.INPUT_GROUP_CONTENT)
                   .type(procurmentClerk)
         _modalView.select_popupItem("grid", procurmentClerk)
         _modalView.findTextAreaInModal(app.InputFields.DOMAIN_TYPE_REMARK).eq(0)
                   .type(remark)
         _modalView.findModalBody()
                   .findInputLookup(btn.IconButtons.ICO_INPUT_LOOKUP, 3)
         _modalView.searchInModal(app.InputFields.INPUT_GROUP_FORM_CONTROL, "Assign Project", projName)
         _modalView.findModalBody()
                   .findButtonWithTitle("search").clickIn()
         _modalView.findModal()
                   .findCellhasValue(app.GridCells.PROJECT_NO_CAPS, projName)
                   .click()
         cy.get("[class*='modal-footer']").last().contains(btn.ButtonText.OK).click();
         cy.wait(3000)
       if (evaluation != null) {
         Object.keys(evaluation[app.GridCells.GROUP_DESCRIPTION]).forEach((key)=>{
           _modalView.findModalBody()
                     .findGrid()
                     .findCellhasValue(app.GridCells.GROUP_DESCRIPTION, key)
                     .click()
                     .then(()=>{
                       _modalView.findModalBody()
                                 .findActiveRow()
                                 .findCell(app.GridCells.POINTS)
                                 .typeIn(evaluation[app.GridCells.GROUP_DESCRIPTION][key])
                     })
         })
       }
       if (evaluationDocument != null){
         _modalView.findModalBody()
                   .findCellhasValue(app.GridCells.GROUP_DESCRIPTION, evaluationDocument)
                   .click()
       }
       _modalView.acceptButton("OK")
   
     }
   
     /* selecting "key" icon in the business partner module */
    select_keyIcon(container_UUID:string,cellClass:string,action:string){
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .findActiveRow()
                 .findCell(cellClass)
                 .wrapElements()
                 .find("button")
                 .invoke("attr", "title")
                 .then((title) => {
                  if (action === "select" && title === `${commonLocators.CommonLabels.CREATE_ACCESS_RIGHT}`) {
                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(container_UUID)
                                 .findGrid()
                                 .findActiveRow()
                                 .findCell(cellClass)
                                 .findButton(btn.IconButtons.GRID_CELL_ICO)
                                 .clickIn()
                      }
                  if (action === "deselect" && title !== `${commonLocators.CommonLabels.CREATE_ACCESS_RIGHT}`){
                        _mainView.findModuleClientArea()
                                 .findAndShowContainer(container_UUID)
                                 .findGrid()
                                 .findActiveRow()
                                 .findCell(cellClass)
                                 .findButton(btn.IconButtons.GRID_CELL_ICO)
                                 .clickIn()
                      }
                 })
      }

    enterRecord_toAddBusinessPartnerUsingLookUp(data:DataCells) {     
      if(data[commonLocators.CommonLabels.BUSINESS_PARTNER]){  
        for (var businessPartnerName of data[commonLocators.CommonLabels.BUSINESS_PARTNER]) {
          _modalView.findModal()
                  .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .first()
                  .clear()
                  .type(businessPartnerName)
                  cy.wait(2000)
          _modalView.findModal()
                  .findButton(btn.IconButtons.ICO_SEARCH)
                  .clickIn()
                  cy.wait(2000)
          _modalView.findModal()
                  .findCellhasValue(app.GridCells.BP_NAME_1, businessPartnerName)
                  .click()
                  cy.wait(2000)         
          _rfqPage.setBusinessPartnerId(businessPartnerName)
          if (data[app.GridCells.ID]) {
            cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+` [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.ID}'] `+commonLocators.CommonElements.RADIO_INPUT).first().click()
          }
        }
      }
      _modalView.acceptButton(btn.ButtonText.OK)
    } 

    selectProcurementStructure(container_UUID:string,data:DataCells){
 
        _modalView.findModal()
                  .findTextInput(app.InputFields.FORM_CONTROL)
                  .eq(0)
                  .clear()
                  .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
        _modalView.findModal()
                  .findButton(btn.IconButtons.ICO_SEARCH)
                  .clickIn()
        cy.wait(3000)
        _modalView.findModal()
                  .wrapElements()
                  .find('.'+commonLocators.CommonElements.COLUMN_ID+commonLocators.CommonKeys.CODE)
                  .each(($el) => {
                    const val = $el.text();
                    if (val == data[commonLocators.CommonKeys.SEARCH_RESULT]) {
                      cy.wrap($el)
                        .click({force:true})
                    }
                  })
        _modalView.findModalBody()
                  .findGrid()
                  .containsValue(data[commonLocators.CommonKeys.SEARCH_RESULT])
                  .click()
        _modalView.findModal()
                  .wrapElements()
                  .find(commonLocators.CommonElements.ACTIVE+' .'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.IS_SELECTED)
                  .within(()=>{
                    cy.get(commonLocators.CommonElements.CHECKBOX_TYPE)
                      .as("check")
                      .invoke("is", ":checked")
                      .then((checked) => {
                        if (data[app.GridCells.IS_SELECTED] == "check") {
                          if (!checked) {
                            cy.get("@check").check();
                          }
                        }
                        if (data[app.GridCells.IS_SELECTED] == "uncheck") {
                          if (checked) {
                            cy.get("@check").uncheck();
                          }
                        }
                      });
                  })
        _modalView.findModal()
                  .acceptButton('OK') 
      }

}