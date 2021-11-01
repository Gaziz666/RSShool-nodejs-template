"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const getAll = async () => await (0, typeorm_1.getRepository)(user_model_1.User).find({
    select: ['name', 'login', 'password', 'id'],
});
const getOne = async (userId) => {
    const user = await (0, typeorm_1.getRepository)(user_model_1.User).findOne(userId);
    return user;
};
const create = async ({ name, password, login, }) => {
    const newUser = await (0, typeorm_1.getRepository)(user_model_1.User).create({ name, login, password });
    let savedUser = await (0, typeorm_1.getRepository)(user_model_1.User).save(newUser);
    delete savedUser['password'];
    return savedUser;
};
const updateOne = async (userId, body) => {
    const user = await (0, typeorm_1.getRepository)(user_model_1.User)
        .createQueryBuilder()
        .update(user_model_1.User)
        .set(body)
        .where('"User"."id" = :id', { id: userId })
        .returning('*')
        .execute()
        .then((response) => {
        return response.raw[0];
    });
    return user;
};
const deleteOne = async (userId) => {
    const result = await (0, typeorm_1.getRepository)(user_model_1.User).delete({ id: userId });
    return result;
};
const usersRepo = { getAll, getOne, create, updateOne, deleteOne };
exports.usersRepo = usersRepo;
