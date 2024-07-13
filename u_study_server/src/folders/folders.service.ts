import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FoldersService {
  constructor(private databaseService: DatabaseService) {}
  async create(createFolderDto: CreateFolderDto) {
    try {
      const createdFolder = await this.databaseService.folders.create({
        data: {
          ...createFolderDto,
        },
      });
      return createdFolder;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll(uuid: string, parentFolderId: number | null) {
    return this.databaseService.folders.findMany({
      where: {
        uuid: uuid,
        parentFolderId: parentFolderId,
      },
      include: {
        children: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
