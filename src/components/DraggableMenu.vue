<template>
  <Draggable :defaultFolded="false" :treeData="dataTable" draggable cross-tree>
    <template v-slot="{ node, tree }">
      <div class="tree" @click="expandedHandler(tree, node)">
        <div class="folded-icon">
          <template v-if="node.$folded && node.$children.length">
            <CaretRightFilled />
          </template>
          <template v-if="!node.$folded && node.$children.length">
            <CaretDownFilled />
          </template>
        </div>
        <a-input
          v-model:value="value"
          ref="input"
          @blur="handleChange(tree, node)"
          v-if="!node.title"
        />
        <span v-else class="node-text">{{ node.title }}</span>
        <template v-if="node.title">
          <span class="count">{{ node.count }}</span>
          <div class="dropdown-menu">
            <a-dropdown>
              <div class="dropdown">
                <EllipsisOutlined class="dropdown-icon" />
              </div>
              <template #overlay>
                <a-menu style="min-width: 200px">
                  <a-menu-item @click="onAddNode(tree, node)">
                    <PlusOutlined class="icon" />
                    <span>Добавить подкатегорию</span>
                  </a-menu-item>
                  <a-menu-item @click="settingHandler">
                    <SettingOutlined class="icon" />
                    <span>Настроить</span>
                  </a-menu-item>
                  <a-menu-item @click="editHandler(tree, node)">
                    <EditOutlined class="icon" />
                    <span>Переименовать</span>
                  </a-menu-item>
                  <a-menu-item @click="copyHandler(tree, node)">
                    <CopyOutlined class="icon" />
                    <span>Дублировать</span>
                  </a-menu-item>
                  <a-menu-item @click="removeHandler(tree, node)">
                    <DeleteOutlined class="icon" />
                    <span>Удалить</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </div>
    </template>
  </Draggable>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { Draggable, Node, BaseTree } from "@he-tree/vue3";
import "@he-tree/vue3/dist/he-tree-vue3.css";
import {
  CaretDownFilled,
  CaretRightFilled,
  EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { deleteOne } from "@/helpers";
import { categoriesMock, CategoryType } from "@/mock/mockCategory";

type NodeType = CategoryType & Node;
type TreeType = typeof BaseTree;

const value = ref<string>("Каталог 1");

const input = ref<HTMLInputElement | null>(null);
const dataTable = categoriesMock;

const parentNode = (node: NodeType, tree: TreeType) => {
  let parent;
  let idx;
  if (node.$pid) {
    parent = tree.nodesByID[node.$pid];
    idx = parent?.$children?.findIndex((item: NodeType) => item.$id === node.$id);
  } else {
    idx = dataTable.findIndex((item) => item._id === node._id);
  }
  return idx;
};

const editNode = (tree: TreeType, node: NodeType, value: string | boolean) => {
  const idx = parentNode(node, tree);
  tree.removeNode(node);
  tree.addNode(
    {
      ...node,
      title: value,
    },
    node.$pid ? node.$pid : null,
    idx
  );
};

const expandedHandler = (tree: TreeType, node: NodeType) => {
  tree.toggleFold(node);
};

const onAddNode = (tree: TreeType, node: NodeType) => {
  tree.addNode(
    {
      title: false,
      children: [],
    },
    node.$id
  );
  tree.unfold(node);
};

watch(
  () => input.value,
  (val) => {
    if (val) {
      val.focus();
    }
  }
);

const handleChange = (tree: TreeType, node: NodeType) => {
  editNode(tree, node, value.value);
  value.value = "Каталог 1";
};

const editHandler = (tree: TreeType, node: NodeType) => {
  editNode(tree, node, false);
  value.value = node.title as string;
};

const copyHandler = (tree: TreeType, node: NodeType) => {
  let parent;
  if (node.$pid) {
    parent = tree.nodesByID[node.$pid];
  }
  let idx;
  if (node.$pid) {
    idx = parent?.$children?.findIndex((item: NodeType) => item.$id === node.$id);
  } else {
    idx = dataTable.findIndex((item) => item._id === node._id);
  }
  tree.addNode(
    {
      ...node,
    },
    node.$pid,
    idx
  );
};

const removeNode = (data: { tree: TreeType; node: NodeType }) =>
  deleteOne(data, "Вы действительно хотите удалить категорию ?", () => {
    data.tree.removeNode(data.node);
  });

const removeHandler = (tree: TreeType, node: NodeType) => {
  const data = {
    tree,
    node,
  };
  removeNode(data);
};

const settingHandler = () => {
  console.log("settings");
};
</script>
<style scoped>
.tree {
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin: 3px 0;
  cursor: pointer;
}

.tree:hover {
  background: #ecf5fe;
}

.tree:hover .dropdown-menu {
  display: block;
}

.tree:hover .count {
  display: none;
  flex: none;
}

.folded-icon {
  width: 20px;
}

.node-text {
  font-size: 14px;
}

.dropdown-menu {
  display: none;
  margin-left: auto;
}

.dropdown {
  margin-left: auto;
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
}

.dropdown-icon {
  margin: auto;
}

.icon {
  margin: 0 8px 0 0;
}

.count {
  color: rgba(0, 0, 0, 0.45);
  margin-left: auto;
}
</style>
