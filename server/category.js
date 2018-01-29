// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

// import { Category } from '../collections/Category.js';

// Meteor.methods({

//         'categoryName.get'(categoryuniqueId) {
//                 check(categoryuniqueId, Number);
//                 console.log(categoryuniqueId);

//                 const categoryData = Category.find({ UniqueRecordId: categoryuniqueId }).fetch();
//                 var CategoryName = categoryData[0].Name;

//                 if (!CategoryName) {
//                         throw new Meteor.Error(500, 'Error 500: Can\'t delete the submitted data');
//                 }
//                 else {
//                         console.log(CategoryName);
//                         return CategoryName;
//                 }

//         }
// });