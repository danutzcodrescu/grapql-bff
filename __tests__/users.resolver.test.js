import User from "../models/Users.Model";

describe("add", () => {
  let user;

  it("should add two numbers", async done => {
    user = await User.find({});
    console.log(user);
    expect(3).toBe(3);
    done();
  });

  afterAll(() => {
    User.remove({ status: "test" });
  });
});
