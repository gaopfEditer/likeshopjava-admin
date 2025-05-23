<template>
    <div>
        <el-form label-width="70px">
            <el-form-item label="分类样式">
                <el-button
                    type="primary"
                    :link="true"
                    @click="handleTrigger"
                >{{ getTypeValue }}</el-button>
            </el-form-item>
            <el-form-item label="分类广告">
                <div class="flex-1">
                    <div class="form-tips">通用图，建议尺寸：512*220px</div>
                    <div>
                        <el-radio-group v-model="content.enabled">
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="0">停用</el-radio>
                        </el-radio-group>
                    </div>
                    <del-wrap
                        v-for="(item, index) in content.data"
                        :key="index"
                        @close="handleDelete(index)"
                        class="max-w-[400px]"
                    >
                        <div class="w-full p-4 mt-4 bg-fill-light">
                            <el-form-item label="背景图片">
                                <material-picker
                                    v-model="item.image"
                                    upload-class="bg-body"
                                    :exclude-domain="true"
                                />
                            </el-form-item>
                            <el-form-item label="图片名称" class="mt-4">
                                <el-input
                                    v-model="item.name"
                                    placeholder="请输入名称"
                                />
                            </el-form-item>
                            <el-form-item class="mt-[18px]" label="图片链接">
                                <link-picker v-model="item.link" />
                            </el-form-item>
                        </div>
                    </del-wrap>
                </div>
            </el-form-item>
            <el-form-item v-if="content.data?.length < limit">
                <el-button type="primary" @click="handleAdd">添加图片</el-button>
            </el-form-item>
        </el-form>

        <type-select
            v-if="showEdit"
            ref="typeSelectRef"
            @success="(val) => content.type = val"
            @close="showEdit = false"
        ></type-select>
    </div>
</template>
<script lang="ts" setup>
import feedback from '@/utils/feedback'
import type { PropType } from 'vue'
import type options from './options'
import typeSelect from './type-select.vue'

const props = defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})

const limit = 10
type OptionsType = ReturnType<typeof options>
const typeSelectRef = shallowRef<InstanceType<typeof typeSelect>>()
const showEdit = ref(false)

const getTypeValue = computed(() => {
    const type = props.content.type
    switch (type) {
        case 1:
            return '样式一'
        case 2:
            return '样式二'
        case 3:
            return '样式三'
        case 4:
            return '样式四'
    }
})

const handleTrigger = async () => {
    showEdit.value = true
    await nextTick()
    const type = props.content.type
    typeSelectRef.value?.open(type)
}

const handleAdd = () => {
    if (props.content.data?.length < limit) {
        props.content.data.push({
            image: '',
            name: '',
            link: {}
        })
    } else {
        feedback.msgError(`最多添加${limit}张图片`)
    }
}
const handleDelete = (index: number) => {
    if (props.content.data?.length <= 1) {
        return feedback.msgError('最少保留一张图片')
    }
    props.content.data.splice(index, 1)
}
</script>