import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Users } from '../collections/Users.js';

Meteor.methods({

        'Userdata.insert'(data) {
                check(data, Object);

                var getUserBool = Meteor.call('Duplicateuser.check', data.Username);
                console.log(getUserBool);
                if (getUserBool) {
                        throw new Meteor.Error(409, 'Error 409: Username Exists');
                        return false;
                }

                var getUserEmailBool = Meteor.call('Duplicateemail.check', data.Email);
                console.log(getUserEmailBool);
                if (getUserEmailBool) {
                        throw new Meteor.Error(403, 'Error 403: Email Exists');
                        return false;
                }
                

                var bcrypt = require('bcrypt');
                var salt = bcrypt.genSaltSync(10);
                var passwordHash = bcrypt.hashSync(data.Password, salt);
                console.log(passwordHash);


                var InsertData = Users.insert({
                        Username: data.Username,
                        Password: passwordHash,
                        Email: data.Email,
                        GlucoseUnit: data.GlucoseUnit,
                        TimeZone: data.TimeZone
                });
                console.log(InsertData);

                if (!InsertData) {
                        throw new Meteor.Error(500, 'Error 500: Can\'t insert the submitted data');
                }
                else {
                        var getUserId = Meteor.call('User.check', data);
                        return getUserId;
                }
        },
        'User.check'(data) {

                check(data, Object);

                var getUserData = Users.find({ "Username": data.Username }).fetch();
                if (getUserData.length == 0) {
                        throw new Meteor.Error(404, 'Error 404: User Not found');
                }
                else {
                        var userId = getUserData[0].UniqueRecordId;
                        if (userId) {
                                this.setUserId(userId);
                                return userId;
                        }
                }
        },
        'Userpassword.check'(data){
                check(data, Object);
                var getUserData = "";
                getUserData = Users.find({ "Username": data.Username }).fetch();
                console.log("UserData from DB =>" + getUserData);

                if (getUserData == "") {
                        throw new Meteor.Error(404, 'Error 404: User Not found');
                }
                else {
                        var userId = getUserData[0].UniqueRecordId;
                        var passwordHash = getUserData[0].Password;
                        console.log("Password hash from DB =>" + passwordHash);
                        var bcrypt = require('bcrypt');
                        var passwordCompareResult = bcrypt.compareSync(data.Password, passwordHash);
                        console.log(passwordCompareResult);
                        if (passwordCompareResult) {
                                this.setUserId(userId);
                                return userId;
                        }
                        else{
                                throw new Meteor.Error(400, 'Wrong Password');
                        }
                }
        },
        'Duplicateuser.check'(Username) {

                check(Username, String);
                var getUserData = "";
                getUserData = Users.find({ "Username": Username }).fetch();
                console.log("UserData from DB =>" + getUserData[0]);

                if (getUserData != "" ) {
                        return true;
                }
                else {
                       return false;
                }
        },
        'Duplicateemail.check'(Email) {

                check(Email, String);
                var getUserData = "";
                getUserData = Users.find({ "Email": Email }).fetch();
                console.log("UserData from DB =>" + getUserData[0]);

                if (getUserData != "" ) {
                        return true;
                }
                else {
                       return false;
                }
        },
        'Userpassword.Update'(data) {

                check(data, Object);

                var getUsername = Users.find({ "UniqueRecordId": Meteor.userId() }).fetch();

                if (getUsername.length == 0) {
                        throw new Meteor.Error(404, 'Error 404: No user found');
                }
                else {
                        var userId = getUsername[0].UniqueRecordId;
                        var passwordHash = getUsername[0].Password;
                        console.log("Password hash from DB =>" + passwordHash);
                        var bcrypt = require('bcrypt');
                        var passwordCompareResult = bcrypt.compareSync(data.oldPassword, passwordHash);
                        console.log(passwordCompareResult);
                        if (passwordCompareResult) {
                                var salt = bcrypt.genSaltSync(10);
                                var passwordHash = bcrypt.hashSync(data.newPassword, salt);
        
                                Users.update({ UniqueRecordId: Meteor.userId() }, { $set: { Password: passwordHash } });
                        }
                        else
                        {
                                throw new Meteor.Error(404, 'Error 404: Old password is wrong');
                        }

                                              
                }
        },
        'Userdata.Update'(data) {

                check(data, Object);

                var updateData = Users.update({ UniqueRecordId: Meteor.userId() }, {
                        $set:
                                {
                                        Username: data.Username,
                                        Email: data.Email,
                                        TimeZone: data.TimeZone,
                                        FirstName: data.FirstName,
                                        LastName: data.LastName,
                                        GlucoseUnit: data.GlucoseUnit,
                                        GlucoseDefaultCategoryId: data.GlucoseDefaultCategoryId,
                                        GlucoseLowValue: data.GlucoseLowValue,
                                        GlucoseHighValue: data.GlucoseHighValue,
                                        GlucoseTargetMin: data.GlucoseTargetMin,
                                        GlucoseTargetMax: data.GlucoseTargetMax
                                }
                });

                console.log(updateData);

                if (!updateData) {
                        throw new Meteor.Error(500, 'Error 500: Can\'t update the submitted data');
                }
                else {
                        return updateData;
                }
        },
});



