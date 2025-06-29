const fetchContributions = async (username, token) => {
  const to = new Date().toISOString();
  const from = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  ).toISOString();

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
              totalCommitContributions
              totalPullRequestContributions
              totalIssueContributions
            }
          }
        }
      `,
      variables: {
        username,
        from,
        to,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message || "GraphQL query failed");
  }

  if (!data.data?.user) {
    throw new Error("User not found");
  }

  return data.data.user.contributionsCollection;
};

export { fetchContributions };
