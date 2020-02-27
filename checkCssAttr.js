/**
 * 用于简单的 CSS 特性检测
 * @param [String] property 需要检测的 CSS 属性名
 * @param [String] value 样式的具体属性值
 * @return [Boolean] 是否通过检查
 */
function cssTest(ele,property, value) {
    if(arguments.length === 1) {
       return false;
    }
    if(arguments.length === 2) {
        if(property in ele.style) {
		        return true;
	      }
        return false;
	  }else if(arguments.length === 3){
	      ele.style[property] = value;
        console.log(ele.style);
	      if(ele.style[property]) {
	          return true;
	      }
    }
    return false; 
}
cssTest("background","red");
