import { createContext, useReducer } from "react";

export const PostContext = createContext();
const initialPostState = {
  isLoading: false,
  posts: [],
};

const PostReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      //   console.log("LOAD_POSTS", action.payload.posts);
      return { isLoading: true, posts: action.payload.posts };
    case "INC_VIEW_POST":
      //   console.log("INC_VIEW_POST", action.payload);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.postId) {
            return { ...post, views: +post.views + 1 };
          }
          return post;
        }),
      };
    case "UPDATE_POST":
      console.log("UPDATE_POST", action.payload);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.postId) {
            return { ...post, body: action.payload.body };
          }
          return post;
        }),
      };
    case "DELETE_POST":
      console.log("DELETE_POST", action.payload.postId);
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.postId),
      };
    default:
      return state;
  }
};

export const PostProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(PostReducer, initialPostState);

  const { posts, isLoading } = postState;
  return (
    <PostContext.Provider value={{ posts, postDispatch, isLoading }}>
      {children}
    </PostContext.Provider>
  );
};
