/// <reference types="cypress" />

import { _common, _mainView, _modalView, _sidebar,_materialPage, _validate } from "../index";
import { cnt, btn, app ,commonLocators, sidebar} from "../../locators";
import { DataCells } from "../interfaces";
import { BOQ_ROOT_ITEM, PACKAGE_TOTAL_TRANSLATION } from "../variables";
import { find } from "cypress/types/lodash";
let startingAANValue:any=0;
let endingAANValue:any=0;
let incrementAANBy:any=0;
var ActCostTotal: any
var plannedQty: any, remPercentage: any, finalRemPercentage: any, remainingPercentage: any, percentage: any;
let actualNetValue: any

export class Validations {
  verify_isRecordEntered(container_UUID: string, gridCells:string ,compareValue: string,header?:string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .getCell(gridCells, header)
             .containsValue(compareValue);
        }

  verify_isRecordDeleted(container_UUID: string, compareValue: string) {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .wrapElements().then(($cell) => {
                cy.wrap($cell)
                  .contains(".slick-container div", compareValue)
                  .should("not.exist")
             })

  }

  updateWizardOptionText(oldText: String, newText: string, moduleSearch: string, wizardGroupSearch: string, wizardToGroupSearch: string) {
    _mainView.findTab(app.TabBar.MODULES).clickIn()
    _common.search_inSubContainer(cnt.uuid.MODULES, moduleSearch)
    _mainView.findTab(app.TabBar.WIZARD).clickIn()
    _common.search_inSubContainer(cnt.uuid.MODULES, moduleSearch)
    _common.search_inSubContainer(cnt.uuid.WIZARD_GROUP, wizardGroupSearch)
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(cnt.uuid.WIZARD_GROUP)
      .findCellhasValue(app.GridCells.NAME, wizardGroupSearch).click()
    _common.search_inSubContainer(cnt.uuid.WIZARD_TO_GROUP, wizardToGroupSearch)

    cy.get(".cid_" + cnt.uuid.WIZARD_TO_GROUP + " ." + app.GridCells.NAME)
      .as("data")
      .each(($el, index, $list) => {
        cy.get("@data").eq(index).click();
        _mainView
          .findModuleClientArea()
          .findAndShowContainer(cnt.uuid.WIZARD_TO_GROUP)
          .findActiveRow()
          .findCell(app.GridCells.NAME)
          .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION).invoke("val").then(function (codeVal: string) {
            if (codeVal == oldText) {
              _mainView
                .findModuleClientArea()
                .findAndShowContainer(cnt.uuid.WIZARD_TO_GROUP)
                .findActiveRow()
                .findCell(app.GridCells.NAME)
                .findTextInput(app.InputFields.DOMAIN_TYPE_TRANSLATION)
                .type(newText)
            }
          })
      })
    cy.SAVE()
  }
  /* Verifying quantity with price of requisition item using multiplication
   with "net value" of Totals */
  verifyNetValueOf_requisitionItems(quantity: any, price: any) {
    const expectedNetValue = (quantity * price).toFixed(2);
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.REQUISITION_TOTALS)
      .findGrid().getCell(app.GridCells.VALUE_NET)
      .wrapElements().first().invoke('text').then((netValueText) => {
        expect(netValueText).to.equal(expectedNetValue);
      })
  }

  assert_cellData_not_equal(container_UUID: any, cellClass: any, value: any) {
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(cellClass)
      .wrapElements().should("not.equal", value)

  }


  customizing_DataRecordCheckBox(checkboxCell: string, checkBoxValue: string) {
    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.INSTANCES).findGrid().findActiveRow().getCell(checkboxCell).wrapElements()
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
  }

  verifyValuesOf_generatedProjectBoq_fromLineitems(Container_UUID: string, ExpDescription?: string, ExpUoM?: string, ExpQuantity?: any, CostTotals?: string[]) {
    if (ExpDescription != null) {
      _mainView.findModuleClientArea()
        .findAndShowContainer(Container_UUID)
        .findGrid()
        .findActiveRow()
        .getCell(app.GridCells.BRIEF_INFO_SMALL)
        .wrapElements()
        .then(($description) => {
          expect($description.text()).to.equals(ExpDescription);
        })
    }
    if (ExpUoM != null) {
      _mainView.findModuleClientArea()
        .findAndShowContainer(Container_UUID)
        .findGrid()
        .findActiveRow()
        .getCell(app.GridCells.BAS_UOM_FK)
        .wrapElements()
        .then(($uom) => {
          expect($uom.text()).to.equals(ExpUoM);
        })
    }
    if (ExpQuantity != null) {
      _mainView.findModuleClientArea()
        .findAndShowContainer(Container_UUID)
        .findGrid()
        .findActiveRow()
        .getCell(app.GridCells.QUANTITY_SMALL)
        .wrapElements()
        .then(($quantity) => {
          expect(parseFloat($quantity.text()).toFixed(2)).equal(parseFloat(ExpQuantity).toFixed(2));
        });
    }
    if (CostTotals != null) {
      var sum = 0
      for (let i = 0; i < CostTotals.length; i++) {
        const parsedValue = parseFloat(CostTotals[i]);
        if (!isNaN(parsedValue)) {
          sum += parsedValue;
          var sumwithoutrounding = sum;
          var roundedoffSum = Math.round(sum);
          cy.log("Total Rounded off to =>" + roundedoffSum.toFixed(2).toString());
          cy.log("Total without Rounding off =>" + sumwithoutrounding.toFixed(2).toString());
        }
      }
      _mainView.findModuleClientArea()
        .findAndShowContainer(Container_UUID)
        .findGrid()
        .findActiveRow()
        .getCell(app.GridCells.FINAL_PRICE)
        .wrapElements()
        .then(($finalprice) => {
          const finalPrice = parseFloat($finalprice.text().replace(",", "")).toFixed(2)
          cy.log("Final Price==>", finalPrice)
          if (finalPrice === ((roundedoffSum).toFixed(2))) {
            cy.log("Price is Equal to Rounded Number")
            expect(parseFloat($finalprice.text().replace(",", "")).toFixed(2)).equal((roundedoffSum).toFixed(2));
          }
          else {
            cy.log("Price is not Equal to Rounded Number")
            expect(parseFloat($finalprice.text().replace(",", "")).toFixed(2)).equal((sumwithoutrounding).toFixed(2));
          }
        })

      const Quantity = parseFloat(ExpQuantity)
      const Total = sumwithoutrounding
      var unitRate = Total / Quantity
      cy.log("Calculated Unit Rate is ==>" + unitRate.toFixed(2).toString())

      _mainView.findModuleClientArea()
               .findAndShowContainer(Container_UUID)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.PRICE)
               .wrapElements()
               .then(($unitrate) => {
                  expect(parseFloat($unitrate.text()).toFixed(2)).equal(unitRate.toFixed(2))
                })
    }
    return sum;
  }
  verifyValuesOf_ProcurementStructure_and_ConfigurationHeader_are_same(configurationHeader1: string, configurationHeader2: string, value1: string, value2: string) {

    _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES);
    _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, value1);

    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_CONFIG_HEADER_FK)
             .caret()
    _mainView.select_popupItem("list", configurationHeader1);
     _common.clickOn_cellHasUniqueValue( cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE, value2 );
    _mainView.findModuleClientArea()
             .findAndShowContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
             .findGrid()
             .findActiveRow()
             .findCell(app.GridCells.PRC_CONFIG_HEADER_FK)
             .caret()
   _mainView.select_popupItem("list", configurationHeader2);
    cy.SAVE();
  }
  assert_Package_ProcurementStructure(procurementStru: string, configurationValue1: string,procurementStru2: string,configurationValue2: string) {
    _mainView.findModuleClientArea();
    _modalView.findModal()
              .findInputFieldInsideModal("Procurement structure", app.InputFields.INPUT_GROUP_CONTENT)
              .type(procurementStru);
               cy.wait(2000); //Adding wait to select item from popup grid
    _mainView.select_popupItem("grid", procurementStru);
    _modalView.findModal()
              .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
              .invoke("val")
              .then((_$ele) => {
               cy.log("Configuration value is: ", _$ele)
               cy.wait(1000);
               expect(configurationValue1).to.equals(_$ele);
      });
      _modalView.findModal()
                .findInputFieldInsideModal("Procurement structure", app.InputFields.INPUT_GROUP_CONTENT)
                .type(procurementStru);
    cy.wait(2000); //Adding wait to select item from popup grid
    _mainView.select_popupItem("grid", procurementStru2);
    _modalView.findModal()
              .findInputFieldInsideModal("Configuration", app.InputFields.INPUT_GROUP_CONTENT)
              .invoke("val")
              .then((_$ele) => {
               cy.log("Configuration value is: ", _$ele)
               cy.wait(1000);
               expect(configurationValue2).to.equals(_$ele);
      });
    }
  /* verifying the summation of records available in the container 
with respective cells with the and match with respective cell of the container */
assertAndVerify_SumOfMultipleCellValues(containerID1: string, cellClass1: string, containerID2: string, cellClass2: string) {
  let sum = 0;
  _mainView.findModuleClientArea()
           .findAndShowContainer(containerID1)
           .getCell(cellClass1)
           .wrapElements()
           .then(($cells: JQuery<HTMLElement>) => {
            Array.from($cells).forEach(($cell: HTMLElement) => {
              const value = Cypress.$($cell).text().replace(/,/g, '').trim();
              const numericValue = parseFloat(value);
              sum += numericValue;
            });
          });
  _mainView.findModuleClientArea()
           .findAndShowContainer(containerID2)
           .getCell(cellClass2)
           .wrapElements()
           .eq(0)
           .invoke('text')
           .then((matchValue: string) => {
              const expectedValue = parseFloat(matchValue.replace(/,/g, ''));
              expect(sum.toFixed(2)).to.equal(expectedValue.toFixed(2));
          });
  }

 /* Assert multiply two values in active row */
 verify_isRecordMultiplyTwoValuesInRow(Container_UUID: string,value1: string, value2: string,cellClass: string) {
  const expResult = parseFloat(value1.replace(",","")) * parseFloat(value2.replace(",",""))
  _mainView.findModuleClientArea()
           .findAndShowContainer(Container_UUID)
           .findGrid()
           .findActiveRow()
           .getCell(cellClass)
           .wrapElements().invoke("text")
           .then((text) => {
            const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
            expect(parseFloat(actResult).toFixed(2)).to.equal(Cypress.env("result",expResult.toFixed(2)));
          })
      }
  verify_isRecordAdditionOfTwoValuesInRow(Container_UUID: string,value1: string, value2: string,cellClass: string) {
  
   const expResult = parseFloat(value1.replace(",","")) + parseFloat(value2.replace(",",""))
   _mainView.findModuleClientArea()
            .findAndShowContainer(Container_UUID)
            .findGrid().findActiveRow()
            .getCell(cellClass)
            .wrapElements().invoke("text")
            .then((text) => {
            const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
            expect(actResult).to.equal(Cypress.env("result",expResult.toFixed(2)));
          })
    
      }

  verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(Container_UUID: string,value1: string, value2: string,cellClass: string) {
  
        const expResult = (parseFloat(value1) / parseFloat(value2)) 
        cy.log("expresult",expResult)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(Container_UUID)
                 .findGrid().findActiveRow()
                 .getCell(cellClass)
                 .wrapElements().invoke("text")
                 .then((text) => {
                 const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
                 expect(actResult).to.equal(expResult.toFixed(2));
               })
         
              }

  verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(Container_UUID: string,value1: string, value2: string,cellClass: string) {
  
            const expResult = ((parseFloat(value1) * parseFloat(value2))/100) 
            cy.log("expresult",expResult)
            _mainView.findModuleClientArea()
                     .findAndShowContainer(Container_UUID)
                     .findGrid().findActiveRow()
                     .getCell(cellClass)
                     .wrapElements().invoke("text")
                     .then((text) => {
                        const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
                        expect(actResult).to.equal(expResult.toFixed(2));
                     })
             
  }

  /*Verify the Wizard POP-Up message*/
  verify_WizardMessage(msg: string) {
        _modalView.findModal()
                  .wrapElements()
                  .find(commonLocators.CommonElements.WIZARD_POPUP_MESSAGE)
                  .invoke("text")
                  .then(function (actualValue: string) {
                       expect(actualValue).to.equals(msg);
                       _modalView.findModal()
                                  .acceptButton(btn.ButtonText.OK)
          });
      }


      /* Assert substract two values and compare result*/
      verify_isRecordSubstractTwoValues(container_UUID: string,value1: string, value2: string,cellClass: string) {
        const expResult = parseFloat(value1.replace(",","")) - parseFloat(value2.replace(",",""))
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .findActiveRow()
                 .getCell(cellClass)
                 .wrapElements().invoke("text").then((text) => {
                    const actResult = Math.abs(parseFloat(text.replace(/,/g, ''))).toFixed(2);
                    expect(actResult).to.equal(Cypress.env("result",expResult.toFixed(2)))
                })
      }

      validate_Text_message_In_PopUp(validation_Msg:any){
        _common.waitForLoaderToDisappear()
        _modalView.findModal()
                  .containsValue(validation_Msg)  
      }
      validate_Text_In_Modal(popupGridCell:string,validation_Msg:any){
        _modalView.findModal()
                  .getCell(popupGridCell)
                  .wrapElements()
                  .eq(0)
                  .then(($ele) => {
                  var GetTextValue = $ele.text()
                  cy.log(GetTextValue)
                  Cypress.env("GetTextValueFromModal", GetTextValue)
                  expect(GetTextValue).to.contain(validation_Msg)
              })
      }
      validate_Text_In_Container_Textarea(uuid:string,validation_Msg:any){
        _mainView.findModuleClientArea()
                 .findAndShowContainer(uuid)
                 .wrapElements().find(commonLocators.CommonElements.PLS_IN_TEXT_AREA)
                 .invoke("val")
                 .then((actValue) => {
                  expect(actValue).to.equal(validation_Msg);
                 })        
      }
      
 verify_ToolbarButtonsDisabledEnabled(container_UUID:string,buttonClass:string,buttonStatus:string,containerPosition?:number){
  cy.wait(1000) // Add this wait as container takes time to load
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID, containerPosition)
           .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
           .findButton(buttonClass)
           .wrapElements()
           .invoke('is', ':disabled')
           .then(disabled => {
              if(buttonStatus==="enabled"){
                expect(disabled).to.be.false
              }else if(buttonStatus==="disabled"){
                expect(disabled).to.be.true
              } 
            })
 }
 
 verify_activeRowsCellCheckboxValue(container_UUID:string,checkboxCell:string,checkBoxValue:string,recordType?:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(checkboxCell,recordType)
             .wrapElements()
             .find(commonLocators.CommonElements.CHECKBOX_TYPE)
             .invoke('is', ':checked')
             .then(checked => {
                if(checkBoxValue==="check"){
                  expect(checked).to.be.true
                }else if(checkBoxValue==="uncheck"){
                  expect(checked).to.be.false
                } 
             })
  }

  verify_EditedContract_with_lookups(procurement_structure,projectChange){
    cy.wait(2000)
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .findCell(app.GridCells.STRUCTURE_CODE)
              .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
    _modalView.findModal().acceptButton('Refresh')
    _modalView.findModal()
              .containsValue(procurement_structure)
              .eq(0)
              .click()
    _modalView.findModal().acceptButton('OK')
    cy.SAVE()
     _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PROCUREMENTCONTRACT)
              .findGrid()
              .findActiveRow()
              .getCell(app.GridCells.STRUCTURE_CODE)
              .wrapElements()
              .eq(0)
              .invoke("text")
              .then((StructureCode) => {
                Cypress.env("StructureCode",StructureCode)
              expect(procurement_structure).to.equals(Cypress.env("StructureCode"))   
   });  
}

  /* Verify contacts record is present in lookup modal */
  verify_isRecordPresentInAssignedContactsInLookup(searchContactName:string)
  {
   _modalView.findModal()
             .findTextInput(app.InputFields.FORM_CONTROL)
             .clear({force:true})
             .type(searchContactName)
   _modalView.findModal()
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
           cy.wait(1000)
   _modalView.findModal()
             .getCell(app.GridCells.FIRST_NAME_CAPS)
             .wrapElements().invoke("text").then((actValue) => {
              expect(actValue).to.equal(searchContactName);
             })
  }
  
  verify_paymentTermCalculation(container_UUID:string,validate:string,discountDays?:string,discountPercent?:string,dayOfMonth?:string,calculationType?:string,grossAmount?:string){
    if(validate==="Discount Amount"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.AMOUNT_DISCOUNT)
               .wrapElements()
               .then(($value)=>{
                  let gross:any=parseFloat(grossAmount).toFixed(2)
                  let discount_Percent:any=parseFloat(discountPercent).toFixed(2)
                  let discountAmountFetched:any=parseFloat($value.text()).toFixed(2)
                  let discountAmountCalculated:any=gross * (discount_Percent/100)
                  expect(parseFloat(discountAmountCalculated).toFixed(2)).to.equal(discountAmountFetched)
               })
    }else if(validate==="Discount Basis"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.AMOUNT_DISCOUNT_BASIS)
               .wrapElements()
               .then(($value)=>{
                  let discount_Basis:any=parseFloat(grossAmount).toFixed(2)
                  let discountBasisFetched:any=parseFloat($value.text()).toFixed(2)
                  expect(discount_Basis).to.equal(discountBasisFetched)
               })
    }else if(validate==="Discount Date"){
      const dayjs = require('dayjs')
      let date=parseInt(dayjs().format('DD'))+parseInt(discountDays)
      let month=dayjs().format('MM')
      let year=dayjs().format('YYYY')
      
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.DATE_DISCOUNT)
               .wrapElements()
               .then(($value)=>{
                  let discount_Date:any;
                  if(date<10){
                    discount_Date="0"+date.toString()+"/"+month+"/"+year
                  }else{
                    discount_Date=date.toString()+"/"+month+"/"+year
                  }
                  let discountDateFetched:any=$value.text()
                  expect(discount_Date).to.equal(discountDateFetched)
                })
    }else if(validate==="Net Paybel"){
        if(calculationType==="Day of month"){
          const dayjs = require('dayjs')
          let date=dayOfMonth
          let month=parseInt(dayjs().format('MM'))+1
          let year=dayjs().format('YYYY')
          
          _mainView.findModuleClientArea()
                   .findAndShowContainer(container_UUID)
                   .findGrid()
                   .findActiveRow()
                   .getCell(app.GridCells.DATE_NET_PAYABLE)
                   .wrapElements()
                   .then(($value)=>{
                      let netPayable:any;
                      if(month<10){
                        netPayable=date+"/0"+month.toString()+"/"+year
                      }else{
                        netPayable=date+"/"+month.toString()+"/"+year
                      }
                      let netPayableFetched:any=$value.text()
                      expect(netPayable).to.equal(netPayableFetched)
                    })
        }
      
    }
  }
  
  verify_InvoiceSetAmountNet(container_UUID:string,amountNet:string){
    let gross:any;
    let balanceVAT:any
    let amountNetCal:any=parseFloat(amountNet).toFixed(2)
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_GROSS)
             .wrapElements()
             .then(($value)=>{
                gross=parseFloat($value.text()).toFixed(2)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_VAT_BALANCE)
             .wrapElements()
             .then(($value)=>{
                balanceVAT=parseFloat($value.text()).toFixed(2)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements()
             .then(($value)=>{
                let amount:any=parseFloat($value.text()).toFixed(2)
                let amountNetCals:any=gross-balanceVAT
                expect(parseFloat(amountNetCals).toFixed(2)).equal(amount)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.TOTAL_PERFORMED_NET)
             .wrapElements()
             .then(($value)=>{
                let totalPerformedNet:any=parseFloat($value.text()).toFixed(2)   
                expect(totalPerformedNet).equals(amountNetCal)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET_OC)
             .wrapElements()
             .then(($value)=>{
                let amountNetOC:any=parseFloat($value.text()).toFixed(2)     
                expect(amountNetOC).equals(amountNetCal)
             })
  }

  verify_InvoiceSetAmountGross(container_UUID:string,amountGross:string){
    let balanceVAT:any;
    let amountNet:any;
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.TOTAL_PERFORMED_GROSS)
             .wrapElements()
             .then(($value)=>{
                let grossVal:any=parseFloat(amountGross).toFixed(2)
                let totalPerformedGross:any=parseFloat($value.text()).toFixed(2)
                expect(totalPerformedGross).to.equal(grossVal)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID) 
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_GROSS_OC)
             .wrapElements()
             .then(($value)=>{
                let grossVal:any=parseFloat(amountGross).toFixed(2)
                let amountGrossOC:any=parseFloat($value.text()).toFixed(2)
                expect(amountGrossOC).to.equal(grossVal)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET)
             .wrapElements()
             .then(($value)=>{
                amountNet=parseFloat($value.text()).toFixed(2)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_VAT_BALANCE)
             .wrapElements()
             .then(($value)=>{
                balanceVAT=parseFloat($value.text()).toFixed(2)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_GROSS)
             .wrapElements()
             .then(($value)=>{
                let gross:any=parseFloat($value.text()).toFixed(2)
                let amountGrossCal:any=(+amountNet) + (+balanceVAT)
                expect(parseFloat(amountGrossCal).toFixed(2)).equals(gross)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.TOTAL_PERFORMED_NET)
             .wrapElements()
             .then(($value)=>{
                let totalPerformedNet:any=parseFloat($value.text()).toFixed(2)   
                expect(totalPerformedNet).equals(amountNet)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.AMOUNT_NET_OC)
             .wrapElements()
             .then(($value)=>{
                let amountNetOC:any=parseFloat($value.text()).toFixed(2)     
                expect(amountNetOC).equals(amountNet)
             })
  }
  
  verify_invoiceConfiguration(container_UUID: string, contractConfig: string) {
    const lowerCaseContractConfig = contractConfig.toLowerCase();
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.PRC_CONFIGURATION_FK)
             .wrapElements()
             .then(($el) => {
                const actVal = $el.text();
                if (lowerCaseContractConfig.includes("material")) {
                  expect(actVal.toLowerCase()).contains("material");
                } else if (lowerCaseContractConfig.includes("service")) {
                  expect(actVal.toLowerCase()).contains("service");
                }
             });
  }
/*Verify the POP-Up message*/
verify_isRecord_DeletedfromMaterial(msg: string) {
  _modalView.findModal()
            .wrapElements()
            .within(()=>{
                cy.get(commonLocators.CommonElements.POP_UP_MODAL)
                  .invoke("text")
                  .then((actualValue: string) =>{
                    cy.log("==>",actualValue)
                    expect(actualValue).to.be.contains(msg)
                    cy.contains('button',"OK").click()
                  });

            })
        
}

assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(scope: string, scopeindex:number, replaceFrom?:string, replaceFromindex?:number, replaceFromCatalog?:string, listOfCheckBox?:any, material?:string[], expectedReplacementMaterial?:string[]){
    _modalView.findModal()
              .findModalBody()
              .findRadio_byLabel(scope, "radio", scopeindex)
              .click({ force: true })
    _modalView.findModal()
              .findModalBody()
              .findRadio_byLabel(replaceFrom, "radio", replaceFromindex)
              .click({ force: true })
    if(replaceFrom==="Specific catalog"){
        _modalView.findModal()
                  .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
                  .clear()
                  .type(replaceFromCatalog)
                  .then(()=>{
                      _modalView.select_popupItem("grid", replaceFromCatalog)
                  })
    }
    if(listOfCheckBox!=null){
      Object.keys(listOfCheckBox).forEach(function (key) {
        _modalView.findModal()
                  .findCellhasValue(app.GridCells.NAME, key)
                  .click()
        _modalView.findModal()
                  .findModalBody()
                  .findActiveRow()
                  .checkbox_inCell(app.GridCells.SELECTED)
                  .as("checkbox")
                  .invoke("is", ":checked")
                  .then((checked) => {
                        if (listOfCheckBox[key] == "check") {
                          if (!checked) {
                            cy.get("@checkbox").check();
                          }
                        } else if (listOfCheckBox[key] == "uncheck") {
                          if (checked) {
                            cy.get("@checkbox").uncheck();
                          }
                    }
                  });
      });
    }
    _modalView.findModal().acceptButton("Next")
    if (material!=null) {
      for (let i = 0; i < material.length; i++) {
        const currentMaterial = material[i];
        _modalView.findModuleClientArea()
                  .findModal()
                  .wrapElements()
                  .within(() => {
                      cy.get(".slick-container").first().within(() => {
                        cy.get(`div.column-id_${app.GridCells.MATERIAL_CODE}`).contains("div", currentMaterial)
                          .scrollIntoView({ duration: 2000 })
                        cy.get(`div.column-id_${app.GridCells.MATERIAL_CODE}`).contains("div", currentMaterial)
                          .as("currentMaterial")
                          .click()
                        cy.wait(5000)
                        cy.get("@currentMaterial").then(($val) => {
                          expect($val.text()).equal(currentMaterial)
                        })
                      })
                  })
        if(expectedReplacementMaterial!=null){
          for(let i = 0; i < expectedReplacementMaterial.length; i++){
          const replacementtoMaterial = expectedReplacementMaterial[i];
            _modalView.findModuleClientArea()
                      .findModal()
                      .findModalBody()
                      .wrapElements()
                      .within(() => {
                          cy.get(".slick-container").last().within(() => {
                            cy.get(`div.column-id_${app.GridCells.MATERIAL_CODE}`).contains("div", replacementtoMaterial)
                              .scrollIntoView({ duration: 2000 })
                            cy.get(`div.column-id_${app.GridCells.MATERIAL_CODE}`).contains("div", replacementtoMaterial)
                              .as("replacementMaterial")
                              .click()
                            cy.wait(5000)
                            cy.get("@replacementMaterial").then(($val) => {
                              expect($val.text()).equal(replacementtoMaterial)
                            })
                          })
                      })
          }
        }
      
      }
    }
    _modalView.findModal()
              .acceptButton("Cancel")
  }

  verify_invoiceHeaderDetailsValues(container_UUID:string,subContainerText:string,contractTotal?:string,invoiced?:string,contractGross?:string,invoicedGross?:string){
    cy.get("body").then(($body) => {
      let length = $body.find(".cid_"+container_UUID+" .panel-title .ico-up").length;
      if (length > 0) {
        for (let index = 1; index <= length; index++) {
          cy.get(".cid_"+container_UUID+" .panel-title .ico-up")
            .eq(0)
            .click();
        }
        expect(parseFloat(contractTotal).toFixed(2)).to.not.equal(parseFloat("0").toFixed(2))
        expect(parseFloat(invoiced).toFixed(2)).to.not.equal(parseFloat("0").toFixed(2))
        expect(parseFloat(contractGross).toFixed(2)).to.not.equal(parseFloat("0").toFixed(2))
        expect(parseFloat(invoicedGross).toFixed(2)).to.not.equal(parseFloat("0").toFixed(2))
        cy.get(`[class="panel-title"] [class*="platform-form-group-header-text"]`)
          .contains(subContainerText)
          .click()
      }
    });
    if(subContainerText==="Allocation"){
      cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
        .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "Contract Total/CO")
        .then((ele) => {
          cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
            .eq(0)
            .invoke('val')
            .then(($value)=>{
                expect($value).equal(contractTotal)
            })
        });
      cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "Contract Total/Invoiced/%")
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(contractTotal)
              })
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(1)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(invoiced)
              })
            cy.wrap(ele).find(`[class*='${app.InputFields.DOMAIN_TYPE_DESCRIPTION}'] `)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                let fetchedPercent=parseFloat(($value.toString()).replace('%','')).toFixed(2)
                let convertContractTotal:any=parseFloat(contractTotal.replace(',','')).toFixed(2)
                let convertInvoiced:any=parseFloat(invoiced.replace(',','')).toFixed(2)
                let calculatePercent:any=(convertInvoiced/convertContractTotal)*100
                expect(fetchedPercent).equal(calculatePercent.toFixed(2))
              })
          });  
      cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "Contract Gross/CO Gross")
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(contractGross)
              })
          });
      cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "Contract Gross/Invoiced Gross/%")
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(contractGross)
              })
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(1)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(invoicedGross)
              })
            cy.wrap(ele).find(`[class*='${app.InputFields.DOMAIN_TYPE_DESCRIPTION}'] `)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                let fetchedPercent=parseFloat(($value.toString()).replace('%','')).toFixed(2)
                let convertContractGross:any=parseFloat(contractGross.replace(',','')).toFixed(2)
                let convertInvoicedGross:any=parseFloat(invoicedGross.replace(',','')).toFixed(2)
                let calculatePercent:any=(convertInvoicedGross/convertContractGross)*100
                expect(fetchedPercent).equal(calculatePercent.toFixed(2))
              })
          });
    }else if(subContainerText==="Reconciliation"){
        cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "From PES")
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(invoiced)
              })
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(2)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(invoicedGross)
              })
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(1)
              .invoke('val')
              .then(($value)=>{
                  let convertInvoced:any=parseFloat(invoiced.replace(',','')).toFixed(2)
                  let convertInvoicedGross:any=parseFloat(invoicedGross.replace(',','')).toFixed(2)
                  let calculateVAT:any=convertInvoicedGross-convertInvoced
                  expect(parseFloat($value.toString()).toFixed(2)).equal(calculateVAT.toFixed(2))
              })
          });
        cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "From Contract Items")
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(0)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(contractTotal)
              })
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(2)
              .invoke('val')
              .then(($value)=>{
                  expect($value).equal(contractGross)
              })
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
              .eq(1)
              .invoke('val')
              .then(($value)=>{
                  let convertContractTotal:any=parseFloat(contractTotal.replace(',','')).toFixed(2)
                  let convertContractGross:any=parseFloat(contractGross.replace(',','')).toFixed(2)
                  let calculateVAT:any=convertContractGross-convertContractTotal
                  expect(parseFloat($value.toString()).toFixed(2)).equal(calculateVAT.toFixed(2))
              })
          });
    }
  }
  
  verify_isCustomizeFormVisbilityChecked(container_UUID:string,labelName:string){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
               .findButton(btn.ToolBar.ICO_SETTINGS)
               .clickIn()
      cy.get(`[class*="popup-container"] [title="Settings"]`).click()
      cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+` [class*='${app.InputFields.FORM_CONTROL}'] `)
        .clear()
        .type(labelName)
      cy.get("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.LABEL)
        .contains(labelName)
        .click()
      cy.get(".active ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.VISIBLE)
        .find(commonLocators.CommonElements.CHECKBOX_INPUT)
        .as("check")
        .invoke('is', ':checked')
        .then(checked => {
            if (!checked) {
              cy.get('@check').check();
            }
        })
      _modalView.findModal().acceptButton(btn.ButtonText.OK)
  }

  verify_isContainerMinimized(container_UUID:string){
    cy.get("body")
      .then(($body) => {
        if ($body.find(".cid_"+container_UUID+` [class*='${app.Layouts.SUB_VIEW_HEADER_TOOLBAR}'] [class*='${btn.ToolBar.ICO_MINIMIZED_2}']`).length > 0) {
          _mainView.findModuleClientArea()
                   .findAndShowContainer(container_UUID)
                   .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                   .findButton(btn.ToolBar.ICO_MINIMIZED_2)
                   .clickIn();
        }
    });
  }

  verify_isContainerMaximize(container_UUID:string){
    cy.get("body")
      .then(($body) => {
        if ($body.find(".cid_"+container_UUID+` [class*='${app.Layouts.SUB_VIEW_HEADER_TOOLBAR}'] [class*='${btn.ToolBar.ICO_MAXIMIZED_2}']`).length > 0) {
          _mainView.findModuleClientArea()
                   .findAndShowContainer(container_UUID)
                   .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
                   .findButton(btn.ToolBar.ICO_MINIMIZED_2)
                   .clickIn();
        }
    });
  }

  verifyStatus_inCustomizing_withRFQ(uuid:string,checkboxCell:string,checkBoxValue: string,id:string[],quickstart1:string,module:string,wizard1:string,changeStatus:string){
     var status:string[]=[];
    for(var i=0; i < id.length; i++){
      _common.clickOn_cellHasUniqueValue(uuid,app.GridCells.ID_SMALL,id[i])
      _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.INSTANCES).findGrid().findActiveRow().getCell(checkboxCell).wrapElements()
               .find(commonLocators.CommonElements.CHECKBOX_TYPE).as("check").invoke('is', ':checked')
               .then(checked => {
                  if (checkBoxValue == "check") {
                     cy.log("checkbox is already checked")         
                    _common.getText_fromCell(uuid,app.GridCells.DESCRIPTION_INFO).then(($value)=>{
                      var data  = $value.text()
                      status.push(data)
                    })                                              
                  }   
               })
    }
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(quickstart1,module)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(wizard1,changeStatus)    
    cy.get(commonLocators.CommonElements.CHANGE_STATUS_VALUES).as('status').each(($status,index,$list)=>{                  
          cy.get('@status').contains(status[index]).should('be.visible')
                    
    })        
  }
    
  verify_activeRowFieldinPOpUp(gridCell:string,expectedValue:string)
  {
    _modalView.findModal()
              .findActiveRow()
              .getCell(gridCell)
              .wrapElements()
              .eq(0)
              .then(($ele) => {
              var ccQuantity = $ele.text()
              cy.log(ccQuantity)
              Cypress.env("GetTextValueFromPopUp", ccQuantity)
              expect(ccQuantity).to.contain(expectedValue)
    })
  }

 verify_SubtractionOfTwoFieldsWith_ThirdFieldInActiveRow(container_UUID:string,gridcell1:string,gridcell2:string,element3)
  {
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .getCell(gridcell1)
              .wrapElements()
              .then((element1) => {
              var ele1 = parseInt(element1.text())
              cy.log("element1" + ele1)
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .findActiveRow()
              .getCell(gridcell2)
              .wrapElements()
              .then((element2) => {
              var ele2 = parseInt(element2.text())
              var subtractedValue= ele2-ele1
              var subtractedValueString =subtractedValue.toString()
              cy.log("subtractedValueString" + subtractedValueString)
              expect(subtractedValueString).to.equals(parseInt(element3).toFixed(0))
              })
            })
  }    

  verify_controllingUnitInLookup(project: string, controllingUnit: string, goToModule: string) {

    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Create Requisition and/or Contract")
      .within(() => {
        _modalView.findInputLookup(app.InputFields.ICO_INPUT_LOOKUP, 5)
        cy.wait(1000)
      })
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Controlling Unit Code Search Dialog")
      .within(() => {
        _modalView.findInputFieldInsideModal("Project", app.InputFields.INPUT_GROUP_CONTENT)
                  .clear()
                  .type(project)
      })
      .then(() => {
        _modalView.select_popupItem("grid", project)
      })
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Controlling Unit Code Search Dialog")
      .within(() => {
        _modalView.findTextInput(app.InputFields.FORM_CONTROL)
                  .clear()
                  .type(controllingUnit)
      })
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Controlling Unit Code Search Dialog")
      .within(() => {
        _modalView.findButtonWithTitle("search")
                  .clickIn()
        _modalView.findGrid()
                  .findCellhasValue(app.GridCells.CODE, project)
                  .click()
      })
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Controlling Unit Code Search Dialog")
      .within(() => {
        _modalView.findGrid()
                  .findActiveRow()
                  .findCell(app.GridCells.TREE)
                  .wrapElements()
                  .within(() => {
                    cy.get(`span.control-icons`).click()
                  })
      })
    _modalView.findGrid()
              .findCellhasValue(app.GridCells.DESCRIPTION_CAPS, controllingUnit)
              .click()
              .within(($ele) => {
                const CUTEXT = $ele.text()
                expect(CUTEXT).equal(controllingUnit)
              })
    cy.wait(1000)          
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Controlling Unit Code Search Dialog")
      .within(() => {
        cy.get(`button.${btn.IconButtons.BTN_DEFAULT}`).contains("OK").click()
      })
    cy.wait(1000)          
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Create Requisition and/or Contract")
      .within(() => {
        cy.get(`button.${btn.IconButtons.BTN_DEFAULT}`).contains("OK").click()
      })
    cy.wait(3000)          
    cy.contains(`${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`, "Place Order Successfully")
      .within(() => {
        cy.get(`button.${btn.IconButtons.ICO_GO_TO}`).contains(goToModule).click()
      })
    cy.wait(1000)          
  }
  
  verify_overviewCheckedStatusForContract(container_UUID:string,envName:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .getCell(app.GridCells.COUNT)
             .wrapElements()
             .find(commonLocators.CommonElements.ICON_TICK)
             .each(($val,index,$list)=>{
                if(index!=0){
                  cy.wait(5000)
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(container_UUID)
                           .findGrid()
                           .findCellhasValue(app.GridCells.DESCRIPTION,Cypress.env((envName)+(index)))
                           .click()
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(container_UUID)
                           .findGrid()
                           .findActiveRow()
                           .getCell(app.GridCells.COUNT)
                           .wrapElements()
                           .find(commonLocators.CommonElements.ICON_TICK).should('be.visible')
                }                
            })
  }

  /* Verifying whether the billing schema is correctly getting in 
  procurement config modal after selecting the configuration */
  assertValueOf_billingSchemaIsGeneratedWithProcurementConfig(config:string,expectedText:string){
    _modalView.findModal()
              .findInputFieldInsideModal("Configuration",app.InputFields.INPUT_GROUP_CONTENT)
              .clear()
              .type(config)
    cy.wait(2000)
    _modalView.select_popupItem("grid",config)
    _modalView.findModal()
              .findInputFieldInsideModal("Billing Schema",app.InputFields.INPUT_GROUP_CONTENT)
              .should("have.value",expectedText)
    _modalView.findModal()
              .acceptButton(btn.ButtonText.OK)
    cy.wait(5000)
    cy.get("body").then(($body) => {
      if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.YES)
      }
    });
  }
 
  verify_budgetSpreadBasedOnBaseCost(containerUUID: string, itemDescription: string[], baseCostTotal: any[], budgetToSpread: any) {

    const baseCostConvertedNumbers = baseCostTotal.map((number) => parseFloat(number));
    cy.log("Base Costs are ==> " + baseCostConvertedNumbers)
    const baseCostSum: any = baseCostConvertedNumbers.reduce((acc, curr) => acc + curr, 0);
    cy.log("Sum of Base Costs is ==> " + baseCostSum)

    for (var i = 0; i < itemDescription.length; i++) {
      const ITEM = itemDescription[i]
      _common.select_rowHasValue(containerUUID, ITEM)
      _mainView.findActiveRow()
               .findCell(app.GridCells.BASE_COST_TOTAL)
               .wrapElements()
               .then(($ele) => {
                  const baseCostofItem: any = parseFloat($ele.text().replace(",", ""))
                  cy.log("Basecost of Item " + ITEM +" is ||==> " + baseCostofItem)
                  cy.log("Basecost Total is ||==> " + baseCostSum)
                  const calculatedBudgetofItem = ((baseCostofItem / baseCostSum) * parseFloat(budgetToSpread))
                  Cypress.env("ItemBudget", calculatedBudgetofItem)
                  cy.log("Calculated Budget is ||==> " + calculatedBudgetofItem)
                })
      _mainView.findModuleClientArea()
               .findAndShowContainer(containerUUID)
               .findActiveRow()
               .findCell(app.GridCells.BUDGET)
               .wrapElements()
               .then(($ele) => {
                  const totalBudgetofItem = parseFloat($ele.text().replace(",", ""))
                  cy.log("Budget Taken from Item " + ITEM +" ==> " + totalBudgetofItem)
                  expect(totalBudgetofItem.toFixed(2)).to.be.equal(parseFloat(Cypress.env("ItemBudget")).toFixed(2))
              })
    }
    return baseCostSum;
  }
  

  verify_isCertificateTypeUniqueAndMandatory(msg:string){
    cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+" ."+commonLocators.CommonElements.INVALID_CELL)
      .then($value=>{
        expect($value.text()).to.equal(msg)
      })
    
    cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+" ."+commonLocators.CommonElements.REQUIRED_CELL).should('be.visible')
  }
  
  verify_inputFieldVisibility(container_UUID,cellClass:string,visibiltiyType:string,inputClass?:string){
    if(visibiltiyType==="Visible"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(cellClass)
               .wrapElements()
               .find("input[class*='"+inputClass+"']")
               .should('be.visible')
    }else if(visibiltiyType==="notVisible"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(cellClass)
      cy.wait(1000)
      cy.get(".cid_"+container_UUID+" .active [class*='"+commonLocators.CommonElements.CELL_READONLY+"']"+"."+commonLocators.CommonElements.COLUMN_ID+cellClass)
        .should('be.visible')
    }else if(visibiltiyType==="notVisibleRow"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(cellClass)
      cy.wait(1000)
      cy.get(".cid_"+container_UUID+" .active[class*='"+commonLocators.CommonElements.ROW_READONLY+"']"+" ."+commonLocators.CommonElements.COLUMN_ID+cellClass)
        .should('exist')
    }
    else if(visibiltiyType==="notVisibleColumn"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(cellClass)
      cy.wait(1000)
      cy.get(".cid_"+container_UUID+" .active [class*='"+commonLocators.CommonElements.COLUMN_READONLY+"']"+"."+commonLocators.CommonElements.COLUMN_ID+cellClass)
        .should('exist')
    }else if(visibiltiyType==="inputShouldNotExist"){
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .findActiveRow()
               .findCell(cellClass)
               .wrapElements()
               .find("input[class*='"+inputClass+"']")
               .should('not.exist')
    }
  }
  verifyProcurementConfig_inChangeProcurementConfigPopup(desc:string[],description:string,module:string,wizardOption:string){
    var popUpValue:string[]=[];
    for(var i=0; i < desc.length; i++){
        _common.openTab(app.TabBar.HEADER).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
          
        });
        _common.clear_subContainerFilter(cnt.uuid.CONFIGURATION_HEADER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO,desc[i])
        cy.wait(500)
        _common.openTab(app.TabBar.HEADER).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 0);
         
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, description)        
        _common.clickOn_cellInSubContainer(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        cy.wait(1000)
        _common.getText_fromCell(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO).then(($value)=>{
          var data = $value.text()
          popUpValue.push(data)       
         
        })
    }
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,module)
    cy.wait(3000)
    cy.REFRESH_CONTAINER()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,wizardOption)
    _modalView.findModal()
              .caret()
          cy.get("div.popup-content").within(() => {
            cy.get(commonLocators.CommonElements.DESC).as('value').each(($status,index,$list)=>{  
      //cy.get(app.GridCells.DESC).as('value').each(($status,index,$list)=>{                  
              cy.get('@value').contains(popUpValue[index]).should('be.visible')
                      
            })
          })       
  }
          
  verify_VATCalculation(container_UUID:string,vatPercent:string){
    let netvalue:any
    let vat:any
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.VALUE_NET)
             .wrapElements()
             .then(($value)=>{
                netvalue=parseFloat(($value.text()).replace(",","")).toFixed(2)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.VALUE_TAX)
             .wrapElements()
             .then(($value)=>{
                vat=parseFloat(($value.text()).replace(",","")).toFixed(2)
                let convertedVatPer:any=parseFloat(vatPercent.replace(",","")).toFixed(2)
                let calculatedVAT:any=netvalue*(convertedVatPer/100)
                expect(parseFloat(calculatedVAT).toFixed(2)).equal(vat)
             })
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.GROSS)
             .wrapElements()
             .then(($value)=>{
                let gross:any=parseFloat(($value.text()).replace(",","")).toFixed(2)
                let calculatedGross:any=(+netvalue)+(+vat)
                expect(parseFloat(calculatedGross).toFixed(2)).equal(gross)
             })
  }
  /* Verifying the business partner grid Total price in price comparison(BoQ) container 
  with final price */
  verify_isTotalsInPriceComparisonEqualToFinalPrice(container_UUID:string,attributeValue:string,expectedValue:string)
  {
    _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .wrapElements()
            .get(`.active [style="${attributeValue}"]`)
            .invoke("text")
            .then((netValueText) => {
            expect(netValueText).to.equal(expectedValue);
            //.should("equal",expectedValue)
            })
  }

  verify_changeOrdercontracts_ShouldNotbe_inPEScontractLookup(uuid,gridCells,popupGridCell,expectedValue){
    _mainView.findModuleClientArea()
            .findAndShowContainer(uuid)
            .findGrid()
            .findActiveRow()
            .findCell(gridCells)
            .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
            _modalView.findModal()
            .getCell(popupGridCell)
            .wrapElements()
            .each(($ele) => {
              var GetTextValue = $ele.text()
              cy.log(GetTextValue)
              expect(GetTextValue).to.not.contain(expectedValue)

            })
            _modalView.findModal().acceptButton('Cancel')
  }

  createNewRecord_IfRowDoesNotHaveValue(uuid,gridCells,Value)
  {
    _mainView.findModuleClientArea()
              .findAndShowContainer(uuid)
              .findGrid()
              .getCell(gridCells)
              .wrapElements()
              .each(($ele) => {
              var GetTextValue = $ele.text()
              if(GetTextValue===Value)
              {
                console.log("Already Present")
              }
              else{
                _common.create_newRecord(uuid)
              }
            })
  }
getButton(Buttontext:string) {
  return cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS)
           .contains('button',Buttontext)
}

verify_isButtonDisabled(Buttontext:string) {
  return this.getButton(Buttontext)
             .should('be.disabled')
}
verify_isButtonEnabled(Buttontext:string) {
  return this.getButton(Buttontext)
             .should('not.be.disabled')
}
verifyMilestoneType_unique(labelName:string,milestone_Type:string){
  _modalView.findModal()
            .wrapElements()
            .within(() => {
            cy.contains("The Milestone type should be unique").should("be.visible");
      });
  cy.wait(1000);  
  _modalView.findModalBody()
            .searchInModal(app.InputFields.INPUT_GROUP_CONTENT,labelName,milestone_Type)
          cy.wait(1000)
  _modalView.select_popupItem("list", milestone_Type);
          cy.wait(2000)
  _modalView.findModal().acceptButton("OK");
  } 

  verify_recordNotPresentInContainer(container_UUID:string,value:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .wrapElements()
             .then(($cell) => {
                cy.wrap($cell)
                  .contains(".slick-container div", value).should("not.exist")
             })
  }
  verify_estimatePriceUnderMaterialRecord(uuid:string,price:string,discount:string,charges:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(uuid)
             .findGrid()
             .findActiveRow()
             .getCell(app.GridCells.ESTIMATE_PRICE)
             .wrapElements()
             .then(($value)=>{
               let retailPrice:any=parseFloat(price).toFixed(2)
               let discountPercent:any=parseFloat(discount).toFixed(2)
               let charge:any=parseFloat(charges).toFixed(2)
               let estimatePrice:any=parseFloat($value.text()).toFixed(2)
               let amountCalculated:any= retailPrice - (retailPrice * (discountPercent/100)) + parseFloat(charge)
               expect(parseFloat(amountCalculated).toFixed(2)).to.equal(estimatePrice)
    })
  }



verify_CreatePESforExistingPESandGoToPES() {
  _modalView.findModal()
            .wrapElements()
            .within(() => {
            cy.contains("PES(s) already existed").should("be.visible");
            });
  cy.wait(3000);
  _modalView.findModal().acceptButton("Yes")
  _modalView.findModal().acceptButton("Go To PES");
}

/* Verifying the version increased by one */
verify_isVersionIncreased(value:any,container_UUID:string)
{
  const increasedValue = parseInt(value) + 1;
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .getCell(app.GridCells.QUOTE_VERSION)
           .wrapElements().invoke("text")
           .then((text)=> {
            const expectedVersion = parseInt(text);
            expect(increasedValue).to.equal(expectedVersion);
           })    
}
verify_overviewCheckedStatusForNOTICK(container_UUID:string,envName:string){
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .getCell(app.GridCells.COUNT)
           .wrapElements()
           .find(commonLocators.CommonElements.NO_TICK)
           .each(($val,index,$list)=>{
              if(index!=0){
                cy.wait(5000)
                _mainView.findModuleClientArea()
                         .findAndShowContainer(container_UUID)
                         .findGrid()
                         .findCellhasValue(app.GridCells.DESCRIPTION,Cypress.env((envName)+(index)))
                         .click()
                _mainView.findModuleClientArea()
                         .findAndShowContainer(container_UUID)
                         .findGrid()
                         .findActiveRow()
                         .getCell(app.GridCells.COUNT)
                         .wrapElements()
                         .find(commonLocators.CommonElements.NO_TICK).should('be.visible')
              }                
       })
  }

verify_dataUnderFilter(container_UUID:string,cellType:string,cellInputType:string,popUpType:string,value:string,recordType?:string,containerPosition?:number){
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID, containerPosition)
           .findGrid()
           .findActiveRow()
           .findCell(cellType, recordType)
           .findTextInput(cellInputType)
           .wait(2000)
           .clear()
           .type(value)
           .then(() => {
              cy.wait(2000) // This wait is necessary
              cy.get(".popup-container")
                .within(() => {
                  switch (popUpType) {
                    case "list".toLowerCase():
                      cy.contains("li", value).should("be.visible")
                      break;
                    case "grid":
                      cy.get("div.popup-content").within(() => {
                        cy.wait(1000)
                        cy.get(`div[class*='column-id']`).each(($cell) => {
                          const cellField: string = $cell.text();
                          if (value === cellField) {
                            cy.wait(1000);
                            cy.wrap($cell).should("be.visible")
                            cy.wait(2000);
                            return false;
                          }
                        });
                      });
                      break;
                    case "grid1".toLowerCase():
                      cy.contains("button", value).should("be.visible")
                      break;
                    case "span".toLowerCase():
                      cy.contains("span", value).should("be.visible")
                      break;
                    default:
                      cy.log("No matching values found.");
                  }
                });
           });
}

verify_dataUnderStructurelookups(container_UUID:string,cellClass:string,modalCellClass:string,value:string){
  cy.wait(2000)
   _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(cellClass)
            .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
  _modalView.findModal().acceptButton('Refresh')
  _modalView.findModal()
            .findTextInput(app.InputFields.FORM_CONTROL)
            .eq(0)
            .clear()
            .type(value)
  _modalView.findModal()
            .findButton(btn.IconButtons.ICO_SEARCH)
            .clickIn()
  cy.wait(3000)
  _modalView.findModal()
            .findCellhasValue(modalCellClass,value)
            .should('exist')
            .click()
  _modalView.findModal()
            .acceptButton('OK') 
}


verify_dataUnderMaterialLookups(container_UUID:string,cellClass:string,value:string){
  cy.wait(2000)
   _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(cellClass)
            .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
  _modalView.findModal().acceptButton('Refresh')
  _modalView.findModal()
            .wrapElements()
            .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
            .clear({ force: true })
            .type(value)
  _modalView.findModal()
            .findButton(btn.IconButtons.ICO_SEARCH)
            .wrapElements()
            .eq(0)
            .click()
  _modalView.findModal()
            .wrapElements()
            .find('[class*="item-title"]')
            .contains(value)
            .should('exist')
  _modalView.findModal()
            .acceptButton('OK') 
}
verify_dataUnderHeaderTextDescription(container_UUID:string,value:string){

  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID).wrapElements().then(() => {
          
            cy.get("[class='ql-container ql-snow']").click()
            cy.get("[style*='font-size']").eq(0).clear()
            cy.get("[style*='font-size']").eq(0).type(value)
            cy.wait(1000) 
            cy.SAVE()
          
    })

            cy.REFRESH_CONTAINER()
            cy.wait(1000) 
  _common.select_rowHasValue(container_UUID,"Order Text")
            cy.get("[class='ql-container ql-snow']").contains(value).should('exist')

  _common.select_rowHasValue(container_UUID,"Supplier Text")
            cy.get("[class='ql-container ql-snow']").contains(value).should('not.exist')
}

/* Verifying the result using fractional product calculation-->Aditya*/
verify_isCalculateFractionalProduct(container_UUID:string,value1:any,value2:any,value3:any,cellClass:string)
{
  const result = (value1 * value2) / value3;
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass).wrapElements()
           .invoke('text')
           .then((text) => {
              const actualResult = parseFloat(text.replace(/,/g, ''));
              expect(actualResult.toFixed(2)).to.equal(result.toFixed(2));
           });
}

verify_ItemTypeItemType2ANNandAGN(uuid:string,index:number){
  _common.getText_fromCell(uuid,app.GridCells.AAN).then(($val)=>{
    if(index==0){
        startingAANValue=parseInt($val.text())
        _common.assert_cellData_insideActiveRow(uuid,app.GridCells.BAS_ITEM_TYPE_FK,"Standard")
        _common.assert_cellData_insideActiveRow(uuid,app.GridCells.BAS_ITEM_TYPE_2_FK,"Base")    
    }if (index==1) {
        endingAANValue=parseInt($val.text())
        _common.assert_cellData_insideActiveRow(uuid,app.GridCells.BAS_ITEM_TYPE_FK,"Standard")
        _common.assert_cellData_insideActiveRow(uuid,app.GridCells.BAS_ITEM_TYPE_2_FK,"Alternative")
    }
   
}).then(()=>{
    if(index>1){
        incrementAANBy=((+endingAANValue)-(+startingAANValue))
        _common.getText_fromCell(uuid,app.GridCells.AAN).then(($val)=>{
            let incrementedValue=(+parseInt(endingAANValue))+(+parseInt(incrementAANBy))
            _common.assert_forNumericValues(uuid,app.GridCells.AAN,incrementedValue.toString())
            startingAANValue=endingAANValue
            endingAANValue=parseInt($val.text())
            _common.assert_cellData_insideActiveRow(uuid,app.GridCells.BAS_ITEM_TYPE_FK,"Standard")
            _common.assert_cellData_insideActiveRow(uuid,app.GridCells.BAS_ITEM_TYPE_2_FK,"Alternative")
        })
    }      
})    
}

/* Verify the linear expression calculation-->Aditya */
verify_isCalculateLinearExpression(container_UUID:string,value1:any,value2:any,value3:any,cellClass:string)
{
  const result = parseFloat(value1.replace(/,/g, '')) + (parseFloat(value2.replace(/,/g, '')) * parseFloat(value3.replace(/,/g, '')));
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass).wrapElements()
           .invoke('text')
           .then((text) => {
              const actualResult = parseFloat(text.replace(/,/g, ''))
              expect(actualResult.toFixed(2)).to.equal(result.toFixed(2));
           });
}
verify_sourceBoQ_label(container_UUID:string,labelName:string,expValue:string){
  _mainView.findModuleClientArea()
  .findAndShowContainer(container_UUID).wrapElements()
  .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,labelName).closest(commonLocators.CommonElements.ROW).within((Text)=>{
    cy.wrap(Text).find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']").then(($val)=>{
      expect($val.text()).equal(expValue)
    })
  })
}

/* To compare the two array*/
verify_isArrayEquals(array1: string[], array2: string[]) {
  array2.forEach((arrElement) => {
    expect(array1).to.contain(arrElement);
  });
}

verify_changesFound(data:DataCells){
  let reg = /^\s+|\s+$/g; 
  if (data[app.GridCells.MATERIAL_CODE_SMALL]) {
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.MATERIAL_CODE_SMALL)
              .contains(data[app.GridCells.MATERIAL_CODE_SMALL])
              .click()
              .then(($el)=>{
 
                if (data[app.GridCells.MATERIAL_CODE_SMALL]) {
                  _modalView.findModal()
                            .findModalBody()
                            .wrapElements()
                            .find(".active"+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.MATERIAL_CODE_SMALL)
                            .then(($val)=>{
                              expect(data[app.GridCells.MATERIAL_CODE_SMALL]).equals($val.text().replace(reg,""))
                            })
                }
                if (data[app.GridCells.QUANTITY_DELIVERED]) {
                  cy.wait(2000)
                  _modalView.findModal()
                            .findModalBody()
                            .wrapElements()
                            .find(".active"+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.QUANTITY_DELIVERED)
                            .then(($val)=>{
                              expect(parseFloat(data[app.GridCells.QUANTITY_DELIVERED]).toFixed(3)).equals(parseFloat(($val.text()).replace(",",'')).toFixed(3))
                            })
                }
              })
  }if (data[app.GridCells.BOQ_BRIEF]) {
    _modalView.findModal()
              .findModalBody()
              .wrapElements()
              .find("."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.BOQ_BRIEF)
              .then(($el)=>{
                cy.wrap($el)
                  .contains(data[app.GridCells.BOQ_BRIEF])
                  .click()
                if (data[app.GridCells.BOQ_BRIEF]) {
                  _modalView.findModal()
                            .findModalBody()
                            .wrapElements()
                            .find(".active"+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.BOQ_BRIEF)
                            .then(($val)=>{
                              expect(data[app.GridCells.BOQ_BRIEF]).equals($val.text().replace(reg,""))
                            })
                }
                if (data[app.GridCells.QUANTITY_DELIVERED]) {
                  cy.wait(2000)
                  _modalView.findModal()
                            .findModalBody()
                            .wrapElements()
                            .find(".active"+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.QUANTITY_DELIVERED)
                            .then(($val)=>{
                              expect(parseFloat(data[app.GridCells.QUANTITY_DELIVERED]).toFixed(3)).equals(parseFloat(($val.text()).replace(",",'')).toFixed(3))
                            })
                }
              })
  }
}


verify_TotalGross(container_UUID:string,value1:string,value2:string,cellClass:string)
{
  const result = ((parseFloat(value1) * parseFloat(value2)) /100)+(parseFloat(value2));
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass).wrapElements()
           .invoke('text')
           .then((text) => {
            cy.log(text)
              const actualResult = parseFloat(text.replace(/,/g, ''));
          
              expect(actualResult.toFixed(2)).to.equal(result.toFixed(2));
           });
}



verify_translationValue(container_UUID:string,data:DataCells) {
  if (data[app.GridCells.LANG_NAME]) {
    Object.keys(data[app.GridCells.LANG_NAME]).forEach((key)=>{
      _common.clickOn_cellHasUniqueValue(container_UUID,app.GridCells.LANG_NAME,key)
      _common.assert_cellData_insideActiveRow(container_UUID,app.GridCells.COL_10,data[app.GridCells.LANG_NAME][key])
    })
  } 
  
}

verify_materialInMaterialLookup_withOnlyFrameworkCatalog(materialCode:string){
  _materialPage.clickOn_modalButtons(commonLocators.CommonLabels.MATERIAL_SEARCH,btn.ButtonText.REFRESH)
    cy.wait(1000)  
  _modalView.findCheckbox_byLabelnModal("1", "Only Framework Catalog", 0).check()
  _materialPage.search_MaterialNo_FromLookup(materialCode)
    cy.wait(1000)    
    cy.contains(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS, commonLocators.CommonLabels.MATERIAL_SEARCH)
      .within(() => {
        cy.get(commonLocators.CommonElements.MATERIAL_ROW).contains(commonLocators.CommonElements.MATERIAL_TITLE, materialCode)
          .as('material')
          .click({ force: true })      
        cy.wait(3000)
        _modalView.findModalBody()
                  .wrapElements()
                  .find(commonLocators.CommonElements.TITLE)
                  .contains(materialCode)
                  .should('exist')
    })
}

  verifyCalculationForRejection(Container_UUID: string) {
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, "PES")
    cy.wait(1000)
    _common.getText_fromCell(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET).then(($ele) => {
      var PES_PRICE = parseFloat($ele.text().replace(",", ""))
      Cypress.env("PES_PRICE_UNIT", PES_PRICE)
      cy.log("PES Total IS :" + Cypress.env("PES_PRICE_UNIT"))
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, "Rejections")
    _common.getText_fromCell(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET).then(($ele2) => {
      var REJECTION_PRICE = parseFloat($ele2.text().replace(",", ""))
      Cypress.env("REJECTION_PRICE_RATE", REJECTION_PRICE)
    })
    cy.wait(500).then(() => {
      cy.log("Rejection Total IS :" + Cypress.env("REJECTION_PRICE_RATE"))
    })
    cy.wait(500).then(() => {
      const num1 = Number(Cypress.env("PES_PRICE_UNIT"));
      const num2 = Number(Cypress.env("REJECTION_PRICE_RATE"));
      // Check if the conversion is successful (optional)
      if (isNaN(num1) || isNaN(num2)) {
        console.error("Invalid environment variable values for NUM1 and/or NUM2.");
      } else {
        // Perform the addition
        const sum = num1 + num2;
        console.log("The sum of NUM1 and NUM2 is:", sum);
      }
    })
    cy.wait(500).then(() => {
      const AddedResult = (Cypress.env("PES_PRICE_UNIT")) + (Cypress.env("REJECTION_PRICE_RATE"))
      cy.log("Addition Total IS :" + AddedResult)
      Cypress.env("AdditionPrice", AddedResult)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, "Amount")
    _common.getText_fromCell(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET).then(($ele) => {
      var Amount_PRICE = parseFloat($ele.text().replace(",", ""))
      Cypress.env("Amount_RATE", Amount_PRICE)
      cy.log("Amount Total IS :" + Cypress.env("Amount_RATE"))
    })
    cy.wait(500).then(() => {
      const subtractedValue = (Cypress.env("Amount_RATE")) - (Cypress.env("AdditionPrice"))
      cy.log("Subtraction Total IS :" + subtractedValue)
      Cypress.env("SubtractionPrice", subtractedValue)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, "Balance")
    _common.getText_fromCell(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET).then(($ele) => {
      var Balance_PRICE = parseFloat($ele.text().replace(",", ""))
      Cypress.env("Balance_PRICE", Balance_PRICE)
      cy.log("Balance Total IS :" + Cypress.env("Balance_PRICE"))
      expect(Cypress.env("Balance_PRICE")).to.equal(Cypress.env("SubtractionPrice"))
    })
  }

  verify_isRecordNotEditable(container_UUID: string,gridCells:string,index:number) {
     _mainView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .findGrid()
              .getCell(gridCells)
              .wrapElements()
              .eq(index)
              .should("not.have.class","input-group-content")
  }

verify_DivisionOfTwoValues_AndCompareWithThirdValue(Container_UUID: string,value1: string, value2: string,cellClass: string) {
  
  const expResult = (parseFloat(value1) / parseFloat(value2)) /10
  cy.log("expresult",expResult)
  _mainView.findModuleClientArea()
           .findAndShowContainer(Container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass)
           .wrapElements().invoke("text")
           .then((text) => {
           const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
           expect(actResult).to.equal(expResult.toFixed(2));
         })
  }


  verify_FractionalProductofThree_CompareWithThirdValue(container_UUID:string,value1:string,value2:string,value3:string,cellClass:string){
    const result = (parseFloat(value1) * parseFloat(value2) )* parseFloat(value3);
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid().findActiveRow()
             .getCell(cellClass).wrapElements()
             .invoke('text')
             .then((text) => {
              cy.log(text)
                const actualResult = parseFloat(text.replace(/,/g, ''));
            
                expect(actualResult.toFixed(2)).to.equal(result.toFixed(2));
             });
  }

  verify_FractionalProductofTwo_AndCompareWithThirdValue(container_UUID:string,value1:string,value2:string,cellClass:string){
  const result = (parseFloat(value1) * parseFloat(value2) );
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass).wrapElements()
           .invoke('text')
           .then((text) => {
            cy.log(text)
              const actualResult = parseFloat(text.replace(/,/g, ''));
          
              expect(actualResult.toFixed(2)).to.equal(result.toFixed(2));
           });
}

verify_recordNotPresentInmodal(value:string){
  _modalView.findModal()
            .wrapElements()
            .then(($cell) => {
              cy.wrap($cell)
                .contains(".slick-container div", value).should("not.exist")
           })
}
  /* Verifying the cost in meterial records */
  verify_materialRecordCalculation(value1: string, value2: string, value3: string, value4: string, container_UUID: string, cellClass: string, envVarName: string) {
    const result = parseFloat(value1.replace(/,/g, '')) * (100 - parseFloat(value2.replace(/,/g, ''))) / 100 + parseFloat(value3.replace(/,/g, '')) + parseFloat(value4.replace(/,/g, ''))
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid().findActiveRow()
             .getCell(cellClass).wrapElements()
             .invoke('text')
             .then((text) => {
               const actualResult = parseFloat(text.replace(/,/g, ''))
               expect(Cypress.env(envVarName, actualResult.toFixed(2))).to.equal(result.toFixed(2));
            })
  }


verify_modalTextShouldNotExist(value: string, ){
  _modalView.findModal()
            .wrapElements()
            .contains(value, { matchCase: false });     
}
verify_recordShouldNotExistInSubcontainer(container_UUID) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .wrapElements()
           .find("[class*='grid-canvas grid-canvas-top grid-canvas-right']")
           .then(($ele) => {
              expect($ele.find("[class*='ui-widget-content']").length).to.not.greaterThan(0)
           });
}

/* Verify data under dropdown using lookup */
verify_dataUnderCaret(container_UUID:string,cellType:string,popUpType:string,value:string,recordType?:string,containerPosition?:number){
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID, containerPosition)
           .findGrid()
           .findActiveRow()
           .findCell(cellType, recordType)
           .caret().wrapElements()
           .wait(2000)
           .then(() => {
              cy.wait(2000) // This wait is necessary
              cy.get(".popup-container")
                .within(() => {
                  switch (popUpType) {
                    case "list".toLowerCase():
                      cy.contains("li", value).should("be.visible")
                      break;
                    case "grid":
                      cy.get("div.popup-content").within(() => {
                        cy.wait(1000)
                        cy.get(`div[class*='column-id']`).each(($cell) => {
                          const cellField: string = $cell.text();
                          if (value === cellField) {
                            cy.wait(1000);
                            cy.wrap($cell).should("be.visible")
                            cy.wait(2000);
                            return false;
                          }
                        });
                      });
                      break;
                    case "grid1".toLowerCase():
                      cy.contains("button", value).should("be.visible")
                      break;
                    case "span".toLowerCase():
                      cy.contains("span", value).should("be.visible")
                      break;
                    default:
                      cy.log("No matching values found.");
                  }
                });
           });
}
  verify_isRecordAddedInActualCertificateDetails(container_UUID:string,labelName:string,bpName:string){
    cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
        .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, labelName)
        .then((ele) => {
          cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
            .eq(0)
            .invoke('val')
            .then(($value)=>{
                expect($value).equal(bpName)
            })
        });
  }
  verify_isRecorDeletedInActualCertificateDetails(container_UUID:string,labelName:string,value:string){
    cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
          .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, labelName)
          .then((ele) => {
            cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
                        .eq(0)
                        .invoke('val')
                        .then(($value)=>{
                          expect($value).not.equal(value)
                        })                     
                        
                      })     
   
          
  }
    verify_dataUnderFilterInputInActualCertificateDetails(container_UUID:string,labelName:string,value:string,popUpType:string){
      cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
            .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, labelName)
            .then((ele) => {
              cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
                          .clear()
                          .type(value)
              cy.get(".popup-container").within(() => {
              switch (popUpType) {
                case "list".toLowerCase():
                    cy.contains("li", value).should("be.visible")
                break;
                case "grid":
                    cy.get("div.popup-content").within(() => {
                        cy.wait(1000)
                        cy.get(`div[class*='column-id']`).each(($cell) => {
                          const cellField: string = $cell.text();
                          if (value === cellField) {
                            cy.wait(1000);
                            cy.wrap($cell).should("be.visible")
                            cy.wait(2000);
                            return false;
                          }
                        });
                      });
                      break;
                    case "grid1".toLowerCase():
                      cy.contains("button", value).should("be.visible")
                      break;
                    case "span".toLowerCase():
                      cy.contains("span", value).should("be.visible")
                      break;
                    default:
                      cy.log("No matching values found.");
                  }
                });
                
            });
      }

      verify_contactsFilterInRequisition(container_UUID:string,cellClass:string,labelName:string,name:string){
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID)
                 .findGrid()
                 .findActiveRow()
                 .findCell(cellClass)
                 .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)  
               cy.wait(2000)
        _modalView.findModalBody()
                  .searchInModal_byDataNG_Selector(labelName,name)
        _modalView.findModalBody()
                  .findButtonWithTitle("search")
                  .clickIn()
        
    }
    
    verify_createRequisitionFromCartData(data:DataCells){
      cy.wait(2000) // Added this wait as modal take time to load
      _modalView.findModal()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.DESCRIPTION)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele)=>{
                  cy.wrap($ele)
                    .find("[class*='"+app.InputFields.DOMAIN_TYPE_DESCRIPTION+"']")
                    .invoke('val')
                    .then((value)=>{
                      Cypress.env("TICKET_ORDER",value)
                    })
                })
      _modalView.findModal()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele)=>{
                  cy.wrap($ele)
                    .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                    .eq(0)
                    .invoke('val')
                    .then((value)=>{
                      expect(value).equals(data[commonLocators.CommonLabels.PROJECT])
                    })
                })
      _modalView.findModal()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonElements.PROC_STRUCTURE)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele)=>{
                  cy.wrap($ele)
                    .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                    .eq(0)
                    .invoke('val')
                    .then((value)=>{
                      expect(value).equals(data[commonLocators.CommonElements.PROC_STRUCTURE])
                    })
                })
      _modalView.findModal()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.REQUISITION_OWNER)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele)=>{
                  cy.wrap($ele)
                    .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                    .eq(0)
                    .invoke('val')
                    .then((value)=>{
                      expect(value).equals(data[commonLocators.CommonLabels.REQUISITION_OWNER])
                    })
                })
      _modalView.findModal()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.RESPONSIBLE)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele)=>{
                  cy.wrap($ele)
                    .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                    .eq(0)
                    .invoke('val')
                    .then((value)=>{
                      expect(value).equals(data[commonLocators.CommonLabels.RESPONSIBLE])
                    })
                })
      _modalView.findModal()
                .wrapElements()
                .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.CONTROLLING_UNIT)
                .closest(commonLocators.CommonElements.ROW)
                .within(($ele)=>{
                  cy.wrap($ele)
                    .find("[class*='"+app.InputFields.INPUT_GROUP_CONTENT+"']")
                    .eq(0)
                    .clear()
                    .type(data[commonLocators.CommonLabels.CONTROLLING_UNIT])
                    .then(()=>{
                      cy.document()
                        .its('body')
                        .find(".popup-container")
                        .within(()=>{
                          cy.get("div.popup-content").within(() => {
                            cy.wait(1000)
                            cy.get(`div[class*='column-id']`).each(($cell) => {
                              const cellField: string = $cell.text();
                              if (data[commonLocators.CommonLabels.CONTROLLING_UNIT] === cellField) {
                                cy.wait(1000);
                                cy.wrap($cell).click({ force: true });
                                cy.wait(2000);
                                return false;
                              }
                            });
                          });
                        }) 
                    })  
                })      
    }

    verify_modalTitle(title:string){
      _modalView.findModal()
                .wrapElements()
                .find(commonLocators.CommonModalElements.MODAL_TITLE)
                .should("have.text",title)
    }

      /* Verify the price list under material lookup using price lists icon(dropdown) */
      verify_priceListUnderMaterialLookUp(searchValue:string,popUpType:string,value:string,price:string)
      {
        _modalView.findModal().acceptButton(btn.ButtonText.REFRESH)
        _modalView.findModal()
                  .findTextInput("ms-sv-"+app.InputFields.SEARCH_BUTTON_TEXT)
                  .clear()
                  .type(searchValue)
        _modalView.findModal()
                  .findButton(btn.IconButtons.ICO_SEARCH)
                  .clickIn()
                  cy.wait(3000)//wait is necessary
                    cy.get("[class*='modal-dialog'] .ms-commodity-row .ico-pricelist")
                      .click({force:true})
                      cy.get(".popup-container").within(() => {
                        switch (popUpType) {
                          case "list".toLowerCase():
                              cy.contains("li", value).should("be.visible").click()
                          break;
                          case "grid":
                              cy.get("div.popup-content").within(() => {
                                  cy.wait(1000)
                                  cy.get(`div[class*='column-id']`).each(($cell) => {
                                    const cellField: string = $cell.text();
                                    if (value === cellField) {
                                      cy.wait(1000);
                                      cy.wrap($cell).should("be.visible").click()
                                      cy.wait(2000);
                                      return false;
                                    }
                                  });
                                });
                                break;
                              case "grid1".toLowerCase():
                                cy.contains("button", value).should("be.visible").click()
                                break;
                              case "span".toLowerCase():
                                cy.contains("span", value).should("be.visible").click()
                                break;
                              default:
                                cy.log("No matching values found.");
                            }
                          });
                          cy.get(".ms-commodity-row-price [title='Cost']")
                            .invoke("text").then((actualPrice)=>{
                            cy.wait(500)
                            expect(actualPrice).equal(parseFloat(price).toFixed(2).toString())
                          })
        _modalView.findModal().acceptButton(btn.ButtonText.OK)
      }
      verify_enhancedSearch(parentElement:string,item:string,value:string,filterName:string){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`)
          .find(commonLocators.CommonElements.SIDEBAR)
          .within(()=>{
            cy.get(commonLocators.CommonElements.SEARCH).eq(1).click({force:true})
            cy.wait(1000)
            cy.get(commonLocators.CommonElements.RULE+` [class*='${app.GridCellIcons.ICONS_ICO_MENU}']`).click()
          })
        .then(()=>{
          cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS)
            .within(()=>{
              cy.wait(4000)
              cy.get(commonLocators.CommonElements.TABLE_SELECTION)
                .find(commonLocators.CommonElements.SUBVIEW)
                .eq(0).contains('[class*=column-id_name]',parentElement)
                .click({force:true})
              cy.wait(1000)
              cy.get(commonLocators.CommonElements.RIGHT_COLUMN)
                .eq(1)
                .find(commonLocators.CommonElements.NAME).type(item)
              cy.get(commonLocators.CommonElements.LEFT_COLUMN)
                .eq(1).find(commonLocators.CommonElements.SEARCH_ICON)
                .click()
            _modalView.acceptButton(btn.ButtonText.OK)
          })
        })
        .then(()=>{
          cy.get(`#${app.Layouts.MAIN_CONTAINER}`)
            .find(commonLocators.CommonElements.SIDEBAR).within(()=>{
              cy.get(commonLocators.CommonElements.RULE_OPERAND).find(commonLocators.CommonElements.RULE_DESCRIPTION).clear().type(value)
              cy.get(commonLocators.CommonElements.SEARCH_BUTTON).click({force:true})        
           })
           cy.wait(2000)
           cy.get(commonLocators.CommonElements.GROUP_BTN).find(commonLocators.CommonElements.ICO_MENU).eq(0).click({force:true})
           cy.get(commonLocators.CommonElements.DROPDOWN_MENU).contains("li","Save As").click()
           cy.wait(2000)
           _modalView.findModal().findInputFieldInsideModal("Filter Name",app.InputFields.FORM_CONTROL).type(filterName)
           _modalView.acceptButton("Save")
                     
        })       
        cy.wait(2000)
        cy.REFRESH_CONTAINER()     

      }
      verify_createSearchForm(desc1:string,desc2:string,value?:string){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`).find(commonLocators.CommonElements.SIDEBAR).within(()=>{
            cy.get(commonLocators.CommonElements.SEARCH).eq(1).click({force:true})      
            cy.wait(2000)     
            cy.get(commonLocators.CommonElements.GROUP_BTN).find(commonLocators.CommonElements.ICO_MENU).eq(0).click({force:true})
            cy.wait(2000)
            cy.get(commonLocators.CommonElements.DROPDOWN_MENU).contains("li","Create search form...").click()
            cy.wait(2000)
        })
        cy.wait(2000)
       // _modalView.findModal().findInputFieldInsideModal("Description",app.InputFields.DOMAIN_TYPE_COMMENT).type(desc1)
       //cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS).find(`textarea`).type(desc1,{force:true})
       cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS).find(`textarea`).type(desc1,{force:true})
       cy.wait(2000)
       cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS).find(`[class*='${app.InputFields.DOMAIN_TYPE_DESCRIPTION}']`).type(desc2,{force:true})
        /* _modalView.findModal().findInputFieldInsideModal("Search Form Name",app.InputFields.DOMAIN_TYPE_DESCRIPTION).type(desc2) */.then(()=>{
          cy.wait(1000)
          _modalView.findModal().acceptButton(btn.ButtonText.NEXT)      
        })
        
        cy.wait(3000)
        cy.get("[class*='modal-dialog']").find(commonLocators.CommonElements.CHECKBOX_TYPE).check()
        _modalView.findModal().acceptButton(btn.ButtonText.NEXT)
        
        cy.wait(3000)
        cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS)
                  .find("[class*='subview-container'] [class*='fullheight'] [class*='tab-content'] [class*='domain-type-description']").clear().type(value)
                   cy.wait(1000)
        _modalView.findModal().acceptButton(btn.ButtonText.NEXT)
        cy.wait(1000)
        
        _modalView.findModal().acceptButton(btn.ButtonText.FINISH)
        cy.wait(1000)
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`).find(commonLocators.CommonElements.SIDEBAR).within(()=>{
          cy.get(commonLocators.CommonElements.SEARCH_FORM).eq(1).click({force:true})
          cy.get(commonLocators.CommonElements.SEARCH_BUTTON).click({force:true})         
        })

      }
      verify_editTheCurrentSearchForm(searchForm:string,value:string){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`).find(commonLocators.CommonElements.SIDEBAR).within(()=>{
            cy.get(commonLocators.CommonElements.SEARCH_FORM).eq(1).click({force:true})          
            cy.get(commonLocators.CommonElements.GROUP_BTN).find(commonLocators.CommonElements.ICO_MENU).eq(0).click({force:true})
            cy.get(commonLocators.CommonElements.DROPDOWN_MENU).contains("li","Edit the current form...").click()
        })
        cy.wait(2000) 
        cy.get("[class*='availableContainer']").find("[class*='text-left']").contains(searchForm).click({force:true})     
        _modalView.findModal().acceptButton(btn.ButtonText.NEXT)
        cy.wait(1000)
        _modalView.findModal()
                  cy.get(commonLocators.CommonElements.CHECKBOX_TYPE).eq(1).check()
        _modalView.findModal().acceptButton(btn.ButtonText.NEXT)
        cy.wait(1000)
        cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS)
                  .find("[class*='subview-container'] [class*='fullheight'] [class*='tab-content'] [class*='domain-type-description']").clear().type(value)
                  cy.wait(2000)
        _modalView.findModal().acceptButton(btn.ButtonText.NEXT)
        cy.wait(1000)
        _modalView.findModal().acceptButton(btn.ButtonText.FINISH)
        cy.wait(1000)
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`).find(commonLocators.CommonElements.SIDEBAR).within(()=>{          
          cy.get(commonLocators.CommonElements.SEARCH_BUTTON).click({force:true})         
        })
      }
      verify_searchByDate(selection:string,labelName:string){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)        
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`).find(commonLocators.CommonElements.SIDEBAR).within(()=>{
            cy.get(commonLocators.CommonElements.SEARCH1).click({force:true})
             _common.clear_searchInSidebar()          
            cy.get(commonLocators.CommonElements.CHECKBOX_TYPE).check({force:true})
            cy.wait(1000)
            })
          cy.get(commonLocators.CommonElements.CARET_SELECTION).find(commonLocators.CommonElements.CARET).as('caret')
            cy.get('@caret').click({force:true})
            cy.contains('button',selection).click({force:true})

             cy.wait(1000).then(()=>{
          cy.get("[class*='tabsWrapper-without-border'] [class*='nav-tabs']").contains("li","Variable Period")
          cy.get("[class*='environment-expressions'] [class*='btn-default']").contains(labelName).click()  
          cy.wait(2000)        
        })
        
      }
      verify_searchByPopulateBasisAndChangeOrders(){
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)        
        cy.get(`#${app.Layouts.MAIN_CONTAINER}`).find(commonLocators.CommonElements.SIDEBAR).within(()=>{
            cy.get(commonLocators.CommonElements.SEARCH1).click({force:true})
            _common.clear_searchInSidebar()          
            cy.get("#includeChainedItemsId").check({force:true})
            cy.get("#includeDateSearchId").uncheck({force:true})
            cy.wait(1000) 
          })  
      }

      verify_cartInputFields(container_UUID:string,rowClass:string,fieldClass:string,index,actualValue){
         _mainView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .wrapElements()
                  .within(($ele)=>{
                    cy.wrap($ele)
                      .find("[class*='"+rowClass+"'] [class*='"+fieldClass+"']")
                      .eq(index)
                      .invoke('val')
                      .then(($Value)=>{
                        expect($Value).equals(actualValue)
                    })
                  })
      }

 // ! Eg: path = Material Catalog/001 Artikelkatalog/21 Binde-, Zusatzmittel/2109 Zement
 verify_commoditySearchResult(container_UUID:string,data:DataCells){
  if (data[commonLocators.CommonLabels.TYPE]!="cartRecord") {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findButton(btn.IconButtons.ICO_DISCARD)
             .clickIn()
    cy.wait(2000)
  }
 
  if (data[commonLocators.CommonLabels.TYPE]==='searchterm') {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
             .clear({ force: true })
             .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
    cy.wait(1000)
    _modalView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .wrapElements()
              .find('[class*="item-title"]')
              .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
              .should('exist') 
  }

  if (data[commonLocators.CommonLabels.TYPE]==='dropdown') {
    let splitedData=data[commonLocators.CommonKeys.PATH].split('/')
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findButton(btn.IconButtons.ICO_DOWN)
             .clickIn()
    cy.wait(2000)
    cy.get('[class*="popup-content"]')
      .within(()=>{
          cy.get('.caret')
            .click()
            .then(()=>{
              cy.wait(1000)
              cy.document()
                .its('body')
                .find(".popup-container")
                .last()
                .within(()=>{
                  cy.contains('button', splitedData[0])
                    .click({ force: true })
                })
              cy.wait(1000)
            })
      })
      .then(()=>{
        cy.get('[class*="popup-content"]')
          .find('[class*="'+app.InputFields.DOMAIN_TYPE_DESCRIPTION+'"]')
          .clear()
          .type(splitedData[1]) 
        cy.wait(1000)
        cy.get('[class*="popup-content"]')
          .contains(`.${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.TREE}`,splitedData[1])
          .click()
        cy.wait(1000)
        cy.get('[class*="popup-footer"]')
          .contains('button',btn.ButtonText.OK)
          .click()
        cy.wait(1000)
        _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
        cy.wait(1000)
        _modalView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .wrapElements()
                  .find('[class*="item-title"]')
                  .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
                  .should('exist') 
      })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='filter') {
    cy.get('[class*="panel-left"]')
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonKeys.FILTER  + "$", "g"))
          .closest('[class*="container-title"]')
          .within(($ele)=>{
            if($ele.find('[class*="ico-plus"]').length > 0) {
              cy.wrap($ele)
                .find('[class*="ico-plus"]')
                .click()
            }else{
              cy.log("Already opened")
            }
          })
      })
      .within(()=>{
        Object.keys(data[commonLocators.CommonKeys.FILTER])
              .forEach(key=>{
                cy.contains("[class*='checkbox-label']",new RegExp("^" + key  + "$", "g"))
                  .prev('[class*="attribute-icon"]')
                  .within(()=>{
                    cy.get(commonLocators.CommonElements.CHECKBOX_TYPE)
                      .as("checkbox")
                      .invoke("is", ":checked")
                      .then((checked) => {
                            if (data[commonLocators.CommonKeys.FILTER][key] == "check") {
                              if (!checked) {
                                cy.get("@checkbox").check();
                              }
                            } else if (data[commonLocators.CommonKeys.FILTER][key] == "uncheck") {
                              if (checked) {
                                cy.get("@checkbox").uncheck();
                              }
                        }
                      })
                  })
              })
      })
      .then(()=>{
        cy.wait(1000)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .findButton(btn.IconButtons.ICO_SEARCH)
                 .clickIn()
        cy.wait(1000)
        _modalView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .wrapElements()
                  .find('[class*="item-title"]')
                  .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
                  .should('exist') 
      }) 
  }

  if (data[commonLocators.CommonLabels.TYPE]==='catalogexists') {
    cy.get('[class*="panel-left"]')
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.CATALOG  + "$", "g"))
          .closest('[class*="container-title"]')
          .within(($ele)=>{
            if($ele.find('[class*="ico-plus"]').length > 0) {
              cy.wrap($ele)
                .find('[class*="ico-plus"]')
                .click()
            }else{
              cy.log("Already opened")
            }
          })             
      })
      .within(()=>{
          cy.contains("[class*='checkbox-label']",data[commonLocators.CommonLabels.CATALOG])
            .should('exist')  
      })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='catalogdoesnotexists') {
    cy.get('[class*="panel-left"]')
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.CATALOG  + "$", "g"))
          .closest('[class*="container-title"]')
          .within(($ele)=>{
            if($ele.find('[class*="ico-plus"]').length > 0) {
              cy.wrap($ele)
                .find('[class*="ico-plus"]')
                .click()
            }else{
              cy.log("Already opened")
            }
          })
      })
      .within(()=>{
            cy.contains("[class*='checkbox-label']",data[commonLocators.CommonLabels.CATALOG])
              .should('not.exist')  
      })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='attribute') {
    cy.get('[class*="panel-left"]')
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.ATTRIBUTE  + "$", "g"))
          .scrollIntoView()
      })
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.ATTRIBUTE  + "$", "g"))
          .closest('[class*="container-title"]')
          .within(($ele)=>{
            if($ele.find('[class*="ico-plus"]').length > 0) {
              cy.wrap($ele)
                .find('[class*="ico-plus"]')
                .click()
            }else{
              cy.log("Already opened")
            }
          })
      })
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.UOM  + "$", "g"))
          .closest('[class*="attributes-title"]')
          .within(($ele)=>{
            if($ele.find('[class*="ico-plus"]').length > 0) {
              cy.wrap($ele)
                .find('[class*="ico-plus"]')
                .click()
            }else{
              cy.log("Already opened")
            }
          })
      })
      .within(()=>{
        Object.keys(data[commonLocators.CommonLabels.UOM])
              .forEach(key=>{
                cy.contains("[class*='checkbox-label']",key)
                  .prev('[class*="attribute-icon"]')
                  .within(()=>{
                    cy.get(commonLocators.CommonElements.CHECKBOX_TYPE)
                      .as("checkbox")
                      .invoke("is", ":checked")
                      .then((checked) => {
                            if (data[commonLocators.CommonLabels.UOM][key] == "check") {
                              if (!checked) {
                                cy.get("@checkbox").check();
                              }
                            } else if (data[commonLocators.CommonLabels.UOM][key] == "uncheck") {
                              if (checked) {
                                cy.get("@checkbox").uncheck();
                              }
                        }
                      })
                  })
              })
      })
      .then(()=>{
        cy.wait(1000)
        _modalView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .wrapElements()
                  .find('[class*="item-title"]')
                  .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
                  .should('exist') 
      }) 
  }

  if (data[commonLocators.CommonLabels.TYPE]==='icon') {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
             .clear({ force: true })
             .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
             cy.wait(1000)
    _modalView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .wrapElements()
              .find('[class*="item-title"]')
              .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
              .should('exist') 
    _modalView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .wrapElements()
              .find('[title="From Framework Catalog"]')
              .should('exist') 
  }

  if (data[commonLocators.CommonLabels.TYPE]==='materialType') {
    cy.get('[class*="panel-left"]')
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.MATERIAL_TYPE  + "$", "g"))
          .wait(2000)
          .scrollIntoView()
      })
      .within(()=>{
        cy.contains(new RegExp("^" + commonLocators.CommonLabels.MATERIAL_TYPE  + "$", "g"))
          .closest('[class*="container-title"]')
          .within(($ele)=>{
            if($ele.find('[class*="ico-plus"]').length > 0) {
              cy.wrap($ele)
                .find('[class*="ico-plus"]')
                .click()
            }else{
              cy.log("Already opened")
            }
          })
      })
      .within(()=>{
        Object.keys(data[commonLocators.CommonLabels.MATERIAL_TYPE])
              .forEach(key=>{
                cy.contains("[class*='checkbox-label']",new RegExp("^" + key  + "$", "g"))
                  .prev('[class*="attribute-icon"]')
                  .within(()=>{
                    cy.get(commonLocators.CommonElements.CHECKBOX_TYPE)
                      .as("checkbox")
                      .invoke("is", ":checked")
                      .then((checked) => {
                            if (data[commonLocators.CommonLabels.MATERIAL_TYPE][key] == "check") {
                              if (!checked) {
                                cy.get("@checkbox").check();
                              }
                            } else if (data[commonLocators.CommonLabels.MATERIAL_TYPE][key] == "uncheck") {
                              if (checked) {
                                cy.get("@checkbox").uncheck();
                              }
                        }
                      })
                  })
              })
      })
      .then(()=>{
        cy.wait(1000)
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .wrapElements()
                 .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
                 .clear({ force: true })
                 .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
        _mainView.findModuleClientArea()
                 .findAndShowContainer(container_UUID, 0)
                 .findButton(btn.IconButtons.ICO_SEARCH)
                 .clickIn()
        cy.wait(1000)
        _modalView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .wrapElements()
                  .find('[class*="item-title"]')
                  .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
                  .should('exist') 
      }) 
  }

  if (data[commonLocators.CommonLabels.TYPE]==='minQuantity') {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
             .clear({ force: true })
             .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
             cy.wait(1000)
    _modalView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .wrapElements()
              .find('[class*="item-title"]')
              .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
              .should('exist') 
    _modalView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .wrapElements()
              .find('[class*="'+app.InputFields.QUANTITY_INPUT+'"]')
              .invoke('val')
              .then(($val)=>{
                let convertVal:any=parseFloat($val.toString()).toFixed(3)
                expect(convertVal).equals(parseFloat(data[app.InputFields.QUANTITY_INPUT]).toFixed(3))
              })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='sortingLowToHigh'){
    let splitedData=data[commonLocators.CommonKeys.PATH].split('/')
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findButton(btn.IconButtons.ICO_DOWN)
             .clickIn()
    cy.wait(2000)
    _common.waitForLoaderToDisappear()
    cy.get('[class*="popup-content"]')
      .within(()=>{
          cy.get('.caret')
            .click()
            .then(()=>{
              cy.wait(1000)
              cy.document()
                .its('body')
                .find(".popup-container")
                .last()
                .within(()=>{
                  cy.contains('button', splitedData[0])
                    .click({ force: true })
                    cy.wait(1000)
                })
              
            })
      })
      .then(()=>{
        cy.get('[class*="popup-content"]')
          .find('[class*="'+app.InputFields.DOMAIN_TYPE_DESCRIPTION+'"]')
          .clear()
          .type(splitedData[1]) 
        cy.wait(1000)
        cy.get('[class*="popup-content"]')
          .contains(`.${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.TREE}`,splitedData[1])
          .click()
        cy.wait(1000)
        cy.get('[class*="popup-footer"]')
          .contains('button',btn.ButtonText.OK)
          .click()
        cy.wait(1000)
        cy.get("[class*='search-input']")
          .within(()=>{
            cy.get('select')
              .select('Price (Low to High)')
          })
          .then(()=>{
            let quantity=[]
            let inc=0
            cy.wait(2000)
            cy.get("[class*='row-price']")
              .each(($el,index,$list)=>{
                if($el.children().first().length>0){
                  cy.wrap($el)
                    .children()
                    .first()
                    .invoke('text')
                    .then((text) => {
                      quantity[inc]=text
                      cy.log("QUANTITY: "+quantity[inc])
                      inc++
                    });
                }
              })
              .then(()=>{
                for(let i=0;i<quantity.length;i++){
                  for(let j=i+1;j<quantity.length;j++){
                    let quantityI:any=parseFloat(quantity[i]).toFixed(3)
                    let quantityJ:any=parseFloat(quantity[j]).toFixed(3)
                    expect(quantityI<quantityJ,quantityI +" is less than "+quantityJ).to.be.true
                  }
                }
              })
          })
        
      })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='sortingHighToLow'){
    let splitedData=data[commonLocators.CommonKeys.PATH].split('/')
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findButton(btn.IconButtons.ICO_DOWN)
             .clickIn()
    cy.wait(2000)
    cy.get('[class*="popup-content"]')
      .within(()=>{
        cy.get('.caret')
          .click()
          .then(()=>{
            cy.wait(1000)
            cy.document()
              .its('body')
              .find(".popup-container")
              .last()
              .within(()=>{
                cy.contains('button', splitedData[0])
                  .click({ force: true })
              })
              cy.wait(1000)
          })
    })
    .then(()=>{
      cy.get('[class*="popup-content"]')
        .find('[class*="'+app.InputFields.DOMAIN_TYPE_DESCRIPTION+'"]')
        .clear()
        .type(splitedData[1]) 
      cy.wait(1000)
      cy.get('[class*="popup-content"]')
        .contains(`.${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.TREE}`,splitedData[1])
        .click()
      cy.wait(1000)
      cy.get('[class*="popup-footer"]')
        .contains('button',btn.ButtonText.OK)
        .click()
        cy.wait(1000)
        cy.get("[class*='search-input']")
          .within(()=>{
            cy.get('select')
              .select('Price  (High to Low)')
          })
          .then(()=>{
            let quantity=[]
            let inc=0
            cy.wait(2000)
            cy.get("[class*='row-price']")
              .each(($el,index,$list)=>{
                if($el.children().first().length>0){
                  cy.wrap($el)
                    .children()
                    .first()
                    .invoke('text')
                    .then((text) => {
                      quantity[inc]=text
                      cy.log("QUANTITY: "+quantity[inc])
                      inc++
                    });
                }
              })
              .then(()=>{
                for(let i=0;i<quantity.length;i++){
                  for(let j=i+1;j<quantity.length;j++){
                    let quantityI:any=parseFloat(quantity[i]).toFixed(3)
                    let quantityJ:any=parseFloat(quantity[j]).toFixed(3)
                    expect(quantityI>quantityJ,quantityI +" is greater than "+quantityJ).to.be.true
                  }
                }
              })
          })
      })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='listPrice') {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
             .clear({ force: true })
             .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
    cy.wait(4000)
    cy.get('[title="'+commonLocators.CommonLabels.PRICE_LIST+'"]') 
      .click()
    _modalView.select_popupItem('grid',data[commonLocators.CommonLabels.PRICE_LIST])
    cy.get("[class*='row-price']")
      .each(($el)=>{
        if($el.children().first().length>0){
          cy.wrap($el)
            .children()
            .first()
            .invoke('text')
            .then((text) => {
              let quantityI:any=parseFloat(text).toFixed(3)
              let quantityJ:any=parseFloat(data[commonLocators.CommonKeys.VALUE]).toFixed(3)
              expect(quantityJ).equals(quantityI)
            });
        }      
      })
  }

  if (data[commonLocators.CommonLabels.TYPE]==='cartRecord') {
    _modalView.findModuleClientArea()
                  .findAndShowContainer(container_UUID)
                  .wrapElements()
                  .find('[id="cart-view-materials-list"] [class*="item-title"]')
                  .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
                  .should('exist') 
  }

  if (data[commonLocators.CommonLabels.TYPE]==='alternative') {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
             .clear({ force: true })
             .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
    cy.wait(4000)
   
    cy.get('[class="ms-commodity-row-cart-empty"] [class*="'+app.GridCells.ICO_ALTERNATIVE+'"]')
      .click()
      .then(()=>{
        _modalView.findModal()
                  .wrapElements()
                  .find('.'+commonLocators.CommonElements.COLUMN_ID+app.GridCells.CODE_CAPS)
                  .contains(data[app.GridCells.ICO_ALTERNATIVE])
                  .should('exist')
        _modalView.findModal()
                  .acceptButton(btn.ButtonText.CANCEL)
      })
    
  }

  if (data[commonLocators.CommonLabels.TYPE]==='detailsCO2AttributePriceList') {
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .wrapElements()
             .find(`input[class*='${app.InputFields.SEARCH_BUTTON_TEXT}'] `)
             .clear({ force: true })
             .type(data[commonLocators.CommonKeys.SEARCH_RESULT])
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID, 0)
             .findButton(btn.IconButtons.ICO_SEARCH)
             .clickIn()
    cy.wait(2000)
    _modalView.findModuleClientArea()
              .findAndShowContainer(container_UUID)
              .wrapElements()
              .find('[class*="item-title"]')
              .contains(data[commonLocators.CommonKeys.SEARCH_RESULT])
              .click()
    cy.wait(2000)
    cy.get('[class*="'+app.GridCells.DESCRIPTION_CO2_PROJECT+'"]')
      .contains(data[app.GridCells.DESCRIPTION_CO2_PROJECT])
      .should('exist')
    cy.get('[class*="attribute-box"]')
      .within(()=>{
        cy.get("[class*='"+app.GridCells.ATTRIBUTE_PROPERTY+"']")
          .contains(data[app.GridCells.ATTRIBUTE_PROPERTY])
          .should('exist')
        cy.get("[class*='"+app.GridCells.ATTRIBUTE_VALUE+"']")
          .contains(data[app.GridCells.ATTRIBUTE_VALUE])
          .should('exist')
      }).then(()=>{
        cy.get('[class="ms-sv-search-view fullheight"] [class="ms-commodity-row-cart-empty"][title="'+commonLocators.CommonLabels.PRICE_LIST+'"]') 
          .click()
        _modalView.select_popupItem('grid',data[commonLocators.CommonLabels.PRICE_LIST])

        cy.get('[class*="'+app.GridCells.DESCRIPTION_CO2_PROJECT+'"]')
          .should('not.exist')
      })
  }
}

verify_businessPartnerAdvanceSearch(data:DataCells, btnText?:string){

  if(data[commonLocators.CommonLabels.TYPE]==="Procurement structure"){
    let status
    cy.wait(2000)
    _modalView.findModal()
              .wrapElements()
              .contains(data[commonLocators.CommonLabels.TYPE])
              .closest('[class*="list-group"]')
              .within(()=>{
                cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                  .as("check")
                  .invoke("is", ":checked")
                  .then((checked) => {
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                      if (!checked) {
                        cy.get("@check").check()
                                        .then(()=>{
                                          status="true"
                                        })
                      }if(checked){
                        status="true"
                      }
                    }
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]  == "uncheck") {
                      if (checked) {
                        cy.get("@check").uncheck()
                                        .then(()=>{
                                          status="false"
                                        })
                      }if(!checked){
                        status="false"
                      }
                    }
                  });
              }).then(()=>{
                if(status==="true"){
                  _modalView.findModal()
                  .wrapElements()
                  .contains(data[commonLocators.CommonLabels.TYPE])
                  .closest('[class*="list-group"]')
                  .within(() => {
                    cy.get('[class*="subgroup"]')
                      .first()
                      .within(()=>{
                        cy.get('[class*="'+app.InputFields.INPUT_GROUP_CONTENT+'"]')
                          .first()
                          .clear()
                          .type(data[commonLocators.CommonKeys.CODE])
                      
                        cy.document()
                          .its('body')
                          .find(".popup-container")
                          .within(()=>{
                            cy.get("div.popup-content").within(() => {
                              cy.wait(1000)
                              cy.get(`div[class*='column-id']`).each(($cell) => {
                                const cellField: string = $cell.text();
                                if (data[commonLocators.CommonKeys.CODE] === cellField) {
                                  cy.wait(1000);
                                  cy.wrap($cell).click({ force: true });
                                  cy.wait(2000);
                                  return false;
                                }
                              });
                            });
                          })
                      })          
                  })
                  .then(()=>{
                    _modalView.findModal()
                              .findButton(btn.IconButtons.ICO_SEARCH)
                              .clickIn()
                              cy.wait(2000)
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.BP_NAME_1, data[app.GridCells.BP_NAME_1])
                              .should('exist')
                              .click()
                              cy.wait(2000)

                    _modalView.findModal()
                              .findActiveRow()
                              .findCell(app.SubContainerLayout.INDICATOR)
                              .clickIn()
                              
                    _modalView.findModal()
                              .findActiveRow()
                              .checkbox_inCell(app.GridCells.ID)
                              .trigger('click')
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.DESCRIPTION, data[commonLocators.CommonLabels.BRANCH_DESCRIPTION])
                              .should('exist')
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.FIRST_NAME, data[app.GridCells.FIRST_NAME])
                              .should('exist')
            
            
                  })
                }  
              })
          
  }

  if(data[commonLocators.CommonLabels.TYPE]==="Location"){
    let status
      cy.wait(2000)
      _modalView.findModal()
                .wrapElements()
                .contains(data[commonLocators.CommonLabels.TYPE])
                .closest('[class*="list-group"]')
                .within(()=>{
                  cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                    .as("check")
                    .invoke("is", ":checked")
                    .then((checked) => {
                      if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                        if (!checked) {
                          cy.get("@check").check()
                                          .then(()=>{
                                            status="true"
                                          })
                        }
                      }
                      if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]  == "uncheck") {
                        if (checked) {
                          cy.get("@check").uncheck()
                                          .then(()=>{
                                            status="false"
                          })
                        }
                      }
                    });
                }).then(()=>{
                  if(status==="true"){
                    _modalView.findModal()
                    .wrapElements()
                    .contains(data[commonLocators.CommonLabels.TYPE])
                    .closest('[class*="list-group"]')
                    .within(() => {
                      cy.get('[class*="subgroup"]')
                        .first()
                        .within(()=>{
                          if(data[commonLocators.CommonKeys.RADIO]==="Distance"){
                          cy.get(commonLocators.CommonElements.RADIO_INPUT)
                            .first()
                            .as("check")
                            .invoke("is", ":checked")
                            .then((checked) => {
                              if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                                if (!checked) {
                                  cy.get("@check").check()
                                }
                              }
                              if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]  == "uncheck") {
                                if (checked) {
                                  cy.get("@check").uncheck()
                                }
                              }
                            })
                            .then(()=>{
                                cy.get('select').select(data[commonLocators.CommonLabels.DISTANCE])
                            })
                          }
                          if(data[commonLocators.CommonKeys.RADIO]==="Regional"){
                            cy.get(commonLocators.CommonElements.RADIO_INPUT)
                              .last()
                              .as("check")
                              .invoke("is", ":checked")
                              .then((checked) => {
                                if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                                  if (!checked) {
                                    cy.get("@check").check();
                                  }
                                }
                                if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]  == "uncheck") {
                                  if (checked) {
                                    cy.get("@check").uncheck();
                                    return false
                                  }
                                }
                              }).then(()=>{
                                cy.get('input[class*="'+app.InputFields.INPUT_GROUP_CONTENT+'"]')
                                  .eq(0)
                                  .clear()
                                  .type(data[commonLocators.CommonLabels.REGION])
                                  .then(()=>{
                                    cy.document().its('body')
                                      .find(".popup-container")
                                      .within(()=>{
                                        cy.contains('li', 'Germany').click({ force: true })
            
                                    })
                                  })
            
                              })
            
                          }
                        })
            
            
                      })
                      .then(()=>{
                        _modalView.findModal()
                                  .findButton(btn.IconButtons.ICO_SEARCH)
                                  .clickIn()
                                  cy.wait(2000)
            
                        _modalView.findModal()
                                  .findCellhasValue(app.GridCells.BP_NAME_1, data[app.GridCells.BP_NAME_1])
                                  .should('exist')
                                  .click()
                                  cy.wait(2000)

                        _modalView.findModal()
                                  .findActiveRow()
                                  .findCell(app.SubContainerLayout.INDICATOR)
                                  .clickIn()
                                  
                        _modalView.findModal()
                                  .findActiveRow()
                                  .checkbox_inCell(app.GridCells.ID)
                                  .trigger('click')
            
                        _modalView.findModal()
                                  .findCellhasValue(app.GridCells.DESCRIPTION, data[commonLocators.CommonLabels.BRANCH_DESCRIPTION])
                                  .should('exist')
                                  .click()
                        _common.waitForLoaderToDisappear()
                        _modalView.findModal()
                                  .findCellhasValue(app.GridCells.FIRST_NAME, data[app.GridCells.FIRST_NAME])
                                  .should('exist')
            
            
                      })
                  }
                })

  }
  if(data[commonLocators.CommonLabels.TYPE]==="Evaluation Mark"){
    let status
    cy.wait(2000)
    _modalView.findModal()
              .wrapElements()
              .contains(data[commonLocators.CommonLabels.TYPE])
              .closest('[class*="list-group"]')
              .within(()=>{
                cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                  .as("check")
                  .invoke("is", ":checked")
                  .then((checked) => {
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                      if (!checked) {
                        cy.get("@check").check()
                                        .then(()=>{
                                          status="true"
                                        })
                      }
                    }
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]  == "uncheck") {
                      if (checked ) {
                        cy.get("@check").uncheck()
                                        .then(()=>{
                                          status="false"
                                        })
                      }
                    }
                  });
              }).then(()=>{
                if(status==="true"){
                  _modalView.findModal()
                  .wrapElements()
                  .contains(data[commonLocators.CommonLabels.TYPE])
                  .closest('[class*="list-group"]')
                  .within(() => {
                    cy.get('[class*="subgroup"]')
                      .first()
                      .within(()=>{
                        cy.get('[class*="'+app.InputFields.INPUT_GROUP_CONTENT+'"]')
                          .first()
                          .clear()
                          .type(data[app.InputFields.INPUT_GROUP_CONTENT])
                      
                        cy.document()
                          .its('body')
                          .find(commonLocators.CommonElements.POPUP_CONTAINER)
                          .within(()=>{
                            cy.get("div.popup-content").within(() => {
                              cy.wait(1000)
                              cy.get(`li[class*="lookup-item"]`).each(($cell) => {
                                const cellField: string = $cell.text();
                                if (data[app.InputFields.INPUT_GROUP_CONTENT] === cellField) {
                                  cy.wait(1000);
                                  cy.wrap($cell).click({ force: true });
                                  cy.wait(2000);
                                  return false;
                                }
                              });
                            });
                          })
                      })          
                  })
                  .then(()=>{
                    _modalView.findModal()
                              .findButton(btn.IconButtons.ICO_SEARCH)
                              .clickIn()
                              cy.wait(2000)
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.BP_NAME_1, data[app.GridCells.BP_NAME_1])
                              .should('exist')
                              .click()
                              cy.wait(2000)

                    _modalView.findModal()
                              .findActiveRow()
                              .findCell(app.SubContainerLayout.INDICATOR)
                              .clickIn()
                              
                    _modalView.findModal()
                              .findActiveRow()
                              .checkbox_inCell(app.GridCells.ID)
                              .trigger('click')
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.DESCRIPTION, data[commonLocators.CommonLabels.BRANCH_DESCRIPTION])
                              .should('exist')
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.FIRST_NAME, data[app.GridCells.FIRST_NAME])
                              .should('exist')
            
            
                  })
                }  
              })
  }
  if(data[commonLocators.CommonLabels.TYPE]==="Businesspartner Status"){
    let status
    cy.wait(2000)
    _modalView.findModal()
              .wrapElements()
              .contains(data[commonLocators.CommonLabels.TYPE])
              .closest('[class*="list-group"]')
              .within(()=>{
                cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                  .as("check")
                  .invoke("is", ":checked")
                  .then((checked) => {
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                      if (!checked) {
                        cy.get("@check").check()
                                        .then(()=>{
                                          status="true"
                                        })
                      }
                    }
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE]  == "uncheck") {
                      if (checked ) {
                        cy.get("@check").uncheck()
                                        .then(()=>{
                                          status="false"
                                        })
                      }
                    }
                  });
              }).then(()=>{
                if(status==="true"){
                  _modalView.findModal()
                  .wrapElements()
                  .contains(data[commonLocators.CommonLabels.TYPE])
                  .closest('[class*="list-group"]')
                  .within(() => {
                    cy.get('[class*="subgroup"]')
                      .first()
                      .within(()=>{
                        cy.get('[class*="caret"]')
                          .click({ force: true })                      
                      
                        cy.document()
                          .its('body')
                          .find(commonLocators.CommonElements.POPUP_CONTAINER)
                          .within(()=>{
                            cy.get("div.popup-content").wait(1000)
                              .within(() => {
                                cy.wait(1000)
                                Object.keys(data[commonLocators.CommonLabels.BP_STATUS]).forEach((key)=>{
                                  cy.get(`div[class*=column-id_description]`).contains(key).click({force: true}).then(()=>{
                                    cy.get( commonLocators.CommonElements.ACTIVE_CHECKBOX).within(()=>{
                                      cy.get(commonLocators.CommonElements.CHECKBOX_INPUT).as("check")
                                      .invoke("is", ":checked")
                                      .then((checked) => {
                                        if (data[commonLocators.CommonLabels.BP_STATUS][key] == "check") {
                                          if (!checked) {
                                              cy.get("@check").check()
                              
                                          }
                                        }
                                        if (data[commonLocators.CommonLabels.BP_STATUS][key]  == "uncheck") {
                                          if (checked ) {
                                            cy.get("@check").uncheck()
                                              
                                          }
                                        }
                                      })      

                                    })
                                                                   
                                  })
                                });
                              })
                          }) 
                      })         
                  })
                  .then(()=>{
                    _modalView.findModal()
                              .findButton(btn.IconButtons.ICO_SEARCH)
                              .clickIn()
                              cy.wait(2000)
            
                    _modalView.findModal()
                              .findCellhasValue(app.GridCells.BP_NAME_1, data[app.GridCells.BP_NAME_1])
                              .should('exist')
                              .click()
                              cy.wait(2000)     
            
                  })
                }  
              })
  }
  if(btnText){
    _modalView.findModal()
              .acceptButton(btnText)
  }
}

verify_additionOfMultipleValues(value1: string, value2: string,value3: string,value4: string, value5?:string) {
  
  const expResult = (+parseFloat(value1.replace(",",""))) + (+parseFloat(value2.replace(",",""))) + (+parseFloat(value3.replace(",",""))) + (+parseFloat(value4.replace(",","")))
  Cypress.env("TotalOfAll",expResult.toFixed(2))
}

verify_isRecordPresent(container_UUID: string, compareValue: string) {
  _mainView
    .findModuleClientArea()
    .findAndShowContainer(container_UUID)
    .findGrid()
    .wrapElements().then(($cell) => {
      cy.wrap($cell).contains(".slick-container div", compareValue).should("exist")
    })
}

verify_unitRate_isEqualsTo_TotalPRice(discountPercentage){

  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.PRICE).then(($ele) => {
    var UNIT_RATE = parseInt($ele.text())
    Cypress.env("UNIT_RATE",UNIT_RATE)
  })

  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.PRICE_EXTRA).then(($ele) => {
    var EXTRAS = parseInt($ele.text())
    Cypress.env("EXTRAS",EXTRAS)
  })

  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.PRICE_UNIT).then(($ele) => {
    var PRICE_UNIT = parseInt($ele.text())
    Cypress.env("PRICE_UNIT",PRICE_UNIT)
  })

  _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT,app.GridCells.FACTOR_PRICE_UNIT).then(($ele) => {
    var FACTOR = parseInt($ele.text())
    Cypress.env("FACTOR",FACTOR)
  })
  cy.wait(500).then(()=>{
    var additionOfPriceandExtra = Cypress.env("UNIT_RATE") + Cypress.env("EXTRAS")
    cy.log("additionOfPriceandExtra " + additionOfPriceandExtra)

    var multiplicationOfPriceUnitandFactorPriceUnit = Cypress.env("PRICE_UNIT") * Cypress.env("FACTOR")
    cy.log("multiplicationOfPriceUnitandFactorPriceUnit " + multiplicationOfPriceUnitandFactorPriceUnit)

    var expResult = additionOfPriceandExtra / multiplicationOfPriceUnitandFactorPriceUnit
    cy.log("expResult " + expResult)
   var TotalPRice = expResult *  (100 - discountPercentage) / 100
   Cypress.env("TotalPrice" + TotalPRice)

  })

}
verify_dataUnderControllingUnitCodeLookups(container_UUID:string,cellClass:string,data:DataCells){
  cy.wait(2000)
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .findCell(cellClass)
           .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
  _modalView.findModal()
            .wrapElements()
            .contains(commonLocators.CommonElements.PLATFORM_FORM_LABEL,commonLocators.CommonLabels.PROJECT)
            .closest(commonLocators.CommonElements.ROW)
            .within(()=>{
                cy.get(commonLocators.CommonElements.PLATFORM_FORM_COL)
                  .within(()=>{
                    cy.get('input[class*="'+app.InputFields.INPUT_GROUP_CONTENT+'"]')
                      .eq(0)
                      .clear()
                      .type(data[commonLocators.CommonLabels.PROJECT])
                    cy.document()
                      .its('body')
                      .find(".popup-container")
                      .within(()=>{
                        cy.get("div.popup-content").within(() => {
                          cy.wait(1000)
                          cy.get(`div[class*='column-id']`).each(($cell) => {
                            const cellField: string = $cell.text();
                            if (data[commonLocators.CommonLabels.PROJECT] === cellField) {
                              cy.wait(1000);
                              cy.wrap($cell).click({ force: true });
                              cy.wait(2000);
                              return false;
                            }
                          });
                        });
                      })
                })
                
            })
            .then(()=>{
              _modalView.findModal()
                        .findTextInput(app.InputFields.FORM_CONTROL)
                        .eq(0)
                        .clear()
                        .type(data[commonLocators.CommonKeys.VALUE])
            
              _modalView.findModal()
                        .findButton(btn.IconButtons.ICO_SEARCH)
                        .clickIn()
            
              cy.wait(3000)
              cy.get("body").then(($body) => {
                if ($body.find(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+' '+commonLocators.CommonElements.ICO_TREE_COLLAPSE).length > 0) {
                  cy.wait(500)
                  cy.get(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS+' '+commonLocators.CommonElements.ICO_TREE_COLLAPSE).click();
                }
              });

              _modalView.findModal()
                        .findCellhasValue(app.GridCells.DESCRIPTION_CAPS,data[commonLocators.CommonKeys.VALUE])
                        .should('exist')
                        .click()
              _modalView.findModal()
                        .acceptButton('OK') 
            })
}

verify_checkBoxEnabled_forActiveCell(container_UUID:string,cellClass:string,recordType?:string){
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .getCell(cellClass,recordType)
           .wrapElements()
           .find(commonLocators.CommonElements.CHECKBOX_TYPE)
           .should('not.be.disabled')
}
verify_checkBoxDisabled_forActiveCell(container_UUID:string,cellClass:string,recordType?:string){
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .getCell(cellClass,recordType)
           .wrapElements()
           .find(commonLocators.CommonElements.CHECKBOX_TYPE)
           .should('be.disabled')
}




verify_radioButtonText_inModal(){
    _modalView.findModal()
          cy.get(commonLocators.CommonElements.ROW).find(commonLocators.CommonElements.RADIO_CLASS)
            .each(($label) => {
              cy.wrap($label)
                .invoke("text")
                .then((text) => {
                  cy.wrap($label).should("have.text", text);
              })
            })
}

accept_buttonInModalInside(msg:string){
    _modalView.findModal()  
              .wrapElements()  
              .find(commonLocators.CommonElements.WIZARD_POPUP_MESSAGE) 
              .invoke("text") 
              .then(function (actualValue: string) {  
                expect(actualValue).to.equals(msg);  
  
              });  
    cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).last().contains("OK").click()  
}

verify_shortKeyVisibility(container_UUID:string,cellClass:string,shortKey:string,visibilityType:string){
  cy.wait(2000)
  _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(cellClass)
            .findInputLookup(app.GridCellIcons.ICO_INPUT_DELETE,0)
            .caret()
  cy.wait(2000)

  cy.document()
    .its('body')
    .find(".popup-container")
    .within(()=>{
      cy.get("div.popup-content").within(() => {
        cy.wait(1000)
        let status

        if(visibilityType==="not visible"){
          cy.get(`div[class*='column-id']`)
            .each(($cell) => {
              const cellField: string = $cell.text();
              if (shortKey === cellField) {
                status="Match found"
                return false
              }else{
                status="Did not found match"
              }
          }).then(()=>{
            expect(status).equals("Did not found match")
          })
        }
        if(visibilityType==="visible"){
          cy.get(`div[class*='column-id']`)
            .each(($cell) => {
              const cellField: string = $cell.text();
              if (shortKey === cellField) {
                status="Match found"
                return false
              }else{
                status="Did not found match"
              }
            }).then(()=>{
              expect(status).equals("Match found")
            })
  
        }
     
      });
  }) 
}
 
verify_dataUnderCostCodeLookups(container_UUID:string,cellClass:string,modalCellClass:string,value:string,type:string){
  cy.wait(2000)
   _mainView.findModuleClientArea()
            .findAndShowContainer(container_UUID)
            .findGrid()
            .findActiveRow()
            .findCell(cellClass)
            .findInputLookup(app.InputFields.ICO_INPUT_LOOKUP,0)
  _modalView.findModal().acceptButton('Refresh')
  _modalView.findModal()
            .findTextInput(app.InputFields.FORM_CONTROL)
            .eq(0)
            .clear()
            .type(value)
  _modalView.findModal()
            .findButton(btn.IconButtons.ICO_SEARCH)
            .clickIn()
  cy.wait(3000)
  if (type==="shouldExist") {
    _modalView.findModal()
              .findCellhasValue(modalCellClass,value)
              .should('exist')
              .click()
    _modalView.findModal()
              .acceptButton('OK') 
  }if (type==="shouldNotExist") {
    _modalView.findModal()
              .wrapElements()
              .then(($cell) => {
                cy.wrap($cell)
                  .contains("."+commonLocators.CommonElements.COLUMN_ID+modalCellClass, value)
                  .should("not.exist")
              })   
    _modalView.findModal()
              .acceptButton(btn.ButtonText.CANCEL) 
  }
}
verify_compareConfigDialog_forHorizontalComparison(fieldName:string[]){  
  _modalView.findModal()
    cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS,"Compare Fields").within(()=>{
      cy.wait(3000)
      cy.get('[class*="flex-row"] [class*="checkbox"]').contains("label","Horizontal Comparison").find("input[type*='checkbox']").check()
      for (var i = 0; i < fieldName.length; i++) {
        cy.get("[class*=subview-content] [class*=column-id_fieldName]").contains("[class*=column-id_fieldName]",fieldName[i]).click()
        cy.wait(2000)
        cy.get(commonLocators.CommonElements.VISIBLE_CHECKBOX).find("input[type*='checkbox']").check()
      }    

    })  
    _modalView.findModal()
    cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS,"Show Summary & Position Options").within(()=>{
      cy.get("[class*='ico-down']").last().click()
      cy.wait(3000)
      cy.get('[class*="flex-row"] [class*="checkbox"]').contains("label","Hide zero value lines").find("input[type*='checkbox']").uncheck({force:true})
    })
  _modalView.acceptButton(btn.ButtonText.OK)
  

}
verify_compareConfigDialog_forVerticalComparison(fieldName:string[]){
  _modalView.findModal()
  cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS,"Compare Fields").within(()=>{
    cy.wait(3000)
    cy.get('[class*="flex-row"] [class*="checkbox"]').contains("label","Horizontal Comparison").find("input[type*='checkbox']").uncheck()
    for (var i = 0; i < fieldName.length; i++) {
      cy.get("[class*=subview-content] [class*=column-id_fieldName]").contains("[class*=column-id_fieldName]",fieldName[i]).click()
      cy.wait(2000)
      cy.get(commonLocators.CommonElements.VISIBLE_CHECKBOX).find("input[type*='checkbox']").check()
    }    

  })
  _modalView.findModal()
  cy.contains(commonLocators.CommonModalElements.MODAL_CONTENT_CLASS,"Show Summary & Position Options").within(()=>{
    cy.get("[class*='ico-down']").last().click()
    cy.wait(3000)
    cy.get('[class*="flex-row"] [class*="checkbox"]').contains("label","Hide zero value lines").find("input[type*='checkbox']").uncheck({force:true})
  })
_modalView.acceptButton(btn.ButtonText.OK)

}
verify_cloumnHeaderInContainer(uuid:string,fieldName:string[]){
  for (var i = 0; i < fieldName.length; i++) {
  _mainView.findAndShowContainer(uuid)
           cy.get(`[title*='${fieldName[i]}']`)
             .should("be.visible")
}
}

verify_AndCalculateQuantityTotal(Container_UUID:string,cellClass:string,quanityTotal :string,quanity :string, quantityFac1: string,quantityFac2: string,quantityFac3: string,quantityFac4: string,quantityFacCC: string,proFactor :string, effiFactor1: string, effiFactor2: string){
  
  let QuantityFactor = parseFloat(quantityFac1.replace(",","")) * parseFloat(quantityFac2.replace(",","")) * parseFloat(quantityFac3.replace(",",""))* parseFloat(quantityFac4.replace(",",""))* parseFloat(quantityFacCC.replace(",",""))  
  let EfficiencyFactor = parseFloat(effiFactor1.replace(",","")) / parseFloat(effiFactor2.replace(",",""))
  let expResult:any = parseFloat(quanityTotal.replace(",","")) *parseFloat(quanity.replace(",","")) * QuantityFactor * parseFloat(proFactor.replace(",",""))/ EfficiencyFactor

  _mainView.findModuleClientArea()
           .findAndShowContainer(Container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass)
           .wrapElements().invoke("text")
           .then((text) => {
            const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
            expect(actResult).to.equal(Cypress.env("result",expResult.toFixed(2)));
          })
          
}

verify_AndCalculateDWRateTotal(Container_UUID:string,cellClass:string,DwRate :string,quantityTotal :string, costFac1: string,costFac2: string,costFacCC: string,lineCostFac1: string,lineCostFac2: string){
  
  let CostFactor = parseFloat(costFac1.replace(",","")) * parseFloat(costFac2.replace(",","")) * parseFloat(costFacCC.replace(",",""))
  let LineCostFactor = parseFloat(lineCostFac1.replace(",","")) * parseFloat(lineCostFac2.replace(",",""))
  let expResult:any = parseFloat(DwRate.replace(",","")) * parseFloat(quantityTotal.replace(",","")) * CostFactor * LineCostFactor

  _mainView.findModuleClientArea()
           .findAndShowContainer(Container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass)
           .wrapElements().invoke("text")
           .then((text) => {
            const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
            expect(actResult).to.equal(Cypress.env("result",expResult.toFixed(2)));
          })
}

verify_AndCalculateUDPTotal(actResult:string,udp1 :string,udp2 :string,udp3 :string,udp4 :string,udp5 :string,quantityTotal :string, costFac1: string,costFac2: string,costFacCC: string,lineCostFac1: string,lineCostFac2: string){
  let UDP = parseFloat(udp1.replace(",","")) + parseFloat(udp2.replace(",","")) + parseFloat(udp3.replace(",","")) + parseFloat(udp4.replace(",","")) + parseFloat(udp5.replace(",",""))
  let CostFactor = parseFloat(costFac1.replace(",","")) * parseFloat(costFac2.replace(",","")) * parseFloat(costFacCC.replace(",",""))
  let LineCostFactor = parseFloat(lineCostFac1.replace(",","")) * parseFloat(lineCostFac2.replace(",",""))
 
  let expResult:any = UDP* parseFloat(quantityTotal.replace(",","")) * CostFactor * LineCostFactor
  expect(actResult).to.equal(Cypress.env("result",expResult.toFixed(2)));
        
}

verify_AndCalculateCostTotal(Container_UUID:string,cellClass:string,costUnit :string, quantityTotal: string,costFactor1 :string, costFactor2: string, costFactorcc: string,lineCostFactor1 :string, lineCostFactor2: string){
  
  
  let CostFactor = parseFloat(costFactor1.replace(",","")) * parseFloat(costFactor2.replace(",","")) *parseFloat(costFactorcc.replace(",",""))

  let LineCostFactor = parseFloat(lineCostFactor1.replace(",","")) * parseFloat(lineCostFactor2.replace(",",""))
 
  let expResult:any = parseFloat(costUnit.replace(",","")) * parseFloat(quantityTotal.replace(",","")) * CostFactor * LineCostFactor

  _mainView.findModuleClientArea()
           .findAndShowContainer(Container_UUID)
           .findGrid().findActiveRow()
           .getCell(cellClass)
           .wrapElements().invoke("text")
           .then((text) => {
            const actResult = parseFloat(text.replace(/,/g, '')).toFixed(2);
            expect(actResult).to.equal(Cypress.env("result",expResult.toFixed(2)));
          })
          
}
verify_additionOfMultipleElementInContainer(UUID1: string, cellClass1: string, UUID2: string, cellClass2: string,classType:string) {
  let sum = 0;
    _mainView.findModuleClientArea()
            .findAndShowContainer(UUID1)
            .getCell(cellClass1)
            .wrapElements()
            .each(($cell) => {
              const value = $cell.text().replace(/,/g, '').trim();
              const numericValue = parseFloat(value);
              sum += numericValue;
            });
    switch (classType) {
      case "Active":
         _mainView.findModuleClientArea()
                  .findAndShowContainer(UUID2)
                  .findActiveRow()
                  .getCell(cellClass2)
                  .wrapElements()
                  .eq(0)
                  .invoke('text')
                  .then((matchValue: string) => {
                      const expectedValue = parseFloat(matchValue.replace(/,/g, ''));
                      cy.wrap(sum.toFixed(2)).should('equal', expectedValue.toFixed(2));
                  });
      break;
      case "NoNActive":
         _mainView.findModuleClientArea()
                  .findAndShowContainer(UUID2)
                  .getCell(cellClass2)
                  .wrapElements()
                  .eq(0)
                  .invoke('text')
                  .then((matchValue: string) => {
                      const expectedValue = parseFloat(matchValue.replace(/,/g, ''));
                      cy.wrap(sum.toFixed(2)).should('equal', expectedValue.toFixed(2));
                  });
        break;
    }

}
verify_modalTextShouldNotExistInModalCell(CellValue:string,value:string){

  _modalView.findModal()
            .findGrid()
            .findCell(CellValue)
            .wrapElements()
            .contains(value)
            .should('not.exist')
 }


verify_assignbusinessPartnerFromStructure(data:DataCells){
  _common.waitForLoaderToDisappear()
  if([app.InputFields.DOMAIN_TYPE_DESCRIPTION]){
    _modalView.findModal()
              .findTextInput(app.InputFields.DOMAIN_TYPE_DESCRIPTION)
              .clear()
              .wait(1000)
              .type(data[app.InputFields.DOMAIN_TYPE_DESCRIPTION],{force:true})
              cy.wait(2000)
  }
  if(data[commonLocators.CommonLabels.TYPE]==="Procurement structure"){
    let checkStatus
    cy.wait(2000)
    _modalView.findModal()
              .wrapElements()
              .contains(data[commonLocators.CommonLabels.TYPE])
              .closest('[class*="list-group"]')
              .within(()=>{
                cy.get(commonLocators.CommonElements.CHECKBOX_INPUT)
                  .as("check")
                  .invoke("is", ":checked")
                  .then((checked) => {
                    if (data[commonLocators.CommonLabels.CHECKBOX_LIST_GROUP_TYPE] == "check") {
                      if (!checked) {
                        cy.get("@check").check()
                                        .then(()=>{
                                          checkStatus="true"
                                        })
                      }
                    }
                  });
              })
    _modalView.findModal()
              .wrapElements()
              .contains(data[commonLocators.CommonLabels.TYPE])
              .closest('[class*="list-group"]')
              .within(() => {
                cy.get('[class*="subgroup"]')
                  .first()
                  .within(()=>{
                    cy.get('[class*="'+app.InputFields.INPUT_GROUP_CONTENT+'"]')
                      .first()
                      .clear()
                      .type(data[commonLocators.CommonKeys.CODE])
                  
                    cy.document()
                      .its('body')
                      .find(".popup-container")
                      .within(()=>{
                        cy.get("div.popup-content").within(() => {
                          cy.wait(1000)
                          cy.get(`div[class*='column-id']`).each(($cell) => {
                            const cellField: string = $cell.text();
                            if (data[commonLocators.CommonKeys.CODE] === cellField) {
                              cy.wait(1000);
                              cy.wrap($cell).click({ force: true });
                              cy.wait(2000);
                              return false;
                            }
                          });
                        });
                      })
                  })          
              })
              .then(()=>{
                    _modalView.findModal()
                              .findButton(btn.IconButtons.ICO_SEARCH)
                              .clickIn()
                              cy.wait(1000)
                    if(data[app.GridCells.BP_NAME_1]){
                            _modalView.findModal()
                                      .findCellhasValue(app.GridCells.BP_NAME_1, data[app.GridCells.BP_NAME_1])
                                      .should('exist')
                                      .click()
                                      cy.wait(2000)

                            _modalView.findModal()
                                      .findActiveRow()
                                      .findCell(app.SubContainerLayout.INDICATOR)
                                      .clickIn()
                    }
                    if(data[commonLocators.CommonLabels.BRANCH_DESCRIPTION]){
                      _modalView.findModal()
                                      .findCellhasValue(app.GridCells.DESCRIPTION, data[commonLocators.CommonLabels.BRANCH_DESCRIPTION])
                                      .should('exist').click()
                    }
               })
              
          
  }
}

verify_isRecordAdditionOfTwoValuesInModal(Contract: string,value1: string, value2: string,cellClass: string) {
  
  const expResult = parseFloat(value1.replace(",","")) + parseFloat(value2.replace(",",""))
  _modalView.findModal().findModalBody().findCellhasValue(app.GridCells.SOURCE_CODE_DESC,Contract).click()
  _modalView.findModal()
            .findModalBody()
            .findActiveRow()
            .findCell(cellClass)
            .wrapElements()
            .then((element) => {
              const ActResult =  Math.abs(parseFloat(element.text())).toFixed(2);
              expect(ActResult).to.equal(expResult.toFixed(2));
          })
}

validate_replaceMaterial(data:DataCells,parameter:{materialCode_1?:string,materialCode_2?:string,materialCode_3?:string}){

  cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
    .contains(commonLocators.CommonLabels.SCOPE)
    .closest(`${commonLocators.CommonElements.ROW}`)
    .within(()=>{
      cy.contains(data[commonLocators.CommonLabels.SCOPE])
        .prev(`${commonLocators.CommonElements.RADIO_INPUT}`)
        .click()
    })

  cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
    .contains(commonLocators.CommonLabels.REPLACE_FROM)
    .closest(`${commonLocators.CommonElements.ROW}`)
    .within(()=>{
      cy.contains(data[commonLocators.CommonLabels.REPLACE_FROM])
        .prev(`${commonLocators.CommonElements.RADIO_INPUT}`)
        .click()

      if (data[commonLocators.CommonLabels.REPLACE_FROM]==='Specific catalog') {
        cy.get(`[class*='${app.InputFields.INPUT_GROUP_CONTENT}']`)
          .clear()
          .type(data[commonLocators.CommonLabels.MATERIAL_SEARCH])
          .then(()=>{
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()
            cy.document().its('body')
              .find(".popup-container")
              .within(()=>{
                cy.get("div.popup-content").within(() => {
                  cy.get(`div[class*='column-id']`).each(($cell) => {
                    const cellField: string = $cell.text();
                    if (data[commonLocators.CommonLabels.MATERIAL_SEARCH] === cellField) {
                      cy.wait(1000)
                      cy.wrap($cell).click({ force: true });
                      return false;
                    }
                  });
                });
              })
          })
      }
    })
    .then(()=>{
      _modalView.acceptButton(btn.ButtonText.NEXT)
      cy.get('#loading-bar')
        .should('not.exist')
        .then(()=>{
          cy.wait(1000)
          cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
            .find(`${commonLocators.CommonElements.SUB_VIEW_CONTAINER}`)
            .eq(0)
            .within(($el)=>{
                
                if (parameter.materialCode_1) {
                  cy.get(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MATERIAL_CODE}']`,{ timeout: 10000 })
                    .contains(parameter.materialCode_1)
                    .should('exist')
                }
                if (parameter.materialCode_2) {
                  cy.get(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MATERIAL_CODE}']`,{ timeout: 10000 })
                    .contains(parameter.materialCode_2)
                    .should('exist')
                    .click()
                }
            })
            .then(()=>{
              _common.waitForLoaderToDisappear()
              cy.get(`${commonLocators.CommonModalElements.MODAL_DIALOG_CLASS} ${commonLocators.CommonModalElements.MODAL_CONTENT_CLASS}`)
                .find(`${commonLocators.CommonElements.SUB_VIEW_CONTAINER}`)
                .eq(1)
                .within(()=>{
                  if (parameter.materialCode_3) {
                    cy.get(`[class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MATERIAL_CODE}']`,{ timeout: 10000 })
                      .contains(parameter.materialCode_3)
                      .should('exist')
                      .click()
                      .then(()=>{
                        if (data[commonLocators.CommonLabels.FACTOR]) {
                          cy.get(`.active [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.CONVERT_PRICE}']`,{ timeout: 10000 })
                            .then($convertedPrice=>{
                              let convertedPrice:any=parseFloat($convertedPrice.text().replace(',',''))
                              cy.get(`.active [class*='${commonLocators.CommonElements.COLUMN_ID}${app.GridCells.MATERIAL_PRICE}']`,{ timeout: 10000 })
                                .then($price=>{
                                    let price:any=parseFloat($price.text().replace(',',''))*parseFloat(data[commonLocators.CommonLabels.FACTOR].replace(',',''))
                                    expect(convertedPrice).equal(price)
                                })
                            })
                        }
                      })
                  }
                })
            })
        })
    })
    .then(()=>{
      if (data[commonLocators.CommonKeys.BUTTON_HANDLE]) {
        if (data[commonLocators.CommonKeys.BUTTON_HANDLE]=="Replace") {
          _modalView.acceptButton(data[commonLocators.CommonKeys.BUTTON_HANDLE])
          _common.waitForLoaderToDisappear()
          _modalView.acceptButton(btn.ButtonText.OK)
        }else{
          _modalView.acceptButton(data[commonLocators.CommonKeys.BUTTON_HANDLE])
        }
        
      }
    })    
}

verify_invoiceHeaderDetailsForPaymentTerm(container_UUID:string,subContainerText:string,popUpType: string, value: string){
  cy.get("body").then(($body) => {
    let length = $body.find(".cid_"+container_UUID+" .panel-title .ico-up").length;
    if (length > 0) {
      for (let index = 1; index <= length; index++) {
        cy.get(".cid_"+container_UUID+" .panel-title .ico-up")
          .eq(0)
          .click();
      }
      cy.get(`[class="panel-title"] [class*="platform-form-group-header-text"]`)
        .contains(subContainerText)
        .click()
    }
  });
  if(subContainerText==="Payment Terms"){
     cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
       .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, "Payment Term")
       .then((ele) => {
        cy.wrap(ele).find(commonLocators.CommonElements.SPECIFIC_CATALOG_INPUT)
          .eq(0)
          .clear()
          .type(value)
          .then(() => {
        cy.wait(4000) // This wait is necessary
 _mainView.select_popupItem(popUpType, value);
              });
      });
   
}
}

verify_updateRevenue(basedOn: string,xFactor?:string) {
  switch (basedOn) {
    case "Cost":
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.COST_TOTAL)
               .wrapElements()
               .then(($value) => {
                let v1 = $value.text();
                if (parseFloat(v1.replace(',','')).toFixed(2)!=parseFloat("0.00").toFixed(2)) {
                  _mainView.findModuleClientArea()
                           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                           .findGrid()
                           .findActiveRow()
                           .getCell(app.GridCells.REVENUE)
                           .wrapElements()
                           .then(($val) => {
                            let v2 = $val.text();
                            expect(v1).equals(v2);
                           });
                }
               });
      break;
    case "Budget":
      _mainView.findModuleClientArea()
               .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
               .findGrid()
               .findActiveRow()
               .getCell(app.GridCells.BUDGET)
               .wrapElements()
               .then(($value) => {
                  let v1:any = $value.text().replace(',','')
                  if (parseFloat(v1.replace(',','')).toFixed(2)!=parseFloat("0.00").toFixed(2)) {
                      _mainView.findModuleClientArea()
                               .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                               .findGrid()
                               .findActiveRow()
                               .getCell(app.GridCells.REVENUE)
                               .wrapElements()
                               .then(($val) => {
                                let v2:any = $val.text().replace(',','')
                                let v3:any=parseFloat(xFactor.replace(',','')).toFixed(2)
                                let v4:any=parseFloat(v1).toFixed(2)
                                let v5:any=(v4)/(v3)
                                expect(parseFloat(v5).toFixed(2)).equals(parseFloat(v2).toFixed(2));
                               });
               }
        });
      break;
  }
}

verifyRecord_adjustCostUnitAndCostUnit(adjustCostUnit: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
           .findGrid()
           .wrapElements()
           .within(() => {
            cy.get(`[class*='column-id_${app.GridCells.COST_UNIT}']`).each(($el, index, $list) => {
              const value = $el.text();
              expect(value).to.not.equals(adjustCostUnit); 

            });
          });
}


verify_BaseCostPerUnitAndBaseCostTotalOfLineItems(container_UUID_Resource: string, container_UUID_EstimateLineItem: string) {
  let resourceCostTotal: any = 0;
  let estimateCostTotal: any = 0;
  let lineItemBasePerUnit: any = 0;
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID_Resource)
           .getCell(app.GridCells.COST_TOTAL)
           .wrapElements()
           .as("data")
           .each(($el, index, $list) => {
              cy.get("@data").eq(index).click({force:true});
              let newStr = $el.text().replace(",", "");
              resourceCostTotal = resourceCostTotal + parseFloat(newStr);
              cy.log(resourceCostTotal);
           });
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID_EstimateLineItem)
           .findGrid()
           .findActiveRow()
           .getCell(app.GridCells.BASE_COST_TOTAL)
           .wrapElements()
           .then(($v1) => {
              let newStr = $v1.text().replace(",", "");
              estimateCostTotal = parseFloat(newStr);
              cy.log(estimateCostTotal);
              expect(estimateCostTotal).equals(resourceCostTotal);
            });
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID_EstimateLineItem)
           .findGrid()
           .findActiveRow()
           .getCell(app.GridCells.BASE_COST_UNIT)
           .wrapElements()
           .then(($v2) => {
              let newStr = $v2.text().replace(",", "");
              lineItemBasePerUnit = parseFloat(newStr);
              cy.log(lineItemBasePerUnit);
           });
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID_EstimateLineItem)
           .findGrid()
           .findActiveRow()
           .getCell(app.GridCells.QUANTITY_TOTAL)
           .wrapElements()
           .then(($v3) => {
              let newStr = $v3.text().replace(",", "");
              let lineItemQuantityTotal: any = parseFloat(newStr);
              cy.log(lineItemQuantityTotal);
              let calculatedLineItemBasePerUnit = resourceCostTotal / lineItemQuantityTotal;
              expect(calculatedLineItemBasePerUnit).equals(lineItemBasePerUnit);
           });
}

verify_Budget(basedOn: string, xFactor: string, container_UUID: string) {
  switch (basedOn) {
    case "Base Cost Total":
      _mainView.findModuleClientArea()
               .findAndShowContainer(container_UUID)
               .findGrid()
               .getCell(app.GridCells.BUDGET)
               .wrapElements()
               .then(($value) => {
                  let newStr = $value.text().replace(",", "");
                  let budgetLineItem: any = parseFloat(newStr);
                  if (parseFloat(newStr.replace(',','')).toFixed(2)!=parseFloat("0.00").toFixed(2)) {
                    _mainView.findModuleClientArea()
                             .findAndShowContainer(container_UUID)
                             .findGrid()
                             .getCell(app.GridCells.COST_TOTAL)
                             .wrapElements()
                             .then(($val) => {
                                let newStr = $val.text().replace(",", "");
                                let costTotal: any = parseFloat(newStr);
                                let calculatedBudget: any = costTotal * parseFloat(xFactor);
                                console.log("budgetLineItem:" + budgetLineItem + " " + "costTotal:" + costTotal + " " + "calculatedBudget:" + calculatedBudget);
                                expect(calculatedBudget).equals(budgetLineItem);
                             });
                  }
              });
            break;
    }
}

verifyRecord_aqQuantityAndWqQuantity(container_UUID: string, aqQuantity: string, wqQuantity: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .findCell(app.GridCells.QUANTITY_TARGET)
           .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
           .invoke("val").then(function (actualValue: string) {
            expect(actualValue).to.equals(aqQuantity);
            });
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .findCell(app.GridCells.WQ_QUANTITY_TARGET)
           .findTextInput(app.InputFields.INPUT_GROUP_CONTENT)
           .invoke("val").then(function (actualValue: string) {
             expect(actualValue).to.equals(wqQuantity);
            });
}

verify_bulkEditRecords(container_UUID: string, gridcell: string, value: string) {
  _common.maximizeContainer(container_UUID);
  cy.wait(500)
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .wrapElements()
           .within(() => {
            cy.get(`[class*='column-id_${gridcell}']`).each(($el, index, $list) => {
              const ActVal = $el.text();
              cy.log(ActVal);
              expect(ActVal).to.equals(value);
            });
          });
}

verify_bulkEditRecords_Location_assignment(container_UUID: string, gridcell: string, structvalue: string) {
  _common.maximizeContainer(container_UUID);
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .wrapElements()
           .within(() => {
            cy.get(`[class*='column-id_${gridcell}']`).each(($el, index, $list) => {
              const ActVal = $el.text();
              cy.log(structvalue);
              expect(ActVal).to.equals(structvalue);
            });
           });
}

verify_LineItemaqQuantity(verifyquantity: string) {
  cy.REFRESH_CONTAINER();
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
           .findGrid()
           .findActiveRow()
           .getCell(app.GridCells.QUANTITY_TARGET)
           .wrapElements()
           .then(($ele) => {
            const quantityvalue2 = $ele.text();
            var quantityFinal2 = quantityvalue2.split(".");
            cy.log(quantityFinal2[0]);
            expect(quantityFinal2[0]).to.equals(verifyquantity);
          });
}


verifyRecord_CostUnit_resource(lineitemDes: string, costUnit: string) {
  _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS).findGrid().findCellhasValue(app.GridCells.DESCRIPTION_INFO, lineitemDes).click({ force: true });
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.RESOURCES)
           .findGrid()
           .wrapElements()
           .within(() => {
             cy.get(`[class*='column-id_${app.GridCells.COST_UNIT}']`).each(($el) => {
              const value = $el.text();
               expect(value).to.not.equals(costUnit);
              // if (value == costUnit) {
              //   cy.log(
              //     "Cost/Unit values are same for resource after updated cost/unit"
              //   );
              // } else if (value !== costUnit) {
              //   cy.log(
              //     "Cost/Unit values are different for the resource where cost/unit is not modified"
              //   );
              // }
            });
          });
}

verify_roundingUnderBoQStructure(column: string, roundingStatus: string, UIDisplayTo: number, roundTO: number, qty: any, unitrate: any, finalprice: any) {
  switch (roundingStatus) {
    case "Rounding":
      var quantity: any;
      var unitRate: any;
      var finalPrice: any;
      var quantityIn: any;
      var unitRateIn: any;
      var round: any = Math.abs(UIDisplayTo - roundTO);
      var element: any = "0".padEnd(round, "0");
      if (column == "QUANTITY" || column == "FINAL_PRICE") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.QUANTITY_SMALL)
                 .wrapElements()
                 .then(($value) => {
                  quantity = qty.toFixed(roundTO) + element;
                  console.log("RQTY:" + quantity);
                  expect($value.text().replace(",", "")).equals(quantity.toString());
                });
        }
      cy.wait(500);
      if (column == "UNIT_RATE" || column == "FINAL_PRICE") {
         _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                 .findGrid()
                 .findActiveRow()
                 .getCell( app.GridCells.PRICE_SMALL)
                 .wrapElements()
                 .then(($value) => {
                  unitRate = unitrate.toFixed(roundTO) + element;
                  console.log("RUNITRATE:" + unitRate);
                  expect($value.text().replace(",", "")).equals(unitRate.toString());
                });
        }
      cy.wait(500);
      if (column == "FINAL_PRICE" || column == "FINAL_PRICE_IN") {
         _mainView.findModuleClientArea()
                  .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                  .findGrid()
                  .findActiveRow()
                  .getCell(app.GridCells.FINAL_PRICE_SMALL)
                  .wrapElements()
                  .then(($value) => {
                    if (finalprice == 0) {
                      finalPrice = (quantity * unitRate).toFixed(roundTO) + element;
                      console.log("RFINAL:" + finalPrice);
                      expect($value.text().replace(",", "")).equals(finalPrice.toString());
                     } else {
                      _mainView.findModuleClientArea()
                               .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                               .findGrid()
                               .findActiveRow()
                               .getCell(app.GridCells.QUANTITY_SMALL)
                               .wrapElements().then(($valueQ) => {
                                  quantityIn = $valueQ.text().replace(",", "");
                                  console.log("quantityIn:" + quantityIn);
                                  _mainView.findModuleClientArea()
                                           .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                                           .findGrid()
                                           .findActiveRow()
                                           .getCell( app.GridCells.PRICE_SMALL)
                                           .wrapElements()
                                           .then(($valueR) => {
                                            unitRateIn = $valueR.text().replace(",", "");
                                            console.log("unitRateIn:" + unitRateIn);
                                            console.log("quantityIn:" + quantityIn);
                                            finalPrice = (parseFloat(quantityIn) * parseFloat(unitRateIn)).toFixed(roundTO) + element;
                                            console.log("RFINAL_1:" + finalPrice);
                                            expect($value.text().replace(",", "")).equals(finalPrice.toString());
                                            });
                                  });
                        }
          });
      }
      break;

    case "WithoutRounding":
      var quantity: any;
      var unitRate: any;
      var finalPrice: any;
      var quantityIn: any;
      var unitRateIn: any;

      _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQ_STRUCTURES).findGrid().findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Position").click();
      cy.wait(500);
      if (column == "QUANTITY" || column == "FINAL_PRICE") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.QUANTITY_SMALL)
                 .wrapElements()
                 .then(($value) => {
                  quantity = qty;
                  console.log("WRQTY:" + quantity);
                  expect($value.text().replace(",", "")).equals(quantity.toString());
                });
       }
      cy.wait(500);
      if (column == "UNIT_RATE" || column == "FINAL_PRICE") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                 .findGrid()
                 .findActiveRow()
                 .getCell( app.GridCells.PRICE_SMALL)
                 .wrapElements()
                 .then(($value) => {
                  unitRate = unitrate;
                  console.log("WRUNITRATE:" + unitRate);
                  expect($value.text().replace(",", "")).equals(unitRate.toString());
                });
       }
      cy.wait(500);
      if (column == "FINAL_PRICE" || column == "FINAL_PRICE_IN") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.FINAL_PRICE_SMALL)
                 .wrapElements()
                 .then(($value) => {
                  if (finalprice == 0) {
                    finalPrice = (quantity * unitRate).toFixed(UIDisplayTo);
                    console.log("WRFINALPRICE:" + finalPrice);
                    expect($value.text().replace(",", "")).equals(finalPrice.toString());
                   } else {
                    _mainView.findModuleClientArea()
                             .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                             .findGrid()
                             .findActiveRow()
                             .getCell(app.GridCells.QUANTITY_SMALL)
                             .wrapElements()
                             .then(($valueQ) => {
                              quantityIn = $valueQ.text().replace(",", "");
                              console.log("quantityIn:" + quantityIn);
                              _mainView.findModuleClientArea()
                                       .findAndShowContainer(cnt.uuid.BOQ_STRUCTURES)
                                       .findGrid()
                                       .findActiveRow()
                                       .getCell( app.GridCells.PRICE_SMALL)
                                       .wrapElements()
                                       .then(($valueR) => {
                                        unitRateIn = $valueR.text().replace(",", "");
                                        console.log("unitRateIn:" + unitRateIn);
                                        console.log("quantityIn:" + quantityIn);
                                        finalPrice = (parseFloat(quantityIn) * parseFloat(unitRateIn)).toFixed(roundTO) + element;
                                        console.log("RFINAL_1:" + finalPrice);
                                        expect($value.text().replace(",", "")).equals(finalPrice.toString());
                                        });
                               });
                     }
            });
        }
      break;
  }
}

verify_roundingUnderEstimateLineItem(column: string, roundingStatus: string, UIDisplayTo: number, roundTO: number, aQQuantity: any, wQQuantity: any) {
  cy.wait(500);
  switch (roundingStatus) {
    case "Rounding":
      var aqQuantity: any;
      var wqQuantity: any;
      var round: any = Math.abs(UIDisplayTo - roundTO);
      var element: any = "0".padEnd(round, "0");
      if (column == "AQ Quantity" || column == "Both") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.QUANTITY_TARGET)
                 .wrapElements()
                 .then(($value) => {
                  aqQuantity = aQQuantity.toFixed(roundTO) + element;
                  console.log("aqQuantity:" + aqQuantity);
                  expect($value.text().replace(",", "")).equals(aqQuantity.toString());
                 });
      }
      if (column == "WQ Quantity" || column == "Both") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.WQ_QUANTITY_TARGET)
                 .wrapElements()
                 .then(($value) => {
                  wqQuantity = wQQuantity.toFixed(roundTO) + element;
                  console.log("wqQuantity:" + wqQuantity);
                  expect($value.text().replace(",", "")).equals(wqQuantity.toString());
                 });
      }
      cy.wait(500);
      break;
    case "WithoutRounding":
      var aqQuantity: any;
      var wqQuantity: any;
      cy.wait(500);
      if (column == "AQ Quantity" || column == "Both") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.QUANTITY_TARGET)
                 .wrapElements()
                 .then(($value) => {
                  aqQuantity = aQQuantity;
                  console.log("aqQuantity:" + aqQuantity);
                  expect($value.text().replace(",", "")).equals(aqQuantity.toString());
                 });
      }
      cy.wait(500);
      if (column == "WQ Quantity" || column == "Both") {
        _mainView.findModuleClientArea()
                 .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                 .findGrid()
                 .findActiveRow()
                 .getCell(app.GridCells.WQ_QUANTITY_TARGET)
                 .wrapElements()
                 .then(($value) => {
                  wqQuantity = wQQuantity;
                  console.log("wqQuantity:" + wqQuantity);
                  expect($value.text().replace(",", "")).equals(wqQuantity.toString());
                });
            }
      break;
  }
  cy.wait(500);
}

verify_remainingPercentageOf_activityStructure(remainingQty: any) {
  cy.get(`[class*='active'] div.column-id_${app.GridCells.PLANNED_QUANTITY}`).then(function (pQty) {
    const PlQty = pQty.text();
    let plannedQty:any = Number(PlQty);
    let remPercentage:any = (remainingQty / plannedQty) * 100;
    let finalRemPercentage:any = parseFloat(remPercentage).toFixed(2);
    cy.wait(500);
    cy.get(`[class*='active'] div.column-id_${app.GridCells.REMAINING_PCO}`).then(function (remPer) {
      const remainingPer = remPer.text();
      let percentage = Number(remainingPer).toFixed(2);
      expect(percentage).equals(finalRemPercentage);
    });
  });
}

verify_LineItemQuantities(quantity: any) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.LINE_ITEM_QUANTITIES)
           .findGrid()
           .wrapElements()
           .within(() => {
            cy.get(`[class*='column-id_${app.GridCells.QUANTITY_SMALL}'] `).eq(0).should("include.text", quantity);
          });
}

/* verify cost total of resources with costtotal of line item */
verify_costTotalOfResources_WithLineItemCostTotal() {
  cy.wait(500)
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.RESOURCES)
           .findGrid()
           .getCell(app.GridCells.COST_TOTAL)
           .wrapElements().then(($costTotalElements: JQuery<HTMLElement>) => {
              const totalCost = Array.from($costTotalElements)
                                     .map((costTotalElement) => parseFloat(costTotalElement.textContent.replace(/,/g, '')))
                                     .reduce((total, costTotal) => total + costTotal, 0);
              cy.wait(500);
              _mainView.findModuleClientArea()
                       .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
                       .findGrid()
                       .getCell(app.GridCells.COST_TOTAL)
                       .wrapElements()
                       .invoke("text").then((lcostTotal) => {
                          const lineItemCostTotal = parseFloat(lcostTotal.replace(/,/g, ''));
                          console.log("Line Item Cost Total:", lineItemCostTotal.toLocaleString());
                          expect(totalCost.toFixed(2)).to.equal(lineItemCostTotal.toFixed(2));
                       });
            });
}

verify_PackageTotal_with_CostTotal(value:string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.TOTALS)
           .findGrid()
           .findCellhasValue(app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
           .click()
           .then(() => {
              _common.waitForLoaderToDisappear()
              _common.assert_forNumericValues(cnt.uuid.TOTALS, app.GridCells.VALUE_NET,value);
            });
}

verify_splitLineItem_In_LineItemContainer(container_UUID: string, gridCell: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .getCell(gridCell)
           .wrapElements()
           .each(($el) => {
            const value = $el.text();
            console.log("value-->" + value);
            if (value == Cypress.env("QuantityTotal1")) {
              expect(value).to.equals(Cypress.env("QuantityTotal1"));
            } else if (value == Cypress.env("QuantityTotal2")) {
              expect(value).to.equals(Cypress.env("QuantityTotal2"));
            } else {
              console.log("The line item is not split");
            }
          });
}

verify_referenceLineItem_with_baseLineItem(container_UUID: string, CellClass: string) {
  let base;
  let reference;
  _common.clickOn_cellHasIcon(container_UUID, app.GridCells.INFO, btn.IconButtons.ICO_BASE_LINE);
  _common.getText_fromCell(container_UUID, CellClass).then(($ele1: JQuery<HTMLElement>) => {
    const text = $ele1.text();
    base = $ele1.text();
    console.log("======", text);
    cy.log("Base-cost total==>", base);

    _common.clickOn_cellHasIcon(container_UUID, app.GridCells.INFO, btn.IconButtons.ICO_REFERENCE_LINE);
    _common.getText_fromCell(container_UUID, CellClass).then(($ele1: JQuery<HTMLElement>) => {
      const text = $ele1.text();
      reference = $ele1.text();
      console.log("======", text);
      cy.log("Reference-cost total==>", reference);
      expect(base).to.equal(reference);
    });
  });
}

verify_QuantityTotalOfLineItem(container_UUID: string, gridCell1: string, gridCell2: string, gridCell3: string) {
  var quantityTotal: any;
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID)
           .findGrid()
           .findActiveRow()
           .getCell(gridCell1)
           .wrapElements()
           .then(($value) => {
            let quantity = $value.text().replace(",", "");
            cy.log(quantity);
            _mainView.findModuleClientArea()
                     .findAndShowContainer(container_UUID)
                     .findGrid()
                     .findActiveRow()
                     .getCell(gridCell2)
                     .wrapElements()
                     .then(($value) => {
                      let aqquantity = $value.text().replace(",", "");
                      cy.log(aqquantity);
                      quantityTotal = (parseFloat(quantity) * parseFloat(aqquantity)).toFixed(2);
                      cy.log(quantityTotal);
            _mainView.findModuleClientArea()
                     .findAndShowContainer(container_UUID)
                     .findGrid()
                     .findActiveRow()
                     .getCell(gridCell3)
                     .wrapElements()
                     .then(($value) => {
                      let lineItem_QuantityTotal = $value.text().replace(",", "");
                      expect(quantityTotal).equals(parseFloat(lineItem_QuantityTotal).toFixed(2));
                     });
              });
          });
}

verify_TotalsAndGrandTotalOfLineItems(container_UUID_1: string, cellID1: string, data: string, container_UUID_2: string, cellID2: string) {
  let resourceCostTotal: any = 0;
  let estimateCostTotal: any = 0;

  _mainView.findModuleClientArea().findAndShowContainer(container_UUID_1).findGrid().wrapElements().within(() => {
    cy.get('[id*="indicator"]').click({ force: true });
  })
  cy.wait(3000);
  _common.maximizeContainer(container_UUID_2);
  _mainView.findModuleClientArea().findAndShowContainer(container_UUID_2).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ICO_TOTAL).clickIn();
  cy.wait(3000);
  _mainView.findModuleClientArea()
  .findAndShowContainer(container_UUID_2)
  .findGrid()
  .containsValue(data)
  .scrollIntoView()
  .click({ force: true });    _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID_2)
           .findGrid()
           .findActiveRow()
           .getCell(cellID2)
           .wrapElements()
           .then(($v1) => {
            let newStr = $v1.text().replace(",", "");
            estimateCostTotal = parseFloat(newStr);
            cy.log(estimateCostTotal);
            Cypress.env("GrandTotals", estimateCostTotal);

          });
  cy.log(Cypress.env("GrandTotals"));
  _common.minimizeContainer(container_UUID_2);
  cy.wait(3000);
  _mainView.findModuleClientArea()
           .findAndShowContainer(container_UUID_1)
           .getCell(cellID1)
           .wrapElements()
           .as("data")
           .each(($el, index, $list) => {
            cy.get("@data").eq(index).click();
            let newStr = $el.text().replace(",", "");
            resourceCostTotal = resourceCostTotal + parseFloat(newStr);
            Cypress.env("LineGrandTotals", estimateCostTotal);
            cy.log(Cypress.env("LineGrandTotals"));

          });
  expect(Cypress.env("GrandTotals")).equals(Cypress.env("LineGrandTotals"));
}

verify_splitLineItem_byResource(container_UUID: string, gridCell: string, resourceDescription: string) {
  _mainView.findModuleClientArea().findAndShowContainer(container_UUID).getCell(gridCell).wrapElements().as("data");
  for (let i = 1; i <= 3; i++) {
    cy.get("@data").eq(i).click();
    cy.wait(500);
    cy.contains("[class*='cid_bedd392f0e2a44c8a294df34b1f9ce44'] [class*='column-id_descriptioninfo']", resourceDescription).should("be.visible").click();
  }
}

verify_Percentage_DJC_and_TJC(uuid1: string, gridcell1: string, uuid2: string, gridcell2: string, uuid3: string, gridcell3: string) {
  cy.get(`[class*='cid_${uuid1}'] [class*='active'] div.column-id_${gridcell1}`)
    .then(function (cTotal) {
        const costTotal = cTotal.text().replace(/,/g, '');
        ActCostTotal = parseFloat(costTotal).toFixed(2);
        cy.log("cost Totals is :" + ActCostTotal)
  })

  cy.get(`[class*='cid_${uuid2}'] [class*='active'] div.column-id_${gridcell2}`).then(function (pQty) {
    const PlQty = pQty.text().replace(/,/g, '');
    plannedQty = parseFloat(PlQty);
    remPercentage = (plannedQty / 100) * ActCostTotal;
    finalRemPercentage = parseFloat(remPercentage).toFixed(2);
    cy.log("Percentage Totals is :" + finalRemPercentage)
    cy.wait(500);
    cy.get(`[class*='cid_${uuid3}'] [class*='active'] div.column-id_${gridcell3}`)
      .then(function (remPer) {
          const remainingPer = remPer.text().replace(/,/g, '');
          percentage = parseFloat(remainingPer).toFixed(2);
          cy.log("% Djc Totals is :" + percentage)
          expect(percentage).equals(finalRemPercentage);
     });
  });
}

verify_BudgetTotal(uuid: string, xFactor: any, TotalCellid: string, QuantityCellid: string) {
   
  cy.get(`[class*='cid_${uuid}'] [class*='active'] div.column-id_${TotalCellid}`)
    .then(function (ele) {
      const Budget = ele.text().replace(/,/g, '');
      plannedQty = parseFloat(Budget);
      cy.log("plannedQty is :" + plannedQty)
      cy.wait(500);
      remPercentage = plannedQty * xFactor;
      cy.log("remPercentage is :" + remPercentage)
      cy.wait(500);
      finalRemPercentage = parseFloat(remPercentage).toFixed(2);
      cy.log("Total is :" + finalRemPercentage)
      cy.wait(500);
      cy.get(`[class*='cid_${uuid}'] [class*='active'] div.column-id_${QuantityCellid}`)
        .then(function (remPer) {
            cy.wait(500);
            const Wqquantity = remPer.text();
            percentage = parseFloat(Wqquantity.replace(/,/g, '')).toFixed(2);
            cy.log("Budget is :" + percentage)
            expect(percentage).equals(finalRemPercentage);
        });
  });
}


verify_DragAndDropEstimateLineItem(codeValue: string, qty: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
           .findGrid()
           .getCell(app.GridCells.CODE)
           .wrapElements()
           .then(($value) => {
            let code = $value.text();
            expect(code).equals(codeValue);
           });
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
           .findGrid()
           .getCell(app.GridCells.QUANTITY_SMALL)
           .wrapElements()
           .then(($value) => {
            let quantity = $value.text();
            expect(Number(quantity)).equals(Number(qty));
          });
}

verify_DragAndDropAssemblySourceLineItem(assembly: string, costTotal: string) {
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
           .findGrid()
           .getCell(app.GridCells.EST_ASSEMBLY_FK)
           .wrapElements()
           .then(($value) => {
            let assemblies = $value.text();
            expect(assemblies).equals(assembly);
          });
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.ESTIMATE_LINEITEMS)
           .findGrid()
           .getCell(app.GridCells.COST_TOTAL)
           .wrapElements()
           .then(($value) => {
            let cost = $value.text();
            expect(cost).equals(costTotal);
          });
}

verify_payment_for_contract_sales_according_to_required_user_frequence(code: string) {
  _common.clickOn_cellHasUniqueValue(cnt.uuid.PAYMENT_SCHEDULE_V1,app.GridCells.CODE,code)
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
           .findGrid()
           .wrapElements()
           .within(() => {
             cy.get(`.active div.column-id_${ app.GridCells.AMOUNT_NET}`).then(($el) => {
               const ActVal = ($el.text()).replace(',','');
               cy.log(ActVal);
               expect(parseFloat(actualNetValue.replace(',','')).toFixed(3)).to.equals(parseFloat(ActVal).toFixed(3));
             });
           });
}
verify_isRecordInPresent_inContainersForm(container_UUID:string,labelName:string,inputFieldsClass:string,value:string){
  cy.get(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW)
      .contains(`[class*='cid_${container_UUID}'] `+commonLocators.CommonElements.ROW, labelName)
      .then((ele) => {       
        cy.wrap(ele).get(commonLocators.CommonElements.PLATFORM_FORM_COL).find(inputFieldsClass)
          .first()
          .invoke('val')
          .then(($value)=>{
              expect($value).equal(value)
          })
      });
}
verify_isIconPresent(container_UUID: string, gridCellClass:string, compareValue: string) {
  _mainView
    .findModuleClientArea()
    .findAndShowContainer(container_UUID)
    .findGrid()
    .wrapElements().then(($cell) => {
      cy.wrap($cell).get(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).find(`i.${compareValue}`).should("exist")
    })
}

verify_isIconNotPresent(container_UUID: string, gridCellClass:string, compareValue: string) {
  _mainView
    .findModuleClientArea()
    .findAndShowContainer(container_UUID)
    .findGrid()
    .wrapElements().then(($cell) => {
      cy.wrap($cell).get(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`).find(`i.${compareValue}`).should("not.exist")
    })
}



verify_Bill_From_Payment_Schedule(contract: string, code: string) {
  _common.openTab(app.TabBar.APPLICATIONS)
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
           .findGrid()
           .findCellhasValue(app.GridCells.BOQ_LINE_TYPE_FK, "Root").click()
  _mainView.findModuleClientArea()
           .findAndShowContainer(cnt.uuid.BILLBOQSTRUCTURE)
           .findGrid()
           .findActiveRow()
           .getCell(app.GridCells.LUMP_SUM_PRICE)
           .wrapElements()
           .then(($ele) => {
            const LumSumvalue = $ele.text()
            _common.openTab(app.TabBar.BILLS)
            cy.wait(6000)
            _common.clickOn_toolbarButton(cnt.uuid.BILLS,btn.IconButtons.ICO_GO_TO)
            _mainView.select_popupItem('span', contract);
            cy.wait(3000)
            _mainView.findModuleClientArea()
              .findAndShowContainer(cnt.uuid.PAYMENT_SCHEDULE_V1)
              .findGrid()
              .findCellhasValue(app.GridCells.CODE, code)
              .click()
            cy.REFRESH_CONTAINER()
          //  _common.assert_cellData_insideActiveRow(cnt.uuid.PAYMENT_SCHEDULE_V1, app.gridCells.BILLAMOUNTNET, LumSumvalue)
           })
  }
  verify_isCellPresent(container_UUID: string, gridCellClass:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .wrapElements()
             .within(() => {
                 cy.get(`.${app.SubContainerLayout.ACTIVE} div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
                   .should("have.class",`${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
      })
  }

  verify_isValueNotPresentInCell(container_UUID: string, gridCellClass:string,value:string){
    _mainView.findModuleClientArea()
             .findAndShowContainer(container_UUID)
             .findGrid()
             .wrapElements()
             .within(() => {
                 cy.get(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
                   .should("not.have.text",`${value}`)
      })
  }

  verify_codeLookUp(container_UUID:string,cellClass:string,characteristicGroup:string,characteristics:string[],buttonText:string,verificationType:string){
    _common.waitForLoaderToDisappear()
    _common.clickOn_activeRowCell(container_UUID,app.GridCells.CHARACTERISTIC_FK)
    _common.lookUpButtonInCell(container_UUID,cellClass,app.GridCellIcons.BLOCK_IMAGE,0)
    cy.wait(2000)//  Added this wait as data take time to load
    _common.waitForLoaderToDisappear()
    _modalView.findModal()
              .acceptButton(btn.ButtonText.REFRESH)
    _common.waitForLoaderToDisappear()
    cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
      .find('[class*="tree-label"]')
      .contains(characteristicGroup)
      .click()
      .then(()=>{
        for(var index in characteristics){
          if(verificationType===commonLocators.CommonKeys.SHOULD_NOT_EXIST){
            cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
              .contains(characteristics[index])
              .should('not.exist')
          }if(verificationType===commonLocators.CommonKeys.SHOULD_EXIST){
            cy.get(`${commonLocators.CommonModalElements.MODAL_BODY}`)
              .find(`[class*='${commonLocators.CommonElements.COLUMN_ID}']`)
              .contains(characteristics[index])
              .should('exist')
          }
          
        }
      })
    _common.clickOn_modalFooterButton(buttonText)
    _common.waitForLoaderToDisappear()
  }
  validateData_fromCellPopUpMenu(gridCellClass: string, expectedValue: string) {
    cy.wait(1000);
		cy.get(".popup-container").within(() => {
              cy.get(`div.${app.SubContainerLayout.COLUMN_ID}_${gridCellClass}`)
                .first()
                .then(($el) => {
                  const ActVal = $el.text();
                  cy.log(ActVal);
                  expect(expectedValue).to.equals(ActVal.trim());
                });
      });
  }

  verify_costCode_inBoqStructure(costCodeName: string) {
		_modalView.findModal()
				      .findButtonIndex(btn.IconButtons.ICO_SEARCH,0)
				      .clickIn()
            cy.wait(2000)//required wait to get grid cell in modal
		_modalView.findModal()
              .acceptButton(btn.ButtonText.REFRESH)
    cy.wait(500)
      .then(()=>{
        cy.get("[class*='modal-dialog'] ")
          .contains('.modal-content', commonLocators.CommonLabels.COSTCODES)
          .within(() => {
            cy.get(`input[class*='${app.InputFields.FORM_CONTROL}']`)
              .as('searchInput');
            cy.get('@searchInput')
              .first()
              .clear({force:true})
              .wait(1000)
              .type(costCodeName,{force:true});
          });
      })         
		_modalView.findModal()
				      .findButton(btn.IconButtons.ICO_SEARCH)
              .clickIn()
            cy.wait(2000)//required wait to get grid cell in modal
		_modalView.findModalBody()
				      .findGrid()
				      .findCellhasValue(app.GridCells.DESCRIPTION_CAPS, costCodeName)
				      .click()		
		_common.assert_cellDataByContent_fromModal(app.GridCells.DESCRIPTION_CAPS,costCodeName)
		_common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
	}





  calculatePlannedFinish(containerUUID, type, numberOfDays, dateFetched) {
    return _mainView
      .findModuleClientArea()
      .findAndShowContainer(containerUUID)
      .findGrid()
      .getCell(app.GridCells.PLANNED_FINISH)
      .wrapElements()
      .invoke("text")
      .then((text) => {
        if (type === "excludeweekend" && dateFetched) {
          var datearray = dateFetched.split("/");
          var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
          let date = new Date(newdate);
  
          // Function to check if a given date is a weekend (Saturday or Sunday)
          const isWeekend = (d) => {
            return d.getDay() === 0 || d.getDay() === 6; // 0 is Sunday, 6 is Saturday
          };
  
          // Increment the date by numberOfDays, skipping weekends
          for (let i = 0; i < numberOfDays; i++) {
            do {
              date.setDate(date.getDate() + 1);
            } while (isWeekend(date));
          }
  
          let year = date.getFullYear();
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let day = date.getDate().toString().padStart(2, '0');
  
          let incFullDate = `${day}/${month}/${year}`;
  
          // Assert that the text includes the modified date
          cy.wrap(text).should('include', incFullDate);
      
          // Additional actions or assertions after the async assertion
          return cy.wrap(incFullDate);
        }
      })
      .then((modifiedDate) => {
        cy.log(`Modified Date: ${modifiedDate}`);
      });
  }
  
}

