import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { NoteService } from './note.service';
import { UserService } from '../User/user.service';
// guards
import { GqlAuthGuard } from '../Auth/graphql-auth.guard';
// decorators
import { User } from '../Auth/graphql-user-context.decorator';
@Resolver('Note')
export class NoteResolver {
  constructor(
    private readonly noteService: NoteService,
    private readonly userService: UserService,
  ) {}
  @Query()
  async cat(@Args('id') id: string) {
    return await this.noteService.findOne({ _id: id });
  }
  @Query('notes')
  async cats() {
    return await this.noteService.findAll();
  }
  @ResolveProperty('owner')
  async owner(@Parent() cat) {
    return await this.userService.findOne({ _id: cat.owner });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createNote')
  async createNote(@Args() cat, @User() user) {
    return await this.noteService.create({ ...cat, owner: user._id });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('updateNote')
  async updateNote(@Args() cat) {
    const { id, ...rest } = cat;
    return await this.noteService.update({ _id: id }, rest);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('deleteNote')
  async deleteNote(@Args('id') id) {
    return await this.noteService.delete({ _id: id });
  }
}
