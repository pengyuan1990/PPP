* 针对多个相同组件，同时存在多个数据源，针对每个组件设置一个key。否则第一个组件的数据切换会存在组件复用的情况（待定）
* vue禁止对“引用类型” 对象进行双向绑定操作，因为修改父子组件修改都会导致值的变化，而且数据同步还可能存在问题，尤其是异步加载的数据根本不知道渲染时机。
