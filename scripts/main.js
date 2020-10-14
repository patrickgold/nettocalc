function byID(id){
    return document.getElementById(id)
}


window.onload = function() {
   var uiIn = {
       // Input from UI
       bruttoType: byID("i__brutto_type_hourly"),
       hourlyRate: byID("i__hourly_Rate"),
       hours: byId("i__hours"),
       overtimeHours: byID("i__overtime_hours"),
       bruttoType: byID("i__brutto_type_given"),
       brutto: byId("i__brutto"),
       hasUnio: byID("i__has_union"),
       unionRate: byId("i__union_rate"),
       hasEcard: byID("i__has_ecard"),
       ecard: byID("i__ecard"),
       hasAllowance: byID("i__has_allowance"),
       allowance: byID("i__allowance"),
       hasCommuter: byID("i__has_commuter"),
       hasCommuterSmall: byID("i__has_commutersmall"),
       hasCommuterLarge: byID("i__has_commuterlarge"),
       commuterKm: byID("i_commuterkm"),
       children: byID("i_children"),
       hasVacationPay: byID("i__has_vacation_pay"),
       vacationPay: byId("i__vacationpay"),
       hasChristmasBonus: byID("i__has_christmas_bonus"),
       christmasBonus: byID("i__christmas_bonus"),
   }
   
   var uiOut = {
       // Schould set Variables and print Data at UI
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
       IncomeAfterCommuterEuro: byID("o__income_tax_after_commuter_euro"),
   }

   var comutingAlowanceTable = {
       small: [
           [20, 58],  // over 20km to 40km
           [40, 113], // over 40km to 60km
           [60, 168]  // over 60km
        ],
        big: [
            [2, 31],   // over 2km to 20km
            [20, 123], // over 20km to 40km
            [40, 214], // over 40km to 50km
            [60, 306]  // over 60
        ],
    }

   var incomeTaxTable = {
       tax: [
           // 1-5 Children
           //Income,  %,   AVAB,         1,       2,       3,       4,       5 
           [ 1066.00, 25,  266.50,  307.67,  322.25,  340.58,  358.92,  377.25],
           [ 1516.00, 35,  418.00,  459.27,  473.85,  492.18,  510.52,  528.85],
           [ 2599.34, 42,  600.05,  641.22,  655.80,  674.14,  692.48,  710.81],
           [ 5016.00, 48,  901.01,  942.18,  956.76,  975.10,  993.43, 1011.77],
           [ 7516.00, 50, 1051.33, 1092.50, 1107.08, 1125.42, 1143.76, 1162.09],
           [83349.33, 55, 5218.80, 5259.97, 5274.55, 5292.88, 5311.22, 5329.55]
       ],

   }
   
   var calc = new Calculation(uiIn,uiOut,comutingAlowenceTable,incomeTaxTable,overtime);


}