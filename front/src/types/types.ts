
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  tags: Tag[]
};


export type Tag  = {
  id: number;
  title : string;
  todos : Todo[]
}