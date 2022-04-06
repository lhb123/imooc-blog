<template>
	<view class="search-blog-container">
		<view>
			<view class="search-bar-box">
				<my-search
					:is-show-input="true"
					:placeholderText="defaultText"
					v-model="searchVal"
					:config="{
							backgroundColor: '#f1f0f3'
						}"
					@search="onSearchConfirm"
					@focus="onSearchFocus"
					@blur="onSearchBlur"
					@clear="onSearchClear"
					@cancel="onSearchCancel"
				/>
			</view>
		</view>
		<!-- 热搜列表 -->
		<view
			class="search-hot-list-box card"
			v-if="showType === HOT_LIST"
		>
			<search-hot-list @onSearch="onSearchConfirm"></search-hot-list>
		</view>
		<!-- 搜索历史 -->
		<view
			class="search-hisroty-box"
			v-if="showType === SEARCH_HISTORY"
		>
			123
			<search-histroy></search-histroy>
		</view>
		<!-- 搜索结果 -->
		<view
			class="search-result-list-box"
			v-if="showType === SEARCH_RESULT"
		>
			<search-result-list></search-result-list>
		</view>
	</view>
</template>

<script>
	import {
		getDefaultText
	} from '@/api/search'
	// 热搜列表
	const HOT_LIST = '0'
	// 搜索历史
	const SEARCH_HISTORY = '1'
	// 搜索结果
	const SEARCH_RESULT = '2'
	export default {
		name: 'SearchBlog',
		data() {
			return {
				// 输入框的内容
				searchVal: '',
				defaultText: '',
				// 默认情况下 || 点击了输入框的取消按钮，显示【热搜列表】
				// 当searchBar获取焦点时 || 点击输入框清空按钮时，显示【搜索历史】
				// 用户点击热搜列表 item || 用户点击搜索历史 item || 用户按下搜索键，显示【搜索结果】
				HOT_LIST,
				SEARCH_HISTORY,
				SEARCH_RESULT,
				showType: HOT_LIST,
			};
		},
		created() {
			this.loadDefaultText()
		},
		methods: {
			/**
			 * 获取推荐搜索文本
			 */
			async loadDefaultText() {
				const {
					data: res
				} = await getDefaultText()
				this.defaultText = res.defaultText
			},
			onSearchConfirm(val) {
				// 不存在取placeholder里的默认推荐
				this.searchVal = val || this.defaultText
				if (this.searchVal) {
					this.showType = SEARCH_RESULT
				}
			},
			onSearchFocus(val) {
				this.showType = SEARCH_HISTORY
			},
			onSearchBlur(val) {

			},
			onSearchClear(val) {
				this.showType = SEARCH_HISTORY
			},
			onSearchCancel(val) {
				this.showType = HOT_LIST
			}
		}
	}
</script>

<style lang="scss">
	.search-blog-container {
		background-color: $uni-bg-color;

		.search-bar-box {
			padding: $uni-spacing-row-sm;
			position: sticky;
			top: 0px;
			z-index: 9;

			/deep/ .uni-searchbar {
				padding: 0;
			}
		}
	}
</style>
