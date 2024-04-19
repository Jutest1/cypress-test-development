namespace Sidebar {
    export enum sideBarList {
        SIDEBAR_QUICKSTART = "sidebar-quickstart",
        SIDEBAR_FAVORITES = "sidebar-favorites",
        SIDEBAR_SEARCH = "sidebar-search",
        SIDEBAR_NEW_WIZARD = "sidebar-newWizard",
    };
    export enum fields {
        GOOGLE_SEARCH_INPUT = "GoogleSearchInput",
    }
    export enum icoButtons {
       SEARCH = "icons ico-search",
        
    }
    export enum SideBarOptions{
        CHANGE_BID_STATUS="Change Bid Status",
        GENERATE_LINE_ITEMS= "Generate Line Items",
        CREATE_UPDATE_BOQ_PACKAGE= "Create/Update BoQ Package",
        CHANGE_PACKAGE_STATUS= "Change Package Status",
        CREATE_REQUISITION= "Create Requisition",
        CHANGE_REQUISITION_STATUS= "Change Requisition Status",
        CREATE_REQUEST_FOR_QUOTE = "Create Request For Quote",
        CHANGE_RFQ_STATUS= "Change RfQ Status",
        CREATE_QUOTE= "Create Quote",
        CHANGE_QUOTE_STATUS= "Change Quote Status",
        CREATE_UPDATE_PES="Create / Update PES",
        CUSTOMIZING= "Customizing",
        CREATE_CONTRACT= "Create Contract",
        CHANGE_CONTRACT_STATUS= "Change Contract Status",
        CHANGE_STATUS_FOR_ITEM="Change Status For Item",
        CREATE_PES="Create PES",
        CHANGE_PES_STATUS= "Change PES Status",
        CREATE_INVOICE= "Create Invoice",
        CREATE_ONE_INVOICE_PER_PES= "Create one invoice per PES",
        REQUISITION= "Requisition",
        MATERIAL_CATALOG= "Material Catalog",
        MATERIAL= "Material",
        CURRENCY="Currency",
        BILLING="Billing",
        BILLING_SCHEMA="Billing Schema",
        CLERK="Clerk",
        COMPANY="Company",
        CONTACT="Contact",
        CONTRACT="Contract",
        CONTRACT_SALES="Contract Sales",
        PES="PES",
        CONTROLLING_UNITS="Controlling Units",
        COST_CODES="Cost Codes",
        COST_GROUPS="Cost Groups",
        ESTIMATE="Estimate",
        INVOICE="Invoice",
        MODULES="Modules",
        PACKAGE="Package",
        PAYMENT_TERM="Payment Term",
        PAYMENT_GROUPS="Payment Groups",
        QUOTE="Quote",
        RFQ="RfQ",
        WIC="WIC",
        WIP="WIP",
        UPDATE_ESTIMATE="Update Estimate",
        CREATE_CO_CONTRACT_FOR_NEW_PES_ITEM="Create CO contract for new PES item",
        CREATE_UPDATE_MATERIAL_PACKAGE="Create/Update Material Package",
        GENERATE_BUDGET_FROM_DJC= "Generate Budget from DJC",
        RECALCULATE_ASSEMBLIES="Recalculate Assemblies",
        RECALCULATE_PROJECT_ASSEMBLY="Recalculate Project Assembly",
        UPDATE_PROJECT_ASSEMBLY="Update Project Assembly",
        ASSEMBLIES="Assemblies",
        PROJECT="Project",
        COPY_BOQS="Copy BoQs",
        BID="Bid",
        PROCUREMENT_STRUCTURE="Procurement Structure",
        GENERATE_ACTIVITIES="Generate Activities",
        UPDATE_MATERIAL_PRICES="Update Material Prices",
        WORK_OPERATION_TYPES="Work Operation Types",
        CREATE_BID="Create Bid",
        CONTRACTED="Contracted",
        CREATE_WIP="Create WIP",
        DISABLE_PROJECT = "Disable Project",
        UNIT="Unit",
        GENERATE_UPDATE_BASE_COST="Generate/Update Base Cost",
        UPDATE_REVENUE="Update Revenue",
        QTO_FORMULA="QTO Formula",
        CALENDAR="Calendar",
        CREATE_PLANT_FROM_ITEM="Create Plant from Item",
        PLANT_MASTER = "Plant Master",
        TEXT_MODULES="Text Modules",
        CHARACTERISTICS="Characteristics",
        UPDATE_PROJECT_CALENDER="Update Project Calendar",
        CHANGE_PROJECT_DOCUMENTS_STATUS="Change Project Document Status",
        CHANGE_BUSINESS_PARTNER_STATUS = "Change Business Partner Status",
        PROCUREMENT_CONFIGURATION="Procurement Configuration",
        PLANT_GROUP="Plant Group",
        WO_FORMULA="WO Formula",
        REPLACE_RESOURCE="Replace Resource",
        BUSINESS_PARTNER="Business Partner",
        CREATE_PLANT="Create Plant",
        CHANGE_BILL_STATUS="Change Bill Status",
        BPA_Billed="BPA Billed",
        CREATE_BILL= "Create Bill",
        CHANGE_WIP_STATUS="Change WIP Status",
        CHANGE_PROCUREMENT_CONFIGURATION="Change Procurement Configuration",
        ENABLE_PROJECT="Enable Project",
        MODIFY_RESOURCE="Modify Resource",
        CONVERT_LINE_ITEM_INTO_ASSEMBLY="Convert LineItem into Assembly",
        UPDATE_MATERIAL_PACKAGE_S = "Update Material Package(s)",
        UPDATE_MATERIAL_PACKAGE = "Update Material Package",
        SPLIT_LINE_ITEM="Split Line Item",
        QTO="QTO",
        CREATE_UPDATE_BILL="Create/Update Bill",
        EXPORT_QTO_DOCUMENT="Export QTO document",
        MAKE_TEMPLATE_PROJECT="Make Template Project",
        CHANGE_CALENDER_TYPE ="Change Calendar Type",
        UPDATE_LINE_ITEM_QUANTITIES="Update Line Item Quantities",
        UPDATE_ACTIVITIES="Update Activities",
        ACTIVITY_GROUPS_TEMPLATES="Activity Groups Templates",
        ACTIVITY_TEMPLATES="Activity Templates",
        SPREAD_ITEM_BUDGET_TO_RESOURCES="Spread Item Budget to Resources",
        UPDATE_CONTROLLING_BUDGET="Update Controlling Budget",
        RENUMBER_BOQ="Renumber BoQ",
        CHANGE_PLANT_STATUS="Change Plant Status",
        JOB_CARD_TEMPLATES="Job Card Templates",
        SET_REPORTING_DATE= "Set Reporting Date",
        PLANT_MAINTENANCE_SCHEMES="Plant Maintenance Schemes",
        GENERATE_MAINTENANCE_RECORDS="Generate Maintenance Records",
        UPDATE_SCHEDULING_QUANTITIES="Update Scheduling Quantities",
        CHANGE_MAINTENANCE_STATUS="Change Maintenance Status",
        PACKAGE_STATUS="Package status",
        UPDATE_PROJECT_BOQ_BUDGET="Update Project BoQ Budget",
        UPDATE_ESTIMATE_BUDGET="Update Estimate Budget",
        COPY_UNIT_RATE_TO_BUDGET_PER_UNIT = "Copy Unit Rate to Budget/Unit",
        UPDATE_BOQ="Update BoQ",
        DISSOLVE_ASSEMBLY = "Dissolve Assembly",
        UPDATE_WIP_QUANTITIES = "Update WIP Quantities",
        CREATE_SCHEDULE="Create Schedule",
        CHANGES="Changes",
        CHANGE_STATUS="Change Status",
        TAKEOVER_BOQS="Takeover BoQs",
        GENERATE_PROJECT_BOQ_FROM_LI="Generate project BoQ from LI",
        WORKSPACE = "Workspace",
        GENERATE_ESTIMATE_FROM_REFERENCE_BOQ = "Generate Estimate From Reference BoQ",
        GENERATE_LINE_ITEM_FROM_WIC = "Generate Line Item From WIC",
        CREATE_UPDATE_WIP="Create / Update WIP",
        SPLIT_ACTIVITY_BY_LOCATIONS = "Split Activity by Locations",
        CREATE_RFQ = "Create RfQ",
        PLANT_PRICING = "Plant Pricing",
        UPDATE_COST_CODES_PRICES="Update Cost Codes Prices",
        PROJECT_CHANGE_STATUS="Project Change Status",
        CHANGE_COMPONENT_WARRANTY_STATUS = "Change Component Warranty Status",
        GENERAL_CONTRACTOR_CONTROLLING="General Contractor Controlling",
        CREATE_UPDATE_COST_CONTROL_STRUCTURE="Create / Update Cost Control Structure",
        CREATE_BUDGET_SHIFT="Create Budget Shift",
        CREATE_ADDITIONAL_EXPENSES="Create Additional Expense", 
        GENERATE_PAYMENT_SCHEDULE="Generate Payment Schedule",
        GENERATE_TRANSACTION_FOR_SELECTED="Generate Transaction For Selected",
        FI_BILLED="FI Billed",
        PLANT_ESTIMATION= "Plant Estimation",
        CREATE_UPDATE_PROCUREMENT_PACKAGE="Create / Update Procurement Package",
        IN_PROGRESS="In-Progress",
        CHANGE_INVOICE_STATUS="Change Invoice Status",
        GENERATE_RESOURCE_REQUISITIONS_RESOURCE_RESERVATIONS_AND_JOB_CARDS="Generate Resource Requisitions, Resource Reservations and Job Cards",
        JOB_CARDS="Job Cards",
        CHANGE_JOB_CARD_STATUS="Change Job Card Status",
        CREATE_DISPACH_NOTES="Create Dispatch Notes",
        COMPANY_TRANSFER_STATUS="Company Transheader Status",
        RECORDED="Recorded",
        TRANSACTION_TYPE="Transaction Type",
        WIP_ACCRUAL="WIP Accrual",
        ACCOUNTING_JOURNALS="Accounting Journals",
        CREATE_ACCRUALS="Create Accruals",
        SCHEDULING="Scheduling",
        DATA_RECEIVED="Date Received",
        QUOTES="Quotes",
        OVERVIEW="OVERVIEW",
        TICKET_SYSTEM="Ticket System",
        CREATE_WIC_FROM_BOQ="Create WIC from BoQ",
        UPDATE_PACKAGE_BOQ="Update Package (Boq)",
        UPDATE_PAYMENT_SCHEDULE_TARGET="Update payment schedule target",
        CHANGE_PACKAGE_CODE = "Change Package Code",
        FIND_BIDDER_CONCISE="Find Bidder Concise",
        SET_MAINTENANCE_TO_DUE="SetMaintenanceToDue",
        DISABLE_RECORD="Disable Record",
        ENABLE_RECORD="Enable Record",
        PRICE_COMPARISON= "Price Comparison",
        PRICE_CONDITION="Price Condition",
        INCREASE_QUOTE_VERSION="Increase Quote Version",
        REMOVE_PACKAGE="Remove Package",
        REPLACE_MATERIAL = "Replace Material",
        VALIDATE_AND_UPDATE_ITEM_QUANTITY="Validate and Update Item Quantity",
        INVOICE_AUDIT="Invoice audit",
        CREATE_BASELINE="Create Baseline",
        ORDERED="Ordered",
        ITEM_SCOPE_REPLACEMENT="Item Scope Replacement",
        UPDATE_ITEM_PRICE="Update Item Price",
        CHANGE_REQUISITION_CODE="Change Requisition Code",
        CHANGE_CONTRACT_CODE ="Change Contract Code",
        SET_BASE_ALTERNATIVE_ITEM_GROUP="Set Base-/Alernate Item Groups",
        ROLES="Roles",
        CHANGE_PROJECT_DOCUMENT_RUBRIC_CATEGORY="Change Project Document Rubric Category",
        DELETE_BASELINE="Delete Baseline",
        ACCEPTION="Acception",
        CREATE_CO_CONTRACT_FROM_PES_VARIANCE="Create CO contract from PES variance",
        EVALUATE_EVENTS="Evaluate Events",
        UPDATE_DATE="Update Date",
        INDEX_TABLE= "Index Table"    ,
        GENERATE_DELIVERY_SCHEDULE ="Generate Delivery Schedule",
        TAX_CODE="Tax Code",
        CRITICAL="Critical",
        RENUMBERING_ACTIVITIES ="Renumber Activities",
        UPDATE_MATERIAL="Update Material",
        CREATE_UPDATE_FREAMWORK_MATERIAL_CATALOG="Create/Update Framework Material Catalog",
        CONTRACT_TERMINATION="Contract Termination",
        CHARACTERISTIC="Characteristic",
        UPDATE_BOQ_PACKAGES="Update BoQ Package(s)",
        ENHANCED_BIDDER_SEARCH="Enhanced Bidder Search",
        GENERIC_WIZARD ="Generic Wizard",
        CREATE_UPDATE_FRAMEWORK_MATERIAL_CATLOG="Create/Update Framework Material Catalog",
        PERFORMANCE_ENTERY_SHEET="Performance Entry Sheet",
        DELIVERED="Delivered",
        CREATE_TRANSACTION="Create Transaction",
        SHIFT_MODEL="Shift Model",
        TIME_SYSBOLS="Time Symbols",
        WORKING_TIME_MODEL="Working Time Model",
        EMPLOYEE="Employee",
        TIMEKEEPING_PERIOD="Timekeeping Period",
        TIMEKEEPING = "Timekeeping",
        CREATE_PERIOD_TRANSACTIONS ="Create Period Transactions",
        APPLY_PERFORMANCE_SHEET="Apply Performance Sheet",
        UPDATE_MATERIAL_FULL_TEXT_INDEX="Update/Reset Material Full Text Index",
        TAKEOVER_GROUP_SPECIFIC_VALUE="Takeover Group Specific Values",
        UPDATE_SCHEUDLING="Update Scheduling",
        GENERATE_TIME_SHEET_RECORDS="Generate time sheet records",
        CALCULATE_OVERTIME="Calculate Overtime",
        CREATE_CONSECUTIVE_BILL_NUMBER="Create Consecutive Bill Number",
        UPDATE_VERSION_BOQ="Update Version BoQ",
        CREATE_INITIAL_ALLOCATION_FOR_PLANTS="Create Initial Allocation for Plants",
        LOGISTIC_JOB="Logistic Job",
        LOGISTIC_PRICE_CONDITION="Logistic Price Condition",
        DISPATCHING_NOTES="Dispatching Notes",
        GENERATE_CONTROLLING_UNITS="Generate Controlling Units",
        CHANGE_CONTROLLING_UNIT_STATUS="Change Controlling Unit Status",
        CONTROLLING_UNIT_TEMPLATES="Controlling Unit Templates",
        GENERATE_CONTROLLING_UNITS_FROM_TEMPLET="Generate Controlling Units From Template",
        SETTLEMENT="Settlement",
        REMOVED_RULES_FROM_ESTIMATE = "Remove Rules from Estimates",
        CONTROLLING_COST_CODES="Controlling Cost Codes",
        EXPORT_TO_ENTERPRISE_CONTROLLING_BIS="Export to Enterprise Controlling BIS",
        PROJECT_CONTROLS="Project Controls",
        ACTUALS="Actuals",
        CREATE_CONTROLLING_UNIT_TEMPATE ="Create Controlling Unit Template",
        CONTROLLING_UNIT_TEMPATE="Controlling Unit Templates",
        UPDATE_CONTROLLING_COST_CODES="Update Controlling Cost Codes",
        UPDATE_WQ_AND_AQ_QUANTITIES_TO_BOQ="Update WQ and AQ quantities to BoQ",
        RENUMBER_QTO_LINES="Renumber QTO Lines",
        BACKWARD_CALCULATION="Backward Calculation"
       
    }
}
export default Sidebar;