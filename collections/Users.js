import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random';

export const Users = new Meteor.Collection('Users');

Users.allow({
        insert: function () {
                return true;
        },
        update: function () {
                return true;
        },
        remove: function () {
                return true;
        }
});

UserSchema = new SimpleSchema({

        UniqueRecordId: {
                type: String,
                label: "UniqueRecordId",
                autoValue: function () {
                        if (this.isInsert) {
                                return Random.id(6);
                        }
                        else {
                                this.unset();
                        }
                }
        },
        Username: {
                type: String,
                label: "Username"
        },
        Password: {
                type: String,
                label: "Password"
        },
        Email: {
                type: String,
                label: "Email"
        },
        TimeZone: {
                type: String,
                label: "TimeZone"
        },
        FirstName: {
                type: String,
                label: "FirstName",
                optional: true
        },
        LastName: {
                type: String,
                label: "LastName",
                optional: true
        },
        ShareCode: {
                type: Number,
                label: "ShareCode",
                optional: true
        },
        GlucoseUnit: {
                type: String,
                label: "GlucoseUnit"
        },
        GlucoseDefaultCategoryId: {
                type: Number,
                label: "GlucoseDefaultCategoryId",
                optional: true
        },
        GlucoseLowValue: {
                type: Number,
                label: "GlucoseLowValue",
                optional: true
        },
        GlucoseHighValue: {
                type: Number,
                label: "GlucoseHighValue",
                optional: true
        },
        GlucoseTargetMin: {
                type: Number,
                label: "GlucoseTargetMin",
                optional: true
        },
        GlucoseTargetMax: {
                type: Number,
                label: "GlucoseTargetMax",
                optional: true
        },
        CreatedAt: {
                type: Date,
                label: "Created",
                autoValue: function () {
                        return new Date;
                }
        }
});


Users.attachSchema(UserSchema);