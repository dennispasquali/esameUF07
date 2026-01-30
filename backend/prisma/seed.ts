import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DATI DEI 50 PRODOTTI (Tipografia)
const productsData = [
  // CANCELLERIA & UFFICIO
  { title: "Biglietti da Visita Classici", category: "Ufficio", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800", desc: "Cartoncino 350gr, formato 85x55mm, stampa fronte/retro." },
  { title: "Carta Intestata A4", category: "Ufficio", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800", desc: "Carta usomano 90gr, ideale per stampanti laser e inkjet." },
  { title: "Buste da Lettera DL", category: "Ufficio", img: "https://images.unsplash.com/photo-1596277063486-5f8f972b2512?auto=format&fit=crop&w=800", desc: "Buste formato americano con finestra, strip adesiva." },
  { title: "Cartelline Portadocumenti", category: "Ufficio", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800", desc: "Cartellina fustellata con tasca ad incastro, dorso 5mm." },
  { title: "Blocchi Appunti A5", category: "Ufficio", img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800", desc: "50 fogli incollati in testa, sottoblocco rigido." },
  { title: "Timbri Autoinchiostranti", category: "Ufficio", img: "https://images.unsplash.com/photo-1626202263435-249216035043?auto=format&fit=crop&w=800", desc: "Timbro personalizzato Trodat, inchiostro nero o blu." },
  { title: "Planning da Scrivania", category: "Ufficio", img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800", desc: "Sottomano 50 fogli a strappo, formato A3." },
  { title: "Agende 2024", category: "Ufficio", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800", desc: "Agenda giornaliera copertina rigida similpelle." },
  { title: "Calendari da Muro", category: "Ufficio", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800", desc: "Rilegatura spirale metallica, 13 fogli patinati." },
  { title: "Calendari da Tavolo", category: "Ufficio", img: "https://images.unsplash.com/photo-1633519349838-8120b432a508?auto=format&fit=crop&w=800", desc: "Supporto triangolare in cartoncino, mensile." },

  // PROMOZIONALE
  { title: "Volantini A5", category: "Promo", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800", desc: "Carta patinata lucida 130gr, stampa quadricromia." },
  { title: "Pieghevoli 3 Ante", category: "Promo", img: "https://images.unsplash.com/photo-1635352822920-5c6c04f4752c?auto=format&fit=crop&w=800", desc: "Formato aperto A4, chiuso DL. Carta 170gr." },
  { title: "Locandine A3", category: "Promo", img: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=800", desc: "Ideali per vetrine e bacheche, carta 130gr." },
  { title: "Cartoline Promozionali", category: "Promo", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800", desc: "Cartoncino rigido 300gr, fronte lucido retro scrivibile." },
  { title: "Segnalibri", category: "Promo", img: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800", desc: "Formato 5x21cm, plastificazione opaca fronte/retro." },
  { title: "Appendiporta", category: "Promo", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800", desc: "Fustellati con gancio, ideali per hotel e marketing." },
  { title: "Gratta e Vinci", category: "Promo", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800", desc: "Stampa con vernice argentata grattabile personalizzata." },
  { title: "Buoni Sconto", category: "Promo", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800", desc: "Blocchetti numerati e traforati, carta 80gr." },
  { title: "Adesivi in Foglio", category: "Promo", img: "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?auto=format&fit=crop&w=800", desc: "Etichette in vinile su fogli A4 pre-fustellati." },

  // EDITORIA
  { title: "Cataloghi Brossurati", category: "Editoria", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800", desc: "Rilegatura in brossura fresata, copertina 300gr." },
  { title: "Riviste Punto Metallico", category: "Editoria", img: "https://images.unsplash.com/photo-1555485038-a63855aa7ba9?auto=format&fit=crop&w=800", desc: "Opuscoli economici con 2 graffette centrali." },
  { title: "Libri Cartunati", category: "Editoria", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800", desc: "Edizione di pregio, copertina rigida rivestita." },
  { title: "Tesi di Laurea", category: "Editoria", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800", desc: "Similpelle rossa/blu/verde, incisione oro/argento." },
  { title: "Fumetti", category: "Editoria", img: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800", desc: "Carta usomano avorio, stampa bianco e nero." },
  { title: "Giornali Aziendali", category: "Editoria", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800", desc: "Formato Tabloid o A4, carta riciclata." },

  // GRANDE FORMATO
  { title: "Manifesti 70x100", category: "Large", img: "https://images.unsplash.com/photo-1563290740-155e88d17b2b?auto=format&fit=crop&w=800", desc: "Carta Blue Back antispappolo per affissione esterna." },
  { title: "Banner PVC 500gr", category: "Large", img: "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?auto=format&fit=crop&w=800", desc: "Striscione con occhielli perimetrali ogni 50cm." },
  { title: "Roll-up 85x200", category: "Large", img: "https://images.unsplash.com/photo-1559526324-c1f29633e66f?auto=format&fit=crop&w=800", desc: "Struttura in alluminio, stampa su telo e borsa inclusa." },
  { title: "Striscioni Microforati", category: "Large", img: "https://images.unsplash.com/photo-1585644198428-2b23a968600d?auto=format&fit=crop&w=800", desc: "Rete Mesh antivento per impalcature e grandi superfici." },
  { title: "Pannelli Forex 3mm", category: "Large", img: "https://images.unsplash.com/photo-1513346940221-18f4601d12ad?auto=format&fit=crop&w=800", desc: "PVC semirigido, stampa diretta UV." },
  { title: "Targhe Dibond", category: "Large", img: "https://images.unsplash.com/photo-1533630654593-b222d5d44449?auto=format&fit=crop&w=800", desc: "Alluminio composito spazzolato o bianco, molto resistente." },
  { title: "Vetrofanie", category: "Large", img: "https://images.unsplash.com/photo-1550586041-fbf79acb9631?auto=format&fit=crop&w=800", desc: "Adesivo PVC per vetrine, applicazione interna o esterna." },
  { title: "Adesivi Calpestabili", category: "Large", img: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&w=800", desc: "Laminazione antiscivolo certificata R10." },
  { title: "Bandiere a Goccia", category: "Large", img: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800", desc: "Tessuto nautico antivento, struttura flessibile." },
  { title: "Carta da Parati", category: "Large", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800", desc: "Texture sabbia o tela, colla attivabile con acqua." },

  // PACKAGING
  { title: "Etichette in Bobina", category: "Pack", img: "https://images.unsplash.com/photo-1595246140625-573b715e11d3?auto=format&fit=crop&w=800", desc: "Polipropilene lucido o carta, per etichettatrici." },
  { title: "Scatole a Cuscino", category: "Pack", img: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800", desc: "Astuccio bombato per bijoux e piccoli regali." },
  { title: "Astucci Prodotto", category: "Pack", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800", desc: "Cartoncino teso 350gr, fondo a scatto." },
  { title: "Shopping Bags", category: "Pack", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800", desc: "Carta Kraft avana o bianca, manico ritorto." },
  { title: "Nastro Adesivo", category: "Pack", img: "https://images.unsplash.com/photo-1616628188506-4b67d54b6b1d?auto=format&fit=crop&w=800", desc: "PPL o PVC, stampa a 1 o 2 colori." },
  { title: "Cartellini Hang Tags", category: "Pack", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800", desc: "Foro 3mm, cordino non incluso." },
  { title: "Carta Velina", category: "Pack", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800", desc: "Carta 30gr semitrasparente personalizzata." },

  // RISTORAZIONE E GADGET
  { title: "Menù Plastificati", category: "Food", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800", desc: "Incapsulazione rigida con bordo sigillato lavabile." },
  { title: "Tovagliette Carta", category: "Food", img: "https://images.unsplash.com/photo-1550966871-3ed3c6221741?auto=format&fit=crop&w=800", desc: "Carta paglia alimentare o usomano bianca A3." },
  { title: "Sottobicchieri", category: "Food", img: "https://images.unsplash.com/photo-1574626005643-546a1616428d?auto=format&fit=crop&w=800", desc: "Cartone vegetale pressato assorbente 1.5mm." },
  { title: "Partecipazioni Nozze", category: "Eventi", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800", desc: "Carta perlata o martellata, busta coordinata." },
  { title: "Ticket Numerati", category: "Eventi", img: "https://images.unsplash.com/photo-1552083974-1863461911dd?auto=format&fit=crop&w=800", desc: "Blocchetti con matrice e doppia numerazione." },
  { title: "Braccialetti Tyvek", category: "Eventi", img: "https://images.unsplash.com/photo-1563291074-2bf0373d296c?auto=format&fit=crop&w=800", desc: "Antistrappo, chiusura adesiva monouso." },
  { title: "Magneti da Frigo", category: "Gadget", img: "https://images.unsplash.com/photo-1565514020125-9988a6d71688?auto=format&fit=crop&w=800", desc: "Stampa digitale accoppiata a gomma magnetica." },
  { title: "Tessere PVC", category: "Gadget", img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800", desc: "Badge tipo carta di credito, spessore 0.76mm." },
];

// LISTA DI RECENSIONI VARIE
const reviewTemplates = [
  { title: "Eccellente", desc: "Qualità di stampa superiore alle aspettative. Colori vividi.", rating: 5 },
  { title: "Buon servizio", desc: "Spedizione un po' lenta ma prodotto ottimo.", rating: 4 },
  { title: "Consigliato", desc: "Assistenza clienti gentilissima nel correggere il file.", rating: 5 },
  { title: "Perfetto", desc: "Esattamente quello che cercavo per il mio negozio.", rating: 5 },
  { title: "Nella media", desc: "Carta un po' leggera, ma per il prezzo va bene.", rating: 3 },
  { title: "Ottimo rapporto qualità prezzo", desc: "Non si può chiedere di meglio a queste cifre.", rating: 4 },
  { title: "Velocissimi", desc: "Ordinato ieri, arrivato oggi. Incredibile.", rating: 5 },
  { title: "Da rivedere", desc: "Il taglio non è precisissimo su alcuni pezzi.", rating: 2 },
  { title: "Professionisti", desc: "Si vede che sanno fare il loro lavoro.", rating: 5 },
  { title: "Belli ma cari", desc: "Prodotto top, ma il costo è un po' alto.", rating: 4 }
];

async function main() {
  console.log('🌱 Inizio del seeding...');

  // 1. PULIZIA DEL DATABASE
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.carosello.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();
  await prisma.nation.deleteMany();
  await prisma.product.deleteMany();

  console.log('🗑️  Database pulito.');

  // 2. CREAZIONE NATION
  console.log('Creazione Nazioni...');
  const nations = [];
  const nationNames = ["Italia", "Francia", "Germania", "Spagna", "UK"];
  for (const name of nationNames) {
    const nation = await prisma.nation.create({ data: { name } });
    nations.push(nation);
  }

  // 3. CREAZIONE CITY
  console.log('Creazione Città...');
  const cities = [];
  const cityNames = ["Roma", "Milano", "Napoli", "Torino", "Firenze", "Bologna", "Parigi", "Lione", "Berlino", "Monaco"];
  for (let i = 0; i < cityNames.length; i++) {
    const city = await prisma.city.create({
      data: {
        name: cityNames[i]!,
        cap: `${10000 + i}`,
        idNation: nations[i % nations.length]!.id,
      },
    });
    cities.push(city);
  }

  // 4. CREAZIONE 50 PRODOTTI REALI
  console.log('Creazione 50 Prodotti Tipografici...');
  const products = [];
  for (let i = 0; i < productsData.length; i++) {
    const pInfo = productsData[i];
    const product = await prisma.product.create({
      data: {
        img: pInfo!.img,
        title: pInfo!.title,
        description: pInfo!.desc,
        price: 9.90 + (i * 1.5), // Prezzo variabile
        qt: BigInt(500),
        weigth: 0.5 + (i * 0.1),
        heigth: BigInt(10 + (i % 5)),
        width: BigInt(20 + (i % 5)),
        length: BigInt(30),
        oldPrice: i % 3 === 0 ? (9.90 + (i * 1.5)) * 1.2 : null, // Sconto su 1 prodotto su 3
        shippingDate: new Date(),
      },
    });
    products.push(product);
  }

  // 5. CREAZIONE UTENTI (50 utenti per avere abbastanza customer)
  console.log('Creazione Utenti...');
  const users = [];
  for (let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Utente${i + 1}`,
        surname: `Test${i + 1}`,
        email: `user${i + 1}@printmail.com`,
        pwd: 'password123',
        imgProfile: `https://i.pravatar.cc/150?u=${i}`, // Avatar generato
        googleId: null,
      },
    });
    users.push(user);
  }

  // 6. CREAZIONE EMPLOYEE & ADMIN (Primi 20 utenti)
  console.log('Assegnazione Ruoli Staff...');
  for (let i = 0; i < 10; i++) {
    await prisma.employee.create({
      data: { role: 'Staff', task: 'Produzione', idUser: users[i]!.id },
    });
  }
  for (let i = 10; i < 20; i++) {
    await prisma.admin.create({
      data: { idUser: users[i]!.id },
    });
  }

  // 7. CREAZIONE CUSTOMERS (Utenti da 20 a 49)
  console.log('Creazione Customers...');
  const customers = [];
  for (let i = 20; i < 50; i++) {
    const customer = await prisma.customer.create({
      data: {
        phonePrefix: 39,
        phoneNumber: BigInt(3330000000 + i),
        street: `Via della Stampa ${i}`,
        civic: BigInt(i),
        idUser: users[i]!.id,
        idCity: cities[i % cities.length]!.id,
      },
    });
    customers.push(customer);
  }

  // 8. CREAZIONE ORDINI (Un po' di ordini a caso)
  console.log('Generazione Ordini...');
  for (let i = 0; i < 20; i++) {
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    await prisma.order.create({
      data: {
        idUser: randomCustomer!.idUser, // Nota: lo schema user chiedeva idUser qui
        date: new Date(),
        status: i % 2 === 0 ? 'Consegnato' : 'In lavorazione',
        urlTracking: `http://track.me/ORD-${i}`,
        typeOrder: 'Standard',
        qt: 1 + Math.floor(Math.random() * 5),
        priceAtPurchase: Math.floor(randomProduct!.price * 100), // Convertito in centesimi se Int
        idProduct: randomProduct!.id,
      },
    });
  }

  // 9. CREAZIONE 40 RECENSIONI (Logica "Hot Products")
  console.log('Scrittura 40 Recensioni...');

  // Funzione helper per creare review
  const createReview = async (prodId: number, custId: number, templateIndex: number) => {
    const tpl = reviewTemplates[templateIndex % reviewTemplates.length];
    await prisma.review.create({
      data: {
        idCustomer: custId,
        idProduct: prodId,
        title: tpl!.title,
        description: tpl!.desc,
        rating: tpl!.rating,
        date: new Date(),
      }
    });
  };

  // A. Il prodotto "HOT" (Biglietti da visita - indice 0) riceve 5 recensioni
  console.log('--> Generazione 5 review per il prodotto TOP');
  const hotProduct = products[0];
  for (let i = 0; i < 5; i++) {
    // Usiamo i primi 5 customer
    await createReview(hotProduct!.id, customers[i]!.id, i);
  }

  // B. Il prodotto "Runner-up" (Volantini - indice 10) riceve 3 recensioni
  const runnerUpProduct = products[10];
  for (let i = 0; i < 3; i++) {
    await createReview(runnerUpProduct!.id, customers[i + 5]!.id, i + 2);
  }

  // C. Le restanti 32 recensioni sparse sugli altri prodotti
  console.log('--> Generazione restanti 32 review sparse');
  let reviewCount = 0;
  while (reviewCount < 32) {
    // Scegliamo un prodotto a caso (esclusi i primi due magari, o inclusi, non importa)
    const randomProdIndex = Math.floor(Math.random() * products.length);
    const randomCustIndex = Math.floor(Math.random() * customers.length);
    
    await createReview(
      products[randomProdIndex]!.id, 
      customers[randomCustIndex]!.id, 
      reviewCount // Usa index per variare il testo
    );
    reviewCount++;
  }

  // 10. CAROSELLO
  console.log('Popolamento Carosello...');
  const carouselSlides = [
    { img: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200", alt: "Stampa Offset", caption: "Qualità offset imbattibile" },
    { img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200", alt: "Ufficio", caption: "Rinnova la tua immagine coordinata" },
    { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200", alt: "Marketing", caption: "Promuovi il tuo business" },
  ];

  for (const slide of carouselSlides) {
    await prisma.carosello.create({
      data: {
        img: slide.img,
        alt: slide.alt,
        caption: slide.caption,
      }
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