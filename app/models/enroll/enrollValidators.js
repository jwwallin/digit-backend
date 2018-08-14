const { checkSchema } = require('express-validator/check')
const { getValidator, getStringValidator, setIsOptional, getArrayValidator } = require('../../helpers/validatorHelpers')

const schema = {
  name: getStringValidator('Nimi'),
  description: setIsOptional(getStringValidator('Kuvaus')),
  fields: getArrayValidator(),
  activeAt: getStringValidator('Aloituspäivämäärä'),
  activeUntil: getStringValidator('Lopetuspäivämäärä')
}

const validateCreate = () =>
  getValidator([
    checkSchema(schema)
  ])

const validateUpdate = () =>
  getValidator([
    checkSchema(schema),
    checkSchema({
      enrollId: {
        in: ['params'],
        isInt: true,
        toInt: true
      }
    })
  ])

module.exports = {
  validateCreate,
  validateUpdate
}
