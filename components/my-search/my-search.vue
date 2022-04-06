<template>
  <view class="my-search-container">
    <uni-search-bar
      v-if="isShowInput"
      class="my-search-bar"
      :radius="100"
      :bg-color="config.backgroundColor"
      :placeholder="placeholderText"
      :value="value"
      @confirm="onSearch"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      @cancel="onCancel"
      @input="onInput"
    >
      <uni-icons
        slot="clearIcon"
        type="clear"
        color="#999999"
      />
    </uni-search-bar>
    <view
      v-else
      class="my-search-box"
    >
      <image
        class="icon"
        src="@/static/images/search.png"
      />
      <text class="placeholder">
        {{ placeholderText }}
      </text>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'MySearch',
		props: {
			// 输入的内容
			value: {
				type: String
			},
			// 是否显示输入框
			isShowInput: {
				type: Boolean,
				default: false
			},
			placeholderText: {
				type: String,
				default: '搜索'
			},
			// 配置对象
			config: {
				type: Object,
				default: () => ({
					height: '36px',
					backgroundColor: '#ffffff',
				  icon: '/static/images/search.png',
				  textColor: '#454545',
				  border: '1px solid #c9c9c9'
				})
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onSearch () {
				this.$emit('search', this.value)
			},
			onFocus () {
				this.$emit('focus', this.value)
			},
			onBlur () {
				this.$emit('blur', this.value)
			},
			onClear () {
				this.$emit('clear', this.value)
			},
			onCancel () {
				this.$emit('cancel', this.value)
			},
			onInput (val) {
				// 通知父组件
				// 手动实现v-model必须传入名称叫value的值，emit一个叫input是事件，值不可以更改
				// 满足该条件组件外可以直接用v-model传值
				this.$emit('input', val)
			}
		}
	}
</script>

<style
	lang="scss"
	scoped
>
	.my-search-container {
		display: flex;
		align-items: center;
		
		.my-search-bar {
			width: 100%;
		}

		.my-search-box {
			height: 36px;
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: 15px;
			border: 1px solid $uni-bg-color-border;
			display: flex;
			align-items: center;
			padding: 0 $uni-spacing-row-base;

			.icon {
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
			}

			.placeholder {
				font-size: $uni-font-size-sm;
				margin: $uni-spacing-row-sm;
				color: $uni-text-color-placeholder;
			}
		}
	}
</style>
