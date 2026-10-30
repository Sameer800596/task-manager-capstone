import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import TaskFilters from "./TaskFilters";

afterEach(() => {
  cleanup();
});

describe("TaskFilters", () => {
  it("calls setSearchQuery when the user types", () => {
    const setSearchQuery = vi.fn();

    render(
      <TaskFilters
        searchQuery=""
        setSearchQuery={setSearchQuery}
        statusFilter="all"
        setStatusFilter={vi.fn()}
        priorityFilter="all"
        setPriorityFilter={vi.fn()}
        sortBy="dueDate"
        setSortBy={vi.fn()}
      />,
    );

    fireEvent.change(
      screen.getByPlaceholderText(/search tasks by title/i),
      { target: { value: "Build API" } },
    );

    expect(setSearchQuery).toHaveBeenCalledWith("Build API");
  });

  it("calls setStatusFilter with the canonical inProgress value", () => {
    const setStatusFilter = vi.fn();

    render(
      <TaskFilters
        searchQuery=""
        setSearchQuery={vi.fn()}
        statusFilter="all"
        setStatusFilter={setStatusFilter}
        priorityFilter="all"
        setPriorityFilter={vi.fn()}
        sortBy="dueDate"
        setSortBy={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByRole("combobox", {
      name: "Filter by status",
    }), {
      target: { value: "inProgress" },
    });

    expect(setStatusFilter).toHaveBeenCalledWith("inProgress");
  });

  it("calls setPriorityFilter when priority changes", () => {
    const setPriorityFilter = vi.fn();

    render(
      <TaskFilters
        searchQuery=""
        setSearchQuery={vi.fn()}
        statusFilter="all"
        setStatusFilter={vi.fn()}
        priorityFilter="all"
        setPriorityFilter={setPriorityFilter}
        sortBy="dueDate"
        setSortBy={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByRole("combobox", {
      name: "Filter by priority",
    }), {
      target: { value: "high" },
    });

    expect(setPriorityFilter).toHaveBeenCalledWith("high");
  });

  it("calls setSortBy when sort option changes", () => {
    const setSortBy = vi.fn();

    render(
      <TaskFilters
        searchQuery=""
        setSearchQuery={vi.fn()}
        statusFilter="all"
        setStatusFilter={vi.fn()}
        priorityFilter="all"
        setPriorityFilter={vi.fn()}
        sortBy="dueDate"
        setSortBy={setSortBy}
      />,
    );

    fireEvent.change(screen.getByRole("combobox", {
      name: "Sort tasks",
    }), {
      target: { value: "priority" },
    });

    expect(setSortBy).toHaveBeenCalledWith("priority");
  });
});