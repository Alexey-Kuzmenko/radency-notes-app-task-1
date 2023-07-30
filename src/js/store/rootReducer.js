export function rootReducer(state, action) {
    if (action.type === 'ADD_NOTE') {
        state.notes = [...state.notes, action.payload]
    } else if (action.type === 'DELETE_NOTE') {
        state.notes = state.notes.filter((note) => note.id !== action.payload)
    } else if (action.type === 'ARCHIVE_NOTE') {

    } else if (action.type === 'REMOVE_NOTE_FROM_ARCHIVE') {

    }

    return state
}