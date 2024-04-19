/// <reference types="cypress" />
import {
    _common,
    _mainView,
    _modalView,
    _headerAmountCalculate, _copyMainEntryToDocumentProject
} from "cypress/pages";
import {app, cnt, btn, sidebar, commonLocators} from "cypress/locators";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
import Buttons from "cypress/locators/buttons";
import {find} from "rxjs";
const amounts=[];

export class headerAmountCalculate {
  /* Entering record to create package header */


  openModuleFromQuickStart(moduleName){
      _common.waitForLoaderToDisappear();
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.waitForLoaderToDisappear();
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, moduleName)
      _common.waitForLoaderToDisappear();
      cy.wait(5000);
  }

   searchWithCodeFromSideBar(code){
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard",code)

   }

    clickGridSettingButton(container_UUID){
        cy.log("click grid setting button");
        cy.get(`[class*='${container_UUID}'] `+commonLocators.CommonElements.ICON_SETTING).click();
    }

    clickGridLayoutButton(){
        cy.log("click grid layout button")
        cy.get(commonLocators.CommonElements.GRID_LAYOUT).click();
    }
    clickAllColumnsToLeft(){
        cy.log("make all columns to available pan");
        cy.get(commonLocators.CommonGridLayout.AllColumnsToLeft).click();
    }
    clickColumnToRight(){
        cy.log("make all columns to available pan");
        cy.get(commonLocators.CommonGridLayout.ColumnToRight).click();
    }
    clickAllColumnToRight(){
        cy.log("make all columns to available pan");
        cy.get(commonLocators.CommonGridLayout.AllColumnToRight).click();
    }
    setGridLayout(container_UUID,columnName){
        _common.maximizeContainer(container_UUID);
        cy.wait(1000)
        _headerAmountCalculate.clickGridSettingButton(container_UUID);
        cy.wait(1000);
        _headerAmountCalculate.clickGridLayoutButton();
        cy.wait(4000)
        _headerAmountCalculate.clickAllColumnsToLeft();
        cy.wait(2000)
        for(let index=0;index<columnName.length;index++){
            const colName = columnName[index];
            cy.wait(2000)
            cy.get(commonLocators.CommonElements.GRID_Layout_LEFT_ID+" "+commonLocators.CommonElements.SEARCH_TERM_INPUT)
                .clear()
            cy.wait(2000)
            cy.get(commonLocators.CommonElements.GRID_Layout_LEFT_ID+" "+commonLocators.CommonElements.SEARCH_TERM_INPUT)
                .type(colName)
            cy.wait(2000)
            cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS+" "+commonLocators.CommonElements.GRID_Layout_LEFT_ID+" ."+commonLocators.CommonElements.COLUMN_ID+app.GridCells.FIELD_NAME)
                .each(($el, nameIndex, $list) => {
                    const ActVal = $el.text();
                    cy.log(ActVal);
                    if (ActVal == colName) {
                        cy.wait(2000)
                        cy.wrap($el).click();
                    }
                });
            cy.wait(2000)
            _headerAmountCalculate.clickColumnToRight();
        }
        cy.wait(2000)
        _modalView.findModal()
            .acceptButton(btn.ButtonText.OK)
        cy.wait(2000)
        _common.minimizeContainer(container_UUID);
        cy.wait(2000)
    }
    shiftCursorToCell(containerUUID,cellType,containerPosition?:number,recordType?:string){
        _mainView.findModuleClientArea()
            .findAndShowContainer(containerUUID, containerPosition)
            .findGrid()
            .findActiveRow()
            .findCell(cellType, recordType)

    }

    selectRecordMakeItActiveByCode(cell,code){
        cy.wait(300).then(()=>{
            _mainView.findModuleClientArea()
                .findAndShowContainer(cnt.uuid.INVOICEHEADER)
                .findCellhasValue(cell, code)
                .click({force:true});
        });
        cy.wait(2000)
    }
    setValueToTextCell(cell,cellInput,cellValue) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(cnt.uuid.INVOICEHEADER)
            .findGrid()
            .findActiveRow()
            .findCell(cell)
            .findTextInput(cellInput)
            .type(cellValue)
            .type('{enter}');
        cy.wait(2000);
    }

    setAmount_header(amount){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.AMOUNT_NET,app.InputFields.INPUT_GROUP_CONTENT,amount);

    }
    setAmountGross_header(amountGross){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.AMOUNT_GROSS,app.InputFields.INPUT_GROUP_CONTENT,amountGross);

    }
    setAmountNetOc_header(amountnetoc){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.AMOUNT_NET_OC,app.InputFields.INPUT_GROUP_CONTENT,amountnetoc);

    }
    setAmountGrossOc_header(amountGrossoc){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.AMOUNT_GROSS_OC,app.InputFields.INPUT_GROUP_CONTENT,amountGrossoc);

    }
    setAmountTotalPerformNet_header(totalPerformNet){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.TOTAL_PERFORMED_NET,app.InputFields.INPUT_GROUP_CONTENT,totalPerformNet);

    }
    setAmountTotalPerformGross_header(totalPerformGross){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.TOTAL_PERFORMED_GROSS,app.InputFields.INPUT_GROUP_CONTENT,totalPerformGross);

    }
    setDiscountBasic_header(AMOUNT_DISCOUNT_BASIS){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.AMOUNT_DISCOUNT_BASIS,app.InputFields.INPUT_GROUP_CONTENT,AMOUNT_DISCOUNT_BASIS);

    }
    setDiscountPercent_header(percent){
        _headerAmountCalculate.setValueToTextCell(app.GridCells.PERCENT_DISCOUNT,app.InputFields.INPUT_GROUP_CONTENT,percent);
    }

    get_and_Verify_cellValue(cell,columnName,rate?:string) {
        _mainView.findModuleClientArea()
            .findAndShowContainer(cnt.uuid.INVOICEHEADER)
            .findGrid()
            .findActiveRow()
            .getCell(cell)
            .wrapElements()
            .then(($ele) => {
                var a=$ele.text();
                a=a.toString();
                const b=a.replace(/,/gi,'');
                const c=parseFloat(b);
                if(rate){
                    Cypress.env(columnName, c.toFixed(5));
                }

                else Cypress.env(columnName, c.toFixed(2));
                cy.wait(100);
            });
    }
    first_invoice_cell_values(){
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_NET,'firstAmountNet');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_GROSS,'firstAmountGross');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_NET_OC,'firstAmountOC');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.TOTAL_PERFORMED_NET,'firstTotalPerformNet');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.TOTAL_PERFORMED_GROSS,'firstTotalPerformGross');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_GROSS_OC,'firstAmountGrossOc');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_BASIS,'firstDiscountBasis');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_BASIS_OC,'firstDiscountBasisOC');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT,'firstDiscountAmount');
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_OC,'firstDiscountAmountOc');
    }
    before_amount_change(){
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_NET,'beforeAmountNet');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_GROSS,'beforeAmountGross');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_NET_OC,'beforeAmountOC');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.TOTAL_PERFORMED_NET,'beforeTotalPerformNet');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.TOTAL_PERFORMED_GROSS,'beforeTotalPerformGross');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_GROSS_OC,'beforeAmountGrossOc');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_BASIS,'beforeDiscountBasis');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_BASIS_OC,'beforeDiscountBasisOC');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT,'beforeDiscountAmount');
       _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_OC,'beforeDiscountAmountOc');
   }
    after_amount_change(){
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_NET,'afterAmountNet');
        cy.log('afterAmountNet:'+Cypress.env("afterAmountNet"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_GROSS,'afterAmountGross');
        cy.log('afterAmountGross:'+Cypress.env("afterAmountGross"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_NET_OC,'afterAmountOC');
        cy.log('afterAmountOC:'+Cypress.env("afterAmountOC"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.TOTAL_PERFORMED_NET,'afterTotalPerformNet');
        cy.log('afterTotalPerformNet:'+Cypress.env("afterTotalPerformNet"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.TOTAL_PERFORMED_GROSS,'afterTotalPerformGross');
        cy.log('afterTotalPerformGross:'+Cypress.env("afterTotalPerformGross"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_GROSS_OC,'afterAmountGrossOc');
        cy.log('afterAmountGrossOc:'+Cypress.env("afterAmountGrossOc"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_BASIS,'afterDiscountBasis');
        cy.log('afterDiscountBasis:'+Cypress.env("afterDiscountBasis"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_BASIS_OC,'afterDiscountBasisOC');
        cy.log('afterDiscountBasisOC:'+Cypress.env("afterDiscountBasisOC"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT,'afterDiscountAmount');
        cy.log('afterDiscountAmount:'+Cypress.env("afterDiscountAmount"));
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.AMOUNT_DISCOUNT_OC,'afterDiscountAmountOc');
        cy.log('afterDiscountAmountOc:'+Cypress.env("afterDiscountAmountOc"));
    }

    verify_amountGrossOc_after_amount_change(){
      cy.wait(500).then(() => {
            cy.log('when modify amount, amount gross oc will not change');
            expect(Cypress.env("beforeAmountGrossOc")).to.eq(Cypress.env("afterAmountGrossOc"));

        })
    }
    verify_amountGross_after_amount_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount, amount gross will not change');
            expect(Cypress.env("beforeAmountGross")).to.eq(Cypress.env("beforeAmountGross"));
        })
    }
    getRate(){
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.EXCHANGE_RATE,'rate','rate')
        _headerAmountCalculate.get_and_Verify_cellValue(app.GridCells.PERCENT_DISCOUNT,'discountPercent')
    }
    formatNUmber(number){
        const num = number.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        return num;
    }
    removeComma(evnValue){
        var a=Cypress.env(evnValue);
        a=a.toString();
        a=a.replace(/,/gi,'');
        a=parseFloat(a);
        return a;
    }
    verify_amountOC_after_amount_change(amount){
        cy.wait(500).then(() => {
            cy.log('when modify amount, amount oc will recalculate, value is:'+Cypress.env("afterAmountOC"));
            const amountOc=amount*Cypress.env("rate");
            const amountOcb = amountOc.toFixed(2);
            expect(amountOcb).to.eq(Cypress.env("afterAmountOC"));

        })
    }
    verify_totalPerformNet_after_amount_change(amount){
        cy.wait(500).then(() => {
            cy.log('when modify amount, total perform net will  change:before +amount:'+Cypress.env("afterTotalPerformNet"));
            const totalPerformNet=parseFloat(Cypress.env("firstTotalPerformNet"));
            const currentTotalPerformNet=totalPerformNet + amount;
            expect(currentTotalPerformNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));
                   })
    }
    verify_totalPerformGross_after_amount_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount, total perform gross will not change:'+Cypress.env("afterTotalPerformGross"));
            expect(Cypress.env("beforeTotalPerformGross")).to.eq(Cypress.env("afterTotalPerformGross"));
                   })
    }
    verify_discount_after_amount_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount, Discount Basis will not change'+Cypress.env("beforeDiscountBasis"));
            expect(Cypress.env("beforeDiscountBasis")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('when modify amount, Discount Basis oc will not change'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("beforeDiscountBasisOC")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('when modify amount, Discount amount will not change'+Cypress.env("afterDiscountAmount"));
            expect(Cypress.env("beforeDiscountAmount")).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('when modify amount, Discount amount oc will not change'+Cypress.env("afterDiscountAmountOc"));
            expect(Cypress.env("beforeDiscountAmountOc")).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_totalPerformNet_after_amountGross_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross, total perform net will  change:before perform net  +current amount net:'+Cypress.env("afterTotalPerformNet"));
            const firstPerformNet=parseFloat(Cypress.env("firstTotalPerformNet"));
            const currentAmountNet=parseFloat(Cypress.env("afterAmountNet"))
            const currentTotalPerformNet = firstPerformNet + currentAmountNet;
            expect(currentTotalPerformNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));

        })
    }
    verify_totalPerformGross_after_amountGross_change(){
      cy.wait(500).then(() => {
          cy.log('when modify amount gross, total perform net gross will  change:before perform gross +current amount gross:'+Cypress.env("afterTotalPerformGross"));
          var firstPerformGross=parseFloat(Cypress.env("firstTotalPerformGross"));
          var currentAmountGross=parseFloat(Cypress.env("afterAmountGross"))
            const currentTotalPerformGross= firstPerformGross + currentAmountGross;
            expect(currentTotalPerformGross.toFixed(2)).to.eq(Cypress.env("afterTotalPerformGross"));

        })
    }
    verify_amountGrossOc_after_amountGross_change(amountGross){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross, amount gross oc will  change:amount gross*rate is:'+Cypress.env("afterAmountGrossOc"));
            const a=amountGross*Cypress.env("rate");
            expect(a.toFixed(2)).to.eq(Cypress.env("afterAmountGrossOc"));

        })
    }
    verify_amountNet_after_amountGross_change(vatPercent,amountGross){
      cy.wait(500).then(() => {
          cy.log('modify amount gross: amount net =amountGross/vatpercent,Value is:'+Cypress.env("afterAmountNet"))
          const amountNet=amountGross/(100+vatPercent)*100;
          //const a=_headerAmountCalculate.formatNUmber(amountNet);
          expect(amountNet.toFixed(2)).to.eq(Cypress.env("afterAmountNet"));
      })
    }
    verify_amountGross_after_amountGross_change(amountGross){
        cy.wait(500).then(() => {
            cy.log('modify amount gross: amount gross =amountGross,Value is:'+Cypress.env("afterAmountGross"))
           // const a=_headerAmountCalculate.formatNUmber(amountGross);
            expect(amountGross.toFixed(2)).to.eq(Cypress.env("afterAmountGross"));
        })
    }
    verify_amountOC_after_amountGross_change(vatPercent){
        cy.wait(500).then(() => {
            cy.log('modify amount gross: amount net oc=amount gross oc / vat *100, value is:'+Cypress.env("afterAmountOC"));
            const a=parseFloat(Cypress.env("afterAmountGrossOc"))/(100+vatPercent)*100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterAmountOC"));

        })
    }
    verify_discount_after_amountGross_change(percent){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross, Discount Basis =amount gross'+Cypress.env("afterDiscountBasis"));
            expect(Cypress.env("afterAmountGross")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('when modify amount gross, Discount Basis oc =amount gross oc'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("afterAmountGrossOc")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('when modify amount gross, Discount amount =discount basis*percent'+Cypress.env("afterDiscountAmount"));
            const a=Cypress.env("afterDiscountBasis")*percent/100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('when modify amount gross, Discount amount oc=discount basis oc* percent'+Cypress.env("afterDiscountAmountOc"));
            const c=Cypress.env("afterDiscountBasisOC")*percent/100;
            //const d=_headerAmountCalculate.formatNUmber(c);
            expect(c.toFixed(2)).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_amountNetOc_after_amountNetOc_change(amountNetOc){
        cy.wait(500).then(() => {
            cy.log('modify amount net oc: amount net oc=input value,Value is:'+Cypress.env("afterAmountOC"))
            expect(amountNetOc.toFixed(2)).to.eq(Cypress.env("afterAmountOC"));
        })
    }
    verify_amountNet_after_amountNetOc_change(amount){
        cy.wait(500).then(() => {
            cy.log('when modify amount net oc, amount net =amount net oc/rate, value is:'+Cypress.env("afterAmountNet"));
            const amountOc=amount/Cypress.env("rate");
            const amountOcb = amountOc.toFixed(2);
            expect(amountOcb).to.eq(Cypress.env("afterAmountNet"));

        })
    }
    verify_amountGross_after_amountNetOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount net oc, amount gross will not change, value is:'+Cypress.env("afterAmountGross"));
            expect(Cypress.env("beforeAmountGross")).to.eq(Cypress.env("afterAmountGross"));

        })
    }
    verify_amountGrossOc_after_amountNetOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount net oc, amount gross oc will no change, value is:'+Cypress.env("afterAmountGrossOc"));
            expect(Cypress.env("beforeAmountGrossOc")).to.eq(Cypress.env("afterAmountGrossOc"));

        })
    }
    verify_amountTotalPerformNet_after_amountNetOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount net oc, total perform net = previous total perform net+current amount net, value is:'+Cypress.env("afterTotalPerformNet"));
            const firstPerformNet=parseFloat(Cypress.env("firstTotalPerformNet"));
            const currentAmountNet=parseFloat(Cypress.env("afterAmountNet"))
            const currentTotalPerformNet = firstPerformNet + currentAmountNet;
            expect(currentTotalPerformNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));
        })
    }
    verify_amountTotalPerformGross_after_amountNetOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount net oc, total perform gross will not change:'+Cypress.env("afterTotalPerformGross"));
            expect(Cypress.env("beforeTotalPerformGross")).to.eq(Cypress.env("afterTotalPerformGross"));
        })
    }
    verify_discount_after_amountNetOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount net oc, Discount Basis will not change'+Cypress.env("afterDiscountBasis"));
            expect(Cypress.env("beforeDiscountBasis")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('when modify amount net oc, Discount Basis oc will not change'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("beforeDiscountBasisOC")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('when modify amount net oc, Discount amount will not change'+Cypress.env("afterDiscountAmount"));
            expect(Cypress.env("beforeDiscountAmount")).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('when modify amount net oc, Discount amount oc will not change'+Cypress.env("afterDiscountAmountOc"));
            expect(Cypress.env("beforeDiscountAmountOc")).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_amountNet_after_amountGrossOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, amount net =amount net oc/rate, value is:'+Cypress.env("afterAmountNet"));
            const amountOc=Cypress.env("afterAmountOC")/Cypress.env("rate");
            const amountOcb = amountOc.toFixed(2);
            expect(amountOcb).to.eq(Cypress.env("afterAmountNet"));

        })
    }
    verify_amountNetOc_after_amountGrossOc_change(amountGrossOc,vatPercent){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, amount net oc=amount gross oc/(100+vatPercent)*100, value is:'+Cypress.env("afterAmountOC"));
            const amountGross=amountGrossOc/(100+vatPercent)*100;
            expect(amountGross.toFixed(2)).to.eq(Cypress.env("afterAmountOC"));
        })
    }
    verify_amountGross_after_amountGrossOc_change(amountGrossOc){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, amount gross=amount gross oc/rate, value is:'+Cypress.env("afterAmountGross"));
            const amountGross=amountGrossOc/Cypress.env("rate");
            expect(amountGross.toFixed(2)).to.eq(Cypress.env("afterAmountGross"));
        })
    }
    verify_amountGrossOc_after_amountGrossOc_change(amountGrossOc){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, amount gross oc=amount gross oc, value is:'+Cypress.env("afterAmountGrossOc"));
            expect(amountGrossOc.toFixed(2)).to.eq(Cypress.env("afterAmountGrossOc"));
        })
    }
    verify_totalPerformNet_after_amountGrossOC_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, total perform net will  change:before perform net  +current amount net:'+Cypress.env("afterTotalPerformNet"));
            const firstPerformNet=parseFloat(Cypress.env("firstTotalPerformNet"));
            const currentAmountNet=parseFloat(Cypress.env("afterAmountNet"))
            const currentTotalPerformNet = firstPerformNet + currentAmountNet;
            expect(currentTotalPerformNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));

        })
    }
    verify_totalPerformGross_after_amountGrossOc_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, total perform net gross will  change:before perform gross +current amount gross:'+Cypress.env("afterTotalPerformGross"));
            var firstPerformGross=parseFloat(Cypress.env("firstTotalPerformGross"));
            var currentAmountGross=parseFloat(Cypress.env("afterAmountGross"))
            const currentTotalPerformGross= firstPerformGross + currentAmountGross;
            expect(currentTotalPerformGross.toFixed(2)).to.eq(Cypress.env("afterTotalPerformGross"));

        })
    }
    verify_discount_after_amountGrossOc_change(percent){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross oc, Discount Basis =amount gross'+Cypress.env("afterDiscountBasis"));
            expect(Cypress.env("afterAmountGross")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('when modify amount gross oc, Discount Basis oc =amount gross oc'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("afterAmountGrossOc")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('when modify amount gross oc, Discount amount =discount amount oc/rate'+Cypress.env("afterDiscountAmount"));
            const a=Cypress.env("afterDiscountAmountOc")/Cypress.env("rate");
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('when modify amount gross oc, Discount amount oc=discount basis oc* percent'+Cypress.env("afterDiscountAmountOc"));
            const c=Cypress.env("afterDiscountBasisOC")*percent/100;
            expect(c.toFixed(2)).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_amountNetOc_after_totalPerformNet_change(){
        cy.wait(500).then(() => {
            cy.log('modify total perform net: amount net oc=amount net *rate,Value is:'+Cypress.env("afterAmountOC"));
            const netOC=Cypress.env("afterAmountNet")*Cypress.env("rate")
            expect(netOC.toFixed(2)).to.eq(Cypress.env("afterAmountOC"));
        })
    }
    verify_amountNet_after_totalPerformNet_change(totalPerformNet){
        cy.wait(500).then(() => {
            cy.log('when modify total perform net, amount net =input total perform net - previous total perform net, value is:'+Cypress.env("afterAmountNet"));
            const firstPerformNet=parseFloat(Cypress.env("firstTotalPerformNet"));
            const currentTotalPerformNet = totalPerformNet-firstPerformNet ;
            expect(currentTotalPerformNet.toFixed(2)).to.eq(Cypress.env("afterAmountNet"));

        })
    }
    verify_amountGross_after_totalPerformNet_change(){
        cy.wait(500).then(() => {
            cy.log('when modify total perform net, amount gross will not change, value is:'+Cypress.env("afterAmountGross"));
            expect(Cypress.env("beforeAmountGross")).to.eq(Cypress.env("afterAmountGross"));

        })
    }
    verify_amountGrossOc_after_totalPerformNet_change(){
        cy.wait(500).then(() => {
            cy.log('when modify total perform net, amount gross oc will no change, value is:'+Cypress.env("afterAmountGrossOc"));
            expect(Cypress.env("beforeAmountGrossOc")).to.eq(Cypress.env("afterAmountGrossOc"));

        })
    }
    verify_totalPerformNet_after_totalPerformNet_change(totalPerformNet){
        cy.wait(500).then(() => {
            cy.log('when modify total perform net, total perform net = input value, value is:'+Cypress.env("afterTotalPerformNet"));
            expect(totalPerformNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));
        })
    }
    verify_totalPerformGross_after_totalPerformNet_change(){
        cy.wait(500).then(() => {
            cy.log('when modify total perform net, total perform gross will not change:'+Cypress.env("afterTotalPerformGross"));
            expect(Cypress.env("beforeTotalPerformGross")).to.eq(Cypress.env("afterTotalPerformGross"));
        })
    }
    verify_discount_after_totalPerformNet_change(){
        cy.wait(500).then(() => {
            cy.log('when modify total perform net, Discount Basis will not change'+Cypress.env("afterDiscountBasis"));
            expect(Cypress.env("beforeDiscountBasis")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('when modify total perform net, Discount Basis oc will not change'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("beforeDiscountBasisOC")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('when modify total perform net, Discount amount will not change'+Cypress.env("afterDiscountAmount"));
            expect(Cypress.env("beforeDiscountAmount")).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('when modify total perform net, Discount amount oc will not change'+Cypress.env("afterDiscountAmountOc"));
            expect(Cypress.env("beforeDiscountAmountOc")).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_amountNet_after_totalPerformGross_change(vatPercent){
        cy.wait(500).then(() => {
            cy.log('modify total perform gross: amount net =amountGross/vatpercent,Value is:'+Cypress.env("afterAmountNet"))
            const amountNet=Cypress.env("afterAmountGross")/(100+vatPercent)*100;
            expect(amountNet.toFixed(2)).to.eq(Cypress.env("afterAmountNet"));
        })
    }
    verify_amountNetOC_after_totalPerformGross_change(vatPercent){
        cy.wait(500).then(() => {
            cy.log('modify amount gross: amount net oc=amount gross oc / vat *100, value is:'+Cypress.env("afterAmountOC"));
            const a=parseFloat(Cypress.env("afterAmountGrossOc"))/(100+vatPercent)*100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterAmountOC"));

        })
    }
    verify_amountGross_after_totalPerformGross_change(totalperformGross){
        cy.wait(500).then(() => {
            cy.log('modify total perform gross: amount gross =total perform gross-previous total perform gross,Value is:'+Cypress.env("afterAmountGross"))
            const firstPerformGross=parseFloat(Cypress.env("firstTotalPerformGross"));
            const currentAmountGross = totalperformGross-firstPerformGross ;
            expect(currentAmountGross.toFixed(2)).to.eq(Cypress.env("afterAmountGross"));
        })
    }
    verify_amountGrossOc_after_totalPerformGross_change(){
        cy.wait(500).then(() => {
            cy.log('when modify amount gross, amount gross oc will  change:amount gross*rate is:'+Cypress.env("afterAmountGrossOc"));
            const a=Cypress.env("afterAmountGross")*Cypress.env("rate");
            expect(a.toFixed(2)).to.eq(Cypress.env("afterAmountGrossOc"));

        })
    }
     verify_totalPerformNet_after_totalPerformGross_change(){
        cy.wait(500).then(() => {
            cy.log('when modify total perform gross, total perform net =previous total perform net+amount net:'+Cypress.env("afterTotalPerformNet"));
            const firstPerformNet=parseFloat(Cypress.env("firstTotalPerformNet"));
            const currentAmountNet=parseFloat(Cypress.env("afterAmountNet"))
            const currentTotalPerformNet = firstPerformNet + currentAmountNet;
            expect(currentTotalPerformNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));

        })
    }
    verify_totalPerformGross_after_totalPerformGross_change(totalperformGross){
        cy.wait(500).then(() => {
            cy.log('when modify total perform gross, total perform gross will be input value'+Cypress.env("afterTotalPerformGross"));
            expect(totalperformGross.toFixed(2)).to.eq(Cypress.env("afterTotalPerformGross"));

        })
    }
    verify_discount_after_totalPerformGross_change(percent){
        cy.wait(500).then(() => {
            cy.log('when modify total perform gross, Discount Basis =amount gross'+Cypress.env("afterDiscountBasis"));
            expect(Cypress.env("afterAmountGross")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('when modify total perform gross, Discount Basis oc =amount gross oc'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("afterAmountGrossOc")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('when modify total perform gross, Discount amount =discount basis*percent'+Cypress.env("afterDiscountAmount"));
            const a=Cypress.env("afterDiscountBasis")*percent/100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('when modify total perform gross, Discount amount oc=discount basis oc* percent'+Cypress.env("afterDiscountAmountOc"));
            const c=Cypress.env("afterDiscountBasisOC")*percent/100;
            expect(c.toFixed(2)).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_discountBasicOc_after_discountBasic_change(discountbasic){
        cy.wait(500).then(() => {
            cy.log('when modify discount basic, Discount Basis oc =discount basic *rate'+Cypress.env("afterDiscountBasisOC"));
            const a=discountbasic*Cypress.env("rate");
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountBasisOC"));

        })
    }
    verify_discountAmount_after_discountBasic_change(discountbasic,disocuntpercent){
        cy.wait(500).then(() => {
            cy.log('when modify discount basic, Discount amount =discount basic *rate'+Cypress.env("afterDiscountBasisOc"));
            const a=discountbasic*disocuntpercent/100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmount"));

        })
    }
    verify_discountAmountOc_after_discountBasic_change(){
        cy.wait(500).then(() => {
            cy.log('when modify discount basic, Discount amount oc=discount amount *rate'+Cypress.env("afterDiscountBasisOc"));
            const a=Cypress.env("afterDiscountAmount")*Cypress.env("rate");
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_discountAmount_after_paymentTerm_change(){
        cy.wait(500).then(() => {
            cy.log('when modify payment term to change discount percent, Discount amount =discount basic *rate'+Cypress.env("afterDiscountBasisOc"));
            const a=Cypress.env("afterDiscountBasis")*Cypress.env("discountPercent")/100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmount"));

        })
    }
    verify_discountAmountOc_after_paymentTerm_change(){
        cy.wait(500).then(() => {
            cy.log('when modify payment term to change discount percent, Discount amount oc=discount amount *rate'+Cypress.env("afterDiscountAmountOc"));
            const a=Cypress.env("afterDiscountBasisOC")*Cypress.env("discountPercent")/100;
            expect(a.toFixed(2)).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

    verify_totalPerformNet_after_amountGross_NoChain_change(){
        cy.wait(500).then(() => {
            cy.log('billing schema chained=false:when modify amount gross, total perform net will  change:current amount net:'+Cypress.env("afterTotalPerformNet"));
            const currentAmountNet=parseFloat(Cypress.env("afterAmountNet"))
            expect(currentAmountNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));

        })
    }
    verify_totalPerformGross_after_amountGross_NoChain_change(){
        cy.wait(500).then(() => {
            cy.log('billing schema chained=false ：when modify amount gross, total perform net gross will  change:current amount gross:'+Cypress.env("afterTotalPerformGross"));
            var currentAmountGross=parseFloat(Cypress.env("afterAmountGross"))
            expect(currentAmountGross.toFixed(2)).to.eq(Cypress.env("afterTotalPerformGross"));

        })
    }

    verify_amountGross_after_totalPerformGross_noChain_change(totalperformGross){
        cy.wait(500).then(() => {
            cy.log('billing schema chained=false ：modify total perform gross: amount gross =total perform gross,Value is:'+Cypress.env("afterAmountGross"))
            const currentAmountGross = totalperformGross ;
            expect(currentAmountGross.toFixed(2)).to.eq(Cypress.env("afterAmountGross"));
        })
    }
    verify_totalPerformNet_after_totalPerformGross_noChain_change(){
        cy.wait(500).then(() => {
            cy.log('billing schema chained=false ：when modify total perform gross, total perform net =amount net:'+Cypress.env("afterTotalPerformNet"));
            const currentAmountNet=parseFloat(Cypress.env("afterAmountNet"))
            expect(currentAmountNet.toFixed(2)).to.eq(Cypress.env("afterTotalPerformNet"));

        })
    }

    verify_values_after_column_change_and_save(){
        cy.wait(500).then(() => {
            cy.log('amount net before save:'+Cypress.env("beforeAmountNet")+'; after save:'+Cypress.env("afterAmountNet"));
            expect(Cypress.env("beforeAmountNet")).to.eq(Cypress.env("afterAmountNet"));
            cy.log('amount gross before save:'+Cypress.env("beforeAmountGross")+'; after save:'+Cypress.env("afterAmountGross"));
            expect(Cypress.env("beforeAmountGross")).to.eq(Cypress.env("afterAmountGross"));
            cy.log('amount net OC before save:'+Cypress.env("beforeAmountOC")+'; after save:'+Cypress.env("afterAmountOC"));
            expect(Cypress.env("beforeAmountOC")).to.eq(Cypress.env("afterAmountOC"));
            cy.log('total perform net before save:'+Cypress.env("beforeTotalPerformNet")+'; after save:'+Cypress.env("afterTotalPerformNet"));
            expect(Cypress.env("beforeTotalPerformNet")).to.eq(Cypress.env("afterTotalPerformNet"));
            cy.log('total perform gross before save:'+Cypress.env("beforeTotalPerformGross")+'; after save:'+Cypress.env("afterTotalPerformGross"));
            expect(Cypress.env("beforeTotalPerformGross")).to.eq(Cypress.env("afterTotalPerformGross"));
            cy.log('amount gross oc before save:'+Cypress.env("beforeAmountGrossOc")+'; after save:'+Cypress.env("afterAmountGrossOc"));
            expect(Cypress.env("beforeAmountGrossOc")).to.eq(Cypress.env("afterAmountGrossOc"));
            cy.log('discount basic before save:'+Cypress.env("beforeDiscountBasis")+'; after save:'+Cypress.env("afterDiscountBasis"));
            expect(Cypress.env("beforeDiscountBasis")).to.eq(Cypress.env("afterDiscountBasis"));
            cy.log('discount basic oc before save:'+Cypress.env("beforeDiscountBasisOC")+'; after save:'+Cypress.env("afterDiscountBasisOC"));
            expect(Cypress.env("beforeDiscountBasisOC")).to.eq(Cypress.env("afterDiscountBasisOC"));
            cy.log('discount amount before save:'+Cypress.env("beforeDiscountAmount")+'; after save:'+Cypress.env("afterDiscountAmount"));
            expect(Cypress.env("beforeDiscountAmount")).to.eq(Cypress.env("afterDiscountAmount"));
            cy.log('discount amount oc before save:'+Cypress.env("beforeDiscountAmountOc")+'; after save:'+Cypress.env("afterDiscountAmountOc"));
            expect(Cypress.env("beforeDiscountAmountOc")).to.eq(Cypress.env("afterDiscountAmountOc"));

        })
    }

}
