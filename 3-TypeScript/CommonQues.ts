//1. Type Annotations: Type annotations help in specifying types
// for variables and function parameters,
// enhancing code clarity and reducing errors.

let count: number = 5; // 'count' is explicitly a number

function printName(name: string): string {
  return `Hello ${name}`;
}

//************************************************************** */

//2. Interfaces and Types:
// Interfaces and types define the structure of objects.
// Interfaces are extendable, allowing you to add new properties.
// Interface support inheritance while types do not
// Types are more of a general purpose for representing value group


interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice",
}; // 'user' must have 'id' and 'name' as specified in the interface

// Types are versatile and can be used to define complex types, including unions.
type Car = {
  make: string;
  model: string;
};

const myCar: Car = {
  make: "Toyota",
  model: "Corolla",
}; // 'myCar' conforms to the 'Car' type

//************************************************************** */

//3. Props and State Typing: Typing props and state in React components ensures 
// that the data passed and the state managed is consistent.

import React, { useState } from 'react';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const [count, setCount] = useState<number>(0);

  return <h1>{title} - {count}</h1>;
};  // 'title' prop and 'count' state are typed

//************************************************************** */

//4. Generics: Generics enable the creation of reusable components 
// or functions that can operate on various types.
// Generics make 'identity' function reusable for any type.

const identity = <T>(arg: T): T => arg;

const numberIdentity = identity<number>(42);
const stringIdentity = identity<string>('Hello');

//************************************************************** */

//5. Enums: Enums define a set of named constants, improving code readability.

enum Color {
    Red,
    Green,
    Blue,
}
  
const myColor: Color = Color.Green;  // 'myColor' can only be a value from 'Color' enum

//************************************************************** */

//6. Type Inference: TypeScript often infers the 
// type of variables even if not explicitly defined, reducing redundancy.

let message = 'Hello, world!';  // TypeScript infers that 'message' is a string

//************************************************************** */

//7. Union and Intersection Types: These allow combining multiple types, either to 
//accept multiple types (unions) or to require multiple criteria (intersections).

type SuccessResponse = { success: true; data: string };
type ErrorResponse = { success: false; error: string };

type ApiResponse = SuccessResponse | ErrorResponse;  // 'ApiResponse' can be either 'SuccessResponse' or 'ErrorResponse'
type ApiResponse1 = SuccessResponse & ErrorResponse; // intersection

const handleResponse = (response: ApiResponse) => {
  if (response.success) {
    console.log(response.data);  // Response must have 'data' if successful
  } else {
    console.error(response.error);  // Response must have 'error' if not successful
  }
};

//************************************************************** */

//8. Type Assertions: Type assertions tell the compiler to treat a value as a specified type.

let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;  // 'someValue' is treated as a string for this operation

//************************************************************** */

// 9. Utility Types: Predefined types like Partial, Readonly, Pick, and Omit help manipulate types efficiently.
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
  
type PartialTodo = Partial<Todo>;  // All properties in 'Todo' are optional
const todo: PartialTodo = { title: 'Buy milk' };
  
type ReadonlyTodo = Readonly<Todo>;  // All properties in 'Todo' are read-only
const readonlyTodo: ReadonlyTodo = { title: 'Learn TypeScript', description: 'Read docs', completed: false };

//************************************************************** */

//10. Function Components: Typing for functional components 
// ensures that props and state are correctly handled.

import React from 'react';

const MyComponent: React.FC = () => {
  return <div>Hello, world!</div>;
};
