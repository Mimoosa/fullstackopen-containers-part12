import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import Todo from "./Todo";

let todo;
let deleteTodo;
let completeTodo;

beforeEach(() => {
  todo = {
    text: "some random text",
    done: false,
  };

  deleteTodo = vi.fn();
  completeTodo = vi.fn();

  render(
    <Todo
      onClickDelete={deleteTodo}
      onClickComplete={completeTodo}
      todo={todo}
    />,
  );
});

test("render content", () => {
  const element = screen.getByText("some random text");
  expect(element).toBeDefined();
});

test("delete button calls onClickDelete once", () => {
  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  expect(deleteTodo).toHaveBeenCalledWith(todo);
});
