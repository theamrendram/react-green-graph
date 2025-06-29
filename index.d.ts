import React from "react";

export interface ContributionGraphProps {
  username: string;
  token: string;
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
): React.JSX.Element;
