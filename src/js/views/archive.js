class ArchiveUI {
    constructor() {
        this._archive = document.querySelector('#archive-table')
        this.tbody = document.querySelector('#archive-tbody')
    }

    get archive() {
        return this._archive
    }

    initArchive(archivedNotes, handler) {
        this.renderArchivedNotes(archivedNotes)
        ArchiveUI.addHandler(handler)
    }

    static addHandler(handler) {
        const archivedNotes = [...document.querySelectorAll('.note-item_archived')]
        archivedNotes.forEach((note) => {
            note.addEventListener('click', handler, false);
        });
    };

    cleanTbody() {
        this.tbody.innerHTML = ''
    }

    renderArchivedNotes(notes) {
        this.cleanTbody()

        if (!notes.length) {
            this.tbody.innerHTML = this.showMessage()
        } else {
            let fragment = ''

            notes.forEach((note) => {
                const noteTemplate = ArchiveUI.archivedNoteTemplate(note)
                fragment += noteTemplate

            });

            this.tbody.innerHTML = fragment
        }
    }

    showMessage() {
        return ArchiveUI.messageTemplate()
    }

    static messageTemplate(message = 'You don\'t archive any notes yet') {
        return `
        <tr>
            <td colspan=6>
                <div class="alert alert-dark" role="alert">
                    ${message}
                </div>
            </td>
        </tr>  
    `
    }

    static archivedNoteTemplate({ name, category, content, dates, id, createdAt }) {
        return `
        <tr id=${id} class="note-item note-item_archived" >
            <th scope="row">${name}</th>
            <td>${createdAt}</td>
            <td>${category}</td>
            <td>${content}</td>
            <td>${!dates ? '' : dates.join('')}</td>
            <td>
                <i class="bi bi-arrow-left-square-fill icon" id="remove-form-archive-note"></i>
            </td>
        </tr>
        `
    }
}

const archiveUi = new ArchiveUI();

export default archiveUi;