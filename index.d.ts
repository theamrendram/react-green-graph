declare module "green-graph" {
  export interface ContributionGraphProps {
    /** GitHub username to fetch contributions for */
    username: string;
    /** GitHub personal access token for API authentication */
    token: string;
    /** Optional custom colors for contribution levels */
    colors?: {
      0: string;
      1: string;
      2: string;
      5: string;
      10: string;
    };
    /** Optional custom title for the graph */
    title?: string;
    /** Optional CSS class name for styling */
    className?: string;
  }

  export interface ContributionData {
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          contributionCount: number;
          date: string;
          color: string;
        }>;
      }>;
    };
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
  }

  export default function ContributionGraph(
    props: ContributionGraphProps
  ): JSX.Element;
}
