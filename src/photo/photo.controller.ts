import { Controller, Get, Post, Body, Delete, Put, Param, Query, UsePipes, Header } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { ValidationPipe } from './photo.pipes';
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll(@Query() query): Promise<Photo[]> {
    return this.photoService.findAll();
  }
  @Get(':id')
  findName(@Param() params) {
    return this.photoService.findById(params.id);
  }
  @Post()
  @UsePipes(ValidationPipe)
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
