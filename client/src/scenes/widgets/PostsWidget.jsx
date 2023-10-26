import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { BaseUrl } from "../../BaseUrl";

const PostsWidget = ({ userId, isProfile = false }) => {
  // const [stateposts, setStateposts] = useState([]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const token = useSelector((state) => state.token);

  const getPosts = async (props) => {
    const response = await fetch(BaseUrl + "posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log(data, "uhyuhyuhu");
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(BaseUrl + `posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("posts does not fetched please check on");
    }
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
      console.log(isProfile, "isprofile");
    } else {
      getPosts()
        .then(() => {
          console.log("posts");
        })
        .catch((error) => console.log(error.message));
    }
    console.log("useEffect idu oksofkosd");
  }, []);

  // eslint-disable-line react-hooks/exhaustive-deps
  console.log(posts, "posts");
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
