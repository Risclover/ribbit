/* ------------------------- ACTIONS ------------------------- */

const LOAD_RULES = "rules/LOAD_RULES";
const LOAD_RULE = "rules/LOAD_RULE";
const DELETE_RULE = "rules/DELETE";

export const loadRules = (rules) => {
  return {
    type: LOAD_RULES,
    rules,
  };
};

const loadRule = (rule) => {
  return {
    type: LOAD_RULE,
    rule,
  };
};

const removeRule = (ruleId) => {
  return {
    type: DELETE_RULE,
    ruleId,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getCommunityRules = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/rules/communities/${communityId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadRules(data));
    return data;
  }
};

export const createRule = (payload, communityId) => async (dispatch) => {
  const { title, description } = payload;
  const response = await fetch(`/api/rules/communities/${communityId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (response.ok) {
    const rule = await response.json();
    dispatch(loadRule(rule));
    return rule;
  }
};

export const updateRule = (payload, ruleId) => async (dispatch) => {
  const { title, description } = payload;
  const response = await fetch(`/api/rules/${ruleId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadRule(data));
    return data;
  }
};

export const deleteRule = (ruleId) => async (dispatch) => {
  const response = await fetch(`/api/rules/${ruleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeRule(ruleId));
    return data;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {};

export default function rulesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RULES: {
      return action.rules.Rules.reduce((rules, rule) => {
        rules[rule.id] = rule;
        return rules;
      }, {});
    }
    case LOAD_RULE: {
      return {
        ...state,
        [action.rule.id]: { ...action.rule },
      };
    }
    case DELETE_RULE:
      let removeState = { ...state };
      delete removeState[action.ruleId];
      return removeState;
    default:
      return state;
  }
}
