
class Benefits{
    constructor(uiIn, uiOut){
        this.input = uiIn;
        this.output = uiOut;
        this.bruttoLTWT = 0; //liable to wage tax
        this.bruttoSTSI = 0; //subject to social insurance
        this.bruttoWBenefits = 0;
        this.sevAll = 0;
        this.hardAll = 0;
        this.hazPay = 0;
        this.clcBenefits();
    }
    clcBenefits(){
        this.sevAll = this.input.has_sevAll.checked == true ? this.input.sevAll.value : 0;
        this.hardAll = this.input.has_hardAll.checked == true ? this.input.hardAll.value : 0;
        this.hazPay = this.input.has_hazPay.checked == true ? this.input.hazPay.value : 0;
        this.bruttoLTWT = this.input.brutto.value *1 + (this.sevAll > 360 ? this.sevAll - 360 : 0) + (this.hardAll > 360 ? this.hardAll - 360 : 0) + (this.hazPay > 360 ? this.hazPay - 360 : 0); 
        this.bruttoSTSI = this.input.brutto.value *1 + this.hardAll *1 + this.hazPay *1;
        this.bruttoWBenefits = this.input.brutto.value *1 + this.sevAll *1 + this.hardAll *1 + this.hazPay *1;
        this.output.print("bruttowBenefits",this.bruttoWBenefits,"number");
        this.output.print("sevAll",this.sevAll,"number");
        this.output.print("hardAll",this.hardAll,"number");
        this.output.print("hazPay",this.hazPay,"number");
        this.output.print("bruttoAB",this.bruttoLTWT,"number");
        this.output.print("NcBruttoAB",this.bruttoWBenefits ,"number");
    }
}