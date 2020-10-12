


class Calculation{
    constructor(uiIn,uiOut){
        this.input = uiIn;
        this.output = uiOut;

        calculateNetIncome();
    }
    calculateNetIncome(){
        var socialInjurance = this.calculateSocialInjurance(false);
        var IncomeTax = this.calculateIncomeTax(socialInjurance);
    }
    calculateIncomeTax(socialInjurance){
        var assesmentBasis = calculateAssesmentBasis(socialInjurance);
    }
    calculateAssesmentBasis(socialInjurance){
        var unionDues = this.input.workersUnion == true ? (this.brutto * this.input.unionDues > 33.80 ? 33.80 : this.brutto * this.input.unionDues) : 0;
        this.output.unionDues = unionDues;
        var eCard = this.input.eCard == true ? 12.30 : 0;
        this.output.eCard = eCard;
        this.output.allowenceAmount = this.input.allowence == true ? this.input.allowenceAmount : 0;
       
    }
    /**
     * 
     * @param {Boolean} holiday_bonus If its calculating the stantard social injurence or the reduced one for christams/vecation pay 
     */
    calculateSocialInjurance(holiday_bonus){
        if(holiday_bonus){
            return this.input.holiday_pay * 0.1712;
        }
        else{
            return this.input.brutto > 5370 ? 5370 * 0.1812 : this.input.brutto * 0.1812;
        }
    }
    calculateComutingAllowence(){
        if(this.input.comutingAllowence){
            if(this.input.comutingAllowenceBig){

            }
            else if(this.input.comutingAllowenceSmall){

            }
            else{
                return 0;
            }
        }
        else{
            return 0;
        }
    }
}

