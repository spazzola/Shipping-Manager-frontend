export default {
    setDrivers(state, payload) {
        state.drivers = payload;
    },
    setDriver(state, payload) {
        state.driver = payload;
    },
    addDriver(state, payload) {
        state.drivers.push(payload)
    },
    updateDriver(state, payload) {
        state.drivers.push(payload)
    },
    unloadCompany(state) {
        state.driver = null;
    }
}