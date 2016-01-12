import Immutable from 'immutable'
import uuid from 'uuid'

let ids = [uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1()]

const initialState = Immutable.fromJS({
  [ids[0]]: {
    id: ids[0],
    name: 'Daniel Louise',
    img: '//semantic-ui.com/images/avatar/small/daniel.jpg',
    location: 'Phoenix, AZ',
    engagementScore: 4.6,
    monetizationScore: 3,
    social: [{email: 'aaron@wearefractal.com', twitter: 'funkytek', facebook: 'funkytek', instagram: 'funkytek'}],
    created: Date.now()
  },
  [ids[1]]: {
    id: ids[1],
    name: 'Stevie Felliciano',
    img: '//semantic-ui.com/images/avatar/small/stevie.jpg',
    location: 'Phoenix, AZ',
    engagementScore: 4.6,
    monetizationScore: 3,
    social: [{twitter: 'funkytek', facebook: 'aaron.thomas.murray', instagram: 'funkytek'}],
    created: Date.now()
  },
  [ids[2]]: {
    id: ids[2],
    name: 'Elliot TS',
    img: '//semantic-ui.com/images/avatar/small/elliot.jpg',
    location: 'Phoenix, AZ',
    engagementScore: 4.6,
    monetizationScore: 3,
    social: [{twitter: 'funkytek', facebook: 'aaron.thomas.murray', instagram: 'funkytek'}],
    created: Date.now()
  },
  [ids[3]]: {
    id: ids[3],
    name: 'Gary Nicegy',
    img: '//semantic-ui.com/images/avatar/small/stevie.jpg',
    location: 'Phoenix, AZ',
    engagementScore: 4.6,
    monetizationScore: 3,
    social: [{twitter: 'funkytek', facebook: 'aaron.thomas.murray', instagram: 'funkytek'}],
    created: Date.now()
  }
})

export const addPerson = (state, {payload}) => {
  let id = uuid.v1()
  let person = Immutable.Map({
    id: id,
    name: payload.name,
    img: payload.img,
    created: Date.now()
  })
  return state.set(id, person)
}

export default initialState
