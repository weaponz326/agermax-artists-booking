import { createContext, useContext, useState } from 'react'

const context = createContext()

export const useHeaderContext = () => useContext(context)

export default function HeaderContextProvider({ children }) {
  const [hideMiddleForm, setHideMiddleForm] = useState(true)
  const [selectedFormItem, setSelectedFormItem] = useState(null)

  // const toggleHideMiddleForm = value => setHideMiddleForm(value ?? !hideMiddleForm)

  return (
    <context.Provider
      value={{
        hideMiddleForm,
        setHideMiddleForm,
        selectedFormItem,
        setSelectedFormItem
        // toggleHideMiddleForm
      }}
    >
      {children}
    </context.Provider>
  )
}
