class Holiday {
    constructor(uiIn, uiOut, ITT) {
        this.input = uiIn;
        this.output = uiOut;
        this.ITT = ITT;
        this.clcHolidayPay();
    };

    clcHolidayPay() {
        if (this.input.hasVacationPay.checked == true) {
            var Vp_Brutto1 = this.input.vacationPay.value * 1
            var Vp_SvDna1 = Vp_Brutto1 * 0.1712
            if (this.input.hasAllowance.checked == true) {
                var Vp_Allowance = this.input.allowance.value * 1
            } else {
                var Vp_Allowance = 0;
            }
            var Vp_AssessmentBasis = Vp_Brutto1 - Vp_SvDna1 - Vp_Allowance
            var Vp_IncomeTaxRate = 6
            var Vp_IncomeTax = (Vp_AssessmentBasis * Vp_IncomeTaxRate) / 100
            var Vp_Netto = Vp_Brutto1 - Vp_SvDna1 - Vp_IncomeTax

            this.output.print("VpBrutto1", Vp_Brutto1, "number");
            this.output.print("VpSvDna1", Vp_SvDna1, "number");
            this.output.print("VpAllowance", Vp_Allowance, "number");
            this.output.print("VpAssassmentBasis", Vp_AssessmentBasis, "number");
            this.output.print("VpIncomeTaxRate", Vp_IncomeTaxRate, "percent");
            this.output.print("VpIncomeTax1", Vp_IncomeTax, "number");
            this.output.print("VpBrutto2", Vp_Brutto1, "number");
            this.output.print("VpSVDNA2", Vp_SvDna1, "number");
            this.output.print("VpIncomeTax2", Vp_IncomeTax, "number");
            this.output.print("VpNetto", Vp_Netto, "number");
        }
        if (this.input.hasVacationPay.checked == false) {
            this.output.print("VpBrutto1", 0, "number");
            this.output.print("VpSvDna1", 0, "number");
            this.output.print("VpAllowance", 0, "number");
            this.output.print("VpAssassmentBasis", 0, "number");
            this.output.print("VpIncomeTaxRate", 0, "percent");
            this.output.print("VpIncomeTax1", 0, "number");
            this.output.print("VpBrutto2", 0, "number");
            this.output.print("VpSVDNA2", 0, "number");
            this.output.print("VpIncomeTax2", 0, "number");
            this.output.print("VpNetto", 0, "number");
        }
        if (this.input.hasChristmasBonus.checked == true) {
            if (this.input.hasVacationPay.checked == true) {
                var sum = this.input.christmasBonus.value * 1 + this.input.vacationPay.value * 1
                var toMuch = sum > 10740 ? sum - 10740 : 0
                var Cb_Allowance = 0;
            } else {
                var toMuch = 0;
                if (this.input.hasAllowance.checked == true) {
                    var Cb_Allowance = this.input.allowance.value * 1
                } else {
                    var Cb_Allowance = 0;
                }
            }
            var Cb_Brutto1 = this.input.christmasBonus.value * 1
            var Cb_SvDna1 = (Vp_Brutto1 - toMuch) * 0.1712
            var Cb_AssessmentBasis = Cb_Brutto1 - Cb_SvDna1 - Cb_Allowance
            var Cb_IncomeTaxRate = 6
            var Cb_IncomeTax = (Cb_AssessmentBasis * Cb_IncomeTaxRate) / 100
            var Cb_Netto = Cb_Brutto1 - Cb_SvDna1 - Cb_IncomeTax

            this.output.print("CbBrutto1", Cb_Brutto1, "number");
            this.output.print("CbSvDna1", Cb_SvDna1, "number");
            this.output.print("CbAllowance", Cb_Allowance, "number");
            this.output.print("CbAssassmentBasis", Cb_AssessmentBasis, "number");
            this.output.print("CbIncomeTaxRate", Cb_IncomeTaxRate, "percent");
            this.output.print("CbIncomeTax1", Cb_IncomeTax, "number");
            this.output.print("CbBrutto2", Cb_Brutto1, "number");
            this.output.print("CbSVDNA2", Cb_SvDna1, "number");
            this.output.print("CbIncomeTax2", Cb_IncomeTax, "number");
            this.output.print("CbNetto", Cb_Netto, "number");

        }
        if (this.input.hasChristmasBonus.checked == false) {
            this.output.print("CbBrutto1", 0, "number");
            this.output.print("CbSvDna1", 0, "number");
            this.output.print("CbAllowance", 0, "number");
            this.output.print("CbAssassmentBasis", 0, "number");
            this.output.print("CbIncomeTaxRate", 0, "percent");
            this.output.print("CbIncomeTax1", 0, "number");
            this.output.print("CbBrutto2", 0, "number");
            this.output.print("CbSVDNA2", 0, "number");
            this.output.print("CbIncomeTax2", 0, "number");
            this.output.print("CbNetto", 0, "number");
        }
    }
}