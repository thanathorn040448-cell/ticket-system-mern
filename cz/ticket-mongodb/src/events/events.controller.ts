import { Controller, Get, Post, Put, Delete, Param, Body, } from '@nestjs/common';

import { EventsService } from './events.service';
import { Event } from './event.entity';

import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Controller('events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) { }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get("search/:query")
  searchEvents(@Param("query") query: string) {
    return this.eventsService.search(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }

}