import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inizio del seeding...');

  // 1. PULIZIA DEL DATABASE
  // L'ordine è importante per evitare errori di Foreign Key
  await prisma.review.deleteMany();
  await prisma.order.deleteMany(); // Ora si cancella direttamente Order
  await prisma.carosello.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();
  await prisma.nation.deleteMany();
  await prisma.product.deleteMany();

  console.log('🗑️  Database pulito.');

  // 2. CREAZIONE NATION (10 righe)
  console.log('Creazione 10 Nazioni...');
  const nations = [];
  for (let i = 0; i < 10; i++) {
    const nation = await prisma.nation.create({
      data: { name: `Nazione ${i + 1}` },
    });
    nations.push(nation);
  }

  // 3. CREAZIONE CITY (10 righe)
  console.log('Creazione 10 Città...');
  const cities = [];
  for (let i = 0; i < 10; i++) {
    // Uso nations[i]! perché so per certo che l'array è pieno
    const city = await prisma.city.create({
      data: {
        name: `Città ${i + 1}`,
        cap: `${10000 + i}`,
        idNation: nations[i]!.id, 
      },
    });
    cities.push(city);
  }

  // 4. CREAZIONE PRODOTTI (10 righe)
  console.log('Creazione 10 Prodotti...');
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        img: `img_prodotto_${i + 1}.jpg`,
        title: `Prodotto ${i + 1}`,
        description: `Descrizione del prodotto numero ${i + 1}`,
        price: 10.50 + i,
        qt: BigInt(100 + i), // BigInt richiede n o BigInt()
        weigth: 1.2,
        heigth: BigInt(10),
        width: BigInt(20),
        length: BigInt(30),
        oldPrice: i % 2 === 0 ? 15.00 + i : null,
        shippingDate: new Date(),
      },
    });
    products.push(product);
  }

  // 5. CREAZIONE UTENTI (30 righe totali per coprire i 3 ruoli)
  console.log('Creazione 30 Utenti base...');
  const users = [];
  for (let i = 0; i < 30; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Nome${i + 1}`,
        surname: `Cognome${i + 1}`,
        email: `utente${i + 1}@mail.com`,
        pwd: 'password123', 
        imgProfile: null,
        googleId: i % 5 === 0 ? `gid_${i}` : null,
      },
    });
    users.push(user);
  }

  // 6. CREAZIONE EMPLOYEE (10 righe - Prende i primi 10 utenti)
  console.log('Creazione 10 Employees...');
  for (let i = 0; i < 10; i++) {
    await prisma.employee.create({
      data: {
        role: i < 5 ? 'Admin' : 'Staff',
        task: 'Gestione Ordini',
        idUser: users[i]!.id, // Strict check !
      },
    });
  }

  // 7. CREAZIONE ADMIN (10 righe - Prende utenti da 10 a 19)
  console.log('Creazione 10 Admins...');
  for (let i = 10; i < 20; i++) {
    await prisma.admin.create({
      data: {
        idUser: users[i]!.id, // Strict check !
      },
    });
  }

  // 8. CREAZIONE CUSTOMER (10 righe - Prende utenti da 20 a 29)
  console.log('Creazione 10 Customers...');
  const customers = [];
  for (let i = 20; i < 30; i++) {
    // Indice per le città (0-9): usiamo (i - 20)
    const cityIndex = i - 20;
    
    const customer = await prisma.customer.create({
      data: {
        phonePrefix: 39,
        phoneNumber: BigInt(3331234560 + i),
        street: `Via Roma ${i}`,
        civic: BigInt(i + 1),
        idUser: users[i]!.id,        // Strict check !
        idCity: cities[cityIndex]!.id, // Strict check !
      },
    });
    customers.push(customer);
  }

  // 9. CREAZIONE ORDER (10 righe)
  // Qui applichiamo la logica: 1 Ordine contiene 1 Prodotto direttamente
  console.log('Creazione 10 Ordini...');
  for (let i = 0; i < 10; i++) {
    await prisma.order.create({
      data: {
        // Colleghiamo l'ordine a uno dei customer creati sopra
        idUser: users[20 + i]!.id, 
        
        date: new Date(),
        status: i % 2 === 0 ? 'carrello' : 'Consegnato',
        urlTracking: `http://track.me/${i}`,
        typeOrder: 'Standard',
        
        // NUOVI CAMPI DIRETTI NELLA TABELLA ORDER
        // Nota: priceAtPurchase nel tuo schema è Int, quindi passo un intero (es. centesimi)
        qt: 1 + i, 
        priceAtPurchase: 1000 + (i * 100), // Esempio: 1000 = 10.00
        idProduct: products[i]!.id,        // Strict check !
      },
    });
  }

  // 10. CREAZIONE REVIEWS (10 righe)
  console.log('Creazione 10 Recensioni...');
  for (let i = 0; i < 10; i++) {
    await prisma.review.create({
      data: {
        idCustomer: customers[i]!.id, // Strict check !
        idProduct: products[i]!.id,   // Strict check !
        description: 'Ottimo prodotto, spedizione veloce!',
        title: 'Consigliato',
        rating: 4.5,
        date: new Date(),
      },
    });
  }

  // 11. CREAZIONE CAROSELLO (10 righe)
  console.log('Creazione 10 Slide Carosello...');
  for (let i = 0; i < 10; i++) {
    await prisma.carosello.create({
      data: {
        img: `https://via.placeholder.com/800x400?text=Slide${i + 1}`,
        alt: `Slide promozionale ${i + 1}`,
        caption: i % 2 === 0 ? 'Offerta speciale!' : null,
      },
    });
  }

  console.log('✅ Seeding completato con successo!');
}

main()
  .catch((e) => {
    console.error('❌ Errore durante il seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });