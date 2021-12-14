function compare_desc(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value2 - value1;     // 降序
    }
}

function compare_asc(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;   //升序
    }
}


export {compare_desc,compare_asc};
