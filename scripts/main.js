function byID(id){
    return document.getElementById(id)
}

window.onload = function(){
   var uiIn = {
       
   }
   var uiOut = {}
   var comutingAlowanceTable = {
       small: [
           [20, 58],  // over 20km to 40km
           [40, 113], // over 40km to 60km
           [60, 168]  // over 60km
        ],
        big: [
            [2, 31],   // over 2km to 20km
            [20, 123], // over 20km to 40km
            [40, 214], // over 40km to 50km
            [60, 306]  // over 60
        ],
   }
   var incomeTaxTable = {

        getCA: function(km,bigorsmall) {
           //50,"big" sended -> return -money from CA
           if (bigorsmall == "big") {
               var bi= 0;
               for (var i = 0; i < big.length; i++) {
                   if (big[i][0] >= km) {
                      bi++
                   }
               }
               console.log(big[bi][1])
               return this.big(big[bi][1])
           }
           if (bigorsmall == "small") {
               var si= 0;
               for (var i = 0; i < small.length; i++) {
                   if (small[i][0] >= km) {
                       si++
                    }
                }
                console.log(small[si][1])
                return this.big(small[si][1])
            }
        } 
    }

   var incomeTaxTable = {
       tax: [
           // 1-5 Children
           //Income,  %,   AVAB,         1,       2,       3,       4,       5 
           [ 1066.00, 25,  266.50,  307.67,  322.25,  340.58,  358.92,  377.25],
           [ 1516.00, 35,  418.00,  459.27,  473.85,  492.18,  510.52,  528.85],
           [ 2599.34, 42,  600.05,  641.22,  655.80,  674.14,  692.48,  710.81],
           [ 5016.00, 48,  901.01,  942.18,  956.76,  975.10,  993.43, 1011.77],
           [ 7516.00, 50, 1051.33, 1092.50, 1107.08, 1125.42, 1143.76, 1162.09],
           [83349.33, 55, 5218.80, 5259.97, 5274.55, 5292.88, 5311.22, 5329.55]
       ],

       // return % and AVAB (when Children return AVAB for Children)
    getMTR: function(AB, Kids) {
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

   var calc = new Calculation(uiIn,uiOut,comutingAlowenceTable,incomeTaxTable);
}