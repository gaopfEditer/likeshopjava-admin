<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <div class="flex flex-wrap">
                <div class="w-1/2 md:w-1/4">
                    <div class="leading-10">累计退款金额 (元)</div>
                    <div class="text-6xl">{{ refundData.totalRefundAmount }}</div>
                </div>
                <div class="w-1/2 md:w-1/4">
                    <div class="leading-10">退款中金额 (元)</div>
                    <div class="text-6xl">{{ refundData.ingRefundAmount }}</div>
                </div>
                <div class="w-1/2 md:w-1/4">
                    <div class="leading-10">退款成功金额 (元)</div>
                    <div class="text-6xl">{{ refundData.successRefundAmount }}</div>
                </div>
                <div class="w-1/2 md:w-1/4">
                    <div class="leading-10">退款失败金额 (元)</div>
                    <div class="text-6xl">{{ refundData.errorRefundAmount }}</div>
                </div>
            </div>
        </el-card>
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px] mt-[16px]" :model="queryParams" :inline="true">
                <el-form-item label="退款单号">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.sn"
                        placeholder="请输入退款单号"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="来源单号">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.orderSn"
                        placeholder="请输入来源单号"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="用户信息">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.keyword"
                        placeholder="请输入用户信息"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="退款类型">
                    <el-select class="w-[280px]" v-model="queryParams.refundType">
                        <el-option label="全部" value />
                        <el-option label="后台退款" :value="1" />
                        <el-option label="用户取消订单" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="记录时间">
                    <daterange-picker
                        value-format="x"
                        :second="true"
                        v-model:startTime="queryParams.startTime"
                        v-model:endTime="queryParams.endTime"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <!-- <export-data
                        class="ml-2.5"
                        :fetch-fun="refundRecord"
                        :params="queryParams"
                        :page-size="pager.size"
                    /> -->
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <el-tabs v-model="activeTab" @tab-change="handleTabChange">
                <el-tab-pane
                    v-for="(item, index) in tabLists"
                    :label="`${item.name}(${pager.extend[item.numKey] ?? 0})`"
                    :name="index"
                    :key="index"
                >
                    <el-table size="large" v-loading="pager.loading" :data="pager.lists">
                        <el-table-column label="退款单号" prop="sn" min-width="190" />
                        <el-table-column label="用户信息" min-width="160">
                            <template #default="{ row }">
                                <div class="flex items-center">
                                    <image-contain
                                        class="flex-none mr-2"
                                        :src="row.avatar"
                                        :width="40"
                                        :height="40"
                                        preview-teleported
                                        fit="contain"
                                    />
                                    {{ row.nickname }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="来源单号" prop="orderSn" min-width="190" />
                        <el-table-column label="退款金额" min-width="100">
                            <template #default="{ row }"> ¥ {{ row.refundAmount }} </template>
                        </el-table-column>

                        <el-table-column label="退款类型" prop="refundTypeMsg" min-width="100" />
                        <el-table-column label="退款状态" prop="" min-width="100">
                            <template #default="{ row }">
                                <el-tag type="warning" v-if="row.refundStatus == 0">
                                    {{ row.refundStatusMsg }}
                                </el-tag>
                                <el-tag v-if="row.refundStatus == 1">
                                    {{ row.refundStatusMsg }}
                                </el-tag>
                                <el-tag type="danger" v-if="row.refundStatus == 2">
                                    {{ row.refundStatusMsg }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="记录时间" prop="createTime" min-width="180" />
                        <el-table-column label="操作" width="180" fixed="right">
                            <template #default="{ row }">
                                <el-button
                                    v-perms="['finance:refund:log']"
                                    type="primary"
                                    link
                                    @click="handleShowRefundLog(row.id)"
                                >
                                    退款日志
                                </el-button>
                                <el-button
                                    v-if="row.refundStatus == 2"
                                    v-perms="['finance:recharger:refundAgain']"
                                    type="primary"
                                    link
                                    @click="handleRefund(row.id)"
                                >
                                    重新退款
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <refund-log v-model="showRefundLog" :refund-id="selectRefundId" />
    </div>
</template>
<script lang="ts" setup name="refundLists">
import { refundRecord, refundAgain } from '@/api/finance'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'
import RefundLog from './component/refund-log.vue'
const queryParams = reactive({
    sn: '',
    orderSn: '',
    keyword: '',
    refundType: '',
    startTime: '',
    endTime: '',
    type: ''
})
const showRefundLog = ref(false)
const selectRefundId = ref(0)
const activeTab = ref(0)
const tabLists = ref([
    {
        name: '全部',
        type: '',
        numKey: 'total'
    },
    {
        name: '退款中',
        type: 0,
        numKey: 'ing'
    },
    {
        name: '退款成功',
        type: 1,
        numKey: 'success'
    },
    {
        name: '退款失败',
        type: 2,
        numKey: 'error'
    }
])

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: refundRecord,
    params: queryParams
})

const refundData = computed(() => {
    return pager?.extend?.stat ?? {}
})

const handleRefund = async (id: number) => {
    await feedback.confirm('确认重新退款？')
    await refundAgain({
        id
    })
    feedback.msgSuccess('操作成功')
    getLists()
}

const handleShowRefundLog = async (id: number) => {
    showRefundLog.value = true
    selectRefundId.value = id
}
const handleTabChange = (index: any) => {
    queryParams.type = tabLists.value[index].type as string
    resetPage()
}

getLists()
</script>
