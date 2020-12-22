class Overtime{
    constructor(uiIn,uiOut){
        this.overtimeIncome;
        this.input = uiIn;
        this.output = uiOut;
        this.clcOvertime();
    }
    /*example(){
        //this.input.brutto.value
        //this.input.hasECard.checked
        //variable = bedingung ? code wenn bedingung stimmt : code wenn bedingung nicht stimmt
        //variable = otRest(ff) < 10 ? ss(2) : ss(3)
    }*/

    clcOvertime() {
        /*
        this.output.print("OcOvertimeHourlyLoan", 0, "number")
        this.output.print("OcOvertimeBaseLoan", 0, "number")
        this.output.print("OcOvertimeAddition", 0, "number")
        this.output.print("OcOvertimeFirst10", 0, "number")
        this.output.print("OcOvertimeOther", 0, "number")
        this.output.print("OcOvertimeTotal", 0, "number")

        this.output.print("OcBruttoAB", 0, "number")
        this.output.print("OcOvertimeLoan", 0, "number")
        this.output.print("OcSvDna", 0, "number")
        this.output.print("OcIncomeTax10h", 0, "number")
        // --------
        this.output.print("OcAssassmentBasis", 0, "number") // LST-BMGL
        this.output.print("OcIncomeTaxRate", 0, "percent")
        this.output.print("OcIncomeTaxBeforeAvab", 0, "number")
        this.output.print("OcAvab", 0, "number")
        this.output.print("OcIncomeTaxAfterAvab", 0, "number")
        // --------
        this.output.print("BruttoAb2", 0, "number")
        this.output.print("OcOvertimeLoan2", 0, "number")
        this.output.print("OcSvDna2", 0, "number")
        this.output.print("OcIncomeTax", 0, "number")
        this.output.print("OcNetto", 0, "number")
        */

        if(this.input.bruttoTypeHourly.checked == true){
            var overtime40 = 0
            var hours = parseInt(this.input.hours.value) + parseInt(this.input.overtimeHours.value)
            var addition = 0
            var tmp = 0
            var Ot10h = 0
            var Otothers = 0
            var overtimeTotal = 0

            if(this.input.hasOvertime.checked == true){
                // Overtime hourly loan
                this.output.print("OcOvertimeHourlyLoan", this.input.hourlyRate.value, "number")

                // Overtime base loan
                if(hours > 40) {
                    tmp = hours - 40
                    overtime40 = tmp * this.input.hourlyRate.value
                    this.output.print("OcOvertimeBaseLoan", overtime40, "number")

                    // Overtime addition
                    addition = parseInt(this.input.hourlyRate.value) * 0.5
                    this.output.print("OcOvertimeAddition", addition, "number")

                    // Overtime money 10h & others
                    if(tmp > 10) {
                        var tmp10 = 10
                        var tmpO = 0
                        tmpO = tmp - tmp10
                        Ot10h = tmp10 * addition
                        Otothers = tmpO * addition
                        this.output.print("OcOvertimeFirst10", Ot10h, "number")
                        this.output.print("OcOvertimeOther", Otothers, "number")
                        
                    }else {
                        Ot10h = addition * tmp
                        Otothers = 0
                        this.output.print("OcOvertimeFirst10", Ot10h, "number")
                        this.output.print("OcOvertimeOther", Otothers, "number")
                    }
                    overtimeTotal = overtime40 + Ot10h + Otothers
                    this.output.print("OcOvertimeTotal", overtimeTotal, "number")
                    
                    // Bruttos
                    var brutto = this.input.hourlyRate.value * this.input.hours.value
                    this.output.print("OcBruttoAB", brutto, "number")
                    this.output.print("OcOvertimeLoan", overtimeTotal, "number")
                    var svdna_brutto = overtimeTotal * 0.1812
                    this.output.print("OcSvDna", svdna_brutto, "number")
                    this.output.print("OcIncomeTax10h", Ot10h, "number")
                    var lst_bmgl_brutto = brutto + overtimeTotal - svdna_brutto - Ot10h
                    this.output.print("OcAssassmentBasis", lst_bmgl_brutto, "number")

                    // Lohnsteuer
                }
            }
            else{
                this.output.print("OcOvertimeHourlyLoan", 0, "number")
                this.output.print("OcOvertimeBaseLoan", 0, "number")
                this.output.print("OcOvertimeAddition", 0, "number")
                this.output.print("OcOvertimeFirst10", 0, "number")
                this.output.print("OcOvertimeOther", 0, "number")
                this.output.print("OcOvertimeTotal", 0, "number")
                this.output.print("OcBruttoAB", 0, "number")
                this.output.print("OcOvertimeLoan", 0, "number")
                this.output.print("OcSvDna", 0, "number")
                this.output.print("OcIncomeTax10h", 0, "number")
                this.output.print("OcAssassmentBasis", 0, "number")

                this.output.print("OcIncomeTaxRate", 0, "percent")
                this.output.print("OcIncomeTaxBeforeAvab", 0, "number")
                this.output.print("OcAvab", 0, "number")
                this.output.print("OcIncomeTaxAfterAvab", 0, "number")
                this.output.print("BruttoAb2", 0, "number")
                this.output.print("OcOvertimeLoan2", 0, "number")
                this.output.print("OcSvDna2", 0, "number")
                this.output.print("OcIncomeTax", 0, "number")
                this.output.print("OcNetto", 0, "number")
            }
        }
        if(this.input.bruttoTypeGiven.checked == true) {
            
        }
    }

    /*
    * print -> this.output.print("<idName>", <variable>, "<number; percent>")
    */

    /*
    * ÜGL
    * GHL
    * ÜZ(%)
    * 
    * +GHL (BaseLoane)
    * +10 Üz
    * +Rest
    * _________________
    * ÜG
    * 
    * Brutto
    * +Ü
    * -SV-DNA
    * -10 Lst für ÜZ
    * ______________
    * LST-BMGL
    *  %
    * - Abzug
    * ______________
    * LST
    * 
    * Brutto
    * +Ü
    * -SV-DNA
    * -LST
    * _______________
    * Netto
    */
}