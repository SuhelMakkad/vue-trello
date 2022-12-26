export type Task = {
  description: string;
  name: string;
  id: string;
  userAssigned?: string | null;
};

export type BoardColumnType = {
  name: string;
  tasks: Task[];
};

export type BoardType = {
  name: string;
  columns: BoardColumnType[];
};

export type StoreStateType = {
  board: BoardType;
};
