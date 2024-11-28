// Fungsi untuk melakukan shift cipher dengan pergeseran bebas
const Enkripsi_shift_chipher = (text, shift) => {
    let result = '';
    
    // Loop untuk setiap karakter dalam string
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Hanya menggeser huruf, tidak mengubah karakter selain huruf
        if (/[a-zA-Z]/.test(char)) {
            const base = (char === char.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        } else {
            result += char; // Karakter non-huruf tetap
        }
    }
    
    return result;
};

// Fungsi untuk dekripsi shift cipher
const Deskripsi_shift_chipher = (text, shift) => {
    return Enkripsi_shift_chipher(text, 26 - shift); // Menggunakan penggeseran kebalikan
};

// Contoh data yang akan dienkripsi
const data = {
    date: '2022-11-07',
    notes: [
        { name: 'poke', price: 12000 },
        { name: 'peko', price: 11000 }
    ]
};

const dataInput = JSON.stringify(data);

const generateShiftKey = () => Math.floor(Math.random()*100000) % 26
// Kunci enkripsi
const shift_key = generateShiftKey() // Kunci shift yang diinginkan

module.exports = { Enkripsi_shift_chipher , Deskripsi_shift_chipher, generateShiftKey }