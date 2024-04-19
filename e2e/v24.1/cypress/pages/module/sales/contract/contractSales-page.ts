/// <reference types="cypress" />
import { _mainView, _modalView, _common, _boqPage } from "cypress/pages";
import { app, btn, cnt, commonLocators,sidebar } from "../../../../locators";
import { WIC_CATALOGUES_HEADER, BOQ_ROOT_ITEM, PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
import { DataCells } from "cypress/pages/interfaces";
import common from "mocha/lib/interfaces/common";
import Buttons from "cypress/locators/buttons";

let occurence: number
let totalNet: number
let actualNetValue: any

export class ContractPage {
  changeRecordStatus(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }

  createContractRecord_byWizardOption(description: string, customer?: string) {
    _common.waitForLoaderToDisappear()
    cy.wait(5000)
    _modalView.findModal()
              .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear({ force: true })
              .type(description, { force: true });
    _modalView.findModal().acceptButton("OK");
    cy.wait(4000)
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_CONTRACT);
    cy.wait(3000)
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS);
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.DESCRIPTION_INFO, description);
    if(customer){
      _mainView.findModuleClientArea()
      .findAndShowContainer(cnt.uuid.CONTRACTS)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CUSTOMER_FK)
      .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
      .clear({ force: true })
      .type(customer, { force: true })
_mainView.select_popupItem("grid", customer);
cy.SAVE()
    }

    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.CONTRACTS)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.CODE)
             .wrapElements().then(($ele) => {
              Cypress.env("actContractCode", $ele.text());
             })
  }

  verifyContractQuantity_inBoQStructure(contractQuantity: string, BidNetAmount_Value) {
    cy.wait(6000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE1)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE1)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements().then(($ele) => {
              const bidquantityvalue = $ele.text()
              expect(bidquantityvalue).to.equals(contractQuantity)
             });
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE1)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.FINAL_PRICE_SMALL)
             .wrapElements().then(($ele) => {
              const finalPrice = $ele.text()
              expect(BidNetAmount_Value).to.equals(finalPrice)
             });
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURE1)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.FINAL_PRICE_SMALL)
             .wrapElements().then(($ele) => {
              Cypress.env("actContractFinalPrice", $ele.text());
             });
  } 

  changeStatus_ContractRecord() {
    _common.openTab(app.TabBar.CONTRACTS);
    cy.wait(2000)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar("wizard", "Change Contract Status");
    _common.changeStatus_fromModal("Contracted");
  }

  selectContract() {    
    cy.REFRESH_CONTAINER().then(() => {      
      _common.search_inSubContainer(cnt.uuid.CONTRACTS, Cypress.env("actContractCode"));
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.CONTRACTS)
               .findGrid()
               .findActiveRow()
               .findCell(app.GridCells.DESCRIPTION_INFO);
    })
  }

  createContractRecord_byWizardOptions(createContractCase: string, description: string, customer?: string, main_contract?: string,changeOrder?:string) {
    switch (createContractCase) {
      case "Main Order":
        cy.wait(500)//required wait
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });
        _modalView.findModal()
                  .acceptButton("OK");
        _modalView.findModal()
                  .acceptButton("Go To Contract")
        cy.wait(6000)
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS);
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.DESCRIPTION_INFO, description);
        _common.clickOn_activeRowCell(cnt.uuid.CONTRACTS,app.GridCells.CUSTOMER_FK)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.CONTRACTS)
                 .findGrid()
                 .findActiveRow()
                 .findCell(app.GridCells.CUSTOMER_FK)
                 .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                 .clear()
                 .type(customer)
                 .wait(1000)
        _mainView.select_popupItem("grid", customer);
        cy.SAVE()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.CONTRACTS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.CODE)
                 .wrapElements().then(($ele) => {
                    Cypress.env("actContractCode", $ele.text());
                });
      break;

      case "Change Order":
//         _modalView.findModal()
//         .findCaretInsideModal("Type");
// _modalView.select_popupItem("list", "Change Contract")
        cy.wait(500)//required wait
        _modalView.findModal()
                  .findInputFieldInsideModal("Description", app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(description, { force: true });

        _modalView.findModal()
                  .findInputFieldInsideModal("Main Contract", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(main_contract, { force: true });
        _mainView.select_popupItem("grid", main_contract);
        if (changeOrder) {
          _modalView.findModal()
                    .findInputFieldInsideModal("Change Order", app.InputFields.INPUT_GROUP_CONTENT)
                    .clear({ force: true })
                    .type(changeOrder, { force: true });
        _mainView.select_popupItem("grid", changeOrder);
        }
        _modalView.findModal()
                  .acceptButton("OK");
        cy.wait(3000)
        cy.get('body').then(($body) => {
          if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 1) {
            cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`)
              .eq(1)
              .contains('button', btn.ButtonText.YES)
              .click({force:true})
          }
        });
        _modalView.findModal()
                  .acceptButton("Go To Contract")
        cy.wait(6000)
        _common.clear_subContainerFilter(cnt.uuid.CONTRACTS);
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS, app.GridCells.DESCRIPTION_INFO, description);
        cy.SAVE()
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.CONTRACTS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.CODE)
                 .wrapElements().then(($ele) => {
                    Cypress.env("chngContractCode", $ele.text());
                });
      break;
  
    case "Side Contract":
       _modalView.findModal()
                  .findCaretInsideModal("Type");
        _modalView.select_popupItem("list", "Side Contract")
      cy.wait(2000)//required wait
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                .clear({ force: true })
                .type(description, { force: true });
      _modalView.findModal()
                .findInputFieldInsideModal(commonLocators.CommonLabels.MAIN_CONTRACT, app.InputFields.INPUT_GROUP_CONTENT)
                .clear({ force: true })
                .type(main_contract, { force: true });
      _modalView.select_popupItem("grid", commonLocators.CommonLabels.MAIN_CONTRACT)
              cy.wait(1000)
      _modalView.findModal()
                .acceptButton("OK");
              cy.wait(3000)
                _modalView.findModal()
                .acceptButton("Go To Contract")
              cy.wait(6000)
    }
    }

  generate_Payment_Schedule_In_Contract(genarateSchedule: string, startdate: string, enddate: string, radioButton: string, updateschedule: string) {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
           .search_fromSidebar("wizard", genarateSchedule);
    _modalView.findModal()
              .findCheckBox_byLabel(radioButton, "radio").click()
    _modalView.findModal()
              .findInputFieldInsideModal("Start Date:", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(startdate, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal("End Date:", app.InputFields.INPUT_GROUP_CONTENT)
              .clear({ force: true })
              .type(enddate, { force: true });
    _modalView.findModal()
              .findInputFieldInsideModal("Start Date:", app.InputFields.INPUT_GROUP_CONTENT)
              .click()
    _modalView.findModal()
              .findInputFieldInsideModal("Total OC (Net):", (app.InputFields.INPUT_GROUP_CONTENT))
              .invoke('val')
              .then(function (codeVal: string) {
                const totalOCNet = codeVal.replace(',', '');
                cy.log(totalOCNet)
                  .then(() => {
                    totalNet = parseFloat(totalOCNet)
                    cy.log("TotalNet " + totalNet);
                    cy.wait(3000)
                    _modalView.findModal()
                              .findInputFieldInsideModal("Occurence:", (app.InputFields.INPUT_GROUP_CONTENT))
                              .invoke('val')
                              .then(function (codeVal: string) {
                                const occurenceValue = codeVal;
                                cy.log(occurenceValue)
                                  .then(() => {
                                    occurence = parseInt(occurenceValue)
                                    cy.log("Occurance " + occurence)

                                    const actualNetAmount: number = totalNet / occurence
                                    const actualValue = actualNetAmount.toFixed(2);
                                    actualNetValue = actualValue.toString()
                                    cy.log("actualDivideValue" + actualNetValue)
                                    cy.wait(2000)
                                    _modalView.findModal()
                                              .findInputFieldInsideModal("Start Date:", app.InputFields.INPUT_GROUP_CONTENT)
                                              .click()
                                    _modalView.findModal().acceptButton('OK');
                                    cy.wait(2000)
                                    _modalView.findModal().acceptButton('OK');
                                    _common.openTab(app.TabBar.CONTRACTS).then(() => {
                                      cy.wait(2000)
                                      _common.select_tabFromFooter(cnt.uuid.PAYMENT_SCHEDULE_V1,app.FooterTab.PAYMENT_SCHEDULE,1)
                                    });
                                    _common.select_allContainerData(cnt.uuid.PAYMENT_SCHEDULE_V1)
                                    cy.contains(".cid_a958c52e47c349eca3e930ec279545ce  #paymentschedule-total-setting-box [class*='btn-default']", "Update payment schedule target").click({ force: true });
                                    // cy.contains(".cid_0613476f0a9a4a87ba62f830fff99c7d #paymentschedule-total-setting-box [class*='btn-default']", "Update payment schedule target").click({ force: true });
                                    // _mainView.findModuleClientArea()   Contract Sales: 062023 - Project / VER-V-00016
                                    //   .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
                                    //   .findCellhasValue(app.gridCells.SCHEDULEBUTTON, updateschedule)
                                    //   .click()
                                    _modalView.findModal().acceptButton('OK');

                                  })
                              })
                    })
                })
  }
  generate_Bill_From_Payment_Schedule(code: string, genarateBill: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
             .findGrid()
             .findCellhasValue(app.GridCells.CODE, code)
             .click()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar("wizard", genarateBill);
    _modalView.findModal().acceptButton('OK')
    _modalView.findModal().acceptButton('Yes')
  }

  

  verifyCorrectedURGross_InProjectBoQ(container_UUID: string, gridcell: string, corrected_URGross: string) {
    cy.wait(2000)
    cy.REFRESH_CONTAINER();
    cy.wait(2000)
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click()
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(gridcell, "0")
             .wrapElements().then(($ele) => {
              var correctedUR = $ele.text()
              var expectedCorrectedUR = correctedUR.split('.');
              var CorrectedURValue
              CorrectedURValue = expectedCorrectedUR[0];
              cy.log(CorrectedURValue)
              expect(CorrectedURValue).to.equals(corrected_URGross);
             })
  }

  
   /*
   * This is used to create contract from wizard option
   * Updated Date: 18/12/2024
   * Author : Harshal Sakure
   */
  create_contract_fromWizard(DESC: string) {
    cy.wait(1000)//This wait is required
    _modalView.findModal()
              .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear({force:true})
              .type(DESC,{force:true})
              .then(()=>{
                cy.wait(500)
                _modalView.acceptButton(Buttons.ButtonText.OK)
              }).then(()=>{
                cy.wait(1000)
                _modalView.acceptButton(Buttons.ButtonText.GO_TO_CONTRACT)
                _common.waitForLoaderToDisappear()
              })
             
  }

  /*
   * This is used to update estimate budget update revenue
   * Updated Date: 3/1/2024
   * Author : Anurag Singh
  */
  update_estimateBudget_fromWizard(data:DataCells) {
    if (data[commonLocators.CommonLabels.SELECT_CONTRACT_HEADER_SCOPE]) {
      _modalView.findModal()
                .findRadio_byLabel(data[commonLocators.CommonLabels.SELECT_CONTRACT_HEADER_SCOPE], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.RADIO_INDEX])
                .click();
    }
    if (data[commonLocators.CommonLabels.DISTRIBUTE_BASED_ON]) {
      _modalView.findModal()
                .findRadio_byLabel(data[commonLocators.CommonLabels.DISTRIBUTE_BASED_ON], commonLocators.CommonKeys.RADIO, data[commonLocators.CommonKeys.INDEX])
                .click();
    }
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);;
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// This wait is required
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);;
  }

  create_ContractFromWizardinQuote(labelName: string, index: number) {
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " ")
      .contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " ", labelName)
      .then((ele) => {
        cy.wrap(ele).find(commonLocators.CommonElements.RADIO_INPUT)
          .eq(index)
          .click()
      })
    cy.wait(500)
    _modalView.findModal().acceptButton("OK");
  }

  contractTermination_FromWizard(transferUnFinishedpart: string, transferUnFinishedpartindex: number, project: string, description: string, changeType: string, changeReason: string, businessPartnerName?: string) {
    _modalView.findModal()
              .findModalBody()
              .selectAllContainerData()
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.RADIO_CLASS)
      .contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.RADIO_CLASS, transferUnFinishedpart)
      .then((ele) => {
        cy.wrap(ele).find(commonLocators.CommonElements.RADIO_INPUT).eq(transferUnFinishedpartindex).click()
      })
    if (businessPartnerName != null) {
      if (transferUnFinishedpart == "New Contract") {
        _modalView.findModal().findTextInput(app.InputFields.INPUT_GROUP_CONTENT).eq(0).type(businessPartnerName)
        _modalView.select_popupItem("grid", businessPartnerName)
      }
    }
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " " + commonLocators.CommonElements.ROW + " " + commonLocators.CommonElements.GROUP_BTN + " ." + btn.IconButtons.ICO_INPUT_ADD).last().click()
    cy.wait(2000)
    var element: string = commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " "
    var elements: string = "[class*='platform-form-row'] "
    cy.get(element).eq(1).contains(elements, "Project").then((ele) => {
      cy.wrap(ele).find("[class*='" + app.InputFields.INPUT_GROUP_CONTENT + "']").eq(0).wait(1000).clear().type(project)
    })
    _modalView.select_popupItem("grid", project)

    cy.get(element).eq(1).contains(elements, "Description").then((ele) => {
      cy.wrap(ele).find("[class*='" + app.InputFields.DOMAIN_TYPE_DESCRIPTION + "']").clear().type(description)
    })
    _modalView.findModal().findCaretInsideModal("Change Type")
    _modalView.select_popupItem("list", changeType)
    _modalView.findModal().findCaretInsideModal("Change Request")
    _modalView.select_popupItem("list", changeReason)
    cy.get("[class*='modal-footer']").eq(1).contains(btn.ButtonText.OK).click();
    cy.wait(500)
    _modalView.acceptButton(btn.ButtonText.OK)
  }

  enterRecord_createNewContract(businessPartner,controllingUnit?) {
     _modalView.findModal()
               .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
               .clear()
               .type(businessPartner, { force: true });
    _modalView.select_popupItem("grid", businessPartner);
    _modalView.findModal()
              .acceptButton("OK");
    cy.wait(2000)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    if(controllingUnit){
     _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT,app.GridCells.CONTROLLING_UNIT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,controllingUnit)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    }
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    cy.REFRESH_SELECTED_ENTITIES()
    _common.waitForLoaderToDisappear()
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.CODE)
              .wrapElements()
              .eq(0)
              .invoke("text")
              .then((ContractCode) => {
                Cypress.env("ContractCode",ContractCode)
                console.log(ContractCode);
              });
      _common.waitForLoaderToDisappear()
     _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

  }

  enterRecord_createNewContract_fromRequisition(businessPartner) {
    _modalView.findModal()
              .findInputFieldInsideModal("Business Partner", app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(businessPartner, { force: true });
   _modalView.select_popupItem("grid", businessPartner);
   _modalView.findModal()
             .acceptButton("Next");
    cy.wait(2000)
  }

  enterRecord_createNewContractRecord(businessPartner, data?:DataCells) {
    cy.get(commonLocators.CommonElements.BID_BASIC_TAB).click().then(() => {
     if (data[commonLocators.CommonLabels.PROJECT_NAME]) {
       _modalView.findModalBody()
                 .findInputFieldInsideModal(commonLocators.CommonLabels.PROJECT_NAME, app.InputFields.INPUT_GROUP_CONTENT)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonLabels.PROJECT_NAME], { force: true })
       _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.PROJECT_NAME])
     }
     if (data[commonLocators.CommonLabels.CONTRACT_TYPE]) {
       _modalView.findModalBody()
                 .findCaretByLabel("Type")
       _modalView.select_popupItem("list", data[commonLocators.CommonLabels.CONTRACT_TYPE])
     }
     if (data[commonLocators.CommonLabels.CONFIGURATION]) {
       _modalView.findModalBody()
                 .findInputFieldInsideModal(commonLocators.CommonLabels.CONFIGURATION, app.InputFields.INPUT_GROUP_CONTENT)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonLabels.CONFIGURATION], { force: true })
       _modalView.select_popupItem("list", data[commonLocators.CommonLabels.CONFIGURATION])
     }
     if (data[commonLocators.CommonLabels.BID]) {
       _modalView.findModalBody()
                 .findInputFieldInsideModal(commonLocators.CommonLabels.BID, app.InputFields.INPUT_GROUP_CONTENT)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonLabels.BID], { force: true })
       _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.BID])
     }
     if (data[commonLocators.CommonLabels.DESCRIPTION]) {
       _modalView.findModalBody()
                 .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true })
     }
     if (businessPartner) {
       _modalView.findModalBody()
                 .findInputFieldInsideModal(commonLocators.CommonLabels.BUSINESS_PARTNER, app.InputFields.INPUT_GROUP_CONTENT)
                 .clear({ force: true })
                 .type(businessPartner, { force: true })
       _modalView.select_popupItem("grid", businessPartner)
     }
     if (data[commonLocators.CommonLabels.CLERK]) {
       _modalView.findModalBody()
                 .findInputFieldInsideModal(commonLocators.CommonLabels.CLERK, app.InputFields.INPUT_GROUP_CONTENT)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonLabels.CLERK], { force: true })
       _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.CLERK])
     }
     if (data[commonLocators.CommonLabels.CHANGE_ORDER_CODE] && data[commonLocators.CommonLabels.CHANGE_ORDER_DESCRIPTION] && data[commonLocators.CommonLabels.CHANGE_TYPE] && data[commonLocators.CommonLabels.CHANGE_REASON] && data[commonLocators.CommonLabels.PROJECT_NAME]) {
       cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`)
         .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`, "Change Order")
         .closest(`${commonLocators.CommonElements.ROW}`)
         .within(() => {
           cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`).within(() => {
             cy.get(`[class*='${btn.IconButtons.ICO_INPUT_ADD}']`).click({ force: true })
           })
         })
       var element: string = commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " "
       var elements: string = "[class*='platform-form-row'] "
       cy.wait(1000)
       cy.get(element).eq(1).contains(elements, "Project").then((ele) => { 
         cy.wrap(ele).find("[class*='" + app.InputFields.INPUT_GROUP_CONTENT + "']").eq(0).wait(1000).clear().type(data[commonLocators.CommonLabels.PROJECT_NAME])
       })
       _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.PROJECT_NAME])
       _modalView.findModal().findCaretInsideModal(commonLocators.CommonLabels.CHANGE_TYPE)
       _modalView.select_popupItem("list", data[commonLocators.CommonLabels.CHANGE_TYPE])
       cy.get(element).eq(1).contains(elements, commonLocators.CommonKeys.CODE).then((ele) => {
         cy.wrap(ele).find("[class*='" + app.InputFields.DOMAIN_TYPE_CODE + "']")
           .invoke("val")
           .then(function (codeVal: string) {
             if (codeVal != "") {
               cy.wrap(ele).find("[class*='" + app.InputFields.DOMAIN_TYPE_CODE + "']").clear({force:true}).type(data[commonLocators.CommonLabels.CHANGE_ORDER_CODE], {force:true})
             }
           })
       })
       cy.get(element).eq(1).contains(elements, commonLocators.CommonLabels.DESCRIPTION).then((ele) => {
         cy.wrap(ele).find("[class*='" + app.InputFields.DOMAIN_TYPE_DESCRIPTION + "']").clear().type(data[commonLocators.CommonLabels.CHANGE_ORDER_DESCRIPTION])
       })
       _modalView.findModal().findCaretInsideModal(commonLocators.CommonLabels.CHANGE_REASON)
       _modalView.select_popupItem("list", data[commonLocators.CommonLabels.CHANGE_REASON])
       cy.get("[class*='modal-footer']").eq(1).contains(btn.ButtonText.OK).click();
       cy.wait(500)
     }
      if (businessPartner && data[commonLocators.CommonLabels.CHANGE_ORDER]) {
        cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS}`)
          .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`, commonLocators.CommonLabels.CHANGE_ORDER)
          .closest(`${commonLocators.CommonElements.ROW}`)
          .within(() => {
            cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`).within(() => {
              cy.get(`[class*='${btn.IconButtons.ICO_INPUT_LOOKUP}']`).click({ force: true })
            })
          })
          var element: string = commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + " " + commonLocators.CommonModalElements.MODAL_CONTENT_CLASS + " "
          cy.wait(1000)
          cy.get(element).eq(1).within((ele) => {
            cy.wrap(ele).find(`${commonLocators.CommonModalElements.MODAL_FOOTER}`).contains('button', btn.ButtonText.REFRESH).click({force:true})
        _common.waitForLoaderToDisappear()
            cy.wrap(ele).find(`[class*='${app.InputFields.INPUT_GROUP_FORM_CONTROL}']` +` `+ `[type='text']` ).clear({force:true}).type(data[commonLocators.CommonLabels.CHANGE_ORDER], {force:true})
            cy.wrap(ele).find(`[class*='${app.InputFields.INPUT_GROUP_FORM_CONTROL}']` +` `+ `[class*='${btn.IconButtons.ICO_SEARCH}']` ).click()
        _common.waitForLoaderToDisappear()
            cy.wrap(ele).find(`[class*='column-id_${app.GridCells.DESCRIPTION_CAPS}']`).contains(data[commonLocators.CommonLabels.CHANGE_ORDER]).click({force:true})
        _common.waitForLoaderToDisappear()
            cy.wrap(ele).find(`${commonLocators.CommonModalElements.MODAL_FOOTER}`).contains('button', btn.ButtonText.OK).click({force:true})
        _common.waitForLoaderToDisappear()
          })
      }
   })
   cy.get(commonLocators.CommonElements.BID_BOQ_TAB).click().then(() => {
     if (commonLocators.CommonLabels.BOQ_SOURCE && commonLocators.CommonLabels.BOQS) {
       _modalView.findModal().findCaretInsideModal(commonLocators.CommonLabels.BOQ_SOURCE)
       _modalView.select_popupItem("grid1", data[commonLocators.CommonLabels.BOQ_SOURCE])
       _common.waitForLoaderToDisappear()
       cy.get(`${commonLocators.CommonElements.SUB_VIEW_CONTAINER}` + " " + `[class*='${app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO}']`)
         .contains(`[class*='${app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO}']`, data[commonLocators.CommonLabels.BOQS])
         .click({ force: true })
       _modalView.findActiveRow()
                 .checkbox_inCell(app.GridCells.MARKER)
                 .check()
     }
   })
   _common.waitForLoaderToDisappear()
   _common.clickOn_modalFooterButton(btn.ButtonText.OK)
   }
 
  enterRecord_toCreateNewOrderItem(materialNo: string, quantity: string) {
    _common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,materialNo)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(2000)
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,quantity)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    cy.wait(2000)
    _common.waitForLoaderToDisappear()
  }

  verify_VAT_when_change_in_Taxcode(taxcode: string) {
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.CONTRACT_TOTALS)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.GROSS)
              .wrapElements()
              .then(($VATele) => {
                cy.log($VATele.text())
                Cypress.env("GROSS_TOTAL", $VATele.text());
              })
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.TAX_CODE_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(taxcode)
            cy.wait(1000)
    _mainView.select_popupItem('grid', taxcode);
    cy.SAVE()
    cy.wait(1000)
    _modalView.findModal().acceptButton('Yes');
    cy.wait(2000)
    _common.getTextfromCell(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, app.GridCells.VALUE_TAX, app.GridCells.GROSS)
    cy.wait(1000).then(() => {
      var NetValue = parseFloat(Cypress.env("Text"))
      cy.log("NetValue " + NetValue)
      cy.wait(1000).then(() => {
        var VAT = parseFloat(Cypress.env("gridcell_2_Text"))
        cy.log("VATValue " + VAT)
        var Gross = NetValue + VAT
        cy.log("GrossValue " + Gross)
        let gross: string = Gross.toFixed(2).toString()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.GROSS, gross)
      })
      cy.wait(1000).then(() => {
        var taxcodeINT = parseFloat(taxcode)
        var VATCalculation = (NetValue * taxcodeINT) / 100
        let VATCalculationstring: string = VATCalculation.toFixed(2).toString()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_TAX, VATCalculationstring)
      })
    })
  }

  change_Businesspartner_and_verify_supplier_with_branchname(businessPartner: string, uuid: string, gridCells_1: string, gridCells_2: string, gridCells_3: string) {
     _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
     cy.REFRESH_SELECTED_ENTITIES()
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.BUSINESS_PARTNER_FK)
              .findInputLookup(btn.IconButtons.ICO_INPUT_LOOKUP, 0)
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .eq(0)
              .type(businessPartner)
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .findButton(btn.IconButtons.ICO_SEARCH)
              .clickIn()
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .findCellhasValue(app.GridCells.BP_NAME_1, businessPartner)
              .click()
     _modalView.acceptButton(btn.ButtonText.OK)
     cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.SUBSIDIARY_FK)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.BUSINESS_PARTNER_FK)
    cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .getCell(gridCells_1)
              .wrapElements()
              .then(($ele1) => {
                Cypress.env("Business_Partner_SupplierNo", $ele1.text());
                cy.log(Cypress.env("Business_Partner_SupplierNo"))
              })
     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .getCell(gridCells_2)
              .wrapElements()
              .then(($ele1) => {
                var Business_Partner_Branch: string = $ele1.text().split(',')
                cy.log(Business_Partner_Branch[0])
                Cypress.env("Business_Partner_Branch", Business_Partner_Branch[0]);
      })
     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .getCell(gridCells_3)
              .wrapElements()
              .then(($ele1) => {
                cy.log($ele1.text())
                Cypress.env("VAT_Group", $ele1.text());
              })
    cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.BANK_FK)
              .wrapElements()
              .then(($ele1) => {
                cy.log($ele1.text())
                var BUSINESS_PARTNER_BANK = $ele1.text().replace("(", " ").replace(")", " ").split(" ")
                Cypress.env("BUSINESS_PARTNER_BANK", BUSINESS_PARTNER_BANK[2]);
              })
   _common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
  }

  enterRecord_toCreateNewRole_Ifnotexist(clerk: string) {
    cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
              .findGrid()
              .wrapElements()
              .find("[class*='grid-canvas grid-canvas-top grid-canvas-right']").then(($ele) => {
        if ($ele.find("[class*='ui-widget-content']").length > 0) {
          _common.select_rowInContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
           _mainView.findModuleClientArea()
                    .findAndShowContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
                    .findGrid()
                    .findActiveRow()
                    .getCell(app.GridCells.CLERK_FK)
                    .wrapElements()
                    .then(($ele1) => {
                      cy.log($ele1.text())
                      Cypress.env("Clerk", $ele1.text());
                    })
        }
        else {
          _common.create_newRecord(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
          _common.edit_containerCell(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.GridCells.CLERK_FK,app.InputFields.INPUT_GROUP_CONTENT, clerk)
          _mainView.select_popupItem('grid', clerk)
          _common.waitForLoaderToDisappear()
          _common.select_activeRowInContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
          _common.waitForLoaderToDisappear()
          cy.SAVE()
          cy.wait(2000)
           _mainView.findModuleClientArea()
                    .findAndShowContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
                    .findGrid()
                    .findActiveRow()
                    .getCell(app.GridCells.CLERK_FK)
                    .wrapElements()
                    .then(($ele1) => {
                      cy.log($ele1.text())
                      Cypress.env("Clerk", $ele1.text());
                    })
        }
      })
  }

  select_role_of_ProcurementStructure(uuid: string, Role: string) {

     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_REQ_FK)
              .inputField_deleteButton(0)
     _mainView.findModuleClientArea()
              .findGrid()
              .caret()
    cy.wait(1000)
    _mainView.select_popupItem('list', Role);
     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_PRC_FK)
              .inputField_deleteButton(0)
     _mainView.findModuleClientArea()
              .findGrid()
              .caret()
    cy.wait(1000)
    _mainView.select_popupItem('list', Role);
    cy.wait(2000)
  }

  selectClerkRoleInRole(Role: string) {
    _common.select_rowInContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.CLERK_ROLE_FK)
              .inputField_deleteButton(0)
     _mainView.findModuleClientArea()
              .findGrid()
              .caret()
    cy.wait(1000)
    _mainView.select_popupItem('list', Role);
  }

  enterRecord_toCreateWIC_Catalogue_Ifnotexist(setContainerValues, tobeChangeValues, BOQ_STRCU_DESC,quantity,unitRate,uom, BoQStructureGrid) {
    _common.maximizeContainer(cnt.uuid.WIC_CATALOGUES)
    cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.WIC_CATALOGUES)
              .findGrid()
              .wrapElements()
              .then(($ele) => {
                if ($ele.find("[class*='column-id_']").length > 0) {
                  _common.select_rowInContainer(cnt.uuid.WIC_CATALOGUES)
                  for (var i = 0; i <= setContainerValues.length - 1; i++) {
                    _common.edit_dropdownCellWithInput(cnt.uuid.WIC_CATALOGUES, setContainerValues[i],commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, tobeChangeValues[i], WIC_CATALOGUES_HEADER)
                   
                  }
                }
                else {
                  _common.create_newRecord(cnt.uuid.WIC_CATALOGUES)
                  for (var i = 0; i <= setContainerValues.length - 1; i++) {
                    _common.edit_dropdownCellWithInput(cnt.uuid.WIC_CATALOGUES, setContainerValues[i],commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, tobeChangeValues[i], WIC_CATALOGUES_HEADER)
          
                  }

                }
      })
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(2000)
    _common.minimizeContainer(cnt.uuid.WIC_CATALOGUES)
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.WIC_CATALOGUES)
    _common.waitForLoaderToDisappear()
    cy.wait(2000)
    _common.getTextfromCell_with_Header_inRecord(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE, BOQ_ROOT_ITEM)
    _common.goToButton_inActiveRow(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE,btn.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM)
    cy.wait(2000)
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BoQStructureGrid)

    });
    cy.REFRESH_CONTAINER()
    cy.wait(5000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
              .findGrid()
              .wrapElements()
              .then(($ele) => {
                if ($ele.find("[class*='control-icons ico-boq-item']").length > 0) {
                  cy.log("BoQ structure is already created")
                }
                else {
                  const BOQ_STRUCTURE_PARAMETER:DataCells={
                      [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                      [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRCU_DESC,
                      [app.GridCells.QUANTITY_SMALL]:quantity,
                      [ app.GridCells.PRICE_SMALL]:unitRate,
                      [app.GridCells.BAS_UOM_FK]:uom
                  }
                  _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURES)
                  _common.waitForLoaderToDisappear()
                  _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETER)
                  _common.waitForLoaderToDisappear()
                  _common.minimizeContainer(cnt.uuid.BOQ_STRUCTURES)
                }
      })
  }

  enterRecord_toCreateSupplierIfnotExist(BranchDescription) {
    cy.wait(5000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.SUPPLIERS)
              .findGrid()
              .wrapElements()
              .find("[class*='grid-canvas grid-canvas-top grid-canvas-right']").then(($ele) => {
                if ($ele.find("[class*='ui-widget-content']").length < 1) {
                  cy.wait(1000)
                  _common.create_newRecord(cnt.uuid.SUPPLIERS)
                  
                  _common.edit_dropdownCellWithInput(cnt.uuid.SUPPLIERS, app.GridCells.SUBSIDIARY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, BranchDescription)
                  _common.waitForLoaderToDisappear()
                  cy.SAVE()
                  _common.waitForLoaderToDisappear()
                  _common.getTextfromCell(cnt.uuid.SUPPLIERS, app.GridCells.CODE)
                  _common.select_rowInContainer(cnt.uuid.SUPPLIERS,)
                  _common.getTextfromCell(cnt.uuid.SUPPLIERS, null, app.GridCells.CODE)
                }
                else {
                  _common.select_rowInContainer(cnt.uuid.SUPPLIERS)
                  _common.getTextfromCell(cnt.uuid.SUPPLIERS, app.GridCells.CODE)
                }
              })
  }

  verify_supplierNumberInContractDetails_by_changeingBPBranch(supplierDescription) {
    cy.get('.cid_b3b0fdf482ae4973a4b6bbea754876c3 .platform-form-group-header').eq(2).scrollIntoView()
    cy.wait(2000)
     _mainView.findAndShowContainer(cnt.uuid.CONTRACTDETAIL)
              .findDeleteButtonByLabel("Branch")
     _mainView.findAndShowContainer(cnt.uuid.CONTRACTDETAIL)
              .findCaretByLabel("Branch")
    _mainView.select_popupItem('grid', supplierDescription)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.YES)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  
    cy.wait(1000).then(() => {
      _mainView.getTextFromContainerFormByLabel(cnt.uuid.CONTRACTDETAIL, "Supplier No.")
    })
  }

  verify_MaterialCatalogFilterRecordCodeInContract(uuid: string, gridCells: string, popupGridCell: string, expectedValue: string) {
     _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .findActiveRow()
              .findCell(gridCells)
              .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP, 0)
     _modalView.findModal().acceptButton('Refresh')
     _modalView.findModal()
               .getCell(popupGridCell)
               .wrapElements()
               .eq(0)
               .then(($ele) => {
                var GetTextValue = $ele.text()
                cy.log(GetTextValue)
                Cypress.env("GetTextValueFromPopUp", GetTextValue)
                expect(GetTextValue).to.contain(expectedValue)

              })

  }
  verify_VATByChangingVATgroup(taxcode,vatGroup, taxPercent) {
    cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.TAX_CODE_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(taxcode)
  cy.wait(1000)
  _mainView.select_popupItem('grid', taxcode);
  cy.SAVE()
  cy.wait(5000)
  _modalView.findModal().acceptButton('Yes');
  cy.wait(5000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.BPD_VAT_GROUP_FK)
              .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(vatGroup)
    cy.wait(1000)
    _mainView.select_popupItem('grid', vatGroup);
    cy.SAVE()
    cy.wait(5000)
    _modalView.findModal().acceptButton('Yes');
    cy.wait(5000)
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TRANSLATED, "Total",PACKAGE_TOTAL_TRANSLATION)
    _common.getTextfromCell(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, app.GridCells.VALUE_TAX)
    cy.wait(1000).then(() => {
      var NetValue = parseFloat(Cypress.env("Text"))
      cy.log("NetValue " + NetValue)
      var VAT = parseFloat(Cypress.env("gridcell_2_Text")).toFixed(2)
      cy.log("VATValue " + VAT)
      var VATCalculation = (NetValue * taxPercent) / 100
      let VATCalculationstring: string = VATCalculation.toFixed(2)
      expect(VATCalculationstring).to.equals(VAT)
    })
  }

  /*
    This is used to create contract in price comaprison from wizard
    Updated Date: 18/12/2024
    Updated content : Interface logic added
    Author : Harshal Shinkar
    */
  create_contractInPriceComparison_fromWizard(data:DataCells){
    if(data[app.GridCells.BUSINESS_PARTNER_FK_SMALL]){
      _modalView.findModal()
      .findCellhasValue(app.GridCells.BUSINESS_PARTNER_FK_SMALL,data[app.GridCells.BUSINESS_PARTNER_FK_SMALL])
      .click()
      _modalView.findModal()
      .findActiveRow()
      .findCheckbox_inCell(app.GridCells.IS_CHECKED)              
      .check({force:true})
    }
    if(data[app.GridCells.PROJECT_FK]){
    _modalView.findModal()
              .findCellhasValue(app.GridCells.PROJECT_FK,data[app.GridCells.PROJECT_FK])
              .click()
    _modalView.findModal()
              .findActiveRow()
              .findCheckbox_inCell(app.GridCells.IS_CHECKED_SMALL)              
              .check({force:true})
    }
    _common.clickOn_modalFooterButton(btn.ButtonText.CREATE)
    cy.get(commonLocators.CommonElements.CONTRACT_POPUP_MESSAGE).then(function (element) {
                const actualtext = element.text();
                cy.log(actualtext)
                expect(actualtext.includes("Contract (s) successfully created!")).to.be.true;
              });
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT);
  }

  

  create_ContractChangeOrder_fromWizard(createchangedesc:string,changeType:string){
    _modalView.findModal().findRadio_byLabel_InModal("Create Change Order Contract base on below selected base contract","radio",0,"radio spaceToUp")
    _modalView.findModal().findButton(btn.IconButtons.ICO_INPUT_ADD).clickIn();


    var element:string =commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+" "
    var elements:string ="[class*='platform-form-row'] "

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

     cy.get("[class*='modal-footer']").eq(1).contains(btn.ButtonText.OK).click();
      cy.wait(4000)
  
    _modalView.findModal().findCheckbox_inCell(app.SubContainerLayout.SELECTED)
    _modalView.findModal().acceptButton("Create");
    cy.wait(4000)
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_CONTRACT)
  }
  create_PES_withHowToCreatePESoption_fromWizard(PES_from:string){
    _modalView.findModal().findRadio_byLabel_InModal("Create new PES","radio",0,"checkbox spaceToUp")
    _modalView.findModal().findRadio_byLabel_InModal(PES_from,"radio",0,"platform-form-label ng-binding")
    _modalView.findModal().acceptButton("OK");       
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_PES)
  }

  verify_RecordIsExistInPopUp_afterclickOnLookUp(uuid: string, gridCells: string, popupGridCell: string, expectedValue: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(uuid)
             .findGrid()
             .findActiveRow()
             .findCell(gridCells)
             .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP, 0)
    _modalView.findModal().acceptButton('Refresh')
    _modalView.findModal()
              .getCell(popupGridCell)
              .wrapElements()
              .eq(0)
              .then(($ele) => {
               var GetTextValue = $ele.text()
               cy.log(GetTextValue)
               Cypress.env("GetTextValueFromPopUp", GetTextValue)
               expect(GetTextValue).to.contain(expectedValue)

             })
             _modalView.findModal().acceptButton('Cancel')
 }

 
 enterRecord_To_CreatePES_fromWizard_From_QTO(PES_from:string,data: DataCells){
  _modalView.findModal()
            .findRadio_byLabel_InModal(PES_from,"radio",0,"platform-form-col")
  if (data[commonLocators.CommonLabels.DATE_DELIVERED])
  {
    _modalView.findModal()
              .findInputFieldInsideModal(commonLocators.CommonLabels.DATE_DELIVERED,app.InputFields.INPUT_GROUP_CONTENT)
              .clear().type(data[commonLocators.CommonLabels.DATE_DELIVERED])
  }
  _modalView.findModal()
            .acceptButton(btn.ButtonText.OK); 
 }

  

 /* Generate the payment schedule. */
 enterRecord_toGeneratePaymentScheduleInContract(data: DataCells)
 {
   if(data[commonLocators.CommonKeys.RADIO])
   {
   _modalView.findModal()
             .findRadio_byLabel(data[commonLocators.CommonKeys.RADIO],"radio",0)
   }
   if(data[commonLocators.CommonLabels.TOTAL_OC_NET])
   {
     _modalView.findModal()
               .findCaretInsideModal(commonLocators.CommonLabels.TOTAL_OC_NET)
     _mainView.select_popupItem("grid",data[commonLocators.CommonLabels.TOTAL_OC_NET])
   }
   if(data[commonLocators.CommonLabels.START_DATE])
   {
     _modalView.findModal()
               .findInputFieldInsideModal(commonLocators.CommonLabels.START_DATE,app.InputFields.INPUT_GROUP_CONTENT)
               .type(data[commonLocators.CommonLabels.START_DATE],{force:true})          
   }
   if(data[commonLocators.CommonLabels.END_DATE])
   {
     _modalView.findModal()
     .findInputFieldInsideModal(commonLocators.CommonLabels.END_DATE,app.InputFields.INPUT_GROUP_CONTENT)
     .type(data[commonLocators.CommonLabels.END_DATE]+ '{enter}') 
   }
   _modalView.findModal().acceptButton(btn.ButtonText.OK)
 }
 select_projectsearch_FromLookups_fromModal(container_UUID:string,cellClass:string,inputClass:string,searchValue:string,searchAddress?:string){
  _common.waitForLoaderToDisappear()
  _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(cellClass)
            .findInputLookup(app.GridCellIcons.ICO_INDICATOR_SEARCH,0)
   cy.wait(2000)//  Added this wait as data take time to load
  _common.waitForLoaderToDisappear()
       cy.contains(commonLocators.CommonLabels.ADVANCED_CRITERIA)
         .then(() => {
            _modalView.findModal()
                      .findInputLookup(app.GridCellIcons.ICO_INPUT_DELETE,1)
                        cy.contains(commonLocators.CommonLabels.PROJECT) 
                        cy.get(`${commonLocators.CommonContainerElements.LOOKUP_GRID_CONTAINER}`).eq(0)
                          .find(`[class*='${inputClass}']`).eq(2)
                          .type(searchValue)
                         })    
  _modalView.findModal()
            .findButton(btn.IconButtons.ICO_SEARCH)
            .wrapElements()
            .first()
            .click()
  _modalView.findModal()
            .wrapElements()
            .find(`[class*='${app.SubContainerLayout.COLUMN_ID}']`)
            .contains(searchAddress)
            .click()
  _modalView.findModal()
            .acceptButton(btn.ButtonText.OK) 
  _common.waitForLoaderToDisappear()
}



  
}
