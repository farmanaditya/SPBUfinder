# **SPBU Finder**

**SPBU Finder** adalah aplikasi mobile berbasis **React Native** yang menampilkan titik lokasi SPBU (Stasiun Pengisian Bahan Bakar Umum) . Aplikasi ini dilengkapi fitur peta interaktif, marker clustering, penambahan data SPBU, dan halaman profil pengembang.

---

## **Komponen Pembangun Produk**

### **Teknologi dan Library Utama**
- **React Native** – Framework utama untuk pengembangan aplikasi mobile.
- **React Native WebView** – Menampilkan peta interaktif berbasis Leaflet Maps di dalam aplikasi.
- **Firebase Realtime Database** – Sebagai sumber data untuk membaca dan menambahkan data SPBU.
- **Leaflet.js** – Library untuk peta interaktif dan clustering marker.
- **FontAwesome Icons** – Untuk ikon pada navigasi dan tombol-tombol aplikasi.
- **React Navigation** – Untuk navigasi antar layar/tab dalam aplikasi.

---

## **Sumber Data**
Data SPBU digunakan dari dua sumber utama:
1. **File JSON Lokal** – `spbu.json` data didapatkan dengan scrapping data dari Google Maps.
2. **Firebase Realtime Database** – Data tambahan diambil secara real-time untuk update.

---

## **Tampilan Aplikasi**

### **1. Maps Screen**

![maps](https://drive.google.com/file/d/15BjBnBgd6f5V2CL4ds5HAmic-l-zEES6/view?usp=sharing)

  - Menampilkan peta interaktif menggunakan **Leaflet.js**.
  - Menampilkan semua SPBU dalam bentuk **marker clustering**.
  - Informasi detail SPBU: nama, alamat, jam buka/tutup.
  - Tombol untuk membuka navigasi di **Google Maps**.

### **2. Tambah SPBU Screen Screen**

![list](https://drive.google.com/file/d/1tB4gzLNKLKiGHo-xUSugmwe0svUmu9Us/view?usp=sharing)

![form](https://drive.google.com/file/d/1PrsRZyJNIHMMHRxJr-5epxn6V-5m7aFY/view?usp=sharing)

### **3. Profile Screen**

![profile](https://drive.google.com/file/d/15BjBnBgd6f5V2CL4ds5HAmic-l-zEES6/view?usp=sharing)