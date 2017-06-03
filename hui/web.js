//  Undifined、Null、Boolean、Number和String 基本数据结构类型
/**
 * 可以直接操作保存在变量中的实际值  栈内存
 * 
/ */
//  function object array   引用数据类型
/**
 *  栈内存中引用地址找到堆内存
 * 
 */


// js 继承
function Parent() {

}

function Child() {
    Parent.call(this); //构造继承
}

Child.prototype = new Parent(); //原型继承


//解析url参数
//a.
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//b.
function parseQueryString(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(url),
        ret = {};
    if (arr_url && arr_url[1]) {
        var str_para = arr_url[1],
            result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[decodeURIComponent(result[1])] = decodeURIComponent(result[2]);
        }
    }
    return ret;
}

//正则
HC.regexp = {
    //手机
    isMobile: function (t) {
        return /^1[34578]\d{9}$/.test(t);
    },
    //email
    isEmail: function (t) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t);
    },
    //身份证
    isCardId: function (t) {
        return /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(t);
    },
    //密码
    isPassWord: function (t) {
        return /^(\w*(?=\w*\d)(?=\w*[A-Za-z])\w*){6,16}$/.test(t);
    },
    //固定电话
    isTel: function (t) {
        return /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/.test(t);
    }
};

//工厂模式
function CreatePerson(name, age, sex) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function () {
        return this.name;
    }
    return obj;
}

//观察者模式
Events = function () {

    var listen, log, obj, one, remove, trigger, __this;

    obj = {};

    __this = this;

    listen = function (key, eventfn) { //把简历扔盒子, key就是联系方式.

        var stack, _ref; //stack是盒子

        stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

        return stack.push(eventfn);

    };

    one = function (key, eventfn) {

        remove(key);

        return listen(key, eventfn);

    };

    remove = function (key) {

        var _ref;

        return (_ref = obj[key]) != null ? _ref.length = 0 : void 0;

    };

    trigger = function () { //面试官打电话通知面试者

        var fn, stack, _i, _len, _ref, key;

        key = Array.prototype.shift.call(arguments);

        stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

        for (_i = 0, _len = stack.length; _i < _len; _i++) {

            fn = stack[_i];

            if (fn.apply(__this, arguments) === false) {

                return false;

            }

        }

        return {

            listen: listen,

            one: one,

            remove: remove,

            trigger: trigger

        }

    }
}


//http网络五层协议

/*
应用层：确定进程之间通信的性质以满足用户需求；应用层协议如支持万维网应用的http协议、支持电子邮件的smtp协议、支持文件传送的ftp协议等等  
运输层：负责主机间不同进程的通信；协议有面向连接的TCP（传输控制协议）、无连接的UDP（用户数据报协议）；数据传输的单位称为报文段或用户数据报
网络层：负责分组交换网中不同主机间的通信；作用有二：发送数据时，将运输层中的报文段或用户数据报封装成IP数据报；选择合适路由  
数据链路层：负责将网络层的IP数据报组装成帧 
物理层：透明地传输比特流 
*/

/**
 * 当我们在浏览器的地址栏输入 http://www.pwstrick.com ，然后回车，回车这一瞬间到看到页面到底发生了什么呢？

1.  域名解析

2. 建立TCP连接

3. 发起HTTP请求

4. 服务器响应HTTP请求

5. 浏览器渲染页面
 */

// dom树遍历
/**
 * 使用递归的方式先序遍历DOM树
 * @param node 根节点
 */
 
function traversal(node) {    //对node的处理
    if (node && node.nodeType === 1) {     
        console.log(node.tagName);   
    }   
    var i = 0,
        childNodes = node.childNodes,
        item;   
    for (; i < childNodes.length; i++) {     
        item = childNodes[i];     
        if (item.nodeType === 1) {        //递归先序遍历子节点
            traversal(item);     
        }   
    } 
}

//VUE   生命周期
var myVue = new Vue({
    el: ".test",
    data: {
        a: "我是内容,在控制台输入myVue.a=123456,可以改变我的值"
    },
    created: function () {
        //在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。
        //但是还没有开始 DOM 编译，$el 还不存在,但是实例存在,即this.a存在,可打印出来 。
        console.log("建立");
    },
    beforeCompile: function () {
        console.log("未开始编译");
    },
    compiled: function () {
        //在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档。
        console.log("编译完成");
    },
    ready: function () {
        //在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
        console.log("一切准备好了");
    },
    attached: function () { //myVue.$appendTo(".test2")暂时触发不了,不知道怎么解决
        //在 vm.$el 插入 DOM 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。
        console.log("插入DOM成功");
    },
    detached: function () { //触发事件 myVue.$destroy(true),其中参数true控制是否删除DOM节点或者myVue.$remove()
        //在 vm.$el 从 DOM 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。
        console.log("删除DOM成功");
    },
    beforeDestroy: function () { //触发方式,在console里面打myVue.$destroy();
        //在开始销毁实例时调用。此时实例仍然有功能。
        console.log("销毁前");
    },
    destroyed: function () { //触发方式,在console里面打myVue.$destroy();其中myVue.$destroy(true)是删除DOM节点,会触发detached函数,但是实例仍然存在
        //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
        console.log("已销毁");
    }
});


// vue 登录
const routes = [{
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.state.token) { // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

/**
 * Trident  ie
 * Gecko     firefox
 * Webkit    chrome safrai
 * Presto|Blink    Opera
 */


/*冒泡法*/

function bullSort(array) {
    var temp;
    for (var i = 0; i < array.length; i++) {
        for (var j = array.length - 1; j > i; j--) {
            if (array[j] < array[j - 1]) {
                temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }
    return array;
}

/**
 *  深度clone obj
 */
function cloneObj(obj) {
    var o = obj.constructor == Object ? new obj.constructor() : new obj.constructor(obj.valueOf());
    for(var key in obj){
        if(o[key] != obj[key] ){
            if(typeof(obj[key]) == 'object' ){
                o[key] = mods.cloneObj(obj[key]);
            }else{
                o[key] = obj[key];
            }
        }
    }
    return o;
}