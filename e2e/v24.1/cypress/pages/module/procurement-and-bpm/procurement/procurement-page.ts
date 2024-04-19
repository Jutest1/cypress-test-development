/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _salesPage, _validate } from "cypress/pages";
import { app, cnt, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

export class ProcurementPage {

  enterRecord_ToCreateGenerals(header:string,type:string,value:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.GENERALS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_CONFIG_HEADER_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .clear()
             .type(header);
    _mainView.select_popupItem("list", header);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.GENERALS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_GENERALS_TYPE_FK)
             .caret()
    _mainView.select_popupItem("list", type);
    _common.enterRecord_inNewRow(cnt.uuid.GENERALS,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,value)
 }    

 enterRecord_ToCreateRolesClerk(header:string,clerkRole:string,clerk:string){
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CONTEXT_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(header);
     _mainView.select_popupItem("list", header);
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_ROLE_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .wait(500)
              .clear()
              .type(clerkRole)
     _mainView.select_popupItem("grid", clerkRole);
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .type(clerk)
     cy.wait(2000);
     _mainView.select_popupItem('grid', clerk)    
 }

   /*
    * This is used to create new procurement structure
    * Updated Date: 20/12/2024
    * Updated content : Interface logic
    * Author : Harshal Shinkar
    */
 enterRecord_toCreateCertificates(container_UUID:string,data:DataCells){
  if(data[app.GridCells.PRC_CONFIG_HEADER_FK]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.PRC_CONFIG_HEADER_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(data[app.GridCells.PRC_CONFIG_HEADER_FK]);
  _mainView.select_popupItem("list", data[app.GridCells.PRC_CONFIG_HEADER_FK]);
  }
  if(data[app.GridCells.BPD_CERTIFICATE_TYPE_FK]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.BPD_CERTIFICATE_TYPE_FK)
              .caret()
     _mainView.select_popupItem("list", data[app.GridCells.BPD_CERTIFICATE_TYPE_FK]);
  }
  if(data[app.GridCells.IS_REQUIRED]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.IS_REQUIRED)
              .wrapElements()
              .find(commonLocators.CommonElements.CHECKBOX_TYPE)
              .as("check")
              .invoke('is', ':checked')
              .then(checked => {
                if(data[app.GridCells.IS_REQUIRED]=="check"){
                  if (!checked) {
                    cy.get('@check').check();
                  }
                }if(data[app.GridCells.IS_REQUIRED]=="uncheck"){
                  if (checked) {
                    cy.get('@check').uncheck();
                  }
                } 
              })
  }
  if(data[app.GridCells.IS_MANDATORY]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.IS_MANDATORY)
              .wrapElements()
              .find(commonLocators.CommonElements.CHECKBOX_TYPE)
              .as("check")
              .invoke('is', ':checked')
              .then(checked => {
                if(data[app.GridCells.IS_MANDATORY]=="check"){
                  if (!checked) {
                    cy.get('@check').check();
                  }
                }if(data[app.GridCells.IS_MANDATORY]=="uncheck"){
                  if (checked) {
                    cy.get('@check').uncheck();
                  }
                } 
              })
  }
 }

  enterRecord_ToCreateCharacteristics(container_UUID:string,code:string,value:string,valueInptClass:string,labels?:string){
    if(labels!=null) {
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .wrapElements()
               .as("label")
               .within(()=>{
                cy.get('@label'+" "+commonLocators.CommonElements.CHARACTERISTIC_LABEL)
                  .contains(labels)
                  .click()
               })
    }
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid().findActiveRow()
             .findCell(app.GridCells.CHARACTERISTIC_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(code)
             .then(()=>{
                _mainView.select_popupItem(commonLocators.CommonKeys.GRID, code) 
             })
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.VALUE_TEXT)
    cy.wait(1000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.VALUE_TEXT)
             .findTextInput(valueInptClass)
             .type(value, { force: true });
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.CHARACTERISTIC_FK)
  }

 Addclerk_contract (Clerk:string){
  _mainView
         .findModuleClientArea()
         .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
         .findGrid()
         .findActiveRow()
         .findCell(app.GridCells.CLERK_PRC_FK)
         .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
         .type(Clerk, { force: true });
         cy.wait(2000)
  _mainView.select_popupItem('grid', Clerk)
         cy.wait(2000)

 }

   /*
    * This is used to create new procurement structure
    * Updated Date: 20/12/2024
    * Updated content : Interface logic
    * Author : Harshal Shinkar
    */
enterRecord_toCreateProcurementStructure(container_UUID:string,data:DataCells){
  if(data[app.GridCells.PRC_STRUCTURE_TYPE_FK]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.PRC_STRUCTURE_TYPE_FK)
              .caret()
    _mainView.select_popupItem(commonLocators.CommonKeys.LIST, data[app.GridCells.PRC_STRUCTURE_TYPE_FK]);
  }
  if(data[app.GridCells.CODE]){
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,data[app.GridCells.CODE])
    _common.clickOn_activeRowCell(container_UUID,app.GridCells.DESCRIPTION_INFO)
  }
  if(data[app.GridCells.DESCRIPTION_INFO]){
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
    _common.clickOn_activeRowCell(container_UUID,app.GridCells.DESCRIPTION_INFO)
  }
  if(data[app.GridCells.CLERK_REQ_FK]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_REQ_FK)
              .caret()
    _mainView.select_popupItem(commonLocators.CommonKeys.LIST, data[app.GridCells.CLERK_REQ_FK]);
    _common.clickOn_activeRowCell(container_UUID,app.GridCells.DESCRIPTION_INFO)
  }
  if(data[app.GridCells.CLERK_PRC_FK]){
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_PRC_FK)
              .caret()
   _mainView.select_popupItem(commonLocators.CommonKeys.LIST, data[app.GridCells.CLERK_PRC_FK]);
   _common.clickOn_activeRowCell(container_UUID,app.GridCells.CLERK_REQ_FK)
  }
  if(data[app.GridCells.PRC_CONFIG_HEADER_FK]){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_CONFIG_HEADER_FK)
             .caret()
   _mainView.select_popupItem(commonLocators.CommonKeys.LIST, data[app.GridCells.PRC_CONFIG_HEADER_FK]);
   _common.clickOn_activeRowCell(container_UUID,app.GridCells.PRC_CONFIG_HEADER_FK)

  }
  
}

enterRecord_ToCreateCharacteristicGroups(description:string){
  _common.enterRecord_inNewRow(cnt.uuid.CHARACTERISTIC_GROUPS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,description)
}

enterRecord_ToCreateCharacteristicForCharGroups(code:string,description:string,type:string){
  _common.enterRecord_inNewRow(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,code)
  _common.enterRecord_inNewRow(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,description)
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
           .findGrid()
           .findActiveRow()
           .findCell(app.GridCells.CHARACTERISTIC_TYPE_FK)
           .caret()
  _mainView.select_popupItem("list", type);
  _common.select_activeRowInContainer(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
  _common.waitForLoaderToDisappear()
}

characteristicsSections(data:any){
  Object.keys(data).forEach(function (key) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
             .findGrid()
             .findCellhasValue(app.GridCells.DESCRIPTION_INFO,key)
             .click()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.CHECKED)
             .wrapElements()
             .find(commonLocators.CommonElements.CHECKBOX_TYPE)
             .as("checkbox")
             .invoke("is", ":checked")
             .then((checked) => {
                if (data[key] == "check") {
                  if (!checked) {
                    cy.get("@checkbox").check();
                  }
                } else if (data[key] == "uncheck") {
                  if (checked) {
                    cy.get("@checkbox").uncheck();
                  }
                }
              });
             });
 }
 Change_Order_Contract_New_Item(project:any,rubicCategory:string,createchangedesc:any,changeType:string,changeReason:string,ChangeOrderContractDesc:any) {
       
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS,"Changes found:").within(() => {
      cy.get(commonLocators.CommonModalElements.MODEL_ITEM_FIELD).eq(0).click() 
    });
     _modalView.findModal()
               .findButton(btn.IconButtons.ICO_INPUT_ADD)
               .clickIn()
    cy.wait(2000)
 /** */ //handling another modal //** */
    var element:string =commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+" "
    var elements:string ="[class*='platform-form-row'] "

    cy.get(element).eq(1).contains(elements,"Project").then((ele) => {
         cy.wrap(ele).find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
         .eq(0)
         .wait(1000)
         .clear()
         .type(project)
    })
    _modalView.select_popupItem("grid",project)

    cy.get(element).eq(1).contains(elements,"Description").then((ele) => {
         cy.wrap(ele)
           .find("[class*='"+app.InputFields.DOMAIN_TYPE_DESCRIPTION+"']")
           .clear()
           .type(createchangedesc)
    })
    _common.waitForLoaderToDisappear()
     _modalView.findModal()
               .findCaretInsideModal("Change Type")
               .wait(500)
     _modalView.select_popupItem("list",changeType)
     _common.waitForLoaderToDisappear()
     cy.wait(4000)
      //  _modalView.findModal()
    //            .findCaretInsideModal("Change Reason")
    //  _modalView.select_popupItem("list",changeReason)  
      cy.get("[class*='modal-footer']").eq(1).contains(btn.ButtonText.OK).click();
      cy.wait(4000)

      cy.get(element).contains(elements,"Change Order Contract Desc").then((ele) => {
        cy.wrap(ele)
          .find("[class*='"+app.InputFields.FORM_CONTROL+"']")
          .clear()
          .type(ChangeOrderContractDesc)
          cy.wait(2000)
      });
      cy.wait(5000)
     _modalView.findModal()
               .acceptButton("OK");
               cy.wait(5000)
     _modalView.findModal()
               .acceptButton("Go To Contract");
      _common.waitForLoaderToDisappear()
               cy.wait(8000)
  }

  enterRecord_toeditpesitem(structurecode?: any, Addmaterial?: string, quantity?: string) {
         _mainView.findModuleClientArea()
                  .findAndShowContainer(cnt.uuid.ITEMS)
                  .findGrid().findActiveRow()
                  .findCell(app.GridCells.UOM_FK)
                  .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                  .type("BAGS");
                cy.wait(1000) 
         _mainView.select_popupItem("grid", "BAGS");
                cy.wait(1000) 
         _mainView.findModuleClientArea()
                  .findAndShowContainer(cnt.uuid.ITEMS)
                  .findGrid().findActiveRow()
                  .findCell(app.GridCells.PRC_STRUCTURE_FK)
                  .findTextInput(app.InputFields.INPUT_GROUP_CONTENT).wait(1000)
                  .clear().type(structurecode);
                cy.wait(1000)
         _mainView.select_popupItem("grid", structurecode)
                cy.wait(2000)
                cy.SAVE()
                cy.wait(1000)
                cy.REFRESH_SELECTED_ENTITIES()
                cy.wait(1000)
                cy.REFRESH_SELECTED_ENTITIES()
                cy.wait(500)
         _mainView.findModuleClientArea()
                  .findAndShowContainer(cnt.uuid.ITEMS)
                  .findGrid().findActiveRow()
                  .findCell(app.GridCells.MDC_MATERIAL_FK).findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                  .type(Addmaterial);
                cy.wait(1000)
         _mainView.select_popupItem("grid", Addmaterial);
                cy.wait(1000)
                cy.SAVE()
                cy.wait(1000)
                cy.REFRESH_SELECTED_ENTITIES()
                cy.wait(1000)
                cy.REFRESH_SELECTED_ENTITIES()
                cy.wait(500)
           if (quantity) {
         _mainView.findModuleClientArea()
                  .findAndShowContainer(cnt.uuid.ITEMS)
                  .findGrid().findActiveRow()
                  .findCell(app.GridCells.QUANTITY_SMALL)
                  .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                  .type(quantity);
                cy.wait(2000)
                cy.SAVE()
                cy.wait(1000)
                cy.REFRESH_SELECTED_ENTITIES()
                cy.wait(500)

    }
  }

  copyRecord_toIncludingDependencies(container_UUID: string,btnToolBar:string, containerPosition?: number) {
         _mainView.findModuleClientArea()
                  .findAndShowContainer(container_UUID, containerPosition)
                  .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                  .findButton(btnToolBar)
                  .clickIn();
         cy.wait(5000);
  }

  enterRecord_toCreateRequisitionMileStone(container_UUID:string,type:string,taxCode:string,amount:string,date:string){
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_MILESTONE_TYPE_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,type)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_TAX_CODE_FK_SMALL,"grid",app.InputFields.INPUT_GROUP_CONTENT,taxCode)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.AMOUNT_SMALL,app.InputFields.INPUT_GROUP_CONTENT,amount)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.MILESTONE,app.InputFields.INPUT_GROUP_CONTENT,date)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
  }
  
  enterRecord_toCreateRequisitionSubcontractor(container_UUID:string,structure:string,businessPartner:string,contact?:string){
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,structure)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BPD_BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,businessPartner)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    if(contact){
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BPD_CONTACT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,contact)
    _common.select_activeRowInContainer(container_UUID)
    }
    _common.waitForLoaderToDisappear()
  }

  enterRecord_toCreateRequisitionCertificates(container_UUID:string,type:string,guaranteeCost:string,validateTo:string,validateFrom:string){
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BPD_CERTIFICATE_TYPE_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,type)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.GUARANTEE_COST,app.InputFields.INPUT_GROUP_CONTENT,guaranteeCost)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,validateFrom)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.VALID_TO,app.InputFields.INPUT_GROUP_CONTENT,validateTo)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
  }

  enterRecord_toCreateRequisitionGenerals(container_UUID:string,type:string,controllingStructure:string,taxCode:string,value:string){
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_GENERALS_TYPE_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,type)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL,"grid",app.InputFields.INPUT_GROUP_CONTENT,controllingStructure)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,value)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_TAX_CODE_FK_SMALL,"grid",app.InputFields.INPUT_GROUP_CONTENT,taxCode)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
  }
  
  enterRecord_toCreateRequisitionContact(container_UUID:string,role:string,contact:string){
    _common.edit_dropdownCellWithCaret(container_UUID,app.GridCells.BPD_CONTACT_ROLE_FK,"list",role)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BPD_CONTACT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,contact)
    _common.select_activeRowInContainer(container_UUID)
    _common.waitForLoaderToDisappear()
  }
 
  get_titlesOfRequisitionsOverviewCheckedStatus(container_UUID:string,envName:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .getCell(app.GridCells.COUNT)
             .wrapElements()
             .find(commonLocators.CommonElements.ICON_TICK)
             .as("tick")
             .each(($val,index,$list)=>{
              cy.wait(5000)
                cy.get("@tick").eq(index).click()
                _mainView.findModuleClientArea()
                         .findAndShowContainer(container_UUID)
                         .findGrid()
                         .findActiveRow()
                         .getCell(app.GridCells.DESCRIPTION)
                         .wrapElements()
                         .then(($value)=>{
                            if($value.text()!="Requisitions" && $value.text()!="Quotes"){
                              Cypress.env((envName)+index,$value.text())
                            }
                         })
             })
  }

  clickOn_ignoreButton(){
    cy.wait(1000)
    cy.get("body").then(($body) => {
      if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.IGNORE)
      }
    });
  }

  enterRecord_toCreateTaxCodeForProcurementStructure(container_UUID:string,ledgerContext:string,taxCode:string){
    cy.get("body").then(($body) => {
      if ($body.find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.MDC_LEDGER_CONTEXT_FK).length > 0) {
        let status:string="false";
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .getCell(app.GridCells.MDC_LEDGER_CONTEXT_FK)
                 .wrapElements()
                 .each($value=>{
                    if($value.text()===ledgerContext){
                      cy.wrap($value).click()
                      cy.log("Tax Code Already Present.")
                      _mainView.findModuleClientArea()
                               .findAndShowContainer(container_UUID)
                               .findGrid()
                               .findActiveRow()
                               .getCell(app.GridCells.MDC_TAX_CODE_FK_SMALL)
                               .wrapElements()
                               .then($val=>{
                                  Cypress.env("PR_TAX_CODE",$val.text())
                               })
                      status="true"
                      return false;
                    }
                }).then(()=>{
                    if(status!="true"){
                      _common.create_newRecord(container_UUID)
                      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_LEDGER_CONTEXT_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,ledgerContext)
                      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_TAX_CODE_FK_SMALL,"grid",app.InputFields.INPUT_GROUP_CONTENT,taxCode)
                      Cypress.env("PR_TAX_CODE",taxCode)
                      cy.wait(1000)
                      cy.SAVE()
                    }
                })
      }else{
        _common.create_newRecord(container_UUID)
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_LEDGER_CONTEXT_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,ledgerContext)
        _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.MDC_TAX_CODE_FK_SMALL,"grid",app.InputFields.INPUT_GROUP_CONTENT,taxCode)
        cy.wait(1000)
        cy.SAVE()
        cy.wait(1000)
        Cypress.env("PR_TAX_CODE",taxCode)
      }
    });
  }
  
  enterRecord_toCreateSupplier(container_UUID:string,data:DataCells){
    if (data[app.GridCells.SUBSIDIARY_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.SUBSIDIARY_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.SUBSIDIARY_FK])
    }
    if (data[app.GridCells.PAYMENT_TERM_PA_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PAYMENT_TERM_PA_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PAYMENT_TERM_PA_FK])
    }
    if (data[app.GridCells.PAYMENT_TERM_FI_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PAYMENT_TERM_FI_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PAYMENT_TERM_FI_FK])
    }
    if (data[app.GridCells.VAT_GROUP_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.VAT_GROUP_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.VAT_GROUP_FK])
    }
  }

  enterRecord_toCreateBranch(container_UUID:string,data:DataCells){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.IS_MAIN_ADDRESS)
             .wrapElements()
             .find(commonLocators.CommonElements.RADIO_INPUT)
             .click()
    if (data[app.GridCells.DESCRIPTION]){
      _common.enterRecord_inNewRow(container_UUID,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,data[app.GridCells.DESCRIPTION])
    }          
    if (data[app.GridCells.ADDRESS_TYPE_FK]){
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.ADDRESS_TYPE_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.ADDRESS_TYPE_FK])
    }
    if(data[commonLocators.CommonKeys.ADDRESS_INDEX]){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(app.GridCells.ADDRESSD_TO)
      cy.wait(1000)
      _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.ADDRESSD_TO)
              .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,parseInt(data[commonLocators.CommonKeys.ADDRESS_INDEX]))
      cy.wait(1000)
      if (data[commonLocators.CommonLabels.STREET]) {
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.STREET,app.InputFields.DOMAIN_TYPE_COMMENT)
                  .clear()
                  .type(data[commonLocators.CommonLabels.STREET])
      }
      if (data[commonLocators.CommonLabels.ZIP_CODE]) {
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.ZIP_CODE,app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear()
                  .type(data[commonLocators.CommonLabels.ZIP_CODE])
      }
      if (data[commonLocators.CommonLabels.COUNTRY]) {
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.COUNTRY,app.InputFields.INPUT_GROUP_CONTENT)
                  .clear()
                  .type(data[commonLocators.CommonLabels.COUNTRY])
                  .then(()=>{
                    _modalView.select_popupItem("list",data[commonLocators.CommonLabels.COUNTRY])
                  })
      }
      _modalView.findModal().acceptButton(btn.ButtonText.OK)
    }
  }
  
  enterRecord_toCreateNewRequisition(container_UUID:string,data:DataCells){
    if (data[commonLocators.CommonLabels.CONFIGURATION]) {
      _modalView.findModal()
              .findInputFieldInsideModal(commonLocators.CommonLabels.CONFIGURATION,app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(data[commonLocators.CommonLabels.CONFIGURATION])
              .then(()=>{
                _modalView.select_popupItem("grid",data[commonLocators.CommonLabels.CONFIGURATION])
              })
      _modalView.findModal().acceptButton(btn.ButtonText.OK)
    }
    if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
      _common.clickOn_activeRowCell(container_UUID,app.GridCells.STRUCTURE)
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.CONTROLLING_UNIT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.CONTROLLING_UNIT_FK])
    }
    if (data[app.GridCells.STRUCTURE]) {
      _common.clickOn_activeRowCell(container_UUID,app.GridCells.STRUCTURE)
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.STRUCTURE,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.STRUCTURE])
    }
    if (data[app.GridCells.PACKAGE_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PACKAGE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PACKAGE_FK])
    }
    if (data[app.GridCells.TAX_CODE_FK]) {
      _common.clickOn_activeRowCell(container_UUID,app.GridCells.TAX_CODE_FK)
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.TAX_CODE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.TAX_CODE_FK])
    }
    if (data[app.GridCells.BUSINESS_PARTNER_FK]) {
      _common.clickOn_activeRowCell(container_UUID,app.GridCells.BUSINESS_PARTNER_FK)
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BUSINESS_PARTNER_FK])
    }
  }

  enterRecord_toCreateDeliverySchedule(uuid:string,data:DataCells){
    if(data[app.GridCells.DATE_REQUIRED]){
      _common.clickOn_activeRowCell(uuid,app.GridCells.DATE_REQUIRED)
      _common.enterRecord_inNewRow(uuid,app.GridCells.DATE_REQUIRED,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.DATE_REQUIRED])
    }
    if(data[app.GridCells.TIME_REQUIRED]){
      _common.clickOn_activeRowCell(uuid,app.GridCells.TIME_REQUIRED)
      _common.enterRecord_inNewRow(uuid,app.GridCells.TIME_REQUIRED,app.InputFields.DOMAIN_TYPE_TIME,data[app.GridCells.TIME_REQUIRED])
    }
    if(data[app.GridCells.DESCRIPTION]){
      _common.clickOn_activeRowCell(uuid,app.GridCells.DESCRIPTION)
      _common.enterRecord_inNewRow(uuid,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,data[app.GridCells.DESCRIPTION])
    }
    if(data[app.GridCells.QUANTITY_SMALL]){
      _common.clickOn_activeRowCell(uuid,app.GridCells.QUANTITY_SMALL)
      _common.enterRecord_inNewRow(uuid,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL])
    }
    cy.SAVE()
    cy.get("body").then(($body) => {
      if($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0){
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.CANCEL)

      }
      else{
        cy.SAVE()
      }
    })

  }

  getCode_fromPESModal(envName:string) {
    cy.wait(5000)
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " [class*='icon-message'] [class*='message']").then(($value) => {
      var str = $value.text()
      console.log(str)
      var splitted = str.split(" ", 5);
      console.log(splitted[4])
      Cypress.env(envName, splitted[4])
    })
  }
  get_titlesOfRequisitionsOverviewUnCheckedStatus(container_UUID:string,envName:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .getCell(app.GridCells.COUNT)
             .wrapElements()
             .find(commonLocators.CommonElements.NO_TICK)
             .as("tick")
             .each(($val,index,$list)=>{
              cy.wait(5000)
                cy.get("@tick").eq(index).click()
                _mainView.findModuleClientArea()
                         .findAndShowContainer(container_UUID)
                         .findGrid()
                         .findActiveRow()
                         .getCell(app.GridCells.DESCRIPTION)
                         .wrapElements()
                         .then(($value)=>{
                            if($value.text()!="Requisitions" && $value.text()!="Quotes"){
                              Cypress.env((envName)+index,$value.text())
                            }
                         })
             })
  }

  create_changeOrderContractForNewItem_fromWizard(data:DataCells){
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.MATERIAL_CODE_SMALL)
              .each(($el,index)=>{
                cy.wait(1000)

                _modalView.findModal()
                          .findModalBody()
                          .wrapElements()
                          .find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.MATERIAL_CODE_SMALL)
                          .eq(index)
                          .click()
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
    if (data[commonLocators.CommonLabels.CHANGE_TYPE]) {
      _modalView.findModal()
                .findCaretInsideModal(commonLocators.CommonLabels.CHANGE_TYPE)
                .then(()=>{
                  _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CHANGE_TYPE])
                })
    }
    
    if (data[commonLocators.CommonLabels.CHANGE_REASON]) {
      _modalView.findModal()
                .findCaretInsideModal(commonLocators.CommonLabels.CHANGE_REASON)
                .then(()=>{
                  cy.wait(2000)
                  _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CHANGE_REASON])
                })
    }
    
    cy.wait(2000)
      .then(()=>{
        cy.get("[class*='modal-footer']")
          .last()
          .contains(btn.ButtonText.OK)
          .click();
      })
    
    cy.wait(4000)
    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT_CHANGE)
                .closest(commonLocators.CommonElements.ROW)
                .within((ele) => {
                  cy.wrap(ele).find(`[class*='${btn.IconButtons.ICO_INPUT_LOOKUP}']`)
                    .click()
                })
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
    }
    
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
  cy.wait(3000)
    .then(()=>{
      cy.get("body").then(($body) => {
        if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
          _modalView.findModal()
                    .acceptButton(btn.ButtonText.OK);
        }
      });
  })       
    
  }

  
  enterRecord_toCreateNewEvent(container_UID:string,data:DataCells){
    if (data[app.GridCells.PRC_EVENT_TYPE_FK]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.PRC_EVENT_TYPE_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_EVENT_TYPE_FK])
    }
    if (data[app.GridCells.START_NO_OF_DAYS]) {
      _common.enterRecord_inNewRow(container_UID,app.GridCells.START_NO_OF_DAYS,app.InputFields.DOMAIN_TYPE_DIRECTIVE,data[app.GridCells.START_NO_OF_DAYS])
    }
    if (data[app.GridCells.START_BASIS]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.START_BASIS,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.START_BASIS])
    }
    if (data[app.GridCells.END_NO_OF_DAYS]) {
      _common.enterRecord_inNewRow(container_UID,app.GridCells.END_NO_OF_DAYS,app.InputFields.DOMAIN_TYPE_DIRECTIVE,data[app.GridCells.END_NO_OF_DAYS])
    }
    if (data[app.GridCells.END_BASIS]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.END_BASIS,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.END_BASIS])
    }
    if (data[app.GridCells.PRC_SYSTEM_EVENT_TYPE_END_FK]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.PRC_SYSTEM_EVENT_TYPE_END_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_SYSTEM_EVENT_TYPE_END_FK])
    }
    if (data[app.GridCells.PRC_SYSTEM_EVENT_TYPE_START_FK]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.PRC_SYSTEM_EVENT_TYPE_START_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_SYSTEM_EVENT_TYPE_START_FK])
    }
    if (data[app.GridCells.ADD_LEAD_TIME_TO_START]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.ADD_LEAD_TIME_TO_START,"listexact",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.ADD_LEAD_TIME_TO_START])
    }
    if (data[app.GridCells.ADD_LEAD_TIME_TO_END]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.ADD_LEAD_TIME_TO_END,"listexact",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.ADD_LEAD_TIME_TO_END])
    }
    if (data[app.GridCells.PRC_EVENT_TYPE_END_FK]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.PRC_EVENT_TYPE_END_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_EVENT_TYPE_END_FK])
    }
    if (data[app.GridCells.PRC_EVENT_TYPE_START_FK]) {
      _common.edit_dropdownCellWithInput(container_UID,app.GridCells.PRC_EVENT_TYPE_START_FK,"list",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_EVENT_TYPE_START_FK])
    }
  }

  enterRecord_toCreateSubcontractor (container_UUID:string,data:DataCells){
    if (data[app.GridCells.PRC_STRUCTURE_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_STRUCTURE_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.BPD_BUSINESS_PARTNER_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BPD_BUSINESS_PARTNER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BPD_BUSINESS_PARTNER_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
    if (data[app.GridCells.BPD_CONTACT_FK]) {
      _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.BPD_CONTACT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.BPD_CONTACT_FK])
      _common.select_activeRowInContainer(container_UUID)
      _common.waitForLoaderToDisappear()
    }
  }

  enterRecord_toCreateDeliverySchedulefrom_requisition(data:DataCells){
    if (data[commonLocators.CommonLabels.DESCRIPTION_PREFIX]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION_PREFIX,app.InputFields.FORM_CONTROL)
                .clear()
                .type(data[commonLocators.CommonLabels.DESCRIPTION_PREFIX])  
    }
    if (data[commonLocators.CommonLabels.START_DATE]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.START_DATE,app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(data[commonLocators.CommonLabels.START_DATE])
      
    }
    if (data[commonLocators.CommonLabels.END_DATE]) {
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.END_DATE,app.InputFields.INPUT_GROUP_CONTENT)
                .clear()
                .type(data[commonLocators.CommonLabels.END_DATE])
      
    }
      _modalView.findModal()
                .findModalBody()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.REPEAT)
                .closest(commonLocators.CommonElements.ROW)
                .within(()=>{
                  cy.get('select').select(data[commonLocators.CommonLabels.REPEAT]) 
                })
    if (data[commonLocators.CommonLabels.ROUND_UP_QUANTITY]) {
      _modalView.findModal()
                .wrapElements().then(()=>{
              cy.get(`[class*='platform-form-group']`)
                .contains(commonLocators.CommonLabels.ROUND_UP_QUANTITY)
                .find(commonLocators.CommonElements.CHECKBOX_INPUT)
                .as("check")
                .invoke('is', ':checked')
                .then(checked => {
                    if(data[commonLocators.CommonLabels.ROUND_UP_QUANTITY] ==="check"){
                    if (!checked) {
                    cy.get('@check').check();
                    }
                    }if(data[commonLocators.CommonLabels.ROUND_UP_QUANTITY]==="uncheck"){
                    if (checked) {
                    cy.get('@check').uncheck();
                    }
                    } 
                    })
                })
                
                
     }
      _modalView.findModal().acceptButton(btn.ButtonText.OK)    

}

enterRecord_toCreateOtherServices(container_UUID:string,data:DataCells){
  if (data[app.GridCells.PRC_STRUCTURE_FK]) {
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.PRC_STRUCTURE_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.PRC_STRUCTURE_FK])
  }
  if (data[app.GridCells.CONTROLLING_UNIT_FK]) {
    _common.edit_dropdownCellWithInput(container_UUID,app.GridCells.CONTROLLING_UNIT_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.CONTROLLING_UNIT_FK])
  }
  if (data[app.GridCells.AMOUNT_NET]) {
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.AMOUNT_NET,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.AMOUNT_NET])
  }
  if (data[app.GridCells.QUANTITY_SMALL]) {
    _common.enterRecord_inNewRow(container_UUID,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,data[app.GridCells.QUANTITY_SMALL])
  }
}

enterRecord_toCreateCharacteristicsInRequisition(data:DataCells){
    _common.clickOn_modalButtonByClass(btn.ToolBar.ICO_REC_NEW)
    _common.clickOn_cellHasValue_fromModal(app.GridCells.CHARACTERISTIC_FK,"0")
    _modalView.findModal()
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .type(data[app.GridCells.CHARACTERISTIC_FK])  
    _modalView.select_popupItem("grid",data[app.GridCells.CHARACTERISTIC_FK])
    _modalView.findModal()
              .findActiveRow()
              .findCell(app.GridCells.VALUE_TEXT)
              .clickIn()
    _modalView.findModal()
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .type(data[app.GridCells.VALUE_TEXT])
  
}
select_flexValue(containerUUID: string, value: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(containerUUID)
           .wrapElements()
           .within(() => {
            cy.contains(`[class*='tree-label']`,value)
              .then(($cell) => {
                if ($cell) {
                  cy.wrap($cell)
                    .click({multiple:true,force:true});
                  cy.wait(1000);
                }
            });
           });
}

create_changeRequestRequisition_fromWizard(data:DataCells) {
       
  _modalView.findModal()
            .findRadio_byLabel_InModal(data[commonLocators.CommonLabels.CREATE_CHANGE_ORDER_REQUISITION_BASED_ON_BELOW_SELECTED_BASE_REQUISITION], "radio", 0,"radio spaceToUp")

   _modalView.findModal()
             .findButton(btn.IconButtons.ICO_INPUT_ADD)
             .clickIn()
  cy.wait(2000)
/** */ //handling another modal //** */
  var element:string =commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+" "
  var elements:string ="[class*='platform-form-row'] "

  cy.get(element).eq(1).contains(elements,"Project").then((ele) => {
       cy.wrap(ele).find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
       .eq(0)
       .wait(1000)
       .clear()
       .type(data[app.InputFields.INPUT_GROUP_CONTENT])
  })
  _modalView.select_popupItem("grid",data[app.InputFields.INPUT_GROUP_CONTENT])

  cy.get(element).eq(1).contains(elements,"Description").then((ele) => {
       cy.wrap(ele)
         .find("[class*='"+app.InputFields.DOMAIN_TYPE_DESCRIPTION+"']")
         .clear()
         .type(data[app.InputFields.DOMAIN_TYPE_DESCRIPTION])
  })
  _common.waitForLoaderToDisappear()
   _modalView.findModal()
             .findCaretInsideModal("Change Type")
             .wait(500)
   _modalView.select_popupItem("list",data[commonLocators.CommonLabels.CHANGE_TYPE])
   _common.waitForLoaderToDisappear()
   cy.wait(4000)//required time
   
    cy.get("[class*='modal-footer']").eq(1).contains(btn.ButtonText.OK).click();
    cy.wait(4000)//required this time to enable the OK button

    if(data[commonLocators.CommonLabels.COPY_HEADER_TEXT_FROM_PACKAGE]){
   _common.clickOn_checkboxByLabel_fromModal("spaceToUp","Copy header text from Package",0)
    }
    cy.wait(5000)//required this time to enable the OK button
   _modalView.findModal()
             .acceptButton("OK");
    _common.waitForLoaderToDisappear()
    cy.wait(2000)//required wait in order get next modal of navigation
}

}



