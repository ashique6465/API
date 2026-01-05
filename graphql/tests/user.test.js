const {server,resetUsers } = require("../server");


describe("User GraphQL API (executeOperation)", () => {
 beforeEach(()=>{
  resetUsers();
 })
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
          age: 23
        }
      }
    });

    expect(res.errors).toBeUndefined();
    expect(res.data.createUser.name).toBe("Ashique");
    expect(res.data.createUser.age).toBe(23);
  });

  test("Get Users", async () => {
    await server.executeOperation({
      query: `
      mutation CreateUser($input: CreateUserInput!){
      createUser(input:$input){
      id
      }
      }
      `,
      variables:{
        input:{
          name: "Test",
          email: "test@gmail.com",
          age: 25,
        }
      }
    })
    const res = await server.executeOperation({ 
      query: `
        query {
          users {
            id
            name
          }
        }
      `
    });

    expect(res.errors).toBeUndefined();
    expect(res.data.users.length).toBeGreaterThan(0);
  });

  test("Update User", async () => {
    // Step 1: Create user
    const createRes = await server.executeOperation({
      query: `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: "John",
          email: "john@test.com",
          age: 20
        }
      }
    });

    const userId = createRes.data.createUser.id;

    // Step 2: Update user
    const updateRes = await server.executeOperation({
      query: `
        mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
          updateUser(id: $id, input: $input) {
            id
            name
            age
          }
        }
      `,
      variables: {
        id: userId,
        input: {
          age: 25
        }
      }
    });

    expect(updateRes.errors).toBeUndefined();
    expect(updateRes.data.updateUser.age).toBe(25);
    expect(updateRes.data.updateUser.name).toBe("John");
  });

  test("Delete User", async () => {
    // Step 1: Create user
    const createRes = await server.executeOperation({
      query: `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: "Mike",
          email: "mike@test.com",
          age: 30
        }
      }
    });

    const userId = createRes.data.createUser.id;

    // Step 2: Delete user
    const deleteRes = await server.executeOperation({
      query: `
        mutation DeleteUser($id: ID!) {
          deleteUser(id: $id) {
            id
            name
          }
        }
      `,
      variables: {
        id: userId
      }
    });

    expect(deleteRes.errors).toBeUndefined();
    expect(deleteRes.data.deleteUser.id).toBe(userId);
    expect(deleteRes.data.deleteUser.name).toBe("Mike");
  });

  test("Update User - should fail when user does not exist", async () =>{
    const res = await server.executeOperation({
      query: `
      mutation UpdateUser($id: ID!, $input: UpdateUserInput!){
      updateUser(id: $id, input: $input){
      id 
      name
      }}
      `,
      variables:{
        id:"34",
        input:{
          age: 40
        }
      }
    })
    expect(res.data).toBeNull();
    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toBe("User not found")
  })

  test("Delete User - should fail when user does not exist", async() =>{
    const res = await server.executeOperation({
      query: `
      mutation DeleteUser($id: ID!){
      deleteUser(id: $id){
      id 
      name
      }}
      `,
      variables:{
        id:"35"
      }
    })
    expect(res.data).toBeNull();
    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toBe("User not found")
  })

});
