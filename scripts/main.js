function byID(id){
    return document.getElementById(id)
}

window.onload = function(){
   var uiIn = {}
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

        getCA: function(km,bigorsmall){
           //50,"big" sended -> return -money for big PP
           if (bigorsmall == "big") {
               var bi= 0;
               for (var i = 0; i < big.length; i++) {
                   if (big[i][0] >= km) {
                      bi++
                   }
               }
               console.log(big[0][bi])
               return this.big(big[0][bi])
           }
           if (bigorsmall == "small") {
               var si= 0;
               for (var i = 0; i < small.length; i++) {
                   if (small[i][0] >= km) {
                       si++
                    }
                }
                console.log(small[0][si])
                return this.big(small[0][si])
            }
        } 
   }
   var incomeTaxTable = {}
   var calc = new Calculation(uiIn,uiOut,comutingAlowenceTable,incomeTaxTable);

   
}