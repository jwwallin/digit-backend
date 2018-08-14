const router = require('express-promise-router')({ mergeParams: true })
const publicRouter = require('express-promise-router')({ mergeParams: true })

const { validateCreate, validateUpdate } = require('../../models/enroll/enrollValidators')
const { decorate, decorateList } = require('../../models/enroll/enrollDecorators')
const { findById, findAll, save, remove } = require('../../models/enroll/enrollModel')

router.get('/', (req, res) =>
  findAll()
    .then(decorateList)
    .then(result => res.send(result)))

const findPageById = (req, _, next, value) =>
  findById(value)
    .then(resultRow => {
      req.resultRow = resultRow
      next()
    })

router.post('/', validateCreate(), (req, res) => {
  let newItem = {
    ...req.body
  }
  return save(newItem)
    .then(decorate)
    .then(result => res.status(201).send(result))
})

router.put('/:enrollId', validateUpdate(), (req, res) => {
  const toSave = { ...req.body }
  const oldItem = decorate(req.resultRow)
  return save({ ...oldItem, ...toSave }, req.params.enrollId)
    .then(decorate)
    .then(result => res.send(result))
})

router.delete('/:enrollId', (req, res) => {
  const { enrollId } = req.params
  return remove(enrollId)
    .then(id => res.status(204).send())
})

router.param('enrollId', findPageById)

publicRouter.get('/', (req, res) =>
  findAll(true)
    .then(decorateList)
    .then(result => res.send(result)))

publicRouter.get('/:enrollId', (req, res) =>
  Promise.resolve(decorate(req.resultRow))
    .then(result => res.send(result))
)

publicRouter.param('enrollId', findPageById)

module.exports = {
  router,
  publicRouter
}
