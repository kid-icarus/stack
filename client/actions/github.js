import createAPIAction from 'redux-api-actions'
import { Schema } from 'normalizr'

const org = new Schema('organization')
const repo = new Schema('repository')

export const getOrgs = createAPIAction('getOrgs', {
  endpoint: 'https://api.github.com/users/contra/orgs',
  method: 'GET',
  collection: true,
  model: org
})

export const getRepos = createAPIAction('getRepos', {
  endpoint: 'https://api.github.com/users/contra/repos',
  method: 'GET',
  collection: true,
  model: repo
})
