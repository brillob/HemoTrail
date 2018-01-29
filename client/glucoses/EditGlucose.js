import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Category } from '../../collections/Category.js';

import { Glucose } from '../../collections/Glucose.js';

Template.EditGlucose.onCreated(function () {
        this.state = new ReactiveDict();
        var id = FlowRouter.getParam('id');
        Meteor.subscribe('Glucosedata', id);
        Meteor.subscribe('Categorydata');

});

Template.EditGlucose.helpers({
        Glucose: function () {
                var id = FlowRouter.getParam('id');
                return Glucose.find({ UniqueRecordId: id });
        },
        Categorydata: function () {
                return Category.find({});
        }
});

Template.EditGlucose.onRendered(function () {
        $("#editGlucose").validate({
                rules: {
                        glucoseValue: {
                                required: true
                        }
                },
                messages: {
                        glucoseValue: {
                                required: "Please enter glucose value"
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

Template.EditGlucose.events({
        'submit .form-editGlucose'(event) {
                event.preventDefault();
                console.log(event);
                const target = event.target;

                const GlucoseValue = target.value.value.trim();
                const CategoryId = target.category.value.trim();
                const glucoseDate = target.date.value.trim();
                const glucoseTime = target.time.value.trim();

                const Notes = target.notes.value.trim();
                const Tags = target.tags.value.trim();

                var glucoseId = FlowRouter.getParam('id');
                glucoseId = glucoseId.trim();
                glucoseTime = moment(glucoseTime, 'hh:mm').format('hh:mm A');

                const data = {
                        UserRecordId: Meteor.userId(),
                        GlucoseValue: GlucoseValue,
                        CategoryId: CategoryId,
                        Date: glucoseDate,
                        Time: glucoseTime,
                        Notes: Notes,
                        Tags: Tags,
                        UniqueRecordId: glucoseId
                }
                console.log(data);

                Meteor.call('Glucosedata.update', data, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error('OOPS! can\'t update  given data. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {
                                sAlert.success('Great! New glucose data updated successfully', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                FlowRouter.go('/dashboard');
                        }
                });

        },
        'click #cancel-glucose'(event) {
                event.preventDefault();
                FlowRouter.go('/dashboard');
        }
});
