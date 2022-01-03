export const linkReducer = (state, action) => {
    switch (action.type) {
        case "ADD_LOADING":
            return {
                ...state,
                add_loading: action.payload,
            };
        case "GET_LINKS":
            return {
                ...state,
                links: action.payload
            };
        case "ADD_LINK":
            return {
                ...state,
                links: [...state.links, action.payload]
            };
        case "GET_FOLDERS":
            return {
                ...state,
                folders: action.payload
            };
        case "ADD_FOLDER":
            return {
                ...state,
                folders: [...state.folders, action.payload]
            };
        case "VOTE":
            return {
                ...state,
                links: state.links.map(link => link.id === action.payload.id ? action.payload : link)
            };
      default:
        return state;
    }
}