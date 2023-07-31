import { v4 as uuidv4 } from "uuid"

class Note {
    static dateRegex = /\b(?:\d{1,2}\/\d{1,2}\/\d{4}|\w+\s\d{1,2},\s\d{4})\b/g;

    constructor(name, category, content) {
        this.name = name
        this.category = category
        this.content = content
        this.dates = this.findDate(content)
        this.id = uuidv4()
        this.createdAt = Note.generateDate()
        this.isArchived = false
    }

    findDate(content) {
        const match = content.match(Note.dateRegex)

        if (match) {
            return match
        } else {
            return []
        }

    }

    archiveNote() {
        this.isArchived = !this.isArchived
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