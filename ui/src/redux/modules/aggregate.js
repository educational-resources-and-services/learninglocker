import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

const SET_STATEMENT_AGGREGATE = 'learninglocker/statments/SET_STATEMENT_AGGREGATE';

/*
 * Reducers
 */
const handler = handleActions({
  [SET_STATEMENT_AGGREGATE]: (state, action) => {
    const { aggregate } = action;
    return state.set('aggregate', aggregate);
  }
});

const initialState = fromJS({
  aggregate: {}
});
export default function reducer(state = initialState, action = {}) {
  if (!Map.isMap(state)) return reducer(fromJS(state), action); // ensure immutability
  return handler(state, action);
}

/*
 * Actions
 */
export const updateStatementAggregate = aggregate => ({
  type: SET_STATEMENT_AGGREGATE,
  aggregate
});
export const actions = {
  updateStatementAggregate
};

/*
 * Selectors
 */
export const statementAggregateSelector = createSelector(
  [state => state],
  state => state.aggregate.get('aggregate', new Map())
);

export const sagas = [];
