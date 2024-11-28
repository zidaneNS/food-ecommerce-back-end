const { v4: uuid } = require('uuid');

// Fungsi untuk enkripsi menggunakan Vigenère Cipher
const Enkripsi_vigenere = (text, key) => {
    let result = '';
    const panjang_key = key.length;
    let index_key = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Hanya mengenkripsi huruf
        if (/[a-zA-Z]/.test(char)) {
            const base = (char === char.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            const keyChar = key[index_key % panjang_key];
            const keyBase = (keyChar === keyChar.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);

            result += String.fromCharCode(((char.charCodeAt(0) - base + (keyChar.charCodeAt(0) - keyBase)) % 26) + base);
            index_key++;
        } else {
            result += char; // Karakter non-huruf tetap
        }
    }
    
    return result;
};

// Fungsi untuk dekripsi menggunakan Vigenère Cipher
const Deskripsi_vigenere = (text, key) => {
    let result = '';
    const panjang_key = key.length;
    let index_key = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Hanya mendekripsi huruf
        if (/[a-zA-Z]/.test(char)) {
            const base = (char === char.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            const keyChar = key[index_key % panjang_key];
            const keyBase = (keyChar === keyChar.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);

            result += String.fromCharCode(((char.charCodeAt(0) - base - (keyChar.charCodeAt(0) - keyBase) + 26) % 26) + base);
            index_key++;
        } else {
            result += char; // Karakter non-huruf tetap
        }
    }
    
    return result;
};

// Contoh data yang akan dienkripsi
const data = {
    date: '2022-11-07',
    notes: {
        order:  [
            { name: 'poke', price: 12000 },
            { name: 'peko', price: 11000 }
        ],
        total: 33000
    }
};

const generateVigenereKey = () => {
    const rawKey = uuid(); // UUID
    return rawKey.replace(/[^a-zA-Z]/g, '').slice(0, 16); // Ambil 16 huruf pertama
};

const vigenereKey = generateVigenereKey();

const dataInput = JSON.stringify(data);

module.exports = { Enkripsi_vigenere, generateVigenereKey, Deskripsi_vigenere }