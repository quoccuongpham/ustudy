import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotesService {
  constructor(private databaseService: DatabaseService) {}
  async create(createNoteDto: CreateNoteDto) {
    try {
      if (createNoteDto.courseId) {
        const folder = await this.databaseService.folders.findFirst({
          where: {
            courseId: createNoteDto.courseId,
            uuid: createNoteDto.uuid,
          },
        });
        if (folder) {
          delete createNoteDto.courseId;
          // create note
          const noteCreated = await this.databaseService.notes.create({
            data: {
              ...createNoteDto,
              folderId: folder.id,
            },
          });
          return noteCreated;
        }
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async findAll(uuid: string, parentFolderId: number | null) {
    try {
      if (!parentFolderId) {
        return this.databaseService.notes.findMany({
          where: {
            uuid: uuid,
          },
          include: {
            video: {
              select: {
                title: true,
                chapter: {
                  select: {
                    course: {
                      select: {
                        title: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }
      const notes = await this.databaseService.notes.findMany({
        where: {
          uuid: uuid,
          folderId: parentFolderId,
        },
      });

      return notes;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findOneByVideoId(videoId: number, uuid: string) {
    try {
      const notes = await this.databaseService.notes.findMany({
        where: {
          uuid: uuid,
          videoId: videoId,
        },
      });
      return notes;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllByCourse(uuid: string) {
    try {
      const noteGroupByCourse = await this.databaseService.enrollment.findMany({
        where: {
          uuid: uuid,
          course: {
            chapters: {
              some: {
                videos: {
                  some: {
                    notes: {
                      some: {},
                    },
                  },
                },
              },
            },
          },
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              chapters: {
                select: {
                  id: true,
                  title: true,
                  videos: {
                    include: {
                      notes: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return noteGroupByCourse;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number, uuid: string) {
    try {
      const data = await this.databaseService.notes.findUnique({
        where: {
          id: id,
          uuid: uuid,
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //update note
  async update(id: number, updateNoteDto: UpdateNoteDto) {
    try {
      const noteUpdated = await this.databaseService.notes.update({
        where: {
          id: id,
        },
        data: {
          ...updateNoteDto,
        },
      });

      return noteUpdated;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //delete note using id
  async remove(id: number) {
    try {
      const noteDeleted = await this.databaseService.notes.delete({
        where: {
          id: id,
        },
      });
      return noteDeleted;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
