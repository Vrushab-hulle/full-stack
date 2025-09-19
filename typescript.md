let id: number = 1;
let name: string = "React";
let isActive: boolean = true;

# 2. Union & Literal Types
let status: "success" | "error" | "loading"; 
status = "success";

# Type Aliases & Interfaces

type User = {
  id: number;
  name: string;
};

interface Product {
  id: number;
  title: string;
}
const user: User = { id: 1, name: "Alice" };
const product: Product = { id: 1, title: "Laptop" };

👉 interface is often preferred in React for props.

# Optional & Readonly Properties

interface User {
  id: number;
  name?: string; // optional
  readonly email: string; // cannot change
}

# Functions & Types

function add(a: number, b: number): number {
  return a + b;
}

type Multiply = (x: number, y: number) => number;
const multiply: Multiply = (x, y) => x * y;

# type vs interface
Type: defines aliases for any kind of type (primitives, unions, objects, etc.)
Interface: mainly for object shapes (props, models).

Extension
Type: use intersection (&) to combine.
Interface: use extends.

// Type
type Base = { id: number };
type Extended = Base & { name: string };

// Interface
interface BaseI { id: number }
interface ExtendedI extends BaseI { name: string }

