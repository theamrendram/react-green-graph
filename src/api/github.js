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
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${from}", to: "${to}") {
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
    }),
  });

  const data = await response.json();
  return data.data.user.contributionsCollection;
};

export { fetchContributions };
