


class Calculation{
    constructor(uiIn,uiOut,comutingAlowanceTable,incomeTaxTable){
        this.input = uiIn;
        this.output = uiOut;
        this.CAT = comutingAlowanceTable;
        this.ITT = incomeTaxTable;
        //calculater button event listener
    }
    clcNetIncome(){
        var socialInjurance = this.clcSocialInjurance(false);
        var IncomeTax = this.clcIncomeTax(socialInjurance);
    }
    clcIncomeTax(socialInjurance){
        var assesmentBasis = clcAssesmentBasis(socialInjurance);
        var incomeTaxRateSED = clcIncometaxRate(); //SED...sole-earner deduction
        var commuterEuro = this.input.commuterKm.value / 6; // 2*commuterKm.value/12
    }
    clcAssesmentBasis(socialInjurance){
        var unionDues = this.input.hasUnion.checked == true ? (this.brutto * this.input.unionDues > 33.80 ? 33.80 : this.brutto * this.input.unionDues) : 0; //Maximum dues is 33.80€
        this.output.unionDues = unionDues;
        var eCard = this.input.eCard == true ? 12.30 : 0; //12.30€
        this.output.eCard = eCard;
        var allowanceAmount = this.input.allowance == true ? this.input.allowanceAmount : 0;
        this.output.allowanceAmount = allowanceAmount;
        var commutingAllowance = this.input.commutingAllowance == true ? clcComutingAllowance() : 0;
        this.output.commutingAllowance = commutingAllowance;
        var assesmentBasis = this.input.brutto - socialInjurance - unionDues - eCard - allowanceAmount - commutingAllowance;
        this.output.assesmentBasis = assesmentBasis;
        return assesmentBasis;
    }
    /**
     * 
     * @param {Boolean} holiday_bonus If its calculating the stantard social injurence or the reduced one for christams/vecation pay 
     */
    clcSocialInjurance(holiday_bonus){
        if(holiday_bonus){
            return this.input.holiday_pay * 0.1712; //17.12%
        }
        else{
            return this.input.brutto > 5370 ? 5370 * 0.1812 : this.input.brutto * 0.1812; //18.12% with a maximumof 5370€
        }
    }
    clcComutingAllowance(){
        //50,"big" sended -> return -money for big PP
        if (this.input.bigorsmall == "big") {
            var bi= 0;
            for (var i = 0; i < this.CAT.big.length; i++) {
                if (this.CAT.big[i][0] >= this.input.commuterKm.value) {
                   bi++
                }
            }
            return this.CAT.big[0][bi];
        }
        if (this.input.bigorsmall == "small") {
            var si= 0;
            for (var i = 0; i < this.CAT.small.length; i++) {
                if (this.CAT.small[i][0] >= this.input.commuterKm.valuem) {
                    si++
                 }
             }
             return this.CAT.small[0][si]
         }
     } 
    // return % and AVAB (when Children return AVAB for Children)
           getMTR(AB, Kids) {
            var i = 0;
            for (var i = 0; i < Tax.length; i++) {
                if(tax[i][0] >= AB){
                    i++
                }
            }
    
            var ret = {
                percent: tax[i][1],
                AVAB: tax[i][2+Kids]
            };
            return ret
        }
}

