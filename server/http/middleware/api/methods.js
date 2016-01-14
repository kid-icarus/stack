export default {
  find: {
    method: 'get',
    plural: true
  },
  create: {
    method: 'post',
    plural: true
  },
  findById: {
    method: 'get',
    plural: false
  },
  replaceById: {
    method: 'put',
    plural: false
  },
  updateById: {
    method: 'patch',
    plural: false
  },
  deleteById: {
    method: 'delete',
    plural: false
  }
}
