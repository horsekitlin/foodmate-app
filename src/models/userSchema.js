import imageSchema from './imageSchema';

const userSchema = {
  version: 0,
  title: 'human schema no compression',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    account: {
      type: 'string',
    },
    avatar: imageSchema,
  },
  indexes: [
    'id',
  ],
};

export default userSchema;
