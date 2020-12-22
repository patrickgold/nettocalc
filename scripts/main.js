function byID(id){
    return document.getElementById(id)
}


window.onload = function() {
   var uiIn = {
       // Input from UI
       bruttoTypeHourly: byID("i__brutto_type_hourly"),
       hourlyRate: byID("i__hourly_Rate"),
       hours: byID("i__hours"),
       overtimeHours: byID("i__overtime_hours"),
       bruttoTypeGiven: byID("i__brutto_type_given"),
       brutto: byID("i__brutto"),
       hasUnion: byID("i__has_union"),
       unionRate: byID("i__union_rate"),
       hasEcard: byID("i__has_ecard"),
       ecard: byID("i__ecard"),
       hasAllowance: byID("i__has_allowance"),
       allowance: byID("i__allowance"),
       hasCommuter: byID("i__has_commuter"),
       hasCommuterSmall: byID("i__has_commutersmall"),
       hasCommuterLarge: byID("i__has_commuterlarge"),
       commuterKm: byID("i_commuterkm"),
       children: byID("i_children"),
       hasChildren: byID("i__has_children"),

       // Vacation
       hasVacationPay: byID("i__has_vacation_pay"),
       vacationPay: byID("i__vacationpay"),

       // Bonuses
       hasChristmasBonus: byID("i__has_christmas_bonus"),
       christmasBonus: byID("i__christmas_bonus"),

       // Overtime Inputs
       hours: byID("i__hours"),
       hourlyRate: byID("i__hourly_rate"),
       overtimeHours: byID("i__overtime_hours"),
       bruttoTypeHourly: byID("i__brutto_type_hourly"),
       hasOvertime: byID("i__has_overtime"),
       overtimeDivider: byID("i__overtime_divider"),

       // Calcutae Button
       calculateBtn: byID("calculate_btn"),
   }
   
   var uiOut = {
       // Outputs for UI
       bruttoAB: byID("o__brutto_ab"),
       svDna: byID("o__sv_dna"),
       unionDues: byID("o__union_dues"),
       ecard: byID("o__ecard"),
       allowance: byID("o__allowance"),
       commutingAllowance: byID("o__commuting_allowance"),
       assessmentBasis: byID("o__assessment_basis"),
       incomeTaxRate: byID("o__income_tax_rate"),
       incomeTaxBeforeAVAB: byID("o__income_tax_before_avab"),
       avab: byID("o__avab"),
       incomeTax: byID("o__income_tax"),
       commuterEuro: byID("o__commuter_euro"),
       IncomeTaxAfterCommuterEuro: byID("o__income_tax_after_commuter_euro"),

       NcBruttoAB: byID("o__nc_brutto"),
       NcSvDna: byID("o__nc_sv_dna"),
       NcUnionDues: byID("o__nc_union_dues"),
       NcEcard: byID("o__nc_ecard"),
       NcIncomeTax: byID("o__nc_income_tax"),
       NcNetto: byID("o__nc_netto"),

       // Overtime Output
       OcOvertimeHourlyLoan: byID("o__oc_overtime_hourly_loan"),
       OcOvertimeAddition: byID("o__oc_overtime_addition"),
       OcOvertimeFirst10: byID("o__oc_overtime_first_10"),
       OcOvertimeOther: byID("o__oc_overtime_other"),
       OcOvertimeTotal: byID("o__oc_overtime_total"),
       OcBruttoAB: byID("o__oc_brutto_ab"),
       OcOvertimeLoan: byID("o__oc_overtime_loan"),
       OcSvDna: byID("o__oc_sv_dna"),
       OcIncomeTax10h: byID("o__oc_income_tax_10h"),
       OcAssassmentBasis: byID("o__oc_assessment_basis"),
       OcIncomeTaxRate: byID("o__oc_income_tax_rate"),
       OcIncomeTaxBeforeAvab: byID("o__oc_income_tax_before_avab"),
       OcAvab: byID("o__oc_avab"),
       OcIncomeTaxAfterAvab: byID("o__oc_income_tax_after_avab"),
       BruttoAb2: byID("o__brutto_ab_2"),
       OcOvertimeLoan2: byID("o__oc_overtime_loan_2"),
       OcSvDna2: byID("o__oc_sv_dna_2"),
       OcIncomeTax: byID("o__oc_income_tax"),
       OcNetto: byID("o__oc_netto"),
       OcOvertimeBaseLoan: this.byID("o__oc_overtime_base_loan"),

       /**
        * Sets the value of the html element with the given id the given value with a format specified by the given type
        * @param {String} id The id of the html element
        * @param {Number} value the value wich should be printed
        * @param {String} type Wich format type should be applied to the value
        */
        print: function (id,value,type){
            var formatter = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
            });
            var printString;
            if(type == "number"){
                //printString = value.toString().replace(/^(?!0\.00)\d{1,3}(,\d{3})*(\.\d\d)?$/);
                printString = formatter.format(value).slice(0,-2); //slice cuts off " €" at the end
                if(printString.slice(-2) == "00"){
                    printString = printString.slice(0,-2) + "-\x00\xa0"; //If there is no cent amount its printing ",- " instead of ",00"
                }
            }
            else if(type == "percent"){
                printString = value + "%";
            }
            this[id].innerHTML = printString;  
        },
        /**
         * Sets all Outputs to 0
         */
        resetOutput: function(){
            
        }
   }

   var comutingAlowanceTable = {
       small: [
           [0,    0],
           [20,  58], // over 20km to 40km
           [40, 113], // over 40km to 60km
           [60, 168]  // over 60km
        ],
        big: [
            [0,    0],
            [2,   31], // over 2km to 20km
            [20, 123], // over 20km to 40km
            [40, 214], // over 40km to 50km
            [60, 306]  // over 60
        ],
    }

   var incomeTaxTable = {
       tax: [
           // 1-5 Children
           //Income,  %,   AVAB,         1,       2,       3,       4,       5
           [       0,  0,       0,       0,       0,       0,       0,       0],
           [ 1066.00, 25,  266.50,  307.67,  322.25,  340.58,  358.92,  377.25],
           [ 1516.00, 35,  418.00,  459.27,  473.85,  492.18,  510.52,  528.85],
           [ 2599.34, 42,  600.05,  641.22,  655.80,  674.14,  692.48,  710.81],
           [ 5016.00, 48,  901.01,  942.18,  956.76,  975.10,  993.43, 1011.77],
           [ 7516.00, 50, 1051.33, 1092.50, 1107.08, 1125.42, 1143.76, 1162.09],
           [83349.33, 55, 5218.80, 5259.97, 5274.55, 5292.88, 5311.22, 5329.55]
       ],
   }
   
   var overtime = new Overtime(uiIn,uiOut);
   var calc = new Calculation(uiIn,uiOut,comutingAlowanceTable,incomeTaxTable,overtime);
}