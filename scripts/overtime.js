class Overtime {
    constructor(uiIn, uiOut, ITT) {
        this.overtimeIncome;
        this.input = uiIn;
        this.output = uiOut;
        this.ITT = ITT;
        this.clcOvertime();
    }

    clcOvertime() {
        var overtime40 = 0
        var addition = 0
        var tmp = 0
        var Ot10h = 0
        var Otothers = 0
        var overtimeTotal = 0
        if (this.input.bruttoTypeHourly.checked == true) {
            var hours = parseInt(this.input.hours.value) + parseInt(this.input.overtimeHours.value)
            if (this.input.hasOvertime.checked == true) {
                // Overtime hourly loan
                this.output.print("OcOvertimeHourlyLoan", this.input.hourlyRate.value, "number")

                // Overtime base loan
                if (hours > 40) {
                    tmp = hours - 40
                    overtime40 = tmp * this.input.hourlyRate.value
                    this.output.print("OcOvertimeBaseLoan", overtime40, "number")

                    // Overtime addition
                    addition = parseInt(this.input.hourlyRate.value) * 0.5
                    this.output.print("OcOvertimeAddition", addition, "number")

                    // Overtime money 10h & others
                    if (tmp > 10) {
                        var tmp10 = 10
                        var tmpO = 0
                        tmpO = tmp - tmp10
                        Ot10h = tmp10 * addition
                        Otothers = tmpO * addition
                        this.output.print("OcOvertimeFirst10", Ot10h, "number")
                        this.output.print("OcOvertimeOther", Otothers, "number")

                    } else {
                        Ot10h = addition * tmp
                        Otothers = 0
                        this.output.print("OcOvertimeFirst10", Ot10h, "number")
                        this.output.print("OcOvertimeOther", Otothers, "number")
                    }
                    overtimeTotal = overtime40 + Ot10h + Otothers
                    this.output.print("OcOvertimeTotal", overtimeTotal, "number")

                    // Bruttos
                    var Ot_brutto = this.input.hourlyRate.value * this.input.hours.value * 4
                    this.output.print("OcBruttoAB", Ot_brutto, "number")
                    this.output.print("OcOvertimeLoan", overtimeTotal, "number")
                    var Ot_svdna_brutto = (overtimeTotal + Ot_brutto) * 0.1812
                    this.output.print("OcSvDna", Ot_svdna_brutto, "number")
                    this.output.print("OcIncomeTax10h", Ot10h, "number")
                    var lst_bmgl_brutto = Ot_brutto + overtimeTotal - Ot_svdna_brutto - Ot10h
                    this.output.print("OcAssassmentBasis", lst_bmgl_brutto, "number")

                    // Lohnsteuer
                    var tax = this.clcMTR(lst_bmgl_brutto)
                    this.output.print("OcIncomeTaxRate", tax.rate, "percent")
                    var calc_taxBeforeAvab = (lst_bmgl_brutto * tax.rate) / 100
                    this.output.print("OcIncomeTaxBeforeAvab", calc_taxBeforeAvab, "number")
                    this.output.print("OcAvab", tax.sea, "number")
                    var Ot_brutto_ab2 = calc_taxBeforeAvab - tax.sea
                    this.output.print("OcIncomeTaxAfterAvab", Ot_brutto_ab2, "number")

                    // End Calc
                    this.output.print("BruttoAb2", Ot_brutto, "number")
                    this.output.print("OcOvertimeLoan2", overtimeTotal, "number")
                    this.output.print("OcSvDna2", Ot_svdna_brutto, "number")
                    this.output.print("OcIncomeTax", Ot_brutto_ab2, "number")
                    var Ot_netto = Ot_brutto + overtimeTotal - Ot_svdna_brutto - Ot_brutto_ab2
                    this.output.print("OcNetto", Ot_netto, "number")
                }
            }
            else {
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
        if (this.input.bruttoTypeGiven.checked == true) {
            var hours = parseInt(this.input.overtimeHours.value)
            if (this.input.hasOvertime.checked == true) {
                // Overtime hourly loan
                var hourlyLoan = this.input.overtimeDivider.value != 0 ? this.input.brutto.value / this.input.overtimeDivider.value : this.input.brutto.value / 158
                this.output.print("OcOvertimeHourlyLoan", hourlyLoan, "number")

                // Overtime base loan
                overtime40 = hours * hourlyLoan
                this.output.print("OcOvertimeBaseLoan", overtime40, "number")

                // Overtime addition
                addition = hourlyLoan * 0.5
                this.output.print("OcOvertimeAddition", addition, "number")

                // Overtime money 10h & others
                if (hours > 10) {
                    var tmp10 = 10
                    var tmpO = 0
                    tmpO = hours - tmp10
                    Ot10h = tmp10 * addition
                    Otothers = tmpO * addition
                    this.output.print("OcOvertimeFirst10", Ot10h, "number")
                    this.output.print("OcOvertimeOther", Otothers, "number")

                } else {
                    Ot10h = addition * hours
                    Otothers = 0
                    this.output.print("OcOvertimeFirst10", Ot10h, "number")
                    this.output.print("OcOvertimeOther", Otothers, "number")
                }
                overtimeTotal = overtime40 + Ot10h + Otothers
                this.output.print("OcOvertimeTotal", overtimeTotal, "number")

                // Bruttos
                var Ot_brutto = this.input.brutto.value * 1
                this.output.print("OcBruttoAB", Ot_brutto, "number")
                this.output.print("OcOvertimeLoan", overtimeTotal, "number")
                var Ot_svdna_brutto = (Ot_brutto + overtimeTotal) * 0.1812
                this.output.print("OcSvDna", Ot_svdna_brutto, "number")
                this.output.print("OcIncomeTax10h", Ot10h, "number")
                var lst_bmgl_brutto = Ot_brutto + overtimeTotal - Ot_svdna_brutto - Ot10h
                this.output.print("OcAssassmentBasis", lst_bmgl_brutto, "number")

                // Lohnsteuer
                var tax = this.clcMTR(lst_bmgl_brutto)
                this.output.print("OcIncomeTaxRate", tax.rate, "percent")
                var calc_taxBeforeAvab = (lst_bmgl_brutto * tax.rate) / 100
                this.output.print("OcIncomeTaxBeforeAvab", calc_taxBeforeAvab, "number")
                this.output.print("OcAvab", tax.sea, "number")
                var Ot_brutto_ab2 = calc_taxBeforeAvab - tax.sea
                this.output.print("OcIncomeTaxAfterAvab", Ot_brutto_ab2, "number")

                // End Calc
                this.output.print("BruttoAb2", Ot_brutto, "number")
                this.output.print("OcOvertimeLoan2", overtimeTotal, "number")
                this.output.print("OcSvDna2", Ot_svdna_brutto, "number")
                this.output.print("OcIncomeTax", Ot_brutto_ab2, "number")
                var Ot_netto = Ot_brutto + overtimeTotal - Ot_svdna_brutto - Ot_brutto_ab2
                this.output.print("OcNetto", Ot_netto, "number")
            }
            else {
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
    }

    clcMTR(AB) {
        var i = -1;
        for (var j = 0; j < 7; j++) {
            if (this.ITT.tax[j][0] <= AB) {
                i++
            }
        }
        var rate = this.ITT.tax[i][1]
        var seaColumn = parseInt((this.input.children.value != "" ? this.input.children.value : "0")) + 2;
        var sea = this.ITT.tax[i][seaColumn]
        var return_obj = { rate: rate, sea: sea }
        return return_obj
    }
}