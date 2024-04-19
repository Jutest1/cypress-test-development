/// <reference types="cypress" />
import { _mainView, _modalView, _common, _salesPage, _billPage } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar } from "../../../../locators";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";
import { BillPage } from "../Bill/bill-page";

var quantity: string;
var wipQuantity: string;
var expectedPayementBill: string;
var WIP2NetAmount2: string;
var WIP2NetAmount1: string;
var BoQQuantity1: string;
var BoQQuantity2: string;

export class WipPage {
  updateQuantity_inWIPBoqStructure(quantity: string) {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
		});
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
    _common.select_allContainerData(cnt.uuid.BOQ_STRUCTUREWIP)
    _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTUREWIP,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.QUANTITY_SMALL)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(quantity);
    _common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTUREWIP)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.FINAL_PRICE_SMALL)
             .wrapElements()
             .then(($ele) => {
               Cypress.env("actWIPFinalPrice", $ele.text());
             });
  }

  changeStatus_WipRecord() {
    _common.openTab(app.TabBar.WIP);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar("wizard", "Change WIP Status");
    _common.changeStatus_fromModal("Approved");
  }

  updateQuantity_inWIpLineItem(projectNo, quantity) {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE, 1);
		});
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
    _common.select_allContainerData(cnt.uuid.BOQ_STRUCTUREWIP)
    _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTUREWIP,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
             .click();
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP_LINE_ITEMS,app.FooterTab.WIP_LINE_ITEMS,2);
    });
    _common.maximizeContainer(cnt.uuid.WIP_LINE_ITEMS)
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.WIP_LINE_ITEMS)
             .findGrid()
             .findCellhasValue(app.GridCells.PROJECT_NO, projectNo)
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.WIP_LINE_ITEMS)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.LI_QUANTITY)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(quantity);
    cy.SAVE();
    _common.minimizeContainer(cnt.uuid.WIP_LINE_ITEMS)
  }

  CombineWIP_verification() {
    _modalView.findModal()
              .findCellhasValue(app.GridCells.CODE, Cypress.env("actContractCode"))
              .should("be.visible");
    _modalView.findModal()
              .findCheckBox_byLabel("Sales Order", "checkbox")
              .should("be.checked");
    _modalView.findModal()
              .findCellhasValue(app.GridCells.CODE, Cypress.env("chngContractCode"))
              .should("be.visible");
    _modalView.findModal()
              .findCheckBox_byLabel("Change Order", "checkbox")
              .should("be.checked");
  }

  selectWIP() {
    cy.wait(3000).then(() => {
      _common.search_inSubContainer(cnt.uuid.WIP, Cypress.env("actWIPCode"));
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.WIP)
               .findGrid()
               .findActiveRow()
               .findCell(app.GridCells.DESCRIPTION_INFO);
    });
  }

  assignBillNoToPaymentSchedule(code: string, description: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
             .findGrid()
             .findCellhasValue(app.GridCells.CODE, code)
             .click({ force: true });
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.BIL_HEADER_FK)
             .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
             .type(description);
    _mainView.select_popupItem("grid", description);
    cy.wait(2000);
    cy.SAVE();
  }

  verifyPaymentBalanceNet_withNetAmount(code: string) {
    cy.wait(2000);
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
             .findGrid()
             .findCellhasValue(app.GridCells.CODE, code)
             .click();
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements()
             .then(($value) => {
              const netAmount = $value.text();
              cy.log(netAmount).then(() => {
                const totalNetAmount = parseFloat(netAmount);
                cy.log("TotalNetAmount" + totalNetAmount);
                _mainView.findModuleClientArea()
                         .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
                         .findGrid()
                         .findActiveRow()
                         .getCell(app.GridCells.BIL_AMOUNT_NET)
                         .wrapElements()
                         .then(($value) => {
                          const billtAmountNet = $value.text().replace(",", "");
                          cy.log(billtAmountNet).then(() => {
                            const totalBillAmountNet = parseFloat(billtAmountNet);
                            cy.log("TotalBillNetAmount" + totalBillAmountNet);
                            const actualPaymentBill: number =totalNetAmount - totalBillAmountNet;
                            cy.log("Payment Net Bill" + actualPaymentBill);
                            const actualBalanceNetValue = actualPaymentBill.toFixed(2);
                            cy.log("Payment Net Bill" + actualBalanceNetValue);
                            _mainView.findModuleClientArea()
                                    .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
                                    .findGrid()
                                    .findActiveRow()
                                    .getCell(app.GridCells.PAYMENT_BALANCE_NET)
                                    .wrapElements()
                                    .then(($value) => {
                                      const expectedPayementBill = $value.text().replace(",", "");
                                      cy.log(expectedPayementBill).then(() => {
                                        const expectedlBalanceValue =parseFloat(expectedPayementBill);
                                        const expectedlBalanceNetValue =expectedlBalanceValue.toFixed(2);
                                        cy.log("TotalNetAmount" + expectedlBalanceNetValue);
                                        expect(expectedlBalanceNetValue).to.equals(actualBalanceNetValue);
                                      });
                                    });
                                });
                            });
                    });
            });
  }
  selectIsFinalAndVerifyBalanceBillAmountWithNetAmount() {
    cy.wait(2000);
    cy.get("[class*='column-id_isfinal']")
      .find("[checked*=checked]")
      .click({ force: true });
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.PAYMENT_BALANCE_NET)
             .wrapElements()
             .then(($value) => {
              expectedPayementBill = $value.text();
              cy.log(expectedPayementBill);
              _billPage.create_BillFromWizard("Contract","Create Bill","CreateFinalBill","Final Invoice");
              cy.wait(8000);
              //_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
              cy.wait(4000).then(() => {
                _mainView.findInputInContainerByLabel(cnt.uuid.BILL_DETAILS, "Net Amount")
                         .invoke("val")
                         .then(function (netVal: string) {
                          const actualtotalNetAmount = netVal;
                          cy.log(actualtotalNetAmount);
                          expect(expectedPayementBill).to.equals(actualtotalNetAmount);
                         });
              });
            });
  }
  create_WIPfrom_Wizard(DESC: string) {
    _modalView.findModal()
              .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_TRANSLATION)
              .clear()
              .type(DESC);
    _modalView.findModal().findModalBody().findCell(app.SubContainerLayout.INDICATOR);
    _modalView.findModal().acceptButton(Buttons.ButtonText.OK);
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_WIP)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    });
    _common.clear_subContainerFilter(cnt.uuid.WIP);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.WIP).findGrid().findActiveRow().getCell(app.GridCells.CODE).wrapElements()
      .then(($ele) => {
        Cypress.env("actWIPCode", $ele.text());
      });
  }

  get_BoQStructureQuantity1() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($value) => {
              BoQQuantity1 = $value.text();
              cy.log("Quantity1" + BoQQuantity1);
             });
  }

  get_BoQStructureQuantity2() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.BOQ_STRUCTUREWIP)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.QUANTITY_SMALL)
             .wrapElements()
             .then(($value) => {
              BoQQuantity2 = $value.text();
              cy.log("Quantity2" + BoQQuantity2);
             });
  }

  get_netAmountOfWIP() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.WIP)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements()
             .then(($value) => {
                WIP2NetAmount1 = $value.text().replace(",", "");
                cy.log("WIP1" + WIP2NetAmount1);
             });
  }

  get_netAmountOfWIP2() {
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.WIP)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements()
             .then(($value) => {
                WIP2NetAmount2 = $value.text().replace(",", "");
                cy.log("WIP2" + WIP2NetAmount2);
             });
  }
  verify_netAmountOfBill_withWIPAndWIP2_NetAmount() {
    cy.wait(3000).then(() => {
      const WIPAmount1 = parseFloat(WIP2NetAmount1);
      cy.log("TotalNet1 " + WIPAmount1);
      const WIPAmount2 = parseFloat(WIP2NetAmount2);
      cy.log("TotalNet2 " + WIPAmount2);
      const WIPAmount = WIPAmount1 + WIPAmount2;
      cy.log("TotalNetSum " + WIPAmount);
      const actualNetValue = WIPAmount.toString();
      cy.wait(3000).then(() => {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BILLS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.AMOUNT_NET)
                 .wrapElements()
                 .then(($value) => {
                    const NetValue = $value.text().replace(",", "");
                    const NetValueNumber = parseFloat(NetValue);
                    var expectedNetValue = NetValueNumber.toFixed().toString();
                    cy.log("Expected" + expectedNetValue);
                    expect(expectedNetValue).to.equals(actualNetValue);
                 });
      });
    });
  }

  verify_QuantityOfBill_withQuantity1AndQuantity2OfWIP() {
    cy.wait(3000).then(() => {
      const QuantityAmount1 = parseFloat(BoQQuantity1);
      cy.log("TotalNet1 " + QuantityAmount1);
      const QuantityAmount2 = parseFloat(BoQQuantity2);
      cy.log("TotalNet2 " + QuantityAmount2);
      const BillQuantity = QuantityAmount1 + QuantityAmount2;
      cy.log("TotalNetSum " + BillQuantity);
      const actualQuantityValue = BillQuantity.toString();
      cy.wait(3000).then(() => {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
                 .findGrid()
                 .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position")
                 .click();
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.QUANTITY_SMALL)
                 .wrapElements()
                 .then(($value) => {
                    var QuantityValue = $value.text();
                    const QuantityValueNumber = parseFloat(QuantityValue);
                    expect(QuantityValueNumber).to.equals(actualQuantityValue);
                 });
      });
    });
  }

  update_wipQuantities_FromWizard() {
    _modalView.findModal()
              .findRadio_byLabel("From Schedule", "radio", 0);
    _modalView.findModal()
              .findCheckBox_byLabel("Update LineItem Quantity in Estimate", "checkbox")
              .check();
    _modalView.findModal()
              .acceptButton("OK");
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _modalView.findModal()
              .acceptButton("OK");
  }

  updateWipQuantitywizard_fromSchedule() {
    _modalView.findModal().findRadio_byLabel("From Schedule", "radio", 0);
  
    _modalView.findModal().acceptButton("OK");
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _modalView.findModal().acceptButton("OK");
  }

  enterRecord_toCreateNewWIP(data: DataCells){
_common.waitForLoaderToDisappear()
    if (data[commonLocators.CommonLabels.DESCRIPTION]) {
      cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
        .contains(`${commonLocators.CommonElements.PLATFORM_FORM_LABEL}`,commonLocators.CommonLabels.DESCRIPTION)
        .closest(`${commonLocators.CommonElements.ROW}`)
        .within(()=>{
          cy.get(`${commonLocators.CommonElements.PLATFORM_FORM_COL}`)
            .within(()=>{
              cy.get(`[class^='${app.InputFields.DOMAIN_TYPE_DESCRIPTION}']`)
                .click({force:true})
                .clear()
                .type(data[commonLocators.CommonLabels.DESCRIPTION])
            })
        })
    }

    if (data[commonLocators.CommonLabels.CONTRACT]) {
          _modalView.findModal()
                    .findInputFieldInsideModal(commonLocators.CommonLabels.CONTRACT, app.InputFields.INPUT_GROUP_CONTENT)
                    .clear({ force: true })
                    .type(data[commonLocators.CommonLabels.CONTRACT], { force: true });
          _modalView.findModal()
                    .select_popupItem("grid", data[commonLocators.CommonLabels.CONTRACT]);
                  cy.wait(2000)

    }  

    if (data[commonLocators.CommonLabels.CLERK]) {
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.CLERK, app.InputFields.INPUT_GROUP_CONTENT)
                  .clear({ force: true })
                  .type(data[commonLocators.CommonLabels.CLERK]);
        _modalView.select_popupItem("grid", data[commonLocators.CommonLabels.CLERK])
                cy.wait(1000)
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
  cy.wait(1000)  
    _modalView.findModal()
              .acceptButton(btn.ButtonText.OK)
              
  }

    enterRecord_CreateAccruals(data: DataCells) {
      if (data[commonLocators.CommonLabels.VOUCHER_NO]) {
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.VOUCHER_NO, app.InputFields.DOMAIN_TYPE_CODE)
                  .type(data[commonLocators.CommonLabels.VOUCHER_NO], { force: true })    

      }  
      if (data[commonLocators.CommonLabels.DESCRIPTION]) {
        _modalView.findModal()
                  .findInputFieldInsideModal(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION)
                  .clear({ force: true })
                  .type(data[commonLocators.CommonLabels.DESCRIPTION], { force: true })    
      } 
      
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.OK) 
    }
}
