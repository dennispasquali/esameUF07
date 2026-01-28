import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inizio del seeding (Strict Mode)...');

  // 1. PULIZIA DEL DATABASE
  // L'ordine è importante per via delle Foreign Keys
  await prisma.orderWithProducts.deleteMany();
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();
  await prisma.nation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.carosello.deleteMany();

  console.log('🗑️ Database pulito.');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 2. NATION
  console.log('🌍 Creating Nations...');
  // Creiamo le nazioni una per una per essere sicuri di averle
  const nationsList = [];
  for (let i = 0; i < 10; i++) {
    const nation = await prisma.nation.create({
      data: { name: `Nazione ${i + 1}` },
    });
    nationsList.push(nation);
  }

  // 3. CITY
  console.log('🏙️ Creating Cities...');
  const citiesList = [];
  for (let i = 0; i < 10; i++) {
    // STRICT MODE FIX: Controllo che la nazione esista
    const nation = nationsList[i % nationsList.length];
    if (!nation) throw new Error(`Nazione mancante all'indice ${i}`);

    const city = await prisma.city.create({
      data: {
        name: `Città ${i + 1}`,
        cap: `${10000 + i}`,
        idNation: nation.id,
      },
    });
    citiesList.push(city);
  }

  // 4. USER (30 utenti totali)
  console.log('busts_in_silhouette: Creating Users...');
  const usersList = [];
  for (let i = 0; i < 30; i++) {
    const user = await prisma.user.create({
      data: {
        name: `NomeUser${i + 1}`,
        surname: `CognomeUser${i + 1}`,
        email: `user${i + 1}@example.com`,
        pwd: hashedPassword,
        imgProfile: `https://i.pravatar.cc/150?u=${i}`,
        googleId: i % 2 === 0 ? `google-id-${i}` : null,
      },
    });
    usersList.push(user);
  }

  // Dividiamo gli array (TypeScript sa che sono array, ma non sa se sono vuoti)
  const usersForEmployees = usersList.slice(0, 10);
  const usersForAdmins = usersList.slice(10, 20);
  const usersForCustomers = usersList.slice(20, 30);

  // 5. EMPLOYEE
  console.log('💼 Creating Employees...');
  for (let i = 0; i < 10; i++) {
    // STRICT MODE FIX
    const user = usersForEmployees[i];
    if (!user) throw new Error(`Utente per Employee mancante all'indice ${i}`);

    await prisma.employee.create({
      data: {
        role: i % 2 === 0 ? 'Manager' : 'Staff',
        task: 'Gestione ordini',
        idUser: user.id,
      },
    });
  }

  // 6. ADMIN
  console.log('🛡️ Creating Admins...');
  for (let i = 0; i < 10; i++) {
    // STRICT MODE FIX
    const user = usersForAdmins[i];
    if (!user) throw new Error(`Utente per Admin mancante all'indice ${i}`);

    await prisma.admin.create({
      data: {
        idUser: user.id,
      },
    });
  }

  // 7. CUSTOMER
  console.log('🛒 Creating Customers...');
  const customersList = [];
  for (let i = 0; i < 10; i++) {
    // STRICT MODE FIX: Verifiche multiple
    const user = usersForCustomers[i];
    const city = citiesList[i % citiesList.length];
    
    if (!user) throw new Error(`Utente per Customer mancante all'indice ${i}`);
    if (!city) throw new Error(`Città mancante all'indice ${i}`);

    const customer = await prisma.customer.create({
      data: {
        phonePrefix: BigInt(39),
        phoneNumber: BigInt(333000000 + i),
        street: `Via Roma ${i + 1}`,
        civic: BigInt(i + 1),
        idUser: user.id,
        idCity: city.id,
      },
    });
    customersList.push(customer);
  }

  // 8. PRODUCT
  console.log('📦 Creating Products...');
  const productsList = [];
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        img: `https://placehold.co/600x400?text=Prodotto+${i + 1}`,
        title: `Prodotto ${i + 1}`,
        description: `Descrizione fantastica del prodotto ${i + 1}`,
        price: 19.99 + i,
        qt: BigInt(100 + i),
        weigth: 0.5 + i / 10,
        heigth: BigInt(10 + i),
        width: BigInt(20 + i),
        length: BigInt(30 + i),
        oldPrice: i % 3 === 0 ? 25.99 + i : null,
        shippingDate: new Date(),
      },
    });
    productsList.push(product);
  }

  // 9. REVIEW
  console.log('⭐ Creating Reviews...');
  for (let i = 0; i < 10; i++) {
    // STRICT MODE FIX
    const customer = customersList[i];
    const product = productsList[i];

    if (!customer) throw new Error(`Customer mancante per Review ${i}`);
    if (!product) throw new Error(`Product mancante per Review ${i}`);

    await prisma.review.create({
      data: {
        idCustomer: customer.id,
        idProduct: product.id,
        title: i % 2 === 0 ? 'Ottimo!' : 'Così così',
        description: 'Veramente un acquisto interessante.',
        rating: (i % 5) + 1,
        date: new Date(),
      },
    });
  }

  // 10. CAROSELLO
  console.log('🖼️ Creating Carousel...');
  for (let i = 0; i < 10; i++) {
    await prisma.carosello.create({
      data: {
        img: `banner-${i}.jpg`,
        alt: `Banner promozionale ${i}`,
        caption: i % 2 === 0 ? 'Offerta imperdibile' : null,
      },
    });
  }

  // 11. ORDER
  console.log('🚚 Creating Orders...');
  const ordersList = [];
  const statusList = ['carrello', 'Ricevuto', 'In produzione', 'Spedito', 'Consegnato'];
  
  for (let i = 0; i < 10; i++) {
    const user = usersForCustomers[i]; // Usiamo gli stessi utenti dei Customer
    if (!user) throw new Error(`User mancante per Order ${i}`);

    const order = await prisma.order.create({
      data: {
        idUser: user.id,
        date: new Date(),
        status: statusList[i % statusList.length]!,
        urlTracking: `http://tracking.com/${i}XYZ`,
        typeOrder: 'Standard',
      },
    });
    ordersList.push(order);
  }

  // 12. ORDER WITH PRODUCTS (Pivot)
  console.log('🔗 Linking Orders and Products...');
  for (let i = 0; i < 10; i++) {
    const order = ordersList[i];
    const product = productsList[i];

    if (!order) throw new Error(`Order mancante per Pivot ${i}`);
    if (!product) throw new Error(`Product mancante per Pivot ${i}`);

    await prisma.orderWithProducts.create({
      data: {
        idOrder: order.id,
        idProduct: product.id,
        qt: 2, // Int
        priceAtPurchase: Math.floor(product.price), // Int, conversione da Float
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