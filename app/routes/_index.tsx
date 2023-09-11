import { json } from "@remix-run/node";
import type { V2_MetaFunction, ActionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { BaseEditor } from "~/components";
import { db } from "~/utils";
import { useActionData, useSubmit } from "@remix-run/react";
import { useEffect } from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();

  const content = body.get("content")?.toString(); // 获取请求中的数据
  const title = body.get("title")?.toString(); // 获取请求中的数据

  console.log("content", content);
  console.log("title", title);
  debugger;

  if (!content || !title) {
    return json({ error: "(content / title) is required" }, { status: 400 });
  }

  try {
    await db.post.create({
      data: {
        content,
        title,
        published: false,
      },
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return json({ error: "Failed to create user" }, { status: 500 });
  }
};

export default function Index() {
  const data = useActionData<typeof action>();
  const submit = useSubmit();

  useEffect(() => {
    if (data) {
      console.log("data", data);
    }
  }, [data]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {
          opacity: 0,
        },
        show: {
          opacity: 1,
          transition: {
            duration: 0.3,
            delay: 0.5,
            when: "beforeChildren",
            delayChildren: 0.3,
          },
        },
      }}
      className="bg-white w-screen h-screen overflow-hidden px-10 flex justify-center items-center flex-wrap"
    >
      <BaseEditor
        save={(content) => {
          const formData = new FormData();
          formData.append("content", content);
          formData.append("title", "hahahhah");
          submit(formData, { method: "post" });
        }}
      />
    </motion.div>
  );
}
