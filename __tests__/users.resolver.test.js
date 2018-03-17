import User from "../models/Users.Model";
import faker from "faker";
import { post } from "axios";

describe("[Users resolver]", () => {
  let user;
  beforeAll(async () => {
    user = await User.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      status: "test"
    });
  });

  it("should show the users", done => {
    const query = `query {
		users {
			_id
		}
	}`;
    post("http://localhost:3000/graphql?", JSON.stringify({ query }), {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        expect(resp.data.data.users.length).toBeGreaterThan(0);
        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it("should show one user", done => {
    const query = `query {
		user(id: "${user._id}") {
			_id
			username
		}
		}
	`;
    post("http://localhost:3000/graphql?", JSON.stringify({ query }), {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        expect(resp.data.data.user._id).toBe(user._id.toString());
        expect(resp.data.data.user.username).toBe(user.username);
        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it("should create one user", done => {
    const query = `mutation {
		createUser(username: "test2", password: "test", status: "test") {
			username
			createdAt
			updatedAt
		}
	}`;
    post("http://localhost:3000/graphql?", { query })
      .then(resp => {
        expect(resp.data.data.createUser.username).toBe("test2");
        done();
      })
      .catch(e => {
        done(e);
      });
  });

  afterAll(async () => {
    await User.remove({ status: "test" });
  });
});
