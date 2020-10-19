class Holiday{
    constructor(christmas,vecation,amount,allowance){
        this.christmas_bonus = christmas == true ? (amount - allowance) : 0;
        this.vecation_pay = vecation == true ? (amount-allowance) : 0;
    };
}