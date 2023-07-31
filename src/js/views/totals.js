class TotalsUI {
    constructor() {
        this._tbody = document.querySelector('#totals-tbody')
        this.activeTasks = document.querySelector('#active-tasks')
        this.archivedTasks = document.querySelector('#archived-tasks')

        this.activeThoughts = document.querySelector('#active-thoughts')
        this.archivedThoughts = document.querySelector('#archived-thoughts')

        this.activeIdeas = document.querySelector('#active-ideas')
        this.archivedIdeas = document.querySelector('#archived-ideas')
    }

    renderTotals(totals) {

        const { task, randomThought, idea } = totals

        this.activeTasks.innerHTML = task.active
        this.archivedTasks.innerHTML = task.archived

        this.activeThoughts.innerHTML = randomThought.active
        this.archivedThoughts.innerHTML = randomThought.archived

        this.activeIdeas.innerHTML = idea.active
        this.archivedIdeas.innerHTML = idea.archived
    }

}

const totalsUi = new TotalsUI();

export default totalsUi;