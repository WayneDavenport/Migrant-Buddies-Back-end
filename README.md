To start server:
1. Clone the repo to your local machine
2. cd project-directory
3. npm install
4. Insert the mongo db string in config.env
5. npm start

API documentation:
Models: userModel, buddyModel, fieldModel, messageModel

1. User signup
POST: /api/users/signup
Request body: 
{
  email: string,
  name: string,
  password: string,
  passwordConfirm: string
}

Response:
{
    status: string,
    token: string,
    data: user {
        name: string,
        email: string,
        role: string,
        student: boolean,
        id: string,
        profileApproved: boolean
    }
}


2. User login
POST: /api/users/login
Request body: {
  email: string,
  password: string
}

Response:
{
    status: string,
    token: string,
    data: user {
        name: string,
        email: string,
        role: string,
        student: boolean,
        id: string,
        profileApproved: boolean
    }
}

3. Buddy signup
POST: /api/buddies/signup
Request body: 
{
  email: string,
  name: string,
  password: string,
  passwordConfirm: string
}

Response:
{
    status: string,
    token: string,
    data: buddy {
        name: string,
        email: string,
        role: string,
        student: boolean,
        id: string,
        profileApproved: boolean
    }
}

4. Buddy login
POST: /api/buddies/login
Request body: {
  email: string,
  password: string
}

Response:
{
    status: string,
    token: string,
    data: buddy {
        name: string,
        email: string,
        role: string,
        student: boolean,
        id: string,
        profileApproved: boolean
    }
}

5. Create user profile (must be a user)
PATCH: /api/users/profile
 headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    }

Request body: {
    name: string,
    location: string,
    age: number,
    fields: fieldId[],
    about: string,
    primaryEducation: string,
    secondaryEducation: string,
    vocationalEducation: string
}

Response: {
    status: string
    data: {
        userId: string
    }
}

6. Create buddy profile (must be a buddy)
PATCH: /api/buddies/profile
Request body: {
    name: string,
    location: string,
    age: number,
    fields: fieldId[],
    about: string,
}
Response: {
    status: string
    data: {
        buddyId: string
    }
}

7. Approve profile of user (must be an admin)
8. Approve profile of buddy (must be an admin)
9. Get me (must be logged in)
10. Get buddies list (must be a user or admin)
11. Get buddy profile by id (must be a user or admin)
12. Upload image of user (must be a user or admin)
13. Upload image of buddy (must be a buddy or admin)
14. Get users list (must be an admin)
15. Update buddy profile (must be a buddy or admin)
16. Update user profile (must be a user or admin)
17. Create field (must be an admin)




