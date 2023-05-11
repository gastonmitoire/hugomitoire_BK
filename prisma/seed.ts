import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const kody = await db.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      email: "kody@kody.com",
      profile: {
        create: {
          displayName: "Kody Smith",
          bio: "Hi, I'm Kody!",
          image: "https://example.com/avatar.jpg",
          firstName: "Kody",
          lastName: "Smith",
          dateOfBirth: new Date("1995-05-07T00:00:00.000Z"),
        },
      },
    },
  });
  await Promise.all(
    getBooks().map((book) => {
      const dataBook = { ...book };
      return db.book.create({
        data: {
          ...dataBook,
          genre: {
            create: {
              name: "Fantasia y ciencia ficcion",
              nameSlug: "fantasia-y-ciencia-ficcion" + Math.random(),
              ageRange: "+12",
            },
          },
          chapters: {
            create: [
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 1,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 2,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 3,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 4,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 5,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 6,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 7,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 8,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 9,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 10,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 11,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 12,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 13,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 14,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 15,
              },
            ],
          },
          comments: {
            create: getComments().map((comment) => ({
              authorId: kody.id,
              ...comment,
            })),
          },
        },
      });
    })
  );
}

seed();

const getBooks = () => [
  {
    title: "Criaturas Celestes",
    description: `Seres extra galácticos aterrizan en una chacra y entablan amistad con una familia de campesinos. Sobrevienen increíbles situaciones.`,
    type: "novela",
    publicationDate: new Date("1996-01-01"),
    cover:
      "http://hugomitoire.com/mediafiles/portada_libros/image857_4UoPay5.png",
    secondaryImage:
      "http://4.bp.blogspot.com/-HZcfKBH2oX8/TaoW_Z7o4zI/AAAAAAAABAs/XCo1Oi2dsKw/s1600/C3+llegan+las+criaturas.jpg",
  },
  {
    title: "Cuentos de terror para Franco VIII",
    description: "Cuentos de terror, misterio y situaciones paranormales.",
    type: "cuento",
    publicationDate: new Date("1996-01-01"),
    cover: "http://hugomitoire.com/mediafiles/portada_libros/image1081.png",
    secondaryImage:
      "https://4.bp.blogspot.com/-GXrsM6D4Euc/Wl9GbwwRz4I/AAAAAAAABqE/XKEUVIplLnUsiDVqH2y5Mx04qtdGhqjpQCLcBGAs/s1600/El%2Bgallo.jpg",
  },
  {
    title: "La Chancha con ruleros",
    description: `Este libro-album pertenece a la Colección CURIOSA VIDA ANIMAL. Relata la afligida existencia de una chancha que quería tener el pelo enrulado.`,
    type: "cuento",
    publicationDate: new Date("1996-01-01"),
    cover: "http://hugomitoire.com/mediafiles/portada_libros/image927.png",
    secondaryImage:
      "https://4.bp.blogspot.com/-S66uYEW2LjU/Wk1--I66qZI/AAAAAAAABkk/XgXis8zWNPcJF0KUUuU7dCmmQWuoozJewCPcBGAYYCw/s1600/chancha%2Bpag%2B012%2By%2B13.jpg",
  },
];

const getComments = () => [
  {
    text: "This is a comment",
  },
  {
    text: "This is another comment",
  },
  {
    text: "This is a third comment",
  },
];
