import '../scss/styles.scss';

import formUi from './views/form';
import Note from './note';
import notesUi from './views/notes';
import { createStore } from './store';
import { rootReducer } from './store/rootReducer';

const notes = [
    {
        name: 'Note 1',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: 894389,
    },
    {
        name: 'Note 2',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: 435353,
    },
    {
        name: 'Note 3',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: 123232,
    },
    {
        name: 'Note 4',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: 43983482,
    },
]

document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form
    const createNoteBtn = document.querySelector('.create-note-btn')
    const store = createStore(rootReducer, { notes });

    const onFormSubmit = () => {
        const note = new Note(formUi.noteName, formUi.noteCategory, formUi.noteComment);
        store.dispatch({ type: 'ADD_NOTE', payload: note })
        form.reset()
    }

    const onNoteClickHandler = (event) => {
        const noteId = event.currentTarget.getAttribute('id')
        // ! testing
        console.log(noteId);

        const targetIcon = event.target
        console.log(targetIcon);

        if (targetIcon.getAttribute('id') === 'edit-icon') {
            console.log('you click pensile');
        }

        if (targetIcon.getAttribute('id') === 'archive-icon') {
            console.log('you click archive');

        }

        if (targetIcon.getAttribute('id') === 'delete-icon') {
            console.log('you click bucket');
            store.dispatch({ type: 'DELETE_NOTE', payload: noteId })
        }
    }

    notesUi.initNotesList(store.getState().notes, onNoteClickHandler)

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        onFormSubmit()
    })

    createNoteBtn.addEventListener('click', () => {
        form.classList.toggle('form_hidden')
    }, false)

    store.subscribe(() => {
        const { notes } = store.getState()
        notesUi.initNotesList(notes, onNoteClickHandler)
    })


}, false)