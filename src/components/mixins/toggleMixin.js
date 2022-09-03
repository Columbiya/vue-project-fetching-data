export default {
    props: {
        shown: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:shown', false)
        }
    },
    mounted() {
        console.log('mixin mounted')
    }
}