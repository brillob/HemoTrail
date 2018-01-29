import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Category } from '../../collections/Category.js';
import { Glucose } from '../../collections/Glucose.js';


Template.FilterData.onCreated(function () {
        this.searchData = new ReactiveDict();
        this.searchData.set( 'searchResult', '');
        Meteor.subscribe('Glucosedata');
        // Meteor.subscribe('Categorydata');
});

Template.FilterData.helpers({
        Glucosedata: function () {
               
                var searchData = Template.instance().searchData.get( 'searchResult' );
               
                if(searchData == 'undefined' || searchData == [] || (!searchData)){
                        // Session.set('searchResult', "");
                        return Glucose.find({});
                }
                else{
                        return searchData; 
                }
        },
        // Categorydata: function () {
        //         return Category.find({});
        // }
});


Template.FilterData.onRendered(function () {
       
        this.$('.datepicker').datetimepicker({
                format: 'MM/DD/YYYY'
        });

});


Template.FilterData.events({
        'submit .form-filterdata'(event, template) {
                event.preventDefault();
                console.log(event);
                const target = event.target;

                const fromdate = target.fromdate.value.trim();
                const todate = target.todate.value.trim();
                const category = target.category.value.trim();
                const fromglucosevalue = target.fromglucosevalue.value.trim();
                const toglucosevalue = target.toglucosevalue.value.trim();

                const glucosenotes = target.glucosenotes.value.trim();
                const glucosetags = target.glucosetags.value.trim();

                var date1 = new Date(fromdate);
                var date2 = new Date(todate);

                const data = {
                        UserRecordId: Meteor.userId(),
                        Glucosedate1: date1,
                        Glucosedate2: date2,
                        Category: category,
                        Glucose1: fromglucosevalue,
                        Glucose2 : toglucosevalue,
                        Notes: glucosenotes,
                        Tags: glucosetags
                }
                // console.log(data);

                Meteor.call('Glucosedata.search', data, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error('OOPS! can\'t update  given data. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {
                                // console.log(result);
                                // Session.set('searchResult', result);
                                template.searchData.set( 'searchResult', result );
                                // sAlert.success('Great! New glucose data updated successfully', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                // FlowRouter.go('/dashboard');
                        }

                });

        },
        'click .accordion-toggle'(event) {
                event.preventDefault();
                var id = this._id;
                $('#'+id+'-toggle'+'').toggleClass("glyphicon-minus");
                
        },
        'click #UniqueRecordId'(event) {
                event.preventDefault();
                
                var UniqueRecordId = this.UniqueRecordId;
                
                FlowRouter.go('/edit_glucose/'+UniqueRecordId+'');
                
        },
        'click .remove-glucose'(event) {
                event.preventDefault();
                console.log(this._id)
                var id = this._id;
                console.log(id);
                $("tr").removeAttr("data-toggle");

                Meteor.call('Glucosedata.delete', null,id, function (error, result) {

                        if (error && error.error === 500) {
                                sAlert.error('OOPS! can\'t delete the glucose. Something went wrong', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                return false;
                        }
                        else {
                                sAlert.success('Great! glucose deleted successfully', { effect: 'stackslide', position: 'top', onRouteClose: true, stack: false, timeout: 3000 });
                                $("tr").attr("data-toggle", "collapse");
                                $("#remove1-"+id+"").hide();
                                $("#remove2-"+id+"").hide();
                        }
                });
        }
        
});
