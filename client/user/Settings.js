import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Category } from '../../collections/Category.js';

import { Users } from '../../collections/Users.js';

Template.Settings.onCreated(function () {
        this.state = new ReactiveDict();
        Meteor.subscribe('Userdata');
        Meteor.subscribe('Categorydata');
});



Template.Settings.helpers({
        Userdata: function () {
                return Users.find({});
        },
        Categorydata: function () {
                return Category.find({});
        }
});

Template.Settings.onRendered(function () {

        $("#changePassword").validate({
                rules: {
                        oldpassword: {
                                required: true,
                        },
                        newpassword: {
                                required: true
                        },
                        r_newpassword: {
                                required: true,
                                equalTo: "#newPassword"
                        }
                },
                messages: {
                        oldpassword: {
                                required: "Please enter your old password"
                        },
                        newpassword: {
                                required: "Please enter new password"
                        },
                        r_newpassword: {
                                required: "Please enter the new password again",
                                equalTo: "Please enter the same password again"
                        }
                }
        });

        $("#changeaccountSettings").validate({
                rules: {
                        username: {
                                required: true,
                        },
                        email: {
                                required: true
                        },
                        timeZone: {
                                required: true
                        },
                        glucodeUnit: {
                                required: true
                        },
                        lowglucosevalue: {
                                required: true
                        },
                        highGlucoseValue: {
                                required: true
                        },
                        targetMinGlucoseValue: {
                                required: true
                        },
                        targetMaxGlucoseValue: {
                                required: true
                        }

                },
                messages: {
                        username: {
                                required: "Please enter an username"
                        },
                        email: {
                                required: "Please enter an email"
                        },
                        timeZone: {
                                required: "Please select your timezone"
                        },
                        glucodeUnit: {
                                required: "Please select your glucose unit"
                        },
                        lowglucosevalue: {
                                required: "Please enter low glucose value"
                        },
                        highGlucoseValue: {
                                required: "Please enter high glucose value"
                        },
                        targetMinGlucoseValue: {
                                required: "Please enter target min glucose value"
                        },
                        targetMaxGlucoseValue: {
                                required: "Please enter target max glucose value"
                        }
                }
        });
});


Template.Settings.events({
        'submit .form-passwordChange'(event) {
                event.preventDefault();

                const target = event.target;

                const oldpassword = target.oldpassword.value.trim();
                const newpassword = target.newpassword.value.trim();

                const data = {
                        oldPassword: oldpassword,
                        newPassword: newpassword
                }

                Meteor.call('Userpassword.Update', data, function (error, result) {

                        if (error && error.error === 404) {
                                sAlert.error("Current password should not changed", { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {

                                sAlert.success('New Password successfully updated', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                        }

                });

        },
        'submit .form-userdataChange'(event) {
                event.preventDefault();

                const target = event.target;

                const username = target.username.value.trim();
                const email = target.email.value.trim();
                const firstname = target.firstname.value.trim();
                const lastname = target.lastname.value.trim();
                const timeZone = target.timeZone.value.trim();
                const glucodeUnit = target.glucodeUnit.value.trim();
                const category = target.category.value.trim();
                const lowglucosevalue = target.lowglucosevalue.value.trim();
                const highGlucoseValue = target.highGlucoseValue.value.trim();
                const targetMinGlucoseValue = target.targetMinGlucoseValue.value.trim();
                const targetMaxGlucoseValue = target.targetMaxGlucoseValue.value.trim();
                console.log(lowglucosevalue);
                const data = {
                        Username: username,
                        Email: email,
                        FirstName: firstname,
                        LastName: lastname,
                        TimeZone: timeZone,
                        GlucoseUnit: glucodeUnit,
                        GlucoseDefaultCategoryId: category,
                        GlucoseLowValue: lowglucosevalue,
                        GlucoseHighValue: highGlucoseValue,
                        GlucoseTargetMin: targetMinGlucoseValue,
                        GlucoseTargetMax: targetMaxGlucoseValue
                }

                Meteor.call('Userdata.Update', data, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error("Internal Error! Can't Update submitted data", { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {

                                sAlert.success('User data succesfully updated', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                        }

                });

        },
        'click .cancel-updatesettings'(event) {
                event.preventDefault();
                FlowRouter.go('/dashboard');
        }
});


