//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/swiper01.jpg',
      '/images/swiper02.jpg',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    //proList: null,
    proList: [
      {
        logo: '/images/pro_01.jpg',
        title: 'test1',
        desc:'描述1'
      },
      {
        logo: '/images/pro_01.jpg',
        title: 'test2',
        desc: '描述2'
      },
      {
        logo: '/images/pro_01.jpg',
        title: 'test3',
        desc: '描述3'
      }
    ]
  },  
  onLoad: function () { 
    this.setData({
      test: '01'
    })
    //this.getProList()
  },
  toDetail: function(e){
    console.log(e)    
    var index = e.currentTarget.dataset.index
    var proList = this.data.proList
    var title = proList[index].title
    wx.setStorageSync('title', title)
    wx.navigateTo({
      // url: '/pages/detail/detail?title='+title
      url: '/pages/detail/detail'
    })
  },
  getProList: function(){
    var self = this
    console.log(app.globalData.host)
    // app.globalData.host='test'
    wx.request({
      url: app.globalData.host,
      method:'GET',
      success: function(res){
        console.log(res)
        self.setData({
          proList: res.data
        })
      },
      fail: function(){
      }
    })
  },
  copy: function(){
    if(wx.setClipboardData){
      wx.setClipboardData({
        data: '这是我要复制的内容2222',
        success(res) {
          wx.getClipboardData({
            success(res) {
              wx.showModal({
                title: '复制成功',
                content: '内容已经复制成功！'
              })
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您的微信版本太低，请升级！'
      })
    }    
  }
})
