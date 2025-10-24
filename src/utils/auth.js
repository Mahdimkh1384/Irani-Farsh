export const saveAuthData = (token, user) => {
    if (!token || !user) return;
    localStorage.setItem("sajy", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("✅ داده‌ها ذخیره شدند:", token, user);
  };
  
  export const getToken = () => localStorage.getItem("sajy");
  
  export const getUserData = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  export const isAuthenticated = () => !!localStorage.getItem("sajy");
  
  export const logout = () => {
    localStorage.removeItem("sajy");
    localStorage.removeItem("user");
  };
  