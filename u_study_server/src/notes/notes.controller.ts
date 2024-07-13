import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    return this.notesService.create({
      ...createNoteDto,
      uuid: req.user['uuid'],
    });
  }

  @Get()
  findAll(@Req() req, @Query('parentFolderId') parentFolderId: string) {
    return this.notesService.findAll(req.user['uuid'], +parentFolderId);
  }
  @Get('/video/:videoId')
  findOneByVideoId(
    @Param('videoId', ParseIntPipe) videoId: number,
    @Req() req,
  ) {
    return this.notesService.findOneByVideoId(videoId, req.user['uuid']);
  }

  @Get('/course')
  findAllByCourse(@Req() req: Request & { user: { uuid: string } }) {
    return this.notesService.findAllByCourse(req.user['uuid']);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.notesService.findOne(+id, req.user['uuid']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
