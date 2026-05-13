import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Booking } from "./booking.entity";
import { ObjectId } from "mongodb"
import { Repository } from "typeorm"
import { Event } from "../events/event.entity"

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(Booking)
        private bookingRepository: MongoRepository<Booking>,


        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) { }

    async create(data: any) {

        const booking = this.bookingRepository.create({
            ...data,
            createdAt: new Date()
        })

        return this.bookingRepository.save(booking)

    }

    async findByUser(email: string) {

        const bookings = await this.bookingRepository.find({
            where: { userEmail: email }

        })
        bookings.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )

        const result = await Promise.all(

            bookings.map(async booking => {

                

                const event = await this.eventRepository.findOne({
                    where: { _id: new ObjectId(booking.eventId) }
                })

                return {
                    id: booking._id,
                    seats: booking.seats,
                    totalPrice: booking.totalPrice,
                    createdAt: booking.createdAt,

                    eventName: event?.eventname,
                    artist: event?.artist,
                    location: event?.location,
                    eventDate: event?.date,
                    image: event?.images
                }

            })

        )

        return result
    }
}