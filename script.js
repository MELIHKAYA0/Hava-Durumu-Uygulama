// Global Hava İstasyonu - Dev Veri Seti (İstanbul ve 81 İl Tam Liste)
const apiKey = "420583c44a8add4a260b11babc2421c3";

// --- DEV VERİ SETİ: TÜRKİYE (81 İL) + GENİŞ DÜNYA LİSTESİ ---
const worldData = {
    "TR": { 
        name: "Türkiye", 
        cities: [
            "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", "Şırnak", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
        ] 
    },
    "AZ": { name: "Azerbaycan", cities: ["Bakü", "Gence", "Nahçıvan", "Sumgayıt", "Lankaran", "Şeki", "Şirvan"] },
    "US": { name: "Amerika (ABD)", cities: ["New York", "Los Angeles", "Chicago", "Miami", "Houston", "San Francisco", "Seattle", "Boston", "Washington DC", "Dallas", "Atlanta"] },
    "DE": { name: "Almanya", cities: ["Berlin", "Münih", "Hamburg", "Frankfurt", "Köln", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Bremen"] },
    "GB": { name: "İngiltere", cities: ["Londra", "Manchester", "Liverpool", "Birmingham", "Leeds", "Oxford", "Cambridge", "Bristol", "Sheffield"] },
    "FR": { name: "Fransa", cities: ["Paris", "Marsilya", "Lyon", "Nice", "Toulouse", "Bordeaux", "Lille", "Nantes", "Strasbourg"] },
    "IT": { name: "İtalya", cities: ["Roma", "Milano", "Napoli", "Venedik", "Floransa", "Torino", "Palermo", "Cenova", "Bologna"] },
    "ES": { name: "İspanya", cities: ["Madrid", "Barselona", "Valencia", "Sevilla", "Malaga", "Bilbao", "Zaragoza"] },
    "RU": { name: "Rusya", cities: ["Moskova", "Saint Petersburg", "Kazan", "Soçi", "Novosibirsk", "Yekaterinburg"] },
    "JP": { name: "Japonya", cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Hiroşima", "Sapporo"] },
    "CN": { name: "Çin", cities: ["Pekin", "Şanghay", "Guangzhou", "Shenzhen", "Hong Kong", "Wuhan", "Chengdu"] },
    "IN": { name: "Hindistan", cities: ["Yeni Delhi", "Mumbai", "Bangalore", "Haydarabad", "Kalküta", "Chennai"] },
    "BR": { name: "Brezilya", cities: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza"] },
    "CA": { name: "Kanada", cities: ["Toronto", "Montreal", "Vancouver", "Ottawa", "Calgary", "Edmonton"] },
    "AU": { name: "Avustralya", cities: ["Sidney", "Melbourne", "Brisbane", "Perth", "Adelaide"] },
    "NL": { name: "Hollanda", cities: ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "Lahey"] },
    "CH": { name: "İsviçre", cities: ["Zürih", "Cenevre", "Basel", "Bern", "Lozan"] },
    "SE": { name: "İsveç", cities: ["Stokholm", "Göteborg", "Malmö"] },
    "NO": { name: "Norveç", cities: ["Oslo", "Bergen", "Trondheim"] },
    "GR": { name: "Yunanistan", cities: ["Atina", "Selanik", "Patras", "Kandiye"] },
    "AE": { name: "B.A.E (Dubai)", cities: ["Dubai", "Abu Dabi", "Şarika", "Acman"] },
    "SA": { name: "Suudi Arabistan", cities: ["Riyad", "Cidde", "Mekke", "Medine", "Dammam"] },
    "EG": { name: "Mısır", cities: ["Kahire", "İskenderiye", "Gize", "Port Said"] }
};

// --- ARAMA VE SEÇİM MANTIGI ---
function setupSelect(wrapperId, data, callback) {
    const wrapper = document.getElementById(wrapperId);
    const trigger = wrapper.querySelector('.select-trigger span');
    const list = wrapper.querySelector('.options-list');
    const search = wrapper.querySelector('.select-search');
    const hidden = wrapper.querySelector('input[type="hidden"]');

    const render = (filter = "") => {
        list.innerHTML = "";
        data.filter(i => i.text.toLowerCase().includes(filter.toLowerCase())).forEach(item => {
            const el = document.createElement('div');
            el.className = 'option';
            el.textContent = item.text;
            el.onclick = () => {
                trigger.textContent = item.text;
                hidden.value = item.value;
                wrapper.querySelector('.custom-select').classList.remove('open');
                if (callback) callback(item.value);
            };
            list.appendChild(el);
        });
    };

    wrapper.querySelector('.select-trigger').onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.custom-select').forEach(cs => cs !== wrapper.querySelector('.custom-select') && cs.classList.remove('open'));
        wrapper.querySelector('.custom-select').classList.toggle('open');
        search.focus();
    };

    search.oninput = (e) => render(e.target.value);
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    const countries = Object.keys(worldData).map(k => ({ value: k, text: worldData[k].name }));
    setupSelect('country-wrapper', countries, (code) => {
        const cityWrapper = document.getElementById('city-wrapper');
        const cities = worldData[code].cities.sort().map(c => ({ value: c, text: c }));
        setupSelect('city-wrapper', cities, (name) => { document.getElementById('selectedCityName').value = name; });
        cityWrapper.classList.remove('disabled');
        cityWrapper.querySelector('.select-trigger span').textContent = "Şehir Seçiniz...";
    });
    initGlobe();
});

// --- HAVA DURUMU SORGULAMA ---
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
            document.getElementById('temp').innerText = Math.round(data.main.temp);
            document.getElementById('city').innerText = data.name;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('humidity').innerText = `%${data.main.humidity}`;
            document.getElementById('wind').innerText = `${Math.round(data.wind.speed * 3.6)} km/s`;
            const icon = document.getElementById('weather-icon');
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            icon.style.display = "block";
            
            // Yağmur Efektleri
            document.getElementById('weather-effects').innerHTML = "";
            if(data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                for(let i=0; i<60; i++) {
                    const d = document.createElement('div'); d.className = 'rain-drop';
                    d.style.left = Math.random() * 100 + "vw";
                    d.style.animationDuration = (Math.random() * 0.5 + 0.5) + "s";
                    document.getElementById('weather-effects').appendChild(d);
                }
            }
        }
    } catch (e) { alert("Bağlantı hatası!"); }
}

document.getElementById('searchBtn').onclick = () => {
    const c = document.getElementById('selectedCityName').value;
    if(c) getWeather(c); else alert("Lütfen bir şehir seçin!");
};

// --- 3D DÜNYA (Minimalist) ---
let globe;
function initGlobe() {
    globe = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .atmosphereColor('lightskyblue')
        .atmosphereAltitude(0.15)
        (document.getElementById('globe-container'));
    globe.controls().autoRotate = false;
}

const globeBtn = document.getElementById('globeBtn');
const closeGlobe = document.getElementById('closeGlobe');
const gCont = document.getElementById('globe-container');
const card = document.getElementById('main-card');

globeBtn.onclick = () => { gCont.style.display = 'block'; closeGlobe.style.display = 'flex'; card.style.display = 'none'; };
closeGlobe.onclick = () => { gCont.style.display = 'none'; closeGlobe.style.display = 'none'; card.style.display = 'block'; };