/// <reference types="cypress" />
import { _mainView, _modalView, _common, _estimatePage } from "cypress/pages";
import _ from "cypress/types/lodash";
import { app, btn, cnt, commonLocators, sidebar } from "../../../../locators";
import { DataCells } from "cypress/pages/interfaces";
import Sidebar from "cypress/locators/sidebar";

var netAmt: string, finalPrice: string,grossAmtWip:string,grossAmtBill:any
var netAmount: any, billBoqFinalPrice: any, installedQty: any
export class SalesPage {
  enterRecord_toCreateSalesBID(data: DataCells) {
    cy.wait(1000)
    if (data[commonLocators.CommonLabels.PROJECT_NAME]) {
      cy.wait(1000)
      _modalView.findModalBody()
                .findInputFieldInsideModal(commonLocators.CommonLabels.PROJECT_NAME, app.InputFields.INPUT_GROUP_CONTENT)
                .clear({ force: true })
                .type(data[commonLocators.CommonLabels.PROJECT_NAME], { force: true })
      _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.PROJECT_NAME])
    }  
    if(data[app.InputFields.DOMAIN_TYPE_DESCRIPTION]){
      cy.wait(1000)
      _modalView.findModal()
                .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear({ force: true })
                .type(data[app.InputFields.DOMAIN_TYPE_DESCRIPTION], { force: true });
    }
    if(data[app.InputFields.INPUT_GROUP_CONTENT]){
      _modalView.findModal()
                .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
                .clear({ force: true })
                .type(data[app.InputFields.INPUT_GROUP_CONTENT]);
      _modalView.findModal().select_popupItem("grid", data[app.InputFields.INPUT_GROUP_CONTENT]);            
    } 

    if(data[app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]) {
      cy.get(commonLocators.CommonElements.BID_BOQ_TAB).click()
      cy.get(commonLocators.CommonElements.CARET_MODAL).click()
      _mainView.select_popupItem("grid1", "Project BoQ")
      cy.wait(500)
      cy.get('[class*="subview-container"] [class*="column-id_boqrootitem.briefinfo"]').contains('[class*="column-id_boqrootitem.briefinfo"]',data[app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]).click({force:true})
      cy.wait(1000) // required wait
      cy.get("div.active  div.column-id_marker.selected input").check()
    } 
    _common.waitForLoaderToDisappear()  
    _modalView.findModal().acceptButton("OK");
  }

  deleteRecord_salesBID() {
    _modalView.findModal().acceptButton("Yes");
  }

  enterRecord_toCreateContract(description: string,Business_Partner:string,Project_Name: string) {
    // _modalView.findModal().findInputFieldInsideModal("Bid", app.InputFields.INPUT_GROUP_CONTENT).clear().type(Bid);
    // _modalView.select_popupItem("grid", Bid);
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear({ force: true })
              .type(description, { force: true });
              cy.wait(1000)
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner",app.InputFields.INPUT_GROUP_CONTENT)
              .type(Business_Partner,{force:true}).then(()=>{
                cy.wait(5000)
                _modalView.select_popupItem("grid",Business_Partner)
              })          
    // _modalView.findModal()
    //           .findInputFieldInsideModal("Project Name", app.InputFields.INPUT_GROUP_CONTENT)
    //           .clear()
    //           .type(Project_Name).then(()=>{
    //             _mainView.select_popupItem("grid", Project_Name);
    //           })  
    _modalView.findModal().acceptButton("OK");
    cy.SAVE();
  }

  

  verifyValue_of_finalprice_quantity_contractsales(BoQSource: string, BoQ: string) {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar("wizard", "Copy BoQs");
    _modalView.findModal().caret();
    cy.get(".popup-container").contains("button", BoQSource).click();
    cy.get("[class='modal-dialog'] ").contains("div", BoQ).click();
    _modalView.findStucture().clickIn();
    _modalView.findModal().findStuctureActive().clickIn();
    _modalView.findModal().acceptButton("OK");
  }

  assign_And_veify_Quantity_BoQStructure_inBills(Quantity: string) {
    cy.get("#tab_1382", { timeout: 30000 }).should('be.visible')
     _common.openTab(app.TabBar.APPLICATIONS)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
              .findGrid()
              .findCell_ByIcon(app.GridCellIcons.ICO_FOLDER_DOC,0).clickIn()
       _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
              .findGrid().findActiveRow()
              .findCell(app.GridCells.QUANTITY_SMALL)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .type(Quantity);
     cy.SAVE()
     _common.waitForLoaderToDisappear()
     cy.wait(1000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.PREV_QUANTITY_SMALL).wrapElements().then($value => {
              const textValue = $value.text()
              cy.log("Previous Quantity is := ", textValue)

              })
  }

  enterRecord_toCreate_BID_from_Estimate(description: string, businesspartner: string, Structure_Type: string) {
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear({ force: true })
              .type(description, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(businesspartner);
    _modalView.findModal()
              .select_popupItem("grid", businesspartner);
    cy.wait(3000)
    _modalView.findModal()
              .acceptButton("Next");
        _modalView.findModal().findCaretByLabel("Structure Type").then(()=>{
          _modalView.select_popupItem("list", Structure_Type);
        })
    // _modalView.findModal().checkBox_hasLabel("Use UR Breakdown").check();
    // _modalView.findModal().checkBox_hasLabel("Update Hours").check();
    _modalView.findModal()
              .acceptButton("Execute");

  }

  changeStatus_BidRecord() {
    _common.openTab(app.TabBar.BID);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar("wizard", "Change Bid Status")
    _common.changeStatus_fromModal("Submitted")
    cy.wait(2000)
  }

  navigate_toContainer_usingGoToButtonInBills(container_UUID: string, option: string) {
    _common.clickOn_toolbarButton(container_UUID,btn.IconButtons.ICO_GO_TO)
    _mainView.findModuleClientArea()
             .select_popupItem("grid1", option)
  }

  select_codeFieldofRow(container_UUID: string) {
    let contractCode;
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .getCell(app.GridCells.CODE)
             .wrapElements()
             .first().invoke("text")
             .then((code) => {
              contractCode = code.trim();
              })
             .then(() => {
              _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid().findCellhasValue(app.GridCells.CODE, contractCode).click();
             });
  }

  get_finalPrice_boqStrctureinWip() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .getCell(app.GridCells.FINAL_PRICE_SMALL)
             .wrapElements().eq(4).invoke("text").then((fPrice) => {
              finalPrice = fPrice
              console.log(finalPrice);
             })
  }

  verify_finalPrice_ofWipBoqStructureAndnetAmtOfWip() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.WIP)
             .findGrid().findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements().invoke("text").then((nAmt) => {
              netAmt = nAmt
              console.log(netAmt);
              expect(finalPrice).to.equal(netAmt);
             })
  }

  get_grossAmt_FromBillingDetails() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_DETAILS)
             .wrapElements().contains('label', 'Gross').next().find("input")
             .invoke('val').then((AmtBill) => {
              grossAmtBill = AmtBill
              console.log(grossAmtBill);
             })
  }

  verify_grossbillAmtWithWipGrossAmt() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.WIP)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_GROSS)
             .wrapElements().invoke("text").then((amt) => {
              grossAmtWip = amt
              console.log(grossAmtWip);
              expect(grossAmtWip).to.equal(grossAmtBill);
             })
  }
  /* Entering record to create QTO header */
  enter_dataToCreate_QTOHeader(item: string, qtoDesc: string, contract: string, boqRefNo: string, project?:string) {

    _modalView.findModal()
              .findCaretInsideModal("QTO Purpose")
    _modalView.findModal()
              .select_popupItem("list", item)
    if (project) {
      _modalView.findModal()
        .findInputFieldInsideModal("Project", app.InputFields.INPUT_GROUP_CONTENT)
        .clear().type(project)
      _modalView.findModal()
        .select_popupItem("grid", project)
    }
    _modalView.findModal()
			  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
			  .clear().type(qtoDesc)
    _modalView.findModal()
			  .findInputFieldInsideModal("Contract", app.InputFields.INPUT_GROUP_CONTENT)
			  .clear().type(contract)
    _modalView.findModal()
              .select_popupItem("grid", contract)
    _modalView.findModal()
              .findInputFieldInsideModal("BoQ Reference No.", app.InputFields.INPUT_GROUP_CONTENT)
              .clear().type(boqRefNo)
    _modalView.findModal()
              .select_popupItem("grid", boqRefNo)
    _modalView.findModal().acceptButton("OK")
  }

  /* entering value1 to create Quantity takeoff detail record */
  enter_recordToCreate_quantityTakeOffDetail(boqHeaderDesc: string, boqStructureDesc: string, qtyValue: any) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
             .findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, boqHeaderDesc)
             .click()
    _common.clickOn_toolbarButton(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
             .findGrid().findCellhasValue(app.GridCells.BRIEF_INFO_SMALL, boqStructureDesc)
             .click()
    _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
             .findGrid().findActiveRow()
             .findCell(app.GridCells.VALUE_1_DETAIL)
             .findTextInput(app.InputFields.DOMAIN_TYPE_REMARK).type(qtyValue)
    
  }

  /* Verify net amount field in billing details using unitRate and value given in quantity takeOff */
  verify_netAmount_ofBillingDetails(unitRate: any, quantity: any) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_DETAILS)
             .wrapElements().contains('label', 'Net Amount').next().find("input")
             .invoke('val').then((ntAmt) => {
              netAmount = ntAmt
              console.log(netAmount);
              var tempnetAmt = unitRate * quantity;
              var billNetAmt1 = Number(tempnetAmt).toLocaleString('en-US', { minimumFractionDigits: 2 });
              var billNetAmt = billNetAmt1.replace(/^(\d+)(\.\d+)?$/g, (match, p1, p2) => p1.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (p2 || ".00"));
              expect(billNetAmt).to.equal(netAmount);
             })
  }

  /* fetched the IQ qty value from the bill of qty in QTO detail tab */
  get_IQquantity_of_BillBoQ() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
             .findGrid()
             .getCell(app.GridCells.INSTALLED_QUANTITY)
             .wrapElements().eq(4).invoke('text')
             .then(iQ => {
              installedQty = parseInt(iQ);
              console.log(`${installedQty}`);
              Cypress.env('quantity', installedQty);
            });
  }

  /* Verifying Updated QTO from bill net amount */
  verify_updated_QtoBill_NetAmount(unitRate: number) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BILL_DETAILS)
             .wrapElements().contains('label', 'Net Amount').next().find("input")
             .invoke('val').then((ntAmt) => {
              let netAmount = ntAmt
              console.log(netAmount);
              installedQty = Cypress.env('quantity');
              let result = installedQty * unitRate;
              let ntamt = Number(result)
              let calNetAmount=ntamt.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              });
              console.log(`Result: ${calNetAmount}`);
              expect(calNetAmount).to.equal(netAmount);
            })
            }

            enterRecord_toUpdate_BID_from_Estimate() 
            { 
                        _modalView.findModal()
                                  .wrapElements()
                                cy.get("label")
                                  .contains("Update Bid")
                                  .invoke("attr", "for")
                                  .then((radio1) => {
                                cy.get(`#${radio1}`).check();
                                  }); 
                    
                        _modalView.findModal()
                                  .acceptButton("Next");
      
                         _modalView.findModal()
                                   .acceptButton("Execute");
          }
   
          enterRecord_toCreateFormula(data: DataCells) {
            if(data[app.GridCells.CODE]){
              _common.enterRecord_inNewRow(cnt.uuid.FORMULA,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,data[app.GridCells.CODE])
                          }
            if(data[app.GridCells.DESCRIPTION_INFO]){
              _common.enterRecord_inNewRow(cnt.uuid.FORMULA,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,data[app.GridCells.DESCRIPTION_INFO])
            }
            if(data[app.GridCells.QTO_FORMULA_TYPE_FK]){
              _common.edit_dropdownCellWithCaret(cnt.uuid.FORMULA,app.GridCells.QTO_FORMULA_TYPE_FK,"list",data[app.GridCells.QTO_FORMULA_TYPE_FK])           
            }
            if(data[app.GridCells.ICON]){
              _mainView.findModuleClientArea()
                       .findAndShowContainer(cnt.uuid.FORMULA)
                       .findGrid()
                       .findActiveRow()
                       .findCell(app.GridCells.ICON)
                       .caret()
                      cy.wait(1000);
		          cy.get(commonLocators.CommonElements.POPUP_CONTAINER)
                .within(() => {
                  cy.get(data[app.GridCells.ICON])
                    .eq(1)
                    .click({ force: true });
             })
            }
            if(data[app.GridCells.VALUE_1_IS_ACTIVE]){
              _common.set_cellCheckboxValue(cnt.uuid.FORMULA,app.GridCells.VALUE_1_IS_ACTIVE,data[app.GridCells.VALUE_1_IS_ACTIVE])
            } 
            if(data[app.GridCells.OPERATOR_1]){
              _common.enterRecord_inNewRow(cnt.uuid.FORMULA,app.GridCells.OPERATOR_1,app.InputFields.DOMAIN_TYPE_REMARK,data[app.GridCells.OPERATOR_1])
            }  
            if(data[app.GridCells.VALUE_2_IS_ACTIVE]){
              _common.set_cellCheckboxValue(cnt.uuid.FORMULA,app.GridCells.VALUE_2_IS_ACTIVE,data[app.GridCells.VALUE_2_IS_ACTIVE])
            }  
            if(data[app.GridCells.OPERATOR_2]){
              _common.enterRecord_inNewRow(cnt.uuid.FORMULA,app.GridCells.OPERATOR_2,app.InputFields.DOMAIN_TYPE_REMARK,data[app.GridCells.OPERATOR_2])
            }     

            if(data[app.GridCells.BAS_FORM_FK]){
              _common.edit_dropdownCellWithInput(cnt.uuid.FORMULA, app.GridCells.BAS_FORM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, data[app.GridCells.BAS_FORM_FK])
            }    
          
          }          
}
