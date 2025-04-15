// 商品列表查询参数类型export type GoodsListQueryParamsType = {    name: string            //	query	string  否	搜索商品名称    code: string            //	query	string  否	搜索code    categoryId: string      //	query	string  否	搜索商品分类    type?: number | string  //	query	integer 否	搜索商品状态0 仓库中 1销售 不传则不搜索}// 商品表单参数类型export type GoodsFormParamsType = {    id?: number | string            //	query	number  是	商品编辑时    name: string                    //	query	string  是	商品名称    code: string                    //	query	string  是	商品货号    description?: string            //	query	string  是	商品描述    categoryId: number[]            //	query	array[integer]  是	商品分类[1,2,3]    goodsImage: string[]            //	query	array[string]  是	商品轮播图[1,2,3]    videoStatus?: number            //	query	integer 否	是否添加视频0 否 1是    videoSource: number             //	query	integer 否	视频来源 1素材库 2链接 video_is 1时必填    videoCover: string              //	query	string  否	视频封面    video: string                   //	query	string  否	视频地址 video_is 1时必填    specType: number                //	query	integer 是	规格类型 0单规格 1多规格    specValueList?: SkuItemList[]   //  query   array   否  规格名    specValue?: SkuNameList[]       //  query   array   否  规格项    expressType: number             //	query	integer 是	运费设置 1包邮 2运费模板    expressTemplateId: string       //	query	string  否	运费模板ID express_type=1时必须    content: string                 //	query	string  是	商品详情    stockWarning: number | string   //	query	integer 否	库存预警    virtualSalesNum: number | string//	query	integer 否	虚拟销量    virtualClickNum: number | string//	query	integer 否	虚拟浏览量    sort: number                    //	query	integer 否	排序    status: number                  //	query	integer 是	状态 0仓库 1上架}export type SkuNameValue = {    value: string    image: string}export type SkuNameList = {    name: string    specList: SkuNameValue[]    hasImage?: number}export type SkuItemList = {    id?: number | string    ids?: string    image?: string    skuValueIds: string    skuValueArr: string    price: string    linePrice: string    marketPrice: string    stock: number | string    weight: number    volume: string    code: string}