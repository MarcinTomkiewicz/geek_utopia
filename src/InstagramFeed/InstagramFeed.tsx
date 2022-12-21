import { useEffect, useState } from "react";

export const InstagramFeed = (): JSX.Element => {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    fetch("https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&access_token=3299572103591585")
      .then((response: any) => response)
      .then((data: any) => console.log("hey", data))
      .catch((error: any) => {
        console.log(error);
      });
  });

  return <></>;
};
