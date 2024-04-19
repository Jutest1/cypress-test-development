/// <reference types="cypress" />
import { _common, _estimatePage, _mainView, _modalView, _package, _salesPage } from 'cypress/pages';
import { app, cnt, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";


export class ProcurementConfigurationPage {
	enterRecord_ToCreateConfigurations(description: string) {
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, description);
	}

	enterRecord_ToCreateHeaderTexts(textType: string, textModuleType: string, rubicBase: string) {
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADER_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,textType)
		_common.select_activeRowInContainer(cnt.uuid.HEADER_TEXTS)
		_common.waitForLoaderToDisappear()

		_common.edit_dropdownCellWithCaret(cnt.uuid.HEADER_TEXTS,app.GridCells.BAS_TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,textModuleType)
		_common.select_activeRowInContainer(cnt.uuid.HEADER_TEXTS)
		_common.waitForLoaderToDisappear()

		_common.set_cellCheckboxValue(cnt.uuid.HEADER_TEXTS,app.GridCells.IS_RUBRIC_BASED,rubicBase)
		_common.select_activeRowInContainer(cnt.uuid.HEADER_TEXTS)
		_common.waitForLoaderToDisappear()
	}

	changeProcurementConfiguration_FromWizard(config: string, acceptBtn: string) {
		_modalView.findModal().findInputFieldInsideModal('Configuration', app.InputFields.INPUT_GROUP_CONTENT).clear().type(config);
		cy.wait(2000);
		_modalView.select_popupItem('grid', config);
		_modalView.findModal().acceptButton(btn.ButtonText.OK);
		cy.wait(5000);
		cy.get('body').then(($body) => {
			if ($body.find(commonLocators.CommonModalElements.MODAL_DIALOG_CLASS).length > 0) {
				_modalView.findModal().acceptButton(acceptBtn);
			}
		});
	}

	clickcheckbox_formcell(container_UUID: string) {
		_mainView
			.findModuleClientArea()
			.findAndShowContainer(container_UUID)
			.findGrid()
			.findActiveRow()
			.getCell(app.GridCells.IS_VISIBLE)
			.wrapElements()
			.find("[type='checkbox']")
			.as('check')
			.invoke('is', ':checked')
			.then((checked) => {
				if (!checked) {
					cy.get('@check').check();
				}
			});
	}
}
