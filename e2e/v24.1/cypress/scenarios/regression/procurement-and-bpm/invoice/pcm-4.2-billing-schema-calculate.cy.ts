import {
    _billingSchemaCalculate,
    _common,  _mainView,
    _modalView,
} from 'cypress/pages';
import {app, cnt, commonLocators, sidebar} from "cypress/locators";
import {headerAmountCalculate} from "../../../../pages/module/procurement-and-bpm/invoice/headerAmountCalculate-pages";


const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("BillingSchemaCalculate");
allure.story("PCM- 4.2 | billing schema calculate");

const INVOICE_NO = "INV_NIU_" + Cypress._.random(0, 999)


let DEFAULT_VIEW;
let HEADER_VALUE;
let HEADER_COLUMNS_UI;
let BILLING_SCHEMA_UI;

describe("PCM- 4.2 | billing schema calculate", () => {
    before(function () {
    cy.fixture('pcm/pcm-4.2-billing-schema-calculate.json').then((data) => {
        this.data = data;
            DEFAULT_VIEW=this.data.CONTAINERS.DEFAULT_VIEW;
            HEADER_VALUE=this.data.CONTAINERS.HEADER_VALUE;
            HEADER_COLUMNS_UI=this.data.CONTAINER_COLUMNS.INV_HEADER;
            BILLING_SCHEMA_UI=this.data.CONTAINER_COLUMNS.INV_BILLING_SCHEMA;



    }).then(()=>{
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

    })
  });
  after(() => {
	//cy.LOGOUT();
	});


    it('Enter invoice module and select a records with contract and select second invoice invoice',function(){
        cy.wait(10000);
       _billingSchemaCalculate.openModuleFromQuickStart('Invoice');
        _billingSchemaCalculate.searchWithCodeFromSideBar(HEADER_VALUE.CONCODE);
        cy.wait(3000);
        _common.openTab(app.TabBar.INVOICES).then(() => {
           // _common.setDefaultView(app.TabBar.INVOICES,DEFAULT_VIEW.INV_VIEW);
            _common.setDefaultView(app.TabBar.INVOICES,'Niu')
            _common.waitForLoaderToDisappear();
            cy.wait(2000);
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, 'Invoices');
            _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER);
            cy.wait(2000);
            _common.waitForLoaderToDisappear();
           // _billingSchemaCalculate.setGridLayout(cnt.uuid.INVOICEHEADER,[HEADER_COLUMNS_UI.code,HEADER_COLUMNS_UI.reference,HEADER_COLUMNS_UI.taxcodefk,HEADER_COLUMNS_UI.exchangerate,HEADER_COLUMNS_UI.percentdiscount,HEADER_COLUMNS_UI.amountdiscountbasis,HEADER_COLUMNS_UI.amountdiscountbasisoc,HEADER_COLUMNS_UI.amountdiscount,HEADER_COLUMNS_UI.amountdiscountoc,HEADER_COLUMNS_UI.frompaymenttotalpayment,HEADER_COLUMNS_UI.frompaymenttotalpaymentdiscount])
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, '');
            _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER);
        });
        cy.wait(2000);
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER);
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        _billingSchemaCalculate.getRate();
        _billingSchemaCalculate.getTaxCode(cnt.uuid.INVOICEHEADER);
        _common.minimizeContainer(cnt.uuid.INVOICEHEADER);

    });
    it('open Reconciliation container, and get its value',function(){
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RECONCILIATION, 'Reconciliation',2);
        })
        cy.wait(2000);
    });
    it('open billing schema container, and then click calculate button and get its value',function(){
        _common.openTab(app.TabBar.INVOICES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, 'Billing Schema',1);
           // _billingSchemaCalculate.setGridLayout(cnt.uuid.INVOICE_BILLING_SCHEMA,[BILLING_SCHEMA_UI.billinglinetypefk,BILLING_SCHEMA_UI.description,BILLING_SCHEMA_UI.value,BILLING_SCHEMA_UI.result,BILLING_SCHEMA_UI.resultoc])
        })
        cy.wait(2000);
        //recalculate invoice1
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _billingSchemaCalculate.click_recalculate_button(cnt.uuid.INVOICE_BILLING_SCHEMA)
        cy.wait(10000);
        //recalculate invoice2
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _billingSchemaCalculate.click_recalculate_button(cnt.uuid.INVOICE_BILLING_SCHEMA)
        cy.wait(10000);
        //recalculate invoice3
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE3);
        cy.wait(2000);
        _billingSchemaCalculate.click_recalculate_button(cnt.uuid.INVOICE_BILLING_SCHEMA)
        cy.wait(10000);
    });
    it('1.check type=net total calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _billingSchemaCalculate.get_reconciliation_value();
        cy.wait(2000);
       _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        cy.wait(2000);
        _billingSchemaCalculate.verify_netTotal_after_recalculate(HEADER_VALUE.netTotalType);
    })
    it('2.check type=previous period net total calculation',function (){
        //check first invoice, the previous period net total=0
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType);
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodNetTotal_after_recalculate(1,HEADER_VALUE.previousPeriodNetTotalType);
        //check second invoice, the previous period net total=first invoice's net total
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'2');
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType,'2');
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodNetTotal_after_recalculate(2,HEADER_VALUE.previousPeriodNetTotalType,HEADER_VALUE.netTotalType,'2');
        //check third invoice, the previous period net total=second invoice's net total
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'3');
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE3);
        cy.wait(2000);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType,'3');
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodNetTotal_after_recalculate(3,HEADER_VALUE.previousPeriodNetTotalType,HEADER_VALUE.netTotalType,'3');
    })
    it('3.check type=sub total calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        //without meet subtotal/running total/subtotal group1 and subtotal group2
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType);
        _billingSchemaCalculate.get_subTotal_from_billingSchema(HEADER_VALUE.subTotalDescription,HEADER_VALUE.subTotalType);
        _billingSchemaCalculate.verify_subTotal_after_recalculate(HEADER_VALUE.subTotalType,'sum',HEADER_VALUE.netTotalType,HEADER_VALUE.previousPeriodNetTotalType);
        //meet subtotal/running total/subtotal group1 and  subtotal group2
        _billingSchemaCalculate.get_vatCalculated_from_billingSchema(HEADER_VALUE.vatCalculatedDescription,HEADER_VALUE.vatCalculatedType);
        cy.wait(1000);
        _billingSchemaCalculate.get_subTotal_from_billingSchema(HEADER_VALUE.subTotalDescription_2,HEADER_VALUE.subTotalType);
        cy.wait(1000);
        _billingSchemaCalculate.verify_subTotal_after_recalculate(HEADER_VALUE.subTotalType,'',HEADER_VALUE.vatCalculatedType);
    });
    it('4.check type=running total calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        //exclude subtotal/running total/subtotal group1 and  subtotal group2
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType);
        _billingSchemaCalculate.get_vatCalculated_from_billingSchema(HEADER_VALUE.vatCalculatedDescription,HEADER_VALUE.vatCalculatedType);
        _billingSchemaCalculate.get_vatEvaluated_from_billingSchema(HEADER_VALUE.vatEvaluatedDescription,HEADER_VALUE.vatEvaluatedType);
        _billingSchemaCalculate.get_runningTotal_from_billingSchema(HEADER_VALUE.runningTotalDescription,HEADER_VALUE.runningType,);
        _billingSchemaCalculate.verify_runningTotal_after_recalculate(HEADER_VALUE.runningType,HEADER_VALUE.netTotalType,HEADER_VALUE.previousPeriodNetTotalType,HEADER_VALUE.vatCalculatedType,HEADER_VALUE.vatEvaluatedType);
    });
    it('5.check type=Sun total group 1 :both net total and previous period value are isgroup1=true calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        //Sun total group 1 with group1=true:  that is both net total and previous period value are isgroup1=true
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.subTotalGroup1Description)
        cy.wait(2000);
        _billingSchemaCalculate.get_subTotalGroup1_from_billingSchema(HEADER_VALUE.subTotalGroup1Description,HEADER_VALUE.subTotalGroup1Type);
        _billingSchemaCalculate.verify_subTotalGroup1_after_recalculate(HEADER_VALUE.subTotalGroup1Type,HEADER_VALUE.netTotalType,HEADER_VALUE.previousPeriodNetTotalType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
    });
    it('6.check type=Sun total group 2 :both sub total and vat(calculated) are isgroup2=true calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        //Sun total group 2 with group1=true:  that is sub total and vat(calculated) are isgroup2=true
        _billingSchemaCalculate.get_subTotal_from_billingSchema(HEADER_VALUE.subTotalDescription,HEADER_VALUE.subTotalType);
        _billingSchemaCalculate.get_vatCalculated_from_billingSchema(HEADER_VALUE.vatCalculatedDescription,HEADER_VALUE.vatCalculatedType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.subTotalGroup2Description)
        cy.wait(2000);
        _billingSchemaCalculate.get_subTotalGroup2_from_billingSchema(HEADER_VALUE.subTotalGroup2Description,HEADER_VALUE.subTotalGroup2Type);
        _billingSchemaCalculate.verify_subTotalGroup2_after_recalculate(HEADER_VALUE.subTotalGroup2Type,HEADER_VALUE.subTotalType,HEADER_VALUE.vatCalculatedType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
    });
    it('8.check type=generals% calculation: include percent=true and false',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        //check generals.isprecent=true
        _billingSchemaCalculate.get_generals_from_billingSchema(HEADER_VALUE.generalsDescription,HEADER_VALUE.generalsType);
        _billingSchemaCalculate.verify_generals_after_recalculate(HEADER_VALUE.GENERAL,'true',HEADER_VALUE.generalsType,HEADER_VALUE.netTotalType);
        //check generals.isprecent=false
        cy.wait(2000);
        _billingSchemaCalculate.get_generals_from_billingSchema(HEADER_VALUE.generalsDescriptionAmount,HEADER_VALUE.generalsType);
        _billingSchemaCalculate.verify_generals_after_recalculate(HEADER_VALUE.GENERAL,'false',HEADER_VALUE.generalsType);

    })
    it('10 check type=Generals amount calculation',function(){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        //check is editable false, and config generals types
        _billingSchemaCalculate.get_generalsAmount_from_billingSchema(HEADER_VALUE.generalsAmountDescription_3,HEADER_VALUE.generalsAmountType);
        _billingSchemaCalculate.verify_generalsAmount_after_recalculate(HEADER_VALUE.generalsAmountType,'editableFalseWithGenerals',HEADER_VALUE.GENERAL);
        //check is editable false, and has no config generals types
        _billingSchemaCalculate.get_generalsAmount_from_billingSchema(HEADER_VALUE.generalsAmountDescription,HEADER_VALUE.generalsAmountType);
        _billingSchemaCalculate.verify_generalsAmount_after_recalculate(HEADER_VALUE.generalsAmountType,'editableFalseWithoutGenerals',HEADER_VALUE.GENERAL);
        //check is editable true, use input value;
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION, 'Generals (Amount)_2')
        _common.edit_containerCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,HEADER_VALUE.GENERAL)
        cy.SAVE();
        cy.wait(10000);
        _billingSchemaCalculate.get_generalsAmount_from_billingSchema(HEADER_VALUE.generalsAmountDescription_2,HEADER_VALUE.generalsAmountType);
        _billingSchemaCalculate.verify_generalsAmount_after_recalculate(HEADER_VALUE.generalsAmountType,'editableTrue',HEADER_VALUE.GENERAL);
    })
    it('11.check type=VAT(calculated) calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        _billingSchemaCalculate.get_vatCalculated_from_billingSchema(HEADER_VALUE.vatCalculatedDescription,HEADER_VALUE.vatCalculatedType);
       _billingSchemaCalculate.verify_vatCalculated_after_recalculate(HEADER_VALUE.vatCalculatedType,HEADER_VALUE.netTotalType);

    });
    it('12.check type=Early Payment Discount calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        _billingSchemaCalculate.getDiscount();
        cy.wait(2000);
        //payment discount reference is not null, use reference net total result *discount percent*(-1)
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        _billingSchemaCalculate.get_earlyPaymentDiscount_from_billingSchema(HEADER_VALUE.earlyPaymentDiscountDescription,HEADER_VALUE.earlyPaymentDiscountType);
        _billingSchemaCalculate.verify_earlyPaymentDiscount_after_recalculate(HEADER_VALUE.earlyPaymentDiscountType,'yes',HEADER_VALUE.netTotalType)
        cy.wait(2000);
        //payment discount reference is null, use header discount basis *discount percent*(-1)
        _billingSchemaCalculate.get_earlyPaymentDiscount_from_billingSchema(HEADER_VALUE.earlyPaymentDiscountDescription_2,HEADER_VALUE.earlyPaymentDiscountType);
        _billingSchemaCalculate.verify_earlyPaymentDiscount_after_recalculate(HEADER_VALUE.earlyPaymentDiscountType)
    });
    it('13.check type=Previous Period Values calculation',function (){
        //check first invoice, the previous period values should be 0
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'2');
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodValueDescription)
        cy.wait(2000);
        _billingSchemaCalculate.get_previousPeriodValues_from_billingSchema(HEADER_VALUE.previousPeriodValueDescription,HEADER_VALUE.previousPeriodValueType);
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodValues_after_recalculate(HEADER_VALUE.previousPeriodValueType,1,HEADER_VALUE.PREVIOUSPERIODVALUE);
        //check second invoice, the previous period VALUE=Refrence(first invoice's net total)* value
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        cy.wait(2000);
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'3');
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodValueDescription)
        _billingSchemaCalculate.get_previousPeriodValues_from_billingSchema(HEADER_VALUE.previousPeriodValueDescription,HEADER_VALUE.previousPeriodValueType,'2');
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodValues_after_recalculate(HEADER_VALUE.previousPeriodValueType,2,HEADER_VALUE.PREVIOUSPERIODVALUE,HEADER_VALUE.netTotalType,'2');
        //check third invoice, the previous period net total=second invoice's net total
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE3);
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodValueDescription)
        _billingSchemaCalculate.get_previousPeriodValues_from_billingSchema(HEADER_VALUE.previousPeriodValueDescription,HEADER_VALUE.previousPeriodValueType,'3');
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodValues_after_recalculate(HEADER_VALUE.previousPeriodValueType,3,HEADER_VALUE.PREVIOUSPERIODVALUE,HEADER_VALUE.netTotalType,'3');
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
    })
    it('14.check type=Previous Period Cumulative  Values calculation',function (){
        //check first invoice, the previous period values should be 0
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'2');
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodCumulativeValueDescription)
        cy.wait(2000);
        _billingSchemaCalculate.get_previousPeriodCumulativeValues_from_billingSchema(HEADER_VALUE.previousPeriodCumulativeValueDescription,HEADER_VALUE.previousPeriodCumulativeValueType);
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodCumulativeValues_after_recalculate(HEADER_VALUE.previousPeriodCumulativeValueType,1,HEADER_VALUE.PREVIOUSPERIODCUMULATIVEVALUE);
        //check second invoice, the previous period VALUE=Refrence(first invoice's net total)* value
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        cy.wait(2000);
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'3');
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodCumulativeValueDescription)
        _billingSchemaCalculate.get_previousPeriodCumulativeValues_from_billingSchema(HEADER_VALUE.previousPeriodCumulativeValueDescription,HEADER_VALUE.previousPeriodCumulativeValueType,'2');
        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodCumulativeValues_after_recalculate(HEADER_VALUE.previousPeriodCumulativeValueType,2,HEADER_VALUE.PREVIOUSPERIODCUMULATIVEVALUE,HEADER_VALUE.netTotalType,'2');
        //check third invoice, the previous period net total=second invoice's net total
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE3);
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodCumulativeValueDescription)
        _billingSchemaCalculate.get_previousPeriodCumulativeValues_from_billingSchema(HEADER_VALUE.previousPeriodCumulativeValueDescription,HEADER_VALUE.previousPeriodCumulativeValueType,'2');

        cy.wait(2000);
        _billingSchemaCalculate.verify_previousPeriodCumulativeValues_after_recalculate(HEADER_VALUE.previousPeriodCumulativeValueType,3,HEADER_VALUE.PREVIOUSPERIODCUMULATIVEVALUE,HEADER_VALUE.netTotalType,'2','3');

    })
    it('17.check type=VAT (evaluated) calculation',function (){
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _billingSchemaCalculate.get_reconciliation_value();
        cy.wait(2000);
        //check first invoice without chained invoice, the result oc=pes vat oc+contract vat oc+other invoice oc
        _billingSchemaCalculate.get_vatEvaluated_from_billingSchema(HEADER_VALUE.vatEvaluatedDescription,HEADER_VALUE.vatEvaluatedType,'1');
        _billingSchemaCalculate.verify_vatEvaluated_after_recalculate(HEADER_VALUE.vatEvaluatedType,'1','1');
        cy.wait(2000);
        //check second invoice has chained invoice, the result oc=pes vat oc+contract vat oc+other invoice oc- chained invoice's vat evaluated result oc
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _billingSchemaCalculate.get_reconciliation_value();
        cy.wait(2000);
        _billingSchemaCalculate.get_vatEvaluated_from_billingSchema(HEADER_VALUE.vatEvaluatedDescriptionWithTaxCode,HEADER_VALUE.vatEvaluatedType,'2');
        _billingSchemaCalculate.verify_vatEvaluated_after_recalculate(HEADER_VALUE.vatEvaluatedType,'2','2','1');
        //check  editable=true, and modify to value, the result oc=value, result=result
        cy.wait(2000);
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION,HEADER_VALUE.vatEvaluatedDescriptionEditable)
        cy.wait(3000);
        _billingSchemaCalculate.enterEachTextCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,HEADER_VALUE.BILL_VALUE)
        cy.wait(3000);
        _billingSchemaCalculate.shiftCursorToCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.DESCRIPTION);
        cy.wait(2000);
        cy.SAVE();
        cy.wait(5000);
        _billingSchemaCalculate.get_vatEvaluated_from_billingSchema(HEADER_VALUE.vatEvaluatedDescriptionEditable,HEADER_VALUE.vatEvaluatedType,'3');
        _billingSchemaCalculate.verify_vatEvaluated_after_recalculate(HEADER_VALUE.vatEvaluatedType,'editable','3','',HEADER_VALUE.BILL_VALUE);
    });
    it('18.check type=formula:L1+L2 calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        //formula: L1+L2, that is (net total +previous period value)*value
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'1');
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType,'1');
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.formulaDescription)
        cy.wait(2000);
         _billingSchemaCalculate.get_formula_from_billingSchema(HEADER_VALUE.formulaDescription,HEADER_VALUE.formulaType,'1');

        _billingSchemaCalculate.verify_formula_after_recalculate(HEADER_VALUE.formulaType,HEADER_VALUE.PREVIOUSPERIODVALUE,HEADER_VALUE.netTotalType,HEADER_VALUE.previousPeriodNetTotalType,'1');
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
    });
    it('19.check type=Dif. Discount Basis  calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        _billingSchemaCalculate.getDiscount();
        cy.wait(2000);
       //set value to result_oc of type 19, and save, then check payment discount with reference 19, whether basic on it to calculate
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.difDiscountDescription)
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION,HEADER_VALUE.difDiscountDescription)
        cy.wait(3000);
        _billingSchemaCalculate.enterEachTextCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.RESULT_OC,app.InputFields.INPUT_GROUP_CONTENT,HEADER_VALUE.DIF19)
        cy.wait(3000);
        _billingSchemaCalculate.shiftCursorToCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.DESCRIPTION);
        cy.SAVE()
        cy.wait(6000);
        _billingSchemaCalculate.get_difDiscount_from_billingSchema(HEADER_VALUE.difDiscountDescription,HEADER_VALUE.difDiscountType);
        _billingSchemaCalculate.verify_difDiscount_after_recalculate(HEADER_VALUE.difDiscountType,HEADER_VALUE.PREVIOUSPERIODVALUE,HEADER_VALUE.DIF19);
        //click recalculate button, the dif discount result oc should keep input value
        _billingSchemaCalculate.click_recalculate_button(cnt.uuid.INVOICE_BILLING_SCHEMA)
        cy.wait(15000);
        _billingSchemaCalculate.get_difDiscount_from_billingSchema(HEADER_VALUE.difDiscountDescription,HEADER_VALUE.difDiscountType);
        _billingSchemaCalculate.verify_difDiscount_after_recalculate(HEADER_VALUE.difDiscountType,HEADER_VALUE.PREVIOUSPERIODVALUE,HEADER_VALUE.DIF19);
        //check early payment discount get basic from dif discount basic's result oc
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        cy.wait(2000);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.earlyPaymentDiscountDescription_3)
        cy.wait(2000);
        _billingSchemaCalculate.get_earlyPaymentDiscount_from_billingSchema(HEADER_VALUE.earlyPaymentDiscountDescription_3,HEADER_VALUE.earlyPaymentDiscountType);
        _billingSchemaCalculate.verify_earlyPaymentDiscount_after_recalculate(HEADER_VALUE.earlyPaymentDiscountType,'yes',HEADER_VALUE.difDiscountType);

        //select a dif discount, if its result oc=0, then check early payment discount, it uses dif dicount's referent's result oc as basis to calculate
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.previousPeriodNetTotalDescription)
        cy.wait(2000);
        _billingSchemaCalculate.get_previousPeriodNetTotal_from_billingSchema(HEADER_VALUE.previousPeriodNetTotalDescription,HEADER_VALUE.previousPeriodNetTotalType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.earlyPaymentDiscountDescription_4)
        cy.wait(2000);
        _billingSchemaCalculate.get_earlyPaymentDiscount_from_billingSchema(HEADER_VALUE.earlyPaymentDiscountDescription_4,HEADER_VALUE.earlyPaymentDiscountType);
        _billingSchemaCalculate.verify_earlyPaymentDiscount_after_recalculate(HEADER_VALUE.earlyPaymentDiscountType,'yes',HEADER_VALUE.previousPeriodNetTotalType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
    });
    it('21.check type=rejections net and 22 type=rejections gross calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _billingSchemaCalculate.get_reconciliation_value();
       //get reject net from reconciliation container, and reject net result oc =net oc*value, result=net *value
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.rejectionNetDescription)
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.rejectionNetDescription,HEADER_VALUE.rejectionNetType);
        _billingSchemaCalculate.verify_getRejectNet_after_recalculate(HEADER_VALUE.rejectionNetType,HEADER_VALUE.PREVIOUSPERIODVALUE);
         //get reject gross  from reconciliation container, and reject net result oc =net oc*value, result=net *value
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA)
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.rejectionGrossDescription)
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.rejectionGrossDescription,HEADER_VALUE.rejectionGrossType);
        _billingSchemaCalculate.verify_getRejectGross_after_recalculate(HEADER_VALUE.rejectionGrossType,HEADER_VALUE.PREVIOUSPERIODVALUE);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
    });
    it('23.check type=Early Payment Discount (Rebate) calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        _billingSchemaCalculate.getDiscount();
        cy.wait(2000);

        //payment discount reference is not null, use reference net total result *discount percent*(-1)
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.earlyPaymentDiscountRebateDescription);
        _billingSchemaCalculate.get_earlyPaymentDiscountRebate_from_billingSchema(HEADER_VALUE.earlyPaymentDiscountRebateDescription,HEADER_VALUE.earlyPaymentDiscountRebateType);
        _billingSchemaCalculate.verify_earlyPaymentDiscountRebate_after_recalculate(HEADER_VALUE.earlyPaymentDiscountRebateType,'editableFalse',HEADER_VALUE.netTotalType)
        cy.wait(2000);
        //editable=true, input value, use result oc=value
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.earlyPaymentDiscountRebateDescriptionEditable);
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION,HEADER_VALUE.earlyPaymentDiscountRebateDescriptionEditable)
        cy.wait(3000);
        _billingSchemaCalculate.enterEachTextCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,HEADER_VALUE.BILL_VALUE)
        cy.wait(3000);
        _billingSchemaCalculate.shiftCursorToCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.DESCRIPTION);
        cy.SAVE();
        cy.wait(6000);
        _billingSchemaCalculate.get_earlyPaymentDiscountRebate_from_billingSchema(HEADER_VALUE.earlyPaymentDiscountRebateDescription,HEADER_VALUE.earlyPaymentDiscountRebateType);
        _billingSchemaCalculate.verify_earlyPaymentDiscountRebate_after_recalculate(HEADER_VALUE.earlyPaymentDiscountRebateType,'','',HEADER_VALUE.BILL_VALUE)
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
    });
    it('24.check type=current payment and 25 type=Cumulative Payments and 26=Current Payment Discount and 27=Cumulative Payment Discounts  calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER);
        _billingSchemaCalculate.get_payment('1');
        _common.minimizeContainer(cnt.uuid.INVOICEHEADER);
        cy.wait(2000);

        //if first chained invoice without chain invoice, current payment = total payment cumulative,
        // current payment discount= total payment cumulative discount cumulative;
        //Cumulative Payments=0 and Cumulative Payments discounts =0
        //check current payment
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.currentPaymentDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.currentPaymentDescription,HEADER_VALUE.currentPaymentType,'1');
        _billingSchemaCalculate.verify_currentPayments_after_recalculate(HEADER_VALUE.currentPaymentType,1,'1')
        cy.wait(2000);
        //check current payment discount
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.currentPaymentDiscountDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.currentPaymentDiscountDescription,HEADER_VALUE.currentPaymentDiscountType,'1');
        _billingSchemaCalculate.verify_currentPaymentsDiscount_after_recalculate(HEADER_VALUE.currentPaymentDiscountType,1,'1')
        cy.wait(2000);
        //check cumulative payment
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.cumulativePaymentDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.cumulativePaymentDescription,HEADER_VALUE.cumulativePaymentType,'1');
        _billingSchemaCalculate.verify_cumulativePayments_after_recalculate(HEADER_VALUE.cumulativePaymentType,1,'1')
        cy.wait(2000);
        //check cumulative paryment discount
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.cumulativePaymentDiscountDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.cumulativePaymentDiscountDescription,HEADER_VALUE.cumulativePaymentDiscountType,'1');
        _billingSchemaCalculate.verify_cumulativePaymentsDiscount_after_recalculate(HEADER_VALUE.cumulativePaymentDiscountType,1,'1')
        //if second chained invoice with chain invoice, current payment = current total payment cumulative-previous total payment cumulative ,
        // current payment discount=current total payment cumulative discount cumulative-previous current total payment cumulative discount cumulative;
        //Cumulative Payments=previous total payment cumulate and Cumulative Payments discounts =previous total payment discount cumulate
        //check current payment
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE2);
        cy.wait(2000);
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER);
        _billingSchemaCalculate.get_payment('2');
        _common.minimizeContainer(cnt.uuid.INVOICEHEADER);
        cy.wait(2000);

        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.currentPaymentDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.currentPaymentDescription,HEADER_VALUE.currentPaymentType,'2');
        _billingSchemaCalculate.verify_currentPayments_after_recalculate(HEADER_VALUE.currentPaymentType,2,'2','1')
        cy.wait(2000);
        //check current payment discount
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.currentPaymentDiscountDescription);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.currentPaymentDiscountDescription,HEADER_VALUE.currentPaymentDiscountType,'2');
        _billingSchemaCalculate.verify_currentPaymentsDiscount_after_recalculate(HEADER_VALUE.currentPaymentDiscountType,2,'2','1')
        cy.wait(2000);
        //check cumulative payment
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.cumulativePaymentDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.cumulativePaymentDescription,HEADER_VALUE.cumulativePaymentType,'2');
        _billingSchemaCalculate.verify_cumulativePayments_after_recalculate(HEADER_VALUE.cumulativePaymentType,2,'2','1')
        cy.wait(2000);
        //check cumulative paryment discount
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.cumulativePaymentDiscountDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.cumulativePaymentDiscountDescription,HEADER_VALUE.cumulativePaymentDiscountType,'2');
        _billingSchemaCalculate.verify_cumulativePaymentsDiscount_after_recalculate(HEADER_VALUE.cumulativePaymentDiscountType,2,'2','1')
        //if third chained invoice with chain invoice, current payment = current total payment cumulative-previous total payment cumulative ,
        // current payment discount=current total payment cumulative discount cumulative-previous current total payment cumulative discount cumulative;
        //Cumulative Payments=previous total payment cumulate and Cumulative Payments discounts =previous total payment discount cumulate
        //check current payment
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE3);
        cy.wait(2000);
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER);
        _billingSchemaCalculate.get_payment('3');
        _common.minimizeContainer(cnt.uuid.INVOICEHEADER);
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.currentPaymentDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.currentPaymentDescription,HEADER_VALUE.currentPaymentType,'3');
        _billingSchemaCalculate.verify_currentPayments_after_recalculate(HEADER_VALUE.currentPaymentType,3,'3','2')
        cy.wait(2000);
        //check current payment discount
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.currentPaymentDiscountDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.currentPaymentDiscountDescription,HEADER_VALUE.currentPaymentDiscountType,'3');
        _billingSchemaCalculate.verify_currentPaymentsDiscount_after_recalculate(HEADER_VALUE.currentPaymentDiscountType,3,'3','2')
        cy.wait(2000);
        //check cumulative payment
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.cumulativePaymentDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.cumulativePaymentDescription,HEADER_VALUE.cumulativePaymentType,'3');
        _billingSchemaCalculate.verify_cumulativePayments_after_recalculate(HEADER_VALUE.cumulativePaymentType,3,'3','2')
        cy.wait(2000);
        //check cumulative payment discount
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.cumulativePaymentDiscountDescription);
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.cumulativePaymentDiscountDescription,HEADER_VALUE.cumulativePaymentDiscountType,'3');
        _billingSchemaCalculate.verify_cumulativePaymentsDiscount_after_recalculate(HEADER_VALUE.cumulativePaymentDiscountType,3,'3','2')
    });
    it('28.check type=Advance calculation',function (){
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICEHEADER,app.GridCells.CODE,HEADER_VALUE.INVCODE1);
        cy.wait(2000);
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        //advance, reference with net total , and editable false
        _billingSchemaCalculate.get_netTotal_from_billingSchema(HEADER_VALUE.netTotalDescription,HEADER_VALUE.netTotalType,'1');
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.advanceDescription)
        cy.wait(2000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.advanceDescription,HEADER_VALUE.advanceType,'1');
        _billingSchemaCalculate.verify_advance_after_recalculate(HEADER_VALUE.advanceType,HEADER_VALUE.ADVANCE_PERCENT_PRORATA,HEADER_VALUE.PREVIOUSPERIODVALUE,HEADER_VALUE.ADVANCE_AMOUNT_DONE_OC,HEADER_VALUE.netTotalType,1,'false','1');
        //advance, reference with net total , and editable TRUE
        _common.clear_subContainerFilter(cnt.uuid.INVOICE_BILLING_SCHEMA);
        _common.search_inSubContainer(cnt.uuid.INVOICE_BILLING_SCHEMA,HEADER_VALUE.advanceDescriptionEditable)
        cy.wait(2000);
        _billingSchemaCalculate.selectRecordMakeItActiveByCode(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.DESCRIPTION,HEADER_VALUE.advanceDescriptionEditable)
        cy.wait(3000);
        _billingSchemaCalculate.enterEachTextCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.VALUE,app.InputFields.INPUT_GROUP_CONTENT,HEADER_VALUE.ADVANCE_EDITABLE_VALUE_OC)
        cy.wait(3000);
        _billingSchemaCalculate.shiftCursorToCell(cnt.uuid.INVOICE_BILLING_SCHEMA,app.GridCells.DESCRIPTION);
        cy.SAVE();
        cy.wait(6000);
        _billingSchemaCalculate.get_value_from_billingSchema(HEADER_VALUE.advanceDescriptionEditable,HEADER_VALUE.advanceType,'2');
        _billingSchemaCalculate.verify_advance_after_recalculate(HEADER_VALUE.advanceType,HEADER_VALUE.ADVANCE_PERCENT_PRORATA,HEADER_VALUE.ADVANCE_EDITABLE_VALUE_OC,HEADER_VALUE.ADVANCE_AMOUNT_DONE_OC,HEADER_VALUE.netTotalType,1,'true','2','1');

    });
});
