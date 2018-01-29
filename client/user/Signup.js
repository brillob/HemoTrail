import { Meteor } from 'meteor/meteor';

Template.Signup.onRendered(function () {
        $("#addUser").validate({
                rules: {
                        username: {
                                required: true,
                                minlength: 5
                        },
                        password: {
                                required: true
                        },
                        email: {
                                required: true,
                                email: true
                        },
                        glucosedeUnit: {
                                required: true
                        },
                        timeZone: {
                                required: true
                        }
                },
                messages: {
                        username: {
                                required: "Please enter an username"
                        },
                        password: {
                                required: "Please enter a password"
                        },
                        email: {
                                required: "Please enter an email",
                                email: "Please enter a valid email address"
                        },
                        glucosedeUnit: {
                                required: "Please select glucose unit"
                        },
                        timeZone: {
                                required: "Please select time zone"
                        }
                }
        });
});


Template.Signup.events({
        'submit .form-signup'(event) {
                event.preventDefault();

                const target = event.target;

                const username = target.username.value.trim();
                const password = target.password.value.trim();
                const email = target.email.value.trim();
                const glucosedeUnit = target.glucodeUnit.value.trim();
                const timeZone = target.timeZone.value.trim();


                const data = {
                        Username: username,
                        Password: password,
                        Email: email,
                        GlucoseUnit: glucosedeUnit,
                        TimeZone: timeZone
                }

                Meteor.call('Userdata.insert', data, function (error, result) {
                        if (error) {

                                if (error.error === 404) {
                                        sAlert.error('OOPS! can\'t add given data. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                        return false;
                                }

                                if (error.error === 409) {
                                        sAlert.error('Username already exists! Try another one.', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                        return false;
                                }

                                if (error.error === 403) {
                                        sAlert.error('Email already exists! Try another one.', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                        return false;
                                }

                        }
                        else {
                                Session.set('userId', true);

                                var userId = result;
                                Meteor.connection.setUserId(userId);

                                sAlert.success('Great! successfully created a user', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                FlowRouter.go('/dashboard');
                        }

                });

        }
});


