export const TreeUtil = {
  /**
   * 广度优先遍历
   * @param tree 树结构
   * @param func 函数
   */
  treeForeach: (tree: any[], func: any): void => {
    let node;
    const list = [...tree];
    // tslint:disable-next-line:no-conditional-assignment
    while ((node = list.shift())) {
      func(node);
      // tslint:disable-next-line:no-unused-expression
      node.children && list.push(...node.children);
    }
  },
  /**
   * 深度优先遍历(先序遍历)
   * @param tree 树结构
   * @param func 函数
   */
   treeForeachDepthDesc: (tree: any[], func: any): void => {
    tree.forEach(data => {
      func(data);
      // tslint:disable-next-line:no-unused-expression
      data.children && TreeUtil.treeForeachDepthDesc(data.children, func); // 遍历子树
    });
  },
  /**
   * 深度优先遍历(后序遍历)
   * @param tree 树结构
   * @param func 函数
   */
  treeForeachDepthAsc: (tree: any[], func: any): void => {
    tree.forEach(data => {
      // tslint:disable-next-line:no-unused-expression
      data.children && TreeUtil.treeForeachDepthAsc(data.children, func); // 遍历子树
      func(data);
    });
  },
  /**
   * 列表结构转树结构
   * @param list 数组对象
   * @param id   id名
   * @param pid  pic名
   */
  listToTree: (list: any[], id: string = 'id', pid: string = 'pid'): any[] => {
    const info = list.reduce((map, node) => ((map[node[id]] = node), (node.children = []), map), {});
    return list.filter(node => {
      // tslint:disable-next-line:no-unused-expression
      info[node[pid]] && info[node[pid]].children.push(node);
      return !node[pid];
    });
  },

  /**
   * 向上筛选树结构, 返回包含的树
   * @param tree
   * @param func
   */
  treeFilter: (tree: any[], func: any): any[] => {
    // 使用map复制一下节点，避免修改到原树
    return tree
        .map(node => ({ ...node }))
        .filter(node => {
          node.children = node.children && TreeUtil.treeFilter(node.children, func);
          return func(node) || (node.children && node.children.length);
        });
  },

  /**
   * 向上查找树节路径, 返回节点id的数组
   * @param tree
   * @param func
   * @param path 路径有默认值
   */
  treeFindPath: (tree: any[], func: any, path: any[] = []): any[] => {
    if (!tree) return [];
    for (const data of tree) {
      path.push(data.id);
      if (func(data)) return path;
      if (data.children) {
        const findChildren = TreeUtil.treeFindPath(data.children, func, path);
        if (findChildren.length) return findChildren;
      }
      path.pop();
    }
    return [];
  },
  /**
   * 获取该树形结构的最后一级的所有节点
   * @param tree
   * @return {Array} list
   */
  getAllNodesAtLastLevel: (tree: any[]): any[] => {
    const nodes = [];
    function traverse(node, level) {
      if (!node) {
        return;
      }

      if (!node.children || node.children.length === 0) {
        nodes.push(node);
        return;
      }
      node.children.forEach(child => {
        traverse(child, level + 1);
      });
    }
    const temp = { children: tree}
    traverse(temp, 0);

    return nodes;
  }
}
