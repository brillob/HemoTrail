FlowRouter.route('/signup', {
        name: 'Signup',
        action() {
                BlazeLayout.render('Header', {noSession:'Signup'});
        }
});

FlowRouter.route('/login', {
        name: 'Login',
        action() {
                BlazeLayout.render('Header', {noSession:'Login'});
        }
});

FlowRouter.route('/forgot_password', {
        name: 'Forgot Password',
        action() {
                BlazeLayout.render('Header', {noSession:'ForgotPassword'});
        }
});

FlowRouter.route('/password_reset', {
        name: 'Password Reset',
        action() {
                BlazeLayout.render('Header', {noSession:'PasswordReset'});
        }
});

FlowRouter.route('/', {
        name: 'Dashboard',
        action() {
                BlazeLayout.render('Header', {main:'Dashboard'});
        }
});

FlowRouter.route('/dashboard', {
        name: 'Dashboard',
        action() {
                BlazeLayout.render('Header', {main:'Dashboard'});
        }
});

FlowRouter.route('/add_glucose', {
        name: 'Add Glucose',
        action() {
                BlazeLayout.render('Header', {main:'AddGlucose'});
        }
});

FlowRouter.route('/edit_glucose/:id', {
        name: 'Edit Glucose',
        action() {
                BlazeLayout.render('Header', {main:'EditGlucose'});
        }
});

FlowRouter.route('/delete_glucose/:id', {
        name: 'Delete Glucose',
        action() {
                BlazeLayout.render('Header', {main:'DeleteGlucose'});
        }
});

FlowRouter.route('/user_settings', {
        name: 'Settings',
        action() {
                BlazeLayout.render('Header', {main:'Settings'});
        }
});

FlowRouter.route('/share_data', {
        name: 'Share Data',
        action() {
                BlazeLayout.render('Header', {main:'ShareData'});
        }
});

FlowRouter.route('/filter_data', {
        name: 'Search',
        action() {
                BlazeLayout.render('Header', {main:'FilterData'});
        }
});
