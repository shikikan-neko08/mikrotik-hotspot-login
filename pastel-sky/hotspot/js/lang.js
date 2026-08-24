/**
 * Multi-Language Handler for MikroTik Hotspot
 * Supports: English (EN), Indonesian (ID)
 * Automatically persists user selection in localStorage
 */

const translations = {
    EN: {
        welcome: "Welcome",
        subtitle_login: "Please Login Before Using Internet Service",
        placeholder_username: "Username",
        placeholder_password: "Password",
        btn_login: "Login >>>",
        powered_by: "Powered by MikroTik RouterOS",
        trial_info: "Free trial available, click here",

        login_successful: "Login Successful",
        redirecting: "You are being redirected...",
        btn_redirect_fallback: "If Nothing Happens Click Here >>>",

        hi_user: "Hi {user}!",
        connected: "Connected",
        trial_session: "Trial Session",
        mac_auth: "MAC Authenticated",
        ip_address: "IP Address",
        bytes_up_down: "Bytes Up/Down",
        connected_time: "Connected Time",
        time_left: "Time Left",
        auto_refresh: "Auto Refresh",
        btn_logout: "Logout",
        status: "Status",

        logged_out: "Logged Out!",
        logged_out_sub: "You Have Been Logged Out",
        mac_address: "MAC Address",
        session_time: "Session Time",
        traffic: "Traffic",
        btn_login_again: "Login",

        error_title: "Hotspot Error",
        btn_back_login: "Back to Login >>>"
    },
    ID: {
        welcome: "Selamat Datang",
        subtitle_login: "Silahkan Login Sebelum Menggunakan Layanan Internet",
        placeholder_username: "Username",
        placeholder_password: "Password",
        btn_login: "Login >>>",
        powered_by: "Didukung oleh MikroTik RouterOS",
        trial_info: "Tersedia uji coba gratis, klik di sini",

        login_successful: "Login Berhasil",
        redirecting: "Anda sedang dialihkan...",
        btn_redirect_fallback: "Jika Tidak Terjadi Apa-apa Klik Disini >>>",

        hi_user: "Hi {user}!",
        connected: "Terhubung",
        trial_session: "Sesi Uji Coba",
        mac_auth: "Autentikasi MAC",
        ip_address: "Alamat IP",
        bytes_up_down: "Byte Unggah/Unduh",
        connected_time: "Waktu Terhubung",
        time_left: "Sisa Waktu",
        auto_refresh: "Refresh Otomatis",
        btn_logout: "Logout",
        status: "Status",

        logged_out: "Logged Out!",
        logged_out_sub: "Anda Telah Keluar Dari Jaringan",
        mac_address: "Alamat MAC",
        session_time: "Lama Sesi",
        traffic: "Lalu Lintas Data",
        btn_login_again: "Login",

        error_title: "Kesalahan Hotspot",
        btn_back_login: "Kembali ke Login >>>"
    }
};

function getSavedLanguage() {
    try {
        const saved = localStorage.getItem('mikrotik_hotspot_lang');
        if (saved && translations[saved]) {
            return saved;
        }
    } catch (e) {
        console.warn(e);
    }
    return 'EN';
}

function setLanguage(lang) {
    if (!translations[lang]) return;
    try {
        localStorage.setItem('mikrotik_hotspot_lang', lang);
    } catch (e) {
        console.warn(e);
    }
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const t = translations[lang] || translations.EN;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (key === 'hi_user') {
                const username = el.getAttribute('data-username') || 'User';
                el.textContent = t[key].replace('{user}', username);
            } else {
                el.textContent = t[key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.getAttribute('data-i18n-value');
        if (t[key]) {
            el.value = t[key];
        }
    });

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = lang;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getSavedLanguage();
    applyLanguage(currentLang);

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});