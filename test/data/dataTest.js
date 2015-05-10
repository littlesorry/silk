var should = require("should");

var data = require(__dirname + "/../../lib/data/data");


describe("data.js", function() {

    before(function() {
        data("masterpiece")._clear();
    });

    describe("#insert@masterpiece", function() {
        var now = new Date();
        it("should insert masterpiece ok", function(done) {
            data("masterpiece").insert({
                author: "unit test",
                paths: [{x: 0, y: 0}, {x: 1, y: 1}],
                createdAt: now
            }).then(function(returned) {
                data("masterpiece")
                .findOne({author: "unit test"})
                .then(function(actual) {
                    actual.should.containEql({
                        author: "unit test",
                        createdAt: now
                    });
                    actual.should.have.property('paths').with.lengthOf(2);
                    done();                        
                });
            }).catch(function(err) {
                done(err);
            });
        });
    });

})

