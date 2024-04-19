/// <reference types="cypress" />
import {
    _common,
    _mainView,
    _modalView,
_billingSchemaCalculate
} from "cypress/pages";
import {app, cnt, btn, sidebar, commonLocators} from "cypress/locators";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
import Buttons from "cypress/locators/buttons";
import {find} from "rxjs";
const amounts=[];

export class billingSchemaCalculate {
    /* Entering record to create package header */


    openModuleFromQuickStart(moduleName) {
        _common.waitForLoaderToDisappear();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.waitForLoaderToDisappear();
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, moduleName)
        _common.waitForLoaderToDisappear();
        cy.wait(5000);
    }

    searchWithCodeFromSideBar(code) {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard", code)

    }


    shiftCursorToCell(containerUUID, cellType, containerPosition?: number, recordType?: string) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID, containerPosition)
            .findGrid()
            .findActiveRow()
            .findCell(cellType, recordType)

    }
    selectRecordMakeItActiveByCode(container, cell, code) {

        cy.wait(300).then(() => {
            _mainView.findModuleClientArea()
                .findAndShowContainer(container)
                .findCellhasValue(cell, code)
                .click({force: true});
        });
        cy.wait(2000)
    }
    get_and_Verify_cellValue(container, cell, columnName, rate?: string) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(container)
            .findGrid()
            .findActiveRow()
            .getCell(cell)
            .wrapElements()
            .then(($ele) => {
                var a = $ele.text();
                a = a.toString();
                const b = a.replace(/,/gi, '');
                const c = parseFloat(b);
                if (rate) {
                    Cypress.env(columnName, c.toFixed(5));
                } else Cypress.env(columnName, c.toFixed(2));
                cy.wait(100);
            });
    }

    get_value_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION, billingSchemaDescription)
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.VALUE, `${type}_Value${num}`);
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT, `${type}_Result${num}`);
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT_OC, `${type}_ResultOc${num}`);
    }


    get_reconciliation_value() {
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'Amount')
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET_OC, 'amountNetOc');
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_VAT_OC, 'amountNetVatOc');
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'From PES')
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET_OC, 'PESNetOc');
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_VAT_OC, 'PESNetVatOc');
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'From Contract')
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET_OC, 'contractNetOc');
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_VAT_OC, 'contractNetVatOc');
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'From Other')
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET_OC, 'otherNetOc');
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_VAT_OC, 'otherNetVatOc');
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'Rejections')
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET_OC, 'rejectionNetOc');
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_VAT_OC, 'rejectionNetVatOc');
    }

    getRate() {
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICEHEADER, app.GridCells.EXCHANGE_RATE, 'rate', 'rate')
    }
    getDiscount() {
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICEHEADER, app.GridCells.PERCENT_DISCOUNT, 'discountPercent' )
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_DISCOUNT_BASIS, 'discountBasis' )
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_DISCOUNT_BASIS_OC, 'discountBasisOc' )
    }
    get_payment(num?:string) {
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICEHEADER, app.GridCells.TOTALPAYMENTCUMULATIVE, `totalPaymentCumulative${num}` )
        _billingSchemaCalculate.get_and_Verify_cellValue(cnt.uuid.INVOICEHEADER, app.GridCells.TOTALPAYMENTDISCOUNTCUMULATIVE, `totalPaymentDiscountCumulative${num}` )
    }
    getTaxCode(container) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(container)
            .findGrid()
            .findActiveRow()
            .getCell(app.GridCells.TAX_CODE_FK)
            .wrapElements()
            .then(($ele) => {
                var a = $ele.text();
                if (a == '19') {
                    Cypress.env('taxCode', 19);
                } else if (a == '16') {
                    Cypress.env('taxCode', 16);
                } else if (a == '07') {
                    Cypress.env('taxCode', 7);
                } else if (a == '05') {
                    Cypress.env('taxCode', 5);
                }

            });

    }


    click_recalculate_button(containerUUID: string, containerPosition?: number) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID, containerPosition)
            .toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR)
            .findButton(btn.ToolBar.ICO_RECALCULATE)
            .clickIn();
        _common.waitForLoaderToDisappear();
    }

    get_netTotal_from_billingSchema(billingSchemaDescription,type,num?:string) {
       _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num)
    }
    verify_netTotal_after_recalculate(parameterName,num?:string){
        cy.wait(300).then(()=>{
            cy.log('net total:result oc =from pes oc+from contract item oo+from other oc:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=parseFloat(Cypress.env('PESNetOc'))+parseFloat(Cypress.env('contractNetOc'))+parseFloat(Cypress.env('otherNetOc'))
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))

            cy.log('net total:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('net total:value  = 0:'+Cypress.env(`netTotal_Value${num}`));
            expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))
        })
   }

    get_previousPeriodNetTotal_from_billingSchema(billingSchemaDescription,type,num?:string) {
       _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num)
    }
    verify_previousPeriodNetTotal_after_recalculate(progressInvoice,parameterName,referenceBillingSchema?:string,num?:string){
        cy.wait(300).then(()=>{

            if(progressInvoice ==1){
                const h=0.00;
                cy.log('first invoice:previous period net total:value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(h.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('first invoice:previous period net total:result  = 0:'+Cypress.env(`${parameterName}_Result${num}`));
                expect(h.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('first invoice:previous period net total:result oc =0:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(h.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))




            }
            else {
                cy.log('previous period net total:value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('previous period net total:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('previous period net total:result oc =previous net total result oc *(-1):'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${referenceBillingSchema}_ResultOc${num}`))*(-1)
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))




            }

        })
    }

    get_vatCalculated_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_vatCalculated_after_recalculate(parameterName,refer,num?:string) {
        cy.wait(300).then(() => {

            cy.log('vat calculated:value  = from header taxt code.vatpercent:' + Cypress.env(`${parameterName}_Value${num}`));
            expect(parseFloat(Cypress.env('taxCode')).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`));

            cy.log('vat calculated:result  = net total+previous total:' + Cypress.env(`${parameterName}_Result${num}`));
            const b = parseFloat(Cypress.env(`${refer}_Result${num}`))*Cypress.env('taxCode')/100
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('vat calculated:result oc =:' + Cypress.env(`${parameterName}_ResultOc${num}`));
            const a = parseFloat(Cypress.env(`${refer}_ResultOc${num}`))*parseFloat(Cypress.env('taxCode'))/100
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
        })
    }

    get_vatEvaluated_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_vatEvaluated_after_recalculate(parameterName,progress,num?:string,previous?:string,value?:number) {
        cy.wait(300).then(() => {
           if(progress=='1'){
            cy.log('vat evaluated no chained invoice:value  =0' + Cypress.env(`${parameterName}_Value${num}`));
            expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`));

            cy.log('vat evaluated no chained invoice:result  = net total+previous total:' + Cypress.env(`${parameterName}_Result${num}`));
            const b = parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('vat evaluated no chained invoice:result oc =:' + Cypress.env(`${parameterName}_ResultOc${num}`));
            const a = parseFloat(Cypress.env('PESNetVatOc'))+parseFloat(Cypress.env('contractNetVatOc'))+parseFloat(Cypress.env('otherNetVatOc'))
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
           }
           else if(progress=='2'){
               cy.log('vat evaluated has one chained invoice:value  =0' + Cypress.env(`${parameterName}_Value${num}`));
               expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`));

               cy.log('vat evaluated has one chained invoice:result  = net total+previous total:' + Cypress.env(`${parameterName}_Result${num}`));
               const b = parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
               expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

               cy.log('vat evaluated has one chained invoice:result oc =:' + Cypress.env(`${parameterName}_ResultOc${num}`));
               const a = parseFloat(Cypress.env('PESNetVatOc'))+parseFloat(Cypress.env('contractNetVatOc'))+parseFloat(Cypress.env('otherNetVatOc'))-parseFloat(Cypress.env(`${parameterName}_ResultOc${previous}`))
               expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
           }
           else if(progress=='editable'){
               cy.log('vat evaluated editable=true:value  =0' + Cypress.env(`${parameterName}_Value${num}`));
               expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`));

               cy.log('vat evaluated editable=trueinvoice:result  = net total+previous total:' + Cypress.env(`${parameterName}_Result${num}`));
               const b = parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
               expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

               cy.log('vat evaluated editable=true invoice:result oc =:' + Cypress.env(`${parameterName}_ResultOc${num}`));
               expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
           }
        })

    }

    get_subTotal_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_subTotal_after_recalculate(parameterNamenum,sub?:string,refer1?:string,refer2?:string,num?:string){
        cy.wait(300).then(()=>{
               if(sub=='sum'){
               cy.log('sub total:value  = 0:'+Cypress.env(`${parameterNamenum}_Value${num}`));
               expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterNamenum}_Value${num}`)) ;

              cy.log('sub total:result  = net total+previous total:'+Cypress.env(`${parameterNamenum}_Result${num}`));
              const b=parseFloat(Cypress.env(`${refer1}_Result${num}`))+parseFloat(Cypress.env(`${refer2}_Result${num}`))
              expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterNamenum}_Result${num}`))

                cy.log('sub total:result oc =:'+Cypress.env(`${parameterNamenum}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${refer1}_ResultOc${num}`))+parseFloat(Cypress.env(`${refer2}_ResultOc${num}`));
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterNamenum}_ResultOc${num}`))
               }
               else {
                   cy.log('sub total:value  = 0:'+Cypress.env(`${parameterNamenum}_Value${num}`));
                   expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterNamenum}_Value${num}`)) ;

                   cy.log('sub total:result  = vat (calculated) result:'+Cypress.env(`${parameterNamenum}_Result${num}`));
                   const b=parseFloat(Cypress.env(`${refer1}_Result${num}`))
                   expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterNamenum}_Result${num}`))

                   cy.log('sub total:result oc =vat (calculated) result oc:'+Cypress.env(`${parameterNamenum}_ResultOc${num}`));
                   const a=parseFloat(Cypress.env(`${refer1}_ResultOc${num}`));
                   expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterNamenum}_ResultOc${num}`))
               }
        })
    }

    get_runningTotal_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_runningTotal_after_recalculate(parameterName,refer1?:string,refer2?:string,refer3?:string,refer4?:string,num?:string){
        cy.wait(300).then(()=>{

                cy.log('running total:value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;

                cy.log('running total:result  = net total+previous total:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${refer1}_Result${num}`))+parseFloat(Cypress.env(`${refer2}_Result${num}`))+parseFloat(Cypress.env(`${refer3}_Result${num}`))+parseFloat(Cypress.env(`${refer4}_Result${num}`))
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('running total:result oc =:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${refer1}_ResultOc${num}`))+parseFloat(Cypress.env(`${refer2}_ResultOc${num}`))+parseFloat(Cypress.env(`${refer3}_ResultOc${num}`))+parseFloat(Cypress.env(`${refer4}_ResultOc${num}`))
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))

        })
    }

    get_generals_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_generals_after_recalculate(general,percent,parameterName,refer?:string,num?:string){
        cy.wait(300).then(()=>{

            cy.log('general:value  = general:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(general.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;
            if(percent=='true'){
                cy.log('percent true:general:result  = general_ResultOc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/parseFloat(Cypress.env('rate'))
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('percent true:general:result oc =reference(net total result oc)*(general)/100:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${refer}_ResultOc${num}`))*general/100
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else {
                cy.log('percent false:general:result  = general_ResultOc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                const c=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/parseFloat(Cypress.env('rate'))
                expect(c.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('percent false:general:result oc =value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(general.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }

        })
    }

    get_earlyPaymentDiscount_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_earlyPaymentDiscount_after_recalculate(parameterName,option?:string,ref?:string,num?:string){
        cy.wait(300).then(()=>{

            cy.log('early Payment Discount:value  = general:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(parseFloat(Cypress.env('discountPercent')).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;
            if(option=='yes'){
                cy.log('early Payment Discount:has reference:result  = reference(net total result)*discount percent/100*(-1):'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${ref}_Result${num}`))*parseFloat(Cypress.env('discountPercent'))/100*(-1)
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('early Payment Discount,has reference:result oc =reference(net total result oc)*discount percent/100*(-1):'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${ref}_ResultOc${num}`))*parseFloat(Cypress.env('discountPercent'))/100*(-1)
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else {
                cy.log('early Payment Discount:no reference:result  = header discount percent* header discount basis/100*(-1):'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env('discountBasis'))*parseFloat(Cypress.env('discountPercent'))/100*(-1)
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('early Payment Discount,no reference:result oc = header discount percent* header discount basis/100*(-1):'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env('discountBasisOc'))*parseFloat(Cypress.env('discountPercent'))/100*(-1)
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }

        })
    }

    get_generalsAmount_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_generalsAmount_after_recalculate(parameterName,reference,generals,num?:string){
        cy.wait(300).then(()=>{

            if(reference=='editableFalseWithoutGenerals'){
                cy.log('generals Amount:editable false without generals type:value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;

                cy.log('generals Amount:editable false without generals type:result  = 0:'+Cypress.env(`${parameterName}_Result${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('generals Amount:editable false without generals type:result oc =0:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else if(reference=='editableFalseWithGenerals'){
                cy.log('generals Amount:editable false with generals type:value  = generalstype.value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(parseFloat(generals).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;

                cy.log('generals Amount:editable false with generals type:result  = result/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                const a=generals/parseFloat(Cypress.env('rate'))
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('generals Amount:editable false with generals type:result oc =general type  value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(parseFloat(generals).toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else if (reference=='editableTrue'){
                cy.log('generals Amount:editable true:value  = input value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(parseFloat(generals).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;

                cy.log('generals Amount:editable true:value:result  = result/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                const a=generals/parseFloat(Cypress.env('rate'))
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('generals Amount:editable true:value:result oc =input value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(parseFloat(generals).toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
        })
    }

    get_previousPeriodValues_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_previousPeriodValues_after_recalculate(parameterName,progressInvoice,value,refer?:string,num?:string){
        cy.wait(300).then(()=>{

            if(progressInvoice ==1){
                cy.log('first invoice:previous period value reference(net total):value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('first invoice:previous period value reference(net total):result  = 0:'+Cypress.env(`${parameterName}_Result${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('first invoice:previous period value reference(net total):result oc =0:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else {
                cy.log('has chained invoice,previous period value reference(net total):value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('has chained invoice,previous period value reference(net total):result  = reference(net total) result *value:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${refer}_Result${num}`))*value
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('has chained invoice:previous period value reference(net total):result oc =reference(net total) result oc*value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${refer}_ResultOc${num}`))*value
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }

        })
    }

    get_previousPeriodCumulativeValues_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_previousPeriodCumulativeValues_after_recalculate(parameterName,progressInvoice,value,ref?:string,num?:string,secondnetnum?:string){
        cy.wait(300).then(()=>{

            if(progressInvoice ==1){
                cy.log('first invoice:previous period cumulative value reference(net total):value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('first invoice:previous period cumulative value reference(net total):result  = 0:'+Cypress.env(`${parameterName}_Result${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('first invoice:previous period cumulative value reference(net total):result oc =0:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else if(progressInvoice ==2){
                cy.log('second invoice,previous period cumulative value reference(net total):value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('second invoice,previous period cumulative value reference(net total):result  = reference(net total) result *value:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${ref}_Result${num}`))*value
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('second invoice:previous period cumulative value reference(net total):result oc =reference(net total) result oc*value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${ref}_ResultOc${num}`))*value
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else if(progressInvoice ==3){
                cy.log('third invoice,previous period cumulative value reference(net total):value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('third invoice,previous period cumulative value reference(net total):result  = (first +second reference(net total) result )*value:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=(parseFloat(Cypress.env(`${ref}_Result${num}`))+parseFloat(Cypress.env(`${ref}_Result${secondnetnum}`)))*value
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('third invoice:previous period cumulative value reference(net total):result oc =(first +second reference(net total) result oc)*value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=(parseFloat(Cypress.env(`${ref}_ResultOc${num}`))+parseFloat(Cypress.env(`${ref}_ResultOc${secondnetnum}`)))*value
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
        })
    }

    get_formula_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_formula_after_recalculate(parameterName,value,ref1?:string,ref2?:string,num?:string){
        cy.wait(300).then(()=>{
            cy.log('Formula:value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

            cy.log('Formula:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('Formula:result oc =(net total result oc + previous period net total result oc)*value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=(parseFloat(Cypress.env(`${ref1}_ResultOc${num}`))+parseFloat(Cypress.env(`${ref2}_ResultOc${num}`)))*value;
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))


        })
    }

    get_subTotalGroup1_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_subTotalGroup1_after_recalculate(parameterName,refer1?:string,refer2?:string,num?:string){
        cy.wait(300).then(()=>{
            cy.log('Sub Total Group 1:value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

            cy.log('Sub Total Group 1:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('Sub Total Group 1:result oc =(net total result oc + previous period net total result oc)*value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=(parseFloat(Cypress.env(`${refer1}_ResultOc${num}`))+parseFloat(Cypress.env(`${refer2}_ResultOc${num}`)));
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))


        })
    }

    get_subTotalGroup2_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_subTotalGroup2_after_recalculate(parameterName,refer1?:string,refer2?:string,num?:string){
        cy.wait(300).then(()=>{
            cy.log('Sub Total Group 2:value  = 0:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

            cy.log('Sub Total Group 2:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('Sub Total Group 2:result oc =(Sub Total result oc + VAT (calculated) result oc)*value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=(parseFloat(Cypress.env(`${refer1}_ResultOc${num}`))+parseFloat(Cypress.env(`${refer2}_ResultOc${num}`)));
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))


        })
    }

    get_difDiscount_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_difDiscount_after_recalculate(parameterName,value,result:number,num?:string){
        cy.wait(300).then(()=>{
            cy.log('dif discount Basis:value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

            cy.log('dif discount Basis:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate')
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('dif discount Basis:result oc =inout value result:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=result;
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))


        })
    }

    verify_getRejectNet_after_recalculate(parameterName,value,num?:string){
        cy.wait(300).then(()=>{
            cy.log('reject net:value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

            cy.log('reject net:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate');
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('reject net:result oc =reject net oc *value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=parseFloat(Cypress.env(`rejectionNetOc`))*value;
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))


        })
    }
    verify_getRejectGross_after_recalculate(parameterName,value,num?:string){
        cy.wait(300).then(()=>{
            cy.log('reject gross:value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
            expect(value.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

            cy.log('reject gross:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
            const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate');
            expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

            cy.log('reject gross:result oc =(reject net oc+reject vat oc) *value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
            const a=(parseFloat(Cypress.env(`rejectionNetOc`))+parseFloat(Cypress.env(`rejectionNetVatOc`)))*value;
            expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
        })
    }

    get_earlyPaymentDiscountRebate_from_billingSchema(billingSchemaDescription,type,num?:string) {
        _billingSchemaCalculate.get_value_from_billingSchema(billingSchemaDescription,type,num);
    }
    verify_earlyPaymentDiscountRebate_after_recalculate(parameterName,option?:string,ref?:string,value?:string,num?:string){
        cy.wait(300).then(()=>{
            if(option=='editableFalse'){
                cy.log('early Payment Discount(rebate):value  =  discount percent:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(parseFloat(Cypress.env('discountPercent')).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;

                cy.log('early Payment Discount (rebate):has reference:result  = reference(net total result)*discount percent/100*(-1):'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${ref}_Result${num}`))*parseFloat(Cypress.env('discountPercent'))/100*(-1)
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('early Payment Discount (rebate),has reference:result oc =reference(net total result oc)*discount percent/100*(-1):'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(Cypress.env(`${ref}_ResultOc${num}`))*parseFloat(Cypress.env('discountPercent'))/100*(-1)
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`))
            }
            else {
                cy.log('early Payment Discount(rebate):value  =  user input:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(parseFloat(value).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`)) ;

                cy.log('early Payment Discount (rebate):no reference:result  =result oc/rate :'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/parseFloat(Cypress.env('rate'))
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('early Payment Discount (rebate),no reference:result oc =input value:'+Cypress.env(`${parameterName}_ResultOc${num}`));
                const a=parseFloat(value);
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }

        })
    }

    verify_currentPayments_after_recalculate(parameterName,progressId,num?:string,num2?:string){
        cy.wait(300).then(()=>{
            if(progressId==1) {
                cy.log('current payments:value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('current payments:result  =totalPaymentCumulative:' + Cypress.env(`${parameterName}_Result${num}`));
                const b = parseFloat(Cypress.env(`totalPaymentCumulative${num}`));
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('current payments:result oc =result*rate:' + Cypress.env(`${parameterName}_ResultOc${num}`));
                const a = parseFloat(Cypress.env(`${parameterName}_Result${num}`)) * Cypress.env('rate');
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
            else {
                cy.log('current payments:value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('current payments:result  = current totalPaymentCumulative-previous totalPaymentCumulative:' + Cypress.env(`${parameterName}_Result${num}`));
                const b = parseFloat(Cypress.env(`totalPaymentCumulative${num}`))-parseFloat(Cypress.env(`totalPaymentCumulative${num2}`));
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('current payments:result oc =result*rate' + Cypress.env(`${parameterName}_ResultOc${num}`));
                const a = parseFloat(Cypress.env(`${parameterName}_Result${num}`)) * Cypress.env('rate');
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
        });

    }
    verify_currentPaymentsDiscount_after_recalculate(parameterName,progressId,num?:string,num2?:string){
        cy.wait(300).then(()=>{
            if(progressId==1) {
                cy.log('current payments discount:value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('current payments discount:result  = totalPaymentDiscountCumulative:' + Cypress.env(`${parameterName}_Result${num}`));
                const b = parseFloat(Cypress.env(`totalPaymentDiscountCumulative${num}`)) ;
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('current payments discount:result oc =result *rate' + Cypress.env(`${parameterName}_ResultOc${num}`));
                const a = parseFloat(Cypress.env(`${parameterName}_Result${num}`)) * Cypress.env('rate');
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
           else {
                cy.log('current payments discount:value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('current payments discount:result  =current totalPaymentDiscountCumulative-previous totalPaymentDiscountCumulative:' + Cypress.env(`${parameterName}_Result${num}`));
                const b = parseFloat(Cypress.env(`totalPaymentDiscountCumulative${num}`)) - parseFloat(Cypress.env(`totalPaymentDiscountCumulative${num2}`));
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('current payments discount:result oc =(reject net oc+reject vat oc) *value:' + Cypress.env(`${parameterName}_ResultOc${num}`));
                const a = parseFloat(Cypress.env(`${parameterName}_Result${num}`)) * Cypress.env('rate');
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
        })
    }
    verify_cumulativePayments_after_recalculate(parameterName,progressId,num?:string,num2?:string){
        cy.wait(300).then(()=>{
            if(progressId==1) {
                cy.log('cumulative payments :value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('cumulative payments :result  =0:' + Cypress.env(`${parameterName}_Result${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('cumulative payments :result oc =0:' + Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
            else {
                cy.log('cumulative payments :value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('cumulative payments :result  = prvious totalPaymentCumulative:' + Cypress.env(`${parameterName}_Result${num}`));
                const b = parseFloat(Cypress.env(`totalPaymentCumulative${num2}`));
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('cumulative payments :result oc =result *rate' + Cypress.env(`${parameterName}_ResultOc${num}`));
                const a = parseFloat(Cypress.env(`${parameterName}_Result${num}`)) * Cypress.env('rate');
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
        })
    }
    verify_cumulativePaymentsDiscount_after_recalculate(parameterName,progressId,num?:string,num2?:string){
        cy.wait(300).then(()=>{
            if(progressId==1) {
                cy.log('cumulative payments discount:value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('cumulative payments discount:result  =0:' + Cypress.env(`${parameterName}_Result${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('cumulative payments discount:result oc =0:' + Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
            else {
                cy.log('cumulative payments discount:value  = 0.00:' + Cypress.env(`${parameterName}_Value${num}`));
                expect(0.00.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('cumulative payments discount:result  = prvious totalPaymentDiscountCumulative:' + Cypress.env(`${parameterName}_Result${num}`));
                const b = parseFloat(Cypress.env(`totalPaymentDiscountCumulative${num2}`));
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('cumulative payments discount:result oc =result *rate' + Cypress.env(`${parameterName}_ResultOc${num}`));
                const a = parseFloat(Cypress.env(`${parameterName}_Result${num}`)) * Cypress.env('rate');
                expect(a.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }
        })
    }
    verify_advance_after_recalculate(parameterName,percentProrata,value,advanceamountDoneOc,refer,prgrossId,editable?:string,num?:string,num2?:string){
        cy.wait(300).then(()=>{
            if(editable=='false'){
                var initial=parseFloat(Cypress.env(`${refer}_ResultOc${num}`)) * parseFloat(percentProrata)/100;
                var allowedMax=parseFloat(advanceamountDoneOc);
                if(prgrossId==2){
                    allowedMax=allowedMax+parseFloat(Cypress.env(`${refer}_ResultOc${num2}`))
                };
                const result_oc=Math.min(initial,allowedMax);
                cy.log('advance:value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(parseFloat(value).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                 cy.log('advance:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                 const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate');
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                 cy.log('advance:result oc =min(initial, allowedMax):'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(result_oc.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));

            }else{
                var initialm=value;
                var allowedMax=parseFloat(advanceamountDoneOc);
                allowedMax=allowedMax-parseFloat(Cypress.env(`${parameterName}_ResultOc${num2}`));
                const result_oc=Math.min(initialm,allowedMax);
                cy.log('advance:value  = value:'+Cypress.env(`${parameterName}_Value${num}`));
                expect(parseFloat(value).toFixed(2)).to.eq(Cypress.env(`${parameterName}_Value${num}`))

                cy.log('advance:result  = result oc/rate:'+Cypress.env(`${parameterName}_Result${num}`));
                const b=parseFloat(Cypress.env(`${parameterName}_ResultOc${num}`))/Cypress.env('rate');
                expect(b.toFixed(2)).to.eq(Cypress.env(`${parameterName}_Result${num}`))

                cy.log('advance:result oc =min(initial, allowedMax):'+Cypress.env(`${parameterName}_ResultOc${num}`));
                expect(result_oc.toFixed(2)).to.eq(Cypress.env(`${parameterName}_ResultOc${num}`));
            }


        })
    }
    enterEachTextCell(container,cell,cellInput,cellValue) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(container)
            .findGrid()
            .findActiveRow()
            .findCell(cell)
            .findTextInput(cellInput)
            .type(cellValue)
        cy.wait(2000);
    }





}
