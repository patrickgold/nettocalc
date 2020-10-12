function byID(id){
    return document.getElementById(id)
}

window.onload = function(){
   var uiIn = {}
   var uiOut = {}
   var comutingAlowenceTable = {}
   var incomeTaxTable = {}
   var calc = new Calculation(uiIn,uiOut,comutingAlowenceTable,incomeTaxTable);

   
}