import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";
import TeamList from "./TeamList";
import { useTeams } from "./useTeams";
import { useRequestCounts } from "./useRequestCounts";
import { NeedType } from "./API";
import type { Team, TeamRequest } from "./RequestAPI";

// Mock the hooks
vi.mock("./useTeams");
vi.mock("./useRequestCounts");

const mockUseTeams = useTeams as ReturnType<typeof vi.fn>;
const mockUseRequestCounts = useRequestCounts as ReturnType<typeof vi.fn>;

// Helper function to create a partial TeamRequest for testing
const createMockTeamRequest = (overrides: Partial<TeamRequest> = {}): Partial<TeamRequest> => ({
  id: "default-id",
  filledDate: null,
  teamID: "default-team",
  ...overrides,
});

// Helper function to create a partial Team for testing
const createMockTeam = (overrides: Partial<Team> = {}): Partial<Team> => ({
  id: "default-id",
  teamName: "Default Team",
  teamType: NeedType.MEALS,
  email: "default@example.com",
  requests: null,
  ...overrides,
});

describe("TeamList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays pending team requests count for each team", () => {
    // Mock teams with some pending and completed team requests
    mockUseTeams.mockReturnValue({
      teams: [
        createMockTeam({
          id: "team1",
          teamName: "Meals Team",
          teamType: NeedType.MEALS,
          email: "meals@example.com",
          requests: {
            items: [
              // Pending request (no filledDate)
              createMockTeamRequest({ id: "tr1", filledDate: null, teamID: "team1" }),
              // Completed request (has filledDate)
              createMockTeamRequest({ id: "tr2", filledDate: "2024-01-15", teamID: "team1" }),
              // Another pending request
              createMockTeamRequest({ id: "tr3", filledDate: null, teamID: "team1" }),
            ],
          } as any,
        }),
        createMockTeam({
          id: "team2",
          teamName: "Housing Team",
          teamType: NeedType.HOUSING,
          email: "housing@example.com",
          requests: {
            items: [
              // All requests completed
              createMockTeamRequest({ id: "tr4", filledDate: "2024-01-20", teamID: "team2" }),
            ],
          } as any,
        }),
      ] as Team[],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestCounts.mockReturnValue({
      requestCounts: {
        [NeedType.MEALS]: 5,
        [NeedType.HOUSING]: 3,
      } as any,
      loading: false,
    });

    render(
      <BrowserRouter>
        <TeamList />
      </BrowserRouter>
    );

    // Check that assigned requests count is displayed correctly
    expect(screen.getByText(/Assigned Requests: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Assigned Requests: 0/)).toBeInTheDocument();
  });

  test("handles teams with no requests", () => {
    mockUseTeams.mockReturnValue({
      teams: [
        createMockTeam({
          id: "team1",
          teamName: "Empty Team",
          teamType: NeedType.GROCERIES,
          email: "groceries@example.com",
          requests: null,
        }),
      ] as Team[],
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

    // Should show 0 assigned requests
    expect(screen.getByText(/Assigned Requests: 0/)).toBeInTheDocument();
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
