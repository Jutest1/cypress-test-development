import { MainView, Sidebar, MainModalView } from "./app/app";
import { CommonPage } from "./common/common-page";
import { LoginPage } from "./login/login-page";
import { Validations } from "./common/validation-page";
import { ControllingUnit } from "./module/controlling/controlling-page";
import { EstimatePage } from "./module/estimate/estimate/estimate-page";
import { Package } from "./module/procurement-and-bpm/package/package-page";
import { RfqPage } from "./module/procurement-and-bpm/rfq/rfq-page";
import { ProjectPage } from "./module/project-and-catalog/project-page";
import {SalesPage} from "./module/sales/sales/sales-page";
import { AssembliesPage } from "./module/estimate/estimate/assemblies-page";
import { SchedulePage } from "./module/schedulling/schedule-page";
import { BoQPage } from "./module/estimate/boq/boq-page";
import { ContractPage } from "./module/sales/contract/contractSales-page";

import { SalesConfigurationPage } from "./module/sales/sales/salesConfiguration-page";
import { WICPages } from "./module/estimate/wic/wic-page";
import { ProcurementConfigurationPage } from "./module/procurement-and-bpm/procurement/procurementConfiguration-page";
import { ProcurementPage } from "./module/procurement-and-bpm/procurement/procurement-page";
import { MaterialPages } from "./module/procurement-and-bpm/material/material-page";
import { ProcurementContractPage } from "./module/procurement-and-bpm/contract/procurement-contract-page";

import { TicketSystemPage } from "./module/procurement-and-bpm/ticket/ticket-system-page";
import { BidPage } from "./module/sales/Bid/bid_page";
import { WipPage } from "./module/sales/Wip/wip_page";
import { BillPage } from "./module/sales/Bill/bill-page";
import { BusinessPartnerPage } from "./module/procurement-and-bpm/business_partner/business-partner-page";
import { LogesticPage } from "./module/logestic-and-resource-management/logestic-page";
import { TimekeepingPage } from "./module/timekeeping/timekeeping-page";

import { wizardCreateRequest } from "./module/procurement-and-bpm/contract/wizard-create-request";
import { copyMainEntryToDocumentProject} from "./module/procurement-and-bpm/procurement/copyMainEntiryToDocumentProject-pages";
import { headerAmountCalculate} from "./module/procurement-and-bpm/invoice/headerAmountCalculate-pages";
import { NoChangeContracts } from "./module/procurement-and-bpm/contract/No-Change-Contracts-page";
import {billingSchemaCalculate} from "./module/procurement-and-bpm/invoice/billingSchemaCalculate-pages";
import  {QTOPage}  from "./module/qto/qto-page";


export const _common = new CommonPage();
export const _validate = new Validations();
export const _mainView = new MainView();
export const _sidebar = new Sidebar();
export const _modalView = new MainModalView();

// Modules
export const _rfqPage = new RfqPage();
export const _loginPage = new LoginPage();
export const _estimatePage = new EstimatePage();
export const _projectPage = new ProjectPage();
export const _salesPage=new SalesPage;
export const _package = new Package()
export const _controllingUnit = new ControllingUnit()
export const _assembliesPage = new AssembliesPage()
export const _bidPage = new BidPage();
export const _schedulePage = new SchedulePage();
export const _boqPage =new BoQPage();
export const _saleContractPage = new ContractPage();
export const _wipPage=new WipPage();
export const _billPage =new BillPage();
export const _salesConfigurationPage = new SalesConfigurationPage();
export const _wicpage = new WICPages();
export const _procurementConfig = new ProcurementConfigurationPage();
export const _procurementPage = new ProcurementPage();
export const _materialPage = new MaterialPages();
export const _procurementContractPage = new ProcurementContractPage();
export const _ticketSystemPage = new TicketSystemPage();
export const _businessPartnerPage = new BusinessPartnerPage();
export const _logesticPage = new LogesticPage();
export const _timekeepingPage = new TimekeepingPage();
export const _wizardCreateRequest = new wizardCreateRequest()
export const _copyMainEntryToDocumentProject =new copyMainEntryToDocumentProject();
export const _headerAmountCalculate =new headerAmountCalculate();
export const _NoChangeContracts = new NoChangeContracts()
//QTO module
export const _qtoPage = new QTOPage();
export const _billingSchemaCalculate =new billingSchemaCalculate();