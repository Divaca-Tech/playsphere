const swaggerDefinitions = {
  "/user/register": {
    post: {
      tags: ["Auth"],
      summary: "Create a new user",
      description: `|
          This endpoint allows you to create a new user account.
          To create a user, you must provide the following information: |
          
          - email: The email address of the user. This field is required.
          - password: The password for the user account. This field is required.
          - name: The name for the user account. This field is required.
          
          Upon successful creation, the endpoint returns a response with status code 201 (Created).`,
      requestBody: {
        description: "User object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                phoneNumber: { type: "string" },
              },
              required: ["name", "email", "password"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
        },
      },
    },
  },

  "/user/signin": {
    post: {
      tags: ["Auth"],
      summary: "Login user",
      description: `| 
            This endpoint allows users to log in to their accounts.
            To authenticate, users must provide their email and password. |

            - email: The email address of the user. This field is required.
            - password: The password for the user account. This field is required.

            Upon successful authentication, the endpoint returns a response with status code 200 (OK) along with an authentication token.

            Note: The authentication token should be included in the headers of subsequent requests to authenticate the user.

              `,
      requestBody: {
        description: "User object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User Login successfully",
        },
      },
    },
  },

  "/user/request-otp": {
    post: {
      tags: ["Auth"],
      summary: "Request OTP",
      description: `| 
            This endpoint allows users to request a one-time password (OTP) for authentication purposes.
            Users must provide their email address to receive the OTP.
            Upon successful request, the OTP is sent to the provided email address. |
            
            - email: The email address of the user. This field is required.

            Note: The OTP expires after a certain period and can only be used once for authentication.
          `,
      requestBody: {
        description: "OTP object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
              },
              required: ["email"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "OTP sent successfully",
        },
      },
    },
  },

  "/user/confirm-otp": {
    post: {
      tags: ["Auth"],
      summary: "Confirm OTP",
      description: `|
            This endpoint allows users to confirm the one-time password (OTP) they received for authentication purposes.
            Users must provide the OTP they received via email. |
    
            Upon successful confirmation, the user's authentication is validated and they can proceed with their desired action.
    
            Note: The OTP expires after a certain period and can only be used once for authentication.
          `,
      requestBody: {
        description: "OTP object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                OTP: { type: "string" },
                email: { type: "string" },
              },
              required: ["email", "OTP"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "OTP confirmed successfully",
        },
      },
    },
  },

  "/user/request-password-reset": {
    patch: {
      tags: ["Auth"],
      summary: "Request password reset",
      description: `|
            This endpoint allows users to request a password reset by providing their email address.
            Upon successful request, a password reset OTP will be sent to the provided email address. |

            Note: The password reset OTP is valid for a limited time period and can only be used once.
          `,
      requestBody: {
        description: "Password object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
              },
              required: ["email"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "password reset pin sent",
        },
      },
    },
  },

  "/user/confirm-password-reset": {
    post: {
      tags: ["Auth"],
      summary: "Confirm request password",
      description: `| 
            This endpoint allows users to confirm a password reset request by providing a new password and a token received via email.
            Upon successful confirmation, the user's password will be updated to the new password. |
    
            Note: The password reset token expires after a certain period and can only be used once.
          `,
      requestBody: {
        description: "Password object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                pin: { type: Number },
                email: { type: "string" },
                password: { type: "string" },
              },
              required: ["email", "pin", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Your password has been reset successfully",
        },
      },
    },
  },

  "/user/google-auth": {
    post: {
      tags: ["Auth"],
      summary: "Google Auth",
      description: `|
            This endpoint allows you to create a new user account with google authentication.
            To create a user, you must provide the following information: 
            if the email exist then the user is login. |
            
            - email: The email address of the user. This field is required.
            - name: The name for the user account. This field is required.
            - accessToken: The access token from google. This field is required.
            
            Upon successful creation, the endpoint returns a response with status code 201 (Created).`,
      requestBody: {
        description: "Password object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                name: { type: "string" },
                accessToken: { type: "string" },
                phoneNumber: { type: "string" },
                photoUrl: { type: "string" },
              },
              required: ["email", "name", "accessToken"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
        },
      },
    },
  },

  "/post": {
    get: {
      tags: ["Post"],
      summary: "List of Post",
      description: `|
          This endpoint allows you to retrieve list of post, you can decided to send along side the userId and postId if you want to get a particular post, This endpoint will retrieve all the post if you didn't specify these field {userId, postId}. |
          
          - userId: The Id of the user post belongs to. This field is not required.
          - postId: The Post Id, This field is not required.
          
          Upon successful, the endpoint returns a list of post.`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string" },
                postId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "All Post was fetch successfully",
        },
      },
    },
  },

  "/post/create": {
    post: {
      tags: ["Post"],
      summary: "Create Post",
      description: `|
          This endpoint allows you to Create a post, you can send along side the post attachment if it is included,  it can be a single or multiple files. |
          
          - file: The Post File Attachment, can be a List of files. This field is required.
          - content: The Post content, string required.
          - userId: The user Id, string required.

          Note: Form must be of type 'multipart/form-data'.
          
          Upon successful uploads, the endpoint returns a response with status code 200 (OK).`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                file: { type: "image" },
                content: { type: "string" },
                userId: { type: "string" },
              },
              required: ["content"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Post was created successfully",
        },
      },
    },
  },

  "/post/update": {
    put: {
      tags: ["Post"],
      summary: "Update Post",
      description: `|
          This endpoint allows you to update a post |
          
          - content: The Post content to be updated, This field is required.
          - userId: The Id of the user post belongs to. This field is required.
          - postId: The Post Id, This field is required.
          
          Upon successful, the endpoint returns 200.`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: { type: "string" },
                userId: { type: "string" },
                postId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Post was updated successfully",
        },
      },
    },
  },

  "/post/delete": {
    delete: {
      tags: ["Post"],
      summary: "Delete Post",
      description: `|
          This endpoint allows you to Delete a post |
          
          - userId: The Id of the user post belongs to. This field is required.
          - postId: The Post Id, This field is required.
          
          Upon successful, the endpoint returns no content.`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string" },
                postId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Post was deleted successfully",
        },
      },
    },
  },

  "/post/attachment": {
    get: {
      tags: ["Post"],
      summary: "List of Post Attachment",
      description: `|
          This endpoint allows you to retrieve list of attachment, you can decided to send along side the userId and postId if you want to get a particular post attachment, This endpoint will retrieve all the post attachment if you didn't specify these field {userId, postId}. |
          
          - userId: The Id of the user post belongs to. This field is not required.
          - postId: The Post Id, This field is not required.
          
          Upon successful, the endpoint returns a list of post attachment.`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string" },
                postId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "All Post Attachment was fetch successfully",
        },
      },
    },
  },
  "/user/comment": {
    post: {
      tags: ["Post"],
      summary: "Endpoint for adding comments to a post",
      description: `|
          This endpoint allows you to add comment to a post as well as attach images, video or any other file to the comment |      
         This endpoint takes all the values in a form data (postId, content, file) are placed in form data. More than one and type of file can be attached to the form data
          Upon successful, the endpoint returns the comment content and thelink to the file attached to it if there is any.`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                postId: { type: "string" },
                content: { type: "string" },
                file: { type: "image/video/jpeg" },
              },
              headers: {
                Authorization: "Bearer " + "token",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "comment successfully",
        },
      },
    },
  },
  "/user/delete-comment/:commentId": {
    delete: {
      tags: ["Delete"],
      summary: "Endpoint fordeleting comment",
      description: `|
          This endpoint allows user to delete a specific comment. Comment can either be deleted by the post owner or by the person that wrote the comment only |`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                commentId: { type: "integer" },
              },
              headers: {
                Authorization: "Bearer " + "token",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Comment deleted successfully",
        },
      },
    },
  },
  "/user/update-comment": {
    patch: {
      tags: ["patch"],
      summary: "Endpoint for updating comment",
      description: `|
          This endpoint allows user to update a specific comment`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                commentId: { type: "integer" },
                content: { type: "string" },
              },
              headers: {
                Authorization: "Bearer " + "token",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Comment deleted successfully",
        },
      },
    },
  },

  "/user/reply-comment": {
    post: {
      tags: ["Post"],
      summary: "Endpoint for replying a comment",
      description: `|
          This endpoint allows you to reply comment as attach images, video or any other file to the comment |
                   the content, commentId and file are in form data. the file can be ignore or left empty and content can be add
          Upon successful, the endpoint returns the reply content and the link to the file attached to it if there is any.`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                commentId: { type: "integer" },
                content: { type: "string" },
                file: { type: "image/video/jpeg" },
              },

              headers: {
                Authorization: "Bearer " + "token",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "comment successfully",
        },
      },
    },
  },

  "/user/like-reply": {
    post: {
      tags: ["post"],
      summary: "Endpoint liking and unliking a reply to a comment",
      description: `|
          This endpoint allows user to like and unlike a specific reply`,
      requestBody: {
        description: "Post object",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                replyId: { type: "integer" },
              },
              headers: {
                Authorization: "Bearer " + "token",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Comment deleted successfully",
        },
      },
    },
  },
};

//           Note: Form must be of type 'multipart/form-data'.

//           Upon successful comment, the endpoint returns a response with status code 200 (OK).`,
//       requestBody: {
//         description: "Password object",
//         required: true,
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 file: { type: "image/.mp4/mp3" },
//                 content: "",
//                 postId: "",
//               },
//               headers: {
//                 Authorization: { bearer: "string" },
//               },
//               required: ["content", "postId"],
//             },
//           },
//         },
//       },
//       responses: {
//         200: {
//           description: "comment successful",
//         },
//       },
//     },
//   },
// };

module.exports = swaggerDefinitions;
