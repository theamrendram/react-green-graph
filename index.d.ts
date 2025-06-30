import React from "react";

export interface ReactGreenGraphProps {
  username: string;
  token: string;
  colors?: string[];
}

export interface ReactGreenGraphData {
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

export default function ReactGreenGraph(
  props: ReactGreenGraphProps
): React.JSX.Element;
