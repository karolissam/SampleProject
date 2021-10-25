export const getIssues = async (ownerRepo, params) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${ownerRepo}/issues?page=${params.page}&state=${params.state}&per_page=10&sort=${params.sort}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return {message: 'Wrong request'};
  }
};
