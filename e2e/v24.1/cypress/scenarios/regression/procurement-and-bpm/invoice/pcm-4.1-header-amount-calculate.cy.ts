import {
    _common, _copyMainEntryToDocumentProject, _headerAmountCalculate, _mainView,
    _modalView,
} from 'cypress/pages';
import {app, cnt, commonLocators, sidebar} from "cypress/locators";
import {headerAmountCalculate} from "../../../../pages/module/procurement-and-bpm/invoice/headerAmountCalculate-pages";

const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("HeaderAmountCalculate");
allure.story("PCM- 4.1 | header amount calculate");

const INVOICE_NO = "INV_NIU_" + Cypress._.random(0, 999)


let DEFAULT_VIEW;
let HEADER_VALUE;
let HEADER_COLUMNS_UI;

describe("PCM- 4.1 | header amount calculate", () => {
    before(function () {
    cy.fixture('pcm/pcm-4.1-header-amount-calculate.json').then((data) => {
        this.data = data;
            DEFAULT_VIEW=this.data.CONTAINERS.DEFAULT_VIEW;
            HEADER_VALUE=this.data.CONTAINERS.HEADER_VALUE;
            HEADER_COLUMNS_UI=this.data.CONTAINER_COLUMNS.INV_HEADER;



    }).then(()=>{
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

    })
  });
  after(() => {
	//cy.LOGOUT();
	});


    it('Enter invoice module and select a records with contract and select second invoice invoice',function(){
       _headerAmountCalculate.openModuleFromQuickStart('Invoice');
       _headerAmountCalculate.searchWithCodeFromSideBar(HEADER_VALUE.CONCODE);
        cy.wait(3000);
        _common.openTab(app.TabBar.INVOICES).then(() => {
            //_common.setDefaultView(app.TabBar.INVOICES,DEFAULT_VIEW.INV_VIEW);
              _common.setDefaultView(app.TabBar.INVOICES,'Niu')
            _common.waitForLoaderToDisappear();
            cy.wait(2000);
            _common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, 'Invoices');
            _common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER);
            cy.wait(2000);
            _common.waitForLoaderToDisappear();
           // _headerAmountCalculate.setGridLayout(cnt.uuid.INVOICEHEADER,[HEADER_COLUMNS_UI.code,HEADER_COLUMNS_UI.reference,HEADER_COLUMNS_UI.conheaderfk,HEADER_COLUMNS_UI.amountnet,HEADER_COLUMNS_UI.amountgross,HEADER_COLUMNS_UI.totalperformednet,HEADER_COLUMNS_UI.totalperformedgross,HEADER_COLUMNS_UI.amountnetoc,HEADER_COLUMNS_UI.amountgrossoc,HEADER_COLUMNS_UI.percentdiscount,HEADER_COLUMNS_UI.amountdiscountbasis,HEADER_COLUMNS_UI.amountdiscountbasisoc,HEADER_COLUMNS_UI.amountdiscount,HEADER_COLUMNS_UI.amountdiscountoc,HEADER_COLUMNS_UI.paymenttermfk,HEADER_COLUMNS_UI.exchangerate])

        });
        cy.wait(2000);
        _common.maximizeContainer(cnt.uuid.INVOICEHEADER);
    });
    it('1.set value to amount,amount net oc and total perform net will recalculate, others will not change',function(){
        cy.wait(2000);
       //select fist invoice and get total perform net and total perform gross
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE1)
        cy.wait(2000);
        _headerAmountCalculate.first_invoice_cell_values();
        //select second invoice and get its value before change amount
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT)
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        _headerAmountCalculate.getRate();
        _headerAmountCalculate.before_amount_change();
        //change amount net
       _headerAmountCalculate.setAmount_header(HEADER_VALUE.AMOUNT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after amount net change
       _headerAmountCalculate.after_amount_change();
       //verify relate columns
       _headerAmountCalculate.verify_amountGrossOc_after_amount_change();
       _headerAmountCalculate.verify_amountGross_after_amount_change()
        _headerAmountCalculate.verify_amountOC_after_amount_change(HEADER_VALUE.AMOUNT)
        _headerAmountCalculate.verify_totalPerformNet_after_amount_change(HEADER_VALUE.AMOUNT);
       _headerAmountCalculate.verify_totalPerformGross_after_amount_change();
       _headerAmountCalculate.verify_discount_after_amount_change();
    });
    it('2.set value to amount gross,all columns will be recalculated',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT)
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values before change amount gross
        _headerAmountCalculate.before_amount_change();
        //change amount gross
        _headerAmountCalculate.setAmountGross_header(HEADER_VALUE.AMOUNTGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after change amount gross
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
       _headerAmountCalculate.verify_amountNet_after_amountGross_change(HEADER_VALUE.VATPERCENT,HEADER_VALUE.AMOUNTGROSS)
       _headerAmountCalculate.verify_amountOC_after_amountGross_change(HEADER_VALUE.VATPERCENT);
        _headerAmountCalculate.verify_amountGross_after_amountGross_change(HEADER_VALUE.AMOUNTGROSS);
        _headerAmountCalculate.verify_amountGrossOc_after_amountGross_change(HEADER_VALUE.AMOUNTGROSS)
       _headerAmountCalculate.verify_totalPerformNet_after_amountGross_change();
        _headerAmountCalculate.verify_totalPerformGross_after_amountGross_change();
       _headerAmountCalculate.verify_discount_after_amountGross_change(HEADER_VALUE.DISCOUNTPERCENT)
    });
    it('3.set value to amount net oc,amount net and total performed net will recalculate, and others will not change',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change amount net oc
        _headerAmountCalculate.before_amount_change();
        //change amount net oc
        _headerAmountCalculate.setAmountNetOc_header(HEADER_VALUE.AMOUNTNETOC);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after change amount net oc
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_amountNet_after_amountNetOc_change(HEADER_VALUE.AMOUNTNETOC);
        _headerAmountCalculate.verify_amountNetOc_after_amountNetOc_change(HEADER_VALUE.AMOUNTNETOC)
        _headerAmountCalculate.verify_amountGross_after_amountNetOc_change();
        _headerAmountCalculate.verify_amountGrossOc_after_amountNetOc_change();
        _headerAmountCalculate.verify_amountTotalPerformNet_after_amountNetOc_change();
        _headerAmountCalculate.verify_amountTotalPerformGross_after_amountNetOc_change();
        _headerAmountCalculate.verify_discount_after_amountNetOc_change();
    });
    it('4.set value to amount gross oc,all columns will recalculate',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change amount gross oc
        _headerAmountCalculate.before_amount_change();
        //change amount gross oc
        _headerAmountCalculate.setAmountGrossOc_header(HEADER_VALUE.AMOUNTGROSSOC);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after change amount Gross oc
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_amountNet_after_amountGrossOc_change();
        _headerAmountCalculate.verify_amountNetOc_after_amountGrossOc_change(HEADER_VALUE.AMOUNTGROSSOC,HEADER_VALUE.VATPERCENT)
        _headerAmountCalculate.verify_amountGross_after_amountGrossOc_change(HEADER_VALUE.AMOUNTGROSSOC);
        _headerAmountCalculate.verify_amountGrossOc_after_amountGrossOc_change(HEADER_VALUE.AMOUNTGROSSOC);
        _headerAmountCalculate.verify_totalPerformNet_after_amountGrossOC_change();
        _headerAmountCalculate.verify_totalPerformGross_after_amountGrossOc_change();
        _headerAmountCalculate.verify_discount_after_amountGrossOc_change(HEADER_VALUE.DISCOUNTPERCENT);
    });
    it('5.set value to total perform net, amount net and amount net oc will recalculate, other columns will not change',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change total perform net
        _headerAmountCalculate.before_amount_change();
        //change total perform net
        _headerAmountCalculate.setAmountTotalPerformNet_header(HEADER_VALUE.TOTALPERFORMNET);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after total perform net
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_amountNet_after_totalPerformNet_change(HEADER_VALUE.TOTALPERFORMNET);
        _headerAmountCalculate.verify_amountNetOc_after_totalPerformNet_change();
        _headerAmountCalculate.verify_amountGross_after_totalPerformNet_change();
        _headerAmountCalculate.verify_amountGrossOc_after_totalPerformNet_change();
        _headerAmountCalculate.verify_totalPerformNet_after_totalPerformNet_change(HEADER_VALUE.TOTALPERFORMNET);
        _headerAmountCalculate.verify_totalPerformGross_after_totalPerformNet_change();
        _headerAmountCalculate.verify_discount_after_totalPerformNet_change();
    });
    it('6.set value to total perform gross, all columns will recalculate',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change total perform Gross
        _headerAmountCalculate.before_amount_change();
        //change total perform Gross
        _headerAmountCalculate.setAmountTotalPerformGross_header(HEADER_VALUE.TOTALPERFORMGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after total perform Gross
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_amountNet_after_totalPerformGross_change(HEADER_VALUE.VATPERCENT);
        _headerAmountCalculate.verify_amountNetOC_after_totalPerformGross_change(HEADER_VALUE.VATPERCENT);
        _headerAmountCalculate.verify_amountGross_after_totalPerformGross_change(HEADER_VALUE.TOTALPERFORMGROSS);
        _headerAmountCalculate.verify_amountGrossOc_after_totalPerformGross_change();
        _headerAmountCalculate.verify_totalPerformNet_after_totalPerformGross_change();
        _headerAmountCalculate.verify_totalPerformGross_after_totalPerformGross_change(HEADER_VALUE.TOTALPERFORMGROSS,);
        _headerAmountCalculate.verify_discount_after_totalPerformGross_change(HEADER_VALUE.DISCOUNTPERCENT);
    });
    it('7.set value to discount basic, discount basic oc, discount amount and discount amount oc will be recalculate',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change discount basis
        _headerAmountCalculate.getRate();
        _headerAmountCalculate.before_amount_change();
        //change discount basis
        _headerAmountCalculate.setDiscountBasic_header(HEADER_VALUE.DISCOUNTBASIC);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after discount basis
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_discountBasicOc_after_discountBasic_change(HEADER_VALUE.DISCOUNTBASIC);
        _headerAmountCalculate.verify_discountAmount_after_discountBasic_change(HEADER_VALUE.DISCOUNTBASIC,HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.verify_discountAmountOc_after_discountBasic_change();
    });
    it('8.modify payment tern to change discount percent, discount amount and discount amount oc will be recalculate',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.setAmountTotalPerformGross_header(HEADER_VALUE.TOTALPERFORMGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change payment term
        _headerAmountCalculate.before_amount_change();
        //change payment term
        _common.edit_dropdownCellWithInput(cnt.uuid.INVOICEHEADER,app.GridCells.PAYMENT_TERM_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,HEADER_VALUE.PAYMENTTERM)
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        _headerAmountCalculate.getRate();
        //get values after payment term
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_discountAmount_after_paymentTerm_change();
        _headerAmountCalculate.verify_discountAmountOc_after_paymentTerm_change();
    });
    it('9.when billing schema ischained =false,modify amount gross, total perform net and total perform gross will not  consider previous invoice',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODENOCHAIN)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT)
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values before change amount gross
        _headerAmountCalculate.before_amount_change();
        //change amount gross
        _headerAmountCalculate.setAmountGross_header(HEADER_VALUE.AMOUNTGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        _headerAmountCalculate.getRate();
        //get values after change amount gross
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_totalPerformNet_after_amountGross_NoChain_change();
        _headerAmountCalculate.verify_totalPerformGross_after_amountGross_NoChain_change();
        _headerAmountCalculate.verify_amountNet_after_amountGross_change(HEADER_VALUE.VATPERCENT,HEADER_VALUE.AMOUNTGROSS)
        _headerAmountCalculate.verify_amountOC_after_amountGross_change(HEADER_VALUE.VATPERCENT);
        _headerAmountCalculate.verify_amountGross_after_amountGross_change(HEADER_VALUE.AMOUNTGROSS);
        _headerAmountCalculate.verify_amountGrossOc_after_amountGross_change(HEADER_VALUE.AMOUNTGROSS)
        _headerAmountCalculate.verify_discount_after_amountGross_change(HEADER_VALUE.DISCOUNTPERCENT)
    });
    it('10.when billing schema ischained =false, modify total perform gross,amount net and gross include oc will not  consider previous invoice',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODENOCHAIN)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //get values before change total perform Gross
        _headerAmountCalculate.before_amount_change();
        //change total perform Gross
        _headerAmountCalculate.setAmountTotalPerformGross_header(HEADER_VALUE.TOTALPERFORMGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values after total perform Gross
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns
        _headerAmountCalculate.verify_amountNet_after_totalPerformGross_change(HEADER_VALUE.VATPERCENT);
        _headerAmountCalculate.verify_amountNetOC_after_totalPerformGross_change(HEADER_VALUE.VATPERCENT);
        _headerAmountCalculate.verify_amountGross_after_totalPerformGross_noChain_change(HEADER_VALUE.TOTALPERFORMGROSS);
        _headerAmountCalculate.verify_amountGrossOc_after_totalPerformGross_change();
        _headerAmountCalculate.verify_totalPerformNet_after_totalPerformGross_noChain_change();
        _headerAmountCalculate.verify_totalPerformGross_after_totalPerformGross_change(HEADER_VALUE.TOTALPERFORMGROSS,);
        _headerAmountCalculate.verify_discount_after_totalPerformGross_change(HEADER_VALUE.DISCOUNTPERCENT);
    });
    it('11.set value to amount gross, check whether values had been changed after click save',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODENOCHAIN)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //set value to column
        _headerAmountCalculate.setAmountGross_header(HEADER_VALUE.AMOUNTGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values before save
        _headerAmountCalculate.before_amount_change();
        cy.wait(2000);
        cy.SAVE();
        cy.wait(2000);
        //get values after SAVE
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns Should same before save and after save
        _headerAmountCalculate.verify_values_after_column_change_and_save();

    });
    it('12.set value to total perform  gross, check whether values had been changed after click save',function(){
        cy.REFRESH_CONTAINER();
        cy.wait(2000);
        _headerAmountCalculate.selectRecordMakeItActiveByCode(app.GridCells.CODE,HEADER_VALUE.INVCODE2)
        _headerAmountCalculate.setDiscountPercent_header(HEADER_VALUE.DISCOUNTPERCENT);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE);
        cy.wait(2000);
        //set value to column
        _headerAmountCalculate.setAmountTotalPerformGross_header(HEADER_VALUE.TOTALPERFORMGROSS);
        _headerAmountCalculate.shiftCursorToCell(cnt.uuid.INVOICEHEADER,app.GridCells.CODE)
        cy.wait(2000);
        //get values before save
        _headerAmountCalculate.before_amount_change();
        cy.wait(2000);
        cy.SAVE();
        cy.wait(2000);
        //get values after SAVE
        _headerAmountCalculate.after_amount_change();
        cy.wait(2000);
        //verify relate columns Should same before save and after save
        _headerAmountCalculate.verify_values_after_column_change_and_save();

    });
});
