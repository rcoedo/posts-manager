# Code Challenge

To solve the proposed challenge I built a frontend using create-react-app.

## Running the application

1. You can run the application using yarn:

```bash
$ yarn # To install dependencies
$ yarn start # To start the application
```

2. Go to http://localhost:3000/posts-manager

## The stack

I created the frontend using create-react-app and TypeScript. I decided to avoid using an state management tool since the application is quite simple, instead I used React's Context and some custom hooks to be able to provide the components with the right values and actions.

To handle the CSS code I decided to go with a CSS in JS approach using [styled-components](https://styled-components.com/). I shared some colors using a style-components theme but other than that I didn't spend to much time extracting things to common components.

I also used [formik](https://formik.org/) for the login form, just to avoid all the boilerplate related to handling forms in React, [yup](https://github.com/jquense/yup) for form validation, [axios](https://github.com/axios/axios) as an http client and [Jest](https://jestjs.io/) and [testing-library](https://testing-library.com/) for testing.

## The architecture

There's not much to say about architecture. `/api` has the api client related stuff. `/interfaces` has the domain interfaces and `/components` has the components and custom hooks.

Inside the `/components` folder you can find:

- `/auth`: provides a context with the logged user state, and abstracts the way it is stored in local storage.
- `/state`: provides a context that holds the application state.
- `/pages`: the different pages for the application and their related components. The two main pages are `login` and `posts`.
- `/layout`: contains the components related to the layout.
- `/common`: there's just a couple of common hooks here.

## Testing

Most of the testing effort was placed in the testing of hooks, since this is the more complex part of the application and the most error prone as well. However, I included a couple of unit tests for the `WithAuth` and `PostsPage` components.

More tests should have been implemented, but I cut a bit on this part to avoid spending too much time in the exercise.

## Things to improve

- CSS are a bit all over the place. With more time I would've extracted common things to some common components and re-use them to avoid repeating myself.
- More testing. There are some unit tests but some behaviour tests would have been great to check that things are working well together.
- Error handling. The application is assuming many happy paths. I'm aware of it, cut a bit on this for being time constrained.
- Design. I took some time to make the application responsive, but I did not adapt the designs to work well with mobile. Depending on how many users we show in the list, the mobile view is tedious, since you have to scroll all the way down to check the posts for the user.

## That's it! :confetti_ball:

Thanks for challenging me to build this application and I hope you like it :slightly_smiling_face:
