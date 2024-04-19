import Bluebird from 'cypress/types/bluebird';
import { _common } from 'cypress/pages';
import { app, btn } from '../../locators';

export class MainView {
	element: string = '';
	gridColumnNames = {};

	findModuleClientArea(): this {
		this.element = '#mainContent ';
		return this; // it returns module client area.
	}
	wrapElements = (): Cypress.Chainable<any> => cy.get(this.element);

	findAndShowContainer(uuid: string, containerPosition?: number): this {
		console.log('inside if before ==>', this.element);
		this.element = `[class*='cid_${uuid}'] `;
		cy.wrap(getAllGroupContainers()).then((groupArray: Array<string>) => {
			if (groupArray.includes(uuid)) {
				const element = this.element;
				console.log('inside if after ==>', element);
			} else {
				const element = this.element;
				// cy.get('#tabbar', { timeout: 10000 }).should(()=>{
					
				// })
				cy.wait(8000) //! This wait is required for container uuid to load
				addNewGroupContainer(uuid, containerPosition);
				
			}
		});
		console.log('before return ==>', this.element);
		return this;
	}

	findAndShowSubContainer_InContainer(uuid: string, containerPosition?: number): this {
		console.log('inside if before ==>', this.element);
		this.element = `[id='${uuid}'] `;
		cy.wrap(getAllGroupContainers()).then((groupArray: Array<string>) => {
			if (groupArray.includes(uuid)) {
				const element = this.element;
				console.log('inside if after ==>', element);
			} else {
				const element = this.element;
				cy.wait(8000);
				addNewGroupContainer(uuid, containerPosition);
			}
		});
		console.log('before return ==>', this.element);
		return this;
	}

	toolbar(toolbar: string): this {
		this.element = this.element.concat(`[class*='${toolbar}'] `);
		return this;
	}

	findButtonIndex(buttonClass: string, index?: any): this {
		this.element = this.element.concat(`[class*='${buttonClass}'] `);
		return this;
	}
	findButton(buttonClass: string): this {
		this.element = this.element.concat(`[class*='${buttonClass}'] `);
		return this;
	}
	findButtonWithTitle(buttonTitle: string): this {
		this.element = this.element.concat(`[title*='${buttonTitle}'] `);
		return this;
	}

	findTile(tileName: string): this {
		this.element = this.element.concat(`[class^='tile ${tileName}'] `);
		
		return this;
	}

	tabBar(): this {
		this.element = this.element.concat('#main-tabs ');
		return this;
	}

	findTab(tabid: string): this {
		this.element = this.element.concat(`#${tabid} `);
		return this;
	}

	findGrid(): this {
		this.element = this.element.concat("[class*='grid-container'] ");
		return this;
	}

	findGridById(container_UUID:string): this {
		this.element = this.element.concat(`[class*='grid-container'][id='${container_UUID}']`);
		return this;
	}

	ctrl_alt_f() {
		cy.get(this.element).trigger('keydown', { keyCode: 70, ctrlKey: true, altKey: true }).trigger('keyup', { keyCode: 70, ctrlKey: true, altKey: true });
	}
	slickContainer(): this {
		this.element = this.element.concat("[class*='slick-container'] ");
		return this;
	}

	findGridCanvas(position: string): this {
		this.element = this.element.concat(`[class*='grid-canvas-top grid-canvas-${position}'] `);
		return this;
	}
	selectAllContainerData() {
		this.element = this.element.concat(`[class*='slick-header-column indicator'] `);
		cy.wait(1000) // wait to resolve promise;
		cy.get(this.element).first().click({ force: true });
		return this;
	}

	slickRow() {
		this.element = this.element.concat(`[class*='slick-row'] `);
		const slickRow = cy.get(this.element);
		this.element = '';
		return slickRow;
	}

	findActiveRow(): this {
		this.element = this.element.concat("[class*='active'] ");
		return this;
	}

	/*
	 * @method is used to find the cell within a container
	 * @param cellClass - enter cell 'class' locator
	 * @param recordTyep? - its a optional paramer if it is using to find the cell in header container then pass 'header' to this parameter otherwise
	 * left blank.
	 */
	findCell(cellClass: string, recordType?: string): this {
		if (recordType) {
			cy.wait(500);
			this.element = this.element.concat(`[class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${cellClass}'] `);
			cy.get(this.element).click({ multiple: true, force: true });
		} else {
			cy.wait(500);
			this.element = this.element.concat(`div.${app.SubContainerLayout.COLUMN_ID}_${cellClass} `);
			cy.get(this.element).click({ multiple: true, force: true });
		}
		return this;
	}

	findMultipleCell(cellClass: string, recordType?: string): this {
		if (recordType) {
			cy.wait(500);
			this.element = this.element.concat(`[class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${cellClass}'] `);
			cy.get(this.element).click({ multiple: true, force: true });
		} else {
			cy.wait(500);
			this.element = this.element.concat(`div.${app.SubContainerLayout.COLUMN_ID}_${cellClass} `);
			cy.get(this.element).click({ctrlKey : true, multiple: true, force: true });
		}
		return this;
	}

	getCell(cellClass: string, recordType?: string): this {
		if (recordType) {
			cy.wait(500);
			this.element = this.element.concat(`[class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${cellClass}'] `);
		} else {
			cy.wait(500);
			this.element = this.element.concat(`div.${app.SubContainerLayout.COLUMN_ID}_${cellClass} `);
		}
		return this;
	}

	/** USE NEW METHOD TO SELECT COLUMN_ID HAVING ICON */
	findCell_ByIcon(iconClass: string, index: number): this {
		this.element = this.element.concat(`i.${iconClass} `);
		cy.get(this.element).eq(index).click({ multiple: true });
		return this;
	}

	configure_containerColumn(container_UUID: string, requriedColumn: { [key: string]: any }) {
		var requiredColumns = requriedColumn;
		var actualColumns: string[] = [];
		cy.get(`[class*='${container_UUID}'] [class*='slick-header-columns'] [class*='slick-header-column']`)
		  .each((column) => {
			cy.wrap(column)
			  .invoke("attr", "id")
			  .then((name) => {
				actualColumns.push(name.replace(/slickgrid_\d+/g, ""));
			  });
		  })
		  .then(() => {
			const columnsToAdd = Object.keys(requiredColumns).filter((key) => !actualColumns.includes(key));
			if (columnsToAdd.length > 0) {
			  cy.get(`[class*='${container_UUID}'] button[title='Maximize']`).click();
			  cy.wait(1000)
			  cy.get(`[class*='${container_UUID}'] button[class$='ico-settings']`).click();
			  cy.wait(1000)
			  cy.get("body").then(($body) => {
				if ($body.find(`[class*='popup-menu'] button[title='Grid Layout']`).length > 0) {
				  cy.wait(500)
				  cy.get(`[class*='popup-menu'] button[title='Grid Layout']`).click();
				}
			  });
	
			  columnsToAdd.forEach((column) => {
				cy.get("div[data='availableGridData'] input[placeholder='Search Term']").clear().type(requiredColumns[column]);
				  // ! This piece of code will handle columns which we have to rearrange manually in json because of its invisibility (BETA) 
				  cy.wait(500)
				  cy.get("body").then(($body) => {
					if ($body.find(`[data='availableGridData'] [class$='active']`).length <= 0) {
					  cy.wait(500)
					  cy.get(`button[data-ng-click*="fromStartToTarget('total', 'availableGridId'"]`).click();
					  cy.get(`[data='availableGridData'] [class$='item-id_${column}']`).click({ controlKey: true });
					}
				  });
				cy.get(`[data='availableGridData'] [class$='active']`).first().click({ controlKey: true });
				cy.get(`[data='availableGridData'] [class$='item-id_${column}']`).click({ controlKey: true });
				cy.get(`button[data-ng-click*="fromStartToTarget('part', 'availableGridId'"]`).click();
			  });
			  cy.contains("button", "OK").click();
			  cy.get(`[class*='${container_UUID}'] [class*='ico-minimized2']`).click();
			}
		  });
	}

  containerFooter(footerClass: string): this {
    this.element = this.element.concat(`[class*='${footerClass}'] `);
    return this;
  }
	goToButton() {
		this.element = this.element.concat(`[class*='icons ico-goto'] `);
		cy.get(this.element).click({ force: true });
	}

	goToWorkspace() {
		cy.get("[title='Workspace']").click({ force: true });
	}

	findInputLookup(lookUpClass: string, index: number): this {
		this.element = this.element.concat(`[class*='${lookUpClass}'] `);
		cy.get(this.element).eq(index).click({ force: true });
		this.element = '';
		return this;
	}

	findIconTreeCollapse(): this {
		this.element = this.element.concat(`.ico-tree-collapse `);
		cy.get(this.element).click();
		return this;
	}
	findCellhasValue(cellClass: string, value, recordType?: string): Cypress.Chainable<any> {
		let cell;
		if (recordType) {
			cy.wait(1000) // wait to resolve promise;
			this.element = this.element.concat(`[class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${cellClass}'] `);
			cell = cy.get(this.element).contains(value, { matchCase: false });
		} else {
			cy.wait(1000) // wait to resolve promise;
			this.element = this.element.concat(`div.${app.SubContainerLayout.COLUMN_ID}_${cellClass} `);
			cell = cy.get(this.element).contains(value, { matchCase: false });
		}
		this.element = '';
		return cell;
	}

	findTextInput(inputTextClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat(`input[class^='${inputTextClass}'] `);
		const textField = cy.get(this.element);
		this.element = '';
		return textField;
	}

	filterTextInput(inputTextClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat(`[class*='slick-headerrow-columns'] [class*='item-field_${inputTextClass}'] `);
		const textField = cy.get(this.element).click().find('input').clear({ force: true });
		this.element = '';
		return textField;
	}

	containerGroups(): this {
		this.element = this.element.concat('.subview-tabs ');
		
		return this;
	}

	selectTabInSubContainerView(containerTitle: string): void {
		cy.get(this.element).then(($tabView) => {
			if ($tabView.find('.subview-tabs').length > 0) {
				const tab = $tabView.find(`button[title='${containerTitle}'] `);

				if (tab.length > 0) {
					cy.wrap(tab).click({ force: true });
				} else {
					cy.log(`${containerTitle.toUpperCase()} CONTAINER IS ALREADY OPENED`);
				}
			} else {
				cy.log('FOOTER IS NOT PRESENT');
			}
		});
		this.element = '';
	}
	containsValue(value: string): Cypress.Chainable<any> {
		const hasValue = cy.get(this.element).contains(value, { matchCase: true });
		this.element = '';
		return hasValue;
	}

	assertClass(assertionClass: string = 'active'): Cypress.Chainable<boolean> {
		const hasClass = cy.get(this.element).then((ele) => ele.hasClass(assertionClass));
		this.element = '';
		return hasClass;
	}

	keyAction(action: string) {
		cy.wait(1000) // wait to resolve promise;
		const event = cy.get(this.element).type(action, { force: true });
		return event;
	}

	clickIn() {
		cy.get(this.element).first().click({ multiple: true });
		this.element = '';
	}
	typeIn(type: string) {
		cy.get(this.element).type(type);
		this.element = '';
	}

	select_popupItem(popUpType: string, value: string) {
		cy.wait(1000);
		cy.get(".popup-container").within(() => {
		  switch (popUpType) {
			case "list".toLowerCase():
			  cy.contains("li",value).click({ force: true });
			  break;
			case "grid":
			  //cy.contains("div", value).click({force: true });
			  cy.get("div.popup-content").within(() => {
				cy.wait(1000)
				cy.get(`div[class*='column-id']`).each(($cell) => {
				  const cellField: string = $cell.text();
				  if (value === cellField) {
					cy.wait(1000);
					cy.wrap($cell).click({ force: true });
					cy.wait(2000);
					return false;
				  }
				});
			  });
			  break;
			case "div":
			//if div doesn't contains'column-id' class then use this
			  cy.contains("div", value).click({force: true });  
			  break;
			case "grid1".toLowerCase():
			  cy.contains("button", value).click({ force: true });
			  break;
			case "span".toLowerCase():
			  cy.contains("span", value).click({ force: true });
			  break;
			case "listexact".toLowerCase():
				cy.contains("li", new RegExp("^" + value + "$", "g")).click({ force: true });
				break;
			default:
			  cy.log("Search type not supported");
		  }
		});
	  }

	caret(): this {
		this.element = this.element.concat('.caret');
		cy.get(this.element).click({ force: true });
		return this;
	}

	inputField_deleteButton(index: number): this {
		this.element = `[class*='${btn.IconButtons.ICO_INPUT_DELETE}'] `;
		cy.get(this.element).eq(index).click({ force: true });
		return this;
	}

	dragAndDrop(source: any, target: any): any {
		cy.get(source).then((src) => {
			console.log(src);
			cy.get(target).then((tgt) => {
				cy.wrap(src).trigger('pointerdown', { force: true }).trigger('mousedown', { which: 1, force: true }).trigger('dragstart', { force: true });
				cy.wrap(tgt).trigger('mousemove', { force: true }).trigger('pointermove', { force: true }).trigger('mouseup', { which: 1, force: true });
			});
		});
	}

	findInputInContainerByLabel(uuid: string, labelName: string): Cypress.Chainable<any> {
		this.element = `[class*='cid_${uuid}'] [class*='platform-form-row '] `;
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[class*="input-group-content"]`).eq(0).should('be.visible');
			});
		this.element = '';
		return div;
	}

	getTextFromContainerFormByLabel(uuid: string, labelName: string) {
		this.element = `[class*='cid_${uuid}'] [class*='platform-form-row '] `;
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele)
					.find(`[class*="input-group-content"]`)
					.eq(0)
					.invoke('val')
					.then(function (codeVal: string) {
						const supplierNoValue = codeVal;
						cy.log(supplierNoValue);
						Cypress.env('getTextInContainerForm', supplierNoValue);
					});
			});
	}

	findCaretByLabel(labelName: string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`.caret`).eq(0).should('be.visible').click({force:true});
			});
		this.element = '';
		return div;
	}

	findCaretByClass(inputclass: string, index: number): Cypress.Chainable<any> {
		this.element = this.element.concat(`[class^='platform-form-row'] [class*='${inputclass}'] `);
		const div = cy.get(this.element).then((ele) => {
			cy.wrap(ele).find(`.caret`).eq(index).should('be.visible').click();
		});
		this.element = '';
		return div;
	}

	findCheckBox_byLabel(labelName: string, inputClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[type^='${inputClass}']`).eq(0).should('be.visible');
			});
		this.element = '';
		return div;
	}

	findDeleteButtonByLabel(labelName: string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`.ico-input-delete`).click();
			});
		this.element = '';
		return div;
	}

	findTextAreaInModal(textClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat(`textarea[class^='${textClass}'] `);
		cy.wait(1000);
		const textField = cy.get(this.element);
		this.element = "";
		return textField;
	  }
}

export class Sidebar extends MainView {
	element!: string;

	findSidebar(): this {
		this.element = '#commandBar ';
		return this;
	}

	sidebarIndicator(sideBarClass: string): this {
		this.element = this.element.concat(`[class*='${sideBarClass}'] `);
		return this;
	}

	searchBySidebar(searchType: string, searchValue: string): Cypress.Chainable<any> {
		let foundEle;
		switch (searchType) {
			case 'quickstart':
				foundEle = cy.get('#sidebar-quickstart').find('#searchmodule').clear({ force: true }).type(searchValue);
				cy.wait(500);
				cy.get('div.quickstart-items').within(() => {
					cy.get(`[class*='e2e-quickstart-btn']`).each(($row) => {
						const module_name: string = $row.text().trim();
						cy.log('Module Name ==> ', module_name);
						cy.log('Module Compare ==> ', module_name === searchValue);
						if (module_name === searchValue) {
							cy.wait(1000);
							cy.wrap($row).click({ force: true });
							return false;
						}
					});
				});
				break;
			case 'standard'.toLowerCase():
				foundEle = cy.get('#sidebar-search').find('#GoogleSearchInput').clear().type(searchValue);
				cy.get('.input-group-btn button.ico-search').click();
				break;
			case 'wizard'.toLowerCase():
				foundEle = cy.get('#sidebar-newWizard').find('#searchmodule').clear().type(searchValue);
				cy.get("#sidebar-newWizard [class*='ico-tree-expand-all']").click({
					force: true,
				});
				cy.get('#sidebar-newWizard').within(() => {
					cy.get(`[class="rw-content"] [class="title"]`).each(($row) => {
						const module_name: string = $row.text().trim();
						cy.log('Module Name ==> ', module_name);
						cy.log('Module Compare ==> ', module_name === searchValue);
						if (module_name === searchValue) {
							cy.wait(500);
							cy.wrap($row).click({ force: true });
							return false;
						}
					});
				});
				break;
			default:
				console.log('Search type not supported');
		}
		this.element = '';
		return foundEle;
	}

	delete_pinnedItem(): this {
		cy.get(`#${app.Layouts.MAIN_CONTAINER} [class='sidebar ng-scope expanded'] #sidebar-search .projectContextInfo`)
		  .then(($ele) => {
			cy.wait(2000);
			if ($ele.find('cloud-desktop-filter-pinned-context').children().length) {
				cy.wrap($ele).find("[class*='nodelete header-delete']")
				  .first()
				  .click();
			}
		  });
		return this;
	}

	findButton(buttonClass: string): this {
		return super.findButton(buttonClass);
	}

	clickIn() {
		super.clickIn();
	}

	typeIn(type) {
		super.typeIn(type);
	}

	searchmodule(): this {
		this.element = this.element.concat('#sidebar-quickstart #searchmodule');
		
		return this;
	}
}

export class MainModalView extends MainView {
	element!: string;

	findCell(cellClass: string, recordType?: string): this {
		if (recordType) {
			cy.wait(500);
			this.element = this.element.concat(`[class*='${app.SubContainerLayout.COLUMN_ID}_${recordType}.${cellClass}'] `);
			cy.get(this.element).click({ multiple: true, force: true });
		} else {
			cy.wait(500);
			this.element = this.element.concat(`div.${app.SubContainerLayout.COLUMN_ID}_${cellClass} `);
			cy.get(this.element).click({ multiple: true, force: true });
		}
		return this;
	}

	findModal(): this {
		this.element = "[class*='modal-dialog'] ";
		return this;
	}
	findPopup(): this {
		this.element = "[class*='popup-container'] ";
		return this;
	}
	findStucture(): this {
		this.element = "[class*='ico-folder-doc'] ";
		return this;
	}
	findStuctureActive(): this {
		this.element = "[class*='fix-row active'] [class*='item-field_IsMarked'] ";
		cy.get(this.element).eq(1).should('be.visible');
		return this;
	}

	findModalBody(): this {
		this.element = "[class*='modal-content'] ";
		
		return this;
	}

	findInputFieldInsideModal(labelName: string, inputClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class*='platform-form-row'] ");
		cy.wait(500);
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[class*='${inputClass}']`).eq(0).should('be.visible');
			});
		this.element = '';
		return div;
	}

	
	findInputFieldInsideModalClickIron(labelName: string, inputClass: string, labelClass?:string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		cy.wait(500);
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[class^='${inputClass}']`).eq(0).should('be.visible');
				if(labelClass){
					cy.wrap(ele).find(`[class*="${labelClass}"]`).first().click({force:true});
			     }

			});
		this.element = '';
		return div;
	}

	findInsideModal(labelName: string, inputClass?: string, labelClass?:string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		cy.wait(500);
		const div = cy.get(this.element).contains(this.element, labelName);
		this.element = '';
		return div;
	}

	findCaretInsideModal(labelName: string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class*='platform-form-row'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`.caret`).first().should('exist').click({force:true});
			});
		this.element = '';
		return div;
	}

	findCheckBox_byLabel(labelName: string, inputClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[type^='${inputClass}']`).eq(0).should('be.visible');
			});
		this.element = '';
		return div;
	}

	findRadio_byLabel_Col(labelName: string, inputClass: string, index: number): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-col'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[type^='${inputClass}']`).eq(index).should('be.visible').click();
			});
		this.element = '';
		return div;
	}

	acceptButton(buttonLabel: string): this {
		this.element = this.element.concat("[class*='modal-footer'] ");
		cy.get(this.element).contains('button', buttonLabel).click({force:true});
		this.element = '';
		return this;
	}

	label(labelName: string): this {
		this.element = this.element.concat('label ');
		const label = cy.get(this.element).contains(this.element, labelName);
		return this;
	}

	checkBox_hasLabel(labelName: string): Cypress.Chainable<any> {
		const checkBox = cy
			.get(this.element)
			.contains('label', labelName)
			.should('be.visible')
			.then((ele) => {
				cy.wrap(ele).find('[type="checkbox"]').should('be.visible').eq(0);
			});
		this.element = '';
		return checkBox;
	}

	checkbox_inCell(cellClass: string) {
		const checkBox = cy.get(this.element.concat(`[class*='${cellClass}'] `)).then((ele) => {
			cy.wait(1000) // wait to resolve promise;
			cy.wrap(ele).find('[type="checkbox"]').eq(0);
		});
		this.element = '';
		return checkBox;
	}

	findCheckbox_inCell(cellClass: string) {
		const checkBox = cy.get(`[class*='${cellClass}'] `).then((ele) => {
			cy.wait(1000) // wait to resolve promise;
			cy.wrap(ele).find('[type="checkbox"]').eq(0);
		});
		this.element = '';
		return checkBox;
	}

	clickIn() {
		super.clickIn();
	}

	findCellhasValue(cellClass: string, value: any): Cypress.Chainable<any> {
		return super.findCellhasValue(cellClass, value);
	}

	searchInModal(searchFieldClass: string, modalLabel: string, searchData: string) {
		cy.contains('.modal-content', modalLabel).within(() => {
			cy.get(`[class*='${searchFieldClass}']`).as('searchInput');
			cy.get('@searchInput').clear({force:true}).wait(1000).type(searchData,{force:true});
		});
	}
	searchInModal_byDataNG_Selector(modalLabel: string, searchData: string) {
		cy.contains('.modal-content', modalLabel).within(() => {
			cy.get(`input[data-ng-model="searchValue"]`).first().as('searchInput');
			cy.get('@searchInput').clear().wait(1000).type(searchData);
		});
	}
	findRadio_byLabel(labelName: string, inputClass: string, index: number): Cypress.Chainable<any> {
		this.element = this.element.concat("[class^='platform-form-row'] ");
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[type^='${inputClass}']`).eq(index).should('be.visible').click();
			});
		this.element = '';
		return div;
	}

	findCheckbox_byLabelnModal(RowinputClass: string, labelName: string, index: number): Cypress.Chainable<any> {
		this.element = this.element.concat(`[class*='modal-content'] [class*='${RowinputClass}'] `);
		const div = cy
			.get(this.element)
			.contains(this.element, labelName)
			.then((ele) => {
				cy.wrap(ele).find(`[type^='checkbox']`).eq(index).click();
			});
		this.element = '';
		cy.wait(1000) // wait to resolve promise;
		return div;
	}

	findRadio_byLabel_InModal(labelName: string, inputClass: string, index: number, radioClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat(`[class^='${radioClass}'] `);
		const div = cy.get(this.element)
					  .contains(this.element, labelName)
					  .then((ele) => {
						cy.wrap(ele)
						  .find(`[type^='${inputClass}']`)
						  .eq(index)
						  .click({force:true});
					  });
		this.element = '';
		return div;
	}

	searchOption(): this {
		this.element = this.element.concat("[title*='Search'] ");
		
		return this;
	}

	findTextAreaInModal(textClass: string): Cypress.Chainable<any> {
		this.element = this.element.concat(`textarea[class^='${textClass}'] `);
		cy.wait(1000) // wait to resolve promise;
		const textField = cy.get(this.element);
		this.element = '';
		return textField;
	}
	getTextFrom_ModalInput(actualValue:string,index:number) {
		this.element = `[class*='modal-dialog'] [class='platform-form-row'] `;
		const div = cy
		  .get(this.element)
		  .then((ele) => {
			cy.wrap(ele)
			  .find(`[class*="input-group-content"]`)
			  .eq(index)
			  .invoke("val")
			  .then(function (codeVal: string) {
				const expectedValue = codeVal;
				cy.log(expectedValue);
				Cypress.env("getTextInModalInput", expectedValue);
				expect(expectedValue).to.equals(actualValue)
			  });
		  });
	  }

	
}

export const addNewGroupContainer = (groupContainerId: string, containerPosition?: number): Bluebird<boolean> => {
	return new Cypress.Promise((resolve, reject) => {
		// Click on selected toolbar option tab
		cy.get('#tabbar', { timeout: 3000 }).within((li) => {
			cy.wrap(li).get('li[class*="active"] button.ico-menu').click();
		});
		// Click on edit view menu
		cy.get("[class*='popup-content flex-box']", { timeout: 3000 }).contains('Edit View').click();
		// Select the last pane and open it's last drop-down option
		cy.get('#editorSplitter', { timeout: 3000 }).then(($editor) => {
			cy.wait(4000);
			console.log('Deliver Position==>', $editor.find('div.input-group div.domain-type-select div.ng-empty').length);

			if (containerPosition <= $editor.find('div.input-group div.domain-type-select div.ng-empty').length) {
				console.log('Accept Position==>', containerPosition);
				cy.wrap($editor).get('div.input-group div.domain-type-select div.ng-empty').eq(containerPosition).click();
			} else {
				cy.wrap($editor).get('div.input-group div.domain-type-select div.ng-empty').last().click();
			}
		});
		// .modal-dialog [class*='filler-absolute'] [class*='input-group domain-type-select'] div.ng-empty
		// For opened drop-down
		cy.get('.dropdown-container ', { timeout: 3000 }).then((options) => {
			cy.wrap(options).get(`[class*='e2e-combo-box-item-${groupContainerId}']`).click();
		});
		// Submit layout manager
		cy.get('button').contains('OK').click();
		// Update the group container array
		const arr: Array<string> = Cypress.env('groupContainerArray');
		arr.push(groupContainerId);
		Cypress.env('groupContainerArray', arr);
		// Verify is new container added or not, else throw error
		cy.get('#splitter .subview-container').should('have.class', `cid_${groupContainerId}`);
		resolve();
	});
};
/**
 * Get all group containers array and returns it
 * @returns
 */
export const getAllGroupContainers = (): Promise<any> => {
	return new Cypress.Promise((resolve, reject) => {
		const groupArray = [];
		cy.get('.subview-container')
			.each(($subView: any) => {
				cy.wrap($subView)
					.invoke('attr', 'class')
					.then((classList) => {
						const ids = classList
							.split(' ')
							.filter((e: string) => e.includes('cid'))
							.map((e: string) => e.split('_')[1]);
						groupArray.push(...ids);
					});
			})
			.then(() => {
				Cypress.env('groupContainerArray', groupArray);
				resolve(groupArray);
			});
	});
};

// ! ONLY to be used if we need to change/edit grid view and add new group container
export const manageViewAndGroup = (layoutType: string, paneView: string, groupContainerName: string, retry?: number) => {
	cy.wait(8000);
	if (!Cypress.env('groupContainerArray').includes(groupContainerName)) {
		for (let i = 0; i < Cypress.env('groupContainerArray').length; i++) {
			addGroupContainer(i, groupContainerName, layoutType, paneView, retry);
		}
	} else {
		cy.log(`Group container alredy exits - ID: ${groupContainerName}`);
		console.log(`Group container alredy Exits - ID: ${groupContainerName}`);
	}
};

//! ONLY use to add group container to the selected layout and it's pane, using above method
const addGroupContainer = (i: any, groupContainerName: string, layoutType: string, paneView: string, retry?: number) => {
	// if (this.groupContainerArray[i].trim() !== groupContainerName && i === this.groupContainerArray.length - 1) {
	// Click on selected toolbar option tab
	cy.get('#tabbar', { timeout: 3000 }).within((li) => {
		cy.wrap(li).get('li[class*="active"] button.ico-menu').click();
	});
	// Click on edit view menu
	cy.get("[class*='popup-content flex-box']", { timeout: 3000 }).contains('Edit View').click();
	// Select view type from left menu
	cy.get("[class*='showimages layout-bar']").within(() => {
		cy.get(`.${layoutType}`).first().click();
	});
	// Select the pane and open it's last drop-down options
	cy.get(`#editorSplitter #${paneView}`, { timeout: 3000 }).within((pane: any) => {
		cy.wrap(pane).get('.as-sortable-item-handle', { timeout: 3000 }).last().click();
	});
	// For opened drop-down
	cy.get('.dropdown-container ', { timeout: 3000 }).then((options) => {
		cy.wrap(options).get(`[class*='e2e-combo-box-item-${groupContainerName}']`).click();
	});
	// Submit layout manager
	cy.get('button').contains('OK').click();
	cy.wait(2000);
	retry = retry + 1;
	// Verify if group container is added
	cy.get(`#splitter #${paneView} .subview-container`).should('have.class', `cid_${groupContainerName}`);
	// } else if (this.groupContainerArray[i].trim() === groupContainerName) {
	//   return false;
	// }
};
