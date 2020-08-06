//消息列表，收到消息后，滚动到底部
setTimeout(()=>{
     element.scrollTo(0, scrollHeight)
}, 0)
 
// 键盘弹出式，input框被遮盖
setTimeout(()=> {
    const scrollHeight = document.documentElement.scrollTop||document.body.scrollTop||0
    window.scrollTo(0, Math.max(scrollHeight, 0))
}, 200)

//解决安卓手机，软键盘抬起输入框不在可视区
if(/Android/.test(navigator.appVersion)){
    window.addEventListener('resize', function(){
        if(document.activeElement.tagName==='INPUT' || document.activeElement.tagName ==='TEXTAREA'){
            setTimeout(()=>{
                document.activeElement.scrollIntoViewIfNeeded(true)
            }, 100)
        }
    })
}
// 解决苹果12版本，软键盘收回页面底部空白
if(/iphone/gi.test(navigator.userAgent)){
    document.body.addEventListener('focusout', ()=> {
        window.scrollTo(0, 500)
    })
}
// util/request.js  
import axios from 'axios'

const service = axios.create({
    baseURL: isDevelopment?"/api/": "/",
    timeout: 6000
})

const err = (error)=> {
    if(error.response){
        if(error.response.status === 403){
        
        }
        if(error.response.status === 401){}
    }
    return Promise.reject(err)
}
service.interceptors.request.use(config => {
    return config;
}, err)
service.interceptors.response.use(config => {
    return response.data
},err)