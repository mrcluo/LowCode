// require.context - 组件库中指定文件的读取
// 1. 加载初始组件
const req = require.context('./', false, /[^.]+\.vue/)
// 2. 加载整合配置
const reqParser = require.context('./', false, /parser-[^.]+\.js/)

// 3. 模块分配
const componentsName = req.keys()
const components = componentsName.reduce((components, module) => {
    const mod = req(module)

    components[mod.default.name] = mod.default
    return components
}, {})

// 4. 配置分配
const parsersName = reqParser.keys()
const parsers = parsersName.reduce((parsers, module) => {
    const mod = reqParser(module)
    
    // TODO 动态增加全局配置
    parsers[mod.default.name] = mod.default
    return parsers
}, {})

export {
    components,
    parsers
}