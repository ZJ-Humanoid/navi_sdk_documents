import xml.etree.ElementTree as ET
import sys


def get_text(node):
    return node.attrib.get("TEXT") or node.attrib.get("text")


def traverse(node, lines, slash_depth=0, list_depth=0, parent_was_heading=False, ancestors=None):
    """递归遍历Freemind节点，生成Markdown内容"""
    if ancestors is None:
        ancestors = []

    text = get_text(node)
    if not text:
        for child in node.findall("node"):
            traverse(child, lines, slash_depth, list_depth, parent_was_heading, ancestors)
        return

    is_slash = text.startswith("/")
    if is_slash:
        # 以/开头的节点 -> 标题
        hlevel = min(6, slash_depth + 1)
        lines.append("#" * hlevel + " " + text)
        for child in node.findall("node"):
            traverse(child, lines, slash_depth + 1, 0, True, ancestors + [text.strip("/")])
        return

    # 普通节点 -> 列表
    indent = "  " * list_depth
    lines.append(f"{indent}- {text}")

    if text == "msg_type":
        sub_indent = "  " * (list_depth + 1)
        root_pkg = ancestors[0] if len(ancestors) >= 1 else "unknown"
        for child in node.findall("node"):
            child_text = get_text(child) or ""
            child_text = child_text.strip()
            if not child_text:
                continue
            if "/" in child_text:
                # 带斜杠：保持不变
                lines.append(f"{sub_indent}- {child_text}")
            else:
                # 不带斜杠：转为 Markdown 链接到 {root_pkg}_types.md
                lines.append(f"{sub_indent}- [{child_text}](./{root_pkg}_types.md#{child_text})")
        return

    # 常规子节点递归
    for child in node.findall("node"):
        traverse(child, lines, slash_depth, list_depth + 1, False, ancestors)

def convert(input_file, output_file):
    tree = ET.parse(input_file)
    root = tree.getroot()
    lines = []

    for node in root.findall(".//node"):
        traverse(node, lines)
        break  # 只处理根节点

    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("用法: python convert_freemind_markmap.py input.mm output.md")
    else:
        convert(sys.argv[1], sys.argv[2])
