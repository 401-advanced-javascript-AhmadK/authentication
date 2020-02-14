'use strict';

const { server } = require('../server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);
const base64 = require('base-64');


describe('Authentication Model',()=>{

  it('POST to /signup to create a new user', ()=>{
    let test = {'username': 'ahmadkhaleel96', 'password': 'Ahmad@$ 96 => INSTAcreative'};
    mockRequest.post('/signup')
      .send(test)
      .then(data=>{
        // console.log(data.text);
        expect(data.text).toEqual(base64.encode(test.password));
      });
  });
});