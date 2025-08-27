<template>
  <div class="markmap-container">
    <svg ref="svgRef" class="markmap-svg"></svg>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Markmap, deriveOptions } from 'markmap-view'
import { Transformer } from 'markmap-lib'

const props = defineProps({
  content: { type: String, required: true },
  jsonOptions: { type: Object, default: () => ({}) },
  minWidth: { type: Number, default: 300 },
  minHeight: { type: Number, default: 200 },
})

const svgRef = ref()
let mm = null

const transformer = new Transformer()

// 改进的 Frontmatter 解析函数，支持嵌套结构
const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      frontmatter: {},
      content: content
    }
  }
  
  const frontmatterContent = match[1]
  const markdownContent = content.slice(match[0].length)
  
  // 解析嵌套的 YAML 结构
  const frontmatter = parseNestedYaml(frontmatterContent)
  
  return {
    frontmatter,
    content: markdownContent
  }
}

// 解析嵌套的 YAML（简化版本）
const parseNestedYaml = (yamlContent) => {
  const result = {}
  const lines = yamlContent.split('\n')
  let currentObject = result
  const stack = [result]
  const indentStack = [-1]
  
  try {
    lines.forEach(line => {
      if (!line.trim() || line.trim().startsWith('#')) return
      
      const indent = line.length - line.trimLeft().length
      const trimmed = line.trim()
      
      // 处理缩进变化
      while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) {
        stack.pop()
        indentStack.pop()
      }
      currentObject = stack[stack.length - 1]
      
      const colonIndex = trimmed.indexOf(':')
      if (colonIndex === -1) return
      
      const key = trimmed.slice(0, colonIndex).trim()
      let value = trimmed.slice(colonIndex + 1).trim()
      
      if (value === '') {
        // 这是一个嵌套对象的开始
        const nestedObject = {}
        currentObject[key] = nestedObject
        stack.push(nestedObject)
        indentStack.push(indent)
        currentObject = nestedObject
      } else {
        // 处理值
        value = parseValue(value)
        currentObject[key] = value
      }
    })
  } catch (error) {
    console.warn('Nested YAML parsing error:', error)
    return {}
  }
  
  return result
}

// 解析单个值
const parseValue = (value) => {
  // 处理引号
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  
  // 处理布尔值
  if (value === 'true') return true
  if (value === 'false') return false
  
  // 处理 null
  if (value === 'null' || value === '~') return null
  
  // 处理数字
  if (!isNaN(value) && !isNaN(parseFloat(value))) {
    return parseFloat(value)
  }
  
  // 处理数组（简单格式：[item1, item2]）
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
  
  return value
}

const calculateVisibleContentHeight = (root) => {
  // 递归计算当前展开状态下可见节点的高度
  const calculateNodeHeight = (node) => {
    const nodeHeight = 20 // 每个节点的基础高度
    let totalHeight = nodeHeight
    
    const isExpanded = node.payload && node.payload.fold != 1
    if (isExpanded && node.children && node.children.length > 0) {
      node.children.forEach(child => {
        totalHeight += calculateNodeHeight(child)
      })
    }
    return totalHeight
  }

  return calculateNodeHeight(root)
}

// 更新 SVG 高度
const updateSvgHeight = (root) => {
  const contentHeight = calculateVisibleContentHeight(root)
  // console.log(contentHeight)
  const height = Math.max(contentHeight, props.minHeight)
  svgRef.value.style.height = `${height}px`

  const container = svgRef.value.closest('.markmap-container')
  if (container) {
    container.style.height = `${height}px`
  }
}

// 裁剪 markmap 的树，只保留指定深度
const setDefaultFold = (node, maxDepth, currentDepth = 0) => {
  if (!node.payload) node.payload = {}
  
  if (currentDepth >= maxDepth) {
    node.payload.fold = 1 // 折叠
  } else {
    node.payload.fold = 0 // 展开
  }

  if (node.children) {
    node.children.forEach(child =>
      setDefaultFold(child, maxDepth, currentDepth + 1)
    )
  }
}

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
  // console.log('找到的 demos 节点数量:', allDemosNodes.length)

  // 为所有 demos 节点的子节点添加按键标识
  allDemosNodes.forEach((demosNode, index) => {
    // console.log(`处理第 ${index + 1} 个 demos 节点:`, demosNode.content)
    
    if (demosNode.children) {
      demosNode.children.forEach(child => {
        // console.log('  - 子节点:', child)
        if (!child.payload) child.payload = {}
        child.payload.isButton = true
        // child.payload.buttonText = child.content
      })
    }
  })
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
    updateSvgHeight(root)
    mm.fit()

    mm.svg.on('click', () => {
      requestAnimationFrame(() => {
        updateSvgHeight(root)
        mm.fit()
        // 添加按键点击事件
        addButtonClickEvents(root)
      })
    })

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      updateSvgHeight(root)
      mm.fit()
    })

  } catch (err) {
    console.error('Markmap rendering error:', err)
  }
}

// 查找节点的父节点
const findParentNode = (root, targetNode) => {
  const findParent = (node, parent = null) => {
    if (node.children) {
      for (const child of node.children) {
        if (child === targetNode) {
          return parent
        }
        const found = findParent(child, node)
        if (found) return found
      }
    }
    return null
  }
  
  return findParent(root)
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
      
      console.log('Processing button node:', node)

      // 使用 filter 方法找到匹配的节点
      const targetNode = mm.svg.selectAll('.markmap-node')
        .filter(function() {
          const textContent = this.textContent || ''
        //  console.log(textContent,node.content);
          return textContent.trim() === node.content
        })
      
      if (!targetNode.empty()) {
        console.log('✅ 找到匹配的节点:', node.content)
        
        // 给节点加上 cursor pointer
        targetNode.style("cursor", "pointer")
        
        // 添加点击事件
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