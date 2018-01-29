import { Meteor } from 'meteor/meteor';

Template.ShareData.onRendered(function () {
        $("#shareData").validate({
                rules: {
                        format: {
                                required: true
                        },
                        fromdate: {
                                required: true
                        },
                        todate: {
                                required:true
                        },
                        sendto:{
                                required:true,
                                email:true
                        }

                
                },
                messages: {
                        format: {
                                required: "Please select file format"
                        },
                        fromdate: {
                                required: "Please select starting date"
                        },
                        todate: {
                                required: "Please select ending date"
                        },
                        sendto: {
                                required: "Please enter email",
                                email: "Please enter valid email"
                        }
                }
        });

        this.$('.datepicker').datetimepicker({
                format: 'MM/DD/YYYY'
        });

});