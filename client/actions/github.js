import { createAction } from 'tahoe'
import { Schema } from 'normalizr'

const user = new Schema('gh-user')
const organization = new Schema('gh-organization')
const repository = new Schema('gh-repository')

export const getUser = createAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}`,
  method: 'GET',
  model: user
})

export const getOrganizations = createAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}/orgs`,
  method: 'GET',
  collection: true,
  model: organization
})

export const getRepositories = createAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}/repos`,
  method: 'GET',
  collection: true,
  model: repository
})
