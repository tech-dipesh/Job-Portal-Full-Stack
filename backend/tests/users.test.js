import BASEURL from "./app.test.js";
import request from "supertest";
import app from "../src/app.js";
import { connect } from "../src/db.js";

describe(`GET ${BASEURL}/users/login-status`, () => {
  test("Login Status - should return 401 for unauthenticated", async () => {
    const response = await request(app).get(`${BASEURL}/users/login-status`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${BASEURL}/users/login`, () => {
  test("Blank Email Password - should return 422", async () => {
    const response = await request(app)
      .post(`${BASEURL}/users/login`)
      .send({ email: '', password: '' });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});

afterAll(async () => {
  await connect.end();
});