import * as types from './mutation-types';

const mutations = {
	[types.SET_ENV_VALUE] (state, n) {
		state.currentEnvValue = n;
	},
	[types.SET_ICON_EDIT_DIALOG_STATE] (state, boolean) {
		state.iconEditDialogState = boolean;
	}
};

export default mutations;