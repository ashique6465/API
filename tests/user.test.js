const server = require("../server");

describe("User GraphQL API", () => {
  test("Create User", async () => {
    const res = await server.executeOperation({
      query: `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
            email
            age
          }
        }
      `,
      variables: {
        input: {
          name: "Ashique",
          email: "ashique@test.com",
          age: 23,
        },
      },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data.createUser.name).toBe("Ashique");
    expect(res.data.createUser.age).toBe(23);
  });
});
