import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { db } from "~/utils";

export async function loader() {
  return json(await db.post.findMany());
}

const Index = () => {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <motion.ul
        className="grid gap-3 grid-cols-1"
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
              when: "beforeChildren",
              delayChildren: 0.3,
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {data.map((post) => (
          <motion.li
            onClick={() => navigate(`/posts/${post.id}`)}
            variants={{
              hidden: {
                opacity: 0,
                x: -10,
              },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            whileTap={{
              scale: 0.9,
              backgroundColor: "#f00",
              color: "#fff",
            }}
            key={post.id}
            className="col-span-1 shadow-lg bg-white w-56 px-5 py-5 rounded-lg flex justify-between items-center cursor-pointer"
          >
            <span>{post.title}</span>
            <div
              className={clsx(
                post.published ? "bg-blue-600" : "bg-gray-600",
                "w-3 h-3 rounded-full animate-pulse"
              )}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Index;
