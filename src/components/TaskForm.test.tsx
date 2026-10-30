import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";

afterEach(() => {
  cleanup();
});

describe("TaskForm", () => {
  it("requires a task title and due date", () => {
    render(
      <TaskForm
        title=""
        setTitle={vi.fn()}
        priority="medium"
        setPriority={vi.fn()}
        dueDate=""
        setDueDate={vi.fn()}
        isSaving={false}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/task title/i)).toBeRequired();
    expect(screen.getByLabelText(/due date/i)).toBeRequired();
  });

  it("calls onSubmit when the form is submitted", () => {
    const onSubmit = vi.fn();

    render(
      <TaskForm
        title="Build API"
        setTitle={vi.fn()}
        priority="high"
        setPriority={vi.fn()}
        dueDate="2099-01-01"
        setDueDate={vi.fn()}
        isSaving={false}
        onSubmit={onSubmit}
      />,
    );

    const form = screen.getByRole("button", {
      name: "Save Task",
    }).closest("form");

    expect(form).not.toBeNull();

    fireEvent.submit(form!);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables the save button while saving", () => {
    render(
      <TaskForm
        title="Build API"
        setTitle={vi.fn()}
        priority="medium"
        setPriority={vi.fn()}
        dueDate="2099-01-01"
        setDueDate={vi.fn()}
        isSaving={true}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /saving/i }),
    ).toBeDisabled();
  });
});