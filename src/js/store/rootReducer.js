export function rootReducer(state, action) {
    if (action.type === 'ADD_NOTE') {
        state.notes = [...state.notes, action.payload]
    } else if (action.type === 'DELETE_NOTE') {
        state.notes = state.notes.filter((note) => note.id !== action.payload)
    } else if (action.type === 'ARCHIVE_NOTE') {
        const archivedNote = state.notes.find((note) => note.id === action.payload)
        archivedNote.archiveNote()

        state.notes = state.notes.filter((note) => note.isArchived === false)
        state.archivedNotes = [...state.archivedNotes, archivedNote]

    } else if (action.type === 'REMOVE_NOTE_FROM_ARCHIVE') {
        const note = state.archivedNotes.find((note) => note.id === action.payload)
        note.archiveNote()

        state.archivedNotes = state.archivedNotes.filter((note) => note.isArchived === true)
        state.notes = [...state.notes, note]

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

    } else if (action.type === 'COUNT_TOTALS') {
        const notes = [...state.notes, ...state.archivedNotes]
        console.log(notes);

        const newTotals = {
            task: { active: 0, archived: 0 },
            randomThought: { active: 0, archived: 0 },
            idea: { active: 0, archived: 0 }
        }

        notes.forEach((note) => {
            const { category, isArchived } = note

            if (isArchived) {
                newTotals[category].archived++
            } else {
                newTotals[category].active++
            }
        })

        state.totals = newTotals
    }

    return state
}
