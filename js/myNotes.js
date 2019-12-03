/**
 *  ##  DOM Core 和  HTML-DOM 例如：document.getElementsByTagName("form") 对应 document.forms
 *  getElementById
 *  getElementsByTagName
 *  getElementsByClassName
 *  getAttribute
 *  setAttribute
 *  removeAttribute
 *
 * 元素在节点树上的属性：
 *  node.nodeType        返回节点类型  1：元素节点；2：属性节点；3：文本节点
 *  node.nodeName        节点名称
 *  node.nodeValue       根据节点的类型设置或返回节点的值
 *
 *  className
 *  node.children       获取子元素节点
 *  node.childNodes     获取类型的子节点（包括元素节点和文本节点）
 *  node.firstChild     等价于node.childNodes[0]
 *  node.lastChild      等价于node.childNodes[node.length-1]
 *  node.parentNode     node元素的父元素
 *  node.nextSibling    node元素的下个兄弟元素
 *  node.previousSibling     获取前一个兄弟元素节点
 *  element.style.property   只能返回内嵌样式，如：element.style.fontFamily
 *
 *  ###################################
 *  document.createElement("p")                             创建新的元素节点
 *  document.createTextNode("text")                         创建文本节点
 *  parent.appendChild(child)                               把新的节点插入到文档树中
 *  parentElement.insertBefore(newElement, targetElement)   将新元素出入到已有元素的前面，（没有insertAfter,需要自定义）parent = target.parentNode
 *
 *
 *  var p = document.createElement("p");
 *  var txt = document.createTextNode("hello word");
 *  parent.appendChild(p);
 *  p.appendChild(txt)
 *
 *  ###################################
 *  ##  向文档中添加标记
 *  node.innerHTMl
 *  document.write("")
 *
 *  性能优化    尽量少访问DOM和尽量减少标记
 *             合并和放置脚本：减少页面请求数
 *             压缩脚本
 *  ###################################
 *  Math.ceil(number)   向上取整
 *  Math.floor(number)  向下取整
 *  Math.round(number)  四舍五入
 *  ###################################
 *
 *  ul>li   子选择器
 *  h2+p    相邻通报选择器
 *
 *  ## 选择器的优先级，例：#wrapper p.content .timer   0,1,2,1
 *      1.行内样式
 *      2.id选择器
 *      3.类、伪类、属性选择器
 *      4.类型选贼气和伪元素选择器
 *
 *
 *
 */

/**
    window.open(url, name, features)    url为空返回空白浏览器 例：window.open("url","name","width=200,height=300")
    <a href="http://taobao.com" onclick="myfn(this.href);reutn false;"></a> 这样对seo友好
    <a href="#" onclick="myfn();reutn false;"></a> 相同的作用
    <a href="JavaScript:;" onclick="myfn();"></a>
    伪协议：javascript:  javascript:myfn();可以调用javascript函数
    真协议：http://、ftp://等
 */



/**
 * 自定义getELementsByClassName
 * 不适用于多类名
 */
function getElementsByClassName(node, classname){
    if(node.getElementsByClassName){
        return node.getElementsByClassName(classname)
    }else{
        var results = [];
        var elems = document.getElementsByName("*");
        for(var i = 0; i < elems.length; i++){
            if(elems[i].className.indexOf(classname) != -1){
                results[results.length] = elems[i]
            }
        }
        return results;
    }
}

/**
 * 自定义insertAfter
 * **/
function insertAfeter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.append(newElement)
    }else{
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}

/**
 * 自定义ajax，注同源策略
 */

function myAjax(){
    var request = new XMLHttpRequest();
    // request.open("GET", "url", true); //第三个参数指定请求是否以异步方式发送和处理
    request.open("post","url",true)//
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")//这个头部信息对于POST请求是必需的
    request.onreadystatechange = function(){
        if(request.readyState == 4){
           // request.responseText;
           //request.responseXML;

        }
    }
    request.send(null)
}

/**
 * 定时器， 曲线移动： 每次移动距离 =（终点 - 现在的位置）/10，然后向上取整 Math.ceil(number)
 */
var moveTimer = setTimeout(move, 100);
function move(){
   console.log("每个100毫秒执行一次");
   if(moveTimer)clearTimeout(moveTimer);
    moveTimer = setTimeout(move, 100);
}

/**
 * canvas 鼠标移入图片，变灰白色
 * 属性：
 *  lineWidth
 *  strokeStyle
 *方法：
 *  drawImage(img,sx,sy,swidth,sheight,x,y,width,height)     向画布上绘制图像、画布或视频
 *  getImageData(x,y,width,height)                           复制画布上指定矩形的像素数据
 *  putImageData(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight);    把图像数据（从指定的 ImageData 对象）放回画布上
 *  toDataURL
 *  beginPath()     起始一条路径，或重置当前路径
 *  closePath()     创建从当前点回到起始点的路径
 *  moveTo()        把路径移动到画布中的指定点，不创建线条
 *  lineTo          添加一个新点，然后在画布中创建从该点到最后指定点的线条
 *  bezierCurveTo   创建三次方贝塞尔曲线
 *  fill()      填充当前绘图（路径）
 *  stroke()    绘制已定义的路径
 * */
function convertImage(img){
    var img = document.getElementById("img")
    img.color = img.src;
    img.grayscale = createGrayscale(img);

    img.onmouseover = function(){
        this.src = this.grayscale;
    }
    img.onmouseout = function(){
        img.src = this.color;
    }
}

//图片变灰
function createGrayscale(img){
    var canvas = document.createElement("canvas")
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var c = ctx.getImageData(0, 0, img.width, img.height);
    for(var i = 0; i < c.data.length; i+=4){
        var r = c.data[i];
        var g = c.data[i+1];
        var b = c.data[i+2];
        c.data[i] = c.data[i+1] = c.data[i+2] = (r+g+b)/3;
    }
    ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);
    return canvas.toDataURL();
}

function draw(){
    var canvas = document.getElementById("draw")
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0,0);
    //ctx.bezierCurveTo(20,100,200,100,200,20);
    ctx.lineTo(100, 0);
    ctx.lineTo(100, 100)
    ctx.lineTo(0, 100)
    ctx.lineTo(0, 0)
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle= "#ff0000";
    ctx.stroke();
}











