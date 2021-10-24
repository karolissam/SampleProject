export const getIssues = async (baseUrl, params) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/public-apis/public-apis/issues?page=${params.page}&state=${params.state}&per_page=10&sort=${params.sort}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};
