import mockRequest from '@/api/mockRequest'
import request from './request'

export const mockReqSongListClassifyList = () => mockRequest({
  url: 'songListClassifyList'
})

export const mockReqSongList = () => mockRequest({
  url: 'songList'
})
export const mockReqArtistList = () => mockRequest({
  url: 'artistList'
})
export const mockReqBannerList = () => mockRequest({
  url: 'bannerList'
})
// 获取首页轮播图信息
export const reqBannerList = () => request({
  url: '/banner'
})
// 获取歌单页面歌单信息
export const reqSongList = (params) => request({
  url: '/top/playlist',
  params
})
// 获取歌手页面歌手信息
export const reqArtistList = (params) => request({
  url: '/artist/list',
  params
})
// 获取首页推荐歌单
export const reqRecommendSongList = () => request({
  url: '/personalized?limit=8'
})
// 获取所有排行榜信息
export const reqRankingClassifyList = () => request({
  url: '/toplist'
})
// 获取排行榜详细信息（播放次数，收藏次数等）
export const reqRankingDetails = (params) => request({
  method: 'get',
  url: '/playlist/detail/dynamic',
  params
})
// 获取歌单内的歌
export const reqSongListSong = (params) => request({
  url: '/playlist/track/all',
  params
})
