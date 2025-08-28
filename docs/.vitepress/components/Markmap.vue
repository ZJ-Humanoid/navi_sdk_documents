<template>
  <div class="markmap-container">
    <svg ref="svgRef" class="markmap-svg"></svg>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Markmap, deriveOptions } from 'markmap-view'
import { Transformer } from 'markmap-lib'
import { parseFrontmatter } from '../utils/frontmatter.js'
import { 
  updateSvgHeight, 
  setDefaultFold,
  getNodePath,
  findParentNode
} from '../utils/markmap-utils.js'

const props = defineProps({
  content: { type: String, required: true },
  jsonOptions: { type: Object, default: () => ({}) },
  minWidth: { type: Number, default: 300 },
  minHeight: { type: Number, default: 200 },
})

const svgRef = ref()
let mm = null

const transformer = new Transformer()

// 添加按键样式和点击事件
const addButtonFunctionality = (root) => {
  // 查找所有 demos 节点
  const findAllDemosNodes = (node, demosNodes = []) => {
    if (node.content === 'demos') {
      demosNodes.push(node)
    }
    if (node.children) {
      for (const child of node.children) {
        findAllDemosNodes(child, demosNodes)
      }
    }
    return demosNodes
  }

  const allDemosNodes = findAllDemosNodes(root)

  // 为所有 demos 节点的子节点添加按键标识
  allDemosNodes.forEach((demosNode) => {
    // 搜寻兄弟节点的功能
    const parent = findParentNode(root, demosNode)
    if (parent) {
      // 先找到type字段，打印它的child的内容
      const typeNode = parent.children?.find(child => child.content === 'type')
      if (typeNode && typeNode.children) {
        console.log('Type:', typeNode.children.map(c => c.content))
      }

      // 继续找兄弟字段，找到msg_type, 打印拼装后msg_type的内容
      const msgTypeNode = parent.children?.find(child => child.content === 'msg_type')
      if (msgTypeNode && msgTypeNode.children) {
        // 计算从 root 到 parent 的路径，提取二级节点名（root 的第一个子节点）
        const path = getNodePath(root, parent)
        const secondLevelName = path.length >= 2 ? path[1].content : 'unknown'
        const childNames = msgTypeNode.children.map(c => c.content)
        const typeStrings = childNames.map(childName => 
          childName.includes('/') ? childName : `zj_humanoid${secondLevelName}/${childName}`
        )
        console.log('msg_type:', typeStrings)

        // 组装 msg_type 节点的路径（不包含自身），不使用分隔符
        const pathToMsgType = getNodePath(root, msgTypeNode)
        const toppicStrings = pathToMsgType
          .slice(0, -1).map(n => n.content).join('')
        console.log('Topic:', toppicStrings)

      }
    }

    if (demosNode.children) {
      demosNode.children.forEach(child => {
        if (!child.payload) child.payload = {}
        child.payload.isButton = true
        // child.payload.buttonText = child.content
      })
    }
  })
}

// 添加按键点击事件
const addButtonClickEvents = (root) => {
  // 遍历所有 isButton 节点
  const traverse = (node) => {
    if (node.payload?.isButton ) {
      // 查找父节点
      const parent = findParentNode(root, node)
      if(parent.payload?.fold){
        return
      }
      
      const targetNode = mm.svg.selectAll('.markmap-node')
        .filter(function() {
          const textContent = this.textContent || ''
          return textContent.trim() === node.content
        })
      
      if (!targetNode.empty()) {
        targetNode.style("cursor", "pointer")
        targetNode.on("click", (event) => {
          event.stopPropagation()
          console.log('🎯 点击事件触发:', node.content)
          
          // 收集子节点文字
          let text = ""
          if (node.children?.length) {
            text = node.children.map(c => c.content).join("\n")
          } else {
            text = "(无子节点)"
          }
        })
        
        console.log('✅ 已为按键', node.content, '添加样式和点击事件')
      } else {
        console.log('❌ 没有找到匹配的节点:', node.content)
      }
    }
    
    if (node.children) node.children.forEach(traverse)
  }

  traverse(root)
}

// 渲染 markmap
const renderMarkmap = () => {
  if (!svgRef.value || !props.content) return

  try {
    const { frontmatter, content } = parseFrontmatter(props.content)
    const { root } = transformer.transform(content)

    // 添加按键功能
    addButtonFunctionality(root)

    // 裁剪为 2 层：0 层(root) + 1 层(child)
    setDefaultFold(root, 2)

    // 如果已有 markmap 实例，销毁它
    if (mm) mm.destroy()

    // 合并配置
    let jsonOptions = { ...props.jsonOptions }
    Object.entries(frontmatter).forEach(([k, v]) => {
      if (k !== 'markmap') jsonOptions[k] = v
    })
    if (frontmatter.markmap) {
      jsonOptions = { ...jsonOptions, ...frontmatter.markmap }
    }

    const markmapOptions = deriveOptions(jsonOptions)

    mm = Markmap.create(svgRef.value, markmapOptions, root)

    // 初次高度计算
    updateSvgHeight(root, svgRef.value, props.minHeight)
    mm.fit()

    mm.svg.on('click', () => {
      requestAnimationFrame(() => {
        updateSvgHeight(root, svgRef.value, props.minHeight)
        mm.fit()
        // 添加按键点击事件
        addButtonClickEvents(root)
      })
    })

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      updateSvgHeight(root, svgRef.value, props.minHeight)
      mm.fit()
    })

  } catch (err) {
    console.error('Markmap rendering error:', err)
  }
}

onMounted(() => {
  renderMarkmap()
})

watch(() => props.content, renderMarkmap, { immediate: true })
watch(() => props.jsonOptions, renderMarkmap)
</script>

<style scoped>
.markmap-container {
  /* width: 100%; */
  position: relative;
  display: flex;
}
.markmap-svg {
  width: 100%;
  height: auto;
  display: block;
}
</style>