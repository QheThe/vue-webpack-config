import Vue from 'vue'
import 'normalize.css'
import flexible from 'flexible.js'

Vue.mixin({
    created() {
        flexible()
        console.log('common')
    }
})

export default Vue