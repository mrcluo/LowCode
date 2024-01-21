<script>
import { components, parsers } from "../components/index";
export default {
  name: "renderEngine",
  props: {
    // 配置协议
    jsonSchema: {
      type: Object,
      default: () => {
        return {};
      },
    },
    addNode: {
      type: String,
      default: "",
    },
  },
  components: {
    ...components,
    ...parsers,
  },
  data() {
    return {
      page: undefined,
    };
  },
  methods: {
    renderRoot(h) {
      let _page = this.page;
      // Todo 页面配置信息
      return <div class="root">{this.renderComponents(h, _page)}</div>;
    },
    renderComponents(h, section) {
      /**
       * 深度优先遍历，类似洋葱模型
       * 从外到内遍历，从内到外打印 => 最新渲染的是最末的子节点，依次往父级渲染
       *  */
      let _children = null;

      if (section.children) {
        // 布局组件
        _children = this.renderChildren(h, section);
      }
      return this.startRender(h, section, _children);
    },
    renderChildren(h, section) {
      let _nodeArray = section.children || [].concat(section);
      // TODO 可以拓展兄弟结点之间的共享信息
      return _nodeArray.map((n, i) => this.renderComponents(h, n, i));
    },
    startRender(h, section, _children) {
      // 深度优先，它的加载顺序方便处理逻辑。json遍历的时候，涉及到的组件全部异步渲染 + viewMounted 保证组件的参数和渲染是完整的
      const _type = section.type;
      const renderMod = parsers[_type];

      if (renderMod) {
        return renderMod.render.call(this, h, section, _children);
      }
      return null;
    },
    init() {
      this.page = this.jsonSchema.page || {};
    },

    // 以下是配置系统拖拽统一化处理
    handleDragOver() {},
    // 拖拽组件松手
    handleDrop(event, vm) {
      const _json = vm.jsonSchema;

      if (_json && _json.type === "Container") {
        if (!_json.children) {
          this.$set(_json, "children", []);
        }
        _json.children.push({
          type: this.addNode,
        });
      }
    },
  },
  created() {
    this.init();
  },
  render(h) {
    // TODO 后续可以拓展页面预处理逻辑
    return this.renderRoot(h);
  },
};
</script>
