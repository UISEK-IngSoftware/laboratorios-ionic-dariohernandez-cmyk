const USERNAME_KEY = "github_username";
const TOKEN_KEY = "github_token";

class AuthService {
  login(username: string, token: string): boolean {
    if (username.trim() && token.trim()) {
      // 🔹 Limpia datos previos antes de guardar
      this.logout();

      // 🔹 Guarda usuario y token
      localStorage.setItem(USERNAME_KEY, username);
      localStorage.setItem(TOKEN_KEY, token);

      // 🔹 Verifica inmediatamente si se guardaron correctamente
      return this.isAuthenticated();
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const username = this.getUsername();
    const token = this.getToken();
    return Boolean(username && token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  getAuthHeader(): string | null {
    const username = this.getUsername();
    const token = this.getToken();

    if (username && token) {
      // 🔹 Usa Basic Auth correctamente codificado
      return "Basic " + btoa(`${username}:${token}`);
    }
    return null;
  }
}

export default new AuthService();
