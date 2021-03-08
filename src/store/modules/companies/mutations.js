export default {
    setCompanies(state, payload) {
        state.companies = payload;
    },
    setCompany(state, payload) {
        state.company = payload;
    },
    addCompany(state, payload) {
        state.companies.push(payload)
    },
    updateCompany(state, payload) {
        state.companies.push(payload)
    },
    unloadCompany(state) {
        state.company = null;
    }
};