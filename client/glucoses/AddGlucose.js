import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Users } from '../../collections/Users.js';
import { Glucose } from '../../collections/Glucose.js';
import { Category } from '../../collections/Category.js';

Template.AddGlucose.onCreated(function () {
        Meteor.subscribe('Categorydata');
});

Template.AddGlucose.helpers({
        Categorydata: function () {
                return Category.find({});
        }
});

Template.AddGlucose.onRendered(function () {
        $("#addGlucose").validate({
                rules: {
                        value: {
                                required: true
                        },
                        date: {
                                date: true
                        }
                },
                messages: {
                        value: {
                                required: "Please enter glucose value"
                        },
                        date: {
                                date: "Please enter valid date format"
                        }
                }
        });

        this.$('.datepicker').datetimepicker({
                format: 'MM/DD/YYYY'
        });

        this.$('.timepicker').datetimepicker({
                format: 'LT'
        });

});


Template.AddGlucose.events({
        'submit .form-addGlucose'(event) {
                event.preventDefault();

                const target = event.target;

                var buttonId = $(document.activeElement).attr('id');

                console.log(buttonId);

                const GlucoseValue = target.value.value.trim();
                const CategoryId = target.category.value.trim();
                const glucoseDate = target.date.value.trim();
                const glucoseTime = target.time.value.trim();

                const Notes = target.notes.value.trim();
                const Tags = target.tags.value.trim();
                console.log(Meteor.userId());
                glucoseTime = moment(glucoseTime, 'hh:mm').format('hh:mm A');

                const data = {
                        UserRecordId: Meteor.userId(),
                        GlucoseValue: GlucoseValue,
                        CategoryId: CategoryId,
                        Date: glucoseDate,
                        Time: glucoseTime,
                        Notes: Notes,
                        Tags: Tags
                }
                console.log(data);

                Meteor.call('Glucosedata.insert', data, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error('OOPS! can\'t add given data. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {
                                sAlert.success('Great! New glucose data added successfully', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });

                                if (buttonId == 'addmore-glucose') {
                                        event.target.reset();
                                }
                                else {
                                        FlowRouter.go('/dashboard');
                                }

                        }
                });
        },
        'click #cancel-glucose'(event) {
                event.preventDefault();
                FlowRouter.go('/dashboard');
        }

});