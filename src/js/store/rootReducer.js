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
        // !debug
        // console.log('calc totals');

        state.notes.forEach((note) => {
            const { category, isArchived } = note;

            if (!state.totals[category]) {
                state.totals[category] = {
                    active: 0,
                    archived: 0
                };
            }

            if (isArchived) {
                state.totals[category].archived++;
            } else {
                state.totals[category].active++;
            }
        });
        // ! debug
        // console.log(state.totals);

    }

    return state
}
