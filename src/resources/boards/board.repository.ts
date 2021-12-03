import { Columns } from './../columns/column.model';
import { getConnection, getRepository } from 'typeorm';
import { Board } from './board.model';

const getAll = async () =>
  await getRepository(Board).find({
    relations: ['columns'],
  });

const getOne = async (boardId: string) => {
  const board = await getRepository(Board).findOne(boardId, {
    relations: ['columns'],
  });
  return board;
};

const create = async ({ title, columns }: Partial<Board>) => {
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const newBoard = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Board)
      .values({ title })
      .execute()
      .then((result) => result.raw[0]);
    const column = columns!.map((item) => {
      item.board = newBoard.id;
      return item;
    });
    const newColumn = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Columns)
      .values(column)
      .execute();

    await queryRunner.commitTransaction();
    newBoard.columns = newColumn.raw;
    return newBoard;
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const updateOne = async (boardId: string, body: Partial<Board>) => {
  const updatedBoard = getRepository(Board)
    .createQueryBuilder()
    .update()
    .set({ title: body.title })
    .where('id = :id', { id: boardId })
    .returning('*')
    .execute()
    .then((response) => response.raw[0]);
  return updatedBoard;
};

const deleteOne = async (boardId: string) => {
  const result = await getRepository(Board).delete({ id: boardId });
  return result;
};

const boardsRepo = { getAll, getOne, create, updateOne, deleteOne };
export { boardsRepo };
