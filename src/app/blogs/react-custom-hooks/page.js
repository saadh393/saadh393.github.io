import BlogLayout from "@/components/blogPage/BlogLayout";
import React from "react";

export default function page() {
  return (
    <BlogLayout>
      <h1 className="text-4xl font-bold text-center">React Custom Hooks</h1>
      <p className="text-center text-secondary">Supercharge Your React Components with Custom Hooks</p>

      <p>
        From version 16.8 react introduced &quot;Hooks&quot; that made it easy to control state, handle side effects,
        access DOM elements, memorize functions, values, and so on. Even sometimes we use external third-party libraries
        like - React Router, React Navigation, and React Bootstrap we got access to different custom hooks as well. Have
        you ever wondered how they created those hooks? Well, in this blog post, I will show you how you could create
        your own custom hooks from scratch that will help you to supercharge your react working experience. If you are
        reading this I will assume that you have a proper understanding of JavaScript at least basic ones like
        variables, functions, arrays, etc. Here, I will give you an example of 3 hooks. Those hooks could be used in
        both React Web applications as well React Native Applications. Hooks are - useTheme() - Determining if the user
        using a dark theme or light useLocalStorage() - Store data into the localStorage useWindowResize() - Detech if
        the user resized the window Let&quot;s get started with Custom Hook Before starting, you must bear in mind that,
        whatever hook you create, the name of the hook must start with &quot;use&quot;. For example, useHookName.
        That&quot;s it ! useTheme() First, Let&quot;s see what we are going to build. To achieve this we need to create
        a file named useTheme.js for that I have created a folder hooks in the src directory, where I will keep all of
        my hooks Now let&quot;s create a function useTheme and export it so that we could import that function from
        different components. export default useTheme; Now we are going to write our business logic. Actually what we
        are going to do with the hook that will be defined here. It will be different for different hooks. So in the
        above code, we have taken a state where we will keep track of the current mode. Either &quot;dark&quot; or
        &quot;light&quot;. Now we will declare two color palates for how two theme export default useTheme; Our Custom
        hook is ready 😍 Now we will implement it, So I am not going to explain how to implement it as it is not the
        purpose of this blog. Let&quot;s see how we have implemented the code So in the App.js, we imported the useTheme
        hook, from the hook we have imported colors , toggleTheme and currentTheme properties. In the &quot;Toggle
        Mode&quot; button I have set the event listener to toggle the themes and implemented the current theme into the
        UI. I hope you will understand the code. useLocalStorage() As this blog is getting bigger, I have decided to
        separate this hook into another blog. And I also believe the first example is enough to understand how React
        Hook works. Still if you want to have some more example feel free to go through this blog also. useLocalStorage
        Hook - Building React Custom Hooks from Scratch Welcome back to the blog! In the previous part of &quot;Building
        React Custom Hooks from Scratch,&quot; we explored the structure of React Hooks and built a cus...
        saadh393.hashnode.dev useWindowResize() Comming Soon... Thanks for reading so far, If you liked my blog and
        learned something new please feel free to inspire me by giving your precious feedback. And don&quot;t hesitate
        to criticize my mistakes.
      </p>
    </BlogLayout>
  );
}
