/**
 
1、Vue实例属性
2、模板语法
3、计算属性和侦听器
4、Class 与 Style 绑定
5、条件渲染
6、列表渲染
7、事件处理
8、表单输入绑定
9、组件基础
10、深入了解组件
10.1组件注册
10.2Prop
10.3 自定义事件
10.4插槽
10.5动态组件和异步组件
10.6 处理边界情况
11、过度和动画
11.1 进入/离开 & 列表过渡
12、可复用性和组合
12.1混入
12.2 自定义指令
12.3 渲染函数&jsx
1、Vue实例属性
1、当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的。
也就是说如果你添加一个新的属性，比如：
vm.b = 'hi'
那么对 b 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，
那么你仅需要设置一些初始值。

2、除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来。例如：
vm.$data === data // => true
vm.$el === document.getElementById('example') // => true
// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})

3、实例生命周期钩子
生命周期钩子的 this 上下文指向调用它的 Vue 实例

2、模板语法
1、文本
通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：
<span v-once>这个将不会改变: {{ msg }}</span>

2、原始html
双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：
这个 span 的内容将会被替换成为属性值 rawHtml
<span v-html="rawHtml"></span>

3、使用js表达式
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>

模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。
4、动态参数
从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：
<a v-bind:[attributeName]="url"> ... </a>
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>

3、计算属性和侦听器
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () { //只在相关响应式依赖发生改变时它们才会重新求值
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')// 有依赖关系。
    }
  },
  watch: {
    firstName: function (val, oldVal) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})

4、Class 与 Style 绑定
1、绑定html class
用法一：绑定的数据对象内联定义在模板中
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
用法二：放在data中
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
用法三：计算属性
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
用法四：数组语法
<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

2、绑定内联样式
用法一：
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
用法二：直接绑定对象上
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
用法三：数组语法
<div v-bind:style="[baseStyles, overridingStyles]"></div>
添加前缀
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

5、条件渲染
v-if 和v-show
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else-if="name==jay">jay chou </h1>
<h1 v-else>Oh no </h1>
1、在 <template> 元素上使用 v-if 条件渲染分组
<template v-if="ok" key="username-input">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可：

6、列表渲染
1、你也可以用 of 替代 in 作为分隔符
    <li v-for="(item, index) in items">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
2、你也可以用 v-for 来遍历一个对象的属性。
    <div v-for="(value, name) in object">
      {{ name }}: {{ value }}
    </div>
3、为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性：
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
4、变异方法
    Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
    push()、pop()、shift()、unshift()、splice()、sort()、reverse()
     // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)
    vm.$set(vm.items, indexOfItem, newValue)
    // Array.prototype.splice
    vm.items.splice(indexOfItem, 1, newValue)   
    vm.items.splice(newLength) //对应arr.length=2这种用法
5、对象变更检测注意事项：
    对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。
    但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。
    var vm = new Vue({
      data: {
        userProfile: {
          name: 'Anika'
        }
      }
    })
    Vue.set(vm.userProfile, 'age', 27)
    vm.$set(vm.userProfile, 'age', 27)
    有时你可能需要为已有对象赋值多个新属性
    vm.userProfile = Object.assign({}, vm.userProfile, {
      age: 27,
      favoriteColor: 'Vue Green'
    })
6、显示过滤/排序后的结果
    计算属性或者如下方法
    <li v-for="n in even(numbers)">{{ n }}</li>
    data: {
      numbers: [ 1, 2, 3, 4, 5 ]
    },
    methods: {
      even: function (numbers) {
        return numbers.filter(function (number) {
          return number % 2 === 0
        })
      }
    }

7、事件处理
1、有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：
    <button v-on:click="warn('hello', $event)">Submit</button>
    methods: {
      warn: function (message, event) {
        // 现在我们可以访问原生事件对象
        if (event) event.preventDefault()
        alert(message)
      }
    }
2、事件修饰符
    .stop
    .prevent
    .capture
    .self
    .once
    .passive
    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>
    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>
    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>
    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>
    <!-- 点击事件将只会触发一次 -->
    <a v-on:click.once="doThis"></a>
    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll">...</div>
    注：不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略
3、按键修饰符
    <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
    <input v-on:keyup.enter="submit">
    <input v-on:keyup.13="submit">
    你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。
    <input v-on:keyup.page-down="onPageDown">//在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用。
    1、为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：
    .enter
    .tab
    .delete (捕获“删除”和“退格”键)
    .esc
    .space
    .up
    .down
    .left
    .right
    2、你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
    // 可以使用 `v-on:keyup.f1`
    Vue.config.keyCodes.f1 = 112
4、系统修饰键
    可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。
    .ctrl
    .alt
    .shift
    .meta
    注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。
    <!-- Alt + C -->
    <input @keyup.alt.67="clear">
    
    <!-- Ctrl + Click -->
    <div @click.ctrl="doSomething">Do something</div>
    1、.exact 修饰符
        .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。
        <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
        <button @click.ctrl="onClick">A</button>
    
        <!-- 有且只有 Ctrl 被按下的时候才触发 -->
        <button @click.ctrl.exact="onCtrlClick">A</button>
    
        <!-- 没有任何系统修饰符被按下的时候才触发 -->
        <button @click.exact="onClick">A</button>
    2、鼠标按钮修饰符
        .left
        .right
        .middle

8、表单输入绑定
1、v-model ：在内部为不同的输入元素使用不同的属性并抛出不同的事件：
    text 和 textarea 元素使用 value 属性和 input 事件；
    checkbox 和 radio 使用 checked 属性和 change 事件；
    select 字段将 value 作为 prop 并将 change 作为事件。
    对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。
    如果你也想处理这个过程，请使用 input 事件。
2、<textarea v-model="message" placeholder="请输入"></textarea>
3、复选框
    <div id='example-3'>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
4、选择框
    <div id="example-5">
      <select v-model="selected">
        <option disabled value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>
    <!--选择多个值-->
    <div id="example-6">
      <select v-model="selected" multiple style="width: 50px;">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <br>
      <span>Selected: {{ selected }}</span>
    </div>
5、值绑定
    对于单选按钮，复选框及选择框的选项，v-model 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：
    但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。
    1、复选框
        <!-- `toggle` 为 true 或 false -->
        <input type="checkbox" v-model="toggle">
        <input
          type="checkbox"
          v-model="toggle"
          true-value="yes"
          false-value="no"
        >
    2、单选框
        <input type="radio" v-model="pick" v-bind:value="a">
        vm.pick === vm.a// 当选中时
    3、选择框
    <select v-model="selected">
        <!-- 内联对象字面量 -->
      <option v-bind:value="{ number: 123 }">123</option>
    </select>
    vm.selected.number // => 123
6、修饰符
    1、.lazy:
        在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。
        你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：
        <input v-model.lazy="msg" > //在“change”时而非“input”时更新 -->
    2、.number
        如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
        注意：如果这个值无法被 parseFloat() 解析，则会返回原始的值。
        <input v-model.number="age" type="number">
    3、.trim
        如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：

9、组件基础
因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods
以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
1、data 必须是一个函数
    data: function () {
      return {
        count: 0
      }
    }
2、两种组件的注册类型：全局注册和局部注册
    Vue.component('my-component-name', {
      // ... options ...
    })
3、监听子组件的事件
    1、使事件抛出一个值
        <button v-on:click="$emit('enlarge-text', 0.1)"></button>
        <blog-post v-on:enlarge-text="postFontSize += $event"></blog-post>
        methods: {
          onEnlargeText: function (enlargeAmount) {
            this.postFontSize += enlargeAmount
          }
        }
    2、在组建使用v-model
        <input v-model="searchText">
        等价于
        <input
          v-bind:value="searchText"
          v-on:input="searchText = $event.target.value">
        //当用在组件上时，v-model 则会这样
        <custom-input v-model="searchText"></custom-input>
        <custom-input
          v-bind:value="searchText"
          v-on:input="searchText = $event"></custom-input>
        Vue.component('custom-input', {
          props: ['value'],
          template: `
            <input
              v-bind:value="value"
              v-on:input="$emit('input', $event.target.value)">`
        })
4、通过插槽分发内容
    <alert-box>
      Something bad happened.
    </alert-box>
    Vue.component('alert-box', {
      template: `
        <div class="demo-alert-box">
          <strong>Error!</strong>
          <slot></slot>
        </div>
      `
    })
5、动态组件
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
//在上述示例中，currentTabComponent 可以包括已注册组件的名字，或一个组件的选项对象

10、深入了解组件
10.1组件注册
当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，我们强烈推荐遵循 W3C 规范中的自定义组件名
 (字母全小写且必须包含一个连字符)。
 1、组件名的方式有两种：

 Vue.component('my-component-name', { }) //<my-component-name> 和 <MyComponentName>
 Vue.component('MyComponentName', {  })
 2、全局注册
 3、局部注册
     var ComponentA = {  }
    new Vue({
      el: '#app',
      components: {
        'component-a': ComponentA
      }
    })
4、模块系统
import ComponentA from './ComponentA'
export default {
  components: {
    ComponentA
  }
} 

10.2Prop
1、HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，
camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
1    Vue.component('blog-post', {
      props: ['postTitle'],
    })
    <blog-post post-title="hello!"></blog-post>
    //注意重申一次，如果你使用字符串模板，那么这个限制就不存在了。
2、prop类型
     props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
    props: {
      title: String,
      likes: Number,
      isPublished: Boolean,
      commentIds: Array,
      author: Object,
      callback: Function,
      contactsPromise: Promise // or any other constructor
    }
    1、传递静态或动态 Prop
    <blog-post title="My journey with Vue"></blog-post>
    <blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
    //传一个数字,  即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue 
    <blog-post v-bind:likes="42"></blog-post>
    //传一个布尔值, 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
    <blog-post v-bind:is-published="false"></blog-post>
    //传一个数组， 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
    <blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
    //传一个对象， 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
    <blog-post v-bind:author="{name: 'Veronica'}"></blog-post>
    //传一个对象所有属性，入一个对象的所有属性。
    <blog-post v-bind="post"></blog-post>
    等价于：
    <blog-post v-bind:id="post.id" v-bind:title="post.title" ></blog-post>
3、单项数据流
    1、所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是
    反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
    2、额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。
        1、这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。
        在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
            props: ['initialCounter'],
            data: function () {
              return {
                counter: this.initialCounter
              }
            }
        2、这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
        props: ['size'],
        computed: {
          normalizedSize: function () {
            return this.size.trim().toLowerCase()
          }
        }
4、prop验证
    注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 
    在 default 或 validator 函数中是不可用的。
    Vue.component('my-component', {
      props: {
        // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
        propA: Number,
        // 多个可能的类型
        propB: [String, Number],
        // 必填的字符串
        propC: {
          type: String,
          required: true
        },
        // 带有默认值的数字
        propD: {
          type: Number,
          default: 100
        },
        // 带有默认值的对象
        propE: {
          type: Object,
          // 对象或数组默认值必须从一个工厂函数获取
          default: function () {
            return { message: 'hello' }
          }
        },
        // 自定义验证函数
        propF: {
          validator: function (value) {
            // 这个值必须匹配下列字符串中的一个
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
          }
        }
      }
    })
5、非 Prop 的特性：
    1、一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。这些特性会被添加到这个组件的根元素
        <bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
        //然后这个 data-date-picker="activated" 特性就会自动添加到 <bootstrap-date-input> 的根元素上。
    2、对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉
     type="date" 并把它破坏！庆幸的是，class 和 style 特性会稍微智能一些，即两边的值会被合并起来。
    3、禁用特性继承
    如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false
    注意 inheritAttrs: false 选项不会影响 style 和 class 的绑定。
          这尤其适合配合实例的 $attrs 属性使用，该属性包含了传递给一个组件的特性名和特性值，例如：
          {
              required: true,
              placeholder: 'Enter your username'
          }
         有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些特性会被赋予哪个元素
         Vue.component('base-input', {
              inheritAttrs: false,
              props: ['label', 'value'],
              template: `
                <label>
                  {{ label }}
                  <input
                    v-bind="$attrs"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value)">
                </label>`
            })
         这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：
            <base-input
              v-model="username"
              required
              placeholder="Enter your username" ></base-input>

10.3 自定义事件
1、事件名
    不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 
    PascalCase 了。始终使用 kebab-case 的事件名。
        this.$emit('myEvent')
        <!-- 没有效果 -->
        <my-component v-on:my-event="doSomething"></my-component>
        <!-- 有效果 -->
        <my-component v-on:myevent="doSomething"></my-component>
2、自定义组件的v-model
    <base-checkbox v-model="lovingVue"></base-checkbox>
    Vue.component('base-checkbox', {
      model: {
        prop: 'checked',
        event: 'change'
      },
      props: {
        checked: Boolean
      },
      template: `
        <input
          type="checkbox"
          v-bind:checked="checked"
          v-on:change="$emit('change', $event.target.checked)"
        >
      `
    })
3、将原生事件保绑定到组件
    你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 v-on 的 .native 修饰符：
    <base-input v-on:focus.native="onFocus"></base-input>
    1、在有的时候这是很有用的，不过在你尝试监听一个类似 <input> 的非常特定的元素时，这并不是个好主意。
    比如上述 <base-input> 组件可能做了如下重构，所以根元素实际上是一个 <label> 元素：
    有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。
    Vue.component('base-input', {
      inheritAttrs: false,
      props: ['label', 'value'],
      computed: {
        inputListeners: function () {
          var vm = this
          // `Object.assign` 将所有的对象合并为一个新对象
          return Object.assign({},
            // 我们从父级添加所有的监听器
            this.$listeners,
            // 然后我们添加自定义监听器，
            // 或覆写一些监听器的行为
            {
              // 这里确保组件配合 `v-model` 的工作
              input: function (event) {
                vm.$emit('input', event.target.value)
              }
            }
          )
        }
      },
      template: `
        <label>
          {{ label }}
          <input
            v-bind="$attrs"
            v-bind:value="value"
            v-on="inputListeners"
          >
        </label>
      `
    })
4、.sync修饰符
    在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。我们推荐以 update:myPropName 的模式触发事件取而代之
    this.$emit('update:title', newTitle)
    <text-document
      v-bind:title="doc.title"
      v-on:update:title="doc.title = $event"></text-document>
   //缩写模式
   <text-document v-bind:title.sync="doc.title"></text-document>
   //注意：带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。
    

10.4插槽
1、插槽内容
<navigation-link url="/profile">
  Your Profile //插槽内可以包含任何模板代码，包括 HTML、甚至其它的组件
  <font-awesome-icon name="user"></font-awesome-icon>
  //编译作用域：父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
  Logged in as {{ user.name }} 
</navigation-link>
2、后备内容
    <button type="submit">
      <slot>Submit</slot> //子组件内部
    </button>
3、具名插槽
    注意： v-slot 只能添加在 <template> 上
    //父组件中
    <base-layout>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <p v-slot:default>And another one.</p> //v-slot:default可见可不加
    </base-layout>
    //子组件中
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
        <slot></slot>
    </div>
4、作用域插槽
    1、有时让插槽内容能够访问子组件中才有的数据是很有用的。
    <current-user>
      //简写v-slot="slotProps"。注意： 默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确
      <template v-slot:default="slotProps"> ：
        {{ slotProps.user.firstName }}
      </template>
    </current-user>
    //子组件中
    <span>
      <slot v-bind:user="user">
        {{ user.lastName }}
      </slot>
    </span>
    2、结构插槽Prop
    作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：
        function (slotProps) {
          // 插槽内容
        }  
    这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。
    所以解构来传入具体的插槽 prop    
        <current-user v-slot="{ user }">
          {{ user.firstName }}
        </current-user>  
5、动态插槽名
    <base-layout v-bind:[dynamicSlotNam]="动态指令参数">
      <template v-slot:[dynamicSlotName]></template>
    </base-layout>
6、具名插槽缩写
    <template v-slot:header></template>
    <template #header></template>
    、、注意：和其它指令一样，该缩写只在其有参数的时候才可用
    <current-user #="{ user }"></current-user> //错误的
    <current-user #default="{ user }"></current-user> //正确的

10.5动态组件和异步组件
1、动态组件缓存
    <!-- 失活的组件将会被缓存！-->
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
2、异步组件
    1、 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。Vue 允许你以一个工厂
    函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且
    会把结果缓存起来供未来重渲染。
        Vue.component('async-example', function (resolve, reject) {
          setTimeout(function () {
            // 向 `resolve` 回调传递组件定义
            resolve({
              template: '<div>I am async!</div>'
            })
          }, 1000)
        })
        //可以这样写
        Vue.component(
          'async-webpack-example',
          // 这个 `import` 函数会返回一个 `Promise` 对象。
          () => import('./my-async-component')
        )
        //局部注册时的写法。
        new Vue({
          // ...
          components: {
            'my-component': () => import('./my-async-component')
          }
        })   
    2、处理加载状态。
    这里的异步组件工厂函数也可以返回一个如下格式的对象：
        const AsyncComponent = () => ({
          // 需要加载的组件 (应该是一个 `Promise` 对象)
          component: import('./MyComponent.vue'),
          // 异步组件加载时使用的组件
          loading: LoadingComponent,
          // 加载失败时使用的组件
          error: ErrorComponent,
          // 展示加载时组件的延时时间。默认值是 200 (毫秒)
          delay: 200,
          // 如果提供了超时时间且组件加载也超时了，
          // 则使用加载失败时使用的组件。默认值是：`Infinity`
          timeout: 3000
        }) 

10.6 处理边界情况
1、访问元素&组件
    1、访问根实例: $root
        // Vue 根实例
        new Vue({
          data: { foo: 1},
          computed: {
            bar: function () { /* ... */ }
          },
          methods: {
            baz: function () { /* ... */ }
          }
        })
        //子组件中
        // 获取根组件的数据
        this.$root.foo
        // 写入根组件的数据
        this.$root.foo = 2
        // 访问根组件的计算属性
        this.$root.bar
        // 调用根组件的方法
        this.$root.baz()
    2、访问父级组件实例：$parent
    3、访问子组件实例和子元素: $refs只会在组件渲染完成之后生效，，并且它们不是响应式的
        <base-input ref="usernameInput"></base-input>
        this.$refs.usernameInput //子组件实例
        //<base-input> 组件也可以使用一个类似的 ref 提供对内部这个指定元素的访问
        <input ref="input">
        this.$refs.input //子元素
     4、依赖注入：两个新的实例选项：provide 和 inject（非响应式的）
         //前辈组件中
         provide: function () { 
              return {
                getMap: this.getMap
              }
         }
         //后代组件中
        inject: ['getMap']
2、程序化事件侦听： 当你需要在一个组件实例上手动侦听事件时，它们是派得上用场的
    通过 $on(eventName, eventHandler) 侦听一个事件
    通过 $once(eventName, eventHandler) 一次性侦听一个事件
    通过 $off(eventName, eventHandler) 停止侦听一个事件
    mounted: function () {
      var picker = new Pikaday({
        field: this.$refs.input,
        format: 'YYYY-MM-DD'
      })
    
      this.$once('hook:beforeDestroy', function () {
        picker.destroy()
      })
    }
3、循环引用： 
    1、递归组件： 组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事
    2、组件之间的循环引用
    把 <tree-folder> 组件设为了那个点。我们知道那个产生悖论的子组件是 <tree-folder-contents> 组件，
    所以我们会等到生命周期钩子 beforeCreate 时去注册它：
        beforeCreate: function () {
          this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
        }
    或者，在本地注册组件的时候，你可以使用 webpack 的异步 import：
        components: {
          TreeFolderContents: () => import('./tree-folder-contents.vue')
        }
4、模板定义的替代品
    1、内联模板：当 inline-template 这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，
    而不是将其作为被分发的内容。 注：inline-template 会让模板的作用域变得更加难以理解。不提倡。
        <my-component inline-template>
          <div>
            <p>These are compiled as the component's own template.</p>
          </div>
        </my-component>
    2、X-Template（x-template 需要定义在 Vue 所属的 DOM 元素外。）
        <script type="text/x-template" id="hello-world-template">
          <p>Hello hello hello</p>
        </script>
        Vue.component('hello-world', {
          template: '#hello-world-template'
        })
 5、控制更新
     1、强制更新（99%是你自己用错了才需要强制更新）：vm.$forceUpdate()   
     2、通过 v-once 创建低开销的静态组件：（不要过度使用这个模式）
         时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once 
         特性以确保这些内容只计算一次然后缓存起来
         Vue.component('terms-of-service', {
          template: `
            <div v-once></div>`
        })

11、过度和动画
11.1 进入/离开 & 列表过渡
12、可复用性和组合
12.1混入
1、基础：当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
    // 定义一个混入对象
    var myMixin = {
      created: function () {
        this.hello()
      },
      methods: {
        hello: function () {
          console.log('hello from mixin!')
        }
      }
    }
    // 定义一个使用混入对象的组件
    var Component = Vue.extend({
      mixins: [myMixin]
    })
    var component = new Component() // => "hello from mixin!"
2、选项合并
    1、数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
    2、同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
    3、值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，
       取组件对象的键值对。
3、全局混入
    使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。
        // 为自定义的选项 'myOption' 注入一个处理器。
        Vue.mixin({
          created: function () {
            var myOption = this.$options.myOption
            if (myOption) {
              console.log(myOption)
            }
          }
        })
        new Vue({
          myOption: 'hello!'
        })
        // => "hello!"
4、自定义选项合并策略。（没看懂）
12.2 自定义指令
<input v-focus>
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
//注册局部指令
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
1、钩子函数
    bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
            但是你可以通过比较更新前后的值来忽略不必要的模板更新
    componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    unbind：只调用一次，指令与元素解绑时调用。
2、钩子函数参数  （注意：除了 el 之外，其它参数都应该是只读的，切勿进行修改。）
    el：指令所绑定的元素，可以用来直接操作 DOM 。
    binding：一个对象，包含以下属性：（以 v-demo:foo.a.b="message"为例）
        name：指令名，不包括 v- 前缀 demo。
        value：指令的绑定值，例如：绑定值为 "message变量的值"。
        oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        expression：字符串形式的指令表达式。"message"。
        arg：传给指令的参数，可选。参数为 "foo"。
        modifiers：一个包含修饰符的对象。 { a: true, a: true }。
    vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
    oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
3、动态指令参数
     v-mydirective:[argument]="value"
4、函数简写
    在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写:
    Vue.directive('color-swatch', function (el, binding) {
      el.style.backgroundColor = binding.value
    }) 
5、对象字面量
    如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。
    <div v-demo="{ color: 'white', text: 'hello!' }"></div>
    Vue.directive('demo', function (el, binding) {
      console.log(binding.value.color) // => "white"
    })     

12.3 渲染函数&jsx
**/