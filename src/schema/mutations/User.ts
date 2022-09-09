import { GraphQLID, GraphQLString } from "graphql";
import { resolve } from "path";
import { Users } from "../entities/User";
import { messageType } from "../typedefs/Message";
import { userType } from "../typedefs/User";

export const create_user = {
    type    : messageType,
    args    : {        
        name        : {type: GraphQLString},
        username    : {type: GraphQLString},
        password    : {type: GraphQLString}
    },
    resolve(parent : any, args : any){
        // const {name, username, password} = args;
        // Users.insert({name, username, password});
        // return {successful:true, message: "User Created Successfully"};
    }
}

export const delete_user = {
    type    : messageType,
    args    : {
        id : { type : GraphQLID }
    },
    async resolve(parent : any, args : any){
       const id = args.id;
       const userdelete = await Users.delete({id:id});
       if(userdelete){
            return {successful:true, message: "Deleted Successfully"};
       }else{
            return {successful:false, message: "Record not found!"};
       }
    }
    
}

export const update_user = {
    type    : messageType,
    args    : {
        username    : {type : GraphQLString},
        oldpassword : {type : GraphQLString},
        newpassword : {type : GraphQLString}
    },
    async resolve(parent: any, args : any){
        // const {username, oldpassword, newpassword} = args;
        // const user = await Users.findOne({username: username});
        // const userPassword = user?.password;

        // if(!user){
        //     return {successful:false, message: "Username not found!"};
        // }

        // if(oldpassword === userPassword){
        //     const passupdate = await Users.update({username:username}, {password:newpassword});
        //     if(passupdate){
        //         return {successful:true, message: "Password Update Successfully!"};
        //     }
        // }else{
        //     return {successful:false, message: "Current Password is not match!"};         
        // }
    }
}