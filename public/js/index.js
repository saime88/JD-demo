window.onload=function(){
var topNav = document.querySelector('.top_navbar')
var jd_banner = document.querySelector('.roll_container')   
var imgbox = document.querySelector('ul:first-child')
var imgswidth = jd_banner.offsetWidth
var dotlist = document.querySelectorAll('.roll_container ul:last-child li')


// 滚动事件
window.onscroll = function(){
    
    var scrollHeight = document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop
    console.log(scrollHeight)
    scrollHeight +=10
    var opacity = 0
    if(scrollHeight < imgswidth){
        opacity = scrollHeight/imgswidth*0.85
        topNav.style.background = 'rgba(220,21,60,' + opacity + ')'
    }
    topNav.style.background  = 'rgba(220,21,60,' + opacity + ')'
}




var setslip = function(){
    imgbox.style.transition = "all 1s"
    imgbox.style.webkitTransition = "all 1s"
}
var clearslip = function (){
    imgbox.style.transition = "none"
    imgbox.style.webkitTransition = "none"
}
var startroll = function(x){
    imgbox.style.transform = 'translateX('+x+'px)'
    imgbox.style.webkitTransform = 'translateX('+x+'px)'
}

    
var index =1
// 监听过渡事件transitionend
imgbox.addEventListener('transitionend',function(){
    //console.log('11')
    if(index>=9){
            index = 1
            clearslip()
           startroll(-imgswidth*index)
    }
    else if(index <=0){
        index = 8
        clearslip()
        startroll(-imgswidth*index)
    }
  
    setpoint()
   
    
})


//轮播原点
var setpoint = function (){
    
    for(let i=0;i<dotlist.length;i++){
        dotlist[i].classList.remove('now')
    }
    dotlist[index-1].classList.add('now')
}

var timer = setInterval(function(){
                index++
                setslip()
                startroll(-imgswidth*index)
                
            },2000)



//监听触摸事件
var startX = 0
var movelength = 0
var ismove = false
imgbox.addEventListener('touchstart',function(e){
    
    startX = e.touches[0].clientX
    clearslip()
    
    
})
imgbox.addEventListener('touchmove',function(e){
    var moveX = e.touches[0].clientX
      movelength =  moveX-startX
    
     clearslip()
    startroll(-imgswidth*index+movelength)
    
    ismove = true
    
})
imgbox.addEventListener('touchend',function(e){
    
    if(ismove){
        var x= movelength        
        if(Math.abs(x)<imgswidth/3){
            setslip()
            startroll(-imgswidth*index)          
        }
        else{
        if(x>0){
            index--
        }
        else{
            index++
        }

        setslip()
        startroll(-imgswidth*index)
        setpoint()
   }
    
    //将变量改成初始化值，防止第二触摸事件发生时，影响数据
    movelength = 0
    startX = 0
    clearInterval(timer)
    timer = setInterval(function(){
        index++
        setslip()
    startroll(-imgswidth*index)
    },2000)
}
    ismove = false
 
   
})


//封装tab事件

//tab事件响应时间小于click时间，click响应时间一般是300ms，超过300ms被当做是click事件

//这里将jd_banner当做触发事件的对象
var startTime = 0
var resTime = 0

var  tapclick = function (dom,callback){
    dom.addEventListener('touchstart',function(e){
        console.log('touchstart')
        startTime = Date.now()
    })
    dom.addEventListener('touchmove',function(e){
        console.log('touchmove')
        ismove = true

       
    })
    dom.addEventListener('touchend',function(e){
        console.log('touchsend')
        if(!ismove){
            var moveTime = Date.now()
            resTime = moveTime - startTime
            if(resTime <150){
                callback&&callback.call(this,e)
            }
           
        }
        startTime = 0
        resTime = 0
        ismove = false
    })

    dom.addEventListener('click',function(e){
       window.open('http://www.baidu.com',"_blank")
    })

}
tapclick(jd_banner,function(e){
    console.log(e+"这是tap事件")
  
})

// 秒杀活动
var killactive = function(){
    var kills = document.querySelectorAll(".secondKill span")
    var time = 7200
    var timer=setInterval(() => {
        time--
        var h = Math.floor(time/3600)
        var m = Math.floor(time%3600/60)
        var s = time%60
        for(let i=0;i<kills.length;i++){
            kills[0].innerHTML=Math.floor(h/10)
            kills[1].innerHTML=h%10
            kills[3].innerHTML=Math.floor(m/10)
            kills[4].innerHTML=m%10
            kills[6].innerHTML=Math.floor(s/10)
            kills[7].innerHTML=s%10
            if(time<=0){
                clearInterval(timer)
        }
          }

          
          }
    ,1000);

   
    
}
killactive()




}





