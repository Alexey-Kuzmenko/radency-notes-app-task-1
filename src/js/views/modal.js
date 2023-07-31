class ModalUI {
    constructor() {
        this._modalForm = document.querySelector('#modal-form')
        this.name = document.querySelector('#edit-note-name')
        this.category = document.querySelector('#edit-note-category')
        this.comment = document.querySelector('#edit-note-content')
    }

    setModalValues(name, category, comment) {
        this.name.value = name
        this.category.value = category
        this.comment.value = comment
    }

    get modalForm() {
        return this._modalForm
    }

    get editedNoteName() {
        return this.name.value
    }

    get editedNoteCategory() {
        return this.category.value
    }

    get editedNoteComment() {
        return this.comment.value
    }

}

const modalUi = new ModalUI();

export default modalUi; 