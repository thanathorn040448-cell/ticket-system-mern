import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity('user')
export class User {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

}