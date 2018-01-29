import { Meteor } from 'meteor/meteor';
import { Users } from '../collections/Users.js';
import { Glucose } from '../collections/Glucose.js';
import { Category } from '../collections/Category.js';
import { check } from 'meteor/check';

Meteor.publish('Userdata', function getUser() {
        return Users.find({ UniqueRecordId: Meteor.userId() });
});

Meteor.publish('Glucosedata', function getGlucosedata() {
        return Glucose.find({ UserRecordId: Meteor.userId() });
        // var Glucoses = Glucose.find({UserRecordId: Meteor.userId()});

        // var CategoryIds = Glucoses.map(function (p) { return p.CategoryId });
        // console.log(CategoryIds);
        // return [
        //         Glucoses,
        //         Meteor.Category.find({ UserRecordId: { $in: CategoryIds } })
        // ]
});

Meteor.publish('Glucose', function getGlucose() {
        return Glucose.find({});
});

Meteor.publish('Categorydata', function getCategorydata(id) {
        return Category.findOne({ UniqueRecordId: id });
});
