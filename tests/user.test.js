import user from "../config/schema";
import bcrypt from "bcrypt";
describe("creating a new", () => {
    beforeEach(async () => {
        await user.deleteMany({});
        const passwordHash = await bcrypt.hash("password", 10);
        const newUser = new user({
            email: "JOFGJ@gjgj.org",
            password: passwordHash
        });

        await newUser.save();
    });

    test("works when the user is created", async () => {
        const users = await user.find({});
        const userDB = users.map(user => user.toJSON())
    })
})