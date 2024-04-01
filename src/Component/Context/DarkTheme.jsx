import React, { createContext } from 'react'



export const ThemeContext = createContext(); 
const DarkTheme = () => {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode')
        ;
      });
    
    
     const toggleDarkMode = () => {
        // const newTheme = darkMode === '' ? 'dark' : '';
        const newTheme = setDarkMode(!darkMode);
        localStorage.setItem('darkMode', newTheme);
      };
    


  return (
    <div>
        <ThemeContext.Provider value={{darkMode, setDarkMode,toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
      
    </div>
  )
}

export default DarkTheme
