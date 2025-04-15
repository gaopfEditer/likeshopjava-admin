import request from '@/utils/request'import type { SeckillListQueryParamsType, SeckillFormParamsType } from "./seckill.d"/** * @return { Promise } * @param { SeckillListQueryParamsType } params * @description 秒杀列表 */export function seckillLists(params: SeckillListQueryParamsType) {    return request.get({ url: '/marketing/seckill/list', params })}/** * @return { Promise } * @description 秒杀详情 * @param params */export function seckillDetail(params: { id: number }) {    return request.get({ url: '/marketing/seckill/detail', params })}/** * @return { Promise } * @param { SeckillFormParamsType } params * @description 秒杀添加 */export function seckillAdd(params: SeckillFormParamsType) {    return request.post({ url: '/marketing/seckill/add', params })}/** * @return { Promise } * @param { SeckillFormParamsType } params * @description 秒杀编辑 */export function seckillEdit(params: SeckillFormParamsType) {    return request.post({ url: '/marketing/seckill/edit', params })}/** * @return { Promise } * @param params * @description 秒杀发布 */export function seckillRelease(params: { id: number }) {    return request.post({ url: '/marketing/seckill/release', params })}/** * @return { Promise } * @param params * @description 秒杀开始 */export function seckillStart(params: { id: number }) {    return request.post({ url: '/marketing/seckill/start', params })}/** * @return { Promise } * @param params * @description 秒杀结束 */export function seckillEnd(params: { id: number }) {    return request.post({ url: '/marketing/seckill/end', params })}/** * @return { Promise } * @param params * @description 秒杀删除 */export function seckillDel(params: { id: number }) {    return request.post({ url: '/marketing/seckill/del', params })}