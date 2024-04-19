/// <reference types="cypress" />
import { _common, _mainView, _modalView, _wizardCreateRequest } from 'cypress/pages';
import { app, cnt, btn, sidebar, commonLocators } from 'cypress/locators';

export class wizardCreateRequest {
	/* Entering record to create package header */
	enterRecord_toCreateContract(businesspartner: string) {
		_mainView.findModuleClientArea();
		_modalView
			.findModal()
			.findInputFieldInsideModal('Business Partner', app.InputFields.INPUT_GROUP_CONTENT)
			.type(businesspartner)
			.then(() => {
				cy.wait(1000);
				_modalView.select_popupItem('grid', businesspartner);
			});
		_modalView.findModal().acceptButton('OK');
	}

	getCellText(uuid, cellName, cellValue?) {
		_common.getText_fromCell(uuid, cellName).then(($ele) => {
			var cell = $ele.text();
			Cypress.env(cellValue, cell);
		});
	}
	searchContractWithCreateCode() {
		cy.wait(2000);
		_wizardCreateRequest.getCellText(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, 'cell_name');
		cy.wait(500).then(() => {
			var contractCode = Cypress.env('cell_name');
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar('standard', Cypress.env('cell_name'));
		});
	}

	getFooterItemsNumber(container_UUID, footerItemNumber, exp) {
		cy.get(`[class*='cid_${container_UUID}'] `).then(($body) => {
			if ($body.find(`.cid_${container_UUID}.statusbar-wrapper`).length > 0) {
				cy.log('status bar already showed');
			} else {
				cy.wait(500);
				cy.get(`.cid_${container_UUID} .showimages button[title="Grid Settings"]`).click();
				cy.wait(2000);
				cy.get(`button[title="Show Statusbar"]`).click();
			}
			cy.wait(2000);
			cy.get(`.cid_${container_UUID} .statusbar-wrapper`).then(($ele) => {
				const itemNUmber = $ele.text().split(': ')[1].split('/')[0];

				expect(itemNUmber).to.eq(exp);
				Cypress.env(footerItemNumber, itemNUmber);
				//cy.log(Cypress.env(ItemsNumber));
			});
		});
	}
	validWizardCreateItemMessage(exp) {
		cy.get(`.modal-dialog .alert .ng-binding`).then((ele) => {
			const te = ele.last().text().split(' ')[0];
			expect(te).to.eq(exp);
			cy.log('create request successfully,create record number is:' + te);
		});
	}

	enterEachTextCell_toCurrentCertificate(cell, cellInput, cellValue) {
		cy.log('set value to column:' + cell);
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_ACTUAL_CERTIFICATE).findGrid().findActiveRow().findCell(cell).findTextInput(cellInput).type(cellValue).type('{enter}');
		cy.wait(2000);
	}

	enterValidFrom_toCurrentCertificate(day) {
		const validFrom = _wizardCreateRequest.setValueToDate(day);
		cy.log('valid from:' + validFrom);
		_wizardCreateRequest.enterEachTextCell_toCurrentCertificate(app.GridCells.VALID_FROM, app.InputFields.INPUT_GROUP_CONTENT, validFrom);
	}
	enterValidTo_toCurrentCertificate(day) {
		const validTo = _wizardCreateRequest.setValueToDate(day);
		cy.log('valid to:' + validTo);
		_wizardCreateRequest.enterEachTextCell_toCurrentCertificate(app.GridCells.VALID_TO, app.InputFields.INPUT_GROUP_CONTENT, validTo);
	}
	enterDischarged_toCurrentCertificate(day) {
		const discharged = _wizardCreateRequest.setValueToDate(day);
		cy.log('valid to:' + discharged);
		_wizardCreateRequest.enterEachTextCell_toCurrentCertificate(app.GridCells.DISCHARGED_DATE, app.InputFields.INPUT_GROUP_CONTENT, discharged);
	}

	enterExpirationDate_toCurrentCertificate(day) {
		const ExpirationDate = _wizardCreateRequest.setValueToDate(day);
		cy.log('valid to:' + ExpirationDate);
		_wizardCreateRequest.enterEachTextCell_toCurrentCertificate(app.GridCells.EXPIRATION_DATE, app.InputFields.INPUT_GROUP_CONTENT, ExpirationDate);
	}
	setValueToDate(day) {
		const currentDate = new Date();
		const requiredDate = new Date(currentDate);
		requiredDate.setDate(currentDate.getDate() + day);
		//const formattedRequiredDate = `${requiredDate.getFullYear()}-${(requiredDate.getMonth() + 1).toString().padStart(2, '0')}-${repadStartquiredDate.getDate().toString().padStart(2, '0')}`;
		const formattedRequiredDate = `${requiredDate.getDate().toString()}` + '/' + `${(requiredDate.getMonth() + 1).toString()}` + '/' + `${requiredDate.getFullYear()}`;
		return formattedRequiredDate;
	}
	getCurrentCertificateCode() {
		_wizardCreateRequest.getCellText(cnt.uuid.CONTRACT_ACTUAL_CERTIFICATE, app.GridCells.CODE, 'certificateCode');
	}
	selectRecordMakeItActiveByType(cell, certificateType) {
		cy.wait(300).then(() => {
			_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.CONTRACT_ACTUAL_CERTIFICATE).findCellhasValue(cell, certificateType).last().click({ force: true });
		});
	}
	selectLastRecord(container_UUID, cell) {
		cy.log('select last record in container:' + container_UUID + ', by column:' + cell);
		cy.get(`.cid_${container_UUID} .slick-viewport .column-id_${cell}`).last().click();
	}

	wizardCreateRequestAndVilify(expItemNumber) {
		cy.log('click wizard create request');
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar('wizard', 'Create Requests');
		cy.wait(3000);
		_modalView.findModal().acceptButton('OK');
		cy.wait(4000);
		cy.log('vilify wizard whether create request');
		_wizardCreateRequest.validWizardCreateItemMessage(expItemNumber);
		_modalView.findModal().acceptButton('Close');
		cy.wait(2000);
	}

	clickGridSettingButton(container_UUID) {
		cy.log('click grid setting button');
		cy.get(`[class*='${container_UUID}'] ` + commonLocators.CommonElements.ICON_SETTING).click();
	}
	clickGridLayoutButton() {
		cy.log('click grid layout button');
		cy.get(commonLocators.CommonElements.GRID_LAYOUT).click();
	}
	clickAllColumnsToLeft() {
		cy.log('make all columns to available pan');
		cy.get('.middle-container .ico-ar1-left2').click();
	}
	clickColumnToRight() {
		cy.log('make all columns to available pan');
		cy.get('.middle-container .ico-ar1-right1').click();
	}
	setGridLayout(container_UUID, columnName) {
		_common.maximizeContainer(container_UUID);
		_wizardCreateRequest.clickGridSettingButton(container_UUID);
		cy.wait(1000);
		_wizardCreateRequest.clickGridLayoutButton();
		cy.wait(4000);
		_wizardCreateRequest.clickAllColumnsToLeft();
		cy.wait(2000);
		for (let index = 0; index < columnName.length; index++) {
			const colName = columnName[index];
			cy.wait(2000);
			cy.get(commonLocators.CommonElements.GRID_Layout_LEFT_ID + ' ' + commonLocators.CommonElements.SEARCH_TERM_INPUT)
				.clear()
				.type(colName);
			cy.wait(2000);
			cy.get(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS + ' ' + commonLocators.CommonElements.GRID_Layout_LEFT_ID + ' .' + commonLocators.CommonElements.COLUMN_ID + app.GridCells.FIELD_NAME).each(($el, nameIndex, $list) => {
				const ActVal = $el.text();
				cy.log(ActVal);
				if (ActVal == colName) {
					cy.wait(2000);
					cy.wrap($el).click();
				}
			});
			cy.wait(2000);
			_wizardCreateRequest.clickColumnToRight();
		}
		cy.wait(2000);
		_modalView.findModal().acceptButton(btn.ButtonText.OK);
		cy.wait(2000);
		cy.get(`[class*='${container_UUID}'] ` + commonLocators.CommonContainerElements.MINIMIZE).click();
		cy.wait(2000);
	}
}
