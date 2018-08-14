const decoratePublic = enroll => {
  const { enroll_id: id } = enroll
  const { name, description, fields, visibleFields, participants } = enroll.enroll_data

  return {
    id,
    name,
    fields,
    description,
    visibleFields,
    participants
  }
}

const decorate = enroll => {
  const { enroll_id: id } = enroll
  const { name, description, fields, visibleFields, participants, activeAt, activeUntil } = enroll.enroll_data

  return {
    id,
    name,
    fields,
    description,
    visibleFields,
    participants,
    activeAt,
    activeUntil
  }
}

const decorateList = enrolls =>
  enrolls.map(decorate)

const decoratePublicList = enrolls =>
  enrolls.map(decoratePublic)

module.exports = {
  decorate,
  decoratePublic,
  decorateList,
  decoratePublicList
}
