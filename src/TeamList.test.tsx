import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";
import TeamList from "./TeamList";
import { useTeams } from "./useTeams";
import { useRequestCounts } from "./useRequestCounts";

// Mock the hooks
vi.mock("./useTeams");
vi.mock("./useRequestCounts");

const mockUseTeams = useTeams as ReturnType<typeof vi.fn>;
const mockUseRequestCounts = useRequestCounts as ReturnType<typeof vi.fn>;

describe("TeamList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays pending team requests count for each team", () => {
    // Mock teams with some pending and completed team requests
    mockUseTeams.mockReturnValue({
      teams: [
        {
          id: "team1",
          teamName: "Meals Team",
          teamType: "MEALS" as any,
          email: "meals@example.com",
          requests: {
            items: [
              // Pending request (no filledDate)
              { id: "tr1", filledDate: null, teamID: "team1" } as any,
              // Completed request (has filledDate)
              { id: "tr2", filledDate: "2024-01-15", teamID: "team1" } as any,
              // Another pending request
              { id: "tr3", filledDate: null, teamID: "team1" } as any,
            ],
          },
        },
        {
          id: "team2",
          teamName: "Housing Team",
          teamType: "HOUSING" as any,
          email: "housing@example.com",
          requests: {
            items: [
              // All requests completed
              { id: "tr4", filledDate: "2024-01-20", teamID: "team2" } as any,
            ],
          },
        },
      ],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestCounts.mockReturnValue({
      requestCounts: {
        MEALS: 5,
        HOUSING: 3,
      } as any,
      loading: false,
    });

    render(
      <BrowserRouter>
        <TeamList />
      </BrowserRouter>
    );

    // Check that pending team requests count is displayed correctly
    expect(screen.getByText(/Pending Team Requests: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Pending Team Requests: 0/)).toBeInTheDocument();
  });

  test("handles teams with no requests", () => {
    mockUseTeams.mockReturnValue({
      teams: [
        {
          id: "team1",
          teamName: "Empty Team",
          teamType: "GROCERIES" as any,
          email: "groceries@example.com",
          requests: null,
        },
      ],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestCounts.mockReturnValue({
      requestCounts: {} as any,
      loading: false,
    });

    render(
      <BrowserRouter>
        <TeamList />
      </BrowserRouter>
    );

    // Should show 0 pending requests
    expect(screen.getByText(/Pending Team Requests: 0/)).toBeInTheDocument();
  });

  test("shows loading indicator when data is loading", () => {
    mockUseTeams.mockReturnValue({
      teams: [],
      loading: true,
      setTeams: vi.fn(),
    });

    mockUseRequestCounts.mockReturnValue({
      requestCounts: {} as any,
      loading: false,
    });

    render(
      <BrowserRouter>
        <TeamList />
      </BrowserRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
