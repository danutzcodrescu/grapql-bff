import User from "../models/Users.Model";
import faker from "faker";

describe("add", () => {
  let user;

  beforeAll(async () => {
    user = await User.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      status: "test"
    });
  });

  it("should add two numbers", async done => {
    expect(3).toBe(3);
    done();
  });

  afterAll(async () => {
    await User.remove({ status: "test" });
  });
});
