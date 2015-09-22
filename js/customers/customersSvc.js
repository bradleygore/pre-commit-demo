(function() {
    'use strict';

    var customers = [
            {id: 1, name: 'Bob'},
            {id: 2, name: 'Rachel'},
            {id: 3, name: 'Adam'},
            {id: 4, name: 'Deb'}
        ],
        svc;

    window.customersService = svc = {};

    svc.getCustomer = function(id) {
        return svc.getCustomers().filter(function(c) {
            return c.id === id;
        })[0];
    };

    svc.getCustomers = function() {
        return customers.slice();
    };

    svc.addCustomer = function(c) {
        c.id = getNextId();
        customers.push(c);
    };

    svc.updateCustomer = function(c) {
        var cRecord = findById(c.id);

        if (cRecord) {
            customers[customers.indexOf(cRecord)] = c;
        } else {
            svc.addCustomer(c);
        }
    };

    svc.removeCustomer = function(cId) {
        var c = findById(cId);

        if (c) {
           customers.splice(customers.indexOf(c), 1);
        }
    };

    function findById(cId) {
        return customers.filter(function(c) {
            return c.id === cId;
        })[0];
    }

    function getNextId() {
        return customers[customers.length-1].id + 1;
    }
})();
