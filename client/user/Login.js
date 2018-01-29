import { Meteor } from 'meteor/meteor';

Template.Login.onRendered(function () {
        $("#loginUser").validate({
                rules: {
                        username: {
                                required: true,
                                minlength: 5
                        },
                        password: {
                                required: true
                        }
                },
                messages: {
                        username: {
                                required: "Please enter an username"
                        },
                        password: {
                                required: "Please enter a password"
                        }
                }

        });

});

Template.Login.events({
        'submit .form-login'(event) {
                event.preventDefault();

                const target = event.target;

                const username = target.username.value.trim();
                const password = target.password.value.trim();

                const data = {
                        Username: username,
                        Password: password
                }
                console.log(data);

                Meteor.call('Userpassword.check',data, function (error, result) {

                        if (error) {
                                if(error.error === 404)
                                {
                                        Session.set('userId', false);
                                        sAlert.error('oops! Username Not Found, Check the Username', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                        return false;
                                }

                                if(error.error === 400){
                                        Session.set('userId', false);
                                        sAlert.error('oops! Wrong Password, Check the Password', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                        return false;
                                }
                               
                        }
                        else {
                                Session.set('userId', true);
                               
                                var userId = result;
                                Meteor.connection.setUserId(userId);
                                
                                sAlert.success('Great! Credentials matched', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                FlowRouter.go('/');
                        }

                });

        }
});