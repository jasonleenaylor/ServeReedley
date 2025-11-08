import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import TeamPicker from "./TeamPicker";
import { useTeams } from "./useTeams";
import useRequestsById from "./useRequestsById";
import { NeedType } from "./API";
import type { Team, TeamRequest, Request } from "./RequestAPI";
import { Authenticator } from "@aws-amplify/ui-react";

// Mock the hooks
vi.mock("./useTeams");
vi.mock("./useRequestsById");
vi.mock("@aws-amplify/ui-react", () => ({
  Authenticator: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock AWS Amplify
vi.mock("aws-amplify/api", () => ({
  generateClient: vi.fn(() => ({
    graphql: vi.fn(),
  })),
}));

vi.mock("@aws-amplify/auth", () => ({
  fetchAuthSession: vi.fn(() => Promise.resolve({
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
      sessionToken: "test",
    },
  })),
}));

const mockUseTeams = useTeams as ReturnType<typeof vi.fn>;
const mockUseRequestsById = useRequestsById as ReturnType<typeof vi.fn>;

// Helper function to create a mock Request
const createMockRequest = (overrides: Partial<Request> = {}): Request => ({
  __typename: "Request",
  id: "req-1",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "555-1234",
  email: "john@example.com",
  address: "123 Main St",
  requestDate: "2024-01-01",
  needReason: "FIRE",
  familyCount: 4,
  status: "APPROVED",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  ...overrides,
} as Request);

// Helper function to create a partial TeamRequest for testing
const createMockTeamRequest = (overrides: Partial<TeamRequest> = {}): TeamRequest => ({
  __typename: "TeamRequest",
  id: "default-id",
  requestID: "req-1",
  request: createMockRequest(),
  type: NeedType.MEALS,
  teamID: "team-1",
  askDate: "2024-01-01",
  note: "",
  filledDate: null,
  filledBy: null,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  ...overrides,
} as TeamRequest);

// Helper function to create a partial Team for testing
const createMockTeam = (overrides: Partial<Team> = {}): Team => ({
  __typename: "Team",
  id: "team-1",
  teamName: "Default Team",
  teamType: NeedType.MEALS,
  email: "default@example.com",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  ...overrides,
} as Team);

describe("TeamPicker Remove Request Functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.location
    delete (window as any).location;
    (window as any).location = { search: "?id=team-1", reload: vi.fn() };
  });

  test("displays remove button in OpenTeamRequestSummary", () => {
    mockUseTeams.mockReturnValue({
      teams: [createMockTeam({ id: "team-1", teamName: "Test Team" })],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestsById.mockReturnValue({
      requests: [
        createMockTeamRequest({
          id: "tr1",
          filledDate: null,
          teamID: "team-1",
        }),
      ],
      loading: false,
      error: null,
    });

    render(<TeamPicker />);

    // Check that the remove button is present
    const deleteButtons = screen.getAllByLabelText("remove request");
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  test("opens confirmation dialog when remove button is clicked", async () => {
    mockUseTeams.mockReturnValue({
      teams: [createMockTeam({ id: "team-1", teamName: "Test Team" })],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestsById.mockReturnValue({
      requests: [
        createMockTeamRequest({
          id: "tr1",
          filledDate: null,
          teamID: "team-1",
        }),
      ],
      loading: false,
      error: null,
    });

    render(<TeamPicker />);

    // Click the first remove button
    const deleteButtons = screen.getAllByLabelText("remove request");
    fireEvent.click(deleteButtons[0]);

    // Check that the confirmation dialog is displayed
    await waitFor(() => {
      expect(screen.getByText(/Are you sure you want to remove this request\?/)).toBeInTheDocument();
    });

    // Check that Yes and No buttons are present
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  test("closes dialog when 'No' is clicked", async () => {
    mockUseTeams.mockReturnValue({
      teams: [createMockTeam({ id: "team-1", teamName: "Test Team" })],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestsById.mockReturnValue({
      requests: [
        createMockTeamRequest({
          id: "tr1",
          filledDate: null,
          teamID: "team-1",
        }),
      ],
      loading: false,
      error: null,
    });

    render(<TeamPicker />);

    // Click the first remove button
    const deleteButtons = screen.getAllByLabelText("remove request");
    fireEvent.click(deleteButtons[0]);

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText(/Are you sure you want to remove this request\?/)).toBeInTheDocument();
    });

    // Click No button
    const noButton = screen.getByText("No");
    fireEvent.click(noButton);

    // Check that the dialog is closed
    await waitFor(() => {
      expect(screen.queryByText(/Are you sure you want to remove this request\?/)).not.toBeInTheDocument();
    });
  });

  test("shows loading indicator when teams or requests are loading", () => {
    mockUseTeams.mockReturnValue({
      teams: [],
      loading: true,
      setTeams: vi.fn(),
    });

    mockUseRequestsById.mockReturnValue({
      requests: [],
      loading: false,
      error: null,
    });

    render(<TeamPicker />);

    expect(screen.getByText("Loading team data…")).toBeInTheDocument();
  });

  test("displays no unfulfilled requests message when all requests are fulfilled", () => {
    mockUseTeams.mockReturnValue({
      teams: [createMockTeam({ id: "team-1", teamName: "Test Team" })],
      loading: false,
      setTeams: vi.fn(),
    });

    mockUseRequestsById.mockReturnValue({
      requests: [
        createMockTeamRequest({
          id: "tr1",
          filledDate: "2024-01-15",
          teamID: "team-1",
        }),
      ],
      loading: false,
      error: null,
    });

    render(<TeamPicker />);

    expect(screen.getByText("No unfulfilled requests.")).toBeInTheDocument();
  });
});
