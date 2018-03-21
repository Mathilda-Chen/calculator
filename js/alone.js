/**
 * Created by Administrator on 2018/3/20.
 */
window.onload = function(){
    var oBox = document.getElementById("box");
    var oA = document.getElementsByTagName("a");
    var oInput = oBox.getElementsByTagName("input")[0];
    var oFormula = document.getElementById("formula");
    var oSpan = oBox.getElementsByTagName("span");
    var s = false;
    var flag = false;

    for(var i= 0,len =oA.length;i<len;i++){
        oA[i].onfocus = function () {
            this.blur();
        }
        oA[i].onclick = function(){
            switch(this.innerHTML){
                case "on":
                    oInput.value = "开启中...";
                    oSpan[0].style.display = "none";
                    oSpan[1].style.display = "block";
                    oFormula.value = "";
                    setTimeout(function (){
                        oInput.value = "0";
                        oSpan[1].style.display = "none";
                        oSpan[2].style.display = "block";
                    },1000);
                    flag = true;
                    break;
                case "off":
                    oInput.value = "OFF";
                    oFormula.value = "";
                    oSpan[0].style.display = "block";
                    oSpan[1].style.display = "none";
                    oSpan[2].style.display = "none";
                    flag = false;
                    break;
                case "^2":
                    if(flag){
                        if(oInput.value != ""){
                            if(s){
                                oFormula.value = oInput.value + "*" + oInput.value;
                                oInput.value = "";
                                s = false;
                            }else {
                                /[%\/\+\-\*]($)/.test(oInput.value) || (oFormula.value = oFormula.value + oInput.value + "*" + oInput.value);
                                oInput.value = "";
                            }
                        }
                    }
                    break;
                case "--":
                    if(flag){
                        oInput.value = oInput.value.replace(/.$/,"");
                    }
                    break;
                case "c":
                    flag && (oInput.value = "0",oFormula.value = "");
                    break;
                case "%":
                    count("%");
                    break;
                case "/":
                    count("/");
                    break;
                case "*":
                    count("*");
                    break;
                case "-":
                    count("-");
                    break;
                case "+":
                    count("+");
                    break;
                case "=":
                    if(flag) {
                        s || (oFormula.value = (oFormula.value + oInput.value).replace(/[\+\-\*\/%]($)/, "$1"));
                        oInput.value = eval(oFormula.value);
                        s = true;
                        break;
                    }
                    break;
                case ".":
                        if(oInput.value.search(/[\.%\+\-\*\/]/) != -1)
                        break;
                default:
                    if(flag) {
                        s && (oInput.value = "0", oFormula.value = "");
                        oInput.value.length < 10 && (oInput.value =(oInput.value+this.innerHTML).replace(/^[0%\/\+\-\*](\d)/, "$1"));
                    }
            }
        }
        function count(a){
            if(flag){
                if(s){
                    oFormula.value = oInput.value + a;
                    oInput.value = a;
                    s = false;
                }else{
                    /[%\/\+\-\*]($)/.test(oInput.value) || (oFormula.value += oInput.value);
                    oInput.value = a;
                    /[%\/\+\-\*]($)/.test(oFormula.value) || (oFormula.value += oInput.value);
                    oFormula.value = oFormula.value.slice(-1) != a ? oFormula.value.replace(/.$/,a) : oFormula.value
                }
             }
        }
    }
}