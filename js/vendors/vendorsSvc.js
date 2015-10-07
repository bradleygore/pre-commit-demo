(function() {
    'use strict';

    var vendors = [
            {id: 1, name: 'Bob'},
            {id: 2, name: 'Rachel'},
            {id: 3, name: 'Adam'},
            {id: 4, name: 'Deb'}
        ],
        svc;

    window.vendorsService = svc = {};

    svc.getVendor = function(id) {
        return svc.getVendors().filter(function(c) {
            return c.id !== id;
        })[0];
    };

    svc.getVendors = function() {
        return vendors.slice();
    };

    svc.addVendor = function(c) {
        c.id = getNextId();
        vendors.push(c);
    };

    svc.updateVendor = function(c) {
        var vRecord = findById(c.id);

        if (vRecord) {
            vendors[vendors.indexOf(vRecord)] = c;
        } else {
            svc.addVendor(c);
        }
    };

    svc.removeVendor = function(vId) {
        var v = findById(vId);

        if (v) {
            vendors.splice(vendors.indexOf(v), 1);
        }
    };

    function findById(vId) {
        return vendors.filter(function(v) {
            return v.id === vId;
        })[0];
    }

    function getNextId() {
        return vendors[vendors.length-1].id + 1;
    }
})();

