var runPage;

runPage = new FullPage({
	id : 'pageContain',                            // id of contain
	slideTime : 500,                               // time of slide
	effect : {                                     // slide effect
        	transform : {
        		translate : 'X',				   // 'X'|'Y'|'XY'|'none'
        		scale : [.8, 1],				   // [scalefrom, scaleto]
        		rotate : [0, 0]				       // [rotatefrom, rotateto]
        	},
        	opacity : [0, 1]                       // [opacityfrom, opacityto]
    	},                           
	mode : '',               // mode of fullpage
	easing : 'ease'                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
    , onSwipeStart : function(index, thisPage) {   // callback before pageChange
        // return 'stop';
    }
    , beforeChange : function(index, thisPage) {   // callback before pageChange
        console.log(index);

        // return 'stop';
    }
    , callback : function(index, thisPage) {       // callback when pageChange
        // alert(index);
    }
});


