export type Task = {
  description: string;
  name: string;
  id: string;
  userAssigned?: string | null;
};

export type BoardColumn = {
  name: string;
  tasks: Task[];
};

export type BoardType = {
  name: string;
  columns: BoardColumn[];
};

export type StoreStateType = {
  board: BoardType;
};
