<template>
  <div class="hello">
    <div class="header">
      <div class="header-logo">
        <img src="../assets/logo.jpg" alt="logo">
        <strong>爪哇低代码</strong>
      </div>
      <div class="header-btn">
        <span>预览</span>
        <span>保存</span>
      </div>
    </div>
    <div class="main-content">
      <!-- 主区域 -->
      <el-row>
        <el-col :span="4">
          <!-- 物料堆 -->
          <div class="component-stack block">
            <div class="component-title">
              物料堆
            </div>
            <ul>
              <li v-for="(item, index) in stacks" :key="index"
                class="component-item"
                :draggable="true"
                @drag="handleDrag(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <!-- 主舞台 -->
          <div class="stage block"
            @dragover.prevent>
            <!-- 渲染引擎 -->
            <render-engine ref="engine" :jsonSchema="currentJson" :addNode="selectedType"
              @pickType="handlePickType"></render-engine>
          </div>
        </el-col>
        <el-col :span="4">
          <!-- 配置面板 -->
          <div class="config-panel block">
            <div class="component-title">
              配置面板
              <config-panel
                :currentPickType="currentPickType"></config-panel>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import engine from '../fragments/renderEngine.vue'
// import configPanel from '../fragments/configPanel.vue'
import configPanel from '../config/core/configPanel.vue'
export default {
  name: 'MainPage',
  data () {
    return {
      // 允许向配置系统开放的组件 - 权限归类
      stacks: ['CButton', 'CInput', 'Container', 'CTable', 'CChart'],
      jsonSchema: {
        page: {
          type: 'Container',
          children: [{
            type: 'Container',
            children: [{
              type: 'CInput'
            }, {
              type: 'CButton'
            }]
          }, {
            type: 'CChart'
          }, {
            type: 'Container',
            children: [{
              type: 'CInput'
            }, {
              type: 'CTable'
            }]
          }]
        }
      },
      // 当前操作的模块
      currentJson: {},
      currentPickType: '',
      selectedType: ''
    }
  },
  methods: {
    handlePickType(type) {
      this.currentPickType = type
    },
    handleDrag(item) {
      this.selectedType = item
    }
  },
  components: {
    renderEngine: engine,
    configPanel
  },
  created () {
    this.currentJson = this.jsonSchema
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .block {
    border: 1px solid var(--lightBg);
    height: 100vh;
  }

  .header {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }

  .header img {
    width: 80px;
    height: 80px;
  }

  /* 物料堆 */
  .component-title {
    padding: 10px;
  }
  .component-item {
    border: 1px solid var(--mainLine);
    margin: 2px 5px;
    padding: 10px 0;
    border-radius: 18px;
  }

</style>
