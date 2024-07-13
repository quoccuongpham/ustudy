import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionService {
  constructor(private databaseService: DatabaseService) {}

  async create() {
    //
  }

  async findAll() {
    return this.databaseService.transaction.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByUser(uuid: string) {
    return this.databaseService.transaction.findMany({
      where: {
        user: {
          uuid,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
  async withdraw(data: { uuid: string }) {
    try {
      // get balance
      const { balance } = await this.databaseService.user.findUnique({
        where: {
          uuid: data.uuid,
        },
      });

      if (balance <= 0) {
        throw new Error('Your balance is not enough to withdraw');
      }
      // save data transaction
      const transactionData = await this.databaseService.transaction.create({
        data: {
          amount: balance,
          type: 'WITHDRAWAL',
          status: 'PENDING',
          user: {
            connect: {
              uuid: data.uuid,
            },
          },
        },
      });
      // update balance user
      await this.databaseService.user.update({
        where: {
          uuid: data.uuid,
        },
        data: {
          balance: balance - transactionData.amount,
        },
      });
      return {
        transactionData,
        balance: balance - transactionData.amount,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: number,
    updateTransactionDto: Prisma.TransactionUpdateInput,
  ) {
    try {
      const transactionUpdate = await this.databaseService.transaction.update({
        where: { id },
        data: updateTransactionDto,
      });
      return transactionUpdate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
