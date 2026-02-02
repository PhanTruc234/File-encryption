
export const bufToBase64 = (buf) =>
    btoa(String.fromCharCode(...new Uint8Array(buf))); // chuyển binary sang base64

export const base64ToBuf = (b64) => {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr;
}; // chuyển base64 sang binary

export async function deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    console.log(keyMaterial, "keyMaterialkeyMaterial")
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
} // tạo key từ mật khẩu và salt

export async function encryptArrayBuffer(buffer, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    console.log(key, "keyyyyyyyy")
    const cipher = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        buffer
    );
    console.log(cipher, "fnjfnjfnjfbf")
    console.log(salt, "salttttt")
    console.log(iv, "ivvvvvvvvvvvvvvv")
    return { cipher, salt, iv };
} // mã hóa ArrayBuffer với mật khẩu

export async function decryptArrayBuffer(cipher, password, salt, iv) {
    const key = await deriveKey(password, salt);
    console.log(key, "dvdkvdnvn")
    return crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        cipher
    );
} // giải mã ArrayBuffer với mật khẩu
