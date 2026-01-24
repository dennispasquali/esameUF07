import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- HELPER: Generatore casuale ---
// Aggiunto '!' finale per dire a TS che l'elemento esiste sempre
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- LOGICA STATUS E COLORI ---
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Ricevuto': return 'default';
    case 'Spedito': return 'secondary';
    case 'Consegnato': return 'success';
    case 'In produzione': return 'warning';
    case 'carrello':
    default: return 'none';
  }
};

const statiPossibili = ['Ricevuto', 'In produzione', 'Spedito', 'Consegnato'];

// --- DATI STATICI ---
const nomiCitta = ['Milano', 'Roma', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze', 'Bari', 'Catania'];

const typographyProducts = [
  { title: "Biglietti da Visita Deluxe", desc: "Carta 350gr opaca, finitura soft-touch." },
  { title: "Volantini A5 Offerta", desc: "Carta patinata lucida 130gr per promozioni." },
  { title: "Brochure 3 Ante", desc: "Formato chiuso DL, aperto A4. Carta 170gr." },
  { title: "Banner PVC Rinforzato", desc: "Striscione con occhielli, per esterno." },
  { title: "Roll-up 85x200", desc: "Espositore avvolgibile con struttura." },
  { title: "Carta Intestata A4", desc: "Carta usomano 90gr laser compatibile." },
  { title: "Buste DL con Finestra", desc: "Buste commerciali adesive 11x23." },
  { title: "Adesivi in Bobina", desc: "Etichette tonde in polipropilene." },
  { title: "Calendari da Tavolo", desc: "Spirale metallica, 13 fogli." },
  { title: "Riviste Brossura", desc: "Rilegatura colla PUR, copertina 300gr." }
];

// --- DATI PER GENERARE I 50 PRODOTTI AGGIUNTIVI ---
const tipiProdotto = ["Manifesto", "Locandina", "Pieghevole", "Cartellina", "Invito", "Segnalibro", "Block Notes", "Tovaglietta", "Sottobicchiere", "Packaging"];
const finiture = ["Opaco", "Lucido", "Soft-Touch", "Ruvido", "Metallizzato", "Riciclato", "Perlato"];
const formati = ["A3", "A4", "A5", "50x70", "70x100", "Quadrato", "Personalizzato"];

async function main() {
  console.log('🗑️  Pulizia totale database...');
  // Ordine inverso per rispettare le Foreign Keys
  await prisma.review.deleteMany();
  await prisma.orderWithProducts.deleteMany();
  await prisma.order.deleteMany();
  await prisma.carosello.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.city.deleteMany();
  await prisma.nation.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Database pulito.');

  console.log('🌱 Inizio popolamento massivo...');

  // ---------------------------------------------------------
  // 1. NATIONS (10 righe)
  // ---------------------------------------------------------
  console.log('🌍 Creazione 10 Nazioni...');
  const nationsList = [];
  for (let i = 1; i <= 10; i++) {
    const nation = await prisma.nation.create({ data: { name: `Nazione ${i}` } });
    nationsList.push(nation);
  }
  const italy = nationsList[0]!; 

  // ---------------------------------------------------------
  // 2. CITIES (10 righe)
  // ---------------------------------------------------------
  console.log('🏙️  Creazione 10 Città...');
  const citiesList = [];
  for (let i = 0; i < 10; i++) {
    const city = await prisma.city.create({
      data: {
        name: nomiCitta[i]!, 
        cap: `${20100 + i}`,
        idNation: italy.id
      }
    });
    citiesList.push(city);
  }

  // ---------------------------------------------------------
  // 3. USERS (30 righe totali)
  // ---------------------------------------------------------
  console.log('👤 Creazione 30 Utenti base...');
  
  const usersForCustomers = [];
  const usersForEmployees = [];
  const usersForAdmins = [];

  // Creiamo 10 Utenti per Clienti
  for (let i = 1; i <= 10; i++) {
    usersForCustomers.push(await prisma.user.create({
      data: { name: `ClienteNome${i}`, surname: `ClienteCognome${i}`, email: `client${i}@test.com`, pwd: 'pass' }
    }));
  }
  // Creiamo 10 Utenti per Dipendenti
  for (let i = 1; i <= 10; i++) {
    usersForEmployees.push(await prisma.user.create({
      data: { name: `DipendenteNome${i}`, surname: `DipendenteCognome${i}`, email: `employee${i}@test.com`, pwd: 'pass' }
    }));
  }
  // Creiamo 10 Utenti per Admin
  for (let i = 1; i <= 10; i++) {
    usersForAdmins.push(await prisma.user.create({
      data: { name: `AdminNome${i}`, surname: `AdminCognome${i}`, email: `admin${i}@test.com`, pwd: 'pass' }
    }));
  }

  // ---------------------------------------------------------
  // 4. CUSTOMERS (10 righe)
  // ---------------------------------------------------------
  console.log('🛍️  Creazione 10 Customers...');
  const customersList = [];
  for (let i = 0; i < 10; i++) {
    const cust = await prisma.customer.create({
      data: {
        phonePrefix: '+39',
        phoneNumber: `333000000${i}`,
        street: `Via Esempio ${i}`,
        civic: i + 1,
        imgProfile: 'https://placehold.co/100',
        idUser: usersForCustomers[i]!.id, 
        idCity: getRandomItem(citiesList).id
      }
    });
    customersList.push(cust);
  }

  // ---------------------------------------------------------
  // 5. EMPLOYEES (10 righe)
  // ---------------------------------------------------------
  console.log('👷 Creazione 10 Employees...');
  for (let i = 0; i < 10; i++) {
    await prisma.employee.create({
      data: {
        role: i < 5 ? 'Grafico' : 'Stampatore',
        task: 'Gestione ordini',
        idUser: usersForEmployees[i]!.id
      }
    });
  }

  // ---------------------------------------------------------
  // 6. ADMINS (10 righe)
  // ---------------------------------------------------------
  console.log('🔑 Creazione 10 Admins...');
  for (let i = 0; i < 10; i++) {
    await prisma.admin.create({
      data: {
        idUser: usersForAdmins[i]!.id
      }
    });
  }

  // ---------------------------------------------------------
  // 7. PRODUCTS (60 righe: 10 Fissi + 50 Random)
  // ---------------------------------------------------------
  console.log('🖨️  Creazione 60 Prodotti Tipografici (10 fissi + 50 random)...');
  const productsList = [];
  const TOTALE_PRODOTTI = 60; // 10 originali + 50 nuovi

  for (let i = 0; i < TOTALE_PRODOTTI; i++) {
    let title, desc, imgText;

    // Se siamo nei primi 10, usiamo i dati statici di alta qualità
    if (i < typographyProducts.length) {
      const info = typographyProducts[i]!;
      title = info.title;
      desc = info.desc;
      imgText = info.title.substring(0, 5);
    } else {
      // Per i successivi 50, generiamo combinazioni casuali
      const tipo = getRandomItem(tipiProdotto);
      const finitura = getRandomItem(finiture);
      const formato = getRandomItem(formati);
      
      title = `${tipo} ${finitura} ${formato}`;
      desc = `Stampa professionale di ${tipo} in formato ${formato} con finitura ${finitura}. Alta resa cromatica.`;
      imgText = tipo;
    }

    const p = await prisma.product.create({
      data: {
        img: `https://placehold.co/600x400?text=${imgText}`,
        title: title,
        description: desc,
        price: parseFloat((Math.random() * 80 + 5).toFixed(2)),
        qt: getRandomInt(10, 1000),
        weigth: parseFloat((Math.random() * 2).toFixed(2)),
        heigth: getRandomInt(10, 100),
        width: getRandomInt(10, 100),
        length: getRandomInt(10, 100),
        oldPrice: Math.random() > 0.6 ? parseFloat((Math.random() * 100 + 90).toFixed(2)) : null,
        shippingDate: new Date(new Date().setDate(new Date().getDate() + getRandomInt(3, 15))),
      }
    });
    productsList.push(p);
  }

  // ---------------------------------------------------------
  // 8. ORDERS & ORDER_WITH_PRODUCTS (10 righe ciascuno)
  // ---------------------------------------------------------
  console.log('📦 Creazione 10 Ordini...');
  for (let i = 0; i < 10; i++) {
    const randomStatus = getRandomItem(statiPossibili);
    
    await prisma.order.create({
      data: {
        idUser: usersForCustomers[i]!.id, 
        date: new Date(),
        status: randomStatus,
        statusColor: getStatusColor(randomStatus),
        urlTracking: randomStatus === 'Spedito' ? 'http://track.me' : '',
        typeOrder: i % 2 === 0 ? 'Standard' : 'Express',
        
        orderWithProducts: {
          create: {
            qt: getRandomInt(1, 10),
            // Ora pesca da una lista di 60 prodotti!
            idProduct: getRandomItem(productsList).id 
          }
        }
      }
    });
  }

  // ---------------------------------------------------------
  // 9. REVIEWS (10 righe)
  // ---------------------------------------------------------
  console.log('⭐ Creazione 10 Recensioni...');
  for (let i = 0; i < 10; i++) {
    await prisma.review.create({
      data: {
        idCustomer: customersList[i]!.id, 
        idProduct: getRandomItem(productsList).id,
        title: `Recensione ${i + 1}`,
        description: "Servizio eccellente e stampa di qualità.",
        rating: getRandomInt(3, 5),
        date: new Date()
      }
    });
  }

  // ---------------------------------------------------------
  // 10. CAROSELLO (10 righe)
  // ---------------------------------------------------------
  console.log('🖼️  Creazione 10 Slide Carosello...');
  for (let i = 1; i <= 10; i++) {
    await prisma.carosello.create({
      data: {
        img: `https://placehold.co/1200x400?text=Slide+${i}`,
        alt: `Promozione ${i}`,
        caption: `Scopri le nostre offerte speciali n.${i}`
      }
    });
  }

  console.log('✅ SEEDING COMPLETATO! (60 Prodotti totali creati)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });