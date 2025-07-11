const request = require("supertest");
const app = require("../../app");

// describe("Launches API", () => {
describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
        const response = await request(app).get("/launches").expect(200).expect("Content-Type", /json/);
    });
});
describe("Test POST /launches", () => {
    const completeLaunchData = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-442 b",
        launchDate: "January 1, 2028",
    }

    const launchDataWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-442 b",
    }

    const launchDataWithInvalidDate = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-442 b",
        launchDate: "zoot",
    }

    test("It should respond with 201 created", async () => {
        const response = await request(app).post("/launches").send(completeLaunchData).expect("Content-Type", /json/).expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(launchDataWithoutDate);
        // expect(response.body.launchDate).toBeDefined();
        // expect(response.body.launchDate).toBeInstanceOf(Date);

    });
    test("It should catch missing required properties", async () => {
        const response = await request(app).post("/launches").send(launchDataWithoutDate).expect("Content-Type", /json/).expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property",
        });
    });
    test("It should catch invalid dates", async () => {
        const response = await request(app).post("/launches").send(launchDataWithInvalidDate).expect("Content-Type", /json/).expect(400);

        expect(response.body).toStrictEqual({
            error: "Invalid launch date",
        });
    });
});
// describe("Test DELETE /launches/:id", () => {
//     test("It should respond with 200 success", async () => {
//         const response = await request(app).delete("/launches/100");
//         expect(response.statusCode).toBe(200);
//     });
// });

// });