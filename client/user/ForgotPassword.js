import { Meteor } from 'meteor/meteor';

Template.ForgotPassword.onRendered(function () {
        $("#resetPassword").validate({
                rules: {
                        emailAddress: {
                                required: true,
                                email:true
                        }
                },
                messages: {
                        emailAddress: {
                                required: "Please enter your email",
                                email:"Please enter a valid email"
                        }
                }
        });

});