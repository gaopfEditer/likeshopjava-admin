import request from '@/utils/request'import type {    CouponListQueryParamsType,    CouponFormParamsType,    CouponRecordListQueryParamsType,    CouponSendFormType} from "./coupon.d"/** * @return { Promise } * @param { CouponListQueryParamsType } params * @description 优惠券列表 */export function couponLists(params: CouponListQueryParamsType) {    return request.get({ url: '/marketing/coupon/list', params })}/** * @return { Promise } * @description 优惠券详情 * @param params */export function couponDetail(params: { id: number }) {    return request.get({ url: '/marketing/coupon/detail', params })}/** * @return { Promise } * @description 优惠券信息 * @param params */export function couponInfo(params: { id: number }) {    return request.get({ url: '/marketing/coupon/info', params })}/** * @return { Promise } * @param { CouponFormParamsType } params * @description 优惠券添加 */export function couponAdd(params: CouponFormParamsType) {    return request.post({ url: '/marketing/coupon/add', params })}/** * @return { Promise } * @param { CouponFormParamsType } params * @description 优惠券编辑 */export function couponEdit(params: CouponFormParamsType) {    return request.post({ url: '/marketing/coupon/edit', params })}/** * @return { Promise } * @param params * @description 优惠券命名 */export function couponRename(params: { id: number;name: string;sendTotal: number|string }) {    return request.post({ url: '/marketing/coupon/rename', params })}/** * @return { Promise } * @param params * @description 优惠券开始 */export function couponStart(params: { id: number }) {    return request.post({ url: '/marketing/coupon/start', params })}/** * @return { Promise } * @param params * @description 优惠券结束 */export function couponEnd(params: { id: number }) {    return request.post({ url: '/marketing/coupon/end', params })}/** * @return { Promise } * @param params * @description 优惠券删除 */export function couponDel(params: { id: number }) {    return request.post({ url: '/marketing/coupon/del', params })}/** * @return { Promise } * @param { CouponListQueryParamsType } params * @description 优惠券记录列表 */export function couponRecordLists(params: CouponRecordListQueryParamsType) {    return request.get({ url: '/marketing/coupon/record', params })}/** * @return { Promise } * @param params * @description 优惠券作废 */export function couponRepeal(params: { ids: number[] }) {    return request.post({ url: '/marketing/coupon/repeal', params })}/** * @return { Promise } * @param params * @description 发放优惠券 */export function couponSend(params: CouponSendFormType) {    return request.post({ url: '/user/sendCoupon', params })}