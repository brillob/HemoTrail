import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Glucose } from '../collections/Glucose.js';

Meteor.methods({

        'Glucosedata.insert'(data) {
                check(data, Object);

                var InsertData = Glucose.insert({
                        UserRecordId: data.UserRecordId,
                        GlucoseValue: data.GlucoseValue,
                        CategoryId: data.CategoryId,
                        Date: data.Date,
                        Time: data.Time,
                        Notes: data.Notes,
                        Tags: data.Tags
                });
                console.log(InsertData);

                if (!InsertData) {
                        throw new Meteor.Error(500, 'Error 500: Can\'t insert the submitted data');
                }
                else {
                        return InsertData;
                }

        },
        'Glucosedata.update'(data) {
                check(data, Object);
                const glucoseValue = Glucose.find({ UniqueRecordId: data.UniqueRecordId }).fetch();

                var UpdateData = Glucose.update(glucoseValue[0]._id, {
                        $set: {
                                GlucoseValue: data.GlucoseValue,
                                CategoryId: data.CategoryId,
                                Date: data.Date,
                                Time: data.Time,
                                Notes: data.Notes,
                                Tags: data.Tags
                        }
                });

                console.log(UpdateData);

                if (!UpdateData) {
                        throw new Meteor.Error(500, 'Error 500: Can\'t update the submitted data');
                }
                else {
                        return UpdateData;
                }

        },
        'Glucosedata.delete'(glucoseId = null, Id = null) {
                console.log(Id);
                console.log(glucoseId);

                if (Id) {

                        var deleteResponse = Glucose.remove(Id);
                        console.log(deleteResponse)
                        if (!deleteResponse) {
                                throw new Meteor.Error(500, 'Error 500: Can\'t delete the submitted data');
                        }
                        else {
                                return deleteResponse;
                        }
                }
                else {
                        if (glucoseId !== null && glucoseId != "" && (glucoseId)) {
                                const glucoseValue = Glucose.find({ UniqueRecordId: glucoseId }).fetch();

                                console.log(glucoseValue[0]);
                                var deleteResponse = Glucose.remove(glucoseValue[0]._id);

                                if (!deleteResponse) {
                                        throw new Meteor.Error(500, 'Error 500: Can\'t delete the submitted data');
                                }
                                else {
                                        return deleteResponse;
                                }
                        }
                }
        },
        'Glucosedata.search'(data) {
                check(data, Object);
                console.log(data);

                console.log(data.Glucosedate1);
                console.log(data.Glucosedate2);

                const getsearchData = Glucose.find({
                        UserRecordId: data.UserRecordId,
                        Date: { $gte: data.Glucosedate1, $lte: data.Glucosedate2 },
                        // $or: [{ Category: data.Category }],
                        // $or: [{ Tags: { $regex: data.Tags, $options: '-i' } }],
                        // $or: [{ Notes: { $regex: data.Notes, $options: '-i' } }],
                        // $or: [{ GlucoseValue: { $gte: data.Glucose1, $lte: data.Glucose2 } }]



                }).fetch();

                console.log(getsearchData);

                if (!getsearchData) {
                        throw new Meteor.Error(500, 'Error 500: Can\'t fetch the data');
                }
                else {
                        return getsearchData;
                }

        }
});


