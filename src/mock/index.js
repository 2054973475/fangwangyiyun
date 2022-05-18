import Mock from 'mockjs'
import songListClassifyList from '@/mock/songListClassifyList'
import songList from '@/mock/songList'
import artistList from '@/mock/artistList'
import bannerList from '@/mock/bannerList'
Mock.mock('/mock/songListClassifyList', songListClassifyList)
Mock.mock('/mock/songList', songList)
Mock.mock('/mock/artistList', artistList)
Mock.mock('/mock/bannerList', bannerList)
