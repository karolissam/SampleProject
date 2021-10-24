export const initialState = {issuesList: []};

export function reducer({...state}, action) {
  function setIssues(issues) {
    state.issuesList = issues;
    return state;
  }

  switch (action.type) {
    case 'ADD_ISSUES':
      return setIssues(action.issues);
    default:
      return state;
  }
}
