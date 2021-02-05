import imageSchema from './imageSchema';

const eventSchema = {
  title: 'events',
  version: 0,
  description: 'events',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    place: {
      type: 'object',
      properties: {
        description: {
          type: 'string'
        },
        place_id: {
          type: 'string'
        },
        terms: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              offset: { type: 'number' },
              value: { type: 'string' },
            }
          }
        },
        types: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        structured_formatting: {
          type: 'object',
          properties: {
            main_text: { type: 'string' },
            secondary_text: { type: 'string' },
          }
        }
      }
    },
    creator: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        phone: {
          type: ['string', 'null'],
        },
        gender: {
          type: ['number', 'null'],
        },
        name: {
          type: 'string',
        },
        account: {
          type: 'string',
        },
        avatar: imageSchema,
      },
    },
    users: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          status: {
            type: 'number',
            enums: [0, 1, 2],
          },
          info: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              phone: {
                type: ['string', 'null'],
              },
              gender: {
                type: ['number', 'null'],
              },
              name: {
                type: 'string',
              },
              account: {
                type: 'string',
              },
              avatar: imageSchema,
            },
          },
        },
      },
    },
    title: {
      type: 'string',
    },
    logo: imageSchema,
    publicationPlace: {
      type: 'string',
    },
    room: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    createAt: {
      type: 'string',
      format: 'date-time',
    },
    updateAt: {
      type: 'string',
      format: 'date-time',
    },
    finalReviewAt: {
      type: 'string',
      format: 'date-time',
    },
    datingAt: {
      type: 'string',
      format: 'date-time',
    },
    status: {
      type: 'number',
      enums: [0, 1, 2],
    },
    type: {
      type: 'number',
      enums: [0, 1, 2],
    },
    paymentMethod: {
      type: 'number',
      enums: [0, 1, 2, 3],
    },
    userCountMax: {
      type: 'number',
    },
    budget: {
      type: 'number',
    },
    // tags: {
    //   type: 'array',
    // },
  },
  indexes: ['id', 'updateAt', 'createAt'],
  required: [],
  encrypted: [],
};

export default eventSchema;
