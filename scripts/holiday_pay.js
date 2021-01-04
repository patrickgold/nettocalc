class Holiday{
    constructor(christmas,vecation,amount,allowance){
        this.christmas_bonus = christmas == true ? (amount - allowance) : 0;
        this.vecation_pay = vecation == true ? (amount-allowance) : 0;
    };

    clcHolidayPay(){
        /*
        * Urlaubsgeld
        * - Gew
        * - PendlerPauschal
        * - E-Card
        * __________________
        * LST-BMGL
        * %         Money
        * - AVAB
        * - P€
        */
       if(this.input.hasVacationPay.checked == true){
           var hol_brutto = this.input.vacationPay.value * 1
           
       }
    }
}