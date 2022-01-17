const nothing = () => {}

const allFamily = (claz) => {
    const family = []
    let currentClaz = claz

    while (currentClaz !== null) {
        family.push(currentClaz)
        currentClaz = currentClaz.parent
    }

    return family
}

const make_class = (meths, parent=null) => {
    const family = allFamily(parent).reverse()
    const init = meths.init ?? family.find(fam => fam.init !== undefined)?.init ?? nothing

    const claz = {}

    for (let methName in meths) {
        claz[methName] = meths[methName]
    }

    delete meths.init

    claz.parent = parent
    claz.new = (...params) => {
        const instance = {}
        family.forEach((inst, clazz) => {
            for (let methName in clazz) {
                instance[methName] = clazz[methName]
            }
        })

        for (let methName in meths) {
            instance[methName] = meths[methName]
        }

        const trueInstance = {}

        for (let methName in instance) {
            const meth = instance[methName]
            const trueMeth = (...pars) => meth(trueInstance, ...pars)
            trueInstance[methName] = trueMeth
        }

        init(trueInstance, ...params)

        return trueInstance
    }

    return claz
}

module.exports = {make_class}