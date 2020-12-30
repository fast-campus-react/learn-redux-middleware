import { call, put } from "redux-saga/effects";

export const createPromiseThunk = (type, promiseCreater) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const thunkCreator = (param) => async (dispatch) => {
    dispatch({ type });
    try {
      const payload = await promiseCreater(param);
      dispatch({ type: SUCCESS, payload });
    } catch (error) {
      dispatch({ type: ERROR, payload: error, error: true });
    }
  };

  return thunkCreator;
};

export const createPromiseSaga = (type, promiseCreater) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      const result = yield call(promiseCreater, action.payload);
      yield put({
        type: SUCCESS,
        payload: result,
      });
    } catch (error) {
      yield put({
        type: ERROR,
        payload: error,
        error: true,
      });
    }
  };
};

const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (
  type,
  promiseCreater,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const thunkCreator = (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreater(param);
      dispatch({ type: SUCCESS, payload, meta: id });
    } catch (error) {
      dispatch({ type: ERROR, payload: error, error: true, meta: id });
    }
  };

  return thunkCreator;
};

export const createPromiseSagaById = (type, promiseCreater) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const result = yield call(promiseCreater, action.payload);
      yield put({
        type: SUCCESS,
        payload: result,
        meta:id,
      });
    } catch (error) {
      yield put({
        type: ERROR,
        payload: error,
        error: true,
        meta:id,
      });
    }
  };
};

export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return { ...state, [key]: reducerUtils.success(action.payload) };
      case ERROR:
        return { ...state, [key]: reducerUtils.error(action.payload) };
      default:
        return state;
    }
  };
};

export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null
            ),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
