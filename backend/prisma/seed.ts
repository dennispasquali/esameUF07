import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Istanzia il client
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inizio seeding del database (Strict Mode)...');

  // -------------------------------------------------------
  // 1. PULIZIA DATABASE (Ordine inverso per evitare FK errors)
  // -------------------------------------------------------
  const deleteParams = [
    prisma.review.deleteMany(),
    prisma.orderWithProducts.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.admin.deleteMany(),
    prisma.employee.deleteMany(),
    prisma.user.deleteMany(),
    prisma.city.deleteMany(),
    prisma.nation.deleteMany(),
    prisma.carosello.deleteMany(),
  ];

  await prisma.$transaction(deleteParams);
  console.log('🧹 Database pulito con successo.');

  // Password hashata comune per tutti gli utenti di test
  const hashedPassword = await bcrypt.hash('password123', 10);

  // -------------------------------------------------------
  // 2. NAZIONI E CITTÀ
  // -------------------------------------------------------
  // Creiamo l'Italia con 2 città
  const italia = await prisma.nation.create({
    data: {
      name: 'Italia',
      cities: {
        create: [
          { name: 'Milano', cap: '20100' },
          { name: 'Roma', cap: '00100' },
        ],
      },
    },
    include: { cities: true },
  });

  // Creiamo la Francia con 1 città
  const francia = await prisma.nation.create({
    data: {
      name: 'Francia',
      cities: {
        create: [
          { name: 'Parigi', cap: '75000' },
        ],
      },
    },
    include: { cities: true },
  });

  // Helper per ottenere gli ID in modo sicuro (Strict Mode check)
  const idMilano = italia.cities.find((c) => c.name === 'Milano')?.id;
  const idRoma = italia.cities.find((c) => c.name === 'Roma')?.id;
  const idParigi = francia.cities[0]?.id;

  if (!idMilano || !idRoma || !idParigi) {
    throw new Error('❌ Errore critico: Impossibile recuperare gli ID delle città create.');
  }

  console.log('🌍 Nazioni e Città create.');

  // -------------------------------------------------------
  // 3. PRODOTTI
  // -------------------------------------------------------
  const prodPhone = await prisma.product.create({
    data: {
      title: 'Smartphone Ultra',
      description: 'Il telefono definitivo',
      img: 'phone.jpg',
      price: 899.99,
      qt: 100,
      weigth: 0.2,
      heigth: 15,
      width: 7,
      length: 1,
      shippingDate: new Date(),
    },
  });

  const prodLaptop = await prisma.product.create({
    data: {
      title: 'Laptop Dev',
      description: 'Perfetto per programmare',
      img: 'laptop.jpg',
      price: 1200.50,
      qt: 50,
      weigth: 1.5,
      heigth: 20,
      width: 30,
      length: 2,
      oldPrice: 1400.00,
      shippingDate: new Date(),
    },
  });

  console.log('📦 Prodotti creati.');

  // -------------------------------------------------------
  // 4. UTENTI E RUOLI
  // -------------------------------------------------------

  // A. Admin
  await prisma.user.create({
    data: {
      name: 'Mario',
      surname: 'Rossi',
      email: 'admin@shop.com',
      pwd: hashedPassword,
      admins: {
        create: {}, // Record vuoto nella tabella Admin collegato
      },
    },
  });

  // B. Employee
  await prisma.user.create({
    data: {
      name: 'Luigi',
      surname: 'Verdi',
      email: 'staff@shop.com',
      pwd: hashedPassword,
      employees: {
        create: {
          role: 'Magazziniere',
          task: 'Imballaggio',
        },
      },
    },
  });

  // C. Customer 1 (Vive a Milano)
  const userCustomer1 = await prisma.user.create({
    data: {
      name: 'Giulia',
      surname: 'Bianchi',
      email: 'giulia@client.com',
      pwd: hashedPassword,
      customers: {
        create: {
          phonePrefix: 39,
          phoneNumber: 333111111, // Nota: Int ha limite ~2 miliardi. Occhio ai numeri lunghi.
          street: 'Via Dante',
          civic: 1,
          idCity: idMilano, // Colleghiamo Milano
        },
      },
    },
    include: { customers: true },
  });

  // D. Customer 2 (Vive a Roma)
  const userCustomer2 = await prisma.user.create({
    data: {
      name: 'Paolo',
      surname: 'Neri',
      email: 'paolo@client.com',
      pwd: hashedPassword,
      customers: {
        create: {
          phonePrefix: 39,
          phoneNumber: 333222222,
          street: 'Via del Corso',
          civic: 50,
          idCity: idRoma, // Colleghiamo Roma
        },
      },
    },
    include: { customers: true },
  });

  console.log('👥 Utenti (Admin, Employee, Customers) creati.');

  // Recuperiamo gli ID dei Customer per ordini e recensioni
  const customer1Id = userCustomer1.customers[0]?.id;
  const customer2Id = userCustomer2.customers[0]?.id;

  if (!customer1Id || !customer2Id) throw new Error("Errore ID Customer");

  // -------------------------------------------------------
  // 5. ORDINI
  // -------------------------------------------------------
  
  // Ordine 1 di Giulia
  await prisma.order.create({
    data: {
      idUser: userCustomer1.id,
      date: new Date(),
      status: 'Spedito',
      statusColor: 'success',
      urlTracking: 'http://track.me/123',
      typeOrder: 'Standard',
      orderWithProducts: {
        create: [
          { qt: 1, idProduct: prodPhone.id },
          { qt: 2, idProduct: prodLaptop.id },
        ],
      },
    },
  });

  // Ordine 2 di Giulia (Ora è possibile averne più di uno!)
  await prisma.order.create({
    data: {
      idUser: userCustomer1.id,
      date: new Date(),
      status: 'In produzione',
      statusColor: 'warning',
      urlTracking: '',
      typeOrder: 'Express',
      orderWithProducts: {
        create: [
          { qt: 5, idProduct: prodPhone.id },
        ],
      },
    },
  });

  console.log('🛒 Ordini creati.');

  // -------------------------------------------------------
  // 6. RECENSIONI
  // -------------------------------------------------------
  
  // Recensione di Giulia sul Telefono
  await prisma.review.create({
    data: {
      idCustomer: customer1Id,
      idProduct: prodPhone.id,
      title: 'Ottimo telefono',
      description: 'Batteria infinita!',
      rating: 5,
      date: new Date(),
    },
  });

  // Recensione di Paolo sullo stesso Telefono (Ora è possibile!)
  await prisma.review.create({
    data: {
      idCustomer: customer2Id,
      idProduct: prodPhone.id,
      title: 'Buono ma costoso',
      description: 'Il prezzo è altino...',
      rating: 4,
      date: new Date(),
    },
  });

  console.log('⭐ Recensioni create.');

  // -------------------------------------------------------
  // 7. CAROSELLO
  // -------------------------------------------------------
  await prisma.carosello.createMany({
    data: [
      { img: '/banner1.jpg', alt: 'Saldi Estivi', caption: 'Sconti al 50%' },
      { img: '/banner2.jpg', alt: 'Nuova Collezione', caption: 'Scopri il tech' },
    ],
  });

  console.log('🖼️ Carosello popolato.');
  console.log('✅ SEEDING COMPLETATO CON SUCCESSO!');
}

// Esecuzione e gestione errori
main()
  .catch((e) => {
    console.error('❌ Errore fatale durante il seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });