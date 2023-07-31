import '../scss/styles.scss';

import formUi from './views/form';
import Note from './note';
import notesUi from './views/notes';
import { createStore } from './store';
import { rootReducer } from './store/rootReducer';
import modalUi from './views/modal';

const notes = [
    {
        name: 'Note 1',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: '894389',
    },
    {
        name: 'Note 2',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: '435353',
    },
    {
        name: 'Note 3',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: '123232',
    },
    {
        name: 'Note 4',
        category: 'Task',
        content: 'Some content',
        createdAt: 'May 15, 2023',
        id: '43983482',
    },
]

document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form
    const createNoteBtn = document.querySelector('.create-note-btn')
    const store = createStore(rootReducer, { notes });
    const modalForm = modalUi.modalForm
    let targetNoteId;

    const onFormSubmit = (event) => {
        event.preventDefault()
        const note = new Note(formUi.noteName, formUi.noteCategory, formUi.noteComment);
        store.dispatch({ type: 'ADD_NOTE', payload: note })
        form.reset()
    }

    const onNoteClickHandler = (event) => {
        targetNoteId = event.currentTarget.getAttribute('id')
        const targetIcon = event.target

        if (targetIcon.getAttribute('id') === 'edit-icon') {
            const { name, category, content } = store.getState().notes.find((note) => note.id === targetNoteId)
            modalUi.setModalValues(name, category, content)
        }

        if (targetIcon.getAttribute('id') === 'archive-icon') {
            console.log('you click archive');

        }

        if (targetIcon.getAttribute('id') === 'delete-icon') {
            console.log('you click bucket');
            store.dispatch({ type: 'DELETE_NOTE', payload: targetNoteId })
        }
    }

    const onModalFormSubmit = (event) => {
        event.preventDefault()
        const payload = {
            name: modalUi.editedNoteName,
            category: modalUi.editedNoteCategory,
            content: modalUi.editedNoteComment,
            id: targetNoteId
        }

        console.log(payload);

        store.dispatch({ type: 'EDIT_NOTE', payload })
    }

    notesUi.initNotesList(store.getState().notes, onNoteClickHandler)

    form.addEventListener('submit', onFormSubmit, false)

    modalForm.addEventListener('submit', onModalFormSubmit, false)

    createNoteBtn.addEventListener('click', () => {
        form.classList.toggle('form_hidden')
    }, false)

    store.subscribe(() => {
        const { notes } = store.getState()
        notesUi.initNotesList(notes, onNoteClickHandler)
    })


}, false)