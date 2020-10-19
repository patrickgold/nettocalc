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
<<<<<<< HEAD
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
=======
        if(this.input.bruttoTypeHourly.checked == true){
            var Ot10H = 0
            var OtOthers = 0
            var hours = 0
            var brutto = 0
            var UeZ = 0
            var rest = 0
            var divSum = 0
            var Sum = 0

            if(this.input.hasOvertime.checked == true){
                brutto = this.input.hourlyRate.value * this.input.hours.value
                hours = this.input.hours.value + this.input.overtimeHours.value
                divSum = this.input.overtimeDivider.value == 0 ? brutto/158 : brutto/this.input.overtimeDivider.value
                UeZ = brutto * 0.5
                if(hours > 40){
                    rest = hours - 40
                    if(rest > 10) {
                        Ot10H = 10 * UeZ
                        OtOthers = (rest - 10) * UeZ
                    }
                    else {
                        Ot10H = rest * UeZ
                        OtOthers = 0
                    }
                    Sum = brutto + OtOthers + Ot10H
                }
                else{
                    Sum = brutto
                }
                this.output.OcOvertimeTotal.innerHTML = Sum
                console.log(Sum)
            }
        }
        if(this.input.bruttoTypeGiven.checked == true) {
            /*
            this.output.Overtime10h.innerHTML =  0
            this.output.OvertimeOther.innerHTML = 0
            this.output.overtimeTotal.innerHTML = 0
            */
>>>>>>> origin/backend
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