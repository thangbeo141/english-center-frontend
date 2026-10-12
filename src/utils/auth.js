export function decodeToken(token) {
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function getCurrentRole() {
  const token = localStorage.getItem('token');
  return decodeToken(token)?.role || null;
}

export function logout() {
  localStorage.clear();
}
