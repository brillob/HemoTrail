import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random'

export const Category = new Meteor.Collection('Category');


Category.allow({
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

CategorySchema = new SimpleSchema({
        
        UniqueRecordId:{
                type:Number,
                label:"UniqueRecordId"
        },
        Name:{
                type:String,
                label:"Name"
        },
        StartTime:{
                type:String,
                label:"StartTime",
                optional: true
        },
        EndTime:{
                type:String,
                label:"EndTime",
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

Category.attachSchema( CategorySchema );
