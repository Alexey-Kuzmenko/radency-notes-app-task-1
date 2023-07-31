import '../scss/styles.scss';

import { v4 as uuidv4 } from "uuid"
import formUi from './views/form';
import Note from './note';
import notesUi from './views/notes';
import { createStore } from './store';
import { rootReducer } from './store/rootReducer';
import modalUi from './views/modal';
import totalsUi from './views/totals';
import archiveUi from './views/archive';

const initialState = {
    notes: [
        {
            name: 'Note 1',
            category: 'task',
            content: 'nibh sit amet commodo nulla facilisi nullam vehicula ipsum a',
            createdAt: 'September 10, 2022',
            id: uuidv4(),
            isArchived: false,
            archiveNote() {
                this.isArchived = !this.isArchived
            }
        },
        {
            name: 'Note 2',
            category: 'idea',
            content: 'nibh sit amet commodo nulla facilisi nullam vehicula ipsum a, 25/08/23',
            createdAt: 'May 15, 2023',
            dates: ['25/08/23'],
            id: uuidv4(),
            isArchived: false,
            archiveNote() {
                this.isArchived = !this.isArchived
            }
        },
        {
            name: 'Note 3',
            category: 'randomThought',
            content: 'nibh sit amet commodo nulla facilisi nullam vehicula ipsum a 11.01.2023',
            createdAt: 'May 15, 2023',
            dates: ['11.01.2023'],
            id: uuidv4(),
            isArchived: false,
            archiveNote() {
                this.isArchived = !this.isArchived
            }
        },
    ],
    archivedNotes: [
        {
            name: 'Note 4',
            category: 'idea',
            content: 'nibh sit amet commodo nulla facilisi nullam vehicula ipsum a',
            createdAt: 'June 20, 2023',
            id: uuidv4(),
            isArchived: true,
            archiveNote() {
                this.isArchived = !this.isArchived
            }
        },
    ],
    totals: {
        task: { active: 0, archived: 0 },
        randomThought: { active: 0, archived: 0 },
        idea: { active: 0, archived: 0 }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form
    const createNoteBtn = document.querySelector('.create-note-btn')
    const showArchiveBtn = document.querySelector('#show-archive-btn')
    const store = createStore(rootReducer, initialState);
    const modalForm = modalUi.modalForm
    const archive = archiveUi.archive
    let targetNoteId;

    const onFormSubmit = (event) => {
        event.preventDefault()
        const note = new Note(formUi.noteName, formUi.noteCategory, formUi.noteComment);
        store.dispatch({ type: 'ADD_NOTE', payload: note })
        store.dispatch({ type: 'COUNT_TOTALS' })
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
            store.dispatch({ type: 'ARCHIVE_NOTE', payload: targetNoteId })
            store.dispatch({ type: 'COUNT_TOTALS' })

        }

        if (targetIcon.getAttribute('id') === 'delete-icon') {
            store.dispatch({ type: 'DELETE_NOTE', payload: targetNoteId })
            store.dispatch({ type: 'COUNT_TOTALS' })
        }
    }

    const onArchivedNoteClickHandler = (event) => {
        targetNoteId = event.currentTarget.getAttribute('id')
        const targetIcon = event.target

        if (targetIcon.getAttribute('id') === 'remove-form-archive-note') {
            store.dispatch({ type: 'REMOVE_NOTE_FROM_ARCHIVE', payload: targetNoteId })
            store.dispatch({ type: 'COUNT_TOTALS' })
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

        store.dispatch({ type: 'EDIT_NOTE', payload })
    }

    // * app initialization
    notesUi.initNotesList(store.getState().notes, onNoteClickHandler)
    archiveUi.initArchive(store.getState().archivedNotes, onArchivedNoteClickHandler)
    store.dispatch({ type: 'COUNT_TOTALS' })
    totalsUi.renderTotals(store.getState().totals)

    form.addEventListener('submit', onFormSubmit, false)

    modalForm.addEventListener('submit', onModalFormSubmit, false)

    createNoteBtn.addEventListener('click', () => {
        form.classList.toggle('form_hidden')
    }, false)

    showArchiveBtn.addEventListener('click', () => {
        archive.classList.toggle('table_hidden')
    })

    store.subscribe(() => {
        const { notes, totals, archivedNotes } = store.getState()

        notesUi.initNotesList(notes, onNoteClickHandler)
        archiveUi.initArchive(archivedNotes, onArchivedNoteClickHandler)
        totalsUi.renderTotals(totals)
    })


}, false)