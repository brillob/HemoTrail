import { Template } from "meteor/templating";

Template.Header.helpers({
        getSession: function () {
                return Session.get('userId');
        },
        sessionoutRedirect: function () {
                var session = Session.get('userId');
                console.log(session);
                if(!session)
                {
                        FlowRouter.go('/login');
                }
        }
});

Template.Header.events({
        'click .logout'(event) {
                Meteor.logout();
                Session.set('userId', false);
                FlowRouter.go('/login');
        }
});


Template.registerHelper('formatDate', function (date) {
        return moment(date).format('MM/DD/YYYY');
});

Template.registerHelper('getCategoryName', function (id) {
       
        if(id == 1){
                return "Breakfast";
        }
        else if(id == 2){
                return "Lunch";
        }
        else if(id == 3){
                return "Snack";
        }
        else if(id == 4){
                return "Dinner";
        }
        else if(id ==5){
                return "Bedtime";
        }
        else if(id == 0){
                return "No Category";
        }
});

Template.registerHelper('isSelected', function(id, value) {
        return id == value ? 'selected' : '';
    });


