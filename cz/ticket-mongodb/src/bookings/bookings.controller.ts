import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { BookingsService } from "./bookings.service";

@Controller("bookings")
export class BookingsController {

  constructor(private bookingsService: BookingsService) {}

  @Post()
  create(@Body() body:any){
    return this.bookingsService.create(body)
  }

  @Get("user/:email")
  getUserBookings(@Param("email") email:string){
    return this.bookingsService.findByUser(email)
  }

}