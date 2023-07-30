class FormUI {
    constructor() {
        this._form = document.forms['create-note-form']
        this.name = document.querySelector('#note-name')
        this.category = document.querySelector('#note-category')
        this.comment = document.querySelector('#note-comment')
    }

    get form() {
        return this._form
    }

    get noteName() {
        return this.name.value
    }

    get noteCategory() {
        return this.category.value
    }

    get noteComment() {
        return this.comment.value
    }

    static validateInputData(inputValue) {

    }
}

const formUi = new FormUI();

export default formUi; 