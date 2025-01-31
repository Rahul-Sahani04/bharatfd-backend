import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import app from "../index";
import { FAQ } from "../models/FAQ";

describe("FAQ API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URL as string);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({
        question: "What is Node.js?",
        answer: "Node.js is a JavaScript runtime.",
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("question", "What is Node.js?");
  });

  it("should get all FAQs", async () => {
    await FAQ.create({
      question: "What is Node.js?",
      answer: "Node.js is a JavaScript runtime.",
    });
    const res = await request(app).get("/api/faqs");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });
});
