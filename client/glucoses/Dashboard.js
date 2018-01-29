import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Glucose } from '../../collections/Glucose.js';
import { Category } from '../../collections/Category.js';

Meteor.subscribe('Glucosedata');

Template.Dashboard.helpers({
        Glucosedata: function () {
                return Glucose.find({});
        }

});

Template.Dashboard.events({
        'click .accordion-toggle'(event) {
                event.preventDefault();

                var id = this._id;
                
                $('#' + id + '-toggle' + '').toggleClass("glyphicon-minus");
                $(".glyphicon-minus").css('color:red');

        },
        'click #UniqueRecordId'(event) {
                event.preventDefault();

                var UniqueRecordId = this.UniqueRecordId;

                FlowRouter.go('/edit_glucose/' + UniqueRecordId + '');
        },
        'click .remove-glucose'(event) {
                event.preventDefault();
                var id = this._id;
                
                $("tr").removeAttr("data-toggle");

                Meteor.call('Glucosedata.delete', null,id, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error('OOPS! can\'t delete the glucose. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {
                                sAlert.success('Great! glucose deleted successfully', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                $("tr").attr("data-toggle", "collapse");
                        }
                });
        }
        
});

