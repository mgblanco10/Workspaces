require("dotenv").config();
const {
  env: { MONGO_URL },
} = process;
const mongoose = require("mongoose");
const { connect, disconnect } = mongoose

const { User, Location, Workspace, Reservation } = require("./models"); 


connect(MONGO_URL)
//   .then(() => {
//     console.log(`db connected`);
//     return Promise.all([
//       User.deleteMany(),
//       Location.deleteMany(),
//       Reservation.deleteMany(),
//       Workspace.deleteMany(),
//     ]);
//   })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    const pepito = new User({
      name: "Pepito Grillo",
      email: "pepito@grillo.com",
      password: "123123123",
    });

    const wendy = new User({
      name: "Wendy Darling",
      email: "wendy@darling.com",
      // email: 'pepito@grillo.com',
      password: "12312123",
    });

    const peter = new User({
      name: "Peter Pan",
      email: "peter@pan.com",
      password: "123123123",
    });

    const james = new User({
      name: "James Hook",
      email: "james@hook.com",
      password: "123123123",
    });

    return Promise.all([
      pepito.save(),
      wendy.save(),
      peter.save(),
      james.save(),
    ]);
  })
  .then(([pepito, wendy, peter, james]) => {
    const pobleNou = new Location({
      name: "PobleNou Building",
      address: "Calle de Ramon Turró, 169, A, 08005 Barcelona",
      image:
        "https://talentgarden.org/wp-content/uploads/2020/09/894D58E0-7E23-477C-A840-90309F24ACA3-scaled.jpg",
    });

    const diagonal = new Location({
      name: "Diagonal Building",
      address: "Avinguda Diagonal, 444, ground floor, 08037 Barcelona",
      image:
        "https://www.distritooficina.com/wp-content/uploads/2019/07/WeWork-calle-Tanger_-Glories_1-685x1024.jpg",
    });
    const passeiGracia = new Location({
      name: "Passeig de Gracia Building",
      address: "Passeig de Gràcia, 92, 08008 Barcelona",
      image:
        "https://cdn2.civitatis.com/espana/barcelona/galeria/la-pedrera-barcelona-fachada.jpg",
    });

    return Promise.all([pobleNou.save(), diagonal.save(), passeiGracia.save()]).then(
      ([pobleNou, diagonal]) => {
        const office1 = new Workspace({
          location: pobleNou.id,
          name: "Private Office 1",
          price: 45,
          image:
            "https://i.pinimg.com/736x/8f/44/dc/8f44dc0113218416c65025998db5c0af.jpg",
          description: "Ideal for individuals and small teams.",
        });

        const office2 = new Workspace({
          location: pobleNou.id,
          name: "Suite",
          price: 80,
          image:
            "https://oxygenworkspace.com/wp-content/uploads/2021/06/Despacho-04-1.jpg",
          description: "Capacity for a maximum of 20 people.",
        });

        const office3 = new Workspace({
          location: diagonal.id,
          name: "Community Office",
          price: 75,
          image:
            "https://loom.es/wp-content/uploads/2022/04/Diseno-sin-titulo-2022-04-04T131947.438.png",
          description: "Enjoy shared services and meeting rooms.",
        });

        const office4 = new Workspace({
          location: diagonal.id,
          name: "Small Living Room",
          price: 65,
          image:
            "https://theprofessionalcentre.com/media/TPC-comfort-zone-800x480.jpg",
          description: "Fully equipped private office space.",
        });

        const office5 = new Workspace({
          location: diagonal.id,
          name: "Desk",
          price: 50,
          image:
            "https://madrid.impacthub.net/wp-content/uploads/2022/05/historia_coworking_blog.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });

        const office6 = new Workspace({
          location: diagonal.id,
          name: "Living room",
          price: 85,
          image:
            "https://www.lexington.es/app/uploads/2021/05/que-es-un-coworking.jpg",
          description: "Fully equipped private office space.",
        });

        const office7 = new Workspace({
          location: diagonal.id,
          name: "Small Desk",
          price: 45,
          image:
            "https://www.livinghomes.es/wp-content/uploads/coworking-living-1024x576.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });

        const office8 = new Workspace({
          location: diagonal.id,
          name: "Private Office",
          price: 100,
          image:
            "https://st4.depositphotos.com/2605379/26000/i/450/depositphotos_260009834-stock-photo-contemporary-concrete-coworking-office-interior.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });
        const office9 = new Workspace({
          location: diagonal.id,
          name: "Large Private Office",
          price: 100,
          image:
            "https://actiucdn.net/uploads/images/actualidad/descripciones/consejos-poner-en-marcha-coworking-funcione-10_782_651.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });
        const office10 = new Workspace({
          location: diagonal.id,
          name: "Small Private Office",
          price: 30,
          image:
            "https://www.happyworkinglab.com/wp-content/uploads/2018/06/SPACES-MX-2-1024x682-1024x682.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });
        const office11 = new Workspace({
          location: pobleNou.id,
          name: "Private Office",
          price: 45,
          image:
            "https://actiucdn.net/uploads/images/actualidad/descripciones/consejos-poner-en-marcha-coworking-funcione-10_782_651.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });
        const office12 = new Workspace({
          location: pobleNou.id,
          name: "Private Office",
          price: 30,
          image:
            "https://st4.depositphotos.com/2605379/26000/i/450/depositphotos_260009834-stock-photo-contemporary-concrete-coworking-office-interior.jpg",
          description: "Enjoy shared services and meeting rooms.",
        });
        const office13 = new Workspace({
          location: passeiGracia.id,
          name: "Shared Office",
          price: 50,
          image:
            "https://i.pinimg.com/originals/9a/e5/b3/9ae5b302e45ea5607079a561392f20c0.jpg",
          description: "Your own desk in a shared office and full access to kujo facilities.",
        });
        const office14 = new Workspace({
          location: passeiGracia.id,
          name: "Private Office",
          price: 100,
          image:
            "https://actiucdn.net/uploads/images/actualidad/descripciones/consejos-poner-en-marcha-coworking-funcione-10_782_651.jpg",
          description: "Furnished office space with private services.",
        });
        const office15 = new Workspace({
          location: passeiGracia.id,
          name: "Luxury Office",
          price: 100,
          image:
            "https://static.dezeen.com/uploads/2019/01/fosbury-sons-boitsfort-going-east-interiors-offices-belgium-brussels_dezeen_sq-1.jpg",
          description: "Luxury Office, a space configurable to your needs.",
        });

        return Promise.all([
          office1.save(),
          office2.save(),
          office3.save(),
          office4.save(),
          office5.save(),
          office6.save(),
          office7.save(),
          office8.save(),
          office9.save(),
          office10.save(),
          office11.save(),
          office12.save(),
          office13.save(),
          office14.save(),
          office15.save()
        ]).then(
          ([office1, office2, office3, office4, office5, office6, office7]) => {
            const reservation1 = new Reservation({
              user: pepito.id,
              workspace: office1.id,
              date: new Date("09/02/2023"),
            });

            const reservation2 = new Reservation({
              user: wendy.id,
              workspace: office3.id,
              date: new Date("08/09/2023"),
            });


            return Promise.all([
              reservation1.save(),
              reservation2.save()
          
            ]);
          }
        );
      }
    );
  })
  .catch((error) => {
    console.log(`error: ${error.message}`);
  })
  .then(() => disconnect());

//npm run populate-inspect-cli
