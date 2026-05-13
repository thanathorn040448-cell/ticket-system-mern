import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MongoRepository } from "typeorm"
import { Artist } from "./artist.entity"

@Injectable()
export class ArtistsService {

  constructor(
    @InjectRepository(Artist)
    private artistRepository: MongoRepository<Artist>
  ) {}

  async findAll() {
    return this.artistRepository.find()
  }

}