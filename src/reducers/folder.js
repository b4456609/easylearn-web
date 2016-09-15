import {
    ADD_FOLDER
} from '../actions'

const folder = (state = [], action) => {
    switch (action.type) {
        case ADD_FOLDER:
            console.log('b')
            return [...state, {
                name: action.name,
                id: new Date().getTime(),
                pack: []
            }]
        default:
            console.log('a')
            return state
    }
}

export default folder
