// utilities
import Store from '../utilities/store';
import {http, get, post, put, remove} from '../utilities/http';

// actions
import loginActions from '../actions/login';

// stores
import loginStore from './login';

// instances
import dispatcher from '../dispatchers/main';
import constants from '../constants/main';
import actions from '../actions/main';

const _state = {
	login: loginStore.getState(),
	apps: []
};

class MainStore extends Store {
	constructor () {
		super();
	}

	getState () {
		return _state;
	}
}

const store = new MainStore();

dispatcher.register(action => {
	console.info('main-store', action.type);

	switch (action.type) {
		case constants.HYDRATE:
			_state.apps = action.data.apps;
			loginActions.hydrate(action.data.login);
		break;
		case constants.UPDATE_APPS:
			_state.apps = action.data;
		break;
	}

	store.emitChange();
});

// subscribe to other stores
loginStore.addChangeListener(() => {
	_state.login = loginStore.getState();
	store.emitChange();
});

export default store;
