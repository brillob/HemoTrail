import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random'

export const Glucose = new Meteor.Collection('Glucose');

import { Users } from '../collections/Users.js';

Glucose.allow({
        insert: function(){
                return true;
        },
        update: function () {
                return true;
        },
        remove: function () {
                return true;
        }
});

var _this = this;

GlucoseSchema = new SimpleSchema({
        
        UniqueRecordId:{
                type:String,
                label:"UniqueRecordId",
                autoValue: function(){
                        return Random.id(6);
                }
        },
        UserRecordId:{
                type:String,
                label:"UserRecordId"
        },
        GlucoseValue:{
                type:Number,
                label:"GlucoseValue"
        },
        CategoryId:{
                type:Number,
                label:"CategoryId",
                optional: true
        },
        Date:{
                type:Date,
                label:"Date",
                optional: true
        },
        Time:{
                type:String,
                label:"Time",
                optional: true
        },
        Notes:{
                type:String,
                label:"Notes",
                optional: true
        },
        Tags:{
                type:String,
                label:"Tags",
                optional: true
        },
        CreatedAt:{
                type:Date,
                label:"Created",
                autoValue:function(){
                        return new Date;
                }
        }
});

Glucose.attachSchema( GlucoseSchema );