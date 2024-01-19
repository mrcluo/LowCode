import cChart from './cChart.vue'
import store from '../store'
// import HOC from './hoc.vue' // 装饰器模式 - vue 高阶组件 wrapper

export default {
  name: 'CChart',

  components: {
    cChart
  },

  render(h, section, children) {
    const _this = this
    // 传递参数
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          _this.$emit('pickType', 'cChart')
        }
      },
      on: {
        viewMounted: e => {
          store.dispatch('props/addWhere', {
            id: e._uid,
            where: e.value
          })
        },
        fetch: e => {
          /**
           * 配合paeser-input.js，此处可处理的场景有
           * 1 input 控制 chart的显示隐藏
           * 2 input 控制 chart的数据变化
           * 3 input 接受用户的自定义事件在此处做逻辑
           */
          // 1. 确定自己是谁
          // 2. store中查找
          // 3. 带上新的where条件后再去请求
          // 4. this.$ajax
        }
      }
    }

    return (
      <cChart
        {..._propsOn}
      ></cChart>
    )
  }
}
