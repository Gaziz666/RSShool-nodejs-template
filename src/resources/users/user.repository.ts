import { getRepository } from 'typeorm';
import { User } from './user.model';

const getAll = async (): Promise<User[]> =>
  await getRepository(User).find({
    select: ['name', 'login', 'password', 'id'],
  });

const getOne = async (userId: string): Promise<User | undefined> => {
  const user = await getRepository(User).findOne(userId);
  return user;
};

const create = async ({
  name,
  password,
  login,
}: Partial<User>): Promise<Partial<User>> => {
  const newUser = await getRepository(User).create({ name, login, password });
  let savedUser = await getRepository(User).save(newUser);
  delete savedUser['password'];
  return savedUser;
};

const updateOne = async (
  userId: string,
  body: Partial<User>
): Promise<User> => {
  const user = await getRepository(User)
    .createQueryBuilder()
    .update(User)
    .set(body)
    .where('"User"."id" = :id', { id: userId })
    .returning('*')
    .execute()
    .then((response) => {
      return response.raw[0];
    });
  return user;
};

const deleteOne = async (userId: string): Promise<number> => {
  const result = await getRepository(User).delete({ id: userId });

  return result.affected as number;
};

const usersRepo = { getAll, getOne, create, updateOne, deleteOne };
export { usersRepo };
