export const saveAuthData = (token, user) => {
  if (typeof window === "undefined") return; // جلوگیری از خطا در SSR
  if (!token || !user) return;

  localStorage.setItem("sajy", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sajy");
};

export const getUserData = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("sajy");
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("sajy");
  localStorage.removeItem("user");
};
