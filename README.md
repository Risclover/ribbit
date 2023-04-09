# Ribbit

<p align="center"><img src="./react-app/src/images/ribbit-banners/ribbit_banner.png" /></p>
<p align="center"><a href="https://ribbit-app.herokuapp.com/" target="_blank">Check out Ribbit here!</a></p>

## Table of Contents

- [Ribbit](#ribbit)
  - [Table of Contents](#table-of-contents)
  - [Project Information](#project-information)
  - [Languages, Frameworks, and Technologies](#languages-frameworks-and-technologies)
  - [Features](#features)
  - [Future Implementations](#future-implementations)
  - [Getting Started](#getting-started)
  - [Site Screenshots](#site-screenshots)
  - [Developer Links](#developer-links)

## Project Information

(^ [Back to Top](#ribbit))

This is Ribbit, a clone of https://www.reddit.com. On this site, users can subscribe to communities that interest them and interact with other users by creating posts on communities, or by creating comments on other users' posts. Users can use their homepage to look through the posts from their subscribed communities, or the 'All' feed to view posts from all communities on the site. In addition, users can upload a profile image and a banner image on their profiles to represent themselves or their personalities. Owners of communities can customize the community's display name, description, image, and rules section.

## Languages, Frameworks, and Technologies

(^ [Back to Top](#ribbit))

- [React](https://beta.reactjs.org/)
- [Redux](https://redux.js.org/)
- [Python](https://www.python.org/)
- [JavaScript](https://devdocs.io/javascript/)
- [NodeJS](https://nodejs.org/en/docs/)
- [NPM](https://docs.npmjs.com/)
- [Flask](https://palletsprojects.com/p/flask/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Alembic](https://alembic.sqlalchemy.org/en/latest/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Sqlite](https://www.sqlite.org/docs.html)
- [CSS3](https://devdocs.io/css/)
- [HTML5](https://devdocs.io/html/)
- [Git](https://devdocs.io/git/)

## Features

(^ [Back to Top](#ribbit))

- Sign-up and Login functionality for users
- Communities (Create, Read, Update, and Delete)
- Posts (Create, Read, Update, and Delete)
- Comments (Create, Read, Update, and Delete)
- Community Subscriptions (Create, Read, and Delete)
- Post Likes and Dislikes (Create, Read, and Delete)
- Comment Likes and Dislikes (Create, Read, and Delete)
- Community Rules (Create, Read, Update, and Delete)
- Followers
- Favorites list (Communities & Users)
- Search
- AWS S3 used for:
  - User profile images
  - User banner images
  - Image posts
  - Community images

## Future Implementations

(^ [Back to Top](#ribbit))

Future feature implementations include:

- ~~More-developed search results page~~ &check;
- ~~Following other users~~ &check;
- ~~Favorite communities~~ &check;
- Improved navigation bar
  - ~~Left nav dropdown~~ &check;
  - Left nav sidebar
- ~~Advanced post formatting (on feeds)~~
- Saving posts and comments
- Live messaging via websockets
- Notifications for post replies, comment replies, new community posts, and messages
- Nested comments

## Getting Started

(^ [Back to Top](#ribbit))

To set up this app:

1. Clone the project.
2. In the root directory of the project, run `pipenv install -r requirements.txt`.
3. Create a `.env` file based on the `.envexample` file provided.
4. Make sure the SQLite3 database connection URL is in the `.env` file
5. This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.
6. Get into your `pipenv`, migrate your database, seed your database, and run your Flask app
   ```
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```
7. Switch to the react-app folder and run `npm install`

To run this app locally:

1. Navigate to the root directory of the project in the terminal and run `flask run`.
2. In a separate terminal, navigate to the `/react-app` directory and enter `npm start`. This should automatically launch a browser window navigated to the proper localhost address.
3. By default, the app will be running on port `3000`.

## Site Screenshots

(^ [Back to Top](#ribbit))

![](/react-app/src/images/readme/community-img.png)
![](/react-app/src/images/readme/create-post.png)
![](/react-app/src/images/readme/edit-community.png)
![](/react-app/src/images/readme/posts-feed.png)
![](/react-app/src/images/readme/single-post.png)
![](/react-app/src/images/readme/user-profile.png)

## Developer Links

(^ [Back to Top](#ribbit))

- [Developer portfolio](https://risclover.github.io)
- [LinkedIn](https://www.linkedin.com/in/sara-dunlop)
- [Wellfound](https://angel.co/u/sara-dunlop-1)
- [Github](https://www.github.com/Risclover)
