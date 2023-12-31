export function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, { type: 'INIT' })
    const subscribers = []

    return {
        dispatch(action) {
            state = rootReducer(state, action)
            subscribers.forEach(fun => fun())
        },
        subscribe(callback) {
            subscribers.push(callback)
        },
        getState() {
            return state
        }
    }
};


