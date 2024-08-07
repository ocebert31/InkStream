# Inkstream

## Description

Inkstream is a blog application that allows users to easily create, edit, and publish articles. It features a user-friendly interface, comment management, and design customization options for articles.
![inkstream](./doc/show_inkstream.mp4)

## Features
### For Users:
![Registration](./doc/registration.PNG)
![login](./doc/login.PNG)

### For articles:
![write article and editor text](./doc/write_article.PNG)
![article List](./doc/article_List.PNG)
![search an article](./doc/search_an_article.PNG)
![listen to article audio](./doc/listen_to_article_audio.PNG)
![read an article](./doc/read_an_article.PNG)
![edit or delete article](./doc/edit_or_delete_article.PNG)
![share article](./doc/share_article.PNG)
![favorite article](./doc/favorite_article.mp4)

#### For comments:
![add comment or gif](./doc/add_comment_or_gif.PNG)
![comment List](./doc/comment_list.PNG)
![edit or delete comment](./doc/edit_or_delete_comment.PNG)
![comment vote](./doc/comment_vote.PNG)
![moderation of comment](./doc/moderation.mp4)
![reply to comment](./doc/reply_to_comment.PNG)
![when comment is deleted](./doc/when_comment_is_deleted.PNG)

## Build
Frontend: React
Style: Tailwind
Backend: Node JS, Express JS et Mongo DB

## In development
- Email confirmation upon registration.
- Adding reader and author roles.
- Ability to reset password or email address.

## Environment Variables
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_GIPHY_API_KEY=api_key
REACT_APP_GIPHY_API_BASE_URL=https://api.giphy.com/v1/gifs/search
REACT_APP_URL=http://localhost:3000
```

## Installation
Clone the repository:
git clone repository_name

Navigate to the project directory:
cd inkstream

Install dependencies:
npm install

Start the application:
npm start

