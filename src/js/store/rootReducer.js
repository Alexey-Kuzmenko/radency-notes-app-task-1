export function rootReducer(state, action) {
    if (action.type === 'ADD_NOTE') {
        state.notes = [...state.notes, action.payload]
    } else if (action.type === 'DELETE_NOTE') {
        state.notes = state.notes.filter((note) => note.id !== action.payload)
    } else if (action.type === 'ARCHIVE_NOTE') {

    } else if (action.type === 'REMOVE_NOTE_FROM_ARCHIVE') {

    } else if (action.type === 'EDIT_NOTE') {
        const { name, category, content, id } = action.payload
        const note = state.notes.find((note) => note.id === id)
        const noteIndex = state.notes.indexOf(note)

        note.name = name
        note.category = category
        note.content = content

        const notesCopy = [...state.notes]
        notesCopy[noteIndex] = note
        state.notes = notesCopy
    }

    return state
}