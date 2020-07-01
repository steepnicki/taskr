module.exports = () => {
  const resources = {}

  const readOnlyError = name => `Component - ${name} - is read only!`
  const alreadyRegisteredError = name => `"${name}" is already registered!`

  const register = (name, component) => {
    if (resources[name]) {
      throw new Error(alreadyRegisteredError(name))
    } else {
      Object.defineProperty(resources, name, {
        get: () => component,
        set: () => {
          throw new Error(readOnlyError(name))
        }
      })

      return resources
    }
  }

  resources.register = register

  return resources
}