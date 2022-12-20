// vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue, options){
    // 全局指令
    Vue.directive(options.name, (element,b)=>{
        console.log('自定义插件已调用',b);
    })
}

export default myPlugins