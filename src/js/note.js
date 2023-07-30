import { v4 as uuidv4 } from "uuid"

class Note {
    dates = []
    static dateRegex = /\b(?:\d{1,2}\/\d{1,2}\/\d{4}|\w+\s\d{1,2},\s\d{4})\b/g;

    constructor(name, category, content) {
        this.name = name
        this.category = category
        this.content = content
        this.id = uuidv4()
        this.createdAt = Note.generateDate()
    }

    findDate(content) {

    }

    static generateDate() {
        const currentDate = new Date();

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return currentDate.toLocaleDateString('en-US', options);

    }
}

export default Note;