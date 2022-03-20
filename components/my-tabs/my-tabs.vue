<template>
  <view class="tab-container">
    <view class="tab-box">
      <scroll-view
        scroll-x
        class="scroll-view"
        scroll-with-animation
        :scroll-left="scrollLeft"
      >
        <view class="scroll-content">
          <view class="tab-item-box">
            <block
              v-for="(item, index) in tabData"
              :key="index"
            >
              <view
                :id="'_tab_' + index"
                class="tab-item"
                :class="{ &quot;tab-item-active&quot;: activeIndex == index }"
                @click="onTabClick(index)"
                :style="{
                  color: activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor
                }"
              >
                {{ item.label || item }}
              </view>
            </block>
          </view>
          <view
            class="underLine"
            :style="{
              transform: 'translateX(' + slider.left + 'px)',
              width: defaultConfig.underLineWidth + 'px',
              height: defaultConfig.underLineHeight + 'px',
              color: defaultConfig.underLineColor
            }"
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'MyTabs',
		props: {
			config: {
				type: Object,
				default: () => ({})
			},
			tabData: {
				type: Array,
				default: () => []
			},
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [],
				activeIndex: -1,
				slider: {
					left: 0
				},
				scrollLeft: 0,
				defaultConfig: {
					textColor: '#333',
					activeTextColor: '#f94d2a',
					underLineWidth: 24,
					underLineHeight: 2,
					underLineColor: '#f94d2a'
				}
			};
		},
		methods: {
			/**
			 * 计算滑块下划线的位置
			 */
			updateTabWidth() {
				let data = this.tabList
				if (data.length == 0) return
				const query = uni.createSelectorQuery().in(this)
				data.forEach((item, index) => {
					query.select('#_tab_' + index)
						.boundingClientRect((res) => {
							// 这是拿到的DOM
							item._slider = {
								left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
							}
							if (data.length - 1 == index) {
								this.tabToIndex()
							}
						})
						.exec()
				})
			},
			onTabClick(index) {
				this.activeIndex = index
				this.tabToIndex()
				this.$emit('tabClick', index)
			},
			tabToIndex() {
				if (!this.tabList.length) return
				const index = this.activeIndex
				this.slider = this.tabList[index]._slider
				this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth
			}
		},
		watch: {
			config: {
				handler(val) {
					this.defaultConfig = Object.assign({}, this.defaultConfig, val)
				},
				immediate: true
			},
			tabData: {
				handler(val) {
					this.tabList = val
					setTimeout(_ => {
						this.updateTabWidth()
					}, 0)
				},
				immediate: true
			},
			defaultIndex: {
				handler(val) {
					this.activeIndex = val
					this.tabToIndex()
				},
				immediate: true
			}
		}
	}
</script>

<style
	lang="scss"
	scoped
>
	.tab-container {
		font-size: $uni-font-size-base;
		height: 45px;
		background-color: $uni-bg-color;

		.tab-box {
			width: 100%;
			height: 45px;
			line-height: 45px;
			display: flex;
			position: relative;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.scroll-content {
					width: 100%;
					height: 100%;
					position: relative;

					.tab-item-box {
						height: 100%;

						.tab-item {
							height: 100%;
							display: inline-block;
							text-align: center;
							padding: 0 15px;
							position: relative;
							color: $uni-text-color;

							&-active {
								color: $uni-text-color-hot;
							}
						}
					}

					.underLine {
						height: 2px;
						width: 24px;
						background-color: $uni-text-color-hot;
						border-radius: 3px;
						transition: .5s;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
</style>
