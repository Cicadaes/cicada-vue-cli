import <#=name#>Plugin from './<#=name#>.vue';

<#=name#>Plugin.install = function (Vue) {
    Vue.component(<#=name#>Plugin.name, <#=name#>Plugin);
};

if (window.Vue && Vue.use) {
    window.Vue.use(<#=name#>Plugin);
}

export default <#=name#>Plugin;