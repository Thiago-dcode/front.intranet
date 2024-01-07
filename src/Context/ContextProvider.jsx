import { createContext, useContext, useState } from 'react';
import ls from 'localstorage-slim'
const CompanyContext = createContext()
const UpdateCompany = createContext()
export function useCompany() {
    return useContext(CompanyContext)

}
export function useUpdateCompany() {
    return useContext(UpdateCompany)

}
export function CompanyProvider({ children }) {

    const [company, _setCompany] = useState('')


    function setCompany(companyName) {

        ls.config.encrypt = true;

        ls.set("COMPANY_ACTIVE", companyName);
        _setCompany(companyName);
    }
    function getCompany() {

        let _company = company
        if (!_company) {
            _company = ls.get('COMPANY_ACTIVE', { decrypt: true })
        }

        return _company
    }
    return (
        <CompanyContext.Provider value={getCompany()}>
            <UpdateCompany.Provider value={setCompany}>{children}</UpdateCompany.Provider>

        </CompanyContext.Provider>
    )
}