import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Glucose } from '../../collections/Glucose.js';

Template.DeleteGlucose.onCreated(function () {
        this.state = new ReactiveDict();
        var id = FlowRouter.getParam('id');
        Meteor.subscribe('Glucosedata', id);

});

Template.DeleteGlucose.helpers({
        Glucose: function () {
                var id = FlowRouter.getParam('id');
                return Glucose.find({ UniqueRecordId: id });
        }
});

Template.DeleteGlucose.events({
        'click .delete_proceed'(event) {
                event.preventDefault();
                

                var glucoseId = FlowRouter.getParam('id');
                glucoseId = glucoseId.trim();

                console.log(glucoseId);
                

                Meteor.call('Glucosedata.delete', glucoseId,null, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error('OOPS! can\'t delete glucose. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {
                                sAlert.success('Glucose data deleted successfully', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                FlowRouter.go('/dashboard');
                        }

                });

        },
        'click .cancel-delete-glucose'(event){
                event.preventDefault();
                FlowRouter.go('/dashboard');
        }
        
});
