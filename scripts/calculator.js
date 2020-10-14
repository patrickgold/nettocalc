class Calculation{
    constructor(uiIn,uiOut,comutingAlowanceTable,incomeTaxTable,overtime){
        this.input = uiIn;
        this.output = uiOut;
        this.CAT = comutingAlowanceTable;
        this.ITT = incomeTaxTable;
        this.OT = overtime;
        this.overtime = new Overtime(uiIn,uiOut);
        var that = this;
        this.templELclcButton = function(){that.clcNetIncome()};
        var tmp = document.getElementById("clc_btn");
        if(tmp != null){
            tmp.addEventListener("click",that.templELnoFocus);
        }
    }
    clcNetIncome(){
        if(this.input.bruttoType == "given"){
            var socialInjurance = this.clcSocialInjurance();
            var IncomeTax = this.clcIncomeTax(socialInjurance);
            var netto = this.input.brutto.value - socialInjurance - incomeTax - this.output.eCard.value - this.output.unionDues.value;
        }

    }
    clcIncomeTax(socialInjurance){
        var assesmentBasis = clcAssesmentBasis(socialInjurance);
        var incomeTax = clcMTR(assesmentBasis);
        var commuterEuro = this.input.commuterKm.value / 6; // 2*commuterKm.value/12
        var incomeTaxACE = incomeTax - commuterEuro; //ACE...after commuter euro
        return incomeTaxACE;
    }
    clcAssesmentBasis(socialInjurance){
        var unionDues = this.input.hasUnion.checked == true ? (this.input.brutto.value * this.input.unionRate.value > 33.80 ? 33.80 : this.input.brutto.value * this.input.unionRate.value) : 0; //Maximum dues is 33.80€
        this.output.unionDues = unionDues;
        var eCard = this.input.hasEcard.checked == true ? this.input.ecard.value : 0; //12.30€
        this.output.eCard = eCard;
        var allowanceAmount = this.input.hasAllowance.checked == true ? this.input.allowance.value : 0;
        this.output.allowanceAmount = allowanceAmount;
        var commutingAllowance = this.input.hasCommuter.value == true ? clcComutingAllowance() : 0;
        this.output.commutingAllowance = commutingAllowance;
        var assesmentBasis = this.input.brutto.value - socialInjurance - unionDues - eCard - allowanceAmount - commutingAllowance;
        this.output.assesmentBasis = assesmentBasis;
        return assesmentBasis;
    }
    
    clcSocialInjurance(){
        return this.input.brutto.value > 5370 ? 5370 * 0.1812 : this.input.brutto.value * 0.1812; //18.12% with a maximumof 5370€
    }
    /**
     * Calculates the comuting allowance
     */
    clcComutingAllowance(){
        //50,"big" sended -> return -money for big PP
        if (this.input.hasCommuterLarge.checked == true) {
            var bi= 0;
            for (var i = 0; i < this.CAT.big.length; i++) {
                if (this.CAT.big[i][0] >= this.input.commuterKm.value) {
                   bi++
                }
            }
            return this.CAT.big[0][bi];
        }
        if (this.input.hasCommuterSmall.checked == true) {
            var si= 0;
            for (var i = 0; i < this.CAT.small.length; i++) {
                if (this.CAT.small[i][0] >= this.input.commuterKm.valuem) {
                    si++
                 }
             }
             return this.CAT.small[0][si]
         }
    }
    /**
     * Gets assesment base and returns the income tax 
     * @param {integer} AB assesment base for the tax rate
     */ 
    clcMTR(AB) {
        var i = 0;
        for (var i = 0; i < this.input.ITT.tax.length; i++) {
            if(this.input.ITT.tax[i][0] >= AB){
                i++
            }
        }
    
        
        var rate = this.input.ITT.tax[i][1]
        var sea = this.input.ITT.tax[i][2+this.input.children.value]
        //set rate and sea to output
        var incomeTax = rate * AB - sea;
        return incomeTax;
    }
}

