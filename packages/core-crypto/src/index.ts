export interface EncryptedPayload {
    ciphertext: string;
    iv: string;
    salt: string;
}

// Generate a random salt or IV
export const generateRandomBytes = (length: number): Uint8Array => {
    return crypto.getRandomValues(new Uint8Array(length));
};

// Derive a cryptographic key from a master password (e.g. PBKDF2)
export const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 600000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false, // The key cannot be exported
        ['encrypt', 'decrypt']
    );
};

// Encrypt a cleartext string to AES-GCM
export const encryptString = async (cleartext: string, key: CryptoKey): Promise<{ ciphertext: ArrayBuffer, iv: Uint8Array }> => {
    const enc = new TextEncoder();
    const iv = generateRandomBytes(12); // Standard for AES-GCM

    const ciphertext = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        enc.encode(cleartext)
    );

    return { ciphertext, iv };
};

// Decrypt an AES-GCM payload back to string
export const decryptString = async (ciphertext: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<string> => {
    const dec = new TextDecoder();

    const cleartextBuffer = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        ciphertext
    );

    return dec.decode(cleartextBuffer);
};
