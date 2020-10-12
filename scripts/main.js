function byID(id){
    return document.getElementById(id)
}

window.onload = function(){
   var uiIn = {
       
   }
   var uiOut = {}
   var comutingAlowanceTable = {
       this:small [
           [20, 58],  // over 20km to 40km
           [40, 113], // over 40km to 60km
           [60, 168]  // over 60km
        ],
        this:big [
            [2, 31],   // over 2km to 20km
            [20, 123], // over 20km to 40km
            [40, 214], // over 40km to 50km
            [60, 306]  // over 60
        ],
   }
   var incomeTaxTable = {

   }
   var calc = new Calculation(uiIn,uiOut,comutingAlowenceTable,incomeTaxTable);

   
}