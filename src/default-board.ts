import { v4 as uuid } from "uuid";

export default {
  name: "workshop",
  columns: [
    {
      name: "backlog",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "Say hi",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "todo",
      tasks: [
        {
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit explicabo sapiente dignissimos, nobis labore?",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "second task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "and thrid",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};
