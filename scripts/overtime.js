class Overtime{
    constructor(uiIn,uiOut){
        this.overtimeIncome;
        this.input = uiIn;
        this.output = uiOut;
    }
    /*example(){
        //this.input.brutto.value
        //this.input.hasECard.checked
        //variable = bedingung ? code wenn bedingung stimmt : code wenn bedingung nicht stimmt
        //variable = otRest(ff) < 10 ? ss(2) : ss(3)
    }*/

    clcOvertime() {
        var brutto = this.input.brutto.value
        this.input.hours.value
        this.input.overtimeHours.value
        this.input.overtimeDevider.value
        
        var OvertimeHourlyLoan = brutto / this.input.overtimeDevider.value
        this.output.overtimeHourlyLoan.value = OvertimeHourlyLoan
        var OcHoursValue = this.input.hours.value * OvertimeHourlyLoan
        this.output.overtimeBaseLoan.value = HoursValue
        var OcAddition = OvertimeHourlyLoan * 0.5
        if(this.overtimeHours.value > 40) {
            OtRest = this.overtimeHours.value - 40
            if(OcRest > 10) {
                var OtOthersR = OcRest - 10
                var Ot10h =  10 * OcAddition
                var OtR = OtOthersR * OcAddition
                this.output.OvertimeOther.innerHTML = OtR
                this.output.Overtime10h.value = Ot10H
            }
            if(OcRest < 10) {
                var Ot10h =  OcRest * OcAddition
                var OtR = 0 
                this.output.OvertimeOther.innerHTML = OtR
                this.output.Overtime10h.value = Ot10H
            }
            this.output.overtimeTotal.innerHTML = OcHoursValue + Ot10h + OtR
        }
        else {
            this.output.Overtime10h.innerHTML =  0
            this.output.OvertimeOther.innerHTML = 0
            this.output.overtimeTotal.innerHTML = 0
        }
    }


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