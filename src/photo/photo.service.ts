import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) { }

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }
  async findById(id): Promise<Photo[]> {
    return await this.photoRepository.find(id);
  }
  async findByQuery(param): Promise<Photo[]> {
    let sql = 'select * from photo where 1=1 ';
    if (param.name) {
      sql += " and name LIKE '%" + param.name + "%' ";
    }

    return await this.photoRepository.query(sql);
  }
  insertPhoto(data) {
    const photo = new Photo();
    photo.name = data.name;
    photo.description = data.description;
    photo.filename = data.filename;
    photo.views = data.views;
    photo.isPublished = data.isPublished;
    this.photoRepository.save(photo);
  }
  deletePhoto(id) {
    this.photoRepository.remove(id);
  }
  async updatePhoto(data) {
    const updatePhoto = await this.photoRepository.findOne(data.id);
    updatePhoto.name = data.name;
    updatePhoto.description = data.description;
    updatePhoto.filename = data.filename;
    updatePhoto.isPublished = data.isPublished;
    updatePhoto.views = data.views;
    await this.photoRepository.save(updatePhoto);
  }
}
