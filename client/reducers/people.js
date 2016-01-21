import Immutable from 'immutable'
import uuid from 'uuid'

let ids = [1, 2, 3, 4]

const initialState = Immutable.fromJS({
  [ids[0]]: {
    id: ids[0],
    name: 'Aaron M',
    smallImage: '//semantic-ui.com/images/avatar/small/daniel.jpg',
    largeImage: '//semantic-ui.com/images/avatar/large/daniel.jpg',
    location: 'Phoenix, AZ',
    litScore: 4,
    monetizationScore: 3,
    email: 'aaron@wearefractal.com',
    twitter: 'funkytek',
    facebook: 'funkytek',
    instagram: 'funkytek',
    created: Date.now()
  },
  [ids[1]]: {
    id: ids[1],
    name: 'Stevie Felliciano',
    smallImage: '//semantic-ui.com/images/avatar/small/stevie.jpg',
    largeImage: '//semantic-ui.com/images/avatar/large/stevie.jpg',
    location: 'Phoenix, AZ',
    litScore: 2,
    monetizationScore: 3,
    twitter: 'funkytek',
    facebook: 'aaron.thomas.murray',
    instagram: 'funkytek',
    created: Date.now()
  },
  [ids[2]]: {
    id: ids[2],
    name: 'Elliot TS',
    smallImage: '//semantic-ui.com/images/avatar/small/elliot.jpg',
    largeImage: '//semantic-ui.com/images/avatar/large/elliot.jpg',
    location: 'Phoenix, AZ',
    litScore: 1,
    monetizationScore: 3,
    twitter: 'funkytek',
    facebook: 'aaron.thomas.murray',
    instagram: 'funkytek',
    created: Date.now()
  },
  [ids[3]]: {
    id: ids[3],
    name: 'Gary Nicegy',
    smallImage: '//semantic-ui.com/images/avatar/small/stevie.jpg',
    largeImage: '//semantic-ui.com/images/avatar/large/stevie.jpg',
    location: 'Phoenix, AZ',
    litScore: 3,
    monetizationScore: 3,
    twitter: 'funkytek',
    facebook: 'aaron.thomas.murray',
    instagram: 'funkytek',
    created: Date.now()
  }
})

export const filter = (state, {payload}) => {
  if (payload === '') {
    return initialState
  } else {
    return state.filter((person) => {
      var re = new RegExp(payload.toLowerCase(), 'g')
      return (person.get('name').toLowerCase().match(re))
    })
  }
}

export const create = (state, {payload}) => {
  let id = uuid.v1()
  let person = Immutable.Map(payload)
  person = person.merge({id: id, created: Date.now()})
  return state.set(id, person)
}

export default initialState
