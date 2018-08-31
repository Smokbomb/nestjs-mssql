import { Controller, Get, Post, Body, Delete, Put, Param} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Get()
  findAll(@Body() param: any ): Promise<Photo[]> {
    return this.photoService.findAll();
  }
  @Get(':id')
  findName(@Param() params) {
    return this.photoService.findById(params.id);
  }
  @Post()
  savePhoto(@Body() photo: any) {
    if (photo.id) {
      this.photoService.updatePhoto(photo);
    } else {
      this.photoService.insertPhoto(photo);
    }
  }

  @Delete()
  deletePhoto(@Body() id: number) {
    this.photoService.deletePhoto(id);
  }

}
