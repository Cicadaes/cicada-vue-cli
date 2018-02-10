import <#=name#>Plugin from '../src/index';

window.Vue.use(<#=name#>Plugin);

new window.Vue({
    el: '#app',
    template: '<<#=name#> :text="text"></<#=name#>>',
    data() {
        return {
            text: 'Hellow <#=name#>'
        }
    }
})