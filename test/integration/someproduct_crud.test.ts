import { agent as request } from 'supertest';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

describe('Some sort of CRUD API Test', () => {
  
  it('user can create an activation for a user with third north auth', async () => {

    const response = await request(process.env.BASE_URL)
        .post(process.env.ACTIVATIONS_ENDPOINT)
        .send({
          "custom_payload": "2asdfasdf1971sdfsdg4"
        })
        .auth(process.env.HIGH_ACCESS_USER, { type: 'bearer' });
    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it('user is unable to create an activation for a user with some client auth', async () => {

    const responseOne = await request(process.env.US_BASE_URL)        // These four lines create the , client auth
    .post(process.env.US_CLIENT_AUTH_ENDPOINT)                        // Bearer Token.  I based it off of a blank service
    .auth(process.env.HIGH_ACCESS_USER, { type: 'bearer' });          // request.  this pulls just the generated token, which
    const someProductAuth = responseOne.text.substring(17, [49]);     // is valid for 1800 ms

    const response = await request(process.env.BASE_URL)
        .post(process.env.ACTIVATIONS_ENDPOINT)
        .send({
          "custom_payload": "2asdfasdf1971sdfsdg4"
        })
        .auth(someProductAuth, { type: 'bearer' });
    expect(response.status).toEqual(401);
  });

  it('user can update an activation with third north auth', async () => {

    const response = await request(process.env.BASE_URL)
        .post(process.env.ACTIVATIONS_ENDPOINT)
        .send({
          "custom_payload": "2asdfasdf1971sdfsdg4"
        })
        .auth(process.env.HIGH_ACCESS_USER, { type: 'bearer' });
    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    console.log(response)
  });

});
