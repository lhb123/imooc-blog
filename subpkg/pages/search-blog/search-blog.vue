<template>
  <view>
    <div class="search-blog-container">
      <view>
        <view class="search-bar-box">
          <my-search :is-show-input="true" />
        </view>
      </view>
    </div>
  </view>
</template>

<script>
	export default {
		name: 'SearchBlog',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-blog-container {
	.search-bar-box {
		background-color: $uni-bg-color;
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
