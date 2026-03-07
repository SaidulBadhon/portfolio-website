"use client";

import Markdown from "markdown-to-jsx";

export default function MarkdownViewer({ className, src, pOnly }) {
  return (
    <Markdown
      className={`markdown-body ${className}`}
      style={{
        width: "100%",
      }}
      options={{
        wrapper: "article",
        forceBlock: true,
        forceWrapper: false,
        overrides: pOnly
          ? {
              p: {
                component: "p",
                props: {
                  className: "text-base text-gray-700 mb-4 dark:text-gray-300",
                },
              },
              h1: {
                component: "h1",
                props: {
                  className:
                    "text-base font-bold text-gray-800 mb-4 mt-2 dark:text-gray-100",
                },
              },
              h2: {
                component: "h2",
                props: {
                  className:
                    "text-base font-bold text-gray-700 mt-6 mb-4 dark:text-gray-300",
                },
              },
              h3: {
                component: "h3",
                props: {
                  className:
                    "text-base font-bold text-gray-600 mt-6 mb-4 dark:text-gray-400",
                },
              },
              h4: {
                component: "h4",
                props: {
                  className:
                    "text-base font-bold text-gray-500 mt-6 mb-4 dark:text-gray-500",
                },
              },
              h5: {
                component: "h5",
                props: {
                  className:
                    "text-base font-bold text-gray-400 mt-6 mb-4 dark:text-gray-600",
                },
              },
              h6: {
                component: "h6",
                props: {
                  className:
                    "text-base font-bold text-gray-300 mt-6 mb-4 dark:text-gray-700",
                },
              },
              p: {
                component: "p",
                props: {
                  className: "text-base text-gray-700 mb-4 dark:text-gray-300",
                },
              },
              a: {
                component: "a",
                props: {
                  className: "text-base text-blue-500 hover:underline",
                },
              },
              ul: {
                component: "ul",
                props: {
                  className: "list-disc list-inside mb-4 dark:text-gray-300 ",
                },
              },
              ol: {
                component: "ol",
                props: {
                  className: "list-decimal list-inside mb-4 dark:text-gray-300",
                },
              },
              li: {
                component: "li",
                props: {
                  className: "text-base text-gray-700 mb-2 dark:text-gray-300",
                },
              },
              hr: {
                component: "hr",
                props: {
                  className:
                    "border-gray-300 border-2 my-4 dark:border-gray-700",
                },
              },
              blockquote: {
                component: "blockquote",
                props: {
                  className:
                    "text-base italic text-gray-600 mb-4 dark:text-gray-400",
                },
              },
              img: {
                component: "img",
                props: {
                  className: "w-full rounded my-4 shadow-lg",
                },
              },
              table: {
                component: "table",
                props: {
                  className: "table-auto w-full my-4",
                },
              },
              thead: {
                component: "thead",
                props: {
                  className: "bg-gray-200 text-gray-700 dark:bg-gray-700",
                },
              },
              tbody: {
                component: "tbody",
                props: {
                  className: "bg-gray-100 text-gray-700 dark:bg-gray-800",
                },
              },
              tr: {
                component: "tr",
                props: {
                  className: " border border-gray-400 px-4 py-2 ",
                },
              },
              th: {
                component: "th",
                props: {
                  className: "border border-gray-400 px-4 py-2",
                },
              },
              td: {
                component: "td",
                props: {
                  className: "border border-gray-400 px-4 py-2",
                },
              },
              code: {
                component: "code",
                props: {
                  className: "bg-gray-200 rounded p-1 dark:bg-gray-700",
                },
              },
              pre: {
                component: "pre",
                props: {
                  className: "bg-gray-200 rounded p-1 dark:bg-gray-700",
                },
              },
              strong: {
                component: "strong",
                props: {
                  className: "text-gray-700 font-bold dark:text-gray-200",
                },
              },
            }
          : {
              h1: {
                component: "h1",
                props: {
                  className:
                    "text-2xl font-bold text-gray-800 mb-4 mt-2 dark:text-gray-100",
                },
              },
              h2: {
                component: "h2",
                props: {
                  className:
                    "text-xl font-bold text-gray-700 mt-6 mb-4 dark:text-gray-300",
                },
              },
              h3: {
                component: "h3",
                props: {
                  className:
                    "text-lg font-bold text-gray-600 mt-6 mb-4 dark:text-gray-400",
                },
              },
              h4: {
                component: "h4",
                props: {
                  className:
                    "text-base font-bold text-gray-500 mt-6 mb-4 dark:text-gray-500",
                },
              },
              h5: {
                component: "h5",
                props: {
                  className:
                    "text-sm font-bold text-gray-400 mt-6 mb-4 dark:text-gray-600",
                },
              },
              h6: {
                component: "h6",
                props: {
                  className:
                    "text-xs font-bold text-gray-300 mt-6 mb-4 dark:text-gray-700",
                },
              },
              p: {
                component: "p",
                props: {
                  className: "text-base text-gray-700 mb-4 dark:text-gray-300",
                },
              },
              a: {
                component: "a",
                props: {
                  className: "text-base text-blue-500 hover:underline",
                },
              },
              ul: {
                component: "ul",
                props: {
                  className: "list-disc list-inside mb-4 dark:text-gray-300 ",
                },
              },
              ol: {
                component: "ol",
                props: {
                  className: "list-decimal list-inside mb-4 dark:text-gray-300",
                },
              },
              li: {
                component: "li",
                props: {
                  className: "text-base text-gray-700 mb-2 dark:text-gray-300",
                },
              },
              hr: {
                component: "hr",
                props: {
                  className:
                    "border-gray-300 border-2 my-4 dark:border-gray-700",
                },
              },
              blockquote: {
                component: "blockquote",
                props: {
                  className:
                    "text-base italic text-gray-600 mb-4 dark:text-gray-400",
                },
              },
              img: {
                component: "img",
                props: {
                  className: "w-full rounded my-4 shadow-lg",
                },
              },
              table: {
                component: "table",
                props: {
                  className: "table-auto w-full my-4",
                },
              },
              thead: {
                component: "thead",
                props: {
                  className: "bg-gray-200 text-gray-700 dark:bg-gray-700",
                },
              },
              tbody: {
                component: "tbody",
                props: {
                  className: "bg-gray-100 text-gray-700 dark:bg-gray-800",
                },
              },
              tr: {
                component: "tr",
                props: {
                  className: " border border-gray-400 px-4 py-2 ",
                },
              },
              th: {
                component: "th",
                props: {
                  className: "border border-gray-400 px-4 py-2",
                },
              },
              td: {
                component: "td",
                props: {
                  className: "border border-gray-400 px-4 py-2",
                },
              },
              code: {
                component: "code",
                props: {
                  className: "bg-gray-200 rounded p-1 dark:bg-gray-700",
                },
              },
              pre: {
                component: "pre",
                props: {
                  className: "bg-gray-200 rounded p-1 dark:bg-gray-700",
                },
              },
              strong: {
                component: "strong",
                props: {
                  className: "text-gray-300 font-bold dark:text-gray-900",
                },
              },
            },
      }}
    >
      {src || ""}
    </Markdown>
  );
}
