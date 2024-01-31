export const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  };
  
  export const getFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving from local storage:', error);
      return null;
    }
  };
  
  
export const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};
  
export const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};
  