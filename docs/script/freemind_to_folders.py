import os
import re
import xml.etree.ElementTree as ET

def safe_filename(name):
    # 替换掉文件系统非法字符
    return re.sub(r'[\\/*?:"<>| ]+', '_', name)

def get_full_path(node):
    """递归向上查找，拼接全路径"""
    path = []
    current = node
    while current is not None:
        text = current.attrib.get("TEXT", "").strip()
        if text:
            path.append(text)
        current = current.getparent() if hasattr(current, "getparent") else None
    return "/".join(reversed(path))

def parse_node_safe(node, parent_path, created_paths, parent_stack):
    text = node.attrib.get("TEXT", "").strip()
    current_path = parent_path

    # 1. 如果是 / 开头，创建文件夹
    if text.startswith("/"):
        folder_name = safe_filename(text.strip("/"))
        current_path = os.path.join(parent_path, folder_name)
        os.makedirs(current_path, exist_ok=True)
        created_paths.append(current_path)

    children = list(node)

    # 检查是否有 type 子节点
    type_node = next((c for c in children if c.attrib.get("TEXT") == "type"), None)
    if type_node is not None:
        type_val = type_node[0].attrib.get("TEXT", "")
        filename = None
        if "Topic" in type_val:
            filename = os.path.join(current_path, "TopicInfo.md")
        elif "Service" in type_val:
            filename = os.path.join(current_path, "ServiceInfo.md")

        if filename:
            # 生成全路径标题
            full_path = "".join(parent_stack + [text])
            with open(filename, "w", encoding="utf-8") as f:
                f.write(f"# {full_path}\n\n")
                for c in children:
                    key = c.attrib.get("TEXT", "")
                    if len(c) > 0 and not key.startswith("/"):
                        f.write(f"## {key}\n")
                        for gc in c:
                            val = gc.attrib.get("TEXT", "")
                            if key == "msg_type":
                                if "/" in val:
                                    f.write(f"- {val}\n")
                                else:
                                    depth = len(parent_stack)
                                    root_dir = "../../" + "../" * depth
                                    f.write(f"- [{val}]({root_dir}zj_humanoid_types.md#{val})\n")
                            else:
                                f.write(f"- {val}\n")
                        f.write("\n")
            created_paths.append(filename)

    # 检查是否有 demos 子节点
    demos_node = next((c for c in children if c.attrib.get("TEXT") == "demos"), None)
    if demos_node is not None:
        for demo in demos_node:
            demo_name = demo.attrib.get("TEXT", "")
            if demo_name:
                safe_name = safe_filename(demo_name)
                filename = os.path.join(current_path, f"{safe_name}.yaml")
                with open(filename, "w", encoding="utf-8") as f:
                    f.write(f"# Demo: {demo_name}\n")
                    for sub in demo:
                        val = sub.attrib.get("TEXT", "")
                        if val:
                            f.write(f"- {val}\n")
                created_paths.append(filename)

    # 递归处理子节点
    for child in children:
        parse_node_safe(child, current_path, created_paths, parent_stack + [text])

def freemind_to_structure_safe(freemind_file, output_dir):
    tree = ET.parse(freemind_file)
    root = tree.getroot()
    top_node = root.find("node")

    os.makedirs(output_dir, exist_ok=True)
    created_paths = []
    parse_node_safe(top_node, output_dir, created_paths, [])
    return created_paths

def build_tree(path):
    tree_str = ""
    for root, dirs, files in os.walk(path):
        level = root.replace(path, "").count(os.sep)
        indent = " " * 4 * level
        tree_str += f"{indent}{os.path.basename(root)}/\n"
        subindent = " " * 4 * (level + 1)
        for f in files:
            tree_str += f"{subindent}{f}\n"
    return tree_str

if __name__ == "__main__":
    freemind_file = "zj_humanoid1.mm"   # 输入的 freemind 文件
    output_dir = "."     # 输出目录
    freemind_to_structure_safe(freemind_file, output_dir)
    print("✅ 文件夹与文档生成完成！")
    print(build_tree(output_dir))
