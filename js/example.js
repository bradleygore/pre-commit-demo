(function() {

    'use strict'; //Supposed to use strict mode - (un)comment and see what happens when trying to commit

    //eval('true == true'); //Not supposed to use eval - (un)comment and see what happens when trying to commit

    //Supposed to use functions only after declaration - swap the order of the following lines and see what happens
    init();

    function init() {
        //also, this is an empty block
    };

    var someNum = 5;
    if (someNum == 5) {
        //Supposed to use triple equals (===)
        //also this is an empty block
    }

}());
