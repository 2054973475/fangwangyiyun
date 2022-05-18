import {
  mockReqSongListClassifyList,
  mockReqSongList,
  reqSongList,
  mockReqArtistList,
  reqArtistList,
  mockReqBannerList,
  reqRecommendSongList,
  reqBannerList,
  reqRankingClassifyList,
  reqRankingDetails,
  reqSongListSong
} from '@/api'

export default ({
  namespaced: true,
  state: {
    // 歌单页面歌单小分类
    songListClassifyList: [],
    // 歌单页面歌单大分类
    songListClassifyListCategories: [],
    // 歌单页面歌单列表
    songList: {},
    // 歌手页面歌手列表
    artistList: [],
    // 首页轮播图
    bannerList: [],
    // 首页推荐歌单
    recommendSongList: [],
    // 排行榜页面，排行榜分类信息
    rankingClassifyList: [],
    // 排行榜详情信息
    rankingDetails: {},
    // 歌单中的歌列表
    songListSong: []
  },
  getters: {
  },
  mutations: {
    REQSONGLISTCLASSIFYLIST (state, value) {
      state.songListClassifyList = value.sub
      state.songListClassifyListCategories = value.categories
    },
    REQSONGLIST (state, value) {
      state.songList = value
    },
    REQARTISTLIST (state, value) {
      state.artistList = value
    },
    REQBANNERLIST (state, value) {
      state.bannerList = value
    },
    REQRECOMMENDSONGLIST (state, value) {
      state.recommendSongList = value
    },
    REQRANKINGCLASSIFYLIST (state, value) {
      state.rankingClassifyList = value
    },
    REQRANKINGDETAILS (state, value) {
      state.rankingDetails = value
    },
    REQSONGLISTSONG (state, value) {
      state.songListSong = value
    }
  },
  actions: {
    async mockReqSongListClassifyList (content, value) {
      const { data: { sub, categories } } = await mockReqSongListClassifyList()
      content.commit('REQSONGLISTCLASSIFYLIST', { sub, categories })
    },
    async mockReqSongList (content, value) {
      const params = {
        order: 'new',
        cat: '全部',
        limit: 35,
        offset: 0
      }
      Object.assign(params, value)
      const { data } = await mockReqSongList(params)
      content.commit('REQSONGLIST', data)
    },
    async reqSongList (content, value) {
      const params = {
        order: 'new',
        cat: '全部',
        limit: 35,
        offset: 0
      }
      Object.assign(params, value)
      const { data } = await reqSongList(params)
      content.commit('REQSONGLIST', data)
    },
    async mockReqArtistList (content, value) {
      const params = {
        limit: '100',
        type: '1',
        initial: '-1',
        area: '7'
      }
      Object.assign(params, value)
      const { data: { artists } } = await mockReqArtistList(params)
      content.commit('REQARTISTLIST', artists)
    },
    async reqArtistList (content, value) {
      const params = {
        limit: '100',
        type: '1',
        initial: '-1',
        area: '7'
      }
      Object.assign(params, value)
      const { data: { artists } } = await reqArtistList(params)
      content.commit('REQARTISTLIST', artists)
    },
    async mockReqBannerList (content, value) {
      const { data: { banners } } = await mockReqBannerList()
      content.commit('MOCKREQBANNERLIST', banners)
    },
    async reqBannerList (content, value) {
      const { data: { banners } } = await reqBannerList()
      content.commit('REQBANNERLIST', banners)
    },
    async reqRecommendSonglist (content, value) {
      const { data: { result } } = await reqRecommendSongList()
      content.commit('REQRECOMMENDSONGLIST', result)
    },
    async reqRankingClassifyList (content, value) {
      const { data: { list } } = await reqRankingClassifyList()
      content.commit('REQRANKINGCLASSIFYLIST', list)
    },
    async reqRankingDetails (content, value) {
      const params = {
        id: 0
      }
      Object.assign(params, value)
      const { data } = await reqRankingDetails(params)
      content.commit('REQRANKINGDETAILS', data)
    },
    async reqSongListSong (content, value) {
      const params = {
        id: '',
        limit: 100,
        offset: 0
      }
      Object.assign(params, value)
      const { data: { songs } } = await reqSongListSong(params)
      content.commit('REQSONGLISTSONG', songs)
    }
  }

})
