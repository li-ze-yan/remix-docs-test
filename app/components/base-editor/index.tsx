import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { motion } from "framer-motion";
import { useNavigate } from "@remix-run/react";

interface IProps {
  save: (content: string) => void;
}

const BaseEditor = ({ save }: IProps) => {
  const [content, setContent] = useState("<p>这是初始内容。</p>");
  const navigate = useNavigate();

  const handleEditorChange = (content: any, editor: any) => {
    setContent(content);
  };

  const saveMarkdown = async () => {
    save(content);
  };

  useEffect(() => {
    // 等待TinyMCE编辑器加载完成后执行DOM操作
    const removeBrandingElement = () => {
      const brandingElement = document.querySelector(
        ".tox-statusbar__branding"
      );
      if (brandingElement) {
        brandingElement.remove();
      }
    };

    const intervalId = setInterval(() => {
      const editorContainer = document.querySelector(".tox-tinymce");
      if (editorContainer) {
        removeBrandingElement();
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full">
      <Editor
        output-format="text"
        apiKey="ozi7j2o37ugvkinyse5uui42p21fo96wfbowwo34x163opwp"
        init={{
          height: 500,
          language: "zh_CN",
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          editimage_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
          toolbar_sticky: true,
          // toolbar_sticky_offset: 108,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          link_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],
          image_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],
          image_class_list: [
            { title: "None", value: "" },
            { title: "Some class", value: "class-name" },
          ],
          importcss_append: true,
          file_picker_callback: (callback, value, meta) => {
            /* Provide file and text for the link dialog */
            if (meta.filetype === "file") {
              callback("https://www.google.com/logos/google.jpg", {
                text: "My text",
              });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === "image") {
              callback("https://www.google.com/logos/google.jpg", {
                alt: "My alt text",
              });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === "media") {
              callback("movie.mp4", {
                source2: "alt.ogg",
                poster: "https://www.google.com/logos/google.jpg",
              });
            }
          },
          templates: [
            {
              title: "New Table",
              description: "creates a new table",
              content:
                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
              title: "Starting my story",
              description: "A cure for writers block",
              content: "Once upon a time...",
            },
            {
              title: "New list with dates",
              description: "New List with dates",
              content:
                '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
          ],
          template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image table",
          skin: "oxide",
          content_css: "default",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
        value={content}
        onEditorChange={handleEditorChange}
      />
      <div className="w-full flex justify-center mt-6 gap-3">
        <motion.span
          variants={{
            hidden: {
              opacity: 0,
              y: 10,
            },
            show: {
              opacity: 1,
              y: 0,
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
          }}
          className="rounded-md bg-blue-500 px-5 py-3 text-white cursor-pointer"
          onClick={() => saveMarkdown()}
        >
          创建一个markdown
        </motion.span>
        <motion.span
          variants={{
            hidden: {
              opacity: 0,
              y: 10,
            },
            show: {
              opacity: 1,
              y: 0,
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
          }}
          className="rounded-md bg-blue-500 px-5 py-3 text-white cursor-pointer"
          onClick={() => navigate("/posts")}
        >
          到文章界面
        </motion.span>
      </div>
    </div>
  );
};

export { BaseEditor };
