process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let models = require('../models/models');
let Jokes = models.Jokes;

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Joke', () => {
    beforeEach((done) => {
        Jokes.remove({}, (err) => {
            done();
        });
    });

    describe('/GET jokes', () => {
        it('it should GET all the jokes', (done) => {
            chai.request(app)
                .get('/jokes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST jokes', () => {
       it('it should Create a new joke', (done) => {
           let joke = {
               content: '2 cats walk into a bar'
           }
           chai.request(app).post('/jokes')
               .send(joke)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('content').eql(joke.content);
                   done();
               });
       });
    });

});
