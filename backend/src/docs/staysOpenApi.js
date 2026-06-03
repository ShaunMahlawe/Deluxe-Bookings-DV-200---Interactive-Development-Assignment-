function buildStaysOpenApi(baseUrl) {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Deluxe Stays API',
      description:
        'Primary in-house stays API for Deluxe Bookings. Google Places is used as fallback when Deluxe data is unavailable.',
      version: '1.0.0',
    },
    servers: [
      {
        url: String(baseUrl || 'http://localhost:5001'),
      },
    ],
    tags: [
      {
        name: 'Stays',
        description: 'Property search and listing resources',
      },
      {
        name: 'Areas',
        description: 'Area summaries and totals',
      },
      {
        name: 'Things To Do',
        description: 'Activities by destination area',
      },
    ],
    paths: {
      '/api/stays': {
        get: {
          tags: ['Stays'],
          summary: 'Get stays',
          description: 'Returns curated stays from Deluxe API first, then Google fallback.',
          parameters: [
            {
              in: 'query',
              name: 'area',
              schema: { type: 'string' },
              description: 'Area or city, for example Cape Town.',
            },
            {
              in: 'query',
              name: 'category',
              schema: { type: 'string' },
              description: 'Property category filter.',
            },
            {
              in: 'query',
              name: 'setting',
              schema: { type: 'string', enum: ['coastal', 'inland'] },
              description: 'Setting filter.',
            },
            {
              in: 'query',
              name: 'sort',
              schema: { type: 'string', enum: ['top', 'price-low', 'price-high', 'rating', 'likes'] },
              description: 'Sort mode.',
            },
            {
              in: 'query',
              name: 'limit',
              schema: { type: 'integer', default: 60, minimum: 0 },
              description: 'Maximum number of properties to return.',
            },
            {
              in: 'query',
              name: 'offset',
              schema: { type: 'integer', default: 0, minimum: 0 },
              description: 'Pagination offset.',
            },
            {
              in: 'query',
              name: 'minReviewScore',
              schema: { type: 'number', default: 8, minimum: 0, maximum: 10 },
              description: 'Minimum review score.',
            },
          ],
          responses: {
            200: {
              description: 'Stays result set',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/StaysResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stays/areas': {
        get: {
          tags: ['Areas'],
          summary: 'Get area totals',
          parameters: [
            {
              in: 'query',
              name: 'minReviewScore',
              schema: { type: 'number', default: 8, minimum: 0, maximum: 10 },
              description: 'Minimum review score.',
            },
          ],
          responses: {
            200: {
              description: 'Area counts',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AreasResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stays/things-to-do': {
        get: {
          tags: ['Things To Do'],
          summary: 'Get things to do in an area',
          parameters: [
            {
              in: 'query',
              name: 'area',
              schema: { type: 'string' },
              description: 'Area or city.',
            },
          ],
          responses: {
            200: {
              description: 'Things-to-do cards',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ThingsToDoResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stays/openapi.json': {
        get: {
          tags: ['Stays'],
          summary: 'Get OpenAPI JSON document',
          responses: {
            200: {
              description: 'OpenAPI document',
            },
          },
        },
      },
      '/api/stays/docs': {
        get: {
          tags: ['Stays'],
          summary: 'Swagger UI documentation',
          responses: {
            200: {
              description: 'Swagger UI HTML page',
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Property: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            category: { type: 'string' },
            area: { type: 'string' },
            city: { type: 'string' },
            province: { type: 'string' },
            settingType: { type: 'string' },
            price: { type: 'string' },
            priceValue: { type: 'number' },
            reviewScore: { type: 'number' },
            reviewSummary: { type: 'string' },
            reviewCount: { type: 'number' },
            imageUrl: { type: 'string' },
            sourceTag: { type: 'string' },
          },
          additionalProperties: true,
        },
        StaysResponse: {
          type: 'object',
          properties: {
            source: { type: 'string', example: 'deluxe-api' },
            count: { type: 'integer' },
            offset: { type: 'integer' },
            limit: { type: 'integer' },
            properties: {
              type: 'array',
              items: { $ref: '#/components/schemas/Property' },
            },
          },
          required: ['source', 'count', 'offset', 'limit', 'properties'],
        },
        AreaItem: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            province: { type: 'string' },
            setting: { type: 'string' },
            count: { type: 'integer' },
          },
          required: ['city', 'province', 'setting', 'count'],
        },
        AreasResponse: {
          type: 'object',
          properties: {
            source: { type: 'string', example: 'deluxe-api' },
            total: { type: 'integer' },
            areas: {
              type: 'array',
              items: { $ref: '#/components/schemas/AreaItem' },
            },
          },
          required: ['source', 'total', 'areas'],
        },
        ThingsToDoCard: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            dates: { type: 'string' },
            count: { type: 'string' },
            rating: { type: 'number' },
            imageUrl: { type: 'string' },
          },
          additionalProperties: true,
        },
        ThingsToDoResponse: {
          type: 'object',
          properties: {
            source: { type: 'string', example: 'deluxe-api' },
            area: { type: 'string' },
            thingsToDo: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                cards: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ThingsToDoCard' },
                },
              },
              additionalProperties: true,
            },
          },
          required: ['source', 'area', 'thingsToDo'],
        },
      },
    },
  };
}

module.exports = {
  buildStaysOpenApi,
};
