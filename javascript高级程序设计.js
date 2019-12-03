
/**
 * javascript简介
 * livescript-->javascript-->统一标准ECMAScript
 * JavaScript：ECMScript、DOM和BOM组成
 * web浏览器知识ECMScript实现可能的宿主环境之一
 * DOM：是针对XML但经过扩展用于HTML的应用程序编写接口，把整个页面映射为一个多层节点结构
 * */

/**
 * <script type="text/javascript" src="" defer="defer" async="async">
 *      带有src属性，script标签之间的代码会被忽略
 * </script>
 *  type: text/javascript和text/ecmascript
 *  defer（延迟脚本）：脚本会被延迟到整个页面都解析完毕后再运行，相当于立即下载，但延迟执行，先于DOMContentloaded执行（实际说不好）
 *  async（异步脚本）：目的是不让页面等待两个脚本下载和执行，从而异步添加页面其他内容
 **/

/**
语法：
 1.区分大小写
 2.标识符：第一个字符必须是字母，下划线或$;其他字符可以还有数字
 3.严格模式：脚本顶部或者在函数内部添加"use strict"编译指示
 4.变量：松散类型的，可以保留任何类型的数据
 5.数据类型:基本数据类型：Undefined，Null，Boolean，Number，String和复杂数据类型Object
    typeof操作符检测数据类型，如果这个值是对象或是null返回"object"，函数返回"function"
    Undefined：对于未声明和未初始化的变量typeof返回的都是"undefined"
    undefined == null 返回true
    Boolean类型:区分大小写，只有true和false；0，""，NaN，null，undefined转化后等价false
    Number类型：
        1.八进制第一位是0，严格模式下无效
        2.十六进制前两位必须是0x
        3.浮点数值：保存浮点数数值的内存空间是保存整数的两倍，因此ECMAScript会不失时机的将浮点数数值转换为整数值。例：var a = 1.0,解析为1
        4.浮点数值得最高精度是17位小数，0.1+0.2=0.30000000000000004
        5.数值范围:Number.MIN_VALUE(5e-324)和Number.MAX_VALUE(1.7976931348623157e+308),如果结果超出范围，自动转成特殊的正或负Infinity
          isFinite(number)判断是否有穷
        6.NaN：非数值（not a Number），本来要返回数值的操作未返回数值的情况（这样就不会抛错）
               特点：1.任何涉及NaN的操作(NaN/10)都会返回NaN；2.NaN不等于任何值，包括自身。
               isNaN()函数：表示不是数值
        7.数值转换：
                Number():适用于任何类型
                parseInf():适用于字符串,可以提供第二个参数，转换时使用的基数(进制)
                parseFloat():适用于字符串，只解析十进制
    Object类型：
        object实例都具有下列属性和方法：
        1.constructor:保存着用于创建当前对象的函数
        2.hasOwnProperty(propertyname):检查给定属性在当前对象实例中(而不是实例原型中)是否存在
        3.isPrototypeOf(obj):用于检查传入的对象是否是当前对象原型
        4.propertyIsEnumerable(propertyName):用于检查给定属性是否能够使用for-in语句来枚举
        5.toLocaleString():返回对象的字符串表示，与执行环境的地区对应
        6.toString():返回对象字符串表示,18.toString(2)得到10010
        7.valueOf():返回对象的字符串，数值或布尔值表示。
 6.操作符：
    1.一元操作符：只操作一个值的操作符（a++,++a）;不仅使用与整数，还可用于字符串，布尔值，浮点数值，对象具体见书中3.5节
    2.位操作符：位于最基本的层次上，即按内存中表示数值的位来操作。速度更快
        1.有符号的整数，以二进制格式存储，前31位表示整数值，第32位表示符号(符号位)：0正，1负。
          负数使用的格式是二进制补码，计算一个数值的二进制补码（-18的二进制补码）。
                1.求这个数值绝对值的二进制码
                2.求二进制反码
                3.得到的二进制反码+1
        2.按位非（~）：执行按位非得结果就是返回数值反码。~25结果位-26，本质操作数负值减1
        3.按位与（&）：25 & 3得到1
        4.按位或（|）：25 & 3得到27
        5.按位异或（^）：操作在两位数值对应位上只有一个1是才返回1，25 ^ 3得到26
        6.左移（<<）：将数值的所有位向左移动指定位数。符号位不变；2 << 5
        7.有符号右移(>>)：符号位不变，用符号位填充所有空位
        8.无符号右移(>>>)：以0来填充空位，负数符号位改变
    3.布尔操作符：逻辑非，逻辑与，逻辑或
    4.赋值操作符：num += 0 相当于 num = num + 10
    5.逗号操作符，可以用赋值 var num = (2, 4, 0) //num值为0
 7.语句
    1.break和continue语句；
        break语句立即退出循环，强制继续执行循环后面的语句。
        continue语句立即退出循环，从循环顶部继续执行。
    2.with语句：严格模式下不允许使用，性能下降，不建议使用
        location.url,location.href
        width(location){
            var a = url;
            var b = href;
        }
    3.switch语句:比较值时使用的是是全等操作符，因此不会发生类型转换
        switch(i){
            case 25:
                console.log();
                break;
            default:
                console.log();
        }
 8.函数：执行完return语句之后停止并立即退出。return语句之后的代码是不会被执行的
        参数：arguments类数组，长度由传入的参数个数决定

 #############################
 变量、作用域、内存问题
    1.基本类型和引用类型的值
        基本类型：按值访问，保存在栈内存中
        引用类型：的值是保存在堆内存中的对象，javascript不允许直接范文内存中的位置，按引用访问
    2.复制变量值，引用类型复制的是引用
    3.传递参数：函数中传递参数是按值传递，参见4.1.3
            function setName(obj){
                obj.name = "fan";
                obj = new Object();
                obj.name = "huan";
            }
            var person = new Object();
            setName(person);
            alert(person.name); //"fan"
    4.检测类型:typeof检测基本数据类型；instanceof检测引用类型的值
            alert(colors instanceof Array)
            instanceof检测基本类型是始终返回false，因为基本类型不是对象
    5.执行环境及作用域
        1.执行环境(环境)：定义了变量或函数有权访问的其他数据，决定了它们各自的行为
        2.变量对象：每个环境都有一个与之相关的变量对象，环境中定义的所有变量和函数都保存在这个对象中
        4.作用域链：当代码在一个环境中执行，会创建变量对象的一个作用域链。用途：保证对执行环境有权访问的所有变量和函数的有序访问
        5.活动对象：
        例：在web中，全局指执行环境(执行环境)，最外围的执行环境，window对象(变量对象)
            某个执行环境的所有代码执行完毕后，该环境被销毁，保存在其中的变量和函数也随之销毁
            全局执行环境知道应用程序退出（如：关闭网页）时，才被销毁
        6.延长作用域链
        7.没有块级作用域
        8.垃圾收集：javascript具有自动垃圾收集机制，垃圾收集器是周期运行的
            1.标记清理，主流垃圾收集算法（见4.3.1）
            2.引用计数(有循环引用这个问题，不常见)，解决方案：变量手动设置null
            3.性能问题，所有浏览器可手动触发垃圾收集过程，但不建议这样去做
                IE中调用window.CollectGarbage();
                Opera7以上调用window.opera.collect();
            4.管理内存：分配给web浏览器的可用内存通常比分配给桌面应用程序的少。出于安全考虑，防止运行javascript的网页耗尽全部系统内存而导致系统崩溃。
                      内存限制问题不仅会影响给变量分配的内存，同时还影响调用栈以及一个线程中能够同时执行的语句数。
                      优化内存占用的最佳方式：为执行中的代码保存必要数据。一旦数据不再用了，最好将其设置为null来释放引用（解除引用），适用于大多
                      全局变量和全局对象属性。局部变量会在它们离开执行环境时自动被解除引用
 ###################################
 引用类型
    1.Object类型
        创建Object实例的两种方法：
            1.var obj= new Object()
            2.字面量表达式：var obj={};不会调用Object构造函数
        访问对象属性两种方式：person.name 和 person['name']
    2.Array类型
            1.创建：1.使用Array构造函数var colors = new Array(),可以省略new操作符。
                   2.字面量表示法：var colors = [1,2,3]
                   数组中的length很有特点，它不是只读的
            2.Array.isArray(arr)确定这个值是不是数组，es5新增的，不管在那个全局执行环境中创建的
            3.栈方法：
                    栈是一种后进先出的数据结构，栈的插入(推入)和移除(弹出)只发生在栈的顶部。
                    push():接收任意数量参数，把他们逐个添加到数组末尾，并返回修改后数组的长度
                    pop()：从末尾移除最后一项，返回移除项
            4.队列方法：先进先出，队列在列表的末端添加项，从前端移除项
                    push()
                    shift():移除数组中的第一个项并返回该项
                    unshift():在数组前端添加任意个项返回新数组的长度
            5.重排序法：
                    reverse():可以反转数组项的顺序；如：arr.reverse();直观但不灵活因此有了sort()发放
                    sort():默认按升序排列数组项
                            arr.sort(function(v1, v2){
                                return v2 - v1;
                            })
            6.操作方法
                concat():先创建当前数组副本，然后将接受的参数添加到副本末尾，返回新构建的数组
                         colors.concat("yellow",["black", "brown"]),如果不传参数，只是复制当前数组并返回副本
                slice():基于当前数组中的一个或多个项创建新数组,原数组不变
                        注意：slice(-2, -1) 相当于 slice(-2+length,-1+length)
                             slice(1) 相当于 slice(1, length)
                             如果结束位置小于起始位置，返回空数组
                splice():返回一个从原数组删除项的心数组，原数组改变
                        删除：splice(0,2)从0位置开始删除2项
                        插入和替换：splice(2,1,"red","green")从数组第2个位置开始删除1项，再插入"red"和"green"
            7.位置方法：接受两个参数：要查找的项和查找起点位置的索引。一个从开始向后查找，一个从末尾开始向前查找
                        返回：要查找项在数组中的位置，没找到返回-1，找到使用的全等操作符
                indexOf()
                lastIndexOf()
            8.迭代方法：每个方法接受两个参数：要在每项上运行的函数和该函数的作用域对象
                every():对数组的每项运行给定函数，返回该函数对每项都返回true，则返回true
                some():对数组的每项运行给定的函数，如果函数对任一项返回true，则返回true
                filter():对数组的每项运行给定的函数，返回该函数会返回true的项组成的数组
                map():对数组的每项运行给定的函数，返回每个函数调用的结果组成的数组
                forEach():对数组的每项运行给定的函数，没有返回值
                forEach(function(item, index, 数组本身){}, this)
            9.归并方法:迭代数组所有项，然后构建一个最终返回值。
                reduce()和reduceRight()：接收两个参数，一个是每一项上调用的函数和作为归并基础的初始值(可选的)。第一个函数参数接收4个值：前一个值，当前值，
                                        项的索引和数组对象。这个函数的返回值会作为第一个参数自动传给下一项。
                var values = [1,2,3,4,5]
                var sum = values.reduce(function(prev, curr, index, arr){
                    return prev + curr;
                }, 初始值)
                alert(sum);//15
    3.Date类型
            Date类型使用自UTC(Coordinated Universal Time, 国际协调时间)1970年1月1日午夜开始经过的毫秒数来保存日期,可以精确到前后100 000 000年。
            创建日期对象 var now = new Date();构造函数会自动调用Date.parse()和Date.UTC()来解析入参
            Date.parse();接收一个日期的字符串参数，返回日期的毫秒数
            Date.UTC():返回日期毫秒数，参数(year,month,day,hour,minute,seconds,毫秒);月是从0开始，时0到23;年和月必传
            Date.now():返回当前日期的毫秒数，var start = +new Date()可以达到同样的目的
            valueOf():返回日期的毫秒数
            1.日期格式化方法(基本没用)
                toDateString();
                toTimeString();
                toLocalDateString();
                toLocalTimeString();
                toUTCString();
            2.常用方法
                getTime():返回日期的毫秒数，同valueOf()
                setTime():以毫秒设置日期
                getFullYear():取得4位数的年份
                setFullYear():这是日期的年份
                getMoth():返回日期中的月份，0表示一月
                setMoth():设置日期中的月份，超过11，（增加年份）
                getDate():返回月份中的天数(1-31)
                setDate():设置日期月份中的天数，如果传入的值超过月中的天数，则(增加月份)
                getDay():返回星期中的星期几；0表示星期天，6表示星期六
                getHours()
                setHours():超过增加天数
                getMinutes()
                setMinutes():超过增加消失
                getSeconds()
                setSeconds()：超过增加分钟
                getMilliseconds()：获取毫秒数
                setMilliseconds()
    4.RegExp类型
        创建正则表达式 var exp = / pattern / flags;
                     var exp = /\.at/i 等同于
                     var exp = new RegExp("\\.at" , "i")
        pattern(模式)可以是任何正则表达式，每个正则表达式可以带一个或多个flags(标志)
        正则表达式的匹配模式支持下列3个标志
            g:全局global模式，即模式将被应用所有字符串，而非发现第一匹配项时就立即停止
            i:表示不区分大小写模式，即在确定匹配项时忽略模式与字符串的大小写
            m:表示多行模式，即在达到一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项
        1.元字符有( [ { \ ^ $ | } ? * + . ] ),模式中的元字符必须转义
            . :除换行符\n外的任意字符
            ? :0或1次
            + :1或多次
            * :0或多次
            ():子表达式的开始位置和结束位置
            | :两个匹配进行逻辑或
            [xyz]:匹配指定范围内的任意字符
            [^xyz]:匹配未包含在范围内的任意一个字符
            \d: 匹配数字字符[0-9]
            \D: 匹配非数字字符[^1-9]
            \w:[a-zA-Z0-9_]
            \w:[^a-zA-Z0-9_]
        2.RegExp实例属性
            global: 布尔值，是否设置了g标志
            ignoreCase: 布尔值，是否设置了i标志
            multiline: 布尔值，是否设置了m标志
            lastIndex: 表示开始搜索下一个匹配的字符位置，从0算起
            source:正则表达式的字符串表示
        3.RegExp实例方法
            exec():专门为捕获组而设计的。接收一个字符串参数，然后返回第一个匹配项信息的数组；没有匹配到返回null。
                    返回的数组包括额外两个属性：index和input，index表示匹配项在字符串中的位置，input表示应用正则表达式的字符串
                    数组的第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串
                    var pattern = /mom (dad (baby)?)?/gi;
                    var arr = pattern.exec("mom dad baby www");
                    arr.index //0;
                    arr.input // mom dad baby www
                    arr[0] // mom dad baby
                    arr[1] // dad baby
                    arr[2] // baby
                    注意：设置了g它每次也只返回一个匹配项。在不设置g的情况下，同一个字符串多次调用exec()将始终返回第一个匹配项的信息。
                                                      在设置g的情况下，每次调用exec()则会在字符串中继续查找新匹配项
            test():接收一个字符串参数，在模式与该参数匹配的情况下返回true，否则返回false。
        4.构造函数的属性
            RegExp构造函数包含一些属性，基于所执行的最近一次正则表达的操作而变化
            input($_): 最近一次要匹配的字符串
            lastMatch($&): 最近一次匹配项
            lastParen($+): 最近一次捕获组
            leftContext($`): input字符串中lastMatch之前的文本
            rightContext($'): input字符串lastMatch之后的文本
            multiline($*): 布尔值，是否所有表达式都是用多行模式
                例子:var text = "this has been a short summer";
                    var pattern = /(.)ort/g;
                    if(pattern.test(text)){
                        RegExp["$_"]; // this has been a short summer
                        RegExp["$&"]; //short
                        RegExp["$+"]; //s
                    }
    5.Function类型
        函数是对象，每个函数都是Function类型的实例，同样具有属性和方法，函数名是指向函数对象的指针
        1.定义函数的方式：
            函数声明：function sum(n1,n2){ return n1+n2}
            函数表达式：var sum = function(n1,n2){ return n1+n2}
            构造函数: var sum = new Function("n1","n2","return n1+n2"),不推荐，这种语法会导致两次解析，影响性能
        2.解析器在向执行环境中加在数据时，会率先读取函数声明，并使其在执行任何代码前可用；至于函数表达式，则必须等到解析器执行到它所在的代码行。
        3.函数内部的属性：每个函数在调用时会自动获函数内部有两个特殊的对象arguments 和 this
            arguments:类数组对象，保存函数参数，有一个callee属性指向拥有这个arguments对象的函数，严格模式下callee会出错
            this:引用的是函数据以执行的环境对象（当在网页的全局作用域中调用函数时，this对象引用的就是window）
        4.es5规范化了另一个函数对象的属性：caller，保存着调用当前函数的函数引用，全局作用域中调用当前函数，他的值位null
            function outer(){inner()};
            function inner(){alert(inner.caller)};
            inner.caller 指向 outer
        5，函数的属性和方法
            属性length: 表示函数希望接收的命名参数的个数
            属性prototype
            apply()和call()方法的用途在指定的作用域中调用函数，实际上是设置函数体内this对象的值,最大的好处扩充函数赖以运行的作用域
                apply(赖以运行的作用域, 数组或者arguments)
                call(赖以运行的作用域,参数1，参数2，参数3...)
                    var o = {}; sayColor.call(o)
            bind():创建一个函数实例，其this值会被绑定到传给bind()的值
                    var newSayColor = sayColor.bind(o)
    6.基本包装类:为了便于操作方便，ecmascript还提供了3个特殊的引用类型：Boolean,Number,String
                每当读取一个基本类型值得时候，后台就会创建一个对应的基本包装类型对象
                引用类型与基本包装类型的主要区别：
                    使用new操作符创建的引用类型的实例在执行流离开当前作用域之前一直保存在内存中。
                    而自动创建的基本包装类型的对象则存在于一代码的执行瞬间，然后立即销毁
                1.Boolean类型（不建议使用，见5.6.1）
                    var falseObject = new Boolean(false);
                    falseObject && true //true,容易引起歧义

                    var falseValue = false;
                    typeof falseObject //object
                    type falseValue // boolean
                    此处情况同样适用于Number和String
                2.NumberL类型
                    toString(几进制)
                    格式化数值方法：
                    toFixed()按指定小数位数返回数值的字符串 var num = 10; num.toFixed(2) //"10.00"
                    toExponential()返回指数表示法 num.toExponential(1) //1.0e+1
                    toPrecision():得到表示某个数值最合适的格式，接收一个参数，表示数值所有数字的位数
                3.String类型
                    字符方法：这两个方法接收一个基于0的字符位置
                        chartAt()：返回给定位置的那个字符
                        charCodeAt():返回给定位置字符编码
                    字符串操作方法：
                        concat():用于将一个或多个字符创拼接起来，返回新的字符串
                        截取字符串：如果第二参数没传，默认到结束位置
                        slice():(开始位置, 结束位置)，负值参数时，负值+length
                        substring:(开始位置,结束位置)， 负值参数，负值转0
                        substr():(开始位置, 截取字符的个数)，负值参数，第一个参数+length，第二个参数0
                    字符串位置方法:返回子字符串的位置，可接受第二个参数，表示从字符串的那个位置开始搜索
                        indexOf();
                        lastIndexOf();
                        trim():创建一个字符串副本，删除前置及后缀的所有空格
                    字符串大小写转换
                        toLowerCase();
                        toUpperCase();
                        toLocalLowerCase();
                        toLocalUpperCase();
                    字符串的模式匹配方法
                        match(正则表达式或RegExp对象):本质上和调用RegExp的exec()方法相同
                        search(正则表达式或RegExp对象):返回字符串中第一个匹配项的索引
                        replace(正则表达式或字符串，字符串或是函数):如果第一个参数时字符串，那么只会替换第一个子字符串，
                            如果第二个参数时字符串，那么还可以是一些特殊的字符序列（如：$&,$n匹配第n个捕获组的子字符串等）
                                var text = "cat , bat";
                                var result = text.replace(/(.at)/g, "A_$1"); // A_cat, A_bat
                            如果第二个参数时函数：
                                var result = text.replace(/[<>"&]/g, function(模式的匹配项match, 第一个捕获组的匹配项, 第二个...,匹配项在字符串中的位置, 原始字符串){
                                    if(match == "<") return "&lt;";
                                    if(match == ">") return "&gt;";
                                    if(match == "&") return "&amp;";
                                    if(match == "\"") return "&quot";
                                })
                        split():(正则表达式或字符串, number)基于指定的分隔符将字符串分割成多个子字符串，并将结果放在数组中返回，第二参数指定数组长度
                        localCompare():比较两个字符串,"yellow.localCompare("brick")"  // 1
                    String构造函数的静态方法
                        fromCharCode():接收一个或多个字符编码，然后转换成字符串
                            例：String.fromCharCode(104, 101, 108, 108, 111) // hello
    7.内置Global对象：ECMAScript中作为极限"兜底对象",全局作用域中定义的属性和函数都是Global对象
        URI编码方法：
            encodeURI():主要用于对整个URI编码，不会再本身属于URI的特殊字符串进行编码，例如冒号，正斜杠，问号，井字号
            enCodeURIComponent():主要针对URI中的某一段进行编码，会对他发现的任何非标准字符进行编码（替换所有非字母字符）
            decodeURI();
            decodeURIComponent();
        eval():像一个完整的ECMAScript解析器，他只接受一个参数，要执行的js代码字符串
                他将会传入的参数当做实际的js语句来解析，然后把执行结果插入到原来的位置。通过eval()执行的代码被认为是包含该次调用的执行环境的一部分，
                因此被执行的代码具有与该执行环境相同的作用域链，注：eval()中创建的变量和函数不会被提升
                严格模式下：外部访问不到eval()中创建的任何变量
        window对象：web浏览器将global对象作为window对象的一部分加以实现
    8.内置Math对象
        Math.min():  Math.min(1,2,4)
        Math.max();  var arr = [1,3,4] ;Math.max.apply(Math, arr)
        Math.ceil(); 向上取整
        Math.floor(); 向下取整
        Math.round(): 四舍五入取整
        Math.random(): 返回大于等于0小于1的一个随机数
            值 = Math.floor(Math.random() * 可能值得总数 + 第一个可能值)
            function selectFrom(min, max){
                var allChoice = max - min +1;
                return Math.floor(Math.random() * allChoice + min)
            }
            var num = select(1, 100) //1到100直接的随机整数
 #########################
 面向对象的程序设计
    1.属性类型： 描述了属性的特征，内部才能拥有的特性,javascript不能直接访问它们
               为了表示特性时内部值，该规范把它们放在两对中括号中
               数据属性和访问属性
        1.数据属性：4个描述其行为的特征
            [[configurable]]:表示能否通过删除属性重新定义属性，能否修改属性特性，或者能否把属性修改为访问属性，默认true
            [[Enumerable]]:表示是否能通过for-in循环返回属性，默认true
            [[writable]]:表示能否修改属性值，默认true
            [[Value]]:包含这个属性的数据值，默认undefined
            Object.defineProperty()：修改属性的默认特性，接收三个参数，属性所在对象，属性名和描述符对象
                    var person = {};
                    Object.defineProperty(person, "name", {
                        writable: true,
                        value: "fanhuan"
                    })
                    delete person.name;
                    console.log(person.name)
                注意：一旦属性定义为不可配置，就不能再把它变回可配置
                    在使用Object.defineProperty方法时，如果不指定configurable，enumerable，writable特性时默认都是false
        2.访问器属性：不能直接定义，必须通过Object.defineProperty()来定义，访问器属性不包含数值，包含一对getter和setter函数，非必须
                4个特性
                [[configurable]]
                [[Enumerable]]
                [[Get]]:读取时调用的函数，默认undefined
                [[Set]]:默认undefined
                        var book = {
                            _year : 2004,
                            edition: 1
                        }
                        Object.defineProperty(book, "year",{
                            get: function(){
                                return this._year;
                            },
                            set: function(value){
                                if(value > 2004){
                                    this._year = value;
                                    this.edition = value -2004;
                                }
                            }
                        })
        3.定义多个属性
                Object.defineProperties()；
                        var book = {}
                        Object.defineProperties(book, {
                            _year: {
                                writable: true,
                                value : 2004
                            },
                            edition: {
                                writable: true,
                                value: 1
                            },
                            year:{
                                get: function(){
                                    return this._year;
                                },
                                set: function(value){
                                    if(value > 2004){
                                        this._year = value;
                                        this.edition = value -2004;
                                    }
                                }
                            }
                            
                        })
        4.读取属性的特性
            Object.getOwnPropertyDescriptor():获取给定属性的描述符
                var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
                alert(descriptor.value);
                alert(descriptor.configurable);
    2.创建对象：
        Object构造函数和字面量方式，造成大量重复代码
        工厂模式：没有解决对象识别问题
        构造函数创建的缺点：每个方法都要在实例上重新创建一遍
        1.Object构造函数方式
            var person = new Object();
            person.name = "fanhuan";
        2.字面量方式
            var person = {
                name : "fanhuan"
            }
        3.工厂模式
            function createPerson(name){
                var o = new Object();
                o.name = name;
                return o;
            }
        4.构造函数模式,对象的constructor(构造函数)属性最初用来标识对象类型，使用new操作符创建对象
            function Person(name){
                this.name = name;
            }
            任意函数只要通过new操作符来调用都视为构造函数，反之则是普通函数
                Person("fanhuan");
                window.name //fnahuan 当在全局作用域调用一个函数，this对象总执行global(浏览器中是window对象)

                var o = {};
                Person.Call(o, "fanhuan");
                o.name //fanhuan

        5.原型模式：
            原型属性：创建的每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，这个对象包含可以有特定类型的所有实例共享的属性和方法
            理解原型对象：
                    1.只要创建一个函数，就会自动为函数创建一个prototype属性指向原型对象（Person.prototype）
                    2.默认情况原型对象会自动获取一个constructor构造函数属性，这个属性指向原型所属函数（Person.prototype.constructor指向Person）
                    3.调用构造函数所创建的新实例有一个内部指针[[Prototype]]指向构造函数的原型对象
                     每当读取某个对象的属性时，先去对象实例中找，在去原型对象中找
                     对象实例不能重写原型对象中的值
            原型的的方法：
                Peron.prototype.isPrototypeOf(person1) //true
            获取[[Prototype]]值的方法
                Object.getPrototypeOf(person) == Person.prototype //true
                Object.getPrototypeOf(person).name
            hasOwnProperty()：检测属性存在对象实例中返回true
                person.hasOwnProperty(name) //name
            原型与in操作符：会在通过对象能够访问给定属性返回true，无论该属性存在实例中还是原型中
                function hasPrototypeProperty(obj, name){
                    return !obj.hasOwnProperty(name) && (name in obj)
                }
            for-in:循环返回所有对象可访问的，可枚举的（enumerable）属性(实例中和原型中都可)
                for(var key in person) //["name","sayName"]
            Object.keys():取的对象上所有可枚举的实例属性
                Object.keys(person) //["name"]
            Object.getOwnPropertyName():得到所有有实例属性，无论是否可枚举
                Object.getOwnPropertyName(person) //["name"]
                Object.getOwnPropertyName(Person.prototype) //["name","sayName","constructor"]
        6.组合使用构造函数模式和原型模式(最常用，原型的动态性被破坏)
            function Person(name){
                this.name = name
            }
            Person.prototype = {
                constructor : Person,
                sayName: function(){
                    alert(this.name)
                }
            }
        7.动态原型模式
            function Person(name){
                this.name = name;
                if(typeof this.sayName != "function"){
                    Person.prototype.sayName = function{
                        alert(this.name);
                    }
                }
            }
    3.继承
        1.原型链：继承是依靠原型链来实现的
            subType原型指向Supertype实例，所以subType拥有了SuperType实例所拥有的的全部属性和方法，内部还有一个指针指向SuperType原型
            最终：subIntance指向SubType原型，subType的原型指向SuperType原型
        2.原型链的问题：
            1.问题来自包含引用类型值得原型
            2.创建子类实例时不能像超类型的构造函数传参
        3.借用构造函数：解决了原型链的两个问题，新的问题：构造函数中定义函数无法复用或者超类型的原型定义的方法对子类型不可见（很少用）
        4.组合继承
            function SuperType(name){
                this.name = name;
            }
            function SubType(name, age){
                SuperType.call(this, name); //关键步骤 1
                this.age = age;
            }
            SubType.prototype = new SuperType();//关键步骤 2
            SubType.prototype.constructor = SubType;

###################
 函数表达式
    1.函数表达式:匿名函数赋值给变量
    2.递归:一个函数通过名字调用自身的情况下构成的
        命名函数表达式赋值给factorial
        var factorial = (function f(num){
            if(num <= 1){
                return 1;
            }else{
                return num*f(num-1)
            }
        })
    3.闭包:有权访问另一个函数作用域中的变量的函数
            当某个函数被调用时，会创建一个执行环境及相应的作用域链，然后使用arguments和其他命名参数的值来初始化函数的活动对象，
            在作用域链中,外部函数的活动对象处于第二位，作用域链的终点是全局变量对象
            匿名函数的包含函数执行完毕后，包含函数的执行环境的作用域链会被销毁，但是它的活动对象仍然留在内存中，直到年明函数被销毁
        1.闭包与变量：闭包只能取得包含函数中任何中变量的最后一个值
             function createFunctions(){
                var result = new Array();
                for(var i=0; i<10; i++){
                    result[i] = function(){
                            return ;
                        }

                }
            }
            function createFunctions(){
                var result = new Array();
                for(var i=0; i<10; i++){
                    result[i] = (function(num){
                        return function(){
                            return num;
                        }
                    })(i)
                }
            }
        2.关于this对象：匿名函数的执行环境具有全局性，因此其this对象指向window
                       函数在被调用时会自动获取两个特殊的对象this和arguments，内部函数在搜索时只会搜多到当前活动对象位置，
                        因此永远不可能直接访问外部函数中的这两个变量
                        obj = {
                            name: "jay",
                            sayName = function(){
                                var that = this;
                                return function(){
                                    return that.name
                                }
                            }
                        }
    4.模仿块级作用域
        匿名函数可以模仿块级作用域(私有作用域)
        javascript对后续的重复声明视而不见，但是会执行后续声明中的变量初始化
        Javascript将function关键词当做函数声明开始，函数声明后面不能加圆括号，然而将函数包含在一对圆括号中表示它是一个函数表达式，表达式后面可以跟圆括号
        用途：这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。
             可以减少闭包占用内存问题，因为没有指向匿名函数的引用，所以函数执行完毕就可以立即销毁其作用域链
            (function(){
                //块级作用域
            })()
    5.私有变量
        javascript中没有私有成员的概念，但是有私有变量的变量的概念。任何在函数中定义的变量都可以认为是私有变量（函数的参数，局部变量，函数内部定义的其他函数）。
        特权方法：有权访问私有变量和私有函数的方法
            1.构造函数创建特权方法
            2.静态私有变量：通过私有作用域定义私有变量或函数，同样可以创建特权方法(私有变量和函数由实例共享的，实例没有自己的私有变量）

            function Person(name){
                this.getName = function(){ return name}
                this.setName = function(value){name = value}
            }
            (function(){
                var name = "";
                Person = function(value){//函数声明只能创建局部函数，Person没有使用var关键词
                    name =value
                }
                Person.prototype.getName = function(){
                    return name;
                }
                Person.prototype.setName = function(){
                    name = value
                }
            })()
    6.模块模式:为单例模式创建私有变量和特权方法的模式（见7.4.2）
            单例模式：只有个一个实例的对象。javascript中使用字面量的方式来创建单例对象
 #############
 BOM
    1.window对象
        BOM的核心对象是window对象，表示浏览器的一个实例对象。在浏览器中window既是通过js访问浏览器的一个几口，又是ecmascript规定的Global对象
        注意：尝试访问未声明的变量会抛错，但是通过window对象查看返回undefined
        1.窗口关系及框架
            1.如果页面包含框架，则每个框架都拥有自己的window对象，并且保存在frames集合中，可以通过frames的数值索引或者框架名访问
            2.top对象始终指向最外（最高）层的框架；parent指向当前框架的上层框架；self指向window，可以和window互换使用，为了和top，parent对应起来
                站在最外层框架的角度访问内部框架
                    window.frames[0]
                    window.frames["topFrame"]
                    top.frames[0]
        2.窗口位置
            1.screenLeft和screenTop:窗口相对屏幕左边和上边的位置
                var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX
            2.moveTo和moveBy:将窗口精确的移动到新的位置(可能被禁用)
                moveTo接收新位置的x和y的坐标，moveBy接收在水平和垂直方向上移动的像素
        3.窗口的大小
            1、outerWidth和outerHeight:返回浏览器窗口本身的尺寸
            2、innerWidth和innerHeight:表示该容器中页面试图区域的大小(可见视口)
            3、resizeTo(x, y)和resizeBy(x, y)调整浏览器窗口大小（可能被禁用）
        4.导航和打开新窗口
            window.open()：接收4个参数：要加在的url、窗口目标、一个特性字符串以、表示新页面是否取代浏览器历史记录中当前加在页面的布尔值
                        1.如果第二个参数是已有窗口或是框架的名称，那么机会在具有改名称的窗口或框架中加载第一个参数指定的URL（_blank,_self,_top,_parent,frameName）
                        2.会返回一个指向新窗口的引用
                        3.新创建的窗口对象有一个opener属性，保存着打开它的原始窗口对象。
                            var newWin = window.open("");
                            newWin.resizeTo(500, 500);
                            newWin.opener == window
                            newWin.opener = null // 告诉浏览器新创建的标签页不需要与打开的标签通信
            弹出窗口蔽程序
                        var blocked = false;
                        try{
                            var win = window.open();
                            if(win = null) blocked = true; //浏览器内置的屏蔽程序阻止，window.open()可能返回null
                        }catch(ex){
                            blocked = true; //浏览器扩展或其他程序屏蔽阻止，会抛错
                        }
                        if(blocked) alert("弹出窗口被屏蔽")
        5.间歇调用和超时调用
            超时调用setTimeout()：参数1：js代码的字符串(不建议，性能损失)或是一个函数，参数2：毫秒数
                                返回一个数值ID，表示超时调用，clearTimeout(ID)取消超时调用
                                注：超时调用的代码都在全局中执行，函数中的this值在非严格模式下指向window，严格模式下是undefined
            间歇调用setInterval():同上，使用clearInterval(Id)取消任务
                    最佳模式：使用超时调用模拟间歇调用
                    var num = 0;
                    var max = 10;
                    function incrementNumber(){
                        num ++ ;
                        if(num < max){
                            setTimeout( incrementNumber, 100);
                        }else{
                            alert("done");
                        }
                    }
                    setTimeout( incrementNumber, 100);
        6.系统对话框:
                    1.confirm("确定关闭") ? alert("ok"): alert("no")
                    2.var result = prompt("你叫什么名字","");
                     if(result !== null){ alert("你好"+result) }
                    3.window.print()和window.find()
    2.location对象
            window.location 和 document.location引用的是同一个对象
            属性：
                href: 完整的url
                protocol: "http:"
                host："www.xx.com:80"
                hostname: "www.xx.com"
                port: "8080"
                pathname:"/path/"
                search："?a=123" 插叙字符串
                hash： "#abc"
            方法：
                location.assign(url)等同于 location.href = url等同于 window.location = url
                location.replace(url)不会再历史记录中生成新的记录
                location.reload();//重新加载(可能从缓存中加载)
                location.reload(true)//重新加载(从服务器中重新加载)

            function getQueryString(){ //查询字符串参数
                var args = {};
                var qs = location.search.length > 0 ? location.search.substring(1): ""; //问号分割
                var items = qs.length ? qs.split("&"): []; //&分割
                for(var i = 0; i < item.length; i++){
                    var item = items[i].split("=") //等号分割
                    var name = decodeURIComponent(item[0])
                    var value = decodeURIComponent(item[1])
                    args[name] = value;

                }
                return args;
            }
    3.navigator对象 见8.3
    4.screen对象(用处不大)
            width:屏幕像素宽度
            height:屏幕像素高度
            availWidth
            availHeight
    5.history对象
        因为history是window对象，所以每个窗口，每个标签页乃至每个框架都有自己的history对象与特定的window对象关联
        go()：可以在用户的历史记录中任意跳转。接收一个整数值或字符串；如果是字符串浏览器会跳转到历史记录中包含该字符串的第一个位置，可能前进也可能后退，具体看那个位置最近
        back()和forward()
        length属性：保存着历史记录的数量
 ##############
 客户端检测
    1.能力检测（特性检测）：目标不是识别特定浏览器，而是识别浏览器的能力
    2.怪癖检测：目标是识别浏览器的特殊行为(缺陷）
    3.用户代理检测 见9.3.3完整代码
 #################
 DOM是针对HTML和XML文档的一个api（应用程序编程接口）
    1、节点层次
        DOM可以将任何HTML和XML文档描绘成一个由多层节点构成的结构
        文档节点：是每个文档的根节点
        文档元素：文档节点只有一个子节点即html元素，是文档的最外层元素
    2、Node类型
        js中所有节点都继承自Node类型
        nodeType节点类型：12个数值常量，1：元素节点；2：属性节点；3：文本节点
        nodeName:
        nodeValue:
            对于元素节点来说nodeName保存着标签名，nodeValue的值时null
    3、节点关系
        childNodes:返回所有子节点，NodeList类数组对象的形式返回
        children：返回所有子元素节点
            nodeList：基于DOM结构动态执行查询的结果，DOM结构的变化能够反映在NodeList对象中（动态集合）
            Array.prototype.slice.call(somNode, 0)//nodeList转换为数组
        parentNode：指向文档树种的父节点
        previousSibling:前一个同胞节点
        nextSibling：下一个同胞节点
        firstChild：第一个子节点
        lastChild：最后一个子节点
        hasChildNodes()：节点包含一个或多个子节点返回true
        ownerDocument：该属性指向整个文档的文档节点
    4、操作节点
        appendChild()：向childNodes列表的末尾添加一个节点，返回新增的节点，
                        如果appendChild()中的节点已经是文档的一部分，那结果就是将该节点从原来的位置转移到新位置
        insertBefore()：接收两个参数：要插入的节点和作为参考的节点，把节点放在childNodes列表中的特定位置上，返回插入的节点。如果参照节点是null，则和appendChild执行相同操作
        replaceChild()：参数：要插入的节点和要替换的节点，返回要替换的节点
        removeChild()：参数：要移除的节点，返回移除的节点
    5、其他方法
        cloneNodes():参数为true，执行深复制，复制节点及整个子节点树
                     参数为false，执行浅复制，只复制节点本身，
                     注：不会复制添加到DOM节点中的js属性
        normalize()：当在某个节点调用这个方法，查找后代节点，找到空文本节点删除它，找到相邻的文本节点合并为一个文本节点
    6、Document类型
        js通过Document类型表示文档。在浏览器中，document对象是HTMLDocument的一个实例，表示整个HTML页面
        Document节点的nodeType = 9
                     nodeName = "#document"
                    nodeValue = null
                    ownerDocument = null
        1、文档子节点：DocumentType，Element，ProcessingInstruction或Comment
            document.documentElement 指向html元素
            document.body 指向body元素
            document.doctype 取得<!DOCTYPE>的引用，浏览器支持不一样，用处有限
        2、文档信息
            document.title
            document.referrer:保存着链接到当前页面的那个URL
            document.URL
            document.domain 页面的域名
                来自不同子域的页面，通过将页面的document.domain设为相同值，就可以通信。
                domain还有一个限制，如果一个域名一开始是松散(worx.com)，就不能再将它设置为紧绷(xxx.wrox.com)
        3、查找元素
            document.getElementById()，参数区分大小写
            document.getElementsByTagName()：返回一个HTMLCollection对象，该对象有一个namedItem()方法，通过元素name取得集合中的项
                var allEle = document.getElementsByTagName("*"); //获取文档所有元素
                var images = document.getElementsByTagName("img");
                images[0]
                images.item(0)
                images.namedItem("myImage")
                images["myImage"]
            document.getElementsByName()
        4、特殊集合
            这些集合都是HTMLCollection对象，为访问文档常用的部分提供了快捷方式
            document.anchors：文档中所有带name特性的a元素
            document.links: 文档中所有带href特性的a元素
            document.forms: 文档中所有<form>元素
            document.images:文档中所有img元素
        5、文档写入
            document.write();如果在文档加在结束后再调用,输出内容将重写整个页面
            document.writeln();在末尾家还是那个换行符\n
            document.open();
            document.close();
    7、Element类型
            nodeType = 1;
            nodeName 为标签名
            nodeValue值为null
            要访问标签名可以使用nodeName，也可使用tagName
            1、html元素
                所有html元素都有HTMLElement类型或子类型表示，HTMLElement直接继承Element并添加一些属性（标准特性）
                id
                title
                lang:元素内容的语言代码
                dir：语言的方向：ltr和rtl
                className
            2、特性操作：
                非自定义特性习惯通过对象的属性来获取或设置
                getAttribute():也可获取自定义特性(data-前缀)
                    注意：style和onclick通过getAttribute和对象的属性访问返回的不太一样。所以开发人员对与非自定义属性喜欢采用对象的属性的方式
                setAttribute()
                removeAttribute()
            3、attributes属性：一般用在遍历元素的特性时用到
                getNameItem(name)
                removeNamedItem(name)
                setNamedItem(node)
                item(pos)
                element.attributes["id"].nodeName
                element.attributes[0].nodeValue
            4、创建元素
                createElement(元素标签名)
    8、Text类型 （见10.1.4）
        nodeType = 3
        nodeName = "#text"
        nodeValue的值为节点所包含的文本
        parentNode是一个Element
        1、方法：
            appendData(text)：将text添加到节点末位
            deleteData(offset, count)：从offset指定的位置开始删除count个字符
            insertData(offset, text)：在offset指定的位置插入text
            replaceData(offset, count, text)
            splitText(offset)从指定位置将当前节点分成两个节点
            substringData(offset, count)
        2、属性：
            length：节点中的字符个数
        3、创建文本节点
            document.createTextNode(text)
        4、规范化文本节点
            element.normalize()在文本节点的父元素调用，合并所有文本节点
    9、Comment类型
        nodeType = 8
        nodeName = "#comment"
        nodeValue 的值为注释的内容
        comment类型和Text类型继承相同的基类，它拥有除了splitText之外的所有方法
        document.createComment()
    10、CDATASection类型 (见10.1.6)
        nodeType = 4
    11、DocumentType类型
        nodeType = 10
    12、DocumentFragment类型
        nodeType = 11
        nodeName = "#dacument-fragment"
        创建文档片段
            var fragment = document.createDocumentFragment()
            ul.appendChild(fragment) //实际只会将文档片段的所有自己点添加相应的位置上；文档片段本身永远不会成为文档树的一部分
    13、Attr类型
        nodeType = 2
        nodeName 特性名
        nodeValue 特性值
        Attr对象的三个属性
            name: 特性名=nodeName
            value：特性值=nodeValue
            specified:布尔值，true代表默认属性，false自定义属性
        var attr = document.createAttribute("align")
        attr.value = "left";
        element.setAttributeNode(attr)
    14、动态脚本
        function loadScript(url){
            var script = document.createElement("script")
            script.type = "text/javascript";
            script.src = url;
            document.body.appendChild(script)
        }
    15、动态样式
        function loadStyle(url){
            var style = document.createElement("link")
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(link);
        }
    16、操作表格(见10.2.3)
 ##########################
 DOM扩展
    1、选择符API
        querySelector(css选择符)：返回与该模式匹配的第一个元素
        querySelectorAll()：返回所有匹配的元素
        matchesSelector(css选择符)：如果调用元素与该选择符匹配，返回true
    2、元素遍历
        childElementCount：返回子元素的个数
        firstElementChild: 第一个子元素
        lastElementChild：最后一个子元素
        previousElementSibling：前一个同辈元素
        nextElementSibling: 后一个同辈元素
    3、类相关的扩充
        1、getElementsByClassName
        2、classList属性
            add()
            contains()
            remove()
            toggle():如果列表存在则删除，如果不存在则添加
    4、焦点管理
        document.activeElement:这个属性始终会引用DOM中当前获取焦点的元素
            默认情况下，文档刚加载完，document.activeElement中保存的是document.body元素的引用
        document.hasFocus():确定文档是否获得了焦点
    5、HTMLDocument的变化
        1、readyState属性：document对象的readyState有两个值
                loading:正在加载文档
                complete：已加载完文档
        2、兼容模式
            document.compatMode == "CSS1Compat"//标准模式
            document.compatMode == "BackCompat"//混杂模式
        3、head属性
            document.head
        4、字符集属性
            document.charset
    6、自定义数据属性（要添加前缀data-）
        dataset属性：访问自定义属性的值
            div.dataset.appId = 123;
    7、插入标记
        innerHTML：返回调用元素的所有子节点；并不是所有元素都支持该属性
        outerHTML：返回调用元素本身及所有子节点
        insertAdjacentHTML(插入的位置，要插入的html文本)：第一个参数的几种情况
            "beforebegin":当前元素之前插入一个紧邻的同辈元素
            "afterbegin"：当前元素第一个子元素之前插入一个新的子元素
            "beforeend"：当前元素最后一个子元素之后插入一个新的子元素
            "afterendn"：当前元素之后插入一个紧邻的同辈元素
        内存和性能问题：
            使用上述的方法将元素从文档树种删除后，元素与事件处理程序（或js对象）之间的绑定关系在内存中并没有删除。这种情况频繁出现，内存数量会明显增加
            在插入大量HMTL标记相对效率高，这是因为设置innerHTMl和outerHTML时会创建解析器。这个解析器是在浏览器级别的代码基础上运行的，总结，使用次数控制合理最好。
    8、scrollIntoView(boolean值):调用的元素出现在视口(唯一一个所有浏览器都支持的)
            true：顶部与视口尽可能平齐
            false：底部与视口尽可能平齐
        scrollIntoView():只有在当前元素的视口中不可见的情况下，才滚动让其可见。如果元素在视口中，这个方法什么也不做。如果传true，则表示将元素显示在视口中部
    9、专有扩展
        完档模式（见11.4.1）
        children：返回子元素节点
        contains()：某个节点是不是另外一个节点的后代节点,如果是返回true
            document.documentElement.contains(document.body) //true
 ########################
 DOM2和DOM3
    DOM1主要定义的是HTML和XML文档的底层结构，DOM2和DOM3级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的XML特性
    通过以下代码确定浏览器是否支持这些DOM模块
        document.implementation.hasFeature("Core", "2.0");
        document.implementation.hasFeature("Core", "3.0");
    1、样式
        document.implementation.hasFeature("CSS", "2.0");
        1、访问元素的样式
            特殊情况：float ---> style.cssFloat/styleFloat(ie)
        2、DOM样式style属性和方法
            cssText：访问style特性中的css代码
            length：应用给元素的css属性的数量
            parentRule
            getPropertyPriority(propertyName):给定属性是否使用了!important设置
            getPropertyValue(propertyName)
            setPropertyValue(propertyName,value, priority)
            removeProperty(propertyName)
            item(index)
            getPropertyCSSValue(propertyName): 返回一个包含两个属性的CSSValue对象，
                    这两个属性分别是：cssText和cssValueType（是一个常量值0表示继承制，1表示基本值，2表示值列表，3表示自定义的值）
        3、计算的样式
            style对象能够提供支持style特性的任何元素的样式，但是它不包含那些从其他样式表层叠而来并影响到当前元素的样式信息
            document.defaultView提供了getComputedStyle(要取得计算样式的元素，一个为元素字符串)。如果不需要伪元素信息，第二个参数时null
                var computeStyle = document.defaultView.getComputedStyle(div, null)
                alert(computeStyle.width);
            IE不支持getComputeStyle()方法，提供了一个currentStyle属性
                var computeStyle = div.currentStyle
        4、操作样式表（见12.2.2）
            CSSStyleSheet继承自StyleSheet，表示样式表，包括通过link元素包含的样式表和style元素定义的样式表。
                var sheet = document.styleSheets[0];
                var link = sheet.href;
                var rules = sheet.cssRules || sheet.rules;
                var rule = rules[0];
                rule.style.width = "10px";
    2、元素的大小
        1、偏移量：元素在屏幕上占用的所有可见空间。元素的可见大小有高宽，内边距，滚动条，边框大小（不包括外边距）
            offsetHeight: 元素在垂直方向上占用空间大小
            offsetWidth
            offsetLeft：元素的左外边框至包含元素的左内边框之间的像素距离
            offsetTop
            offsetParent：包含元素的引用，不一定与parentNode的值相等
                function getElementLeft(element){
                    var left = element.offsetLeft;
                    var parent = element.offsetParent;

                    while(parent !== null){
                        left += parent.offsetLeft;
                        parent = parent.offsetParent;
                    }
                    return left;
                }
        2、客户区大小
            元素的客户区大小，指的是元素内容及内边距所占据空间的大小
            clientWidth
            clientHeight
            注：这些偏移量和客户区大小属性都是只读的，每次访问都要重新计算，因此尽量避免重复访问
        3、滚动大小
            指包含滚动内容元素的大小
            scrollHeight: 没有滚动条情况下，元素内容的总高度（内容实际的大小）
            scrollWidth：同上
            scrollLeft: 被隐藏在内容区域左侧的像素，可以设置改变滚动位置
            scrollTop：同上
                例子：确定文档的总高度
                docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
        4、确定元素大小
            getBoundingClientRect()返回一个矩形对象，包含4个属性left,top,right,bottom,这些属性给出了元素在页面中相对于视口的位置
                function getBoundingClientRect(element){
                    var scrollTop = document.documentElement.scrollTop;
                    var scrollLeft = document.documentElement.scrollLeft;
                    if(element.getBoundingClientRect){
                        return {
                            left: rect.left,
                            right: rect.right,
                            top: rect.top,
                            bottom:rect.bottom + offset
                        }
                    }else{
                        var actualLeft = getElementLeft(element);
                        var actualTop = getElementTop(element);
                        return {
                            left: actualLeft - scrollLeft,
                            right: actualLeft - scrollLeft + element.offsetWidth,
                            top: actualTop -scrollTop,
                            bottom: actualTop -scrollTop + element.offsetHeight
                        }
                    }
                }
    3、遍历
        NodeIterator 和 TreeWalker（跟强大） 功能用法类似，IE不支持（见12.3.1）
            var filter = function(node){
                return node.tagName.toLowerCase() == "li"?
                        NodeFilter.FILTER_ACCEPT:
                        NodeFilter.FILTER_SKIP;
            }
            var iterator = document.createNodeIterator(someElement, NodeFilter.SHOW_ELEMENT, filter, false);
            var node = iterator.nextNode();
            while(node !== null){
                alert(node.tagName);
                node = iterator.nextNode();
            }
    4、DOM中的范围(12.4 用的时候看下，内容还挺多)
        document.createRang();
 ####################
 事件
    js和html之间的交互是通过事件实现的。事件：就是文档或浏览器窗口中发生一些特定的交互瞬间
    观察员模式的模型：可以使用侦听器（或处理程序）来预定义事件，以便事件发生时执行相应的代码。
    1、事件流：从页面中接收事件的顺序。
        IE的事件流顺序是事件冒泡，Netscape是事件捕获流
        "DOM2级事件"规定的事件流包括三个阶段：事件捕获、处于目标阶段、事件冒泡；
    2、事件处理程序
        事件：就是用户或浏览器自身执行的某种动作。相应事件的函数叫做事件处理程序（事件侦听器）。事件处理程序的名字以on开头
        1、HTML事件处理程序
            <input type="button" onclick="alert(event)">
            事件处理程序的独到之处，函数中有个局部变量event（事件对象），this值等于事件的目标元素
            缺点：1、时差问题。2、html和js代码紧密耦合。3、这样扩展事件处理程序的作用域链在不同浏览器中会导致不同结果
        2、DOM0级事件处理程序(元素方法，this对象引用当前元素)
            btn.onclick = function(){alert(this.id)}
            这种方式添加的事件处理程序会在事件流的冒泡阶段被处理
        3、DOM2级事件处理程序
            addEventListener(事件名，函数，布尔值)；true:代表捕获阶段调用，false表示冒泡阶段调用
            removeEventListener(事件名，函数，布尔值)
            好处：可以添加多个事件处理程序
        4、IE事件处理程序
            attachEvent(on+事件名，函数)，事件冒泡阶段被调用，区别：this等于window
            detachEvent():同上
    3、事件对象event
        触发DOM上某个事件时，会产生一个事件对象event，这个对象包含着所有与事件相关的信息
        1、DOM中的事件对象
            event.currentTarget: 在事件处理程序内部，对象this始终等于currentTarget的值，
            event.target: 只包含事件的实际目标
                如果事件处理程序存在于按钮的父节点中（例如body）
                    event.currentTarget === this === document.body
                    event.target === btn
            event.eventPhase: 调用事件处理程序的阶段；1捕获阶段，2处于目标，3冒泡阶段
            event.preventDefault() //阻止特定事件的默认行为
            event.stopPropagation() //取消事件的进一步捕获或冒泡
            注：一旦事件处理程序执行完成event对象就会销毁
        2、IE中的事件对象
            btn.onclick=function(){alert(window.event)}
            btn.attachEvent("onclick",function(event){})
            event.srcElement 事件目标（与DOM中的target属性相同）
            event.returnValue = false //阻止默认行为
            event.cancelBubble = true //阻止冒泡
    4、事件类型
        1、UI（用户界面）事件：不一定与用户操作相关的事件。这些事件在DOM规范出现之前，都是以这种或那种的形式存在
            1、load事件
                1、页面加载完成后（包括所有图像，js文件，css等外部资源），触发window上的load事件
                2、为body添加一个load事件
                3、图片上也可以触发load事件，事件处理要放在指定src属性之前。因为只要设置了src属性就会下载
                4、script和link元素也会触发load事件，指定src和href属性并将其添加到文档中才会下载
                    image.onload=function(){}
                    image.src="url"
                    document.body.appendChild(image)
            2、unload事件
                在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生unload事件。利用这个时间最多的情况是清除索引，避免内存泄漏。
                可以在window，body上指定
            3、resize事件
                当浏览器窗口被调整到新的高度或宽度时，就会在window上触发resize
            4、scroll在window上触发
            5、abort、error、select事件
        2、焦点事件
            1、blur元素失去焦点触发，不冒泡
            2、focus元素获得焦点触发，不冒泡
            3、DOMFocusIn，DOMFocusOut，DOM3级事件已废弃
            4、focusin和focusout，等价于focus和blur冒泡
        3、鼠标事件
            1、click: 鼠标单击或者按下回车键触发
            2、dblclick： 鼠标双击是触发
            3、mousedown： 按下任意鼠标按钮触发
            4、mouseup：释放鼠标按钮时触发
            5、mousemove：鼠标指针在元素内部移动时不断触发。
            7、mouseover：移入
            6、mouseout：移出
            8、mouseenter:移入，移到后代元素上不会触发，不冒泡
            9、mouseleave:移出，移到后代元素上不会触发，不冒泡
            注：只有相继触发mousedown和mouseup才会触发click,dblclick同理
                1、客户区坐标位置 
                    event.clientX 和event.clientY 事件发生时鼠标指针在视口中的水平和垂直坐标。
                2、页面坐标位置
                    event.pageX 和 event.pageY 鼠标在页面中的位置。坐标是从页面本身而非视口的左边和顶边开始计算的
                3、屏幕坐标位置
                    event.screenX 和 event.screenY 鼠标相对这个电脑屏幕的位置
                4、修改键
                    event.shiftKey、event.ctrlKey、event.altKey、event.metaKey（mac中相当于Cmd键，win中Windows键） 相应的键被按下了返回true，否则值位false
                5、相关元素
                    对mouseover而言，事件的主目标是获得光标的元素，而相关的元素就是那个失去光标的元素
                    对mouseout而言，事件的主目标是失去光标的元素，而相关元素就是那个获得光标的元素
                    DOM通过event.relateTarget提供相关元素信息，这个属性支队mouseover和mouseout事件才包含值
                    ie8之前：mouseover触发提供的fromElement，mouseout触发提供的是toElement
                6、对于mousedown和mouseup事件来说，event对象存在button属性，表示按下或释放的按钮。
                    event.button: 0表示鼠标左键，1表示中间的鼠标键（鼠标滚轮按钮），2表示鼠标右键
                7、event还提供一个detail属性，表示给定位置发生了多少次点击，如果鼠标在mousedown和mouseup之间移动了位置，detail重置为0

        4、滚轮事件
            mousewheel事件（所有浏览器都支持）
                当用户通过鼠标滚动与页面交互就会触发mousewheel事件。这个时间可以在任何元素上触发，最终冒泡到document或者window对象
                当鼠标向前滚动式event.wheelDelta是120的倍数，向后滚动式是-120的倍数。可以通过正负号判断滚动方向
            触摸设备
                1、不支持dblclick事件
                2、两个手指放在屏幕上页面对手指移动而滚动会触发mousewheel和scroll事件
                    document.onmousewheel = function(event){
                        console.log(event.wheelDelta);
                    }
        5、键盘与文本事件
            keydown:用户按下键盘上任意键触发
            keyup:用户释放键盘上的键时触发
            keydown：能够插入或删除字符的键都会触发
            注：所有元素都支持以上3个事件，但是文本框输入文本时最常用，keydown和keypress在文本框变化之前触发，keyup在文本框发生变化之后触发
                1、event.keyCode（建码）属性：对数字字母字符键keyCode的值与ASCII中对应小写字母或数字的编码相同
                2、event.charCode只有在发生keypress事件时才包含值，按下那个键代表字符的ASCII编码，String.fromCharCode()可以将其转化成实际字符
               DOM3级中event包含新的属性兼容问题不推荐使用。
                    1、event.key：按下某个键就返回相应的文本字符
                    2、event.char: 按下字符键与key相同，按下非字符键值为null
                    3、event.location/keyLocation: 表示按了什么位置上的键
            textInput：文本事件，用户在可编辑区域输入字符时触发。只有在按下能够输入实际字符的键才触发。
                    event.data: 用户输入的字符
                    event.inputMethod: 输入文本的方式（只有Ie支持）
        7、合成事件（复合事件）:当用IME（输入法编辑器）输入字符时触发；缺少支持，用处不大(compositionstart,compostionupdate,compositonend事件）
        8、变动（mutation）事件：当底层DOM结构发生变化时触发（13.4.6）
            DOMSubtreeModified: 在DOM结构发生任何变化时触发。这个事件在其他任何事件触发后触发。
            DOMNodeInserted：一个节点作为子节点被插入另一个节点中触发。
            DOMNodeRemoved: 节点从其父节点中被移除时触发。
            DOMNodeInsertedIntoDocument：一个节点被直接或间接插入文档之后触发。在DOMNodeInserted之后触发，不冒泡
            DOMNodeRemovedFromDocument：一个节点被直接或间接从文档中移除之前触发。在DOMNodeRemoved之后触发，不冒泡
            DOMAttrModified：在特性被修改之后触发
            DOMCharacterDataModified：文本节点的值发生变化是触发
        9、hTML5事件
            1、contextmenu事件，可以通过单击鼠标右键调出来上下文菜单。冒泡，通过event。preventDefault()取消默认上下文菜单。
            2、beforeunload事件，这浏览器unload页面之前触发，可以通过他来取消卸载并继续使用原页面。
                window.onbeforeunload = function(event){
                    var message = "你确定要离开该页面";
                    event.returnValue = message;
                    return message;
                }
            3、DOMContentLoaded事件：在形成完整的DOM树之后就会触发，不理会外部资源是否下载完毕。在load事件之前，可以在document和window上添加事件处理程序
                如果浏览器不支持该事件，可以使用代替（无法保证调用先后顺序）
                setTimeout(function(){}, 0) //在当前js处理完成后立即运行这个函数
            4、readystatechange事件
                这个事件的目的是提供与或元素的加载状态相关的信息，支持该事件的对象有一个readyState属性，包换下列5个值
                readyState: 1、uninitialized :对象存在尚未初始化
                            2、loading：对象正在加在数据
                            3、loaded： 对象数据加在完成
                            4、interactive： 可操作性对象，还没完全加在
                            5、complete：对象已加载完成
                对document而言，下列写法和DOMContentLoaded十分接近
                        document.addEventListener("readystatechange", function(){
                            if(document.readyState == "interactive" || document.readyState == "complete"){
                                //可交互状态
                                document.removeEventListener("readystatechange", arguments.callee)
                            }
                        })
                对于script和link元素，readyState等于loaded或者complete也可以确定外部文件是都已加载完成
            5、pageshow和pagehide事件
                浏览器有个特性叫"往返缓存"，可以在用户使用"后退"和"前进"按钮时加快页面的转换速度。实际上是将整个页面保存在内存里。如果页面位于内存中，
                那么在此打开该页面不会触发load事件。
                pageshow：在页面显示时会触发，不论页面是否来自内存中。正常在load事件之后触发。对于内存中的页面，pageshow会在页面状态完全恢复的那一刻触发。
                        虽然事件的目标是document，但是必须将其事件处理程序添加到window。
                        event.persisted:如果页面被保存在内部中该值时true
                pagehide：浏览器在卸载页面的时候会触发，在unload事件之前触发。其他同上
                        event.persisted：页面卸载之后保存在bfcache中，返回true
                        (function(){
                            var showCount = 0;
                            window.onpageshow = function(){
                                showCount++;
                            }
                        })()
                注：制定了unload事件处理程序的页面会自动排除在bfcache之外，即使事件处理程序是空的。
            6、hashchange事件
                URL参数列表的hash字符串发生变化时触发。事件处理程序添加给window对象，event对象包含两个属性oldURL和newURL
        10、设备事件
            1、orientationchange事件：苹果移动safari中用户切换查看模式时触发。在window上触发
                window.orientation: 0 代表肖像模式；90代表左旋转的横向模式；-90代表有旋转的横向模式；
            2、deviceorientation事件：设备方向改变时触发。
            3、devicemotion事件：设备移动时触发。
        11、触摸与手势事件
            1、触摸事件（都会冒泡，也可以取消，可以绑定到所有元素上）
                touchstart：当手指触摸屏幕时触发。
                touchmove：手指在屏幕上滑动时连续触发。（在这个期间调用preventDefault()可以阻止滚动）
                touchend：手指从屏幕上移开是触发。（期间只有changeTouches有值）
                touchcancel: 系统停止跟踪触摸时触发（如：触摸操作被alert打断）
                event对象会包含三个用于跟踪触摸的属性
                    touches：保存了当前所有触碰屏幕的手指信息(Touch对象的数组，数组的长度代表手指的个数
                    targetTouches：保存了当前对象上所有触摸点的列表;
                    changeTouches：保存了所有引发事件的手指信息
                        Touche对象包含以下属性clientX，clientY，pageX，pageY，screenX,screenY,
                                            identifier: 表示触摸的唯一ID
                                            target： 触摸的DOM节点目标
            2、手势事件
                当两个手指触摸屏幕会产生手势，手势会改变大小或者旋转显示项。
                gesturestart: 当一个手指已经按在屏幕上而另一个手又触摸屏幕时触发。
                gesturechange: 当屏幕上任何一个手指从屏幕上移开时触发。
                gestureend：任何一个手指从屏幕上移开时触发。
                    只有两个手指都触摸到同一个接收容器才会触发，事件可以冒泡到文档上。
                    event.rotation:手指引起的旋转角度，正值表示顺时针,负值表示逆时针
                    event.scale: 手指间距离的变化，距离变大增长，距离缩短变小
    5、内存和性能
        问题：
            1、事件处理程序是对象，会占用内存，越多性能越差
            2、指定事件处理程序会访问DOM，会延迟真个页面的交互就绪时间
            3、从文档中移除带有事件处理程序的元素，内存中留有哪些过时不用的"空事件处理程序"
        解决
            1、事件委托：利用事件冒泡，指定一个事件处理程序，管理一个类型的所有事件。只需在DOM数中尽量最高的层次添加处理程序
                document.body.onclick = function(event){
                    switch(event.target.id){
                        case "div1": alert(1);break;
                        case "div2": alert(3);break;
                    }
                }
            2、移除事件处理程序
    6、模拟事件和自定义事件（见13.6）
 ###############
 表单脚本
    1.表单的基础知识
        1、表单有form元素来表示，独有的属性和方法
            acceptCharset: 服务器能够处理的字符集
            enctype：请求的编码类型
            action: 接收请求的URL
            elements：表单中所有控件的集合（HTMLCollection）
            method: 发送的http请求类型
            name：表单的名称
            length： 表单中控件的数量
            reset(): 重置表单为默认值
            submit(): 提交表单
            target：用于发送请求和接收请求的窗口名称
        2、获取表单的引用document.getElementById()和document.forms
        3、提交表单
            <input type="sbumit/image" src="pic.jpg">都可以提交表单，发送请求前，会先触发submit事件。
            使用event.preventDefault()可以阻止表单提交。
            编程的方式提交表单form.submit(),注：这种方式不会触发submit事件
        4、重置表单
            type="reset"按钮来重置表单，会触发reset事件。preventDefault()取消重置，form.reset();
        5、表单字段
            可以使使用dom访问也可以通过form.elements属性访问表单字段
                form.elements[0] 或 form.elements[name]
            1、共有的表单字段属性
                disabled: 是否禁用
                form： 指向当前字段所属的表单
                name：当前字段名
                readOnly： 是否只读
                tabIndex： 当且字段的切换序号
                type： 字段类型。如：radio，checkbox
                value： 对于文件字段，这个属性只读，包含文件在计算机中的路径
                除form字段之外，都可以通过js动态修改
            2、共有的表单字段方法
                focus() 和 blur()
                h5新增一个autofocus属性，自动把焦点移动到相应的字段
            3、共有的表单字段事件
                blur
                focus
                change：对于input和textarea它失去焦点且value改变时触发，select选项改变时触发。
    2、文本框脚本
            两种文本框的表现形式：
                 <input size="能够显示的字符数" maxlength="最大字符数">
                 <textarea rows="" clos="">内容</textarea> //没有maxlength属性，值都保存在value属性中
                1、选择文本
                    1、select():选择文本框中->所有文本。这样用户就不必一个一个删除
                    2、选择（select）事件
                        用户选中文本（且释放鼠标）和调用select()方法时触发，作用于元素
                    3、取得选择的文本
                        textInput.value.substring(textInput.selectionStart, textInput.selectionEnd)
                        IE8及更早版本有一个document.selection对象保存正整个用户在文档范围内选择的文本信息（见12章）。用法如下
                            document.selection.createRange().text;
                    4、选择部分文本
                        textInput.setSelectionRange(第一个字符索引，最后一个字符索引)
                        ie8及更早版本
                            var range = input.createTextRange();
                            range.collapse(true) //起点终点指针归零
                            range.moveStart("character", 0) // 起点
                            range.moveEnd("character", 6) //终点
                            range.select();
                        注：想要看到选择的问题本，必须在方法调用之前或之后将焦点设置到文本框
                2、过滤输入
                    1、屏蔽字符
                        列：只允许输入数值
                            input.onkeypress = function(event){
                                var keyCode = event.keyCode;
                                if(!/\d/.test(String.fromCharCode(keyCode)) &&
                                    keyCode > 9 && //兼容个别浏览器
                                    !event.ctrlKey) { //解决复制粘贴及带ctrl的键操作问题
                                    event.preventDefault();
                               }
                            }
                    2、操作剪贴板事件
                        copy: 发生复制操作是触发
                        cut：发生剪切操作时触发
                        paste：发生粘贴操作时触发
                        beforecopy
                        beforecut
                        beforepaste
                        访问剪切板中的数据 event.clipboardData || window.clipboardData（ie）
                        clipboardData有三个方法
                            getData(数据格式)：ie两种格式"text"和"URL"，其他浏览器传入的是MIME类型
                            setData(数据格式，要放入的文本)：插入成功返回true
                            clearData
                                1、设置剪贴板中的数据
                                function setData(event, value){
                                    if(event.clipboardData){
                                        return event.clipboardData.setData("text/plain",value)
                                    }else if(window.clipboardData){
                                        return window.clipboardData.setData("text", value)
                                    }
                                }
                                2、只能粘贴数字
                                 inputText.onpaste = function(event){
                                    var text = event.clipboardData.getData("text");
                                    if(!/^\d*$/.test(text)){
                                        event.preventDefault();
                                    }
                                 }
                3、自动切换焦点: 前一个文本框的字符达到最大数量后，自动将焦点切换到下一个文本框。
                    input1.keyup = input2.keyup = function(event){
                        var target = event.target;
                        if(target.value.length == target.maxlength){ //长度达到最大值后
                            var elements = target.form.elements;
                            for(var i = 0; i < elements.length; i++){
                                if(elements[i] == target && elements[i+1]){
                                    elements[i+1].focus(); // 下个文本框自动获取焦点
                                }
                            }
                        }
                    }
                4、H5约束验证API
                    1、必填字段
                        required  <input type="text" required>适用于input、textarea、select
                        检查某个字段是不是必传 document.forms[0].element["name"].required
                        检测浏览器是否支持 required in document.createElement("input")
                    2、其他输入类型
                        type = "email / url" 自带默认验证功能
                        检测浏览器是否支持
                        var input  = document.createElement("input")
                        input.type = "email";
                        var isSupported = (input.type == "email")
                    3、数值范围（数值类型）
                        type = "number / range / datetime / datetime-local / data / month / week/ time"
                        1、属性：min、max、step
                        2、方法：stepUp()和stepDown()，接收一个可选参数，在当前基础上加上或减去的数值（默认加或减1）
                            input.stepUp(10);
                    4、输入模式
                        pattern属性，值时一个正则表达式。模式的开头和结尾不用加^$默认会有,submit提交时才会触发验证
                            例：只允许输入数字 <input pattern = "\d+">
                    5、检测有效性
                        1、checkValidity()验证表单中某个字段是否有效（依据上面介绍过的约束,例如require和pattern），返回布尔值。所有表单字段都有这个方法。
                            如果要检查这个表单就在form上调用 document.forms[0].checkValidity()
                        2、validity属性告诉你为什么字段有效或无效。这个对象包含一系列属性(都是布尔值)，如下
                            customError:
                            patternMisMatch: 是否与pattern属性匹配
                            rangeOverflow: 如果值比max大，返回true
                            等等......见书中14.3
                    6、禁用表单
                        <form novalidate>  表单不用验证
                        <input type ="submit" formnovalidate> 提交某个按钮不必验证
    3、选择框脚本（select）
        select元素属性和方法
            multiple: 是否允许多选
            options: 所有option元素的HTMLCollection
            selectIndex: 基于0的选中项索引，没有选中-1。多选时保留第一项
            size: 可见行数
            type: "select-one"和"select-multiple"
            value: 多个选中时只保存第一个
            add(newOption, relOption)
            remove(index)
        option元素属性：
            index：当前选项在options集合中的索引
            label：当前选项的标签
            selected: 当前选项是否被选中
            text： 选项中的文本
            value： 选项中的值
        1、选择选项
            单选时：selectbox.options[selectbox.selectIndex]
            多选是：遍历
            设置选中 selectbox.options[0].selected = true
        2、添加选项
            方式1： 常规dom操作
            方式2： Option构造函数
                var option = new Option(text, value)
                selectbaox.appendChild(option)
            方式3：
                selectAdd(newOption, undefined) 和  insertBefore()
        3、移除选项
                selectbox.removeChild(option)
                selectbox.remove(i)
                selectbox.options[i] = null
                注意：移除选项，每个选项index会重置，所以遍历删除第一个就可以
        4、移动和重排
            移动
                select1.appendChild(select2.option[i])
            重排
                var option = select.options[i];
                select.insertBefore(option, select.options[option.index -1]) 前移一个位置
                select.insertBefore(option, select.options[option.index +2]) 后移一个位置
    4、表单序列化
    5、富文本编辑
        富文本编辑，又称WYSIWYG（所见即所得），本质是在一个页面嵌入包含空的html的iframe。通过设置designMode属性为"on"，表示可被编辑(off不可被编辑)
            <iframe name="richedit" style="height: 200px;width: 400px;" src="blank.html"></iframe>
            window.onload = function(){
                frames["jay"].document.designMode = "on"; //注意：只有在页面加载完之后才能设置
            }
        另一种方式：在任何元素上添加contenteditable属性，有三个值 true可编辑，false关闭，inherit从父元素哪里继承
            <div contentEditable="true" ></div>
        1、操作富文本
            1、document.execCommand():对文档执行预编译命令，传递3个参数（执行的命令名称，false，执行命令必须的一个值，不需要传null）
                frame['richedit'].document.execCommand("italic", false, null)
                document.execCommand("italic", false, null)  //对contenteditable区块操作
            2、document.queryCommandEnable(命令名，如"italic") //是否可以（合适）对当前选择文本执行某个命令
            3、document.queryCommandState(命令名，如"italic") //确定是否已将指令应用到选择的文本
            4、document.queryCommandValue(命令名，如"italic") //取得执行命令时传入的值
        2、富文本选区（见14.5.3）
            富文本编辑器中，使用框架getSelection()方法可以确定选择的文本。这个方法在document和window对象上的属性，返回一个Selection对象
                frames[0].getSelection().toString() //获取选择的文本
        3、提交富文本内容
                frames[0].document.body.innerHTML
 ###################
 使用Canvas绘图
    具备基本绘图能力的2D上下文，还建议了一个名为WebGL的3D上下文。
    1、基本用法
        使用<canvas>必须设置width和height属性。标签中的内容为后备信息，不支持时显示。
        canvas对应的DOM对象上也有width和height属性，也可以通过css添加样式。
        1、toDataUrl(): 导出canvas上绘制的图像。接收一个参数，即图像的MIME类型格式
            var imageUrl = canvas.toDataUrl("image/png");
    2、2D上下文
        使用2d绘图上下文，可以绘制简单的2d图像。2d上下坐标始于canvas元素左上角，原点坐标是（0，0）
        1、填充和描边，2d上下文两种最基本的绘图操作
            fillstyle
            strokstyle
        2、绘制矩形（形状）
            fillRect();
            strokeRect();
            clearRect():
            这三个方法接收四个参数：矩形的x坐标，y坐标，矩形的宽度，高度。
            lineWidth：描边线条的宽度，任意整数
            lineCap：线末端的形状平头，圆头，方头（butt，round，square）
            lineJoin： 控制线相交的方式圆交，斜交，斜接（round， bevel，miter）
                 var canvas = document.getElementById("canvas");
                 var context = canvas.getContext("2d")
                 if(canvas.getContext){
                    context.fillStyle="red";
                    context.fillRect(10, 10, 50, 50);
                    context.strokeStyle = "green";
                    context.strokeRect(100, 100, 100, 100);
                    context.clearRect(20, 20, 20, 20);
                }
        3、绘制路径
            1、beginPath()表示开始绘制路径（我要开始画画了）
            2、arc(x, y, radius, startAngle, nedAngle, counterclockwise) :以x,y为圆心绘制一条弧线，半径是radius，最后一个参数false表示顺时针
            3、arcTo(x, y, x2, y2, radius): 从上一点开始绘制，到x2，y2为止，且以给定的半径radius穿过x，y
            4、bizierCurveTo(cx1,cy1,cx2,cy2, x, y)从上一点开始，以x，y为止，以cx1,cy1,和cx2,cy2为控制点绘制三次曲线
            5、quadraticCurveTo(cx, cy, x, y):绘制一个二次曲线
            6、rect(x, y, width, height) 从x，y点开始绘制矩形。这个方法绘制的是路径，而不是strokRect()和fillRect所绘制的形状
            7、lineTo(x, y)： 从上一点开始，到x，y结束绘制一天直线
            8、moveTo(x, y): 将绘图游标移动到x，y点
            9、closePath()如果想绘制一条连接到起点的线
            10、fill()：使用fillStyle填充路径
            11、stroke(): 使用strokeStyle对路径描边
            12、clip()：可以在路径上创建剪切区域
            13、isPointInPath(x，y)：确定x，y是否在路径上
        4、绘制文本
            1、fillText()和strokeText()，这个两个方法接收4个参数：要绘制的文本，x，y坐标，最大像素宽度（非必填项，支持不是很好）
            这个两个方法都以有下列3个属性为基础
                font： 文本的样式、大小及字体，用css指定字体格式来指定,例如"10px Arial"
                textAlign: 文本对齐方式，可能的值有"start","end","center","left","right"，不建议使用left和right
                            如果设置start表示x坐标是文本左边位置，"end"表示x坐标是文本右边位置
                textBaseline： 文本的基线：top, middle,bottom ,hanging, alphabetic, ideographic
                            如果设为top表示y坐标为文本顶端，设为bottom表示文本y坐标为文本底端
                            设为hanging, alphabetic, ideographic表示y坐标分别指向字体特定的基线坐标
             2、measureText(字符串)：利用font，textAlign，textBaseline的当前值计算指定字符串的大小，返回一个TextMertics,该对象只有一个width属性
                    document.measureText("hello").width
        5、变换
            rotate(angle): 围绕原点旋转图像angle弧度
            scale(scaleX, scaleY):缩放图片
            translate(x, y): 将坐标原点移动到x，y
            transform：(a, b, c, d, e, f) :直接修改矩阵
            setTransform(a, b, c, d, e, f): 将矩阵重置为默认状态，然后在调用transform修改矩阵
                             参数	描述
                             a	水平缩放绘图。
                             b	水平倾斜绘图。
                             c	垂直倾斜绘图。
                             d	垂直缩放绘图。
                             e	水平移动绘图。
                             f	垂直移动绘图。
            save(): 保存说有所有设置进一个栈结构，只会保存绘图上下文的设置和变换，不保存绘图上下文的内容
            restore()：回到之前保存的设置
                if(canvas.getContext){
                    var context = canvas.getContext("2d")

                    context.beginPath();
                    context.arc(100, 100, 90, 0, Math.PI*2, false);
                    context.moveTo(195, 100);
                    context.arc(100, 100, 95, 0, Math.PI*2, false);

                    context.translate(100, 100); //变换原点
                    context.rotate(45); // 旋转表针

                    context.moveTo(0, 0);
                    context.lineTo(0, -75);
                    context.moveTo(0, 0);
                    context.lineTo(-60, 0);

                    context.stroke();//描边路径

                }
        6、绘制图像
            drawImage(image对象/canvas元素, sx,sy,sw,sh,tx(必填),ty(必填),tw,th): s=source, t=target
                使用canvas.toDataUrl("image/png")导出，图片不能来自其他域
                例子： drawImage(document.images[0], 10, 10 ,100, 100) //将以10，10起点开始绘制出来的图像大小变成100*100
        7、阴影
            2d上下文一下几个属性，自动为形状或路径绘制阴影。需在绘制前设置适当的值
                shadowColor: 阴影颜色
                shadowOffsetX:
                shadowOffsetY:
                shadowBlur: 模糊的像素
        8、渐变
            渐变由CanvasGradient实例表示
            createLinerGradient(sx,sy, ex, ey)：创建线性渐变实例，接收4个参数，起点坐标sx，sy，终点坐标 ex, ey
            createRadialGradient(sx,sy,radius,ex,ey,radius): 起点圆的sx,sy及半径，终点圆ex，ey及半径
            渐变实例的方法：
                addColorStop(色标位置， css颜色值)：色标位置0（开始的颜色）到1（结束的颜色）之间数字

                    例子：var gradient = context.createLinearGradient(0, 0, 100, 100);
                         gradient.addColorStop(0, "red");
                         gradient.addColorStop(1, "green");

                         context.fillStyle = gradient; //渐变实例赋值给fillStyle和strokeStyle
                         context.fillRect(0, 0, 100, 100);
        9、模式： 其实是重复的图像，可以用填充或描边图形
            createPattern(image对象/canvas对象/video对象， 重复方式): 重复方式和background-repeat属性值相同
                例子:  var pattern = context.createPattern(img, "repeat");
                      fillStyle = pattern;
        10、使用图像数据
            getImageData(x,y,width,height)：获取原始数据，接收四个参数：取得数据在画面区域的x,y坐标及宽，高，返回imageData实例
                imageData实例：有三个属性：width，height，data。data是一个数组，保存着每个像素的数据。每个像素用红，绿，蓝，透明度四个元素来保存
            putImageData(imageData,x,y,dx,dy,width,height)：接收7个参数：imageData，imageData左上角的坐标x,y，放置在画布上的位置dx,dy及要绘制的宽，高
                                                             前三个参数必填
        11、合成
            context.globalAlpha :透明度，0-1之间的值
            context.globalCompositionOperation: 后绘制的图像怎样和先绘制的图像相结合
                "source-over"：默认值，后绘制的在先绘制的上方
                "source-in"：重叠部分可见，其他部分透明
                "source-atop"：重叠部分可见，先绘制的正常
                "source-out"： 不重叠的部分可见，先绘制的透明
                destination-over：后绘制的在先绘制的下面
                destination-in: 重叠部分可见，其他透明
                destination-atop: 重叠部分可见，后绘制的正常
                destination-out: 重叠部分不可见，后绘制透明
                lighter：重叠部分变亮
                copy: 后绘制的完全替代先绘制的
 ###############
 HMTL5脚本编程
    1、跨文档消息传递
        简称XDM（cross-document messageing），指来自不同域的页面间传递消息。目的是向另一个地方（当前页中的iframe或是当前页面的弹出的窗口）传数据
        核心是postMessage()方法:接收两个参数：一条消息，消息接收方来自哪个域的字符串（如果是*，表示可以把消息发送给任何域）
                    var iframeWindow = document.getElementById("myiframe").contentWindow;
                    iframeWindow.postMessage("hello","http://www.worx.com");
        接收XDM消息时，会触发window对象的message事件。message处理程序的事件对象包含以下3个重要信息
            event.data: 传入的字符串
            origin： 发送消息的文档所在的域：http://www.work.com
            source: 发送消息的文档的window对象代理。如果发送消息的窗口来自同一个域，那这个对象就是window。
                    注：不能通过这个source代理对象访问window上的任何信息，智能调用postMessage()
                    window.onmessage=function(event){
                        if(event.origin == "http://www.work.com"){
                            event.source.postMessage("收到", "http://p2p.worx.com")
                        }
                    }

    2、原生拖放
        1、拖放事件： 关键在于确定哪里发生了拖放事件，有些事件是在被拖动的元素上触发，而有些事件是在放置目标上触发
            拖动元素设置 draggable="true"
            1、拖动某元素时，（被拖动元素）依次触发下列事件
                dragstart：按住鼠标并开始移动鼠标时触发
                drag：触发dragstart后随即会触发drag，元素拖动期间连续触发
                dragend：拖动停止时，无论是否已放置有效目标都会触发
            2、当元素被拖动到一个有效放置目标上时，（放置目标的元素）依次触发下列事件
                dragenter：元素被放置到目标上时触发
                dragover：被拖动元素还在被放置目标范围内移动，持续触发
                dragleave：元素被拖出放置目标时触发，dragover不再发生
                drop：元素被放置到目标中时触发
        2、可拖动
            默认情况下，图片，链接，被选中的文本是可以拖动的。其他元素通过设置draggable="true/false"来控制是否可拖动
        3、自定义放置目标
            虽然所有元素都支持放置目标事件，但是元素默认是不允许放置的。可以取消dragenter和dragover事件的默认行为，把元素编程有效的放置目标
                注意：为了兼容firefox，drop事件也需要加
                dragTargetElement.ondragenter = 
                dragTargetElement.ondragover = 
                dragTargetElement.ondrap =function(event){
                    event.preventDefault();
                }
        4、dataTransfer对象
            它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。它有两个方法
            setData()： 两个参数：保存数据的类型和字符串。ie支持text和URL。h5加以扩展，允许各种MIME类型，也会向后兼容
                                浏览器默认行为，在拖动文本图片是时，浏览器会默认setData进去文本和图片url。
                                如果保存的是URL，如果你把它拖放置到另一个浏览器窗口中，浏览器会自动打开url
            getData()： 一个参数：数据类型。只能在drop事件中读取。
                        最终的兼容用法 :
                            event.dataTransfer.getData("url") ||  event.dataTransfer.getData("text/uri-list")//读取URL
                            event.dataTransfer.getData("Text") //读取文本
        5、dropEffect和effectAllowed
            确定被拖动元素以及作为放置目标的元素能够接受什么操作，属于dataTransfer对象的属性
            dataTransfer.dropEffect：被拖懂元素可以执行那些放置属行为。会导致光标显示不同符号。
                                    在dragenter事件中设置它。搭配effectAllowed才有用
                "none": 不能把拖动元素放在这里。这是除文本之外所有元素的默认值
                "move": 应该把拖动元素移动到放置目标
                "copy"：应该吧拖动元素复制到放置目标
                "link"： 表示放置目标会打开拖动元素（但拖动元素必须是一个链接，有URL）
            dataTransfer.EffectAllowed:表允许拖动元素的那种dropEffect，在dragstart事件中设置它
        6、其他成员(见16.2.6)
            dataTransfer.addElement()
            dataTransfer.clearData()
            dataTransfer.setDragImage()
            dataTransfer.types
    3、媒体元素
        <video>和<audio>
        视频文章：https://segmentfault.com/a/1190000020447062?utm_source=tag-newest
                 在视频/音频（audio/video）加载过程中，事件的触发顺序如下:
                 onloadstart （浏览器开始寻找指定资源）
                 ondurationchange （视频/音频 的时长发生变化时触发）
                 onloadedmetadata （指定视频/音频 的元数据加载后触发）
                 onloadeddata （当前帧的数据加载完成且还没有足够的数据播放）
                 onprogress （下载指定的视频/音频 时触发）
                 oncanplay （用户可以开始播放视频/音频 时触发）
                 oncanplaythrough （可以正常播放且无需停顿和缓冲时触发）
        因为并非所有浏览器都支持所有媒体格式，所以可以指定过个不同的媒体来源
            <video id="video">
                <source src="" type="">
                <source src="">
                不支持video
            </video>
             <audio id="video">
                 <source src="" type="">
                 <source src="">
                 不支持audio
             </audio>
        1、方法
            load()：重新加载音频或视频元素
            play(): 开始播放
            pause(): 暂停
            canPlayType(): 接收格式/编解码器字符串，返回probably，maybe，空字符串。
        2、属性：音频和视频共有的属性，通过这些属性可以知道媒体的的当前状态，其中很多属性可以直接在<video>和<audio>元素中设置
            src
            poster: 可以在加在视频内容期间显示一幅图像
            controls: 是否显示控件
            autoplay: 布尔值
            currentSrc: 返回音频或视频的url
            currentTime: 已播放的秒数（当前的播放位置）
            defaultMuted： 设置或返回默认是否静音
            muted：设置或返回是否静音
            defaultPlaybackRate： 设置或返回默认的播放速度
            duration: 视频/音频时长
            ended: 播放是否结束
            loop：是否在结束是重新播放
            networkState: 当前的网络链接状况。0 音频/视频尚未初始化，1音频/视频是活动的且已选取资源，但并未使用网络，
                                            2浏览器正在下载数据，3未找到音频/视频来源
            readyState： 返回音频/视频就绪状态。0 没有关于音频/视频是否就绪的信息，1 关于音频/视频就绪的元数据，
                                            2 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒，
                                            3 当前及至少下一帧的数据是可用的，4 可用数据足以开始播放
            paused:是否暂停
            preload: 音频或视频是否在页面加载后加载，三种可能 auto、metadata、none
            seeking: 用户是否在音频或视频中进行查找
            volume: 返回或设置音量 0-1之间
            videoHeight: 视频高度，不是元素高度
            videoWidth: 视频宽度，不是元素宽度
        3、事件
            abort: 播放被中断时触发
            canplay： 可播放是触发
            canplaythrough: 可播放，而且不会因为缓冲而中断时触发
            durationchange: 音视频时长duration值改变时触发。
            emptied: 网络连接关闭、媒体被清空时触发
            ended：播放列表结束时触发
            error： 加载期间发生错误时触发
            loadeddata：媒体的第一帧加载完毕
            loadedmetadata： 媒体的元数据加载完成时触发
            loadstart：媒体开始下载时触发
            pause： 暂停时触发
            play： 接收指令开始播放时触发
            playing：实际开始播放时触发
            process: 正在下载时触发
            ratechange： 播放速度改变时触发
            seeking： 正在移动到新位置
            seeked： 已经移动到新位置
            stalled：在尝试获取媒体数据，但数据不可用时触发。
            suspend： 在媒体资源加载终止时触发，这可能是因为下载已完成或因为其他原因暂停。
            timeupdate： currentTime表示的时间改变时触发
            volumechange： 音量改变是触发
            waiting： 视频需要缓冲下一帧而停止时触发。
        4、Audio类型
            audio元素还有一个原生的js构造函数Audio，和Image相似，但是不必插入文档，只需要创建一个带有音频源文件的实例即可。
                var audio = new Audio("sound.mp3");
                audio.oncanplaythrough = function(){
                    audio.play();
                }
            注： 在ISO中调用play会弹出对话框得到用户许可才能播放。如果在音频播放完后再播另一段，必须在onfinish事件中调用play();
    4、历史状态管理
        通过状态管理api，可以在不加载新页面的情况下改变浏览器的URL。
        1、history.pushState(stateObject, title, url)：接收三个参数：title没有浏览器支持，传空字符串比较安全。
                                                    url: 必须与当前URL同源，不传默认当前URL。
                                                    执行后，新的状态信息被加入历史状态栈，url会改变。但是浏览器不会真的向服务器发请求。
        2、使用后退按钮时会触发window的popstate事件，通过event.state接收stateObject状态对象数据
            例子：
                history.pushState({name: "js"},"","#abc")
                window.onpopstate = function(event){
                    console.log(event.state); //history.state也可以获取该值
                }
        3、使用replaceState(stateObject, title)重现当前状态
 ###################
 错误处理和调试
    1、try-catch语句
        1、try{

            }catch(error){
                console.log(error.message); //message属性时所有浏览器都兼容的
            }finally{
                //肯定会执行，即使前面语句块里有return语句
            }
        2、错误类型
            Error（其他错误类型都继承自该类型）
            EvalError
            RangeError
            ReferenceError
            SyntexError
            TypeError
            URIError
        3、抛出错误（throw + 任意类型的值）
            throw “111”
            throw new Error("出错了")
            抛出自定义的错误
                        function CustomError(message){
                            this.name = "CustomError";
                            this.message = message;
                        }
                        CustomError.prototyp = new Erorr();
            throw new CustomError("自定义错误")   
        4、错误事件error
            没有通过try-catch处理的错误都会触发window对象的error事件
            1、window.onerror = function(message, errorURL, lineNumber){
                //只要发生错误，无论是不是浏览器生成的都会触发
                }                    
            2、图片也支持error事件
        5、常见的错误类型
            1、类型转换错误。例子：进行boolean值判断时忽略了0
            2、数据类型错误。例子：函数让你传数组进来，你传了字符串报错
            3、通信错误 。例子：发送请求时，没有使用encodeURIComponent();     
        6、致命序错误与非致命错误：判断依据是否影响主流程。
        7、把错误记录到服务器
            function logError(sev, msg){
                var img = new Image();
                img.src="url?sev=sev&msg=msg";
            }               
            优势：1、Image对象所有浏览器都支持。2、避免跨域限制。3、记录错误过程中出现问题概率低
#########################
JSON 
    (JavaScript Object Notation)javascritp对象表示法。它只是一种数据格式。
    1、语法
        json语法可以表示以下三种种类型的值：简单值、对象、数组
        1、简单值
            可以在json字符串中表示，字符串，数值，boolean，null。不支持undefined，变量，函数，实例对象
            js字符串和json字符串区别，json字符串必须用双引号
        2、对象
            js字面量
                var person = {
                    name : "jay"
                }
            json对象
                {
                    age: 10,
                    "name": "jay" //json对象的属性名必须加双引号，单引号也不行
                }
    2、JSON对象
        JSON.stringify()：js对象序列化json字符串。注：值为undefined的任何属性都会被跳过。
        JSON.parse(): 把json字符串解析为原生js值
        1、序列化选项
            JOSN.stringfy()除了要序列化的选项，还接受另外两个参数。第一个参数是过滤器（数组或函数），第二个参数是选项，表示是否在json字符串中保留缩进。
            1、数组参数：序列化的结果只包含数组中列出的属性。
            2、函数参数：传入的函数接收两个参数：属性和属性值
                JSON.stringify(person, function(key, value){
                    switch(key){
                        case "age": 
                            return key+10;
                        case "name":
                            return undifined; //相当于删除该属性
                        default: 
                            return value; //必须提供，保证其他值返回正常
                    }
                })
            3、字符串缩进参数：控制结果中的缩进和空白符。这个参数可以使数值，表示缩进的空格数（最多10个空格）。如果这个参数是字符串，缩进的空格将被这个字符串代替。
                JSON.string(person, null, 4);
         2、JSON.parse()也可以接受另一个参数：该参数时函数，该函数接受两个参数，一个键和值
######################### 
Ajax和Comet
    ajax：Asynchronous Javascript + XML 的简写。这技术能够向服务器请求额外的数据而无须卸载页面，带来更好的用户体验。
    核心是：XMLHttpRequest对象。
    1、XHR的用法
        xhr.open(请求类型，请求URL，是否异步)：不会发请求，知识启动一个请求以备发送。只能同域。
        xhr.send(作为请求主体发送的数据)：xhr最初设计是为了处理xml，因此可以在此传入xml dom文档。也可以传任何字符串。
        1、收到响应后，会自动填充xhr对象的属性
            xhr.responseText: 作为响应主体被返回的文本
            xhr.responseXML：如果响应的类容类型是“text/html”或“application/xml”，这个属性将保存着响应数据的XML DOM文档
            xhr.stateText: http状态的说明。
            xhr.state: 响应的http状态。如果状态是200，表示响应成功返回。304表示请求资源并没有被修改，可直接使用浏览器中缓存的版本。
        2、异步情况
            xhr.readyState:请求/响应过程中当前的活动阶段
                0：表示未初始化。尚未调用open()方法
                1：启动。调用open()，未调用send()
                2：发送。已调用send()，尚未收到响应
                3：接收。已接收到部分数据
                4：已接收全部数据，可在客户端使用了。
            xhr.onreadystatechange事件监听着readyState值得变化。必须放在open()之前，才能确保兼容性。 
            xhr.abort(): 在接收到响应之前，可以取消异步请求。   
        3、HTTP头部信息
            每个http请求和响应都会带有响应的头部信息。
            默认情况下，xhr请求头部信息：
                Accept: 浏览器能够处理的内容
                Accept-Charset: 浏览器能够显示的字符集
                Accept-Encoding：浏览器能够处理的压缩编码
                Accept-Language：浏览器当前设置的语言
                Connection： 浏览器与服务器之间的链接类型
                Cookie：当前页面设置的任何Cookie
                Host：发出请求的页面所在的域
                Referer：发出请求页面个的URI
            xhr.setRequestHeader(头部字段名称, 值)：可以设置自定义的头部信息。必须在open()之后send()之前调用
            xhr.getResponseHeader(头部字段名称): 对的key对应的值
            xhr.getAllResponseHeader: 取得包含所有头部信息的长字符串。
        4、GET请求
            常用于向服务器查询某些信息。URL携带的查询字符串必须使用encodeURIComponent()进行编码。
        5、POST请求
            常用于向服务器发送应该被保存的数据。
            默认情况下，服务器对POST请求和提交web表单请求不会一视同仁，因此服务器必须从中解析出有用的部分。
            不过我们可以通过设置头部信息Content-Type为application/x-www-form-urlencode来模拟表单提交
        6、列子        
            var xhr = new XMLHttpRequest();
            xhr.onreasystatechange = function(){
                if(xhr.readyState == 4 && (xhr.state == 200 || xhr.state == 304)){
                    console.log(xhr.responseText);
                }
            }
            xhr.open("post", url, true)
            xhr.setRequestHeader("Content-Type"，"application/x-www-form-urlencode")； //模拟表单提交
            xhr.send("a=1&b=2&c=3")   
    2、XMLHttpRequest 2级
        1、FormData：为序列化表单以及创建和表单格式相同的数据提供了方便。formdat实例可以直接传入send()方法里。
            方式1：
                var data = new FormData();
                data.append("name", "jay");
            方式2：
                var data = new FormData(document.forms[0])
                xhr.open("post", ulr, true);
                xhr.send(data)// xhr可以识别formdata实例，并配置适当的头部信息
        2、超时设定
            xhr.timeout：表是请求在等待响应多少毫秒时候终止。还会触发timeout事件.
            xhr.tiemout  = 1000;
            xhr.ontimerout = function(){

            }
        3、overrideMimeType()，用于重写xhr响应的mime类型，在send()之前调用
            xhr.open()
            xhr.overrideMimeType("text/xml")
            xhr.send()
    3、进度事件(最早针对xhr)
        loadstart: 接收到响应数据第一个字节时触发
        progress: 接收到响应期间不断的触发。该事件处理函数会接收到一个event对象，其target指向xhr，还包含额外三个属性：lengthComputable进度信息是否可用，
                position表示已接收的字节数，totalSize表示根据Ctent-Length响应头部确定的预期字节数。这些信息可以创建一个进度指示器。
                该事件必须在xhr.open()之前触发

        error:  请求发生错误时触发
        abort:  因调用abort()方法中断时触发
        load:  接收到完整的响应数据时触发。引入时为了代替readystatechange事件。该事件接收到响应就会触发，不管其状态，所以status必须要检查
                xhr.onload = function(){
                    if(xhr.status == 200 || xhr.status == 304){

                    }
                }
        loaded: 通信完成或者触发error、abort、load事件后触发。
    4、跨域资源共享
        ajax主要限制源于跨域安全策略。默认情况下xhr对象只能访问与包含它的页面位于同一个域的资源。
        CORS（Cross-Origin Resource Sharing）：定义了在必须访问跨域资源时，浏览器与服务器应该如何沟通。
        背后基本思想： 使用自定义的http头部让浏览器与服务器进行沟通，从而决定请求或响应是否应该成功
        比如：一个简单的get或post发送请求，他没有自定义头部，而主题内容是text/plain。在发送该请求是，需要给他附加额外的Origin头部
                Origin： http://www.xxx.com
            如果服务器认为这个请求可以接收，就在Access-Control-Allow-Origin头部返回相同的原信息（如果是公共资源可回发*），如
                Access-Control-Allow-Origin： http://www.xxx.com

####################
高级技巧
    1、高级函数
        1、安全的类检测
            function isArray(value){
                return Object.prototype.toString(value) == "[object Array]"
            }
        2、作用域安全的构造函数
            function Person(name){
                if(this instanceof Person){
                    this.name = name
                }else{
                    return new Person(name);
                }
            }
        3、惰性载入函数：表示函数执行的分支只会发生一次；
            方式1：
                function createPerson(){
                    if(a == 1){
                        createPerson = function(){
                            return new Person()
                        }
                    }else{
                        createPerson = function(){
                            return new Student();
                        }
                    }
                    return createPerson();
                }
            方式二：
                var ceratePerson = (function(){
                    if(a == 1){
                        return new Person();
                    }else{
                        return new Student();
                    }
                })()
        4、函数绑定：要创建一个函数，可以在特定的this环境中以指定参数调用另一个函数。
                var handler = {
                    message: 'event handled',
                    handleclick = function(event){
                        console.log(this.message, event.type)
                    }
                }
                btn.addEventListener("click", function(event){
                    handler.handleClick(event)
                })
                function bind(fn, context){
                    return function(){
                        return fn.apply(context, arguments);
                    }
                }
                btn.addEventListener("click", bind(handler.handleClick, handler))
                btn.addEventListener("click",handler.handleClick.bind(handler))
        5、函数柯里化：把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
                    并且返回接受余下的参数而且返回结果的新函数的技术。例如复用
                function bind(fn, context){
                    var args = Array.prototype.slice.call(arguments, 2);
                    return function(){
                        var innerArgs =  Array.prototype.slice.call(arguments, 0);
                        var finalArgs = innerArgs.concat(innerArgs);
                        return fn.apply(context, finalArgs);
                    }
                }
    2、防篡改对象
        开发人员头疼的问题：任何对象都可以被在同一环境下运行的代码修改。ES5新怎了几种方法，指定对象行为。注意：一旦把对象定义为防篡改，就无法撤销。
        1、不可扩展对象
            1、Object.preventExtensions(obj)：对已有成员没有影响,可以修改和删除已有的成员。
                var person = {name : "jay"};
                Object.preventExtendisons(person); //不能再给对象添加属性和方法
                person.age = 29; //没用了
            2、Object.isExtensible(obj) 检测对象是否可扩展
        2、密封的对象
            1、Object.seal(obj): 密封对象不可扩展，而且已有成员[[configurable]]被设为true。这意味着不能删除属性和方法
            2、Object.isSeal(obj): 确定对象是否密封
        3、冻结对象
            1、Object.freeze(obj): 冻结对象及不可扩展，又是密封，而且对象的[[Wirtable]]为false。
            2、Object.isFrozen()
    3、高级定时器
        1、重复定时器
            setTimeout(function(){
                //处理代码
                setTimeout(arguments.callee, interval)
            }, interval)
        2、数组分块 
            好处：可以将多个项目的处理在执行队列上分开，在每个项目处理之后，给与其他的浏览器处理机会，避免长时间运行脚本的错误。
            脚本长时间运行：过长，过深嵌套函数调用或大量处理的循环。javascript的执行是一个阻塞操作，脚本运行所花时间越久，用户与页面交互的时间也越久。
            该处理是否必须同步完成？数据是否必须按顺序完成？
                function chunk(arr, process, context){
                    setTimeout(function(){
                        var item = arr.shift();
                        process.call(context, item);

                        if(arr.length > 0){
                            setTimeout(arguments.callee, 100)
                        }
                    }, 100)
                }
        3、函数节流和函数防抖：两者都是优化高频率执行js代码的一种手段。
            函数节流: 是指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。
                function throttle(fn, context){
                    var canRun = true;
                    return function(){
                        if(!canRun) return;
                        canRun = false;
                        setTimout(function(){
                            fn.call(context);
                            canRun = true;
                        }, 100)
                    }
                }
            函数防抖: 是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。
                function debounce(method, context){
                    clearTimeout(mehod.id)
                    mehod.id = setTimeout(function(){
                        method.call(context);
                    }, 100)
                }
    4、自定义事件
    5、拖放
        var Drag = function(){
            var dragging = null;
            var diffX = 0;
            var diffY = 0;
            function handleEvent(event){
                console.log(event.type);
                switch(event.type){
                    case "mousedown":
                        dragging = event.target;
                        diffX = event.clientX - dragging.offsetLeft;
                        diffY = event.clientY - dragging.offsetTop;
                        break;
                    case "mousemove":
                        if(dragging){
                            dragging.style.left = event.clientX - diffX + "px";
                            dragging.style.top = event.clientY -diffY + "px";
                        }
                        break;
                    case "mouseup":
                        dragging = null;
                        break;
                }
            }
            return {
                enable: function(){
                    document.addEventListener("mousedown", handleEvent);
                    document.addEventListener("mousemove", handleEvent);
                    document.addEventListener("mouseup", handleEvent);
                },
                disable: function(){
                    document.removeEventListener("mousedown", handleEvent);
                    document.removeEventListener("mousemove", handleEvent);
                    document.removeEventListener("mouseup", handleEvent);
                }
            }
        }()
        Drag.enable();
        
################
23、离线应用和客户端存储
    离线web应用： 设备不能上网的情况下仍然可以运行的应用。
    1、离线检测
        navigator.online： 检测网络是否在线
        online事件和offline事件，在window上触发
    2、HTML5的应用缓存（application cache）    
        是从浏览器缓存中分出一块缓存，要想在这个缓存中保存数据，可使用描述文件（manifest file）列出要下载和缓存的资源。
        <html manifest="/offline.manifest"></html>
        缓存API核心applicationCache对象。
    3、数据存储
        1、Cookie最初是在客户端用于存储会话信息的。
            1、限制：cookie是绑定在特定域名下的。当设定cookie后再给创建它的域名发送请求的时候会包含这个cookie
                1、cookie个数限制，浏览器限制标准不一。
                2、cookie尺寸大小限制，一个于下的所有cookie不超过4095B
            2、cookie构成
                名称：不区分大小写。cookie的名称必须经过URL编码。
                值：必须被URL编码。
                域：cookie对那个域有效。所有向该域发送的请求都可以包含这个cookie信息。这个值可以包含子域。
                路径：对于指定域名的那个路径，应该向服务器发送cookie。
                失效时间：表示cookie何时应该删除的时间戳。默认情况下，浏览器会话结束时即将所有cookie删除。
                        也可自己设置。这个是值时GTM格式的日期。如果你设置以前的时间，cookie会被立刻删除。
                安全标志：cookie只有在使用SSL连接的时候才被发送到服务器。
                注：每一段信息使用分号加空格隔开。
                Set-Cookie: name=value; domain=.worx.com; path=/; secure;
            3、js中的cookie
                1、获取cookie：document.cookie：返回当前页面可用的所有cookie字符串。
                2、设置cookie：document.cookie = name=value; expires=time; path=path; domain=domain; secure
            4、cookie工具类
                var cookieUtil = {
                    get:function(name){
                        var cookieName = encodeURIComponent(name)+"=";
                        var cookieStart = document.cookie.indexOf(cookieName);
                        var cookieValue = null;
                        if(nameStart > -1){
                            var valueEnd;
                            valueEnd = document.cookie.indexOf(";", cookieStart);
                            if(ValueEnd == -1){
                                valueEnd = document.cookie.length;
                            }
                            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length, valueEnd))
                        }
                        return cookieValue;
                    },
                    set: function(name, value, expires, path, domian, secure){
                        var cookieText = encodeURIComponent(name)+ "=" +encodeURIComponent(value);
                        if(expires instanceof Date){
                            cookieText += "; expires" + expires.toGTMString();
                        }
                        if(path){
                            cookieText += "; path" + path;
                        }
                        if(domain){
                            cookieText += "; domiain" + domian;
                        }
                        if(secure){
                            cookieText += "; secure";
                        }
                        document.cookie = cookieText;
                    }
                    unset: function(name, path, domian, secure){
                        this.set(name, "", new Date(0), path, domian, secure)
                    }
                }
            5、子cookie: 担心单域名的cookie上限，会考虑子cookie这个备用方案。
                name=name1=value1&name2=value2
            6、思考： cookie信息越大，完成对服务器请求的时间就越长。尽可能少的在cookie中存储信息，避免影响性能。
        2、web存储机制
            目的：克服cookie带来的一些限制，提供了一种存储大量可以跨会话存在的数据的机制。
            1、Storage类型
                1、限制：最大存储空间因浏览器而异，最多5M。它们都特定于页面的协议。只能访问同域下的数据。
                2、属性： length
                3、方法： getItem(name)
                        setItem(name, value)
                        removeItem(name, value)
                        key(index): //用于迭代循环
                        clear()： 删除所有值
                4、实现
                    localStorage - 没有时间限制的数据存储
                    sessionStorage - 针对一个 session 的数据存储。当用户关闭浏览器窗口后，数据会被删除。
                5、storage事件
                    对Storage对象进行任何修改都会触发。该事件对象event对象有以下属性：
                    domain: 发生变化的存储空间的域名
                    key：设置或者删除的键名
                    newValue: 如果是设置，设置的新值；如果是删除，则是null
                    oldvalue: 键被更改之前的值。
                    document.onstorage = function(event){}
################//
24、最佳实践
    1、性能
        1、注意作用域：访问全局变量是要比访问局部变量要慢，因为要遍历作用域链。
            1、避免全局查找。
                function Ui(){ var doc = document}
            2、避免with，with语句会创建自己的作用域，一次会增加执行的代码作用域链长度。
        2、选择正确的方法
            1、避免不必要的属性查找
                var url = window.location.href
            2、优化循环
                1、减值迭代 2、简化终止条件 3、简化循环体 4、使用后测试循环
                for(var i = arr.length; i >= 0; i--){ }
            3、展开循环
            4、避免双重解释
                setTimeout("alert('hello')", 100)
        3、最小化语句数： 完成多个操作的单语句要比完成单个操作的多语句快。
            1、多个变量声明
                var a = 1, b= 2, c= 3;
            2、插入迭代值
                var name = value[i++]
            3、使用数组和对象字面量
                var arr = [1, 2, 3];
        4、优化DOM交互
            1、最小化线程更新，如：fragment
            2、使用innerHTML
            3、使用事件代理
            4、主要HTMLCollection，访问HTMLCollection的方法和属性都要在文档上进行一次查询，这个查询是昂贵的。
#####################
25、新兴的API
    1、requestAnimationFrame();
        function draw(){
            //业务逻辑
            requestAnimationFrame(draw)
        }
        requestAnimationFrame(draw)
    2、Page Visibility API
        不知道用户是不是正在与页面交互，这是困扰广大web开发人员的主要问题。
        1、document.hidden ：表示页面是否隐藏的布尔值
        2、document.visibilityState : 兼容性不好，暂不用
        3、visibilitychange事件： 文档可见和不可见之间切换时触发
            document.onvisibilitychange = function(){}
    3、Geolocation API
        navigator.geolocation对象包含三个方法
        1、getCurrentPostion(successFn, failFn, options)：
            1、successFn函数接收一个Position对象，该对象有两个属性coords和timestamp。coords对象包含位置信息： latitude，longitude，accuracy
            2、failFn函数，接收error参数，改参数有两个属性message和code
            3、options选项对象，可设置三个值 enablehighAccuracy表示是否获取最准确的位置信息；
                timeout表示等待位置信息最长时间；maximumAge表示上次取得坐标信息的有效时间
        2、watchPosition(successFn, failFn, options): 跟踪用户位置，返回watchId
        3、clearWatch(watchId)：取消跟踪用户位置
            navigator.geolocation.getCurrentPosition(function(position){
                console.log("success",position);
            }, function(error){
                console.log("error",error);
            },{
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            })
    4、File API
        event.target.files
        1、File对象的属性（只读）
            name：文件名
            size: 文件字节大小
            type：文件的MIME类型
            lastModifiedDate： 文件上次修改时间
        2、FileReader类：实现了一种异步文件读取机制
            方法：
                readAsText(file, encoding): 以纯文本形式读取文件，读到的文件保存在reader.result中。第二个参数指定编码类型，可选
                readAsDataURL(file): 读取文件并以数据RUL的形式保存在result中
                readAsBinaryString(file): 读取文件并将一个字符串保存在result中
                readAsArrayBuffer（file）：读取文件并将一个包含内容的ArrayBuffer保存在result中
                abort()：中断读取过程，触发abort事件
            事件：
                progress：每过50ms左右出发一次,事件对象event的属性：lengthComputable，loaded，total。也可以通过result读取文件类容
                error：相关信息保存在reader.error中，该属性有一个code错误码：1未找到文件；2安全性错误；3读取中断；4文件不可读；5编码错误
                load：如果发生error事件就不会发生load事件
                abort：
                loadedn： 在触发load，error，abort之后会触发。
        3、读取部分内容
            file.slice()方法：两个参数：起始字节数和要读取的字节数。返回一个Blob实例，是File的父类也支持slice。
        4、对象URL
            也不称为blob URL,指的是引用保存在file或Blob中数据的URL
            1、创建引用：window.URL.createObjectURL(file)，返回url，在dom中也可以使用
            2、释放引用：window.URL.removeObjectURL(url)
        5、读取拖放文件
            drop事件中读取event.dataTranfer.files
        6、使用XHR上传文件
            以表单的提交方式来上传文件
            data = new FormData();
            data.append("fileName", file)
            xhr.send(data);
        7、代码示例
            function uplaodFile(event){
                var filesInput = document.getElementById("files");
                filesInput.addEventListener("change", function(event){
                    var files = event.target.files,
                        reader = new FileReader();
                    for(var i =0 ;i < files.length; i++){
                        var file = files[i];
                        console.log("file:", file.name, file.type, file.size);
                        // reader.readAsText(file.slice(0, 100));
                        reader.readAsDataURL(file);
                        // reader.readAsBinaryString(file);
                        reader.onload = function(){
                            console.log("load:: ", reader.result);
                        }
                        reader.onprogress = function(event){
                            console.log("progress: ", event.lengthComputable,event.loaded,event.total);
                        }
                        reader.onerror = function(){
                            console.log("error: ", reader.error.code)
                        }
                    }
                })
            }
    5、web计时： 给出页面加载和渲染过程中的很多信息，对优化非常有价值。见25.5
        window.performance
    6、Web Workers
################## 
附录A
    1、常量： const声明的变量在初始赋值后，就不能再重新赋值
    2、块级作用域： 
        1、使用let定义的变量在定义他的代码块之外无效
        2、创建let语句，在其中定义只能在后续代码块中使用的变量
            let (num = 10, multiplier = 2){alert(num * multiplier)}
        3、创建let表达式，其变量只能在表达式中定义
            var result = let(num = 10, mum2 = 2) num * num2;
    3、函数
        1、剩余参数和分布参数： 三个点后面跟标识符
            function sum(num1, num2, ...nums){} // 剩余参数：在定义函数时使用
            var result = sum(...[1, 2, 3]) //分布参数：在函数调用时使用
        2、默认参数
            function(num1, num2 = 10){}
        3、生成器
            function* myNumbers(){
                for(var i = 0; i< 3; i++){
                    yield i * 2;
                }
            }
            var generator = myNumbers();
            console.log(generator.next());
            console.log(generator.close()); //执行原函数中其他部分。
        4、数组及其他结构
            1、迭代器
                var colors = [1,2,3,4]
                var iterator = new Iterator(colors);
                var iterator = new Iterator(colors, true); //只返回属性名或索引
                iterator.next();
            2、数组领悟： 指的是用一组符合某个条件的值来初始化数组。
                arr = [value for each(variable in values) condition]
                var numbers = [1,2,3,4,5,6,7];
                var duplicate = [i for each (i in numbers)]; //复制数组
                var newArr = [i*2 for each (i in numbers) if(i%2 == 0)] //把每个偶数乘以2后的结果放到新数组中
            3、解构赋值:
                从一组数值中挑出一个或多个值，然后把它们分别赋值给独立的变量。传统的js中数组字面量是不能出现在等于号左边的
                var [name, value] = ["color", "red"]
                var [, value] = ["color", "red"]
                var {name: personName} = {name: "jaychou"}
        5、新对象类型
            1、代理对象
            2、代理函数
            3、映射与结合
                1、Map类型：也称简单映射，能够做到键和值与对象属性分离，从而保证对象属性的安全存储。
                    var map = new Map();
                    map.set("name", "jaychou")
                    map.has("name"): //true
                    map.get("name")
                    map.delete("name");
                2、Set类型： 集合就是一组不重复的元素，只有键
                    var set = new Set();
                    set.add("name");
                    set.has("name"); // true
                    set.delete("name")
        6、类
            class Person{
                constructor(name){
                    this.name = name
                }
                sayName(){
                    return this.name;
                }
            }


            

            
            














































































 */

