export interface SessionState {
    token: string | null;
    expiresAt: number | null;
}

class SessionManager {
    private token: string | null = null;
    private expiresAt: number | null = null;

    /**
     * Securely store the JWT token in memory only.
     * It is never written to localStorage to prevent XSS exfiltration.
     */
    setSession(token: string, expiresInMs: number) {
        this.token = token;
        this.expiresAt = Date.now() + expiresInMs;
    }

    /**
     * Retrieve the current token
     */
    getToken(): string | null {
        if (!this.isValid()) {
            this.clearSession();
            return null;
        }
        return this.token;
    }

    /**
     * Check if the session is currently valid
     */
    isValid(): boolean {
        if (!this.token || !this.expiresAt) return false;
        return Date.now() < this.expiresAt;
    }

    /**
     * Wipe the session from memory
     */
    clearSession() {
        this.token = null;
        this.expiresAt = null;
    }
}

// Export as singleton for cross-app shared state
export const sessionManager = new SessionManager();
