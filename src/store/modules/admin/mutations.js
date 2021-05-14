export default {
    setUsers(state, payload) {
        state.users = payload;
    },
    setUser(state, payload) {
        state.user = payload;
    },
    addUser(state, payload) {
        state.users.push(payload)
    },
    updateUser(state, payload) {
        state.users.push(payload)
    }
}