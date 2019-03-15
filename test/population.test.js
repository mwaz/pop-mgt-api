'use strict';
import app from '../index';
import chai from 'chai';
import request from 'supertest';
import data from './support/test-data/location';
import chaiHttP  from 'chai-http';
import { exec } from 'child_process';
chai.use(chaiHttP);
const api = new request(app);
const expect = chai.expect;
const should = chai.should();

describe('Population : /population', function(){
      describe('POST /population', function(){
        it('Can create a location and add a population', async function() {
            const res = await api
            .post('/pop-mgt/api/population')
            .send(
              data.locationData
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(201)
            expect(res.body).should.be.a('Object')
            expect(res.body).should.have.property('status');
            expect(res.body.status).to.be.eql("success");
            expect(res.body.data.location).to.have.property("_id");
        })
        it('Can create a location with an existent parentLocation', async function() {
          await api
          .post('/pop-mgt/api/population')
          .send(
            data.locationData
          )
          const res = await api
          .post('/pop-mgt/api/population')
          .send(
            data.locationDataWithParent
          )
          .set('Accept', 'application/json')
          expect(res).to.have.status(201)
          expect(res.body).should.be.a('Object')
          expect(res.body).should.have.property('status');
          expect(res.body.status).to.be.eql("success");
          expect(res.body.data.location).to.have.property("_id");
      })
        it('Cannot create a duplicate location', async function() {
          const response = await api
          .post('/pop-mgt/api/population')
          .send(
            data.locationData
          )
          const duplicateresponse = await api
          .post('/pop-mgt/api/population')
          .send(
            data.locationData
          )
          .set('Accept', 'application/json')
          expect(duplicateresponse).to.have.status(409)
          expect(duplicateresponse.body.data.message).to.be.eql('This location has already been added.')
          expect(duplicateresponse.body.status).to.be.eql('fail')
      })
      it('Cannot create a nested location without an existing parent ', async function() {
       await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationData2
        )
        const parentError = await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationDataWithParent
        )
        .set('Accept', 'application/json')
        expect(parentError).to.have.status(400)
        expect(parentError.body.data.message).to.be.eql('Oops! looks like we do not have that parent location yet :(')
        expect(parentError.body.status).to.be.eql('fail')
    })

      it('Cannot create population data without a name', async function() {
        const res = await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationDataNoName
        )
        .set('Accept', 'application/json')
        expect(res).to.have.status(422)
    })
    });
    describe('GET /population', function(){
      it('Can get all added locations with their population data', async() =>{
        await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationData
        )
        await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationData2
        )
        .set('Accept', 'application/json')
        const response = await api
        .get('/pop-mgt/api/population')
        expect(response).to.have.status(200)
      });

      it('Can get single added locations with their population data', async() =>{
        const request = await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationData
        )
        .set('Accept', 'application/json')
        const locationId = request.body.data.location._id
        const response = await api
        .get(`/pop-mgt/api/population/${locationId}`)
        expect(response).to.have.status(200)
      });
    });

    describe('DELETE /population', function(){
      it('Can delete an existing location', async () => {
        const request = await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationData
        )
        .set('Accept', 'application/json')
        const locationId = request.body.data.location._id
        const response = await api
        .delete(`/pop-mgt/api/population/${locationId}`)
        expect(response).to.have.status(200)
      })
      it('Cannot delete a non-existent location', async () => {
        const request = await api
        .post('/pop-mgt/api/population')
        .send(
          data.locationData
        )
        .set('Accept', 'application/json')
        const locationId = request.body.data.location._id
        const response = await api
        .delete(`/pop-mgt/api/population/${locationId}`)
        const deletedresponse = await api
        .delete(`/pop-mgt/api/population/${locationId}`)
        expect(deletedresponse).to.have.status(400);
        expect(deletedresponse.body.data.message).to.be.eql('Oops! looks like your location does not exist:(');
      })
    });

    });


