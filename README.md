# Interactive comments section

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

## Table of contents

- [Overview](#overview)
  - [Functionality](#functionality)
  - [Screenshot](#screenshot)
  - [Link](#link)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

A simple comment board with basic functionality and responsive layout.

### Functionality

Users are able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments

### Screenshot

[Watch screenshot](src/assets/comments-board-preview.png)

### Link

- Live Site URL: [Live demo](https://wasatad.github.io/Comments-Board/)

## My process

### Built with

- Flexbox
- [Vue.js](https://vuejs.org/) - JS framework
- [Vuex.js](https://vuex.vuejs.org/) - State manager

### What I learned

By making this project i consolidated knowledge of basic Vue.js features (components, emits, dynamic style classes) and have a practise in app global state management with Vuex (get and post data in store, using getters and actions). Also, I have learned ResizeObserver API and have use it for tracking parent comment width to building nested comment layout.

### Useful resources

- (https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) - ResizeObserver API documentation.

## Author

- Frontend Mentor - [@Wasatad](https://www.frontendmentor.io/profile/Wasatad)
- Telegram - [@kuznetsovtm](https://t.me/kuznetsovtm)

## Acknowledgments

Thanks @georg for this great non-recursive traversing function (helped me a lot with finding and changing nested comments in Vuex state) – (https://stackoverflow.com/questions/45415974/traversing-through-all-nodes-in-a-nested-object-iteratively-without-using-recur)
