const API_BASE_URL = "http://localhost:8080/api";

export const authService = {
  async login(username: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      throw new Error("Login failed");
    }
    
    return await response.json();
  },

  async register(username: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    
    return await response.json();
  },

  async logout() {
    // Implementa la lógica de logout según tu backend
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};
