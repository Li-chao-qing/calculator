window.onload=function(){
    var date=new Date();
     console.log(date.getHours());
     console.log(date.getMinutes());
    console.log(date.getSeconds());
    var gh=date.getHours();
    var gm=date.getMinutes();
    var fn=function(e){
        if(e<10){
            return '0'+e;
        }else{
            return e;
        }
        
    };
   shijian.innerHTML=fn(gh)+':'+fn(gm);

    // shijian.innerHTML=date.getHours()+':'+date.getMinutes();
    var d_time;
    clearInterval(d_time);
    d_time=setInterval(function(){
        date=new Date();
        gh=date.getHours();
         gm=date.getMinutes();
        shijian.innerHTML=fn(gh)+':'+fn(gm);
    },500);
    var firstNumber='',secondNumber='',yunsuanfu='';
    var ope=document.getElementsByClassName('operator');
    var denghao=document.getElementById('denghao');
    var num=document.getElementsByClassName('num');
    var scr=document.getElementById('screen');
    var ac=document.getElementById('ac');
    var biaodashi=document.getElementById('biaodashi');
    var jstimerId;
    var jskaiguan=true;
    var timeId;
    for(var i=0;i<num.length;i++){
        num[i].index=i;
        num[i].onclick=function(){
            this.style.backgroundColor='#ededed';
            clearTimeout(timeId);
            timeId=setTimeout(function(i){
                return function(){
                    num[i].style.backgroundColor='white';
                }
            }(this.index),200);

            if(yunsuanfu==''){
                if(this.innerHTML=='.'&&firstNumber.indexOf('.')!=-1){return;}
                firstNumber+=this.innerHTML;
                scr.innerHTML=firstNumber;
            }else{
                 if(this.innerHTML=='.'&&secondNumber.indexOf('.')!=-1){return;}
                secondNumber+=this.innerHTML;
                scr.innerHTML+=this.innerHTML;
            }
        };
    }
    for(var i=0;i<ope.length;i++){
        ope[i].index=i;
        ope[i].onclick=function(){
            this.style.backgroundColor='#ededed';
            if(firstNumber==''&&scr.innerHTML=='0'){
                firstNumber='0';
                scr.innerHTML=firstNumber;
            }
            if(firstNumber==''&&scr.innerHTML!=='0'){
                firstNumber=scr.innerHTML;
            }
            if(jskaiguan){
                if(this.innerHTML=='±'){
                    console.log(scr.innerHTML.indexOf('-'));
                    if(scr.innerHTML.indexOf('-')==-1){
                         scr.innerHTML='-'+firstNumber;
                        firstNumber=''; 
                    }else{
                      
                        scr.innerHTML=Number(firstNumber)*(-1);
                        firstNumber=''; 
                    }               
                }
                else{
                    scr.innerHTML+=this.innerHTML;
                    yunsuanfu=this.innerHTML;
                    jskaiguan=false;
                }
                
                
            }
            clearTimeout(timeId);
            timeId=setTimeout((function(i){
                    return function(){
                           ope[i].style.backgroundColor='#f7f8f9';
                           } 
                    })(this.index),200);
        }
    }
    denghao.onclick=function(){
        if(secondNumber==''){
            return;
        }
        jskaiguan=true;
        biaodashi.innerHTML=scr.innerHTML+this.innerHTML;
        this.style.backgroundColor='#DE9000';
        clearTimeout(timeId);
       timeId=setTimeout((function(i){
                return function(){
                        denghao.style.backgroundColor='#FFA500';
                        } 
        })(),200);

        if(yunsuanfu=='+'){
            // if(firstNumber=='0.1'&&secondNumber=='0.2'||firstNumber=='0.2'||secondNumber=='0.1'){
            //     scr.innerHTML=0.3;
            // }
            // else{
               scr.innerHTML=Number(firstNumber)+Number(secondNumber); 
            // }
            
        }
        if(yunsuanfu=='-'){
                scr.innerHTML=Number(firstNumber)-Number(secondNumber);
        }
        if(yunsuanfu=='×'){
            scr.innerHTML=Number(firstNumber)*Number(secondNumber);
        }
        if(yunsuanfu=='÷'){
            scr.innerHTML=Number(firstNumber)/Number(secondNumber);
        }
        var mm=Number(scr.innerHTML);
       console.log(mm);

        if(mm>=(1.0000e+18)){
            scr.innerHTML=mm.toPrecision(5);
        }
        firstNumber='';
        secondNumber='';
        yunsuanfu='';
    };
    ac.onclick=function(){
        ac.style.backgroundColor='#EDEDED'; 
        setTimeout(function(){
                ac.style.backgroundColor='#f7f8f9';
            },50);
        firstNumber='';yunsuanfu='';secondNumber='';
        biaodashi.innerHTML='';
        scr.innerHTML='0';

    };



document.onmousedown=function(e){
      e.preventDefault();
    };






    scr.onmousedown=function(e){
       // e.preventDefault();
        var x=e.clientX-493;
        // var x=e.clientX-821;
        console.log(e.clientX);
        console.log(x);

        var mr=0;
        scr.style.marginRight=mr+'px';
        
            console.log(scr.style.marginRight);
            console.log(scr.offsetWidth);
          if(scr.offsetWidth>326){   
        document.onmousemove=function(e){
            
            var zuob=e.clientX-493;
            console.log(zuob);
            if(x-zuob>0&&x-zuob<scr.offsetWidth-326){
                if(x-zuob>=0){return;}
                scr.style.marginRight=(x-zuob)+'px';

            }
             if(zuob-x>0&&zuob-x<scr.offsetWidth-326){
                scr.style.marginRight=(x-zuob)+'px';
            }
          
            console.log(scr.offsetWidth);
            

        };}  
        
       

    };

    document.onmouseup=function(e){
      
        document.onmousemove=null; 
    
       
    };



};//最后