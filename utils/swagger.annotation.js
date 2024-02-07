const swaggerDefinitions = {
    '/user/register': {
      post: {
        tags: ['Auth'],
        summary: 'Create a new user',
        description: 'Create a new user.',
        requestBody: {
          description: 'User object',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  phoneNumber: { type: 'string' },
                },
                required: ['name', 'email', 'password'] 
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully'
          }
        }
      }
    },

    '/user/signin': {
        post: {
          tags: ['Auth'], 
          summary: 'Login user',
          description: 'Login user.',
          requestBody: {
            description: 'User object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                  required: ['email', 'password'] 
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'User Login successfully'
            }
          }
        }
    },

    '/user/request-otp': {
        post: {
          tags: ['Auth'], 
          summary: 'Request OTP',
          description: 'request otp',
          requestBody: {
            description: 'OTP object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                  },
                  required: ['email'] 
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'OTP sent successfully'
            }
          }
        }
    },

    '/user/confirm-otp': {
        post: {
          tags: ['Auth'], 
          summary: 'Confirm OTP',
          description: 'confirm otp',
          requestBody: {
            description: 'OTP object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    OTP: { type: 'string' },
                    email: { type: 'string' },
                  },
                  required: ['email', 'OTP'] 
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'OTP confirmed successfully'
            }
          }
        }
    },

    '/user/request-password-reset': {
        patch: {
          tags: ['Auth'], 
          summary: 'Request password reset',
          description: 'request password reset',
          requestBody: {
            description: 'Password object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                  },
                  required: ['email'] 
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'password reset pin sent'
            }
          }
        }
    },
    
    '/user/confirm-password-reset': {
        post: {
          tags: ['Auth'], 
          summary: 'Confirm request password',
          description: 'confirm request password',
          requestBody: {
            description: 'Password object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    pin: { type: Number },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                  required: ['email', "pin", "password"] 
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Your password has been reset successfully'
            }
          }
        }
    },

    '/user/google-auth': {
        post: {
          tags: ['Auth'], 
          summary: 'Google Auth',
          description: 'This endpoint create a new user, if user exist already, it login the user',
          requestBody: {
            description: 'Password object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: "string" },
                    name: { type: "string" },
                    accessToken: { type: "string" },
                    phoneNumber: { type: "string" },
                    photoUrl: { type: "string" },
                  },
                  required: ['email', "name", "accessToken"] 
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'User created successfully'
            }
          }
        }
    },
    

};
  
module.exports = swaggerDefinitions;