import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { db } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  const post: any = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });
  console.log("post", post);
  if (!post) {
    return json({
      status: 404,
      id: params.postId,
      content: "",
      title: "",
      published: false,
    });
  }
  return json({
    status: 200,
    id: params.postId,
    content: post.content,
    title: post.title,
    published: post.published,
  });
}

const Index = () => {
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log("data", data.content);
  }, [data]);
  return (
    <article className=" prose lg:prose-xl">
      {/* <h1 className="w-full flex justify-center items-center">{data.title}</h1> */}
      {/* <p>{data.published ? "已出版" : "未出版"}</p> */}
      {/* {data?.content} */}
      <div dangerouslySetInnerHTML={{ __html: data?.content || "" }}></div>
    </article>
  );
};

export default Index;
