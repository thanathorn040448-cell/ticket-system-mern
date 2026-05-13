import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Booking {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userEmail: string;

  @Column()
  eventId: string;

  @Column()
  seats: string[];

  @Column()
  totalPrice: number;

  @Column()
  createdAt: Date;
}