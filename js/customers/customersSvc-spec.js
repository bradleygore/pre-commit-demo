describe('Customers -> Service Module', function testCustomersSvc() {
    'use strict';

    var customerSvc = window.customersService;

    it('should return copy of customers list and not reference to actual data source', function() {
        var customersA = customerSvc.getCustomers(),
            customersB = customerSvc.getCustomers();
        expect(customersA).not.toBe(customersB);
    });

    it('should add a customer and give it an ID 1 higher than max in the set of customers', function() {
        var customers = customerSvc.getCustomers(),
            maxId = customers.reduce(function(max, c) {
                return (c.id > max) ? c.id : max;
            }, 0),
            newCustomer = {};
        customerSvc.addCustomer(newCustomer);
        expect(newCustomer.id).toBe(maxId + 1);
    });

    it('should edit a customer', function() {
        var customers = customerSvc.getCustomers(),
            customerToEdit = customers[customers.length - 1],
            editedCustomer;
        customerToEdit.age = 99.9;
        customerSvc.updateCustomer(customerToEdit);
        editedCustomer = customerSvc.getCustomer(customerToEdit.id);
        expect(editedCustomer.age).toBe(customerToEdit.age);
    });

    it('should remove a customer by its ID', function() {
        var customers = customerSvc.getCustomers(),
            customersLength = customers.length,
            idToRemove = customers[Math.floor(customers.length / 2)].id;
        customerSvc.removeCustomer(idToRemove);
        customers = customerSvc.getCustomers();
        expect(customers.length).toBe(customersLength - 1);
        expect(customers.filter(function(c) {
            return c.id === idToRemove;
        }).length).toBe(0);
    });
});
