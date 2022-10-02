// const request = require("supertest");
// const response  = require("../app");
// const app = require("../app");

// describe("Criar Servico", () => {
//   it("Deve criar um serviço", async () => {
//     const response = await request(app).post("/api/servico").send({
//       obs: "ServiçoLoremIpsumTesteQuintaNoiteServiçoLoremIpsumTesteQuintaNoiteServiçoLoremIpsumTesteQuintaNoiteServiçoLoremIpsumTesteQuintaNoite",
//       descricao: "Descrição do serviço 1",
//       valor: 100,
//       categoria: 9,
//     });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Servico Adicionado Com Sucesso!"
//     );
//   });
// });

// describe("Editar Servico", () => {
//   it("Deve Atualizar um Serviço", async () => {
//     const response = await request(app).put("/api/servico/10").send({
//       obs: "Serviço 2",
//       descricao: "Descrição do serviço 2",
//       valor: 200,
//       categoria: 12,
//     });
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Servico Atualizado Com Sucesso!"
//     );
//   });
// });

// describe("Deletar Serviço", () => {
//     it("Deve Deletar um serviço", async() => {
//         const response = await request(app).delete("/api/servico/13").send({  
//         });
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty(
//             "message",
//             "Servico Excluido Com Sucesso!"
//         );
//     });
// });

