const { NotFound } = require('http-errors')
const moment = require('moment')
const isNil = require('lodash/isNil')
const { db } = require('../../../db/pgp')

const enroll = {}

enroll.findById = id => {
  if(!id) {
    throw new NotFound('Enroll not found')
  }
  return db.one('SELECT * FROM enroll WHERE enroll_id = $1', id)
}

enroll.findAll = activeOnly => {
  return db.any(`SELECT * FROM enroll ${!isNil(activeOnly) ? `WHERE (enroll_data->>'activeAt')::timestamp < $[currentTime] AND (enroll_data->>'activeUntil')::timestamp > $[currentTime]` : ''}`, { currentTime: moment().format() })
}

enroll.save = (data, id) => id ? update(data, id) : create(data)

const create = data => {
  const sql = `INSERT INTO enroll (enroll_data)
      VALUES ($[data]) RETURNING enroll_id`
  const params = { data }
  return db.one(sql, params)
    .then(result => enroll.findById(result.enroll_id))
}

const update = ({ id, ...data }) => {
  const sql = `UPDATE enroll 
  SET enroll_data = $[data]
  WHERE enroll_id = $[id] RETURNING enroll_id`
  const params = {
    id,
    data
  }
  return db.one(sql, params)
    .then(result => {
      if(!result) { throw new NotFound('Enroll not found') }
      return enroll.findById(result.enroll_id)
    })
}

enroll.remove = id => {
  if(!id) { throw new NotFound('Enroll not found') }
  return db.one('DELETE FROM enroll WHERE enroll_id = $1 RETURNING enroll_id', id)
}

module.exports = enroll
