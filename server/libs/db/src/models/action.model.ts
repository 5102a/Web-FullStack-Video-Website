import { prop, modelOptions, Ref} from '@typegoose/typegoose';
import { Course } from './course.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions:{
    timestamps:true
  }
})
export class Episode{
  @prop({ref:'User'})
  user:Ref<User>

  @prop({refPath:'type'})
  object:Ref<Course|Episode>

  @prop({enum:['like','upVote']})
  name:string
  
}