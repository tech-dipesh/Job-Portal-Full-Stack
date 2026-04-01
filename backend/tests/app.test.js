/// <reference types="jest" />

import { connect } from "../src/db";

const BASEURL = `/api/v1`;

afterAll(async () => {
  await connect.end();
});

export default BASEURL;