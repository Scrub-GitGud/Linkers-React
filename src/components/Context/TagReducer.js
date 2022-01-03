export const tagReducer = (state, action) => {
    switch (action.type) {
        case "ADD_LOADING":
            return {
                ...state,
                add_loading: action.payload,
            };
        case "GET_TAGS":
            return {
                ...state,
                tags: action.payload
            };
        case "ADD":
            return {
                ...state,
                tags: [...state.tags, action.payload]
            };
      default:
        return state;
    }
}