import { createContext, useContext, useState } from "react";

const context = createContext();

export const useDropdownContext = () => useContext(context);

export default function DropdownContextProvider({ children }) {
    const [config, setConfig] = useState(null);

    const closeDropdown = () => setConfig(null);
    
    const showDropdown = (config) => setConfig(config);

    return <context.Provider value={{ config, closeDropdown, showDropdown }}>
        {children}
    </context.Provider>
}