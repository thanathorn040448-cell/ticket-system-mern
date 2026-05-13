import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('event')
export class Event {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column()
  eventname!: string  // เพิ่ม !

  @Column()
  images!: string     // เพิ่ม !

  @Column()
  artist!: string     // เพิ่ม !

  @Column()
  location!: string   // เพิ่ม !

  @Column()
  date!: Date         // เพิ่ม !
}