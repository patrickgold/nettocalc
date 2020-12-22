class Calculation{
    constructor(uiIn,uiOut,comutingAlowanceTable,incomeTaxTable,overtime){
        this.input = uiIn;
        this.output = uiOut;
        this.CAT = comutingAlowanceTable;
        this.ITT = incomeTaxTable;
        this.OT = overtime;
        var that = this;
        this.templELclcButton = function(){that.clcNetIncome()};
        var tmp = document.getElementById("calculate_btn");
        if(tmp != null){
            tmp.addEventListener("click",that.templELclcButton);
        }
    }
    checkInputs(){
        var inputs = Object.getOwnPropertyNames(this.input);
        for(var i = 0; i < inputs.length; i++){
            if(this.input[inputs[i]].type == "number"){
                if(this.input[inputs[i]].validity.valid == false || this.input[inputs[i]].value < 0){
                    return false
                }
            }
        }
        return true
    }
    clcNetIncome(){
        if(this.checkInputs()){
            this.overtime = this.input.hasOvertime.checked == true ? new Overtime(this.input,this.output,this.ITT) : 0;
            if(this.input.bruttoTypeGiven.checked == true){
               this.output.print("bruttoAB",this.input.brutto.value,"number")
                var socialInjurance = this.clcSocialInjurance();
               this.output.print("svDna",socialInjurance,"number")
                var incomeTax = this.clcIncomeTax(socialInjurance);
                var netto = this.input.brutto.value - socialInjurance - incomeTax - this.output.ecard.value - this.output.unionDues.value;
            }
            else if(this.input.bruttoTypeHourly.checked == true){
                this.input.brutto.value = this.input.hourlyRate.value * this.input.hours.value;
                this.output.print("bruttoAB",this.input.brutto.value,"number")

            }
        }
        else{
            console.log("There was an Problem with the Inputs");
        }
    }
    clcIncomeTax(socialInjurance){
        var assesmentBasis = this.clcAssesmentBasis(socialInjurance);
        var incomeTax = this.clcMTR(assesmentBasis);
        var commuterEuro = this.input.commuterKm.value / 6; // 2*commuterKm.value/12
        this.output.print("commuterEuro",commuterEuro,"number")
        var incomeTaxACE = incomeTax - commuterEuro > 0 ? incomeTax - commuterEuro : 0; //ACE...after commuter euro
        this.output.print("IncomeTaxAfterCommuterEuro",incomeTaxACE,"number")
        return incomeTaxACE;
    }
    clcAssesmentBasis(socialInjurance){
        var unionRate = this.input.unionRate.value != "" ? this.input.unionRate.value * 0.01 : 0.01;
        var unionDues = this.input.hasUnion.checked == true ? ((this.input.brutto.value * unionRate >= 33.80) ? 33.80 : (this.input.brutto.value * unionRate)) : 0; //Maximum dues is 33.80€
        this.output.print("unionDues",unionDues,"number")
        var eCard = this.input.hasEcard.checked == true ? (this.input.ecard.value != "" ? this.input.ecard.value : 12.30) : 0; //12.30€
        this.output.print("ecard",eCard,"number")
        var allowanceAmount = this.input.hasAllowance.checked == true ? this.input.allowance.value : 0;
        this.output.print("allowance",allowanceAmount,"number")
        var commutingAllowance = this.input.hasCommuter.checked == true ? this.clcComutingAllowance() : 0;
        this.output.print("commutingAllowance",commutingAllowance,"number")
        var assessmentBasis = this.input.brutto.value - socialInjurance - unionDues - eCard - allowanceAmount - commutingAllowance;
        this.output.print("assessmentBasis",assessmentBasis,"number")
        return assessmentBasis;
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
            var bi= -1;
            for (var i = 0; i < 5; i++) {
                if (this.CAT.big[i][0] <= this.input.commuterKm.value) {
                   bi++;
                }
            }
            return this.CAT.big[bi][1];
        }
        if (this.input.hasCommuterSmall.checked == true) {
            var si= -1;
            for (var i = 0; i < 4; i++) {
                if (this.CAT.small[i][0] <= this.input.commuterKm.value) {
                    si++;
                 }
             }
             return this.CAT.small[si][1]
         }
    }
    /**
     * Gets assessment base and returns the income tax 
     * @param {integer} AB assessment base for the tax rate
     */ 
    clcMTR(AB) {
        var i = -1;
        for (var j = 0; j < 7; j++) {
            if(this.ITT.tax[j][0] <= AB){
                i++
            }
        }
        var rate = this.ITT.tax[i][1]
        var seaColumn = parseInt((this.input.children.value != "" ? this.input.children.value : "0")) + 2;
        var sea = this.ITT.tax[i][seaColumn]
        this.output.print("incomeTaxRate",rate,"percent")
        this.output.print("avab",sea,"number")
        //set rate and sea to output
        var incomeTaxBSEA = rate * AB * 0.01;
        this.output.print("incomeTaxBeforeAVAB",incomeTaxBSEA,"number")
        var incomeTax = incomeTaxBSEA - sea;
        this.output.print("incomeTax",incomeTax,"number")
        return incomeTax;
    }
}

