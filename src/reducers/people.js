import axios from 'axios';

const FETCH_PEOPLE_START = 'FETCH_PEOPLE_START';
const FETCH_PEOPLE_SUCCEED = 'FETCH_PEOPLE_SUCCEED';
const FETCH_PEOPLE_FAILED = 'FETCH_PEOPLE_FAILED';

const fetchStart = () => {
    return {
        type: FETCH_PEOPLE_START
    }
}

const fetchSucceed = (res) => {
    return {
        type: FETCH_PEOPLE_SUCCEED,
        data: res
    }
}

const fetchFailed = (err) => {
    return {
        type: FETCH_PEOPLE_FAILED,
        error: err
    }
}

const fetchPeople = () => {
    return (dispatch) => {
        dispatch(fetchStart())
        return axios.get('https://swapi.co/api/people')
            .then(res => {
                dispatch(fetchSucceed(res.data.results));
            })
            .catch(err => {
                dispatch(fetchFailed(err))
            })
    }
}

let initialState = {
    isFetching: false,
    isSucceed: false,
    isFailed: false,
    data: null,
    error: null
}

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PEOPLE_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_PEOPLE_SUCCEED:
            return {
                ...state,
                isSucceed: true,
                data: action.data
            };
        case FETCH_PEOPLE_FAILED:
            return {
                ...state,
                isFailed: true,
                error: action.error
            };
        default:
            return state;
    }
};

export {
    peopleReducer,
    fetchPeople
}
