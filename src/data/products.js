// 公共商品数据 —— 首页和分类页共用
// id 唯一标识，用于详情页查询
// 图片来源：Unsplash (免费商用)
const products = [
  {
    id: 1,
    title: 'HUAWEI Mate 70 RS 非凡大师',
    price: '11999',
    img: require('../assets/free/phone1.jpg'),
    type: '华为',
    content: '科技与奢华的极致融合',
    desc: '人工智能第一产品'
  },
  {
    id: 2,
    title: 'OPPO Find X8 Pro',
    price: '5299',
    img: require('../assets/free/phone2.jpg'),
    type: 'OPPO',
    content: '影像旗舰机',
    desc: '拍照好看杠杠的'
  },
  {
    id: 3,
    title: 'vivo X200 Pro',
    price: '5299',
    img: require('../assets/free/phone3.jpg'),
    type: 'vivo',
    content: '拍照性能都很好',
    desc: '主打好看'
  },
  {
    id: 4,
    title: 'iPhone 16 Pro Max',
    price: '9999',
    img: require('../assets/free/phone4.jpg'),
    type: '苹果',
    content: '水果手机是大牌子666',
    desc: '水果手机大家都说好'
  },
  {
    id: 5,
    title: '三星W25',
    price: '15999',
    img: require('../assets/free/phone5.jpg'),
    type: '三星',
    content: '折叠屏奢华大佬的选择',
    desc: '折叠屏大佬用的'
  },
  {
    id: 6,
    title: '荣耀Magic7 Pro',
    price: '5699',
    img: require('../assets/free/phone6.jpg'),
    type: '荣耀',
    content: '人工智能创新典范',
    desc: '人工智能第二产品'
  },
  {
    id: 7,
    title: 'iQOO 13',
    price: '3999',
    img: require('../assets/free/phone7.jpg'),
    type: '其他',
    content: '电竞旗舰性能爆棚',
    desc: '打游戏专用'
  },
  {
    id: 8,
    title: '小米15pro',
    price: '5299',
    img: require('../assets/free/phone8.jpg'),
    type: '其他',
    content: '高性价比旗舰代表',
    desc: '性价比最好,雷总的机子'
  },
  {
    id: 9,
    title: '魅族20 INFINITY 无界版',
    price: '4299',
    img: require('../assets/free/phone9.jpg'),
    type: '魅族',
    content: '极致美学外观美美美',
    desc: '外观超级好看'
  },
  {
    id: 10,
    title: 'ROG 游戏手机9 Pro',
    price: '6299',
    img: require('../assets/free/phone10.jpg'),
    type: '其他',
    content: '电竞王者专属神器',
    desc: '王者荣耀专属手机'
  }
]

// 根据 id 查找商品
export function getProductById(id) {
  return products.find(p => p.id === Number(id))
}

// 模糊搜索（标题 + 描述）
export function searchProducts(keyword, list = products) {
  if (!keyword || !keyword.trim()) return list
  const kw = keyword.trim().toLowerCase()
  return list.filter(p =>
    p.title.toLowerCase().includes(kw) ||
    p.content.toLowerCase().includes(kw) ||
    p.type.toLowerCase().includes(kw)
  )
}

// 按分类筛选
export function filterByType(type, list = products) {
  if (!type) return list
  return list.filter(p => p.type === type)
}

export default products
