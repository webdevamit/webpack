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

let num = 'asdsad';
num = 'asdjh';
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

// Css property identifier
type Identifier = 'margin' | 'padding';

type Specifier = 'px' | 'em' | 'rem';
type Positions = 'top' | 'left' | 'bottom' | 'right';

type PropertyKey = `${Identifier}${Capitalize<Positions>}`;
type PropertyValue = `${number}${Specifier}`;
type Property = {
  [K in PropertyKey]?: PropertyValue;
};
const style: Exclude<Property, undefined> = {
  marginTop: '10px',
};

// NN

function getPropertyValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const tempUser = { name: 'John', age: 30, city: 'New York' };
const age = getPropertyValue(tempUser, 'age');
console.log(age); // Output: 30

// Generics
type MetaData = {
  sex: string;
  height: 'tall' | 'short';
  favouriteNumber: number;
};

type Person<T> = {
  id: number;
  name: string;
  age: number;
  metadata: T;
};

const personOne: Person<(number | string)[]> = {
  id: 1,
  name: 'Jeff',
  age: 31,
  metadata: ['male', 'tall', 22],
};
const personTwo: Person<MetaData> = {
  id: 2,
  name: 'Jess',
  age: 28,
  metadata: {
    sex: 'female',
    height: 'tall',
    favouriteNumber: 45,
  },
};

personOne.metadata;

//

// 1️⃣ Original Type
type User = {
  id: number;
  name: string;
  age: number;
};

// 2️⃣ Mapped type using generics
type PartialUser<T> = {
  [K in keyof T]?: T[K];
};

// 3️⃣ Using our mapped type, valid syntax ✅
const partialUser: PartialUser<User> = {
  age: 22,
};

// 3️⃣ Using a normal type, invalid syntax ❌
// Error: Type '{ age: number; }' is missing the following properties from type 'User': id, name
const partialUser2: User = {
  age: 22,
};

///

function logName<T extends { name: string }>(obj: T) {
  console.log(obj.name);
}

logName({ name: 'Coner' }); // 'Coner'
logName({ name: 'Josh', age: 2 }); // 'Josh'
logName({ age: 2 }); // ❌ Error: Object literal may only specify known properties, and 'age' does not exist in type '{ name: string; }'

///

interface Cat {
  weight: number;
  whiskers: number;
  ANIMAL_TYPE: 'CAT';
}
interface Dog {
  weight: number;
  friendly: boolean;
  ANIMAL_TYPE: 'DOG';
}
const animal: Dog | Cat = {} as any;
if (animal.ANIMAL_TYPE == 'CAT') {
  animal.whiskers;
}

/// Union
type NetworkLoadingState = {
  state: 'loading';
};
type NetworkFailedState = {
  state: 'failed';
  code: number;
};
type NetworkSuccessState = {
  state: 'success';
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function logger(state: NetworkState): string {
  // Right now TypeScript does not know which of the three
  // potential types state could be.

  // Trying to access a property which isn't shared
  // across all types will raise an error
  state.code;

  // By switching on state, TypeScript can narrow the union
  // down in code flow analysis
  switch (state.state) {
    case 'loading':
      return 'Downloading...';
    case 'failed':
      // The type must be NetworkFailedState here,
      // so accessing the `code` field is safe
      return `Error ${state.code} downloading`;
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

logger({ state: 'failed', code: 500 });

///

function printId(id: number | string) {
  if (typeof id === 'string') {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
printId('asd');
