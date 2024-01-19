import cInput from './cInput.vue'
import store from '../store'

export default {
  name: 'CInput',

  components: {
    cInput
  },

  render(h, section, children) {
    // parse-xxx.js层就是渲染引擎层mainPage.vue => 上下文一致
    const _this = this
    // 传递参数

    // 事件逻辑处理
    // const event = section.event
    // const payload = section.payload

    const _propsOn = {
      nativeOn: { // 等于@clike.native render函数里的自由属性
        click: e => {
          e.stopPropagation()
          /**
           * 编辑区实现 一(编辑区) => 多(不同类型) => 多(当前类型的配置)
           * 舞台区点击此处input => 抛当前组件类型到渲染引擎层 => 找到对应类型的json配置渲染
           *  */
          _this.$emit('pickType', 'cInput')
        }
      },
      on: {
        viewMounted: e => {
          store.dispatch('props/addWhere', {
            id: e._uid,
            where: {
              ...e.value
              // ...payload
            }
            // target: event.target
          })
        }
      }
    }

    return (
      <cInput
        {..._propsOn}
      ></cInput>
    )
  }
}
