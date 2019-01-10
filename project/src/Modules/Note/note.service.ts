import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { Note } from './Interfaces/note.interface';

@Injectable()
export class NoteService {
  constructor(
    @Inject('NoteModelToken')
    private readonly noteModel: Model<Note>,
  ) {}

  async create(note: {}): Promise<Note> {
    const createdNote = new this.noteModel(note);
    return await createdNote.save();
  }
  async update(conditions: {}, update: {}): Promise<Note> {
    return await this.noteModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async delete(conditions: {}) {
    return await this.noteModel.findOneAndRemove(conditions);
  }
  async deleteMany(conditions: {}) {
    return await this.noteModel.deleteMany(conditions);
  }
  async findOne(conditions: {}): Promise<Note> {
    return this.noteModel.findOne(conditions);
  }
  async findAll(): Promise<Note[]> {
    return await this.noteModel.find().exec();
  }
}
