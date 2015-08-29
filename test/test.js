'use strict';

var chai = require('chai');
var api = require('../index.js');

require('dotenv').load();
chai.should();

describe('Unsplash API public endpoints', function() {
  api.init(process.env.CLIENT_ID);

  describe('User', function() {
    describe('getUserPhotos', function() {
      it('should return without err and with an empty array', function(done) {
        api.getUserPhotos('fletcher_hills', function(err, photos) {
          if (err) return done(err);

          photos.should.be.instanceOf(Array);

          done();
        });
      });

      it('should return with invalid username error', function(done) {
        api.getUserPhotos('01234', function(err, photos) {

          err.should.exist;
          chai.expect(photos).to.not.exist;

          done();
        });
      })
    });

    describe('getUserByName', function() {
      it ('should return without err and with a user', function(done) {
        api.getUserByName('fletcher_hills', function(err, user) {
          if (err) return done(err);

          user.should.be.ok;

          done();
        });
      });

      it ('should return with invalid username error', function(done) {
        api.getUserByName('01234', function(err, user) {

          err.should.exist;
          chai.expect(user).to.not.exist;

          done();
        });
      });
    });
  });
  
  describe('Photos', function() {
     describe('getPhotos', function() {
        it('should return without err and with the first 10 pictures', function(done) {
           api.getPhotos(null, null, function(err, photos, link) {
              if(err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);
              
              done();
           });
        });
        
        it('should return without err and with the first 20 pictures', function(done) {
           api.getPhotos(null, 20, function(err, photos, link) {
               if(err) return done(err);
               
               photos.should.be.instanceOf(Array);
               photos.should.have.length(20);
               
               done();
           });
        });
        
        it('should return without err and with the second 10 pictures', function(done) {
           api.getPhotos(2, null, function(err, photos, link) {
               if(err) return done(err);
               
               photos.should.be.instanceOf(Array);
               photos.should.have.length(10);
               
               console.log(typeof link);
               link.should.contain('<https://api.unsplash.com/photos?page=1>; rel="prev",');
               
               done();
           });
        });
     });
  });
});