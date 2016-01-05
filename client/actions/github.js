import createAPIAction from 'redux-api-actions'
import { Schema } from 'normalizr'

const user = new Schema('user')
const organization = new Schema('organization')
const repository = new Schema('repository')

export const getUser = createAPIAction('getUser', {
  endpoint: ({user}) => `https://api.github.com/users/${user}`,
  method: 'GET',
  model: user
})

export const getOrganizations = createAPIAction('getOrganizations', {
  endpoint: ({user}) => `https://api.github.com/users/${user}/orgs`,
  method: 'GET',
  collection: true,
  model: organization
})

export const getRepositories = createAPIAction('getRepositories', {
  endpoint: ({user}) => `https://api.github.com/users/${user}/repos`,
  method: 'GET',
  collection: true,
  model: repository
})
