import cButton from './cButton.vue'

export default {
    name: 'CButton',
    components: [
        cButton
    ],

    render(h, section, children) {
        const _this = this;

        // TBD. 通用逻辑

        return (
            <cButton></cButton>
        )
    }
}