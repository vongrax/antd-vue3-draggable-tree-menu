import { Modal } from "ant-design-vue";

export const deleteOne = <T>(item: T, title: string, cb: (ite: T) => void): void => {
  Modal.confirm({
    title,
    content: "Это действие невозможно отменить",
    okText: "Да, удалить",
    cancelText: "Отменить",
    onOk: () => cb(item),
    onCancel: () => Modal.destroyAll(),
  });
};
