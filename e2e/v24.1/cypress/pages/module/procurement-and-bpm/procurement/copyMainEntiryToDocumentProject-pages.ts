/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _copyMainEntryToDocumentProject, _salesPage, _validate, _wizardCreateRequest } from 'cypress/pages';
import { cnt, btn, sidebar, commonLocators } from 'cypress/locators';



export class copyMainEntryToDocumentProject {
	/* Entering record to create package header */

	openModuleFromQuickStart(moduleName) {
		_common.waitForLoaderToDisappear();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.waitForLoaderToDisappear();
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, moduleName);
		_common.waitForLoaderToDisappear();
		cy.wait(5000);
	}

	searchWithCodeFromSideBar(code) {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar('standard', code);
	}
	getCellValueOfDocumentProject(cell, cellvalue) {
		cy.log('vilify :' + cell + ' .input value is:' + cellvalue);
		_common.getText_fromCell(cnt.uuid.PROJECT_DOCUMENTS, cell).then(($ele) => {
			cy.log(cell + ' vilify pass. value is:' + $ele.text());
			expect($ele.text()).to.equal(cellvalue);
		});
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
		cy.get(commonLocators.CommonGridLayout.AllColumnsToLeft).click();
	}
	clickColumnToRight() {
		cy.log('make all columns to available pan');
		cy.get(commonLocators.CommonGridLayout.ColumnToRight).click();
	}
	clickAllColumnToRight() {
		cy.log('make all columns to available pan');
		cy.get(commonLocators.CommonGridLayout.AllColumnToRight).click();
	}

	setGridLayout_all_to_right(container_UUID) {
		_common.maximizeContainer(container_UUID);
		cy.wait(1000);
		_copyMainEntryToDocumentProject.clickGridSettingButton(container_UUID);
		cy.wait(1000);
		_copyMainEntryToDocumentProject.clickGridLayoutButton();
		cy.wait(4000);
		_copyMainEntryToDocumentProject.clickAllColumnToRight();
		cy.wait(2000);
		_modalView.findModal().acceptButton(btn.ButtonText.OK);
		cy.wait(2000);
		_common.minimizeContainer(container_UUID);
		cy.wait(2000);
	}

	getTextFrom_ModalInput(actualValue: string, labelName: string, cellType: string, index: number) {
		let findClass;
		if (cellType == 'lookup') {
			findClass =commonLocators.ModalInput.lookup_Cell;
		} else if (cellType == 'text') {
			//findClass = `input[data-ng-model="entity.${labelName}"]`;
			findClass=commonLocators.ModalInput.text_Cell+labelName+'}"]'
		}
		const divM = cy
			.get(commonLocators.ModalInput.modal_label)
			.contains(labelName)
			.then((ele) => {
				cy.wrap(ele)
					.parent()
					.find(findClass)
					//index 0 and 1
					.eq(index)
					.invoke('val')
					.then(function (codeVal: string) {
						const expectedValue = codeVal;
						cy.log(expectedValue);
						Cypress.env('getTextInModalInput', expectedValue);
						cy.log(labelName + ' vilify pass. value is:' + expectedValue);
						cy.log(' actual value is;' + actualValue);
						expect(expectedValue).to.equals(actualValue);
					});
			});
	}
}
