<template>
  <view class="item-container">
    <view class="item-box">
      <view class="item-box-left">
        <hot-ranking :ranking="ranking" />
      </view>
      <view class="item-box-right">
        <view class="item-title line-clamp-2">
          {{ data.title }}
        </view>
        <view class="item-desc line-clamp-2">
          {{ data.desc }}
        </view>
        <view class="item-bottom-box">
          <text class="item-author">
            {{ data.nickname }}
          </text>
          <view class="hot-box">
            <image
              class="hot-icon"
              src="@/static/images/hot-icon.png"
              mode="scaleToFill"
            />
            <text class="hot-text">
              {{ data.views | hotNumber }}热度
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'HotListItem',
		props: {
			data: {
				type: Object,
				required: true
			},
			ranking: {
				type: Number,
				require: true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style
	lang="scss"
	scoped
>
	.item-container {
		padding-bottom: $uni-spacing-col-lg;

		.item-box {
			display: flex;
			margin: 0 $uni-spacing-row-base;
			padding: $uni-spacing-col-lg $uni-spacing-col-base;
			background: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);

			.item-box-left {
				margin-right: $uni-spacing-row-sm;
			}

			.item-box-right {
				width: 100%;

				.item-title {
					font-size: $uni-font-size-lg;
					font-weight: bold;
					color: $uni-text-color-title;
				}

				.item-desc {
					padding-top: $uni-spacing-col-sm;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
				}

				.item-bottom-box {
					margin-top: $uni-spacing-col-sm;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item-author {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}

					.hot-box {
						.hot-icon {
							width: $uni-img-size-sm;
							height: $uni-img-size-sm;
						}

						.hot-text {
							margin-left: $uni-spacing-row-sm;
							font-size: $uni-font-size-sm;
							color: $uni-text-color-hot;
						}
					}
				}
			}
		}
	}
</style>
