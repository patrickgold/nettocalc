class Calculation{
    constructor(uiIn,uiOut,comutingAlowanceTable,incomeTaxTable){
        this.input = uiIn;
        this.output = uiOut;
        this.CAT = comutingAlowanceTable;
        this.ITT = incomeTaxTable;
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
                if(this.input[inputs[i]].validity.badInput){
                    return false
                }
                else if(parseFloat(this.input[inputs[i]].value) < 0){
                    return false;
                }
            }
        }
        return true
    }
    resetOutput(){
        var outputs = Object.getOwnPropertyNames(this.output);
        for(var i = 0; i < outputs.length; i++){
            outputs.value = 0;
        }
    }
    closeNotNeededBoxes(){
        if(screen.width <= 1100){
            this.input.ColBruttoWage.checked = false;
            this.input.ColBaseSev.checked = false;
            this.input.ColSpecPay.checked = false;
            this.input.ColBenefits.checked = false;
            if(this.input.hasOvertime.checked == false){
                this.output.ColOvertime.checked = false;
            }
            if(this.input.hasVacationPay.checked == false){
                this.output.ColVacPay.checked = false;
            }
            if(this.input.hasChristmasBonus.checked == false){
                this.output.ColChrisBonus.checked = false;
            }
        }
        else{
            if(this.input.hasOvertime.checked == false){
                this.output.ColOvertime.checked = false;
            }
            if(this.input.hasVacationPay.checked == false){
                this.output.ColVacPay.checked = false;
            }
            if(this.input.hasChristmasBonus.checked == false){
                this.output.ColChrisBonus.checked = false;
            }
        }
    }
    clcNetIncome(){
        if(this.checkInputs()){
            this.resetOutput();
            this.closeNotNeededBoxes();
            this.overtime = this.input.hasOvertime.checked == true ? new Overtime(this.input,this.output,this.ITT) : 0;
    
            if(this.input.bruttoTypeHourly.checked == true){
                this.input.brutto.value = 4 * this.input.hourlyRate.value * this.input.hours.value;
            }
            this.output.print("bruttoWoBenefits",this.input.brutto.value,"number")
            this.benefits = new Benefits(this.input,this.output);

            var socialInjurance = this.clcSocialInjurance();
            this.output.print("svDna",socialInjurance,"number")
            this.output.print("NcSvDna",socialInjurance,"number")
            var incomeTax = this.clcIncomeTax(socialInjurance);
            this.output.print("NcIncomeTax",incomeTax,"number");
            var netto = this.benefits.bruttoWBenefits - socialInjurance - incomeTax - parseFloat(this.output.ecard.innerHTML.replace(/,/g, '.')) - parseFloat(this.output.unionDues.innerHTML.replace(/,/g, '.'));
            netto = netto < 0 ? 0 : netto;
            this.output.print("NcNetto",netto,"number");
        }
        else{
            if(this.input.EN.checked == true){
                alert("There was a problem with the inputs");
            }
            else if(this.input.DE.checked == true){
                alert("Es gab einen Fehler bei der Eingabe");
            }
            else{
                console.log("Hackerboy2000");
            }
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
        var unionDues = this.input.hasUnion.checked == true ? ((this.benefits.bruttoWBenefits * unionRate >= 33.80) ? 33.80 : (this.benefits.bruttoWBenefits  * unionRate)) : 0; //Maximum dues is 33.80€
        this.output.print("unionDues",unionDues,"number")
        this.output.print("NcUnionDues",unionDues,"number")
        var eCard = this.input.hasEcard.checked == true ? (this.input.ecard.value != "" ? this.input.ecard.value : 12.30) : 0; //12.30€
        this.output.print("ecard",eCard,"number")
        this.output.print("NcEcard",eCard,"number")
        var allowanceAmount = this.input.hasAllowance.checked == true ? this.input.allowance.value : 0;
        this.output.print("allowance",allowanceAmount,"number")
        var commutingAllowance = this.input.hasCommuter.checked == true ? this.clcComutingAllowance() : 0;
        this.output.print("commutingAllowance",commutingAllowance,"number")
        var assessmentBasis = this.benefits.bruttoLTWT - socialInjurance - unionDues - eCard - allowanceAmount - commutingAllowance;
        assessmentBasis = assessmentBasis < 0 ? 0 : assessmentBasis;
        this.output.print("assessmentBasis",assessmentBasis,"number")
        return assessmentBasis;
    }
    
    clcSocialInjurance(){
        return this.benefits.bruttoSTSI > 5370 ? 5370 * 0.1812 : this.benefits.bruttoSTSI * 0.1812; //18.12% with a maximumof 5370€
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

