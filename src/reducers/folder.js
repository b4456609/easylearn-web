import {
    ADD_FOLDER
} from '../actions'

const folder = (state = [], action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return [...state, {
                name: action.name,
                id: new Date().getTime(),
                pack: []
            }]
        default:
            return state
    }
}

export default folder
