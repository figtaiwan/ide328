_I=0
_t=function(){return Date().substr(0,24)}
_i=function(f){console.log(_t(),'\t\t\t\t\t'.substr(0,_I++)+'-->',f)}
_o=function(f){console.log(_t(),'\t\t\t\t\t'.substr(0,--_I)+'<--',f)}
_i('tty.js')
//var fs =require('fs')
//var sys=require('sys')
var comport=document.getElementById('comport')
var comp=comport.value
var com_o=document.getElementById('com_o')
com_o.innerHTML=comp+' -->'
var i_com=document.getElementById('i_com')
i_com.innerHTML="--> "+comp
var f_com=document.getElementById('f_com')
f_com.innerHTML="->> "+comp
var baud=document.getElementById('baud')
var rate=parseInt(baud.value)
var inputText=document.getElementById('inputText')
var fileName=document.getElementById('fileName')
var out=document.getElementById('out')
out.innerHTML='hello! This is shown from script'
var seri=require('serialport')
var active=false
var timer
/*
out.innerHTML+='<br>comPort='+comp
out.innerHTML+='<br>baudRate='+rate
out.innerHTML+='<br>inputText='+inputText.value
out.innerHTML+='<br>fileName='+fileName.value
*/
var warning=[0,
	'ERROR#01 : 禁止移除系統字!',
	'ERROR#02 : 編譯錯誤 ! 請按 ESC 繼續',
	'ERROR#03 : 禁止寫入系統區!',
	'ERROR#04 : 程式結構不對稱!']
var inputs=[], inp, tmp, cod, chr, ok, ready, error, i, serialText=''
var output=function(txt) {
    out.innerHTML+=txt+'<br>'
    out.scrollTop=out.scrollHeight
	console.log(txt)
    inputText.focus()
    serialText=''
}
var login 		=function() {						// 試與 comp 建立連線
	if (!active) {
		serialPort = new seri.SerialPort(comp,{baudrate: rate})
        output(_t()+" 試 "+comp+" 速度 "+rate)
	    serialPort.on("close", function () {
			output(_t()+" 斷 "+comp+String.fromCharCode(7))
        })
		serialPort.on("error",function(err) { active=false
			setTimeout(login,1000)
			output(_t()+" 無 "+comp)
		})
        serialPort.on("data", function (data) { // 從 comp 到 console
        	if (!active) { active=true
        		if (out.innerHTML.match(/^hello/)) out.innerHTML=''
        		output(_t()+" 連 "+comp+" 速度 "+rate)
        	}
        	serialText+=data.toString()
    		if (inp&&inp===serialText.substr(0,inp.length)) {
    			console.log(comp,'-=>',JSON.stringify(serialText))
    			output('<font color=blue>'+inp+'</font>'+serialText.substr(inp.length))
    			inp=''
    			return
    		}
        	error=serialText.match(
        		/ERROR#0(1 : .......!\r\n|2 : ....... ! ... ESC .... |3 : ........!\r\n|4 .......)$/)
        	if (error) {
        		console.log(comp,'-=>',JSON.stringify(serialText))
        		output(serialText.split(error[0])[0]+
        			'<font color=red>'+error[0]+'</font>')
        		return
        	}
        	chr=serialText.charAt(serialText.length-1)
        	cod=chr.charCodeAt(0)
        	if (chr!=='\r'&&cod<0x20) {
        		console.log(comp,'-=>',JSON.stringify(serialText))
        		if (!ok && inp==='') {
        			ok=serialText
        		}
        		if (ok) {
	        		i=serialText.length-ok.length
	        		ready=ok&&ok===serialText.substr(i)
        		}
        		if (ready) {
        			serialText=serialText.substr(0,i)+' <font color=green>好</font>'
        			console.log('ready',ready)
        		}
        		output(serialText.replace(/\r\n/g,'<br>'))
        	}
        })
    }
}
var inputTextKeydown=function(e){ var c=e.keyCode
	if (c===27) {
		tmp=String.fromCharCode(e.keyCode)+'\r'
		serialPort.write(tmp)
		console.log(JSON.stringify(tmp),'-=>',comp)
	} else if (c===13) {
		inputToComport()
	}
}
var inputToComport=function(){
	inp=inputText.value
	inputs.push(inp)
	serialPort.write(inp+'\r')
	console.log(JSON.stringify(inp+'\r'),'-=> com5')
	inputText.value=''
}
/*
var nchar=0
process.openStdin().addListener("data",function(data){
	var d=data.toString(), c=d.charCodeAt(d.length-1); nchar+=d.length
	serialPort.write(d)	// 從 console 到 comport
	if (c<0x20) { console.log(c, nchar); nchar=0 }
})
*/
setTimeout(login,100)
setTimeout(inputToComport,5000)
_o('tty.js')