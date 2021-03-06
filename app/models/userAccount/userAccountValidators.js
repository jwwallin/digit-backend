const { checkSchema } = require('express-validator/check')
const {
  getValidator,
  getStringValidator,
  getBooleanValidator,
  getIntValidator,
  getEmailValidator,
  setIsOptional,
  getLowerCaseStringValidator
} = require('../../helpers/validatorHelpers')

const schema = {
  username: getLowerCaseStringValidator('Käyttäjätunnus', 5),
  password: setIsOptional(getStringValidator('Salasana')), // TODO: password validation min length etc
  roleId: getIntValidator('Rooli'),
  email: getEmailValidator('Sähköposti')
}

const validateLogin = () =>
  getValidator([
    checkSchema(({
      username: getLowerCaseStringValidator('Käyttäjätunnus', 5),
      password: getStringValidator('Salasana') // TODO: password validation length etc
    }))
  ])

const validateUpdate = () =>
  getValidator([
    checkSchema({
      ...schema,
      active: setIsOptional(getBooleanValidator('Tila'))
    })
  ])

const validateRegistrationCreate = () =>
  getValidator([
    checkSchema(schema)
  ])

const validateRegistrationUpdate = () =>
  getValidator([
    checkSchema({
      email: getEmailValidator('Sähköposti'),
      registrationToken: getStringValidator('Varmenne')
    })
  ])

module.exports = {
  validateLogin,
  validateUpdate,
  validateRegistrationCreate,
  validateRegistrationUpdate
}
