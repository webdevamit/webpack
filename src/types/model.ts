export type Todo = {
  id: number;
  todo: string;
  isDone: boolean;
};

1; // My custom pick
type MyPick<T, K extends keyof T> = {
  [key in K]: T[K];
};
type PickedTodo = MyPick<Todo, 'id'>;

2; // My custom Readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
const todo: MyReadonly<Todo> = {
  id: 123,
  todo: 'asdad',
  isDone: true,
};
// todo.id = 234;
type NewType = typeof todo;

3; // Tuple to object
const tuple = ['tesla', 'model3', 'modelX', 'modelY'] as const;
type TupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K;
};
type Tup = TupleToObject<typeof tuple>;

4; // First of Array
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];
type First<T extends any[]> = T extends [] ? never : T[0];
type head1 = First<arr1>; // expected to be 'a'

5; // Length of Tuple

type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
];

type Length<T extends any[]> = T['length'];
type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

6; // Custom Exclude

type MyExclude<T extends string[], K> = T extends K ? never : T;

type Result = MyExclude<['a', 'b', 'c'], 'a'>; // 'b' | 'c'

7; // CUSTOM PICK
interface MyTodo {
  title: string;
  description: string;
  completed: boolean;
}

type MyOmit<T, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P];
};
type TodoPreview = MyOmit<MyTodo, 'title' | 'completed'>;

// const mytodo: TodoPreview = {
//   title: 'Clean room',
//   completed: false,
// };

// explicit type guard
const isNumber = (inp: any): inp is number => {
  console.log(`inp: ${inp} typeof inp: ${typeof inp}`);
  return typeof inp === 'number';
};

const test: any = 5;
console.log(test.toFixed(0)); // no intellisense
if (isNumber(test)) {
  console.log(test.toFixed(0)); // intellisense
}
