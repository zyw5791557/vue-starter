/**
* @constant state - Vuex状态
**/

const state = {
	currentEnvValue: 1,
	EnvOptions: [
		{
			value: 1,
          	label: '开发'
		},
		{
			value: 2,
          	label: '测试'
		},
		{
			value: 3,
          	label: '预发'
		},
		{
			value: 4,
          	label: '正式'
		}
	],
	iconEditDialogState: false
};

export default state;