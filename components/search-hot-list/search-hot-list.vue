<template>
	<view class="search-hot-list-container">
		<!-- 标题 -->
		<view class="search-hot-title">慕课热搜 - 全网技术 一网打尽</view>
		<!-- 列表 -->
		<block
			v-for="(item, index) in hotList"
			:key="index"
		>
			<view class="search-hot-item" @click="onItemClick(item)">
				<!-- 序号 -->
				<hot-ranking :ranking="index + 1"></hot-ranking>
				<!-- 文本 -->
				<text class="title line-clamp">{{ item.label }}</text>
				<!-- hot-item -->
				<image
					class="search-hot-icon"
					src="@/static/images/hot-icon.png"
				></image>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		getSearchHotList
	} from '@/api/search.js'
	export default {
		name: "SearchHotList",
		data() {
			return {
				hotList: []
			};
		},
		created() {
			this.loadSearchHotList()
		},
		methods: {
			async loadSearchHotList() {
				const {
					data: res
				} = await getSearchHotList()
				this.hotList = res.list
			},
			onItemClick (item) {
				this.$emit('onSearch', item.label)
			}
		}
	}
</script>

<style
	lang="scss"
	scoped
>
	.search-hot-list-container {

		.search-hot-title {
			font-weight: bold;
			font-size: $uni-font-size-base;
			color: $uni-text-color-hot;
			padding: 0 $uni-spacing-col-lg $uni-spacing-col-lg $uni-spacing-col-lg;
			margin: 0 -12rpx $uni-spacing-col-lg - 12rpx;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, .1);
		}

		.search-hot-item {
			display: flex;
			align-items: center;
			padding: $uni-spacing-col-lg 0;

			.title {
				color: $uni-text-color;
				font-size: $uni-font-size-base;
				margin: 0 $uni-spacing-row-base;
			}

			.search-hot-icon {
				width: 14rpx;
				height: 14rpx;
			}
		}
	}
</style>
