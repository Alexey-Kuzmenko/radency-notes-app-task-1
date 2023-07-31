class NotesUi {
    constructor() {
        this.tbody = document.querySelector('#tbody')
    }

    initNotesList(notes, handler) {
        this.renderNotes(notes)
        NotesUi.addHandler(handler)
    }

    static addHandler(handler) {
        const notesItems = [...document.querySelectorAll('.note-item')]
        notesItems.forEach((note) => {
            note.addEventListener('click', handler, false)
        })
    }

    renderNotes(notes) {
        this.cleanTbody()

        if (!notes.length) {
            this.tbody.innerHTML = this.showMessage()
        } else {
            let fragment = ''

            notes.forEach((note) => {
                const noteTemplate = NotesUi.noteTemplate(note)
                fragment += noteTemplate

            });

            this.tbody.innerHTML = fragment
        }
    }

    cleanTbody() {
        this.tbody.innerHTML = ''
    }

    showMessage() {
        return NotesUi.messageTemplate()
    }

    static messageTemplate(message = 'You don\'t have any notes yet') {
        return `
            <tr>
                <td colspan=6>
                    <div class="alert alert-primary" role="alert">
                        ${message}
                    </div>
                </td>
            </tr>  
        `
    }

    static noteTemplate({ name, category, content, dates, id, createdAt }) {
        return `
        <tr id=${id} class="note-item" >
            <th scope="row">${name}</th>
            <td>${createdAt}</td>
            <td>${category === 'randomThought' ? 'random thought' : category}</td>
            <td>${content}</td>
            <td>${!dates ? '' : dates.join('')}</td>
            <td>
                <i class="bi bi-pencil-fill me-2 icon" id="edit-icon" data-bs-toggle="modal" data-bs-target="#edit-note-modal"></i>
                <i class="bi bi-archive-fill me-2 icon" id="archive-icon"></i>
                <i class="bi bi-trash-fill icon" id="delete-icon"></i>
            </td>
        </tr>
        `
    }
};

const notesUi = new NotesUi();

export default notesUi