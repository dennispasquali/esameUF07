
import { useState } from "react";
import Carousel from "../components/Carousel";
import NavBar from "../components/NavBar";
import ProductItem from "../components/ProductItem";
import style from "../PagesStyle/Home.module.css";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
const prodotti = [
  {
    "id": 1,
    "title": "Sony WH-1000XM5",
    "description": "Cuffie Wireless con Noise Cancelling leader del settore, 30 ore di batteria.",
    "image": "https://placehold.co/400x400?text=Sony+Headphones",
    "price": 299.00,
    "oldPrice": "399.00",
    "rating": 4.8,
    "numberOfRatings": 1250
  },
  {
    "id": 2,
    "title": "Apple AirTag (4 Pack)",
    "description": "Tieni traccia delle tue chiavi, portafoglio, valigia, zaino e molto altro.",
    "image": "https://placehold.co/400x400?text=Apple+AirTag",
    "price": 95.00,
    "rating": 4.9,
    "numberOfRatings": 8500
  },
  {
    "id": 3,
    "title": "Kindle Paperwhite 16GB",
    "description": "Ora con schermo da 6,8'' e tonalità della luce regolabile, batteria a lunga durata.",
    "image": "https://placehold.co/400x400?text=Kindle",
    "price": 139.99,
    "oldPrice": "169.99",
    "rating": 4.7,
    "numberOfRatings": 5320
  },
  {
    "id": 4,
    "title": "Logitech MX Master 3S",
    "description": "Mouse Performance Wireless, Scorrimento ultraveloce, Ergonomico, 8K DPI.",
    "image": "https://placehold.co/400x400?text=Logitech+Mouse",
    "price": 99.00,
    "oldPrice": "129.00",
    "rating": 4.8,
    "numberOfRatings": 3100
  },
  {
    "id": 5,
    "title": "Samsung Galaxy S23 Ultra",
    "description": "Smartphone Android, Caricatore incluso, fotocamera 200MP, S Pen integrata.",
    "image": "https://placehold.co/400x400?text=Galaxy+S23",
    "price": 1100.00,
    "oldPrice": "1479.00",
    "rating": 4.6,
    "numberOfRatings": 980
  },
  {
    "id": 6,
    "title": "Nespresso Inissia",
    "description": "Macchina per caffè espresso a capsule, design compatto e leggero.",
    "image": "https://placehold.co/400x400?text=Nespresso",
    "price": 89.00,
    "rating": 4.5,
    "numberOfRatings": 15000
  },
  {
    "id": 7,
    "title": "PlayStation 5 Controller DualSense",
    "description": "Controller wireless per PS5, Feedback aptico, Grilletti adattivi, Microfono integrato.",
    "image": "https://placehold.co/400x400?text=PS5+Controller",
    "price": 64.99,
    "oldPrice": "69.99",
    "rating": 4.8,
    "numberOfRatings": 22000
  },
  {
    "id": 8,
    "title": "LEGO Star Wars Millennium Falcon",
    "description": "Set di costruzioni per adulti e ragazzi, include minifigure classiche.",
    "image": "https://placehold.co/400x400?text=LEGO+Falcon",
    "price": 159.99,
    "rating": 4.9,
    "numberOfRatings": 450
  },
  {
    "id": 9,
    "title": "Fitbit Charge 6",
    "description": "Tracker per fitness e salute, GPS integrato, monitoraggio battito cardiaco.",
    "image": "https://placehold.co/400x400?text=Fitbit",
    "price": 149.00,
    "oldPrice": "179.00",
    "rating": 4.3,
    "numberOfRatings": 1100
  },
  {
    "id": 10,
    "title": "Echo Dot (5ª generazione)",
    "description": "Altoparlante intelligente con Alexa, audio migliorato e design sferico.",
    "image": "https://placehold.co/400x400?text=Echo+Dot",
    "price": 34.99,
    "oldPrice": "59.99",
    "rating": 4.6,
    "numberOfRatings": 45000
  },
  {
    "id": 11,
    "title": "Air Fryer Philips Essential",
    "description": "Friggitrice ad aria XL, tecnologia Rapid Air, touchscreen digitale.",
    "image": "https://placehold.co/400x400?text=Air+Fryer",
    "price": 110.50,
    "oldPrice": "169.99",
    "rating": 4.7,
    "numberOfRatings": 8900
  },
  {
    "id": 12,
    "title": "Apple MacBook Air M2",
    "description": "Laptop 13.6 pollici, chip Apple M2, 8GB RAM, 256GB SSD, Grigio Siderale.",
    "image": "https://placehold.co/400x400?text=MacBook+Air",
    "price": 1099.00,
    "oldPrice": "1349.00",
    "rating": 4.9,
    "numberOfRatings": 2100
  },
  {
    "id": 13,
    "title": "Casio Orologio Vintage",
    "description": "Orologio digitale unisex in acciaio inossidabile, stile retrò.",
    "image": "https://placehold.co/400x400?text=Casio+Watch",
    "price": 29.90,
    "rating": 4.5,
    "numberOfRatings": 12000
  },
  {
    "id": 14,
    "title": "Zaino Herschel Little America",
    "description": "Zaino casual per laptop 15 pollici, ideale per scuola e viaggi.",
    "image": "https://placehold.co/400x400?text=Herschel+Backpack",
    "price": 85.00,
    "oldPrice": "110.00",
    "rating": 4.7,
    "numberOfRatings": 3400
  },
  {
    "id": 15,
    "title": "GoPro HERO12 Black",
    "description": "Action cam impermeabile con video 5.3K60 Ultra HD, foto da 27MP.",
    "image": "https://placehold.co/400x400?text=GoPro",
    "price": 399.00,
    "oldPrice": "449.00",
    "rating": 4.6,
    "numberOfRatings": 850
  },
  {
    "id": 16,
    "title": "Harry Potter e la Pietra Filosofale",
    "description": "Edizione illustrata con copertina rigida, primo libro della saga.",
    "image": "https://placehold.co/400x400?text=Harry+Potter+Book",
    "price": 25.00,
    "rating": 4.9,
    "numberOfRatings": 56000
  },
  {
    "id": 17,
    "title": "Dyson V15 Detect",
    "description": "Aspirapolvere senza filo intelligente, potente e leggero.",
    "image": "https://placehold.co/400x400?text=Dyson+Vacuum",
    "price": 699.00,
    "oldPrice": "799.00",
    "rating": 4.7,
    "numberOfRatings": 1500
  },
  {
    "id": 18,
    "title": "Monitor LG 27'' 4K",
    "description": "Monitor UHD 4K IPS, HDR10, AMD FreeSync, ideale per gaming e lavoro.",
    "image": "https://placehold.co/400x400?text=LG+Monitor",
    "price": 279.00,
    "oldPrice": "349.00",
    "rating": 4.5,
    "numberOfRatings": 900
  },
  {
    "id": 19,
    "title": "Power Bank Anker 20000mAh",
    "description": "Batteria portatile ad alta capacità, ricarica rapida per iPhone e Samsung.",
    "image": "https://placehold.co/400x400?text=Anker+Powerbank",
    "price": 39.99,
    "rating": 4.8,
    "numberOfRatings": 18000
  },
  {
    "id": 20,
    "title": "Adidas Stan Smith",
    "description": "Sneakers unisex bianche e verdi, stile iconico e comfort quotidiano.",
    "image": "https://placehold.co/400x400?text=Adidas+Shoes",
    "price": 75.00,
    "oldPrice": "100.00",
    "rating": 4.6,
    "numberOfRatings": 5600
  },
  {
    "id": 21,
    "title": "Tappetino Yoga Manduka",
    "description": "Tappetino professionale antiscivolo, ecologico e durevole.",
    "image": "https://placehold.co/400x400?text=Yoga+Mat",
    "price": 65.00,
    "rating": 4.7,
    "numberOfRatings": 400
  },
  {
    "id": 22,
    "title": "Moleskine Classic Notebook",
    "description": "Taccuino copertina rigida, pagine a righe, nero, formato Large.",
    "image": "https://placehold.co/400x400?text=Moleskine",
    "price": 18.50,
    "rating": 4.8,
    "numberOfRatings": 7000
  },
  {
    "id": 23,
    "title": "Cavo USB-C a Lightning",
    "description": "Cavo di ricarica rapida certificato Apple, lunghezza 2 metri.",
    "image": "https://placehold.co/400x400?text=USB+Cable",
    "price": 12.99,
    "rating": 4.5,
    "numberOfRatings": 2300
  },
  {
    "id": 24,
    "title": "Chromecast con Google TV",
    "description": "Trasforma la tua TV in Smart TV, streaming 4K HDR e controllo vocale.",
    "image": "https://placehold.co/400x400?text=Chromecast",
    "price": 59.00,
    "oldPrice": "69.99",
    "rating": 4.7,
    "numberOfRatings": 6500
  },
  {
    "id": 25,
    "title": "Ray-Ban Aviator",
    "description": "Occhiali da sole classici, montatura dorata e lenti verdi.",
    "image": "https://placehold.co/400x400?text=RayBan",
    "price": 115.00,
    "oldPrice": "155.00",
    "rating": 4.6,
    "numberOfRatings": 3000
  },
  {
    "id": 26,
    "title": "Borrraccia Termica 500ml",
    "description": "Bottiglia in acciaio inox, mantiene freddo per 24h e caldo per 12h.",
    "image": "https://placehold.co/400x400?text=Water+Bottle",
    "price": 19.90,
    "rating": 4.8,
    "numberOfRatings": 4500
  },
  {
    id: 27,
    title: "Cuffie Bluetooth Sony WH-1000XM5",
    description: "Cuffie con la migliore cancellazione del rumore sul mercato e 30h di batteria.", // CAMPO MANCANTE AGGIUNTO
    image: "https://via.placeholder.com/200",
    price: 299.00,        // ORA È UN NUMERO (senza virgolette)
    oldPrice: "399.00",   // Questo è rimasto stringa come da tua interfaccia
    rating: 4.5,          // Voto (es. 4.5 su 5)
    numberOfRatings: 1205 // Numero di recensioni (separato dal voto)
  },
  {
    id: 28,
    title: "Apple AirTag confezione da 4",
    description: "Tieni traccia delle tue chiavi, portafoglio, valigia, zaino e molto altro.",
    image: "https://via.placeholder.com/200",
    price: 95.00,         // NUMERO
    rating: 4.8,
    numberOfRatings: 850
    // oldPrice è opzionale, qui non c'è
  },
  // ... i tuoi prodotti precedenti fino al 28 ...
  {
    id: 29,
    title: "Sony WH-1000XM5 Cuffie Wireless",
    description: "Cancellazione del rumore leader del settore e audio eccezionale.",
    image: "https://via.placeholder.com/200",
    price: 349.00,
    rating: 4.8,
    numberOfRatings: 1250
  },
  {
    id: 30,
    title: "Logitech MX Master 3S",
    description: "Mouse wireless performante per Mac e Windows, ultra silenzioso.",
    image: "https://via.placeholder.com/200",
    price: 99.99,
    rating: 4.9,
    numberOfRatings: 3400
  },
  {
    id: 31,
    title: "Samsung T7 Shield SSD 1TB",
    description: "SSD portatile robusto, resistente ad acqua e polvere IP65.",
    image: "https://via.placeholder.com/200",
    price: 119.00,
    rating: 4.7,
    numberOfRatings: 890
  },
  {
    id: 32,
    title: "Kindle Paperwhite 16GB",
    description: "Ora con schermo da 6,8'' e tonalità della luce regolabile.",
    image: "https://via.placeholder.com/200",
    price: 149.99,
    rating: 4.8,
    numberOfRatings: 5600
  },
  {
    id: 33,
    title: "Anker Caricatore USB-C 20W",
    description: "Caricabatterie rapido compatto per iPhone e Samsung Galaxy.",
    image: "https://via.placeholder.com/200",
    price: 19.99,
    rating: 4.6,
    numberOfRatings: 12000
  },
  {
    id: 34,
    title: "Apple AirPods Pro (2ª gen)",
    description: "Cancellazione attiva del rumore fino a 2 volte più efficace.",
    image: "https://via.placeholder.com/200",
    price: 279.00,
    rating: 4.8,
    numberOfRatings: 4500
  },
  {
    id: 35,
    title: "Monitor Dell UltraSharp 27''",
    description: "Monitor 4K USB-C perfetto per grafica e produttività.",
    image: "https://via.placeholder.com/200",
    price: 450.00,
    rating: 4.5,
    numberOfRatings: 320
  },
  {
    id: 36,
    title: "Keychron K2 Tastiera Meccanica",
    description: "Tastiera wireless 75% compatibile con Mac e Windows.",
    image: "https://via.placeholder.com/200",
    price: 110.00,
    rating: 4.4,
    numberOfRatings: 540
  },
  {
    id: 37,
    title: "GoPro HERO11 Black",
    description: "Video in 5.3K60 + 4K120, stabilizzazione HyperSmooth 5.0.",
    image: "https://via.placeholder.com/200",
    price: 399.00,
    rating: 4.7,
    numberOfRatings: 1100
  },
  {
    id: 38,
    title: "JBL Flip 6 Speaker Bluetooth",
    description: "Speaker portatile impermeabile con suono potente e bassi profondi.",
    image: "https://via.placeholder.com/200",
    price: 109.00,
    rating: 4.6,
    numberOfRatings: 2300
  },
  {
    id: 39,
    title: "Razer DeathAdder V3 Pro",
    description: "Mouse da gaming ultra leggero per eSports.",
    image: "https://via.placeholder.com/200",
    price: 149.99,
    rating: 4.5,
    numberOfRatings: 670
  },
  {
    id: 40,
    title: "Wacom Intuos S Tavoletta Grafica",
    description: "Tavoletta con penna per dipingere, disegnare e fare fotoritocco.",
    image: "https://via.placeholder.com/200",
    price: 69.90,
    rating: 4.4,
    numberOfRatings: 1500
  },
  {
    id: 41,
    title: "Supporto Laptop Alluminio",
    description: "Stand ergonomico ventilato compatibile con MacBook e PC.",
    image: "https://via.placeholder.com/200",
    price: 25.50,
    rating: 4.3,
    numberOfRatings: 3400
  },
  {
    id: 42,
    title: "Hub USB-C 7 in 1",
    description: "Adattatore con HDMI 4K, USB 3.0, SD Card Reader e PD 100W.",
    image: "https://via.placeholder.com/200",
    price: 39.99,
    rating: 4.2,
    numberOfRatings: 980
  },
  {
    id: 43,
    title: "Elgato Stream Deck MK.2",
    description: "Controller per studio con 15 tasti LCD personalizzabili.",
    image: "https://via.placeholder.com/200",
    price: 159.99,
    rating: 4.9,
    numberOfRatings: 2100
  },
  {
    id: 44,
    title: "Webcam Logitech C920 HD Pro",
    description: "Videochiamate Full HD 1080p con audio stereo.",
    image: "https://via.placeholder.com/200",
    price: 74.99,
    rating: 4.6,
    numberOfRatings: 8500
  },
  {
    id: 45,
    title: "Microfono Blue Yeti USB",
    description: "Microfono a condensatore per registrazione e streaming professionale.",
    image: "https://via.placeholder.com/200",
    price: 119.99,
    rating: 4.7,
    numberOfRatings: 4200
  },
  {
    id: 46,
    title: "Zaino Porta PC Antifurto",
    description: "Zaino impermeabile con porta USB di ricarica per laptop 15.6\".",
    image: "https://via.placeholder.com/200",
    price: 45.00,
    rating: 4.4,
    numberOfRatings: 1200
  },
  {
    id: 47,
    title: "Philips Hue White & Color Starter Kit",
    description: "3 Lampadine LED Smart E27 con Bridge incluso.",
    image: "https://via.placeholder.com/200",
    price: 149.90,
    rating: 4.8,
    numberOfRatings: 3100
  },
  {
    id: 48,
    title: "Google Chromecast con Google TV",
    description: "Tutto il tuo intrattenimento in un unico posto, fino a 4K HDR.",
    image: "https://via.placeholder.com/200",
    price: 69.99,
    rating: 4.6,
    numberOfRatings: 1800
  },
  {
    id: 49,
    title: "SanDisk Extreme microSD 128GB",
    description: "Scheda di memoria veloce per action cam e droni, A2 App Performance.",
    image: "https://via.placeholder.com/200",
    price: 22.50,
    rating: 4.8,
    numberOfRatings: 15000
  },
  {
    id: 50,
    title: "Cavo HDMI 2.1 Ultra High Speed",
    description: "Cavo 8K 60Hz compatibile con PS5, Xbox Series X e PC.",
    image: "https://via.placeholder.com/200",
    price: 14.99,
    rating: 4.7,
    numberOfRatings: 560
  },
  {
    id: 51,
    title: "Xiaomi Mi Smart Band 7",
    description: "Activity tracker con schermo AMOLED, SpO2 e 120 modalità sport.",
    image: "https://via.placeholder.com/200",
    price: 49.90,
    rating: 4.5,
    numberOfRatings: 2200
  },
  {
    id: 52,
    title: "TP-Link RE305 Range Extender",
    description: "Ripetitore Wi-Fi AC1200 Dual Band per estendere la copertura.",
    image: "https://via.placeholder.com/200",
    price: 29.99,
    rating: 4.2,
    numberOfRatings: 4100
  },
  {
    id: 53,
    title: "Stampante HP LaserJet M110we",
    description: "Stampante laser monocromatica compatta con HP+.",
    image: "https://via.placeholder.com/200",
    price: 119.00,
    rating: 4.1,
    numberOfRatings: 900
  },
  {
    id: 54,
    title: "Risma Carta A4 80gr - 500 fogli",
    description: "Carta bianca multiuso ideale per fotocopie e stampe laser.",
    image: "https://via.placeholder.com/200",
    price: 6.50,
    rating: 4.8,
    numberOfRatings: 8000
  },
  {
    id: 55,
    title: "Bose QuietComfort 45",
    description: "Cuffie noise cancelling iconiche con comfort eccellente.",
    image: "https://via.placeholder.com/200",
    price: 269.95,
    rating: 4.7,
    numberOfRatings: 1300
  },
  {
    id: 56,
    title: "Controller Xbox Wireless Carbon Black",
    description: "Design moderno e impugnatura testurizzata per comfort di gioco.",
    image: "https://via.placeholder.com/200",
    price: 59.99,
    rating: 4.8,
    numberOfRatings: 6700
  },
  {
    id: 57,
    title: "DualSense Controller Wireless PS5",
    description: "Feedback aptico e grilletti adattivi per un'esperienza immersiva.",
    image: "https://via.placeholder.com/200",
    price: 69.99,
    rating: 4.9,
    numberOfRatings: 5400
  },
  {
    id: 58,
    title: "Nintendo Switch OLED",
    description: "Console ibrida con schermo OLED da 7 pollici colori intensi.",
    image: "https://via.placeholder.com/200",
    price: 349.99,
    rating: 4.9,
    numberOfRatings: 3200
  },
  {
    id: 59,
    title: "Mousepad Gaming XXL",
    description: "Tappetino per mouse esteso 900x400mm antiscivolo.",
    image: "https://via.placeholder.com/200",
    price: 18.99,
    rating: 4.6,
    numberOfRatings: 2100
  },
  {
    id: 60,
    title: "Seduta Ergonomica Ufficio",
    description: "Sedia operativa con supporto lombare e braccioli regolabili.",
    image: "https://via.placeholder.com/200",
    price: 189.00,
    rating: 4.3,
    numberOfRatings: 450
  },
  {
    id: 61,
    title: "Docking Station Thunderbolt 3",
    description: "Espansione porte professionale per workstation creative.",
    image: "https://via.placeholder.com/200",
    price: 249.00,
    rating: 4.5,
    numberOfRatings: 120
  },
  {
    id: 62,
    title: "Cavo Ethernet Cat8 2m",
    description: "Cavo di rete ad alta velocità 40Gbps schermato.",
    image: "https://via.placeholder.com/200",
    price: 12.99,
    rating: 4.8,
    numberOfRatings: 890
  },
  {
    id: 63,
    title: "Organizzatore Cavi da Scrivania",
    description: "Set di clip adesive per gestire i cavi di ricarica e PC.",
    image: "https://via.placeholder.com/200",
    price: 8.99,
    rating: 4.4,
    numberOfRatings: 1500
  },
  {
    id: 64,
    title: "Spray Aria Compressa 400ml",
    description: "Per la pulizia di tastiere, PC e componenti elettronici.",
    image: "https://via.placeholder.com/200",
    price: 5.99,
    rating: 4.5,
    numberOfRatings: 2300
  },
  {
    id: 65,
    title: "Kit Pulizia Schermi",
    description: "Spray detergente e panno in microfibra per monitor e TV.",
    image: "https://via.placeholder.com/200",
    price: 9.50,
    rating: 4.6,
    numberOfRatings: 1100
  },
  {
    id: 66,
    title: "Power Bank 20000mAh",
    description: "Batteria esterna ad alta capacità con ricarica rapida.",
    image: "https://via.placeholder.com/200",
    price: 35.99,
    rating: 4.5,
    numberOfRatings: 3400
  },
  {
    id: 67,
    title: "Custodia Rigida MacBook 13",
    description: "Cover protettiva sottile e leggera per MacBook Air/Pro.",
    image: "https://via.placeholder.com/200",
    price: 19.90,
    rating: 4.2,
    numberOfRatings: 870
  },
  {
    id: 68,
    title: "Filtro Privacy Monitor 24''",
    description: "Pellicola oscurante per proteggere i dati sensibili su schermo.",
    image: "https://via.placeholder.com/200",
    price: 45.00,
    rating: 4.0,
    numberOfRatings: 320
  },
  {
    id: 69,
    title: "Etichettatrice Brother P-touch",
    description: "Stampante di etichette portatile per organizzazione ufficio.",
    image: "https://via.placeholder.com/200",
    price: 39.99,
    rating: 4.6,
    numberOfRatings: 1250
  },
  {
    id: 70,
    title: "Distruggi Documenti Rexel",
    description: "Tritacarta a frammenti per sicurezza dati personali.",
    image: "https://via.placeholder.com/200",
    price: 55.00,
    rating: 4.3,
    numberOfRatings: 560
  },
  {
    id: 71,
    title: "Lampada da Scrivania LED",
    description: "Lampada dimmerabile con protezione occhi e porta USB.",
    image: "https://via.placeholder.com/200",
    price: 29.99,
    rating: 4.7,
    numberOfRatings: 1890
  },
  {
    id: 72,
    title: "Calcolatrice Scientifica Casio",
    description: "Calcolatrice tecnica con 500+ funzioni per studenti e ingegneri.",
    image: "https://via.placeholder.com/200",
    price: 24.50,
    rating: 4.8,
    numberOfRatings: 3400
  },
  {
    id: 73,
    title: "Penna 3D Filamento PLA",
    description: "Penna per stampa 3D creativa per bambini e hobby.",
    image: "https://via.placeholder.com/200",
    price: 49.90,
    rating: 4.1,
    numberOfRatings: 450
  },
  {
    id: 74,
    title: "Drone DJI Mini 3",
    description: "Drone compatto e leggero con video 4K HDR, meno di 249g.",
    image: "https://via.placeholder.com/200",
    price: 489.00,
    rating: 4.8,
    numberOfRatings: 980
  },
  {
    id: 75,
    title: "Smartwatch Garmin Fenix 7",
    description: "Orologio multisport GPS robusto con ricarica solare.",
    image: "https://via.placeholder.com/200",
    price: 699.00,
    rating: 4.7,
    numberOfRatings: 670
  },
  {
    id: 76,
    title: "Termostato Smart tado°",
    description: "Controllo intelligente del riscaldamento tramite app.",
    image: "https://via.placeholder.com/200",
    price: 199.99,
    rating: 4.4,
    numberOfRatings: 1300
  },
  {
    id: 77,
    title: "Videocamera sorveglianza Arlo",
    description: "Camera wireless 2K per sicurezza domestica interno/esterno.",
    image: "https://via.placeholder.com/200",
    price: 169.00,
    rating: 4.3,
    numberOfRatings: 890
  },
  {
    id: 78,
    title: "Router Mesh Amazon eero 6+",
    description: "Sistema Wi-Fi 6 mesh dual-band gigabit, copertura estesa.",
    image: "https://via.placeholder.com/200",
    price: 299.00,
    rating: 4.6,
    numberOfRatings: 2100
  }
];


const numberOfItemPerRow=10;
const newPages: number[] = [];
const l=3;
function resetCurrentIndexes() {
  let numberOfRow=(prodotti.length/numberOfItemPerRow)+1;
  if((prodotti.length/numberOfItemPerRow)===0 && prodotti.length>=numberOfItemPerRow) {
    numberOfRow=prodotti.length/numberOfItemPerRow;
  }

 let limit=1;
   
   if(numberOfRow>=3) {
    limit=3;
   } else {
    limit=numberOfRow;
   }
   let ind=0;
   for (let i = 0; i < limit; i++) {
    newPages[ind]=i+1;
    ind++;
    
   }
}


resetCurrentIndexes();

function Home() {

  const [endIndex,setEndIndex]=useState<number>(numberOfItemPerRow);
  const [startIndex,setStartIndex]=useState<number>(0);
  const productSliced=prodotti.slice(startIndex,endIndex);
  let numberOfRow=(prodotti.length/numberOfItemPerRow)+1;
  if((prodotti.length/numberOfItemPerRow)===0 && prodotti.length>=numberOfItemPerRow) {
    numberOfRow=prodotti.length/numberOfItemPerRow;
  }
  

  function sliceNext(val:number) {
    val=val*numberOfItemPerRow
    if(endIndex+val<(numberOfRow)*numberOfItemPerRow && startIndex+val<(numberOfRow-1)*numberOfItemPerRow) {
      setEndIndex((endIndex+val));
      setStartIndex((startIndex+val));

          const startIndexL=startIndex+val;
           if(numberOfRow-(startIndexL/numberOfItemPerRow)>3) {
            let index=0;
           for (let i =startIndexL/numberOfItemPerRow; i <startIndexL/numberOfItemPerRow+l; i++) {
              newPages[index]=i+1;
              index++;
           }
           } else {
            let index=2;
            let i=Math.trunc(numberOfRow);
            for (i; i >Math.trunc(numberOfRow)-3; i--) {
              newPages[index]=i;
              index--;
              
            }
           }
      
    }
  }

  function slicePrev(val:number) {
    val=val*numberOfItemPerRow;
    if(endIndex-val>0 && startIndex-val>=0) {
      setEndIndex(endIndex=>endIndex-val);
      setStartIndex(startIndex=>startIndex-val);
       let endIndexL=endIndex-val;
           if(endIndexL>=numberOfItemPerRow && endIndex<=((Math.trunc(numberOfRow)+1)*10)-30) {
            endIndexL=endIndex;
            let index=2;
            for (let i =endIndexL/numberOfItemPerRow; i > (endIndexL/numberOfItemPerRow-l); i--) {
              newPages[index]=i+1;
              index--;
            }
        }
    } 
  }


  function buttonChangePage(valButton:number) {
    if((endIndex/numberOfItemPerRow)<valButton) {
      sliceNext(valButton-(endIndex/numberOfItemPerRow));
    } else {
      slicePrev((endIndex/numberOfItemPerRow)-valButton);
    }

   
  }
  
  
  
    return (
        <>
            <NavBar/>
            <div className={style.carousel}>
              <Carousel/>
            </div>
            


        <div className={style.div_products}>
       
          
        
        {productSliced.map((prodotto) => (
        <ProductItem 
          reset={resetCurrentIndexes}
          key={prodotto.id}
          id={prodotto.id}
          title={prodotto.title}
          description={prodotto.description} // Nuovo
          image={prodotto.image}
          price={prodotto.price}
          oldPrice={prodotto.oldPrice}
          rating={prodotto.rating}
          numberOfRatings={prodotto.numberOfRatings} // Nuovo
               />
      ))}
            </div>
      
      <div className={style.buttons_container}>

        <Button
          
            variant="contained"  
            onClick={()=>slicePrev(1)} 
              >
           ◀ Indietro
        </Button>
        <Button key={newPages[0]} onClick={() => buttonChangePage(newPages[0])} variant="contained">
          {newPages[0]}
          
        </Button>
        <Button key={newPages[1]} onClick={() => buttonChangePage(newPages[1])} variant="contained">
          {newPages[1]}
          
        </Button>
        <Button key={newPages[2]} onClick={() => buttonChangePage(newPages[2])} variant="contained">
          {newPages[2]}
          
        </Button>
        <Button
            
            variant="contained" 
             onClick={()=>sliceNext(1)}
        >
           Avanti ▶
        </Button>
      

      </div>
        <div className={style.info_page}>
        <p>
          Pag {Math.trunc(startIndex/10)+1} di {Math.trunc(numberOfRow)}
        </p>
      </div>
        
          <Footer/>
        </>
    ) 
}

export default Home