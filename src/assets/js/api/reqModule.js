import base from "./baseUrl"
import Qs from 'qs'
import common from "../common";

export default (($axios) => {
  const appList = {
    getAppLists(params) {
      return $axios.get(`${base.getAppLists}`, { params: params, })//headers: {'Accept-Language':'en'}
    },
    getAppDetail(id) {
      return $axios.get(`${base.getAppDetail}/${id}`,)
    },
    getAppCountData(params) {
      return $axios.get(`${base.getAppCountData}`, { params: params, })
    },
    getAppListsHeartNum(params) {
      return $axios.get(`${base.getAppListsHeartNum}`, { params: params },)
    },
  }

  const user = {
    setUserInfo(params) {
      return $axios.post(`${base.setUserInfo}`, params, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })//,'Accept-Language':'zh-CN'
    },
    getUserInfo(params) {
      return $axios.get(`${base.getUserInfo}`, { params: params })
    },
    getUserInfoB(params) {
      return $axios.get(`${base.getUserInfoB}`, { params: params })
    },
    setCommentsLists(params) {
      return $axios.post(`${base.setCommentsLists}`, JSON.stringify(params), { headers: { 'Content-Type': 'application/json;charset=utf-8' } })//,'Accept-Language':'zh-CN'
    },
    getCommentsLists(params) {
      return $axios.get(`${base.getCommentsLists}`, { params: params })
    },
  }

  const blog = {
    getBolgLists(params) {
      return $axios.get(`${base.getBlogLists}`, { params: params })
    },
    getBlogDetailedInfo(id, params) {
      return $axios.get(`${base.getBlogDetailedInfo}/${id}`, { params: params })
    },
    getBlogHot(params) {
      return $axios.get(`${base.getBlogHot}`, { params: params })
    }
  }

  const gradeCoin = {
    getGradeCoin(params) {
      return $axios.get(`${base.getGradeCoin}`, { params: params })
    },
    getGradeCoinDetail(params) {
      return $axios.get(`${base.getGradeCoinDetail}/${params}`)
    }
  }

  const webSite = {
    getWebsite(params) {
      return $axios.get(`${base.getWebsite}`, { params: params })
    }
  }

  const cartoon = {
    getCartoon(params) {
      return $axios.get(`${base.getCartoon}`, { params: params })
    },
    getCartoonDetail(params) {
      return $axios.get(`${base.getCartoonDetail}`, { params: params })
    },
    getCartoonLook(params) {
      return $axios.get(`${base.getCartoonDetail}/${params.belong}/${params.id}`)
    },
    getCartoonChapters(params) {
      return $axios.get(`${base.getCartoonChapters}`, { params: params })
    },
    getCartoonRanking(params) {
      return $axios.get(`${base.getCartoonRanking}`, { params: params })
    }
  }

  const image = {
    getImage(params) {
      return $axios.get(`${base.getImage}`, { params: params })
    },
    getImageDetail(params) {
      return $axios.get(`${base.getImageDetail}`, { params: params })
    }
  }

  const slide = {
    getSlide(params) {
      return $axios.get(`${base.getSlide}`, { params: params })
    }
  }

  const bulletin = {
    getBulletin(params) {
      return $axios.get(`${base.getBulletin}`, { params: params })
    }
  }
  return { appList, user, blog, gradeCoin, webSite, cartoon, image, bulletin, slide }
})



