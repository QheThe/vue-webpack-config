import Vue from '../../common/common'
import './index.less'


const vm = Vue.extend({
    data() {
        return {
            test: 'asdasdasd'
        }
    }
})

new vm().$mount('#app')