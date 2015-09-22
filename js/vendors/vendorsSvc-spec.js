describe('Vendors -> Service Module', function testVendorsSvc() {
    'use strict';

    var vendorsSvc = window.vendorsService;

    it('should return copy of vendors list and not reference to actual data source', function() {
        var vendorsA = vendorsSvc.getVendors(),
            vendorsB = vendorsSvc.getVendors();
        expect(vendorsA).not.toBe(vendorsB);
    });

    it('should add a customer and give it an ID 1 higher than max in the set of vendors', function() {
        var vendors = vendorsSvc.getVendors(),
            maxId = vendors.reduce(function(max, c) {
                return (c.id > max) ? c.id : max;
            }, 0),
            newVendor = {};
        vendorsSvc.addVendor(newVendor);
        expect(newVendor.id).toBe(maxId + 1);
    });

    it('should edit a customer', function() {
        var vendors = vendorsSvc.getVendors(),
            vendorToEdit = vendors[vendors.length - 1],
            editedVendor;
        vendorToEdit.age = 99.9;
        vendorsSvc.updateVendor(vendorToEdit);
        editedVendor = vendorsSvc.getVendor(vendorToEdit.id);
        expect(editedVendor.age).toBe(vendorToEdit.age);
    });

    it('should remove a customer by its ID', function() {
        var vendors = vendorsSvc.getVendors(),
            vendorsLength = vendors.length,
            idToRemove = vendors[Math.floor(vendors.length / 2)].id;
        vendorsSvc.removeVendor(idToRemove);
        vendors = vendorsSvc.getVendors();
        expect(vendors.length).toBe(vendorsLength - 1);
        expect(vendors.filter(function(c) {
            return c.id === idToRemove;
        }).length).toBe(0);
    });
});

