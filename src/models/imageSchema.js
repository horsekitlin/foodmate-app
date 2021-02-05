const imageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    deletehash: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
  },
}

export default imageSchema;