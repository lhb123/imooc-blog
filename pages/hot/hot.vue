<template>
  <view class="hot-container">
    <!-- 微信小程序的image组件 -->
    <image
      class="logo"
      src="@/static/images/logo.png"
      mode="aspectFit"
    />
    <view
      class="search-box"
      @click="onToSearch"
    >
      <my-search placeholder-text="uni-app 自定义组件" />
    </view>
    <view class="tab-sticky">
      <my-tabs
        :tab-data="tabData"
        :default-index="currentIndex"
        @tabClick="onTabClick"
      />
    </view>
    <!-- 可以通过swiper实现滑动效果 -->
    <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: currentSwiperHeight + 'px' }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        v-for="(tabItem, tabIndex) in tabData"
        :key="tabIndex"
        class="swiper-item"
      >
        <view>
          <uni-load-more
            v-if="isLoading"
            status="loading"
          />
          <block v-else>
            <hot-list-item
              :class="'hot-list-item-' + tabIndex"
              v-for="(item, index) of listData[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
            />
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
	import {
		getHotTabs,
		getHotListFromTabType
	} from '@/api/hot'
	export default {
		data() {
			return {
				// tab数据
				tabData: [],
				currentIndex: 0,
				isLoading: true,
				// 列表数据缓存
				listData: {},
				// 计算swiper的高度
				currentSwiperHeight: 0,
				swiperHeightData: [],
				// 当前的滚动距离
				currentPageScrollTop: 0
			};
		},
		created() {
			this.loadHotTabs()
		},
		/**
		 * 监听页面的滚动
		 */
		onPageScroll(res) {
			this.currentPageScrollTop = res.scrollTop
		},
		methods: {
			async loadHotTabs() {
				const res = await getHotTabs()
				this.tabData = res.data.list
				this.loadHotListFromTab()
			},
			async loadHotListFromTab() {
				// if (!this.listData[this.currentIndex]) {
				this.isLoading = true
				const id = this.tabData[this.currentIndex].id
				const {
					data: res
				} = await getHotListFromTabType(id)
				this.listData[this.currentIndex] = res.list
				this.isLoading = false
				// this.$nextTick会有兼容性问题
				setTimeout(async () => {
					// 计算list-item的总高度并做好缓存
					this.currentSwiperHeight = await this.getCurrentSwiperHeight()
					this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight
				}, 0)
				// }
			},
			onTabClick(index) {
				this.currentIndex = index
			},
			/**
			 * 跳转到search-blog
			 */
			onToSearch () {
				uni.navigateTo({
					url: '/subpkg/pages/search-blog/search-blog'
				})
			},
			onSwiperChange(e) {
				this.currentIndex = e.detail.current
				// 切换的时候页面高度滚到130
				if (this.currentPageScrollTop > 130) {
					uni.pageScrollTo({
						scrollTop: 130
					})
				}
			},
			/**
			 * swiper动画执行完成后的回调
			 */
			onSwiperEnd() {
				if (!this.listData[this.currentIndex]) {
					this.loadHotListFromTab()
					return
				}
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex]
			},
			getCurrentSwiperHeight() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this)
					let sum = 0
					query
						.selectAll(`.hot-list-item-${this.currentIndex}`)
						.boundingClientRect((res) => {
							res.forEach(item => {
								sum += item.height
							})
							resolve(sum)
						}).exec()
				})
			}
		}
	}
</script>

<style
	lang="scss"
	scoped
>
	.hot-container {
		background-color: $uni-bg-color;

		.logo {
			width: 100%;
			height: 80px;
		}

		.search-box {
			padding: 0 16px;
			margin-bottom: $uni-spacing-col-base;
		}

		.tab-sticky {
			position: sticky;
			top: 0;
			z-index: 99;
		}
	}
</style>
