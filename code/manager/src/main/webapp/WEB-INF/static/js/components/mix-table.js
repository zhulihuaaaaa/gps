
/**
 * 混合el-table
 * 对父组件传入的el-table-column根据配置重新生成
 * @author Spark
 * @returns
 */
define(function () {
	return {
		functional: true,
		render: function (h, context) {
			function getTableColumns () {
				var slots = context.children
				if (context.props.id && context.props.gridConfig.length > 0) {
					var gridConfig = context.props.gridConfig
					var columnsNodes = []
					var index = 0
					for (var column of gridConfig) {
						if (column.show) {
							for (var node of slots) {
								if (node.componentOptions != null
										&& node.componentOptions.tag === 'el-table-column') {
									if (node.componentOptions.propsData.prop === column.prop) {
										if (column.width) {
											node.componentOptions.propsData.width = column.width
										}
										if (column.minWidth) {
											node.componentOptions.propsData.minWidth = column.minWidth
										}
										if (index === 0) {
											node.componentOptions.propsData['className'] = 'first-col--text'
//											node.componentOptions.propsData['fixed'] = 'left'
										} else {
											delete node.componentOptions.propsData['className']
										}
										columnsNodes.push(node)
										break
									}
								}
							}
							index++
						}
					}
					return columnsNodes
				} else {
					return slots
				}
			}
			return h('template', context.data, getTableColumns())
		}
	}
})