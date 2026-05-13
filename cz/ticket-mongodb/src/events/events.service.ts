import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';


@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private eventsRepository: MongoRepository<Event>,
  ) { }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: string): Promise<Event> {

    const event = await this.eventsRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {

    const event = this.eventsRepository.create(dto);
    return this.eventsRepository.save(event);

  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {

    const result = await this.eventsRepository.update(
      { _id: new ObjectId(id) },
      dto
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const updated = await this.eventsRepository.findOneBy({
      _id: new ObjectId(id),
    });

    return updated!;
  }

  async remove(id: string): Promise<void> {

    const result = await this.eventsRepository.delete({
      _id: new ObjectId(id),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

  }

  async search(query: string) {

    return this.eventsRepository.find({
      where: {
        eventname: new RegExp(query, "i")
      },
      order: { eventname: "ASC" },
      take: 5
    })

  }

}



