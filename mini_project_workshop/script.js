// script.js — Mini Project: Form Pendaftaran Workshop
// Dimuat dengan atribut defer sehingga elemen HTML sudah tersedia.

/* ---------- Mengambil elemen ---------- */
const form = document.getElementById("formWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const pilihSesi = document.getElementById("sesi");
const inputCatatan = document.getElementById("catatan");
const tombolReset = document.getElementById("tombolReset");

const errorNama = document.getElementById("errorNama");
const errorEmail = document.getElementById("errorEmail");
const errorSesi = document.getElementById("errorSesi");
const infoSesi = document.getElementById("infoSesi");
const pesanSukses = document.getElementById("pesanSukses");

const jumlahKarakter = document.getElementById("jumlahKarakter");
const ringNama = document.getElementById("ringNama");
const ringEmail = document.getElementById("ringEmail");
const ringSesi = document.getElementById("ringSesi");

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/* ---------- Fungsi bantu untuk pesan kesalahan ---------- */
function tampilkanError(elemenInput, elemenError, teks) {
    elemenError.textContent = teks;
    elemenInput.classList.add("tidak-valid");
}

function hapusError(elemenInput, elemenError) {
    elemenError.textContent = "";
    elemenInput.classList.remove("tidak-valid");
}


/* ---------- Fungsi validasi (mengembalikan pesan, atau "" jika valid) ---------- */
function validasiNama() {
    const nilai = inputNama.value.trim();
    if (nilai === "") return "Nama wajib diisi.";
    if (nilai.length < 3) return "Nama minimal terdiri dari 3 karakter.";
    return "";
}

function validasiEmail() {
    const nilai = inputEmail.value.trim();
    if (nilai === "") return "Email wajib diisi.";
    if (!polaEmail.test(nilai)) return "Masukkan email yang valid, misalnya nama@email.com.";
    return "";
}

function validasiSesi() {
    if (pilihSesi.value === "") return "Pilih salah satu sesi workshop.";
    return "";
}


/* ---------- Fungsi interaktif 1: ringkasan input secara langsung ---------- */
function perbaruiRingkasan() {
    ringNama.textContent = inputNama.value.trim() || "-";
    ringEmail.textContent = inputEmail.value.trim() || "-";
    ringSesi.textContent = pilihSesi.value || "-";
}

/* ---------- Fungsi interaktif 2: penghitung karakter catatan ---------- */
function perbaruiHitungan() {
    jumlahKarakter.textContent = inputCatatan.value.length;
}

/* ---------- Fungsi interaktif 3: kembalikan tampilan ke keadaan awal ---------- */
function kosongkanTampilan() {
    hapusError(inputNama, errorNama);
    hapusError(inputEmail, errorEmail);
    hapusError(pilihSesi, errorSesi);
    infoSesi.textContent = "";
    perbaruiRingkasan();
    perbaruiHitungan();
}


/* ---------- Event input: ringkasan langsung + hapus pesan kesalahan ---------- */
inputNama.addEventListener("input", function () {
    hapusError(inputNama, errorNama);
    pesanSukses.textContent = "";
    perbaruiRingkasan();
});

inputEmail.addEventListener("input", function () {
    hapusError(inputEmail, errorEmail);
    pesanSukses.textContent = "";
    perbaruiRingkasan();
});

/* ---------- Event input: penghitung karakter ---------- */
inputCatatan.addEventListener("input", perbaruiHitungan);

/* ---------- Event change: sesi workshop yang dipilih (Eksperimen 3) ---------- */
pilihSesi.addEventListener("change", function () {
    hapusError(pilihSesi, errorSesi);
    pesanSukses.textContent = "";
    infoSesi.textContent = pilihSesi.value === ""
        ? ""
        : "Sesi yang dipilih: " + pilihSesi.value;
    perbaruiRingkasan();
});


/* ---------- Event submit: validasi seluruh form ---------- */
form.addEventListener("submit", function (event) {
    event.preventDefault();          // cegah halaman dimuat ulang
    pesanSukses.textContent = "";

    const kesalahanNama = validasiNama();
    const kesalahanEmail = validasiEmail();
    const kesalahanSesi = validasiSesi();

    hapusError(inputNama, errorNama);
    hapusError(inputEmail, errorEmail);
    hapusError(pilihSesi, errorSesi);

    if (kesalahanNama) tampilkanError(inputNama, errorNama, kesalahanNama);
    if (kesalahanEmail) tampilkanError(inputEmail, errorEmail, kesalahanEmail);
    if (kesalahanSesi) tampilkanError(pilihSesi, errorSesi, kesalahanSesi);

    if (kesalahanNama || kesalahanEmail || kesalahanSesi) {
        // fokuskan ke kolom pertama yang bermasalah
        if (kesalahanNama) inputNama.focus();
        else if (kesalahanEmail) inputEmail.focus();
        else pilihSesi.focus();
        return;
    }

    // semua valid: simpan data untuk pesan, lalu bersihkan form
    const nama = inputNama.value.trim();
    const sesi = pilihSesi.value;

    form.reset();
    kosongkanTampilan();
    pesanSukses.textContent =
        "Pendaftaran berhasil! Terima kasih, " + nama + ". Anda terdaftar pada " + sesi + ".";
});


/* ---------- Event click: tombol Reset ---------- */
tombolReset.addEventListener("click", function () {
    form.reset();
    kosongkanTampilan();
    pesanSukses.textContent = "";
    inputNama.focus();
});
