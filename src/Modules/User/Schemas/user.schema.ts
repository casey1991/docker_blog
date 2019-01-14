import * as mongoose from 'mongoose';
const { SchemaTypes } = mongoose;
export const UserSchema = new mongoose.Schema({
  email: { type: SchemaTypes.String, required: true },
  password: { type: SchemaTypes.String, required: true },
  avatars: [SchemaTypes.ObjectId],
});
// about access right
// 角色权限，使用8bit表示法
// eg:0000 0000
// 0000 0000 low level: for client roles
// 0000 0000
// 0000 0001
// --------
// 1000 0000 high level: for admin roles
// 1000 0001
// 1000 0010
// --------
// 文档访问权限 用2bit表示法
// eg: 0 0(also high low level)
// 0 0 表示无法访问
// 1 0 表示readable
// 1 1 表示writeable
