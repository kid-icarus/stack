import createAPIAction from 'redux-api-actions'
import { Schema } from 'normalizr'

const user = new Schema('gh-user')
const organization = new Schema('gh-organization')
const repository = new Schema('gh-repository')

export const getGHUser = createAPIAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}`,
  method: 'GET',
  model: user
})

export const getGHOrganizations = createAPIAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}/orgs`,
  method: 'GET',
  collection: true,
  model: organization
})

export const getGHRepositories = createAPIAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}/repos`,
  method: 'GET',
  collection: true,
  model: repository
})
