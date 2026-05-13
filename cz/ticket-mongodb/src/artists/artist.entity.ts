import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Artist {

  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  name: string

  @Column()
  image: string

}