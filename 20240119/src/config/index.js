// require.context - 组件库中指定文件的读取
const req = require.context('./', false, /[^.]+\.vue/)

const componentsName = req.keys()
const components = componentsName.reduce((components, module) => {
    const mod = req(module)

    components[mod.default.name] = mod.default
    return components
}, {})

export {
    components
}