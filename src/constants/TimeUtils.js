export const cmp = function( x, y ) {
// If both x and y are null or undefined and exactly the same
    if ( x === y ) {
        return true;
    }

// If they are not strictly equal, they both need to be Objects
    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
        return false;
    }

//They must have the exact same prototype chain,the closest we can do is
//test the constructor.
    if ( x.constructor !== y.constructor ) {
        return false;
    }

    for ( var p in x ) {
        //Inherited properties were tested using x.constructor === y.constructor
        if ( x.hasOwnProperty( p ) ) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if ( ! y.hasOwnProperty( p ) ) {
                return false;
            }

            // If they have the same strict value or identity then they are equal
            if ( x[ p ] === y[ p ] ) {
                continue;
            }

            // Numbers, Strings, Functions, Booleans must be strictly equal
            if ( typeof( x[ p ] ) !== "object" ) {
                return false;
            }

            // Objects and Arrays must be tested recursively
            if ( ! Object.equals( x[ p ], y[ p ] ) ) {
                return false;
            }
        }
    }

    for ( p in y ) {
        // allows x[ p ] to be set to undefined
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
            return false;
        }
    }
    return true;
};
export const TimeUtils = function (lastTime) {
    let date3 = new Date().getTime() - new Date(lastTime).getTime();   //时间差的毫秒数
    //计算出相差天数
    let days=Math.floor(date3/(24*3600*1000))
    //计算出小时数
    let leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    let leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000))
    //计算相差秒数
    let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000)
    if(days > 0){
        return days+'d';
    }else if(hours > 0){
        return hours+'h';
    }else if(minutes > 0){
        return minutes+'m';
    }else if(seconds >= 0){
        return seconds+'s';
    }else{
        return 'l';
    }
}